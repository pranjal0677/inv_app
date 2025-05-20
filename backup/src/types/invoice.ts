export interface Client {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  email: string;
  phone: string;
  gstin: string;
}

export interface Company {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  email: string;
  phone: string;
  gstin: string;
  pan: string;
  logo?: File | null;
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  accountType: string;
  upiId?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  hsnCode: string;
  rate: number;
  gstRate: number;
  amount: number;
  cgst: number;
  sgst: number;
  total: number;
}

export interface Invoice {
  id?: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  placeOfSupply?: string;
  company: Company;
  client: Client;
  items: InvoiceItem[];
  bankDetails?: BankDetails;
  subtotal: number;
  cgst: number;
  sgst: number;
  total: number;
  template?: string;
  primaryColor?: string;
  notes?: string;
  termsAndConditions?: string;
} 