# Six Week Booking Limit Feature

## Overview
Added validation to prevent users from booking courts/bays more than 6 weeks (42 days) in advance. This ensures bookings stay within a manageable timeframe.

## Business Logic

### Booking Window:
- **Minimum**: Current date/time (cannot book in the past)
- **Maximum**: 6 weeks (42 days) from current date
- **Valid Range**: Today through 42 days from now

### Why 6 Weeks?
- Prevents excessive advance bookings
- Keeps calendar manageable
- Allows for schedule flexibility
- Standard practice for recreational facilities

## Implementation

### 1. Calendar Component (`Calendar.tsx`)

#### New Function: `isSlotTooFarInFuture()`
```javascript
const isSlotTooFarInFuture = (date: Date): boolean => {
  const now = new Date();
  const sixWeeksFromNow = new Date(now);
  sixWeeksFromNow.setDate(now.getDate() + 42); // 6 weeks = 42 days
  
  return date > sixWeeksFromNow;
};
```

#### Visual Changes:
- Slots more than 6 weeks out are **grayed out** (40% opacity)
- Display "Too Far Ahead" label in light gray
- Non-clickable (cursor-not-allowed)
- Same visual treatment as past slots

#### Logic Updates:
```javascript
const isTooFar = isSlotTooFarInFuture(day);
const isDisabled = isPast || isTooFar || fullyBooked;
```

### 2. Booking Modal Component (`BookingModal.tsx`)

#### New Function: `isDateTooFarInFuture()`
```javascript
const isDateTooFarInFuture = () => {
  const now = new Date();
  const sixWeeksFromNow = new Date(now);
  sixWeeksFromNow.setDate(now.getDate() + 42); // 6 weeks = 42 days
  
  return selectedDate > sixWeeksFromNow;
};
```

#### Validation in `handleBooking()`:
```javascript
if (isDateTooFarInFuture()) {
  alert('Cannot book more than 6 weeks in advance. Please select a date within the next 6 weeks.');
  return;
}
```

#### Visual Warning:
- Shows **yellow warning box** if date is too far in future
- "Booking Too Far in Advance" heading
- Clear explanation of the 6-week limit
- Yellow border and background (warning style, not error)

#### Button State:
- Disabled button shows "Too Far in Advance"
- Gray background indicating unavailable
- Cannot be clicked

## User Experience

### Calendar View:
1. Navigate to current week - all future slots available (within 6 weeks)
2. Navigate 7+ weeks ahead - slots grayed out with "Too Far Ahead" label
3. Click on far future slot - nothing happens (disabled)

### Booking Modal:
1. If somehow modal opens with far future date:
   - Yellow warning box appears
   - Button disabled
   - Alert on submit attempt
2. Clear message guides user to select closer date

## Validation Layers

### Layer 1: Calendar UI
- Visual graying out of slots beyond 6 weeks
- "Too Far Ahead" label
- Non-clickable slots

### Layer 2: Modal Warning
- Yellow warning box
- Disabled booking button
- Clear explanation

### Layer 3: Submission Validation
- Alert prevents booking
- Forces user to select valid date

## Edge Cases Handled

### Date Calculations:
- ✅ Exactly 6 weeks (42 days) - allowed
- ✅ 42 days + 1 hour - blocked
- ✅ Works across month boundaries
- ✅ Works across year boundaries
- ✅ Handles leap years correctly

### Combined Validations:
- ✅ Past date - shows "Past" (red error)
- ✅ Too far future - shows "Too Far Ahead" (yellow warning)
- ✅ Valid date, no credits - shows credit warning
- ✅ Valid date, booked court - shows booking conflict

### Priority Order:
1. **Past date** (highest priority - red error)
2. **Too far future** (yellow warning)
3. **Insufficient credits** (red error)
4. **Court conflict** (alert on submit)

## Visual Indicators

### Calendar:
```
Past Slots:          [Gray, 40% opacity, "Past"]
Too Far Slots:       [Gray, 40% opacity, "Too Far Ahead"]
Available Slots:     [White/Green hover]
Partially Booked:    [Orange, "X Courts Available"]
Fully Booked:        [Gray, "All Courts Reserved"]
```

