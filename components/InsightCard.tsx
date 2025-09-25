import React from 'react';

interface InsightCardProps {
  type: 'warning' | 'info' | 'success';
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({ type, icon, title, description }) => {
  const typeClasses = {
    warning: {
      bg: 'bg-red-500/10',
      iconText: 'text-red-400',
    },
    info: {
      bg: 'bg-yellow-500/10',
      iconText: 'text-yellow-400',
    },
    success: {
      bg: 'bg-green-500/10',
      iconText: 'text-green-400',
    },
  };

  const classes = typeClasses[type];

  return (
    <div className="bg-[#283447] p-4 rounded-lg flex items-start gap-4">
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${classes.bg} ${classes.iconText}`}>
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};