// FIX: Replaced placeholder content with a functional DepartmentsPage component. It now fetches and displays department data, resolving the "not a module" error in App.tsx.
import React, { useState, useEffect } from 'react';
import { DepartmentTable } from '../components/DepartmentTable';
import { Department } from '../types';
import api from '../api/mockApi';

export const DepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await api.getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Failed to fetch departments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">City Departments</h1>
        <p className="text-gray-400">Overview of all municipal departments and their key information.</p>
      </header>
      
      {loading ? (
        <div className="text-center py-8">Loading departments...</div>
      ) : (
        <>
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search by department or director..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-2 bg-[#283447] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <DepartmentTable departments={departments} searchTerm={searchTerm} />
        </>
      )}
    </div>
  );
};