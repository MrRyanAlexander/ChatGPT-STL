import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useLocation } from "react-router-dom";
import OnboardingWalkthrough from "@/components/OnboardingWalkthrough";
import ChatArea from "@/components/ChatArea";
import { useChatHistory } from "@/hooks/useChatHistory";

const HomePage = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const location = useLocation();
  const { getChatById } = useChatHistory();
  const navigate = useNavigate();
  
  // Generate a unique ID for new chats - either from location state or create a new one
  const [newChatId] = useState(() => {
    // Check if we have a chatId in location state
    const stateData = location.state as { chatId?: string } | null;
    if (stateData?.chatId && stateData.chatId.startsWith('new-')) {
      return stateData.chatId;
    }
    // Otherwise generate a new one
    return `new-${uuidv4()}`;
  });
  
  // Check if the user has completed onboarding before (could be stored in localStorage)
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("onboardingCompleted");
    if (hasCompletedOnboarding === "true") {
      setShowOnboarding(false);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true");
    setShowOnboarding(false);
  };

  // Using the key prop ensures ChatArea remounts when a new chat is requested
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      {showOnboarding ? (
        <OnboardingWalkthrough onComplete={completeOnboarding} />
      ) : (
        // Pass the new unique chatId to the ChatArea and use it as a key to force remount
        <ChatArea key={newChatId} chatId={newChatId} />
      )}
    </div>
  );
};

export default HomePage;
