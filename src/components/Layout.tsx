
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ChatArea from "@/components/ChatArea";
import { 
  SidebarProvider, 
  Sidebar,
  SidebarInset
} from "@/components/ui/sidebar";
import CustomSidebar from "@/components/CustomSidebar";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
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
    <div className="flex flex-col h-screen bg-background">
      <SidebarProvider defaultOpen={false}>
        <Header />
        <div className="flex flex-grow overflow-hidden w-full">
          <CustomSidebar />
          
          <SidebarInset className="flex flex-col h-full">
            <main className="flex-grow overflow-hidden relative">
              {isChatPage ? (
                // Show the chat interface for chat-related pages
                <ChatArea key="main-chat" />
              ) : (
                // Show other content for non-chat pages using Outlet
                <Outlet />
              )}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
