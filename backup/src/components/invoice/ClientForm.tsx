import React from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';

const ClientForm: React.FC = () => {
  const { invoice, setInvoiceDetails } = useInvoiceStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInvoiceDetails({
      client: {
        ...invoice.client,
        [name]: value
      }
    });
  };

  const handleInvoiceDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInvoiceDetails({
      [name]: value
    });
  };

  return (
    <div>
      {/* Invoice Details */}
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="text-md font-medium mb-3">Invoice Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Number *
            </label>
            <input
              type="text"
              name="invoiceNumber"
              value={invoice.invoiceNumber || ''}
              onChange={handleInvoiceDetailsChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="INV-001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Date *
            </label>
            <input
              type="date"
              name="invoiceDate"
              value={invoice.invoiceDate || new Date().toISOString().split('T')[0]}
              onChange={handleInvoiceDetailsChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date *
            </label>
            <input
              type="date"
              name="dueDate"
              value={invoice.dueDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              onChange={handleInvoiceDetailsChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Place of Supply
            </label>
            <input
              type="text"
              name="placeOfSupply"
              value={invoice.placeOfSupply || ''}
              onChange={handleInvoiceDetailsChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>
      
      {/* Client Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name *
          </label>
          <input
            type="text"
            name="name"
            value={invoice.client?.name || ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={invoice.client?.address || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={invoice.client?.city || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            name="state"
            value={invoice.client?.state || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            name="country"
            value={invoice.client?.country || 'India'}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Singapore">Singapore</option>
            <option value="Australia">Australia</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pincode
          </label>
          <input
            type="text"
            name="pincode"
            value={invoice.client?.pincode || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={invoice.client?.email || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={invoice.client?.phone || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GST Number
          </label>
          <input
            type="text"
            name="gstin"
            value={invoice.client?.gstin || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
          <p className="text-xs text-gray-500 mt-1">
            If your client doesn't have a GST number, leave this field blank.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientForm; 