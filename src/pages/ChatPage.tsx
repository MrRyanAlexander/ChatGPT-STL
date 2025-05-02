
import { useParams, useLocation } from "react-router-dom";
import ChatArea from "@/components/ChatArea";

const ChatPage = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const location = useLocation();
  
  // Adding a key with both agentId and pathname to force component remounting
  // This helps avoid issues with stale state when navigating between chats
  return (
    <ChatArea 
      key={`agent-${agentId}-${location.pathname}`} 
      chatId={agentId} 
    />
  );
};

export default ChatPage;
