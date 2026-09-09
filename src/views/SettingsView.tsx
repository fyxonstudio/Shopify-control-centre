import React, { useState } from 'react';
import {
  Settings,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Sliders,
  Store,
  MessageSquare,
  Lock,
  RotateCcw,
  Save
} from 'lucide-react';

interface SettingsViewProps {
  onToast: (title: string, message: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onToast }) => {
  const [brandName, setBrandName] = useState('Millilegacy');
  const [tagline, setTagline] = useState('Automated WhatsApp Commerce & Operations Control Center');
  const [currency, setCurrency] = useState('PKR');
  const [timezone, setTimezone] = useState('Asia/Karachi (PKT, UTC+5)');
  const [shopifyStore, setShopifyStore] = useState('millilegacy.myshopify.com');
  const [whatsappNumber, setWhatsappNumber] = useState('+92 300 1234567');
  const [codTag, setCodTag] = useState('whatsapp-verified-cod');
  const [strictAddressVerification, setStrictAddressVerification] = useState(true);
  const [aiAlternativeSuggestions, setAiAlternativeSuggestions] = useState(true);
  const [handoffThreshold, setHandoffThreshold] = useState('3');
  const [languageMode, setLanguageMode] = useState('bilingual'); // Roman Urdu + English

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onToast(
      'Settings Updated',
      'Millilegacy operational parameters and AI configurations saved successfully.'
    );
  };

  const handleReset = () => {
    setBrandName('Millilegacy');
    setCodTag('whatsapp-verified-cod');
    setStrictAddressVerification(true);
    setAiAlternativeSuggestions(true);
    onToast('Settings Reset', 'Configuration restored to default enterprise parameters.');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Context */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#f7be32] text-[#0D0D10] font-bold">
              <Settings className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              Global System & Store Settings
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure Millilegacy brand parameters, Shopify sync rules, and AI conversational behavior
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#EAE6DF] bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand & Store Identity */}
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Store className="w-4 h-4 text-amber-800" />
            <h3 className="text-sm font-extrabold text-[#0D0D10]">Store & Brand Parameters</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Brand Name</label>
              <input
                type="text"
                value={brandName}
                onChange={e => setBrandName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] outline-none focus:border-[#f7be32]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Primary Currency</label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] bg-white outline-none focus:border-[#f7be32]"
              >
                <option value="PKR">PKR - Pakistani Rupee (₨)</option>
                <option value="USD">USD - US Dollar ($)</option>
                <option value="AED">AED - UAE Dirham</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Shopify Domain</label>
              <input
                type="text"
                value={shopifyStore}
                onChange={e => setShopifyStore(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] outline-none focus:border-[#f7be32]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">WhatsApp Business Phone</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={e => setWhatsappNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] outline-none focus:border-[#f7be32]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">System Timezone</label>
              <input
                type="text"
                value={timezone}
                disabled
                className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Shopify Order Tag for Verified COD</label>
              <input
                type="text"
                value={codTag}
                onChange={e => setCodTag(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] outline-none focus:border-[#f7be32]"
              />
            </div>
          </div>
        </div>

        {/* AI Conversational Behavior & Rules */}
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <h3 className="text-sm font-extrabold text-[#0D0D10]">AI Automation Rules</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between gap-4 p-3 bg-[#FAF9F5] rounded-xl border border-[#EAE6DF]">
              <div>
                <h4 className="font-extrabold text-slate-900">Mandatory Address Confirmation</h4>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Block Shopify order generation until customer explicitly replies "YES" to formatted address.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStrictAddressVerification(!strictAddressVerification)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  strictAddressVerification ? 'bg-[#f7be32]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    strictAddressVerification ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 p-3 bg-[#FAF9F5] rounded-xl border border-[#EAE6DF]">
              <div>
                <h4 className="font-extrabold text-slate-900">Automated Out-of-Stock Alternatives</h4>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  If requested size or color is zero in stock, AI instantly suggests in-stock variations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAiAlternativeSuggestions(!aiAlternativeSuggestions)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  aiAlternativeSuggestions ? 'bg-[#f7be32]' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    aiAlternativeSuggestions ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Language Understanding Mode</label>
                <select
                  value={languageMode}
                  onChange={e => setLanguageMode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] bg-white outline-none focus:border-[#f7be32]"
                >
                  <option value="bilingual">Bilingual (Roman Urdu + English Native)</option>
                  <option value="urdu_primary">Urdu First (Roman Urdu primary)</option>
                  <option value="english_strict">English Strict</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Human Handoff Trigger (Failed Attempts)</label>
                <select
                  value={handoffThreshold}
                  onChange={e => setHandoffThreshold(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] bg-white outline-none focus:border-[#f7be32]"
                >
                  <option value="2">2 Unrecognized Messages</option>
                  <option value="3">3 Unrecognized Messages (Recommended)</option>
                  <option value="4">4 Unrecognized Messages</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Access Control */}
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Lock className="w-4 h-4 text-amber-800" />
            <h3 className="text-sm font-extrabold text-[#0D0D10]">Security & Access Governance</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block">HMAC Webhook Signature Verification</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Enabled for Meta Cloud API (SHA-256) and Shopify Webhooks.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block">Enterprise Audit Logging</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Active: All agent actions, address edits, and overrides stored in immutable ledger.
              </p>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-extrabold transition-all cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save All Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
