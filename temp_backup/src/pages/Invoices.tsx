import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Download, 
  Search, 
  FileText, 
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Invoices = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  const invoicesList = [
    { id: "INV-001", client: "Acme Corp", amount: 1200, date: "2025-05-15", status: "Paid" },
    { id: "INV-002", client: "Stark Industries", amount: 3450, date: "2025-05-10", status: "Pending" },
    { id: "INV-003", client: "Wayne Enterprises", amount: 2750, date: "2025-05-05", status: "Paid" },
    { id: "INV-004", client: "Oscorp", amount: 1850, date: "2025-04-28", status: "Paid" },
    { id: "INV-005", client: "LexCorp", amount: 4200, date: "2025-04-22", status: "Overdue" },
    { id: "INV-006", client: "Queen Industries", amount: 2100, date: "2025-04-15", status: "Pending" },
    { id: "INV-007", client: "Kord Industries", amount: 1350, date: "2025-04-10", status: "Paid" },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Paid": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const handleDownloadPDF = (invoiceId: string) => {
    // In a real application, this would fetch the invoice data and generate a PDF
    toast({
      title: "PDF Download Started",
      description: `Invoice ${invoiceId} is being downloaded as PDF.`,
      variant: "default",
    });
  };
  
  const handleViewInvoice = (invoiceId: string) => {
    // In a real application, this would navigate to the invoice detail page
    toast({
      title: "View Invoice",
      description: `Viewing invoice ${invoiceId}.`,
    });
  };
  
  const filteredInvoices = searchTerm 
    ? invoicesList.filter(
        invoice => 
          invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
          invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : invoicesList;

  return (
    <PageLayout title="Invoices">
      <div className="py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search invoices..." 
              className="pl-8" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/create-invoice">
            <Button className="btn-primary flex items-center gap-2 w-full md:w-auto">
              <Plus size={16} />
              New Invoice
            </Button>
          </Link>
        </div>

        <Card className="card-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Invoice #</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-primary" />
                        {invoice.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{invoice.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${invoice.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{invoice.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadPDF(invoice.id)}
                        >
                          <FileText size={14} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewInvoice(invoice.id)}
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowLeft size={14} />
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Page 1 of 1
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              Next
              <ArrowRight size={14} />
            </Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Invoices;
