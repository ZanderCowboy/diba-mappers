import React from 'react';

// Existing icons used by DashboardPage
const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-5 h-5">{children}</div>
);

export const ArrowIcon = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
    </IconWrapper>
);

export const LightBulbIcon = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a7.5 7.5 0 00-7.5 0c.065.21.145.421.24.631a3.75 3.75 0 006.96 0c.095-.21.175-.421.24-.631zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    </IconWrapper>
);

// New Icons for the Intro Page Diagram
const LargeIconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-12 h-12">{children}</div>
);

export const TreasuryIcon = () => (
    <LargeIconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
    </LargeIconWrapper>
);

export const DepartmentVendorIcon = () => (
    <LargeIconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962A3 3 0 013 10.5V18.75m0 0a3 3 0 003.75 2.962m-3.75-2.962V10.5a3 3 0 013-3m10.5 6.25a3 3 0 00-5.997-2.962m0 0v-3.25a3 3 0 013-3m3 3a3 3 0 00-3-3m-3 3a3 3 0 01-3 3m0 0c0 1.657 1.343 3 3 3s3-1.343 3-3m-3 3v6.75m0-6.75a3 3 0 00-3-3" />
        </svg>
    </LargeIconWrapper>
);

export const ProjectsAssetsIcon = () => (
    <LargeIconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.545M3 12l4.5 1.636m0 0l3 1.091m0 0l3-1.091m0 0l4.5-1.636M3 12l4.5-1.636" />
        </svg>
    </LargeIconWrapper>
);

export const ScrollDownIcon = () => (
    <div className="w-10 h-10 text-gray-500 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </div>
);
