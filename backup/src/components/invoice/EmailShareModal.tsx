import React, { useState } from 'react';
import { Invoice } from '@/types/invoice';

interface EmailShareModalProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
}

const EmailShareModal: React.FC<EmailShareModalProps> = ({ invoice, isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(`Invoice ${invoice.invoiceNumber} from ${invoice.company.name}`);
  const [message, setMessage] = useState(
    `Dear ${invoice.client.name},\n\nPlease find attached the invoice ${invoice.invoiceNumber} for the amount of ₹${invoice.total.toFixed(2)}.\n\nPayment is due by ${new Date(invoice.dueDate).toLocaleDateString()}.\n\nThank you for your business.\n\nRegards,\n${invoice.company.name}`
  );
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate sending email
    setTimeout(() => {
      setSending(false);
      setSent(true);
      
      // Close modal after success
      setTimeout(() => {
        onClose();
        setSent(false);
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-primary">Share Invoice via Email</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {sent ? (
          <div className="text-center py-10">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">Email Sent!</h3>
            <p className="mt-2 text-sm text-gray-500">
              Your invoice has been sent successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="client@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="attachment"
                  checked
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="attachment" className="ml-2 block text-sm text-gray-700">
                  Attach invoice as PDF
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center"
                disabled={sending}
              >
                {sending && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {sending ? 'Sending...' : 'Send Email'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailShareModal; 