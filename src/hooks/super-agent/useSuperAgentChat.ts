
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
  const statusRef = useRef<HTMLDivElement>(null);
  
  const { statusMessage, showStatus, startStatusStream, stopStatusStream } = useStatusStream();
  const { 
    currentInteraction, 
    setCurrentInteraction, 
    feedbackModalOpen, 
    setFeedbackModalOpen, 
    handleFeedbackSubmit 
  } = useFeedback();

  // Enhanced scroll to bottom with proper timing
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

  // Scroll to status element when processing starts
  const scrollToStatus = () => {
    setTimeout(() => {
      if (statusRef.current) {
        statusRef.current.scrollIntoView({ 
          behavior: "smooth", 
          block: "center",
          inline: "nearest"
        });
      }
    }, 100);
  };

  // Auto-scroll when messages change or processing state changes
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom(200);
    }
  }, [messages.length]);

  useEffect(() => {
    if (isProcessing) {
      scrollToStatus();
    }
  }, [isProcessing]);

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
      // Enhanced status streaming with realistic delays
      const { analysis, statusUpdates, response } = await SuperAgentOrchestrator.processQuery(query);
      
      // Start status streaming with enhanced timing
      startStatusStream([
        { step: 1, message: "🤖 Analyzing your request...", delay: 800, type: 'thinking' },
        { step: 2, message: "🔍 Coordinating with St. Louis departments...", delay: 1200, type: 'calling' },
        { step: 3, message: "📞 Accessing multi-system databases...", delay: 1500, type: 'processing' },
        { step: 4, message: "🔗 Cross-referencing department records...", delay: 1000, type: 'processing' },
        { step: 5, message: "✅ Generating comprehensive response...", delay: 800, type: 'completing' }
      ]);
      
      // Wait for minimum processing time (5+ seconds total)
      await new Promise(resolve => setTimeout(resolve, 5200));
      
      const aiResponse = await response;
      const aiMessage = SuperAgentOrchestrator.generateAIMessage(aiResponse);
      
      setMessages(prev => [...prev, aiMessage]);
      stopStatusStream();
      
      // Show inline feedback for complex interactions
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
    
    // Immediate scroll to status when action is clicked
    scrollToStatus();
    
    try {
      // Enhanced processing status with minimum 3-second delay
      startStatusStream([
        { step: 1, message: "⚡ Processing your action...", delay: 600, type: 'processing' },
        { step: 2, message: "🏛️ Accessing department systems...", delay: 1000, type: 'calling' },
        { step: 3, message: "📋 Coordinating multi-agent response...", delay: 1200, type: 'processing' },
        { step: 4, message: "🔄 Finalizing action results...", delay: 800, type: 'completing' }
      ]);
      
      // Ensure minimum 3.6 second delay as requested
      await new Promise(resolve => setTimeout(resolve, 3600));
      
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
    setShowClearButton(true);
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
    statusRef,
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
