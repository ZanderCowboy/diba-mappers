// FIX: Replaced placeholder content with a functional App component.
// This resolves the "not a module" error in index.tsx and provides the main application structure.
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { VendorsPage } from './pages/VendorsPage';
import { RevenuePage } from './pages/RevenuePage';
import { InsightsPage } from './pages/InsightsPage';
import { StatCard } from './components/StatCard';
import { Notification } from './components/Notification';

export type Page = 'dashboard' | 'departments' | 'projects' | 'vendors' | 'revenue' | 'insights';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">An overview of the city's departments, projects, and finances.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Departments" value="6" color="border-l-blue-500" />
        <StatCard title="Active Projects" value="3" color="border-l-yellow-500" />
        <StatCard title="Total Vendors" value="5" color="border-l-green-500" />
        <StatCard title="Annual Dept. Budget" value="R202.5M" color="border-l-purple-500" />
      </div>
       <div className="bg-[#1F2937] p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Public City Data Hub</h2>
          <p className="text-gray-400">
            This dashboard provides a public overview of the city's operations. Use the sidebar to navigate through different modules like Departments, Projects, and Vendors. 
            The AI-Powered Insights page uses Gemini to analyze public data and highlight key information.
          </p>
        </div>
    </div>
  );
};


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
        setNotification(null);
    }, 3000);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'departments':
        return <DepartmentsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'vendors':
        return <VendorsPage />;
      case 'revenue':
        return <RevenuePage />;
      case 'insights':
        return <InsightsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="bg-[#111827] min-h-screen text-gray-300 flex">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} triggerNotification={triggerNotification} />
      <main className="flex-1 p-8 overflow-y-auto">
        {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
        {renderPage()}
      </main>
    </div>
  );
};

export default App;