
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import OnboardingWalkthrough from "@/components/OnboardingWalkthrough";
import ChatArea from "@/components/ChatArea";
import { useChatHistory } from "@/hooks/useChatHistory";

const HomePage = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  // Generate a unique ID for new chats
  const [newChatId] = useState(() => `new-${uuidv4()}`);
  const { getChatById } = useChatHistory();
  const navigate = useNavigate();
  
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

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      {showOnboarding ? (
        <OnboardingWalkthrough onComplete={completeOnboarding} />
      ) : (
        // Pass the new unique chatId to the ChatArea
        <ChatArea chatId={newChatId} />
      )}
    </div>
  );
};

export default HomePage;
