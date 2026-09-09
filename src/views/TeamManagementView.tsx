import React, { useState } from 'react';
import {
  UserCog,
  Users2,
  Plus,
  Search,
  Shield,
  Clock,
  MessageSquare,
  ShoppingBag,
  CheckCircle2,
  MoreVertical,
  Mail,
  UserCheck
} from 'lucide-react';
import { TeamMember } from '../types';
import { MOCK_TEAM_MEMBERS } from '../data/mockData';

interface TeamManagementViewProps {
  onToast: (title: string, message: string) => void;
}

export const TeamManagementView: React.FC<TeamManagementViewProps> = ({ onToast }) => {
  const [team, setTeam] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Admin' | 'Manager' | 'Agent' | 'Viewer'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New member form
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'Admin' | 'Manager' | 'Agent' | 'Viewer'>('Agent');

  const filteredTeam = team.filter(m => {
    const matchesRole = roleFilter === 'All' || m.role === roleFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      status: 'Active',
      conversationsHandledToday: 0,
      ordersAssistedToday: 0,
      avgResponseTime: '0m',
      lastActive: 'Just now',
      avatarBg: 'from-amber-600 to-yellow-600'
    };

    setTeam(prev => [newMember, ...prev]);
    setIsAddModalOpen(false);
    setNewName('');
    setNewEmail('');
    onToast('Team Member Added', `${newName} has been invited with ${newRole} permissions.`);
  };

  const toggleStatus = (id: string) => {
    setTeam(prev =>
      prev.map(m => {
        if (m.id === id) {
          const nextStatus: TeamMember['status'] =
            m.status === 'Active'
              ? 'In Conversation'
              : m.status === 'In Conversation'
              ? 'Offline'
              : 'Active';
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
    onToast('Status Updated', 'Agent operational status updated.');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Context */}
      <div className="bg-white rounded-2xl border border-[#EAE6DF] p-5 sm:p-6 shadow-2xs flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#f7be32] text-[#0D0D10] font-bold">
              <UserCog className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-extrabold text-[#0D0D10]">
              Team & Roles Management
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Support staff roster, active shift statuses, permission tiers, and agent SLA metrics
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-extrabold transition-all cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Staff</span>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono mt-1">{team.length}</div>
          <span className="text-[10px] text-slate-500 font-medium">4 agents, 2 managers</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Online & Active</span>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">
            {team.filter(m => m.status !== 'Offline').length}
          </div>
          <span className="text-[10px] text-slate-500 font-medium">Ready for handoffs</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">In Live Chats</span>
          <div className="text-2xl font-extrabold text-amber-700 font-mono mt-1">
            {team.filter(m => m.status === 'In Conversation').length}
          </div>
          <span className="text-[10px] text-slate-500 font-medium">Handling customer inquiries</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#EAE6DF] shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Avg Team Response</span>
          <div className="text-2xl font-extrabold text-[#0D0D10] font-mono mt-1">3m 12s</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Under 5m SLA target</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by agent name or email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#EAE6DF] bg-white text-xs outline-none focus:border-[#f7be32] shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto bg-white p-1 rounded-xl border border-[#EAE6DF] text-xs shadow-2xs overflow-x-auto">
          {(['All', 'Admin', 'Manager', 'Agent', 'Viewer'] as const).map(role => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                roleFilter === role
                  ? 'bg-[#f7be32] text-[#0D0D10] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeam.map(member => (
          <div
            key={member.id}
            className="bg-white rounded-2xl border border-[#EAE6DF] p-5 shadow-2xs space-y-4 hover:border-[#f7be32]/60 transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f7be32] text-[#0D0D10] border border-[#e5ab1b] flex items-center justify-center font-extrabold text-sm shadow-xs">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#0D0D10]">{member.name}</h4>
                  <p className="text-[11px] text-slate-500">{member.email}</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  member.role === 'Admin'
                    ? 'bg-purple-50 text-purple-800 border border-purple-200'
                    : member.role === 'Manager'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : member.role === 'Agent'
                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {member.role}
              </span>
            </div>

            {/* Performance Mini-Stats */}
            <div className="grid grid-cols-3 gap-2 bg-[#FAF9F5] p-3 rounded-xl border border-[#EAE6DF] text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">CHATS</span>
                <span className="font-extrabold text-slate-800">{member.conversationsHandledToday}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">ORDERS</span>
                <span className="font-extrabold text-slate-800">{member.ordersAssistedToday}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">SLA AVG</span>
                <span className="font-extrabold text-amber-800 font-mono">{member.avgResponseTime}</span>
              </div>
            </div>

            {/* Status & Toggle */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    member.status === 'Active'
                      ? 'bg-emerald-500'
                      : member.status === 'In Conversation'
                      ? 'bg-amber-500'
                      : 'bg-slate-300'
                  }`}
                />
                <span className="font-semibold text-slate-700">{member.status}</span>
              </div>

              <button
                onClick={() => toggleStatus(member.id)}
                className="text-[11px] font-bold text-amber-900 hover:text-amber-950 underline cursor-pointer"
              >
                Toggle Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Team Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#EAE6DF] w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-[#EAE6DF] bg-[#FAF9F5] flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[#0D0D10]">Add Team Member</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMember} className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Usman Tariq"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] outline-none focus:border-[#f7be32]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. usman@millilegacy.com"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] outline-none focus:border-[#f7be32]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Role & Permission Tier</label>
                <select
                  value={newRole}
                  onChange={e => setNewRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-[#EAE6DF] bg-white outline-none focus:border-[#f7be32]"
                >
                  <option value="Agent">Agent (WhatsApp Chat & Order Creator)</option>
                  <option value="Manager">Manager (Workflow Supervisor & Overrides)</option>
                  <option value="Admin">Admin (Full System & Integration Control)</option>
                  <option value="Viewer">Viewer (Read-Only Analytics)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#EAE6DF] text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] font-extrabold cursor-pointer shadow-xs"
                >
                  Confirm & Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
