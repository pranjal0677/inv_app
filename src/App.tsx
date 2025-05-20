import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp, useAuth, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreateInvoice from "./pages/CreateInvoice";
import Invoices from "./pages/Invoices";
import Clients from "./pages/Clients";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import React from "react";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  // Show loading spinner while auth state is loading
  if (!isLoaded) return <div>Loading...</div>;
  
  // Redirect to sign-in if not signed in
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;
  
  return <>{children}</>;
};

// Centered Auth Component Wrapper
const CenteredAuth = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        {children}
      </div>
    </div>
  );
};

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ClerkLoading>
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-700"></div>
          </div>
        </ClerkLoading>
        <ClerkLoaded>
        <BrowserRouter>
          <Routes>
              {/* Public routes */}
            <Route path="/" element={<Index />} />
              <Route path="/sign-in/*" element={
                <CenteredAuth>
                  <SignIn routing="path" path="/sign-in" redirectUrl="/dashboard" />
                </CenteredAuth>
              } />
              <Route path="/sign-up/*" element={
                <CenteredAuth>
                  <SignUp routing="path" path="/sign-up" redirectUrl="/dashboard" />
                </CenteredAuth>
              } />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/create-invoice" element={
                <ProtectedRoute>
                  <CreateInvoice />
                </ProtectedRoute>
              } />
              <Route path="/invoices" element={
                <ProtectedRoute>
                  <Invoices />
                </ProtectedRoute>
              } />
              <Route path="/clients" element={
                <ProtectedRoute>
                  <Clients />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </ClerkLoaded>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
