export interface Court {
  id: string;
  name: string;
  type: 'Court' | 'Bay';
  active: boolean;
}

export interface Booking {
  id: string;
  courtId: string;
  courtName: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: 30 | 60 | 90 | 120;
  creditsUsed: number;
  status: 'confirmed' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  creditBalance: number;
  totalCredits: number;
  role: 'member' | 'admin';
}

export interface TimeSlot {
  time: string;
  hour: number;
  reserved: boolean;
  bookingId?: string;
}

export interface CalendarDay {
  date: Date;
  dayOfWeek: string;
  dayNumber: number;
  slots: TimeSlot[];
}
