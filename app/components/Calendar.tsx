'use client';

import { useState, useMemo } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { Booking } from '../types';
import { timeSlots, courts } from '../data/mockData';

interface CalendarProps {
  bookings: Booking[];
  onTimeSlotClick: (date: Date, time: string) => void;
}

export default function Calendar({ bookings, onTimeSlotClick }: CalendarProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => 
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );

  // Generate 7 days starting from Sunday
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  }, [currentWeekStart]);

  // Helper function to normalize time format for comparison
  const normalizeTime = (time: string): string => {
    // Parse time like "9 AM", "9:00 AM", "12 PM", etc.
    const timeParts = time.match(/(\d+):?(\d+)?\s*(AM|PM)/i);
    if (!timeParts) return time;
    
    const hour = parseInt(timeParts[1]);
    const minutes = timeParts[2] || '00';
    const period = timeParts[3].toUpperCase();
    
    return `${hour}:${minutes} ${period}`;
  };

  // Check if a time slot is in the past
  const isSlotInPast = (date: Date, time: string): boolean => {
    const now = new Date();
    const slotDate = new Date(date);
    
    // Parse the time string (e.g., "9 AM", "12 PM")
    const timeParts = time.match(/(\d+)\s*(AM|PM)/i);
    if (!timeParts) return false;
    
    let hour = parseInt(timeParts[1]);
    const period = timeParts[2].toUpperCase();
    
    // Convert to 24-hour format
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    slotDate.setHours(hour, 0, 0, 0);
    
    return slotDate < now;
  };

  // Check if a time slot is more than 6 weeks in advance
  const isSlotTooFarInFuture = (date: Date): boolean => {
    const now = new Date();
    const sixWeeksFromNow = new Date(now);
    sixWeeksFromNow.setDate(now.getDate() + 42); // 6 weeks = 42 days
    
    return date > sixWeeksFromNow;
  };

  // Check if ALL courts are reserved for a specific time slot
  const isSlotFullyBooked = (date: Date, time: string): boolean => {
    const normalizedTime = normalizeTime(time);
    
    // Get all bookings for this date and time
    const bookingsAtThisTime = bookings.filter(booking => {
      if (!isSameDay(new Date(booking.date), date)) return false;
      return normalizeTime(booking.startTime) === normalizedTime;
    });
    
    // Get the number of active courts
    const totalActiveCourts = courts.filter(court => court.active).length;
    
    // Slot is fully booked only if number of bookings equals total courts
    return bookingsAtThisTime.length >= totalActiveCourts;
  };

  // Get count of available courts for a time slot
  const getAvailableCourtsCount = (date: Date, time: string): number => {
    const normalizedTime = normalizeTime(time);
    
    const bookingsAtThisTime = bookings.filter(booking => {
      if (!isSameDay(new Date(booking.date), date)) return false;
      return normalizeTime(booking.startTime) === normalizedTime;
    });
    
    const totalActiveCourts = courts.filter(court => court.active).length;
    return totalActiveCourts - bookingsAtThisTime.length;
  };

  // Get all reservations for a specific day
  const getDayReservations = (date: Date) => {
    return bookings.filter(booking => isSameDay(new Date(booking.date), date));
  };

  // Navigate to previous/next week
  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStart(prev => addDays(prev, direction === 'next' ? 7 : -7));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#0a0a0a]">Court / Bay Availability</h2>
      
      {/* Filter System */}
      <div className="mb-6">
        <div className="max-w-2xl mx-auto p-4 border-2 border-[#ff6b35] bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
          <div className="text-center">
            <p className="font-semibold text-[#0a0a0a]">Filter System</p>
            <p className="text-sm text-gray-600">(Search for Court or Bay, Search for Week of the Year)</p>
          </div>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <button
          onClick={() => navigateWeek('prev')}
          className="px-4 py-2 bg-[#0a0a0a] text-white hover:bg-[#1f2937] rounded-lg font-semibold transition-colors"
        >
          ← Previous Week
        </button>
        <span className="text-sm font-semibold text-gray-700">
          {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
        </span>
        <button
          onClick={() => navigateWeek('next')}
          className="px-4 py-2 bg-[#0a0a0a] text-white hover:bg-[#1f2937] rounded-lg font-semibold transition-colors"
        >
          Next Week →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full px-4 sm:px-0">
          {/* Day Headers */}
          <div className="grid grid-cols-8 gap-0 border-b-2 border-gray-300">
            <div className="p-2 text-center font-bold text-sm text-white bg-[#0a0a0a]">
              TIME
            </div>
            {weekDays.map((day, index) => {
              const isToday = isSameDay(day, new Date());
              return (
                <div
                  key={index}
                  className={`p-2 text-center border-l border-gray-200 ${
                    isToday ? 'bg-gradient-to-br from-orange-100 to-red-100' : 'bg-gray-50'
                  }`}
                >
                  <div className="text-xs font-bold text-gray-600 uppercase">
                    {format(day, 'EEE')}
                  </div>
                  <div className={`text-2xl font-bold mt-1 ${
                    isToday ? 'text-[#ff6b35]' : 'text-gray-900'
                  }`}>
                    {isToday && (
                      <div className="w-10 h-10 mx-auto bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] text-white rounded-full flex items-center justify-center shadow-lg">
                        {format(day, 'd')}
                      </div>
                    )}
                    {!isToday && format(day, 'd')}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time Slots */}
          {timeSlots.map((time, timeIndex) => (
            <div key={timeIndex} className="grid grid-cols-8 gap-0 border-b border-gray-200">
              {/* Time Label */}
              <div className="p-3 text-sm font-semibold text-gray-700 bg-gray-50 flex items-start">
                {time}
              </div>

              {/* Day Columns */}
              {weekDays.map((day, dayIndex) => {
                const isPast = isSlotInPast(day, time);
                const isTooFar = isSlotTooFarInFuture(day);
                const fullyBooked = isSlotFullyBooked(day, time);
                const availableCount = getAvailableCourtsCount(day, time);
                const hasBookings = availableCount < courts.filter(c => c.active).length;
                const isToday = isSameDay(day, new Date());
                const isDisabled = isPast || isTooFar || fullyBooked;
                
                return (
                  <div
                    key={dayIndex}
                    onClick={() => !isDisabled && onTimeSlotClick(day, time)}
                    className={`min-h-[80px] p-2 border-l border-gray-200 transition-all ${
                      isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                    } ${
                      isToday && !isPast ? 'bg-orange-50/30' : 'bg-white'
                    } ${
                      isPast
                        ? 'bg-gray-50 opacity-40'
                        : isTooFar
                        ? 'bg-gray-50 opacity-40'
                        : fullyBooked 
                        ? 'bg-gray-100' 
                        : hasBookings
                        ? 'bg-orange-50 hover:bg-orange-100 hover:shadow-inner'
                        : 'hover:bg-green-50 hover:shadow-inner'
                    }`}
                  >
                    {isPast ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center text-xs font-medium text-gray-400">
                          Past
                        </div>
                      </div>
                    ) : isTooFar ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center text-xs font-medium text-gray-400">
                          Too Far<br />Ahead
                        </div>
                      </div>
                    ) : fullyBooked ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center p-2 bg-white border-2 border-gray-400 rounded-lg text-xs font-semibold text-gray-600">
                          All Courts<br />Reserved
                        </div>
                      </div>
                    ) : hasBookings ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center p-2 bg-white border-2 border-[#ff6b35] rounded-lg text-xs font-bold text-[#ff6b35] shadow-sm">
                          {availableCount} Court{availableCount !== 1 ? 's' : ''}<br />Available
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center text-sm text-gray-600 italic">
        Click on any portion of the calendar to open the booking page.
      </div>
    </div>
  );
}
