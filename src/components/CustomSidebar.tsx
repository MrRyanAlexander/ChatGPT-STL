import { memo, useCallback, useMemo } from 'react';
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
  Users,
  Bot
} from "lucide-react";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useNavigation } from "@/hooks/useNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import AgentCategoriesList from "@/components/sidebar/AgentCategoriesList";
import RecentChatsList from "@/components/sidebar/RecentChatsList";
import UserProfileSection from "@/components/sidebar/UserProfileSection";
import { AgentService } from "@/services/agentService";

const CustomSidebar = memo(() => {
  const { getAllChats } = useChatHistory();
  const { setOpen, setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();
  const {
    activeItem,
    activeChatId,
    handleAgentClick,
    handleNewChat,
    handleChatHistoryClick,
    handleNavigationClick
  } = useNavigation();
  
  // Memoize recent chats to prevent unnecessary recalculations
  const recentChats = useMemo(() => 
    getAllChats().slice(0, 6), 
    [getAllChats]
  );
  
  // Memoize categories to prevent unnecessary recalculations
  const categories = useMemo(() => 
    AgentService.getCategories(), 
    []
  );

  // Updated sidebar close function to handle both mobile and desktop
  const closeSidebarAndExecute = useCallback((fn: () => void) => {
    if (isMobile) {
      setOpenMobile(false);
    } else {
      setOpen(false);
    }
    setTimeout(fn, 100);
  }, [isMobile, setOpen, setOpenMobile]);
  
  const onAgentClick = useCallback((slug: string) => {
    closeSidebarAndExecute(() => handleAgentClick(slug));
  }, [closeSidebarAndExecute, handleAgentClick]);
  
  const onNewChat = useCallback(() => {
    closeSidebarAndExecute(() => handleNewChat());
  }, [closeSidebarAndExecute, handleNewChat]);

  const onChatHistoryClick = useCallback((chatId: string) => {
    closeSidebarAndExecute(() => handleChatHistoryClick(chatId));
  }, [closeSidebarAndExecute, handleChatHistoryClick]);

  const onNavigationClick = useCallback((path: string) => {
    closeSidebarAndExecute(() => handleNavigationClick(path));
  }, [closeSidebarAndExecute, handleNavigationClick]);

  // Memoize navigation items with Super Agent
  const navigationItems = useMemo(() => [
    {
      path: "/super-agent",
      icon: Bot,
      label: "🤖 Super Agent"
    },
    {
      path: "/gallery",
      icon: ImageIcon,
      label: "Gallery"
    },
    {
      path: "/public-chat",
      icon: Users,
      label: "Public Chat"
    }
  ], []);

  return (
    <Sidebar className="bg-sidebar border-sidebar-border text-sidebar-foreground">
      <SidebarHeader>
        <Button
          variant="outline"
          className="w-full justify-center gap-2 text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={onNewChat}
          aria-label="New Chat"
        >
          <MessageSquare className="h-5 w-5" />
          <span>New Chat</span>
        </Button>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => onNavigationClick(item.path)}
                    className="w-full justify-start gap-2"
                    aria-label={item.label}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      
      <SidebarContent>
        <AgentCategoriesList 
          categories={categories}
          activeItem={activeItem}
          onAgentClick={onAgentClick}
        />
        
        <RecentChatsList 
          chats={recentChats}
          activeChatId={activeChatId}
          onChatClick={onChatHistoryClick}
        />
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border">
        <UserProfileSection />
      </SidebarFooter>
    </Sidebar>
  );
});

CustomSidebar.displayName = 'CustomSidebar';

export default CustomSidebar;
