// FIX: Replaced placeholder content with type definitions for the application's data models (Department, Project, Vendor, Revenue) to resolve "Cannot find name" errors and provide a data structure for the app.
export interface Department {
    id: string;
    name: string;
    director: string;
    employees: number;
    budget: number;
}
  
export type ProjectStatus = 'Completed' | 'In Progress' | 'Pending' | 'Cancelled';

export interface Project {
    id: string;
    name:string;
    department: string;
    budget: number;
    spent: number;
    status: ProjectStatus;
    startDate: string;
    endDate: string;
}

export interface Vendor {
    id: string;
    name: string;
    service: string;
    contractValue: number;
    startDate: string;
    endDate: string;
}

export interface Revenue {
    id: string;
    source: string;
    amount: number;
    date: string;
}
