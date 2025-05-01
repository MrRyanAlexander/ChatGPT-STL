
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen">
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
            variant="outline"
            size="icon"
            className="absolute top-4 left-4 md:hidden z-10"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "<" : ">"}
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
