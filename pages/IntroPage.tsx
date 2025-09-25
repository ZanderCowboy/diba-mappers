import React from 'react';
import { TreasuryIcon, DepartmentVendorIcon, ProjectsAssetsIcon, ScrollDownIcon } from '../components/icons/IntroIcons';

interface IntroPageProps {
  onEnter: () => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({ onEnter }) => {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory font-sans">
      {/* Welcome Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center snap-start bg-gradient-to-br from-[#111827] to-[#1F2937] text-center p-4 relative">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4" style={{ fontFamily: "'Helvetica Neue', 'Arial', sans-serif" }}>
            Welcome
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
          To a transparent view of public finance in South Africa.
        </p>
        <div className="absolute bottom-10">
          <ScrollDownIcon />
        </div>
      </section>

      {/* Concept Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center snap-start bg-[#111827] p-8">
        <div className="text-center max-w-5xl w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Mission: Transparency & Trust</h2>
          <p className="text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            We aim to give every citizen a clear and understandable view of how public funds are utilized. By tracking the flow from the national treasury to the final projects that build our communities, we can foster trust and help combat corruption together.
          </p>

          {/* Flow Diagram */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full">
            {/* Step 1: Treasury */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-24 h-24 rounded-full bg-green-900/50 border border-green-500/50 flex items-center justify-center text-green-400 mb-3">
                <TreasuryIcon />
              </div>
              <h3 className="font-bold text-white">Treasury</h3>
              <p className="text-xs text-gray-500">National Funds</p>
            </div>

            {/* Arrow */}
            <div className="text-gray-600 transform rotate-90 md:rotate-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* Step 2: Departments & Vendors */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-24 h-24 rounded-full bg-yellow-900/50 border border-yellow-500/50 flex items-center justify-center text-yellow-400 mb-3">
                <DepartmentVendorIcon />
              </div>
              <h3 className="font-bold text-white">Departments & Vendors</h3>
              <p className="text-xs text-gray-500">Allocation & Services</p>
            </div>

            {/* Arrow */}
            <div className="text-gray-600 transform rotate-90 md:rotate-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* Step 3: Projects & Assets */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-24 h-24 rounded-full bg-blue-900/50 border border-blue-500/50 flex items-center justify-center text-blue-400 mb-3">
                <ProjectsAssetsIcon />
              </div>
              <h3 className="font-bold text-white">Projects & Assets</h3>
              <p className="text-xs text-gray-500">Community Infrastructure</p>
            </div>
          </div>

          <button
            onClick={onEnter}
            className="mt-12 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 text-lg"
          >
            Enter Dashboard
          </button>
        </div>
      </section>
    </div>
  );
};
