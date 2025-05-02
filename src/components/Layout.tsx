
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { 
  SidebarProvider, 
  Sidebar,
  SidebarInset,
  useSidebar
} from "@/components/ui/sidebar";
import CustomSidebar from "@/components/CustomSidebar";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine if we're on a chat-related page
  const isChatPage = !location.pathname.startsWith('/explore') && 
                     !location.pathname.startsWith('/gallery') &&
                     !location.pathname.startsWith('/settings') &&
                     !location.pathname.startsWith('/terms') &&
                     !location.pathname.startsWith('/privacy');

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex flex-col h-screen bg-background w-full max-w-full">
        <Header />
        <div className="flex flex-1 overflow-hidden w-full">
          <CustomSidebar />         
          <main className="flex-1 overflow-hidden">
            <div className="h-full relative">
              <div className="h-full px-2 pt-14 md:pt-14 md:pl-6">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
      <InnerLayout />
    </SidebarProvider>
  );
};

// New component: can hook into sidebar context
const InnerLayout = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  // Moved useEffect logic from main Layout component
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

  return (
    <div
      className={`
        flex flex-col h-screen w-full max-w-full bg-background
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-[85vw]" : "translate-x-0"}
      `}
    >
      <Header onMenuClick={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden w-full">
        <CustomSidebar />
        <main className="flex-1 overflow-auto">
          <div className="h-full relative">
            <div className="h-full px-2 pt-14 md:pt-14 md:pl-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
