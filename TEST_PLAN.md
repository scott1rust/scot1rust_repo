# Test Plan - Blazing Paddles UI Testing

## Test Execution Date
Generated: 2026-01-28

## Test Categories

### 1. Component Rendering Tests
### 2. Navigation Tests
### 3. Calendar Functionality Tests
### 4. Booking Flow Tests
### 5. Credit System Tests
### 6. My Sessions Tests
### 7. Responsive Design Tests
### 8. Edge Cases & Error Handling
### 9. Data Validation Tests
### 10. User Experience Tests

---

## Test Results

### ✅ PASS | ❌ FAIL | ⚠️ WARNING | 🔍 NEEDS REVIEW

---

## 1. Component Rendering Tests

| ID | Test Case | Expected Result | Status |
|----|-----------|----------------|--------|
| R1 | Header renders with brand name | "Blazing Paddles" visible | 🔍 |
| R2 | Both navigation tabs render | "Book a Court" and "My Sessions" visible | 🔍 |
| R3 | Calendar component loads | Weekly calendar displays | 🔍 |
| R4 | Footer renders | Footer visible at bottom | 🔍 |
| R5 | Time slots render correctly | 8 AM - 8 PM slots visible | 🔍 |
| R6 | Day headers render | SUN-SAT with dates visible | 🔍 |

---

## 2. Navigation Tests

| ID | Test Case | Expected Result | Status |
|----|-----------|----------------|--------|
| N1 | Click "Book a Court" tab | Shows calendar view | 🔍 |
| N2 | Click "My Sessions" tab | Shows sessions view | 🔍 |
| N3 | Active tab styling | Active tab has border highlight | 🔍 |
| N4 | Tab switching persists state | Bookings remain after tab switch | 🔍 |
| N5 | Week navigation - Next | Shows next 7 days | 🔍 |
| N6 | Week navigation - Previous | Shows previous 7 days | 🔍 |

---

## 3. Calendar Functionality Tests

| ID | Test Case | Expected Result | Status |
|----|-----------|----------------|--------|
| C1 | Current day highlighted | Today has blue circle | 🔍 |
| C2 | Reserved slots show correctly | Gray blocks with "All Courts Reserved" | 🔍 |
| C3 | Available slots are clickable | Cursor changes, hover effect works | 🔍 |
| C4 | Reserved slots not clickable | No hover effect, cursor shows not-allowed | 🔍 |
| C5 | Week date range displays | Shows "MMM d - MMM d, yyyy" | 🔍 |
| C6 | Calendar scrolls horizontally | Works on mobile/small screens | 🔍 |

---

## 4. Booking Flow Tests

| ID | Test Case | Expected Result | Status |
|----|-----------|----------------|--------|
| B1 | Click available slot opens modal | Booking modal appears | 🔍 |
| B2 | Modal shows correct date/time | Pre-filled with clicked slot | 🔍 |
| B3 | Court type dropdown works | Can select Court or Bay | 🔍 |
| B4 | Duration dropdown works | Can select 30/60/90/120 mins | 🔍 |
| B5 | Court selection filters by type | Only Courts or Bays shown | 🔍 |
| B6 | Credits calculate correctly | Updates based on duration | 🔍 |
| B7 | Credits remaining updates | Shows balance after booking | 🔍 |
| B8 | Complete booking button works | Creates booking, closes modal | 🔍 |
| B9 | Close modal button (×) works | Modal closes without booking | 🔍 |
| B10 | Booking appears in calendar | New booking shows as reserved | 🔍 |
| B11 | Booking appears in My Sessions | Listed in sessions view | 🔍 |

---

## 5. Credit System Tests

| ID | Test Case | Expected Result | Status |
|----|-----------|----------------|--------|
| CR1 | 30 mins = 1 credit | Correct calculation | 🔍 |
| CR2 | 60 mins = 2 credits | Correct calculation | 🔍 |
| CR3 | 90 mins = 3 credits | Correct calculation | 🔍 |
| CR4 | 120 mins = 4 credits | Correct calculation | 🔍 |
| CR5 | Insufficient credits prevents booking | Button disabled or error shown | 🔍 |
| CR6 | Credits remaining turns red | When negative balance | 🔍 |
| CR7 | Credit balance updates after booking | Deducts correct amount | 🔍 |
| CR8 | Total credits displayed correctly | Shows in My Sessions | 🔍 |

