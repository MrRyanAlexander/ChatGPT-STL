
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
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
        <h1 className="text-3xl font-bold">Terms of Service</h1>
      </div>
      
      <ScrollArea className="h-full">
        <div className="max-w-4xl mx-auto pr-4">
          <div className="prose prose-lg max-w-none">
            <p className="text-large mb-4">
              Welcome to ChatGPTSTL. ChatGPTSTL and ChatGPTSTL.com are not affiliated with OpenAi or ChatGPT.com. By accessing and using this website, you agree to be bound by these Terms of Service.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
            <p className="text-large mb-4">
              By accessing or using ChatGPTSTL, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">2. Use License</h2>
            <p className="text-large mb-4">
              Permission is granted to temporarily use ChatGPTSTL for personal, non-commercial purposes. This is the grant of a license, not a transfer of title.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Disclaimer</h2>
            <p className="text-large mb-4">
              The information provided on ChatGPTSTL is for general educational purposes only. While we do our best to ensure data accuracy, we make no representations or warranties about the accuracy or completeness of the information.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Limitations</h2>
            <p className="text-large mb-4">
              In no event shall ChatGPTSTL or its suppliers be liable for any damages arising out of the use or inability to use the materials on this site.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Revisions</h2>
            <p className="text-large mb-4">
              We may revise these Terms at any time without notice. By using this website, you agree to be bound by the current version of these Terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">6. Governing Law</h2>
            <p className="text-large mb-4">
              These Terms shall be governed by the laws of the United States without regard to its conflict of law provisions.
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

export default TermsPage;
