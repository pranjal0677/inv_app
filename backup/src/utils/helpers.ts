import { format } from 'date-fns';
import { Invoice } from "@/types/invoice";

/**
 * Format a number as currency (INR)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Generate a unique invoice number
 */
export const generateInvoiceNumber = (prefix: string = 'INV'): string => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  
  return `${prefix}-${year}${month}-${randomDigits}`;
};

/**
 * Helper function to trigger PDF download
 */
export const downloadInvoice = (invoice: Invoice): void => {
  // This is a wrapper function to trigger the PDF download
  // The actual download is handled by the PDFDownload component in InvoicePDF.tsx
  const downloadLink = document.getElementById('download-pdf-link');
  if (downloadLink) {
    downloadLink.click();
  } else {
    console.error('Download link not found');
  }
};

/**
 * Format date as a string in the format DD/MM/YYYY
 */
export const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Check if a field is valid before PDF generation
 */
export const validateInvoice = (invoice: Invoice): boolean => {
  // Check required fields
  if (!invoice.invoiceNumber || !invoice.company.name || !invoice.client.name || invoice.items.length === 0) {
    return false;
  }
  
  return true;
};

export const calculateGST = (amount: number, rate: number): number => {
  return (amount * rate) / 100;
};

export const numberToWords = (num: number): string => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  const convertLessThanOneThousand = (n: number): string => {
    if (n === 0) return '';

    if (n < 10) return ones[n];

    if (n < 20) return teens[n - 10];

    if (n < 100) {
      return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
    }

    return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertLessThanOneThousand(n % 100) : '');
  };

  if (num === 0) return 'Zero';

  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const remaining = num % 1000;

  let result = '';

  if (crore > 0) {
    result += convertLessThanOneThousand(crore) + ' Crore ';
  }
  if (lakh > 0) {
    result += convertLessThanOneThousand(lakh) + ' Lakh ';
  }
  if (thousand > 0) {
    result += convertLessThanOneThousand(thousand) + ' Thousand ';
  }
  if (remaining > 0) {
    result += convertLessThanOneThousand(remaining);
  }

  return result.trim() + ' Rupees Only';
}; 