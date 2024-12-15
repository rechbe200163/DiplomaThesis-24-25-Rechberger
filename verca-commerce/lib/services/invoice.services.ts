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

  // Berechnung des Rechnungsbetrags
  const invoiceAmount = products.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);

  // Erstelle die Rechnung
  const invoice = await prisma.invoice.create({
    data: {
      orderId,
      invoiceAmount,
    },
  });

  // Generiere das PDF für die Rechnung
  const pdfBytes = await generateInvoicePDF(
    invoice.invoiceId,
    products,
    invoiceAmount
  );

  // Lade die PDF-Datei in Supabase hoch
  const filePath = await uploadInvoicePDF(pdfBytes, invoice.invoiceId);

  // Update die Rechnung in der Datenbank mit dem PDF-Link
  const updatedInvoice = await prisma.invoice.update({
    where: { invoiceId: invoice.invoiceId },
    data: { pdfUrl: filePath },
  });

  return { success: true, invoice: updatedInvoice };
}

async function generateInvoicePDF(
  invoiceId: string,
  products: ExtendedProduct[],
  invoiceAmount: number
) {
  const pdfDoc = await PDFDocument.create(); // Erstelle ein neues PDF-Dokument

  // Füge eine Seite hinzu
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  // Schriftart definieren
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Text in die PDF setzen
  page.drawText(`Invoice ID: ${invoiceId}`, { x: 50, y: height - 50, font });
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
  // Supabase Storage - PDF-Datei hochladen
  const { data, error } = await supabaseClient.storage
    .from('invoices') // Der Bucket, in dem die PDF gespeichert wird
    .upload(`invoices/${invoiceId}.pdf`, pdfBytes, {
      contentType: 'application/pdf', // Dateityp setzen
    });

  if (error) {
    console.error('Error uploading invoice PDF:', error);
    throw new Error('Failed to upload invoice PDF');
  }

  return data.path;
}
