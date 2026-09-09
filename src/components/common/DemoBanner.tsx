import React from 'react';
import { Sparkles, Play, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface DemoBannerProps {
  onOpenTour: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ onOpenTour }) => {
  return (
    <div className="bg-[#0D0D10] text-white px-4 py-2 text-xs border-b border-[#242426] flex flex-wrap items-center justify-between gap-3 shadow-inner">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#f7be32]/20 text-[#f7be32] border border-[#f7be32]/40 font-bold tracking-wide uppercase text-[10px]">
          <ShieldAlert className="w-3 h-3 text-[#f7be32]" />
          Demo Environment
        </span>
        <span className="text-slate-300 hidden sm:inline">
          MILLILEGACY Client Prototype · Simulated e-Commerce Automation (WhatsApp + Shopify + n8n + AI)
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] hidden md:flex">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Realistic Mock Data Active</span>
        </div>
        <button
          onClick={onOpenTour}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#f7be32] hover:bg-[#e5ab1b] transition-colors text-[#0D0D10] font-bold text-[11px] shadow-sm cursor-pointer"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Client Presentation Guide (10 Steps)</span>
        </button>
      </div>
    </div>
  );
};
