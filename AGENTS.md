<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# HanTech Project - Development Notes

## Project Overview
Modern SaaS dashboard built with Next.js 16.2.1, shadcn/ui, Tailwind CSS v4

## Completed Features

### Core Infrastructure
- Next.js 16.2.1 with App Router
- TypeScript for type safety
- Tailwind CSS v4
- shadcn/ui components
- Radix UI primitives
- Recharts for data visualization

### Dashboard
- Statistics cards with trend indicators
- Interactive charts (Area, Bar, Pie, Line)
- Recent sales list
- Transactions table
- Quick actions
- Goals/KPIs section

### Reports (Excel)
- Multiple report templates
- Excel export functionality (xlsx/SheetJS)
- Sales, financial, user reports

### Settings
- Profile management
- Theme customization (light/dark)
- 8 primary color options
- Font size adjustment
- Animation toggle
- Compact mode

### Auth Pages
- Login with validation
- Register with password strength meter
- Forgot password with resend cooldown
- Password reset
- Form validation and error handling

### UI/UX
- Responsive design
- Dark/light theme
- Theme persistence
- Loading states (skeletons)
- Toast notifications (Sonner)
- Smooth transitions

### Performance
- Static page generation
- Optimized imports
- Image optimization
- Headers security

### Code Quality
- TypeScript types
- Error handling utilities
- Error boundaries
- Form validation

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── excel/
│   │   └── settings/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   └── header.tsx
│   ├── ui/ (shadcn components)
│   └── excel/
├── hooks/
│   ├── use-appearance.tsx
│   └── use-sidebar.tsx
├── lib/
│   ├── errors.ts
│   ├── toast.ts
│   ├── excel-report.ts
│   └── utils.ts
└── types/
    └── index.ts
```

## Key Files

- `src/components/layout/sidebar.tsx` - Main navigation
- `src/components/layout/header.tsx` - Header with search/notifications
- `src/app/dashboard/page.tsx` - Main dashboard
- `src/app/dashboard/excel/page.tsx` - Reports page
- `src/app/dashboard/settings/page.tsx` - Settings page
- `src/app/layout.tsx` - Root layout with theme provider
- `src/hooks/use-appearance.tsx` - Theme/color settings
- `next.config.ts` - Next.js configuration

## Running the Project

```bash
npm install
npm run dev     # Development
npm run build    # Production build
npm start       # Production server
```

## Notes for Future Development

1. Backend integration required for:
   - User authentication (currently simulated)
   - Data fetching (currently mocked)
   - Excel export (currently client-side only)

2. Pages that could be added:
   - Customer management
   - Invoice management
   - Analytics/Reports page
   - User management

3. Features to implement:
   - Database connection
   - API routes
   - Authentication (NextAuth.js recommended)
   - Real-time updates (WebSocket)
   - Email notifications
   - File upload/download
   - Search functionality

4. Current limitations:
   - Static pages only (no SSR/ISR)
   - Mock data (not from API)
   - No database
   - Demo auth (no real security)
