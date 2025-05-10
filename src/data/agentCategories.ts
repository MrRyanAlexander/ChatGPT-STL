
export type AgentItem = {
  name: string;
  slug: string;
};

export type AgentCategory = {
  name: string;
  items: AgentItem[];
};

export const AGENT_CATEGORIES: AgentCategory[] = [
  {
    name: "GOV",
    items: [
      { name: "County", slug: "county" },
      { name: "City", slug: "city" }
    ]
  },
  {
    name: "UTILITIES",
    items: [
      { name: "Water", slug: "water" },
      { name: "Trash", slug: "trash" },
      { name: "Sewer", slug: "sewer" }
    ]
  },
  {
    name: "COMPANIES",
    items: [
      { name: "Boeing", slug: "boeing" },
      { name: "Monsanto", slug: "monsanto" },
      { name: "Amazon", slug: "amazon" },
      { name: "Handyman Hardware", slug: "handyman" },
      { name: "Dierbergs", slug: "dierbergs" }
    ]
  }
];

export const DEFAULT_PROMPTS: Record<string, string> = {
  "water": "How do I pay my water bill in St. Louis?",
  "boeing": "Tell me about Boeing's presence in St. Louis",
  "county": "How do I pay my property taxes in St. Louis County?",
  "city": "How do I get a business license in St. Louis City?",
  "trash": "What day is trash collection in my area?",
  "sewer": "Who do I call for sewer backup issues?",
  "monsanto": "What is Monsanto's history in St. Louis?",
  "amazon": "Where are Amazon fulfillment centers in the St. Louis area?",
  "handyman": "Where are the Handyman True Value Hardware stores in St. Louis?",
  "dierbergs": "What are Dierbergs' store hours?"
};
