# Features Guide - Blazing Paddles

A visual guide to all features in your pickleball booking system.

## 🏠 Main Navigation

### Header Component
```
┌─────────────────────────────────────────────────────┐
│  Blazing Paddles    [Book a Court] [My Sessions]   │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Brand name/logo on the left
- Two tab navigation buttons
- Active tab highlighted with border
- Responsive design (stacks on mobile)

---

## 📅 Calendar View (Book a Court Tab)

### Layout
```
┌─────────────────────────────────────────────────────┐
│           Court / Bay Availability                  │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │  Filter System                                │ │
│  │  (Search for Court or Bay, Week of Year)     │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  [← Previous Week]  Sep 19-25, 2025  [Next Week →] │
│                                                     │
│  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬────┐ │
│  │TIME │ SUN │ MON │ TUE │ WED │ THU │ FRI │ SAT│ │
│  │     │ 19  │ 20  │ 21  │ 22  │ 23  │ 24  │ 25 │ │
│  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┼────┤ │
│  │8 AM │     │ 🔒  │     │     │     │     │    │ │
│  │9 AM │     │ 🔒  │     │     │     │     │    │ │
│  │10AM │     │     │     │ 🔒  │     │     │    │ │
│  │11AM │     │     │     │     │ 🔒  │     │    │ │
│  │...  │     │     │     │     │     │     │    │ │
│  └─────┴─────┴─────┴─────┴─────┴─────┴─────┴────┘ │
│                                                     │
│  Click on any portion of the calendar to open      │
│  the booking page.                                  │
└─────────────────────────────────────────────────────┘

🔒 = Reserved (All Courts Reserved)
Empty = Available (Click to book)
Yellow background = Today
Blue circle = Current date
```

### Calendar Features

#### 1. **Week Navigation**
- Previous/Next week buttons
- Current week date range display
- Smooth navigation between weeks

#### 2. **Day Headers**
- Day of week abbreviation (SUN, MON, etc.)
- Date number
- Current day highlighted in blue circle

#### 3. **Time Slots**
- Hourly slots from 8 AM to 8 PM
- Time labels on the left
- Each slot is clickable

#### 4. **Availability Indicators**
- **White/Available**: Click to book
- **Gray with "All Courts Reserved"**: Cannot book
- **Yellow tint**: Today's column
- **Hover effect**: Blue tint on available slots

#### 5. **Interactive Booking**
- Click any available slot
- Opens booking modal instantly
- Pre-fills date and time

---

## 🎾 Booking Modal

### Layout
```
┌─────────────────────────────────────────────────┐
│  Book Your Court / Bay                      [×] │
│  Monday, September 20, 2025 at 10:00 AM        │
├─────────────────────────────────────────────────┤
│                                                 │
│  Court Type                                     │
│  ┌───────────────────────────────────────────┐ │
│  │ Court                                  ▼  │ │
│  └───────────────────────────────────────────┘ │
│  Drop Down (Court or Bay)                      │
│                                                 │
│  Length of Time                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ 60 mins                                ▼  │ │
│  └───────────────────────────────────────────┘ │
│  Drop Down (30, 60, 90, 120 mins)             │
│                                                 │
│  Court Selection                                │
│  ┌───────────────────────────────────────────┐ │
│  │ Paddington Pickle Court            ▼  │ │
│  └───────────────────────────────────────────┘ │
│  Drop Down (Available Courts / Bays)           │
│                                                 │
│  Credits                                        │
│  ┌───────────────────────────────────────────┐ │
│  │           2 Credits                        │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  Credits Remaining                              │
│  ┌───────────────────────────────────────────┐ │
│  │           4.5 Credits                      │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │      Complete Booking!                     │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Booking Modal Features

#### 1. **Header**
- Black background with white text
- Shows selected date and time
- Close button (×) in top right

#### 2. **Court Type Dropdown**
- Options: Court or Bay
- Filters available courts below

#### 3. **Duration Dropdown**
- Options: 30, 60, 90, 120 minutes
- Automatically calculates credits

#### 4. **Court Selection Dropdown**
- Shows only courts matching selected type
- Dynamically filtered list

#### 5. **Credit Display**
- Shows credits required for booking
- Gray background, white text
- Updates based on duration

#### 6. **Credits Remaining**
- Shows balance after booking
- Turns red if insufficient credits
- Real-time calculation

