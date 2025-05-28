
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
import { useChatHistory } from "@/hooks/useChatHistory";
import { useNavigation } from "@/hooks/useNavigation";
import AgentCategoriesList from "@/components/sidebar/AgentCategoriesList";
import RecentChatsList from "@/components/sidebar/RecentChatsList";
import UserProfileSection from "@/components/sidebar/UserProfileSection";
import { AgentService } from "@/services/agentService";

const CustomSidebar = () => {
  const { getAllChats } = useChatHistory();
  const { setOpen } = useSidebar();
  const {
    activeItem,
    activeChatId,
    handleAgentClick,
    handleNewChat,
    handleChatHistoryClick,
    handleNavigationClick
  } = useNavigation();
  
  const recentChats = getAllChats().slice(0, 6);
  
  const onAgentClick = (slug: string) => {
    setOpen(false);
    setTimeout(() => handleAgentClick(slug), 100);
  };
  
  const onNewChat = () => {
    setOpen(false);
    setTimeout(() => handleNewChat(), 100);
  };

  const onChatHistoryClick = (chatId: string) => {
    setOpen(false);
    setTimeout(() => handleChatHistoryClick(chatId), 100);
  };

  const onNavigationClick = (path: string) => {
    setOpen(false);
    setTimeout(() => handleNavigationClick(path), 100);
  };

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
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onNavigationClick("/gallery")}
                  className="w-full justify-start gap-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  Gallery
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onNavigationClick("/public-chat")}
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
          categories={AgentService.getCategories()}
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
};

export default CustomSidebar;
