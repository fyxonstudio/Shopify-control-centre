import React, { useState, useMemo } from 'react';
import { Search, X, MessageSquare, ShoppingBag, Boxes, Cpu, AlertCircle, ArrowRight } from 'lucide-react';
import { NavigationTab } from '../../types';
import {
  MOCK_CONVERSATIONS,
  MOCK_ORDERS,
  MOCK_PRODUCTS,
  MOCK_WORKFLOWS,
  MOCK_EXECUTION_LOGS
} from '../../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab) => void;
  onSelectOrder?: (orderId: string) => void;
  onSelectConversation?: (convId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectOrder,
  onSelectConversation
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase().trim();

    const orders = MOCK_ORDERS.filter(
      o =>
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.productTitle.toLowerCase().includes(q) ||
        o.deliveryAddress.city.toLowerCase().includes(q)
    );

    const conversations = MOCK_CONVERSATIONS.filter(
      c =>
        c.customerName.toLowerCase().includes(q) ||
        c.productInterest.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q) ||
        c.customerPhone.toLowerCase().includes(q)
    );

    const products = MOCK_PRODUCTS.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q)
    );

    const workflows = MOCK_WORKFLOWS.filter(
      w =>
        w.name.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q)
    );

    const executions = MOCK_EXECUTION_LOGS.filter(
      e =>
        e.executionId.toLowerCase().includes(q) ||
        e.workflow.toLowerCase().includes(q)
    );

    return { orders, conversations, products, workflows, executions };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#EAE6DF] w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#EAE6DF] flex items-center gap-3 bg-[#FAF9F5]">
          <Search className="w-5 h-5 text-amber-600" />
          <input
            type="text"
            placeholder="Search orders, customers, products, workflows, execution IDs..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-sm text-[#0D0D10] placeholder:text-slate-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1 bg-slate-200/60 rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!query.trim() && (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs">Type anything to search across Millilegacy Automation Control Center</p>
              <div className="flex justify-center gap-2 pt-2">
                <span className="text-[11px] bg-[#FAF9F5] border border-[#EAE6DF] px-2 py-0.5 rounded text-slate-600 font-mono">
                  Try: "Ahmed", "#ML-10482", "PCS-BLK", "Workflow"
                </span>
              </div>
            </div>
          )}

          {results && (
            <>
              {/* Orders */}
              {results.orders.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                    <span>Orders ({results.orders.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.orders.map(order => (
                      <div
                        key={order.id}
                        onClick={() => {
                          onNavigate('orders');
                          if (onSelectOrder) onSelectOrder(order.id);
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF9F5] border border-transparent hover:border-[#f7be32]/40 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-amber-800 font-mono">{order.id}</span>
                            <span className="text-xs font-semibold text-slate-800">{order.customerName}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                              {order.orderStatus}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            {order.productTitle} ({order.variantTitle}) · PKR {order.amountPKR.toLocaleString()}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conversations */}
              {results.conversations.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                    <span>WhatsApp Conversations ({results.conversations.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.conversations.map(conv => (
                      <div
                        key={conv.id}
                        onClick={() => {
                          onNavigate('conversations');
                          if (onSelectConversation) onSelectConversation(conv.id);
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-200 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-800">{conv.customerName}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{conv.customerPhone}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-medium">
                              {conv.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 italic truncate max-w-md">
                            "{conv.lastMessage}"
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products */}
              {results.products.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Boxes className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Catalog Products ({results.products.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.products.map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          onNavigate('product-inventory');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-200/60 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-800">{prod.title}</span>
                            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                              {prod.sku}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                              prod.inventoryCount > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                            }`}>
                              {prod.inventoryCount} in stock
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            {prod.color} / {prod.size} · PKR {prod.pricePKR.toLocaleString()}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Workflows */}
              {results.workflows.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-amber-600" />
                    <span>Workflows ({results.workflows.length})</span>
                  </div>
                  <div className="space-y-1">
                    {results.workflows.map(wf => (
                      <div
                        key={wf.id}
                        onClick={() => {
                          onNavigate('workflows');
                          onClose();
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF9F5] border border-[#f7be32]/30 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-800">{wf.name}</span>
                            <span className="text-[10px] bg-[#f7be32]/20 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                              {wf.successRate}% success
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate max-w-md">{wf.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No match */}
              {results.orders.length === 0 &&
                results.conversations.length === 0 &&
                results.products.length === 0 &&
                results.workflows.length === 0 &&
                results.executions.length === 0 && (
                  <div className="py-8 text-center text-slate-400">
                    <AlertCircle className="w-8 h-8 mx-auto text-slate-300 mb-1" />
                    <p className="text-xs">No matching results found for "{query}"</p>
                  </div>
                )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#FAF9F5] border-t border-[#EAE6DF] text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Navigation: Press <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono">Esc</kbd> to close</span>
          </div>
          <span className="text-slate-500 font-medium">Millilegacy Fast Indexer</span>
        </div>
      </div>
    </div>
  );
};
