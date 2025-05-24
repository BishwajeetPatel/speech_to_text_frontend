// src/hooks/useSupabase.js
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useSupabase = () => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set the initial session and user
    setSession(supabase.auth.session());
    setUser(supabase.auth.user());

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
      }
    );

    // Cleanup on unmount
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  // Function to handle signIn with email
  const signIn = async (email) => {
    try {
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error signing in:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Function to sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error.message);
      return { success: false, error: error.message };
    }
  };

  return {
    supabase,
    session,
    user,
    signIn,
    signOut,
  };
};