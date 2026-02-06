# Twindix Academic Finder

A web application for viewing AI-powered assessment analysis results. Companies and universities can enter student or candidate codes to access detailed AI model analysis outputs based on their assessment answers.

## Overview

Twindix Academic Finder provides accurate recommendations for suitable academic and career paths, along with practical steps to help both parents and students make confident, decisive choices about their future.

### Key Features

- **Secure Login**: Authentication system for authorized access
- **Code-Based Results**: Enter unique assessment codes to retrieve analysis
- **AI Analysis Display**: View comprehensive AI-generated insights and recommendations
- **Copy Functionality**: Easily copy analysis results for sharing or documentation
- **User Profile**: Manage account information

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **React Router v7** - Client-side routing
- **ESLint v9** - Code linting

## Project Structure

```
├── public/                    # Static assets
│   ├── favicon.ico
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── offline.html           # PWA offline fallback
│   └── _redirects             # Netlify redirects
├── src/
│   ├── assets/                # Static assets
│   │   ├── icons/             # SVG/TSX icon components
│   │   └── images/            # Image files (logo, etc.)
│   ├── atoms/                 # Custom UI components (project identity)
│   ├── components/            # Shared components with logic
│   ├── constants/             # App constants, routes, and strings
│   ├── enums/                 # TypeScript enums
│   ├── hooks/                 # Custom React hooks
│   ├── interfaces/            # TypeScript interfaces
│   ├── layouts/               # Page layouts (AuthLayout, CodeLayout, MainLayout)
│   ├── pages/                 # Full page components
│   ├── routes/                # React Router configuration
│   ├── services/              # API services & Axios client
│   ├── types/                 # TypeScript type aliases
│   ├── utils/                 # Utility functions
│   ├── app.tsx                # Root application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles & Tailwind theme
├── scripts/                   # Build scripts
├── eslint.config.js           # ESLint flat config
├── vite.config.ts             # Vite configuration with PWA
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies & scripts
├── AGENTS.md                  # AI agent instructions
├── CLAUDE.md                  # Claude-specific configuration
└── README.md                  # Project documentation
```

## Getting Started

### Prerequisites

- Node.js v24.12.0
- npm v11.6.2

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

### Environment Variables

Copy the `.env.example` file to `.env` and fill in the required values:

```bash
cp .env.example .env
```

Required environment variables:

```env
VITE_API_URL=https://your-api-url.com
```

## Pages

| Route | Description |
|-------|-------------|
| `/login` | User authentication |
| `/register` | New user registration |
| `/forgot-password` | Request password reset |
| `/reset-password` | Reset password with token |
| `/code` | Enter assessment code |
| `/result` | View AI analysis results |
| `/profile` | User profile management |
| `*` | 404 Not found page |

---

## License

This project is proprietary software. See the [LICENSE](./LICENSE) file for full details.

Copyright (c) 2025 Twindix Global Inc. All rights reserved.

---

