import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/ui/Header';
import { PerformanceMonitor } from './components/ui/PerformanceMonitor';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { StatsSection } from './components/sections/StatsSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { CaseStudiesSection } from './components/sections/CaseStudiesSection';
import { InsightsSection } from './components/sections/InsightsSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { TeamSection } from './components/sections/TeamSection';
import { PricingSection } from './components/sections/PricingSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';
import { PerformanceStats, QualityPreset } from './types';
import { detectWebGPU } from './utils/webgpu';

export default function App() {
  const [stats, setStats] = useState<PerformanceStats>({
    fps: 60,
    frameTimeMs: 16.6,
    drawCalls: 12,
    triangles: 4200,
    rendererType: 'WebGL2',
    qualityPreset: 'high',
    webGpuSupported: false,
  });

  const contactSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    detectWebGPU().then((capability) => {
      setStats((prev) => ({
        ...prev,
        webGpuSupported: capability.isSupported,
        rendererType: capability.isSupported ? 'WebGPU' : 'WebGL2',
      }));
    });
  }, []);

  const handleFpsUpdate = (fps: number, frameTimeMs: number, drawCalls: number, triangles: number) => {
    setStats((prev) => ({
      ...prev,
      fps,
      frameTimeMs,
      drawCalls,
      triangles,
    }));
  };

  const handlePresetChange = (preset: QualityPreset) => {
    setStats((prev) => ({
      ...prev,
      qualityPreset: preset,
    }));
  };

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08090e] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Navigation Bar */}
      <Header
        webGpuActive={stats.webGpuSupported}
        onOpenContact={handleOpenContact}
      />

      {/* Main Sections */}
      <main>
        <HeroSection
          onOpenContact={handleOpenContact}
          onFpsUpdate={handleFpsUpdate}
          qualityPreset={stats.qualityPreset}
        />

        <AboutSection onOpenContact={handleOpenContact} />

        <div id="metrics">
          <StatsSection />
        </div>

        <ServicesSection onOpenContact={handleOpenContact} />

        <ProcessSection />

        <CaseStudiesSection onOpenContact={handleOpenContact} />

        <InsightsSection />

        <TestimonialsSection />

        <TeamSection />

        <PricingSection />

        <ContactSection sectionRef={contactSectionRef} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Real-time GPU & Frame Telemetry HUD */}
      <PerformanceMonitor
        stats={stats}
        onPresetChange={handlePresetChange}
      />
    </div>
  );
}
