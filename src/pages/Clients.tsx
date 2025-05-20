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
  Phone,
  UserPlus,
  Trash,
  PenLine
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  invoices: number;
  total: number;
}

const Clients = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: ""
  });
  
  const [clientsList, setClientsList] = useState<Client[]>([
    { id: 1, name: "Acme Corporation", email: "contact@acme.com", phone: "+1 (555) 123-4567", invoices: 4, total: 3500 },
    { id: 2, name: "Stark Industries", email: "info@stark.com", phone: "+1 (555) 234-5678", invoices: 3, total: 4250 },
    { id: 3, name: "Wayne Enterprises", email: "contact@wayne.com", phone: "+1 (555) 345-6789", invoices: 6, total: 7800 },
    { id: 4, name: "Oscorp Industries", email: "info@oscorp.com", phone: "+1 (555) 456-7890", invoices: 2, total: 2300 },
    { id: 5, name: "LexCorp", email: "contact@lexcorp.com", phone: "+1 (555) 567-8901", invoices: 5, total: 6100 },
    { id: 6, name: "Queen Industries", email: "info@queen.com", phone: "+1 (555) 678-9012", invoices: 1, total: 1800 },
  ]);

  // Save clients to localStorage whenever it changes
  const saveClientsToStorage = (clients: Client[]) => {
    localStorage.setItem('clientsList', JSON.stringify(clients));
  };

  // Load clients from localStorage on component mount
  useState(() => {
    const savedClients = localStorage.getItem('clientsList');
    if (savedClients) {
      try {
        const parsedClients = JSON.parse(savedClients);
        setClientsList(parsedClients);
      } catch (error) {
        console.error("Failed to parse saved clients:", error);
      }
    }
  });

  const filteredClients = searchTerm 
    ? clientsList.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : clientsList;

  const handleAddClient = () => {
    if (!newClient.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Client name is required.",
        variant: "destructive",
      });
      return;
    }
    
    // Create a new client with an ID
    const newId = clientsList.length > 0 ? Math.max(...clientsList.map(c => c.id)) + 1 : 1;
    const clientToAdd: Client = {
      id: newId,
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      invoices: 0,
      total: 0
    };
    
    const updatedClients = [...clientsList, clientToAdd];
    setClientsList(updatedClients);
    saveClientsToStorage(updatedClients);
    
    toast({
      title: "Client Added",
      description: `${newClient.name} has been added to your clients.`,
    });
    setShowAddDialog(false);
    setNewClient({ name: "", email: "", phone: "" });
  };

  const handleEditClient = (client: Client) => {
    setEditingClient({...client});
  };

  const handleSaveEdit = () => {
    if (editingClient) {
      if (!editingClient.name.trim()) {
        toast({
          title: "Missing Information",
          description: "Client name is required.",
          variant: "destructive",
        });
        return;
      }
      
      // Update the client in the list
      const updatedClients = clientsList.map(client => 
        client.id === editingClient.id ? editingClient : client
      );
      setClientsList(updatedClients);
      saveClientsToStorage(updatedClients);
      
      toast({
        title: "Client Updated",
        description: `${editingClient.name} has been updated.`,
      });
      setEditingClient(null);
    }
  };

  const handleDeleteClient = (client: Client) => {
    setClientToDelete(client);
  };

  const confirmDeleteClient = () => {
    if (clientToDelete) {
      const updatedClients = clientsList.filter(client => client.id !== clientToDelete.id);
      setClientsList(updatedClients);
      saveClientsToStorage(updatedClients);
      
      toast({
        title: "Client Removed",
        description: `${clientToDelete.name} has been removed.`,
      });
      setClientToDelete(null);
    }
  };

  const handleViewClient = (clientId: number) => {
    const client = clientsList.find(c => c.id === clientId);
    if (client) {
      toast({
        title: "Viewing Client",
        description: `Now viewing ${client.name} details.`,
      });
    } else {
      toast({
        title: "Error",
        description: `Client #${clientId} not found.`,
        variant: "destructive"
      });
    }
  };

  const handleCreateInvoice = (client: Client) => {
    // Save selected client to localStorage for use in invoice creation
    localStorage.setItem('selectedClient', JSON.stringify(client));
    
    toast({
      title: "Creating Invoice",
      description: `Creating a new invoice for ${client.name}.`,
    });
  };

  return (
    <PageLayout title="Clients">
      <div className="py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search clients..." 
              className="pl-8" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="btn-primary flex items-center gap-2 w-full md:w-auto">
                <UserPlus size={16} />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>
                  Create a new client to start sending invoices.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddClient}>Add Client</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Client Dialog */}
          <Dialog open={!!editingClient} onOpenChange={(open) => !open && setEditingClient(null)}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Client</DialogTitle>
                <DialogDescription>
                  Update client information.
                </DialogDescription>
              </DialogHeader>
              {editingClient && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="edit-name"
                      value={editingClient.name}
                      onChange={(e) => setEditingClient({...editingClient, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editingClient.email}
                      onChange={(e) => setEditingClient({...editingClient, email: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="edit-phone"
                      type="tel"
                      value={editingClient.phone}
                      onChange={(e) => setEditingClient({...editingClient, phone: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button type="submit" onClick={handleSaveEdit}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Delete Confirmation Dialog */}
          <AlertDialog open={!!clientToDelete} onOpenChange={(open) => !open && setClientToDelete(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove {clientToDelete?.name} from your clients.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDeleteClient} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {filteredClients.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <User className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">No clients found</h3>
            <p className="text-muted-foreground mt-2">
              {searchTerm ? "No clients match your search criteria." : "You haven't added any clients yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClients.map((client) => (
              <Card key={client.id} className="overflow-hidden">
              <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-primary-bg p-2 rounded-full">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium text-lg">{client.name}</h3>
                </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditClient(client)}>
                        <PenLine className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteClient(client)}>
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                  </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm">{client.email}</span>
                </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm">{client.phone}</span>
                  </div>
                  </div>
                  <Link to="/create-invoice" onClick={() => handleCreateInvoice(client)}>
                    <Button className="w-full">Create Invoice</Button>
                  </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Clients;
