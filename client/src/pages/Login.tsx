import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email, password } : { name, email, password };
      
      const res = await api.post(endpoint, payload);
      login(res.data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'ACCESS_DENIED: Invalid credentials or network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bgDark p-4 relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
      <div className="absolute inset-0 pointer-events-none z-40 h-[10px] w-full bg-neonCyan/20 blur-sm animate-scanline"></div>

      {/* Decorative glowing orbs perfectly centered in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neonCyan rounded-full mix-blend-screen filter blur-[200px] opacity-10 animate-pulse-slow"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-panelBg p-10 rounded-none border-l-4 border-neonCyan shadow-neon-cyan backdrop-blur-2xl w-full max-w-md relative z-10 m-auto before:absolute before:top-0 before:right-0 before:w-8 before:h-8 before:border-t-2 before:border-r-2 before:border-neonCyan after:absolute after:bottom-0 after:left-0 after:w-8 after:h-8 after:border-b-2 after:border-l-2 after:border-neonCyan"
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-sm font-mono text-neonCyan mb-1 tracking-widest uppercase">Security_Protocol</h2>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 tracking-widest glitch-wrapper" data-text={isLogin ? "AUTH_SYS" : "REG_SYS"}>
              {isLogin ? "AUTH_SYS" : "REG_SYS"}
            </h1>
          </div>
          <div className="text-neonMagenta font-mono text-xs animate-pulse">v2.0.4</div>
        </div>

        {error && (
          <div className="mb-6 p-3 border border-danger/50 bg-danger/10 text-danger text-xs font-mono uppercase tracking-wider animate-pulse shadow-neon-danger">
            [!] {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-mono text-neonCyan/80 mb-2 uppercase tracking-widest">ID_Alias</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-neonCyan focus:shadow-neon-cyan transition-all font-mono"
                placeholder="Enter designation..."
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-mono text-neonCyan/80 mb-2 uppercase tracking-widest">Comm_Link (Email)</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-neonCyan focus:shadow-neon-cyan transition-all font-mono"
              placeholder="operator@matrix.net"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neonCyan/80 mb-2 uppercase tracking-widest">Access_Key (Password)</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-neonCyan focus:shadow-neon-cyan transition-all font-mono"
              placeholder="••••••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full relative group bg-transparent border-2 border-neonCyan text-neonCyan font-bold py-4 mt-4 overflow-hidden transition-all duration-300 uppercase tracking-[0.3em] text-sm hover:text-bgDark hover:shadow-neon-cyan-intense disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 w-full h-full bg-neonCyan -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? 'Processing...' : isLogin ? 'Initialize Connection' : 'Establish Identity'}
            </span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-xs font-mono text-gray-400 hover:text-neonMagenta transition-colors uppercase tracking-widest"
          >
            {isLogin ? '> Request New Access Clearance' : '> Return to Login Protocol'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};