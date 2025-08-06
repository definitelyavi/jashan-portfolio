import React, { useState, useEffect, useRef } from 'react';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { TerminalLoading } from './TerminalLoading';

export interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE = `
████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝

Welcome to my interactive portfolio terminal!
Type 'help' to see available commands.
`;

const MOBILE_WELCOME_MESSAGE = `
████████╗███████╗██████╗ ███╗   ███╗
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
   ██║   █████╗  ██████╔╝██╔████╔██║
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝

██╗███╗   ██╗ █████╗ ██╗     
██║████╗  ██║██╔══██╗██║     
██║██╔██╗ ██║███████║██║     
██║██║╚██╗██║██╔══██║██║     
██║██║ ╚████║██║  ██║███████╗
╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝

Welcome to my interactive portfolio terminal!
Type 'help' to see available commands.
`;

const commands = {
  help: () => `Available commands:
  
  help        - Show this help message
  about       - Learn about me
  projects    - View my projects
  skills      - See my technical skills
  interests   - Check out my interests
  contact     - Get my contact information
  clear       - Clear the terminal
  whoami      - Display current user
  date        - Show current date and time
  
Type any command to get started!`,

  about: () => `About Me:
  
I'm a passionate full-stack developer with a love for creating 
innovative solutions and beautiful user experiences. I enjoy 
working with modern technologies and solving complex problems.

Background:
- Computer Programming Diploma - Seneca College, Toronto
- 2+ Years of professional Experience
- Hybrid work enthusiast
- Always onto something new

When I'm not coding, you can find me exploring new frameworks,
contributing to open source, or enjoying a good cup of coffee.`,

  projects: () => `Featured Projects:

🎵 MoodCode
   Intelligent mood detection system that analyzes Git commits and generates personalized SoundCloud playlists
   Features: Sentiment analysis, OAuth 2.0 integration, real-time playlist generation
   Tech: React, Node.js, Express, SoundCloud API, GitHub API

🎫 Incident Tracker
   Modern IT support ticket management system with real-time dashboard and analytics
   Features: Role-based access, SLA monitoring, live metrics, ticket workflow
   Tech: Node.js, Express, PostgreSQL, Chart.js, JWT

🐍 Snake Game v2.00
   Modern retro-inspired Snake game with smooth animations and immersive audio
   Features: Multiple difficulty levels, score persistence, responsive design
   Tech: Vanilla JavaScript, Canvas API, Howler.js, CSS3

⭕ Tic-Tac-Toe v1.00
   Minimalist strategy game with intelligent AI and clean animations
   Features: Strategic AI opponent, local multiplayer, score tracking
   Tech: Vanilla JavaScript, Web Audio API, CSS Grid`,

  skills: () => `Technical Skills:
  
Languages:
├── JavaScript/TypeScript ████████████████ 95%
├── Python                ███████████████░ 90%
├── Java                  ████████████░░░░ 80%
├── C++                   ███████████░░░░░ 75%
└── Go                    ████████░░░░░░░░ 60%

Frontend:
├── React/Next.js         ████████████████ 95%
├── Vue.js                ███████████████░ 90%
├── CSS/Tailwind          ████████████████ 95%
└── React Native          ████████████░░░░ 80%

Backend:
├── Node.js               ████████████████ 95%
├── Python/Django         ███████████████░ 90%
├── PostgreSQL            ████████████░░░░ 85%
└── MongoDB               ████████████░░░░ 80%

Tools & Technologies:
├── Git/GitHub            ████████████████ 95%
├── Docker                ███████████████░ 90%
├── AWS/Cloud             ████████████░░░░ 85%
├── Linux/Unix            ███████████████░ 90%
└── CI/CD                 ████████████░░░░ 80%`,

  interests: () => `My Interests:

🎮 FPS Games:
   ├── Valorant       ████████████████ Radiant grind
   ├── CS2            ███████████████░ Classic precision
   ├── Warzone        ████████████░░░░ Battle royale chaos
   └── BO6            ███████████░░░░░ Latest addiction

🌟 Hobbies:
   ├── ☕ Too much coffee (fuel for coding)
   ├── 🏪 Cafe hopping (finding the perfect workspace)
   ├── 🌅 Watching sunset (daily meditation)
   ├── 🌲 Sitting in the middle of a forest (peaceful debugging)
   ├── 🥾 Hiking (thinking through algorithms)
   └── 🛍️ Window shopping (inspiration hunting)

Life philosophy: Code hard, chill harder`,

  contact: () => `Contact Information:
  
🐙 GitHub:    github.com/definitelyavi
💼 LinkedIn:  linkedin.com/in/jashansandhu
🌐 Website:   jashanlikestocode.dev
📧 Email:     jashandeepsingh.dev@gmail.com

Location:     Toronto, ON (Open to remote)
Timezone:     EST (GMT-4)

Feel free to reach out for collaboration opportunities,
freelance projects, or just to say hello!

Response time: Usually within 24 hours`,

  whoami: () => 'jashan@portfolio.terminal',

  date: () => new Date().toString(),

  clear: () => 'CLEAR_TERMINAL'
};

export const Terminal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [typingLineId, setTypingLineId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    const message = isMobile ? MOBILE_WELCOME_MESSAGE : WELCOME_MESSAGE;
    const welcomeLines = message.split('\n').map((line, index) => ({
      id: `welcome-${index}`,
      type: 'output' as const,
      content: line,
      timestamp: new Date()
    }));
    setLines(welcomeLines);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (input: string) => {
    const command = input.trim().toLowerCase();
    
    if (command && !commandHistory.includes(command)) {
      setCommandHistory(prev => [...prev.slice(-9), command]);
    }
    setHistoryIndex(-1);

    const commandLine: TerminalLine = {
      id: `cmd-${Date.now()}`,
      type: 'command',
      content: `jashan@portfolio:~$ ${input}`,
      timestamp: new Date()
    };

    if (command === 'clear') {
      setLines([]);
      return;
    }

    const response = commands[command as keyof typeof commands];
    const outputId = `out-${Date.now()}`;
    const output: TerminalLine = {
      id: outputId,
      type: response ? 'output' : 'error',
      content: response ? response() : `Command not found: ${command}. Type 'help' for available commands.`,
      timestamp: new Date()
    };

    setLines(prev => [...prev, commandLine, output]);
    
    if (response) {
      setTypingLineId(outputId);
    }
  };

  const getHistoryCommand = (direction: 'up' | 'down'): string => {
    if (commandHistory.length === 0) return '';
    
    let newIndex = historyIndex;
    if (direction === 'up') {
      newIndex = historyIndex >= commandHistory.length - 1 ? commandHistory.length - 1 : historyIndex + 1;
    } else {
      newIndex = historyIndex <= 0 ? -1 : historyIndex - 1;
    }
    
    setHistoryIndex(newIndex);
    return newIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - newIndex];
  };

  if (isLoading) {
    return <TerminalLoading onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="h-screen bg-terminal-bg text-terminal-text font-mono flex flex-col touch-manipulation">
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-1 overscroll-contain"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {lines.map((line) => (
          <TerminalOutput 
            key={line.id} 
            line={line} 
            useTypewriter={line.id === typingLineId}
          />
        ))}
        <TerminalInput 
          onCommand={handleCommand} 
          getHistoryCommand={getHistoryCommand}
        />
      </div>
    </div>
  );
};