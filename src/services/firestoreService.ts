import { db } from '@/lib/firebase';
import { InvoiceData } from '@/types/invoice';
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';

// Collection names
const INVOICES_COLLECTION = 'invoices';
const CLIENTS_COLLECTION = 'clients';

// Invoice operations
export const saveInvoice = async (invoice: InvoiceData, userId: string): Promise<string> => {
  try {
    // Add userId to the invoice data
    const invoiceWithUser = { ...invoice, userId, createdAt: new Date() };
    const docRef = await addDoc(collection(db, INVOICES_COLLECTION), invoiceWithUser);
    return docRef.id;
  } catch (error) {
    console.error('Error saving invoice:', error);
    throw error;
  }
};

// Function to get the last invoice number for sequential numbering
export const getLastInvoiceNumber = async (userId: string): Promise<string | null> => {
  try {
    // Create a query to get the most recent invoice for this user
    const q = query(
      collection(db, INVOICES_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const lastInvoice = querySnapshot.docs[0].data() as InvoiceData;
      return lastInvoice.invoiceNumber || null;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching last invoice number:', error);
    return null;
  }
};

export const getInvoicesByUser = async (userId: string): Promise<InvoiceData[]> => {
  try {
    // Check if Firestore is initialized
    if (!db) {
      console.error('Firestore is not initialized');
      return [];
    }

    const q = query(collection(db, INVOICES_COLLECTION), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const invoices: InvoiceData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as InvoiceData;
      invoices.push({
        ...data,
        id: doc.id, // Add document ID to the invoice data
      });
    });
    
    return invoices;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    // Return empty array instead of throwing error
    return [];
  }
};

export const getInvoiceById = async (invoiceId: string): Promise<InvoiceData | null> => {
  try {
    const docRef = doc(db, INVOICES_COLLECTION, invoiceId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { ...docSnap.data() as InvoiceData, id: docSnap.id };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching invoice:', error);
    throw error;
  }
};

export const updateInvoice = async (invoiceId: string, invoiceData: Partial<InvoiceData>): Promise<void> => {
  try {
    const docRef = doc(db, INVOICES_COLLECTION, invoiceId);
    await updateDoc(docRef, { ...invoiceData, updatedAt: new Date() });
  } catch (error) {
    console.error('Error updating invoice:', error);
    throw error;
  }
};

export const deleteInvoice = async (invoiceId: string): Promise<void> => {
  try {
    const docRef = doc(db, INVOICES_COLLECTION, invoiceId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting invoice:', error);
    throw error;
  }
};

// Client operations
export type ClientData = {
  id?: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  taxId?: string;
  userId: string;
  createdAt?: Date;
};

export const saveClient = async (clientData: ClientData): Promise<string> => {
  try {
    const clientWithTimestamp = { ...clientData, createdAt: new Date() };
    const docRef = await addDoc(collection(db, CLIENTS_COLLECTION), clientWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error saving client:', error);
    throw error;
  }
};

export const getClientsByUser = async (userId: string): Promise<ClientData[]> => {
  try {
    const q = query(collection(db, CLIENTS_COLLECTION), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const clients: ClientData[] = [];
    querySnapshot.forEach((doc) => {
      clients.push({
        ...doc.data() as ClientData,
        id: doc.id,
      });
    });
    
    return clients;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
}; 