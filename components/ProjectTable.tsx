import React from 'react';
import { StatusBadge } from './StatusBadge';

type ProjectStatus = 'Completed' | 'In Progress' | 'Pending' | 'Cancelled';

const projects: {
    id: string;
    name: string;
    department: string;
    budget: string;
    status: ProjectStatus;
    completion: string;
}[] = [
  { id: 'P001', name: 'Downtown Revitalization', department: 'Urban Planning', budget: 'R5,000,000', status: 'In Progress', completion: '75%' },
  { id: 'P002', name: 'Public Park Expansion', department: 'Parks & Recreation', budget: 'R1,200,000', status: 'Completed', completion: '100%' },
  { id: 'P003', name: 'Smart City Infrastructure', department: 'Technology Services', budget: 'R12,500,000', status: 'In Progress', completion: '40%' },
  { id: 'P004', name: 'Community Health Initiative', department: 'Public Health', budget: 'R750,000', status: 'Pending', completion: '0%' },
  { id: 'P005', name: 'Water Treatment Plant Upgrade', department: 'Public Works', budget: 'R8,000,000', status: 'Cancelled', completion: '20%' },
];

interface ProjectTableProps {
    searchTerm: string;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({ searchTerm }) => {
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#1F2937] rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs text-gray-300 uppercase bg-[#283447]">
          <tr>
            <th scope="col" className="px-6 py-3">Project ID</th>
            <th scope="col" className="px-6 py-3">Project Name</th>
            <th scope="col" className="px-6 py-3">Department</th>
            <th scope="col" className="px-6 py-3">Budget</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Completion</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project.id} className="border-b border-gray-700 hover:bg-gray-700/50">
              <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{project.id}</th>
              <td className="px-6 py-4 text-white">{project.name}</td>
              <td className="px-6 py-4">{project.department}</td>
              <td className="px-6 py-4">{project.budget}</td>
              <td className="px-6 py-4"><StatusBadge status={project.status} /></td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-600 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: project.completion }}></div>
                    </div>
                    <span className="text-xs text-gray-300">{project.completion}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};