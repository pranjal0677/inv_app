
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: InvoiceItem[];
  notes: string;
  paymentTerms: string;
  taxRate: number;
}

export const generateInvoicePDF = (data: InvoiceData) => {
  const doc = new jsPDF();
  
  // Add company logo/info
  doc.setFillColor(155, 135, 245); // Primary Purple
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text("INVOICE", 14, 25);
  
  // Invoice details
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(12);
  doc.text(`Invoice Number: ${data.invoiceNumber}`, 14, 50);
  doc.text(`Date: ${data.invoiceDate}`, 14, 58);
  doc.text(`Due Date: ${data.dueDate}`, 14, 66);
  
  // Client details
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text("Bill To:", 14, 82);
  doc.setFont(undefined, 'normal');
  doc.setFontSize(12);
  doc.text(data.clientName, 14, 90);
  doc.text(data.clientEmail, 14, 98);
  const addressLines = data.clientAddress.split('\n');
  addressLines.forEach((line, i) => {
    doc.text(line, 14, 106 + (i * 8));
  });
  
  // Invoice items
  const tableColumn = ["Item", "Quantity", "Unit Price", "Total"];
  const tableRows: (string | number)[][] = [];
  
  data.items.forEach(item => {
    const total = item.quantity * item.price;
    tableRows.push([
      item.description,
      item.quantity,
      `$${item.price.toFixed(2)}`,
      `$${total.toFixed(2)}`
    ]);
  });
  
  // Calculate totals
  const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const tax = subtotal * (data.taxRate / 100);
  const total = subtotal + tax;
  
  // Add table
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 130,
    theme: 'striped',
    headStyles: { 
      fillColor: [155, 135, 245],
      textColor: [255, 255, 255]
    },
    foot: [
      ["", "", "Subtotal", `$${subtotal.toFixed(2)}`],
      ["", "", `Tax (${data.taxRate}%)`, `$${tax.toFixed(2)}`],
      ["", "", "Total", `$${total.toFixed(2)}`]
    ],
    footStyles: { 
      fillColor: [240, 240, 240],
      textColor: [30, 30, 30],
      fontStyle: 'bold'
    }
  });
  
  // Add notes and payment terms
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text("Notes:", 14, finalY);
  doc.setFont(undefined, 'normal');
  doc.text(data.notes, 14, finalY + 8);
  
  doc.setFont(undefined, 'bold');
  doc.text("Payment Terms:", 14, finalY + 25);
  doc.setFont(undefined, 'normal');
  doc.text(data.paymentTerms, 14, finalY + 33);
  
  // Add footer with purplish accent
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFillColor(254, 198, 161); // Soft Orange
  doc.rect(0, pageHeight - 20, doc.internal.pageSize.getWidth(), 20, 'F');
  
  return doc;
};

export const saveInvoicePDF = (data: InvoiceData) => {
  const doc = generateInvoicePDF(data);
  doc.save(`Invoice-${data.invoiceNumber}.pdf`);
};

export const openInvoicePDF = (data: InvoiceData) => {
  const doc = generateInvoicePDF(data);
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
};
