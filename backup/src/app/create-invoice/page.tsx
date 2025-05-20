'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useInvoiceStore } from '@/store/invoiceStore';
import PreviewModal from '@/components/invoice/PreviewModal';
import { generateInvoiceNumber } from '@/utils/helpers';

// Step components
import CompanyInfoStep from './CompanyInfoStep';
import ClientInfoStep from './ClientInfoStep';
import ItemsStep from './ItemsStep';
import BankDetailsStep from './BankDetailsStep';
import DesignStep from './DesignStep';

export default function CreateInvoicePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(20);
  const [showPreview, setShowPreview] = useState(false);
  const [showSavedSuccess, setShowSavedSuccess] = useState(false);
  
  const { invoice, setInvoiceDetails } = useInvoiceStore();
  const totalSteps = 5;
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setProgress(((currentStep + 1) / totalSteps) * 100);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setProgress(((currentStep - 1) / totalSteps) * 100);
    }
  };
  
  const saveTemplate = () => {
    const templates = JSON.parse(localStorage.getItem('invoiceTemplates') || '[]');
    
    // Create template from current invoice
    const template = {
      id: `template-${Date.now()}`,
      name: `Template ${templates.length + 1}`,
      company: invoice.company,
      bankDetails: invoice.bankDetails,
      template: invoice.template,
      primaryColor: invoice.primaryColor,
      termsAndConditions: invoice.termsAndConditions
    };
    
    // Save to localStorage
    templates.push(template);
    localStorage.setItem('invoiceTemplates', JSON.stringify(templates));
    
    // Show success message
    setShowSavedSuccess(true);
    setTimeout(() => setShowSavedSuccess(false), 3000);
  };
  
  const generateNewInvoiceNumber = () => {
    const newInvoiceNumber = generateInvoiceNumber('INV');
    setInvoiceDetails({ invoiceNumber: newInvoiceNumber });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-purple text-transparent bg-clip-text">
              Invoice Generator
            </span>
          </Link>
          
          {/* Progress bar */}
          <div className="w-1/2 hidden md:block">
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-800">
                  Step {currentStep} of {totalSteps}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {progress}% Complete
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-1 text-xs flex rounded-full bg-gray-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-purple transition-all duration-300"
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              className="bg-white text-secondary border border-secondary px-4 py-2 rounded-lg hover:bg-secondary-bg transition-all"
              onClick={saveTemplate}
            >
              Save Template
            </button>
            <button
              className="bg-white text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary-bg transition-all"
              onClick={() => setShowPreview(true)}
            >
              Preview
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        {/* Success message */}
        {showSavedSuccess && (
          <div className="fixed top-24 right-6 bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-lg z-50 shadow-lg animate-fade-in-out">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Template saved successfully!</span>
            </div>
          </div>
        )}
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            {/* Quick actions */}
            <div className="mb-6 flex justify-end">
              <button
                onClick={generateNewInvoiceNumber}
                className="flex items-center text-sm text-secondary hover:text-secondary-dark transition-colors group"
              >
                <svg className="w-4 h-4 mr-1.5 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Generate New Invoice Number
              </button>
            </div>
            
            {/* Step indicators for mobile */}
            <div className="flex justify-between mb-10 md:hidden">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    step === currentStep
                      ? 'bg-primary text-white shadow-md'
                      : step < currentStep
                      ? 'bg-secondary text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step < currentStep ? '✓' : step}
                </div>
              ))}
            </div>
            
            {/* Step titles - visible on medium screens and up */}
            <div className="hidden md:flex justify-between mb-10 px-4">
              <div 
                className={`text-center cursor-pointer transition-colors ${currentStep === 1 ? 'text-primary font-medium' : currentStep > 1 ? 'text-secondary' : 'text-gray-500'}`}
                onClick={() => setCurrentStep(1)}
              >
                Company Info
              </div>
              <div 
                className={`text-center cursor-pointer transition-colors ${currentStep === 2 ? 'text-primary font-medium' : currentStep > 2 ? 'text-secondary' : 'text-gray-500'}`}
                onClick={() => currentStep > 1 && setCurrentStep(2)}
              >
                Client Info
              </div>
              <div 
                className={`text-center cursor-pointer transition-colors ${currentStep === 3 ? 'text-primary font-medium' : currentStep > 3 ? 'text-secondary' : 'text-gray-500'}`}
                onClick={() => currentStep > 2 && setCurrentStep(3)}
              >
                Items
              </div>
              <div 
                className={`text-center cursor-pointer transition-colors ${currentStep === 4 ? 'text-primary font-medium' : currentStep > 4 ? 'text-secondary' : 'text-gray-500'}`}
                onClick={() => currentStep > 3 && setCurrentStep(4)}
              >
                Bank Details
              </div>
              <div 
                className={`text-center cursor-pointer transition-colors ${currentStep === 5 ? 'text-primary font-medium' : 'text-gray-500'}`}
                onClick={() => currentStep > 4 && setCurrentStep(5)}
              >
                Design & Share
              </div>
            </div>
            
            {/* Step content */}
            <div className="mb-10">
              {currentStep === 1 && <CompanyInfoStep />}
              {currentStep === 2 && <ClientInfoStep />}
              {currentStep === 3 && <ItemsStep />}
              {currentStep === 4 && <BankDetailsStep />}
              {currentStep === 5 && <DesignStep />}
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className={`px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center ${
                  currentStep === 1 ? 'invisible' : 'visible'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              
              <button
                onClick={nextStep}
                className={`px-6 py-2.5 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all shadow-sm flex items-center ${
                  currentStep === totalSteps ? 'invisible' : 'visible'
                }`}
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {currentStep === totalSteps && (
                <button
                  className="px-6 py-2.5 bg-gradient-secondary text-white rounded-lg hover:opacity-90 transition-all shadow-sm flex items-center"
                  onClick={() => setShowPreview(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Generate Invoice
                </button>
              )}
            </div>
          </div>
          
          {/* Preview panel */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-primary">Invoice Preview</h2>
              <button 
                onClick={() => setShowPreview(true)}
                className="text-secondary hover:text-secondary-dark transition-colors flex items-center"
              >
                <span>Show Full Preview</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <div 
              className="border border-gray-200 rounded-lg p-6 h-64 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-primary-bg transition-colors"
              onClick={() => setShowPreview(true)}
            >
              {invoice.company.name && invoice.client?.name ? (
                <div className="text-center">
                  <p className="text-gray-700 mb-2">Click to view your invoice preview</p>
                  <p className="text-gray-500 text-sm">From: {invoice.company.name} To: {invoice.client.name}</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 mb-1">Complete the form to see preview</p>
                  <p className="text-xs text-gray-400">Add company and client information to enable preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal 
          isOpen={showPreview} 
          onClose={() => setShowPreview(false)} 
        />
      )}
    </div>
  );
} 