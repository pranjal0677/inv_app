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
  ArrowLeft,
  Check,
  Clock,
  Hourglass
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { openInvoicePDF, saveInvoicePDF } from "@/services/pdfService";
import { InvoiceData, SavedInvoice } from "@/types/invoice";
import { useAuth, useUser } from "@clerk/clerk-react";
import { getInvoicesByUser, updateInvoice, deleteInvoice } from "@/services/firestoreService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock invoices with the updated type
const initialInvoicesList = [
  { 
    id: "INV-001", 
    client: "Acme Corp", 
    amount: 1200, 
    date: "2025-05-15", 
    status: "Paid",
    // Sample invoice data for PDF generation
    invoiceNumber: "INV-001",
    invoiceDate: "2025-05-15",
    dueDate: "2025-05-30",
    clientName: "Acme Corp",
    clientEmail: "contact@acme.com",
    clientAddress: "123 Business St\nCity, State 12345",
    items: [
      { id: "1", description: "Web Design Services", quantity: 1, price: 1200 }
    ],
    notes: "Thank you for your business!",
    paymentTerms: "Net 15",
    taxRate: 0,
    currency: "INR",
    companyDetails: {
      name: "Your Company",
      email: "company@example.com",
      phone: "+91 9876543210",
      address: "Company Address\nCity, State, PIN",
      taxId: "GSTIN: 12ABCDE1234F1Z5"
    },
    bankDetails: {
      accountName: "Company Account",
      accountNumber: "1234567890",
      bankName: "Bank Name",
      ifscCode: "BANK0001234",
      upiId: "company@upi"
    },
    showQRCode: true
  },
  { 
    id: "INV-002", 
    client: "Stark Industries", 
    amount: 3450, 
    date: "2025-05-10", 
    status: "Pending",
    invoiceNumber: "INV-002",
    invoiceDate: "2025-05-10",
    dueDate: "2025-05-25",
    clientName: "Stark Industries",
    clientEmail: "accounts@stark.com",
    clientAddress: "200 Park Avenue\nNew York, NY 10166",
    items: [
      { id: "1", description: "Technical Consultation", quantity: 3, price: 1150 }
    ],
    notes: "Please pay within terms",
    paymentTerms: "Net 15",
    taxRate: 0,
    currency: "INR",
    companyDetails: {
      name: "Your Company",
      email: "company@example.com",
      phone: "+91 9876543210",
      address: "Company Address\nCity, State, PIN",
      taxId: "GSTIN: 12ABCDE1234F1Z5"
    },
    bankDetails: {
      accountName: "Company Account",
      accountNumber: "1234567890",
      bankName: "Bank Name",
      ifscCode: "BANK0001234",
      upiId: "company@upi"
    },
    showQRCode: true
  },
  { 
    id: "INV-003", 
    client: "Wayne Enterprises", 
    amount: 2750, 
    date: "2025-05-05", 
    status: "Paid",
    invoiceNumber: "INV-003",
    invoiceDate: "2025-05-05",
    dueDate: "2025-05-20",
    clientName: "Wayne Enterprises",
    clientEmail: "billing@wayne.com",
    clientAddress: "1007 Mountain Drive\nGotham, NY 10286",
    items: [
      { id: "1", description: "Security Analysis", quantity: 1, price: 2750 }
    ],
    notes: "Thank you for your business!",
    paymentTerms: "Net 15",
    taxRate: 0
  },
  { 
    id: "INV-004", 
    client: "Oscorp", 
    amount: 1850, 
    date: "2025-04-28", 
    status: "Paid",
    invoiceNumber: "INV-004",
    invoiceDate: "2025-04-28",
    dueDate: "2025-05-13",
    clientName: "Oscorp",
    clientEmail: "finance@oscorp.com",
    clientAddress: "Northwest Corner\nNew York, NY 10023",
    items: [
      { id: "1", description: "Research Equipment", quantity: 1, price: 1850 }
    ],
    notes: "Thank you for your business!",
    paymentTerms: "Net 15",
    taxRate: 0
  },
  { 
    id: "INV-005", 
    client: "LexCorp", 
    amount: 4200, 
    date: "2025-04-22", 
    status: "Overdue",
    invoiceNumber: "INV-005",
    invoiceDate: "2025-04-22",
    dueDate: "2025-05-07",
    clientName: "LexCorp",
    clientEmail: "payments@lexcorp.com",
    clientAddress: "1000 Main Street\nMetropolis, DE 19901",
    items: [
      { id: "1", description: "Tech Consulting", quantity: 2, price: 2100 }
    ],
    notes: "Payment overdue - please remit immediately",
    paymentTerms: "Net 15",
    taxRate: 0
  },
  { 
    id: "INV-006", 
    client: "Queen Industries", 
    amount: 2100, 
    date: "2025-04-15", 
    status: "Pending",
    invoiceNumber: "INV-006",
    invoiceDate: "2025-04-15",
    dueDate: "2025-04-30",
    clientName: "Queen Industries",
    clientEmail: "ar@queen.com",
    clientAddress: "123 Star City\nSeattle, WA 98101",
    items: [
      { id: "1", description: "Equipment Rental", quantity: 1, price: 2100 }
    ],
    notes: "Please pay within terms",
    paymentTerms: "Net 15",
    taxRate: 0
  },
  { 
    id: "INV-007", 
    client: "Kord Industries", 
    amount: 1350, 
    date: "2025-04-10", 
    status: "Paid",
    invoiceNumber: "INV-007",
    invoiceDate: "2025-04-10",
    dueDate: "2025-04-25",
    clientName: "Kord Industries",
    clientEmail: "invoices@kord.com",
    clientAddress: "350 5th Avenue\nChicago, IL 60611",
    items: [
      { id: "1", description: "Software License", quantity: 3, price: 450 }
    ],
    notes: "Thank you for your business!",
    paymentTerms: "Net 15",
    taxRate: 0
  },
];

