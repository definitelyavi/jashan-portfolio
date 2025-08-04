import React, { useState, useEffect, useRef } from 'react';

interface TerminalInputProps {
  onCommand: (command: string) => void;
  getHistoryCommand: (direction: 'up' | 'down') => string;
}

export const TerminalInput: React.FC<TerminalInputProps> = ({ 
  onCommand, 
  getHistoryCommand 
}) => {
  const [input, setInput] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const historyCommand = getHistoryCommand('up');
      setInput(historyCommand);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const historyCommand = getHistoryCommand('down');
      setInput(historyCommand);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'about', 'projects', 'skills', 'interests', 'contact', 'clear', 'whoami', 'date'];
      const matches = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <div className="flex items-center">
      <span className="text-terminal-prompt mr-2">jashan@portfolio:~$</span>
      <div className="flex-1 relative flex items-center">
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-terminal-text font-mono">{input}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute left-0 bg-transparent border-none outline-none text-terminal-text font-mono opacity-0 pointer-events-none"
            autoComplete="off"
            spellCheck={false}
          />
          <span 
            className={`text-terminal-cursor ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity ml-0`}
          >
            ▋
          </span>
        </form>
      </div>
    </div>
  );
};
