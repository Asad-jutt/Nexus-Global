import React, { useState } from 'react';
import { ContactFormData } from '../../types';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../Animations/ScrollReveal';
import { useSanityContent } from '../../hooks/useSanityContent';
import { Mail, Send, CheckCircle2, Building2, User, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  sectionRef?: React.RefObject<HTMLDivElement | null>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ sectionRef }) => {
  const { contact } = useSanityContent();
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    company: '',
    serviceInterest: contact.serviceOptions[0] ?? 'Quantum Enterprise Strategy',
    budgetRange: '$100k - $250k',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputFocus = () => {
    soundEngine.playHover();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    setIsSubmitting(true);
    soundEngine.playPulse();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundEngine.playClick();
    }, 1200);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 bg-[#08090e] border-t border-white/5 overflow-hidden">
      {/* Vibrant Ambient Color Gradients Background */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-gradient-to-br from-fuchsia-600/15 via-purple-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <ScrollReveal className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
              <Mail className="w-3.5 h-3.5" />
              {contact.sectionTag}
            </div>

            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-6">
              {contact.headlineLine1} <br />
              <span className="text-gradient-cyan">{contact.headlineLine2}</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {contact.intro}
            </p>

            <div className="space-y-4 font-mono text-xs text-slate-400">
              <div className="p-4 rounded-xl glass-panel border border-white/10 flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{contact.slaNote}</span>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-white/10 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{contact.ndaNote}</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column Interactive Form */}
          <ScrollReveal delay={0.2} className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                        {contact.fieldLabels.fullName}
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onFocus={handleInputFocus}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder={contact.placeholders.fullName}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                        {contact.fieldLabels.email}
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onFocus={handleInputFocus}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={contact.placeholders.email}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                        {contact.fieldLabels.company}
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={formData.company}
                          onFocus={handleInputFocus}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder={contact.placeholders.company}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                        {contact.fieldLabels.serviceVector}
                      </label>
                      <select
                        value={formData.serviceInterest}
                        onFocus={handleInputFocus}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
                      >
                        {contact.serviceOptions.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                      {contact.fieldLabels.message}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onFocus={handleInputFocus}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={contact.placeholders.message}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-slate-950 font-syne font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">{contact.submittingLabel}</span>
                    ) : (
                      <>
                        {contact.submitButton}
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>
              ) : (
                /* Submission Confirmation State */
                <div className="py-12 text-center animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,255,157,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-syne font-bold text-2xl text-white mb-2">
                    {contact.successTitle}
                  </h3>

                  <p className="text-slate-300 text-sm max-w-md mx-auto mb-8">
                    {contact.successMessage.replace('{name}', formData.fullName)}
                  </p>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        company: '',
                        serviceInterest: contact.serviceOptions[0] ?? 'Quantum Enterprise Strategy',
                        budgetRange: '$100k - $250k',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs font-mono uppercase hover:text-white cursor-pointer"
                  >
                    {contact.additionalBriefLabel}
                  </button>
                </div>
              )}

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

