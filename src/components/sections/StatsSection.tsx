import React from 'react';
import * as THREE from 'three';
import { Canvas3D } from '../3d/Canvas3D';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../Animations/ScrollReveal';
import { ScrollStaggerContainer, ScrollStaggerItem } from '../Animations/ScrollStagger';
import { ScrollCounter } from '../Animations/ScrollCounter';
import { ShieldCheck, TrendingUp, Users, Award, Sparkles } from 'lucide-react';

interface StatItem {
  id: string;
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  shape: 'torus' | 'cylinder' | 'sphere' | 'octahedron';
  decimals?: number;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'engagements',
    value: 500,
    suffix: '+',
    label: 'Global Engagements',
    description: 'Executed across Fortune 500, sovereign funds, and defense prime contractors.',
    icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
    accentColor: '#00f0ff',
    shape: 'torus',
  },
  {
    id: 'value-created',
    value: 2.3,
    prefix: '$',
    suffix: 'B+',
    label: 'Client Value Realized',
    description: 'Measured via audited EBITDA expansion, OPEX savings, and capital efficiency.',
    icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
    accentColor: '#00ff9d',
    shape: 'cylinder',
    decimals: 1
  },
  {
    id: 'retention',
    value: 98,
    suffix: '%',
    label: 'Retention & Expansion',
    description: 'Enterprise clients extending multi-year strategic advisory frameworks.',
    icon: <Users className="w-5 h-5 text-purple-400" />,
    accentColor: '#a855f7',
    shape: 'octahedron',
  },
  {
    id: 'experience',
    value: 15,
    suffix: ' Yrs',
    label: 'Pioneering Leadership',
    description: 'A decade and a half of continuous system innovations in high-velocity markets.',
    icon: <Award className="w-5 h-5 text-amber-400" />,
    accentColor: '#ffb800',
    shape: 'sphere',
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#08090e] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Audited Operational Benchmarks
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Quantifiable Impact Across Scale
          </h2>
        </ScrollReveal>

        {/* Stats Grid with Embedded 3D Canvases */}
        <ScrollStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((stat) => (
            <ScrollStaggerItem key={stat.id}>
              <div
                onMouseEnter={() => soundEngine.playHover()}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden flex flex-col justify-between h-full"
              >
                {/* Top Row: Icon + 3D Shape Scene */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10">
                    {stat.icon}
                  </div>

                  {/* Mini 3D Geometry Preview */}
                  <div className="w-16 h-16 relative">
                    <Canvas3D
                      interactive={false}
                      onSceneReady={({ scene, camera }) => {
                        camera.position.set(0, 0, 3.5);

                        const ambient = new THREE.AmbientLight(0xffffff, 1.5);
                        scene.add(ambient);

                        const light = new THREE.DirectionalLight(stat.accentColor, 3.0);
                        light.position.set(2, 2, 2);
                        scene.add(light);

                        let geom: THREE.BufferGeometry;
                        if (stat.shape === 'torus') geom = new THREE.TorusGeometry(0.8, 0.3, 16, 32);
                        else if (stat.shape === 'cylinder') geom = new THREE.CylinderGeometry(0.7, 0.7, 1.2, 16);
                        else if (stat.shape === 'octahedron') geom = new THREE.OctahedronGeometry(0.9, 0);
                        else geom = new THREE.SphereGeometry(0.8, 16, 16);

                        const mat = new THREE.MeshPhysicalMaterial({
                          color: new THREE.Color(stat.accentColor),
                          metalness: 0.8,
                          roughness: 0.2,
                          wireframe: true,
                          transparent: true,
                          opacity: 0.85,
                        });

                        const mesh = new THREE.Mesh(geom, mat);
                        scene.add(mesh);

                        let frameId: number;
                        const animate = () => {
                          frameId = requestAnimationFrame(animate);
                          mesh.rotation.x += 0.01;
                          mesh.rotation.y += 0.015;
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
                </div>

                {/* Number & Label */}
                <div>
                  <div className="font-syne font-extrabold text-4xl text-white mb-1 tracking-tight group-hover:text-cyan-300 transition-colors">
                    <ScrollCounter
                      endValue={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                      duration={2.0}
                    />
                  </div>

                  <div className="text-xs font-mono font-semibold text-cyan-400 mb-2 uppercase tracking-wider">
                    {stat.label}
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {stat.description}
                  </p>
                </div>

              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>

      </div>
    </section>
  );
};

