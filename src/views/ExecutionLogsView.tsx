import React, { useState } from 'react';
import {
  FileCode,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCw,
  Download,
  Eye,
  ArrowRight,
  Terminal,
  Zap,
  Code2
} from 'lucide-react';
import { ExecutionLog } from '../types';
import { MOCK_EXECUTION_LOGS } from '../data/mockData';

interface ExecutionLogsViewProps {
  onToast: (title: string, message: string) => void;
}

export const ExecutionLogsView: React.FC<ExecutionLogsViewProps> = ({ onToast }) => {
  const [logs, setLogs] = useState<ExecutionLog[]>(MOCK_EXECUTION_LOGS);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Success' | 'Failed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLog, setSelectedLog] = useState<ExecutionLog | null>(null);

  const filteredLogs = logs.filter(log => {
    const matchesStatus = filterStatus === 'All' || log.status === filterStatus;
    const matchesSearch =
      log.executionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.workflow.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.error && log.error.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleRetry = (executionId: string) => {
    setLogs(prev =>
      prev.map(l =>
        l.executionId === executionId ? { ...l, status: 'Success', error: undefined } : l
      )
    );
    onToast(
      'Execution Re-triggered',
      `Manual retry for ${executionId} dispatched to n8n webhook worker.`
    );
  };

  const handleExport = () => {
    onToast('Logs Exported', 'Execution traces exported to JSON format.');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Context */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#f7be32] text-[#0D0D10] font-bold">
              <FileCode className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              Technical Execution Logs
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time payload inspection, microservice node telemetry, and automated retry traces
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#EAE6DF] bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Traces</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Executions Today</span>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono mt-1">1,284</div>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
            <span>+14.2%</span> vs yesterday
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Success Ratio</span>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">97.1%</div>
          <span className="text-[10px] text-slate-500 font-medium mt-0.5">1,247 clean runs</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Failed / Retried</span>
          <div className="text-2xl font-extrabold text-rose-600 font-mono mt-1">37</div>
          <span className="text-[10px] text-slate-500 font-medium mt-0.5">Auto-retry handled 34</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Avg Node Runtime</span>
          <div className="text-2xl font-extrabold text-amber-800 font-mono mt-1">1.8s</div>
          <span className="text-[10px] text-slate-500 font-medium mt-0.5">Under 3s SLA ceiling</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Execution ID, Workflow or Error..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#EAE6DF] bg-white text-xs outline-none focus:border-[#f7be32] shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto bg-white p-1 rounded-xl border border-[#EAE6DF] text-xs shadow-2xs">
          {(['All', 'Success', 'Failed'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                filterStatus === status
                  ? 'bg-[#f7be32] text-[#0D0D10] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-[#EAE6DF] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Execution ID</th>
                <th className="py-3 px-4">Workflow</th>
                <th className="py-3 px-4">Trigger</th>
                <th className="py-3 px-4">Nodes Run</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Payload</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]">
              {filteredLogs.map(log => (
                <tr
                  key={log.id}
                  className="hover:bg-amber-50/30 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-amber-900">{log.executionId}</div>
                    <span className="text-[10px] text-slate-400 font-mono">{log.time}</span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{log.workflow}</div>
                    {log.error && (
                      <div className="text-[10px] text-rose-600 font-medium mt-0.5 line-clamp-1">
                        {log.error}
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold">
                      {log.trigger}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {log.nodesRunCount} nodes
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    {log.duration}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                    {log.payloadSize}
                  </td>

                  <td className="py-3.5 px-4">
                    {log.status === 'Success' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Success
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                        <XCircle className="w-3 h-3" />
                        Failed
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="px-2.5 py-1 rounded-lg border border-[#EAE6DF] hover:bg-slate-100 text-slate-700 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1"
                        title="Inspect Webhook and Node Trace Payload"
                      >
                        <Eye className="w-3 h-3 text-slate-500" />
                        <span>Inspect</span>
                      </button>

                      {log.status === 'Failed' && (
                        <button
                          onClick={() => handleRetry(log.executionId)}
                          className="px-2.5 py-1 rounded-lg bg-[#f7be32] text-[#0D0D10] hover:bg-[#e5ab1b] text-[11px] font-extrabold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>Retry</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payload Inspector Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#EAE6DF] w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-[#EAE6DF] bg-[#FAF9F5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-700" />
                <h4 className="text-sm font-extrabold text-[#0D0D10]">
                  Execution Trace: {selectedLog.executionId}
                </h4>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">WORKFLOW</span>
                  <span className="font-semibold text-slate-800">{selectedLog.workflow}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">TRIGGER</span>
                  <span className="font-semibold text-slate-800">{selectedLog.trigger}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">DURATION</span>
                  <span className="font-semibold text-slate-800">{selectedLog.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">PAYLOAD</span>
                  <span className="font-semibold text-slate-800">{selectedLog.payloadSize}</span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" />
                  <span>Payload Ingress & Node Context (JSON)</span>
                </h5>
                <pre className="p-3 bg-[#0D0D10] text-emerald-400 rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed border border-slate-800">
{JSON.stringify(
  {
    execution_id: selectedLog.executionId,
    timestamp: selectedLog.time,
    workflow: selectedLog.workflow,
    nodes_executed: selectedLog.nodesRunCount,
    duration_ms: parseFloat(selectedLog.duration) * 1000,
    status: selectedLog.status,
    ingress: {
      headers: {
        'x-hub-signature-256': 'sha256=9b736...a812',
        'content-type': 'application/json'
      },
      body: {
        event: 'order_webhook',
        order_prefix: 'ML-',
        currency: 'PKR',
        auto_address_verified: true
      }
    },
    error_details: selectedLog.error || null
  },
  null,
  2
)}
                </pre>
              </div>
            </div>

            <div className="p-3 border-t border-[#EAE6DF] bg-slate-50 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Log retention: 30 days active
              </span>
              <div className="flex items-center gap-2">
                {selectedLog.status === 'Failed' && (
                  <button
                    onClick={() => {
                      handleRetry(selectedLog.executionId);
                      setSelectedLog(null);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#f7be32] text-[#0D0D10] hover:bg-[#e5ab1b] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    Retry Now
                  </button>
                )}
                <button
                  onClick={() => setSelectedLog(null)}
                  className="px-3 py-1.5 rounded-xl border border-[#EAE6DF] bg-white text-slate-700 text-xs font-bold hover:bg-slate-100 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
