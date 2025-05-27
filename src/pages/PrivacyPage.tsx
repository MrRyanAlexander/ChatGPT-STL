
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="p-6 md:p-10 h-[calc(100vh-64px)]">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="h-8 w-8"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
      </div>
      
      <ScrollArea className="h-full">
        <div className="max-w-4xl mx-auto pr-4">
          <div className="prose prose-lg max-w-none">
            <p className="text-large mb-4">
              Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use ChatGPTSTL.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
            <p className="text-large mb-4">
              We may collect personal information such as your name, email address, and allowed chat history when you use our service. We also collect cookies and usage data to improve your experience.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
            <p className="text-large mb-4">
              We use the information we collect to provide, maintain, and improve our service, and to communicate with you about your account and updates.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Data Storage and Security</h2>
            <p className="text-large mb-4">
              All data is stored securely using industry-standard encryption and security practices.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Cookies</h2>
            <p className="text-large mb-4">
              We use cookies to store certain preferences and track usage patterns. You can configure your browser to refuse cookies, but this may limit your ability to use some features.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Third-Party Services</h2>
            <p className="text-large mb-4">
              We may use third-party services to help us operate our service. These services have their own privacy policies governing the use of information.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">6. Your Rights</h2>
            <p className="text-large mb-4">
              You have the right to access, update, or delete your personal information at any time. You can do this through your account settings or by contacting us.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">7. Changes to Privacy Policy</h2>
            <p className="text-large mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
            
            <p className="text-large mt-8">
              Last updated: May 1, 2025
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PrivacyPage;
