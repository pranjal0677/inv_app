'use client';

import React, { useState, useEffect } from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';
import { generateInvoiceNumber } from '@/utils/helpers';

export default function WithStorePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { setInvoiceDetails, invoice } = useInvoiceStore();

  useEffect(() => {
    try {
      setInvoiceDetails({
        invoiceNumber: generateInvoiceNumber(),
        invoiceDate: new Date(),
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      });
    } catch (error) {
      console.error('Error initializing invoice:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setInvoiceDetails]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8" style={{ backgroundColor: '#f3f4f6' }}>
      <h1 className="text-3xl font-bold text-black" style={{ color: '#000000' }}>
        Invoice Generator
      </h1>
      <p className="mt-4 text-black" style={{ color: '#000000' }}>
        Invoice Number: {invoice.invoiceNumber}
      </p>
    </div>
  );
} 