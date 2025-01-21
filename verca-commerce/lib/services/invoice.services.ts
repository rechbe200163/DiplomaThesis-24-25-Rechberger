'server only';
import { formatDateTime, formatPrice } from '@/lib/utils';
import { auth } from '@/auth';
import { ExtendedProduct } from '../interfaces';
import prisma from '@/prisma/client';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'; // Import der pdf-lib-Bibliothek
import { supabaseClient } from '../supabaseClient';

export async function createInvoiceWithPDF(
  orderId: string,
  products: ExtendedProduct[]
) {
  const session = await auth();

  if (!session) {
    return {
      errors: {
        title: ['Sie müssen eingeloggt sein, um eine Rechnung zu erstellen'],
      },
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
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595.276, 841.89]); // A4 size
  const { width, height } = page.getSize();

  // Embed fonts
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Helper function to draw text
  const drawText = (
    text: string,
    x: number,
    y: number,
    font = regularFont,
    size = 12,
    color = rgb(0, 0, 0)
  ) => {
    page.drawText(text, { x, y, font, size, color });
  };

  // Header
  // Draw a logo image at the top right corner of the invoice
  const companyInfo = await prisma.siteConfig.findFirst({
    include: {
      address: true,
    },
  });
  // const logoUrl = await getSignedURL(companyInfo?.logoPath!);
  // if (!logoUrl) {
  //   throw new Error('Logo URL is missing');
  // }
  // const logoImageBytes = await fetch(logoUrl).then((res) => res.arrayBuffer());
  // const logoImage = await pdfDoc.embedPng(logoImageBytes);
  // const logoDims = logoImage.scale(0.8);

  // // Calculate position for the logo in the upper right corner
  // const logoX = 50; // 50 pixels from the left edge
  // const logoY = 50; // 50 pixels from the top edge

  // page.drawImage(logoImage, {
  //   x: logoX,
  //   y: logoY,
  //   width: logoDims.width,
  //   height: logoDims.height,
  // });

  drawText('RECHNUNG', 50, height - 50, boldFont, 24);
  drawText(`Bestelle Nummer: ${orderId}`, 50, height - 80);
  drawText(`Datum: ${formatDateTime(new Date())}`, 50, height - 100);

  // Company Info (replace with your company's details)
  drawText(`${companyInfo?.companyName}`, 50, height - 130, boldFont);
  drawText(`${companyInfo?.address.streetName}`, 50, height - 150);
  drawText(
    `${companyInfo?.address.city} ${companyInfo?.address.country} ${companyInfo?.address.postCode}`,
    50,
    height - 170
  );
  drawText(`${companyInfo?.phoneNumber}`, 50, height - 190);

  // Table Header
  const tableTop = height - 220;
  const tableLeft = 50;
  const colWidths = [250, 100, 100, 95];

  page.drawRectangle({
    x: tableLeft,
    y: tableTop - 20,
    width: width - 100,
    height: 20,
    color: rgb(0.9, 0.9, 0.9),
  });

  drawText('Produkt', tableLeft + 5, tableTop - 15, boldFont);
  drawText('Menge', tableLeft + colWidths[0] + 5, tableTop - 15, boldFont);
  drawText(
    'Preis',
    tableLeft + colWidths[0] + colWidths[1] + 5,
    tableTop - 15,
    boldFont
  );
  drawText(
    'Gesamt',
    tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + 5,
    tableTop - 15,
    boldFont
  );

  // Table Content
  let y = tableTop - 40;
  for (const product of products) {
    drawText(product.name, tableLeft + 5, y);
    drawText(product.quantity.toString(), tableLeft + colWidths[0] + 5, y);
    drawText(
      formatPrice(product.price),
      tableLeft + colWidths[0] + colWidths[1] + 5,
      y
    );
    drawText(
      formatPrice(product.price * product.quantity),
      tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + 5,
      y
    );
    y -= 20;

    if (y < 100) {
      // Start a new page if we're running out of space
      page = pdfDoc.addPage([595.276, 841.89]);
      y = height - 50;
    }
  }

  // Total
  const totalY = y - 40;
  page.drawLine({
    start: { x: tableLeft, y: totalY + 15 },
    end: { x: width - 50, y: totalY + 15 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  drawText(
    'Gesamtbetrag:',
    tableLeft + colWidths[0] + colWidths[1] + 5,
    totalY,
    boldFont
  );
  drawText(
    formatPrice(invoiceAmount),
    tableLeft + colWidths[0] + colWidths[1] + colWidths[2] + 5,
    totalY,
    boldFont
  );

  // Footer
  const footerY = 50;
  drawText('Danke für Ihre Vertrauen', 50, footerY, regularFont, 10);
  drawText(
    `Rechnung erstellt am: ${formatDateTime(new Date())}`,
    50,
    footerY - 15,
    regularFont,
    10
  );

  // Page numbers
  const totalPages = pdfDoc.getPageCount();
  for (let i = 0; i < totalPages; i++) {
    const page = pdfDoc.getPage(i);
    page.drawText(`Seite ${i + 1} von ${totalPages}`, {
      x: 500,
      y: 15,
      size: 10,
      font: regularFont,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

async function uploadInvoicePDF(pdfBytes: Uint8Array, orderId: string) {
  const invoiceBucket = process.env.SUPABASE_INVOICE_BUCKET; // Supabase bucket name
  // Upload the PDF to the Supabase storage
  const { data, error } = await supabaseClient.storage
    .from(invoiceBucket!) // supabase bucket which stores the PDFs
    .upload(`invoice_${orderId}.pdf`, pdfBytes, {
      contentType: 'application/pdf', // data type of the file
    });

  if (error) {
    throw new Error('Failed to upload invoice PDF');
  }

  return data.path;
}
