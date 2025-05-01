
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Settings, User, Sun, Moon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("Chat");
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const previousChatRef = useRef<string | null>(null);
  
  // Update activeTab based on current location and store chat route
  useEffect(() => {
    if (location.pathname === '/gallery') {
      setActiveTab("Explore");
    } else {
      setActiveTab("Chat");
      
      // Store the current path if it's a chat page
      if (location.pathname === '/' || location.pathname.startsWith('/chat')) {
        previousChatRef.current = location.pathname;
      }
    }
  }, [location.pathname]);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === "Chat") {
      // Navigate to the previous chat page if available, otherwise to home
      navigate(previousChatRef.current || "/");
    } else if (tab === "Explore") {
      // Navigate to gallery page for exploration
      navigate("/gallery");
    }
  };
  
  return (
    <header className="border-b border-border w-full py-2 px-3 md:px-6 flex items-center justify-between bg-background z-10">
      <div className="flex items-center">
        <h1 className="text-xl md:text-2xl font-semibold">ChatGPT-STL</h1>
      </div>
      
      <div className="flex justify-center flex-1">
        <div className="hidden md:flex items-center space-x-1 bg-secondary rounded-lg p-1">
          {["Chat", "Explore"].map((tab) => (
            <Button 
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"} 
              onClick={() => handleTabChange(tab)}
              className="text-large"
              data-tab={tab}
              data-active={activeTab === tab ? "true" : "false"}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-large focus-visible-ring"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <Link to="/settings">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-large focus-visible-ring"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-large focus-visible-ring"
              aria-label="User menu"
            >
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {user ? (
              <>
                <DropdownMenuItem className="font-medium">
                  {profile?.username || user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign Out
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link to="/auth/login">Log In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/auth/signup">Sign Up</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
