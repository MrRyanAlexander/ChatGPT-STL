import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingWalkthrough from "@/components/OnboardingWalkthrough";
import SuperAgentChat from "@/components/super-agent/SuperAgentChat";

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

  // Display the Super Agent once onboarding is complete
  return (
    <div className="h-full w-full flex flex-col overflow-y-auto">
      {showOnboarding ? (
        <OnboardingWalkthrough onComplete={completeOnboarding} />
      ) : (
        <SuperAgentChat />
      )}
    </div>
  );
};

export default HomePage;
