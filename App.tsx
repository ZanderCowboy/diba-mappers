// FIX: Replaced placeholder content with a functional root App component.
// This component manages application state, routing, and renders the main layout
// with the sidebar and active page, resolving module errors in index.tsx and Sidebar.tsx.
import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { VendorsPage } from './pages/VendorsPage';
import { RevenuePage } from './pages/RevenuePage';
import { InsightsPage } from './pages/InsightsPage';
import { IntroPage } from './pages/IntroPage';
import { DashboardPage } from './pages/DashboardPage';
import { Notification } from './components/Notification';

export type Page = 'dashboard' | 'departments' | 'projects' | 'vendors' | 'revenue' | 'insights';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = useCallback((message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  }, []);
  
  const handleEnterDashboard = () => {
    setShowIntro(false);
  }

  if (showIntro) {
    return <IntroPage onEnter={handleEnterDashboard} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage setCurrentPage={setCurrentPage} />;
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
        return <DashboardPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#111827] text-gray-300 font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} triggerNotification={triggerNotification} />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderPage()}
      </main>
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
    </div>
  );
}

export default App;