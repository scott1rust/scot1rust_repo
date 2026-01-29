# Bug Report - Blazing Paddles

## Critical Bugs Found

---

## 🔴 BUG #1: Incorrect End Time in Mock Data
**Severity:** HIGH  
**Component:** mockData.ts  
**Status:** IDENTIFIED

### Description
Booking ID #1 has an impossible end time: `10:00 AM` to `10:30 PM` (12.5 hours) for a 30-minute booking.

### Location
`app/data/mockData.ts` - Line 27

### Current Code
```typescript
{
  startTime: '10:00 AM',
  endTime: '10:30 PM',  // ❌ WRONG - Should be 10:30 AM
  duration: 30,
}
```

### Expected
```typescript
{
  startTime: '10:00 AM',
  endTime: '10:30 AM',  // ✅ CORRECT
  duration: 30,
}
```

### Impact
- Confusing display in My Sessions
- Misleading time information

---

## 🟡 BUG #2: Non-Standard Credit Value
**Severity:** MEDIUM  
**Component:** mockData.ts  
**Status:** IDENTIFIED

### Description
Booking ID #2 uses 2.5 credits for a 60-minute booking, but the credit system defines 60 mins = 2 credits.

### Location
`app/data/mockData.ts` - Line 40

### Current Code
```typescript
{
  duration: 60,
  creditsUsed: 2.5,  // ❌ Inconsistent with credit system
}
```

### Expected
```typescript
{
  duration: 60,
  creditsUsed: 2,  // ✅ Matches calculateCredits(60)
}
```

### Impact
- Credit calculations don't match system rules
- User confusion about credit costs

---

## 🟡 BUG #3: Time Calculation Bug in BookingModal
**Severity:** MEDIUM  
**Component:** BookingModal.tsx  
**Status:** IDENTIFIED

### Description
The end time calculation doesn't handle AM/PM conversion correctly for edge cases.

### Location
`app/components/BookingModal.tsx` - Lines 56-66

### Issues
1. **12 AM handling**: `hour24 = isPM && startHour !== 12` doesn't handle 12 AM correctly
2. **Noon edge case**: 12 PM + duration could overflow incorrectly

### Current Code
```typescript
const startHour = parseInt(selectedTime.split(' ')[0]);
const isPM = selectedTime.includes('PM');
const hour24 = isPM && startHour !== 12 ? startHour + 12 : startHour;
```

### Problems
- `12 AM` would be converted to `12` instead of `0`
- `8 AM` would be converted to `8` (correct)
- `12 PM` would be converted to `12` (correct)
- `8 PM` would be converted to `20` (correct)

### Impact
- Incorrect end times for bookings starting at 12 AM
- Potential display errors

---

## 🟢 BUG #4: Duplicate Booking Prevention Missing
**Severity:** LOW  
**Component:** Calendar.tsx, page.tsx  
**Status:** IDENTIFIED

### Description
Users can book the same time slot multiple times. No validation prevents duplicate bookings.

### Location
`app/page.tsx` - handleTimeSlotClick function

### Current Behavior
- Click available slot → Opens modal
- Complete booking → Slot should become reserved
- But user can click the same slot again before page updates

### Expected Behavior
- Prevent clicking already-booked slots
- Show "Already Reserved" for user's own bookings

### Impact
- Users might accidentally double-book
- Confusing UX

---

## 🟢 BUG #5: Old Dates in Mock Data
**Severity:** LOW  
**Component:** mockData.ts  
**Status:** IDENTIFIED

### Description
Mock bookings use September 2025 dates, which are in the past (current date: January 2026).

### Location
`app/data/mockData.ts` - Lines 25, 36, 47, etc.

### Current Code
```typescript
date: new Date(2025, 8, 20), // September 20, 2025
```

### Expected
Should use current or future dates for better demo experience.

### Impact
- Calendar shows past dates by default
- User needs to navigate to see bookings
- Less intuitive demo

---

## 🟢 BUG #6: Modal State Not Reset
**Severity:** LOW  
**Component:** BookingModal.tsx  
**Status:** IDENTIFIED

### Description
When modal closes, the selected court and duration persist. Next time modal opens, previous selections are still there.

### Location
`app/components/BookingModal.tsx`

### Current Behavior
1. Select "Bay" and "120 mins"
2. Close modal
3. Open modal again
4. Previous selections still active

### Expected Behavior
Reset form when modal opens or closes.

### Impact
- Confusing UX
- User might accidentally use wrong selections

---

## 🟢 BUG #7: No Keyboard Accessibility
**Severity:** LOW  
**Component:** Multiple components  
**Status:** IDENTIFIED

### Description
Modal cannot be closed with ESC key. No keyboard navigation support.

### Location
- BookingModal.tsx
- Calendar.tsx

### Expected Behavior
- ESC key closes modal
- Tab navigation works
- Enter key submits booking

### Impact
- Poor accessibility
- Keyboard users have difficulty

---

## 🔵 BUG #8: Credit Balance Calculation Issue
**Severity:** INFO  
**Component:** MySessions.tsx  
**Status:** POTENTIAL ISSUE

### Description
Credit balance is calculated from bookings array, but also stored in user object. These could get out of sync.

### Location
`app/components/MySessions.tsx` - Line 14

### Current Code
```typescript
const creditsUsed = sortedBookings.reduce((sum, booking) => sum + booking.creditsUsed, 0);
```

### Issue
If mock data has inconsistent credit values (like Bug #2), calculations will be wrong.

### Impact
- Incorrect credit balance display
- User confusion

---

## Summary

| Severity | Count | Status |
|----------|-------|--------|
| 🔴 Critical | 0 | - |
| 🔴 High | 1 | Identified |
| 🟡 Medium | 2 | Identified |
| 🟢 Low | 4 | Identified |
| 🔵 Info | 1 | Potential |

**Total Bugs Found: 8**

---

## Recommended Fix Priority

1. **HIGH PRIORITY** (Fix Immediately)
   - Bug #1: Fix mock data end time
   - Bug #2: Fix credit value inconsistency
   - Bug #3: Fix time calculation logic

2. **MEDIUM PRIORITY** (Fix Soon)
   - Bug #4: Add duplicate booking prevention
   - Bug #5: Update mock dates to current year

3. **LOW PRIORITY** (Nice to Have)
   - Bug #6: Reset modal state
   - Bug #7: Add keyboard accessibility
   - Bug #8: Sync credit calculations

---

## Testing Recommendations

After fixes, test:
1. ✅ Book at 12 AM, 12 PM, 11 PM
2. ✅ Verify all end times are correct
3. ✅ Check credit calculations match system
4. ✅ Try to book same slot twice
5. ✅ Test with 0 credits remaining
6. ✅ Test modal close/reopen
7. ✅ Test keyboard navigation
