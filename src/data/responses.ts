
import { ActionOption } from "@/types/chat";

export const INTERACTIVE_RESPONSES: Record<string, Record<string, any>> = {
  "water": {
    "How do I pay my water bill in St. Louis?": {
      text: "I've pulled up your latest bill: $78.45 due for your service at 1234 Example Ave. You can pay online through payitSt.Louis.\n\nWould you like to:",
      options: [
        { text: "💳 Pay now online", action: "pay_now" },
        { text: "🔁 Set up autopay", action: "setup_autopay" },
        { text: "📞 Call Water Division (314-771-2255)", action: "call_division" },
        { text: "📜 View full billing history", action: "view_history" }
      ]
    },
    "How can I report a water main break?": {
      text: "Emergency water main breaks should be reported immediately to the Water Division at 314-771-2255. I can help you gather the information they'll need.\n\nWhat's your location?",
      options: [
        { text: "📍 Share intersection/address", action: "share_location" },
        { text: "📸 Describe the situation", action: "describe_break" },
        { text: "🚨 This is an emergency", action: "emergency_report" }
      ]
    }
  },
  "county": {
    "How do I pay my property taxes in St. Louis County?": {
      text: "Your 2024 property tax bill shows a balance of $2,850 for 1234 Example St, due December 31. The effective tax rate in St. Louis County is approximately 1.35%.\n\nI can help you:",
      options: [
        { text: "💳 Pay online now", action: "pay_now" },
        { text: "📋 Set up payment plan", action: "setup_plan" },
        { text: "📅 Add calendar reminder", action: "add_reminder" },
        { text: "⚖️ Learn about appeals process", action: "appeal_info" }
      ]
    },
    "What are the hours for the St. Louis County Recorder of Deeds office?": {
      text: "The Recorder of Deeds office at 41 South Central Avenue, Clayton, MO 63105 is open:\n\nMonday-Friday: 8:00 AM - 4:30 PM\nClosed weekends and holidays\n\nWould you like to:",
      options: [
        { text: "📍 Get directions to Clayton office", action: "get_directions" },
        { text: "📞 Call ahead (314-615-7100)", action: "call_office" },
        { text: "📝 See required documents", action: "required_docs" }
      ]
    }
  },
  "city": {
    "How do I get a business license in St. Louis City?": {
      text: "Business licensing is handled by the License Collector at City Hall (1200 Market Street). Fees are $200 for businesses starting June 1-January 1, or $100 for January 1-May 31 starts.\n\nWould you like to:",
      options: [
        { text: "📝 Start application process", action: "start_application" },
        { text: "💰 Calculate my exact fees", action: "calculate_fees" },
        { text: "📄 Review required documents", action: "review_docs" },
        { text: "📞 Call License Collector (314-622-4800)", action: "call_collector" }
      ]
    },
    "What are the recycling guidelines for St. Louis City?": {
      text: "In St. Louis City, blue bins accept:\n• Plastics #1-#5 and #7\n• Clean paper and cardboard\n• Metals and glass\n\nRecycling is collected weekly.\n\nWant me to:",
      options: [
        { text: "📅 Find your pickup schedule", action: "find_schedule" },
        { text: "♻️ Check if item is recyclable", action: "check_recyclable" },
        { text: "📍 Find nearest drop-off location", action: "find_dropoff" }
      ]
    }
  },
  "trash": {
    "What day is trash collection in my area?": {
      text: "Trash collection in St. Louis occurs on Monday/Thursday or Tuesday/Friday depending on your location. I need your address to check your specific schedule.\n\nWant me to:",
      options: [
        { text: "📍 Look up my address", action: "lookup_address" },
        { text: "🔔 Set pickup reminders", action: "set_reminders" },
        { text: "📦 Schedule bulk pickup", action: "bulk_pickup" },
        { text: "♻️ Learn recycling schedule", action: "recycling_schedule" }
      ]
    },
    "How do I dispose of large items like furniture?": {
      text: "St. Louis City offers bulk item pickup once per month. Items must be placed curbside by 7 AM on your scheduled collection day.\n\nI can help you:",
      options: [
        { text: "📅 Find my bulk pickup day", action: "find_bulk_day" },
        { text: "📋 See accepted bulk items", action: "accepted_items" },
        { text: "📞 Schedule special pickup", action: "schedule_pickup" },
        { text: "♻️ Find donation alternatives", action: "donation_options" }
      ]
    }
  },
  "sewer": {
    "Who do I call for sewer backup issues?": {
      text: "For sewer emergencies, contact MSD (Metropolitan Sewer District) Customer Service at 314-768-6260. You can also report issues online through their website.\n\nI can help you:",
      options: [
        { text: "🚨 Report emergency backup", action: "report_emergency" },
        { text: "📋 Document the issue", action: "document_issue" },
        { text: "🔍 Check area service alerts", action: "check_alerts" },
        { text: "💡 Get prevention tips", action: "prevention_tips" }
      ]
    },
    "How is the sewer system maintained in St. Louis?": {
      text: "MSD manages wastewater and stormwater through remote sensors, regular inspections, and preventive maintenance programs throughout the region.\n\nWant to learn about:",
      options: [
        { text: "🔧 Maintenance in your area", action: "local_maintenance" },
        { text: "💰 How your fees are used", action: "fee_usage" },
        { text: "🏠 Home backup prevention", action: "home_prevention" },
        { text: "📊 System performance data", action: "performance_data" }
      ]
    }
  },
  "boeing": {
    "Tell me about Boeing's presence in St. Louis": {
      text: "Boeing employs approximately 16,000 people in the St. Louis area across facilities in St. Louis and St. Charles counties. They build the F-15, T-7A, and MQ-25 aircraft here.\n\nWould you like to:",
      options: [
        { text: "🏭 Tour facility information", action: "facility_tour" },
        { text: "📊 See local economic impact", action: "economic_impact" },
        { text: "✈️ Learn about aircraft programs", action: "aircraft_programs" },
        { text: "💼 Explore career opportunities", action: "career_opportunities" }
      ]
    },
    "What jobs is Boeing hiring for in St. Louis?": {
      text: "Boeing regularly hires for engineering, manufacturing, and support roles in St. Louis. Current openings include aerospace engineers, machinists, and program managers.\n\nWant me to:",
      options: [
        { text: "🔍 Search current openings", action: "search_jobs" },
        { text: "🎓 Find entry-level positions", action: "entry_level" },
        { text: "📧 Get job alerts", action: "job_alerts" },
        { text: "📋 See application requirements", action: "application_requirements" }
      ]
    }
  },
  "monsanto": {
    "What is Monsanto's history in St. Louis?": {
      text: "Founded in St. Louis in 1901, Monsanto became a global leader in agriculture and biotechnology. After Bayer's acquisition, St. Louis now serves as Bayer's global Seeds headquarters.\n\nWant to explore:",
      options: [
        { text: "📅 Historical timeline", action: "historical_timeline" },
        { text: "🧪 Research legacy", action: "research_legacy" },
        { text: "🏢 Current Bayer operations", action: "current_operations" },
        { text: "💼 Job opportunities", action: "job_opportunities" }
      ]
    },
    "How has Bayer's acquisition affected Monsanto's St. Louis operations?": {
      text: "Bayer integrated Monsanto into its Crop Science division, maintaining St. Louis as the global Seeds HQ. The area continues active research in agriculture and biotechnology.\n\nWant details on:",
      options: [
        { text: "💰 Local facility investments", action: "facility_investments" },
        { text: "👥 Employment changes", action: "employment_changes" },
        { text: "🔬 Active research programs", action: "research_programs" },
        { text: "🌱 Future plans", action: "future_plans" }
      ]
    }
  },
  "amazon": {
    "Where are Amazon fulfillment centers in the St. Louis area?": {
      text: "Amazon operates multiple facilities in the region including sortation centers in Hazelwood, fulfillment centers in St. Peters, and delivery stations throughout the metro area.\n\nNeed help with:",
      options: [
        { text: "🗺️ Find nearest facility", action: "find_facility" },
        { text: "📦 Track a package", action: "track_package" },
        { text: "💼 Apply for jobs", action: "apply_jobs" },
        { text: "📞 Contact facility", action: "contact_facility" }
      ]
    },
    "How many people does Amazon employ in St. Louis?": {
      text: "Amazon employs over 10,000 people in the St. Louis region across warehouse operations, delivery, customer service, and technical roles.\n\nWant to learn about:",
      options: [
        { text: "📊 Jobs by facility type", action: "jobs_by_type" },
        { text: "💰 Salary and benefits", action: "salary_benefits" },
        { text: "📈 Career advancement", action: "career_advancement" },
        { text: "🎯 Apply for positions", action: "apply_positions" }
      ]
    }
  },
  "handyman": {
    "Where are the Handyman True Value Hardware stores in St. Louis?": {
      text: "There are 3 Handyman True Value locations:\n• 2730 N Hwy 67, Florissant, MO 63033\n• 2180 N Waterford Dr, Florissant, MO 63033\n• 12345 Tesson Ferry Rd, St. Louis, MO 63128\n\nWant me to:",
      options: [
        { text: "📍 Get directions to nearest store", action: "get_directions" },
        { text: "🕒 Check store hours", action: "check_hours" },
        { text: "📞 Call a specific location", action: "call_location" },
        { text: "🛠️ See services offered", action: "see_services" }
      ]
    },
    "What services does Handyman True Value Hardware offer?": {
      text: "Handyman stores offer key cutting, paint matching, tool rental, screen repair, and general hardware needs. Hours are typically Monday-Saturday 8 AM-6 PM.\n\nNeed help with:",
      options: [
        { text: "🔑 Key cutting service", action: "key_cutting" },
        { text: "🎨 Paint matching", action: "paint_matching" },
        { text: "🛠️ Tool rental", action: "tool_rental" },
        { text: "🪟 Screen repair", action: "screen_repair" }
      ]
    }
  },
  "dierbergs": {
    "What are Dierbergs' store hours?": {
      text: "Most Dierbergs stores operate 6 AM to 10 PM daily, though hours may vary by location. Use the Dierbergs Store Locator for specific store hours.\n\nWant me to:",
      options: [
        { text: "📍 Find nearest store hours", action: "find_store_hours" },
        { text: "💊 Check pharmacy hours", action: "pharmacy_hours" },
        { text: "🎄 See holiday hours", action: "holiday_hours" },
        { text: "📞 Call store directly", action: "call_store" }
      ]
    },
    "Does Dierbergs offer grocery delivery in St. Louis?": {
      text: "Yes! Dierbergs partners with Instacart and Shipt for delivery, plus offers Express Lane curbside pickup at participating locations.\n\nWant help with:",
      options: [
        { text: "🛒 Place delivery order", action: "place_delivery" },
        { text: "🚗 Schedule curbside pickup", action: "curbside_pickup" },
        { text: "💰 Compare delivery fees", action: "compare_fees" },
        { text: "📱 Download shopping app", action: "download_app" }
      ]
    }
  }
};

