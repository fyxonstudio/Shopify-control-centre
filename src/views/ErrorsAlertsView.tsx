import React, { useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  GitBranch,
  Filter,
  Terminal,
  Clock,
  Check,
  ChevronRight
} from 'lucide-react';
import { MOCK_ALERTS } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';
import { SystemAlert } from '../types';

interface ErrorsAlertsViewProps {
  onSelectAlert: (alert: SystemAlert) => void;
  onToast: (title: string, message: string) => void;
}

export const ErrorsAlertsView: React.FC<ErrorsAlertsViewProps> = ({
  onSelectAlert,
  onToast
}) => {
  const [alerts, setAlerts] = useState<SystemAlert[]>(MOCK_ALERTS);
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const handleRetry = (e: React.MouseEvent, alertId: string) => {
    e.stopPropagation();
    setRetryingId(alertId);
    setTimeout(() => {
      setRetryingId(null);
      setAlerts(prev =>
        prev.map(a =>
          a.id === alertId ? { ...a, status: 'Resolved' } : a
        )
      );
      onToast('Incident Resolved', `Alert ${alertId} re-executed successfully.`);
    }, 1000);
  };

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'All') return true;
    return a.severity === filterSeverity.toLowerCase();
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#E9E5EF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-100 text-rose-600">
              <AlertOctagon className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              Automation Incident & Error Center
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold border border-rose-200">
              3 Active Incidents
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Real-time pipeline dropoffs, Meta Cloud API rate throttles, Shopify inventory lock failures, and auto-retry payloads.
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#FAF9FC] p-1 rounded-xl border border-[#EAE6DF] text-xs">
          {['All', 'Critical', 'Warning', 'Info'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                filterSeverity === sev
                  ? 'bg-white text-[#0D0D10] font-bold shadow-2xs border border-[#EAE6DF]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map(alert => (
          <div
            key={alert.id}
            onClick={() => onSelectAlert(alert)}
            className="bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs hover:shadow-xs hover:border-[#f7be32]/40 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  alert.severity === 'critical'
                    ? 'bg-rose-100 text-rose-600'
                    : alert.severity === 'warning'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}>
                  <AlertTriangle className="w-4 h-4" />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {alert.title}
                    </h3>
                    <StatusBadge status={alert.severity} size="sm" pulse={alert.status === 'Open'} />
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {alert.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {alert.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {alert.status === 'Open' ? (
                  <button
                    onClick={e => handleRetry(e, alert.id)}
                    disabled={retryingId === alert.id}
                    className="px-3 py-1.5 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    <RefreshCw className={`w-3 h-3 ${retryingId === alert.id ? 'animate-spin' : ''}`} />
                    <span>{retryingId === alert.id ? 'Retrying...' : 'Retry Node'}</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolved</span>
                  </span>
                )}
              </div>
            </div>

            {/* Error stack snippet if present */}
            {alert.errorMessage && (
              <div className="p-2.5 rounded-xl bg-[#0D0D10] text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800">
                {alert.errorMessage}
              </div>
            )}

            {/* Bottom Meta */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 font-mono">
              <div className="flex items-center gap-3">
                <span>Workflow: <strong className="text-slate-700">{alert.workflow}</strong></span>
                <span>·</span>
                <span>Node: <strong className="text-slate-700">{alert.node}</strong></span>
              </div>
              <span>{alert.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
