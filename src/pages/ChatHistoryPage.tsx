
import { useParams } from "react-router-dom";
import ChatArea from "@/components/ChatArea";

const ChatHistoryPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  
  return (
    <ChatArea key={chatId} />
  );
};

export default ChatHistoryPage;
