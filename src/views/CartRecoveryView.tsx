import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Send,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Percent,
  Banknote,
  RefreshCw
} from 'lucide-react';
import { MOCK_CART_RECOVERIES, MOCK_KPIS } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';
import { CartRecoveryItem } from '../types';

interface CartRecoveryViewProps {
  onToast: (title: string, message: string) => void;
  onOpenTour?: () => void;
}

export const CartRecoveryView: React.FC<CartRecoveryViewProps> = ({ onToast }) => {
  const [carts, setCarts] = useState<CartRecoveryItem[]>(MOCK_CART_RECOVERIES);
  const [sendingId, setSendingId] = useState<string | null>(null);

  const handleSendReminder = (id: string, customerName: string) => {
    setSendingId(id);
    setTimeout(() => {
      setSendingId(null);
      setCarts(prev =>
        prev.map(c =>
          c.id === id
            ? { ...c, status: 'Reminder Sent', reminderSentAt: 'Just now', reminderCount: c.reminderCount + 1 }
            : c
        )
      );
      onToast(
        'WhatsApp Reminder Dispatched',
        `Automated cart nudge with personalized voucher sent to ${customerName}.`
      );
    }, 800);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#f7be32] text-[#0D0D10] font-bold">
              <RotateCcw className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              WhatsApp Abandoned Cart Recovery Engine
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 font-bold border border-amber-200">
              High-Conversion Nudge Daemon
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            When a customer abandons checkout on Shopify, an intelligent 30-minute delayed WhatsApp reminder is triggered with cart summary, stock reservation notice, and optional voucher code.
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400 font-bold uppercase">Total Recovered Today</div>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono">
            PKR 94,500
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Abandoned Checkouts</span>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono mt-1">
            31
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Total dropped checkouts (24h)</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">WhatsApp Reminders Sent</span>
          <div className="text-2xl font-extrabold text-amber-700 font-mono mt-1">
            27
          </div>
          <p className="text-[11px] text-slate-500 mt-1">87.1% delivery rate</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Link Return Clicks</span>
          <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1">
            14
          </div>
          <p className="text-[11px] text-slate-500 mt-1">51.8% returned to session</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Recovered Orders</span>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">
            8 Orders
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            25.8% Conversion
          </p>
        </div>
      </div>

      {/* Visual Recovery Funnel */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs space-y-4">
        <h3 className="text-sm sm:text-base font-extrabold text-[#0D0D10]">
          Cart Recovery Conversion Funnel
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[11px] font-bold text-slate-400">Step 1 · Drop</div>
            <div className="text-lg font-bold text-slate-900 mt-0.5">31 Checkouts</div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-slate-400 h-full w-full" />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">100% baseline</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70">
            <div className="text-[11px] font-bold text-amber-800">Step 2 · Nudge</div>
            <div className="text-lg font-bold text-amber-900 mt-0.5">27 Reminders</div>
            <div className="w-full bg-amber-100 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#f7be32] h-full" style={{ width: '87%' }} />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">87% eligible & contacted</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70">
            <div className="text-[11px] font-bold text-amber-700">Step 3 · Engage</div>
            <div className="text-lg font-bold text-amber-700 mt-0.5">14 Returned</div>
            <div className="w-full bg-amber-100 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-500 h-full" style={{ width: '45%' }} />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">52% CTR into WhatsApp cart</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/70">
            <div className="text-[11px] font-bold text-emerald-700">Step 4 · Purchased</div>
            <div className="text-lg font-bold text-emerald-700 mt-0.5">8 Orders</div>
            <div className="w-full bg-emerald-100 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-600 h-full" style={{ width: '26%' }} />
            </div>
            <span className="text-[10px] text-emerald-800 font-semibold mt-1 block">
              25.8% Final Recovery Rate
            </span>
          </div>
        </div>
      </div>

      {/* Abandoned Carts Table */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-[#EAE6DF] flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#0D0D10]">
              Abandoned Carts Queue & Reminders
            </h3>
            <p className="text-xs text-slate-500">
              Live checkout dropouts tracked via Shopify Webhooks with automated WhatsApp follow-ups
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Auto-Nudge: Active (30m delay)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-[#EAE6DF] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items in Cart</th>
                <th className="py-3 px-4">Cart Value</th>
                <th className="py-3 px-4">Checkout Time</th>
                <th className="py-3 px-4">Reminder Status</th>
                <th className="py-3 px-4">Sent At</th>
                <th className="py-3 px-4">Voucher</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]">
              {carts.map(cart => (
                <tr key={cart.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{cart.customerName}</div>
                    <div className="text-[10px] font-mono text-slate-400 font-normal">{cart.customerPhone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {cart.cartItems}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    PKR {cart.cartValuePKR.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {cart.checkoutCreatedAt}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={cart.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {cart.reminderSentAt}
                  </td>
                  <td className="py-3.5 px-4">
                    {cart.discountCodeOffered ? (
                      <span className="font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {cart.discountCodeOffered}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {cart.status === 'Reminder Pending' ? (
                      <button
                        onClick={() => handleSendReminder(cart.id, cart.customerName)}
                        disabled={sendingId === cart.id}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] font-bold text-[11px] shadow-xs disabled:opacity-50 cursor-pointer transition-colors"
                      >
                        <Send className={`w-3 h-3 ${sendingId === cart.id ? 'animate-pulse' : ''}`} />
                        <span>{sendingId === cart.id ? 'Sending...' : 'Nudge Now'}</span>
                      </button>
                    ) : cart.status === 'Recovered' ? (
                      <span className="text-emerald-700 font-bold text-[11px] flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Recovered</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Nudge Sent</span>
                    )}
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