const Invoices = () => {
  const { toast } = useToast();
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  
  const [invoicesList, setInvoicesList] = useState<SavedInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState("");
  
  const itemsPerPage = 5;
  
  // Fetch invoices when component mounts
  useEffect(() => {
    let isMounted = true;
    
    const fetchInvoices = async () => {
      // Only fetch if user is authenticated
      if (!isLoaded || !isSignedIn || !user) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // Get invoices from Firestore
        const fetchedInvoices = await getInvoicesByUser(user.id);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setInvoicesList(fetchedInvoices as SavedInvoice[]);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
        // Only update state if component is still mounted
        if (isMounted) {
          toast({
            title: "Error",
            description: "Failed to load invoices. Please try again later.",
            variant: "destructive",
          });
          setInvoicesList([]);
          setLoading(false);
        }
      }
    };
    
    fetchInvoices();
    
    // Safety timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isMounted && loading) {
        setLoading(false);
        toast({
          title: "Loading Timeout",
          description: "Request took too long. Please try again later.",
          variant: "warning",
        });
      }
    }, 10000); // 10 seconds timeout
    
    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isLoaded, isSignedIn, user, toast]); // removed loading from dependencies
  
  const getStatusColor = (status: string) => {
    if (status === "Paid") return "bg-green-100 text-green-800";
    if (status === "Pending") return "bg-yellow-100 text-yellow-800";
    if (status === "Overdue") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };
  
  const getStatusIcon = (status: string) => {
    if (status === "Paid") return <Check className="w-4 h-4" />;
    if (status === "Pending") return <Clock className="w-4 h-4" />;
    if (status === "Overdue") return <Hourglass className="w-4 h-4" />;
    return null;
  };
  
  const handleDownloadPDF = async (invoiceId: string) => {
    try {
      const invoice = invoicesList.find((inv) => inv.id === invoiceId);
    if (invoice) {
        await saveInvoicePDF(invoice);
        toast({
          title: "Success",
          description: "Invoice PDF downloaded successfully",
        });
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast({
        title: "Error",
        description: "Failed to download invoice PDF",
        variant: "destructive",
      });
    }
  };
  
  const handleViewInvoice = async (invoiceId: string) => {
    try {
      const invoice = invoicesList.find((inv) => inv.id === invoiceId);
      if (invoice) {
        await openInvoicePDF(invoice);
      }
    } catch (error) {
      console.error("Error viewing PDF:", error);
      toast({
        title: "Error",
        description: "Failed to open invoice PDF",
        variant: "destructive",
      });
    }
  };
  
  const handleStatusChange = (invoice: SavedInvoice) => {
    setSelectedInvoiceId(invoice.id || "");
    setNewStatus(invoice.status || "Pending");
    setStatusDialogOpen(true);
  };
  
  const handleSaveStatus = async () => {
    if (!selectedInvoiceId || !newStatus || !user) return;
    
    try {
      // Update in Firestore
      await updateInvoice(selectedInvoiceId, { status: newStatus });
      
      // Update local state
      setInvoicesList((prevInvoices) =>
        prevInvoices.map((inv) =>
          inv.id === selectedInvoiceId ? { ...inv, status: newStatus } : inv
        )
      );
      
      toast({
        title: "Status Updated",
        description: `Invoice status changed to ${newStatus}`,
      });
      
      setStatusDialogOpen(false);
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update invoice status",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoiceToDelete(invoiceId);
    setDeleteDialogOpen(true);
  };
  
  const confirmDeleteInvoice = async () => {
    if (!invoiceToDelete) return;
    
    try {
      // Delete from Firestore
      await deleteInvoice(invoiceToDelete);
      
      // Update local state
      setInvoicesList((prevInvoices) =>
        prevInvoices.filter((inv) => inv.id !== invoiceToDelete)
      );
      
      toast({
        title: "Invoice Deleted",
        description: "The invoice has been permanently deleted",
      });
      
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting invoice:", error);
      toast({
        title: "Error",
        description: "Failed to delete invoice",
        variant: "destructive",
      });
    }
  };
  
  // Filter and paginate invoices
  const filteredInvoices = invoicesList.filter(
    (invoice) =>
      invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const pageCount = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Loading state
  if (!isLoaded) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      </PageLayout>
    );
  }
  
  // Not signed in state
  if (!isSignedIn) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="mb-4">You need to sign in to view your invoices</p>
          <Link to="/" className="text-purple-600 hover:text-purple-800">
            Go to Home
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Invoices</h1>
          <Link to="/create-invoice">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" /> Create Invoice
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search invoices..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
          </div>
        ) : paginatedInvoices.length > 0 ? (
          <div className="space-y-4">
            {paginatedInvoices.map((invoice) => (
              <Card key={invoice.id} className="p-4">
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <div>
                    <h3 className="font-medium text-lg">{invoice.clientName}</h3>
                    <div className="text-gray-500 text-sm">ID: {invoice.invoiceNumber}</div>
                  </div>
                  
                  <div>
                    <div className="text-right font-medium">
                      {invoice.currency} {invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
                    </div>
                    <div className="text-gray-500 text-sm">{invoice.invoiceDate}</div>
                  </div>
                  
                  <div>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status || "Pending")}`}>
                      <span className="mr-1">{getStatusIcon(invoice.status || "Pending")}</span>
                      {invoice.status || "Pending"}
                    </div>
                  </div>
                  
                      <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewInvoice(invoice.id || "")}
                    >
                      <FileText className="w-4 h-4 mr-1" /> View
                    </Button>
                    
                        <Button 
                      variant="outline"
                          size="sm" 
                      onClick={() => handleDownloadPDF(invoice.id || "")}
                        >
                      <Download className="w-4 h-4 mr-1" /> Save
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          •••
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(invoice)}>
                          Change Status
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteInvoice(invoice.id || "")} className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}

            {/* Pagination controls */}
            {pageCount > 1 && (
              <div className="flex justify-center mt-6">
                <div className="flex items-center gap-2">
                        <Button 
                    variant="outline"
                          size="sm" 
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" /> Prev
                  </Button>
                  
                  <div className="text-sm">
                    Page {currentPage} of {pageCount}
                  </div>
                  
                  <Button
                          variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
                    disabled={currentPage === pageCount}
                        >
                    Next <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium mb-2">No invoices found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? "Try a different search term" : "Create your first invoice to get started"}
            </p>
            {!searchQuery && (
              <Link to="/create-invoice">
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Create Invoice
            </Button>
              </Link>
            )}
          </div>
        )}
      </div>
      
      {/* Status change dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Invoice Status</DialogTitle>
            <DialogDescription>
              Update the payment status for this invoice.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
                <Label htmlFor="status">Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveStatus}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Invoice</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this invoice? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteInvoice}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Invoices;
