import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  Edit3,
  Check,
  X,
  FileCheck2,
  ShieldCheck
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { OrderRecord } from '../types';

interface AddressConfirmationViewProps {
  onSelectOrder?: (orderId: string) => void;
  onToast: (title: string, message: string) => void;
}

interface AddressRecordItem {
  id: string;
  customerName: string;
  customerPhone: string;
  originalAddress: string;
  finalAddress: string;
  status: 'Confirmed' | 'Waiting for Confirmation' | 'Correction Requested' | 'Updated' | 'Failed';
  confirmationTime: string;
  orderId?: string;
  notes?: string;
}

export const AddressConfirmationView: React.FC<AddressConfirmationViewProps> = ({
  onSelectOrder,
  onToast
}) => {
  // Interactive Simulator State
  const [simStatus, setSimStatus] = useState<'Awaiting' | 'Confirmed' | 'Editing' | 'OrderCreated'>('Awaiting');
  const [simAddress, setSimAddress] = useState({
    houseStreet: 'House 42, Street 12',
    area: 'DHA Phase 5',
    city: 'Lahore'
  });
  const [editAddress, setEditAddress] = useState({
    houseStreet: 'House 42, Street 12',
    area: 'DHA Phase 5',
    city: 'Lahore'
  });
  const [selectedFilter, setSelectedFilter] = useState('All');

  const [addressTableData, setAddressTableData] = useState<AddressRecordItem[]>([
    {
      id: 'addr-1',
      customerName: 'Ahmed Khan',
      customerPhone: '0300-XXX-1234',
      originalAddress: 'House 42, Street 12, Phase 5, DHA, Lahore',
      finalAddress: 'House 42, Street 12, Phase 5, DHA, Lahore',
      status: 'Confirmed',
      confirmationTime: '10:36 PM',
      orderId: '#FY-10482',
      notes: 'Confirmed on 1st prompt via WhatsApp quick reply'
    },
    {
      id: 'addr-2',
      customerName: 'Kamran Ashraf',
      customerPhone: '0322-XXX-9988',
      originalAddress: 'Apt 402, Al-Razi Heights, Gulberg III, Lahore',
      finalAddress: 'Apt 402, Al-Razi Heights, Gulberg III, Lahore',
      status: 'Confirmed',
      confirmationTime: '10:17 PM',
      orderId: '#FY-10481'
    },
    {
      id: 'addr-3',
      customerName: 'Usman Ali',
      customerPhone: '0312-XXX-7765',
      originalAddress: 'House 12, Old Anarkali, Lahore',
      finalAddress: 'House 88-B, Street 9, Phase 6, DHA, Lahore',
      status: 'Updated',
      confirmationTime: '09:46 PM',
      orderId: '#FY-10479',
      notes: 'Customer replied "NO" -> Updated via agent Ali -> Re-confirmed'
    },
    {
      id: 'addr-4',
      customerName: 'Saad Farooq',
      customerPhone: '0334-XXX-5521',
      originalAddress: 'House 19, Sector G-11/3, Islamabad',
      finalAddress: 'House 19, Sector G-11/3, Islamabad',
      status: 'Waiting for Confirmation',
      confirmationTime: '09:35 PM (Sent)',
      orderId: '#FY-10478',
      notes: 'Prompt delivered: "Kya ye address theek hai?"'
    },
    {
      id: 'addr-5',
      customerName: 'Bilal Tariq',
      customerPhone: '0333-XXX-4512',
      originalAddress: 'Flat 4, Street 18, Sector F-7/2, Islamabad',
      finalAddress: 'Pending verification',
      status: 'Waiting for Confirmation',
      confirmationTime: '10:15 PM (Sent)',
      notes: 'Customer inquiring delivery ETA'
    },
    {
      id: 'addr-6',
      customerName: 'Ayesha Mehmood',
      customerPhone: '0321-XXX-1199',
      originalAddress: 'House 10-A, Tipu Block, New Garden Town, Lahore',
      finalAddress: 'House 10-A, Tipu Block, New Garden Town, Lahore',
      status: 'Confirmed',
      confirmationTime: '08:12 PM',
      orderId: '#FY-10472'
    }
  ]);

  const handleConfirmYes = () => {
    setSimStatus('Confirmed');
    onToast('Address Confirmed', 'Validation passed! Order is ready for Shopify submission.');
  };

  const handleConfirmNo = () => {
    setSimStatus('Editing');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setSimAddress(editAddress);
    setSimStatus('Awaiting');
    onToast('Address Updated', 'New address formatted. Re-dispatching confirmation prompt: "Kya ye address theek hai?"');
  };

  const handleSimulateCreateOrder = () => {
    setSimStatus('OrderCreated');
    onToast('Order #FY-10483 Created', 'Pushed to Shopify with verified COD address tag.');
  };

  const handleResetSimulator = () => {
    setSimStatus('Awaiting');
    setSimAddress({
      houseStreet: 'House 42, Street 12',
      area: 'DHA Phase 5',
      city: 'Lahore'
    });
    setEditAddress({
      houseStreet: 'House 42, Street 12',
      area: 'DHA Phase 5',
      city: 'Lahore'
    });
  };

  const filteredAddresses = addressTableData.filter(item => {
    if (selectedFilter === 'All') return true;
    return item.status === selectedFilter;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Feature Context */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-2xs">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#f7be32] text-[#0D0D10] font-bold">
                <MapPin className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-extrabold text-[#0D0D10]">
                Mandatory Address Confirmation Pipeline
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                Zero Blind Orders Policy
              </span>
            </div>
            <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
              To eradicate courier return/RTO costs across Pakistan, the system mandates that every customer receive a structured address card with the explicit confirmation query: <strong className="text-amber-900">"Kya ye address theek hai?"</strong>. No Shopify order is created until verified.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Confirmation SLA:</span>
            <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-2 py-1 rounded border border-amber-200">
              Avg 48 sec
            </span>
          </div>
        </div>

        {/* 4 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Addresses Requested</span>
            <div className="text-2xl font-extrabold text-[#0D0D10] font-mono mt-1">151</div>
            <p className="text-[11px] text-slate-500 mt-1">Inbound checkout leads</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Addresses Confirmed</span>
            <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">143</div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">✓ Ready for delivery</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Correction Required</span>
            <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1">8</div>
            <p className="text-[11px] text-slate-500 mt-1">Revised & re-verified</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Confirmation Rate</span>
            <div className="text-2xl font-extrabold text-amber-900 font-mono mt-1">94.7%</div>
            <p className="text-[11px] text-slate-500 mt-1">+4.2% vs manual dispatch</p>
          </div>
        </div>
      </div>

      {/* Interactive Live Client Demo Simulator */}
      <div className="bg-gradient-to-br from-amber-50/20 via-white to-amber-50/10 rounded-2xl border-2 border-[#f7be32]/40 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-extrabold text-[#0D0D10]">
              Interactive Address Confirmation Demo (For Client Meeting)
            </h3>
          </div>
          <button
            onClick={handleResetSimulator}
            className="text-xs text-amber-900 hover:text-amber-950 font-bold flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Demo
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Simulated WhatsApp Customer View */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-amber-200/70 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Simulated Customer WhatsApp Screen
              </span>
              <span className="text-[10px] font-mono text-slate-400">Meta WhatsApp Cloud API</span>
            </div>

            {/* Address Card as shown to customer */}
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#EAE6DF] space-y-3">
              <div className="text-xs font-semibold text-slate-700">
                Order confirm karne se pehle apna delivery address confirm karein:
              </div>

              <div className="p-3.5 rounded-lg bg-white border border-[#f7be32]/50 text-xs space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{simAddress.houseStreet}</span>
                </div>
                <div className="text-slate-600 font-medium pl-5.5">
                  {simAddress.area}, {simAddress.city}
                </div>
              </div>

              <div className="text-xs font-bold text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-center">
                "Kya ye address theek hai?"
              </div>

              {/* Action Buttons in WhatsApp */}
              {simStatus === 'Awaiting' && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={handleConfirmYes}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>YES — Address is Correct</span>
                  </button>
                  <button
                    onClick={handleConfirmNo}
                    className="py-2.5 px-3 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>NO — Edit Address</span>
                  </button>
                </div>
              )}

              {/* Editing Form when customer says NO */}
              {simStatus === 'Editing' && (
                <form onSubmit={handleSaveEdit} className="space-y-3 pt-2">
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                    <strong>Customer clicked NO:</strong> Prompting for corrected destination details.
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">House / Street</label>
                      <input
                        type="text"
                        value={editAddress.houseStreet}
                        onChange={e => setEditAddress({ ...editAddress, houseStreet: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#f7be32]"
                        placeholder="e.g. House 88-B, Street 9"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Sector / Phase / Area</label>
                      <input
                        type="text"
                        value={editAddress.area}
                        onChange={e => setEditAddress({ ...editAddress, area: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#f7be32]"
                        placeholder="e.g. Phase 6, DHA"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">City</label>
                      <input
                        type="text"
                        value={editAddress.city}
                        onChange={e => setEditAddress({ ...editAddress, city: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-[#f7be32]"
                        placeholder="e.g. Lahore"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    Update Address & Request Re-confirmation
                  </button>
                </form>
              )}

              {/* Status Confirmed */}
              {(simStatus === 'Confirmed' || simStatus === 'OrderCreated') && (
                <div className="space-y-2 pt-1">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Address Confirmed by Customer!</span>
                    </div>
                    <p className="text-[11px] text-emerald-700">
                      Customer confirmed: "Yes, ye address theek hai."
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: System Orchestration Engine */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-amber-200/70 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                System Validation Engine
              </span>
              <span className="text-[10px] font-mono text-amber-800 font-bold">n8n Workflow wf-4</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <span className="font-medium text-slate-600">Current Status:</span>
                <span className={`font-bold px-2.5 py-1 rounded-full text-xs ${
                  simStatus === 'Confirmed' || simStatus === 'OrderCreated'
                    ? 'bg-emerald-100 text-emerald-800'
                    : simStatus === 'Editing'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {simStatus === 'Awaiting' && 'Awaiting Customer Response'}
                  {simStatus === 'Editing' && 'Correction in Progress'}
                  {simStatus === 'Confirmed' && 'Address Verified · Ready for Order'}
                  {simStatus === 'OrderCreated' && 'Shopify Order Finalized'}
                </span>
              </div>

              {/* System Validation Checkpoints */}
              <div className="space-y-2 text-xs">
                <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                  simStatus === 'Confirmed' || simStatus === 'OrderCreated'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800 font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 ${
                    simStatus === 'Confirmed' || simStatus === 'OrderCreated' ? 'text-emerald-600' : 'text-slate-300'
                  }`} />
                  <span>Customer affirmative confirmation received ("YES")</span>
                </div>

                <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                  simStatus === 'Confirmed' || simStatus === 'OrderCreated'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800 font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 ${
                    simStatus === 'Confirmed' || simStatus === 'OrderCreated' ? 'text-emerald-600' : 'text-slate-300'
                  }`} />
                  <span>Courier zone format standard check (TCS/Leopards) passed</span>
                </div>

                <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                  simStatus === 'OrderCreated'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800 font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 ${
                    simStatus === 'OrderCreated' ? 'text-emerald-600' : 'text-slate-300'
                  }`} />
                  <span>Shopify Order pushed (Tags: ["whatsapp-ai", "address-verified"])</span>
                </div>
              </div>

              {/* Trigger Order Creation Button */}
              {simStatus === 'Confirmed' && (
                <div className="pt-2">
                  <button
                    onClick={handleSimulateCreateOrder}
                    className="w-full py-3 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Create Shopify Order Now (#ML-10483)</span>
                  </button>
                </div>
              )}

              {simStatus === 'OrderCreated' && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                  <div className="font-extrabold text-sm text-amber-900 flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Order #ML-10483 Successfully Created!</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Automated confirmation WhatsApp message and delivery tracking token sent to customer.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Address Confirmation Records Table */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-[#EAE6DF] flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-base font-extrabold text-[#0D0D10]">
              Address Confirmation Log
            </h3>
            <p className="text-xs text-slate-500">
              Live records of customer addresses formatted and verified before order creation
            </p>
          </div>

          <div className="flex items-center gap-1 bg-[#FAF9F5] p-1 rounded-xl border border-[#EAE6DF] text-xs">
            {['All', 'Confirmed', 'Waiting for Confirmation', 'Updated'].map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-white text-amber-950 font-bold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-[#EAE6DF] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Original Address</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Confirmation</th>
                <th className="py-3 px-4">Final Formatted Address</th>
                <th className="py-3 px-4">Shopify Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DF]">
              {filteredAddresses.map(record => (
                <tr key={record.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{record.customerName}</div>
                    <div className="text-[10px] font-mono text-slate-400 font-normal">{record.customerPhone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate" title={record.originalAddress}>
                    {record.originalAddress}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={record.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {record.confirmationTime}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 max-w-xs truncate" title={record.finalAddress}>
                    📍 {record.finalAddress}
                  </td>
                  <td className="py-3.5 px-4">
                    {record.orderId ? (
                      <button
                        onClick={() => onSelectOrder && onSelectOrder(record.orderId!)}
                        className="font-mono font-bold text-amber-900 hover:underline cursor-pointer"
                      >
                        {record.orderId}
                      </button>
                    ) : (
                      <span className="text-slate-400 italic">Pending Confirmation</span>
                    )}
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
