import React, { useState, useEffect } from 'react';

interface TerminalLoadingProps {
  onComplete: () => void;
}

export const TerminalLoading: React.FC<TerminalLoadingProps> = ({ onComplete }) => {
  const [loadingStage, setLoadingStage] = useState(0);
  const [dots, setDots] = useState('');

  const loadingMessages = [
    'Initializing terminal...',
    'Loading portfolio data...',
    'Establishing connection...',
    'Welcome to my Portfolio'
  ];

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadingStage < loadingMessages.length - 1) {
        setLoadingStage(prev => prev + 1);
        setDots('');
      } else {
        setTimeout(onComplete, 1000);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [loadingStage, onComplete]);

  return (
    <div className="h-screen bg-terminal-bg text-terminal-text font-mono flex flex-col justify-center items-center">
      <div className="text-center space-y-4">
        <div className="text-xl mb-8">
          <div className="border border-terminal-text p-4 rounded">
            ┌─────────────────────────────────────┐<br/>
            │    jashan@portfolio Loading...      │<br/>
            │                                     │<br/>
            │  {'█'.repeat(Math.floor((loadingStage + 1) * 8))}{'░'.repeat(32 - Math.floor((loadingStage + 1) * 8))} │<br/>
            │                                     │<br/>
            └─────────────────────────────────────┘
          </div>
        </div>
        <div className="text-terminal-prompt">
          {loadingMessages[loadingStage]}{dots}
        </div>
        <div className="text-sm text-terminal-text opacity-60">
          [{Math.round((loadingStage + 1) * 25)}%]
        </div>
      </div>
    </div>
  );
};