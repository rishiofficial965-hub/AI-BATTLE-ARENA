import React, { useState } from 'react';
import { Send, Sparkles, Command } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatInput = ({ onSend, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="p-8 pb-10 bg-gradient-to-t from-background-dark to-transparent relative z-20">
      <div className="max-w-4xl mx-auto relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/20 via-brand-accent/20 to-brand-primary/20 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200" />
        
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center gap-4 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 pl-6 shadow-2xl transition-all group-focus-within:border-brand-primary/40">
            <Sparkles className="w-5 h-5 text-brand-primary/50 group-focus-within:text-brand-primary transition-colors" />
            
            <input 
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Inject problem parameters..."
              className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder:text-white/20 h-12"
              disabled={isLoading}
            />

            <div className="flex items-center gap-2 pr-2">
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black text-white/30 uppercase tracking-widest">
                <Command className="w-2.5 h-2.5" />
                <span>Enter</span>
              </div>
              
              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                  message.trim() && !isLoading
                    ? 'bg-brand-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95'
                    : 'bg-white/5 text-white/10 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </form>

        <p className="mt-4 text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
          Arena_System_v4.2 // Advanced Simulation Environment
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
