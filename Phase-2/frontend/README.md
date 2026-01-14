# TaskFlow Pro Frontend

A modern, professional task management application built with Next.js 15, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **shadcn/ui** - Component library
- **Zod** - Schema validation
- **React Hook Form** - Form management
- **Zustand** - State management
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/                  # Next.js app router
│   ├── globals.css      # Global styles with Tailwind
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # React components
│   └── ui/             # shadcn/ui components
├── lib/                # Utility functions
│   └── utils.ts        # CN helper and utilities
├── .env.local          # Environment variables
├── tailwind.config.ts  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies

```

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Design System

### Glassmorphic Design
- Background: `bg-white/80` with `backdrop-blur-xl`
- Cards use the `.glass` utility class

### Animations
- Duration: 200-400ms
- Properties: transform and opacity only (for 60fps)
- Use `.animate-fast` (200ms) or `.animate-smooth` (300ms) utility classes

### Responsive Breakpoints
- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features to Implement

- Authentication (signup/login)
- JWT token management
- Task dashboard
- Create/edit/delete tasks
- Task filtering and search
- Responsive design
- Form validation with Zod
- Error handling

## License

MIT
