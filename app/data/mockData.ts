import { Court, Booking, User } from '../types';

export const courts: Court[] = [
  { id: '1', name: 'Battery Bay', type: 'Bay', active: true },
  { id: '2', name: 'Paddington Pickle Court', type: 'Court', active: true },
  { id: '3', name: 'Smash Court', type: 'Court', active: true },
  { id: '4', name: 'Dink Bay', type: 'Bay', active: true },
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  creditBalance: 12, // Remaining credits after bookings (20 total - 8 used = 12 remaining)
  totalCredits: 20, // Total credits allocated
  role: 'member',
};

// Mock bookings - these will be used to populate the calendar
// Using dates in February 2026 (future dates relative to January 28, 2026)
export const mockBookings: Booking[] = [
  {
    id: '1',
    courtId: '1',
    courtName: 'Battery Bay',
    date: new Date(2026, 1, 3), // February 3, 2026 (Monday)
    startTime: '9:00 AM',
    endTime: '10:00 AM',
    duration: 60,
    creditsUsed: 2,
    status: 'confirmed',
  },
  {
    id: '2',
    courtId: '2',
    courtName: 'Paddington Pickle Court',
    date: new Date(2026, 1, 5), // February 5, 2026 (Wednesday)
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    duration: 90,
    creditsUsed: 3,
    status: 'confirmed',
  },
  {
    id: '3',
    courtId: '3',
    courtName: 'Smash Court',
    date: new Date(2026, 1, 6), // February 6, 2026 (Thursday)
    startTime: '1:00 PM',
    endTime: '2:30 PM',
    duration: 90,
    creditsUsed: 3,
    status: 'confirmed',
  },
];

// Helper function to calculate credits based on duration
export function calculateCredits(duration: 30 | 60 | 90 | 120): number {
  const creditMap = {
    30: 1,
    60: 2,
    90: 3,
    120: 4,
  };
  return creditMap[duration];
}

// Time slots for the calendar (8 AM - 8 PM)
export const timeSlots = [
  '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
  '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'
];
