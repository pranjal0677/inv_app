
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="container mx-auto flex-1">
        {title && (
          <div className="pt-8 px-4 md:px-6">
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
