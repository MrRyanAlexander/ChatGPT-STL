import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { ArrowUp, Paperclip as Attach, Globe, FileText, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useChatHistory } from "@/hooks/useChatHistory";
import ResponseActions from "@/components/ResponseActions";
import FeedbackModal from "@/components/FeedbackModal";
import { Message, ActionOption, FeedbackData } from "@/types/chat";

// Enhanced responses with interactive elements
const INTERACTIVE_RESPONSES: Record<string, Record<string, any>> = {
  "water": {
    "How do I pay my water bill in St. Louis?": {
      text: "I've pulled up your latest bill: $64.22 due for your service at 1234 Example Ave.\n\nWould you like to:",
      options: [
        { text: "💳 Pay now", action: "pay_now" },
        { text: "🔁 Set up autopay", action: "setup_autopay" },
        { text: "🕒 Schedule a reminder", action: "schedule_reminder" },
        { text: "📜 View full billing history", action: "view_history" }
      ]
    },
    "How can I report a water main break?": {
      text: "I've logged your report with the Water Division and flagged it as urgent.\n\nCrews will be dispatched shortly to inspect the issue near the intersection you mentioned. Want me to:",
      options: [
        { text: "📸 Add a photo or video", action: "add_photo" },
        { text: "📍 Confirm exact location", action: "confirm_location" },
        { text: "📬 Notify when resolved", action: "notify_resolution" }
      ]
    }
  },
  "county": {
    "How do I pay my property taxes in St. Louis County?": {
      text: "Your 2025 property tax bill shows a balance of $2,350 for 1234 Example St, due December 31.\n\nI can help you:",
      options: [
        { text: "💳 Pay now", action: "pay_now" },
        { text: "🧹 Set up a payment plan", action: "setup_plan" },
        { text: "📅️ Add a calendar reminder", action: "add_reminder" },
        { text: "📄 View past tax history", action: "view_history" }
      ]
    },
    "What are the hours for the St. Louis County Recorder of Deeds office?": {
      text: "The Recorder of Deeds office is open Monday through Friday, 8 AM to 5 PM at 41 South Central Ave.\n\nWould you like to:",
      options: [
        { text: "📅 Book a visit slot", action: "book_visit" },
        { text: "📍 Get directions", action: "get_directions" },
        { text: "📞 Call the office", action: "call_office" }
      ]
    }
  },
  "city": {
    "How do I get a business license in St. Louis City?": {
      text: "Let's get you set up. I'll walk you through registering with the License Collector and flag any additional permits you'll need.\n\nWould you like to:",
      options: [
        { text: "📝 Start application now", action: "start_application" },
        { text: "🔍 See estimated cost", action: "see_cost" },
        { text: "📄 Review required documents", action: "review_docs" }
      ]
    },
    "What are the recycling guidelines for St. Louis City?": {
      text: "In STL, your blue bin accepts clean paper, cardboard, plastics #1–#5 and #7, metals, and glass.\n\nWant me to:",
      options: [
        { text: "🔄 Check your pickup schedule", action: "check_schedule" },
        { text: "📦 Show what's recyclable in your zip", action: "recyclable_items" },
        { text: "🧹 Print a fridge-friendly checklist", action: "print_checklist" }
      ]
    }
  },
  "trash": {
    "What day is trash collection in my area?": {
      text: "You're in the Thursday pickup zone.\n\nWant me to:",
      options: [
        { text: "🔔 Send a reminder", action: "send_reminder" },
        { text: "📦 Schedule a bulk pickup", action: "bulk_pickup" },
        { text: "🔄 Check recycling rules", action: "recycling_rules" }
      ]
    },
    "How do I dispose of large items like furniture?": {
      text: "You're scheduled for bulk pickup the week of May 13.\n\nI've added your sofa to the request list. I can also:",
      options: [
        { text: "➕ Add more items", action: "add_items" },
        { text: "🧹 Show allowed bulk items", action: "allowed_items" },
        { text: "🛑 Cancel the request", action: "cancel_request" }
      ]
    }
  },
  "sewer": {
    "Who do I call for sewer backup issues?": {
      text: "I've alerted MSD about the potential backup near your location. A field crew will be dispatched to inspect it.\n\nMeanwhile, want me to:",
      options: [
        { text: "📸 Help document the issue", action: "document_issue" },
        { text: "📋 Check neighbor reports", action: "check_neighbors" },
        { text: "🔧 Connect with emergency plumbing", action: "emergency_plumbing" }
      ]
    },
    "How is the sewer system maintained in St. Louis?": {
      text: "The sewer system is actively managed by MSD through remote sensors, crew inspections, and predictive maintenance.\n\nWant a breakdown of:",
      options: [
        { text: "🔧️ Current maintenance in your area", action: "local_maintenance" },
        { text: "💧 Tips to prevent home backups", action: "prevention_tips" },
        { text: "🔄 How your monthly fees are used", action: "fee_usage" }
      ]
    }
  },
  "boeing": {
    "Tell me about Boeing's presence in St. Louis": {
      text: "Boeing employs 16,000+ people here and builds aircraft like the F-15, T-7A, and MQ-25.\n\nWant a virtual tour of the STL site or a timeline of Boeing's local impact?",
      options: [
        { text: "🏭 Virtual tour", action: "virtual_tour" },
        { text: "📅 Local impact timeline", action: "impact_timeline" }
      ]
    },
    "What jobs is Boeing hiring for in St. Louis?": {
      text: "There are 120+ open roles right now.\n\nWant me to:",
      options: [
        { text: "🔍 Filter by remote/onsite", action: "filter_jobs" },
        { text: "🎓 Show entry-level paths", action: "entry_level" },
        { text: "📩 Email you current listings", action: "email_listings" }
      ]
    }
  },
  "monsanto": {
    "What is Monsanto's history in St. Louis?": {
      text: "Monsanto was founded here in 1901 and later became a global biotech leader. The HQ was based in Creve Coeur until the Bayer acquisition.\n\nWant me to:",
      options: [
        { text: "🏢 Show a timeline of milestones", action: "show_timeline" },
        { text: "🧪 Highlight legacy research facilities", action: "research_facilities" },
        { text: "🌽 Pull up biotech patents from STL", action: "biotech_patents" }
      ]
    },
    "How has Bayer's acquisition affected Monsanto's St. Louis operations?": {
      text: "Bayer integrated Monsanto into its Crop Science division. STL is now the global Seeds HQ.\n\nWould you like a breakdown of:",
      options: [
        { text: "🏛 STL facility investments", action: "investments" },
        { text: "💼 Current Bayer STL job openings", action: "job_openings" },
        { text: "🧪 Research programs still running", action: "research_programs" }
      ]
    }
  },
  "amazon": {
    "Where are Amazon fulfillment centers in the St. Louis area?": {
      text: "Amazon operates over 6 facilities in the region, including sortation hubs in Hazelwood and a fulfillment center in St. Peters.\n\nNeed:",
      options: [
        { text: "🗺️ A location map", action: "location_map" },
        { text: "📦 Real-time package tracking", action: "package_tracking" },
        { text: "🧑‍💼 Facility-specific contact info", action: "contact_info" }
      ]
    },
    "How many people does Amazon employ in St. Louis?": {
      text: "Rough estimates show 10,000+ employees region-wide, across delivery, warehouse, and tech roles.\n\nWant a:",
      options: [
        { text: "📊 Breakdown by location", action: "location_breakdown" },
        { text: "🧹 Snapshot of current job types", action: "job_types" },
        { text: "🏭 Link to active hiring centers", action: "hiring_centers" }
      ]
    }
  },
  "handyman": {
    "Where are the Handyman True Value Hardware stores in St. Louis?": {
      text: "There are 3 locations: 2 in Florissant and 1 in South County.\n\nWant me to:",
      options: [
        { text: "📍 Find the closest one", action: "find_closest" },
        { text: "🕒 Check hours", action: "check_hours" },
        { text: "📞 Call ahead", action: "call_ahead" }
      ]
    },
    "What services does Handyman True Value Hardware offer?": {
      text: "Handyman stores offer key cutting, paint matching, small repairs, and hardware essentials.\n\nNeed help with:",
      options: [
        { text: "🔧 Repair service availability", action: "repair_service" },
        { text: "🎨 In-store paint matching", action: "paint_matching" },
        { text: "🔑 Getting a duplicate key made", action: "key_duplication" }
      ]
    }
  },
  "dierbergs": {
    "What are Dierbergs' store hours?": {
      text: "Most stores run from 6 AM to 10 PM, with some open later.\n\nWant me to:",
      options: [
        { text: "⏰ Confirm your nearest store's hours", action: "check_nearby" },
        { text: "💊 Check pharmacy availability", action: "pharmacy_hours" },
        { text: "📍 Send directions", action: "get_directions" }
      ]
    },
    "Does Dierbergs offer grocery delivery in St. Louis?": {
      text: "Yes. Dierbergs partners with Instacart and Shipt, plus curbside pickup via Express Lane.\n\nWant help:",
      options: [
        { text: "🛒 Placing a delivery order", action: "place_order" },
        { text: "📦 Scheduling curbside pickup", action: "curbside_pickup" },
        { text: "💲 Comparing fees and services", action: "compare_fees" }
      ]
    }
  }
};

