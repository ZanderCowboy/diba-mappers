import React from 'react';

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-6 h-6">{children}</div>
);

export const NoSymbolIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  </IconWrapper>
);

export const BeakerIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251-.146.52-.268.796-.362l.796-.362m7.34 7.34c.251.146.52.268.796.362l.796.362m0 0a2.25 2.25 0 01-2.25 2.25h-5.25a2.25 2.25 0 01-2.25-2.25m0 0l-1.35-1.35c-.34-.34-.465-.806-.33-1.229l.796-.362m10.842 2.842l.796-.362c.34-.34.465-.806.33-1.229l-1.35-1.35" />
    </svg>
  </IconWrapper>
);

export const QuestionMarkCircleIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  </IconWrapper>
);

export const CloudIcon = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5a.75.75 0 01.75.75V3a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM18.364 5.636a.75.75 0 011.06 0l.07.07a.75.75 0 010 1.06l-.07.07a.75.75 0 01-1.06 0l-.07-.07a.75.75 0 010-1.06l.07-.07zM5.636 5.636a.75.75 0 011.06 0l.07.07a.75.75 0 010 1.06l-.07.07a.75.75 0 01-1.06 0l-.07-.07a.75.75 0 010-1.06l.07-.07zM21.75 12a.75.75 0 01-.75.75H21a.75.75 0 010-1.5h.75a.75.75 0 01.75.75zM3 12a.75.75 0 01-.75.75H2.25a.75.75 0 010-1.5h.75a.75.75 0 01.75.75zM18.434 18.434a.75.75 0 010 1.06l-.07.07a.75.75 0 01-1.06 0l-.07-.07a.75.75 0 010-1.06l.07-.07a.75.75 0 011.06 0zm-12.828 0a.75.75 0 010 1.06l-.07.07a.75.75 0 01-1.06 0l-.07-.07a.75.75 0 010-1.06l.07-.07a.75.75 0 011.06 0zM12 21a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zM12 4.875c-3.46 0-6.287 2.76-6.375 6.182-.087 3.421 2.6 6.282 5.988 6.375a.75.75 0 01.762-.75 6.375 6.375 0 006.375-6.375.75.75 0 01.75-.762c3.385-.093 6.075-2.954 5.988-6.375C21.401 7.635 18.575 4.875 15.112 4.875H12z" />
    </svg>
  </IconWrapper>
);
