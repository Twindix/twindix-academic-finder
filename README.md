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
- **Zustand** - State management
- **ESLint v9** - Code linting

## Project Structure

```
src/
├── assets/           # Images and icons
├── components/
│   ├── ui/           # Reusable UI components (Button, Input, Logo)
│   ├── layout/       # Layout components (AuthLayout, MainLayout, Sidebar)
│   └── features/     # Feature-specific components (ChatBox)
├── pages/            # Page components (Login, Code, Result, Profile)
├── store/            # Zustand state management
├── services/         # API services
├── routes/           # React Router configuration
├── types/            # TypeScript type definitions
└── hooks/            # Custom React hooks
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

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

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://your-api-url.com
```

## Pages

| Route | Description |
|-------|-------------|
| `/login` | User authentication |
| `/code` | Enter assessment code |
| `/result` | View AI analysis results |
| `/profile` | User profile management |

## License

Proprietary - Twindix Global Inc.

## Contact

Twindix Global Inc. - Since 2016
