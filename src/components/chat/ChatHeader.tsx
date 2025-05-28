
interface ChatHeaderProps {
  agentName: string | null;
}

const ChatHeader = ({ agentName }: ChatHeaderProps) => {
  if (!agentName) return null;
  
  return (
    <div className="bg-secondary/50 py-2 px-4 border-b border-border">
      <h2 className="text-xl font-medium">{agentName} Assistant</h2>
    </div>
  );
};

export default ChatHeader;
