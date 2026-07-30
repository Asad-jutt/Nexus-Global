import React, { useState } from 'react';
import { Activity, Cpu, Gauge, Zap, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { PerformanceStats, QualityPreset } from '../../types';

interface PerformanceMonitorProps {
  stats: PerformanceStats;
  onPresetChange: (preset: QualityPreset) => void;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ stats, onPresetChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getFpsColor = (fps: number) => {
    if (fps >= 55) return 'text-emerald-400';
    if (fps >= 35) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-mono text-xs">
      {/* Collapsed Badge */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/40 transition-all shadow-lg hover:shadow-cyan-500/20 group cursor-pointer"
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="font-semibold text-[11px]">
            <span className={getFpsColor(stats.fps)}>{stats.fps} FPS</span>
            <span className="text-slate-500 mx-1.5">•</span>
            <span className="text-slate-300">{stats.rendererType}</span>
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 transition-transform" />
        </button>
      ) : (
        /* Expanded HUD Panel */
        <div className="w-72 glass-panel p-4 rounded-xl border border-cyan-500/30 text-slate-200 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-cyan-400" />
              <span className="font-syne font-bold text-xs uppercase tracking-wider text-slate-100">
                GPU Engine Telemetry
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-slate-900/60 p-2 rounded border border-white/5">
              <div className="text-[10px] text-slate-400">Frame Rate</div>
              <div className={`text-sm font-bold ${getFpsColor(stats.fps)}`}>
                {stats.fps} <span className="text-[10px] font-normal text-slate-400">FPS</span>
              </div>
            </div>

            <div className="bg-slate-900/60 p-2 rounded border border-white/5">
              <div className="text-[10px] text-slate-400">Frame Latency</div>
              <div className="text-sm font-bold text-cyan-300">
                {stats.frameTimeMs} <span className="text-[10px] font-normal text-slate-400">ms</span>
              </div>
            </div>

            <div className="bg-slate-900/60 p-2 rounded border border-white/5">
              <div className="text-[10px] text-slate-400">Draw Calls</div>
              <div className="text-sm font-bold text-slate-200">{stats.drawCalls}</div>
            </div>

            <div className="bg-slate-900/60 p-2 rounded border border-white/5">
              <div className="text-[10px] text-slate-400">Active Polygons</div>
              <div className="text-sm font-bold text-slate-200">
                {(stats.triangles / 1000).toFixed(1)}k
              </div>
            </div>
          </div>

          {/* Acceleration Status */}
          <div className="flex items-center gap-2 p-2 rounded bg-cyan-950/30 border border-cyan-500/20 mb-3">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="text-[10px] leading-tight text-cyan-200">
              <span className="font-semibold block">{stats.rendererType} Active</span>
              <span className="text-slate-400">
                {stats.webGpuSupported ? 'WebGPU Compute Pipeline Enabled' : 'WebGL2 Hardware Acceleration'}
              </span>
            </div>
          </div>

          {/* Quality Preset Switcher */}
          <div>
            <div className="text-[10px] text-slate-400 mb-1.5 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> Quality Target
            </div>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded border border-white/10">
              {(['high', 'balanced', 'saver'] as QualityPreset[]).map((preset) => (
                <button
                  key={preset}
                  onClick={() => onPresetChange(preset)}
                  className={`py-1 text-[10px] capitalize font-medium rounded transition-all cursor-pointer ${
                    stats.qualityPreset === preset
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
