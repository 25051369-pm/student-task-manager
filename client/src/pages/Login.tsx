import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFakeLogin = () => {
    // In a real app you'd call /api/auth/login
    login('fake-jwt-token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgDark text-white p-4">
      <div className="bg-cardDark p-8 rounded-lg shadow-neubrutalism border-2 border-accent w-full max-w-md">
        <h2 className="text-3xl font-black mb-6 text-center">Login to Task Manager</h2>
        <button 
          onClick={handleFakeLogin}
          className="w-full bg-accent text-bgDark font-bold py-3 rounded shadow-neubrutalism hover:shadow-neubrutalism-hover transition-all"
        >
          Demo Login
        </button>
      </div>
    </div>
  );
};