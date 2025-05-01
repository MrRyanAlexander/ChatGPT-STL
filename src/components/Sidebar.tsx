
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  
  const handleAgentClick = (slug: string) => {
    setActiveItem(slug);
    navigate(`/chat/${slug}`, { 
      state: { 
        defaultPrompt: DEFAULT_PROMPTS[slug] || "" 
      } 
    });
  };
  
  const handleNewChat = () => {
    setActiveItem(null);
    navigate("/");
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
          <p className="text-sm font-medium text-muted-foreground ml-2 mb-1 mt-2">
            AGENTS
          </p>
          
          {AGENT_CATEGORIES.map((category) => (
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
            </div>
          ))}
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
