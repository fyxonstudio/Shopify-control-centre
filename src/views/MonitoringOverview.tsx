import React from 'react';
import {
  Activity,
  HeartPulse,
  GitBranch,
  AlertOctagon,
  Users2,
  ScrollText,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Boxes,
  RotateCcw,
  UserCheck
} from 'lucide-react';
import { NavigationTab, OrderRecord, WhatsAppConversation, SystemAlert, WorkflowItem } from '../types';
import {
  MOCK_SERVICES,
  MOCK_WORKFLOWS,
  MOCK_ALERTS,
  MOCK_TEAM_ACTIVITIES,
  MOCK_AUDIT_EVENTS
} from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';

interface MonitoringOverviewProps {
  onNavigate: (tab: NavigationTab) => void;
  onSelectAlert: (alert: SystemAlert) => void;
  onSelectWorkflow: (workflow: WorkflowItem) => void;
}

export const MonitoringOverview: React.FC<MonitoringOverviewProps> = ({
  onNavigate,
  onSelectAlert,
  onSelectWorkflow
}) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Top Command Center KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">System Uptime</span>
          <div className="text-xl font-extrabold text-emerald-600 font-mono mt-1">99.98%</div>
          <span className="text-[10px] text-slate-500 font-medium">All nodes green</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Workflow Success</span>
          <div className="text-xl font-extrabold text-amber-900 font-mono mt-1">97.1%</div>
          <span className="text-[10px] text-slate-500 font-medium">1,247 / 1,284 exec</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Workflows</span>
          <div className="text-xl font-extrabold text-[#0D0D10] font-mono mt-1">8 Pipelines</div>
          <span className="text-[10px] text-slate-500 font-medium">n8n core active</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Open Alerts</span>
          <div className="text-xl font-extrabold text-rose-600 font-mono mt-1">3 Incidents</div>
          <span className="text-[10px] text-slate-500 font-medium">1 critical, 2 warn</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Human Handoffs</span>
          <div className="text-xl font-extrabold text-amber-700 font-mono mt-1">21 Escalations</div>
          <span className="text-[10px] text-slate-500 font-medium">6 team reps active</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Orders Today</span>
          <div className="text-xl font-extrabold text-emerald-600 font-mono mt-1">42 Orders</div>
          <span className="text-[10px] text-slate-500 font-medium">+18.4% growth</span>
        </div>
      </div>

      {/* Grid: System Health + Workflow Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 cols: Infrastructure Health */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-sm font-extrabold text-[#0D0D10]">Infrastructure & Health Daemon</h3>
                <p className="text-xs text-slate-500">Live response latencies and connectivity heartbeats</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('system-health')}
              className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Full Health</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {MOCK_SERVICES.slice(0, 5).map(srv => (
              <div
                key={srv.id}
                className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate">{srv.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{srv.details}</div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono font-bold text-emerald-700">{srv.uptime}</div>
                  <div className="text-[10px] font-mono text-slate-400">{srv.latencyMs}ms latency</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 6 cols: Workflows Live Health */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-amber-700" />
              <div>
                <h3 className="text-sm font-extrabold text-[#0D0D10]">Workflow Engine Status</h3>
                <p className="text-xs text-slate-500">8 active automated n8n pipelines</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('workflows')}
              className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <span>All Workflows</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {MOCK_WORKFLOWS.slice(0, 5).map(wf => (
              <div
                key={wf.id}
                onClick={() => onSelectWorkflow(wf)}
                className="p-3 rounded-xl bg-slate-50/80 hover:bg-amber-50/40 border border-slate-200/70 hover:border-amber-200 cursor-pointer transition-all flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 truncate">{wf.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      {wf.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">
                    Last execution: {wf.lastRun} · {wf.executionsToday} runs today
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-bold text-amber-900 font-mono">{wf.successRate}%</div>
                  <div className="text-[10px] font-mono text-slate-400">{wf.averageRuntime} avg</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Open Alerts & Incidents + Team Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 cols: Recent Alerts */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-600" />
              <div>
                <h3 className="text-sm font-extrabold text-[#0D0D10]">Recent Incidents & Alerts</h3>
                <p className="text-xs text-slate-500">Throttles, network retries & exceptions</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('errors-alerts')}
              className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <span>View Alerts (4)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {MOCK_ALERTS.slice(0, 3).map(alert => (
              <div
                key={alert.id}
                onClick={() => onSelectAlert(alert)}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:bg-slate-50 cursor-pointer transition-colors space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={alert.severity} size="sm" />
                    <span className="font-bold text-slate-900 truncate max-w-xs">{alert.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{alert.timestamp}</span>
                </div>
                <p className="text-slate-600 line-clamp-1">{alert.description}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                  <span className="text-amber-900 font-medium">{alert.workflow}</span>
                  <span className="font-mono text-slate-400">{alert.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 6 cols: Live Team Activity */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users2 className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="text-sm font-extrabold text-[#0D0D10]">Team Activity Feed</h3>
                <p className="text-xs text-slate-500">Live human handoffs and support resolutions</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('team-activity')}
              className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <span>View Activity Log</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {MOCK_TEAM_ACTIVITIES.slice(0, 4).map(act => (
              <div
                key={act.id}
                className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{act.teamMember}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                      {act.action}
                    </span>
                    {act.orderId && (
                      <span className="font-mono text-[10px] text-amber-900 font-bold">
                        {act.orderId}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600">{act.notes}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-slate-400">{act.time}</span>
                  <div className="text-[10px] font-semibold text-emerald-700 mt-0.5">{act.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Chronological Audit Stream */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-amber-700" />
            <div>
              <h3 className="text-sm font-extrabold text-[#0D0D10]">Live Audit Stream</h3>
              <p className="text-xs text-slate-500">Chronological ledger of customer, AI, and system actions</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('audit-log')}
            className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
          >
            <span>Full Audit Trail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {MOCK_AUDIT_EVENTS.slice(0, 4).map(event => (
            <div
              key={event.id}
              className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[10px] font-mono text-slate-400 shrink-0 w-20">
                  {event.timestamp}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 shrink-0">
                  {event.actor}
                </span>
                <p className="text-slate-700 truncate">{event.details}</p>
              </div>

              <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
