import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";
import { FeedbackData, FeedbackType } from "@/types/chat";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  interactionId: string;
  userResponse: string;
  onSubmitFeedback: (feedback: FeedbackData) => void;
}

const FeedbackModal = ({
  open,
  onClose,
  interactionId,
  userResponse,
  onSubmitFeedback,
}: FeedbackModalProps) => {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (helpful !== null) {
      onSubmitFeedback({
        interactionId,
        userResponse,
        feedback: {
          type: helpful ? 'helpful' : 'not_helpful',
          helpful,
          comment: comment.trim() || null,
          timestamp: new Date(),
        },
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Was this helpful to you?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center gap-4">
            <Button
              variant={helpful === true ? "default" : "outline"}
              className={`flex gap-2 ${helpful === true ? "bg-green-600" : ""}`}
              onClick={() => setHelpful(true)}
            >
              <Check className="h-4 w-4" />
              Yes, very useful
            </Button>
            <Button
              variant={helpful === false ? "default" : "outline"}
              className={`flex gap-2 ${helpful === false ? "bg-red-600" : ""}`}
              onClick={() => setHelpful(false)}
            >
              <X className="h-4 w-4" />
              No, not really
            </Button>
          </div>
          {helpful === false && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">I wish it could also...</p>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us what would have made this more helpful"
                className="min-h-24"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button 
            onClick={handleSubmit} 
            disabled={helpful === null}
            className="w-full"
          >
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
