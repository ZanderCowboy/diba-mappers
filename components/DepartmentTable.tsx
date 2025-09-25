// FIX: Replaced placeholder content with a functional DepartmentTable component. This component renders department data in a table, resolving errors on the Departments page.
import React from 'react';
import { Department } from '../types';

interface DepartmentTableProps {
  departments: Department[];
  searchTerm: string;
}

export const DepartmentTable: React.FC<DepartmentTableProps> = ({ departments, searchTerm }) => {
  const formatBudget = (budget: number) => {
    return `R${(budget / 1000000).toFixed(1)}M`;
  };

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.director.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredDepartments.length === 0) {
    return <div className="bg-[#1F2937] rounded-lg p-8 text-center text-gray-400">No departments found matching your search.</div>;
  }

  return (
    <div className="bg-[#1F2937] rounded-lg overflow-hidden">
      <table className="min-w-full text-left text-sm text-gray-400">
        <thead className="bg-[#283447] text-xs text-gray-300 uppercase tracking-wider">
          <tr>
            <th scope="col" className="px-6 py-3">Department Name</th>
            <th scope="col" className="px-6 py-3">Director</th>
            <th scope="col" className="px-6 py-3">Employees</th>
            <th scope="col" className="px-6 py-3">Annual Budget</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {filteredDepartments.map((dept) => (
            <tr key={dept.id} className="hover:bg-[#283447]">
              <td className="px-6 py-4 font-medium text-white">{dept.name}</td>
              <td className="px-6 py-4">{dept.director}</td>
              <td className="px-6 py-4">{dept.employees}</td>
              <td className="px-6 py-4">{formatBudget(dept.budget)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};