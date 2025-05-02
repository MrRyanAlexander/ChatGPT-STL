
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";

const SettingsPage = () => {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const { toast } = useToast();
  
  const handleFontSizeChange = (size: "small" | "medium" | "large") => {
    setFontSize(size);
    toast({
      title: "Font size updated",
      description: `Text size has been set to ${size}`,
    });
  };
  
  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    toast({
      title: "Theme updated",
      description: `Theme has been set to ${newTheme} mode`,
    });
  };
  
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how ChatGPT-STL looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => handleThemeChange("light")} 
                    variant={theme === "light" ? "default" : "outline"}
                    className="flex-1"
                  >
                    Light
                  </Button>
                  <Button 
                    onClick={() => handleThemeChange("dark")} 
                    variant={theme === "dark" ? "default" : "outline"}
                    className="flex-1"
                  >
                    Dark
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accessibility">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Settings</CardTitle>
              <CardDescription>
                Customize the interface for better accessibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fontSize">Text Size</Label>
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => handleFontSizeChange("small")} 
                    variant={fontSize === "small" ? "default" : "outline"}
                    className="flex-1"
                  >
                    Small
                  </Button>
                  <Button 
                    onClick={() => handleFontSizeChange("medium")} 
                    variant={fontSize === "medium" ? "default" : "outline"}
                    className="flex-1"
                  >
                    Medium
                  </Button>
                  <Button 
                    onClick={() => handleFontSizeChange("large")} 
                    variant={fontSize === "large" ? "default" : "outline"}
                    className="flex-1"
                  >
                    Large
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="notifications" 
                  checked={notifications} 
                  onCheckedChange={setNotifications} 
                />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
