
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

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
