
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, 
  ImageIcon, 
  FileTextIcon, 
  GlobeIcon, 
  Users, 
  Settings, 
  User, 
  Moon, 
  Sun, 
  LogOut,
  Clock
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatHistory, Chat } from "@/hooks/useChatHistory";

type AgentCategory = {
  name: string;
  items: {
    name: string;
    slug: string;
  }[];
};

const AGENT_CATEGORIES: AgentCategory[] = [
  {
    name: "GOV",
    items: [
      { name: "County", slug: "county" },
      { name: "City", slug: "city" }
    ]
  },
  {
    name: "UTILITIES",
    items: [
      { name: "Water", slug: "water" },
      { name: "Trash", slug: "trash" },
      { name: "Sewer", slug: "sewer" }
    ]
  },
  {
    name: "COMPANIES",
    items: [
      { name: "Boeing", slug: "boeing" },
      { name: "Monsanto", slug: "monsanto" },
      { name: "Amazon", slug: "amazon" },
      { name: "Handyman Hardware", slug: "handyman" },
      { name: "Dierbergs", slug: "dierbergs" }
    ]
  }
];

const DEFAULT_PROMPTS: Record<string, string> = {
  "water": "How do I pay my water bill in St. Louis?",
  "boeing": "Tell me about Boeing's presence in St. Louis",
  "county": "How do I pay my property taxes in St. Louis County?",
  "city": "How do I get a business license in St. Louis City?",
  "trash": "What day is trash collection in my area?",
  "sewer": "Who do I call for sewer backup issues?",
  "monsanto": "What is Monsanto's history in St. Louis?",
  "amazon": "Where are Amazon fulfillment centers in the St. Louis area?",
  "handyman": "Where are the Handyman True Value Hardware stores in St. Louis?",
  "dierbergs": "What are Dierbergs' store hours?"
};

const Sidebar = () => {
  const { profile, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const { getAllChats } = useChatHistory();
  const recentChats = getAllChats().slice(0, 6); // Get up to 6 most recent chats
  
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
    <div className="flex flex-col h-full bg-secondary border-r border-border w-[260px] text-foreground">
      <div className="p-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-large"
          onClick={handleNewChat}
        >
          <Plus className="h-5 w-5" />
          New Chat
        </Button>
        
        <div className="flex gap-2 mt-2">
          <Button
            variant="secondary"
            className="flex-1 justify-start gap-2"
            onClick={() => navigate("/gallery")}
          >
            <ImageIcon className="h-4 w-4" />
            Gallery
          </Button>
          
          <Button
            variant="secondary"
            className="flex-1 justify-start gap-2"
            onClick={() => navigate("/public-chat")}
          >
            <Users className="h-4 w-4" />
            Public Chat
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          <div className="text-center mb-3 mt-2">
            <h3 className="font-bold text-sm">AGENTS</h3>
            <Separator className="mt-1" />
          </div>
          
          {AGENT_CATEGORIES.map((category, index) => (
            <div key={category.name} className="mb-4">
              <p className="text-xs font-medium text-muted-foreground ml-2 mb-1">
                {category.name}
              </p>
              
              {category.items.map((item) => (
                <button
                  key={item.slug}
                  className={`sidebar-item ${activeItem === item.slug ? 'sidebar-item-active' : ''} w-full text-left`}
                  onClick={() => handleAgentClick(item.slug)}
                >
                  {item.name}
                </button>
              ))}
              
              {index < AGENT_CATEGORIES.length - 1 && (
                <Separator className="my-3 mx-2" />
              )}
            </div>
          ))}
          
          {/* Recent Chats Section */}
          <div className="mt-4">
            <div className="text-center mb-3 mt-2">
              <h3 className="font-bold text-sm">RECENT CHATS</h3>
              <Separator className="mt-1" />
            </div>
            {recentChats.length > 0 ? (
              <div className="space-y-1">
                {recentChats.map((chat) => (
                  <button
                    key={chat.id}
                    className={`sidebar-item ${activeChatId === chat.id ? 'sidebar-item-active' : ''} w-full text-left flex items-center gap-2`}
                    onClick={() => handleChatHistoryClick(chat.id)}
                    title={chat.title}
                  >
                    <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{chat.title}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-center text-muted-foreground px-2">
                Your recent conversations will appear here
              </p>
            )}
          </div>
        </div>
      </ScrollArea>
      
      <div className="p-2 border-t border-border">
        <div className="flex items-center gap-2 p-2">
          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
            {profile?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="text-sm font-medium flex-1 truncate">
            {profile?.username || 'User'}
          </span>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => signOut()}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
