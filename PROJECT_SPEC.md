# Blazing Paddles - Pickleball Court Booking System

## Project Overview
A web-based reservation system for a pickleball center that allows members to book courts/bays using a credit-based system.

## Core Features

### 1. Court/Bay Availability Calendar
- **Weekly calendar view** showing available time slots (8 AM - 8 PM)
- **Date navigation** with day-of-week headers (SUN, MON, TUE, etc.)
- **Visual indicators** for reserved vs. available slots
- **Filter system** to search for:
  - Specific Court or Bay
  - Week of the Year
- **Interactive booking** - Click any portion of the calendar to open booking page
- **Real-time updates** to reflect latest reservations

### 2. Booking System
- **Court Type Selection** - Dropdown for Court or Bay
- **Length of Time** - Dropdown options: 30, 60, 90, 120 minutes
- **Court Selection** - Dropdown showing available courts/bays
- **Credit System**:
  - Display credits required for booking
  - Show credits remaining after booking
  - Prevent booking if insufficient credits
- **Complete Booking** button (orange/coral color)

### 3. My Sessions View
- **Upcoming bookings list** showing:
  - Date
  - Location (e.g., "Battery Bay", "Paddington Pickle Court")
  - Time slot
  - Credits used (displayed in orange badge)
- **Credit Balance Dashboard**:
  - Total credit budget (e.g., "10 Credit Budget")
  - Credits used (e.g., "3.5 Credits Used")
  - Credits remaining (highlighted in beige/tan)
- **Quick action** - "Book a Court / Bay" button (green)

## Navigation
- **Header**: 
  - "Blazing Paddles" logo/brand
  - "Book a Court" tab
  - "My Sessions" tab

## Bonus Features (Phase 2)

### 1. Member Login System
- User authentication
- Member profiles
- Session management

### 2. Admin View
- Add/edit/remove calendar blocks
- Create group training events
- Set credit costs for events
- Manage member accounts and credits

## Technical Requirements

### Tech Stack
- **Framework**: Next.js (already initialized)
- **Styling**: Tailwind CSS (recommended for rapid development)
- **Database**: TBD (Vercel Postgres, Supabase, or similar)
- **Authentication**: NextAuth.js or Clerk (for bonus feature)
- **Deployment**: Vercel

### Color Scheme
- **Primary Orange/Coral**: #FF8C42 (approximately) - for credit badges, complete booking button
- **Green**: #4CAF50 (approximately) - for action buttons
- **Beige/Tan**: #F5E6D3 (approximately) - for backgrounds, remaining credits
- **Yellow**: #FFD700 (approximately) - for calendar column highlights
- **Dark Gray**: #333333 - for text and reserved blocks
- **White**: #FFFFFF - for backgrounds

### Data Models (Initial)

#### Court/Bay
- id
- name (e.g., "Battery Bay", "Paddington Pickle Court")
- type (Court or Bay)
- active status

#### Booking
- id
- userId
- courtId
- date
- startTime
- endTime
- duration (30, 60, 90, 120 minutes)
- creditsUsed
- status (confirmed, cancelled)

#### User/Member
- id
- name
- email
- creditBalance
- totalCredits
- role (member, admin)

#### TimeSlot
- Used for calendar grid generation
- 8 AM - 8 PM in configurable intervals

## UI/UX Notes
- Clean, minimal design
- Mobile-responsive
- Clear visual hierarchy
- Intuitive booking flow
- Real-time availability updates
- Confirmation messages for bookings

## Development Phases

### Phase 1: Core MVP
1. Calendar view with mock data
2. Basic booking flow
3. My Sessions view
4. Credit tracking (client-side)

### Phase 2: Backend Integration
1. Database setup
2. API routes for CRUD operations
3. Real-time updates
4. Data persistence

### Phase 3: Authentication
1. Member login system
2. Protected routes
3. User sessions

### Phase 4: Admin Features
1. Admin dashboard
2. Calendar management
3. Event creation
4. Member management

## Success Criteria
- Users can view available court times
- Users can book courts using credits
- Calendar updates in real-time
- Credit balance is accurately tracked
- Intuitive and responsive UI
- Fast page loads and interactions
