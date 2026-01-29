# Calendar Availability Fix

## Issue Fixed
The calendar was incorrectly showing "All Courts Reserved" after just ONE booking was made, even though there are 4 courts available.

---

## Problem

### Before Fix:
- ❌ Any booking at a time slot → Shows "All Courts Reserved"
- ❌ User couldn't book even when 3 courts were still available
- ❌ Poor user experience - calendar appeared fully booked

### Root Cause:
The `isSlotReserved()` function returned `true` if **ANY** booking existed, instead of checking if **ALL** courts were booked.

```typescript
// OLD LOGIC (WRONG)
const isSlotReserved = (date: Date, time: string): boolean => {
  return bookings.some(booking => {
    // Returns true if ANY booking exists
    return booking.startTime === time;
  });
};
```

---

## Solution

### After Fix:
- ✅ Shows "All Courts Reserved" only when all 4 courts are booked
- ✅ Shows "X Courts Available" when some courts are booked
- ✅ Shows nothing (fully available) when no courts are booked
- ✅ Users can book as long as at least 1 court is available

### New Logic:
```typescript
// NEW LOGIC (CORRECT)
const isSlotFullyBooked = (date: Date, time: string): boolean => {
  const bookingsAtThisTime = bookings.filter(booking => {
    if (!isSameDay(new Date(booking.date), date)) return false;
    return booking.startTime === time;
  });
  
  const totalActiveCourts = courts.filter(court => court.active).length;
  
  // Only fully booked if bookings equal total courts
  return bookingsAtThisTime.length >= totalActiveCourts;
};
```

---

## Visual Changes

### Scenario 1: No Bookings (Fully Available)
```
┌─────────────┐
│             │  ← Empty, white background
│             │  ← Clickable, hover shows blue
│             │
└─────────────┘
```

### Scenario 2: Partial Bookings (Some Available)
```
┌─────────────┐
│ ┌─────────┐ │  ← Orange background
│ │3 Courts │ │  ← Shows available count
│ │Available│ │  ← Still clickable!
│ └─────────┘ │
└─────────────┘
```

### Scenario 3: All Courts Booked (Fully Reserved)
```
┌─────────────┐
│ ┌─────────┐ │  ← Gray background
│ │All Courts│ │  ← Not clickable
│ │Reserved │ │  ← Cursor: not-allowed
│ └─────────┘ │
└─────────────┘
```

---

## New Features

### 1. **Smart Availability Display**
- Shows exact number of courts available
- Color-coded for quick recognition:
  - **White** = Fully available (no bookings)
  - **Orange tint** = Partially booked (some courts available)
  - **Gray** = Fully booked (no courts available)

### 2. **Available Courts Counter**
New function calculates remaining courts:
```typescript
const getAvailableCourtsCount = (date: Date, time: string): number => {
  const bookingsAtThisTime = bookings.filter(booking => {
    if (!isSameDay(new Date(booking.date), date)) return false;
    return booking.startTime === time;
  });
  
  const totalActiveCourts = courts.filter(court => court.active).length;
  return totalActiveCourts - bookingsAtThisTime.length;
};
```

### 3. **Three-State Display**
1. **Empty slot**: No visual indicator, fully clickable
2. **Partial booking**: Orange badge showing "X Courts Available"
3. **Full booking**: Gray badge showing "All Courts Reserved"

---

## Technical Details

### Courts Configuration
```typescript
// Total courts: 4
courts = [
  { id: '1', name: 'Battery Bay', type: 'Bay', active: true },
  { id: '2', name: 'Paddington Pickle Court', type: 'Court', active: true },
  { id: '3', name: 'Smash Court', type: 'Court', active: true },
  { id: '4', name: 'Dink Bay', type: 'Bay', active: true },
]
```

### Booking Logic
- **0 bookings** at time slot → 4 courts available (no indicator)
- **1 booking** at time slot → 3 courts available (shows "3 Courts Available")
- **2 bookings** at time slot → 2 courts available (shows "2 Courts Available")
- **3 bookings** at time slot → 1 court available (shows "1 Court Available")
- **4 bookings** at time slot → 0 courts available (shows "All Courts Reserved")

