'use client';

import { useState, useEffect } from 'react';
import { format, isSameDay } from 'date-fns';
import { Court, User, Booking } from '../types';
import { courts, calculateCredits } from '../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  selectedTime: string | null;
  user: User;
  existingBookings: Booking[];
  onBookingComplete: (booking: any) => void;
  onPurchaseCredits: () => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  user,
  existingBookings,
  onBookingComplete,
  onPurchaseCredits,
}: BookingModalProps) {
  const [courtType, setCourtType] = useState<'Court' | 'Bay'>('Court');
  const [duration, setDuration] = useState<30 | 60 | 90 | 120>(60);
  const [selectedCourt, setSelectedCourt] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const credits = calculateCredits(duration);
  const creditsRemaining = user.creditBalance - credits;

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

  // Get courts that are already booked at this time
  const bookedCourtIds = selectedDate && selectedTime 
    ? existingBookings
        .filter(booking => 
          isSameDay(new Date(booking.date), selectedDate) && 
          normalizeTime(booking.startTime) === normalizeTime(selectedTime)
        )
        .map(booking => booking.courtId)
    : [];

  // Check if user already has a booking at this time
  const userHasBookingAtThisTime = selectedDate && selectedTime 
    ? existingBookings.some(booking => 
        isSameDay(new Date(booking.date), selectedDate) && 
        normalizeTime(booking.startTime) === normalizeTime(selectedTime)
      )
    : false;

  // Filter courts by type and exclude already booked courts
  const availableCourts = courts.filter(
    court => court.type === courtType && 
             court.active && 
             !bookedCourtIds.includes(court.id)
  );

  // Reset selected court when type changes
  useEffect(() => {
    setSelectedCourt('');
  }, [courtType]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCourtType('Court');
      setDuration(60);
      setSelectedCourt('');
    }
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !selectedDate || !selectedTime) return null;

  // Check if the selected time is in the past
  const isTimeInPast = () => {
    const now = new Date();
    const slotDate = new Date(selectedDate);
    
    // Parse the time string (e.g., "9 AM", "12 PM")
    const timeParts = selectedTime.match(/(\d+)\s*(AM|PM)/i);
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

  // Check if the selected date is more than 6 weeks in advance
  const isDateTooFarInFuture = () => {
    const now = new Date();
    const sixWeeksFromNow = new Date(now);
    sixWeeksFromNow.setDate(now.getDate() + 42); // 6 weeks = 42 days
    
    return selectedDate > sixWeeksFromNow;
  };

  const handleBooking = () => {
    if (isTimeInPast()) {
      alert('Cannot book a time slot in the past. Please select a future date and time.');
      return;
    }

    if (isDateTooFarInFuture()) {
      alert('Cannot book more than 6 weeks in advance. Please select a date within the next 6 weeks.');
      return;
    }

    if (!selectedCourt) {
      alert('Please select a court or bay');
      return;
    }

    if (creditsRemaining < 0) {
      // Don't allow booking - user must purchase credits
      return;
    }

    // Check if this specific court is already booked at this time
    const courtAlreadyBooked = selectedDate && selectedTime && existingBookings.some(booking =>
      booking.courtId === selectedCourt &&
      isSameDay(new Date(booking.date), selectedDate) &&
      normalizeTime(booking.startTime) === normalizeTime(selectedTime)
    );

    if (courtAlreadyBooked) {
      const court = courts.find(c => c.id === selectedCourt);
      alert(`${court?.name || 'This court'} is already booked at this time. Please select a different court or time slot.`);
      return;
    }

    // Proceed with booking
    completeBooking();
  };

  const completeBooking = () => {

    const court = courts.find(c => c.id === selectedCourt);
    if (!court) return;

    // Calculate end time based on duration
    const startHour = parseInt(selectedTime.split(' ')[0]);
    const isPM = selectedTime.includes('PM');
    
    // Convert to 24-hour format
    let hour24: number;
    if (startHour === 12) {
      hour24 = isPM ? 12 : 0; // 12 PM = 12, 12 AM = 0
    } else {
      hour24 = isPM ? startHour + 12 : startHour; // 1-11 PM = 13-23, 1-11 AM = 1-11
    }
    
    const endHour24 = hour24 + Math.floor(duration / 60);
    const endMinutes = duration % 60;
    
    // Convert back to 12-hour format
    let endHour = endHour24 % 12;
    if (endHour === 0) endHour = 12;
    const endPeriod = endHour24 >= 12 ? 'PM' : 'AM';
    const endTime = `${endHour}:${endMinutes.toString().padStart(2, '0')} ${endPeriod}`;

    const newBooking = {
      id: Date.now().toString(),
      courtId: selectedCourt,
      courtName: court.name,
      date: selectedDate,
      startTime: selectedTime,
      endTime: endTime,
      duration: duration,
      creditsUsed: credits,
      status: 'confirmed' as const,
    };

    onBookingComplete(newBooking);
    setShowConfirmation(false);
    onClose();
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0a0a0a] to-[#1f2937] text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Book Your Court / Bay</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 text-3xl leading-none transition-colors"
            >
              ×
            </button>
          </div>
          <p className="text-sm mt-2 text-gray-300">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4 bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Court Type */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#0a0a0a]">
              Court Type
            </label>
            <select
              value={courtType}
              onChange={(e) => setCourtType(e.target.value as 'Court' | 'Bay')}
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 font-semibold focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all"
            >
              <option value="Court">Court</option>
              <option value="Bay">Bay</option>
            </select>
            <p className="text-xs text-gray-600">Drop Down (Court or Bay)</p>
          </div>

          {/* Length of Time */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#0a0a0a]">
              Length of Time
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value) as 30 | 60 | 90 | 120)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 font-semibold focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all"
            >
              <option value={30}>30 mins</option>
              <option value={60}>60 mins</option>
              <option value={90}>90 mins</option>
              <option value={120}>120 mins</option>
            </select>
            <p className="text-xs text-gray-600">Drop Down (30, 60, 90, 120 mins)</p>
          </div>

          {/* Court Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#0a0a0a]">
              Court Selection
            </label>
            {availableCourts.length === 0 ? (
              <div className="p-3 border-2 border-[#ff6b35] rounded-lg bg-gradient-to-r from-orange-50 to-red-50">
                <p className="text-sm text-[#ff6b35] font-semibold text-center">
                  No {courtType}s available at this time.
                  {courtType === 'Court' ? ' Try selecting "Bay" instead.' : ' Try selecting "Court" instead.'}
                </p>
              </div>
            ) : (
              <>
                <select
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 font-semibold focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 transition-all"
                >
                  <option value="">Select a {courtType}</option>
                  {availableCourts.map(court => (
                    <option key={court.id} value={court.id}>
                      {court.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-600">
                  {availableCourts.length} {courtType}{availableCourts.length !== 1 ? 's' : ''} available
                </p>
              </>
            )}
          </div>

          {/* Credits */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#0a0a0a]">
              Credits
            </label>
            <div className="p-4 bg-gradient-to-r from-[#0a0a0a] to-[#1f2937] text-white rounded-lg text-center font-bold text-lg shadow-lg">
              {credits} Credit{credits !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Credits Remaining */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#0a0a0a]">
              Credits Remaining
            </label>
            <div className={`p-4 rounded-lg text-center font-bold text-lg shadow-lg ${
              creditsRemaining < 0 ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' : 'bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white'
            }`}>
              {creditsRemaining} Credit{creditsRemaining !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Past Time Slot Warning */}
          {isTimeInPast() && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-bold text-red-800">Time Slot Unavailable</h3>
                  <p className="text-sm text-red-700 mt-1">
                    This time slot is in the past. Please select a future date and time.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Too Far in Future Warning */}
          {!isTimeInPast() && isDateTooFarInFuture() && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-bold text-yellow-800">Booking Too Far in Advance</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Bookings can only be made up to 6 weeks in advance. Please select a date within the next 6 weeks.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Insufficient Credits Warning */}
          {!isTimeInPast() && !isDateTooFarInFuture() && creditsRemaining < 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-bold text-red-800">Insufficient Credits</h3>
                  <p className="text-sm text-red-700 mt-1">
                    You need {Math.abs(creditsRemaining)} more credit{Math.abs(creditsRemaining) !== 1 ? 's' : ''} to complete this booking.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Complete Booking Button or Purchase Credits Button */}
          {isTimeInPast() || isDateTooFarInFuture() ? (
            <button
              disabled
              className="w-full p-4 rounded-xl font-bold text-lg text-white transition-all opacity-50 cursor-not-allowed bg-gradient-to-r from-gray-500 to-gray-600"
            >
              {isTimeInPast() ? 'Time Slot Unavailable' : 'Too Far in Advance'}
            </button>
          ) : creditsRemaining < 0 ? (
            <button
              onClick={() => {
                onClose();
                onPurchaseCredits();
              }}
              className="w-full p-4 rounded-xl font-bold text-lg text-white transition-all bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:shadow-xl hover:scale-105"
            >
              Purchase More Credits
            </button>
          ) : (
            <button
              onClick={handleBooking}
              disabled={!selectedCourt}
              className="w-full p-4 rounded-xl font-bold text-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:shadow-xl hover:scale-105 shadow-lg"
            >
              Complete Booking!
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog Overlay */}
      {showConfirmation && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10 backdrop-blur-sm rounded-2xl">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm mx-4 overflow-hidden">
            {/* Confirmation Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
              <div className="flex items-center justify-center">
                <div className="bg-white rounded-full p-3">
                  <svg className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Confirmation Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                Double Booking Alert
              </h3>
              <p className="text-gray-700 text-center mb-2">
                You already have a court booked at this time:
              </p>
              <p className="text-center font-bold text-[#ff6b35] mb-4">
                {selectedTime && format(selectedDate!, 'EEEE, MMMM d')} at {selectedTime}
              </p>
              <p className="text-gray-600 text-center text-sm mb-6">
                Are you sure you want to book another court at the same time?
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCancelConfirmation}
                  className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={completeBooking}
                  className="px-4 py-3 bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:shadow-lg text-white font-semibold rounded-xl transition-all"
                >
                  Yes, Book It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