---

## 6. My Sessions Tests

| ID | Test Case | Expected Result | Status |
|----|-----------|----------------|--------|
| S1 | Sessions list renders | All bookings shown | 🔍 |
| S2 | Booking details correct | Date, court, time, credits | 🔍 |
| S3 | Sessions sorted by date | Earliest first | 🔍 |
| S4 | Credit budget displays | Shows total credits | 🔍 |
| S5 | Credits used calculates | Sum of all booking credits | 🔍 |
| S6 | Credits remaining calculates | Total - Used | 🔍 |
| S7 | "Book a Court" button works | Switches to calendar tab | 🔍 |
| S8 | Empty state shows | When no bookings exist | 🔍 |

---

## 7. Responsive Design Tests

| ID | Test Case | Expected Result | Status |
|----|-----------|----------------|--------|
| RD1 | Desktop view (1024px+) | Full layout, no scroll issues | 🔍 |
| RD2 | Tablet view (768-1023px) | Adjusted layout, readable | 🔍 |
| RD3 | Mobile view (<768px) | Stacked layout, horizontal scroll | 🔍 |
| RD4 | Header responsive | Stacks on mobile | 🔍 |
| RD5 | Modal responsive | Full width on mobile | 🔍 |
| RD6 | Touch targets adequate | Minimum 44x44px | 🔍 |

---

## 8. Edge Cases & Error Handling

| ID | Test Case | Expected Result | Status |
|----|-----------|----------------|--------|
| E1 | Book without selecting court | Error or button disabled | 🔍 |
| E2 | Book with 0 credits remaining | Prevented | 🔍 |
| E3 | Book with negative credits | Prevented | 🔍 |
| E4 | Multiple rapid clicks | No duplicate bookings | 🔍 |
| E5 | Navigate weeks rapidly | No UI glitches | 🔍 |
| E6 | Switch tabs rapidly | No state corruption | 🔍 |
| E7 | Close modal during selection | No errors | 🔍 |
| E8 | Book same slot twice | Second booking updates calendar | 🔍 |

---

## 9. Data Validation Tests

| ID | Test Case | Expected Result | Status |
|----|-----------|----------------|--------|
| V1 | Date format correct | Consistent formatting | 🔍 |
| V2 | Time format correct | 12-hour format with AM/PM | 🔍 |
| V3 | Credit decimals handled | Shows .5 credits correctly | 🔍 |
| V4 | Court names display | No truncation or overflow | 🔍 |
| V5 | Long court names handled | Proper wrapping or ellipsis | 🔍 |

---

## 10. User Experience Tests

| ID | Test Case | Expected Result | Status |
|----|-----------|----------------|--------|
| UX1 | Visual feedback on hover | Color change visible | 🔍 |
| UX2 | Button states clear | Disabled vs enabled obvious | 🔍 |
| UX3 | Loading states (if any) | Smooth transitions | 🔍 |
| UX4 | Success confirmation | Alert or message on booking | 🔍 |
| UX5 | Instructions clear | Helper text visible | 🔍 |
| UX6 | Color contrast adequate | Text readable on backgrounds | 🔍 |
| UX7 | Focus states visible | Keyboard navigation works | 🔍 |

---

## Known Issues to Check

### Potential Bug Areas:
1. ⚠️ **Time calculation** - End time calculation in booking modal
2. ⚠️ **Date handling** - Mock data uses hardcoded 2025 dates
3. ⚠️ **State persistence** - Bookings reset on page refresh
4. ⚠️ **Duplicate bookings** - Can book same slot multiple times
5. ⚠️ **Credit decimals** - Mock data shows 2.5 credits (non-standard)

---

## Test Execution Instructions

Run these tests manually:
1. Open http://localhost:3001
2. Follow each test case
3. Mark status: ✅ PASS | ❌ FAIL | ⚠️ WARNING
4. Document any bugs found

---

## Bug Report Template

```
BUG ID: B-XXX
Severity: Critical | High | Medium | Low
Component: [Component Name]
Description: [What's wrong]
Steps to Reproduce:
1. 
2. 
3. 
Expected: [What should happen]
Actual: [What actually happens]
Screenshots: [If applicable]
```
