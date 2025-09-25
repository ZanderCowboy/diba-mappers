// FIX: Replaced placeholder content with a functional RevenueTable component. This component renders revenue data in a table and calculates total revenue, resolving errors on the Revenue page.
import React from 'react';
import { Revenue } from '../types';

interface RevenueTableProps {
  revenueData: Revenue[];
  searchTerm: string;
}

export const RevenueTable: React.FC<RevenueTableProps> = ({ revenueData, searchTerm }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
  };
  
  const filteredData = revenueData.filter(
    (item) =>
      item.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = filteredData.reduce((acc, item) => acc + item.amount, 0);
  
  if (filteredData.length === 0) {
    return <div className="bg-[#1F2937] rounded-lg p-8 text-center text-gray-400">No revenue sources found matching your search.</div>;
  }

  return (
    <div className="bg-[#1F2937] rounded-lg overflow-hidden">
      <table className="min-w-full text-left text-sm text-gray-400">
        <thead className="bg-[#283447] text-xs text-gray-300 uppercase tracking-wider">
          <tr>
            <th scope="col" className="px-6 py-3">Revenue Source</th>
            <th scope="col" className="px-6 py-3">Date Recorded</th>
            <th scope="col" className="px-6 py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {filteredData.map((item) => (
            <tr key={item.id} className="hover:bg-[#283447]">
              <td className="px-6 py-4 font-medium text-white">{item.source}</td>
              <td className="px-6 py-4">{item.date}</td>
              <td className="px-6 py-4 text-right">{formatCurrency(item.amount)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-[#283447]">
            <tr>
                <td colSpan={2} className="px-6 py-3 text-right font-bold text-white uppercase">Total Revenue</td>
                <td className="px-6 py-3 text-right font-bold text-white">{formatCurrency(totalRevenue)}</td>
            </tr>
        </tfoot>
      </table>
    </div>
  );
};