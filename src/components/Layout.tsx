
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
  const { open, toggleSidebar, setOpenMobile, isMobile } = useSidebar();
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
    <div className="flex flex-col h-screen w-full max-w-full bg-background">
      {/* Fixed-position header */}
      <Header onMenuClick={toggleSidebar} />
      
      {/* Main content area with sidebar and outlet */}
      <div className="flex flex-1 overflow-hidden w-full relative">
        {/* Sidebar with fixed positioning - doesn't shift with content */}
        <div className={`fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out h-full`} 
             style={{ 
               top: '60px', // Account for header height
               width: '320px',
               transform: open ? 'translateX(0)' : 'translateX(-100%)'
             }}>
          <CustomSidebar />
        </div>
        
        {/* Overlay to capture clicks when sidebar is open on mobile */}
        {open && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={toggleSidebar}
          />
        )}
        
        {/* Main content that slides right when sidebar opens */}
        <div 
          className={`
            flex-1 w-full overflow-auto transition-transform duration-300 ease-in-out
            ${open ? 'md:pl-[320px]' : ''}
          `}
          style={{
            transform: open && isMobile ? 'translateX(320px)' : 'translateX(0)'
          }}
        >
          <main className="h-full relative">
            <div className="h-full px-2 pt-14 md:pt-14 md:pl-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
