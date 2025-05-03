import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { 
  SidebarProvider, 
  useSidebar
} from "@/components/ui/sidebar";
import CustomSidebar from "@/components/CustomSidebar";

const Layout = () => {
  // We only need SidebarProvider here, InnerLayout will handle everything else
  return (
    <SidebarProvider defaultOpen={false}>
      <InnerLayout />
    </SidebarProvider>
  );
};

// Keep InnerLayout with all the functionality
const InnerLayout = () => {
  const { open, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if we're on a chat-related page
  const isChatPage = !location.pathname.startsWith('/explore') && 
                    !location.pathname.startsWith('/gallery') &&
                    !location.pathname.startsWith('/settings') &&
                    !location.pathname.startsWith('/terms') &&
                    !location.pathname.startsWith('/privacy');

  // useEffect for handling tab states
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
        ${open ? "translate-x-[85vw]" : "translate-x-0"}
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
