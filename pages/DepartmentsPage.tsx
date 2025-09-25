// FIX: Replaced placeholder content with a functional DepartmentsPage component. It now fetches and displays department data, resolving the "not a module" error in App.tsx.
import React, { useState, useEffect } from 'react';
import { DepartmentTable } from '../components/DepartmentTable';
import { ProjectTable } from '../components/ProjectTable';
import { VendorTable } from '../components/VendorTable';
import { RevenueTable } from '../components/RevenueTable';
import { Department, Project, Vendor, Revenue } from '../types';
import api from '../api/mockApi';

interface DepartmentDetailPageProps {
    department: Department;
}

const DepartmentDetailView: React.FC<DepartmentDetailPageProps> = ({ department }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [revenue, setRevenue] = useState<Revenue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [projData, vendData, revData] = await Promise.all([
                    api.getProjects(),
                    api.getVendors(),
                    api.getRevenue()
                ]);
                setProjects(projData.filter(p => p.department === department.name));
                setVendors(vendData.filter(v => v.department === department.name));
                setRevenue(revData.filter(r => r.department === department.name));
            } catch (error) {
                console.error("Failed to fetch department details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [department]);

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">{department.name}</h1>
                <p className="text-gray-400">Director: {department.director} | Employees: {department.employees}</p>
            </header>
            {loading ? <div className="text-center py-8">Loading department details...</div> :
            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Budget Allocation</h2>
                    <div className="bg-[#1F2937] p-6 rounded-lg">
                        <p className="text-sm text-gray-400 mb-1">Annual Budget</p>
                        <p className="text-4xl font-bold text-white">R{(department.budget / 1000000).toFixed(1)}M</p>
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Projects</h2>
                    {projects.length > 0 ? <ProjectTable projects={projects} searchTerm="" /> : <div className="bg-[#1F2937] rounded-lg p-8 text-center text-gray-400">No projects found for this department.</div>}
                </section>
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Vendors</h2>
                    {vendors.length > 0 ? <VendorTable vendors={vendors} searchTerm="" /> : <div className="bg-[#1F2937] rounded-lg p-8 text-center text-gray-400">No vendors found for this department.</div>}
                </section>
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Revenue Streams</h2>
                     {revenue.length > 0 ? <RevenueTable revenueData={revenue} searchTerm="" /> : <div className="bg-[#1F2937] rounded-lg p-8 text-center text-gray-400">No department-specific revenue streams found.</div>}
                </section>
            </div>
            }
        </div>
    );
}


const AllDepartmentsView: React.FC = () => {
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
}

interface DepartmentsPageProps {
    selectedDepartment: Department | null;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({ selectedDepartment }) => {
    if (selectedDepartment) {
        return <DepartmentDetailView department={selectedDepartment} />;
    }
    return <AllDepartmentsView />;
};
