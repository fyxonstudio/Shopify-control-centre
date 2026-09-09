import React, { useState } from 'react';
import {
  HeartPulse,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ShieldCheck,
  Server,
  Activity,
  Zap,
  Radio
} from 'lucide-react';
import { MOCK_SERVICES } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';
import { SystemService } from '../types';

interface SystemHealthViewProps {
  onToast: (title: string, message: string) => void;
}

export const SystemHealthView: React.FC<SystemHealthViewProps> = ({ onToast }) => {
  const [services, setServices] = useState<SystemService[]>(MOCK_SERVICES);
  const [isPinging, setIsPinging] = useState(false);

  const handlePingAll = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      setServices(prev =>
        prev.map(s => ({
          ...s,
          lastChecked: 'Just now',
          latencyMs: Math.max(12, s.latencyMs + Math.floor((Math.random() - 0.5) * 15))
        }))
      );
      onToast('Health Check Completed', 'All 7 infrastructure services responded with HTTP 200 OK.');
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#E9E5EF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-600 text-white">
              <HeartPulse className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              Infrastructure Telemetry & Health Daemon
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
              All 7 Systems Operational
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Live latency probes, SSL certificate validation, API rate limits, and webhook ingestion monitors across all third-party integrations.
          </p>
        </div>

        <button
          onClick={handlePingAll}
          disabled={isPinging}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
          <span>{isPinging ? 'Probing Endpoints...' : 'Ping All Services'}</span>
        </button>
      </div>

      {/* 7 Services Detailed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(srv => (
          <div
            key={srv.id}
            className="bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs space-y-4 hover:border-[#f7be32]/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{srv.name}</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400 mt-0.5 block truncate max-w-[200px]">
                  {srv.endpoint}
                </span>
              </div>
              <StatusBadge status={srv.status} size="sm" pulse />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {srv.details}
            </p>

            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Uptime (30d)</span>
                <div className="font-mono font-bold text-emerald-700 text-sm mt-0.5">{srv.uptime}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">API Latency</span>
                <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">{srv.latencyMs} ms</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
              <span>Probe: 60s interval</span>
              <span className="text-slate-500">Checked: {srv.lastChecked}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Live Probe Log Terminal */}
      <div className="bg-[#0D0D10] text-emerald-400 p-5 rounded-2xl border border-slate-800 shadow-sm space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 text-[11px]">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>HEARTBEAT DAEMON TERMINAL LOGS (STDOUT)</span>
          </div>
          <span>NODE: cluster-pk-central-1</span>
        </div>

        <div className="space-y-1 pt-1 leading-relaxed text-[11px]">
          <div>[22:45:00] <span className="text-[#f7be32]">PROBE_OK</span> whatsapp.meta.graph: Status 200 OK (28ms) — Webhook secret verified.</div>
          <div>[22:45:01] <span className="text-[#f7be32]">PROBE_OK</span> shopify.graphql: Status 200 OK (92ms) — Rate limit remaining: 38/40 req/sec.</div>
          <div>[22:45:01] <span className="text-[#f7be32]">PROBE_OK</span> n8n.automation.engine: Status 200 OK (14ms) — Active queue workers: 4/4 idle.</div>
          <div>[22:45:02] <span className="text-[#f7be32]">PROBE_OK</span> ai.gemini.intent: Status 200 OK (180ms) — Token latency normal.</div>
          <div>[22:45:02] <span className="text-emerald-300">HEALTH_SUMMARY:</span> 7/7 services online. System operational. Zero packet loss.</div>
        </div>
      </div>
    </div>
  );
};
