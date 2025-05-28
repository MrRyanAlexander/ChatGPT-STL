
export const AGENT_PROMPTS: Record<string, string[]> = {
  // GOV
  "county": [
    "How do I pay my property taxes in St. Louis County?",
    "What are the hours for the St. Louis County Recorder of Deeds office?",
    "How do I register to vote in St. Louis County?",
    "Where can I get a marriage license?"
  ],
  "city": [
    "How do I get a business license in St. Louis City?",
    "What are the recycling guidelines for St. Louis City?",
    "How do I report a pothole or street issue?",
    "What permits do I need for home renovations?"
  ],
  // UTILITIES
  "water": [
    "How do I pay my water bill in St. Louis?",
    "How can I report a water main break?",
    "What should I do if my water pressure is low?",
    "How do I start or stop water service?"
  ],
  "trash": [
    "What day is trash collection in my area?",
    "How do I dispose of large items like furniture?",
    "What items are not accepted in regular trash?",
    "How do I get extra trash bags for large cleanups?"
  ],
  "sewer": [
    "Who do I call for sewer backup issues?",
    "How is the sewer system maintained in St. Louis?",
    "What causes sewer backups in homes?",
    "How much does sewer service cost monthly?"
  ],
  // COMPANIES
  "boeing": [
    "Tell me about Boeing's presence in St. Louis",
    "What jobs is Boeing hiring for in St. Louis?",
    "What aircraft are manufactured in St. Louis?",
    "How has Boeing impacted the local economy?"
  ],
  "monsanto": [
    "What is Monsanto's history in St. Louis?",
    "How has Bayer's acquisition affected Monsanto's St. Louis operations?",
    "What research happens at Monsanto facilities?",
    "How many people work at Monsanto in St. Louis?"
  ],
  "amazon": [
    "Where are Amazon fulfillment centers in the St. Louis area?",
    "How many people does Amazon employ in St. Louis?",
    "What delivery options does Amazon offer locally?",
    "How can I apply for jobs at Amazon in St. Louis?"
  ],
  "handyman": [
    "Where are the Handyman True Value Hardware stores in St. Louis?",
    "What services does Handyman True Value Hardware offer?",
    "Do you carry specialized tools and equipment?",
    "What are your hours and contact information?"
  ],
  "dierbergs": [
    "What are Dierbergs' store hours?",
    "Does Dierbergs offer grocery delivery in St. Louis?",
    "What pharmacy services are available at Dierbergs?",
    "How do I find the closest Dierbergs location?"
  ]
};

export const DEFAULT_PROMPTS = [
  "How do I pay my water bill in St. Louis?",
  "Tell me about Boeing's presence in St. Louis",
  "What are the recycling guidelines for St. Louis City?",
  "What are Dierbergs' store hours?"
];
