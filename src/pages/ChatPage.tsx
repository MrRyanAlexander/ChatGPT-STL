
import { useParams } from "react-router-dom";
import ChatArea from "@/components/ChatArea";

const ChatPage = () => {
  const { agentId } = useParams<{ agentId: string }>();
  
  return (
    <ChatArea />
  );
};

export default ChatPage;
