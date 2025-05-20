
import PageLayout from "@/components/PageLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Building, 
  FileText, 
  DollarSign, 
  Save
} from "lucide-react";

const Settings = () => {
  return (
    <PageLayout title="Settings">
      <div className="py-6 px-4 md:px-6">
        <div className="grid gap-8">
          {/* Business Information Section */}
          <Card className="card-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" placeholder="Enter your business name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail">Email</Label>
                    <Input id="businessEmail" type="email" placeholder="Enter your email address" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone">Phone Number</Label>
                    <Input id="businessPhone" placeholder="Enter your phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                    <Input id="taxId" placeholder="Enter your tax ID" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Address</Label>
                  <Textarea id="businessAddress" placeholder="Enter your business address" rows={3} />
                </div>
                
                <Button className="btn-primary w-full sm:w-auto flex items-center gap-2">
                  <Save size={16} />
                  Save Business Information
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Invoice Customization Section */}
          <Card className="card-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Invoice Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                    <Input id="invoicePrefix" placeholder="e.g. INV-" defaultValue="INV-" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextInvoiceNumber">Next Invoice Number</Label>
                    <Input id="nextInvoiceNumber" type="number" defaultValue="001" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="invoiceNotes">Default Invoice Notes</Label>
                  <Textarea id="invoiceNotes" placeholder="Enter default notes for your invoices" rows={3} defaultValue="Thank you for your business!" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Default Payment Terms</Label>
                  <Textarea id="paymentTerms" placeholder="Enter your default payment terms" rows={3} defaultValue="Payment due within 30 days of invoice date." />
                </div>
                
                <Button className="btn-primary w-full sm:w-auto flex items-center gap-2">
                  <Save size={16} />
                  Save Invoice Settings
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Settings */}
          <Card className="card-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Input id="currency" placeholder="e.g. USD" defaultValue="USD" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                    <Input id="taxRate" type="number" defaultValue="0" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bankDetails">Bank Account Details</Label>
                  <Textarea id="bankDetails" placeholder="Enter your bank account details" rows={3} />
                </div>
                
                <Button className="btn-primary w-full sm:w-auto flex items-center gap-2">
                  <Save size={16} />
                  Save Payment Settings
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Account Settings */}
          <Card className="card-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="Enter current password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                  </div>
                </div>
                
                <Button className="btn-primary w-full sm:w-auto flex items-center gap-2">
                  <Save size={16} />
                  Update Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;
