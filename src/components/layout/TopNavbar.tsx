import React, { useState } from 'react';
import {
  Menu,
  Search,
  Calendar,
  Bell,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Play,
  HelpCircle,
  ExternalLink,
  User,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface TopNavbarProps {
  activeTab: NavigationTab;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenTour: () => void;
  onToggleMobileSidebar: () => void;
  onNavigate: (tab: NavigationTab) => void;
  dateRange: string;
  onChangeDateRange: (range: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  onOpenSearch,
  onOpenNotifications,
  onOpenTour,
  onToggleMobileSidebar,
  onNavigate,
  dateRange,
  onChangeDateRange
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Dashboard Overview', subtitle: 'AI-Powered Commerce Automation & Real-Time Monitoring' };
      case 'monitoring-overview':
        return { title: 'Monitoring Command Center', subtitle: 'Unified observability across engines, queues, and team activities' };
      case 'workflows':
        return { title: 'Automation Workflows', subtitle: '8 active pipelines executing across WhatsApp, n8n, and Shopify' };
      case 'conversations':
        return { title: 'WhatsApp Conversations', subtitle: 'Live customer dialogs, intent extraction & automated fulfillment' };
      case 'orders':
        return { title: 'Commerce Orders', subtitle: 'Shopify order orchestration, COD validation & delivery statuses' };
      case 'cart-recovery':
        return { title: 'Cart Abandonment Recovery', subtitle: 'Automated WhatsApp recovery reminders and converted checkouts' };
      case 'product-inventory':
        return { title: 'Product & Inventory Validation', subtitle: 'Catalog SKU mapping, variant validation & Shopify stock checks' };
      case 'address-confirmation':
        return { title: 'Address Confirmation Center', subtitle: 'Standardized delivery formatting & mandatory customer verification' };
      case 'system-health':
        return { title: 'System Infrastructure Health', subtitle: 'Telemetry, API latencies, and uptime across connected engines' };
      case 'errors-alerts':
        return { title: 'Errors & Alert Center', subtitle: 'Active incidents, rate limit throttling & automated retry queues' };
      case 'execution-logs':
        return { title: 'Technical Execution Logs', subtitle: 'Microservice node execution histories and payload traces' };
      case 'team-activity':
        return { title: 'Team Activity & Handoffs', subtitle: 'Live human rep performance, escalations, and resolved tickets' };
      case 'audit-log':
        return { title: 'Enterprise Audit Trail', subtitle: 'Immutable chronological event records across all actors' };
      case 'business-analytics':
        return { title: 'Commerce Business Analytics', subtitle: 'Revenue, AOV, order volume trends, and channel performance' };
      case 'automation-analytics':
        return { title: 'Automation Efficiency Analytics', subtitle: 'Throughput, failure rates, and autonomous AI resolution ratios' };
      case 'team':
        return { title: 'Team Management', subtitle: 'Roles, active assignments, and access permissions' };
      case 'integrations':
        return { title: 'Connected Integrations', subtitle: 'Shopify, WhatsApp Cloud API, n8n, AI Model, and Supabase' };
      case 'notifications':
        return { title: 'Notification Preferences', subtitle: 'Dispatch rules for team alerts, Slack, and WhatsApp triggers' };
      case 'settings':
        return { title: 'Control Center Settings', subtitle: 'Business parameters, fallback policies, and operational thresholds' };
      default:
        return { title: 'Automation Control Center', subtitle: 'MILLILEGACY' };
    }
  };

  const { title, subtitle } = getPageTitle();

  return (
    <header className="h-18 bg-white border-b border-[#EAE6DF] px-4 lg:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Menu Trigger + Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base lg:text-lg font-extrabold text-[#0D0D10] tracking-tight truncate">
              {title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF9F5] text-amber-800 border border-[#EAE6DF]">
              v2.4
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate hidden md:block">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Center/Right Actions */}
      <div className="flex items-center gap-2.5">
        {/* Global Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF9F5] hover:bg-slate-100 border border-[#EAE6DF] text-slate-500 hover:text-slate-800 text-xs transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden md:inline font-medium">Search anything...</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400">
            ⌘K
          </kbd>
        </button>

        {/* Date Range Selector */}
        <div className="relative">
          <button
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF9F5] hover:bg-slate-100 border border-[#EAE6DF] text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{dateRange}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showDateDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-[#EAE6DF] p-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              {['Today', 'Last 7 days', 'Last 30 days', 'This Month'].map(range => (
                <button
                  key={range}
                  onClick={() => {
                    onChangeDateRange(range);
                    setShowDateDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    dateRange === range
                      ? 'bg-[#f7be32]/20 text-[#0D0D10] font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Operational Status Pill */}
        <div
          onClick={() => onNavigate('system-health')}
          className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 hover:bg-emerald-100/60 transition-colors cursor-pointer"
          title="Click to view full System Health dashboard"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold text-emerald-800">
            All Systems Operational
          </span>
          <span className="text-[10px] text-emerald-600 font-mono">
            184ms
          </span>
        </div>

        {/* Presentation Tour Trigger Button */}
        <button
          onClick={onOpenTour}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f7be32]/20 hover:bg-[#f7be32]/30 border border-[#f7be32]/50 text-[#0D0D10] text-xs font-bold transition-all cursor-pointer shadow-2xs"
          title="Open 10-step client presentation roadmap"
        >
          <Play className="w-3 h-3 text-amber-700 fill-amber-700" />
          <span>Tour Guide</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-[#EAE6DF] transition-colors cursor-pointer"
            title="Open notifications"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f7be32] text-[#0D0D10] text-[9px] font-extrabold rounded-full flex items-center justify-center border border-white shadow-xs">
              3
            </span>
          </button>
        </div>

        {/* Admin Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#f7be32] text-[#0D0D10] border border-[#e5ab1b] flex items-center justify-center font-bold text-xs shadow-xs">
              ML
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-[#0D0D10] leading-tight">Millilegacy</div>
              <div className="text-[10px] text-slate-400">Master Owner</div>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#EAE6DF] p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <div className="text-xs font-bold text-slate-900">Millilegacy Account</div>
                <div className="text-[10px] text-slate-500 font-mono">admin@millilegacy.com</div>
              </div>
              <button
                onClick={() => {
                  onNavigate('team');
                  setShowUserDropdown(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Team & Roles</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('settings');
                  setShowUserDropdown(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span>Automation Settings</span>
              </button>
              <button
                onClick={() => {
                  onOpenTour();
                  setShowUserDropdown(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#0D0D10] font-bold hover:bg-[#f7be32]/20 rounded-lg transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Presentation Walkthrough</span>
              </button>
              <div className="border-t border-slate-100 my-1" />
              <div className="px-3 py-1.5 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Millilegacy Client v2.4</span>
                <span className="text-emerald-600 font-bold">● Active</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
