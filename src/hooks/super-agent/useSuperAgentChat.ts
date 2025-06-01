
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { SuperAgentOrchestrator } from '@/services/super-agent/superAgentOrchestrator';
import { useStatusStream } from './useStatusStream';
import { useFeedback } from '@/hooks/useFeedback';

export const useSuperAgentChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);
  const [showInlineFeedback, setShowInlineFeedback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { statusMessage, showStatus, startStatusStream, stopStatusStream } = useStatusStream();
  const { 
    currentInteraction, 
    setCurrentInteraction, 
    feedbackModalOpen, 
    setFeedbackModalOpen, 
    handleFeedbackSubmit 
  } = useFeedback();

  // Improved scroll to bottom with proper timing
  const scrollToBottom = (delay = 100) => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ 
          behavior: "smooth", 
          block: "end",
          inline: "nearest"
        });
      }
    }, delay);
  };

  // Only scroll when messages change, not on every render
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom(200);
    }
  }, [messages.length]);

  const clearMessages = () => {
    setMessages([]);
    setInputValue("");
    setShowClearButton(false);
    setShowInlineFeedback(false);
    setCurrentInteraction(null);
    stopStatusStream();
  };

  const handleSubmit = async (query: string) => {
    if (!query.trim() || isProcessing) return;
    
    // Add user message
    const userMessage = SuperAgentOrchestrator.generateUserMessage(query);
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);
    setShowClearButton(true);
    setShowInlineFeedback(false);
    
    try {
      // Show status for 2-3 seconds before response
      const { analysis, statusUpdates, response } = await SuperAgentOrchestrator.processQuery(query);
      
      // Start status streaming with realistic delays
      startStatusStream([
        { step: 1, message: "Analyzing your request...", delay: 500, type: 'thinking' },
        { step: 2, message: "Contacting relevant departments...", delay: 1000, type: 'calling' },
        { step: 3, message: "Coordinating multi-agent response...", delay: 1500, type: 'processing' }
      ]);
      
      // Wait for status stream to complete
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const aiResponse = await response;
      const aiMessage = SuperAgentOrchestrator.generateAIMessage(aiResponse);
      
      setMessages(prev => [...prev, aiMessage]);
      stopStatusStream();
      
      // Show inline feedback after complex interactions
      if (aiResponse.showFeedback) {
        setShowInlineFeedback(true);
        setCurrentInteraction({
          question: query,
          action: 'initial_query',
          showFeedback: true
        });
      }
      
    } catch (error) {
      console.error('Super Agent processing error:', error);
      stopStatusStream();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleActionClick = async (action: string) => {
    if (isProcessing) return;
    
    console.log('Super Agent action clicked:', action);
    setIsProcessing(true);
    setShowInlineFeedback(false);
    
    try {
      // Show processing status for actions
      startStatusStream([
        { step: 1, message: "Processing your request...", delay: 500, type: 'processing' },
        { step: 2, message: "Accessing department systems...", delay: 1000, type: 'calling' },
        { step: 3, message: "Generating response...", delay: 1500, type: 'completing' }
      ]);
      
      // Wait for realistic processing time
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const actionResponse = await SuperAgentOrchestrator.processAction(action);
      const aiMessage = SuperAgentOrchestrator.generateAIMessage(actionResponse);
      
      setMessages(prev => [...prev, aiMessage]);
      stopStatusStream();
      
      // Show inline feedback for action responses
      if (actionResponse.showFeedback) {
        setShowInlineFeedback(true);
        setCurrentInteraction({
          question: action,
          action: action,
          showFeedback: true
        });
      }
      
    } catch (error) {
      console.error('Super Agent action processing error:', error);
      stopStatusStream();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(inputValue);
  };

  const handleInlineFeedbackClick = () => {
    setFeedbackModalOpen(true);
  };

  const handleFeedbackClose = () => {
    setFeedbackModalOpen(false);
    setShowInlineFeedback(false);
    setShowClearButton(true); // Highlight clear button after feedback
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isProcessing,
    statusMessage,
    showStatus,
    showClearButton,
    showInlineFeedback,
    messagesEndRef,
    inputRef,
    currentInteraction,
    feedbackModalOpen,
    handleSubmit,
    handleInputSubmit,
    handleActionClick,
    handleInlineFeedbackClick,
    clearMessages,
    handleFeedbackSubmit,
    handleFeedbackClose
  };
};
