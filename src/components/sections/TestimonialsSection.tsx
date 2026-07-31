import React, { useState } from 'react';
import * as THREE from 'three';
import { Canvas3D } from '../3d/Canvas3D';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../Animations/ScrollReveal';
import { useSanityContent } from '../../hooks/useSanityContent';
import type { TestimonialContent } from '../../types';
import { Quote, ChevronLeft, ChevronRight, Star, Shield } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, sectionHeadings } = useSanityContent();
  const TESTIMONIALS_DATA: TestimonialContent[] = testimonials;
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeTestimonial = TESTIMONIALS_DATA[currentIndex];

  const handleNext = () => {
    soundEngine.playClick();
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    soundEngine.playClick();
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <section className="relative py-28 bg-[#0a0c16] border-t border-white/5 overflow-hidden">
      
      {/* Background 3D Rotating Mesh */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Canvas3D
          interactive={false}
          onSceneReady={({ scene, camera }) => {
            camera.position.set(0, 0, 6);

            const ambient = new THREE.AmbientLight(0xffffff, 1);
            scene.add(ambient);

            const geom = new THREE.IcosahedronGeometry(2.5, 2);
            const mat = new THREE.MeshBasicMaterial({
              color: new THREE.Color('#00f0ff'),
              wireframe: true,
              transparent: true,
              opacity: 0.25,
            });

            const mesh = new THREE.Mesh(geom, mat);
            scene.add(mesh);

            let frameId: number;
            const animate = () => {
              frameId = requestAnimationFrame(animate);
              mesh.rotation.x += 0.002;
              mesh.rotation.y += 0.003;
            };
            animate();

            return () => {
              cancelAnimationFrame(frameId);
              geom.dispose();
              mat.dispose();
            };
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Shield className="w-3.5 h-3.5" />
            {sectionHeadings.testimonials.tag}
          </div>
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            {sectionHeadings.testimonials.title}
          </h2>
        </ScrollReveal>

        {/* Carousel Card */}
        <ScrollReveal delay={0.2} className="glass-panel p-8 md:p-14 rounded-3xl border border-white/15 relative">
          <Quote className="w-12 h-12 text-cyan-500/30 absolute top-8 left-8" />

          <div className="relative z-10 space-y-8">
            
            {/* Rating Stars */}
            <div className="flex items-center gap-1">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-3 font-mono text-xs text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-500/30">
                VERIFIED CASE STUDY
              </span>
            </div>

            {/* Quote text */}
            <blockquote className="font-syne font-medium text-lg md:text-2xl text-slate-100 leading-relaxed italic">
              "{activeTestimonial.quote}"
            </blockquote>

            {/* Author info & Impact */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
              
              <div className="flex items-center gap-4">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400"
                />
                <div>
                  <div className="font-syne font-extrabold text-lg text-white">
                    {activeTestimonial.author}
                  </div>
                  <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <span>{activeTestimonial.title}</span>
                    <span>•</span>
                    <span className="text-cyan-400 font-semibold">{activeTestimonial.company}</span>
                  </div>
                </div>
              </div>

              {/* Impact Badge */}
              <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider self-start sm:self-auto">
                IMPACT: {activeTestimonial.impact}
              </div>

            </div>

          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                onMouseEnter={() => soundEngine.playHover()}
                className="p-3 rounded-full bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                onMouseEnter={() => soundEngine.playHover()}
                className="p-3 rounded-full bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </ScrollReveal>

      </div>
    </section>
  );
};

