import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import PageLayout from "@/components/PageLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();
  
  useEffect(() => {
    // Only redirect when authentication is fully loaded
    if (isLoaded) {
      if (isSignedIn) {
        // If user is signed in, redirect to invoices
        navigate("/invoices");
      } else {
        // If not signed in, redirect to home
        navigate("/");
      }
    }
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mb-4"></div>
        <p className="text-gray-600">Preparing your dashboard...</p>
      </div>
    </PageLayout>
  );
};

export default Dashboard; 