'use client';

import { useState } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import BookingModal from './components/BookingModal';
import ModifyBookingModal from './components/ModifyBookingModal';
import MySessions from './components/MySessions';
import Footer from './components/Footer';
import PurchaseCreditsModal from './components/PurchaseCreditsModal';
import { mockBookings, mockUser } from './data/mockData';
import { Booking } from './types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'book' | 'sessions'>('book');
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [user, setUser] = useState(mockUser);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleTimeSlotClick = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setIsBookingModalOpen(true);
  };

  const handleBookingComplete = (newBooking: Booking) => {
    // Add new booking
    setBookings([...bookings, newBooking]);
    
    // Update user credits
    setUser({
      ...user,
      creditBalance: user.creditBalance - newBooking.creditsUsed,
    });

    // Show success message
    alert(`Booking confirmed! ${newBooking.creditsUsed} credits used.`);
  };

  const handleBookNewCourt = () => {
    setActiveTab('book');
  };

  const handlePurchaseCredits = (creditsAdded: number) => {
    // Update user's credit balance and total credits
    setUser({
      ...user,
      creditBalance: user.creditBalance + creditsAdded,
      totalCredits: user.totalCredits + creditsAdded,
    });
  };

  const handleModifyBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModifyModalOpen(true);
  };

  const handleModifyComplete = (originalBooking: Booking, modifiedBooking: Booking) => {
    // Update the booking in the list
    setBookings(bookings.map(b => b.id === originalBooking.id ? modifiedBooking : b));
    
    // Update user credits based on the difference
    const creditDifference = modifiedBooking.creditsUsed - originalBooking.creditsUsed;
    setUser({
      ...user,
      creditBalance: user.creditBalance - creditDifference,
    });

    // Show success message
    if (creditDifference === 0) {
      alert('Booking modified successfully!');
    } else if (creditDifference > 0) {
      alert(`Booking modified! ${creditDifference} additional credit${creditDifference !== 1 ? 's' : ''} used.`);
    } else {
      alert(`Booking modified! ${Math.abs(creditDifference)} credit${Math.abs(creditDifference) !== 1 ? 's' : ''} refunded.`);
    }
  };

  const handleCancelBooking = (booking: Booking) => {
    // Remove the booking from the list
    setBookings(bookings.filter(b => b.id !== booking.id));
    
    // Refund the credits
    setUser({
      ...user,
      creditBalance: user.creditBalance + booking.creditsUsed,
    });

    // Show success message
    alert(`Booking cancelled! ${booking.creditsUsed} credit${booking.creditsUsed !== 1 ? 's' : ''} refunded.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 py-8 px-4">
        {activeTab === 'book' ? (
          <Calendar 
            bookings={bookings} 
            onTimeSlotClick={handleTimeSlotClick}
          />
        ) : (
          <MySessions 
            bookings={bookings} 
            user={user}
            onBookNewCourt={handleBookNewCourt}
            onPurchaseCredits={() => setIsPurchaseModalOpen(true)}
            onModifyBooking={handleModifyBooking}
          />
        )}
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        user={user}
        existingBookings={bookings}
        onBookingComplete={handleBookingComplete}
        onPurchaseCredits={() => setIsPurchaseModalOpen(true)}
      />

      <ModifyBookingModal
        isOpen={isModifyModalOpen}
        onClose={() => setIsModifyModalOpen(false)}
        booking={selectedBooking}
        user={user}
        existingBookings={bookings}
        onModifyComplete={handleModifyComplete}
        onCancelComplete={handleCancelBooking}
        onPurchaseCredits={() => setIsPurchaseModalOpen(true)}
      />

      <PurchaseCreditsModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        currentBalance={user.creditBalance}
        onPurchaseComplete={handlePurchaseCredits}
      />
    </div>
  );
}
