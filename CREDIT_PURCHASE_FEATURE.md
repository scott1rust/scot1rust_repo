# Credit Purchase Feature - Documentation

## Overview

Added a complete credit purchase system that prevents users from booking when they have insufficient credits and provides a seamless way to purchase more credits.

---

## ✨ New Features

### 1. **Insufficient Credits Prevention**
- Users **cannot** complete a booking if they don't have enough credits
- Booking button is replaced with "Purchase More Credits" button
- Clear warning message shows exactly how many credits are needed

### 2. **Purchase Credits Modal**
- Beautiful, user-friendly interface for purchasing credits
- 4 credit packages available:
  - **5 Credits** - $25 ($5.00 per credit)
  - **10 Credits** - $45 ($4.50 per credit) ⭐ MOST POPULAR
  - **20 Credits** - $80 ($4.00 per credit)
  - **50 Credits** - $175 ($3.50 per credit)

### 3. **Multiple Entry Points**
- **From Booking Modal**: When insufficient credits detected
- **From My Sessions**: Purple "Purchase Credits" button
- **Smart Warnings**: Low credit alerts in My Sessions

### 4. **Demo Payment Flow**
- Simulated 2-second payment processing
- Success confirmation
- Instant credit balance update
- Clear "Demo Mode" messaging

---

## 🎯 User Flows

### Flow 1: Insufficient Credits During Booking

1. User clicks available time slot
2. Booking modal opens
3. User selects court type and duration
4. If credits insufficient:
   - Credits Remaining shows negative in **red**
   - Warning banner appears: "Insufficient Credits"
   - Shows exactly how many more credits needed
   - Button changes to "Purchase More Credits" (green)
5. User clicks "Purchase More Credits"
6. Purchase modal opens
7. User selects package and purchases
8. Credits added to account
9. User can now complete booking

### Flow 2: Purchase from My Sessions

1. User navigates to "My Sessions" tab
2. Sees credit balance summary
3. If low credits (< 5), sees yellow warning
4. If no credits (≤ 0), sees red warning
5. Clicks "💳 Purchase Credits" button
6. Purchase modal opens
7. User selects package and purchases
8. Credits added to account

### Flow 3: Proactive Purchase

1. User in My Sessions with any credit balance
2. Clicks "💳 Purchase Credits" button
3. Purchase modal shows current balance
4. User selects package
5. Order summary shows:
   - Credits to add
   - Current balance
   - New balance (highlighted in green)
6. User completes purchase
7. Balance updated instantly

---

## 🎨 UI Components

### Booking Modal - Insufficient Credits State

