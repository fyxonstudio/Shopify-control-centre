import React, { useState } from 'react';
import {
  Boxes,
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ShoppingBag,
  ExternalLink,
  Layers,
  Bot,
  User,
  Sliders
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';
import { ProductCatalogItem } from '../types';

interface ProductInventoryViewProps {
  onToast: (title: string, message: string) => void;
}

export const ProductInventoryView: React.FC<ProductInventoryViewProps> = ({ onToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScenario, setSelectedScenario] = useState<'instock' | 'outofstock'>('instock');
  const [filterStatus, setFilterStatus] = useState<'All' | 'In Stock' | 'Low Stock' | 'Out of Stock'>('All');

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.color.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === 'All') return matchesSearch;
    return matchesSearch && p.status === filterStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Context Banner */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-2xs">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#f7be32] text-[#0D0D10] font-bold">
                <Boxes className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-extrabold text-[#0D0D10]">
                WhatsApp Catalog & Variant Inventory Validation
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 font-bold border border-amber-200">
                Overselling Prevention Engine
              </span>
            </div>
            <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
              When a customer shares a WhatsApp catalog item or requests a specific shade and size (e.g. <em className="text-amber-900 font-semibold">"Mujhe ye black wala chahiye, XL"</em>), the AI extracts exact attributes, verifies live Shopify inventory, and responds with real-time stock or alternative recommendations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToast('Catalog Synced', 'Meta Commerce Catalog synchronized with Shopify in 1.4s.')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync Meta Catalog</span>
            </button>
          </div>
        </div>

        {/* 4 Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Catalog SKUs Synced</span>
            <div className="text-xl font-extrabold text-[#0D0D10] font-mono mt-1">184 Variants</div>
            <p className="text-[10px] text-slate-500 mt-1">Synced to Meta Graph API</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Inventory Checks Today</span>
            <div className="text-xl font-extrabold text-emerald-600 font-mono mt-1">512 Checks</div>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">99.6% Accuracy</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Alternative Upsells</span>
            <div className="text-xl font-extrabold text-amber-900 font-mono mt-1">14 Converted</div>
            <p className="text-[10px] text-slate-500 mt-1">Saved from stockouts</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Avg Query Latency</span>
            <div className="text-xl font-extrabold text-[#0D0D10] font-mono mt-1">184 ms</div>
            <p className="text-[10px] text-slate-500 mt-1">Direct Shopify GraphQL</p>
          </div>
        </div>
      </div>

      {/* Interactive Scenario Tester (In-Stock vs Out-of-Stock) */}
      <div className="bg-gradient-to-br from-amber-50/20 via-white to-amber-50/10 rounded-2xl border-2 border-[#f7be32]/40 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-extrabold text-[#0D0D10]">
              Interactive Catalog & Stock Validation Simulator
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#EAE6DF] text-xs">
            <button
              onClick={() => setSelectedScenario('instock')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                selectedScenario === 'instock'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Scenario A: In-Stock (Black / XL)
            </button>
            <button
              onClick={() => setSelectedScenario('outofstock')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                selectedScenario === 'outofstock'
                  ? 'bg-[#f7be32] text-[#0D0D10] shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Scenario B: Out-of-Stock (White / M)
            </button>
          </div>
        </div>

        {selectedScenario === 'instock' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Scenario A: Customer Query */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-emerald-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  Customer Inbound Request
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Catalog Item Attached
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    BLK
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Premium Cotton Shirt</div>
                    <div className="text-[11px] text-slate-500">PKR 5,999 · SKU: PCS-BLK</div>
                  </div>
                </div>
                <div className="font-semibold text-slate-800 italic">
                  Customer: "Mujhe ye black wala chahiye, XL size mein."
                </div>
              </div>

              {/* AI Agent Automated Response */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-amber-600" />
                    AI Agent Autonomous Response
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Response: 380ms</span>
                </div>
                <p className="text-slate-800 leading-relaxed font-medium">
                  "Ji Ahmed, Black / XL available hai (7 pieces in stock). Price PKR 5,999 with Free Cash on Delivery. Would you like me to book this for you?"
                </p>
              </div>
            </div>

            {/* Scenario A: System Analysis */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-emerald-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-700" />
                  System Analysis & Shopify Match
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                  Status: AVAILABLE
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500">Product Title:</span>
                  <span className="font-bold text-slate-900">Premium Cotton Shirt</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500">Extracted Attributes:</span>
                  <span className="font-bold text-amber-900">Color: Black · Size: XL</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500">Resolved SKU:</span>
                  <span className="font-mono font-bold text-slate-900">PCS-BLK-XL</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-emerald-800">
                  <span className="font-medium">Shopify Physical Inventory:</span>
                  <span className="font-mono font-extrabold text-sm">7 Available</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Variant matched & stock verified. Proceeding directly to address collection.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Scenario B: Customer Query */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-rose-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  Customer Inbound Request
                </span>
                <span className="text-[10px] font-mono text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Variant Out of Stock
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
                <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs border border-slate-200">
                    WHT
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Premium Cotton Shirt</div>
                    <div className="text-[11px] text-slate-500">PKR 5,999 · SKU: PCS-WHT</div>
                  </div>
                </div>
                <div className="font-semibold text-slate-800 italic">
                  Customer: "White shirt Medium size mein available hai?"
                </div>
              </div>

              {/* AI Agent Intelligent Alternative Upsell */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-amber-600" />
                    AI Alternative Variant Suggestion
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Response: 410ms</span>
                </div>
                <p className="text-slate-800 leading-relaxed font-medium">
                  "White / Medium currently out of stock hai. Lekin White / Large hamare paas 8 pieces available hain aur Black / Medium bhi in stock hai. Would you like to check measurements for Large?"
                </p>
              </div>
            </div>

            {/* Scenario B: System Analysis */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-rose-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-700" />
                  System Analysis & Alternative Finder
                </span>
                <span className="text-[10px] font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-bold">
                  Stock: 0 (REJECTED)
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500">Product Title:</span>
                  <span className="font-bold text-slate-900">Premium Cotton Shirt</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500">Requested Variant:</span>
                  <span className="font-bold text-rose-600">Color: White · Size: M</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500">Resolved SKU:</span>
                  <span className="font-mono font-bold text-slate-900">PCS-WHT-M</span>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-between text-rose-800">
                  <span className="font-medium">Shopify Inventory:</span>
                  <span className="font-mono font-extrabold text-sm">0 Available</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Zero blind orders rule applied. Customer offered alternative size Large without losing the lead.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Catalog & Inventory Table */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-[#EAE6DF] flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-base font-extrabold text-[#0D0D10]">
              Shopify & Meta Catalog Master Table
            </h3>
            <p className="text-xs text-slate-500">
              Live inventory levels mapped against WhatsApp Catalog SKU indices
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search SKU or title..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-[#EAE6DF] bg-[#FAF9F5] text-xs outline-none focus:border-[#f7be32] w-44 sm:w-56"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1 bg-[#FAF9F5] p-1 rounded-xl border border-[#EAE6DF] text-xs">
              {(['All', 'In Stock', 'Low Stock', 'Out of Stock'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    filterStatus === status
                      ? 'bg-white text-amber-950 font-bold shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-[#EAE6DF] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Product Title</th>
                <th className="py-3 px-4">SKU Code</th>
                <th className="py-3 px-4">Color</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Inventory</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Checked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]">
              {filteredProducts.map(prod => (
                <tr key={prod.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{prod.title}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{prod.category}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700 font-bold">
                    {prod.sku}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {prod.color}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {prod.size}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900 font-mono">
                    PKR {prod.pricePKR.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {prod.inventoryCount} units
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={prod.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {prod.lastChecked}
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
