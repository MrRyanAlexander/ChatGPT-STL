
import { Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Chat } from "@/types/chat";

type RecentChatsListProps = {
  chats: Chat[];
  activeChatId: string | null;
  onChatClick: (chatId: string) => void;
};

const RecentChatsList = ({ chats, activeChatId, onChatClick }: RecentChatsListProps) => {
  return (
    <div className="mt-4">
      <div className="text-center mb-3 mt-2">
        <h3 className="font-bold text-sm">RECENT CHATS</h3>
        <Separator className="mt-1 bg-sidebar-border" />
      </div>
      
      {chats.length > 0 ? (
        <div className="space-y-1">
          {chats.map((chat) => (
            <button
              key={chat.id}
              className={`sidebar-item ${activeChatId === chat.id ? 'sidebar-item-active' : ''}`}
              onClick={() => onChatClick(chat.id)}
              title={chat.title}
            >
              <Clock className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{chat.title}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-xs text-center text-sidebar-foreground/70 px-2">
          Your recent conversations will appear here
        </p>
      )}
    </div>
  );
};

export default RecentChatsList;
