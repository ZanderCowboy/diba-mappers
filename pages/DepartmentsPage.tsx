import React from 'react';
import { DepartmentTable } from '../components/DepartmentTable';

export const DepartmentsPage: React.FC = () => {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Departments</h1>
        <p className="text-gray-400">Manage and oversee all city departments.</p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search departments..."
            className="bg-[#1F2937] border border-gray-600 rounded-lg py-2 px-4 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Department
        </button>
      </div>

      <DepartmentTable />
    </div>
  );
};
