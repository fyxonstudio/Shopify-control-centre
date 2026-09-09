import React from 'react';
import {
  X,
  ShoppingBag,
  MapPin,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Boxes,
  Truck,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Layers,
  ArrowRight
} from 'lucide-react';
import { OrderRecord } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface OrderDetailDrawerProps {
  order: OrderRecord | null;
  onClose: () => void;
  onConfirmAddress?: (orderId: string) => void;
}

export const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({
  order,
  onClose,
  onConfirmAddress
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-[#EAE6DF] animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#EAE6DF] bg-[#FAF9F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#f7be32] text-[#0D0D10] flex items-center justify-center font-bold text-sm shadow-xs border border-[#e5ab1b]">
              <ShoppingBag className="w-5 h-5 text-[#0D0D10]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-extrabold text-[#0D0D10] font-mono">
                  {order.id}
                </h3>
                <StatusBadge status={order.orderStatus} size="sm" />
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-semibold">
                  {order.source}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Created at {order.createdAt} · Handled by {order.assignedTo}
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Order Snapshot Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Amount</span>
              <div className="text-lg font-extrabold text-[#0D0D10] mt-0.5">
                PKR {order.amountPKR.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
                <CreditCard className="w-3 h-3 text-slate-400" />
                <span>{order.paymentMethod}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Address State</span>
              <div className="mt-1">
                <StatusBadge status={order.addressStatus} size="sm" />
              </div>
              <div className="text-[10px] text-slate-500 mt-1.5 truncate">
                {order.deliveryAddress.city} zone verified
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Shopify Status</span>
              <div className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{order.validationHistory.shopifyOrderNumber || 'Draft Staged'}</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                API Push Complete
              </div>
            </div>
          </div>

          {/* Product & Variant Details */}
          <div className="p-4 rounded-xl bg-white border border-[#EAE6DF] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Boxes className="w-4 h-4 text-[#f7be32]" />
                <span>Item & Variant Validation</span>
              </h4>
              <span className="text-[11px] font-mono bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                ✓ Inventory Verified
              </span>
            </div>

            <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <div>
                <div className="text-sm font-bold text-slate-900">{order.productTitle}</div>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Variant: {order.variantTitle}</span>
                  <span>·</span>
                  <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">
                    SKU: {order.sku}
                  </span>
                  <span>·</span>
                  <span>Qty: {order.quantity}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-extrabold text-[#0D0D10]">
                  PKR {order.amountPKR.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-400">Unit price</span>
              </div>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="p-4 rounded-xl bg-white border border-[#EAE6DF] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Customer & Delivery Address</span>
              </h4>
              <span className="text-[11px] font-bold text-slate-600">
                {order.customerName}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  {order.customerName}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {order.customerPhone}
                </span>
              </div>

              <div className="pt-2 border-t border-amber-100 text-xs text-slate-800 font-medium">
                <p className="leading-relaxed">📍 {order.deliveryAddress.formatted}</p>
                {order.deliveryAddress.correctedFrom && (
                  <p className="text-[11px] text-amber-700 mt-1 italic">
                    Original address corrected from: "{order.deliveryAddress.correctedFrom}"
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Customer Confirmation:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ✓ Confirmed via WhatsApp Prompt
                </span>
              </div>
            </div>

            {order.addressStatus === 'Waiting for Confirmation' && onConfirmAddress && (
              <button
                onClick={() => onConfirmAddress(order.id)}
                className="w-full py-2.5 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Simulate Customer Confirmation (YES)
              </button>
            )}
          </div>

          {/* Detailed Timeline */}
          <div className="p-4 rounded-xl bg-white border border-[#EAE6DF] shadow-2xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#f7be32]" />
              <span>Full Automation & Fulfillment Timeline</span>
            </h4>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {order.timeline.map((event, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                    event.completed ? 'border-[#f7be32] text-amber-600' : 'border-slate-300 text-slate-300'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${event.completed ? 'bg-[#f7be32]' : 'bg-slate-200'}`} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-800">{event.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{event.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{event.description}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-amber-900 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded">
                      Actor: {event.actor}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#EAE6DF] bg-[#FAF9F5] flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Millilegacy Commerce ID: <span className="font-mono text-slate-700 font-bold">{order.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => alert(`Shopify Order payload synchronized for ${order.id}`)}
              className="px-4 py-1.5 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>View in Shopify</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
