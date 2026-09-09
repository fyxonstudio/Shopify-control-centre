import React, { useState } from 'react';
import { X, Send, Bot, User, CheckCircle2, ShoppingBag, ShieldCheck, MapPin, UserCheck, MessageSquare, Phone, Clock } from 'lucide-react';
import { WhatsAppConversation, ChatMessage } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface ConversationDetailDrawerProps {
  conversation: WhatsAppConversation | null;
  onClose: () => void;
  onTakeover?: (convId: string) => void;
}

export const ConversationDetailDrawer: React.FC<ConversationDetailDrawerProps> = ({
  conversation,
  onClose,
  onTakeover
}) => {
  const [replyText, setReplyText] = useState('');
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);

  React.useEffect(() => {
    if (conversation) {
      setLocalMessages(conversation.messages);
    }
  }, [conversation]);

  if (!conversation) return null;

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-reply-${Date.now()}`,
      sender: 'team',
      senderName: 'Admin (You)',
      text: replyText,
      timestamp: 'Just now'
    };

    setLocalMessages(prev => [...prev, newMsg]);
    setReplyText('');
  };

  const getSenderBadge = (msg: ChatMessage) => {
    switch (msg.sender) {
      case 'customer':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            <User className="w-3 h-3 text-slate-500" />
            Customer
          </span>
        );
      case 'ai':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
            <Bot className="w-3 h-3 text-amber-700" />
            AI Sales Agent
          </span>
        );
      case 'system':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
            <ShieldCheck className="w-3 h-3 text-blue-600" />
            System Action
          </span>
        );
      case 'shopify':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            <ShoppingBag className="w-3 h-3 text-emerald-600" />
            Shopify API
          </span>
        );
      case 'team':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            <UserCheck className="w-3 h-3 text-amber-600" />
            {msg.senderName || 'Team Agent'}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-[#EAE6DF] animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE6DF] bg-[#FAF9F5] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-[#f7be32] text-[#0D0D10] flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
              {conversation.customerName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-extrabold text-[#0D0D10] truncate">
                  {conversation.customerName}
                </h3>
                <StatusBadge status={conversation.status} size="sm" pulse={conversation.status === 'AI Handling'} />
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                <span className="flex items-center gap-1 font-mono">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {conversation.customerPhone}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {conversation.lastMessageTime}
                </span>
                <span>·</span>
                <span className="text-amber-900 font-semibold">{conversation.productInterest}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {conversation.status !== 'Human Handoff' && onTakeover && (
              <button
                onClick={() => onTakeover(conversation.id)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                Human Handoff
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Intent & Order Meta Bar */}
        <div className="px-5 py-2.5 bg-amber-50/40 border-b border-[#EAE6DF] flex items-center justify-between text-xs text-slate-600 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Detected Intent:</span>
            <span className="font-bold text-amber-900 bg-white px-2 py-0.5 rounded border border-[#EAE6DF]">
              {conversation.intent}
            </span>
          </div>
          {conversation.orderId && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-500">Shopify Order:</span>
              <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {conversation.orderId}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">Handler:</span>
            <span className="font-semibold text-slate-800">{conversation.assignedAgent || 'AI Core'}</span>
          </div>
        </div>

        {/* Chat Timeline Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAF9F5]">
          <div className="text-center my-2">
            <span className="text-[11px] text-slate-400 bg-white px-3 py-1 rounded-full border border-[#EAE6DF] shadow-2xs">
              WhatsApp Session Started · End-to-End Encrypted via Meta Cloud API
            </span>
          </div>

          {localMessages.map(msg => {
            const isCustomer = msg.sender === 'customer';
            const isSystemOrShopify = msg.sender === 'system' || msg.sender === 'shopify';

            if (isSystemOrShopify) {
              return (
                <div key={msg.id} className="my-3 flex justify-center">
                  <div className={`max-w-md w-full p-3 rounded-xl border text-xs shadow-2xs ${
                    msg.sender === 'shopify'
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50/80 border-amber-200 text-amber-950'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      {getSenderBadge(msg)}
                      <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="font-medium leading-relaxed">{msg.text}</p>

                    {/* Metadata pill details */}
                    {msg.meta?.inventory !== undefined && (
                      <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-600">Stock Available:</span>
                        <span className="font-bold text-emerald-700 font-mono">
                          {msg.meta.inventory} units in Central Warehouse
                        </span>
                      </div>
                    )}
                    {msg.meta?.amount && (
                      <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-600">Total COD Amount:</span>
                        <span className="font-bold text-emerald-800">{msg.meta.amount}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  {getSenderBadge(msg)}
                  <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                    isCustomer
                      ? 'bg-white text-slate-800 border border-[#EAE6DF] rounded-tl-xs'
                      : msg.sender === 'team'
                      ? 'bg-[#0D0D10] text-[#f7be32] font-medium rounded-tr-xs'
                      : 'bg-[#f7be32] text-[#0D0D10] font-medium rounded-tr-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply Box */}
        <form onSubmit={handleSendReply} className="p-4 border-t border-[#EAE6DF] bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Send message as team member or override AI..."
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              className="flex-1 bg-[#FAF9F5] border border-[#EAE6DF] focus:border-[#f7be32] rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none transition-colors text-slate-800 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="px-4 py-2.5 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5 flex items-center justify-between">
            <span>Sending will deliver via WhatsApp Cloud API webhook</span>
            <span className="text-amber-900 font-semibold">AI Agent Listening</span>
          </p>
        </form>
      </div>
    </div>
  );
};
