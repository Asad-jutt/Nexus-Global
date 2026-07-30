import React, { useState } from 'react';
import * as THREE from 'three';
import { Canvas3D } from '../3d/Canvas3D';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../Animations/ScrollReveal';
import { ScrollStaggerContainer, ScrollStaggerItem } from '../Animations/ScrollStagger';
import { ArrowRight, CheckCircle2, ChevronRight, Workflow, Zap } from 'lucide-react';

interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  metrics: string;
  accentColor: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Discovery & Assessment',
    subtitle: 'Deep System Diagnostics',
    description: 'Autonomous telemetry sweep, operational workflow mapping, and organizational bottleneck identification using high-resolution data models.',
    deliverables: ['System Vulnerability Matrix', 'OPEX Baseline Telemetry', 'Architecture Benchmark'],
    metrics: '-35% Latency in Discovery',
    accentColor: '#00f0ff',
  },
  {
    stepNumber: '02',
    title: 'Strategy Development',
    subtitle: 'Algorithmic Optimization',
    description: 'Constructing proprietary execution roadmaps, simulation-tested scenarios, and multi-threaded risk mitigation structures.',
    deliverables: ['Quantum-Safe Migration Strategy', 'EBITDA Growth Map', 'Resource Allocation Model'],
    metrics: '99.4% Forecast Accuracy',
    accentColor: '#00ff9d',
  },
  {
    stepNumber: '03',
    title: 'Architecture & Design',
    subtitle: 'Modern Engineering Blueprints',
    description: 'Engineering fault-tolerant cloud infrastructures, real-time analytics engines, and resilient human-in-the-loop operational loops.',
    deliverables: ['Full-Stack Microservices Design', 'Zero-Trust Security Schema', 'Data Flow Schema'],
    metrics: 'Zero-Downtime Blueprint',
    accentColor: '#a855f7',
  },
  {
    stepNumber: '04',
    title: 'Implementation & Execution',
    subtitle: 'High-Velocity Integration',
    description: 'Agile deployment sprints with continuous validation, WebGPU-accelerated analytics, and seamless enterprise ERP/CRM integration.',
    deliverables: ['Production Engine Deployment', 'Real-time Telemetry Dashboard', 'CI/CD Pipeline Setup'],
    metrics: '4x Deployment Velocity',
    accentColor: '#3b82f6',
  },
  {
    stepNumber: '05',
    title: 'Monitoring & Continuous Scale',
    subtitle: 'Autonomous Self-Healing Loop',
    description: 'Continuous AI feedback loops, real-time operational drift detection, and automated scaling across international node clusters.',
    deliverables: ['24/7 Autonomous Telemetry', 'Model Re-training Pipeline', 'Executive KPI Console'],
    metrics: '99.999% Operational Uptime',
    accentColor: '#ffb800',
  },
];

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section id="process" className="relative py-28 bg-[#0a0c16] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Workflow className="w-3.5 h-3.5" />
              Methodology Protocol
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              A Precision Pipeline for Strategic Scale
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            Our 5-stage transformation framework turns complex enterprise problems into repeatable, scalable, and autonomous growth engines.
          </p>
        </ScrollReveal>

        {/* Timeline Node Navigation Bar */}
        <div className="relative mb-12">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0 hidden md:block" />

          <ScrollStaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <ScrollStaggerItem key={step.stepNumber}>
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveStepIndex(idx);
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 relative group overflow-hidden w-full ${
                      isActive
                        ? 'glass-panel border-cyan-400/60 bg-cyan-950/40 text-white shadow-lg shadow-cyan-500/10 scale-102'
                        : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/30 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isActive ? 'bg-cyan-400 text-black' : 'bg-slate-800 text-slate-400'
                      }`}>
                        STAGE {step.stepNumber}
                      </span>
                      {isActive && <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
                    </div>
                    <div className="font-syne font-bold text-sm truncate">
                      {step.title}
                    </div>
                  </button>
                </ScrollStaggerItem>
              );
            })}
          </ScrollStaggerContainer>
        </div>

        {/* Active Stage Detailed Inspector Panel */}
        <ScrollReveal delay={0.2} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel p-8 md:p-12 rounded-3xl border border-white/15 relative">
          
          {/* Left Column: Stage Text & Deliverables */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
                PHASE {activeStep.stepNumber} OF 05
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {activeStep.metrics}
              </span>
            </div>

            <div>
              <h3 className="font-syne font-extrabold text-2xl md:text-4xl text-white mb-2">
                {activeStep.title}
              </h3>
              <p className="text-cyan-400 font-mono text-xs uppercase tracking-wider mb-4">
                {activeStep.subtitle}
              </p>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Key Deliverables */}
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Key Strategic Outputs
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeStep.deliverables.map((item) => (
                  <div
                    key={item}
                    className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex items-center gap-2 text-xs font-medium text-slate-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setActiveStepIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-syne font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
              >
                <span>Advance to Next Stage</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic 3D Node Mesh */}
          <div className="lg:col-span-5 h-[320px] rounded-2xl bg-black/40 border border-white/10 overflow-hidden relative">
            <Canvas3D
              interactive={true}
              onSceneReady={({ scene, camera }) => {
                camera.position.set(0, 0, 4);

                const ambient = new THREE.AmbientLight(0xffffff, 1.2);
                scene.add(ambient);

                const pointLight = new THREE.PointLight(activeStep.accentColor, 4, 10);
                pointLight.position.set(2, 2, 2);
                scene.add(pointLight);

                // Complex node torus knot
                const geom = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
                const mat = new THREE.MeshPhysicalMaterial({
                  color: new THREE.Color(activeStep.accentColor),
                  roughness: 0.1,
                  metalness: 0.9,
                  wireframe: true,
                  emissive: new THREE.Color(activeStep.accentColor),
                  emissiveIntensity: 0.3,
                });

                const mesh = new THREE.Mesh(geom, mat);
                scene.add(mesh);

                // Surrounding particles
                const particleCount = 200;
                const pGeom = new THREE.BufferGeometry();
                const pos = new Float32Array(particleCount * 3);
                for (let i = 0; i < particleCount * 3; i++) {
                  pos[i] = (Math.random() - 0.5) * 6;
                }
                pGeom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
                const pMat = new THREE.PointsMaterial({
                  color: new THREE.Color(activeStep.accentColor),
                  size: 0.04,
                  transparent: true,
                  opacity: 0.8,
                });
                const particles = new THREE.Points(pGeom, pMat);
                scene.add(particles);

                let frameId: number;
                const animate = () => {
                  frameId = requestAnimationFrame(animate);
                  mesh.rotation.x += 0.008;
                  mesh.rotation.y += 0.012;
                  particles.rotation.y -= 0.002;
                };
                animate();

                return () => {
                  cancelAnimationFrame(frameId);
                  geom.dispose();
                  mat.dispose();
                  pGeom.dispose();
                  pMat.dispose();
                };
              }}
            />

            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-400">
              REAL-TIME WEBGL NODE ENGINE // ACTIVE
            </div>
          </div>

        </ScrollReveal>

      </div>
    </section>
  );
};

