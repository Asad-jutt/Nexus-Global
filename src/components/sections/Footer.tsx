import React, { useState, useEffect } from 'react';
import { ArrowUp, Globe2, ShieldCheck, Sparkles, Box } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { useSanityContent } from '../../hooks/useSanityContent';

const OFFICE_TIMEZONES = ['Europe/London', 'America/New_York', 'Asia/Tokyo', 'Asia/Singapore'];

export const Footer: React.FC = () => {
  const { siteSettings, footerOffices } = useSanityContent();
  const [times, setTimes] = useState<string[]>(['14:20', '09:20', '23:20', '22:20']);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const getFormatted = (timeZone: string) =>
        now.toLocaleTimeString('en-US', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false });
      setTimes(OFFICE_TIMEZONES.map(getFormatted));
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
          {footerOffices.map((office, idx) => (
            <div key={office.deskLabel} className="p-4 rounded-xl bg-slate-950 border border-white/5">
              <div className="text-slate-500 text-[10px] uppercase mb-1">{office.deskLabel}</div>
              <div className="font-syne font-bold text-lg text-white">{times[idx] || '--:--'} {office.timezoneAbbr}</div>
              <div className="text-[10px] text-cyan-400 mt-1">{office.location}</div>
            </div>
          ))}
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
                {siteSettings.title.split(' ').map((part, i) => (
                  <span key={i} className={i > 0 ? 'text-cyan-400' : ''}>{part}</span>
                ))}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-emerald-500/10 text-cyan-300 border border-cyan-500/20 font-mono font-normal">
                  {siteSettings.tagline}
                </span>
              </span>
              <span className="text-[10px] text-slate-500 block">
                {siteSettings.legalLine.replace('{year}', String(new Date().getFullYear()))}
              </span>
            </div>
          </div>

          {/* Regulatory & Security Note */}
          <div className="flex items-center gap-6 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" /> {siteSettings.regulatoryNote}
            </span>
            {siteSettings.footerLinks.map((link) => (
              <a key={link} href="#" className="hover:text-slate-300 transition-colors">{link}</a>
            ))}
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
