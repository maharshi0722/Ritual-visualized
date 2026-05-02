"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Maximize2, User2 } from "lucide-react";

// Updated Community dApps list
const dapps = [
  { id: "01", name: "Ritual Pump", author: "john", desc: "Token launch platform", url: "https://ritual-token-launch--rizkyalvonzo8.replit.app/" },
  { id: "02", name: "Ritual Testnet Card", author: "Maharshi", desc: "Mint your identity card", url: "https://ritual-onchain-id.vercel.app/" },
  { id: "03", name: "Mint Your X Profile", author: "tanjiro", desc: "Web3 social identity mint", url: "https://web-3-profile-mint--rolex9723060.replit.app/" },
  { id: "04", name: "Ritual Address Analyzer", author: "tanoy", desc: "Analyze on-chain wallet activity", url: "https://ritual-stats-check.vercel.app/" },
  { id: "05", name: "On-chain Identity", author: "dabid", desc: "Decentralized naming system", url: "https://ritual-names.vercel.app/" },
  { id: "06", name: "Autonomous Trading Agent", author: "feno", desc: "AI-powered trading dashboard", url: "https://haezl-trading.info/#dashboard" },
  { id: "07", name: "GM Strike", author: "kency", desc: "Daily ritual interaction tool", url: "https://gritual-striker.vercel.app/" },
  { id: "08", name: "NFT Marketplace", author: "tanjiro", desc: "Buy & sell NFTs", url: "https://ritual-searcher--tanjir9721.replit.app/" },
  { id: "09", name: "Ritual DEX", author: "tanoy", desc: "Perp trading exchange", url: "https://ritual-perp-dex.replit.app/" },
  { id: "10", name: "Ritual Casino", author: "osaragi", desc: "On-chain gaming", url: "https://ritualcasino.lovable.app/" },
  { id: "11", name: "Prediction Market", author: "john", desc: "Decentralized predictions", url: "https://oracle-predict-market--cahyaeth.replit.app/" },

  { id: "13", name: "Ritual Hub", author: "Maharshi", desc: "Central hub for Ritual testnet tools", url: "https://ritual-testnet-hub.vercel.app" },
  { id: "14", name: "Ritual Bounty Card Generator", author: "Tanoy", desc: "Generate your Ritual bounty card", url: "https://wanted-on-ritual.replit.app/" },
  { id: "15", name: "Ritual Recogniser", author: "Maharshi", desc: "Recognition tool for Ritual ecosystem", url: "https://ritual-recognition.lovable.app/" },
  { id: "16", name: "Ritual Builder Proof", author: "-", desc: "Proof of builder activity", url: "https://ritual-builder-proof.pages.dev/" },
  { id: "17", name: "Ritual Tamagotchi", author: "Lola", desc: "Virtual pet on Ritual", url: "https://ritual-tamagotchi.vercel.app/" },
  { id: "18", name: "Ritual Contract Creator", author: "Joyesh", desc: "Create smart contracts easily", url: "https://ritual-create-contract.vercel.app/" },
  { id: "19", name: "Ritual Mission Console", author: "-", desc: "Track and manage missions", url: "https://ritual-console.netlify.app/" },
  { id: "20", name: "Jumping Siggy", author: "-", desc: "Fun on-chain game", url: "https://jumping-siggy-the-pussy.vercel.app/" },
  { id: "21", name: "Ritual Community Map", author: "tanjiro", desc: "Visual map of Ritual community", url: "https://ritual-foundation--tanjiro97211.replit.app/" },
  { id: "22", name: "Rekt or Rich", author: "-", desc: "Prediction market game", url: "https://ramavenom.github.io/rekt-or-rich/" },
  { id: "23", name: "Ritual Memory Vault", author: "-", desc: "Store memories on-chain", url: "https://ritual-memory-vault.replit.app/" },
  { id: "24", name: "Ritual Testnet Explorer", author: "-", desc: "Explore Ritual testnet apps", url: "https://ritual-testnet-apps.vercel.app/" },
  { id: "25", name: "Ritual Micro Tap", author: "-", desc: "Micro interaction dApp", url: "https://ritual-micro-tap.vercel.app/" }
];

