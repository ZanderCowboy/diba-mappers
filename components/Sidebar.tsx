import React from 'react';
import { DashboardIcon, DepartmentsIcon, ProjectsIcon, VendorsIcon, InsightsIcon, UserIcon } from './icons/DashboardIcons';

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <a
    href="#"
    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </a>
);

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-[#111827] flex flex-col p-4">
      <div className="px-4 mb-8">
        <h1 className="text-2xl font-bold text-white">DibasMap</h1>
      </div>
      <nav className="flex-1 space-y-2">
        <NavItem icon={<DashboardIcon />} label="Dashboard" active />
        <NavItem icon={<DepartmentsIcon />} label="Departments" />
        <NavItem icon={<ProjectsIcon />} label="Projects" />
        <NavItem icon={<VendorsIcon />} label="Vendors" />
        <NavItem icon={<InsightsIcon />} label="Insights" />
      </nav>
      <div className="mt-auto">
        <div className="flex items-center p-2">
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-gray-800">
            <UserIcon />
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-white">Jane Doe</p>
            <p className="text-xs text-gray-400">Citizen</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
