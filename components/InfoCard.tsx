import React from 'react';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isWeakness?: boolean;
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, isWeakness = false }) => {
  const baseClasses = "bg-gray-800/50 border rounded-xl p-6 flex flex-col items-start h-full transition-all duration-300 hover:shadow-2xl";
  const strengthClasses = "border-gray-700 hover:border-sky-500 hover:shadow-sky-500/10";
  const weaknessClasses = "border-gray-700 hover:border-rose-500 hover:shadow-rose-500/10";

  const iconBaseClasses = "rounded-lg p-3 mb-4";
  const iconStrengthClasses = "bg-sky-500/10 text-sky-300";
  const iconWeaknessClasses = "bg-rose-500/10 text-rose-300";

  return (
    <div className={`${baseClasses} ${isWeakness ? weaknessClasses : strengthClasses}`}>
      <div className={`${iconBaseClasses} ${isWeakness ? iconWeaknessClasses : iconStrengthClasses}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};
