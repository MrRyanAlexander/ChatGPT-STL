
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PublicChatPage = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center p-4 md:p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold">Join the Discord</h1>
        <p className="text-lg text-muted-foreground">
          Group chatting is possible here, but not currently enabled.
        </p>
        
        <div className="bg-secondary/50 rounded-xl p-6">
          <h2 className="text-xl font-medium mb-4">Join our Discord community</h2>
          <p className="mb-4">Connect with other St. Louis residents and get help in real-time.</p>
          <a 
            href="https://discord.gg/stlouis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline text-lg font-medium"
          >
            discord.gg/stlouis
          </a>
        </div>
      </div>
    </div>
  );
};

export default PublicChatPage;