// Navigation Links matching the first few dApp IDs
const navLinks = [
  { name: "Pump", href: "#dapp-01" },
  { name: "ID Card", href: "#dapp-02" },
  { name: "X Profile", href: "#dapp-03" },
  { name: "Analyzer", href: "#dapp-04" },
  { name: "Identity", href: "#dapp-05" },
  { name: "Trading Agent", href: "#dapp-06" },
];

export default function Page() {
  // States
  const [isDark, setIsDark] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // State for Fullscreen SPA
  const [activeApp, setActiveApp] = useState(null);

  // Handle Scroll for Navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (activeApp || isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeApp, isNavOpen]);

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

  const scrollToFirstApp = () => {
    const firstApp = document.getElementById("dapp-01");
    if (firstApp) {
      firstApp.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --- Dynamic Theme Variables (High Contrast Liquid Design) ---
  const theme = {
    bg: isDark ? "bg-[#030303]" : "bg-[#f8fafc]",
    text: isDark ? "text-zinc-200" : "text-slate-800",
    heading: isDark ? "text-white" : "text-black",
    orb1: isDark ? "rgba(6,182,212,0.8)" : "rgba(6,182,212,0.4)",
    orb2: isDark ? "rgba(139,92,246,0.8)" : "rgba(59,130,246,0.4)",
    gradientText: isDark ? "from-cyan-400 via-purple-500 to-cyan-400" : "from-blue-600 via-cyan-500 to-blue-600",
    
    liquidNav: isDark 
      ? "bg-black/20 backdrop-blur-2xl border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
      : "bg-white/40 backdrop-blur-2xl border-slate-200/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]",
    liquidPill: isDark
      ? "bg-white/5 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
      : "bg-white/50 backdrop-blur-md border border-slate-200/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]",
    liquidCard: isDark 
      ? "bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-white/[0.04] hover:border-white/20" 
      : "bg-white/60 backdrop-blur-xl border border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,1)] hover:bg-white/80",
    
    buttonWrapGlow: isDark ? "from-cyan-500 via-purple-500 to-cyan-500" : "from-cyan-400 to-blue-500",
    button: isDark ? "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" : "bg-slate-900/90 backdrop-blur-md border-transparent text-white hover:bg-slate-800",
    iframeBlend: isDark ? "mix-blend-lighten opacity-80" : "mix-blend-normal opacity-90",
  };

  return (
    <div className={`relative ${theme.bg} selection:bg-cyan-500/30 overflow-x-hidden min-h-screen font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-700`}>
      
      {/* 📥 INJECT CUSTOM FONTS */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
      `}} />

      {/* 🌟 NAVBAR (Liquid Design) */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6 px-2'}`}>
        <div className={`mx-auto max-w-7xl px-4 lg:px-6 py-3 flex items-center justify-between rounded-full transition-all duration-500 ${scrolled ? theme.liquidNav : 'bg-transparent'}`}>
          
          <div className="flex items-center z-50">
            <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
              <img src="/logo.png" alt="Logo" className={`w-9 h-9 md:w-10 md:h-10 object-contain ${isDark ? 'invert' : ''}`} />
              <span className={`font-['Space_Grotesk',sans-serif] font-bold text-xl md:text-2xl hidden sm:block ${theme.heading}`}>Ritual</span>
            </Link>
          </div>

          <div className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full ${theme.liquidPill}`}>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300 hover:bg-white/10 ${theme.text} hover:${theme.heading}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 z-50">
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-full transition-all duration-500 flex items-center justify-center overflow-hidden hover:scale-105 active:scale-95 ${theme.liquidPill} ${isDark ? "text-yellow-300" : "text-slate-800"}`}
              aria-label="Toggle Theme"
            >
              <motion.div initial={false} animate={{ rotate: isDark ? 360 : 0, scale: isDark ? 1 : 0 }} transition={{ duration: 0.5, type: "spring" }} className="absolute">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              </motion.div>
              <motion.div initial={false} animate={{ rotate: isDark ? 0 : -360, scale: isDark ? 0 : 1 }} transition={{ duration: 0.5, type: "spring" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              </motion.div>
            </button>

            <button className={`md:hidden p-2.5 rounded-full ${theme.liquidPill} ${theme.heading}`} onClick={() => setIsNavOpen(!isNavOpen)}>
              {isNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-40 pt-28 px-6 pb-6 flex flex-col overflow-y-auto ${isDark ? 'bg-black/95 backdrop-blur-3xl' : 'bg-white/95 backdrop-blur-3xl'}`}
          >
            <div className="flex flex-col gap-2 mt-4 text-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsNavOpen(false)}
                  className={`text-2xl font-['Space_Grotesk'] font-bold py-4 border-b ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌌 DYNAMIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0">
          <img src="/8.png" alt="Background" className="w-full h-full object-cover opacity-80 md:opacity-70" />
          <div className={`absolute inset-0 transition-colors duration-700 ${isDark ? "bg-black/60" : "bg-white/60"}`} />
        </div>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1], x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vh] rounded-full blur-[120px] transition-colors duration-1000" style={{ background: `radial-gradient(ellipse at center, ${theme.orb1}, transparent 60%)` }} />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.2, 0.08], x: [0, -40, 0], y: [0, -30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[20%] right-[-5%] w-[60vw] h-[60vh] rounded-full blur-[120px] transition-colors duration-1000" style={{ background: `radial-gradient(ellipse at center, ${theme.orb2}, transparent 60%)` }} />
      </div>

      {/* =========================================
          SECTION 1: HERO
          ========================================= */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-0 md:min-h-screen px-5 pt-32 md:pt-32 pb-12 md:pb-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12 md:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex flex-col items-center text-center md:items-start md:text-left z-20 w-full"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
              className={`text-[3.5rem] leading-[1.05] sm:text-6xl md:text-[5.5rem] font-bold font-['Space_Grotesk',sans-serif] tracking-tighter mb-6 transition-colors duration-700 ${theme.heading}`}
            >
              Ritual <br />
              <span className="relative inline-block mt-2">
                <motion.span animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className={`relative text-transparent bg-clip-text bg-gradient-to-r bg-[length:200%_auto] transition-all duration-700 ${theme.gradientText} ${isDark ? 'drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]' : ''}`}>
                  Community Build Hub
                </motion.span>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
              className={`text-[1.1rem] sm:text-lg md:text-xl font-medium max-w-lg leading-relaxed mb-10 mx-auto md:mx-0 transition-colors duration-700 ${theme.text}`}
            >
             Explore decentralized applications and tools built by the community on top of the Ritual network. Interact and test out live apps below.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="w-full sm:w-auto relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r rounded-full blur-md opacity-40 group-hover:opacity-100 transition duration-500 animate-pulse ${theme.buttonWrapGlow}`} />
              <button onClick={scrollToFirstApp} className={`relative w-full sm:w-auto px-8 py-4 rounded-full border transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 overflow-hidden font-['Space_Grotesk',sans-serif] ${theme.button}`}>
                <span className="relative z-10 font-bold">Explore dApps</span>
                <ArrowUpRight className="relative z-10 w-5 h-5 text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex-1 w-full flex justify-center md:justify-end relative z-10 mt-10 md:mt-0"
          >
            <motion.div 
              animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[550px] aspect-square group perspective-[1000px]"
            >
              <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="w-full h-full relative">
                <div className={`absolute -inset-4 bg-gradient-to-tr ${isDark ? 'from-cyan-500/30 via-purple-500/20 to-blue-500/30' : 'from-cyan-400/40 via-transparent to-blue-500/40'} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className={`absolute inset-0 rounded-[2rem] overflow-hidden p-2 z-10 transition-all duration-500 ${theme.liquidCard}`}>
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                    <img src="/3.png" alt="Community Build Hub Interface" className="w-full h-full object-cover scale-[1.02] group-hover:scale-100 transition-transform duration-700" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* =========================================
          SECTION 2: COMMUNITY BUILDS LIST
          ========================================= */}
      <div className="relative z-10 flex flex-col w-full pb-20 mt-10">
        {dapps.map((dapp, index) => {
          const isTextLeft = index % 2 === 0;
          return (
            <section id={`dapp-${dapp.id}`} key={dapp.id} className="min-h-[70vh] px-5 sm:px-12 md:px-20 overflow-hidden flex items-center justify-center py-16 md:py-24">
              <div className={`max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 ${isTextLeft ? '' : 'md:flex-row-reverse'}`}>
                
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: "easeOut" }} className="flex-1 w-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-cyan-500 font-['JetBrains_Mono',monospace] text-sm md:text-base font-bold tracking-widest">{dapp.id}</span>
                    <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-cyan-400 to-transparent" />
                    <span className={`font-['JetBrains_Mono',monospace] text-xs font-bold tracking-[0.3em] uppercase ${theme.text}`}>Project</span>
                  </div>
                  
                  <h2 className={`text-4xl sm:text-5xl md:text-[4.5rem] font-bold font-['Space_Grotesk',sans-serif] tracking-tighter mb-4 leading-[1] ${theme.heading}`}>
                    {dapp.name}
                  </h2>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <User2 className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-black/60'}`} />
                    <span className={`font-bold font-['Space_Grotesk'] capitalize ${isDark ? 'text-white/60' : 'text-black/60'}`}>by {dapp.author}</span>
                  </div>
                  
                  <p className={`text-lg md:text-xl font-medium mb-8 max-w-lg leading-relaxed ${theme.text}`}>
                    {dapp.desc}
                  </p>

                  {/* OPEN APP BUTTON (Opens SPA Modal) */}
                  <div>
                    <button 
                onClick={() => window.open(dapp.url, "_blank")}

                      className={`group relative inline-flex items-center gap-2 font-bold font-['Space_Grotesk',sans-serif] text-base md:text-lg transition-colors duration-700 ${theme.heading}`}
                    >
                      <span className={`pb-1 border-b-2 transition-colors duration-300 group-hover:border-cyan-400 ${isDark ? 'border-white/30' : 'border-black/30'}`}>
                        Launch dApp
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-cyan-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }} className="flex-[1.3] w-full relative group">
                  <div className={`w-full aspect-[16/10] rounded-xl md:rounded-3xl overflow-hidden relative z-10 transition-all duration-500 group-hover:-translate-y-2 flex flex-col ${theme.liquidCard}`}>
                    <div className={`h-8 md:h-12 border-b flex items-center px-4 justify-between shrink-0 transition-colors duration-700 ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      </div>
                      <div className={`text-[9px] md:text-xs font-['JetBrains_Mono',monospace] font-bold tracking-wider px-4 py-1 rounded-full ${theme.liquidPill} ${theme.text}`}>
                        {dapp.url.replace('https://', '').split('/')[0]}
                      </div>
                      
<button onClick={() => window.open(dapp.url, "_blank")}>
  Launch dApp
</button>
                        <Maximize2 className={`w-4 h-4 ${theme.text}`} />
            
                    </div>
                    <div className={`relative flex-1 w-full h-full transition-colors duration-700 ${isDark ? 'bg-[#030303]/50' : 'bg-slate-50/50'}`}>
                      <iframe src={dapp.url} title={`${dapp.name} App`} loading="lazy" className={`absolute inset-0 w-full h-full border-none group-hover:opacity-100 transition-opacity duration-500 ${theme.iframeBlend}`} />
                    </div>
                  </div>
                </motion.div>

              </div>
            </section>
          );
        })}
      </div>

      {/* =========================================
          SECTION 3: LIQUID BENTO GRID
          ========================================= */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-10 pb-20 px-5 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 max-w-4xl">
          <h2 className={`text-4xl sm:text-5xl md:text-7xl font-bold font-['Space_Grotesk',sans-serif] tracking-tight mb-6 leading-[1.1] transition-colors duration-700 ${theme.heading}`}>
            One <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-colors duration-700 ${isDark ? 'from-cyan-400 to-purple-500' : 'from-blue-600 to-cyan-500'}`}>thriving</span> ecosystem.
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {dapps.map((dapp) => {
            return (
              <motion.div
                key={dapp.id} 
                onClick={() => window.open(dapp.url, "_blank")}
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                role="button"
                tabIndex={0}
                className={`group relative flex flex-col justify-between p-8 md:p-10 min-h-[340px] rounded-[2rem] transition-all duration-300 overflow-hidden cursor-pointer text-left ${theme.liquidCard}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br pointer-events-none transition-colors duration-500 ${isDark ? 'from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10' : 'from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5'}`} />
                
                <div className="relative z-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-10">
                    <span className={`text-xs font-['JetBrains_Mono',monospace] font-bold tracking-wide px-3 py-1.5 rounded-full capitalize ${theme.liquidPill} ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                      By {dapp.author}
                    </span>
                    <span className={`text-4xl md:text-5xl font-bold font-['Space_Grotesk',sans-serif] ${isDark ? 'text-white/30' : 'text-black/20'}`}>
                      # {dapp.id}
                    </span>
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-bold font-['Space_Grotesk',sans-serif] mb-3 ${theme.heading}`}>{dapp.name}</h3>
                  <p className={`text-sm md:text-base font-medium leading-relaxed ${theme.text}`}>{dapp.desc}</p>
                </div>
                <div className="relative z-10 mt-8 flex items-center text-cyan-500 transition-all duration-300">
                  <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* =========================================
          FOOTER
          ========================================= */}
      <footer
        className={`relative z-10 w-full py-8 md:py-10 border-t flex flex-col items-center justify-center transition-colors duration-700 ${
          isDark
            ? "border-white/10 bg-[#050505]/80"
            : "border-slate-200 bg-slate-50/80"
        } backdrop-blur-md`}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

        <div className="text-center flex flex-col items-center justify-center gap-4">
          <span className={`flex items-center justify-center font-['Space_Grotesk',sans-serif] text-xs sm:text-sm md:text-base font-bold uppercase transition-colors duration-700 ${theme.text}`}>
            <span className="tracking-[0.2em] md:tracking-[0.4em]">COMMUNITY BUILD HUB</span>
            <span className="mx-4 md:mx-6 opacity-40 font-light">//</span>
            <span className="tracking-[0.4em] md:tracking-[0.6em] opacity-70">2026</span>
          </span>
          <p className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-colors duration-700 ${theme.text}`}>
            Built by <span className="text-cyan-500">Maharshi</span>
          </p>
        </div>
      </footer>

      {/* =========================================
          FULLSCREEN SPA APP MODAL
          ========================================= */}
      <AnimatePresence>
        {activeApp && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed inset-0 z-[100] flex flex-col w-screen h-screen backdrop-blur-2xl ${isDark ? 'bg-black/95' : 'bg-slate-50/95'}`}
          >
            {/* Modal Header */}
            <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-white/10 bg-black/50' : 'border-black/10 bg-white/50'}`}>
              <div className="flex items-center gap-4">
                <span className={`text-cyan-500 font-['JetBrains_Mono'] text-sm font-bold tracking-widest hidden sm:block`}>
                  {activeApp.id}
                </span>
                <div className={`hidden sm:block w-10 h-[1px] bg-gradient-to-r from-cyan-400 to-transparent`} />
                <span className={`font-bold font-['Space_Grotesk'] text-xl md:text-2xl ${theme.heading}`}>
                  {activeApp.name}
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <a 
                  href={activeApp.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-xs font-['JetBrains_Mono'] font-bold hidden sm:flex items-center gap-2 hover:text-cyan-400 transition-colors ${theme.text}`}
                >
                  {activeApp.url.replace('https://', '').split('/')[0]} <ArrowUpRight className="w-3 h-3" />
                </a>
                <button 
                  onClick={() => setActiveApp(null)} 
                  className={`p-2.5 rounded-full transition-all hover:scale-105 active:scale-95 ${theme.liquidPill} ${theme.heading}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body (Iframe) */}
            <div className={`flex-1 w-full h-full relative ${isDark ? 'bg-[#030303]' : 'bg-white'}`}>
              <iframe 
                src={activeApp.url} 
                title={`${activeApp.name} Fullscreen`} 
                className="absolute inset-0 w-full h-full border-none" 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}