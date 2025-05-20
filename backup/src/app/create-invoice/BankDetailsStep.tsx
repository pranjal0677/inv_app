'use client';

import React, { useState } from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';
import { QRCodeSVG } from 'qrcode.react';

export default function BankDetailsStep() {
  const { invoice, setInvoiceDetails } = useInvoiceStore();
  const [showQrCode, setShowQrCode] = useState(false);
  
  // Either use existing bank details or initialize with empty object
  const bankDetails = invoice.bankDetails || {
    accountName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    accountType: 'Savings',
    upiId: ''
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInvoiceDetails({
      bankDetails: {
        ...bankDetails,
        [name]: value
      }
    });
  };

  // Popular Indian banks for quick selection
  const popularBanks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Kotak Mahindra Bank',
    'Yes Bank',
    'IndusInd Bank',
    'Federal Bank',
  ];

  return (
    <div>
      <h2 className="text-xl font-medium mb-6 text-primary">Payment Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Holder Name
          </label>
          <input
            type="text"
            name="accountName"
            value={bankDetails.accountName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter account holder name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Number
          </label>
          <input
            type="text"
            name="accountNumber"
            value={bankDetails.accountNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter account number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Type
          </label>
          <select
            name="accountType"
            value={bankDetails.accountType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
            <option value="Salary">Salary</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bank Name
          </label>
          <div className="relative">
            <input
              list="bank-list"
              type="text"
              name="bankName"
              value={bankDetails.bankName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Select or enter bank name"
            />
            <datalist id="bank-list">
              {popularBanks.map((bank) => (
                <option key={bank} value={bank} />
              ))}
            </datalist>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            IFSC Code
          </label>
          <input
            type="text"
            name="ifscCode"
            value={bankDetails.ifscCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Enter IFSC code"
          />
        </div>

        <div className="col-span-2 border-t border-gray-200 pt-6 mt-2">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              UPI ID (Optional)
            </label>
            <button
              type="button"
              onClick={() => setShowQrCode(!!bankDetails.upiId)}
              className={`text-sm ${bankDetails.upiId ? 'text-primary' : 'text-gray-400'}`}
              disabled={!bankDetails.upiId}
            >
              {showQrCode ? 'Hide QR Code' : 'Show QR Code'}
            </button>
          </div>
          <div className="flex">
            <div className="flex-grow">
              <div className="flex items-center">
                <input
                  type="text"
                  name="upiId"
                  value={bankDetails.upiId || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="yourname@upi"
                />
                <button
                  type="button"
                  onClick={() => setShowQrCode(!!bankDetails.upiId)}
                  className={`ml-2 p-2 ${
                    bankDetails.upiId
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-gray-200 text-gray-400'
                  } rounded-md transition-colors`}
                  disabled={!bankDetails.upiId}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Adding a UPI ID allows clients to make instant payments using any UPI app.
              </p>
            </div>
            
            {showQrCode && bankDetails.upiId && (
              <div className="ml-4 border border-gray-200 rounded-md p-2 flex items-center justify-center bg-white">
                <QRCodeSVG
                  value={`upi://pay?pa=${bankDetails.upiId}&pn=${encodeURIComponent(bankDetails.accountName || invoice.company.name)}`}
                  size={120}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="H"
                  includeMargin={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 pt-6">
        <div className="bg-purple-light p-4 rounded-md">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 text-sm text-gray-700">
              <p>
                Payment details will appear on your invoice. This makes it easier for your clients to pay you directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 