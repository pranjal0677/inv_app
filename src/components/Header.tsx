import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  FileText,
  Plus, 
  Menu, 
  X,
  LogOut,
  CreditCard,
  Crown
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { UserButton, SignOutButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();

  const handleUpgradeClick = () => {
    toast({
      title: "Premium Plans",
      description: "Premium plans coming soon! Stay tuned for more features.",
    });
  };

  return (
    <header className="border-b border-border bg-white sticky top-0 z-30">
      <div className="container mx-auto py-4 px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                InvoiceGen
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center gap-6">
              <ul className="flex items-center gap-6">
                <li>
                  <Link to="/" className="text-foreground hover:text-primary transition-colors">Dashboard</Link>
                </li>
                <li>
                  <Link to="/invoices" className="text-foreground hover:text-primary transition-colors">Invoices</Link>
                </li>
                <li>
                  <Link to="/clients" className="text-foreground hover:text-primary transition-colors">Clients</Link>
                </li>
                <li>
                  <Link to="/settings" className="text-foreground hover:text-primary transition-colors">Settings</Link>
                </li>
              </ul>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white border-amber-500 hover:bg-amber-500"
                  onClick={handleUpgradeClick}
                >
                  <Crown size={16} />
                  Upgrade
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {user?.fullName || user?.emailAddresses?.[0]?.emailAddress}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleUpgradeClick}>
                      <Crown className="mr-2 h-4 w-4" />
                      <span>Premium Plans</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <SignOutButton>
                        <div className="flex items-center">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </div>
                      </SignOutButton>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link to="/create-invoice">
                  <Button className="btn-primary flex items-center gap-2">
                    <Plus size={16} />
                    New Invoice
                  </Button>
                </Link>
              </div>
            </nav>
          )}

          {/* Mobile Menu Toggle Button */}
          {isMobile && (
            <div className="flex items-center gap-3">
              <UserButton afterSignOutUrl="/" />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <nav className="py-4 animate-fade-in">
            <ul className="grid gap-4">
              <li>
                <Link to="/" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/invoices" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  Invoices
                </Link>
              </li>
              <li>
                <Link to="/clients" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  Clients
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  Settings
                </Link>
              </li>
              
              <li>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full justify-start p-2 h-auto font-normal bg-gradient-to-r from-amber-400 to-amber-600 text-white border-amber-500"
                  onClick={() => {
                    handleUpgradeClick();
                    setMobileMenuOpen(false);
                  }}
                >
                  <Crown size={16} />
                  Upgrade to Premium
                </Button>
              </li>
              
              <li className="pt-4 border-t border-border">
                <Link to="/create-invoice" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="btn-primary w-full flex items-center justify-center gap-2">
                    <Plus size={16} />
                    New Invoice
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
