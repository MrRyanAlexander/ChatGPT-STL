
import { Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Chat } from "@/types/chat";

type RecentChatsListProps = {
  chats: Chat[];
  activeChatId: string | null;
  onChatClick: (chatId: string) => void;
};

const RecentChatsList = ({ chats, activeChatId, onChatClick }: RecentChatsListProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>RECENT CHATS</SidebarGroupLabel>
      <SidebarGroupContent>
        {chats.length > 0 ? (
          <SidebarMenu>
            {chats.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                  onClick={() => onChatClick(chat.id)}
                  isActive={activeChatId === chat.id}
                  className="w-full justify-start"
                  title={chat.title}
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
  );
};

export default RecentChatsList;
