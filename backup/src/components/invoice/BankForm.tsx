import React from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';
import { QRCodeSVG } from 'qrcode.react';
import { BankDetails } from '@/types/invoice';

const BankForm: React.FC = () => {
  const { invoice, setInvoiceDetails } = useInvoiceStore();
  const [isCopied, setIsCopied] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedBankDetails: Partial<BankDetails> = {
      ...(invoice.bankDetails || {}),
      [name]: value,
    };
    setInvoiceDetails({
      bankDetails: updatedBankDetails as BankDetails,
    });
  };

  const copyUpiId = () => {
    if (invoice.bankDetails?.upiId) {
      navigator.clipboard.writeText(invoice.bankDetails.upiId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const predefinedBanks = [
    { name: 'State Bank of India', ifscPrefix: 'SBIN' },
    { name: 'HDFC Bank', ifscPrefix: 'HDFC' },
    { name: 'ICICI Bank', ifscPrefix: 'ICIC' },
    { name: 'Axis Bank', ifscPrefix: 'UTIB' },
    { name: 'Punjab National Bank', ifscPrefix: 'PUNB' },
    { name: 'Bank of Baroda', ifscPrefix: 'BARB' },
    { name: 'Kotak Mahindra Bank', ifscPrefix: 'KKBK' },
    { name: 'Yes Bank', ifscPrefix: 'YESB' },
  ];

  const selectBank = (bankName: string, ifscPrefix: string) => {
    const updatedBankDetails: Partial<BankDetails> = {
      ...(invoice.bankDetails || {}),
      bankName,
    };
    setInvoiceDetails({
      bankDetails: updatedBankDetails as BankDetails,
    });
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-primary mb-4">Enter your bank account details</h3>
      
      {/* Bank selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Common Banks
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {predefinedBanks.map((bank) => (
            <button
              key={bank.name}
              type="button"
              onClick={() => selectBank(bank.name, bank.ifscPrefix)}
              className={`py-2 px-3 text-sm rounded-md border ${
                invoice.bankDetails?.bankName === bank.name
                  ? 'border-primary bg-purple-light text-primary'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {bank.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="account-name" className="block text-sm font-medium text-gray-700">
            Account Name
          </label>
          <input
            type="text"
            name="accountName"
            id="account-name"
            value={invoice.bankDetails?.accountName || ''}
            onChange={handleChange}
            className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="account-number" className="block text-sm font-medium text-gray-700">
            Account Number
          </label>
          <input
            type="text"
            name="accountNumber"
            id="account-number"
            value={invoice.bankDetails?.accountNumber || ''}
            onChange={handleChange}
            className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="bank-name" className="block text-sm font-medium text-gray-700">
            Bank Name
          </label>
          <input
            type="text"
            name="bankName"
            id="bank-name"
            value={invoice.bankDetails?.bankName || ''}
            onChange={handleChange}
            className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="ifsc-code" className="block text-sm font-medium text-gray-700">
            IFSC Code
          </label>
          <input
            type="text"
            name="ifscCode"
            id="ifsc-code"
            value={invoice.bankDetails?.ifscCode || ''}
            onChange={handleChange}
            className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="account-type" className="block text-sm font-medium text-gray-700">
            Account Type
          </label>
          <select
            id="account-type"
            name="accountType"
            value={invoice.bankDetails?.accountType || ''}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option value="">Select type</option>
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
          </select>
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700">
            UPI ID
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="upiId"
              id="upi-id"
              value={invoice.bankDetails?.upiId || ''}
              onChange={handleChange}
              placeholder="yourname@upi"
              className="focus:ring-primary focus:border-primary flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
            />
            <button
              type="button"
              onClick={copyUpiId}
              disabled={!invoice.bankDetails?.upiId}
              className={`inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md text-sm ${
                isCopied ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {invoice.bankDetails?.upiId && (
          <div className="col-span-6 flex flex-col items-center">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-purple-light">
              <QRCodeSVG 
                value={`upi://pay?pa=${invoice.bankDetails.upiId}&pn=${invoice.company.name || 'Invoice Payment'}`} 
                size={150} 
                bgColor="#FFFFFF"
                fgColor="#8956FF"
                level="L"
                includeMargin={true}
              />
              <p className="mt-2 text-sm text-gray-600 text-center">Scan to pay via UPI</p>
              <p className="text-xs text-primary font-medium text-center">{invoice.bankDetails.upiId}</p>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              The QR code will be included in your invoice to facilitate easy payments
            </div>
          </div>
        )}
        
        <div className="col-span-6 mt-4">
          <div className="bg-orange-light p-4 rounded-md">
            <h4 className="text-sm font-medium text-secondary">Payment Details Will Appear On Your Invoice</h4>
            <p className="text-xs text-gray-600 mt-1">
              These details will help your clients make payments to you directly via bank transfer or UPI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankForm; 