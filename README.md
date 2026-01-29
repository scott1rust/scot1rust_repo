# Blazing Paddles - Pickleball Court Booking System

A modern, credit-based reservation system for pickleball centers built with Next.js 16, React 19, and Tailwind CSS.

![Blazing Paddles](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## Features

### ✅ Core Features (MVP - Completed)

- **📅 Weekly Calendar View**
  - Interactive calendar showing court availability from 8 AM - 8 PM
  - Visual indicators for reserved vs. available time slots
  - Click any time slot to open booking modal
  - Week navigation (previous/next week)
  - Highlighted current day

- **🎾 Smart Booking System**
  - Select court type (Court or Bay)
  - Choose duration (30, 60, 90, or 120 minutes)
  - Pick from available courts/bays
  - Real-time credit calculation
  - Credit balance validation
  - Instant booking confirmation

- **👤 My Sessions Dashboard**
  - View all upcoming bookings
  - See booking details (date, location, time, credits used)
  - Credit balance tracking
    - Total credit budget
    - Credits used
    - Credits remaining
  - Quick "Book a Court" action button

- **🎨 Beautiful UI**
  - Clean, modern design matching provided mockups
  - Responsive layout (mobile, tablet, desktop)
  - Intuitive navigation with tab system
  - Color-coded elements for easy recognition

### 🚀 Bonus Features (Planned)

- **🔐 Member Login System**
  - User authentication
  - Secure session management
  - Member profiles

- **⚙️ Admin Dashboard**
  - Add/edit/remove calendar blocks
  - Create group training events
  - Manage member accounts and credits
  - Set credit costs for different booking types

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Date Utilities**: [date-fns](https://date-fns.org/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd scot1rust_repo
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
scot1rust_repo/
├── app/
│   ├── components/
│   │   ├── Header.tsx          # Navigation header with tabs
│   │   ├── Calendar.tsx        # Weekly calendar view
│   │   ├── BookingModal.tsx    # Booking form modal
│   │   ├── MySessions.tsx      # User sessions dashboard
│   │   └── Footer.tsx          # Footer component
│   ├── data/
│   │   └── mockData.ts         # Mock data for courts, bookings, users
│   ├── types.ts                # TypeScript type definitions
│   ├── globals.css             # Global styles and CSS variables
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page component
├── public/                     # Static assets
├── PROJECT_SPEC.md            # Detailed project specification
└── README.md                  # This file
```

## Color Scheme

The app uses a carefully selected color palette:

- **Primary Orange**: `#FF8C42` - Credit badges, action buttons
- **Primary Green**: `#4CAF50` - Success actions, "Book" buttons
- **Beige**: `#F5E6D3` - Background highlights, card backgrounds
- **Yellow**: `#FFD700` - Calendar highlights for current day
- **Dark Gray**: `#333333` - Text and reserved blocks
- **Light Gray**: `#F5F5F5` - Backgrounds

## Key Components

### Calendar Component
- Displays a weekly view of court availability
- Shows time slots from 8 AM to 8 PM
- Highlights reserved slots
- Allows clicking on available slots to book

### Booking Modal
- Appears when user clicks an available time slot
- Provides dropdowns for court type, duration, and court selection
- Calculates credits in real-time
- Validates credit balance before booking

### My Sessions
- Lists all upcoming bookings
- Shows credit balance summary
- Provides quick access to book more courts

## Mock Data

The app currently uses mock data located in `app/data/mockData.ts`:

- **4 Courts/Bays**: Battery Bay, Paddington Pickle Court, Smash Court, Dink Bay
- **Mock User**: 10 credit budget
- **Sample Bookings**: Pre-populated calendar with example reservations

## Credit System

Credits are calculated based on booking duration:
- **30 minutes** = 1 credit
- **60 minutes** = 2 credits
- **90 minutes** = 3 credits
- **120 minutes** = 4 credits

## Future Enhancements

### Phase 1: Backend Integration
- [ ] Set up database (Vercel Postgres or Supabase)
- [ ] Create API routes for CRUD operations
- [ ] Implement real-time updates
- [ ] Add data persistence

### Phase 2: Authentication
- [ ] Implement NextAuth.js or Clerk
- [ ] Add login/signup pages
- [ ] Protect routes
- [ ] User session management

### Phase 3: Admin Features
- [ ] Admin dashboard
- [ ] Calendar management interface
- [ ] Group training event creation
- [ ] Member management system
- [ ] Credit allocation tools

### Phase 4: Advanced Features
- [ ] Email notifications
- [ ] Booking reminders
- [ ] Cancellation system with credit refunds
- [ ] Recurring bookings
- [ ] Waitlist functionality
- [ ] Payment integration

## Deployment to Vercel

1. Push your code to GitHub

2. Import project in Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. Deploy!

Your app will be live at `https://your-project.vercel.app`

## Development Notes

- The app uses Next.js App Router (not Pages Router)
- All components are client components (`'use client'`) for interactivity
- State management is currently handled with React hooks
- Styling uses Tailwind CSS v4 with inline theme configuration

## Context Preservation

For future development sessions, refer to `PROJECT_SPEC.md` which contains:
- Complete feature specifications
- UI/UX requirements
- Data models
- Development phases
- Success criteria

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

All rights reserved © 2026 Blazing Paddles

## Support

For questions or issues, please contact the development team.

---

**Built with ❤️ for pickleball enthusiasts**
