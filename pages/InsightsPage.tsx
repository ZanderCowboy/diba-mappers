import React, { useState, useEffect } from 'react';
import { InsightCard } from '../components/InsightCard';
import { GoogleGenAI, Type } from "@google/genai";
import { BudgetChart } from '../components/BudgetChart';

// FIX: Define placeholder icons locally to satisfy dependencies for InsightCard
// without creating new files or assuming content of unprovided icon files.
const StrengthIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);
  
const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);


interface Insight {
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
}

const mockInsights: Insight[] = [
    {type: 'success', title: 'High Maintenance Completion', description: 'Public Works has a 95% completion rate on scheduled maintenance, indicating high efficiency.'},
    {type: 'warning', title: 'Police Department Over-budget', description: 'The Police Department is currently 15% over budget, requiring immediate review.'},
    {type: 'info', title: 'Upcoming Vendor Contract Renewal', description: 'The contract with SecureTech IT Services is due for renewal in two months.'},
];

async function fetchInsights(): Promise<Insight[]> {
  try {
    // FIX: Updated to use process.env.API_KEY as per the coding guidelines to resolve 'import.meta.env' TypeScript error.
    // const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
    let aiClient: GoogleGenAI | null = null;
    function getAiClient(): GoogleGenAI | null {
      const apiKey = (
        // Prefer Vite client-side env var
        (import.meta as any).env?.VITE_API_KEY ||
        // Fallbacks if defined via define in Vite config
        (process.env.API_KEY as string | undefined) ||
        (process.env.GEMINI_API_KEY as string | undefined)
      );
      if (!apiKey) return null;
      if (!aiClient) {
        aiClient = new GoogleGenAI({ apiKey });
      }
      return aiClient;
    }
    
    const ai = getAiClient();
    if (!ai) {
      // No API key available; fall back to mock data
      return mockInsights;
    }
    
    
    const prompt = `
      Analyze the following city data and generate 3 concise insights for a city manager dashboard.
      The data reflects project statuses, department budgets, and vendor contracts.
      Your analysis should highlight key successes, potential issues, and important upcoming events.
      Provide a "type" ('success', 'warning', or 'info'), a short "title", and a one-sentence "description" for each insight.
      Format the output as a JSON array of objects.

      Data:
      - Projects: 5 total, 1 completed, 2 in progress, 1 pending, 1 cancelled. Budget utilization is at 65%.
      - Departments: Police department is over budget by 15%. Public Works has completed 95% of scheduled maintenance.
      - Vendors: Contract with "SecureTech IT Services" is up for renewal in 2 months.
    `;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: {
                type: Type.STRING,
                description: "The type of insight. Must be 'success', 'warning', or 'info'.",
              },
              title: {
                type: Type.STRING,
                description: 'A short title for the insight.',
              },
              description: {
                type: Type.STRING,
                description: 'A one-sentence description of the insight.',
              },
            },
          },
        },
      },
    });
    
    const insights: Insight[] = JSON.parse(response.text);
    return insights;

  } catch (error) {
    console.error("Error fetching insights from Gemini API:", error);
    // Return mock data if the API call fails
    return mockInsights;
  }
}

const InsightIcon = ({type}: {type: Insight['type']}) => {
    switch(type) {
        case 'success':
            return <StrengthIcon />;
        case 'warning':
            return <WarningIcon />;
        case 'info':
        default:
            return <InfoIcon />;
    }
}

export const InsightsPage: React.FC = () => {
    const [insights, setInsights] = useState<Insight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadInsights = async () => {
            try {
                const data = await fetchInsights();
                // Check if the returned data is the mock data to inform the user.
                if (JSON.stringify(data) === JSON.stringify(mockInsights) && data.length > 0) {
                   setError('Could not fetch live data. Displaying sample insights.');
                }
                setInsights(data);
            } catch (e) {
                console.error(e);
                setError('An unexpected error occurred. Displaying sample insights.');
                setInsights(mockInsights);
            } finally {
                setLoading(false);
            }
        };
        loadInsights();
    }, []);

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">AI-Powered Insights</h1>
                <p className="text-gray-400">Key metrics and areas of focus generated by Gemini.</p>
            </header>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Department Budget Overview</h2>
                <BudgetChart />
            </section>

            {error && <div className="bg-yellow-500/20 text-yellow-300 p-4 rounded-lg mb-6 text-sm">{error}</div>}
            
            <h2 className="text-2xl font-bold text-white mb-4">Generated Insights</h2>
            {loading ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-[#283447] p-4 rounded-lg flex items-start gap-4 animate-pulse">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600"></div>
                            <div className="w-full">
                                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-600 rounded w-full mb-1"></div>
                                <div className="h-3 bg-gray-600 rounded w-5/6"></div>
                                <div className="h-3 bg-gray-600 rounded w-1/4 mt-3"></div>
                            </div>
                        </div>
                    ))}
                 </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {insights.map((insight, index) => (
                        <InsightCard
                            key={index}
                            type={insight.type}
                            icon={<InsightIcon type={insight.type} />}
                            title={insight.title}
                            description={insight.description}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};