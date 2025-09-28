import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// For demo purposes - replace with your actual Supabase credentials
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://xvuwinzqwvljlszxjnkp.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2dXdpbnpxd3ZsamxzenhqbmtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNzA0MDIsImV4cCI6MjA3NDY0NjQwMn0.XozCbcN37CEXwfjRY0NjfPKYV00z-58-ge82SZQdEi0';

// Validate configuration
if (supabaseUrl === 'https://xvuwinzqwvljlszxjnkp.supabase.co' || supabaseAnonKey === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2dXdpbnpxd3ZsamxzenhqbmtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNzA0MDIsImV4cCI6MjA3NDY0NjQwMn0.XozCbcN37CEXwfjRY0NjfPKYV00z-58-ge82SZQdEi0') {
  console.error('❌ Supabase configuration missing!');
  console.error('Please set up your Supabase project and update the configuration.');
  console.error('See DEMO_CONFIG.md for detailed instructions.');
  console.error('Current values are placeholders and will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          due_date: string | null;
          due_time: string | null;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          due_date?: string | null;
          due_time?: string | null;
          user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          due_date?: string | null;
          due_time?: string | null;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
