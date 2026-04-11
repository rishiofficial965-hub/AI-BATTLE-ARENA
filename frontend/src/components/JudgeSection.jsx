import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Info, Award, CheckCircle2, AlertTriangle } from 'lucide-react';

const JudgeSection = ({ judgeData }) => {
  if (!judgeData) return null;

  const {
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning,
  } = judgeData;

  const winner = solution_1_score > solution_2_score ? 'A' : solution_1_score < solution_2_score ? 'B' : 'Draw';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-accent p-[1px] shadow-[0_0_20px_rgba(139,92,246,0.3)]">
           <div className="w-full h-full rounded-2xl bg-background-dark flex items-center justify-center">
             <Scale className="w-6 h-6 text-brand-primary" />
           </div>
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-white/90">Arbitration Results</h3>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Gemini Pro V1.5 // Multi-Dimensional Evaluation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Solution A Stats */}
        <div className="glass rounded-2xl p-8 relative overflow-hidden group border-white/5">
          <div className={`absolute top-0 right-0 p-3 ${winner === 'A' ? 'text-brand-primary opacity-100' : 'text-white/10 opacity-40'}`}>
             <Award className="w-8 h-8" />
          </div>
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-end gap-3">
              <span className="text-6xl font-black tabular-nums tracking-tighter text-white/90">{solution_1_score}</span>
              <span className="text-sm font-bold text-white/20 uppercase tracking-widest mb-3">/ 10.0</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-brand-primary" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 text-glow">Arbitrator Reasoning</h4>
              </div>
              <p className="text-sm text-white/50 leading-relaxed italic">
                "{solution_1_reasoning}"
              </p>
            </div>

            <div className="flex gap-2">
               {winner === 'A' && <div className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[9px] font-black text-brand-primary uppercase tracking-widest">Efficiency Lead</div>}
               <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-white/30 uppercase tracking-widest">Logical Compliance</div>
            </div>
          </div>
          
          <div className={`absolute bottom-0 left-0 w-full h-[2px] ${winner === 'A' ? 'bg-brand-primary' : 'bg-white/5'}`} />
        </div>

        {/* Solution B Stats */}
        <div className="glass rounded-2xl p-8 relative overflow-hidden group border-white/5">
          <div className={`absolute top-0 right-0 p-3 ${winner === 'B' ? 'text-brand-accent opacity-100' : 'text-white/10 opacity-40'}`}>
             <Award className="w-8 h-8" />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-end gap-3">
              <span className="text-6xl font-black tabular-nums tracking-tighter text-white/90">{solution_2_score}</span>
              <span className="text-sm font-bold text-white/20 uppercase tracking-widest mb-3">/ 10.0</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-brand-accent" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 text-glow">Arbitrator Reasoning</h4>
              </div>
              <p className="text-sm text-white/50 leading-relaxed italic">
                "{solution_2_reasoning}"
              </p>
            </div>

            <div className="flex gap-2">
               {winner === 'B' && <div className="px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-[9px] font-black text-brand-accent uppercase tracking-widest">Innovation Lead</div>}
               <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-white/30 uppercase tracking-widest">Syntax Precision</div>
            </div>
          </div>

          <div className={`absolute bottom-0 left-0 w-full h-[2px] ${winner === 'B' ? 'bg-brand-accent' : 'bg-white/5'}`} />
        </div>
      </div>

      {/* Global Summary */}
      <div className="p-8 rounded-3xl bg-brand-primary/5 border border-brand-primary/10 relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
         <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="shrink-0">
               <div className={`w-20 h-20 rounded-full border-4 border-dashed animate-[spin_10s_linear_infinite] ${winner === 'Draw' ? 'border-white/20' : winner === 'A' ? 'border-brand-primary/40' : 'border-brand-accent/40'}`} />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <CheckCircle2 className={`w-10 h-10 ${winner === 'Draw' ? 'text-white/20' : winner === 'A' ? 'text-brand-primary shadow-neon' : 'text-brand-accent shadow-neon-accent'}`} />
               </div>
            </div>
            <div className="flex-1 text-center md:text-left">
               <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white/20 mb-2">Verdict Protocol</h4>
               <p className="text-lg font-medium text-white/70 leading-relaxed">
                 {winner === 'Draw' 
                   ? "A mathematical stalemate has been reached. Both models demonstrated equivalent problem-solving heuristics across all metrics."
                   : winner === 'A' 
                     ? "Mistral AI achieved superior analytical depth and algorithmic efficiency in this engagement."
                     : "Cohere Command demonstrated superior creative intuition and structural clarity in this engagement."}
               </p>
            </div>
            <div className="flex flex-col items-center gap-1 shrink-0">
               <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Confidence</span>
               <span className="text-2xl font-black text-white/80 tabular-nums">0.992</span>
            </div>
         </div>
      </div>
    </motion.div>
  );
};

export default JudgeSection;
