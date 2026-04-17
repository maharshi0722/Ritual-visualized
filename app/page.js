"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const systems = [
  { id: "01", title: "Resonance", desc: "Dynamic fee market for compute", link: "https://ritual-resonance.vercel.app/" },
  { id: "02", title: "Symphony", desc: "Sharded + sampled consensus", link: "https://ritual-symphony.vercel.app/" },
  { id: "03", title: "vTune", desc: "Verifiable LLM fine-tuning", link: "https://ritual-vtune.vercel.app/" },
  { id: "04", title: "Provers", desc: "Optimized proving network", link: "https://ritual-provers.vercel.app/" },
  { id: "05", title: "Scheduling", desc: "Native automation", link: "https://ritual-scheduler.vercel.app/" },
  { id: "06", title: "Infernet", desc: "Decentralized AI execution", link: "https://ritual-infernet.vercel.app/" },
];

export default function Page() {
  // 3D Hover Physics for the Hero Image (Desktop only)
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

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

  // Smooth scroll handler
  const scrollToFirstSystem = () => {
    const firstSystem = document.getElementById("system-01");
    if (firstSystem) {
      firstSystem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-slate-50 text-slate-900 selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      
      {/* 🌌 PREMIUM BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px] md:bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] opacity-80" />
        
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] md:right-[-5%] w-[90vw] md:w-[70vw] h-[70vh] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,1),transparent_60%)] blur-[100px] md:blur-[140px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] right-[5%] md:right-[10%] w-[70vw] md:w-[50vw] h-[50vh] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,1),transparent_60%)] blur-[100px] md:blur-[140px]" 
        />
      </div>

      {/* =========================================
          SECTION 1: ADVANCED HERO (CENTERED MOBILE)
          ========================================= */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-0 md:min-h-screen px-5 pt-20 md:pt-24 pb-12 md:pb-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-8">
          
          {/* LEFT: TEXT & CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            /* Centered on mobile, left aligned on desktop */
            className="flex-1 flex flex-col items-center text-center md:items-start md:text-left z-20 w-full"
          >
            {/* Logo - Increased mobile size from w-12 to w-14 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-4 md:mb-8"
            >
              <img src="/logo.png" alt="Ritual Logo" className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-md" />
            </motion.div>

            {/* Main Headline - Increased mobile size from 3rem to 3.5rem */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[3.5rem] leading-[1.05] sm:text-6xl md:text-8xl font-black tracking-tighter mb-4 md:mb-6 text-slate-900"
            >
              Ritual <br />
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur-lg md:blur-xl rounded-full" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400">
                  Visualized Lab
                </span>
              </span>
            </motion.h1>

            {/* Description - Increased mobile text slightly */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-slate-500 text-[1.05rem] sm:text-lg md:text-xl font-medium max-w-lg leading-relaxed mb-6 md:mb-10 mx-auto md:mx-0"
            >
              Explore the decentralized AI stack through live simulations. A beautiful, scroll-driven journey through the architecture of tomorrow.
            </motion.p>

            {/* Call to Action Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full sm:w-auto flex justify-center md:justify-start"
            >
              <button 
                onClick={scrollToFirstSystem}
                className="w-full sm:w-auto px-8 py-3.5 md:py-4 rounded-full bg-slate-900 text-white font-bold tracking-wide hover:bg-cyan-600 transition-all duration-300 shadow-[0_10px_30px_rgba(6,182,212,0.25)] active:scale-95"
              >
                Explore Systems
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: IMAGE 3.png */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex-1 w-full flex justify-center md:justify-end relative z-10 mt-6 md:mt-0"
          >
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[550px] aspect-square group perspective-[1000px]"
            >
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-full h-full relative"
              >
                <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/60 shadow-[0_15px_30px_rgba(6,182,212,0.15)] md:shadow-[0_30px_60px_rgba(6,182,212,0.2)] bg-white/50 backdrop-blur-sm p-1.5 md:p-2">
                  <img 
                    src="/3.png" 
                    alt="Ritual AI Interface" 
                    className="w-full h-full object-cover rounded-[1.2rem] md:rounded-[1.5rem]"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator (Hidden on mobile) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-3 hidden md:flex"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-400 via-blue-400 to-transparent" />
        </motion.div>
      </section>

      {/* =========================================
          SECTION 2: THE 6 INDIVIDUAL SYSTEMS 
          ========================================= */}
      <div className="relative z-10 flex flex-col w-full">
        {systems.map((sys, index) => {
          const isTextLeft = index % 2 === 0;
          const isFirstSystem = index === 0;

          return (
            <section 
              id={`system-${sys.id}`}
              key={sys.id} 
              // Added dynamic spacing for the first system
              className={`md:min-h-screen px-5 sm:px-12 md:px-20 overflow-hidden flex items-center justify-center 
              ${isFirstSystem ? 'pt-28 pb-10 md:py-24' : 'py-10 md:py-24'}`}
            >
              <div className={`max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-24 ${isTextLeft ? '' : 'md:flex-row-reverse'}`}>
                
                {/* TEXT SIDE */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex-1 w-full flex flex-col"
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-8">
                    <span className="text-cyan-600 font-mono text-[11px] md:text-sm font-bold tracking-widest">{sys.id}</span>
                    <div className="w-10 md:w-16 h-[1px] bg-slate-300" />
                    <span className="text-slate-400 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">System</span>
                  </div>

                  {/* System Title - Increased mobile size from text-4xl to text-5xl */}
                  <h2 className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tighter mb-2 md:mb-8 leading-[1.05] text-slate-900">
                    Ritual <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 block">
                      {sys.title}
                    </span>
                  </h2>

                  <p className="text-slate-600 text-[1.05rem] sm:text-lg md:text-2xl font-light mb-5 md:mb-12 max-w-lg">
                    {sys.desc}.
                  </p>

                  <div>
                    <a 
                      href={sys.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 md:gap-3 text-slate-900 font-bold text-[14px] md:text-base border-b-2 border-slate-200 pb-1 hover:border-cyan-500 hover:text-cyan-600 transition-colors duration-300"
                    >
                      Open simulation 
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-cyan-500 transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 transform duration-300 md:w-3.5 md:h-3.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </motion.div>

                {/* BROWSER MOCKUP SIDE */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  className="flex-[1.2] w-full"
                >
                  <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-lg md:rounded-xl overflow-hidden border border-slate-200 shadow-[0_10px_30px_rgb(0,0,0,0.06)] bg-white flex flex-col relative group">
                    <div className="h-7 md:h-10 bg-slate-50 border-b border-slate-100 flex items-center px-2 md:px-4 justify-between shrink-0">
                      <div className="flex gap-1.5 md:gap-2">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-rose-400" />
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-amber-400" />
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-cyan-400" />
                      </div>
                      <div className="text-[7px] md:text-[10px] text-slate-400 font-mono tracking-wider bg-white px-1.5 py-0.5 md:px-3 md:py-1 rounded border border-slate-100 shadow-sm truncate max-w-[120px] md:max-w-none">
                        {sys.link.replace('https://', '')}
                      </div>
                      <div className="w-6 md:w-14" />
                    </div>

                    <div className="relative flex-1 w-full h-full bg-slate-50">
                      <iframe
                        src={sys.link}
                        title={`Ritual ${sys.title} Simulation`}
                        loading="lazy"
                        scrolling="no"
                        className="absolute inset-0 w-full h-full border-none opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ overflow: "hidden" }}
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
          SECTION 3: THE GRID (One Coordinated Network)
          ========================================= */}
      <section className="relative z-10 flex flex-col items-center justify-center py-12 md:min-h-screen px-5 md:py-32 mt-6 md:mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-20 max-w-3xl"
        >
          {/* Final Title - Increased mobile size from 2.5rem to 3rem */}
          <h2 className="text-[3rem] sm:text-5xl md:text-7xl font-bold tracking-tight mb-3 md:mb-8 text-slate-900 leading-[1.1]">
            One <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">coordinated</span> network.
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-lg md:text-xl font-light leading-relaxed relative inline-block text-left">
            Every system you just experienced works in concert
            <br className="hidden sm:block" />
            <span className="relative flex items-center mt-1 md:mt-1">
              <span className="w-1.5 h-1.5 md:w-[3px] md:h-[1.2em] bg-cyan-500 mr-2 md:mr-3 rounded-full animate-pulse flex-shrink-0" />
              — coordinated, verifiable, and built for AI at scale.
            </span>
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-slate-200/80 rounded-xl md:rounded-[24px] overflow-hidden shadow-lg border border-slate-200"
        >
          {systems.map((sys) => {
            return (
              <a
                key={sys.id}
                href={sys.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative p-5 md:p-12 md:h-64 transition-colors duration-300 bg-white/90 backdrop-blur-md hover:bg-white"
              >
                <span className="block text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-slate-400 mb-1 md:mb-6 font-mono">
                  {sys.id}
                </span>

                <h3 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors duration-300">
                  {sys.title}
                </h3>

                <div className="absolute top-5 right-5 md:bottom-10 md:right-10 opacity-0 md:transform md:translate-x-4 group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300 text-cyan-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="md:w-5 md:h-5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
            );
          })}
        </motion.div>
      </section>
      
    </div>
  );
}