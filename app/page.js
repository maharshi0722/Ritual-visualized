"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Updated titles to include "Ritual"
const systems = [
  { id: "01", title: "Ritual Resonance", desc: "Dynamic fee market for compute", link: "https://ritual-resonance.vercel.app/" },
  { id: "02", title: "Ritual Symphony", desc: "Sharded + sampled consensus", link: "https://ritual-symphony.vercel.app/" },
  { id: "03", title: "Ritual vTune", desc: "Verifiable LLM fine-tuning", link: "https://ritual-vtune.vercel.app/" },
  { id: "04", title: "Ritual Provers", desc: "Optimized proving network", link: "https://ritual-provers.vercel.app/" },
  { id: "05", title: "Ritual Scheduling", desc: "Native automation", link: "https://ritual-scheduler.vercel.app/" },
  { id: "06", title: "Ritual Infernet", desc: "Decentralized AI execution", link: "https://ritual-infernet.vercel.app/" },
];

export default function Page() {
  // Theme State (Default: Light Mode)
  const [isDark, setIsDark] = useState(false);

  // 3D Hover Physics for the Hero Image
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const scrollToFirstSystem = () => {
    const firstSystem = document.getElementById("system-01");
    if (firstSystem) {
      firstSystem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --- Dynamic Theme Variables ---
  const theme = {
    bg: isDark ? "bg-[#030303]" : "bg-[#f8fafc]",
    text: isDark ? "text-zinc-400" : "text-slate-600",
    heading: isDark ? "text-white" : "text-slate-900",
    grid: isDark 
      ? "bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] opacity-60"
      : "bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] opacity-80",
    orb1: isDark ? "rgba(6,182,212,0.8)" : "rgba(6,182,212,0.4)",
    orb2: isDark ? "rgba(139,92,246,0.8)" : "rgba(59,130,246,0.4)",
    gradientText: isDark ? "from-cyan-400 via-purple-500 to-cyan-400" : "from-blue-600 via-cyan-500 to-blue-600",
    buttonWrapGlow: isDark ? "from-cyan-500 via-purple-500 to-cyan-500" : "from-cyan-400 to-blue-500",
    button: isDark ? "bg-black/80 border-white/10 text-white hover:bg-black" : "bg-slate-900 border-transparent text-white hover:bg-slate-800",
    cardBg: isDark ? "bg-[#0a0a0a] border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-white/20" : "bg-white border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-slate-300",
    bentoBg: isDark ? "bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.06] hover:border-cyan-500/30" : "bg-white border-slate-200 hover:border-cyan-400 shadow-sm hover:shadow-md",
    iframeBlend: isDark ? "mix-blend-lighten opacity-80" : "mix-blend-normal opacity-90",
  };

  return (
    <div className={`relative ${theme.bg} selection:bg-cyan-500/30 overflow-x-hidden min-h-screen font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-700`}>
      
      {/* 📥 INJECT CUSTOM FONTS */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
      `}} />

      {/* 🌓 THEME TOGGLE BUTTON */}
      <div className="fixed top-6 right-6 md:top-10 md:right-10 z-50">
        <button 
          onClick={() => setIsDark(!isDark)}
          className={`p-3 rounded-full backdrop-blur-xl border transition-all duration-500 flex items-center justify-center overflow-hidden hover:scale-105 active:scale-95 ${
            isDark 
              ? "bg-white/10 border-white/20 text-yellow-300 hover:bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
              : "bg-white/50 border-slate-200 text-slate-800 hover:bg-white shadow-lg"
          }`}
          aria-label="Toggle Theme"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isDark ? 360 : 0, scale: isDark ? 1 : 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="absolute"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </motion.div>
          <motion.div
            initial={false}
            animate={{ rotate: isDark ? 0 : -360, scale: isDark ? 0 : 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </motion.div>
        </button>
      </div>

      {/* 🌌 DYNAMIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
      {/* 🖼️ IMAGE BACKGROUND */}
<div className="absolute inset-0">
  <img
    src="/8.png"
    alt="Background"
    className="w-full h-full object-cover opacity-80 md:opacity-70"
  />

  {/* overlay for readability */}
  <div className={`absolute inset-0 ${
    isDark 
      ? "bg-black/60" 
      : "bg-white/60"
  }`} />
</div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vh] rounded-full blur-[120px] transition-colors duration-1000"
          style={{ background: `radial-gradient(ellipse at center, ${theme.orb1}, transparent 60%)` }}
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.2, 0.08], x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] right-[-5%] w-[60vw] h-[60vh] rounded-full blur-[120px] transition-colors duration-1000" 
          style={{ background: `radial-gradient(ellipse at center, ${theme.orb2}, transparent 60%)` }}
        />
      </div>

      {/* =========================================
          SECTION 1: HERO
          ========================================= */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-0 md:min-h-screen px-5 pt-24 md:pt-24 pb-12 md:pb-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12 md:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex flex-col items-center text-center md:items-start md:text-left z-20 w-full"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              className="mb-6 md:mb-10 relative"
            >
              <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-20 rounded-full" />
              <img src="/logo.png" alt="Ritual Logo" className={`relative w-16 h-16 md:w-20 md:h-20 object-contain transition-all duration-700 ${isDark ? 'invert drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'drop-shadow-md'}`} />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={`text-[3.5rem] leading-[1.05] sm:text-6xl md:text-[5.5rem] font-bold font-['Space_Grotesk',sans-serif] tracking-tighter mb-6 transition-colors duration-700 ${theme.heading}`}
            >
              Ritual <br />
              <span className="relative inline-block mt-2">
                <motion.span 
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className={`relative text-transparent bg-clip-text bg-gradient-to-r bg-[length:200%_auto] transition-all duration-700 ${theme.gradientText} ${isDark ? 'drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]' : ''}`}
                >
                  Visualized Lab
                </motion.span>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`text-[1.1rem] sm:text-lg md:text-xl font-medium max-w-lg leading-relaxed mb-10 mx-auto md:mx-0 transition-colors duration-700 ${theme.text}`}
            >
             See how the Ritual system works in one place.
From compute and scheduling to proving and consensus.
Try each part through live simulations.
Understand how everything connects and works together.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full sm:w-auto relative group"
            >
              <div className={`absolute -inset-1 bg-gradient-to-r rounded-full blur-md opacity-40 group-hover:opacity-100 transition duration-500 animate-pulse ${theme.buttonWrapGlow}`} />
              <button 
                onClick={scrollToFirstSystem}
                className={`relative w-full sm:w-auto px-8 py-4 rounded-full backdrop-blur-xl border transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 overflow-hidden font-['Space_Grotesk',sans-serif] ${theme.button}`}
              >
                <span className="relative z-10 group-hover:text-cyan-300 transition-colors">Explore the Stack</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative z-10 group-hover:translate-y-1 transition-transform text-cyan-400">
                  <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex-1 w-full flex justify-center md:justify-end relative z-10 mt-10 md:mt-0"
          >
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[550px] aspect-square group perspective-[1000px]"
            >
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-full h-full relative"
              >
                <div className={`absolute -inset-4 bg-gradient-to-tr ${isDark ? 'from-cyan-500/30 via-purple-500/20 to-blue-500/30' : 'from-cyan-400/40 via-transparent to-blue-500/40'} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className={`absolute inset-0 rounded-[2rem] overflow-hidden border backdrop-blur-md p-2 z-10 transition-all duration-500 ${isDark ? 'border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black/40 group-hover:border-white/20' : 'border-white/60 shadow-[0_30px_60px_rgba(6,182,212,0.2)] bg-white/50 group-hover:border-white'}`}>
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                    <img 
                      src="/3.png" 
                      alt="Ritual AI Interface" 
                      className="w-full h-full object-cover scale-[1.02] group-hover:scale-100 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* =========================================
          SECTION 2: SYSTEMS 
          ========================================= */}
      <div className="relative z-10 flex flex-col w-full pb-20">
        {systems.map((sys, index) => {
          const isTextLeft = index % 2 === 0;
          return (
            <section 
              id={`system-${sys.id}`}
              key={sys.id} 
              className="min-h-[80vh] px-5 sm:px-12 md:px-20 overflow-hidden flex items-center justify-center py-16 md:py-24"
            >
              <div className={`max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 ${isTextLeft ? '' : 'md:flex-row-reverse'}`}>
                
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="flex-1 w-full flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-cyan-500 font-['JetBrains_Mono',monospace] text-sm md:text-base font-bold tracking-widest">{sys.id}</span>
                    <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-cyan-400 to-transparent" />
                    <span className={`font-['JetBrains_Mono',monospace] text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-700 ${theme.text}`}>Module</span>
                  </div>

                  <h2 className={`text-5xl sm:text-6xl md:text-[5rem] font-bold font-['Space_Grotesk',sans-serif] tracking-tighter mb-6 leading-[1] transition-colors duration-700 ${theme.heading}`}>
                    {sys.title}
                  </h2>

                  <p className={`text-lg md:text-2xl font-light mb-10 max-w-lg leading-relaxed transition-colors duration-700 ${theme.text}`}>
                    {sys.desc}.
                  </p>

                  <div>
                    <a 
                      href={sys.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative inline-flex items-center gap-3 font-bold font-['Space_Grotesk',sans-serif] text-base md:text-lg overflow-hidden transition-colors duration-700 ${theme.heading}`}
                    >
                      <span className={`relative z-10 pb-1 border-b transition-colors duration-300 group-hover:border-cyan-400 ${isDark ? 'border-white/20' : 'border-slate-300'}`}>
                     Open Simulation
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500 group-hover:translate-x-1 group-hover:-translate-y-1 transform duration-300">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                  className="flex-[1.3] w-full relative group"
                >
                  <div className={`absolute -inset-4 bg-cyan-500/10 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${isDark ? 'block' : 'hidden'}`} />
                  
                  <div className={`w-full aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden relative z-10 transition-all duration-500 group-hover:-translate-y-2 flex flex-col ${theme.cardBg}`}>
                    <div className={`h-8 md:h-12 border-b flex items-center px-4 justify-between shrink-0 backdrop-blur-md transition-colors duration-700 ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <div className={`text-[9px] md:text-xs font-['JetBrains_Mono',monospace] tracking-wider px-4 py-1.5 rounded-md border shadow-inner transition-colors duration-700 ${isDark ? 'bg-black/40 text-zinc-500 border-white/5' : 'bg-white text-slate-500 border-slate-200'}`}>
                        {sys.link.replace('https://', '')}
                      </div>
                      <div className="w-10" />
                    </div>

                    <div className={`relative flex-1 w-full h-full transition-colors duration-700 ${isDark ? 'bg-[#050505]' : 'bg-slate-50'}`}>
                      <iframe
                        src={sys.link}
                        title={`${sys.title} Simulation`}
                        loading="lazy"
                        className={`absolute inset-0 w-full h-full border-none group-hover:opacity-100 transition-opacity duration-500 ${theme.iframeBlend}`}
                      />
                    </div>
                  </div>
                </motion.div>

              </div>
            </section>
          );
        })}
      </div>

      {/* =========================================
          SECTION 3: BENTO GRID
          ========================================= */}
      <section className="relative z-10 flex flex-col items-center justify-center py-20 px-5 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-4xl"
        >
          <h2 className={`text-4xl sm:text-5xl md:text-7xl font-bold font-['Space_Grotesk',sans-serif] tracking-tight mb-6 leading-[1.1] transition-colors duration-700 ${theme.heading}`}>
            One <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-colors duration-700 ${isDark ? 'from-cyan-400 to-purple-500' : 'from-blue-600 to-cyan-500'}`}>coordinated</span> network.
          </h2>
          <p className={`text-lg md:text-2xl font-light leading-relaxed transition-colors duration-700 ${theme.text}`}>
         All systems combine to deliver scalable, verifiable AI execution.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {systems.map((sys, i) => {
            return (
              <motion.a
                key={sys.id}
                href={sys.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex flex-col justify-between p-8 md:p-10 min-h-[220px] rounded-3xl transition-all duration-300 overflow-hidden ${theme.bentoBg}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br pointer-events-none transition-colors duration-500 ${isDark ? 'from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10' : 'from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5'}`} />
                
                <div className="relative z-10">
                  <span className={`inline-block text-xs font-['JetBrains_Mono',monospace] font-bold tracking-[0.2em] mb-4 px-3 py-1 rounded-full transition-colors duration-700 ${isDark ? 'text-cyan-400 bg-cyan-400/10' : 'text-blue-600 bg-blue-50'}`}>
                    {sys.id}
                  </span>
                  <h3 className={`text-2xl md:text-3xl font-bold font-['Space_Grotesk',sans-serif] mb-2 transition-colors duration-700 ${theme.heading}`}>
                    {sys.title}
                  </h3>
                </div>

                <div className="relative z-10 flex justify-end text-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transform -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </section>
      
    </div>
  );
}