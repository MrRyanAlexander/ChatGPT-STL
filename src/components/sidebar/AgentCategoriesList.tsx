
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { AgentCategory, DEFAULT_PROMPTS } from "@/data/agentCategories";

type AgentCategoriesListProps = {
  categories: AgentCategory[];
  activeItem: string | null;
  onAgentClick: (slug: string) => void;
};

const AgentCategoriesList = ({ 
  categories, 
  activeItem, 
  onAgentClick 
}: AgentCategoriesListProps) => {
  return (
    <div className="mb-4">
      <div className="text-center mb-3 mt-2">
        <h3 className="font-bold text-sm">AGENTS</h3>
        <Separator className="mt-1 bg-sidebar-border" />
      </div>
      
      {categories.map((category, index) => (
        <div key={category.name} className="mb-4">
          <p className="text-xs font-medium text-sidebar-foreground/70 ml-2 mb-1">
            {category.name}
          </p>
          
          {category.items.map((item) => (
            <button
              key={item.slug}
              className={`sidebar-item ${activeItem === item.slug ? 'sidebar-item-active' : ''}`}
              onClick={() => onAgentClick(item.slug)}
            >
              {item.name}
            </button>
          ))}
          
          {index < categories.length - 1 && (
            <Separator className="my-3 mx-2 bg-sidebar-border" />
          )}
        </div>
      ))}
    </div>
  );
};

export default AgentCategoriesList;
