
import { Settings, Moon, Sun, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

const UserProfileSection = () => {
  const { profile, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex items-center gap-2 p-2">
      <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
        {profile?.username?.[0]?.toUpperCase() || 'U'}
      </div>
      <span className="text-sm font-medium flex-1 truncate text-sidebar-foreground">
        {profile?.username || 'User'}
      </span>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="h-8 w-8 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4 text-sidebar-foreground" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
      
      <Link to="/settings">
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <Settings className="h-4 w-4 text-sidebar-foreground" />
        </Button>
      </Link>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" 
        onClick={() => signOut()}
      >
        <LogOut className="h-4 w-4 text-sidebar-foreground" />
      </Button>
    </div>
  );
};

export default UserProfileSection;
