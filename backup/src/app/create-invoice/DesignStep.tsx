'use client';

import React, { useState } from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';
import { PDFDownload } from '@/components/invoice/InvoicePDF';
import EmailShareModal from '@/components/invoice/EmailShareModal';
import ShareLinkModal from '@/components/invoice/ShareLinkModal';

export default function DesignStep() {
  const { invoice, setInvoiceDetails } = useInvoiceStore();
  const [selectedTemplate, setSelectedTemplate] = useState(invoice.template || 'modern');
  const [primaryColor, setPrimaryColor] = useState(invoice.primaryColor || '#8956FF');
  const [showSavedTemplates, setShowSavedTemplates] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showShareLinkModal, setShowShareLinkModal] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
    setInvoiceDetails({ template });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setPrimaryColor(color);
    setInvoiceDetails({ primaryColor: color });
  };
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInvoiceDetails({ notes: e.target.value });
  };
  
  const handleTermsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInvoiceDetails({ termsAndConditions: e.target.value });
  };
  
  const loadSavedTemplate = () => {
    try {
      const templates = JSON.parse(localStorage.getItem('invoiceTemplates') || '[]');
      if (templates.length > 0) {
        setShowSavedTemplates(true);
      } else {
        alert('No saved templates found');
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };
  
  const applyTemplate = (template) => {
    if (template.company) {
      setInvoiceDetails({ 
        company: { ...template.company },
        bankDetails: template.bankDetails || {},
        template: template.template || 'modern',
        primaryColor: template.primaryColor || '#8956FF',
        termsAndConditions: template.termsAndConditions || ''
      });
      setSelectedTemplate(template.template || 'modern');
      setPrimaryColor(template.primaryColor || '#8956FF');
      setShowSavedTemplates(false);
    }
  };
  
  // Common terms and conditions templates
  const termsTemplates = [
    { 
      name: "Standard Terms", 
      content: "1. Payment due within 30 days of invoice date.\n2. Late payments are subject to a 2% monthly interest charge.\n3. All disputes must be raised within 7 days of invoice receipt.\n4. Prices are exclusive of applicable taxes."
    },
    { 
      name: "Consulting Services", 
      content: "1. Payment is due within 15 days of invoice date.\n2. Services provided as-is without warranty.\n3. Client owns all deliverables upon full payment.\n4. Consultant retains right to use non-confidential work examples in portfolio."
    },
    { 
      name: "Design & Development", 
      content: "1. 50% deposit required before work begins.\n2. Final payment due upon project completion.\n3. Up to 2 rounds of revisions included, additional revisions billed at hourly rate.\n4. Client must provide feedback within 7 business days."
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-medium mb-6 text-primary">Invoice Design & Details</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Design options */}
        <div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Invoice Template
              </label>
              <button 
                onClick={loadSavedTemplate}
                className="text-sm text-secondary hover:text-secondary-dark"
              >
                Load saved template
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['modern', 'classic', 'minimal'].map((template) => (
                <div 
                  key={template}
                  className={`border rounded-md p-4 cursor-pointer ${
                    selectedTemplate === template 
                      ? 'border-primary ring-2 ring-primary ring-opacity-50' 
                      : 'border-gray-300'
                  }`}
                  onClick={() => handleTemplateChange(template)}
                >
                  <div className="aspect-w-16 aspect-h-9 mb-2">
                    <div className={`w-full h-32 bg-gray-100 rounded flex items-center justify-center ${
                      template === 'modern' ? 'bg-gradient-to-br from-purple-light to-purple-medium' :
                      template === 'classic' ? 'bg-gradient-to-br from-orange-light to-orange-medium' :
                      'bg-white'
                    }`}>
                      <span className="text-sm text-gray-700 capitalize">{template}</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-800 capitalize text-center">{template}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center space-x-3">
              <input 
                type="color" 
                value={primaryColor} 
                onChange={handleColorChange}
                className="h-10 w-20 rounded border border-gray-300"
              />
              <span className="text-sm text-gray-600">{primaryColor}</span>
            </div>
          </div>
        </div>

        {/* Right column - Notes & Terms */}
        <div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Invoice Notes
              </label>
              <span className="text-xs text-gray-500">Optional</span>
            </div>
            <textarea
              value={invoice.notes || ''}
              onChange={handleNotesChange}
              placeholder="Add any notes for your client here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary h-24 text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              Notes will appear on your invoice but aren't legally binding.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Terms & Conditions
              </label>
              <div className="relative inline-block text-left">
                <select 
                  className="text-xs border-0 bg-transparent text-secondary cursor-pointer pr-8"
                  onChange={(e) => {
                    const template = termsTemplates.find(t => t.name === e.target.value);
                    if (template) {
                      setInvoiceDetails({ termsAndConditions: template.content });
                    }
                  }}
                  value=""
                >
                  <option value="" disabled>Apply template</option>
                  {termsTemplates.map(template => (
                    <option key={template.name} value={template.name}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <textarea
              value={invoice.termsAndConditions || ''}
              onChange={handleTermsChange}
              placeholder="Add your terms and conditions here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary h-40 text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter your payment terms, delivery conditions, and other legal terms.
            </p>
          </div>
        </div>
      </div>
      
      {/* Share Options */}
      <div className="border-t border-gray-200 pt-6 mt-8">
        <h3 className="text-lg font-medium mb-4 text-primary">Share Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            className="flex items-center justify-center space-x-2 border border-gray-300 rounded-md py-3 px-4 hover:bg-purple-light transition-colors group"
            onClick={() => document.getElementById('download-pdf-link')?.click()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary group-hover:text-primary-dark transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download PDF</span>
            <span className="hidden">
              <PDFDownload invoice={invoice} />
            </span>
          </button>
          <button 
            className="flex items-center justify-center space-x-2 border border-gray-300 rounded-md py-3 px-4 hover:bg-purple-light transition-colors"
            onClick={() => setShowEmailModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Email Invoice</span>
          </button>
          <button 
            className="flex items-center justify-center space-x-2 border border-gray-300 rounded-md py-3 px-4 hover:bg-purple-light transition-colors"
            onClick={() => setShowShareLinkModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Share Link</span>
          </button>
        </div>
      </div>
      
      {/* Hidden download link */}
      <div className="hidden" id="download-pdf-link">
        <PDFDownload invoice={invoice} />
      </div>

      {/* Template gallery modal */}
      {showSavedTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-primary">Saved Templates</h3>
              <button onClick={() => setShowSavedTemplates(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {(() => {
                try {
                  const templates = JSON.parse(localStorage.getItem('invoiceTemplates') || '[]');
                  return templates.length > 0 ? (
                    templates.map((template, index) => (
                      <div 
                        key={index} 
                        className="border border-gray-200 rounded-md p-4 mb-2 hover:bg-purple-light cursor-pointer"
                        onClick={() => applyTemplate(template)}
                      >
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-gray-500">
                          {template.company?.name || 'Unnamed template'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-center py-4">No saved templates found</div>
                  );
                } catch (error) {
                  return <div className="text-red-500 text-center py-4">Error loading templates</div>;
                }
              })()}
            </div>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setShowSavedTemplates(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Email sharing modal */}
      <EmailShareModal 
        invoice={invoice}
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
      />
      
      {/* Share link modal */}
      <ShareLinkModal
        invoice={invoice}
        isOpen={showShareLinkModal}
        onClose={() => setShowShareLinkModal(false)}
      />
    </div>
  );
} 