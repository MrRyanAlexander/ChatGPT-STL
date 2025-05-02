
import { useParams } from "react-router-dom";
import ChatArea from "@/components/ChatArea";

const ChatPage = () => {
  const { agentId } = useParams<{ agentId: string }>();
  
  // Adding a key to force component remounting when agentId changes
  return (
    <ChatArea key={`agent-${agentId}`} />
  );
};

export default ChatPage;
