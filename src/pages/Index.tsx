import Dashboard from "@/components/Dashboard";
import PageLayout from "@/components/PageLayout";
import { useAuth, SignInButton, SignOutButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">Invoice Generator</h1>
          <p className="text-lg text-gray-600">Create professional invoices with ease</p>
        </div>

        {isSignedIn ? (
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-8">
              <Link 
                to="/create-invoice" 
                className="bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-lg text-center text-lg font-medium transition-colors"
              >
                Create New Invoice
              </Link>
              <Link 
                to="/invoices" 
                className="bg-purple-100 hover:bg-purple-200 text-purple-800 py-4 px-6 rounded-lg text-center text-lg font-medium transition-colors"
              >
                View My Invoices
              </Link>
              <Link 
                to="/clients" 
                className="bg-purple-100 hover:bg-purple-200 text-purple-800 py-4 px-6 rounded-lg text-center text-lg font-medium transition-colors"
              >
                Manage Clients
              </Link>
              <Link 
                to="/settings" 
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 px-6 rounded-lg text-center text-lg font-medium transition-colors"
              >
                Settings
              </Link>
            </div>
            <div className="mt-6">
              <SignOutButton>
                <button className="text-sm text-gray-600 hover:text-purple-700">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-8 text-lg">Sign in to create and manage your invoices</p>
            <div className="flex gap-4 justify-center">
              <SignInButton mode="modal">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg text-lg font-medium transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <Link 
                to="/sign-up" 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-lg text-lg font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Index;
