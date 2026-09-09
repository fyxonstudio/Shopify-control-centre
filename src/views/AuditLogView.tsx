import React, { useState } from 'react';
import {
  ScrollText,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download
} from 'lucide-react';
import { MOCK_AUDIT_EVENTS } from '../data/mockData';
import { AuditEvent } from '../types';

interface AuditLogViewProps {
  onToast: (title: string, message: string) => void;
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ onToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actorFilter, setActorFilter] = useState('All');

  const filteredEvents = MOCK_AUDIT_EVENTS.filter(evt => {
    const actionLabel = evt.eventType.replace(/_/g, ' ');
    const entityId = evt.orderId || evt.customer || evt.id;
    const matchesSearch =
      actionLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entityId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesActor = actorFilter === 'All' || evt.actor === actorFilter;

    return matchesSearch && matchesActor;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#f7be32] text-[#0D0D10] font-bold">
              <ScrollText className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              System Audit Trail & Compliance Ledger
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 font-bold border border-amber-200">
              Immutable Records
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Chronological forensic tracking of customer consent verifications, address revisions, order injections, and automated recovery actions.
          </p>
        </div>

        <button
          onClick={() => onToast('Audit Trail Exported', 'Downloaded SHA-256 verified audit ledger for compliance.')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Log</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search action, details or entity ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#EAE6DF] bg-white text-xs outline-none focus:border-[#f7be32] shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#EAE6DF] text-xs shadow-2xs">
          {['All', 'n8n Automation Engine', 'Shopify Webhook Daemon', 'Support Agent (Ali Raza)', 'Address Validator (Node 4)'].map(actor => (
            <button
              key={actor}
              onClick={() => setActorFilter(actor)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                actorFilter === actor
                  ? 'bg-[#f7be32] text-[#0D0D10] font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {actor === 'All' ? 'All Actors' : actor.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-[#EAE6DF] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]">
              {filteredEvents.map(evt => (
                <tr key={evt.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {evt.timestamp}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 capitalize">
                    {evt.eventType.replace(/_/g, ' ')}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-amber-800">
                    {evt.orderId || evt.customer || evt.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {evt.actor}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-md truncate" title={evt.details}>
                    {evt.details}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{evt.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
