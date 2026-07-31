import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import { Canvas3D } from '../3d/Canvas3D';
import { DataViz3DObject } from '../3d/DataViz3D';
import { CASE_STUDIES } from '../../data/consultancyData';
import { CaseStudy } from '../../types';
import { CaseStudyModal } from '../ui/CaseStudyModal';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../Animations/ScrollReveal';
import { ScrollClipReveal } from '../Animations/ScrollClipReveal';
import { BarChart3, ChevronRight } from 'lucide-react';

interface CaseStudiesSectionProps {
  onOpenContact: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenContact }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [activeBarIndex, setActiveBarIndex] = useState(0);
  const [modalCaseStudy, setModalCaseStudy] = useState<CaseStudy | null>(null);

  const dataVizRef = useRef<DataViz3DObject | null>(null);

  const currentCase = CASE_STUDIES[activeCaseIndex];
  const currentDataPoint = currentCase.dataPoints[activeBarIndex] || currentCase.dataPoints[0];

  const handleSelectCaseStudy = (index: number) => {
    setActiveCaseIndex(index);
    setActiveBarIndex(0);
    soundEngine.playMorph();

    if (dataVizRef.current) {
      dataVizRef.current.updateData(CASE_STUDIES[index].dataPoints, CASE_STUDIES[index].primaryColor);
    }
  };

  const handleSelectBar = (barIdx: number) => {
    setActiveBarIndex(barIdx);
    soundEngine.playClick();
    if (dataVizRef.current) {
      dataVizRef.current.highlightBar(barIdx);
    }
  };

  return (
    <section id="case-studies" className="relative py-28 bg-[#08090e] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
              <BarChart3 className="w-3.5 h-3.5" />
              Empirical Case Telemetry
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              3D Value Realization
            </h2>
          </div>

          {/* Case Study Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CASE_STUDIES.map((cs, idx) => (
              <button
                key={cs.id}
                onClick={() => handleSelectCaseStudy(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  activeCaseIndex === idx
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-slate-900/60 text-slate-400 border border-white/5 hover:text-white'
                }`}
              >
                {cs.client.split(' ')[0]}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 3D Visualization Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3D Scene Viewport */}
          <ScrollClipReveal type="ltr" className="lg:col-span-7 relative h-[420px] rounded-2xl glass-panel border border-cyan-500/30 overflow-hidden group">
            <Canvas3D
              onSceneReady={({ scene, camera, mouse }) => {
                camera.position.set(0, 3.2, 7.5);
                camera.lookAt(0, 1.2, 0);

                const ambient = new THREE.AmbientLight(0xffffff, 1.2);
                scene.add(ambient);

                const dirLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
                dirLight.position.set(5, 10, 5);
                scene.add(dirLight);

                const viz = new DataViz3DObject();
                viz.updateData(currentCase.dataPoints, currentCase.primaryColor);
                scene.add(viz.group);
                dataVizRef.current = viz;

                let clock = new THREE.Clock();
                let frameId: number;

                const animate = () => {
                  frameId = requestAnimationFrame(animate);
                  const delta = clock.getDelta();
                  viz.update(delta);
                  // Subtle mouse orbit
                  viz.group.rotation.y = mouse.x * 0.3;
                };
                animate();

                return () => {
                  cancelAnimationFrame(frameId);
                  viz.dispose();
                };
              }}
            />

            {/* Overlay Grid Tag */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-slate-950/80 border border-white/10 text-[10px] font-mono text-cyan-300 uppercase">
              3D Spatial Vector Graph • {currentCase.client}
            </div>

            {/* Interactive Year Selector Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between p-2 rounded-xl bg-slate-950/80 border border-white/10 backdrop-blur-md overflow-x-auto">
              <span className="text-[10px] font-mono text-slate-400 px-2 shrink-0">
                Phase Timeline:
              </span>
              <div className="flex items-center gap-1">
                {currentCase.dataPoints.map((pt, barIdx) => (
                  <button
                    key={barIdx}
                    onClick={() => handleSelectBar(barIdx)}
                    className={`px-3 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                      activeBarIndex === barIdx
                        ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {pt.year}
                  </button>
                ))}
              </div>
            </div>
          </ScrollClipReveal>

          {/* Right: Telemetry Details Card */}
          <ScrollReveal delay={0.2} className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div className="glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                  {currentCase.industry}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Case ID: #{currentCase.id.slice(0, 6)}
                </span>
              </div>

              <h3 className="font-syne font-bold text-2xl text-white mb-4">
                {currentCase.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {currentCase.summary}
              </p>

              {/* Active Selected Point Callout */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-slate-400">{currentDataPoint.label} ({currentDataPoint.year})</span>
                  <span className="text-xs font-mono text-cyan-400 font-bold">Index: {currentDataPoint.value}</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${Math.min(100, (currentDataPoint.value / 200) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <div className="font-syne font-extrabold text-3xl text-cyan-300">
                    {currentCase.headlineStat}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    {currentCase.statLabel}
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setModalCaseStudy(currentCase);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-syne font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Full Case Study
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        caseStudy={modalCaseStudy}
        onClose={() => setModalCaseStudy(null)}
        onOpenContact={onOpenContact}
      />
    </section>
  );
};

