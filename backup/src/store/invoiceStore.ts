import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Invoice, InvoiceItem } from '@/types/invoice';

interface InvoiceState {
  invoice: Invoice;
  setInvoiceDetails: (details: Partial<Invoice>) => void;
  addItem: (item: Omit<InvoiceItem, 'id'>) => void;
  updateItem: (id: string, updates: Partial<InvoiceItem>) => void;
  removeItem: (id: string) => void;
  calculateTotals: () => void;
}

// Create initial invoice state
const initialInvoice: Invoice = {
  invoiceNumber: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  company: {
    name: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    email: '',
    phone: '',
    gstin: '',
    pan: '',
    logo: null
  },
  client: {
    name: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    email: '',
    phone: '',
    gstin: ''
  },
  items: [],
  subtotal: 0,
  cgst: 0,
  sgst: 0,
  total: 0,
  template: 'modern',
  primaryColor: '#3b82f6',
};

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
  invoice: initialInvoice,
  
  setInvoiceDetails: (details) => {
    set((state) => {
      // Handle nested objects like company and client
      const updatedInvoice = { ...state.invoice };
      
      Object.entries(details).forEach(([key, value]) => {
        if (key === 'company' || key === 'client' || key === 'bankDetails') {
          updatedInvoice[key] = {
            ...updatedInvoice[key],
            ...value
          };
        } else {
          updatedInvoice[key] = value;
        }
      });
      
      return { invoice: updatedInvoice };
    });
    
    // Recalculate totals if any changes affect the financial values
    if ('items' in details) {
      get().calculateTotals();
    }
  },
  
  addItem: (item) => {
    const newItem = {
      ...item,
      id: uuidv4()
    };
    
    set((state) => ({
      invoice: {
        ...state.invoice,
        items: [...state.invoice.items, newItem]
      }
    }));
    
    get().calculateTotals();
  },
  
  updateItem: (id, updates) => {
    set((state) => ({
      invoice: {
        ...state.invoice,
        items: state.invoice.items.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        )
      }
    }));
    
    get().calculateTotals();
  },
  
  removeItem: (id) => {
    set((state) => ({
      invoice: {
        ...state.invoice,
        items: state.invoice.items.filter((item) => item.id !== id)
      }
    }));
    
    get().calculateTotals();
  },
  
  calculateTotals: () => {
    set((state) => {
      const items = state.invoice.items;
      const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
      const cgst = items.reduce((sum, item) => sum + item.cgst, 0);
      const sgst = items.reduce((sum, item) => sum + item.sgst, 0);
      const total = items.reduce((sum, item) => sum + item.total, 0);
      
      return {
        invoice: {
          ...state.invoice,
          subtotal,
          cgst,
          sgst,
          total
        }
      };
    });
  }
})); 