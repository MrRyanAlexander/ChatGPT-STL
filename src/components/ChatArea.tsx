
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ArrowUp, Paperclip as Attach, Globe, FileText, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useChatHistory } from "@/hooks/useChatHistory";

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

// Expanded simulated responses for all agents (Corrected)
const SIMULATED_RESPONSES: Record<string, Record<string, string>> = {
  "water": {
    "How do I pay my water bill in St. Louis?": "To pay your St. Louis water/refuse bill, you have several options:\n\n1.  **Online:** Use the PayIt St. Louis website (payitstlouis.com) or the PayIt St. Louis mobile app. You can also find links via the City's Water Division website. You'll need your account information.\n\n2.  **By Phone:** For billing questions, call the Water Division at 314-771-2255. For questions about payment options, contact the Collector of Revenue's office at 314-622-3628.\n\n3.  **In Person:** Pay at City Hall, 1200 Market Street. Check current hours before visiting.\n\n4.  **By Mail:** Send a check or money order (payable to Collector of Revenue) with your bill stub to: Gregory F.X. Daly, Collector of Revenue, PO Box 66877, St. Louis MO 63166-6877.\n\nPayment due dates vary; refer to your specific bill to avoid late fees.",
    "How can I report a water main break?": "To report a water main break or water running in the street in St. Louis City:\n\n1.  **Immediately call the Water Division dispatch line at 314-771-4880**. This line is intended for reporting such issues.\n\n2.  Be prepared to provide the exact location (address or intersection) and details about the situation.\n\n3.  You can also report non-emergency water issues or follow up through the Citizens' Service Bureau (CSB) online or by calling 314-622-4800.\n\n4.  If the situation poses an immediate danger (e.g., severe flooding threatening safety), call 911."
  },
  "boeing": {
    "Tell me about Boeing's presence in St. Louis": "Boeing maintains a major presence in St. Louis, tracing its local roots to McDonnell Aircraft founded in 1939. Boeing acquired McDonnell Douglas in **1997**.\n\nCurrent St. Louis operations are a critical part of Boeing Defense, Space & Security (BDS), although the BDS headquarters is in Arlington, VA. Key activities include:\n\n*   Manufacturing advanced military aircraft like the F-15 variants, F/A-18 Super Hornet, T-7A Red Hawk trainer, and the MQ-25 Stingray unmanned aerial refueler.\n*   Significant research, development, and support facilities.\n*   Employing approximately **16,000** people in the region, making it one of Missouri's largest employers.\n\nThe extensive campus is located near St. Louis Lambert International Airport.",
    "What jobs is Boeing hiring for in St. Louis?": "Boeing consistently hires for a wide range of roles at its St. Louis facilities. Common areas of recruitment include:\n\n*   Aerospace, Software, Mechanical, and Systems Engineers\n*   Manufacturing and Production Specialists (including technicians and mechanics)\n*   Supply Chain and Logistics Professionals\n*   Information Technology and Cybersecurity Specialists\n*   Program and Project Managers\n*   Finance and Business Support Roles\n\nBoeing is known for offering competitive compensation and benefits packages. To find the most current job openings, visit the official Boeing careers website at **careers.boeing.com** and filter the search by \"St. Louis, Missouri\" or related local areas. Boeing also frequently engages with local talent through university partnerships (including Washington University, SLU, UMSL, and Missouri S&T) and participation in regional job fairs."
  },
  "county": {
    "How do I pay my property taxes in St. Louis County?": "To pay property taxes in St. Louis County, Missouri, you have several options:\n\n1.  **Online:** Visit the St. Louis County government website (stlouiscountymo.gov) and navigate to the Collector of Revenue section or the property tax payment portal. E-check payments are typically free, while credit/debit card payments incur a convenience fee.\n\n2.  **By Mail:** Mail a check or money order payable to the Collector of Revenue. Ensure it's postmarked by December 31st to avoid penalties. The specific mailing address should be confirmed on your tax bill or the county website, as it's often a PO Box.\n\n3.  **In Person:** Pay at the Collector of Revenue's office located at 41 S. Central Avenue in Clayton. Cash, check, and money orders are usually accepted for current taxes. Drop boxes may also be available.\n\n4.  **By Phone:** Payments via credit/debit card can often be made by calling a dedicated number (like 1-877-309-9306), but this service is typically handled by a third party and includes a convenience fee.\n\nProperty taxes are due by **December 31st** each year. Late payments are subject to penalties and interest as mandated by Missouri law, which can accrue monthly and reach up to 18% interest per year plus a 2% penalty.",
    "What are the hours for the St. Louis County Recorder of Deeds office?": "The St. Louis County Recorder of Deeds office, located at **41 South Central Avenue, 4th Floor, Clayton, MO 63105**, typically operates during standard county business hours.\n\n*   **Hours:** Monday through Friday, usually **8:00 AM to 5:00 PM** (It's best to call or check the website for exact current hours as the start time might be 8:30 AM). Closed on weekends and county holidays.\n*   **Phone:** A common contact number is **314-615-7100** (verify this specific number on the county website).\n\nMany records and services, such as searching property documents or information on marriage licenses, are accessible online 24/7 through the Recorder's section of the St. Louis County website (stlouiscountymo.gov)."
  },
  "city": {
    "How do I get a business license in St. Louis City?": "Obtaining a business license in the City of St. Louis involves several steps:\n\n1.  **State Registration:** If your business structure requires it (e.g., LLC, Corporation), register with the Missouri Secretary of State.\n\n2.  **Federal EIN:** Obtain an Employer Identification Number from the IRS if needed.\n\n3.  **City License Collector Registration:** Register your business with the St. Louis City License Collector's Office. This can typically be done online via the city's website (stlouis-mo.gov, navigate to the Collector or Business sections) or in person at City Hall (1200 Market Street, Room 109).\n\n4.  **Application & Fees:** Complete the necessary business license application forms. You will likely need to apply for a Graduated Business License, with fees based on your business type and gross receipts. Fees vary widely.\n\n5.  **Other Permits:** Depending on your business activities and location, you may need additional permits or clearances from departments like Health, Building Division (occupancy permits), or Zoning.\n\nProcessing times can vary. Business licenses require annual renewal, and the specific deadline may depend on the license type; check with the License Collector's office for your specific renewal date.",
    "What are the recycling guidelines for St. Louis City?": "St. Louis City recycling guidelines generally include:\n\n✅ **Accepted Items (Empty, Clean, and Dry):**\n*   **Paper:** Newspapers, magazines, mail, office paper, paperboard (like cereal boxes), cardboard (flattened). Pizza boxes with minimal grease (no larger than your palm) are okay.\n*   **Metal:** Aluminum cans, steel/tin cans, empty aerosol cans.\n*   **Plastic:** Bottles, jugs, tubs, and containers marked with recycling codes #1, #2, #3, #4, #5, or #7. Lids should generally be reattached.\n*   **Glass:** Bottles and jars (all colors).\n*   **Cartons:** Food and beverage cartons (like milk or juice boxes).\n\n❌ **Not Accepted in Blue Bins:**\n*   Plastic bags, film, or wrap (many grocery stores accept these).\n*   Styrofoam (polystyrene foam).\n*   Items heavily contaminated with food or liquid.\n*   Household hazardous waste (HHW).\n*   Electronics, batteries, clothing, hoses, wires, construction debris.\n\n**Collection:** Recycling is typically collected **weekly** on your regular trash day. Place blue bins curbside (or at your designated alley spot) by **6:00 AM**. For bulky item or electronics pickup, contact the Citizens' Service Bureau at 314-622-4800."
  },
  "trash": {
    "What day is trash collection in my area?": "Trash collection days in St. Louis City depend on your specific address. Here's how to find your day:\n\n1.  **Online Lookup:** Visit the City's website (stlouis-mo.gov) and look for the Refuse Division or Streets Department section. There should be an address lookup tool to find your collection schedule.\n\n2.  **Call CSB:** Contact the Citizens' Service Bureau (CSB) at **314-622-4800**.\n\n**General Collection Rules:**\n*   Place your city-provided trash bin (rollcart or dumpster access) out by **6:00 AM** on your collection day.\n*   Ensure the lid is closed.\n*   Keep bins several feet away (e.g., 3-5 feet) from obstructions like parked cars, mailboxes, poles, or other bins.\n*   Bring rollcarts back onto your property by the evening of your collection day.\n\n**Holiday Schedule:** If a designated city holiday falls on your collection day, pickup is usually delayed by one day for the rest of that week. Check the city's website for the official holiday schedule.",
    "How do I dispose of large items like furniture?": "Disposing of large items like furniture differs between St. Louis City and County:\n\n1.  **St. Louis City Residents:**\n    *   The city provides **monthly bulk item pickup** as part of your regular solid waste service fee.\n    *   Find your designated bulk pickup week by calling the Citizens' Service Bureau (CSB) at **314-622-4800** or using the lookup tool on the city's website.\n    *   Place up to **three (3)** large items (furniture, appliances, bundled branches, etc.) at your regular collection spot (curb or alley) by **6:00 AM on the Monday** of your designated week. Items should be picked up by the end of that week.\n    *   No specific scheduling call is needed for this regular monthly service. Refrigerators must have doors removed.\n\n2.  **St. Louis County Residents:**\n    *   Bulk item collection rules vary significantly depending on whether you live in unincorporated St. Louis County or a specific municipality, and who your waste hauler is.\n    *   Residents in unincorporated areas covered by county trash districts typically get monthly bulk pickup included. Contact your specific hauler to confirm your bulk pickup day and item limits.\n    *   If you live in an incorporated city within the county, check with your city hall or contracted waste hauler for their specific procedures and any associated fees.\n\n**Alternatives for Usable Items:**\n*   Donate furniture in good condition to charities like Habitat for Humanity ReStore, Goodwill, or Salvation Army.\n*   Sell or give items away online.\n\n**Other Disposal Options:**\n*   City residents can bring items to a City Transfer Station (one free load per month with proof of residency/paid bill).\n*   Some retailers offer haul-away services for old mattresses or appliances when you purchase new ones.\n\nAvoid illegal dumping, as it can result in significant fines."
  },
  "sewer": {
    "Who do I call for sewer backup issues?": "For sewer backup issues within the Metropolitan St. Louis Sewer District (MSD) service area (which includes St. Louis City and most of St. Louis County):\n\n1.  **Call MSD's 24/7 Emergency Line:** Dial **314-768-6260** immediately if you experience sewage backing up into your home or yard, witness a sewer overflow, or see serious street flooding or a missing/displaced manhole cover.\n\n2.  **MSD Response:** For urgent issues like backups, MSD aims to respond, often by dispatching an investigator, typically within four hours to assess the situation.\n\n3.  **Private Plumbing Issues:** If the problem seems isolated to your property (e.g., only one drain is slow, neighbors are unaffected), the issue might be in your private sewer lateral line, which is the homeowner's responsibility. In this case, you would need to contact a licensed plumber.\n\n4.  **Diagnosis Help:** Observing if neighbors have similar problems can help determine if it's likely a public main issue (MSD) or a private line issue (plumber).",
    "How is the sewer system maintained in St. Louis?": "The Metropolitan St. Louis Sewer District (MSD) maintains the vast sewer and stormwater system in its service area (St. Louis City and most of St. Louis County) through a multi-faceted approach:\n\n1.  **Inspections & Monitoring:** Regularly inspecting sewer lines, often using camera technology, to identify blockages, damage, or potential failures.\n\n2.  **Cleaning & Preventative Maintenance:** Proactively cleaning sewer lines to remove grease, roots, debris, and other obstructions that can cause backups and overflows.\n\n3.  **Repair & Rehabilitation:** Repairing or replacing aging or damaged sewer pipes and infrastructure.\n\n4.  **Project Clear:** This is a major, long-term capital improvement program (spanning decades and costing billions) mandated by a consent decree to reduce sewer overflows and improve water quality through system upgrades, separating combined sewers, and building new infrastructure.\n\n5.  **Wastewater Treatment:** Operating multiple wastewater treatment plants that treat hundreds of millions of gallons of wastewater daily before returning it safely to local rivers.\n\n6.  **Stormwater Management:** Constructing and maintaining stormwater infrastructure like detention basins, rain gardens, and green infrastructure solutions to manage rainwater runoff, reduce flooding, and lessen the burden on the sewer system.\n\nThese extensive operations are primarily funded by the monthly sewer charges included on residents' water/sewer bills."
  },
  "monsanto": {
    "What is Monsanto's history in St. Louis?": "Monsanto had a long and significant history rooted in St. Louis:\n\n*   **Founding:** Established in St. Louis in **1901** by John F. Queeny, who named the company after his wife's maiden name, Monsanto.\n*   **Early Products:** Its first product was the artificial sweetener **saccharin**. The company later expanded into industrial chemicals, plastics, and pharmaceuticals.\n*   **Shift to Agriculture:** Following World War II, Monsanto increasingly focused on agricultural chemicals, introducing the widely known herbicide **Roundup** in the mid-1970s.\n*   **Biotechnology:** In the 1980s and 1990s, Monsanto became a pioneer in agricultural biotechnology and genetically modified seeds (GMOs).\n*   **Local Hub:** For decades, its world headquarters was located in **Creve Coeur** in St. Louis County, with major research facilities also in Chesterfield. At its peak, it was a major employer in the region.\n*   **Acquisition:** In **2018**, Monsanto was acquired by the German company **Bayer AG** for approximately $63 billion.\n\nFollowing the acquisition, Bayer retired the Monsanto name, but the company's legacy as a major St. Louis corporation remains.",
    "How has Bayer's acquisition affected Monsanto's St. Louis operations?": "Bayer's 2018 acquisition of Monsanto brought significant changes to the St. Louis operations:\n\n1.  **Headquarters & Employment:** St. Louis (Creve Coeur) became the **Global Headquarters for Seeds & Traits** and the **North American Headquarters for Bayer's Crop Science division**. Bayer initially committed to retaining thousands of jobs and maintains a large workforce in St. Louis, despite some global restructuring.\n\n2.  **Branding:** The **Monsanto name was retired**, and all operations now fall under the Bayer Crop Science brand.\n\n3.  **Facilities & Investment:** Bayer has invested significantly in its St. Louis campuses (Creve Coeur and Chesterfield), including funds for modernizing facilities. Bayer is also consolidating its footprint and plans to sell underutilized portions of the Creve Coeur campus.\n\n4.  **Community Role:** Bayer continues to be a major corporate presence, maintaining philanthropic efforts and research partnerships with local institutions under the Bayer identity.\n\n5.  **Operational & Legal:** Operations and research facilities were integrated. Bayer also inherited ongoing litigation related to former Monsanto products, notably Roundup."
  },
  "amazon": {
    "Where are Amazon fulfillment centers in the St. Louis area?": "Amazon operates numerous facilities in the greater St. Louis metropolitan area, on both the Missouri and Illinois sides. Pinpointing exact current codes and functions can be complex as their network evolves. Key known locations include:\n\n*   **Edwardsville, IL:** Multiple large facilities are located here, primarily in the Gateway Commerce Center area. Addresses include **3931 Lakeview Corporate Drive** and **3050 Gateway Commerce Center Dr S**. These handle fulfillment and sortation.\n*   **St. Peters, MO:** A major fulfillment center (often coded STL8) is located at **4000 Premier Parkway**.\n*   **Hazelwood, MO:** Several facilities exist here, including sortation centers and delivery stations. Addresses include **462 Hazelwood Logistics Center Drive** and **6201 Aviator Drive**.\n*   **Earth City, MO:** Amazon operates facilities here as well, including delivery stations.\n\nAmazon also has facilities in other nearby locations. The network includes large fulfillment centers storing goods, sortation centers organizing packages for shipment, and delivery stations for last-mile logistics. Amazon frequently expands its footprint in the region.",
    "How many people does Amazon employ in St. Louis?": "Amazon is a major employer in the greater St. Louis metropolitan area (including Illinois):\n\n*   **Total Workforce:** While exact current numbers are hard to pinpoint publicly, Amazon employs **thousands** across its various facilities (fulfillment centers, sortation centers, delivery stations) in the region, likely well over 10,000 combined.\n*   **Position Types:** Most roles are full-time, offering benefits often starting from day one. Amazon also hires many seasonal workers, especially during peak holiday periods.\n*   **Starting Pay:** Amazon promotes competitive wages. Starting pay varies by specific role, shift, and location but generally begins well above minimum wage, often in the **$17-$20+ per hour** range for warehouse and logistics roles (check current job postings for specific rates).\n*   **Types of Roles:** Common positions include warehouse associates, sortation center staff, delivery station personnel, management, technical operations, IT support, HR, and delivery drivers (both direct Amazon employees and contractors).\n\nAmazon consistently ranks among the largest private employers in the St. Louis metro area due to its substantial and growing logistics network."
  },
  "handyman": {
    "Where are the Handyman True Value Hardware stores in St. Louis?": "There are three Handyman True Value Hardware stores serving the St. Louis area:\n\n1.  **North County (Florissant):**\n    *   Address: **2635 N US Highway 67, Florissant, MO 63033**\n    *   Phone: (314) 831-0220 (Verify)\n\n2.  **North County (Florissant):**\n    *   Address: **500 W Washington St, Florissant, MO 63031**\n    *   Phone: (314) 837-1360 (Verify)\n\n3.  **South County (Oakville):**\n    *   Address: **5405 Telegraph Rd, St. Louis, MO 63129**\n    *   Phone: (314) 894-8800 (Verify)\n\n**General Information (Verify for specific store):**\n*   **Hours:** Typically open daily, often until around 8:00 PM on weekdays/Saturdays and potentially earlier on Sundays. *Always check current hours before visiting.*\n*   **Services:** Usually offer in-store shopping, curbside pickup, and possibly local delivery.\n*   These stores are locally owned and operated affiliates of True Value.",
    "What services does Handyman True Value Hardware offer?": "The Handyman True Value Hardware stores in the St. Louis area (Florissant and Telegraph Rd) offer a wide array of products and services typical of neighborhood hardware stores:\n\n1.  **Shopping & Purchase Options:**\n    *   In-store shopping with staff assistance.\n    *   Online ordering with options for curbside pickup.\n    *   Local delivery service may be available (confirm with store).\n\n2.  **Core Product Departments:**\n    *   Tools (Hand and Power)\n    *   Plumbing Supplies\n    *   Electrical Supplies\n    *   Paint & Sundries (including paint mixing/matching)\n    *   Lawn & Garden\n    *   Hardware\n    *   Housewares & Cleaning Supplies\n    *   Seasonal Goods\n\n3.  **Common In-Store Services (Availability may vary slightly by location - call to confirm):**\n    *   Key cutting and duplication\n    *   Screen and window repair\n    *   Blade sharpening\n    *   Paint color matching\n    *   Propane tank exchange\n    *   Possibly glass/plexiglass cutting or small equipment rental (check specific store).\n\nAs locally owned True Value affiliates, these stores emphasize personalized customer service."
  },
  "dierbergs": {
    "What are Dierbergs' store hours?": "Dierbergs store hours can vary by location across the St. Louis area.\n\n*   **Common Store Hours:** Many Dierbergs locations are open from **6:00 AM to 10:00 PM** daily. However, some stores may close earlier (e.g., 9:00 PM) or later (e.g., the Des Peres store often stays open until **11:00 PM**).\n\n*   **Pharmacy Hours:** Pharmacy hours are *different* from main store hours and vary significantly between locations. Typical ranges might be Weekdays 8/9 AM - 7/8 PM, Saturdays 9 AM - 5/6 PM, Sundays 10 AM - 4/5 PM. *Always check the specific pharmacy hours for your chosen store.*\n\n*   **Holiday Hours:** Store and pharmacy hours are usually modified for major holidays.\n\n**It is highly recommended to check the current hours for your specific Dierbergs location** by visiting the Dierbergs website (dierbergs.com) and using their store locator, or by calling the store directly before you visit.",
    "Does Dierbergs offer grocery delivery in St. Louis?": "Yes, Dierbergs offers grocery delivery and curbside pickup options in the St. Louis area:\n\n1.  **Delivery Partners:** Dierbergs primarily utilizes third-party services **Shipt** and **Instacart** for same-day grocery delivery. You can place orders through the Dierbergs website or mobile app, or directly through the Shipt or Instacart platforms.\n\n2.  **How it Works:** Select items online, choose a delivery window, and a personal shopper fulfills and delivers your order.\n\n3.  **Delivery Area:** Service is generally available throughout the St. Louis metropolitan area where Dierbergs stores and its delivery partners operate. Check availability for your specific address.\n\n4.  **Fees & Minimums:** Delivery fees, service fees, and order minimums (often around $35) are determined by the delivery partner (Shipt or Instacart) and vary based on order size, speed, and membership status. Peak times may have extra fees.\n\n5.  **Curbside Pickup (Dierbergs Express Lane):** Dierbergs also offers curbside pickup at most locations. Order online and select a pickup time. There is typically a pickup fee (around $5), which may be waived for orders exceeding a certain amount (check current promotions)."
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

const ChatArea = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [promptCards, setPromptCards] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { chatHistories, addChat, updateChat, getChatById } = useChatHistory();
  
  // Get a unique key for this chat
  const chatKey = location.pathname.startsWith('/chat/history/') 
    ? location.pathname.split('/').pop() || 'home'
    : agentId || 'home';
  
  // Load chat history when component mounts or key changes
  useEffect(() => {
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
    
    // Clear input field when changing chats
    setInputValue("");
    
    // Set default prompt from location state if available and only if it's a new chat
    if (location.state?.defaultPrompt && (!chatData?.messages || chatData.messages.length === 0)) {
      setInputValue("");
      // Clear the location state to prevent it from persisting
      window.history.replaceState({}, document.title);
    }
  }, [agentId, location.pathname, location.state, chatKey, getChatById]);

  // Save chat history when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const title = messages[0].content.substring(0, 30) + (messages[0].content.length > 30 ? "..." : "");
      updateChat(chatKey, {
        id: chatKey,
        title: title,
        messages: messages,
        createdAt: messages[0].timestamp,
        updatedAt: new Date(),
        agentId: agentId || null
      });
    }
  }, [messages, chatKey, agentId, updateChat]);

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
