import React from 'react';
import {
  TrendingUp,
  Zap,
  BarChart3,
  Clock,
  Sparkles,
  Bot,
  Layers,
  Banknote,
  Cpu
} from 'lucide-react';
import { MOCK_ANALYTICS } from '../data/mockData';

export const AutomationAnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#f7be32] text-[#0D0D10] font-bold">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              Automation Performance & ROI Analytics
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 font-bold border border-amber-200">
              97.1% Reliability
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Quantitative analysis of execution velocity, AI token consumption, compute costs per converted order, and workflow runtimes.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Estimated Monthly Savings</span>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono">
            PKR 420,000
          </div>
        </div>
      </div>

      {/* 4 Analytics Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Runs (Month)</span>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono mt-1">38,420</div>
          <span className="text-xs text-emerald-600 font-semibold">+22% vs last month</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Avg Latency Per Intent</span>
          <div className="text-2xl font-extrabold text-amber-800 font-mono mt-1">1.84 sec</div>
          <span className="text-xs text-slate-500">Gemini Flash sub-second model</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">AI Automation Ratio</span>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono mt-1">82.3%</div>
          <span className="text-xs text-amber-800 font-semibold">17.7% human assistance</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Compute Cost / Order</span>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">PKR 4.20</div>
          <span className="text-xs text-slate-500">Includes Meta API + Gemini</span>
        </div>
      </div>

      {/* Workflow Performance Breakdown Table */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-[#EAE6DF]">
          <h3 className="text-base font-extrabold text-[#0D0D10]">
            Workflow Efficiency Breakdown
          </h3>
          <p className="text-xs text-slate-500">
            Execution volume, failure rates and duration by business logic pipeline
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-[#EAE6DF] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Workflow Name</th>
                <th className="py-3 px-4">Executions (24h)</th>
                <th className="py-3 px-4">Success Rate</th>
                <th className="py-3 px-4">Average Runtime</th>
                <th className="py-3 px-4">Cost Share</th>
                <th className="py-3 px-4">Reliability Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]">
              <tr className="hover:bg-amber-50/30 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">WhatsApp Inbound & AI Sales</td>
                <td className="py-3.5 px-4 font-mono">512</td>
                <td className="py-3.5 px-4 font-mono text-emerald-600 font-bold">98.4%</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">2.1s</td>
                <td className="py-3.5 px-4 font-mono text-amber-800 font-bold">42%</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold">A+ Production Ready</td>
              </tr>
              <tr className="hover:bg-amber-50/30 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">Shopify Product & Inventory Sync</td>
                <td className="py-3.5 px-4 font-mono">248</td>
                <td className="py-3.5 px-4 font-mono text-emerald-600 font-bold">99.1%</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">1.4s</td>
                <td className="py-3.5 px-4 font-mono text-amber-800 font-bold">18%</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold">A+ Production Ready</td>
              </tr>
              <tr className="hover:bg-amber-50/30 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">Address Confirmation & Formatting</td>
                <td className="py-3.5 px-4 font-mono">143</td>
                <td className="py-3.5 px-4 font-mono text-emerald-600 font-bold">97.8%</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">1.8s</td>
                <td className="py-3.5 px-4 font-mono text-amber-800 font-bold">14%</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold">A Production Ready</td>
              </tr>
              <tr className="hover:bg-amber-50/30 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">Shopify Order Push & Tagging</td>
                <td className="py-3.5 px-4 font-mono">42</td>
                <td className="py-3.5 px-4 font-mono text-emerald-600 font-bold">95.2%</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">3.4s</td>
                <td className="py-3.5 px-4 font-mono text-amber-800 font-bold">12%</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold">A Production Ready</td>
              </tr>
              <tr className="hover:bg-amber-50/30 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">Abandoned Cart WhatsApp Recovery</td>
                <td className="py-3.5 px-4 font-mono">27</td>
                <td className="py-3.5 px-4 font-mono text-emerald-600 font-bold">96.3%</td>
                <td className="py-3.5 px-4 font-mono text-slate-600">2.6s</td>
                <td className="py-3.5 px-4 font-mono text-amber-800 font-bold">8%</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold">A Production Ready</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
