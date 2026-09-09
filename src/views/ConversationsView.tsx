import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Bot,
  UserCheck,
  Phone,
  Clock,
  ExternalLink,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { MOCK_CONVERSATIONS } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';
import { WhatsAppConversation } from '../types';

interface ConversationsViewProps {
  onSelectConversation: (conv: WhatsAppConversation) => void;
}

export const ConversationsView: React.FC<ConversationsViewProps> = ({
  onSelectConversation
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = MOCK_CONVERSATIONS.filter(c => {
    const matchesSearch =
      c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.customerPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.productInterest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === 'All') return matchesSearch;
    if (statusFilter === 'AI') return matchesSearch && c.handler === 'AI';
    if (statusFilter === 'Human') return matchesSearch && (c.handler === 'Human' || c.status === 'Human Handoff');
    if (statusFilter === 'Pending') return matchesSearch && (c.status === 'Order Pending' || c.status === 'AI Handling');
    if (statusFilter === 'Resolved') return matchesSearch && (c.status === 'Resolved' || c.status === 'Order Confirmed');
    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Context */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#f7be32] text-[#0D0D10] font-bold">
              <MessageSquare className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              WhatsApp Conversation Hub
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
              Live Meta Webhook Stream
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Monitor real-time omnichannel dialogs, automated Urdu intent detection, variant sizing queries, and live support team handoffs.
          </p>
        </div>

        {/* 3 Quick Metrics */}
        <div className="flex items-center gap-4 text-xs">
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
            <div className="font-bold text-amber-900 font-mono text-sm">186 Chats</div>
            <span className="text-[10px] text-slate-500">Today Volume</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <div className="font-bold text-emerald-700 font-mono text-sm">82.3%</div>
            <span className="text-[10px] text-slate-500">AI Automation</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
            <div className="font-bold text-amber-700 font-mono text-sm">21 Handoffs</div>
            <span className="text-[10px] text-slate-500">Escalated</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer, phone, product or Urdu text..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#EAE6DF] bg-white text-xs outline-none focus:border-[#f7be32] shadow-2xs"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#EAE6DF] text-xs shadow-2xs overflow-x-auto">
          {['All', 'AI', 'Human', 'Pending', 'Resolved'].map(filter => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === filter
                  ? 'bg-[#f7be32] text-[#0D0D10] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations Table */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-[#EAE6DF] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Handler</th>
                <th className="py-3 px-4">Intent</th>
                <th className="py-3 px-4">Product Interest</th>
                <th className="py-3 px-4">Last Message</th>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]">
              {filtered.map(conv => (
                <tr
                  key={conv.id}
                  onClick={() => onSelectConversation(conv)}
                  className="hover:bg-amber-50/30 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{conv.customerName}</div>
                    <div className="text-[10px] font-mono text-slate-400 font-normal">
                      {conv.customerPhone}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={conv.status} size="sm" pulse={conv.status === 'AI Handling'} />
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      conv.handler === 'AI'
                        ? 'bg-amber-50 text-amber-900 border border-amber-200'
                        : 'bg-amber-50 text-amber-800'
                    }`}>
                      {conv.handler === 'AI' ? <Bot className="w-3 h-3 text-amber-700" /> : <UserCheck className="w-3 h-3" />}
                      <span>{conv.handler}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {conv.intent}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 max-w-xs truncate" title={conv.productInterest}>
                    {conv.productInterest}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate italic" title={conv.lastMessage}>
                    "{conv.lastMessage}"
                  </td>
                  <td className="py-3.5 px-4">
                    {conv.orderId ? (
                      <span className="font-mono font-bold text-amber-900">
                        {conv.orderId}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {conv.lastMessageTime}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 group-hover:text-amber-950">
                      <span>Open</span>
                      <ChevronRight className="w-3.5 h-3.5" />
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
