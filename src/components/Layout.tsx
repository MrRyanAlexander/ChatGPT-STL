
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "@/components/CustomSidebar";

const Layout = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen w-full max-w-full bg-background">
        {/* Sidebar */}
        <CustomSidebar />
        
        {/* Main content area */}
        <div className="flex flex-col flex-1 overflow-hidden w-full">
          {/* Fixed-position header */}
          <Header />
          
          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <div className="h-full px-2 pt-2 md:pt-2 md:pl-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
