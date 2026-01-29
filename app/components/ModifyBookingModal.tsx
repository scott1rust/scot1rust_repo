'use client';

import { useState, useEffect } from 'react';
import { format, isSameDay } from 'date-fns';
import { Court, User, Booking } from '../types';
import { courts, calculateCredits } from '../data/mockData';

interface ModifyBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  user: User;
  existingBookings: Booking[];
  onModifyComplete: (originalBooking: Booking, modifiedBooking: Booking) => void;
  onCancelComplete: (booking: Booking) => void;
  onPurchaseCredits: () => void;
}

export default function ModifyBookingModal({
  isOpen,
  onClose,
  booking,
  user,
  existingBookings,
  onModifyComplete,
  onCancelComplete,
  onPurchaseCredits,
}: ModifyBookingModalProps) {
  const [courtType, setCourtType] = useState<'Court' | 'Bay'>('Court');
  const [duration, setDuration] = useState<30 | 60 | 90 | 120>(60);
  const [selectedCourt, setSelectedCourt] = useState<string>('');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const credits = calculateCredits(duration);
  const creditDifference = credits - (booking?.creditsUsed || 0);
  const creditsRemaining = user.creditBalance - creditDifference;

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

  // Get courts that are already booked at this time (excluding current booking)
  const bookedCourtIds = booking 
    ? existingBookings
        .filter(b => 
          b.id !== booking.id && // Exclude the current booking being modified
          isSameDay(new Date(b.date), new Date(booking.date)) && 
          normalizeTime(b.startTime) === normalizeTime(booking.startTime)
        )
        .map(b => b.courtId)
    : [];

  // Filter courts by type and exclude already booked courts
  const availableCourts = courts.filter(
    court => court.type === courtType && 
             court.active && 
             !bookedCourtIds.includes(court.id)
  );

  // Initialize form with booking data
  useEffect(() => {
    if (isOpen && booking) {
      const court = courts.find(c => c.id === booking.courtId);
      setCourtType(court?.type || 'Court');
      setDuration(booking.duration);
      setSelectedCourt(booking.courtId);
      setShowCancelConfirm(false);
    }
  }, [isOpen, booking]);

  // Reset selected court when type changes
  useEffect(() => {
    if (isOpen && booking) {
      const court = courts.find(c => c.id === booking.courtId);
      if (court?.type !== courtType) {
        setSelectedCourt('');
      }
    }
  }, [courtType, isOpen, booking]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (showCancelConfirm) {
          setShowCancelConfirm(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, showCancelConfirm, onClose]);

  if (!isOpen || !booking) return null;

  const handleModify = () => {
    if (!selectedCourt) {
      alert('Please select a court or bay');
      return;
    }

    if (creditsRemaining < 0) {
      // Don't allow modification - user must purchase credits
      return;
    }

    // Check if this specific court is already booked at this time (excluding current booking)
    const courtAlreadyBooked = booking && existingBookings.some(b =>
      b.id !== booking.id && // Exclude current booking
      b.courtId === selectedCourt &&
      isSameDay(new Date(b.date), new Date(booking.date)) &&
      normalizeTime(b.startTime) === normalizeTime(booking.startTime)
    );

    if (courtAlreadyBooked) {
      const court = courts.find(c => c.id === selectedCourt);
      alert(`${court?.name || 'This court'} is already booked at this time. Please select a different court.`);
      return;
    }

    const court = courts.find(c => c.id === selectedCourt);
    if (!court) return;

    // Calculate end time based on duration
    const startHour = parseInt(booking.startTime.split(' ')[0]);
    const isPM = booking.startTime.includes('PM');
    
    // Convert to 24-hour format
    let hour24: number;
    if (startHour === 12) {
      hour24 = isPM ? 12 : 0;
    } else {
      hour24 = isPM ? startHour + 12 : startHour;
    }
    
    const endHour24 = hour24 + Math.floor(duration / 60);
    const endMinutes = duration % 60;
    
    // Convert back to 12-hour format
    let endHour = endHour24 % 12;
    if (endHour === 0) endHour = 12;
    const endPeriod = endHour24 >= 12 ? 'PM' : 'AM';
    const endTime = `${endHour}:${endMinutes.toString().padStart(2, '0')} ${endPeriod}`;

    const modifiedBooking: Booking = {
      ...booking,
      courtId: selectedCourt,
      courtName: court.name,
      endTime: endTime,
      duration: duration,
      creditsUsed: credits,
    };

    onModifyComplete(booking, modifiedBooking);
    onClose();
  };

  const handleCancel = () => {
    onCancelComplete(booking);
    onClose();
  };

  // Cancel confirmation view
  if (showCancelConfirm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
            <h2 className="text-2xl font-bold">Cancel Booking?</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <p className="text-gray-700 text-lg">
              Are you sure you want to cancel this booking?
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
              <p className="font-bold text-[#0a0a0a]">
                {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}
              </p>
              <p className="text-gray-700 font-semibold mt-1">
                {booking.courtName}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                {booking.startTime} - {booking.endTime}
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-sm text-green-800">
                <strong>Credit Refund:</strong> {booking.creditsUsed} credit{booking.creditsUsed !== 1 ? 's' : ''} will be returned to your balance.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="p-3 rounded-xl font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancel}
                className="p-3 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:shadow-xl transition-all hover:scale-105"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main modify view
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0a0a0a] to-[#1f2937] text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Modify Booking</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 text-3xl leading-none transition-colors"
            >
              ×
            </button>
          </div>
          <p className="text-sm mt-2 text-gray-300">
            {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')} at {booking.startTime}
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
            )}
          </div>

          {/* Credits */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#0a0a0a]">
              Credits Required
            </label>
            <div className="p-4 bg-gradient-to-r from-[#0a0a0a] to-[#1f2937] text-white rounded-lg text-center font-bold text-lg shadow-lg">
              {credits} Credit{credits !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Credit Difference */}
          {creditDifference !== 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0a0a0a]">
                Credit Change
              </label>
              <div className={`p-4 rounded-lg text-center font-bold text-lg shadow-lg ${
                creditDifference > 0 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
              }`}>
                {creditDifference > 0 ? '+' : ''}{creditDifference} Credit{Math.abs(creditDifference) !== 1 ? 's' : ''}
              </div>
            </div>
          )}

          {/* Credits Remaining */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#0a0a0a]">
              Credits After Change
            </label>
            <div className={`p-4 rounded-lg text-center font-bold text-lg shadow-lg ${
              creditsRemaining < 0 ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' : 'bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white'
            }`}>
              {creditsRemaining} Credit{creditsRemaining !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Insufficient Credits Warning */}
          {creditsRemaining < 0 && (
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
                    You need {Math.abs(creditsRemaining)} more credit{Math.abs(creditsRemaining) !== 1 ? 's' : ''} to complete this modification.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            {creditsRemaining < 0 ? (
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
                onClick={handleModify}
                disabled={!selectedCourt}
                className="w-full p-4 rounded-xl font-bold text-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] hover:shadow-xl hover:scale-105 shadow-lg"
              >
                Save Changes
              </button>
            )}
            
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="w-full p-4 rounded-xl font-bold text-lg text-white transition-all bg-gradient-to-r from-red-600 to-red-700 hover:shadow-xl hover:scale-105 shadow-lg"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
