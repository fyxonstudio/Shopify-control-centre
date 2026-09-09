import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Clock,
  GitBranch,
  Layers,
  Terminal,
  ShieldAlert
} from 'lucide-react';
import { SystemAlert } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface ErrorDetailModalProps {
  alert: SystemAlert | null;
  onClose: () => void;
  onRetry: (alertId: string) => void;
  onResolve: (alertId: string) => void;
}

export const ErrorDetailModal: React.FC<ErrorDetailModalProps> = ({
  alert,
  onClose,
  onRetry,
  onResolve
}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [hasRetried, setHasRetried] = useState(false);

  if (!alert) return null;

  const handleRetryClick = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      setHasRetried(true);
      onRetry(alert.id);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#EAE6DF] w-full max-w-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#EAE6DF] bg-[#FAF9F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shadow-xs ${
              alert.severity === 'critical'
                ? 'bg-rose-100 text-rose-600'
                : alert.severity === 'warning'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-amber-50 text-amber-900 border border-amber-200'
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-[#0D0D10]">
                  Incident Alert
                </h3>
                <StatusBadge status={alert.severity} size="sm" pulse={alert.status === 'Open'} />
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {alert.id} · Timestamp: {alert.timestamp}
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

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">{alert.title}</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {alert.description}
            </p>
          </div>

          {/* Workflow & Node Trace */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <GitBranch className="w-3.5 h-3.5 text-amber-700" />
                Impacted Workflow:
              </span>
              <span className="font-bold text-slate-800">{alert.workflow}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                Pipeline Node:
              </span>
              <span className="font-mono text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {alert.node}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-slate-500 font-medium">Auto-Recovery Worker:</span>
              <span className="font-semibold text-amber-900">{alert.assignedTo || 'n8n Auto-Retry Engine'}</span>
            </div>
          </div>

          {/* Error Message Stack */}
          {alert.errorMessage && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-600" />
                  <span>Exception Payload Trace</span>
                </span>
                <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  HTTP Error Code
                </span>
              </div>
              <div className="bg-[#0D0D10] text-emerald-400 p-3.5 rounded-xl text-xs font-mono leading-relaxed overflow-x-auto border border-slate-800">
                {alert.errorMessage}
              </div>
            </div>
          )}

          {hasRetried && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Retry request dispatched successfully! Payload executed with status code 200 OK.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EAE6DF] bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              onResolve(alert.id);
              onClose();
            }}
            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
          >
            Mark as Resolved
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Dismiss
            </button>
            <button
              onClick={handleRetryClick}
              disabled={isRetrying}
              className="px-4 py-2 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-bold shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
              <span>{isRetrying ? 'Retrying Node...' : 'Retry Execution'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