export const FOLLOW_UP_RESPONSES: Record<string, Record<string, any>> = {
  "water": {
    "pay_now": {
      text: "Redirecting you to payitSt.Louis portal... Your payment of $78.45 has been processed successfully. You'll receive an email confirmation shortly.\n\nWould you like me to:",
      options: [
        { text: "✅ Set up autopay for future bills", action: "setup_autopay" },
        { text: "📧 Update email for notifications", action: "update_email" }
      ],
      showFeedback: false
    },
    "setup_autopay": {
      text: "I can help you set up automatic payments through the Water Division. You'll need your account number and bank information.\n\nNext steps:",
      options: [
        { text: "📋 Get autopay enrollment form", action: "get_form" },
        { text: "📞 Call Water Division for setup", action: "call_setup" }
      ],
      showFeedback: false
    },
    "emergency_report": {
      text: "I've contacted the Water Division emergency line (314-771-2255) and logged your report. A crew will be dispatched within 30 minutes to assess the situation.\n\nReference #: WB-2024-1205\n\nAnything else I can help with?",
      options: [],
      showFeedback: true
    }
  },
  "county": {
    "pay_now": {
      text: "Processing your property tax payment of $2,850... Payment successful! You'll receive a receipt via email within 24 hours.\n\nWould you like me to:",
      options: [
        { text: "📅 Set reminder for next year", action: "set_reminder" },
        { text: "📄 Email payment confirmation", action: "email_confirmation" }
      ],
      showFeedback: false
    },
    "setup_plan": {
      text: "I've created a personalized payment plan for your $2,850 balance:\n\n• Payment 1: $950 (due Jan 15)\n• Payment 2: $950 (due Feb 15)\n• Payment 3: $950 (due Mar 15)\n\nWould you like to:",
      options: [
        { text: "✅ Confirm this plan", action: "confirm_plan" },
        { text: "📧 Email plan details", action: "email_plan" }
      ],
      showFeedback: false
    },
    "appeal_info": {
      text: "Property tax appeals can be filed with the Board of Equalization starting May 1, with a deadline on the second Monday in July. Your property was assessed at $195,800 for 2024.\n\nNext steps:",
      options: [
        { text: "📋 Get appeal forms", action: "get_appeal_forms" },
        { text: "📊 Review comparable properties", action: "review_comps" }
      ],
      showFeedback: true
    }
  },
  "city": {
    "start_application": {
      text: "I'll guide you through the business license application. You'll need:\n\n• Business name and type\n• Federal EIN number\n• Property lease/ownership documents\n• $200 application fee\n\nReady to begin?",
      options: [
        { text: "✅ Start application form", action: "start_form" },
        { text: "📞 Speak with License Collector", action: "speak_collector" }
      ],
      showFeedback: false
    },
    "find_schedule": {
      text: "I'll need your address to find your specific recycling pickup schedule. St. Louis City collects recycling weekly on the same day as trash.\n\nWhat's your address?",
      options: [
        { text: "📍 Enter my address", action: "enter_address" },
        { text: "📞 Call for schedule info", action: "call_schedule" }
      ],
      showFeedback: false
    }
  },
  "trash": {
    "lookup_address": {
      text: "I found your pickup schedule! Based on your address at 1234 Example St:\n\n• Trash: Thursday mornings\n• Recycling: Thursday mornings\n• Bulk pickup: Third Thursday of each month\n\nPlace bins curbside by 7 AM.",
      options: [
        { text: "📱 Add to calendar", action: "add_calendar" },
        { text: "🔔 Set phone reminders", action: "set_phone_reminders" }
      ],
      showFeedback: true
    },
    "bulk_pickup": {
      text: "Your next bulk pickup is scheduled for Thursday, December 19th. Accepted items include furniture, appliances, and large household items.\n\nItems must be curbside by 7 AM.",
      options: [
        { text: "📋 See full list of accepted items", action: "accepted_list" },
        { text: "📅 Add to my calendar", action: "calendar_bulk" }
      ],
      showFeedback: true
    }
  },
  "sewer": {
    "report_emergency": {
      text: "Emergency reported to MSD! Your reference number is: SE-2024-1205\n\nA technician will respond within 2 hours. For immediate assistance, call 314-768-6260.\n\nKeep the area clear and avoid contact with water.",
      options: [
        { text: "📞 Call MSD directly", action: "call_msd" },
        { text: "📸 Upload photos of issue", action: "upload_photos" }
      ],
      showFeedback: true
    },
    "prevention_tips": {
      text: "To prevent sewer backups:\n\n• Don't flush wipes, feminine products, or medications\n• Install a backflow preventer\n• Have your lateral line inspected every 5 years\n• Keep grease out of drains\n\nWant specific help with any of these?",
      options: [
        { text: "🔧 Find backflow preventer installers", action: "find_installers" },
        { text: "📋 Schedule lateral inspection", action: "schedule_inspection" }
      ],
      showFeedback: true
    }
  },
  "boeing": {
    "search_jobs": {
      text: "I found 47 current openings in St. Louis including:\n\n• Aerospace Engineer III (3 positions)\n• Manufacturing Technician (12 positions)\n• Program Manager (2 positions)\n• Quality Inspector (8 positions)\n\nWant to filter by specific criteria?",
      options: [
        { text: "🎓 Entry-level positions only", action: "entry_only" },
        { text: "💻 Remote-eligible jobs", action: "remote_jobs" },
        { text: "📧 Email me all listings", action: "email_listings" }
      ],
      showFeedback: false
    },
    "facility_tour": {
      text: "Boeing offers limited public tours of their St. Louis facilities. Tours must be scheduled in advance and require security clearance for some areas.\n\nInterested in:",
      options: [
        { text: "📅 Schedule a group tour", action: "schedule_group_tour" },
        { text: "🎓 Student/educational tours", action: "educational_tours" },
        { text: "📞 Contact facility directly", action: "contact_boeing" }
      ],
      showFeedback: true
    }
  },
  "monsanto": {
    "historical_timeline": {
      text: "Monsanto Timeline in St. Louis:\n\n• 1901: Founded by John F. Queeny\n• 1960s-80s: Major chemical operations\n• 2000s: Focus on agricultural biotechnology\n• 2018: Acquired by Bayer AG\n• Present: Global Seeds HQ\n\nWant details on any specific era?",
      options: [
        { text: "🧪 Early chemical innovations", action: "early_innovations" },
        { text: "🌱 Agricultural biotechnology era", action: "biotech_era" },
        { text: "🔬 Current research programs", action: "current_research" }
      ],
      showFeedback: true
    },
    "current_operations": {
      text: "Bayer operates multiple facilities in the St. Louis area focusing on:\n\n• Crop seeds research and development\n• Agricultural biotechnology\n• Global headquarters functions\n• Field testing operations\n\nEmploying thousands in the region.",
      options: [
        { text: "💼 View current job openings", action: "view_jobs" },
        { text: "📊 See economic impact data", action: "economic_impact" }
      ],
      showFeedback: true
    }
  },
  "amazon": {
    "find_facility": {
      text: "Nearest Amazon facilities to you:\n\n1. Hazelwood Sortation Center - 755 Howdershell Rd\n2. St. Peters Fulfillment Center - 3050 Technology Dr\n3. Earth City Delivery Station - 1 Earth City Expressway\n\nWhich location interests you?",
      options: [
        { text: "📍 Get directions to Hazelwood", action: "directions_hazelwood" },
        { text: "📦 Track package to St. Peters", action: "track_peters" },
        { text: "💼 Apply for jobs at any location", action: "apply_any" }
      ],
      showFeedback: false
    },
    "apply_jobs": {
      text: "Amazon is actively hiring for:\n\n• Warehouse Associates ($17-19/hr)\n• Delivery Drivers ($18-21/hr)\n• Shift Managers ($22-26/hr)\n• Package Handlers ($16-18/hr)\n\nMost positions offer benefits and flexible scheduling.",
      options: [
        { text: "📝 Apply for warehouse positions", action: "apply_warehouse" },
        { text: "🚚 Apply for delivery driver", action: "apply_driver" },
        { text: "📧 Get job alerts", action: "get_alerts" }
      ],
      showFeedback: true
    }
  },
  "handyman": {
    "get_directions": {
      text: "Based on your location, the nearest Handyman True Value is:\n\n2730 N Hwy 67, Florissant, MO 63033\nPhone: (314) 831-6200\nHours: Mon-Sat 8 AM-6 PM, Sun 9 AM-5 PM\n\nWould you like:",
      options: [
        { text: "🗺️ GPS directions", action: "gps_directions" },
        { text: "📞 Call before visiting", action: "call_first" },
        { text: "🛠️ Check if item is in stock", action: "check_stock" }
      ],
      showFeedback: false
    },
    "key_cutting": {
      text: "All Handyman True Value locations offer key cutting services for:\n\n• House keys\n• Car keys (basic)\n• Padlock keys\n• Specialty keys\n\nService usually takes 5-10 minutes. Bring your original key.",
      options: [
        { text: "💰 Get pricing information", action: "key_pricing" },
        { text: "⏰ Call to confirm availability", action: "confirm_availability" }
      ],
      showFeedback: true
    }
  },
  "dierbergs": {
    "place_delivery": {
      text: "I can help you get started with grocery delivery:\n\n• Instacart: Same-day delivery, $3.99+ fees\n• Shipt: Same-day delivery, $10.99+ fees\n• Both offer first-time user discounts\n\nWhich service interests you?",
      options: [
        { text: "🛒 Use Instacart", action: "use_instacart" },
        { text: "📦 Use Shipt", action: "use_shipt" },
        { text: "💰 Compare both services", action: "compare_both" }
      ],
      showFeedback: false
    },
    "curbside_pickup": {
      text: "Dierbergs Express Lane offers curbside pickup at most locations:\n\n• Order online or via app\n• Minimum $35 order\n• $4.95 pickup fee\n• 2-hour pickup windows\n\nYour nearest participating store is Dierbergs Brentwood.",
      options: [
        { text: "📱 Download Dierbergs app", action: "download_dierbergs_app" },
        { text: "🛒 Start curbside order", action: "start_curbside" }
      ],
      showFeedback: true
    }
  }
};
