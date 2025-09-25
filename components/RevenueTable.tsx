// FIX: Replaced placeholder content with a functional RevenueTable component.
// This component displays mock revenue data in a table format.
import React from 'react';

const revenue = [
  { id: 'R001', source: 'Property Taxes', amount: 'R120,500,000', date: '2024-07-15', status: 'Collected' },
  { id: 'R002', source: 'Business Licenses', amount: 'R15,200,000', date: '2024-06-30', status: 'Collected' },
  { id: 'R003', source: 'Parking Fines', amount: 'R3,800,000', date: '2024-07-20', status: 'Partially Collected' },
  { id: 'R004', source: 'Federal Grants', amount: 'R35,000,000', date: '2024-08-01', status: 'Pending' },
  { id: 'R005', source: 'Event Permits', amount: 'R1,100,000', date: '2024-07-18', status: 'Collected' },
];

const StatusPill: React.FC<{status: string}> = ({ status }) => {
    const statusClasses: Record<string, string> = {
        Collected: 'bg-green-500/20 text-green-400',
        'Partially Collected': 'bg-yellow-500/20 text-yellow-400',
        Pending: 'bg-blue-500/20 text-blue-400',
    };

    return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusClasses[status] || 'bg-gray-500/20 text-gray-400'}`}>{status}</span>
}

interface RevenueTableProps {
    searchTerm: string;
}

export const RevenueTable: React.FC<RevenueTableProps> = ({ searchTerm }) => {
  const filteredRevenue = revenue.filter(item =>
    item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
    
  return (
    <div className="bg-[#1F2937] rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs text-gray-300 uppercase bg-[#283447]">
          <tr>
            <th scope="col" className="px-6 py-3">Transaction ID</th>
            <th scope="col" className="px-6 py-3">Revenue Source</th>
            <th scope="col" className="px-6 py-3">Amount</th>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRevenue.map((item) => (
            <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700/50">
              <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{item.id}</th>
              <td className="px-6 py-4 text-white">{item.source}</td>
              <td className="px-6 py-4">{item.amount}</td>
              <td className="px-6 py-4">{item.date}</td>
              <td className="px-6 py-4"><StatusPill status={item.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};