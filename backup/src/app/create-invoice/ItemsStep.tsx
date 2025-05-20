'use client';

import React from 'react';
import ItemsForm from '@/components/invoice/ItemsForm';

export default function ItemsStep() {
  return (
    <div>
      <h2 className="text-xl font-medium mb-6 text-primary">Invoice Items</h2>
      <ItemsForm />
    </div>
  );
} 