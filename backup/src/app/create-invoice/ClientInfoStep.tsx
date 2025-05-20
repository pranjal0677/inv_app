'use client';

import React from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';

export default function ClientInfoStep() {
  const { invoice, setInvoiceDetails } = useInvoiceStore();
  const clientInfo = invoice.client;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInvoiceDetails({
      client: {
        ...clientInfo,
        [name]: value
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-6 text-primary">Client Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name or Business Name *
          </label>
          <input
            type="text"
            name="name"
            value={clientInfo.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter client name"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={clientInfo.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter street address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={clientInfo.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter city"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            name="state"
            value={clientInfo.state}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter state/province"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            name="country"
            value={clientInfo.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Singapore">Singapore</option>
            <option value="Australia">Australia</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pincode
          </label>
          <input
            type="text"
            name="pincode"
            value={clientInfo.pincode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter zip/postal code"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={clientInfo.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="client@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={clientInfo.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="+91 1234567890"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GSTIN (if applicable)
          </label>
          <input
            type="text"
            name="gstin"
            value={clientInfo.gstin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter client's GSTIN"
          />
          <p className="mt-1 text-xs text-gray-500">For B2B clients in India, GST registration number is required for proper tax compliance.</p>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Place of Supply
          </label>
          <input
            type="text"
            name="placeOfSupply"
            value={invoice.placeOfSupply || ''}
            onChange={(e) => setInvoiceDetails({ placeOfSupply: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter place of supply"
          />
          <p className="mt-1 text-xs text-gray-500">Required for GST-registered businesses in India.</p>
        </div>
      </div>
    </div>
  );
} 