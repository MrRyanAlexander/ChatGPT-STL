
import { AgentItem, AgentCategory } from "@/types/agent";

export const AGENT_CATEGORIES: AgentCategory[] = [
  {
    id: "gov",
    name: "GOV",
    items: [
      { id: "county", name: "County", slug: "county" },
      { id: "city", name: "City", slug: "city" }
    ]
  },
  {
    id: "utilities",
    name: "UTILITIES",
    items: [
      { id: "water", name: "Water", slug: "water" },
      { id: "trash", name: "Trash", slug: "trash" },
      { id: "sewer", name: "Sewer", slug: "sewer" }
    ]
  },
  {
    id: "companies",
    name: "COMPANIES",
    items: [
      { id: "boeing", name: "Boeing", slug: "boeing" },
      { id: "monsanto", name: "Monsanto", slug: "monsanto" },
      { id: "amazon", name: "Amazon", slug: "amazon" },
      { id: "handyman", name: "Handyman Hardware", slug: "handyman" },
      { id: "dierbergs", name: "Dierbergs", slug: "dierbergs" }
    ]
  }
];
