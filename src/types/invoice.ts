export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  hsnCode?: string;
}

export interface CompanyDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  pan?: string;
  logo?: string;
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  upiId: string;
}

export interface ClientDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  taxId?: string;
  pan?: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  /** @deprecated use clientDetails */
  clientName?: string;
  /** @deprecated use clientDetails */
  clientEmail?: string;
  /** @deprecated use clientDetails */
  clientAddress?: string;
  /** @deprecated use clientDetails */
  clientTaxId?: string;
  clientDetails?: ClientDetails;
  items: InvoiceItem[];
  notes: string;
  paymentTerms: string;
  taxRate: number;
  status?: "Paid" | "Pending" | "Overdue";
  currency: string;
  companyDetails: CompanyDetails;
  bankDetails: BankDetails;
  showQRCode?: boolean;
  countryOfSupply?: string;
  placeOfSupply?: string;
  termsAndConditions?: string;
  id?: string;
  createdAt?: Date;
  _qrCodeDataUrl?: string;
}

export interface SavedInvoice extends InvoiceData {
  id: string;
  createdAt: Date;
}
 