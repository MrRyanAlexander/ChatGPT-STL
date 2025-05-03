
import { useState, useEffect } from "react";
import OnboardingWalkthrough from "@/components/OnboardingWalkthrough";
import ChatArea from "@/components/ChatArea";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useParams, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const { chatId } = useParams<{ chatId: string }>();
  const { getChatById } = useChatHistory();
  const navigate = useNavigate();
  
  // Check if the user has completed onboarding before (could be stored in localStorage)
  // Verify the chat exists in local storage
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("onboardingCompleted");
    if (hasCompletedOnboarding === "true") {
      setShowOnboarding(false);
    }
    if (chatId) {
      const chat = getChatById(chatId);
      if (!chat) {
        console.warn(`Chat with ID ${chatId} not found in history.`);
      }
    }
    
  }, [chatId, getChatById]);

  const completeOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true");
    setShowOnboarding(false);
  };

  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      {showOnboarding ? (
        <OnboardingWalkthrough onComplete={completeOnboarding} />
      ) : (
        // Pass a unique chatId to ensure the chat area always displays properly
        <ChatArea chatId={chatId} />
      )}
    </div>
  );
};

export default HomePage;
