import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Monitor, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
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
      setError(err.response?.data?.error || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#05050a] relative overflow-hidden font-sans">
      {/* Systematic subtle dot background */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#00f3ff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neonCyan rounded-full mix-blend-screen filter blur-[250px] opacity-10 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10 m-4"
      >
        <div className="bg-[#0a0a0f]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Header Area */}
          <div className="p-8 pb-6 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-neonCyan/10 border border-neonCyan/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                <Monitor className="text-neonCyan w-6 h-6" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center text-white tracking-wide">
              {isLogin ? "System Authentication" : "User Registration"}
            </h1>
            <p className="text-center text-gray-400 text-sm mt-2 font-mono">
              {isLogin ? "Enter your credentials to access the workspace" : "Create a new systematic identity"}
            </p>
          </div>

          {/* Form Area */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 flex items-center gap-3 p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neonCyan transition-colors">
                      <User className="w-5 h-5" />
                    </div>
                    <input 
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-[#12121a] border border-white/10 rounded-lg text-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-neonCyan focus:ring-1 focus:ring-neonCyan transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neonCyan transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#12121a] border border-white/10 rounded-lg text-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-neonCyan focus:ring-1 focus:ring-neonCyan transition-all"
                    placeholder="admin@system.io"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-neonCyan transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-[#12121a] border border-white/10 rounded-lg text-white pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-neonCyan focus:ring-1 focus:ring-neonCyan transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-neonCyan text-[#05050a] font-bold rounded-lg py-3 mt-2 flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300 disabled:opacity-70 shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">Authenticating <span className="animate-pulse">...</span></span>
                ) : (
                  <>
                    {isLogin ? 'Login to Dashboard' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Footer Area */}
          <div className="px-8 py-5 border-t border-white/5 bg-[#05050a]/50 text-center flex items-center justify-between">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Secure Connection
            </span>
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-xs text-neonCyan hover:text-white transition-colors font-medium"
            >
              {isLogin ? 'Create an account' : 'Sign in instead'}
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};