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

interface OnboardingWalkthroughProps {
  onComplete: () => void;
}

const OnboardingWalkthrough = ({ onComplete }: OnboardingWalkthroughProps) => {
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
    onComplete();
  };
  
  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // Treat closing the dialog the same as completing onboarding
      completeOnboarding();
    }
  };
  
  const steps: Step[] = [
    {
      id: 1,
      title: "Agentic Governance Demo",
      description: "Exploring AI-powered civic engagement",
      icon: (
        <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
            />
          </svg>
        </div>
      ),
      content: (
        <div className="space-y-4 h-48 overflow-y-auto">
          <p className="text-large">
            This is an example of agentic governance tools attempting to demo how it might feel using AI in a more direct way to resolve friction between residents and government.
          </p>
          <p className="text-large">
            Consider this a nudge towards digital governance - showcasing how intelligent systems can bridge the gap between civic needs and government response.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "AI-Powered Civic Engagement",
      description: "Transforming how residents interact with city services",
      icon: (
        <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
        </div>
      ),
      content: (
        <div className="space-y-4 h-48 overflow-y-auto">
          <p className="text-large">
            The sidebar contains specialized AI agents organized by category, each designed to enhance communication between residents and government:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-large">
            <li><strong>GOV</strong>: Direct access to county and city resources through intelligent assistance</li>
            <li><strong>UTILITIES</strong>: Streamlined water, trash, and sewer service interactions</li>
            <li><strong>COMPANIES</strong>: AI-enhanced local business information and services</li>
          </ul>
          <p className="text-large">
            This demonstrates the transformative potential of digital governance tools in creating more responsive civic engagement.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "Meet the Super Agent",
      description: "Advanced multi-agent coordination system",
      icon: (
        <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
        </div>
      ),
      content: (
        <div className="space-y-4 h-48 overflow-y-auto">
          <p className="text-large">
            <strong>The Super Agent</strong> represents the pinnacle of digital governance - an AI system that coordinates across multiple departments simultaneously.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-large">
            <li>Coordinates complex requests requiring multiple departments</li>
            <li>Cross-references data across city systems for comprehensive responses</li>
            <li>Provides end-to-end resolution for complex civic issues</li>
            <li>Simulates real-time multi-agent collaboration</li>
          </ul>
          <p className="text-large">
            Experience how advanced AI coordination can handle complex government interactions that would normally require multiple phone calls and office visits.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "The Future of Digital Governance",
      description: "Demonstrating intelligent, data-driven civic interaction",
      icon: (
        <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"
            />
          </svg>
        </div>
      ),
      content: (
        <div className="space-y-4 h-48 overflow-y-auto">
          <p className="text-large">
            This platform showcases how AI can provide data-driven insights and intelligent conversation to revolutionize government-citizen interaction.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-large">
            <li>Real-time assistance with civic processes and procedures</li>
            <li>Intelligent routing to appropriate government departments</li>
            <li>24/7 availability for citizen inquiries and support</li>
            <li>Data-driven responses based on local policies and regulations</li>
          </ul>
          <p className="text-large">
            Experience how digital governance tools can make civic engagement more accessible, efficient, and responsive to community needs.
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
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-2xl md:max-w-2xl p-0 h-[550px] overflow-hidden">
        <div className="p-6 h-full flex flex-col">
          <div className="flex flex-col items-center text-center mb-6">
            {currentStepData.icon}
            <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
            <p className="text-muted-foreground">{currentStepData.description}</p>
          </div>
          
          <div className="flex-1 py-4">{currentStepData.content}</div>
          
          <div className="flex justify-between items-center mt-auto pt-4">
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
