import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFakeLogin = () => {
    login('fake-jwt-token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgDark p-4 relative overflow-hidden">
      {/* Decorative glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neonCyan rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neonMagenta rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow" style={{ animationDelay: '2s'}}></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-panelBg p-10 rounded-2xl border border-neonCyan/40 shadow-neon-cyan backdrop-blur-xl w-full max-w-md relative z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-1 bg-neonCyan rounded shadow-neon-cyan"></div>
        </div>
        
        <h2 className="text-4xl font-black mb-10 text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonMagenta text-center tracking-widest">
          SYS_LOGIN
        </h2>
        
        <button 
          onClick={handleFakeLogin}
          className="w-full bg-transparent border-2 border-neonCyan text-neonCyan font-bold py-4 rounded-lg hover:bg-neonCyan hover:text-bgDark hover:shadow-neon-cyan transition-all duration-300 uppercase tracking-[0.3em] text-sm"
        >
          Initialize Matrix
        </button>
      </motion.div>
    </div>
  );
};