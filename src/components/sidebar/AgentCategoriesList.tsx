
import { useNavigate, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AgentCategory } from "@/types/agent";

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
    <SidebarGroup>
      <SidebarGroupLabel>AGENTS</SidebarGroupLabel>
      <SidebarGroupContent>
        {categories.map((category, index) => (
          <div key={category.name} className="mb-4">
            <p className="text-xs font-medium text-sidebar-foreground/70 ml-2 mb-1">
              {category.name}
            </p>
            
            <SidebarMenu>
              {category.items.map((item) => (
                <SidebarMenuItem key={item.slug}>
                  <SidebarMenuButton
                    onClick={() => onAgentClick(item.slug)}
                    isActive={activeItem === item.slug}
                    className="w-full justify-start"
                  >
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            {index < categories.length - 1 && (
              <Separator className="my-3 mx-2 bg-sidebar-border" />
            )}
          </div>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default AgentCategoriesList;
