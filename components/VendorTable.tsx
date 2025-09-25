// FIX: Replaced placeholder content with a functional VendorTable component. This component renders vendor data in a table, resolving errors on the Vendors page.
import React from 'react';
import { Vendor } from '../types';

interface VendorTableProps {
  vendors: Vendor[];
  searchTerm: string;
}

export const VendorTable: React.FC<VendorTableProps> = ({ vendors, searchTerm }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
  };

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredVendors.length === 0) {
    return <div className="bg-[#1F2937] rounded-lg p-8 text-center text-gray-400">No vendors found matching your search.</div>;
  }

  return (
    <div className="bg-[#1F2937] rounded-lg overflow-hidden">
      <table className="min-w-full text-left text-sm text-gray-400">
        <thead className="bg-[#283447] text-xs text-gray-300 uppercase tracking-wider">
          <tr>
            <th scope="col" className="px-6 py-3">Vendor Name</th>
            <th scope="col" className="px-6 py-3">Service Provided</th>
            <th scope="col" className="px-6 py-3">Contract Value</th>
            <th scope="col" className="px-6 py-3">Contract End Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {filteredVendors.map((vendor) => (
            <tr key={vendor.id} className="hover:bg-[#283447]">
              <td className="px-6 py-4 font-medium text-white">{vendor.name}</td>
              <td className="px-6 py-4">{vendor.service}</td>
              <td className="px-6 py-4">{formatCurrency(vendor.contractValue)}</td>
              <td className="px-6 py-4">{vendor.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};