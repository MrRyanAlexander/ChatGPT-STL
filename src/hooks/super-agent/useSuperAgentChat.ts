
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { SuperAgentOrchestrator } from '@/services/super-agent/superAgentOrchestrator';
import { useStatusStream } from './useStatusStream';

export const useSuperAgentChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { statusMessage, showStatus, startStatusStream, stopStatusStream } = useStatusStream();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, statusMessage]);

  const handleSubmit = async (query: string) => {
    if (!query.trim() || isProcessing) return;
    
    // Add user message
    const userMessage = SuperAgentOrchestrator.generateUserMessage(query);
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);
    
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

  return {
    messages,
    inputValue,
    setInputValue,
    isProcessing,
    statusMessage,
    showStatus,
    messagesEndRef,
    inputRef,
    handleSubmit,
    handleInputSubmit,
    handleActionClick
  };
};
