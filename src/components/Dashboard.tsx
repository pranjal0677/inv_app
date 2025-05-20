import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  DollarSign, 
  FileText, 
  User, 
  Clock, 
  Plus, 
  ArrowRight,
  Settings 
} from "lucide-react";
import { SavedInvoice } from "@/types/invoice";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  invoices: number;
  total: number;
}

const Dashboard = () => {
  // State for dashboard data
  const [stats, setStats] = useState({
    totalRevenue: 0,
    invoiceCount: 0,
    clientCount: 0,
    pendingAmount: 0,
    pendingInvoices: 0,
  });
  
  const [recentInvoices, setRecentInvoices] = useState<SavedInvoice[]>([]);
  
  // Load data on component mount
  useEffect(() => {
    // Load saved invoices
    try {
      const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
      
      // Sort by date (most recent first)
      savedInvoices.sort((a: SavedInvoice, b: SavedInvoice) => {
        const dateA = new Date(a.createdAt || a.invoiceDate).getTime();
        const dateB = new Date(b.createdAt || b.invoiceDate).getTime();
        return dateB - dateA;
      });
      
      // Calculate stats
      const totalRevenue = savedInvoices.reduce((sum: number, inv: SavedInvoice) => {
        // Calculate total for each invoice
        const invoiceTotal = inv.items.reduce((itemSum: number, item) => {
          return itemSum + (item.quantity * item.price);
        }, 0);
        
        // Add tax if applicable
        const tax = invoiceTotal * (inv.taxRate / 100);
        return sum + invoiceTotal + tax;
      }, 0);
      
      // Count pending invoices and amount
      const pendingInvoices = savedInvoices.filter((inv: SavedInvoice) => 
        inv.status === 'Pending' || inv.status === 'Overdue');
      
      const pendingAmount = pendingInvoices.reduce((sum: number, inv: SavedInvoice) => {
        const invoiceTotal = inv.items.reduce((itemSum: number, item) => {
          return itemSum + (item.quantity * item.price);
        }, 0);
        const tax = invoiceTotal * (inv.taxRate / 100);
        return sum + invoiceTotal + tax;
      }, 0);
      
      // Get recent invoices (up to 3)
      const recent = savedInvoices.slice(0, 3);
      setRecentInvoices(recent);
      
      // Load clients
      const clientsList = JSON.parse(localStorage.getItem('clientsList') || '[]');
      
      // Update stats
      setStats({
        totalRevenue: totalRevenue,
        invoiceCount: savedInvoices.length,
        clientCount: clientsList.length,
        pendingAmount,
        pendingInvoices: pendingInvoices.length,
      });
      
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="py-8 px-4 md:px-6">
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
        <p className="text-muted-foreground mb-6">Here's an overview of your invoicing activity</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full invoice-gradient -z-10"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-secondary" />
                <span className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.invoiceCount} total invoice{stats.invoiceCount !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>

          <Card className="card-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full invoice-gradient -z-10"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{stats.invoiceCount}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.pendingInvoices} due this week
              </p>
            </CardContent>
          </Card>

          <Card className="card-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full invoice-gradient -z-10"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-secondary" />
                <span className="text-2xl font-bold">{stats.clientCount}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Manage your client base
              </p>
            </CardContent>
          </Card>

          <Card className="card-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full invoice-gradient -z-10"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{formatCurrency(stats.pendingAmount)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                From {stats.pendingInvoices} invoice{stats.pendingInvoices !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Invoices</h2>
          <Link to="/invoices">
            <Button variant="ghost" className="text-primary flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="overflow-auto">
          {recentInvoices.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg card-shadow">
              <p className="text-muted-foreground">No invoices created yet. Create your first invoice to get started.</p>
              <Link to="/create-invoice" className="inline-block mt-4">
                <Button className="btn-primary">
                  <Plus size={16} className="mr-2" />
                  Create Invoice
                </Button>
              </Link>
            </div>
          ) : (
          <table className="min-w-full bg-white rounded-lg card-shadow">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Invoice</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Client</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Amount</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
                {recentInvoices.map((invoice) => {
                  const amount = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
                  const tax = amount * (invoice.taxRate / 100);
                  const total = amount + tax;
                  
                  return (
                <tr key={invoice.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 text-sm">{invoice.invoiceNumber}</td>
                      <td className="py-3 px-4 text-sm">{invoice.clientName}</td>
                      <td className="py-3 px-4 text-sm">{formatCurrency(total)}</td>
                      <td className="py-3 px-4 text-sm">{invoice.invoiceDate}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                          invoice.status === "Paid" ? "bg-green-100 text-green-800" : 
                          invoice.status === "Overdue" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                    }`}>
                          {invoice.status || "Pending"}
                    </span>
                  </td>
                </tr>
                  );
                })}
            </tbody>
          </table>
          )}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/create-invoice">
              <Button className="btn-primary h-auto py-6 flex flex-col items-center gap-2 w-full">
                <Plus size={24} />
                <span>New Invoice</span>
              </Button>
            </Link>
            <Link to="/clients">
              <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2 border-primary/20 hover:bg-primary/5 w-full">
                <User size={24} className="text-primary" />
                <span>Add Client</span>
              </Button>
            </Link>
            <Link to="/invoices">
              <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2 border-primary/20 hover:bg-primary/5 w-full">
                <FileText size={24} className="text-primary" />
                <span>Invoice Templates</span>
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2 border-primary/20 hover:bg-primary/5 w-full">
                <Settings size={24} className="text-primary" />
                <span>Settings</span>
              </Button>
            </Link>
          </div>
        </div>

        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Create a Professional Invoice in Seconds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Generate beautiful, customizable invoices with our easy-to-use invoice generator.
            </p>
            <ul className="space-y-2">
              {[
                "Customizable templates",
                "Automatic calculations",
                "PDF export options",
                "Client management",
                "Payment tracking"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center">
                    <ArrowRight size={12} className="text-secondary" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/create-invoice">
              <Button className="btn-secondary w-full mt-2">
                Try It Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