// Follow-up responses based on user actions
const FOLLOW_UP_RESPONSES: Record<string, Record<string, any>> = {
  "county": {
    "pay_now": {
      text: "Done. Your payment has been processed and emailed to you.\nWould you like me to remind you about next year's bill automatically?",
      options: [
        { text: "Yes", action: "set_reminder" },
        { text: "No thanks", action: "end_flow" }
      ],
      showFeedback: false
    },
    "setup_plan": {
      text: "I've created a 4-month payment plan for you. The first payment of $587.50 is due on September 15.\n\nWould you like me to email you the schedule?",
      options: [
        { text: "Yes, email me", action: "email_schedule" },
        { text: "No thanks", action: "end_flow" }
      ],
      showFeedback: false
    },
    "view_history": {
      text: "Here's your property tax history for 1234 Example St:\n\n2024: $2,285 (paid)\n2023: $2,157 (paid)\n2022: $2,089 (paid)\n\nWould you like to see the assessment history too?",
      options: [
        { text: "Show assessments", action: "show_assessments" },
        { text: "No thanks", action: "end_flow" }
      ],
      showFeedback: false
    },
    "set_reminder": {
      text: "Perfect! I'll remind you on November 15, 2025 about your property tax bill.\n\nIs there anything else you'd like to know about your property taxes?",
      options: [],
      showFeedback: true
    },
    "email_schedule": {
      text: "I've emailed your payment schedule to you. You'll receive automatic reminders 3 days before each payment is due.\n\nIs there anything else you need help with?",
      options: [],
      showFeedback: true
    },
    "show_assessments": {
      text: "Property Assessment History for 1234 Example St:\n\n2025: $195,800 (↑4.2%)\n2024: $187,900 (↑3.1%)\n2023: $182,200 (↑5.6%)\n2022: $172,500\n\nWould you like to learn about appealing your assessment?",
      options: [],
      showFeedback: true
    },
    "end_flow": {
      text: "No problem! Feel free to ask if you need anything else about your property taxes or other county services.",
      options: [],
      showFeedback: true
    }
  }
  // Add more follow-up responses for other categories as needed
};

