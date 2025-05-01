
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure the UI reflects the correct state when navigating directly to a page
  useEffect(() => {
    // If on gallery page, ensure we handle exploration view correctly
    if (location.pathname === '/gallery') {
      const headerTabs = document.querySelectorAll('[data-tab="Explore"]');
      headerTabs.forEach(tab => {
        if (tab instanceof HTMLElement) {
          tab.click();
        }
      });
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <div 
          className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                     transition-transform duration-200 md:translate-x-0 h-full fixed md:static z-20`}
        >
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-hidden relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 md:hidden z-10 rounded-full"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
          
          <main className="h-full">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
