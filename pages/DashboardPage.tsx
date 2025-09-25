import React from 'react';
import { Page } from '../App';
import { StatCard } from '../components/StatCard';
import { ArrowIcon, LightBulbIcon } from '../components/icons/IntroIcons';

interface DashboardPageProps {
  setCurrentPage: (page: Page) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ setCurrentPage }) => {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Public Finance Dashboard</h1>
        <p className="text-lg text-gray-400">An interactive overview of the city's financial landscape.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Departments" value="6" color="border-blue-500" />
        <StatCard title="Active Projects" value="2" color="border-green-500" />
        <StatCard title="Vendors on Contract" value="5" color="border-yellow-500" />
        <StatCard title="Total Annual Revenue" value="R267.5M" color="border-purple-500" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-[#1F2937] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Dashboard Overview</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
            This application demonstrates how a generative AI model can be used to build a smart dashboard for city management. You can navigate through different data categories like city departments, ongoing projects, vendors, and revenue streams. The "AI Insights" page uses the Gemini API to analyze this data and provide actionable insights.
            </p>
            <div className="flex flex-wrap gap-4">
                <button onClick={() => setCurrentPage('departments')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                    View Departments <ArrowIcon />
                </button>
                <button onClick={() => setCurrentPage('insights')} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                    Get AI Insights <LightBulbIcon />
                </button>
            </div>
        </div>
        <div className="bg-[#1F2937] p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-4">Key Features</h3>
            <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                    <span className="text-blue-400 flex-shrink-0 mt-1"><LightBulbIcon /></span>
                    <span><strong>AI-Powered Insights:</strong> Utilizes Gemini to analyze data and highlight trends.</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="text-blue-400 flex-shrink-0 mt-1"><LightBulbIcon /></span>
                    <span><strong>Interactive Data:</strong> Search and filter through various city datasets.</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="text-blue-400 flex-shrink-0 mt-1"><LightBulbIcon /></span>
                    <span><strong>Modular Design:</strong> Built with React and TypeScript for maintainability.</span>
                </li>
            </ul>
        </div>
      </section>
      
    </div>
  );
};