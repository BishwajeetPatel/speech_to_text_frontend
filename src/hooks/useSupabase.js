// src/hooks/useSupabase.js - UPDATED VERSION
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useSupabase = () => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to handle signIn with email (magic link)
  const signIn = async (email) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          // You can add redirect URL here if needed
          // emailRedirectTo: 'https://your-app.com/auth/callback'
        }
      });
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
    loading,
    signIn,
    signOut,
  };
};
