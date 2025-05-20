import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InvoiceData, InvoiceItem } from '@/types/invoice';
import QRCode from 'qrcode';

// Function to generate QR code data URL
async function generateQRCodeDataURL(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: 150,
      margin: 0,
      color: {
        dark: '#000',
        light: '#FFF'
      }
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    return '';
  }
}

export const generateInvoicePDF = async (data: InvoiceData) => {
  // Create PDF with 10mm margins
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10; // 10mm margin
  
  const contentWidth = pageWidth - 2 * margin;
  const contentHeight = pageHeight - 2 * margin;
  
  // Add company logo if available
  if (data.companyDetails.logo) {
    try {
      // Add logo in top-right corner
      doc.addImage(
        data.companyDetails.logo, 
        'JPEG', 
        pageWidth - margin - 40, 
        margin, 
        40, 
        40
      );
    } catch (error) {
      console.error("Failed to add logo to PDF:", error);
    }
  }
  
  // Add header - "Invoice" (slightly smaller)
  doc.setFontSize(24);
  doc.setTextColor(85, 55, 155); // Use purple color like in the image
  doc.setFont(undefined, 'bold');
  doc.text("Invoice", margin, margin + 15);
  
  // Invoice details in the top left (smaller font)
  const startYInvoiceDetails = margin + 30;
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  doc.setFont(undefined, 'bold');
  doc.text("Invoice No #", margin, startYInvoiceDetails);
  doc.text("Invoice Date", margin, startYInvoiceDetails + 10);
  doc.text("Due Date", margin, startYInvoiceDetails + 20);
  
  doc.setFont(undefined, 'normal');
  doc.text(data.invoiceNumber, margin + 56, startYInvoiceDetails);
  doc.text(data.invoiceDate, margin + 56, startYInvoiceDetails + 10);
  // Ensure due date is displayed (use invoice date if no due date provided)
  doc.text(data.dueDate || data.invoiceDate, margin + 56, startYInvoiceDetails + 20);
  
  // Billed By (Seller) and Billed To (Customer) section - more compact
  const startYBillingDetails = margin + 55; // Start slightly higher
  doc.setFillColor(230, 230, 245); // Light purple background
  
  // Calculate box width based on content width - slightly different widths
  const billedByWidth = contentWidth * 0.45; // 45% width for Billed By
  const billedToWidth = contentWidth * 0.45; // 45% width for Billed To
  const billingBoxHeight = 55; // Increased height to accommodate PAN fields
  doc.rect(margin, startYBillingDetails, billedByWidth, billingBoxHeight, 'F'); // Billed By box
  doc.rect(pageWidth - margin - billedToWidth, startYBillingDetails, billedToWidth, billingBoxHeight, 'F'); // Billed To box
  
  // Billed By section - make consistent with Billed To
  doc.setFont(undefined, 'bold');
  doc.setFontSize(12); // Smaller heading
  doc.text("Billed By", margin + 8, startYBillingDetails + 10);
  doc.setFontSize(10); // Smaller details
  doc.setFont(undefined, 'normal');
  
  // Limit company name to one line
  const companyName = doc.splitTextToSize(data.companyDetails.name, billedByWidth - 16)[0];
  doc.text(companyName, margin + 8, startYBillingDetails + 20);
  
  // Add phone number to billed by section
  let yOffsetSeller = 28;
  if (data.companyDetails.phone) {
    doc.text(data.companyDetails.phone, margin + 8, startYBillingDetails + yOffsetSeller);
    yOffsetSeller += 6;
  }
  
  // Split address into multiple lines - limit to 2 lines max
  const sellerAddressLines = data.companyDetails.address.split('\n');
  let combinedSellerAddress = sellerAddressLines.join(", ");
  // Wrap to max 2 lines with appropriate width
  const wrappedSellerAddress = doc.splitTextToSize(combinedSellerAddress, billedByWidth - 16);
  const limitedSellerAddress = wrappedSellerAddress.slice(0, 2); // Limit to 2 lines
  
  limitedSellerAddress.forEach(line => {
    doc.text(line, margin + 8, startYBillingDetails + yOffsetSeller);
    yOffsetSeller += 6; // Tighter line spacing
  });
  
  // Add GSTIN if available - limit to one line
  if (data.companyDetails.taxId) {
    const taxId = doc.splitTextToSize(data.companyDetails.taxId, billedByWidth - 16)[0];
    doc.text(taxId, margin + 8, startYBillingDetails + yOffsetSeller);
    yOffsetSeller += 6;
  }
  
  // Add PAN if available - limit to one line
  if (data.companyDetails.pan) {
    const pan = doc.splitTextToSize(`PAN: ${data.companyDetails.pan}`, billedByWidth - 16)[0];
    doc.text(pan, margin + 8, startYBillingDetails + yOffsetSeller);
    yOffsetSeller += 6;
  }
  
  // Billed To section with same formatting as Billed By
  doc.setFont(undefined, 'bold');
  doc.setFontSize(12); // Smaller heading
  doc.text("Billed To", pageWidth - margin - billedToWidth + 8, startYBillingDetails + 10);
  doc.setFontSize(10); // Smaller details
  doc.setFont(undefined, 'normal');
  
  // Limit client name to one line
  const clientName = data.clientDetails?.name ? 
    doc.splitTextToSize(data.clientDetails.name, billedToWidth - 16)[0] : "";
  doc.text(clientName, pageWidth - margin - billedToWidth + 8, startYBillingDetails + 20);
  
  // Split client address into multiple lines - with consistent spacing
  let yOffsetClient = 28;
  if (data.clientDetails?.phone) {
    doc.text(data.clientDetails.phone, pageWidth - margin - billedToWidth + 8, startYBillingDetails + yOffsetClient);
    yOffsetClient += 6; // Match billed by spacing
  }
  
  // Limit client address to 2 lines max
  const clientAddressLines = (data.clientDetails?.address || "").split('\n');
  let combinedClientAddress = clientAddressLines.join(", ");
  // Wrap to max 2 lines with appropriate width
  const wrappedClientAddress = doc.splitTextToSize(combinedClientAddress, billedToWidth - 16);
  const limitedClientAddress = wrappedClientAddress.slice(0, 2); // Limit to 2 lines
  
  limitedClientAddress.forEach(line => {
    if (line.trim()) { // Only add non-empty lines
      doc.text(line, pageWidth - margin - billedToWidth + 8, startYBillingDetails + yOffsetClient);
      yOffsetClient += 6; // Match billed by spacing
    }
  });
  
  // Add client's GSTIN if provided - limit to one line
  if (data.clientDetails?.taxId) {
    const taxId = doc.splitTextToSize(data.clientDetails.taxId, billedToWidth - 16)[0];
    doc.text(taxId, pageWidth - margin - billedToWidth + 8, startYBillingDetails + yOffsetClient);
    yOffsetClient += 6;
  }
  
  // Add client's PAN if provided - limit to one line
  if (data.clientDetails?.pan) {
    const pan = doc.splitTextToSize(`PAN: ${data.clientDetails.pan}`, billedToWidth - 16)[0];
    doc.text(`PAN: ${data.clientDetails.pan}`, pageWidth - margin - billedToWidth + 8, startYBillingDetails + yOffsetClient);
    yOffsetClient += 6;
  }
  
  // Add country and place of supply
  const startYSupplyDetails = startYBillingDetails + billingBoxHeight + 10; // Position after the billing boxes
  doc.setFont(undefined, 'normal');
  doc.text(`Country of Supply: ${data.countryOfSupply || 'India'}`, margin, startYSupplyDetails);
  doc.text(`Place of Supply: ${data.placeOfSupply || 'Local'}`, pageWidth - margin - billedToWidth + 8, startYSupplyDetails);
  
  // Set currency symbol
  const currencySymbol = data.currency === 'INR' ? '₹' : (data.currency === 'USD' ? '$' : data.currency);
  
  // Invoice items
  const tableColumn = ["Item", "HSN/SAC", "GST Rate", "Rate", "Amount", "CGST", "SGST", "Total"];
  const tableRows: (string | number)[][] = [];
  
  data.items.forEach(item => {
    const total = item.quantity * item.price;
    const gstRate = data.taxRate;
    const gstAmount = total * (gstRate / 100);
    const halfGst = gstAmount / 2; // Split into CGST and SGST
    const totalWithGst = total + gstAmount;
    
    // Use consistent currency formatting with proper thousand separators
    const formattedSymbol = currencySymbol === '₹' ? 'Rs.' : currencySymbol;
    
    // Format numbers with commas for thousands
    const formatNumber = (value: number) => {
      return value.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        useGrouping: true
      });
    };
    
    const price = formattedSymbol + " " + formatNumber(item.price);
    const totalAmount = formattedSymbol + " " + formatNumber(total);
    const cgstAmount = formattedSymbol + " " + formatNumber(halfGst);
    const sgstAmount = formattedSymbol + " " + formatNumber(halfGst);
    const totalWithTax = formattedSymbol + " " + formatNumber(totalWithGst);
    
    // Ensure the item description is never empty
    const itemDescription = item.description || "Service Item";
    
    tableRows.push([
      itemDescription,
      item.hsnCode || "998361",
      `${gstRate}%`,
      price,
      totalAmount,
      cgstAmount,
      sgstAmount,
      totalWithTax
    ]);
  });
  
  // Calculate totals
  const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const tax = subtotal * (data.taxRate / 100);
  const cgst = tax / 2;
  const sgst = tax / 2;
  const total = subtotal + tax;
  
  // Add table with proper cell formatting - more compact
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: startYSupplyDetails + 8, // Start slightly higher
    theme: 'striped',
    headStyles: { 
      fillColor: [85, 55, 155],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9 // Smaller heading font
    },
    margin: { top: 10, right: margin, bottom: 10, left: margin },
    styles: {
      font: 'helvetica',
      overflow: 'linebreak',
      cellPadding: 2, // Reduced padding
      fontSize: 8, // Smaller content font
    },
    didParseCell: (data) => {
      // Remove any potential superscripts from currency values
      const cellText = String(data.cell.text);
      if (cellText.startsWith && cellText.startsWith(currencySymbol)) {
        data.cell.text = [cellText]; // Convert to array to prevent auto-formatting
      }
    },
    columnStyles: {
      3: { halign: 'right' }, // Rate
      4: { halign: 'right' }, // Amount
      5: { halign: 'right' }, // CGST
      6: { halign: 'right' }, // SGST
      7: { halign: 'right' }  // Total
    }
  });
  
  // Add summary and payment details
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  // Total amount in words - with better positioning when there are many items
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text("Total (in words) :", margin, finalY);
  doc.setFont(undefined, 'normal');
  
  // For the amount in words, handle differently based on number of items
  const wordsText = numberToWords(total) + " ONLY";
  // Wrap text to prevent overlap, ensure enough space for right-side amounts
  doc.setFontSize(10); // Slightly smaller for better fit
  const textLines = doc.splitTextToSize(wordsText, pageWidth - margin - 65);
  doc.text(textLines, margin, finalY + 8);
  
  // Format numbers with commas for summary values
  const formatSummaryNumber = (value: number) => {
    return value.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      useGrouping: true
    });
  };
  
  // Summary table on right side with proper number formatting
  doc.text("Amount", pageWidth - margin - 50, finalY);
  // Use consistent formatting for summary values with proper commas
  const formattedSummarySymbol = currencySymbol === '₹' ? 'Rs.' : currencySymbol;
  doc.text("Amount", pageWidth - margin - 50, finalY);
  doc.text(`${formattedSummarySymbol} ${formatSummaryNumber(subtotal)}`, pageWidth - margin - 5, finalY, { align: 'right' });
  
  doc.text("CGST", pageWidth - margin - 50, finalY + 8);
  doc.text(`${formattedSummarySymbol} ${formatSummaryNumber(cgst)}`, pageWidth - margin - 5, finalY + 8, { align: 'right' });
  
  doc.text("SGST", pageWidth - margin - 50, finalY + 16);
  doc.text(`${formattedSummarySymbol} ${formatSummaryNumber(sgst)}`, pageWidth - margin - 5, finalY + 16, { align: 'right' });
  
  // Add separator line
  doc.setDrawColor(200, 200, 200);
  doc.line(pageWidth - margin - 50, finalY + 20, pageWidth - margin - 5, finalY + 20);
  
  // Add total with proper number formatting - fix for large amounts
  doc.setFont(undefined, 'bold');
  
  // Fix for large amounts - put "Total" and "(INR)" on separate lines
  doc.text("Total", pageWidth - margin - 50, finalY + 28);
  doc.text("(INR)", pageWidth - margin - 50, finalY + 34);
  doc.text(`${formattedSummarySymbol} ${formatSummaryNumber(total)}`, pageWidth - margin - 5, finalY + 31, { align: 'right' });
  
  // Always create second page for bank details
  doc.addPage('a4', 'portrait');
  const bankY = margin + 20; // Start at top of second page with margin
  
  // Add bank details
  addBankAndUPIDetails(doc, data, margin, bankY, currencySymbol, total);
  
  // Add padding between bank details and footer
  const footerPadding = 15; // mm of padding before footer
  
  // Check if we have terms and conditions
  const hasTerms = data.termsAndConditions && data.termsAndConditions.length > 0;
  
  // Calculate total pages - always 2 pages since bank details are on page 2
  const totalPages = 2;
  
  // Add terms and conditions on the same page as bank details
  // Calculate Y position for terms - after bank details
  const termsY = bankY + 70; // Position after bank details
  
  // Add header to clearly mark terms section
  doc.setFillColor(85, 55, 155); // Purple
  doc.rect(0, 0, pageWidth, 15, 'F');
  
  // Terms and conditions title
  doc.setFontSize(14);
  doc.setTextColor(85, 55, 155);
  doc.setFont(undefined, 'bold');
  doc.text("Terms and Conditions", margin, termsY);
  
  // Content with consistent font size
  doc.setFontSize(11);
  doc.setTextColor(30, 30, 30);
  doc.setFont(undefined, 'normal');
  
  // Show terms and conditions content
  let terms;
  if (hasTerms) {
    terms = data.termsAndConditions.split('\n');
  } else {
    // Default terms and conditions if none provided
    terms = [
      "1. Payment is due within the timeframe specified on this invoice.",
      "2. Late payments may be subject to additional fees or interest charges.",
      "3. All prices are in the currency specified on this invoice.",
      "4. Services/products are provided as-is without warranty unless otherwise specified.",
      "5. Any disputes regarding this invoice must be raised within 7 days of receipt.",
      "6. The seller retains ownership of goods until payment is received in full.",
      "7. Taxes are calculated as per applicable laws and regulations."
    ];
  }
  
  // Calculate available space for terms (accounting for footer)
  const footerHeight = 25; // Same value as used in addFooter function
  const footerStartY = pageHeight - footerHeight - footerPadding;
  const maxTermsY = footerStartY - 10; // Leave some margin before footer
  const availableHeight = maxTermsY - termsY - 15; // Available height for terms
  const lineHeight = 8; // Height per line of terms
  const maxLines = Math.floor(availableHeight / lineHeight); // Max number of lines that can fit
  
  // Display terms with consistent formatting, limited to available space
  terms.slice(0, maxLines).forEach((term, index) => {
    const formattedTerm = term.startsWith((index + 1) + ".") ? term : `${index + 1}. ${term}`;
    const yPos = termsY + 15 + (index * lineHeight);
    doc.text(formattedTerm, margin, yPos);
  });
  
  // Ensure we're applying footers to all pages with consistent styling
  for (let i = 1; i <= doc.getNumberOfPages(); i++) {
    doc.setPage(i);
    addFooter(doc, i, data.invoiceNumber, data.invoiceDate, data.clientDetails?.name || "", totalPages);
  }
  
  return doc;
};

