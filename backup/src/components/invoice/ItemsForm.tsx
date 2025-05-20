import React, { useState } from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';
import { formatCurrency } from '@/utils/helpers';

const ItemsForm: React.FC = () => {
  const { invoice, addItem, updateItem, removeItem } = useInvoiceStore();
  const [showItemSuggestions, setShowItemSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const commonItems = [
    { description: 'Web Design Services', hsnCode: '998391', rate: 15000, gstRate: 18 },
    { description: 'Mobile App Development', hsnCode: '998391', rate: 20000, gstRate: 18 },
    { description: 'UI/UX Design', hsnCode: '998391', rate: 10000, gstRate: 18 },
    { description: 'Consulting Services', hsnCode: '998311', rate: 5000, gstRate: 18 },
    { description: 'Digital Marketing', hsnCode: '998361', rate: 8000, gstRate: 18 },
    { description: 'Content Writing', hsnCode: '998395', rate: 2000, gstRate: 18 },
    { description: 'Hosting Services (Annual)', hsnCode: '998319', rate: 12000, gstRate: 18 },
    { description: 'Domain Registration', hsnCode: '998319', rate: 1000, gstRate: 18 },
  ];

  const filteredItems = searchTerm
    ? commonItems.filter(item => 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : commonItems;

  const handleAddItem = () => {
    addItem({
      description: '',
      hsnCode: '',
      rate: 0,
      gstRate: 18, // Default GST rate
      amount: 0,
      cgst: 0,
      sgst: 0,
      total: 0,
    });
  };

  const handleAddSuggestedItem = (suggestedItem) => {
    const { description, hsnCode, rate, gstRate } = suggestedItem;
    
    addItem({
      description,
      hsnCode,
      rate,
      gstRate,
      amount: rate,
      cgst: (rate * gstRate) / 200,
      sgst: (rate * gstRate) / 200,
      total: rate * (1 + gstRate / 100),
    });
    
    setShowItemSuggestions(false);
    setSearchTerm('');
  };

  const handleItemChange = (id: string, field: string, value: string | number) => {
    const item = invoice.items?.find((item) => item.id === id);
    if (!item) return;

    const updates: any = { [field]: value };

    // Recalculate amount and taxes if rate changes
    if (field === 'rate') {
      const numValue = Number(value);
      updates.amount = numValue;
      updates.cgst = (numValue * item.gstRate) / 200;
      updates.sgst = (numValue * item.gstRate) / 200;
      updates.total = numValue * (1 + item.gstRate / 100);
    }

    // Recalculate taxes if GST rate changes
    if (field === 'gstRate') {
      const numValue = Number(value);
      updates.cgst = (item.amount * numValue) / 200;
      updates.sgst = (item.amount * numValue) / 200;
      updates.total = item.amount * (1 + numValue / 100);
    }

    updateItem(id, updates);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-primary">Invoice Items</h3>
        <div className="flex space-x-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowItemSuggestions(!showItemSuggestions)}
              className="flex items-center px-4 py-2 border border-secondary text-secondary rounded-md hover:bg-orange-light"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Common Item
            </button>
            
            {showItemSuggestions && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleAddSuggestedItem(item)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-purple-light hover:text-primary border-b border-gray-100"
                    >
                      <div className="font-medium">{item.description}</div>
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>HSN: {item.hsnCode}</span>
                        <span>{formatCurrency(item.rate)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Blank Item
          </button>
        </div>
      </div>
      
      {invoice.items.length === 0 ? (
        <div className="bg-purple-light text-center p-8 rounded-md border border-dashed border-purple-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-primary font-medium mb-2">No items added yet</p>
          <p className="text-gray-500 text-sm mb-4">Add items to your invoice using the buttons above</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 text-xs uppercase text-gray-500 font-medium">Description</th>
                <th className="text-left py-2 text-xs uppercase text-gray-500 font-medium">HSN/SAC</th>
                <th className="text-right py-2 text-xs uppercase text-gray-500 font-medium">Rate</th>
                <th className="text-center py-2 text-xs uppercase text-gray-500 font-medium">GST %</th>
                <th className="text-right py-2 text-xs uppercase text-gray-500 font-medium">Amount</th>
                <th className="text-center py-2 text-xs uppercase text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 pr-4">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      className="w-full border-transparent focus:border-primary focus:ring-0"
                      placeholder="Item description"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="text"
                      value={item.hsnCode}
                      onChange={(e) => handleItemChange(item.id, 'hsnCode', e.target.value)}
                      className="w-full border-transparent focus:border-primary focus:ring-0"
                      placeholder="HSN/SAC"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)}
                      className="w-full border-transparent focus:border-primary focus:ring-0 text-right"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="py-2">
                    <select
                      value={item.gstRate}
                      onChange={(e) => handleItemChange(item.id, 'gstRate', e.target.value)}
                      className="w-full border-transparent focus:border-primary focus:ring-0 text-center"
                    >
                      <option value="0">0%</option>
                      <option value="3">3%</option>
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </select>
                  </td>
                  <td className="py-2 text-right">{formatCurrency(item.total)}</td>
                  <td className="py-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {invoice.items.length > 0 && (
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex justify-end">
            <div className="w-64">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">Subtotal:</div>
                <div className="text-right font-medium">{formatCurrency(invoice.subtotal || 0)}</div>
                
                <div className="text-gray-600">CGST:</div>
                <div className="text-right font-medium">{formatCurrency(invoice.cgst || 0)}</div>
                
                <div className="text-gray-600">SGST:</div>
                <div className="text-right font-medium">{formatCurrency(invoice.sgst || 0)}</div>
                
                <div className="text-primary font-medium">Total:</div>
                <div className="text-right text-primary font-bold">{formatCurrency(invoice.total || 0)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsForm; 