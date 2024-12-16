'server only';
import { auth } from '@/auth';
import { FormState } from '../form.types';
import { ExtendedProduct } from '../interfaces';
import prisma from '@/prisma/client';
import { PDFDocument, StandardFonts } from 'pdf-lib'; // Import der pdf-lib-Bibliothek
import { supabaseClient } from '../supabaseClient';

export async function createInvoiceWithPDF(
  orderId: string,
  products: ExtendedProduct[]
) {
  const session = await auth();

  if (!session) {
    return {
      errors: { title: ['You need to be logged in to create an invoice'] },
      success: false,
    };
  }

  // claclulate invoice amount
  const invoiceAmount = products.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);

  // generate PDF for invoice
  const pdfBytes = await generateInvoicePDF(orderId, products, invoiceAmount);
  // load pdf to supabase storage
  const filePath = await uploadInvoicePDF(pdfBytes, orderId);
  // save invoice to database
  const invoice = await prisma.invoice.create({
    data: {
      orderId,
      pdfUrl: filePath,
      invoiceAmount,
    },
  });

  return { success: true, invoice: invoice };
}

async function generateInvoicePDF(
  orderId: string,
  products: ExtendedProduct[],
  invoiceAmount: number
) {
  const pdfDoc = await PDFDocument.create(); // Erstelle ein neues PDF-Dokument

  // add a new page to the PDF
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  // Schriftart definieren
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  //
  page.drawText(`Order ID: ${orderId}`, { x: 50, y: height - 50, font });
  page.drawText(`Total Amount: $${invoiceAmount.toFixed(2)}`, {
    x: 50,
    y: height - 100,
    font,
  });

  // Produktdetails einfügen
  let y = height - 150;
  for (const product of products) {
    page.drawText(
      `${product.name} x ${product.quantity} - $${(
        product.price * product.quantity
      ).toFixed(2)}`,
      { x: 50, y, font }
    );
    y -= 20; // Abstand zwischen den Produkten
  }

  // Das PDF als ByteArray speichern
  const pdfBytes = await pdfDoc.save();
  return pdfBytes; // Rückgabe der Byte-Daten der generierten PDF
}

async function uploadInvoicePDF(pdfBytes: Uint8Array, invoiceId: string) {
  // Upload the PDF to the Supabase storage
  const { data, error } = await supabaseClient.storage
    .from('invoicePdf') // supabase bucket which stores the PDFs
    .upload(`invoices/${invoiceId}.pdf`, pdfBytes, {
      contentType: 'application/pdf', // data type of the file
    });

  if (error) {
    console.error('Error uploading invoice PDF:', error);
    throw new Error('Failed to upload invoice PDF');
  }

  return data.path;
}
