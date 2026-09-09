import React, { useState } from 'react';
import {
  Users2,
  Clock,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Award,
  Search,
  ChevronRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { MOCK_TEAM_ACTIVITIES, MOCK_TEAM_MEMBERS } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';

interface TeamActivityViewProps {
  onToast: (title: string, message: string) => void;
}

export const TeamActivityView: React.FC<TeamActivityViewProps> = ({ onToast }) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#E9E5EF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 text-white">
              <Users2 className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              Support Team Roster & Human Handoffs
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200">
              6 Active Specialists
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Monitor support agent workload, response times, human takeover events, address correction verifications, and CSAT ratings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-900">Avg Response</span>
            <div className="font-extrabold text-amber-900 text-sm font-mono mt-0.5">48 sec</div>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-700">Team CSAT</span>
            <div className="font-extrabold text-emerald-700 text-sm font-mono mt-0.5">4.9 / 5.0</div>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_TEAM_MEMBERS.map(member => (
          <div
            key={member.id}
            className="bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs space-y-3 hover:border-[#f7be32]/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#f7be32] text-[#0D0D10] flex items-center justify-center font-bold text-sm shadow-xs">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                  <span className="text-[11px] text-slate-500">{member.role}</span>
                </div>
              </div>
              <StatusBadge status={member.status} size="sm" />
            </div>

            <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 pt-2.5 text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Chats</span>
                <div className="font-bold text-slate-900 font-mono mt-0.5">{member.conversationsHandledToday}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Orders</span>
                <div className="font-bold text-amber-800 font-mono mt-0.5">{member.ordersAssistedToday}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Avg Time</span>
                <div className="font-bold text-emerald-700 font-mono mt-0.5">{member.avgResponseTime}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Activity Log Stream */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-[#EAE6DF]">
          <h3 className="text-base font-extrabold text-[#0D0D10]">
            Live Agent Action Stream
          </h3>
          <p className="text-xs text-slate-500">
            Real-time feed of support interactions, manual address modifications, and resolved complaints
          </p>
        </div>

        <div className="divide-y divide-[#EAE6DF]">
          {MOCK_TEAM_ACTIVITIES.map(act => (
            <div key={act.id} className="p-4 hover:bg-amber-50/30 transition-colors flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[11px] font-mono text-slate-400 shrink-0 w-16">
                  {act.time}
                </span>
                <span className="font-bold text-slate-900 shrink-0">
                  {act.teamMember}
                </span>
                <span className="font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[10px] shrink-0">
                  {act.action}
                </span>
                <p className="text-slate-600 truncate">{act.notes}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {act.orderId && (
                  <span className="font-mono font-bold text-amber-900 bg-slate-100 px-2 py-0.5 rounded">
                    {act.orderId}
                  </span>
                )}
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                  {act.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
