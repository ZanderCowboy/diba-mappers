// FIX: Replaced placeholder content with a functional Sidebar component.
// This provides the main navigation for the application.
import React, { useState, useEffect } from 'react';
import { Page } from '../App';
import { DashboardIcon, DepartmentsIcon, ProjectsIcon, VendorsIcon, RevenueIcon, InsightsIcon, GovLogo } from './icons/DashboardIcons';
import { Department } from '../types';
import api from '../api/mockApi';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  triggerNotification: (message: string) => void;
  selectedDepartment: Department | null;
  onSelectDepartment: (department: Department | null) => void;
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

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const ChevronUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
);


export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, triggerNotification, selectedDepartment, onSelectDepartment }) => {
    const [isDeptOpen, setIsDeptOpen] = useState(false);
    const [departments, setDepartments] = useState<Department[]>([]);

    useEffect(() => {
        api.getDepartments().then(data => setDepartments(data));
    }, []);

    const handleDeptSelect = (department: Department | null) => {
        onSelectDepartment(department);
        setCurrentPage('departments');
        // Keep dropdown open for better UX, user can close it manually
        // setIsDeptOpen(false); 
    }
    
    const isDeptActive = currentPage === 'departments';

    return (
    <aside className="w-64 bg-[#1F2937] p-4 flex flex-col flex-shrink-0">
      <div className="flex items-center gap-2 px-4 py-3 mb-6">
        <GovLogo />
        <span className="text-xl font-bold text-white">DibasMap Public</span>
      </div>
      <nav>
        <ul className="space-y-2">
          <NavItem icon={<DashboardIcon />} label="Dashboard" page="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          
          {/* Departments Dropdown */}
          <li>
            <button
                onClick={() => setIsDeptOpen(!isDeptOpen)}
                className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isDeptActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
            >
                <div className="flex items-center">
                    <span className="mr-3"><DepartmentsIcon /></span>
                    <span className="truncate">{selectedDepartment ? selectedDepartment.name : 'Departments'}</span>
                </div>
                {isDeptOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
            {isDeptOpen && (
                <ul className="pl-8 mt-2 space-y-1">
                    <li>
                        <button
                            onClick={() => handleDeptSelect(null)}
                            className={`w-full text-left text-xs py-2 px-2 rounded-md ${
                                !selectedDepartment && isDeptActive ? 'text-white font-semibold' : 'text-gray-400'
                            } hover:text-white hover:bg-gray-700/50`}
                        >
                            All Departments
                        </button>
                    </li>
                    {departments.map(dept => (
                        <li key={dept.id}>
                            <button
                                onClick={() => handleDeptSelect(dept)}
                                className={`w-full text-left text-xs py-2 px-2 rounded-md truncate ${
                                    selectedDepartment?.id === dept.id ? 'text-white font-semibold' : 'text-gray-400'
                                } hover:text-white hover:bg-gray-700/50`}
                            >
                                {dept.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
          </li>

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