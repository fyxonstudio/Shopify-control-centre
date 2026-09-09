import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
  pulse = false
}) => {
  const normalized = status.toLowerCase().trim();

  let bg = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';

  if (normalized === 'operational' || normalized === 'active' || normalized === 'confirmed' || normalized === 'resolved' || normalized === 'success' || normalized === 'in stock' || normalized === 'completed' || normalized === 'recovered') {
    bg = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    dotColor = 'bg-emerald-500';
  } else if (normalized === 'ai handling' || normalized === 'ai') {
    bg = 'bg-amber-50 text-amber-900 border-amber-200';
    dotColor = 'bg-[#f7be32]';
  } else if (normalized === 'human handoff' || normalized === 'human' || normalized === 'in conversation' || normalized === 'in progress') {
    bg = 'bg-amber-50 text-amber-700 border-amber-200';
    dotColor = 'bg-amber-500';
  } else if (normalized === 'order pending' || normalized === 'pending' || normalized === 'waiting for confirmation' || normalized === 'reminder sent' || normalized === 'low stock' || normalized === 'warning') {
    bg = 'bg-amber-50 text-amber-800 border-amber-300/80';
    dotColor = 'bg-amber-500';
  } else if (normalized === 'address confirmation' || normalized === 'correction requested' || normalized === 'updated') {
    bg = 'bg-indigo-50 text-indigo-700 border-indigo-200';
    dotColor = 'bg-indigo-500';
  } else if (normalized === 'processing' || normalized === 'shipped') {
    bg = 'bg-blue-50 text-blue-700 border-blue-200';
    dotColor = 'bg-blue-500';
  } else if (normalized === 'critical' || normalized === 'failed' || normalized === 'down' || normalized === 'cancelled' || normalized === 'out of stock') {
    bg = 'bg-rose-50 text-rose-700 border-rose-200';
    dotColor = 'bg-rose-500';
  } else if (normalized === 'info' || normalized === 'running') {
    bg = 'bg-sky-50 text-sky-700 border-sky-200';
    dotColor = 'bg-sky-500';
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium'
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border ${sizeClasses} ${bg} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`} />
      </span>
      <span className="capitalize">{status}</span>
    </span>
  );
};
