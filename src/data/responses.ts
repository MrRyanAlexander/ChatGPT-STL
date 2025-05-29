
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
    },
    "What should I do if my water pressure is low?": {
      text: "Low water pressure can have several causes. Let me help you troubleshoot this issue step by step.\n\nFirst, let's determine the scope:",
      options: [
        { text: "🏠 Whole house has low pressure", action: "whole_house_pressure" },
        { text: "🚿 Only specific fixtures affected", action: "specific_fixtures" },
        { text: "⏰ Started recently", action: "recent_issue" },
        { text: "📞 Report to Water Division", action: "report_pressure" }
      ]
    },
    "How do I start or stop water service?": {
      text: "Water service changes can be handled online or by phone. You'll need account information and a valid ID.\n\nWhat do you need to do?",
      options: [
        { text: "🟢 Start new service", action: "start_service" },
        { text: "🔴 Stop existing service", action: "stop_service" },
        { text: "📱 Transfer service to new address", action: "transfer_service" },
        { text: "📋 Check service requirements", action: "service_requirements" }
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
        { text: "📝 See required documents", action: "required_docs" },
        { text: "🌐 Access online services", action: "online_services" }
      ]
    },
    "How do I register to vote in St. Louis County?": {
      text: "Voter registration in St. Louis County requires valid ID and proof of address. You can register online, by mail, or in person.\n\nChoose your preferred method:",
      options: [
        { text: "💻 Register online now", action: "register_online" },
        { text: "📮 Mail-in registration", action: "mail_registration" },
        { text: "🏢 In-person registration", action: "in_person_registration" },
        { text: "📋 Check registration status", action: "check_status" }
      ]
    },
    "Where can I get a marriage license?": {
      text: "Marriage licenses are issued at the St. Louis County License Office. Both parties must appear in person with valid photo ID.\n\nWhat do you need to know?",
      options: [
        { text: "📍 Find office locations", action: "office_locations" },
        { text: "📋 Required documents", action: "marriage_documents" },
        { text: "💰 Fees and payment methods", action: "marriage_fees" },
        { text: "📅 Make an appointment", action: "schedule_appointment" }
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
        { text: "📍 Find nearest drop-off location", action: "find_dropoff" },
        { text: "🗑️ Learn about large item disposal", action: "large_items" }
      ]
    },
    "How do I report a pothole or street issue?": {
      text: "Street issues can be reported through the Citizens' Service Bureau or online portal. Response time is typically 48-72 hours for assessment.\n\nHow would you like to report it?",
      options: [
        { text: "📱 Report online via portal", action: "online_report" },
        { text: "📞 Call Service Bureau (314-622-4800)", action: "call_bureau" },
        { text: "📍 Provide exact location details", action: "location_details" },
        { text: "📊 Check status of existing reports", action: "check_reports" }
      ]
    },
    "What permits do I need for home renovations?": {
      text: "Home renovation permits depend on the scope of work. Most electrical, plumbing, and structural changes require permits from the Building Division.\n\nWhat type of work are you planning?",
      options: [
        { text: "🔌 Electrical work", action: "electrical_permits" },
        { text: "🚿 Plumbing changes", action: "plumbing_permits" },
        { text: "🏗️ Structural modifications", action: "structural_permits" },
        { text: "📋 General renovation guide", action: "renovation_guide" }
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
    },
    "What items are not accepted in regular trash?": {
      text: "Several items require special disposal including electronics, hazardous materials, and large appliances. Here's what you need to know:\n\nWhat type of item do you need to dispose of?",
      options: [
        { text: "💻 Electronics and computers", action: "electronics_disposal" },
        { text: "🔋 Batteries and hazardous materials", action: "hazardous_disposal" },
        { text: "🏠 Large appliances", action: "appliance_disposal" },
        { text: "📋 View complete prohibited list", action: "prohibited_list" }
      ]
    },
    "How do I get extra trash bags for large cleanups?": {
      text: "For large cleanups, you can purchase additional city trash bags or schedule a special bulk pickup. Here are your options:\n\nWhat works best for you?",
      options: [
        { text: "🛒 Buy additional city bags", action: "buy_bags" },
        { text: "📞 Schedule bulk pickup", action: "schedule_bulk" },
        { text: "🏪 Find bag retailers", action: "find_retailers" },
        { text: "📋 Learn cleanup guidelines", action: "cleanup_rules" }
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
    },
    "What causes sewer backups in homes?": {
      text: "Sewer backups can result from blockages, heavy rainfall, or system overflows. Understanding the cause helps prevent future issues.\n\nLet me help you identify the cause:",
      options: [
        { text: "🌧️ During heavy rain", action: "rain_backup" },
        { text: "🚽 Regular usage issues", action: "usage_backup" },
        { text: "🏠 Basement/lower level", action: "basement_backup" },
        { text: "🔍 Schedule lateral inspection", action: "lateral_inspection" }
      ]
    },
    "How much does sewer service cost monthly?": {
      text: "MSD sewer service fees are based on water usage and property type. Residential customers typically pay $35-65 per month.\n\nWant to know more about:",
      options: [
        { text: "💰 Calculate my exact bill", action: "calculate_bill" },
        { text: "📊 Understand fee structure", action: "fee_structure" },
        { text: "💳 Payment options", action: "payment_options" },
        { text: "📞 Dispute a charge", action: "dispute_charge" }
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
    },
    "What aircraft are manufactured in St. Louis?": {
      text: "Boeing's St. Louis facilities produce several key aircraft programs:\n\n• F-15 Eagle fighter jets\n• T-7A Red Hawk trainer aircraft\n• MQ-25 Stingray refueling drones\n\nInterested in learning more about:",
      options: [
        { text: "⚔️ F-15 Eagle program", action: "f15_program" },
        { text: "🎓 T-7A Red Hawk trainer", action: "t7a_program" },
        { text: "🤖 MQ-25 Stingray drone", action: "mq25_program" },
        { text: "🏭 Manufacturing process", action: "manufacturing_process" }
      ]
    },
    "How has Boeing impacted the local economy?": {
      text: "Boeing is one of the largest employers in the St. Louis region, contributing billions annually to the local economy through wages, suppliers, and community investments.\n\nLearn more about:",
      options: [
        { text: "💰 Economic contribution data", action: "economic_data" },
        { text: "🏢 Local supplier network", action: "supplier_network" },
        { text: "🎓 Education partnerships", action: "education_partnerships" },
        { text: "🤝 Community investments", action: "community_investments" }
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
    },
    "What research happens at Monsanto facilities?": {
      text: "Current research focuses on crop genetics, biotechnology, and sustainable agriculture solutions. The St. Louis facilities house laboratories for seed development and field testing.\n\nInterested in:",
      options: [
        { text: "🌾 Crop genetics research", action: "genetics_research" },
        { text: "🧬 Biotechnology programs", action: "biotech_programs" },
        { text: "🌱 Sustainability initiatives", action: "sustainability_programs" },
        { text: "🔬 Research careers", action: "research_careers" }
      ]
    },
    "How many people work at Monsanto in St. Louis?": {
      text: "Bayer employs approximately 3,000 people in the St. Louis area across research, development, and administrative functions at multiple facilities.\n\nLearn about:",
      options: [
        { text: "📊 Employment by function", action: "employment_breakdown" },
        { text: "🏢 Facility locations", action: "facility_locations" },
        { text: "💼 Available positions", action: "available_positions" },
        { text: "💰 Benefits and compensation", action: "benefits_info" }
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
    },
    "What delivery options does Amazon offer locally?": {
      text: "Amazon provides same-day, next-day, and standard delivery options in the St. Louis area through multiple delivery methods including Amazon Logistics and partner carriers.\n\nInterested in:",
      options: [
        { text: "📦 Same-day delivery areas", action: "same_day_delivery" },
        { text: "📮 Amazon Locker locations", action: "locker_locations" },
        { text: "🚚 Delivery tracking options", action: "tracking_options" },
        { text: "💰 Prime membership benefits", action: "prime_benefits" }
      ]
    },
    "How can I apply for jobs at Amazon in St. Louis?": {
      text: "Amazon regularly hires for warehouse, delivery, and corporate positions. Applications are submitted online with immediate start dates often available.\n\nReady to:",
      options: [
        { text: "📝 Start online application", action: "start_application" },
        { text: "📋 See current openings", action: "current_openings" },
        { text: "💼 Learn about benefits", action: "learn_benefits" },
        { text: "📞 Contact recruiting", action: "contact_recruiting" }
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
    },
    "Do you carry specialized tools and equipment?": {
      text: "Yes! Handyman True Value carries both common and specialized tools for contractors and DIY enthusiasts, including rental options for larger equipment.\n\nLooking for:",
      options: [
        { text: "🔧 Professional contractor tools", action: "contractor_tools" },
        { text: "🏠 DIY home improvement tools", action: "diy_tools" },
        { text: "🚛 Equipment rental options", action: "equipment_rental" },
        { text: "📋 Special order capabilities", action: "special_orders" }
      ]
    },
    "What are your hours and contact information?": {
      text: "Store hours vary by location but typically:\n• Mon-Sat: 8:00 AM - 6:00 PM\n• Sunday: 9:00 AM - 5:00 PM\n\nWhich location do you need?",
      options: [
        { text: "📍 Florissant N Hwy 67 location", action: "florissant_hwy67" },
        { text: "📍 Florissant Waterford Dr location", action: "florissant_waterford" },
        { text: "📍 Tesson Ferry Rd location", action: "tesson_ferry" },
        { text: "📞 Call before visiting", action: "call_before_visit" }
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
    },
    "What pharmacy services are available at Dierbergs?": {
      text: "Dierbergs pharmacies offer prescription filling, vaccinations, health screenings, and medication therapy management with licensed pharmacists.\n\nInterested in:",
      options: [
        { text: "💉 Vaccination services", action: "vaccination_services" },
        { text: "💊 Prescription transfer", action: "prescription_transfer" },
        { text: "🏥 Health screenings", action: "health_screenings" },
        { text: "💰 Insurance and pricing", action: "insurance_pricing" }
      ]
    },
    "How do I find the closest Dierbergs location?": {
      text: "Use the Dierbergs store locator online or app to find the nearest location with hours, services, and contact information.\n\nWhat do you need to find?",
      options: [
        { text: "📍 Nearest store location", action: "nearest_store" },
        { text: "⛽ Stores with gas stations", action: "gas_stations" },
        { text: "💊 Pharmacy locations", action: "pharmacy_locations" },
        { text: "🛒 Express Lane pickup sites", action: "pickup_sites" }
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
      text: "I've contacted the Water Division emergency line (314-771-2255) and logged your report. A crew will be dispatched within 30 minutes to assess the situation.\n\nReference #: WB-2024-1205\n\nYour report has been prioritized for immediate response.",
      options: [],
      showFeedback: true
    },
    "whole_house_pressure": {
      text: "Whole house low pressure often indicates a main line issue or meter problem. I'll help you troubleshoot before calling for service.\n\nFirst, check if:",
      options: [
        { text: "🔧 Main water valve is fully open", action: "check_main_valve" },
        { text: "💧 Neighbors have similar issues", action: "check_neighbors" },
        { text: "📞 Call Water Division directly", action: "call_division_pressure" }
      ],
      showFeedback: false
    },
    "check_main_valve": {
      text: "Good thinking! Your main water valve is located near your water meter, usually close to the street. If it's partially closed, turning it fully counterclockwise should restore pressure.\n\nIf that doesn't help, the issue may be in the city's system.",
      options: [],
      showFeedback: true
    },
    "start_service": {
      text: "To start new water service, you'll need to visit the Water Division office or apply online. Service can typically be connected within 24-48 hours.\n\nRequired items:",
      options: [
        { text: "📋 See required documents", action: "service_documents" },
        { text: "💰 Check connection fees", action: "connection_fees" },
        { text: "📅 Schedule connection appointment", action: "schedule_connection" }
      ],
      showFeedback: false
    },
    "service_documents": {
      text: "For new water service, bring:\n• Valid photo ID\n• Lease agreement or deed\n• Social Security card\n• Deposit (if required)\n\nThe Water Division will verify your identity and property ownership before activation.",
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
    "confirm_plan": {
      text: "Your payment plan has been confirmed! You'll receive email reminders 5 days before each payment due date. Payments can be made online, by phone, or by mail.\n\nYour plan is now active and will help you manage your property tax obligations.",
      options: [],
      showFeedback: true
    },
    "appeal_info": {
      text: "Property tax appeals can be filed with the Board of Equalization starting May 1, with a deadline on the second Monday in July. Your property was assessed at $195,800 for 2024.\n\nNext steps:",
      options: [
        { text: "📋 Get appeal forms", action: "get_appeal_forms" },
        { text: "📊 Review comparable properties", action: "review_comps" }
      ],
      showFeedback: false
    },
    "get_appeal_forms": {
      text: "Appeal forms are available online or at the County Assessor's office. You'll need evidence supporting your claim such as recent appraisals, repair estimates, or comparable sales data.\n\nThe appeal process typically takes 2-3 months to complete.",
      options: [],
      showFeedback: true
    },
    "register_online": {
      text: "Great choice! Online registration is the fastest method. You'll need your driver's license or state ID, and the system will verify your information automatically.\n\nThe process typically takes 5-10 minutes to complete.",
      options: [],
      showFeedback: true
    },
    "office_locations": {
      text: "Marriage licenses are available at:\n\n• License Office - 41 S Central Ave, Clayton\n• Hours: Mon-Fri 8:00 AM - 4:30 PM\n• Cost: $51 (cash or money order only)\n\nBoth parties must appear together with valid photo ID.",
      options: [],
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
    "start_form": {
      text: "Perfect! The online application will walk you through each step. Most applications are processed within 5-7 business days after submission.\n\nYou'll receive email updates on your application status throughout the process.",
      options: [],
      showFeedback: true
    },
    "find_schedule": {
      text: "I'll need your address to find your specific recycling pickup schedule. St. Louis City collects recycling weekly on the same day as trash.\n\nWhat's your address?",
      options: [
        { text: "📍 Enter my address", action: "enter_address" },
        { text: "📞 Call for schedule info", action: "call_schedule" }
      ],
      showFeedback: false
    },
    "enter_address": {
      text: "Based on your address, your recycling and trash pickup is every Thursday morning. Place bins curbside by 7 AM for collection.\n\nI've added this schedule to your account for future reference.",
      options: [],
      showFeedback: true
    },
    "online_report": {
      text: "The online reporting portal allows you to upload photos and provide detailed descriptions. You'll receive a tracking number to monitor repair progress.\n\nMost pothole repairs are completed within 2 weeks of reporting.",
      options: [],
      showFeedback: true
    },
    "electrical_permits": {
      text: "Electrical permits are required for:\n• New circuits or panels\n• Outlet additions\n• Light fixture installations\n• Code compliance upgrades\n\nFees start at $50 for basic work. Inspection is required after completion.",
      options: [],
      showFeedback: true
    }
  },
  "trash": {
    "lookup_address": {
      text: "I found your pickup schedule! Based on your address at 1234 Example St:\n\n• Trash: Thursday mornings\n• Recycling: Thursday mornings\n• Bulk pickup: Third Thursday of each month\n\nPlace bins curbside by 7 AM.",
      options: [
        { text: "📱 Add to calendar", action: "add_calendar" },
        { text: "🔔 Set phone reminders", action: "set_phone_reminders" }
      ],
      showFeedback: false
    },
    "add_calendar": {
      text: "Calendar reminders have been set up for your weekly pickup and monthly bulk collection. You'll receive notifications the night before each pickup day.\n\nNever miss collection day again!",
      options: [],
      showFeedback: true
    },
    "bulk_pickup": {
      text: "Your next bulk pickup is scheduled for Thursday, December 19th. Accepted items include furniture, appliances, and large household items.\n\nItems must be curbside by 7 AM.",
      options: [
        { text: "📋 See full list of accepted items", action: "accepted_list" },
        { text: "📅 Add to my calendar", action: "calendar_bulk" }
      ],
      showFeedback: false
    },
    "accepted_list": {
      text: "Bulk pickup accepts:\n• Furniture and mattresses\n• Large appliances (freon must be removed)\n• Construction debris (small amounts)\n• Yard waste in biodegradable bags\n\nElectronics and hazardous materials require special disposal.",
      options: [],
      showFeedback: true
    },
    "electronics_disposal": {
      text: "Electronics can be recycled at:\n• Best Buy stores (small items)\n• City collection events (quarterly)\n• Licensed e-waste facilities\n\nNever place electronics in regular trash - they contain recyclable materials and potentially harmful substances.",
      options: [],
      showFeedback: true
    },
    "buy_bags": {
      text: "Official city trash bags are available at:\n• City Hall\n• Local grocery stores\n• Hardware stores\n\nCost is $2 per bag, and they're accepted on any regular collection day.",
      options: [],
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
      showFeedback: false
    },
    "call_msd": {
      text: "Calling MSD directly at 314-768-6260 is the fastest way to get immediate assistance. Have your reference number SE-2024-1205 ready when you call.\n\nThey're available 24/7 for emergencies.",
      options: [],
      showFeedback: true
    },
    "prevention_tips": {
      text: "To prevent sewer backups:\n\n• Don't flush wipes, feminine products, or medications\n• Install a backflow preventer\n• Have your lateral line inspected every 5 years\n• Keep grease out of drains\n\nWant specific help with any of these?",
      options: [
        { text: "🔧 Find backflow preventer installers", action: "find_installers" },
        { text: "📋 Schedule lateral inspection", action: "schedule_inspection" }
      ],
      showFeedback: false
    },
    "find_installers": {
      text: "Licensed backflow preventer installers in your area:\n• ABC Plumbing (314-555-0123)\n• City Approved Contractors list available online\n• Cost typically ranges $800-1500\n\nInstallation may qualify for MSD rebates.",
      options: [],
      showFeedback: true
    },
    "rain_backup": {
      text: "Backups during heavy rain usually indicate system overload or poor drainage. Consider installing a sump pump or backflow preventer to protect your property.\n\nMSD offers financial assistance programs for qualifying improvements.",
      options: [],
      showFeedback: true
    },
    "calculate_bill": {
      text: "Your estimated monthly MSD bill based on typical 3,000 gallon usage:\n• Wastewater: $42.50\n• Stormwater: $8.20\n• Total: $50.70\n\nActual charges depend on your water usage and property size.",
      options: [],
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
    "entry_only": {
      text: "Found 12 entry-level positions perfect for new graduates:\n• Associate Engineer (4 positions)\n• Manufacturing Trainee (5 positions)\n• Quality Technician (3 positions)\n\nAll include comprehensive training programs and mentorship opportunities.",
      options: [],
      showFeedback: true
    },
    "facility_tour": {
      text: "Boeing offers limited public tours of their St. Louis facilities. Tours must be scheduled in advance and require security clearance for some areas.\n\nInterested in:",
      options: [
        { text: "📅 Schedule a group tour", action: "schedule_group_tour" },
        { text: "🎓 Student/educational tours", action: "educational_tours" },
        { text: "📞 Contact facility directly", action: "contact_boeing" }
      ],
      showFeedback: false
    },
    "schedule_group_tour": {
      text: "Group tours are available for 10+ people with advance notice. Contact Boeing Community Relations at (314) 232-0232 to schedule.\n\nTours typically last 2 hours and showcase aircraft manufacturing processes.",
      options: [],
      showFeedback: true
    },
    "f15_program": {
      text: "The F-15 Eagle is Boeing's premier fighter aircraft, manufactured in St. Louis since the 1970s. The facility produces both new aircraft and modernization upgrades.\n\nThe program employs over 3,000 people locally across engineering, manufacturing, and support roles.",
      options: [],
      showFeedback: true
    },
    "economic_data": {
      text: "Boeing's St. Louis economic impact:\n• $2.8 billion annual economic contribution\n• 16,000 direct employees\n• 35,000 indirect jobs supported\n• $1.2 billion in annual payroll\n\nBoeing is consistently ranked among the top employers in the region.",
      options: [],
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
      showFeedback: false
    },
    "early_innovations": {
      text: "Monsanto's early innovations included:\n• Saccharin production (1901)\n• Aspirin manufacturing (1917)\n• Industrial chemicals (1920s-40s)\n• Plastics and synthetic materials (1940s-60s)\n\nThese innovations established St. Louis as a major chemical manufacturing center.",
      options: [],
      showFeedback: true
    },
    "current_operations": {
      text: "Bayer operates multiple facilities in the St. Louis area focusing on:\n\n• Crop seeds research and development\n• Agricultural biotechnology\n• Global headquarters functions\n• Field testing operations\n\nEmploying thousands in the region.",
      options: [
        { text: "💼 View current job openings", action: "view_jobs" },
        { text: "📊 See economic impact data", action: "economic_impact" }
      ],
      showFeedback: false
    },
    "view_jobs": {
      text: "Current Bayer openings in St. Louis:\n• Research Scientists (8 positions)\n• Field Testing Specialists (12 positions)\n• Data Analysts (6 positions)\n• Administrative Support (4 positions)\n\nAll positions offer competitive benefits and research opportunities.",
      options: [],
      showFeedback: true
    },
    "genetics_research": {
      text: "Crop genetics research focuses on:\n• Disease resistance traits\n• Yield improvement genetics\n• Climate adaptation\n• Nutritional enhancement\n\nSt. Louis facilities house state-of-the-art laboratories and greenhouse complexes for this research.",
      options: [],
      showFeedback: true
    },
    "employment_breakdown": {
      text: "Bayer St. Louis employment by function:\n• Research & Development: 45%\n• Administrative: 25%\n• Field Operations: 20%\n• Manufacturing Support: 10%\n\nMost positions require scientific or technical backgrounds.",
      options: [],
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
    "directions_hazelwood": {
      text: "Hazelwood Sortation Center\n755 Howdershell Rd, Hazelwood, MO 63042\n\nFrom I-270: Take Exit 25 (Howdershell Rd), head north 0.5 miles. Facility is on the right.\n\nOperating hours: 24/7 for package processing.",
      options: [],
      showFeedback: true
    },
    "apply_jobs": {
      text: "Amazon is actively hiring for:\n\n• Warehouse Associates ($17-19/hr)\n• Delivery Drivers ($18-21/hr)\n• Shift Managers ($22-26/hr)\n• Package Handlers ($16-18/hr)\n\nMost positions offer benefits and flexible scheduling.",
      options: [
        { text: "📝 Apply for warehouse positions", action: "apply_warehouse" },
        { text: "🚚 Apply for delivery driver", action: "apply_driver" },
        { text: "📧 Get job alerts", action: "get_alerts" }
      ],
      showFeedback: false
    },
    "apply_warehouse": {
      text: "Warehouse Associate positions offer:\n• Starting pay $17-19/hour\n• Health benefits from day one\n• 401k with company match\n• Flexible schedules available\n\nApplications are processed within 24-48 hours with immediate start dates often available.",
      options: [],
      showFeedback: true
    },
    "same_day_delivery": {
      text: "Same-day delivery is available in most St. Louis metro areas for orders placed by noon. Coverage includes:\n• St. Louis City and County\n• St. Charles County\n• Jefferson County (select areas)\n\nDelivery window is typically 4-8 hours after order placement.",
      options: [],
      showFeedback: true
    },
    "start_application": {
      text: "Ready to apply! Amazon's application process is streamlined:\n1. Complete online application (10-15 minutes)\n2. Background check (24-48 hours)\n3. Virtual or in-person interview\n4. Start date within 1 week\n\nMany positions offer same-week start dates.",
      options: [],
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
    "gps_directions": {
      text: "Opening GPS directions to Handyman True Value Florissant...\n\nEstimated drive time: 15 minutes\nParking: Free customer parking available in front of store\n\nStore specializes in hardware, tools, and home improvement supplies.",
      options: [],
      showFeedback: true
    },
    "key_cutting": {
      text: "All Handyman True Value locations offer key cutting services for:\n\n• House keys\n• Car keys (basic)\n• Padlock keys\n• Specialty keys\n\nService usually takes 5-10 minutes. Bring your original key.",
      options: [
        { text: "💰 Get pricing information", action: "key_pricing" },
        { text: "⏰ Call to confirm availability", action: "confirm_availability" }
      ],
      showFeedback: false
    },
    "key_pricing": {
      text: "Key cutting prices:\n• Standard house keys: $2.50\n• Car keys (basic): $3.50\n• Specialty/high-security keys: $4.50-$8.00\n\nMost keys are cut while you wait. Complex keys may require ordering.",
      options: [],
      showFeedback: true
    },
    "contractor_tools": {
      text: "Professional contractor tools available:\n• Power tools (DeWalt, Milwaukee)\n• Hand tools (Stanley, Craftsman)\n• Specialty trade tools\n• Bulk fasteners and supplies\n\nContractor discounts available with business account.",
      options: [],
      showFeedback: true
    },
    "florissant_hwy67": {
      text: "Handyman True Value - Florissant N Hwy 67\n2730 N Hwy 67, Florissant, MO 63033\nPhone: (314) 831-6200\n\nHours:\n• Mon-Sat: 8:00 AM - 6:00 PM\n• Sunday: 9:00 AM - 5:00 PM",
      options: [],
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
    "use_instacart": {
      text: "Instacart offers delivery from most Dierbergs locations:\n• Delivery fee: $3.99-$5.99\n• Service fee: 5%\n• Tip: 15-20% recommended\n• First order: Often 50% off delivery\n\nDownload the Instacart app to get started.",
      options: [],
      showFeedback: true
    },
    "curbside_pickup": {
      text: "Dierbergs Express Lane offers curbside pickup at most locations:\n\n• Order online or via app\n• Minimum $35 order\n• $4.95 pickup fee\n• 2-hour pickup windows\n\nYour nearest participating store is Dierbergs Brentwood.",
      options: [
        { text: "📱 Download Dierbergs app", action: "download_dierbergs_app" },
        { text: "🛒 Start curbside order", action: "start_curbside" }
      ],
      showFeedback: false
    },
    "download_dierbergs_app": {
      text: "The Dierbergs app offers:\n• Curbside pickup ordering\n• Digital coupons\n• Weekly ads\n• Store locator\n• Pharmacy refills\n\nAvailable free on iOS and Android app stores.",
      options: [],
      showFeedback: true
    },
    "vaccination_services": {
      text: "Dierbergs pharmacies offer:\n• COVID-19 vaccines\n• Flu shots (seasonal)\n• Travel vaccinations\n• Shingles vaccines\n• Pneumonia vaccines\n\nMost vaccines are available without appointment. Insurance typically covers costs.",
      options: [],
      showFeedback: true
    },
    "nearest_store": {
      text: "Based on your location, the nearest Dierbergs is:\n\nDierbergs Brentwood\n8629 Manchester Rd, Brentwood, MO 63144\nPhone: (314) 961-1392\n\nHours: 6:00 AM - 10:00 PM daily\nServices: Full grocery, pharmacy, gas station",
      options: [],
      showFeedback: true
    }
  }
};
