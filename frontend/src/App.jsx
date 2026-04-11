import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./components/Sidebar.jsx";
import SolutionCard from "./components/SolutionCard.jsx";
import JudgeSection from "./components/JudgeSection.jsx";
import ChatInput from "./components/ChatInput.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Terminal } from "lucide-react";
import { conductBattle, setCurrentBattle } from "./store/slices/battleSlice";

function App() {
  const dispatch = useDispatch();
  const { history, currentBattle, loading, error } = useSelector((state) => state.battle);

  const startBattle = (message) => {
    dispatch(conductBattle(message));
  };

  const handleSelectBattle = (battle) => {
    dispatch(setCurrentBattle(battle));
  };

  return (
    <div className="flex h-screen bg-background-dark text-white overflow-hidden selection:bg-brand-primary/30">
      <Sidebar 
        history={history} 
        onSelectBattle={handleSelectBattle} 
        activeId={currentBattle?.id} 
      />
      
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.03),transparent)]">
        {/* Top Header */}
        <header className="h-16 glass border-b border-brand-primary/10 flex items-center justify-between px-8 shrink-0 relative z-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
               <Shield className="w-3.5 h-3.5 text-brand-accent drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
               SECURE_UPLINK
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
               <Zap className="w-3.5 h-3.5 text-brand-primary drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
               LATENCY: 12MS
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse" />
             <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Neural Link Steady</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          <AnimatePresence mode="wait">
            {!currentBattle && !loading && (
               <motion.div 
                 key="welcome"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-8"
               >
                 <div className="relative">
                   <div className="absolute inset-0 bg-brand-primary/20 blur-[60px] rounded-full scale-150" />
                   <div className="relative w-24 h-24 rounded-[2rem] bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.4)] mb-4 rotate-3">
                     <Terminal className="w-12 h-12 text-white" />
                   </div>
                 </div>
                 <div className="space-y-4">
                   <h2 className="text-5xl font-black tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                     Battle Arena_
                   </h2>
                   <p className="text-white/40 leading-relaxed text-lg font-medium">
                     The ultimate proving ground for LLMs. Witness Mistral and Cohere in logical combat, adjudicated by the precision of Gemini.
                   </p>
                 </div>
                 
                 <div className="flex gap-4 pt-4">
                   <div className="px-4 py-2 rounded-lg border border-white/5 bg-white/2 text-[10px] font-bold uppercase tracking-widest text-white/30">Mistral v7.2</div>
                   <div className="px-4 py-2 rounded-lg border border-white/5 bg-white/2 text-[10px] font-bold uppercase tracking-widest text-white/30">Cohere Command</div>
                   <div className="px-4 py-2 rounded-lg border border-white/5 bg-white/2 text-[10px] font-bold uppercase tracking-widest text-white/30">Gemini Pro Judge</div>
                 </div>
               </motion.div>
            )}

            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center space-y-6"
              >
                <div className="relative w-20 h-20">
                   <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-b-2 border-brand-accent shadow-[0_0_20px_rgba(6,182,212,0.3)]" 
                   />
                   <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-t-2 border-brand-primary shadow-[0_0_20px_rgba(139,92,246,0.3)]" 
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <Zap className="w-6 h-6 text-white animate-pulse" />
                   </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-[10px] font-black text-brand-accent uppercase tracking-[0.5em] animate-pulse">Synchronizing Models</p>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Executing Battle Protocols...</p>
                </div>
              </motion.div>
            )}

            {error && (
               <motion.div 
                 key="error"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl text-red-400 text-sm mb-6 flex items-center gap-4 max-w-lg mx-auto"
               >
                 <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                 </div>
                 <div>
                   <span className="block font-bold uppercase tracking-widest text-[10px] mb-1 opacity-50">System Error</span>
                   {error}
                 </div>
               </motion.div>
            )}

            {currentBattle && (
              <motion.div 
                key={currentBattle.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12 max-w-6xl mx-auto pb-12"
              >
                <div className="space-y-3">
                   <div className="flex items-center gap-3">
                     <div className="px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/20 text-[9px] font-black text-brand-accent uppercase tracking-tighter">Verified</div>
                     <h3 className="text-xs font-bold text-white/30 uppercase tracking-[0.3em]">Neural Challenge Log</h3>
                   </div>
                   <h2 className="text-3xl font-bold tracking-tight text-white/90 leading-tight border-l-2 border-brand-primary pl-6">
                     {currentBattle.problem}
                   </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full glass border-brand-primary/20 flex items-center justify-center text-xs font-black text-white/20 bg-background-dark/80 italic">VS</div>
                  </div>
                  <SolutionCard 
                    type="A" 
                    modelName="Mistral AI" 
                    solution={currentBattle.solution_1} 
                  />
                  <SolutionCard 
                    type="B" 
                    modelName="Cohere Command" 
                    solution={currentBattle.solution_2} 
                  />
                </div>

                <JudgeSection judgeData={currentBattle.judge} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Input */}
        <ChatInput onSend={startBattle} isLoading={loading} />
      </main>
    </div>
  );
}

export default App;