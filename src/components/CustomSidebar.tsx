
import { useState, useEffect } from 'react';
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  useSidebar
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  ImageIcon, 
  Users, 
  Settings, 
  User, 
  Moon, 
  Sun, 
  LogOut,
  Clock,
  X
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useChatHistory } from "@/hooks/useChatHistory";

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

const CustomSidebar = () => {
  const { profile, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
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
    
    // Close the sidebar before navigating
    if (isMobile) {
      setOpenMobile(false);
    } else {
      setOpen(false);
    }
    
    // Use a small timeout to ensure the sidebar closing animation starts before navigation
    setTimeout(() => {
      navigate("/", { replace: true });
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
        {/* AGENTS SECTION */}
        <SidebarGroup>
          <SidebarGroupLabel>AGENTS</SidebarGroupLabel>
          <SidebarGroupContent>
            {AGENT_CATEGORIES.map((category, index) => (
              <div key={category.name} className="mb-4">
                <p className="text-xs font-medium text-sidebar-foreground/70 ml-2 mb-1">
                  {category.name}
                </p>
                
                <SidebarMenu>
                  {category.items.map((item) => (
                    <SidebarMenuItem key={item.slug}>
                      <SidebarMenuButton 
                        isActive={activeItem === item.slug} 
                        onClick={() => handleAgentClick(item.slug)}
                        tooltip={item.name}
                      >
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
                
                {index < AGENT_CATEGORIES.length - 1 && (
                  <SidebarSeparator className="my-3" />
                )}
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* RECENT CHATS SECTION */}
        <SidebarGroup>
          <SidebarGroupLabel>RECENT CHATS</SidebarGroupLabel>
          <SidebarGroupContent>
            {recentChats.length > 0 ? (
              <SidebarMenu>
                {recentChats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton 
                      isActive={activeChatId === chat.id}
                      onClick={() => handleChatHistoryClick(chat.id)}
                      tooltip={chat.title}
                    >
                      <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="truncate">{chat.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ) : (
              <p className="text-xs text-center text-sidebar-foreground/70 px-2">
                Your recent conversations will appear here
              </p>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2 p-2">
          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
            {profile?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="text-sm font-medium flex-1 truncate text-sidebar-foreground">
            {profile?.username || 'User'}
          </span>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-sidebar-foreground" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Settings className="h-4 w-4 text-sidebar-foreground" />
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" 
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4 text-sidebar-foreground" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default CustomSidebar;