// Helper function to add bank and UPI details
function addBankAndUPIDetails(doc: jsPDF, data: InvoiceData, margin: number, startY: number, 
                              currencySymbol: string, total: number) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const bankDetailsWidth = pageWidth - 2 * margin - 65; // Increased spacing for QR code
  
  // Bank details section with improved layout
  doc.setFillColor(230, 230, 245); // Light purple background
  const backgroundHeight = 60; // Taller for better spacing
  doc.rect(margin, startY, bankDetailsWidth, backgroundHeight, 'F');
  
  doc.setFont(undefined, 'bold');
  doc.setFontSize(14);
  doc.text("Bank Details", margin + 6, startY + 10);
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  
  // Better line spacing
  const lineHeight = 9; // Increased line height for clarity
  const startTextY = startY + 20;
  
  // Smaller font size for details to fit everything
  doc.setFontSize(10);
  
  // Place all bank details with enough vertical space to fit within the background
  doc.text(`Account Name: ${data.bankDetails.accountName}`, margin + 6, startTextY);
  doc.text(`Account Number: ${data.bankDetails.accountNumber}`, margin + 6, startTextY + lineHeight);
  doc.text(`IFSC: ${data.bankDetails.ifscCode}`, margin + 6, startTextY + lineHeight * 2);
  doc.text(`Account Type: Current`, margin + 6, startTextY + lineHeight * 3);
  doc.text(`Bank: ${data.bankDetails.bankName}`, margin + 6, startTextY + lineHeight * 4);
  
  // UPI QR code section
  if (data.showQRCode && data.bankDetails.upiId) {
    // UPI section on right side with better spacing
    const qrBoxWidth = 60; // Wider box
    const qrBoxX = pageWidth - margin - qrBoxWidth;
    
    doc.setFillColor(230, 230, 245); // Light purple background
    doc.rect(qrBoxX, startY, qrBoxWidth, backgroundHeight, 'F');
      
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text("UPI - Scan to Pay", qrBoxX + qrBoxWidth/2, startY + 10, { align: 'center' });
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8); // Even smaller text
    doc.text(data.bankDetails.upiId, qrBoxX + qrBoxWidth/2, startY + 18, { align: 'center' });
      
    // QR code with proper centering - make it larger and better centered
    try {
      // Generate a UPI payment URL using UPI ID
      const upiUrl = `upi://pay?pa=${data.bankDetails.upiId}&pn=${encodeURIComponent(data.companyDetails.name)}&am=${total}&cu=INR&tn=Invoice-${data.invoiceNumber}`;
      
      // Calculate positioning for QR code with better spacing
      const qrSize = 36; // Larger QR code
      const qrX = qrBoxX + (qrBoxWidth - qrSize) / 2;
      const qrY = startY + 22;
      
      // Add QR code with larger dimensions
      const qrDataUrl = data._qrCodeDataUrl; // Use cached QR code if available
      if (qrDataUrl) {
        doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);
      }
    } catch (error) {
      console.error("Failed to add QR code:", error);
    }
    }
  }
  
