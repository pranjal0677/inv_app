import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Building, 
  FileText, 
  CreditCard, 
  Save,
  Settings as SettingsIcon
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  
  // Business Information
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [taxId, setTaxId] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  
  // Invoice Customization
  const [invoicePrefix, setInvoicePrefix] = useState("INV-");
  const [nextInvoiceNumber, setNextInvoiceNumber] = useState("001");
  const [defaultTermsAndConditions, setDefaultTermsAndConditions] = useState(
    "1. Payment is due within the timeframe specified on this invoice.\n" +
    "2. Late payments may be subject to additional fees or interest charges.\n" +
    "3. All prices are in the currency specified on this invoice.\n" +
    "4. Services/products are provided as-is without warranty unless otherwise specified.\n" +
    "5. Any disputes regarding this invoice must be raised within 7 days of receipt.\n" +
    "6. The seller retains ownership of goods until payment is received in full.\n" +
    "7. Taxes are calculated as per applicable laws and regulations."
  );
  
  // Payment Settings
  const [currency, setCurrency] = useState("INR");
  const [taxRate, setTaxRate] = useState("18");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [upiId, setUpiId] = useState("");
  
  // Logo file handling
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  
  // Load saved settings on component mount
  useEffect(() => {
    // Load business information
    const savedBusinessName = localStorage.getItem('businessName');
    if (savedBusinessName) setBusinessName(savedBusinessName);
    
    const savedBusinessEmail = localStorage.getItem('businessEmail');
    if (savedBusinessEmail) setBusinessEmail(savedBusinessEmail);
    
    const savedBusinessPhone = localStorage.getItem('businessPhone');
    if (savedBusinessPhone) setBusinessPhone(savedBusinessPhone);
    
    const savedTaxId = localStorage.getItem('taxId');
    if (savedTaxId) setTaxId(savedTaxId);
    
    const savedPanNumber = localStorage.getItem('panNumber');
    if (savedPanNumber) setPanNumber(savedPanNumber);
    
    const savedBusinessAddress = localStorage.getItem('businessAddress');
    if (savedBusinessAddress) setBusinessAddress(savedBusinessAddress);
    
    // Load invoice customization
    const savedInvoicePrefix = localStorage.getItem('invoicePrefix');
    if (savedInvoicePrefix) setInvoicePrefix(savedInvoicePrefix);
    
    const savedNextInvoiceNumber = localStorage.getItem('nextInvoiceNumber');
    if (savedNextInvoiceNumber) setNextInvoiceNumber(savedNextInvoiceNumber);
    
    const savedTermsAndConditions = localStorage.getItem('defaultTermsAndConditions');
    if (savedTermsAndConditions) setDefaultTermsAndConditions(savedTermsAndConditions);
    
    // Load payment settings
    const savedCurrency = localStorage.getItem('defaultCurrency');
    if (savedCurrency) setCurrency(savedCurrency);
    
    const savedTaxRate = localStorage.getItem('defaultTaxRate');
    if (savedTaxRate) setTaxRate(savedTaxRate);
    
    const savedAccountName = localStorage.getItem('accountName');
    if (savedAccountName) setAccountName(savedAccountName);
    
    const savedAccountNumber = localStorage.getItem('accountNumber');
    if (savedAccountNumber) setAccountNumber(savedAccountNumber);
    
    const savedBankName = localStorage.getItem('bankName');
    if (savedBankName) setBankName(savedBankName);
    
    const savedIfscCode = localStorage.getItem('ifscCode');
    if (savedIfscCode) setIfscCode(savedIfscCode);
    
    const savedUpiId = localStorage.getItem('upiId');
    if (savedUpiId) setUpiId(savedUpiId);
    
    // Load logo
    const savedLogo = localStorage.getItem('companyLogo');
    if (savedLogo) setLogoPreview(savedLogo);
  }, []);
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const saveBusinessInformation = () => {
    // Save business information to localStorage
    localStorage.setItem('businessName', businessName);
    localStorage.setItem('businessEmail', businessEmail);
    localStorage.setItem('businessPhone', businessPhone);
    localStorage.setItem('taxId', taxId);
    localStorage.setItem('panNumber', panNumber);
    localStorage.setItem('businessAddress', businessAddress);
    
    if (logoPreview) {
      localStorage.setItem('companyLogo', logoPreview);
    }
    
    // Save company details object for direct use in invoice generation
    const companyDetails = {
      name: businessName,
      email: businessEmail,
      phone: businessPhone,
      address: businessAddress,
      taxId: taxId,
      pan: panNumber,
      logo: logoPreview
    };
    
    localStorage.setItem('companyDetails', JSON.stringify(companyDetails));
    
    toast({
      title: "Business Information Saved",
      description: "Your business information has been updated successfully.",
    });
  };
  
  const saveInvoiceSettings = () => {
    // Save invoice customization to localStorage
    localStorage.setItem('invoicePrefix', invoicePrefix);
    localStorage.setItem('nextInvoiceNumber', nextInvoiceNumber);
    localStorage.setItem('defaultTermsAndConditions', defaultTermsAndConditions);
    
    toast({
      title: "Invoice Settings Saved",
      description: "Your invoice settings have been updated successfully.",
    });
  };
  
  const savePaymentSettings = () => {
    // Save payment settings to localStorage
    localStorage.setItem('defaultCurrency', currency);
    localStorage.setItem('defaultTaxRate', taxRate);
    localStorage.setItem('accountName', accountName);
    localStorage.setItem('accountNumber', accountNumber);
    localStorage.setItem('bankName', bankName);
    localStorage.setItem('ifscCode', ifscCode);
    localStorage.setItem('upiId', upiId);
    
    // Save bank details object for direct use in invoice generation
    const bankDetailsObj = {
      accountName: accountName,
      accountNumber: accountNumber,
      bankName: bankName,
      ifscCode: ifscCode,
      upiId: upiId
    };
    
    localStorage.setItem('bankDetails', JSON.stringify(bankDetailsObj));
    
    toast({
      title: "Payment Settings Saved",
      description: "Your payment settings have been updated successfully.",
    });
  };

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
                    <Input 
                      id="businessName" 
                      placeholder="Enter your business name" 
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail">Email</Label>
                    <Input 
                      id="businessEmail" 
                      type="email" 
                      placeholder="Enter your email address" 
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone">Phone Number</Label>
                    <Input 
                      id="businessPhone" 
                      placeholder="Enter your phone number" 
                      value={businessPhone}
                      onChange={(e) => setBusinessPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / GST Number</Label>
                    <Input 
                      id="taxId" 
                      placeholder="Enter your tax ID" 
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input 
                    id="panNumber" 
                    placeholder="Enter your PAN number" 
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Address</Label>
                  <Textarea 
                    id="businessAddress" 
                    placeholder="Enter your business address" 
                    rows={3} 
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo">Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="w-full max-w-sm"
                    />
                    {logoPreview && (
                      <div className="w-20 h-20 border rounded flex items-center justify-center p-1">
                        <img src={logoPreview} alt="Logo preview" className="max-w-full max-h-full object-contain" />
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  className="btn-primary w-full sm:w-auto flex items-center gap-2"
                  onClick={saveBusinessInformation}
                >
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
                    <Input 
                      id="invoicePrefix" 
                      placeholder="e.g. INV-" 
                      value={invoicePrefix}
                      onChange={(e) => setInvoicePrefix(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextInvoiceNumber">Next Invoice Number</Label>
                    <Input 
                      id="nextInvoiceNumber" 
                      type="text" 
                      value={nextInvoiceNumber}
                      onChange={(e) => setNextInvoiceNumber(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultTermsAndConditions">Default Terms and Conditions</Label>
                  <Textarea 
                    id="defaultTermsAndConditions" 
                    placeholder="Enter default terms and conditions for your invoices" 
                    rows={7} 
                    value={defaultTermsAndConditions}
                    onChange={(e) => setDefaultTermsAndConditions(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    These terms will appear on page 2 of your invoices when no custom terms are provided.
                  </p>
                </div>
                
                <Button 
                  className="btn-primary w-full sm:w-auto flex items-center gap-2"
                  onClick={saveInvoiceSettings}
                >
                  <Save size={16} />
                  Save Invoice Settings
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Settings Section */}
          <Card className="card-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">₹ (Indian Rupee)</SelectItem>
                        <SelectItem value="USD">$ (US Dollar)</SelectItem>
                        <SelectItem value="EUR">€ (Euro)</SelectItem>
                        <SelectItem value="GBP">£ (British Pound)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                    <Input 
                      id="taxRate" 
                      type="number" 
                      placeholder="e.g. 18" 
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input 
                      id="accountName" 
                      placeholder="Enter account name" 
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input 
                      id="accountNumber" 
                      placeholder="Enter account number" 
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input 
                      id="bankName" 
                      placeholder="Enter bank name" 
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ifscCode">IFSC Code</Label>
                    <Input 
                      id="ifscCode" 
                      placeholder="Enter IFSC code" 
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID (for QR code payment)</Label>
                  <Input 
                    id="upiId" 
                    placeholder="Enter UPI ID" 
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
                
                <Button 
                  className="btn-primary w-full sm:w-auto flex items-center gap-2"
                  onClick={savePaymentSettings}
                >
                  <Save size={16} />
                  Save Payment Settings
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
