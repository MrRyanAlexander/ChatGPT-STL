import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ChatArea from "@/components/ChatArea";
import { 
  SidebarProvider, 
  SidebarTrigger,
  Sidebar,
  SidebarInset
} from "@/components/ui/sidebar";
import CustomSidebar from "@/components/CustomSidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMobile, setOpenMobile] = useState(false);
  
  // Ensure the UI reflects the correct state when navigating directly to a page
  useEffect(() => {
    // Handle navigation based on current route
    const isExplorePage = location.pathname === '/explore';
    const isGalleryPage = location.pathname === '/gallery';
    
    // Update header tabs based on current page
    if (isExplorePage) {
      const headerTabs = document.querySelectorAll('[data-tab="Explore"]');
      headerTabs.forEach(tab => {
        if (tab instanceof HTMLElement) {
          tab.setAttribute('data-active', 'true');
        }
      });
      
      const chatTabs = document.querySelectorAll('[data-tab="Chat"]');
      chatTabs.forEach(tab => {
        if (tab instanceof HTMLElement) {
          tab.setAttribute('data-active', 'false');
        }
      });
    } else if (isGalleryPage) {
      // Do nothing for gallery as it's handled separately
    } else {
      const headerTabs = document.querySelectorAll('[data-tab="Chat"]');
      headerTabs.forEach(tab => {
        if (tab instanceof HTMLElement) {
          tab.setAttribute('data-active', 'true');
        }
      });
      
      const exploreTabs = document.querySelectorAll('[data-tab="Explore"]');
      exploreTabs.forEach(tab => {
        if (tab instanceof HTMLElement) {
          tab.setAttribute('data-active', 'false');
        }
      });
    }
  }, [location.pathname]);

  // Determine if we're on a chat-related page
  const isChatPage = !location.pathname.startsWith('/explore') && 
                     !location.pathname.startsWith('/gallery') &&
                     !location.pathname.startsWith('/settings') &&
                     !location.pathname.startsWith('/terms') &&
                     !location.pathname.startsWith('/privacy');

  return (
    <div className="flex flex-col h-screen bg-background w-full max-w-full">
      <SidebarProvider defaultOpen={false}>
        <Header />
        <div className="flex flex-1 overflow-hidden w-full">
          <CustomSidebar />         
          <SidebarInset>
            <div className="relative h-full">
              <div className="absolute top-4 left-4 md:hidden z-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full shadow-sm"
                  onClick={() => setOpenMobile(!openMobile)}
                >
                  <Menu size={18} />
                </Button>
              </div>
              
              {/* Desktop sidebar trigger */}
              <div className="hidden md:block absolute top-4 left-4 z-10">
                <SidebarTrigger className="rounded-full shadow-sm bg-background" />
              </div>
              
              <main className="h-full px-2 pt-14 md:pt-14 md:pl-6">
                <Outlet />
              </main>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Layout;