// Modified version of AGENT_PROMPTS
const AGENT_PROMPTS: Record<string, string[]> = {
  // GOV
  "county": [
    "How do I pay my property taxes in St. Louis County?",
    "What are the hours for the St. Louis County Recorder of Deeds office?"
  ],
  "city": [
    "How do I get a business license in St. Louis City?",
    "What are the recycling guidelines for St. Louis City?"
  ],
  // UTILITIES
  "water": [
    "How do I pay my water bill in St. Louis?",
    "How can I report a water main break?"
  ],
  "trash": [
    "What day is trash collection in my area?",
    "How do I dispose of large items like furniture?"
  ],
  "sewer": [
    "Who do I call for sewer backup issues?",
    "How is the sewer system maintained in St. Louis?"
  ],
  // COMPANIES
  "boeing": [
    "Tell me about Boeing's presence in St. Louis",
    "What jobs is Boeing hiring for in St. Louis?"
  ],
  "monsanto": [
    "What is Monsanto's history in St. Louis?",
    "How has Bayer's acquisition affected Monsanto's St. Louis operations?"
  ],
  "amazon": [
    "Where are Amazon fulfillment centers in the St. Louis area?",
    "How many people does Amazon employ in St. Louis?"
  ],
  "handyman": [
    "Where are the Handyman True Value Hardware stores in St. Louis?",
    "What services does Handyman True Value Hardware offer?"
  ],
  "dierbergs": [
    "What are Dierbergs' store hours?",
    "Does Dierbergs offer grocery delivery in St. Louis?"
  ]
};

// Default prompt cards for home page
const DEFAULT_PROMPTS = [
  "How do I pay my water bill in St. Louis?",
  "Tell me about Boeing's presence in St. Louis"
];

const formatTimeStamp = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Update the props interface for ChatArea to accept chatId
interface ChatAreaProps {
  chatId?: string;
}

