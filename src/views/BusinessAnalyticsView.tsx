import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Layers,
  MapPin,
  Sparkles,
  ArrowRight,
  PieChart
} from 'lucide-react';
import { NavigationTab } from '../types';
import { MOCK_ANALYTICS } from '../data/mockData';

interface BusinessAnalyticsViewProps {
  onNavigate: (tab: NavigationTab) => void;
}

const CITY_DISTRIBUTION = [
  { city: 'Lahore', percentage: 42, orders: 184, gmv: 'PKR 1,148,000' },
  { city: 'Karachi', percentage: 28, orders: 122, gmv: 'PKR 761,000' },
  { city: 'Islamabad / Rawalpindi', percentage: 16, orders: 70, gmv: 'PKR 436,000' },
  { city: 'Faisalabad', percentage: 8, orders: 35, gmv: 'PKR 218,000' },
  { city: 'Multan & Others', percentage: 6, orders: 26, gmv: 'PKR 162,000' }
];

const REVENUE_TIMELINE = [
  { day: 'Wed (Sep 3)', whatsapp: 184000, web: 42000, total: 226000 },
  { day: 'Thu (Sep 4)', whatsapp: 215000, web: 51000, total: 266000 },
  { day: 'Fri (Sep 5)', whatsapp: 198000, web: 48000, total: 246000 },
  { day: 'Sat (Sep 6)', whatsapp: 274000, web: 64000, total: 338000 },
  { day: 'Sun (Sep 7)', whatsapp: 310000, web: 72000, total: 382000 },
  { day: 'Mon (Sep 8)', whatsapp: 289000, web: 68000, total: 357000 },
  { day: 'Tue (Sep 9)', whatsapp: 342000, web: 81000, total: 423000 }
];

export const BusinessAnalyticsView: React.FC<BusinessAnalyticsViewProps> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [hoveredDay, setHoveredDay] = useState<typeof REVENUE_TIMELINE[0] | null>(null);

  const maxRevenue = Math.max(...REVENUE_TIMELINE.map(d => d.total));

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Context */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#f7be32] text-[#0D0D10] font-bold">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              Commerce Business Analytics
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Revenue tracking, WhatsApp conversational sales conversion, and geographic order density
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#EAE6DF] text-xs shadow-2xs">
          {(['7d', '30d', '90d'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                timeRange === range
                  ? 'bg-[#f7be32] text-[#0D0D10] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Quarterly'}
            </button>
          ))}
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Gross Merchandise Value</span>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono mt-1">PKR 1.84M</div>
          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+22.4%</span> vs last month
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Average Order Value (AOV)</span>
          <div className="text-2xl font-extrabold text-amber-900 font-mono mt-1">PKR 6,240</div>
          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+8.1%</span> multi-item carts
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">COD Delivery Clearance</span>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">88.4%</div>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            +16% above industry avg
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">WhatsApp GMV Share</span>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono mt-1">68.4%</div>
          <span className="text-xs text-amber-700 font-bold mt-1 block">
            Conversational checkout dominant
          </span>
        </div>
      </div>

      {/* Revenue Trend Visualizer */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-sm font-extrabold text-[#0D0D10]">Revenue Velocity: WhatsApp AI vs Storefront</h3>
            <p className="text-xs text-slate-500">Daily gross turnover in PKR across fulfillment channels</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-amber-800">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f7be32]" />
              WhatsApp AI Assisted
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              Direct Storefront
            </span>
          </div>
        </div>

        {/* Bar Chart Visualization */}
        <div className="pt-6 pb-2">
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 border-b border-[#EAE6DF] px-2">
            {REVENUE_TIMELINE.map((item, idx) => {
              const whatsappHeight = (item.whatsapp / maxRevenue) * 100;
              const webHeight = (item.web / maxRevenue) * 100;
              const isHovered = hoveredDay?.day === item.day;

              return (
                <div
                  key={item.day}
                  onMouseEnter={() => setHoveredDay(item)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                >
                  {/* Tooltip on Hover */}
                  <div
                    className={`text-[10px] font-mono text-center mb-2 px-2 py-1 rounded bg-[#0D0D10] text-white shadow-md transition-all ${
                      isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    PKR {(item.total / 1000).toFixed(0)}k
                  </div>

                  {/* Stacked Bars */}
                  <div className="w-full max-w-[48px] flex flex-col items-center rounded-t-xl overflow-hidden shadow-2xs group-hover:brightness-105 transition-all">
                    {/* Web Bar */}
                    <div
                      style={{ height: `${webHeight * 1.8}px` }}
                      className="w-full bg-slate-800 transition-all duration-300"
                    />
                    {/* WhatsApp Bar */}
                    <div
                      style={{ height: `${whatsappHeight * 1.8}px` }}
                      className="w-full bg-[#f7be32] transition-all duration-300 border-t border-amber-300/30"
                    />
                  </div>

                  {/* Label */}
                  <span className="text-[10px] text-slate-500 font-medium mt-3 text-center truncate max-w-full">
                    {item.day.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Scale Legend */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 px-2">
            <span>0</span>
            <span>PKR 100k</span>
            <span>PKR 250k</span>
            <span>PKR 400k+</span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: City Logistics & Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Geographic Delivery Distribution */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-700" />
              <div>
                <h3 className="text-sm font-extrabold text-[#0D0D10]">Geographic Order Density</h3>
                <p className="text-xs text-slate-500">Major Pakistani destination clusters</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('address-confirmation')}
              className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Address Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {CITY_DISTRIBUTION.map(item => (
              <div key={item.city} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{item.city}</span>
                  <span className="font-mono text-slate-500">
                    {item.orders} orders ({item.percentage}%) · <span className="font-bold text-slate-800">{item.gmv}</span>
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#f7be32] h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 cols: Channel Share Composition */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs space-y-4">
          <div>
            <h3 className="text-sm font-extrabold text-[#0D0D10]">Sales Channel Composition</h3>
            <p className="text-xs text-slate-500">Conversational vs Traditional Web Storefront</p>
          </div>

          <div className="py-4 space-y-3">
            {MOCK_ANALYTICS.ordersBySource.map(entry => (
              <div key={entry.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="font-semibold text-slate-800">{entry.name}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    {entry.count} orders ({entry.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${entry.percentage}%`,
                      backgroundColor: entry.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#EAE6DF] text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-[#0D0D10]">Insight:</span> WhatsApp catalog chats convert 2.8x higher than web checkouts due to instant Urdu voice notes and address confirmation.
          </div>
        </div>
      </div>
    </div>
  );
};
