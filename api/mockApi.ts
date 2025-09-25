// FIX: Replaced placeholder content with a mock API implementation. This provides mock data and asynchronous data fetching functions for departments, projects, vendors, and revenue, resolving data-related errors throughout the application.
import { Department, Project, Vendor, Revenue } from '../types';

export const mockDepartments: Department[] = [
  { id: '1', name: 'Police Department', director: 'Jane Doe', employees: 500, budget: 50000000 },
  { id: '2', name: 'Fire Department', director: 'John Smith', employees: 350, budget: 42000000 },
  { id: '3', name: 'Public Works', director: 'Emily White', employees: 200, budget: 65000000 },
  { id: '4', name: 'Parks & Recreation', director: 'Michael Brown', employees: 75, budget: 15000000 },
  { id: '5', name: 'Technology Services', director: 'Sarah Green', employees: 50, budget: 22000000 },
  { id: '6', name: 'Finance', director: 'Robert Black', employees: 60, budget: 8500000 },
];

export const mockProjects: Project[] = [
  { id: 'p1', name: 'City Park Renovation', department: 'Parks & Recreation', budget: 5000000, spent: 4500000, status: 'Completed', startDate: '2022-01-15', endDate: '2023-06-30' },
  { id: 'p2', name: 'Downtown Traffic System Upgrade', department: 'Public Works', budget: 12000000, spent: 7800000, status: 'In Progress', startDate: '2023-03-01', endDate: '2024-12-31' },
  { id: 'p3', name: 'Public Wi-Fi Initiative', department: 'Technology Services', budget: 2000000, spent: 1500000, status: 'In Progress', startDate: '2023-05-10', endDate: '2024-08-01' },
  { id: 'p4', name: 'Community Policing Program', department: 'Police Department', budget: 3000000, spent: 500000, status: 'Pending', startDate: '2024-07-01', endDate: '2025-06-30' },
  { id: 'p5', name: 'Fire Station 5 Construction', department: 'Fire Department', budget: 8000000, spent: 100000, status: 'Cancelled', startDate: '2023-09-01', endDate: '2025-01-01' },
  { id: 'p6', name: 'City Hall Server Migration', department: 'Technology Services', budget: 750000, spent: 750000, status: 'Completed', startDate: '2023-11-01', endDate: '2024-01-31' },
];

export const mockVendors: Vendor[] = [
  { id: 'v1', name: 'SecureTech IT Services', service: 'IT Support', contractValue: 1200000, startDate: '2022-08-01', endDate: '2024-07-31' },
  { id: 'v2', name: 'ConstructAll Inc.', service: 'Construction', contractValue: 15000000, startDate: '2023-02-01', endDate: '2025-02-01' },
  { id: 'v3', name: 'GreenScape Landscaping', service: 'Landscaping', contractValue: 850000, startDate: '2022-03-15', endDate: '2025-03-14' },
  { id: 'v4', name: 'Citywide Cleaning Co.', service: 'Janitorial', contractValue: 500000, startDate: '2024-01-01', endDate: '2024-12-31' },
  { id: 'v5', name: 'DataAnalytics Corp.', service: 'Data Analysis', contractValue: 750000, startDate: '2023-06-01', endDate: '2024-05-31' },
];

export const mockRevenue: Revenue[] = [
    { id: 'r1', source: 'Property Taxes', amount: 150000000, date: '2023-12-31' },
    { id: 'r2', source: 'Sales Tax', amount: 75000000, date: '2023-12-31' },
    { id: 'r3', source: 'Business Licenses', amount: 12500000, date: '2023-12-31' },
    { id: 'r4', source: 'Parking Fees', amount: 5000000, date: '2023-12-31' },
    { id: 'r5', source: 'Grants', amount: 25000000, date: '2023-12-31' },
];

const api = {
  getDepartments: (): Promise<Department[]> => new Promise(resolve => setTimeout(() => resolve(mockDepartments), 500)),
  getProjects: (): Promise<Project[]> => new Promise(resolve => setTimeout(() => resolve(mockProjects), 500)),
  getVendors: (): Promise<Vendor[]> => new Promise(resolve => setTimeout(() => resolve(mockVendors), 500)),
  getRevenue: (): Promise<Revenue[]> => new Promise(resolve => setTimeout(() => resolve(mockRevenue), 500)),
};

export default api;
