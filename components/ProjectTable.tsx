// FIX: Replaced placeholder content with a functional ProjectTable component. This component renders project data in a table, utilizing the StatusBadge component and resolving errors on the Projects page.
import React from 'react';
import { Project } from '../types';
import { StatusBadge } from './StatusBadge';

interface ProjectTableProps {
  projects: Project[];
  searchTerm: string;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({ projects, searchTerm }) => {
  const formatCurrency = (amount: number) => {
    return `R${(amount / 1000000).toFixed(2)}M`;
  };

  const filteredProjects = projects.filter(
    (proj) =>
      proj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredProjects.length === 0) {
    return <div className="bg-[#1F2937] rounded-lg p-8 text-center text-gray-400">No projects found matching your search.</div>;
  }

  return (
    <div className="bg-[#1F2937] rounded-lg overflow-hidden">
      <table className="min-w-full text-left text-sm text-gray-400">
        <thead className="bg-[#283447] text-xs text-gray-300 uppercase tracking-wider">
          <tr>
            <th scope="col" className="px-6 py-3">Project Name</th>
            <th scope="col" className="px-6 py-3">Department</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Budget</th>
            <th scope="col" className="px-6 py-3">End Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {filteredProjects.map((proj) => (
            <tr key={proj.id} className="hover:bg-[#283447]">
              <td className="px-6 py-4 font-medium text-white">{proj.name}</td>
              <td className="px-6 py-4">{proj.department}</td>
              <td className="px-6 py-4">
                <StatusBadge status={proj.status} />
              </td>
              <td className="px-6 py-4">{formatCurrency(proj.budget)}</td>
              <td className="px-6 py-4">{proj.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};