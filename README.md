# Terminal Portfolio

A modern, interactive terminal-themed portfolio website built with React and TypeScript.

## About

This project showcases my work and experience through an interactive terminal interface. Users can navigate through different sections using familiar command-line commands.

## Features

- **Interactive Terminal Interface**: Navigate using real terminal commands
- **Command System**: Multiple commands available (help, about, projects, skills, contact)
- **Command History**: Arrow key navigation through previous commands
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern Tech Stack**: Built with React, TypeScript, and Tailwind CSS

## Available Commands

- `help` - Show all available commands
- `about` - Learn more about me
- `projects` - View my featured projects
- `skills` - See my technical skills
- `contact` - Get my contact information
- `clear` - Clear the terminal
- `whoami` - Display current user
- `date` - Show current date and time

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Font**: Fira Code (monospace)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd terminal-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Terminal.tsx          # Main terminal component
│   ├── TerminalInput.tsx     # Input handling with history
│   ├── TerminalOutput.tsx    # Output rendering
│   └── ui/                   # Reusable UI components
├── pages/
│   └── Index.tsx            # Main page
├── lib/
│   └── utils.ts             # Utility functions
└── index.css               # Global styles and terminal theme
```

## Customization

To customize the portfolio content:

1. **Personal Information**: Edit the command responses in `src/components/Terminal.tsx`
2. **Styling**: Modify the terminal theme in `src/index.css`
3. **Commands**: Add new commands or modify existing ones in the `commands` object

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Browser Support

This project supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project as a template for your own portfolio.

## Contact

For questions or collaboration opportunities, feel free to reach out through the terminal interface by running the `contact` command!