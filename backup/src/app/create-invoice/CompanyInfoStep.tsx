'use client';

import React from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';

export default function CompanyInfoStep() {
  const { invoice, setInvoiceDetails } = useInvoiceStore();
  const companyInfo = invoice.company;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInvoiceDetails({
      company: {
        ...companyInfo,
        [name]: value
      }
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setInvoiceDetails({
        company: {
          ...companyInfo,
          logo: e.target.files[0]
        }
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-6">Company Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name *
          </label>
          <input
            type="text"
            name="name"
            value={companyInfo.name}
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
            value={companyInfo.address}
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
            value={companyInfo.city}
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
            value={companyInfo.state}
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
            value={companyInfo.country}
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
            value={companyInfo.pincode}
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
            value={companyInfo.email}
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
            value={companyInfo.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GSTIN
          </label>
          <input
            type="text"
            name="gstin"
            value={companyInfo.gstin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PAN
          </label>
          <input
            type="text"
            name="pan"
            value={companyInfo.pan}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Logo
          </label>
          <div className="flex items-center">
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={handleLogoChange}
              className="sr-only"
            />
            <label
              htmlFor="logo"
              className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Upload Logo
            </label>
            <span className="ml-3 text-sm text-gray-500">
              {companyInfo.logo ? companyInfo.logo.name : 'No file chosen'}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Recommended size: 300 x 300 pixels, Max: 1MB
          </p>
        </div>
      </div>
    </div>
  );
} 