---

## Code Changes

### File Modified:
`app/components/Calendar.tsx`

### Changes Made:

1. **Import courts data**
```typescript
import { timeSlots, courts } from '../data/mockData';
```

2. **Replace `isSlotReserved` with `isSlotFullyBooked`**
```typescript
const isSlotFullyBooked = (date: Date, time: string): boolean => {
  // Checks if ALL courts are booked
};
```

3. **Add `getAvailableCourtsCount` function**
```typescript
const getAvailableCourtsCount = (date: Date, time: string): number => {
  // Returns number of available courts
};
```

4. **Update calendar cell rendering**
```typescript
{fullyBooked ? (
  // Show "All Courts Reserved"
) : hasBookings ? (
  // Show "X Courts Available"
) : null}
```

---

## Testing Scenarios

### Test 1: Single Booking
1. Start with no bookings
2. Book 1 court at 10 AM on Monday
3. ✅ Calendar shows "3 Courts Available" at that slot
4. ✅ Slot is still clickable
5. ✅ Can book another court at same time

### Test 2: Multiple Bookings
1. Book 2 courts at 2 PM on Wednesday
2. ✅ Shows "2 Courts Available"
3. Book 1 more court at same time
4. ✅ Shows "1 Court Available"
5. Book the last court
6. ✅ Shows "All Courts Reserved"
7. ✅ Slot becomes unclickable

### Test 3: Different Time Slots
1. Book 1 court at 10 AM
2. ✅ 10 AM shows "3 Courts Available"
3. ✅ 11 AM shows nothing (fully available)
4. ✅ Other time slots unaffected

### Test 4: Different Days
1. Book 1 court on Monday at 10 AM
2. ✅ Monday 10 AM shows "3 Courts Available"
3. ✅ Tuesday 10 AM shows nothing (fully available)
4. ✅ Other days unaffected

---

## User Experience Improvements

### Before:
- 😞 Confusing - 1 booking made calendar look full
- 😞 Users couldn't see availability
- 😞 Had to try clicking to see if booking possible

### After:
- 😊 Clear availability at a glance
- 😊 Shows exact number of courts available
- 😊 Color-coded for quick scanning
- 😊 Can book multiple courts at same time

---

## Edge Cases Handled

### 1. Inactive Courts
```typescript
const totalActiveCourts = courts.filter(court => court.active).length;
```
Only counts active courts in availability calculation.

### 2. Multiple Bookings Same Time
Correctly counts all bookings at the same time slot.

### 3. Date Matching
Uses `isSameDay()` to ensure bookings match the exact date.

### 4. Time Matching
Exact string match on start time (e.g., "10:00 AM").

---

## Future Enhancements

### Phase 1: Time Range Overlaps
Currently checks only start time. Could enhance to check if booking duration overlaps:
```typescript
// Example: 10 AM booking for 2 hours blocks 10 AM and 11 AM
```

### Phase 2: Court-Specific Display
Show which specific courts are available:
```typescript
"Battery Bay, Smash Court available"
```

### Phase 3: Hover Details
Show booking details on hover:
```typescript
"Booked: Battery Bay (John Doe)"
```

---

## Performance Impact

- ✅ Minimal performance impact
- ✅ Efficient filtering with `.filter()`
- ✅ No additional API calls
- ✅ Calculations done on render (fast)

---

## Browser Compatibility

- ✅ Works in all modern browsers
- ✅ No new dependencies
- ✅ Uses existing date-fns functions

---

## Summary

### What Changed:
- ❌ Old: "All Courts Reserved" after 1 booking
- ✅ New: Shows actual availability (e.g., "3 Courts Available")

### Benefits:
1. ✅ Accurate availability display
2. ✅ Better user experience
3. ✅ Can book multiple courts at same time
4. ✅ Clear visual indicators
5. ✅ Color-coded states

### Status:
✅ **FIXED AND TESTED**

---

**Fixed:** January 28, 2026  
**File Modified:** `app/components/Calendar.tsx`  
**Lines Changed:** ~30 lines  
**Breaking Changes:** None  
**Migration Required:** None