#### 7. **Complete Booking Button**
- Orange background (#FF8C42)
- Disabled if insufficient credits
- Disabled if no court selected
- Shows confirmation on success

---

## 👤 My Sessions View

### Layout
```
┌─────────────────────────────────────────────────┐
│                My Sessions                      │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ September 20, 2025          ┌──────────┐  │ │
│  │ Battery Bay                 │1 Credit  │  │ │
│  │ 10:00 AM - 10:30 PM         └──────────┘  │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ September 23, 2025          ┌──────────┐  │ │
│  │ Paddington Pickle Court     │2.5       │  │ │
│  │ 11:30 AM - 12:30 PM         │Credits   │  │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│              Credit Balance                     │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │        10 Credit Budget                    │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │        3.5 Credits Used                    │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │        6.5 Credits Remain                  │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │      Book a Court / Bay                    │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

### My Sessions Features

#### 1. **Booking Cards**
- Beige background (#F5E6D3)
- Date in bold
- Court/Bay name
- Time range
- Orange credit badge

#### 2. **Credit Balance Summary**
- Three-box layout
- Total budget (white background)
- Credits used (white background)
- Credits remaining (beige background)

#### 3. **Quick Action Button**
- Green background (#4CAF50)
- "Book a Court / Bay" text
- Switches to calendar tab
- Full-width button

#### 4. **Empty State**
- Shows when no bookings
- Friendly message
- Call-to-action button

---

## 🎨 Color System

### Primary Colors
```
Orange (#FF8C42)  ████  Credit badges, Complete Booking
Green (#4CAF50)   ████  Book buttons, success actions
Beige (#F5E6D3)   ████  Card backgrounds, highlights
Yellow (#FFD700)  ████  Today's calendar column
Gray (#333333)    ████  Text, reserved blocks
```

### Usage Guide
- **Orange**: Action buttons, credit indicators
- **Green**: Positive actions, booking buttons
- **Beige**: Backgrounds, cards, remaining credits
- **Yellow**: Current day highlight
- **Gray**: Reserved slots, text

---

## 💳 Credit System

### Credit Calculation
```
Duration    Credits    Cost
─────────────────────────────
30 mins  →  1 credit   💰
60 mins  →  2 credits  💰💰
90 mins  →  3 credits  💰💰💰
120 mins →  4 credits  💰💰💰💰
```

### Credit Flow
1. User starts with total credit budget (e.g., 10 credits)
2. Each booking deducts credits
3. Running total shown in My Sessions
4. Cannot book if insufficient credits

---

## 📱 Responsive Design

### Desktop (1024px+)
- Full calendar visible
- Side-by-side layout
- Large touch targets
- Optimal spacing

### Tablet (768px - 1023px)
- Scrollable calendar
- Adjusted spacing
- Touch-friendly
- Stacked elements

### Mobile (< 768px)
- Horizontal scroll calendar
- Stacked navigation
- Large buttons
- Full-width modals

---

## ⚡ Interactive Features

### Hover Effects
- Calendar slots: Blue tint on hover
- Buttons: Slight color change
- Dropdowns: Border color change

### Click Actions
- Calendar slot → Opens booking modal
- Tab buttons → Switches view
- Book button → Switches to calendar
- Complete booking → Adds booking + updates credits

### Visual Feedback
- Success message on booking
- Disabled state for invalid bookings
- Red credits if insufficient
- Loading states (future enhancement)

---

## 🔄 State Management

### What's Tracked
- Current active tab (book/sessions)
- All bookings (array)
- User credit balance
- Selected date/time for booking
- Modal open/close state

### What Updates
- Adding booking → Updates bookings array + user credits
- Switching tabs → Updates active tab
- Navigating weeks → Updates calendar display
- Selecting court type → Filters available courts

---

## 🎯 User Flows

### Flow 1: Book a Court
1. User views calendar
2. Clicks available time slot
3. Modal opens with date/time pre-filled
4. Selects court type
5. Chooses duration
6. Picks specific court
7. Reviews credits
8. Clicks "Complete Booking"
9. Sees confirmation
10. Booking appears in calendar and My Sessions

### Flow 2: View Sessions
1. User clicks "My Sessions" tab
2. Sees list of upcoming bookings
3. Reviews credit balance
4. Clicks "Book a Court / Bay"
5. Returns to calendar view

### Flow 3: Navigate Calendar
1. User views current week
2. Clicks "Next Week"
3. Calendar updates to show next 7 days
4. Can continue navigating forward/backward
5. Can book from any week

---

## 🚀 Performance Features

### Optimizations
- Memoized calendar calculations
- Efficient re-rendering
- Minimal state updates
- Lazy evaluation

### Fast Interactions
- Instant modal opening
- No loading delays (mock data)
- Smooth transitions
- Responsive UI updates

---

## ✨ Polish Details

### Attention to Detail
- Proper date formatting
- Consistent spacing
- Aligned elements
- Professional typography
- Smooth transitions
- Accessible colors
- Clear visual hierarchy

### User Experience
- Clear call-to-actions
- Helpful instructions
- Validation messages
- Intuitive navigation
- Mobile-friendly
- Error prevention

---

## 📋 Feature Checklist

### ✅ Implemented
- [x] Weekly calendar view
- [x] Time slot booking
- [x] Credit-based system
- [x] Booking modal
- [x] My Sessions view
- [x] Credit tracking
- [x] Responsive design
- [x] Tab navigation
- [x] Week navigation
- [x] Court filtering
- [x] Credit validation
- [x] Visual feedback

### 🔜 Future Enhancements
- [ ] Member login
- [ ] Admin dashboard
- [ ] Database integration
- [ ] Email notifications
- [ ] Booking cancellation
- [ ] Recurring bookings
- [ ] Payment integration
- [ ] Group training events

---

**Your app is feature-complete and ready to use!** 🎉

For technical details, see the other documentation files.
