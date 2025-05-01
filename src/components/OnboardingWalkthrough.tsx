
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  content: JSX.Element;
}

const OnboardingWalkthrough = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("stl-onboarding-completed");
    if (!hasSeenOnboarding) {
      setIsOpen(true);
    }
  }, []);
  
  const completeOnboarding = () => {
    localStorage.setItem("stl-onboarding-completed", "true");
    setIsOpen(false);
  };
  
  const steps: Step[] = [
    {
      id: 1,
      title: "Welcome to St. Louis Chat!",
      description: "Your local information assistant",
      icon: (
        <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
            />
          </svg>
        </div>
      ),
      content: (
        <div className="space-y-4">
          <p className="text-large">
            ChatGPT-STL is designed to provide information about St. Louis
            services, utilities, and local companies.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Find local agents here",
      description: "Access government agencies, utilities, and local companies",
      icon: (
        <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
            />
          </svg>
        </div>
      ),
      content: (
        <div className="space-y-4">
          <p className="text-large">
            The sidebar contains all the local agents grouped by category:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-large">
            <li><strong>GOV</strong>: County and City resources</li>
            <li><strong>UTILITIES</strong>: Water, Trash, and Sewer services</li>
            <li><strong>COMPANIES</strong>: Local businesses information</li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      title: "Accessibility Features",
      description: "We've designed this app to be accessible for everyone",
      icon: (
        <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"
            />
          </svg>
        </div>
      ),
      content: (
        <div className="space-y-4">
          <ul className="list-disc pl-6 space-y-2 text-large">
            <li>Large buttons and text for easy navigation</li>
            <li>Minimal wording for clarity</li>
            <li>High contrast colors</li>
            <li>Screen reader compatible</li>
          </ul>
          <p className="text-large mt-4">
            You can toggle between light and dark theme using the button in the
            top right corner or in the sidebar.
          </p>
        </div>
      ),
    },
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const currentStepData = steps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md md:max-w-xl p-0">
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            {currentStepData.icon}
            <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
            <p className="text-muted-foreground">{currentStepData.description}</p>
          </div>
          
          <div className="py-4">{currentStepData.content}</div>
          
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="button-large"
            >
              Back
            </Button>
            
            <div className="flex space-x-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`h-2 w-2 rounded-full ${
                    index === currentStep ? "bg-primary" : "bg-secondary"
                  }`}
                />
              ))}
            </div>
            
            <Button onClick={handleNext} className="button-large">
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingWalkthrough;
