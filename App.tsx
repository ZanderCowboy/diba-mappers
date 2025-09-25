import React from 'react';
import { Sidebar } from './components/Sidebar';
import { StatCard } from './components/StatCard';
import { InsightCard } from './components/InsightCard';
import { WarningIcon, InfoIcon, SuccessIcon } from './components/icons/DashboardIcons';

const App: React.FC = () => {

  const statCards = [
    { title: "Total Taxes Collected", value: "$12.5B", color: "border-green-500" },
    { title: "Funds Allocated", value: "$10.2B", color: "border-blue-500" },
    { title: "Projects Funded", value: "350", color: "border-orange-500" },
    { title: "Vendors Paid", value: "120", color: "border-pink-500" },
  ];

  const insights = [
    {
      type: 'warning',
      icon: <WarningIcon />,
      title: "Vendor X received 300% more than average",
      description: "This could indicate a potential issue or an anomaly that requires further investigation."
    },
    {
      type: 'info',
      icon: <InfoIcon />,
      title: "Unusual fund allocation for Project Y",
      description: "Allocation patterns deviate from historical norms. Worth a closer look."
    },
    {
      type: 'success',
      icon: <SuccessIcon />,
      title: "Efficiency Milestone Reached",
      description: "Public Works department has reduced project overhead by 15% this quarter."
    }
  ];

  const moneyFlowTabs = ["Taxes", "Treasury", "Departments", "Projects"];

  return (
    <div className="flex h-screen bg-[#101827] text-gray-300">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Welcome back, here is a summary of the city's finances.</p>
        </header>

        <section id="stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map(card => (
            <StatCard key={card.title} title={card.title} value={card.value} color={card.color} />
          ))}
        </section>

        <section id="money-flow">
          <h2 className="text-2xl font-bold text-white mb-4">Money Flow</h2>
          <div className="flex items-center gap-2 mb-6 border-b border-gray-700">
             {moneyFlowTabs.map((tab, index) => (
               <button key={tab} className={`px-4 py-2 rounded-t-md text-sm font-medium transition-colors ${index === 0 ? 'bg-[#1F2937] text-white' : 'text-gray-400 hover:text-white'}`}>
                 {tab}
               </button>
             ))}
          </div>
          <div className="bg-[#1F2937] rounded-lg h-64 flex items-center justify-center">
            <p className="text-gray-500">Data visualization for Money Flow would be displayed here.</p>
          </div>
        </section>

      </main>
      <aside className="w-full max-w-xs xl:max-w-sm bg-[#182235] p-6 overflow-y-auto hidden lg:block">
        <h2 className="text-xl font-bold text-white mb-6">AI Insights</h2>
        <div className="space-y-4">
          {insights.map(insight => (
            <InsightCard 
              key={insight.title}
              type={insight.type as 'warning' | 'info' | 'success'}
              icon={insight.icon}
              title={insight.title}
              description={insight.description}
            />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default App;
