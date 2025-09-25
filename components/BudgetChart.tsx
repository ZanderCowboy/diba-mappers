import React from 'react';

const budgetData = [
  { name: 'Police', budget: 50, actual: 57.5, color: 'bg-red-500' }, // 15% over
  { name: 'Fire', budget: 42, actual: 40, color: 'bg-blue-500' },
  { name: 'Public Works', budget: 65, actual: 61, color: 'bg-blue-500' },
  { name: 'Parks & Rec', budget: 15, actual: 14, color: 'bg-blue-500' },
  { name: 'Tech Services', budget: 22, actual: 22, color: 'bg-blue-500' },
];

const ChartBar = ({ name, budget, actual, color }: { name: string, budget: number, actual: number, color: string }) => {
  const actualHeight = Math.min((actual / budget) * 100, 125); // Cap height at 125% for visuals
  const isOverBudget = actual > budget;

  return (
    <div className="flex flex-col items-center w-full" title={`Budget: R${budget}M, Actual: R${actual}M`}>
      <div className="relative w-10 md:w-12 h-48 bg-gray-700 rounded-t-md flex items-end">
        <div 
          className={`w-full ${isOverBudget ? 'bg-red-500' : 'bg-blue-500'} rounded-t-md transition-all duration-500 ease-out`}
          style={{ height: `${actualHeight}%` }}
        ></div>
        {/* Dotted line for budget */}
        <div className="absolute bottom-[100%] w-full border-b-2 border-dashed border-green-400" style={{ marginBottom: '-1px' }}>
            <span className="absolute -left-1 -top-2 text-xs text-green-400 transform -translate-x-full">100%</span>
        </div>
      </div>
      <span className="mt-2 text-xs text-center text-gray-400">{name}</span>
    </div>
  );
};


export const BudgetChart: React.FC = () => {
  return (
    <div className="bg-[#1F2937] p-6 rounded-lg">
      <div className="flex justify-around items-end h-64 space-x-2 md:space-x-4">
        {budgetData.map(data => (
          <ChartBar key={data.name} {...data} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 space-x-6 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
            <span>Actual Spending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-red-500"></div>
            <span>Over Budget</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-px border-b-2 border-dashed border-green-400"></div>
            <span>Budget Line</span>
          </div>
      </div>
    </div>
  );
};