
import { useState, useEffect } from "react";
import OnboardingWalkthrough from "@/components/OnboardingWalkthrough";
import ChatArea from "@/components/ChatArea";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [newChatId, setNewChatId] = useState(`new-${uuidv4()}`);
  const navigate = useNavigate();
  
  // Check if the user has completed onboarding before (could be stored in localStorage)
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("onboardingCompleted");
    if (hasCompletedOnboarding === "true") {
      setShowOnboarding(false);
    }
  }, []);

  // Generate a new chat ID whenever the component mounts
  useEffect(() => {
    setNewChatId(`new-${uuidv4()}`);
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
        // Pass a unique chatId to ensure the chat area always displays properly
        <ChatArea chatId={newChatId} />
      )}
    </div>
  );
};

export default HomePage;
