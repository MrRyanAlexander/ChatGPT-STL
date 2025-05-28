
interface PromptCardsProps {
  agentName: string | null;
  promptCards: string[];
  onPromptClick: (text: string) => void;
}

const PromptCards = ({ agentName, promptCards, onPromptClick }: PromptCardsProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-8">
        {agentName ? `Ask about ${agentName}` : "What's on your mind today?"}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {promptCards.map((text, index) => (
          <button
            key={index}
            className="border border-border rounded-lg p-4 text-left hover:bg-secondary transition-colors text-large"
            onClick={() => onPromptClick(text)}
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs">?</span>
              </div>
            </div>
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptCards;
