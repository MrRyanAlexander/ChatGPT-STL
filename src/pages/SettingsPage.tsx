
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState("medium");
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="appearance" className="text-large">Appearance</TabsTrigger>
          <TabsTrigger value="accessibility" className="text-large">Accessibility</TabsTrigger>
          <TabsTrigger value="notifications" className="text-large">Notifications</TabsTrigger>
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
                <Label htmlFor="theme" className="text-large">Theme</Label>
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => setTheme("light")} 
                    variant={theme === "light" ? "default" : "outline"}
                    className="flex-1 text-large"
                  >
                    Light
                  </Button>
                  <Button 
                    onClick={() => setTheme("dark")} 
                    variant={theme === "dark" ? "default" : "outline"}
                    className="flex-1 text-large"
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
                <Label htmlFor="fontSize" className="text-large">Text Size</Label>
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => setFontSize("small")} 
                    variant={fontSize === "small" ? "default" : "outline"}
                    className="flex-1 text-large"
                  >
                    Small
                  </Button>
                  <Button 
                    onClick={() => setFontSize("medium")} 
                    variant={fontSize === "medium" ? "default" : "outline"}
                    className="flex-1 text-large"
                  >
                    Medium
                  </Button>
                  <Button 
                    onClick={() => setFontSize("large")} 
                    variant={fontSize === "large" ? "default" : "outline"}
                    className="flex-1 text-large"
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
                <Label htmlFor="notifications" className="text-large">Enable notifications</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
