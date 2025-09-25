import React from 'react';

type Status = 'Completed' | 'In Progress' | 'Pending' | 'Cancelled';

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusClasses: Record<Status, string> = {
    Completed: 'bg-green-500/20 text-green-400',
    'In Progress': 'bg-blue-500/20 text-blue-400',
    Pending: 'bg-yellow-500/20 text-yellow-400',
    Cancelled: 'bg-red-500/20 text-red-400',
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusClasses[status]}`}>
      {status}
    </span>
  );
};
