
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ImageIcon, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatHistory } from "@/hooks/useChatHistory";
import { AGENT_CATEGORIES, DEFAULT_PROMPTS } from "@/data/agentCategories";
import AgentCategoriesList from "@/components/sidebar/AgentCategoriesList";
import RecentChatsList from "@/components/sidebar/RecentChatsList";
import UserProfileSection from "@/components/sidebar/UserProfileSection";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const { getAllChats } = useChatHistory();
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
    } else {
      setActiveItem(null);
      setActiveChatId(null);
    }
  }, [location.pathname]);
  
  const handleAgentClick = (slug: string) => {
    setActiveItem(slug);
    setActiveChatId(null);
    navigate(`/chat/${slug}`, { 
      state: { 
        defaultPrompt: DEFAULT_PROMPTS[slug] || "" 
      } 
    });
  };
  
  const handleNewChat = () => {
    setActiveItem(null);
    setActiveChatId(null);
    navigate("/", { replace: true });
  };

  const handleChatHistoryClick = (chatId: string) => {
    setActiveItem(null);
    setActiveChatId(chatId);
    navigate(`/chat/history/${chatId}`);
  };

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border w-[260px] text-sidebar-foreground">
      <div className="p-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={handleNewChat}
        >
          <Plus className="h-5 w-5" />
          New Chat
        </Button>
        
        <div className="flex gap-2 mt-2">
          <Button
            variant="secondary"
            className="flex-1 justify-start gap-2 bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
            onClick={() => navigate("/gallery")}
          >
            <ImageIcon className="h-4 w-4" />
            Gallery
          </Button>
          
          <Button
            variant="secondary"
            className="flex-1 justify-start gap-2 bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
            onClick={() => navigate("/public-chat")}
          >
            <Users className="h-4 w-4" />
            Public Chat
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
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
        </div>
      </ScrollArea>
      
      <div className="p-2 border-t border-sidebar-border">
        <UserProfileSection />
      </div>
    </div>
  );
};

export default Sidebar;
