import React from 'react';

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-6 h-6">{children}</div>
);

export const BoltIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  </IconWrapper>
);

export const CodeBracketSquareIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
  </IconWrapper>
);

export const PaintBrushIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.47 2.118v-.09a2.25 2.25 0 012.47-2.118c.64.043 1.25.293 1.735.678l.768-.768A7.5 7.5 0 0113.5 4.5v.003c.621.073 1.22.24 1.78.483a7.5 7.5 0 017.22 7.22c.242.56.41 1.158.483 1.78v.003a7.5 7.5 0 01-4.638 6.832l-.768-.768a3 3 0 00-1.32-5.781" />
    </svg>
  </IconWrapper>
);

export const CpuChipIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5m0 16.5v-1.5m3.75-12H21m-18 0h1.5m15 3.75H21m-18 0h1.5m9-15v1.5m0 16.5v-1.5M12 8.25v7.5" />
    </svg>
  </IconWrapper>
);
