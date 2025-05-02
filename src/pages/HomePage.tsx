
import { useState, useEffect } from "react";
import OnboardingWalkthrough from "@/components/OnboardingWalkthrough";
import ChatArea from "@/components/ChatArea";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
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
        // Pass an explicit new chat ID to ensure the chat area always displays properly
        <ChatArea chatId="home" />
      )}
    </div>
  );
};

export default HomePage;