// Helper function to add footer to each page
function addFooter(doc: jsPDF, pageNumber: number, invoiceNumber: string, 
                  invoiceDate: string, clientName: string, totalPages: number) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const footerHeight = 25;
  
  // Add extra padding to ensure space between content and footer
  const footerY = pageHeight - footerHeight;
  
  // Footer background - make it more prominent with a darker shade
  doc.setFillColor(215, 210, 235); // Slightly darker purple background
  doc.rect(0, footerY, pageWidth, footerHeight, 'F');
  
  // Footer content with consistent font sizing
  doc.setFontSize(9);  // Consistent size for all footer text
  doc.setTextColor(100, 100, 100); // Consistent color
  doc.setFont(undefined, 'normal'); // Start with normal font
  
  // Left side footer info
  doc.text(`Invoice No ${invoiceNumber}`, margin, footerY + 7);
  doc.text(`${invoiceDate}`, margin, footerY + 14);
  doc.text(`${clientName}`, margin, footerY + 20);
  
  // Center footer info
  doc.text("This is an electronically generated document, no signature is required.", 
           pageWidth/2, footerY + 14, { align: 'center' });
  
  // Right side footer with page numbers and powered by info
  doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin, footerY + 7, { align: 'right' });
  
  // Add "Powered by" text - consistent styling
  doc.setTextColor(85, 55, 155);
  doc.text("Powered by", pageWidth - margin - 50, footerY + 20);
  doc.setFont(undefined, 'bold');
  doc.text("Invoice Generator", pageWidth - margin, footerY + 20, { align: 'right' });
}

