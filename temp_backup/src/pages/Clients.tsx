
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Search,
  User,
  Mail,
  Phone
} from "lucide-react";

const Clients = () => {
  const clientsList = [
    { id: 1, name: "Acme Corporation", email: "contact@acme.com", phone: "+1 (555) 123-4567", invoices: 4, total: 3500 },
    { id: 2, name: "Stark Industries", email: "info@stark.com", phone: "+1 (555) 234-5678", invoices: 3, total: 4250 },
    { id: 3, name: "Wayne Enterprises", email: "contact@wayne.com", phone: "+1 (555) 345-6789", invoices: 6, total: 7800 },
    { id: 4, name: "Oscorp Industries", email: "info@oscorp.com", phone: "+1 (555) 456-7890", invoices: 2, total: 2300 },
    { id: 5, name: "LexCorp", email: "contact@lexcorp.com", phone: "+1 (555) 567-8901", invoices: 5, total: 6100 },
    { id: 6, name: "Queen Industries", email: "info@queen.com", phone: "+1 (555) 678-9012", invoices: 1, total: 1800 },
  ];

  return (
    <PageLayout title="Clients">
      <div className="py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search clients..." 
              className="pl-8" 
            />
          </div>
          <Button className="btn-primary flex items-center gap-2 w-full md:w-auto">
            <Plus size={16} />
            Add Client
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientsList.map(client => (
            <Card key={client.id} className="card-shadow overflow-hidden">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{client.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail size={14} />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone size={14} />
                    <span>{client.phone}</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm pt-4 border-t border-border">
                  <div>
                    <span className="text-muted-foreground">Invoices</span>
                    <p className="font-medium">{client.invoices}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground">Total Amount</span>
                    <p className="font-medium">${client.total.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between gap-3 mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Edit
                  </Button>
                  <Link to="/create-invoice">
                    <Button size="sm" className="btn-primary w-full">
                      Invoice
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Clients;
