
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
import { SidebarTrigger } from '@/components/ui/sidebar';

const Header = () => {
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("Chat");
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const previousChatRef = useRef<string | null>(null);

  // Memoize tab options to prevent recreating on each render
  const tabs = useMemo(() => ["Chat", "Explore"], []);

  // Optimize theme toggle with useCallback
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // Optimize tab change handler with useCallback
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    
    if (tab === "Chat") {
      navigate(previousChatRef.current || "/");
    } else if (tab === "Explore") {
      navigate("/explore");
    } else if (tab === "Gallery") {
      navigate("/gallery");
    }
  }, [navigate]);

  // Optimize sign out handler with useCallback
  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  // Update activeTab based on current location and store chat route
  useEffect(() => {
    const pathname = location.pathname;
    
    if (pathname === '/explore') {
      setActiveTab("Explore");
    } else if (pathname === '/gallery') {
      setActiveTab("Gallery");
    } else {
      setActiveTab("Chat");
      
      // Store the current path if it's a chat page
      if (pathname === '/' || pathname.startsWith('/chat')) {
        previousChatRef.current = pathname;
      }
    }
  }, [location.pathname]);
  
  return (
    <header className="border-b border-border w-full py-2 px-3 md:px-6 flex items-center justify-between bg-background z-10">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="h-9 w-9 rounded-full shadow-sm bg-background" />
        <h1 className="text-xl md:text-2xl font-semibold">ChatGPT-STL</h1>
      </div>
      
      <div className="flex justify-center flex-1">
        <div className="hidden md:flex items-center space-x-1 bg-secondary rounded-lg p-1">
          {tabs.map((tab) => (
            <Button 
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"} 
              onClick={() => handleTabChange(tab)}
              className="text-sm md:text-base"
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
          onClick={toggleTheme}
          className="text-foreground focus-visible-ring"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <Link to="/settings">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground focus-visible-ring"
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
              className="text-foreground focus-visible-ring"
              aria-label="User menu"
            >
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-background border-border">
            {user ? (
              <>
                <DropdownMenuItem className="font-medium">
                  {profile?.username || user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
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
