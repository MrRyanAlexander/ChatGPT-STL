
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { hash } = window.location;
      
      if (hash && hash.includes("access_token")) {
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          toast({
            title: "Authentication error",
            description: error.message,
            variant: "destructive",
          });
          navigate("/auth/login");
          return;
        }
        
        if (data.user) {
          toast({
            title: "Authentication successful",
            description: "You have been successfully authenticated.",
          });
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authenticating...</h1>
        <p className="text-muted-foreground text-large">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
