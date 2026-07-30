import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { Canvas3D } from '../3d/Canvas3D';
import { AnimatedModelObject } from '../3d/AnimatedModel';
import { GeometryType, QualityPreset } from '../../types';
import { soundEngine } from '../../utils/audio';
import { easingPresets } from '../../utils/animationConfig';
import { ArrowDown, Layers, Box, Pyramid, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
  onFpsUpdate: (fps: number, frameTimeMs: number, drawCalls: number, triangles: number) => void;
  qualityPreset: QualityPreset;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onFpsUpdate, qualityPreset }) => {
  const [activeShape, setActiveShape] = useState<GeometryType>('cube');
  const modelRef = useRef<AnimatedModelObject | null>(null);

  const handleShapeChange = (shape: GeometryType) => {
    setActiveShape(shape);
    soundEngine.playMorph();
    if (modelRef.current) {
      modelRef.current.setShape(shape);
    }
  };

  const handleModelClick = () => {
    soundEngine.playPulse();
    if (modelRef.current) {
      modelRef.current.triggerClickPulse();
    }
  };

  const shapes: { type: GeometryType; label: string; icon: React.ReactNode }[] = [
    { type: 'cube', label: 'Liquid Matrix', icon: <Box className="w-3.5 h-3.5" /> },
    { type: 'prism', label: 'Fluid Flow', icon: <Pyramid className="w-3.5 h-3.5" /> },
  ];

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#08090e]">
      {/* Background 3D Canvas Scene */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: easingPresets.elastic, delay: 0.2 }}
        className="absolute inset-0 z-0"
      >
        <Canvas3D
          qualityPreset={qualityPreset}
          onFpsUpdate={onFpsUpdate}
          onSceneReady={({ scene, camera, mouse }) => {
            camera.position.set(0, 0, 7.5);

            // Vibrant Multi-Color Directional Lighting Setup
            const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
            scene.add(ambientLight);

            const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 3.5);
            dirLight1.position.set(5, 8, 5);
            scene.add(dirLight1);

            const dirLight2 = new THREE.DirectionalLight(0x00ff9d, 2.8);
            dirLight2.position.set(-5, -5, -3);
            scene.add(dirLight2);

            const dirLight3 = new THREE.DirectionalLight(0xd946ef, 3.0);
            dirLight3.position.set(0, 6, -5);
            scene.add(dirLight3);

            // Create Animated Brand Liquid Model
            const model = new AnimatedModelObject(activeShape);
            scene.add(model.group);
            modelRef.current = model;

            let clock = new THREE.Clock();

            // Return frame update handler
            const animate = () => {
              const delta = clock.getDelta();
              model.update(delta, mouse);
            };

            const interval = setInterval(animate, 1000 / 60);

            return () => {
              clearInterval(interval);
              model.dispose();
            };
          }}
        />
      </motion.div>

      {/* Grid Overlay Texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Radial Glow Gradient behind center */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-between pt-28 pb-12 pointer-events-none">
        
        {/* Top Eyebrow Tag */}
        <div className="flex justify-between items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easingPresets.smooth, delay: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(0,240,255,0.15)] pointer-events-auto"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Systemic Enterprise Architecture & AI Ops
          </motion.div>

          {/* Interactive 3D Model Trigger Banner */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: easingPresets.smooth, delay: 0.1 }}
            onClick={handleModelClick}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all pointer-events-auto cursor-pointer border border-white/10"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pulse Liquid Surface</span>
          </motion.button>
        </div>

        {/* Center Main Headline */}
        <div className="max-w-3xl my-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easingPresets.smooth, delay: 0 }}
            className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08] text-white mb-6"
          >
            Architecting <br />
            <span className="text-gradient-cyan">Exponential</span> Futures.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easingPresets.smooth, delay: 0.15 }}
            className="text-slate-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-8"
          >
            Nexus Global unifies quantum economic modeling, autonomous AI agentic networks, and sovereign risk engineering for global market leaders.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: easingPresets.smooth, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pointer-events-auto"
          >
            <motion.button
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
              onClick={() => {
                soundEngine.playClick();
                onOpenContact();
              }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-slate-950 font-syne font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)] cursor-pointer group"
            >
              Initiate Engagement
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <a
              href="#services"
              onClick={() => soundEngine.playClick()}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass-panel border border-white/15 text-slate-200 font-syne font-semibold text-sm hover:bg-white/10 hover:border-cyan-400/40 transition-all cursor-pointer"
            >
              Explore Capabilities
            </a>
          </motion.div>
        </div>

        {/* Bottom Interactive Geometry Morph Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easingPresets.smooth, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 pointer-events-auto"
        >
          
          {/* Shape Morph Control */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
            <span className="text-[10px] font-mono uppercase text-slate-400 px-2 hidden sm:inline">
              Fluid Topology:
            </span>
            {shapes.map((s) => (
              <button
                key={s.type}
                onClick={() => handleShapeChange(s.type)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeShape === s.type
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {s.icon}
                <span className="hidden md:inline">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Scroll Down Indicator */}
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            href="#about"
            onClick={() => soundEngine.playClick()}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer group"
          >
            <span>Scroll for Philosophy</span>
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-4 h-4 text-cyan-400" />
            </motion.span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

