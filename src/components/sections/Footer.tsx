import React, { useState, useEffect } from 'react';
import { ArrowUp, Globe2, ShieldCheck, Sparkles, Box } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

export const Footer: React.FC = () => {
  const [times, setTimes] = useState({
    london: '',
    nyc: '',
    tokyo: '',
    singapore: '',
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const getFormatted = (timeZone: string) =>
        now.toLocaleTimeString('en-US', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false });

      setTimes({
        london: getFormatted('Europe/London'),
        nyc: getFormatted('America/New_York'),
        tokyo: getFormatted('Asia/Tokyo'),
        singapore: getFormatted('Asia/Singapore'),
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#06070a] border-t border-white/10 pt-16 pb-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Offices & Global Time Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/10 mb-12">
          <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
            <div className="text-slate-500 text-[10px] uppercase mb-1">London Desk</div>
            <div className="font-syne font-bold text-lg text-white">{times.london || '14:20'} GMT</div>
            <div className="text-[10px] text-cyan-400 mt-1">Mayfair HQ</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
            <div className="text-slate-500 text-[10px] uppercase mb-1">New York Desk</div>
            <div className="font-syne font-bold text-lg text-white">{times.nyc || '09:20'} EST</div>
            <div className="text-[10px] text-cyan-400 mt-1">Hudson Yards</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
            <div className="text-slate-500 text-[10px] uppercase mb-1">Tokyo Desk</div>
            <div className="font-syne font-bold text-lg text-white">{times.tokyo || '23:20'} JST</div>
            <div className="text-[10px] text-cyan-400 mt-1">Roppongi Hills</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
            <div className="text-slate-500 text-[10px] uppercase mb-1">Singapore Desk</div>
            <div className="font-syne font-bold text-lg text-white">{times.singapore || '22:20'} SGT</div>
            <div className="text-[10px] text-cyan-400 mt-1">Marina Bay</div>
          </div>
        </div>

        {/* Brand & Links Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative group p-0.5 rounded-xl bg-gradient-to-tr from-cyan-500 via-fuchsia-500 to-emerald-400 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all">
              <div className="w-11 h-11 rounded-[10px] bg-slate-950 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-fuchsia-500/20 to-emerald-400/20 opacity-80 group-hover:opacity-100 transition-opacity" />
                <Box className="w-5 h-5 text-cyan-300 group-hover:text-fuchsia-300 transition-colors relative z-10" />
              </div>
            </div>
            <div>
              <span className="font-syne font-extrabold text-white text-base tracking-wider flex items-center gap-2">
                NEXUS<span className="text-cyan-400">GLOBAL</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-emerald-500/10 text-cyan-300 border border-cyan-500/20 font-mono font-normal">
                  Sovereign Matrix
                </span>
              </span>
              <span className="text-[10px] text-slate-500 block">
                © {new Date().getFullYear()} Nexus Global Management Consultancy LLC. All Rights Reserved.
              </span>
            </div>
          </div>

          {/* Regulatory & Security Note */}
          <div className="flex items-center gap-6 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Post-Quantum Encrypted
            </span>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Notice</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security Audit</a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 rounded-xl glass-panel border border-white/10 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
