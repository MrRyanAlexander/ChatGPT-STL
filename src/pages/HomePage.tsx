
import { useState, useEffect } from "react";
import OnboardingWalkthrough from "@/components/OnboardingWalkthrough";
import ChatArea from "@/components/ChatArea";

const HomePage = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  
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
        <ChatArea />
      )}
    </div>
  );
};

export default HomePage;