// Helper function to convert number to words (completely rewritten)
function numberToWords(num: number): string {
  const ones = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
  const tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
  
  function convertLessThanOneThousand(n: number): string {
    if (n === 0) return '';
    
    if (n < 20) {
      return ones[n];
    }
    
    const digit = n % 10;
    const ten = Math.floor(n / 10) % 10;
    const hundred = Math.floor(n / 100);
    
    let result = '';
    
    if (hundred > 0) {
      result += ones[hundred] + ' HUNDRED';
      if (n % 100 !== 0) {
        result += ' AND ';
      }
    }
    
    if (n % 100 < 20 && n % 100 > 0) {
      result += ones[n % 100];
    } else if (ten > 0) {
      result += tens[ten];
      if (digit > 0) {
        result += ' ' + ones[digit];
      }
    }
    
    return result;
  }
  
  if (num === 0) return 'ZERO';
  
  // Split integer and decimal parts
  const numStr = num.toFixed(2);
  const [integerStr, decimalStr] = numStr.split('.');
  let integerValue = parseInt(integerStr);
  const decimal = parseInt(decimalStr);
  
  let result = '';
  
  // Process crores (10,000,000)
  const crore = Math.floor(integerValue / 10000000);
  if (crore > 0) {
    result += convertLessThanOneThousand(crore) + ' CRORE ';
    integerValue %= 10000000;
  }
  
  // Process lakhs (100,000)
  const lakh = Math.floor(integerValue / 100000);
  if (lakh > 0) {
    result += convertLessThanOneThousand(lakh) + ' LAKH ';
    integerValue %= 100000;
  }
  
  // Process thousands
  const thousand = Math.floor(integerValue / 1000);
  if (thousand > 0) {
    result += convertLessThanOneThousand(thousand) + ' THOUSAND ';
    integerValue %= 1000;
  }
  
  // Process hundreds, tens and ones
  if (integerValue > 0) {
    if (result !== '') {
      result += ' ';
    }
    result += convertLessThanOneThousand(integerValue);
  }
  
  // Add decimal part if non-zero
  if (decimal > 0) {
    result += ' POINT ' + convertLessThanOneThousand(decimal);
  }
  
  return result.trim();
}

