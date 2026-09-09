import React from 'react';
import { X, CheckCheck, ShoppingBag, AlertTriangle, UserCheck, RefreshCw, MessageSquare, ChevronRight } from 'lucide-react';
import { NavigationTab } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab) => void;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'order' | 'error' | 'handoff' | 'recovery' | 'whatsapp';
  unread: boolean;
  targetTab: NavigationTab;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: 'n-1',
      title: 'Shopify order workflow completed',
      description: 'Order #ML-10482 pushed to Shopify with tag "address-verified". COD amount: PKR 5,999.',
      time: '2m ago',
      type: 'order',
      unread: true,
      targetTab: 'orders'
    },
    {
      id: 'n-2',
      title: '3 Failed automation executions require review',
      description: 'Shopify API rate limit triggered in Product Validation workflow. Auto-retry pending.',
      time: '12m ago',
      type: 'error',
      unread: true,
      targetTab: 'errors-alerts'
    },
    {
      id: 'n-3',
      title: 'New human handoff requested',
      description: 'Customer Fatima Noor requested custom sleeve alterations. Assigned to Ahmed Khan.',
      time: '28m ago',
      type: 'handoff',
      unread: true,
      targetTab: 'conversations'
    },
    {
      id: 'n-4',
      title: 'Cart recovery order completed',
      description: 'Zubair Qureshi completed checkout with coupon SAVE5-WA. Recovered: PKR 5,999.',
      time: '45m ago',
      type: 'recovery',
      unread: false,
      targetTab: 'cart-recovery'
    },
    {
      id: 'n-5',
      title: 'WhatsApp delivery latency warning',
      description: 'Outbound carrier delivery latency exceeded 3,000ms for confirmation message.',
      time: '1h ago',
      type: 'whatsapp',
      unread: false,
      targetTab: 'system-health'
    }
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'handoff':
        return <UserCheck className="w-4 h-4 text-amber-600" />;
      case 'recovery':
        return <RefreshCw className="w-4 h-4 text-[#f7be32]" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4 text-sky-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-[#EAE6DF] animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-[#EAE6DF] flex items-center justify-between bg-[#FAF9F5]">
          <div>
            <h3 className="text-sm font-bold text-[#0D0D10]">Notifications</h3>
            <p className="text-xs text-slate-500">Live commerce automation activity</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllRead}
              className="text-[11px] text-amber-900 hover:text-amber-950 font-bold flex items-center gap-1 px-2 py-1 rounded hover:bg-amber-50 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {notifications.map(item => (
            <div
              key={item.id}
              onClick={() => {
                onNavigate(item.targetTab);
                onClose();
              }}
              className={`p-4 hover:bg-amber-50/20 cursor-pointer transition-colors flex items-start gap-3 relative ${
                item.unread ? 'bg-amber-50/40' : ''
              }`}
            >
              <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs shrink-0">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className="text-xs font-semibold text-slate-900 truncate">{item.title}</h4>
                  <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.description}</p>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-300 self-center shrink-0" />

              {item.unread && (
                <span className="absolute top-4 right-2 w-2 h-2 rounded-full bg-[#f7be32]" />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-[#E9E5EF] text-center">
          <p className="text-[11px] text-slate-500">
            Automated alerts streaming from n8n & Shopify Webhooks
          </p>
        </div>
      </div>
    </div>
  );
};
