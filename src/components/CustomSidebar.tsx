
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  ImageIcon, 
  Users,
  X
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useChatHistory } from "@/hooks/useChatHistory";
import AgentCategoriesList from "@/components/sidebar/AgentCategoriesList";
import RecentChatsList from "@/components/sidebar/RecentChatsList";
import UserProfileSection from "@/components/sidebar/UserProfileSection";
import { AGENT_CATEGORIES, DEFAULT_PROMPTS } from "@/data/agentCategories";

const CustomSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const { getAllChats } = useChatHistory();
  const { isMobile, setOpenMobile, setOpen, toggleSidebar } = useSidebar();
  
  const recentChats = getAllChats().slice(0, 6); // Get up to 6 most recent chats
  
  // Set active states based on current URL
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === 'chat' && pathParts[2] !== 'history') {
      setActiveItem(pathParts[2]);
      setActiveChatId(null);
    } else if (pathParts[1] === 'chat' && pathParts[2] === 'history' && pathParts[3]) {
      setActiveItem(null);
      setActiveChatId(pathParts[3]);
    } else if (pathParts[1] === '') {
      // We're on the home page (root path)
      setActiveItem(null);
      setActiveChatId(null);
    } else {
      setActiveItem(null);
      setActiveChatId(null);
    }
  }, [location.pathname]);
  
  const handleAgentClick = (slug: string) => {
    setActiveItem(slug);
    setActiveChatId(null);
    
    // Close the sidebar before navigating
    if (isMobile) {
      setOpenMobile(false);
    } else {
      setOpen(false);
    }
    
    // Use a small timeout to ensure the sidebar closing animation starts before navigation
    setTimeout(() => {
      navigate(`/chat/${slug}`, { 
        state: { 
          defaultPrompt: DEFAULT_PROMPTS[slug] || "" 
        } 
      });
    }, 100);
  };
  
  const handleNewChat = () => {
    setActiveItem(null);
    setActiveChatId(null);
    
    // Generate a new unique chat ID
    const newChatId = `new-${uuidv4()}`;
    console.log("new chat clicked, generating ID:", newChatId);
    
    // Close the sidebar before navigating
    if (isMobile) {
      setOpenMobile(false);
    } else {
      setOpen(false);
    }
    
    // Use a small timeout to ensure the sidebar closing animation starts before navigation
    setTimeout(() => {
      navigate("/", { 
        replace: true, 
        state: { 
          newChat: true,
          chatId: newChatId 
        } 
      });
    }, 100);
  };

  const handleChatHistoryClick = (chatId: string) => {
    setActiveItem(null);
    setActiveChatId(chatId);
    
    // Close the sidebar before navigating
    if (isMobile) {
      setOpenMobile(false);
    } else {
      setOpen(false);
    }
    
    // Use a small timeout to ensure the sidebar closing animation starts before navigation
    setTimeout(() => {
      navigate(`/chat/history/${chatId}`);
    }, 100);
  };

  return (
    <Sidebar className="bg-sidebar border-sidebar-border text-sidebar-foreground h-full max-h-screen overflow-hidden">
      <SidebarHeader className="pb-0 relative">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={() => setOpenMobile(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-sidebar-foreground" />
          </Button>
        )}
      
        <Button
          variant="outline"
          className="w-full justify-center gap-2 text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={handleNewChat}
          aria-label="New Chat"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="md:inline-block">New Chat</span>
        </Button>
        
        <div className="flex gap-2 mt-2">
          <Button
            variant="secondary"
            className="flex-1 justify-start gap-2 bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
            onClick={() => {
              if (isMobile) setOpenMobile(false);
              else setOpen(false);
              setTimeout(() => navigate("/gallery"), 100);
            }}
          >
            <ImageIcon className="h-4 w-4" />
            Gallery
          </Button>
          
          <Button
            variant="secondary"
            className="flex-1 justify-start gap-2 bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
            onClick={() => {
              if (isMobile) setOpenMobile(false);
              else setOpen(false);
              setTimeout(() => navigate("/public-chat"), 100);
            }}
          >
            <Users className="h-4 w-4" />
            Public Chat
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <AgentCategoriesList 
          categories={AGENT_CATEGORIES}
          activeItem={activeItem}
          onAgentClick={handleAgentClick}
        />
        
        <RecentChatsList 
          chats={recentChats}
          activeChatId={activeChatId}
          onChatClick={handleChatHistoryClick}
        />
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border">
        <UserProfileSection />
      </SidebarFooter>
    </Sidebar>
  );
};

export default CustomSidebar;
