import React from 'react';
import { History, Plus, Archive, ChevronRight, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ history, onSelectBattle, activeId }) => {
  return (
    <aside className="w-72 bg-black/40 border-r border-white/5 flex flex-col shrink-0 relative z-20 overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <Archive className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-sm tracking-tighter uppercase">Nexus_Index</span>
        </div>

        <button 
          onClick={() => onSelectBattle(null)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
        >
          <div className="flex items-center gap-3">
            <Plus className="w-4 h-4 text-brand-primary group-hover:rotate-90 transition-transform duration-300" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">New Battle</span>
          </div>
          <span className="text-[10px] font-black opacity-20 group-hover:opacity-40">CMD+N</span>
        </button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-1">
        <div className="px-4 py-2">
          <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Recent Engagements</span>
        </div>
        
        {history.length === 0 ? (
          <div className="px-4 py-8 text-center space-y-2 opacity-20">
            <Hash className="w-8 h-8 mx-auto mb-2" />
            <p className="text-[10px] font-bold uppercase tracking-widest">No history found</p>
          </div>
        ) : (
          history.map((battle) => (
            <motion.button
              key={battle.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => onSelectBattle(battle)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                activeId === battle.id 
                  ? 'bg-brand-primary/10 text-brand-primary' 
                  : 'text-white/40 hover:bg-white/5 hover:text-white/60'
              }`}
            >
              {activeId === battle.id && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-0 w-1 h-4 bg-brand-primary rounded-r-full" 
                />
              )}
              <History className={`w-3.5 h-3.5 ${activeId === battle.id ? 'text-brand-primary' : 'text-white/10'}`} />
              <div className="flex-1 text-left overflow-hidden">
                <p className="text-xs font-medium truncate uppercase tracking-tight">
                  {battle.problem}
                </p>
              </div>
              <ChevronRight className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${
                activeId === battle.id ? 'opacity-40' : ''
              }`} />
            </motion.button>
          ))
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-white/80 uppercase leading-none">Antigravity</p>
            <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-1">Core active</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
