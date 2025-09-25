import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { VendorsPage } from './pages/VendorsPage';
import { InsightsPage } from './pages/InsightsPage';
import { StatCard } from './components/StatCard';
import { InsightCard } from './components/InsightCard';

// FIX: Define placeholder icons locally to satisfy dependencies for the Dashboard page
// without creating new files or assuming content of unprovided files.
const StrengthIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);
  
const WeaknessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

// Placeholder Dashboard Page
const DashboardPage = () => (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Welcome back, Jane. Here's an overview of the city's status.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Departments" value="6" color="border-blue-500" />
        <StatCard title="Ongoing Projects" value="2" color="border-yellow-500" />
        <StatCard title="Active Vendors" value="5" color="border-green-500" />
        <StatCard title="Urgent Alerts" value="1" color="border-red-500" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InsightCard 
                type="success"
                icon={<StrengthIcon />}
                title="Project Completion Rate"
                description="The completion rate for city projects has increased by 15% in the last quarter."
            />
            <InsightCard 
                type="warning"
                icon={<WeaknessIcon />}
                title="Budget Overrun Risk"
                description="The Police Department is at risk of a significant budget overrun for this fiscal year."
            />
             <InsightCard 
                type="info"
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>}
                title="New Technology Vendor"
                description="A new contract with 'Innovate Solutions' for city-wide software upgrades is now active."
            />
        </div>
      </div>
    </div>
);

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('Dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Departments':
        return <DepartmentsPage />;
      case 'Projects':
        return <ProjectsPage />;
      case 'Vendors':
        return <VendorsPage />;
      case 'Insights':
        return <InsightsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0B1120] text-gray-200 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