const ChatArea = ({ chatId }: ChatAreaProps) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [promptCards, setPromptCards] = useState<string[]>([]);
  const [currentInteraction, setCurrentInteraction] = useState<{
    question: string;
    action: string;
    showFeedback: boolean;
  } | null>(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [collectedFeedback, setCollectedFeedback] = useState<FeedbackData[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { chatHistories, updateChat, getChatById } = useChatHistory();
  
  // Get a unique key for this chat
  const chatKey = chatId || (location.pathname.startsWith('/chat/history/') 
    ? location.pathname.split('/').pop() || 'home'
    : agentId || 'home');
  
  // Load chat history when component mounts or when key changes
  useEffect(() => {
    const loadChatData = () => {
      // Check if this is a new chat (chatId starts with "new-")
      if (chatKey && chatKey.startsWith('new-')) {
        // This is a new chat, reset messages
        setMessages([]);
        
        // Set agent-specific prompts or default prompts
        if (agentId && AGENT_PROMPTS[agentId]) {
          setPromptCards(AGENT_PROMPTS[agentId]);
        } else {
          setPromptCards(DEFAULT_PROMPTS);
        }
      } else {
        // Try to load existing chat
        const chatData = getChatById(chatKey);
        
        if (chatData?.messages) {
          setMessages(chatData.messages);
          // Hide prompt cards if we have existing messages
          if (chatData.messages.length > 0) {
            setPromptCards([]);
          } else {
            // Set agent-specific prompts or default prompts
            if (agentId && AGENT_PROMPTS[agentId]) {
              setPromptCards(AGENT_PROMPTS[agentId]);
            } else {
              setPromptCards(DEFAULT_PROMPTS);
            }
          }
        } else {
          // Reset messages for new chat
          setMessages([]);
          
          // Set agent-specific prompts or default prompts
          if (agentId && AGENT_PROMPTS[agentId]) {
            setPromptCards(AGENT_PROMPTS[agentId]);
          } else {
            setPromptCards(DEFAULT_PROMPTS);
          }
        }
      }
      
      // Clear input field when changing chats
      setInputValue("");
      // Reset interaction tracking
      setCurrentInteraction(null);
    };
    
    loadChatData();
    
    // Set default prompt from location state if available and only if it's a new chat
    if (location.state?.defaultPrompt) {
      setInputValue(location.state.defaultPrompt);
      // Clear the location state to prevent it from persisting
      window.history.replaceState({}, document.title);
    }
  }, [agentId, location.pathname, location.state, chatKey, getChatById]);

  // Save chat history when messages change - with a check to avoid infinite updates
  useEffect(() => {
    if (messages.length > 0) {
      const title = typeof messages[0].content === 'string' 
        ? messages[0].content.substring(0, 30) + (messages[0].content.length > 30 ? "..." : "") 
        : messages[0].content.text.substring(0, 30) + (messages[0].content.text.length > 30 ? "..." : "");
      
      const existingChat = getChatById(chatKey);
      
      // Only update if there's an actual change in messages or if the chat doesn't exist
      if (!existingChat || existingChat.messages.length !== messages.length) {
        updateChat(chatKey, {
          id: chatKey,
          title: title,
          messages: messages,
          createdAt: existingChat?.createdAt || messages[0].timestamp,
          updatedAt: new Date(),
          agentId: agentId || null
        });
      }
    }
  }, [messages, chatKey, agentId, updateChat, getChatById]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Helper to get interactive response
  const getInteractiveResponse = (prompt: string): any => {
    // Check if we have a specific response for this agent and prompt
    if (agentId && INTERACTIVE_RESPONSES[agentId]?.[prompt]) {
      return INTERACTIVE_RESPONSES[agentId][prompt];
    }
    
    // If no specific response, generate a generic one
    return {
      text: `This is a simulated response about ${agentId || "general St. Louis information"} regarding: "${prompt}"`,
      options: []
    };
  };

  // Handle follow-up responses
  const getFollowUpResponse = (action: string): any => {
    if (agentId && currentInteraction && FOLLOW_UP_RESPONSES[agentId]?.[action]) {
      return FOLLOW_UP_RESPONSES[agentId][action];
    }
    
    // If no specific follow-up, generate a generic one
    return {
      text: `Follow-up action for "${action}" selected.`,
      options: [],
      showFeedback: true
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputValue("");
    
    // Store the current question for the interaction
    setCurrentInteraction({
      question: typeof userMessage.content === 'string' ? userMessage.content : '',
      action: '',
      showFeedback: false
    });
    
    // Simulate response after a short delay
    setTimeout(() => {
      const response = getInteractiveResponse(
        typeof userMessage.content === 'string' ? userMessage.content : ''
      );
      
      const aiResponse: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
    
    // Hide prompt cards once conversation starts
    if (promptCards.length > 0) {
      setPromptCards([]);
    }
  };

  const handlePromptClick = (text: string) => {
    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    
    setMessages([userMessage]);
    setInputValue(""); // Clear input immediately after using a prompt card
    
    // Store the current question for the interaction
    setCurrentInteraction({
      question: text,
      action: '',
      showFeedback: false
    });
    
    // Simulate response after a short delay
    setTimeout(() => {
      const response = getInteractiveResponse(text);
      
      const aiResponse: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
    
    // Hide prompt cards after selection
    setPromptCards([]);
  };

  const handleActionClick = (action: string) => {
    if (!currentInteraction) return;
    
    // Update the current interaction with the selected action
    setCurrentInteraction({
      ...currentInteraction,
      action
    });
    
    // Get the follow-up response
    const followUp = getFollowUpResponse(action);
    
    // Add the follow-up response to the messages
    const followUpResponse: Message = {
      role: "assistant",
      content: followUp,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, followUpResponse]);
    
    // Check if we should show the feedback modal after this response
    if (followUp.showFeedback) {
      setTimeout(() => {
        setFeedbackModalOpen(true);
      }, 1000);
    }
  };

  const handleFeedbackSubmit = (feedback: FeedbackData) => {
    // Store feedback
    setCollectedFeedback((prev) => [...prev, feedback]);
    
    // You could send this to an API endpoint, log to console, etc.
    console.log('Feedback submitted:', feedback);
    
    // Show a toast or some other confirmation
    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us improve our service."
    });
  };

  // Helper function to render message content
  const renderMessageContent = (message: Message) => {
    if (typeof message.content === 'string') {
      return <p className="text-large whitespace-pre-wrap">{message.content}</p>;
    } else {
      return (
        <>
          <p className="text-large whitespace-pre-wrap">{message.content.text}</p>
          {message.content.options && message.content.options.length > 0 && (
            <ResponseActions 
              options={message.content.options} 
              onActionClick={handleActionClick}
            />
          )}
        </>
      );
    }
  };

  const isPublicChat = location.pathname === "/public-chat";
  const agentName = agentId ? agentId.charAt(0).toUpperCase() + agentId.slice(1) : null;

  return (
    <div className="flex flex-col h-full">
      {agentName && (
        <div className="bg-secondary/50 py-2 px-4 border-b border-border">
          <h2 className="text-xl font-medium">{agentName} Assistant</h2>
        </div>
      )}
      
      <div className="flex-1 overflow-auto p-4 md:p-8">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold mb-8">
              {agentName ? `Ask about ${agentName}` : "What's on your mind today?"}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
              {promptCards.map((text, index) => (
                <button
                  key={index}
                  className="border border-border rounded-lg p-4 text-left hover:bg-secondary transition-colors text-large"
                  onClick={() => handlePromptClick(text)}
                >
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs">?</span>
                    </div>
                  </div>
                  {text}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.length > 0 && (
          <div className="flex flex-col space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                  {renderMessageContent(message)}
                </div>
                <span className="text-xs text-muted-foreground mt-1 px-1">
                  {formatTimeStamp(message.timestamp)}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="relative max-w-4xl mx-auto w-full">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isPublicChat ? "Group chatting is possible here, but not enabled" : "Ask anything..."}
              className="py-6 pr-12 pl-4 rounded-2xl shadow-sm bg-background border-border text-large"
              disabled={isPublicChat}
            />
            
            <div className="absolute left-2 bottom-[-45px] flex gap-2">
              <Button type="button" variant="ghost" size="sm" className="rounded-full" disabled={isPublicChat}>
                <Attach className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="rounded-full" disabled={isPublicChat}>
                <Globe className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="rounded-full" disabled={isPublicChat}>
                <Mic className="h-5 w-5" />
              </Button>
            </div>
            
            <Button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0"
              size="icon"
              disabled={inputValue.trim() === '' || isPublicChat}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-center text-muted-foreground mt-10">
            By using this app, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-primary">
              Terms
            </Link>{" "}
            and have read our{" "}
            <Link to="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            . Built with ❤️ by{" "}
            <a href="https://ryan.chatgptstl.com" className="underline hover:text-primary">
               Ryan
            </a>
          </div>
        </form>
      </div>
      
      {/* Feedback Modal */}
      {currentInteraction && (
        <FeedbackModal
          open={feedbackModalOpen}
          onClose={() => setFeedbackModalOpen(false)}
          interactionId={currentInteraction.question}
          userResponse={currentInteraction.action}
          onSubmitFeedback={handleFeedbackSubmit}
        />
      )}
    </div>
  );
};

export default ChatArea;
