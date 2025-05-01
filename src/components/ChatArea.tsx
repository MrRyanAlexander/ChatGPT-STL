import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useParams } from "react-router-dom";
import { ArrowUp, Paperclip as Attach, Globe, FileText, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const formatTimeStamp = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Expanded simulated responses for all agents
const SIMULATED_RESPONSES: Record<string, Record<string, string>> = {
  "water": {
    "How do I pay my water bill in St. Louis?": "To pay your St. Louis water bill, you have several options:\n\n1. Online: Visit stlwater.com and select 'Pay My Bill'. You'll need your account number.\n\n2. By Phone: Call 314-633-9900 and follow the prompts.\n\n3. In Person: Visit the city hall at 1200 Market Street.\n\n4. By Mail: Send your payment to: St. Louis Water Division, 1640 S. Kingshighway Blvd, St. Louis, MO 63110.\n\nPayments are due by the 15th of each month to avoid late fees.",
    "How can I report a water main break?": "To report a water main break in St. Louis:\n\n1. Call the Water Division Emergency line at 314-771-4880. This line is available 24/7.\n\n2. Be prepared to provide the exact location of the break and any visible details about the severity.\n\n3. You can also report it through the Citizens' Service Bureau at 314-622-4800 during business hours.\n\n4. For after-hours emergencies that pose immediate danger, contact 911.\n\nThe Water Division typically responds to main breaks within 2-4 hours depending on severity."
  },
  "boeing": {
    "Tell me about Boeing's presence in St. Louis": "Boeing has a significant presence in St. Louis, with operations dating back to 1939 when they acquired McDonnell Douglas.\n\nCurrent operations in St. Louis include:\n\n• Boeing Defense, Space & Security headquarters\n• Manufacturing of F-15 and F/A-18 fighter jets\n• Research and development facilities\n• Approximately 14,000 employees in the region\n\nThe St. Louis campus is located near St. Louis Lambert International Airport and remains one of the largest manufacturing employers in Missouri.",
    "What jobs is Boeing hiring for in St. Louis?": "Boeing regularly hires for various positions in St. Louis, with current focus areas including:\n\n• Aerospace Engineers\n• Software Developers\n• Mechanical Engineers\n• Systems Engineers\n• Production Specialists\n• Supply Chain Managers\n• IT Security Professionals\n• Project Managers\n\nBoeing offers competitive salaries and benefits. To see current openings, visit careers.boeing.com and filter by St. Louis location. They also frequently participate in job fairs at Washington University, SLU, and UMSL."
  },
  "county": {
    "How do I pay my property taxes in St. Louis County?": "To pay St. Louis County property taxes, you have several options:\n\n1. Online: Visit stlouiscountymo.gov/collector and use the online payment system. You'll need your property account number.\n\n2. By Mail: Send check or money order to: St. Louis County Collector of Revenue, 41 S. Central Ave, St. Louis, MO 63105.\n\n3. In Person: Visit the Collector's office at the County Government Center in Clayton.\n\n4. By Phone: Call 314-615-5500 to pay using credit/debit card.\n\nProperty taxes are due by December 31 each year. A 2% penalty applies if paid in January, with penalties increasing each month thereafter.",
    "What are the hours for the St. Louis County Recorder of Deeds office?": "The St. Louis County Recorder of Deeds office hours are:\n\n• Monday through Friday: 8:30 AM to 5:00 PM\n• Closed on weekends and county holidays\n\nLocation: 41 South Central Avenue, 4th Floor, Clayton, MO 63105\nPhone: 314-615-7800\n\nMany services are also available online at stlouiscountymo.gov/recorder. You can access property records, marriage licenses, and other documents electronically 24/7."
  },
  "city": {
    "How do I get a business license in St. Louis City?": "To obtain a business license in St. Louis City:\n\n1. Register with the Secretary of State (if applicable).\n\n2. Apply for an Earnings Tax Business License through the License Collector's Office website (stlouis-mo.gov/collector) or in person at City Hall (1200 Market St).\n\n3. Complete the Business Registration Application form.\n\n4. Pay the license fee (varies by business type, starting at $25).\n\n5. If needed, obtain additional permits from Zoning, Building Division, or Health Department.\n\nProcessing typically takes 3-5 business days. Annual renewal is required, due by June 30th each year.",
    "What are the recycling guidelines for St. Louis City?": "St. Louis City recycling guidelines:\n\n✅ Accepted items:\n• Paper: newspapers, magazines, office paper, cardboard\n• Metal: aluminum cans, steel cans, empty aerosol cans\n• Plastic: bottles and containers with codes #1-5 and #7\n• Glass: bottles and jars (all colors)\n\n❌ Not accepted:\n• Plastic bags/wrap (return to grocery stores)\n• Styrofoam\n• Food-soiled items\n• Household hazardous waste\n\nRecycling is collected every other week on your regular collection day. Blue bins should be placed curbside by 6:00 AM. For bulky item pickup, schedule through the Citizens' Service Bureau at 314-622-4800."
  },
  "trash": {
    "What day is trash collection in my area?": "Trash collection days in St. Louis vary by neighborhood. To find your specific collection day:\n\n1. Visit the St. Louis City website (stlouis-mo.gov/refuse)\n\n2. Enter your address in the collection day lookup tool\n\n3. Or call the Refuse Division at 314-622-4800\n\nTypical collection rules:\n- Place trash out by 6:00 AM on your collection day\n- Use city-provided bins with lids closed\n- Keep bins 3 feet from cars, mailboxes, and other obstacles\n\nIf a holiday falls on your collection day, pickup is typically delayed by one day for the remainder of that week.",
    "How do I dispose of large items like furniture?": "For large item disposal in St. Louis:\n\n1. City Residents: Call the Citizens' Service Bureau at 314-622-4800 to schedule a bulk pickup. Each household is allowed 1 free pickup of up to 3 items per month. Additional pickups may incur a fee.\n\n2. County Residents: Check with your municipality or waste hauler for specific bulk collection services and fees.\n\nAlternatives:\n- Donate usable furniture to Goodwill, Salvation Army, or Habitat for Humanity ReStore\n- Use the St. Louis City transfer stations (fee applies)\n- For mattresses, some retailers offer removal with purchase of a new mattress\n\nNever dump items illegally - fines can reach $500."
  },
  "sewer": {
    "Who do I call for sewer backup issues?": "For sewer backup issues in St. Louis:\n\n1. City Residents: Call the Metropolitan St. Louis Sewer District (MSD) at 314-768-6260 for their 24/7 emergency line.\n\n2. If sewage is backing up into your home, MSD will typically respond within 2-4 hours.\n\n3. For minor backups or slow drains that may be limited to your property's plumbing, you'll need to contact a licensed plumber.\n\nImportant: Before calling, check if neighbors are experiencing similar issues, as this helps determine if it's a public sewer problem or private plumbing issue. MSD handles public sewer lines, while homeowners are responsible for their private lateral lines.",
    "How is the sewer system maintained in St. Louis?": "The Metropolitan St. Louis Sewer District (MSD) maintains the St. Louis sewer system through:\n\n1. Regular Inspections: Crews use camera technology to inspect pipes and identify issues before they become problems.\n\n2. Project Clear: A long-term initiative to eliminate sewer overflows through system upgrades, with approximately $6 billion invested over 23 years.\n\n3. Preventative Maintenance: Regular cleaning of sewer lines to remove blockages caused by grease, roots, and debris.\n\n4. Treatment Facilities: Operating seven wastewater treatment facilities that process approximately 330 million gallons of wastewater daily.\n\n5. Stormwater Management: Building detention basins and implementing green infrastructure to manage rainwater and prevent flooding.\n\nFunding comes primarily from monthly sewer charges on residents' water bills."
  },
  "monsanto": {
    "What is Monsanto's history in St. Louis?": "Monsanto's history in St. Louis:\n\n• Founded in 1901 by John F. Queeny in St. Louis, named after his wife's maiden name\n\n• Initially produced the artificial sweetener saccharin, then expanded into pharmaceuticals and industrial chemicals\n\n• After WWII, became a major agricultural products company, introducing herbicides like Roundup in 1976\n\n• 1980s-90s: Pioneered genetically modified crops\n\n• World headquarters was in Creve Coeur (St. Louis County) for decades\n\n• Employed thousands in the St. Louis region at its peak\n\n• 2018: Acquired by Bayer AG for $63 billion\n\nThe Monsanto name was retired after the Bayer acquisition, though its legacy remains significant to St. Louis' corporate history.",
    "How has Bayer's acquisition affected Monsanto's St. Louis operations?": "Bayer's acquisition of Monsanto has significantly impacted St. Louis operations:\n\n1. Employment changes:\n   • Retained the Creve Coeur campus as North American crop science division headquarters\n   • Initially maintained approximately 4,000 employees in St. Louis\n   • Some job reductions through consolidation of overlapping functions\n\n2. Name change:\n   • Monsanto name was completely phased out\n   • All operations now under Bayer Crop Science branding\n\n3. Community presence:\n   • Continued commitment to St. Louis with $400+ million investments in facilities\n   • Maintained philanthropic activities but under Bayer name\n   • Ongoing partnership with local universities and research institutions\n\n4. Business changes:\n   • Integrated research facilities and streamlined operations\n   • Centralized some functions to Bayer's German headquarters\n   • Inherited Monsanto's litigation challenges, particularly regarding Roundup"
  },
  "amazon": {
    "Where are Amazon fulfillment centers in the St. Louis area?": "Amazon fulfillment centers in the St. Louis area:\n\n1. STL6 - 3050 Gateway Commerce Center Dr S, Edwardsville, IL\n   • 1.5 million sq ft facility opened in 2016\n   • Handles larger inventory items\n\n2. STL8 - 4000 Gateway Commerce Center Dr, Edwardsville, IL\n   • 700,000 sq ft facility focusing on smaller items\n\n3. STL4 - 3963 Lakeview Corporate Dr, Edwardsville, IL\n   • Sortation center handling regional distribution\n\n4. Hazelwood Logistics Center - 11604 Pershall Rd, Hazelwood, MO\n   • Delivery station for last-mile delivery\n\n5. North St. Louis County - 13333 Lakefront Dr, Earth City, MO\n   • Delivery station opened in 2020\n\nAmazon continues to expand in the region, with plans for additional facilities in the coming years.",
    "How many people does Amazon employ in St. Louis?": "Amazon's employment in St. Louis:\n\n• Total workforce: Approximately 5,000+ employees across all facilities in the greater St. Louis area\n\n• Full-time positions: Majority are full-time with benefits starting day one\n\n• Seasonal hiring: Additional 1,500-2,000 temporary workers during peak holiday season (October-December)\n\n• Minimum wage: Starting at $15-18 per hour depending on position and shift\n\n• Types of roles:\n  - Warehouse associates\n  - Fulfillment center management\n  - Technical operations\n  - Delivery drivers (both direct and contracted)\n  - IT and support staff\n\nAmazon is currently among the top 15 largest private employers in the St. Louis metropolitan area and continues to grow its presence."
  },
  "handyman": {
    "How do I find Handyman Hardware True Value in St. Louis?": "Handyman Hardware True Value is located at:\n\n1. Main Location: 8735 Big Bend Blvd, Webster Groves, MO 63119\n   • Phone: (314) 962-0892\n   • Hours: Monday-Saturday 8:00 AM to 7:00 PM, Sunday 10:00 AM to 5:00 PM\n\n2. Downtown Location: 1 S Broadway, St. Louis, MO 63102\n   • Phone: (314) 421-1695\n   • Hours: Monday-Friday 7:30 AM to 6:00 PM, Saturday 9:00 AM to 5:00 PM\n\nBoth locations offer free parking and are accessible by public transportation. The Webster Groves location is known for its extensive garden center and helpful staff.",
    "What services does Handyman Hardware True Value offer?": "Handyman Hardware True Value offers a wide range of services:\n\n1. Hardware and Tool Rentals:\n   • Power tools: drills, sanders, saws\n   • Lawn equipment: aerators, tillers, trimmers\n   • Plumbing tools: pipe cutters, drain snakes\n\n2. Custom Services:\n   • Key cutting and duplication (including automotive keys)\n   • Window and screen repair\n   • Paint color matching and mixing\n   • Knife and tool sharpening\n   • Glass cutting\n\n3. Expert Advice:\n   • Free in-store consultations\n   • Project planning assistance\n   • DIY workshops twice monthly\n\n4. Delivery:\n   • Free delivery on orders over $50 within 5 miles\n   • Same-day delivery available for orders placed before 2:00 PM\n\nTheir Benjamin Moore paint center is particularly popular with local contractors and DIYers alike."
  },
  "dierbergs": {
    "What are Dierbergs' store hours?": "Dierbergs' store hours in the St. Louis area:\n\n• Standard hours for most locations:\n  - Monday through Sunday: 6:00 AM to 10:00 PM\n\n• Exceptions:\n  - Downtown Des Peres location: Open until 11:00 PM daily\n  - West Oak location in Creve Coeur: Opens at 5:30 AM weekdays\n\n• Pharmacy hours (varies by location):\n  - Typically Monday-Friday: 9:00 AM to 8:00 PM\n  - Saturday: 9:00 AM to 5:00 PM\n  - Sunday: 10:00 AM to 4:00 PM\n\n• Holiday hours may vary - stores often close early on Christmas Eve and New Year's Eve\n\nIt's always best to check the specific hours for your local store on the Dierbergs website or by calling ahead, as some locations may have adjusted hours.",
    "Does Dierbergs offer grocery delivery in St. Louis?": "Yes, Dierbergs offers grocery delivery in St. Louis:\n\n1. Delivery options:\n   • Shipt: Same-day delivery, typically within 1-2 hours\n   • Instacart: Delivery as soon as 1 hour from ordering\n   • Dierbergs Online: The store's own delivery service with more flexible scheduling\n\n2. Delivery area:\n   • Available throughout the St. Louis metropolitan area\n   • Covers all locations within approximately 20 miles of a Dierbergs store\n\n3. Fees and minimums:\n   • Delivery fees range from $7.99-$9.99 depending on order size\n   • Membership options available to reduce per-delivery costs\n   • Minimum order of $35 for most delivery services\n   • Additional fees during peak times or inclement weather\n\n4. Ordering methods:\n   • Dierbergs website\n   • Dierbergs mobile app\n   • Through Instacart or Shipt platforms\n\nDierbergs also offers curbside pickup at all locations for a lower fee ($4.99) or free for orders over $75."
  }
};

// Agent-specific prompt cards
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
    "How do I find Handyman Hardware True Value in St. Louis?",
    "What services does Handyman Hardware True Value offer?"
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

const ChatArea = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [promptCards, setPromptCards] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const { agentId } = useParams<{ agentId: string }>();
  const { toast } = useToast();

  // Set agent-specific prompts or default prompts
  useEffect(() => {
    if (agentId && AGENT_PROMPTS[agentId]) {
      setPromptCards(AGENT_PROMPTS[agentId]);
    } else {
      setPromptCards(DEFAULT_PROMPTS);
    }
    
    // Clear messages when changing agents/routes
    setMessages([]);
    
    // Set default prompt from location state if available
    if (location.state?.defaultPrompt) {
      setInputValue(location.state.defaultPrompt);
    } else {
      setInputValue("");
    }
  }, [agentId, location.state]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getSimulatedResponse = (prompt: string): string => {
    // Check if we have a specific response for this agent and prompt
    if (agentId && SIMULATED_RESPONSES[agentId]?.[prompt]) {
      return SIMULATED_RESPONSES[agentId][prompt];
    }
    
    // If no specific response, generate a generic one
    return `This is a simulated response about ${agentId || "general St. Louis information"} regarding: "${prompt}"`;
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
    
    // Simulate response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: getSimulatedResponse(userMessage.content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
    
    // Hide prompt cards once conversation starts
    if (messages.length === 0) {
      setPromptCards([]);
    }
  };

  const handlePromptClick = (text: string) => {
    setInputValue(text);
    
    // Auto-submit the form after setting the input value
    setTimeout(() => {
      const userMessage: Message = {
        role: "user",
        content: text,
        timestamp: new Date(),
      };
      
      setMessages([userMessage]);
      
      // Simulate response after a short delay
      setTimeout(() => {
        const aiResponse: Message = {
          role: "assistant",
          content: getSimulatedResponse(text),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
      
      // Hide prompt cards after selection
      setPromptCards([]);
    }, 100);
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
                  <p className="text-large whitespace-pre-wrap">{message.content}</p>
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
            <a href="/terms" className="underline hover:text-primary">
              Terms
            </a>{" "}
            and have read our{" "}
            <a href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </a>
            . Built with ❤️ by Ryan
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
