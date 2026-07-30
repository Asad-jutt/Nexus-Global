import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../../data/consultancyData';
import { TeamMember } from '../../types';
import { soundEngine } from '../../utils/audio';
import { Users, X, Award, MapPin, Sparkles, ExternalLink } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section id="team" className="relative py-28 bg-[#08090e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Users className="w-3.5 h-3.5" />
            Executive Leadership
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Systemic Architects & Principals
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Our leadership combines theoretical physics, quantitative finance, and enterprise software engineering to resolve impossible strategic dilemmas.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => {
                soundEngine.playClick();
                setSelectedMember(member);
              }}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-2 cursor-pointer group relative overflow-hidden"
            >
              {/* Avatar Hexagon / Geometric Container */}
              <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${member.avatarGradient} opacity-80 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.2)]`}
                />
                <div className="relative z-10 font-syne font-black text-3xl text-white tracking-wider">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-syne font-bold text-lg text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {member.name}
                </h3>

                <p className="text-xs font-mono text-cyan-400 mb-3">
                  {member.role}
                </p>

                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
                  {member.specialization}
                </p>

                <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>{member.location}</span>
                </div>
              </div>

              {/* Hover Badge */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-1 text-[10px] font-mono text-cyan-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Inspect Dossier</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl glass-panel p-8 rounded-2xl border border-cyan-500/40 text-slate-100 shadow-2xl">
            <button
              onClick={() => {
                soundEngine.playClick();
                setSelectedMember(null);
              }}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-tr ${selectedMember.avatarGradient} flex items-center justify-center font-syne font-black text-2xl text-white shrink-0`}>
                {selectedMember.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-syne font-bold text-2xl text-white">
                  {selectedMember.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  {selectedMember.role} • {selectedMember.location}
                </p>
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 mb-6">
              <p className="text-slate-300 text-xs leading-relaxed">
                {selectedMember.bio}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" /> Strategic Benchmarks
              </h4>
              <div className="space-y-2">
                {selectedMember.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
