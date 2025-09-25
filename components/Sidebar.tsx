// FIX: Replaced placeholder content with a functional Sidebar component.
// This provides the main navigation for the application.
import React from 'react';
import { Page } from '../App';
import { DashboardIcon, DepartmentsIcon, ProjectsIcon, VendorsIcon, RevenueIcon, InsightsIcon, GovLogo } from './icons/DashboardIcons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  triggerNotification: (message: string) => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, page, currentPage, setCurrentPage }) => {
  const isActive = currentPage === page;
  return (
    <li>
      <button
        onClick={() => setCurrentPage(page)}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        }`}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </button>
    </li>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, triggerNotification }) => {
  return (
    <aside className="w-64 bg-[#1F2937] p-4 flex flex-col flex-shrink-0">
      <div className="flex items-center gap-2 px-4 py-3 mb-6">
        <GovLogo />
        <span className="text-xl font-bold text-white">DibasMap Public</span>
      </div>
      <nav>
        <ul className="space-y-2">
          <NavItem icon={<DashboardIcon />} label="Dashboard" page="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<DepartmentsIcon />} label="Departments" page="departments" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<ProjectsIcon />} label="Projects" page="projects" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<VendorsIcon />} label="Vendors" page="vendors" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<RevenueIcon />} label="Revenue" page="revenue" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <NavItem icon={<InsightsIcon />} label="AI Insights" page="insights" currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </ul>
      </nav>
      <div className="mt-auto p-4 bg-[#283447] rounded-lg text-center">
        <h4 className="font-bold text-white text-sm">Need Help?</h4>
        <p className="text-xs text-gray-400 mt-1 mb-3">Check our documentation or contact support.</p>
        <button 
            onClick={() => triggerNotification('This feature is not yet implemented.')}
            className="w-full bg-gray-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-gray-500 transition-colors">
            Read Docs
        </button>
      </div>
    </aside>
  );
};