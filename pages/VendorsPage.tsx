// FIX: Replaced placeholder content with a functional VendorsPage component. It now fetches and displays vendor data, resolving the "not a module" error in App.tsx.
import React, { useState, useEffect } from 'react';
import { VendorTable } from '../components/VendorTable';
import { Vendor } from '../types';
import api from '../api/mockApi';

export const VendorsPage: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const data = await api.getVendors();
        setVendors(data);
      } catch (error) {
        console.error("Failed to fetch vendors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Vendors</h1>
        <p className="text-gray-400">A list of contractors and vendors working with the city.</p>
      </header>
      
      {loading ? (
        <div className="text-center py-8">Loading vendors...</div>
      ) : (
        <>
          <div className="mb-4">
            <input
                type="text"
                placeholder="Search by vendor name or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-2 bg-[#283447] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <VendorTable vendors={vendors} searchTerm={searchTerm} />
        </>
      )}
    </div>
  );
};