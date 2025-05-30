
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

  // Smooth scroll to bottom with delay
  const scrollToBottom = (delay = 200) => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: "smooth", 
        block: "end" 
      });
    }, delay);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, statusMessage]);

  const clearMessages = () => {
    setMessages([]);
    setInputValue("");
    setShowClearButton(false);
    setCurrentInteraction(null);
  };

  const handleSubmit = async (query: string) => {
    if (!query.trim() || isProcessing) return;
    
    // Add user message
    const userMessage = SuperAgentOrchestrator.generateUserMessage(query);
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);
    setShowClearButton(true);
    
    // Scroll after user message
    scrollToBottom(100);
    
    try {
      // Get query analysis and status stream
      const { analysis, statusUpdates, response } = await SuperAgentOrchestrator.processQuery(query);
      
      // Start status streaming
      startStatusStream(statusUpdates);
      
      // Wait for and add AI response
      const aiResponse = await response;
      const aiMessage = SuperAgentOrchestrator.generateAIMessage(aiResponse);
      
      setMessages(prev => [...prev, aiMessage]);
      stopStatusStream();
      
      // Check if this response should show feedback
      if (aiResponse.showFeedback) {
        setCurrentInteraction({
          question: query,
          action: 'initial_query',
          showFeedback: true
        });
      }
      
      // Scroll after AI response
      scrollToBottom(300);
      
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
    
    try {
      // Process the action and get response
      const actionResponse = await SuperAgentOrchestrator.processAction(action);
      const aiMessage = SuperAgentOrchestrator.generateAIMessage(actionResponse);
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Check if this response should show feedback
      if (actionResponse.showFeedback) {
        setCurrentInteraction({
          question: action,
          action: action,
          showFeedback: true
        });
        setTimeout(() => {
          setFeedbackModalOpen(true);
        }, 500);
      }
      
      // Scroll after action response
      scrollToBottom(300);
      
    } catch (error) {
      console.error('Super Agent action processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(inputValue);
  };

  const handleFeedbackClose = () => {
    setFeedbackModalOpen(false);
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
    messagesEndRef,
    inputRef,
    currentInteraction,
    feedbackModalOpen,
    handleSubmit,
    handleInputSubmit,
    handleActionClick,
    clearMessages,
    handleFeedbackSubmit,
    handleFeedbackClose
  };
};
