import React, { useState } from 'react';
import {
  ShoppingBag,
  MessageSquare,
  Bot,
  UserCheck,
  RotateCcw,
  AlertOctagon,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  HeartPulse,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Boxes,
  MapPin,
  TrendingUp,
  Zap,
  Activity
} from 'lucide-react';
import { NavigationTab, OrderRecord, WhatsAppConversation } from '../types';
import {
  MOCK_KPIS,
  MOCK_SERVICES,
  MOCK_FUNNEL,
  MOCK_CONVERSATIONS,
  MOCK_ORDERS,
  MOCK_ANALYTICS
} from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';

interface DashboardOverviewProps {
  onNavigate: (tab: NavigationTab) => void;
  onSelectOrder: (order: OrderRecord) => void;
  onSelectConversation: (conv: WhatsAppConversation) => void;
  onOpenTour: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
  onSelectOrder,
  onSelectConversation,
  onOpenTour
}) => {
  const [chartRange, setChartRange] = useState<'Today' | '7 Days' | '30 Days'>('Today');

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Welcome Banner */}
      <div className="rounded-2xl bg-[#0D0D10] text-white p-6 sm:p-8 border border-[#242426] shadow-md relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-[#f7be32]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -top-20 w-64 h-64 bg-[#f7be32]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f7be32]/20 border border-[#f7be32]/40 text-[#f7be32] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#f7be32]" />
              MILLILEGACY AUTOMATION CONTROL CENTER
            </span>
            <span className="text-xs text-slate-400">· Production Prototype</span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              Good evening, Admin
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-normal mt-1">
              Your entire commerce operation, monitored from one place.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
            Track WhatsApp conversations, AI automation, Shopify orders, inventory validation, team activity and system health in real time.
          </p>

          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('monitoring-overview')}
              className="px-4 py-2 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-[#0D0D10]" />
              <span>Monitoring Command Center</span>
            </button>
            <button
              onClick={() => onNavigate('address-confirmation')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#f7be32]" />
              <span>Address Verification Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* KPI 1: Orders Today */}
        <div
          onClick={() => onNavigate('orders')}
          className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs hover:shadow-sm hover:border-[#f7be32]/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Orders Today</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 group-hover:bg-[#f7be32] group-hover:text-[#0D0D10] transition-colors">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono">
            {MOCK_KPIS.ordersToday.value}
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{MOCK_KPIS.ordersToday.change}</span>
            <span className="text-[10px] text-slate-400 font-normal">vs prev</span>
          </div>
        </div>

        {/* KPI 2: WhatsApp Conversations */}
        <div
          onClick={() => onNavigate('conversations')}
          className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs hover:shadow-sm hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">WhatsApp Chats</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono">
            {MOCK_KPIS.whatsappConversations.value}
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{MOCK_KPIS.whatsappConversations.change}</span>
            <span className="text-[10px] text-slate-400 font-normal">vs yesterday</span>
          </div>
        </div>

        {/* KPI 3: AI Handled */}
        <div
          onClick={() => onNavigate('conversations')}
          className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs hover:shadow-sm hover:border-[#f7be32]/60 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">AI Handled</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-800 group-hover:bg-[#f7be32] group-hover:text-[#0D0D10] transition-colors">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono">
            {MOCK_KPIS.aiHandled.value}
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs font-bold text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{MOCK_KPIS.aiHandled.rate}</span>
          </div>
        </div>

        {/* KPI 4: Human Handoffs */}
        <div
          onClick={() => onNavigate('team-activity')}
          className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs hover:shadow-sm hover:border-amber-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Human Handoffs</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono">
            {MOCK_KPIS.humanHandoffs.value}
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-slate-500">
            <ArrowDownRight className="w-3.5 h-3.5 text-emerald-500" />
            <span>{MOCK_KPIS.humanHandoffs.change}</span>
            <span className="text-[10px] text-slate-400 font-normal">escalated</span>
          </div>
        </div>

        {/* KPI 5: Cart Recovery */}
        <div
          onClick={() => onNavigate('cart-recovery')}
          className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs hover:shadow-sm hover:border-amber-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Cart Recovery</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-800 group-hover:bg-[#f7be32] group-hover:text-[#0D0D10] transition-colors">
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono">
            {MOCK_KPIS.cartRecovery.value}
          </div>
          <div className="mt-2 text-xs font-bold text-amber-900 truncate">
            {MOCK_KPIS.cartRecovery.recoveredAmount}
          </div>
        </div>

        {/* KPI 6: Automation Errors */}
        <div
          onClick={() => onNavigate('errors-alerts')}
          className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs hover:shadow-sm hover:border-rose-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Automation Errors</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white transition-colors">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono">
            {MOCK_KPIS.automationErrors.value}
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-rose-600">
            <span>{MOCK_KPIS.automationErrors.label}</span>
          </div>
        </div>
      </div>

      {/* Prominent System Health Section Card */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#0D0D10]">
                Live System Health & Telemetry
              </h3>
              <p className="text-xs text-slate-500">
                Continuous 60s health daemon pinging all 7 connected infrastructure nodes
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('system-health')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300 bg-[#FAF9F5] hover:bg-[#F3EFE6] text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            <span>View System Health</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 7 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 pt-1">
          {MOCK_SERVICES.map(srv => (
            <div
              key={srv.id}
              className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:bg-slate-100/60 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 truncate" title={srv.name}>
                  {srv.name.split(' ')[0]} {srv.name.split(' ')[1] || ''}
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <div className="text-[11px] font-medium text-emerald-700">
                Operational
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-mono flex items-center justify-between">
                <span>{srv.lastChecked}</span>
                <span className="font-semibold text-slate-700">{srv.latencyMs}ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Journey / Automation Funnel */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-[#0D0D10]">
                Customer Journey & Automation Funnel
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                End-to-End Validation
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualizes how inquiries pass through variant validation, stock checks, and mandatory address confirmation before Shopify order creation.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            74.7% End-to-End Conversion
          </span>
        </div>

        {/* Funnel Visual Steps */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 pt-2">
          {MOCK_FUNNEL.map((step, idx) => (
            <div
              key={idx}
              className="relative p-3 rounded-xl bg-gradient-to-b from-[#FAF9F5] to-white border border-[#EAE6DF] flex flex-col justify-between hover:border-[#f7be32]/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold mb-1">
                  <span>Step {idx + 1}</span>
                  <span className="text-amber-700 font-mono">{step.percentage}%</span>
                </div>
                <div className="text-xs font-bold text-slate-800 leading-snug">
                  {step.step}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#EAE6DF]">
                <div className="text-base font-extrabold text-[#0D0D10] font-mono">
                  {step.count}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate" title={step.dropoff}>
                  {step.dropoff}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Performance Chart + Execution Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Automation Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#0D0D10]">
                Automation Executions
              </h3>
              <p className="text-xs text-slate-500">
                1,284 total executions across 8 live n8n workflows
              </p>
            </div>

            <div className="flex items-center gap-1 bg-[#FAF9F5] p-1 rounded-xl border border-[#EAE6DF] text-xs">
              {(['Today', '7 Days', '30 Days'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setChartRange(range)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    chartRange === range
                      ? 'bg-white text-[#0D0D10] font-bold shadow-2xs border border-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Bar / Area Chart */}
          <div className="h-60 w-full pt-4">
            <div className="h-44 w-full flex items-end gap-3 sm:gap-6 justify-between px-2 border-b border-slate-200">
              {MOCK_ANALYTICS.dailyExecutionTrend.map((item, i) => {
                const total = item.success + item.failed;
                const max = 320;
                const successHeight = Math.round((item.success / max) * 100);
                const failedHeight = Math.round((item.failed / max) * 100);

                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-12 bg-[#0D0D10] text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                      {item.time} · {item.success} ok / {item.failed} failed
                    </div>

                    {/* Bar Stack */}
                    <div className="w-full max-w-[28px] rounded-t-md overflow-hidden flex flex-col justify-end">
                      {item.failed > 0 && (
                        <div
                          style={{ height: `${failedHeight}%` }}
                          className="w-full bg-rose-500"
                        />
                      )}
                      <div
                        style={{ height: `${successHeight}%` }}
                        className="w-full bg-gradient-to-t from-[#e5ab1b] to-[#f7be32] group-hover:brightness-105 transition-all"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-1">
                      {item.time}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 px-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#f7be32]" />
                  <span>Successful (1,247)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-rose-500" />
                  <span>Failed (37)</span>
                </span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">
                Peak: 310 exec/hr @ 18:00
              </span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Key Execution Metrics */}
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-[#0D0D10]">
              Execution Reliability
            </h3>
            <p className="text-xs text-slate-500">
              Throughput & performance benchmarks
            </p>
          </div>

          <div className="space-y-3.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Executions</span>
                <div className="text-xl font-extrabold text-[#0D0D10] font-mono">1,284</div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                +12% today
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Success Rate</span>
                <div className="text-xl font-extrabold text-emerald-600 font-mono">97.1%</div>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">1,247 / 1,284</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Runtime</span>
                <div className="text-xl font-extrabold text-[#0D0D10] font-mono">2.8 sec</div>
              </div>
              <span className="text-xs text-slate-500 font-medium">Sub-second AI core</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('automation-analytics')}
            className="w-full py-2 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
          >
            View Full Automation Analytics →
          </button>
        </div>
      </div>

      {/* Bottom Grids: Recent WhatsApp Dialogs & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent WhatsApp Conversations */}
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-[#0D0D10]">
                Active WhatsApp Dialogs
              </h3>
              <p className="text-xs text-slate-500">
                Latest customer messages & AI intent tracking
              </p>
            </div>
            <button
              onClick={() => onNavigate('conversations')}
              className="text-xs font-bold text-[#0D0D10] hover:text-amber-700 cursor-pointer"
            >
              View All (186) →
            </button>
          </div>

          <div className="space-y-2">
            {MOCK_CONVERSATIONS.slice(0, 3).map(conv => (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv)}
                className="p-3 rounded-xl bg-slate-50/80 hover:bg-amber-50/30 border border-slate-200/70 hover:border-[#f7be32]/60 cursor-pointer transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{conv.customerName}</span>
                    <span className="text-[10px] font-mono text-slate-400">{conv.customerPhone}</span>
                  </div>
                  <StatusBadge status={conv.status} size="sm" />
                </div>
                <p className="text-xs text-slate-600 italic line-clamp-1">
                  "{conv.lastMessage}"
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/50">
                  <span className="text-slate-800 font-semibold">{conv.productInterest}</span>
                  <span>{conv.lastMessageTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Shopify Orders */}
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-[#0D0D10]">
                Recent Automated Orders
              </h3>
              <p className="text-xs text-slate-500">
                Created via WhatsApp confirmation & pushed to Shopify
              </p>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-bold text-[#0D0D10] hover:text-amber-700 cursor-pointer"
            >
              View All (42) →
            </button>
          </div>

          <div className="space-y-2">
            {MOCK_ORDERS.slice(0, 3).map(order => (
              <div
                key={order.id}
                onClick={() => onSelectOrder(order)}
                className="p-3 rounded-xl bg-slate-50/80 hover:bg-amber-50/30 border border-slate-200/70 hover:border-[#f7be32]/60 cursor-pointer transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-800">{order.id}</span>
                    <span className="text-xs font-bold text-slate-900">{order.customerName}</span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 font-mono">
                    PKR {order.amountPKR.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-slate-600 flex items-center justify-between">
                  <span>{order.productTitle} ({order.variantTitle})</span>
                  <StatusBadge status={order.orderStatus} size="sm" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/50">
                  <span className="text-emerald-700 font-medium">✓ Address Confirmed</span>
                  <span>{order.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
