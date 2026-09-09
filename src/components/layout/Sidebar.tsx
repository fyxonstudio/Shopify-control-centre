import React from 'react';
import {
  LayoutDashboard,
  Activity,
  GitBranch,
  MessageSquare,
  ShoppingBag,
  RotateCcw,
  Boxes,
  MapPin,
  HeartPulse,
  AlertOctagon,
  FileCode,
  Users2,
  ScrollText,
  BarChart3,
  TrendingUp,
  UserCog,
  Plug,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { NavigationTab } from '../../types';

export interface SidebarProps {
  activeTab: NavigationTab;
  onNavigate?: (tab: NavigationTab) => void;
  onSelectTab?: (tab: NavigationTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenTour?: () => void;
}

interface NavGroup {
  groupLabel: string;
  items: {
    id: NavigationTab;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onNavigate,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
  onOpenTour
}) => {
  const navGroups: NavGroup[] = [
    {
      groupLabel: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'monitoring-overview', label: 'Monitoring Overview', icon: Activity, badge: 'Live', badgeColor: 'bg-emerald-500' }
      ]
    },
    {
      groupLabel: 'AUTOMATION',
      items: [
        { id: 'workflows', label: 'Workflows', icon: GitBranch, badge: '8' },
        { id: 'conversations', label: 'Conversations', icon: MessageSquare, badge: '186' },
        { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: '42' },
        { id: 'cart-recovery', label: 'Cart Recovery', icon: RotateCcw, badge: '8' },
        { id: 'product-inventory', label: 'Product & Inventory', icon: Boxes },
        { id: 'address-confirmation', label: 'Address Confirmation', icon: MapPin, badge: 'Core', badgeColor: 'bg-[#f7be32] text-[#0D0D10]' }
      ]
    },
    {
      groupLabel: 'MONITORING',
      items: [
        { id: 'system-health', label: 'System Health', icon: HeartPulse, badge: '99.9%', badgeColor: 'bg-emerald-500' },
        { id: 'errors-alerts', label: 'Errors & Alerts', icon: AlertOctagon, badge: '3', badgeColor: 'bg-rose-500' },
        { id: 'execution-logs', label: 'Execution Logs', icon: FileCode },
        { id: 'team-activity', label: 'Team Activity', icon: Users2, badge: '6' },
        { id: 'audit-log', label: 'Audit Log', icon: ScrollText }
      ]
    },
    {
      groupLabel: 'ANALYTICS',
      items: [
        { id: 'business-analytics', label: 'Business Analytics', icon: BarChart3 },
        { id: 'automation-analytics', label: 'Automation Analytics', icon: TrendingUp }
      ]
    },
    {
      groupLabel: 'SETTINGS',
      items: [
        { id: 'team', label: 'Team', icon: UserCog },
        { id: 'integrations', label: 'Integrations', icon: Plug, badge: '6' },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  const handleItemClick = (id: NavigationTab) => {
    if (onNavigate) {
      onNavigate(id);
    } else if (onSelectTab) {
      onSelectTab(id);
    }
    if (isMobileOpen && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 lg:static lg:z-auto flex flex-col bg-white border-r border-[#EAE6DF] transition-all duration-300 ease-in-out shrink-0 h-full ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 border-b border-[#EAE6DF] flex items-center justify-between bg-white shrink-0">
          {!isCollapsed ? (
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Millilegacy Logo Mark */}
              <div className="w-9 h-9 rounded-xl bg-[#f7be32] flex items-center justify-center text-[#0D0D10] shadow-md shadow-[#f7be32]/20 shrink-0 font-extrabold text-base border border-[#e5ab1b]">
                <Sparkles className="w-5 h-5 text-[#0D0D10]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-extrabold tracking-tight text-[#0D0D10]">
                    MILLILEGACY
                  </span>
                </div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-amber-700 truncate">
                  Control Center
                </div>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 mx-auto rounded-xl bg-[#f7be32] flex items-center justify-center text-[#0D0D10] shadow-md shadow-[#f7be32]/20 border border-[#e5ab1b]">
              <Sparkles className="w-5 h-5 text-[#0D0D10]" />
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map(group => (
            <div key={group.groupLabel} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  {group.groupLabel}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      title={isCollapsed ? item.label : undefined}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group relative cursor-pointer ${
                        isActive
                          ? 'bg-[#f7be32]/15 text-[#0D0D10] font-bold border border-[#f7be32]/50 shadow-xs'
                          : 'text-slate-600 hover:text-[#0D0D10] hover:bg-slate-50 border border-transparent'
                      } ${isCollapsed ? 'justify-center px-2' : ''}`}
                    >
                      <Icon
                        className={`w-4 h-4 transition-colors shrink-0 ${
                          isActive
                            ? 'text-amber-700'
                            : 'text-slate-400 group-hover:text-slate-700'
                        }`}
                      />

                      {!isCollapsed && (
                        <span className="flex-1 text-left truncate">{item.label}</span>
                      )}

                      {!isCollapsed && item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            item.badgeColor
                              ? `${item.badgeColor} text-white`
                              : isActive
                              ? 'bg-[#f7be32] text-[#0D0D10]'
                              : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}

                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[#f7be32]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Sidebar: System Status & User Info */}
        <div className="p-3 border-t border-[#EAE6DF] bg-[#FAF9F5] space-y-3 shrink-0">
          {/* Status Indicator */}
          {!isCollapsed ? (
            <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-emerald-800">
                  All Systems Operational
                </span>
              </div>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          ) : (
            <div className="flex justify-center" title="All Systems Operational">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
            </div>
          )}

          {/* User Profile */}
          {!isCollapsed ? (
            <div className="flex items-center gap-2.5 pt-1">
              <div className="w-8 h-8 rounded-full bg-[#f7be32] text-[#0D0D10] border border-[#e5ab1b] flex items-center justify-center font-bold text-xs shadow-xs">
                ML
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-[#0D0D10] truncate">Millilegacy Admin</div>
                <div className="text-[10px] text-slate-500 truncate">admin@millilegacy.com</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-[#f7be32] text-[#0D0D10] border border-[#e5ab1b] flex items-center justify-center font-bold text-xs shadow-xs">
                ML
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
