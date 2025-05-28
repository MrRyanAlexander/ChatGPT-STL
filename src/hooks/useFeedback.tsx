
import { useState } from 'react';
import { FeedbackData } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';

interface FeedbackHook {
  currentInteraction: {
    question: string;
    action: string;
    showFeedback: boolean;
  } | null;
  setCurrentInteraction: React.Dispatch<React.SetStateAction<{
    question: string;
    action: string;
    showFeedback: boolean;
  } | null>>;
  feedbackModalOpen: boolean;
  setFeedbackModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collectedFeedback: FeedbackData[];
  handleFeedbackSubmit: (feedback: FeedbackData) => void;
}

export const useFeedback = (): FeedbackHook => {
  const [currentInteraction, setCurrentInteraction] = useState<{
    question: string;
    action: string;
    showFeedback: boolean;
  } | null>(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [collectedFeedback, setCollectedFeedback] = useState<FeedbackData[]>([]);
  
  const { toast } = useToast();

  const handleFeedbackSubmit = (feedback: FeedbackData) => {
    setCollectedFeedback((prev) => [...prev, feedback]);
    
    console.log('Feedback submitted:', feedback);
    
    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us improve our service."
    });
  };

  return {
    currentInteraction,
    setCurrentInteraction,
    feedbackModalOpen,
    setFeedbackModalOpen,
    collectedFeedback,
    handleFeedbackSubmit
  };
};
