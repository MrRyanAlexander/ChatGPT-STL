
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://eperxgscydavxauiryju.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZXJ4Z3NjeWRhdnhhdWlyeWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwNDM0NjksImV4cCI6MjA2MTYxOTQ2OX0.F6RDaLEmHrYCm0TH6fBnTx_trbaInK1MfYaCVf62Vqw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email?: string;
  avatar_url?: string;
  username?: string;
};

export async function getProfile(): Promise<Profile | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    return {
      id: user.id,
      email: user.email,
      avatar_url: data?.avatar_url,
      username: data?.username || user.email?.split('@')[0],
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}
