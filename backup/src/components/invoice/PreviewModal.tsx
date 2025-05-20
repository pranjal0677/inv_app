import React, { useState } from 'react';
import InvoicePDF from './InvoicePDF';
import { useInvoiceStore } from '@/store/invoiceStore';
import { PDFDownload, PDFPreview } from './InvoicePDF';
import { downloadInvoice } from '@/utils/helpers';
import EmailShareModal from './EmailShareModal';
import ShareLinkModal from './ShareLinkModal';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose }) => {
  const { invoice } = useInvoiceStore();
  const [activeTemplate, setActiveTemplate] = useState<'modern' | 'classic' | 'minimal'>(
    (invoice.template as 'modern' | 'classic' | 'minimal') || 'modern'
  );
  const [loading, setLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showShareLinkModal, setShowShareLinkModal] = useState(false);
  const [isPdfView, setIsPdfView] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setLoading(true);
    // Trigger the download of the PDF
    downloadInvoice(invoice);
    
    // Simulate completion for better UX
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleShareEmail = () => {
    setShowEmailModal(true);
  };

  const handleShareLink = () => {
    setShowShareLinkModal(true);
  };

  const toggleView = () => {
    setIsPdfView(!isPdfView);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-primary-bg">
          <h2 className="text-xl font-semibold text-primary">Invoice Preview</h2>
          <div className="flex items-center space-x-4">
            {!isPdfView && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTemplate('modern')}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${
                    activeTemplate === 'modern'
                      ? 'bg-primary text-white shadow'
                      : 'bg-white text-gray-700 hover:bg-purple-light'
                  }`}
                >
                  Modern
                </button>
                <button
                  onClick={() => setActiveTemplate('classic')}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${
                    activeTemplate === 'classic'
                      ? 'bg-primary text-white shadow'
                      : 'bg-white text-gray-700 hover:bg-purple-light'
                  }`}
                >
                  Classic
                </button>
                <button
                  onClick={() => setActiveTemplate('minimal')}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${
                    activeTemplate === 'minimal'
                      ? 'bg-primary text-white shadow'
                      : 'bg-white text-gray-700 hover:bg-purple-light'
                  }`}
                >
                  Minimal
                </button>
              </div>
            )}
            <button
              onClick={toggleView}
              className="px-4 py-2 text-sm rounded-lg text-primary border border-primary hover:bg-purple-light transition-all"
            >
              {isPdfView ? 'HTML View' : 'PDF View'}
            </button>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 bg-white rounded-full p-1.5 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-2 bg-gray-50">
          {isPdfView ? (
            <div className="rounded-lg overflow-hidden shadow-md">
              <PDFPreview invoice={invoice} />
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <InvoicePDF invoice={{...invoice, template: activeTemplate}} />
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="p-5 border-t border-gray-200 flex justify-between items-center bg-secondary-bg">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 bg-white rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close
          </button>
          <div className="flex space-x-3">
            <button 
              onClick={handleShareLink}
              className="flex items-center px-4 py-2 border border-primary bg-white text-primary rounded-lg hover:bg-purple-light transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Link
            </button>
            <button 
              onClick={handleShareEmail}
              className="flex items-center px-4 py-2 bg-gradient-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Invoice
            </button>
            <button 
              className="flex items-center px-4 py-2 bg-gradient-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors shadow"
              onClick={handleDownload}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-1.5 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
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
      
      {/* Hidden download link */}
      <div className="hidden" id="download-pdf-link">
        <PDFDownload invoice={invoice} />
      </div>
    </div>
  );
};

export default PreviewModal; 