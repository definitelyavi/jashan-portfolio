import React from 'react';
import { TerminalLine } from './Terminal';

interface TerminalOutputProps {
  line: TerminalLine;
  useTypewriter?: boolean;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ line, useTypewriter = false }) => {
  const getLineStyle = () => {
    switch (line.type) {
      case 'command':
        return 'text-terminal-prompt';
      case 'error':
        return 'text-terminal-error';
      case 'output':
      default:
        return 'text-terminal-text';
    }
  };

  const renderContent = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+|github\.com\/[^\s]+|linkedin\.com\/[^\s]+|jashanlikestocode\.dev)/g;
    
    let processedContent = content
      .replace(urlRegex, (url) => {
        if (content.includes(`${url}@`) || content.includes(`@${url}`)) {
          return url;
        }
        
        const fullUrl = url.startsWith('http') ? url : `https://${url}`;
        return `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer" class="text-green-400 hover:text-green-300 underline">${url}</a>`;
      });

    return <span dangerouslySetInnerHTML={{ __html: processedContent }} />;
  };

  return (
    <div className={`${getLineStyle()} whitespace-pre-wrap break-words select-text`}>
      {renderContent(line.content)}
    </div>
  );
};