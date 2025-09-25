// FIX: Replaced placeholder content with a functional ProjectsPage component. It now fetches and displays project data, resolving the "not a module" error in App.tsx.
import React, { useState, useEffect } from 'react';
import { ProjectTable } from '../components/ProjectTable';
import { Project } from '../types';
import api from '../api/mockApi';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
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
          <div className="mb-4">
            <input
                type="text"
                placeholder="Search by project or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-2 bg-[#283447] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ProjectTable projects={projects} searchTerm={searchTerm} />
        </>
      )}
    </div>
  );
};