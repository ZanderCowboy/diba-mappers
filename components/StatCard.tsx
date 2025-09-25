import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => {
  return (
    <div className={`bg-[#1F2937] p-5 rounded-lg border-l-4 ${color}`}>
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
};
