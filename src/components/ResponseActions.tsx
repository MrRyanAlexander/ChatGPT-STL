
import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { ActionOption } from "@/types/chat";

interface ResponseActionsProps {
  options: ActionOption[];
  onActionClick: (action: string) => void;
}

const ResponseActions = memo(({ options, onActionClick }: ResponseActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((option, index) => (
        <Button
          key={`${option.action}-${index}`}
          variant="outline"
          className="bg-secondary/50 hover:bg-secondary"
          onClick={() => onActionClick(option.action)}
        >
          {option.text}
        </Button>
      ))}
    </div>
  );
});

ResponseActions.displayName = 'ResponseActions';

export default ResponseActions;
