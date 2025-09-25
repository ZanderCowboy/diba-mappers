// FIX: Replaced with realistic South African government-inspired mock data
// Backend mock API for hackathon demo

import { Department, Project, Vendor, Revenue } from '../types';

// Departments (South African context)
export const mockDepartments: Department[] = [
  { id: '1', name: 'Department of Health', director: 'Dr. Joe Phaahla', employees: 12000, budget: 256000000000 },
  { id: '2', name: 'Department of Basic Education', director: 'Matsie Angelina Motshekga', employees: 15000, budget: 295000000000 },
  { id: '3', name: 'Department of Transport', director: 'Sindisiwe Chikunga', employees: 8000, budget: 95000000000 },
  { id: '4', name: 'Department of Police', director: 'Bheki Cele', employees: 180000, budget: 110000000000 },
  { id: '5', name: 'Department of Public Works & Infrastructure', director: 'Sihle Zikalala', employees: 6000, budget: 75000000000 },
];

// Major infrastructure or service projects
export const mockProjects: Project[] = [
  { id: 'p1', name: 'N2 Wild Coast Road Project', department: 'Department of Transport', budget: 15000000000, spent: 9500000000, status: 'In Progress', startDate: '2021-05-01', endDate: '2027-12-31' },
  { id: 'p2', name: 'National Health Insurance Pilot', department: 'Department of Health', budget: 2000000000, spent: 750000000, status: 'In Progress', startDate: '2022-04-01', endDate: '2025-03-31' },
  { id: 'p3', name: 'School Infrastructure Backlog Grant', department: 'Department of Basic Education', budget: 12000000000, spent: 10200000000, status: 'Completed', startDate: '2018-01-01', endDate: '2023-12-31' },
  { id: 'p4', name: 'Border Fence Upgrade', department: 'Department of Public Works & Infrastructure', budget: 37000000, spent: 21000000, status: 'Pending Investigation', startDate: '2020-04-01', endDate: '2024-12-31' },
  { id: 'p5', name: 'SAPS Vehicle Procurement 2024', department: 'Department of Police', budget: 5000000000, spent: 2500000000, status: 'In Progress', startDate: '2024-02-01', endDate: '2025-12-31' },
];

// Vendors (common supplier types)
export const mockVendors: Vendor[] = [
  { id: 'v1', name: 'Aveng Grinaker-LTA', service: 'Construction', contractValue: 3500000000, startDate: '2023-02-01', endDate: '2026-02-01' , department: 'Technology Services'},
  { id: 'v2', name: 'Netcare Holdings', service: 'Healthcare Services', contractValue: 500000000, startDate: '2022-08-01', endDate: '2024-08-01' , department: 'Public Works'},
  { id: 'v3', name: 'Multichoice SA', service: 'Digital & Communication', contractValue: 120000000, startDate: '2023-05-01', endDate: '2025-05-01' , department: 'Parks & Recreation'},
  { id: 'v4', name: 'WBHO Construction', service: 'Infrastructure', contractValue: 2200000000, startDate: '2021-09-01', endDate: '2025-09-01' , department: 'Public Works'},
  { id: 'v5', name: 'Eskom Rotek Industries', service: 'Energy Services', contractValue: 750000000, startDate: '2023-01-01', endDate: '2024-12-31' , department: 'Technology Services'},
];

// Government revenue streams (big buckets)
export const mockRevenue: Revenue[] = [
  { id: 'r1', source: 'Personal Income Tax', amount: 601000000000, date: '2023-12-31' },
  { id: 'r2', source: 'Value-Added Tax (VAT)', amount: 470000000000, date: '2023-12-31' },
  { id: 'r3', source: 'Corporate Income Tax', amount: 370000000000, date: '2023-12-31' },
  { id: 'r4', source: 'Fuel Levies', amount: 85000000000, date: '2023-12-31' , department: 'Finance'},
  { id: 'r5', source: 'Customs Duties', amount: 65000000000, date: '2023-12-31', department: 'Public Works' },
  { id: 'r6', source: 'Toll Fees (SANRAL)', amount: 18000000000, date: '2023-12-31' },
];

const api = {
  getDepartments: (): Promise<Department[]> => new Promise(resolve => setTimeout(() => resolve(mockDepartments), 500)),
  getProjects: (): Promise<Project[]> => new Promise(resolve => setTimeout(() => resolve(mockProjects), 500)),
  getVendors: (): Promise<Vendor[]> => new Promise(resolve => setTimeout(() => resolve(mockVendors), 500)),
  getRevenue: (): Promise<Revenue[]> => new Promise(resolve => setTimeout(() => resolve(mockRevenue), 500)),
};

export default api;