export const saveInvoicePDF = async (data: InvoiceData) => {
  // Pre-generate QR code if needed
  if (data.showQRCode && data.bankDetails.upiId) {
    try {
      const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
      const tax = subtotal * (data.taxRate / 100);
      const total = subtotal + tax;
      
      const upiUrl = `upi://pay?pa=${data.bankDetails.upiId}&pn=${encodeURIComponent(data.companyDetails.name)}&am=${total}&cu=INR&tn=Invoice-${data.invoiceNumber}`;
      const qrDataUrl = await generateQRCodeDataURL(upiUrl);
      data._qrCodeDataUrl = qrDataUrl;
    } catch (error) {
      console.error("Failed to pre-generate QR code:", error);
    }
  }
  
  const doc = await generateInvoicePDF(data);
  doc.save(`Invoice-${data.invoiceNumber}.pdf`);
};

export const openInvoicePDF = async (data: InvoiceData) => {
  // Pre-generate QR code if needed
  if (data.showQRCode && data.bankDetails.upiId) {
    try {
      const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
      const tax = subtotal * (data.taxRate / 100);
      const total = subtotal + tax;
      
      const upiUrl = `upi://pay?pa=${data.bankDetails.upiId}&pn=${encodeURIComponent(data.companyDetails.name)}&am=${total}&cu=INR&tn=Invoice-${data.invoiceNumber}`;
      const qrDataUrl = await generateQRCodeDataURL(upiUrl);
      data._qrCodeDataUrl = qrDataUrl;
    } catch (error) {
      console.error("Failed to pre-generate QR code:", error);
    }
  }
  
  const doc = await generateInvoicePDF(data);
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
};
