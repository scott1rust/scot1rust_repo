# Quick Start Guide - Blazing Paddles

Get your Blazing Paddles app running in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

That's it! 🎉

## 📱 Testing the App

### Test the Booking Flow

1. **View Calendar**: You'll see a weekly calendar with some pre-populated bookings
2. **Click a Time Slot**: Click any white/available slot on the calendar
3. **Fill Booking Form**:
   - Select Court Type (Court or Bay)
   - Choose Duration (30, 60, 90, or 120 minutes)
   - Pick a Court/Bay from the dropdown
   - See credits calculated automatically
4. **Complete Booking**: Click the orange "Complete Booking!" button
5. **View Confirmation**: You'll see a success message

### Test My Sessions

1. **Click "My Sessions" Tab**: Switch to the sessions view
2. **See Your Bookings**: View all your upcoming reservations
3. **Check Credit Balance**: See your total credits, used credits, and remaining credits
4. **Book Another Court**: Click the green "Book a Court / Bay" button

## 🎨 Features to Explore

### Calendar Features
- ✅ Weekly view with time slots (8 AM - 8 PM)
- ✅ Navigate between weeks (Previous/Next buttons)
- ✅ Current day highlighted in blue
- ✅ Reserved slots shown with "All Courts Reserved"
- ✅ Click any available slot to book

### Booking Features
- ✅ Court vs Bay selection
- ✅ Multiple duration options (30-120 mins)
- ✅ Real-time credit calculation
- ✅ Credit balance validation
- ✅ Available court filtering

### Session Management
- ✅ List of upcoming bookings
- ✅ Credit usage tracking
- ✅ Credit balance dashboard
- ✅ Quick booking action

## 📊 Mock Data

The app comes with sample data:

**Courts/Bays:**
- Battery Bay (Bay)
- Paddington Pickle Court (Court)
- Smash Court (Court)
- Dink Bay (Bay)

**Your Account:**
- Total Credits: 10
- Pre-booked sessions with credits already used

**Sample Bookings:**
- Several bookings across the week to show how the calendar looks with reservations

## 🎯 What to Try

1. **Book a 30-minute session** - See how 1 credit is deducted
2. **Book a 120-minute session** - See how 4 credits are deducted
3. **Try to book with insufficient credits** - The system will prevent it
4. **Switch between tabs** - See how state persists
5. **Navigate weeks** - See how the calendar updates

## 🔧 Customization

### Change Colors

Edit `app/globals.css`:

```css
:root {
  --primary-orange: #FF8C42;  /* Change this */
  --primary-green: #4CAF50;   /* Change this */
  --beige: #F5E6D3;           /* Change this */
}
```

### Modify Time Slots

Edit `app/data/mockData.ts`:

```typescript
export const timeSlots = [
  '8 AM', '9 AM', '10 AM', // ... add or remove times
];
```

### Add More Courts

Edit `app/data/mockData.ts`:

```typescript
export const courts: Court[] = [
  { id: '5', name: 'Your New Court', type: 'Court', active: true },
  // ... add more
];
```

### Adjust Credit Costs

Edit `app/data/mockData.ts`:

```typescript
export function calculateCredits(duration: 30 | 60 | 90 | 120): number {
  const creditMap = {
    30: 1,   // Change these values
    60: 2,
    90: 3,
    120: 4,
  };
  return creditMap[duration];
}
```

## 📝 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is busy:

```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Check for TypeScript errors
npm run build

# Fix linting issues
npm run lint
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [date-fns Documentation](https://date-fns.org/docs/)

## 🚢 Ready to Deploy?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step deployment instructions to Vercel.

## 📚 Need More Details?

- **Full Specifications**: See [PROJECT_SPEC.md](./PROJECT_SPEC.md)
- **Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Main README**: See [README.md](./README.md)

## 💡 Tips

1. **Open DevTools**: Press F12 to see console logs and debug
2. **Test Responsiveness**: Resize your browser or use mobile view
3. **Check State**: React DevTools extension is helpful
4. **Experiment**: The mock data resets on page refresh, so feel free to experiment!

---

**Happy Coding! 🎾**

Need help? Check the documentation or create an issue.
