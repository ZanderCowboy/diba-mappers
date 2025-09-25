import React from 'react';

const departments = [
  { id: 'D001', name: 'Police Department', head: 'John Smith', employees: 350, budget: 'R50,000,000' },
  { id: 'D002', name: 'Fire Department', head: 'Jane Miller', employees: 275, budget: 'R42,000,000' },
  { id: 'D003', name: 'Public Works', head: 'Robert Brown', employees: 410, budget: 'R65,000,000' },
  { id: 'D004', name: 'Parks & Recreation', head: 'Emily White', employees: 150, budget: 'R15,000,000' },
  { id: 'D005', name: 'Urban Planning', head: 'Michael Green', employees: 85, budget: 'R8,500,000' },
  { id: 'D006', name: 'Technology Services', head: 'Sarah Black', employees: 120, budget: 'R22,000,000' },
];

interface DepartmentTableProps {
    searchTerm: string;
}

export const DepartmentTable: React.FC<DepartmentTableProps> = ({ searchTerm }) => {
  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#1F2937] rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs text-gray-300 uppercase bg-[#283447]">
          <tr>
            <th scope="col" className="px-6 py-3">Dept. ID</th>
            <th scope="col" className="px-6 py-3">Department Name</th>
            <th scope="col" className="px-6 py-3">Department Head</th>
            <th scope="col" className="px-6 py-3">Employees</th>
            <th scope="col" className="px-6 py-3">Annual Budget</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map((dept) => (
            <tr key={dept.id} className="border-b border-gray-700 hover:bg-gray-700/50">
              <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{dept.id}</th>
              <td className="px-6 py-4 text-white">{dept.name}</td>
              <td className="px-6 py-4">{dept.head}</td>
              <td className="px-6 py-4">{dept.employees}</td>
              <td className="px-6 py-4">{dept.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};