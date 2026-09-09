import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  CreditCard,
  MapPin,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Download,
  Plus
} from 'lucide-react';
import { MOCK_ORDERS } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';
import { OrderRecord } from '../types';

interface OrdersViewProps {
  onSelectOrder: (order: OrderRecord) => void;
  onToast: (title: string, message: string) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  onSelectOrder,
  onToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = MOCK_ORDERS.filter(o => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.productTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSource = sourceFilter === 'All' || o.source === sourceFilter;
    const matchesStatus = statusFilter === 'All' || o.orderStatus === statusFilter;

    return matchesSearch && matchesSource && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#f7be32] text-[#0D0D10] font-bold">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              Automated Orders Orchestration
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
              Shopify Admin Synced
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Live orders created through WhatsApp automated conversations & direct web checkouts. Every WhatsApp order is gated by address validation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToast('CSV Export Ready', 'Exported 42 order records with customer address history.')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search Order ID, customer, product or SKU..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#EAE6DF] bg-white text-xs outline-none focus:border-[#f7be32] shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Source Filter */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#EAE6DF] shadow-2xs">
            <span className="px-2 text-[10px] uppercase font-bold text-slate-400">Source:</span>
            {['All', 'WhatsApp', 'Website'].map(src => (
              <button
                key={src}
                onClick={() => setSourceFilter(src)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  sourceFilter === src
                    ? 'bg-[#f7be32] text-[#0D0D10] font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {src}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#EAE6DF] shadow-2xs">
            <span className="px-2 text-[10px] uppercase font-bold text-slate-400">Status:</span>
            {['All', 'Confirmed', 'Processing', 'Address Confirmation'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#0D0D10] text-[#f7be32] font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-[#EAE6DF] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Product & Variant</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Address Status</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4">Assigned</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]">
              {filteredOrders.map(order => (
                <tr
                  key={order.id}
                  onClick={() => onSelectOrder(order)}
                  className="hover:bg-amber-50/30 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-800">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{order.customerName}</div>
                    <div className="text-[10px] font-mono text-slate-400 font-normal">{order.customerPhone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{order.productTitle}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {order.variantTitle} · {order.sku}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900 font-mono">
                    PKR {order.amountPKR.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      order.source === 'WhatsApp'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-900 border border-amber-200'
                    }`}>
                      {order.source}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={order.addressStatus} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-600">
                    {order.paymentMethod}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={order.orderStatus} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {order.createdAt}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {order.assignedTo}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 group-hover:text-amber-950">
                      <span>Details</span>
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
