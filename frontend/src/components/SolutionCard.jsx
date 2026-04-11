import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { Cpu, Maximize2, Copy } from 'lucide-react';

const SolutionCard = ({ type, modelName, solution }) => {
  const isTypeA = type === 'A';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`flex-1 glass rounded-2xl overflow-hidden flex flex-col group transition-all duration-500 border-white/5 ${
        isTypeA ? 'hover:border-brand-primary/30' : 'hover:border-brand-accent/30'
      }`}
    >
      {/* Card Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/2">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isTypeA ? 'bg-brand-primary/20 text-brand-primary shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'bg-brand-accent/20 text-brand-accent shadow-[0_0_15px_rgba(6,182,212,0.2)]'
          }`}>
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-white/30 leading-none mb-1">Compute Node_{type}</span>
            <span className="font-bold text-sm text-white/80">{modelName}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 transition-colors">
              <Copy className="w-3.5 h-3.5" />
           </button>
           <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 transition-colors">
              <Maximize2 className="w-3.5 h-3.5" />
           </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 overflow-y-auto max-h-[500px] custom-scrollbar bg-black/20">
        <SyntaxHighlighter
          language="javascript"
          style={atomDark}
          customStyle={{
            background: 'transparent',
            padding: 0,
            margin: 0,
            fontSize: '13px',
            lineHeight: '1.6',
          }}
          codeTagProps={{
            style: {
              background: 'transparent',
            }
          }}
        >
          {solution || 'Initializing model output...'}
        </SyntaxHighlighter>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-3 border-t border-white/5 bg-white/2 flex items-center justify-between">
         <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
             <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Confidence 98%</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
             <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Tokens: 412</span>
           </div>
         </div>
      </div>
    </motion.div>
  );
};

export default SolutionCard;
