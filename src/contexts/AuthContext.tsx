
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, Profile, getProfile } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session?.user) {
          setUser(data.session.user);
          const userProfile = await getProfile();
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        toast({
          title: "Signed in",
          description: "You have successfully signed in",
        });
      }
      
      if (event === 'SIGNED_OUT') {
        toast({
          title: "Signed out",
          description: "You have successfully signed out",
        });
      }
      
      setUser(session?.user || null);
      
      if (session?.user) {
        const userProfile = await getProfile();
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await supabase.auth.signInWithPassword({ email, password });
      return { error: response.error };
    } catch (error: any) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const response = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      return { error: response.error };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      return { error: response.error };
    } catch (error: any) {
      return { error };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile,
      loading, 
      signIn, 
      signUp, 
      signOut,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
