import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  ImageIcon, 
  Users
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useChatHistory } from "@/hooks/useChatHistory";
import AgentCategoriesList from "@/components/sidebar/AgentCategoriesList";
import RecentChatsList from "@/components/sidebar/RecentChatsList";
import UserProfileSection from "@/components/sidebar/UserProfileSection";
import { AGENT_CATEGORIES } from "@/data/agentCategories";
import { DEFAULT_PROMPTS } from "@/data/prompts";

const CustomSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const { getAllChats } = useChatHistory();
  const { setOpen } = useSidebar();
  
  const recentChats = getAllChats().slice(0, 6);
  
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
    
    // Close the sidebar and navigate
    setOpen(false);
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
    
    const newChatId = `new-${uuidv4()}`;
    console.log("new chat clicked, generating ID:", newChatId);
    
    // Close the sidebar and navigate
    setOpen(false);
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
    
    // Close the sidebar and navigate
    setOpen(false);
    setTimeout(() => {
      navigate(`/chat/history/${chatId}`);
    }, 100);
  };

  const handleNavigationClick = (path: string) => {
    setOpen(false);
    setTimeout(() => navigate(path), 100);
  };

  return (
    <Sidebar className="bg-sidebar border-sidebar-border text-sidebar-foreground">
      <SidebarHeader>
        <Button
          variant="outline"
          className="w-full justify-center gap-2 text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={handleNewChat}
          aria-label="New Chat"
        >
          <MessageSquare className="h-5 w-5" />
          <span>New Chat</span>
        </Button>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleNavigationClick("/gallery")}
                  className="w-full justify-start gap-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  Gallery
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleNavigationClick("/public-chat")}
                  className="w-full justify-start gap-2"
                >
                  <Users className="h-4 w-4" />
                  Public Chat
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
