// src/components/Header.jsx
import { useState } from 'react';
import { useSupabase } from '../hooks/useSupabase';

const Header = () => {
  const { user, signIn, signOut } = useSupabase();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    const { success, error } = await signIn(email);
    
    if (success) {
      setMessage('Check your email for the login link!');
    } else {
      setMessage(`Error: ${error}`);
    }
    
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">Speech to Text Converter</h1>
          <p className="text-blue-100">Convert your audio to text with ease</p>
        </div>
        
        {user ? (
          <div className="flex items-center">
            <span className="mr-4">Hello, {user.email}</span>
            <button
              onClick={handleSignOut}
              className="bg-white text-blue-700 py-1 px-4 rounded hover:bg-blue-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSignIn} className="flex flex-col md:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="px-3 py-1 rounded text-gray-800"
              required
            />
            <button
              type="submit"
              className="bg-white text-blue-700 py-1 px-4 rounded hover:bg-blue-50 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Sign In'}
            </button>
            {message && <div className="mt-2 text-sm text-blue-100">{message}</div>}
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;