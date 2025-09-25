import React from 'react';

const vendors = [
  { id: 'V001', name: 'Citywide Office Supplies', contactPerson: 'Alice Johnson', email: 'alice@citywideoffice.com', phone: '011-555-0101' },
  { id: 'V002', name: 'Infrastructure Solutions Inc.', contactPerson: 'Bob Williams', email: 'bob.w@infrasolutions.co.za', phone: '012-555-0102' },
  { id: 'V003', name: 'GreenScape Landscaping', contactPerson: 'Charlie Brown', email: 'charlie@greenscape.com', phone: '021-555-0103' },
  { id: 'V004', name: 'SecureTech IT Services', contactPerson: 'Diana Prince', email: 'diana.p@securetech.co.za', phone: '031-555-0104' },
  { id: 'V005', name: 'SA Fleet Management', contactPerson: 'Ethan Hunt', email: 'ethan.hunt@safleet.co.za', phone: '041-555-0105' },
];

interface VendorTableProps {
    searchTerm: string;
}

export const VendorTable: React.FC<VendorTableProps> = ({ searchTerm }) => {
  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
    
  return (
    <div className="bg-[#1F2937] rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs text-gray-300 uppercase bg-[#283447]">
          <tr>
            <th scope="col" className="px-6 py-3">Vendor ID</th>
            <th scope="col" className="px-6 py-3">Vendor Name</th>
            <th scope="col" className="px-6 py-3">Contact Person</th>
            <th scope="col" className="px-6 py-3">Contact Email</th>
            <th scope="col" className="px-6 py-3">Contact Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.map((vendor) => (
            <tr key={vendor.id} className="border-b border-gray-700 hover:bg-gray-700/50">
              <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{vendor.id}</th>
              <td className="px-6 py-4 text-white">{vendor.name}</td>
              <td className="px-6 py-4">{vendor.contactPerson}</td>
              <td className="px-6 py-4">{vendor.email}</td>
              <td className="px-6 py-4">{vendor.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};