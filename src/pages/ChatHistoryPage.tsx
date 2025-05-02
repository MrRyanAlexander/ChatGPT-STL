
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ChatArea from "@/components/ChatArea";
import { useChatHistory } from "@/hooks/useChatHistory";

const ChatHistoryPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { getChatById } = useChatHistory();
  
  // Verify the chat exists in local storage
  useEffect(() => {
    if (chatId) {
      const chat = getChatById(chatId);
      if (!chat) {
        console.warn(`Chat with ID ${chatId} not found in history.`);
      }
    }
  }, [chatId, getChatById]);
  
  return (
    <ChatArea key={chatId} chatId={chatId} />
  );
};

export default ChatHistoryPage;
