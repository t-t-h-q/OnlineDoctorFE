# Online Doctor

## Prerequisites

- [Node.js](https://nodejs.org/) (version 20+, 20 recommended)
- [pnpm](https://pnpm.io/) (version 6.14+)

### Install pnpm (if you don't have it installed)

```bash
npm install -g pnpm
```

### Using Environment Variables
Create a .env file at the project root to define environment variables for the project. Vite exposes environment variables with the prefix VITE_ to your app.

Example .env file:

```
VITE_API_URL=https://api.example.com
```

## Getting Started
1. Clone the repository
```bash
  git clone https://github.com/t-t-h-q/OnlineDoctorFE.git
  cd OnlineDoctorFE
```

2. Install dependencies
```bash
  pnpm install
```
3. Start the development server
```bash
pnpm dev
```
Vite will start the development server, typically accessible at http://localhost:[port].

4. Build production
```bash
pnpm build
```

## Project Structure
```bash
├── .github/
├── .husky/
├── public/          # Static assets (served directly, without processing)
├── src/             # Main application source code
│   ├── assets/      # Media, images, and styling assets
│   ├── components/  # Reusable React components
│   ├── constants/   # Constants
│   ├── enums/       # Enums
│   ├── hooks/       # Organize and store custom hooks—reusable functions 
│   ├── interfaces/  # Interfaces global
│   ├── layouts/     # Layout
│   ├── pages/       # Pages app
│   ├── routers/     # Router config
│   ├── services/    # Handle HTTP requests
│   ├── stores/      # Manage state global
│   ├── styles/      # All styling 
│   ├── utils/       # Utils
│   ├── App.tsx      # Main App component
│   ├── main.tsx     # Application entry point
│   └── vite-env.d.ts # Adds type information for Vite-specific features.
├── .editorconfig
├── .env                  # Environment variables
├── .gitignore            # Files and directories to ignore in Git
├── commitlint.config.ts
├── eslint.config.js
├── postcss.config.js
├── tailwind.config.js    # Customizes Tailwind's default utility-based styling
├── tsconfig.app.json
├── tsconfig.json         # Typescript configs
├── index.html            # Root HTML file for the project
└── vite.config.js        # Vite configuration file
```

## Scripts
`pnpm dev`: Starts the development server.
`pnpm build`: Builds the project for production.
`pnpm preview`: Previews the production build locally.

## Configuration
### Vite Configuration
Vite’s configuration is in vite.config.js. You can modify this file for additional settings like aliases, plugins, and environment variables.

## Resources
- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [pnpm Documentation](https://pnpm.io/)