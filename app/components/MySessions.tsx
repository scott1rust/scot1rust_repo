'use client';

import { format } from 'date-fns';
import { Booking, User } from '../types';

interface MySessionsProps {
  bookings: Booking[];
  user: User;
  onBookNewCourt: () => void;
  onPurchaseCredits: () => void;
  onModifyBooking: (booking: Booking) => void;
}

export default function MySessions({ bookings, user, onBookNewCourt, onPurchaseCredits, onModifyBooking }: MySessionsProps) {
  // Helper function to check if a booking is in the past
  const isBookingInPast = (booking: Booking): boolean => {
    const now = new Date();
    const bookingDate = new Date(booking.date);
    
    // Parse the time string (e.g., "9 AM", "12 PM")
    const timeParts = booking.startTime.match(/(\d+)\s*(AM|PM)/i);
    if (!timeParts) return false;
    
    let hour = parseInt(timeParts[1]);
    const period = timeParts[2].toUpperCase();
    
    // Convert to 24-hour format
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    
    bookingDate.setHours(hour, 0, 0, 0);
    
    return bookingDate < now;
  };

  // Sort bookings by date and separate future from past
  const allSortedBookings = [...bookings]
    .filter(b => b.status === 'confirmed')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const futureBookings = allSortedBookings.filter(b => !isBookingInPast(b));
  const sortedBookings = futureBookings; // Only show future bookings

  const creditsUsed = sortedBookings.reduce((sum, booking) => sum + booking.creditsUsed, 0);
  const creditsRemaining = user.totalCredits - creditsUsed;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#0a0a0a]">My Sessions</h2>

      {/* Bookings List */}
      <div className="space-y-4 mb-8">
        {sortedBookings.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 shadow-sm">
            <p className="text-gray-600 text-lg mb-4 font-semibold">No upcoming sessions</p>
            <button
              onClick={onBookNewCourt}
              className="px-6 py-3 text-white font-bold rounded-lg bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:shadow-lg transition-all hover:scale-105"
            >
              Book a Court / Bay
            </button>
          </div>
        ) : (
          sortedBookings.map((booking) => (
            <div
              key={booking.id}
              className="p-6 rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <p className="font-bold text-lg text-[#0a0a0a]">
                    {format(new Date(booking.date), 'MMMM d, yyyy')}
                  </p>
                  <p className="text-gray-700 font-semibold mt-1">
                    {booking.courtName}
                  </p>
                  <p className="text-gray-600 text-sm mt-1 font-medium">
                    {booking.startTime} - {booking.endTime}
                  </p>
                </div>
                <div className="px-6 py-3 rounded-lg font-bold text-lg text-white bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] shadow-md">
                  {booking.creditsUsed} Credit{booking.creditsUsed !== 1 ? 's' : ''}
                </div>
              </div>
              <button
                onClick={() => onModifyBooking(booking)}
                className="w-full p-3 rounded-lg font-bold text-sm text-white bg-gradient-to-r from-[#0a0a0a] to-[#1f2937] hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                Modify / Cancel Booking
              </button>
            </div>
          ))
        )}
      </div>

      {/* Credit Balance */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-center mb-4 text-[#0a0a0a]">Credit Balance</h3>
        
        <div className="p-4 bg-white border-2 border-gray-300 rounded-xl text-center shadow-sm">
          <p className="text-lg font-bold text-[#0a0a0a]">
            {user.totalCredits} Credit Budget
          </p>
        </div>

        <div className="p-4 bg-white border-2 border-gray-300 rounded-xl text-center shadow-sm">
          <p className="text-lg font-bold text-[#0a0a0a]">
            {creditsUsed.toFixed(1)} Credits Used
          </p>
        </div>

        <div className="p-4 border-2 border-[#ff6b35] rounded-xl text-center bg-gradient-to-r from-orange-50 to-red-50 shadow-sm">
          <p className="text-lg font-bold text-[#ff6b35]">
            {creditsRemaining.toFixed(1)} Credits Remain
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <button
            onClick={onPurchaseCredits}
            className="p-4 text-white font-bold text-lg rounded-xl bg-gradient-to-r from-[#9333ea] to-[#7c3aed] hover:shadow-xl transition-all hover:scale-105 shadow-lg"
          >
            💳 Purchase Credits
          </button>
          <button
            onClick={onBookNewCourt}
            className="p-4 text-white font-bold text-lg rounded-xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:shadow-xl transition-all hover:scale-105 shadow-lg"
          >
            Book a Court / Bay
          </button>
        </div>

        {/* Low Credit Warning */}
        {creditsRemaining < 5 && creditsRemaining > 0 && (
          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Low Credit Balance:</strong> You have {creditsRemaining.toFixed(1)} credits remaining. Consider purchasing more credits.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* No Credits Warning */}
        {creditsRemaining <= 0 && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  <strong>No Credits Available:</strong> You need to purchase credits before you can make a booking.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
