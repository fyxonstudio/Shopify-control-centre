import React from 'react';
import {
  X,
  GitBranch,
  CheckCircle2,
  Clock,
  Zap,
  Play,
  ArrowDown,
  Layers,
  Sparkles,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { WorkflowItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface WorkflowDetailModalProps {
  workflow: WorkflowItem | null;
  onClose: () => void;
  onRunWorkflow?: (wfId: string) => void;
}

export const WorkflowDetailModal: React.FC<WorkflowDetailModalProps> = ({
  workflow,
  onClose,
  onRunWorkflow
}) => {
  if (!workflow) return null;

  const getSystemColor = (system: string) => {
    switch (system) {
      case 'WhatsApp':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'AI Agent':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'Shopify':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'n8n':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#EAE6DF] w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#EAE6DF] bg-[#FAF9F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f7be32] text-[#0D0D10] flex items-center justify-center font-bold text-sm shadow-xs">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-[#0D0D10]">
                  {workflow.name}
                </h3>
                <StatusBadge status={workflow.status} size="sm" pulse />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {workflow.description}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 divide-x divide-[#EAE6DF] border-b border-[#EAE6DF] bg-slate-50/50 text-center text-xs py-3 px-2">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Success Rate</span>
            <div className="font-extrabold text-[#0D0D10] text-sm mt-0.5">{workflow.successRate}%</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Avg Runtime</span>
            <div className="font-extrabold text-[#0D0D10] text-sm mt-0.5">{workflow.averageRuntime}</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Executions (24h)</span>
            <div className="font-extrabold text-amber-800 text-sm mt-0.5">{workflow.executionsToday}</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Last Run</span>
            <div className="font-semibold text-slate-700 text-sm mt-0.5">{workflow.lastRun}</div>
          </div>
        </div>

        {/* Node Pipeline Canvas */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[#FAF9F5]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>Workflow Execution Graph ({workflow.nodes.length} Nodes)</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Engine: n8n Core v1.34 · Sub-graph OK
            </span>
          </div>

          <div className="space-y-3">
            {workflow.nodes.map((node, index) => (
              <React.Fragment key={node.id}>
                <div className="bg-white rounded-xl border border-[#EAE6DF] p-4 shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            {node.title}
                          </h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getSystemColor(node.system)}`}>
                            {node.system}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {node.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{node.avgTime}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">
                        {node.lastRun}
                      </div>
                    </div>
                  </div>
                </div>

                {index < workflow.nodes.length - 1 && (
                  <div className="flex justify-center -my-1">
                    <div className="p-1 rounded-full bg-slate-200 text-slate-500">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EAE6DF] bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-mono">
            Workflow ID: <span className="font-bold text-slate-800">{workflow.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                if (onRunWorkflow) onRunWorkflow(workflow.id);
                alert(`Triggered manual execution test for "${workflow.name}". Completed with status: 200 OK.`);
              }}
              className="px-4 py-2 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Test Run Pipeline</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
