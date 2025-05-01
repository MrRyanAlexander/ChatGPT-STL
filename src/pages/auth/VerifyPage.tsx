
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const VerifyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-secondary">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription>
            We've sent you a verification link to complete your registration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-large">
            Please check your email and click the verification link to complete your signup process.
          </p>
          <p className="text-muted-foreground text-large">
            If you don't see the email, check your spam folder.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            onClick={() => navigate("/auth/login")}
            className="text-large"
          >
            Return to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyPage;
