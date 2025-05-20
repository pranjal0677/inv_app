import React from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';

const CompanyForm: React.FC = () => {
  const { invoice, setInvoiceDetails } = useInvoiceStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceDetails({
      company: {
        ...(invoice.company || {}),
        [name]: value,
      },
    });
  };

  return (
    <div className="grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-4">
        <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          name="name"
          id="company-name"
          value={invoice.company?.name || ''}
          onChange={handleChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="col-span-6">
        <label htmlFor="company-address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          name="address"
          id="company-address"
          value={invoice.company?.address || ''}
          onChange={handleChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="col-span-6 sm:col-span-2">
        <label htmlFor="company-city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <input
          type="text"
          name="city"
          id="company-city"
          value={invoice.company?.city || ''}
          onChange={handleChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="col-span-6 sm:col-span-2">
        <label htmlFor="company-state" className="block text-sm font-medium text-gray-700">
          State
        </label>
        <input
          type="text"
          name="state"
          id="company-state"
          value={invoice.company?.state || ''}
          onChange={handleChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="col-span-6 sm:col-span-2">
        <label htmlFor="company-country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <input
          type="text"
          name="country"
          id="company-country"
          value={invoice.company?.country || ''}
          onChange={handleChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="company-gstin" className="block text-sm font-medium text-gray-700">
          GSTIN
        </label>
        <input
          type="text"
          name="gstin"
          id="company-gstin"
          value={invoice.company?.gstin || ''}
          onChange={handleChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="company-pan" className="block text-sm font-medium text-gray-700">
          PAN
        </label>
        <input
          type="text"
          name="pan"
          id="company-pan"
          value={invoice.company?.pan || ''}
          onChange={handleChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default CompanyForm; 