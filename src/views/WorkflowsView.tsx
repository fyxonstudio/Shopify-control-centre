import React, { useState } from 'react';
import {
  GitBranch,
  Play,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Zap,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Check
} from 'lucide-react';
import { MOCK_WORKFLOWS } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';
import { WorkflowItem } from '../types';

interface WorkflowsViewProps {
  onSelectWorkflow: (wf: WorkflowItem) => void;
  onToast: (title: string, message: string) => void;
}

export const WorkflowsView: React.FC<WorkflowsViewProps> = ({
  onSelectWorkflow,
  onToast
}) => {
  const [runningId, setRunningId] = useState<string | null>(null);

  const handleRunTest = (e: React.MouseEvent, wf: WorkflowItem) => {
    e.stopPropagation();
    setRunningId(wf.id);
    setTimeout(() => {
      setRunningId(null);
      onToast(
        'Pipeline Executed',
        `Workflow "${wf.name}" completed test execution in 1.4s with 0 errors.`
      );
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#f7be32] text-[#0D0D10] font-bold">
              <GitBranch className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              n8n Automation Engine Pipelines
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 font-bold border border-amber-200">
              8 Active Workflows
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Autonomous multi-step business logic orchestrating WhatsApp Cloud API, AI Intent Extractors, Shopify GraphQL endpoints, and address verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Runs Today</span>
            <div className="font-extrabold text-[#0D0D10] text-sm font-mono mt-0.5">1,284 Executions</div>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-700">Overall Success</span>
            <div className="font-extrabold text-emerald-700 text-sm font-mono mt-0.5">97.1%</div>
          </div>
        </div>
      </div>

      {/* 8 Workflow Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_WORKFLOWS.map(wf => (
          <div
            key={wf.id}
            onClick={() => onSelectWorkflow(wf)}
            className="bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs hover:shadow-sm hover:border-[#f7be32]/50 cursor-pointer transition-all space-y-4 group"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/60 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#f7be32] group-hover:text-[#0D0D10] transition-colors">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {wf.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {wf.description}
                  </p>
                </div>
              </div>

              <StatusBadge status={wf.status} size="sm" pulse />
            </div>

            {/* Pipeline Nodes summary */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-[11px] text-slate-600">
              <span className="font-bold text-slate-400 text-[10px] uppercase shrink-0">Nodes ({wf.nodes.length}):</span>
              {wf.nodes.slice(0, 4).map((node, i) => (
                <span
                  key={node.id}
                  className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] shrink-0 border border-slate-200"
                >
                  {node.title.split(' ')[0]}
                </span>
              ))}
              {wf.nodes.length > 4 && (
                <span className="text-[10px] text-slate-400 font-mono">
                  +{wf.nodes.length - 4} more
                </span>
              )}
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-b border-slate-100 py-2.5 text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Success Rate</span>
                <div className="font-extrabold text-[#0D0D10] font-mono mt-0.5">{wf.successRate}%</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Runs (24h)</span>
                <div className="font-extrabold text-[#0D0D10] font-mono mt-0.5">{wf.executionsToday}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Runtime</span>
                <div className="font-semibold text-slate-700 font-mono mt-0.5">{wf.averageRuntime}</div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400 font-mono">
                Last run: {wf.lastRun}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={e => handleRunTest(e, wf)}
                  disabled={runningId === wf.id}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Play className={`w-3 h-3 ${runningId === wf.id ? 'animate-spin' : ''}`} />
                  <span>{runningId === wf.id ? 'Running...' : 'Test Run'}</span>
                </button>
                <span className="text-xs font-bold text-amber-800 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  <span>Graph</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