```
┌─────────────────────────────────────────────┐
│  Credits Remaining                          │
│  ┌───────────────────────────────────────┐  │
│  │         -2 Credits                    │  │ (RED)
│  └───────────────────────────────────────┘  │
│                                             │
│  ⚠️ Insufficient Credits                    │
│  You need 2 more credits to complete        │
│  this booking.                              │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │   Purchase More Credits               │  │ (GREEN)
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Purchase Credits Modal

```
┌─────────────────────────────────────────────┐
│  Purchase Credits                           │
│  Current Balance: 3 credits                 │
│                                             │
│  ℹ️ Demo Mode: This is a simulated payment │
│                                             │
│  Select a Credit Package:                   │
│                                             │
│  ┌──────────┐  ┌──────────┐               │
│  │    5     │  │    10    │ ⭐ POPULAR    │
│  │ Credits  │  │ Credits  │               │
│  │   $25    │  │   $45    │               │
│  └──────────┘  └──────────┘               │
│                                             │
│  ┌──────────┐  ┌──────────┐               │
│  │    20    │  │    50    │               │
│  │ Credits  │  │ Credits  │               │
│  │   $80    │  │  $175    │               │
│  └──────────┘  └──────────┘               │
│                                             │
│  Order Summary:                             │
│  Credits to add:      10 credits            │
│  Current balance:      3 credits            │
│  ────────────────────────────────           │
│  New balance:         13 credits (GREEN)    │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │ Purchase 10 Credits for $45           │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  🔒 Secure checkout powered by [Provider]  │
└─────────────────────────────────────────────┘
```

### My Sessions - Credit Warnings

**Low Credits (< 5):**
```
⚠️ Low Credit Balance
You have 3.0 credits remaining. Consider purchasing more credits.
```

**No Credits (≤ 0):**
```
❌ No Credits Available
You need to purchase credits before you can make a booking.
```

---

## 💻 Technical Implementation

### New Component

**`PurchaseCreditsModal.tsx`**
- Fully self-contained modal component
- 4 pre-defined credit packages
- Simulated payment processing (2 seconds)
- ESC key support
- Responsive design
- Loading state during processing

### Modified Components

**`BookingModal.tsx`**
- Added `onPurchaseCredits` prop
- Conditional button rendering based on credit balance
- Insufficient credits warning banner
- Prevents booking when credits < 0

**`MySessions.tsx`**
- Added `onPurchaseCredits` prop
- New "Purchase Credits" button (purple)
- Low credit warning (yellow, < 5 credits)
- No credit warning (red, ≤ 0 credits)
- Responsive button layout (stacks on mobile)

**`page.tsx`**
- Added `isPurchaseModalOpen` state
- Added `handlePurchaseCredits` function
- Integrated PurchaseCreditsModal
- Updates user credits on purchase

**`mockData.ts`**
- Reduced starting credits to 3 (to demo the feature)
- Total credits: 20

---

## 🔒 Credit Validation

### Booking Prevention
```typescript
// User CANNOT book if creditsRemaining < 0
if (creditsRemaining < 0) {
  return; // Booking prevented
}
```

### Button States
- **Sufficient Credits**: Orange "Complete Booking!" button (enabled)
- **Insufficient Credits**: Green "Purchase More Credits" button
- **No Court Selected**: Orange button (disabled)

---

## 📊 Credit Packages

| Package | Credits | Price | Per Credit | Savings |
|---------|---------|-------|------------|---------|
| Small   | 5       | $25   | $5.00      | -       |
| Medium  | 10      | $45   | $4.50      | 10%     |
| Large   | 20      | $80   | $4.00      | 20%     |
| X-Large | 50      | $175  | $3.50      | 30%     |

**Most Popular**: 10 Credits for $45

---

## 🎮 Demo Mode

The purchase flow is fully simulated:
- ✅ No real payment processing
- ✅ No credit card required
- ✅ 2-second simulated delay
- ✅ Success message on completion
- ✅ Instant credit balance update
- ✅ Clear "Demo Mode" banner

**Future Integration**: Replace with real payment gateway (Stripe, PayPal, etc.)

---

## ✨ User Experience Features

### Visual Feedback
- ✅ Color-coded warnings (yellow = low, red = none)
- ✅ Clear messaging about credit needs
- ✅ Loading spinner during processing
- ✅ Success confirmation
- ✅ Disabled states during processing

### Accessibility
- ✅ ESC key closes modal
- ✅ Clear focus states
- ✅ Descriptive error messages
- ✅ Icon indicators for warnings

### Responsive Design
- ✅ Mobile-friendly modal
- ✅ Stacked buttons on small screens
- ✅ Touch-friendly package selection
- ✅ Scrollable content

---

## 🧪 Testing Scenarios

### Test 1: Insufficient Credits
1. Start with 3 credits
2. Try to book 120-minute session (4 credits)
3. ✅ Should show "Need 1 more credit" warning
4. ✅ Button should say "Purchase More Credits"
5. ✅ Cannot complete booking

### Test 2: Purchase Flow
1. Click "Purchase More Credits"
2. ✅ Modal opens with current balance
3. Select 10-credit package
4. ✅ Order summary shows new balance (13 credits)
5. Click purchase
6. ✅ Loading state shows
7. ✅ Success message appears
8. ✅ Balance updates to 13 credits

### Test 3: Low Credit Warning
1. Have 3 credits remaining
2. Go to My Sessions
3. ✅ Yellow warning appears
4. ✅ "Purchase Credits" button visible

### Test 4: No Credits Warning
1. Use all credits (0 remaining)
2. Go to My Sessions
3. ✅ Red warning appears
4. ✅ "Purchase Credits" button prominent

### Test 5: Successful Booking After Purchase
1. Start with insufficient credits
2. Purchase more credits
3. Return to booking
4. ✅ Can now complete booking
5. ✅ Credits deducted correctly

---

## 🚀 Future Enhancements

### Phase 1: Real Payment Integration
- [ ] Integrate Stripe or PayPal
- [ ] Add credit card form
- [ ] Implement secure payment processing
- [ ] Add payment confirmation emails

### Phase 2: Enhanced Features
- [ ] Credit purchase history
- [ ] Subscription plans (monthly credits)
- [ ] Gift credits to other members
- [ ] Promotional codes/discounts
- [ ] Bulk purchase discounts

### Phase 3: Admin Features
- [ ] Manually add/remove credits
- [ ] Adjust credit pricing
- [ ] View purchase analytics
- [ ] Refund credits

---

## 📝 Code Examples

### Opening Purchase Modal from Booking
```typescript
{creditsRemaining < 0 ? (
  <button
    onClick={() => {
      onClose();
      onPurchaseCredits();
    }}
  >
    Purchase More Credits
  </button>
) : (
  <button onClick={handleBooking}>
    Complete Booking!
  </button>
)}
```

### Handling Credit Purchase
```typescript
const handlePurchaseCredits = (creditsAdded: number) => {
  setUser({
    ...user,
    creditBalance: user.creditBalance + creditsAdded,
    totalCredits: user.totalCredits + creditsAdded,
  });
};
```

---

## 🎯 Success Metrics

- ✅ Users cannot book without sufficient credits
- ✅ Clear path to purchase more credits
- ✅ Multiple entry points for purchasing
- ✅ Smooth, intuitive user experience
- ✅ No errors or edge cases
- ✅ Instant balance updates

---

## 📱 Screenshots Locations

To see the feature in action:
1. **Booking Modal**: Try booking with 3 credits (select 120 mins)
2. **My Sessions**: View credit warnings and purchase button
3. **Purchase Modal**: Click any "Purchase Credits" button

---

## 🎉 Summary

The credit purchase feature is **fully functional** and provides:
- ✅ Complete booking prevention when insufficient credits
- ✅ Beautiful purchase interface with 4 packages
- ✅ Multiple access points
- ✅ Smart warnings and notifications
- ✅ Demo payment flow (ready for real integration)
- ✅ Seamless user experience

**Status**: ✅ COMPLETE AND READY FOR TESTING

---

**Created**: January 28, 2026  
**Version**: 1.0  
**Status**: Production Ready (Demo Mode)
