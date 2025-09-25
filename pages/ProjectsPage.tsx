// FIX: Replaced placeholder content with a functional ProjectsPage component. It now fetches and displays project data, resolving the "not a module" error in App.tsx.
import React, { useState, useEffect } from 'react';
import { ProjectTable } from '../components/ProjectTable';
import { Project, Department } from '../types';
import api from '../api/mockApi';

interface ProjectsPageProps {
  selectedDepartment: Department | null;
  onClearFilter: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ selectedDepartment, onClearFilter }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const tableData = selectedDepartment
    ? projects.filter(p => p.department === selectedDepartment.name)
    : projects;

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">City Projects</h1>
        <p className="text-gray-400">A list of ongoing and completed municipal projects.</p>
      </header>
      
      {loading ? (
        <div className="text-center py-8">Loading projects...</div>
      ) : (
        <>
          {selectedDepartment && (
            <div className="bg-blue-900/50 border border-blue-500/50 text-blue-300 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
              <span>Showing projects for <strong>{selectedDepartment.name}</strong>.</span>
              <button onClick={onClearFilter} className="font-semibold hover:text-white transition-colors">Clear Filter</button>
            </div>
          )}
          <div className="mb-4">
            <input
                type="text"
                placeholder="Search by project or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-2 bg-[#283447] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ProjectTable projects={tableData} searchTerm={searchTerm} />
        </>
      )}
    </div>
  );
};
