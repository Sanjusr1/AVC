# AVC — Artifical Vocal Cord 

A modern, intelligent web application for managing and monitoring AVC devices over WiFi. Built with React, TypeScript, and a premium glassmorphism UI.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Start the Development Server](#3-start-the-development-server)
  - [4. Open in Browser](#4-open-in-browser)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Application Pages](#application-pages)
- [Environment & Configuration](#environment--configuration)
- [Building for Production](#building-for-production)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **Login & Authentication** — Secure login screen with a modern, animated UI
- **Dashboard** — Real-time overview of connected devices, health metrics, and network activity charts
- **WiFi Device Management** — Scan, discover, connect, and manage AVC-compatible devices over WiFi
- **Device Configuration** — Configure individual device settings, AI models, and sensor calibration
- **Health Monitoring** — Track device health metrics including signal strength, battery level, and latency
- **Controls** — Interactive control panel for connected AVC devices
- **AI Assistant** — Built-in AI assistant for intelligent device management
- **Alerts & Notifications** — Real-time toast notifications and alert management
- **Settings** — Application-level preferences and configurations
- **User Profile** — Manage user profile information
- **About Page** — Application information, mission, and specifications
- **Responsive Design** — Optimized for desktop and mobile viewports
- **Dark Mode** — Premium dark theme with glassmorphism effects

---

## Tech Stack

| Category            | Technology                                                     |
| ------------------- | -------------------------------------------------------------- |
| **Framework**       | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool**      | [Vite 5](https://vitejs.dev/)                                  |
| **Styling**         | [Tailwind CSS 3](https://tailwindcss.com/) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) |
| **UI Components**   | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)      |
| **Routing**         | [React Router v6](https://reactrouter.com/)                    |
| **State Management**| [React Query (TanStack)](https://tanstack.com/query)            |
| **Charts**          | [Recharts](https://recharts.org/)                              |
| **Forms**           | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Icons**           | [Lucide React](https://lucide.dev/)                            |
| **Testing**         | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) |
| **Linting**         | [ESLint 9](https://eslint.org/)                                |

---

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

| Tool       | Minimum Version | Check Command      | Install Guide                                         |
| ---------- | --------------- | ------------------- | ----------------------------------------------------- |
| **Node.js**| v18.0.0+        | `node --version`    | [nodejs.org](https://nodejs.org/)                     |
| **npm**    | v9.0.0+         | `npm --version`     | Comes with Node.js                                    |
| **Git**    | v2.0.0+         | `git --version`     | [git-scm.com](https://git-scm.com/)                  |

> **Alternative:** You can also use [Bun](https://bun.sh/) as your package manager (a `bun.lockb` is included).

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd design-and-develop-a-modern-intelligent-web-application-for-avc-adaptive-advanced-virtual...
```

> Replace `<your-repository-url>` with the actual Git remote URL of your repository.

### 2. Install Dependencies

Using **npm**:

```bash
npm install
```

Or using **Bun** (faster alternative):

```bash
bun install
```

This will install all required packages listed in `package.json` and generate the `node_modules/` directory.

### 3. Start the Development Server

```bash
npm run dev
```

Or with Bun:

```bash
bun run dev
```

You should see output similar to:

```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://<your-ip>:8080/
```

### 4. Open in Browser

Navigate to **[http://localhost:8080](http://localhost:8080)** in your web browser.

You will be greeted with the **Login page**. After logging in, you'll land on the **Dashboard** where you can start scanning and connecting to AVC devices.

---

## Available Scripts

Run these from the project root directory:

| Command              | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| `npm run dev`        | Start the Vite development server with hot-reload on port 8080  |
| `npm run build`      | Create an optimized production build in the `dist/` folder      |
| `npm run build:dev`  | Create a development build (unminified, with source maps)       |
| `npm run preview`    | Preview the production build locally                            |
| `npm run lint`       | Run ESLint to check for code quality issues                     |
| `npm run test`       | Run the test suite once using Vitest                            |
| `npm run test:watch` | Run tests in watch mode (re-runs on file changes)               |

---

## Project Structure

```
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── vite.config.ts             # Vite build configuration (port 8080, aliases)
├── tailwind.config.ts         # Tailwind CSS theme and plugin configuration
├── tsconfig.json              # TypeScript configuration
├── components.json            # shadcn/ui component configuration
├── postcss.config.js          # PostCSS configuration (Tailwind + Autoprefixer)
├── eslint.config.js           # ESLint rules
├── vitest.config.ts           # Vitest testing configuration
├── public/                    # Static assets served as-is
└── src/                       # Application source code
    ├── main.tsx               # Application entry point (renders <App />)
    ├── App.tsx                # Root component — providers, routing setup
    ├── App.css                # Global app-level styles
    ├── index.css              # Tailwind directives and CSS variables
    ├── vite-env.d.ts          # Vite type declarations
    ├── components/            # Reusable UI components
    │   ├── ui/                # shadcn/ui base components (50+ components)
    │   ├── dashboard/         # Dashboard-specific components (HealthMonitor, etc.)
    │   ├── device/            # Device management components (DeviceDetailModal, etc.)
    │   ├── addDevice/         # Add device modal and flow
    │   ├── ai/                # AI assistant component
    │   ├── alerts/            # Alert and notification components
    │   ├── icons/             # Custom device icons
    │   ├── layout/            # Layout wrappers (Sidebar, Navigation)
    │   └── stats/             # Statistics display components
    ├── context/               # React context providers
    │   └── WifiContext.tsx     # WiFi connection state and device management
    ├── data/                  # Static data and mock configurations
    ├── hooks/                 # Custom React hooks
    ├── lib/                   # Utility functions
    ├── pages/                 # Route-level page components
    │   ├── Index.tsx          # Entry page (Login ↔ Dashboard switch)
    │   ├── Login.tsx          # Authentication page
    │   ├── Dashboard.tsx      # Main dashboard with device overview
    │   ├── Controls.tsx       # Device control panel
    │   ├── DeviceConfiguration.tsx  # Device settings and calibration
    │   ├── Health.tsx         # Detailed health monitoring
    │   ├── Settings.tsx       # Application settings
    │   ├── Profile.tsx        # User profile management
    │   ├── About.tsx          # About the application
    │   └── NotFound.tsx       # 404 page
    ├── types/                 # TypeScript type definitions
    └── test/                  # Test utilities and test files
```

---

## Application Pages

| Page                     | Route      | Description                                              |
| ------------------------ | ---------- | -------------------------------------------------------- |
| **Login**                | `/`        | Animated login screen; authenticates the user             |
| **Dashboard**            | `/`        | Device overview, health metrics, network activity charts  |
| **Controls**             | sidebar    | Interactive controls for connected AVC devices            |
| **Device Configuration** | sidebar    | Per-device settings, AI model selection, calibration      |
| **Health Monitoring**    | sidebar    | Detailed health metrics: signal, battery, latency         |
| **Settings**             | sidebar    | Application preferences and configurations                |
| **Profile**              | sidebar    | User profile information                                  |
| **About**                | sidebar    | App info, mission statement, specifications               |

---

## Environment & Configuration

### Vite Configuration (`vite.config.ts`)

- **Dev server port:** `8080`
- **Path alias:** `@` → `./src` (e.g., `import X from '@/components/ui/button'`)
- **HMR overlay:** Disabled for a cleaner development experience

### Tailwind CSS (`tailwind.config.ts`)

- Custom color tokens via CSS variables for light/dark theme support
- `tailwindcss-animate` plugin for animations
- `@tailwindcss/typography` plugin for prose styling

### shadcn/ui (`components.json`)

- Style: `default`
- Base color: `slate`
- CSS variables: enabled
- Components path: `@/components/ui`

---

## Building for Production

To create a production-ready bundle:

```bash
npm run build
```

The optimized output will be in the `dist/` directory. You can then deploy it to any static hosting service (Vercel, Netlify, AWS S3, etc.).

To **preview** the production build locally:

```bash
npm run preview
```

This will serve the built files on a local server so you can verify everything works before deploying.

---

## Testing

The project uses **Vitest** with **React Testing Library** for unit and component testing.

```bash
# Run all tests once
npm run test

# Run tests in watch mode (re-runs on changes)
npm run test:watch
```

Test files are located in `src/test/`. The test environment is configured to use `jsdom` for DOM simulation.

---

## Troubleshooting

### Port 8080 is already in use

If you see an error about port 8080 being busy, kill the process using it:

```bash
# macOS / Linux
lsof -ti:8080 | xargs kill -9

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

Or change the port in `vite.config.ts`:

```ts
server: {
  port: 3000, // Change to any available port
}
```

### `npm install` fails

1. Delete `node_modules` and the lock file, then reinstall:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Ensure you are using **Node.js v18+**:

   ```bash
   node --version
   ```

### Blank page after starting the dev server

- Check the browser console for errors (`F12` → Console tab)
- Ensure no TypeScript errors in the terminal where `npm run dev` is running
- Try clearing the Vite cache:

  ```bash
  rm -rf node_modules/.vite
  npm run dev
  ```

### Styles not loading / UI looks broken

Make sure Tailwind's PostCSS plugins are installed:

```bash
npm install -D tailwindcss postcss autoprefixer
```

Then restart the dev server.

---

## License

This project is private. All rights reserved.
