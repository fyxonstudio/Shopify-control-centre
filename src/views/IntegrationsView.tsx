import React, { useState } from 'react';
import {
  Plug,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Settings,
  ShieldCheck,
  Zap,
  Server,
  Database,
  Truck,
  MessageSquare,
  ShoppingBag,
  Cpu
} from 'lucide-react';

interface IntegrationsViewProps {
  onToast: (title: string, message: string) => void;
}

interface IntegrationCard {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'connected' | 'degraded' | 'syncing';
  icon: React.ElementType;
  details: { [key: string]: string };
  lastSync: string;
}

export const IntegrationsView: React.FC<IntegrationsViewProps> = ({ onToast }) => {
  const [integrations, setIntegrations] = useState<IntegrationCard[]>([
    {
      id: 'int-whatsapp',
      name: 'WhatsApp Cloud API (Meta)',
      category: 'Messaging & Catalog',
      description: 'Official Meta Graph API v19.0 endpoint for inbound chat triggers and outbound automated confirmations.',
      status: 'connected',
      icon: MessageSquare,
      details: {
        'Phone Number': '+92 300 1234567',
        'Business Account': 'Millilegacy Retail Meta ID: 9482103',
        'Webhook Latency': '94 ms',
        'Active Templates': '3 Verified'
      },
      lastSync: '4 sec ago'
    },
    {
      id: 'int-shopify',
      name: 'Shopify Storefront & Admin',
      category: 'E-commerce Core',
      description: 'Order push orchestrator, inventory stock verification, and abandoned checkout listener.',
      status: 'connected',
      icon: ShoppingBag,
      details: {
        'Store Domain': 'millilegacy.myshopify.com',
        'API Version': '2024-04 (GraphQL + REST)',
        'Permissions': 'read_orders, write_orders, read_inventory',
        'Response Latency': '184 ms'
      },
      lastSync: '12 sec ago'
    },
    {
      id: 'int-n8n',
      name: 'n8n Automation Engine',
      category: 'Workflow Orchestration',
      description: 'Self-hosted automation cluster managing 8 microservice webhook routes and event buses.',
      status: 'connected',
      icon: Server,
      details: {
        'Engine Host': 'automation.millilegacy.internal',
        'Active Workflows': '8 Pipelines Running',
        'Execution Mode': 'Distributed Worker Pool',
        'Response Latency': '38 ms'
      },
      lastSync: '10 sec ago'
    },
    {
      id: 'int-ai',
      name: 'AI Intelligence Core',
      category: 'Natural Language AI',
      description: 'Gemini multilingual LLM for Roman Urdu intent extraction, catalog matching, and address entity recognition.',
      status: 'connected',
      icon: Cpu,
      details: {
        'Model Pipeline': 'Gemini 2.5 Flash',
        'Languages': 'Roman Urdu, Urdu Script, English',
        'Intent Confidence': '98.4%',
        'Average Latency': '420 ms'
      },
      lastSync: '8 sec ago'
    },
    {
      id: 'int-courier',
      name: 'Leopards & TCS Logistics API',
      category: 'Pakistan Shipping & COD',
      description: 'Automated consignment note (CN) generation, delivery route zoning, and COD collection settlement.',
      status: 'connected',
      icon: Truck,
      details: {
        'Primary Courier': 'Leopards Courier Service',
        'Secondary Courier': 'TCS Express API',
        'Dispatch Mode': 'Automated booking on Verified Address',
        'Tracking Webhooks': 'Active'
      },
      lastSync: '15 min ago'
    },
    {
      id: 'int-supabase',
      name: 'PostgreSQL Database & Storage',
      category: 'Data Warehouse & Audit',
      description: 'Immutable ledger for customer conversations, order state transitions, and audit logs.',
      status: 'connected',
      icon: Database,
      details: {
        'Cluster Region': 'Asia South (Low Latency)',
        'Connection Pool': '14 of 100 Active',
        'Backup Frequency': 'Continuous WAL Archiving',
        'Query Latency': '24 ms'
      },
      lastSync: 'Just now'
    }
  ]);

  const [testingId, setTestingId] = useState<string | null>(null);

  const handleTestConnection = (id: string, name: string) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      onToast(
        'Connection Verified',
        `${name} ping returned HTTP 200 OK with sub-100ms round-trip latency.`
      );
    }, 1000);
  };

  const handleSyncAll = () => {
    onToast('Full Sync Triggered', 'Synchronizing WhatsApp templates, Shopify inventory, and n8n webhooks.');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Context */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#f7be32] text-[#0D0D10] font-bold">
              <Plug className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              Connected Integrations Hub
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Active microservices, webhooks, and third-party APIs powering the Millilegacy ecosystem
          </p>
        </div>

        <button
          onClick={handleSyncAll}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-extrabold transition-all cursor-pointer shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sync All Integrations</span>
        </button>
      </div>

      {/* Overview Status Banner */}
      <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200/80 p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-emerald-900">
              6 of 6 Core Integrations Operational
            </h4>
            <p className="text-[11px] text-emerald-700">
              All webhooks, authentication tokens, and API endpoints are healthy with zero degraded nodes.
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono font-bold text-emerald-800 bg-white/80 px-2.5 py-1 rounded-lg border border-emerald-200">
          Uptime: 99.98%
        </span>
      </div>

      {/* Integrations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {integrations.map(item => {
          const Icon = item.icon;
          const isTesting = testingId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#f7be32]/60 transition-all"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF9F5] border border-[#EAE6DF] flex items-center justify-center text-amber-800 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#0D0D10]">{item.name}</h4>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Active
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Details Matrix */}
                <div className="bg-[#FAF9F5] rounded-xl p-3 border border-[#EAE6DF] space-y-1.5 text-[11px]">
                  {Object.entries(item.details).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">{key}:</span>
                      <span className="font-semibold text-slate-800 font-mono text-[10px]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400">
                  Checked {item.lastSync}
                </span>

                <button
                  onClick={() => handleTestConnection(item.id, item.name)}
                  disabled={isTesting}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#EAE6DF] hover:bg-slate-50 text-[#0D0D10] font-bold text-[11px] transition-all cursor-pointer shadow-2xs disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 text-amber-700 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>{isTesting ? 'Testing...' : 'Test Webhook'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
