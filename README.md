# Terminal Portfolio

Interactive terminal-themed portfolio website built with React and TypeScript. Navigate through my projects, skills, and experience using familiar command-line commands.

**[Live Demo](https://definitelyavi.github.io/jashan-portfolio)**

## Features

- Interactive terminal interface with real command processing
- Command history navigation with arrow keys
- Responsive design for desktop and mobile
- Professional project showcase and skills assessment

## Available Commands

```bash
help        # Show all available commands
about       # Professional background and experience
projects    # Featured projects with technical details
skills      # Technical skills with proficiency levels
interests   # Personal interests and hobbies
contact     # Contact information and availability
clear       # Clear terminal screen
whoami      # Display current user
date        # Show current date and time
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Build Tool**: Vite
- **Font**: Fira Code monospace

## Project Structure

```
src/
├── components/
│   ├── Terminal.tsx          # Core terminal logic and command processing
│   ├── TerminalInput.tsx     # Input handling with command history
│   ├── TerminalOutput.tsx    # Output rendering and link processing
│   ├── TerminalLoading.tsx   # Initial loading animation
│   └── ui/                   # shadcn/ui component library
├── pages/
│   ├── Index.tsx             # Main portfolio page
│   └── NotFound.tsx          # 404 error handling
├── hooks/
│   ├── use-mobile.tsx        # Mobile device detection
│   └── use-toast.ts          # Toast notification system
├── lib/
│   └── utils.ts              # Utility functions
└── index.css                 # Global styles and terminal theme
```

## Quick Start

```bash
git clone https://github.com/definitelyavi/jashan-portfolio.git
cd jashan-portfolio
npm install
npm run dev
```

Open `http://localhost:8080` to view the portfolio.

## Build for Production

```bash
npm run build
npm run preview
```

## Author

**Jashandeep Singh** - [GitHub](https://github.com/definitelyavi) | [LinkedIn](https://linkedin.com/in/jashansandhu) | [Website](https://jashanlikestocode.dev)

## License

MIT License - feel free to use as a template for your own portfolio.
