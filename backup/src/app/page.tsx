'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">
              <span className="bg-gradient-purple text-transparent bg-clip-text">Invoice Generator</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-primary transition-colors">Features</Link>
            <Link href="#templates" className="text-gray-700 hover:text-primary transition-colors">Templates</Link>
            <Link href="#" className="text-gray-700 hover:text-primary transition-colors">Pricing</Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link 
              href="#" 
              className="hidden md:block text-primary font-medium hover:text-primary-dark transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/create-invoice" 
              className="bg-primary text-white font-medium px-5 py-2.5 rounded-md hover:bg-primary-dark transition-colors"
            >
              Get Started - It's Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-purple text-transparent bg-clip-text">Best FREE Online<br />Invoicing Software</span>
              </h1>
              <p className="text-gray-700 text-lg mb-8 max-w-lg">
                Create and share invoices in 1-click. Collect faster payments with auto-reminders. Get insightful reports. Customize, Download PDFs, and Manage Taxes - All for FREE in one place!
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/create-invoice" 
                  className="bg-primary text-white text-lg font-medium px-8 py-3 rounded-md hover:bg-primary-dark transition-colors flex justify-center"
                >
                  Get Started - It's FREE
                </Link>
                <Link
                  href="#"
                  className="bg-white border border-primary text-primary text-lg font-medium px-8 py-3 rounded-md hover:bg-purple-light transition-colors flex justify-center"
                >
                  Book a Free Demo
                </Link>
              </div>
              <div className="mt-8 text-gray-600 text-sm">
                Our Users Rate Invoice Generator ⭐ 4.8/5 based on 2,500+ Reviews
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="bg-primary-bg p-6 rounded-xl shadow-lg">
                  <div className="w-full h-72 bg-white rounded-lg overflow-hidden shadow-md flex items-center justify-center">
                    <div className="w-full p-4">
                      <div className="h-12 bg-primary rounded-t-md mb-4"></div>
                      <div className="flex justify-between mb-4">
                        <div className="w-1/3 h-20 bg-gray-100 rounded-md"></div>
                        <div className="w-1/3 h-20 bg-gray-100 rounded-md"></div>
                      </div>
                      <div className="h-24 bg-gray-100 rounded-md mb-4"></div>
                      <div className="flex justify-end">
                        <div className="w-1/4 h-8 bg-secondary rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary-bg rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-secondary text-4xl font-bold">FREE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-purple text-transparent bg-clip-text">All The Features You Need, Minus The Headache</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Effortless invoicing software for small business owners, freelancers, and agencies</p>
          </div>

          {/* Feature Block 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <div className="mb-4">
                <span className="inline-block p-3 bg-purple-light rounded-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Look Professional</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Craft professional invoices with a branded touch for clients. Select from various templates, customize colors, fonts, and layout to align with your brand. Incorporate your logo, personalize the header and footer, and maintain consistent brand colors for a cohesive appearance.
              </p>
              <Link href="/create-invoice" className="text-primary font-medium flex items-center hover:text-primary-dark transition-colors">
                Get Started for FREE
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="aspect-w-16 aspect-h-9 bg-primary-bg rounded-lg overflow-hidden">
                <div className="flex items-center justify-center p-4">
                  <div className="w-full max-w-md">
                    <div className="h-10 bg-primary rounded-t-md mb-4"></div>
                    <div className="flex space-x-4 mb-4">
                      <div className="w-1/2 h-20 bg-gray-100 rounded-md"></div>
                      <div className="w-1/2 h-20 bg-gray-100 rounded-md"></div>
                    </div>
                    <div className="h-32 bg-white border border-gray-200 rounded-md shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Block 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 md:order-1 bg-white p-6 rounded-xl shadow-md">
              <div className="aspect-w-16 aspect-h-9 bg-secondary-bg rounded-lg overflow-hidden">
                <div className="flex items-center justify-center p-4">
                  <div className="w-full max-w-md flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="w-8 h-8 bg-secondary rounded-full"></div>
                      <div className="w-24 h-8 bg-primary rounded-md"></div>
                    </div>
                    <div className="h-12 bg-white border border-gray-200 rounded-md flex items-center pl-3">
                      <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                      <div className="w-2/3 h-4 bg-gray-100 rounded"></div>
                    </div>
                    <div className="h-12 bg-white border border-gray-200 rounded-md"></div>
                    <div className="h-12 bg-white border border-gray-200 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="mb-4">
                <span className="inline-block p-3 bg-secondary-bg rounded-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Convenient Sharing Options</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With our official WhatsApp API integration, sending invoices becomes effortless – just a single click and it's done! Not only can you email invoices, but you can also track when clients view them. Additionally, we offer flexibility in sharing invoices – whether it's via a link, as a PDF file, or even in print.
              </p>
              <Link href="/create-invoice" className="text-secondary font-medium flex items-center hover:text-secondary-dark transition-colors">
                Get Started for FREE
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Feature Block 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <div className="mb-4">
                <span className="inline-block p-3 bg-purple-light rounded-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">More Than Just Invoicing</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Beyond just invoices, our platform offers a comprehensive suite of features. Easily generate quotations, estimates, and proforma invoices to streamline your client interactions. Manage recurring invoices effortlessly for subscription-based services. Create credit and debit notes to account for adjustments seamlessly.
              </p>
              <Link href="/create-invoice" className="text-primary font-medium flex items-center hover:text-primary-dark transition-colors">
                Get Started for FREE
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex flex-wrap gap-4">
                <div className="w-[calc(50%-8px)] p-3 bg-primary-bg rounded-lg text-center">
                  <div className="w-10 h-10 bg-primary rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-gray-800">Invoice</div>
                </div>
                <div className="w-[calc(50%-8px)] p-3 bg-secondary-bg rounded-lg text-center">
                  <div className="w-10 h-10 bg-secondary rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-gray-800">Quotation</div>
                </div>
                <div className="w-[calc(50%-8px)] p-3 bg-orange-light rounded-lg text-center">
                  <div className="w-10 h-10 bg-secondary rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-gray-800">Payment Receipt</div>
                </div>
                <div className="w-[calc(50%-8px)] p-3 bg-purple-light rounded-lg text-center">
                  <div className="w-10 h-10 bg-primary rounded-full mx-auto mb-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium text-gray-800">Reports</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-orange text-transparent bg-clip-text">Who can use our Invoice Generator?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Perfect invoicing solution for various professionals and business types</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <BusinessTypeCard 
              title="Freelancers" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
              features={[
                "Multi-Currency Support for international clients",
                "Customization Options to showcase your brand identity",
                "Auto Reminders to get paid on time",
                "Recurring Invoices for regular clients"
              ]}
            />
            <BusinessTypeCard 
              title="Small and Medium Enterprises" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              features={[
                "Client Management for personalized service",
                "Expense Management to track financial flows",
                "Bulk Client Data Upload to save time",
                "Advanced Accounting system for accurate records"
              ]}
            />
            <BusinessTypeCard 
              title="Consultants" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
              features={[
                "Quotation Maker for impressive client proposals",
                "Lead Management for better conversion",
                "Invoice and Quotation Conversion to save time",
                "Professional templates to match your expertise"
              ]}
            />
            <BusinessTypeCard 
              title="Entrepreneurs" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              features={[
                "Multiple Business Management under one account",
                "User Access Control for secure team collaboration",
                "Expense Management for budget optimization",
                "Email and WhatsApp sharing options"
              ]}
            />
            <BusinessTypeCard 
              title="Product-Based Companies" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
              features={[
                "Inventory Management to track stock levels",
                "Product Images in invoices for visual appeal",
                "GST/Tax handling for compliance",
                "Online payment collection options"
              ]}
            />
            <BusinessTypeCard 
              title="Chartered Accountants" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
              features={[
                "Advanced Accounting features for client management",
                "Multiple client invoicing options",
                "Tax report generation for easy compliance",
                "Batch operations for efficient workflow"
              ]}
            />
          </div>
          
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Choose from Professional Invoice Templates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <TemplateCard name="Modern Business" />
              <TemplateCard name="Clean Professional" />
              <TemplateCard name="GST Compliant" />
            </div>
            <Link 
              href="/create-invoice" 
              className="bg-primary text-white font-medium px-8 py-3 rounded-md hover:bg-primary-dark transition-colors shadow-sm inline-flex items-center"
            >
              Get Started for FREE
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-primary-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-purple text-transparent bg-clip-text">Benefits of using our free invoicing software</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard 
              title="Create & Manage Invoices"
              description="Create, manage and track invoices including both taxable and non-taxable formats with ease." 
            />
            <BenefitCard 
              title="Send Instant Quotations"
              description="Quickly send professional quotations to clients and convert them to invoices in one click." 
            />
            <BenefitCard 
              title="Team Management"
              description="Add team members and control access levels with custom roles and permissions." 
            />
            <BenefitCard 
              title="Multiple Businesses"
              description="Add multiple businesses to one account and manage all your ventures from a single dashboard." 
            />
            <BenefitCard 
              title="Recurring Invoices"
              description="Set up automated recurring invoices for subscription-based services and regular clients." 
            />
            <BenefitCard 
              title="Payment Reminders"
              description="Send automatic payment reminders via email or WhatsApp to improve cash flow." 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Invoice Generator</h3>
              <p className="text-gray-400 leading-relaxed">
                Create and manage professional invoices with our easy-to-use invoice generator. Perfect for freelancers, small businesses and entrepreneurs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/create-invoice" className="text-gray-400 hover:text-white transition-colors">Create Invoice</Link></li>
                <li><Link href="/templates" className="text-gray-400 hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
              <p className="text-gray-400 leading-relaxed">
                Email: support@invoicegenerator.com<br />
                Phone: +1 (123) 456-7890
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Invoice Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <div className="bg-white p-8 rounded-xl shadow-card hover:shadow-card-hover border border-gray-100 hover:border-primary-light transition-all group">
    <div className="text-4xl mb-5 text-secondary group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// Template Card Component
const TemplateCard = ({ name }: { name: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-card-hover border border-gray-200 hover:border-secondary-light transition-all group">
    <div className="aspect-w-3 aspect-h-4 bg-gray-50 mb-5 rounded-lg overflow-hidden">
      <div className="w-full h-48 flex items-center justify-center text-gray-400 group-hover:bg-secondary-bg transition-colors">
        {name} Template Preview
      </div>
    </div>
    <h3 className="text-lg font-semibold text-center text-gray-800 group-hover:text-secondary transition-colors">{name}</h3>
  </div>
);

// Business Type Card Component
const BusinessTypeCard = ({ title, icon, features }: { title: string; icon: React.ReactNode; features: string[] }) => (
  <div className="bg-white p-8 rounded-xl shadow-card hover:shadow-card-hover border border-gray-100 hover:border-primary-light transition-all group">
    <div className="text-4xl mb-5 text-secondary group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">{title}</h3>
    <ul className="list-disc pl-6 text-gray-600 leading-relaxed">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  </div>
);

// Benefit Card Component
const BenefitCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white p-8 rounded-xl shadow-card hover:shadow-card-hover border border-gray-100 hover:border-primary-light transition-all group">
    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
); 