import React, { useState } from 'react';
import {
  Bell,
  MessageSquare,
  Mail,
  Zap,
  AlertOctagon,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Send
} from 'lucide-react';

interface NotificationSettingsViewProps {
  onToast: (title: string, message: string) => void;
}

interface AlertTrigger {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  enabled: boolean;
  channels: ('whatsapp' | 'email' | 'slack')[];
}

export const NotificationSettingsView: React.FC<NotificationSettingsViewProps> = ({ onToast }) => {
  const [triggers, setTriggers] = useState<AlertTrigger[]>([
    {
      id: 'trig-fail',
      title: 'Workflow Execution Critical Failure',
      description: 'Dispatches emergency alert if an n8n microservice fails or exceeds retry threshold.',
      severity: 'critical',
      enabled: true,
      channels: ['whatsapp', 'slack']
    },
    {
      id: 'trig-large-order',
      title: 'High-Value Order Placed (> PKR 25,000)',
      description: 'Sends real-time notification to sales team for VIP customer priority handling.',
      severity: 'info',
      enabled: true,
      channels: ['whatsapp', 'email']
    },
    {
      id: 'trig-low-stock',
      title: 'Low Inventory Stock Warning (< 3 units)',
      description: 'Alerts inventory manager to restock SKU before WhatsApp customers order out-of-stock items.',
      severity: 'warning',
      enabled: true,
      channels: ['email', 'slack']
    },
    {
      id: 'trig-handoff-sla',
      title: 'Human Handoff SLA Exceeded (> 5 mins)',
      description: 'Alerts shift supervisor when a customer waiting for human support is unattended.',
      severity: 'warning',
      enabled: true,
      channels: ['whatsapp', 'slack']
    },
    {
      id: 'trig-rate-limit',
      title: 'Shopify / Meta API Rate Limit Warning',
      description: 'Notifies technical admin if 429 Too Many Requests response is intercepted.',
      severity: 'critical',
      enabled: true,
      channels: ['slack']
    },
    {
      id: 'trig-unverified-addr',
      title: 'Repeated Invalid Address Rejections',
      description: 'Triggers when a customer fails address verification 3 consecutive times.',
      severity: 'warning',
      enabled: false,
      channels: ['whatsapp']
    }
  ]);

  const [adminPhone, setAdminPhone] = useState('+92 300 1234567');
  const [adminEmail, setAdminEmail] = useState('admin@millilegacy.com');
  const [slackWebhook, setSlackWebhook] = useState('https://hooks.slack.com/services/...');

  const toggleTrigger = (id: string) => {
    setTriggers(prev =>
      prev.map(t => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const handleSendTest = () => {
    onToast(
      'Test Alert Dispatched',
      `Sent test ping to WhatsApp (${adminPhone}) and Email (${adminEmail}).`
    );
  };

  const handleSave = () => {
    onToast(
      'Notification Preferences Saved',
      'All alert routing rules and recipient channels have been updated.'
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Context */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#f7be32] text-[#0D0D10] font-bold">
              <Bell className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              Notification Preferences & Alerts
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure multi-channel dispatch rules for critical incidents, high-value orders, and SLA breaches
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSendTest}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#EAE6DF] bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <Send className="w-3.5 h-3.5 text-amber-700" />
            <span>Send Test Alert</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-extrabold transition-all cursor-pointer shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>

      {/* Recipient Channels Setup */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-extrabold text-[#0D0D10]">Alert Delivery Destinations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Admin WhatsApp Alert Number</span>
            </label>
            <input
              type="text"
              value={adminPhone}
              onChange={e => setAdminPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] outline-none focus:border-[#f7be32]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-700" />
              <span>Operations Alert Email</span>
            </label>
            <input
              type="email"
              value={adminEmail}
              onChange={e => setAdminEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] outline-none focus:border-[#f7be32]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-purple-600" />
              <span>Slack Emergency Webhook</span>
            </label>
            <input
              type="text"
              value={slackWebhook}
              onChange={e => setSlackWebhook(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] outline-none focus:border-[#f7be32]"
            />
          </div>
        </div>
      </div>

      {/* Trigger Rules List */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-[#EAE6DF] bg-[#FAF9F5] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-[#0D0D10]">Automated Incident Triggers</h3>
            <p className="text-xs text-slate-500">Toggle active rules and designated delivery lanes</p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-[#EAE6DF]">
            {triggers.filter(t => t.enabled).length} of {triggers.length} Active
          </span>
        </div>

        <div className="divide-y divide-[#EAE6DF]">
          {triggers.map(trigger => (
            <div
              key={trigger.id}
              className="p-4 sm:p-5 flex items-center justify-between gap-4 flex-wrap hover:bg-amber-50/20 transition-colors"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      trigger.severity === 'critical'
                        ? 'bg-rose-500'
                        : trigger.severity === 'warning'
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                  />
                  <h4 className="text-xs font-extrabold text-[#0D0D10]">{trigger.title}</h4>
                </div>
                <p className="text-xs text-slate-600">{trigger.description}</p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Routes:</span>
                  {trigger.channels.map(ch => (
                    <span
                      key={ch}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF9F5] border border-[#EAE6DF] text-slate-700 capitalize"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => toggleTrigger(trigger.id)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  trigger.enabled ? 'bg-[#f7be32]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    trigger.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
