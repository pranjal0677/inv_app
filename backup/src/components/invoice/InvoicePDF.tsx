'use client';

import React from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';
import { formatCurrency, formatDate } from '@/utils/helpers';
import Image from 'next/image';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { Invoice } from '@/types/invoice';
import { numberToWords } from '@/utils/helpers';

interface InvoicePDFProps {
  invoice: Invoice;
}

// Register font
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeAmM.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiJ-Ek-_EeAmM.woff2', fontWeight: 700 }
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 10,
    fontFamily: 'Inter',
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#8956FF',
    padding: 30,
    paddingBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  invoiceInfoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  invoiceInfoLabel: {
    color: 'white',
    width: 100,
    fontWeight: 'bold',
  },
  invoiceInfoValue: {
    color: 'white',
    flex: 1,
  },
  billingSection: {
    padding: 30,
    paddingTop: 40,
    paddingBottom: 40,
    flexDirection: 'row',
    backgroundColor: '#F9F7FF',
  },
  billingBox: {
    width: '48%',
    padding: 15,
    borderRadius: 4,
    marginRight: '4%',
  },
  billingTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#8956FF',
    marginBottom: 12,
  },
  billingText: {
    marginBottom: 5,
    fontSize: 11,
    color: '#333333',
  },
  billingLabelText: {
    marginBottom: 5,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#555555',
  },
  supplyInfo: {
    padding: '0 30px',
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  supplyBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    width: '48%',
    backgroundColor: '#FFFFFF',
  },
  tableContainer: {
    margin: '0 30px',
    marginBottom: 30,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#8956FF',
  },
  tableHeaderCell: {
    padding: 12,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 11,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#FFFFFF',
  },
  tableRowAlternate: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#F9F7FF',
  },
  tableCell: {
    padding: 10,
    textAlign: 'left',
    fontSize: 10.5,
    color: '#333333',
  },
  itemDesc: {
    width: '35%',
  },
  itemHsn: {
    width: '15%',
  },
  itemRate: {
    width: '12%',
    textAlign: 'right',
  },
  itemGst: {
    width: '8%',
    textAlign: 'center',
  },
  itemCgst: {
    width: '10%',
    textAlign: 'right',
  },
  itemSgst: {
    width: '10%',
    textAlign: 'right',
  },
  itemTotal: {
    width: '10%',
    textAlign: 'right',
  },
  totalSection: {
    margin: '0 30px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  totalWords: {
    width: '60%',
    padding: 15,
    border: '1px solid #e5e7eb',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  totalTable: {
    width: '35%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  totalRowFinal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#8956FF',
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontWeight: 'bold',
  },
  totalLabel: {
    textAlign: 'left',
    fontSize: 11,
  },
  totalValue: {
    textAlign: 'right',
    fontSize: 11,
  },
  totalLabelFinal: {
    textAlign: 'left',
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  totalValueFinal: {
    textAlign: 'right',
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  paymentSection: {
    margin: '0 30px',
    flexDirection: 'row',
    marginBottom: 30,
  },
  bankDetails: {
    width: '60%',
    padding: 15,
    border: '1px solid #e5e7eb',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bankDetailsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#8956FF',
  },
  bankDetailsRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bankDetailsLabel: {
    width: 130,
    fontWeight: 'bold',
    fontSize: 11,
    color: '#555555',
  },
  bankDetailsValue: {
    fontSize: 11,
    color: '#333333',
  },
  upiSection: {
    width: '35%',
    marginLeft: '5%',
    padding: 15,
    border: '1px solid #e5e7eb',
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  termsSection: {
    margin: '0 30px',
    padding: 15,
    border: '1px solid #e5e7eb',
    borderRadius: 4,
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
  },
  termsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#8956FF',
  },
  termsText: {
    fontSize: 10,
    color: '#555555',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 15,
    fontSize: 9,
    color: '#9CA3AF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerSignature: {
    position: 'absolute',
    bottom: 80,
    right: 30,
    width: '35%',
    textAlign: 'center',
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#8956FF',
    marginBottom: 5,
    paddingBottom: 5,
  },
  signatureText: {
    fontSize: 10,
    textAlign: 'center',
    color: '#555555',
  },
});

const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoice }) => {
  const { company, client, items, bankDetails } = invoice;
  
  // For logo display if available
  const [logoUrl, setLogoUrl] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    if (company.logo && company.logo instanceof File) {
      const url = URL.createObjectURL(company.logo);
      setLogoUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [company.logo]);

  // HTML version for preview
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg" style={{ color: '#333' }}>
      {/* Header */}
      <div className="bg-primary text-white p-8 rounded-t-lg">
        <h1 className="text-3xl font-bold mb-6">Invoice</h1>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm opacity-90 font-semibold mb-1">Invoice No #</p>
            <p className="font-medium">{invoice.invoiceNumber}</p>
          </div>
          <div>
            <p className="text-sm opacity-90 font-semibold mb-1">Invoice Date</p>
            <p className="font-medium">{new Date(invoice.invoiceDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
          </div>
          <div>
            <p className="text-sm opacity-90 font-semibold mb-1">Due Date</p>
            <p className="font-medium">{new Date(invoice.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
          </div>
        </div>
      </div>
      
      {/* Billing Info */}
      <div className="grid grid-cols-2 gap-8 py-12 px-8 bg-purple-light">
        <div className="rounded-md">
          <h2 className="font-bold text-primary text-xl mb-4">Billed By</h2>
          <p className="font-medium text-lg">{company.name}</p>
          <p className="text-gray-700">{company.address}</p>
          <p className="text-gray-700">{company.city}, {company.state}</p>
          <p className="text-gray-700">{company.country}</p>
          <div className="mt-4">
            <p><span className="font-medium text-gray-600">GSTIN:</span> {company.gstin || 'N/A'}</p>
            <p><span className="font-medium text-gray-600">PAN:</span> {company.pan || 'N/A'}</p>
          </div>
        </div>
        <div className="rounded-md">
          <h2 className="font-bold text-primary text-xl mb-4">Billed To</h2>
          <p className="font-medium text-lg">{client.name}</p>
          <p className="text-gray-700">{client.address}</p>
          <p className="text-gray-700">{client.city}, {client.state}</p>
          <p className="text-gray-700">{client.country}</p>
          <div className="mt-4">
            <p><span className="font-medium text-gray-600">GSTIN:</span> {client.gstin || 'N/A'}</p>
          </div>
        </div>
      </div>
      
      {/* Supply Info */}
      <div className="grid grid-cols-2 gap-8 px-8 pb-6">
        <div className="border border-gray-200 p-3 rounded-md bg-white">
          <p>Country of Supply: {client.country}</p>
        </div>
        <div className="border border-gray-200 p-3 rounded-md bg-white">
          <p>Place of Supply: {invoice.placeOfSupply || client.state}</p>
        </div>
      </div>
      
      {/* Items Table */}
      <div className="px-8 mb-8">
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-left p-4 rounded-tl-md">Item</th>
                <th className="text-left p-4">HSN/SAC</th>
                <th className="text-right p-4">Rate</th>
                <th className="text-center p-4">GST %</th>
                <th className="text-right p-4">CGST</th>
                <th className="text-right p-4">SGST</th>
                <th className="text-right p-4 rounded-tr-md">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-purple-light bg-opacity-30'}`}>
                  <td className="p-3">{item.description}</td>
                  <td className="p-3">{item.hsnCode}</td>
                  <td className="text-right p-3">{formatCurrency(item.rate)}</td>
                  <td className="text-center p-3">{item.gstRate}%</td>
                  <td className="text-right p-3">{formatCurrency(item.cgst)}</td>
                  <td className="text-right p-3">{formatCurrency(item.sgst)}</td>
                  <td className="text-right p-3">{formatCurrency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Totals */}
      <div className="flex justify-between px-8 mb-8">
        <div className="w-1/2 border border-gray-200 p-4 rounded-md bg-white mr-8">
          <p className="font-medium mb-1">Total (in words):</p>
          <p className="text-gray-700">{numberToWords(Math.round(invoice.total))}</p>
        </div>
        
        <div className="w-1/3 border border-gray-200 rounded-md overflow-hidden">
          <div className="flex justify-between border-b border-gray-200 py-3 px-4 bg-white">
            <span>Amount</span>
            <span>{formatCurrency(invoice.subtotal)}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-3 px-4 bg-white">
            <span>CGST</span>
            <span>{formatCurrency(invoice.cgst)}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 py-3 px-4 bg-white">
            <span>SGST</span>
            <span>{formatCurrency(invoice.sgst)}</span>
          </div>
          <div className="flex justify-between font-bold bg-primary text-white py-4 px-4">
            <span>Total (INR)</span>
            <span>{formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>
      
      {/* Bank Details and UPI */}
      {bankDetails && (
        <div className="flex justify-between px-8 mb-8">
          <div className="w-3/5 border border-gray-200 p-5 rounded-md bg-white mr-8">
            <h3 className="font-bold text-primary text-lg mb-4">Bank Details</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="font-medium text-gray-600">Account Name</div>
              <div>{bankDetails.accountName}</div>
              
              <div className="font-medium text-gray-600">Account Number</div>
              <div>{bankDetails.accountNumber}</div>
              
              <div className="font-medium text-gray-600">IFSC</div>
              <div>{bankDetails.ifscCode}</div>
              
              <div className="font-medium text-gray-600">Account Type</div>
              <div>{bankDetails.accountType}</div>
              
              <div className="font-medium text-gray-600">Bank</div>
              <div>{bankDetails.bankName}</div>
            </div>
          </div>
          
          {bankDetails.upiId && (
            <div className="w-1/3 border border-gray-200 p-5 rounded-md text-center bg-white">
              <h3 className="font-bold text-primary text-lg mb-2">UPI - Scan to Pay</h3>
              <p className="text-sm">(Maximum of 1 Lakh can</p>
              <p className="text-sm mb-6">be transferred via UPI)</p>
              <p className="font-medium text-xl">{bankDetails.upiId}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Terms */}
      {invoice.termsAndConditions && (
        <div className="border border-gray-200 p-5 rounded-md bg-white px-8 mb-8">
          <h3 className="font-bold text-primary text-lg mb-3">Terms and Conditions</h3>
          <div className="whitespace-pre-line text-gray-700">{invoice.termsAndConditions}</div>
        </div>
      )}
      
      {/* Signature */}
      <div className="flex justify-end px-8 mb-16">
        <div className="w-1/3 text-center">
          <div className="border-b-2 border-primary pb-2 mb-2"></div>
          <p className="text-gray-600">Authorized Signature</p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-gray-200 pt-6 mt-12 flex justify-between text-gray-500 text-sm px-8">
        <div>This is an electronically generated document, no signature is required.</div>
        <div>Page 1 of 1</div>
      </div>
    </div>
  );
};

// The actual PDF document component
const InvoicePDFDocument: React.FC<InvoicePDFProps> = ({ invoice }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Invoice</Text>
          
          <View style={styles.invoiceInfoRow}>
            <Text style={styles.invoiceInfoLabel}>Invoice No #</Text>
            <Text style={styles.invoiceInfoValue}>{invoice.invoiceNumber}</Text>
          </View>
          
          <View style={styles.invoiceInfoRow}>
            <Text style={styles.invoiceInfoLabel}>Invoice Date</Text>
            <Text style={styles.invoiceInfoValue}>{format(new Date(invoice.invoiceDate), 'MMM dd, yyyy')}</Text>
          </View>
          
          <View style={styles.invoiceInfoRow}>
            <Text style={styles.invoiceInfoLabel}>Due Date</Text>
            <Text style={styles.invoiceInfoValue}>{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</Text>
          </View>
        </View>

        {/* Billing Information */}
        <View style={styles.billingSection}>
          <View style={styles.billingBox}>
            <Text style={styles.billingTitle}>Billed By</Text>
            <Text style={styles.billingText}>{invoice.company.name}</Text>
            <Text style={styles.billingText}>{invoice.company.address}</Text>
            <Text style={styles.billingText}>{invoice.company.city}, {invoice.company.state}</Text>
            <Text style={styles.billingText}>{invoice.company.country}</Text>
            <Text style={styles.billingText}></Text>
            <Text style={styles.billingLabelText}>GSTIN: <Text style={styles.billingText}>{invoice.company.gstin || 'N/A'}</Text></Text>
            <Text style={styles.billingLabelText}>PAN: <Text style={styles.billingText}>{invoice.company.pan || 'N/A'}</Text></Text>
          </View>

          <View style={styles.billingBox}>
            <Text style={styles.billingTitle}>Billed To</Text>
            <Text style={styles.billingText}>{invoice.client.name}</Text>
            <Text style={styles.billingText}>{invoice.client.address}</Text>
            <Text style={styles.billingText}>{invoice.client.city}, {invoice.client.state}</Text>
            <Text style={styles.billingText}>{invoice.client.country}</Text>
            <Text style={styles.billingText}></Text>
            <Text style={styles.billingLabelText}>GSTIN: <Text style={styles.billingText}>{invoice.client.gstin || 'N/A'}</Text></Text>
          </View>
        </View>

        {/* Supply Information */}
        <View style={styles.supplyInfo}>
          <View style={styles.supplyBox}>
            <Text>Country of Supply: {invoice.client.country}</Text>
          </View>
          <View style={styles.supplyBox}>
            <Text>Place of Supply: {invoice.placeOfSupply || invoice.client.state}</Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.itemDesc]}>Item</Text>
              <Text style={[styles.tableHeaderCell, styles.itemHsn]}>HSN/SAC</Text>
              <Text style={[styles.tableHeaderCell, styles.itemRate]}>Rate</Text>
              <Text style={[styles.tableHeaderCell, styles.itemGst]}>GST %</Text>
              <Text style={[styles.tableHeaderCell, styles.itemCgst]}>CGST</Text>
              <Text style={[styles.tableHeaderCell, styles.itemSgst]}>SGST</Text>
              <Text style={[styles.tableHeaderCell, styles.itemTotal]}>Total</Text>
            </View>
            
            {/* Table Rows */}
            {invoice.items.map((item, index) => (
              <View key={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlternate}>
                <Text style={[styles.tableCell, styles.itemDesc]}>{item.description}</Text>
                <Text style={[styles.tableCell, styles.itemHsn]}>{item.hsnCode}</Text>
                <Text style={[styles.tableCell, styles.itemRate]}>{formatCurrency(item.rate)}</Text>
                <Text style={[styles.tableCell, styles.itemGst]}>{item.gstRate}%</Text>
                <Text style={[styles.tableCell, styles.itemCgst]}>{formatCurrency(item.cgst)}</Text>
                <Text style={[styles.tableCell, styles.itemSgst]}>{formatCurrency(item.sgst)}</Text>
                <Text style={[styles.tableCell, styles.itemTotal]}>{formatCurrency(item.total)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Totals Section */}
        <View style={styles.totalSection}>
          <View style={styles.totalWords}>
            <Text>Total (in words): {numberToWords(Math.round(invoice.total))}</Text>
          </View>
          
          <View style={styles.totalTable}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Amount</Text>
              <Text style={styles.totalValue}>{formatCurrency(invoice.subtotal)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>CGST</Text>
              <Text style={styles.totalValue}>{formatCurrency(invoice.cgst)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>SGST</Text>
              <Text style={styles.totalValue}>{formatCurrency(invoice.sgst)}</Text>
            </View>
            <View style={styles.totalRowFinal}>
              <Text style={styles.totalLabelFinal}>Total (INR)</Text>
              <Text style={styles.totalValueFinal}>{formatCurrency(invoice.total)}</Text>
            </View>
          </View>
        </View>

        {/* Bank Details */}
        {invoice.bankDetails && (
          <View style={styles.paymentSection}>
            <View style={styles.bankDetails}>
              <Text style={styles.bankDetailsTitle}>Bank Details</Text>
              
              <View style={styles.bankDetailsRow}>
                <Text style={styles.bankDetailsLabel}>Account Name</Text>
                <Text style={styles.bankDetailsValue}>{invoice.bankDetails.accountName}</Text>
              </View>
              
              <View style={styles.bankDetailsRow}>
                <Text style={styles.bankDetailsLabel}>Account Number</Text>
                <Text style={styles.bankDetailsValue}>{invoice.bankDetails.accountNumber}</Text>
              </View>
              
              <View style={styles.bankDetailsRow}>
                <Text style={styles.bankDetailsLabel}>IFSC</Text>
                <Text style={styles.bankDetailsValue}>{invoice.bankDetails.ifscCode}</Text>
              </View>
              
              <View style={styles.bankDetailsRow}>
                <Text style={styles.bankDetailsLabel}>Account Type</Text>
                <Text style={styles.bankDetailsValue}>{invoice.bankDetails.accountType}</Text>
              </View>
              
              <View style={styles.bankDetailsRow}>
                <Text style={styles.bankDetailsLabel}>Bank</Text>
                <Text style={styles.bankDetailsValue}>{invoice.bankDetails.bankName}</Text>
              </View>
            </View>
            
            {invoice.bankDetails.upiId && (
              <View style={styles.upiSection}>
                <Text style={styles.bankDetailsTitle}>UPI - Scan to Pay</Text>
                <Text style={{ marginBottom: 5 }}>(Maximum of 1 Lakh can</Text>
                <Text style={{ marginBottom: 15 }}>be transferred via UPI)</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{invoice.bankDetails.upiId}</Text>
              </View>
            )}
          </View>
        )}

        {/* Terms & Conditions */}
        {invoice.termsAndConditions && (
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>Terms and Conditions</Text>
            <Text style={styles.termsText}>{invoice.termsAndConditions}</Text>
          </View>
        )}

        {/* Signature Section */}
        <View style={styles.footerSignature}>
          <View style={styles.signatureLine}></View>
          <Text style={styles.signatureText}>Authorized Signature</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>This is an electronically generated document, no signature is required.</Text>
          <Text>Page 1 of 1</Text>
        </View>
      </Page>
    </Document>
  );
};

// Export for download usage
export const PDFDownload: React.FC<InvoicePDFProps> = ({ invoice }) => (
  <PDFDownloadLink 
    document={<InvoicePDFDocument invoice={invoice} />} 
    fileName={`Invoice-${invoice.invoiceNumber}.pdf`}
    style={{ textDecoration: 'none' }}
  >
    {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
  </PDFDownloadLink>
);

// Export for preview usage
export const PDFPreview: React.FC<InvoicePDFProps> = ({ invoice }) => (
  <PDFViewer style={{ width: '100%', height: '80vh' }}>
    <InvoicePDFDocument invoice={invoice} />
  </PDFViewer>
);

export default InvoicePDF; 