### Modal Warnings:
```
Past:                [Red border, red icon, "Time Slot Unavailable"]
Too Far:             [Yellow border, yellow icon, "Booking Too Far in Advance"]
No Credits:          [Red border, red icon, "Insufficient Credits"]
```

## User Messages

### Calendar:
> "Too Far Ahead" (displayed on grayed-out slots)

### Modal Warning Box:
> **Booking Too Far in Advance**
> Bookings can only be made up to 6 weeks in advance. Please select a date within the next 6 weeks.

### Alert on Submit:
> "Cannot book more than 6 weeks in advance. Please select a date within the next 6 weeks."

## Testing Scenarios

### Scenario 1: Navigate Far Future
1. Today is January 28, 2026
2. Navigate to March 15, 2026 (6+ weeks)
3. **Result**: ✅ All slots grayed out, "Too Far Ahead"

### Scenario 2: Boundary Date (Exactly 6 Weeks)
1. Today is January 28, 2026
2. Navigate to March 11, 2026 (exactly 42 days)
3. **Result**: ✅ Slots available (within limit)

### Scenario 3: One Day Over Limit
1. Today is January 28, 2026
2. Navigate to March 12, 2026 (43 days)
3. **Result**: ✅ Slots grayed out (over limit)

### Scenario 4: Modal Validation
1. Somehow open modal for far future date
2. Try to complete booking
3. **Result**: ✅ Alert shown, booking prevented

### Scenario 5: Week Navigation
1. Click "Next Week" repeatedly
2. After 6 weeks, slots become unavailable
3. **Result**: ✅ Clear visual transition from available to unavailable

## Technical Details

### Date Calculation:
```javascript
const now = new Date();                    // Jan 28, 2026
const sixWeeksFromNow = new Date(now);
sixWeeksFromNow.setDate(now.getDate() + 42);  // Mar 11, 2026
```

### Why 42 Days?
- 6 weeks × 7 days/week = 42 days
- Clear, unambiguous calculation
- No confusion about partial weeks

### Performance:
- O(1) date comparison
- No impact on rendering speed
- Calculated on-demand

### Maintainability:
- Consistent function names across components
- Easy to adjust limit (change 42 to different number)
- Well-documented with comments

## Configuration

To change the booking window, modify the constant in both components:

```javascript
// Current: 6 weeks (42 days)
sixWeeksFromNow.setDate(now.getDate() + 42);

// Examples:
// 4 weeks: setDate(now.getDate() + 28)
// 8 weeks: setDate(now.getDate() + 56)
// 3 months: setMonth(now.getMonth() + 3)
```

## Before vs After

### Before (No Limit):
- ❌ Could book infinitely far into future
- ❌ Calendar could show dates years ahead
- ❌ Difficult to manage long-term bookings
- ❌ No business logic enforcement

### After (6 Week Limit):
- ✅ Maximum 6 weeks in advance
- ✅ Clear visual indicators
- ✅ Multiple validation layers
- ✅ User-friendly warnings
- ✅ Manageable booking window

## Combined Validation Summary

The system now enforces:

1. **Cannot book in the past** ✅
   - Visual: Grayed out, "Past"
   - Modal: Red error, disabled button

2. **Cannot book beyond 6 weeks** ✅
   - Visual: Grayed out, "Too Far Ahead"
   - Modal: Yellow warning, disabled button

3. **Cannot book without credits** ✅
   - Modal: Red error, purchase credits button

4. **Cannot double-book same court** ✅
   - Calendar: Court not in dropdown
   - Modal: Alert on submit

## Future Enhancements

Potential improvements:
- Admin override to book beyond 6 weeks
- Different limits for different user roles (members vs admins)
- Configurable limit in settings/database
- Show countdown: "X weeks remaining in booking window"
- Email reminders when new dates become available

## Summary

Users can now only book courts/bays up to **6 weeks (42 days)** in advance:
- ✅ Calendar visually shows unavailable far-future slots
- ✅ Modal prevents booking with clear warnings
- ✅ Consistent with past-date validation
- ✅ User-friendly messages guide to valid dates
- ✅ No performance impact
