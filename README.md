# CAVA - Computer-Vision Assisted Virtual Rehabilitation

A premium healthcare web application for stroke rehabilitation using computer vision assistance.

## Tech Stack

- **Next.js 14+** with App Router (TypeScript)
- **Tailwind CSS** for styling
- **localStorage** for client-side state management
- No backend (demo mode)

## Features

### Authentication
- Demo login: username `test` / password `test`
- Signup page with demo account option
- Protected routes with automatic redirect

### Dashboard
- Summary cards for daily program, weekly progress, and quick actions
- Recommended exercises for today

### Program Page
- Today's adaptive rehabilitation exercise plan
- Exercise status tracking (Not started, In progress, Completed)
- Detailed exercise information panel
- Skip functionality with confirmation

### Progress Dashboard
- Weekly session count and valid repetitions
- Consistency tracking (sessions per week)
- Progress trends visualization (mock data)
- Last 5 session history

### Tele-Rehabilitation Interface
- Live camera preview (getUserMedia)
- Rep counter with manual increment
- Live feedback system (mock)
- Safety monitoring with fall risk simulation
- Session completion tracking

## Exercise Library

The application includes 6 hardcoded stroke rehabilitation exercises:

1. **Shoulder Raise 90°** - Shoulder strength and range of motion
2. **Seated Marching** - Thigh strength and coordination
3. **Sit-to-Stand (Assisted)** - Leg strength and balance
4. **Heel Raises (Standing Support)** - Calf strength and balance
5. **Wrist Extension & Flexion** - Wrist flexibility and strength
6. **Lateral Weight Shift** - Balance and weight control

All exercises include:
- Goal and target muscle groups
- Step-by-step instructions
- Safety tips
- Common mistakes to avoid
- Difficulty level and target reps/sets

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Login Credentials

- **Username/Email:** `test`
- **Password:** `test`

## Project Structure

```
├── app/
│   ├── dashboard/      # Main dashboard page
│   ├── login/          # Login page
│   ├── signup/         # Signup page (demo mode)
│   ├── program/        # Exercise program page
│   ├── progress/       # Progress tracking dashboard
│   ├── tele-rehab/     # Tele-rehabilitation interface
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Root redirect
│   └── globals.css     # Global styles
├── components/         # Reusable UI components
├── lib/               # Core libraries
│   ├── auth.ts        # Authentication utilities
│   ├── storage.ts     # localStorage helpers
│   └── exercises.ts   # Exercise library
└── public/            # Static assets
```

## Data Model

### localStorage Keys

- `cava_auth`: Authentication status (`"true"` or `null`)
- `cava_user`: User object (`{name, email}`)
- `cava_plan`: Current exercise plan (`{currentIndex, exercises[], completed[]}`)
- `cava_sessions`: Array of session records

### Session Record Format

```typescript
{
  id: string;
  dateISO: string;
  durationSec: number;
  exercises: [{
    exerciseId: string;
    repsValid: number;
    targetReps: number;
    notes?: string;
  }];
}
```

## Design Principles

- **Premium healthcare feel**: Clean, professional, trustworthy
- **Color scheme**: White background with red accents (#DC2626)
- **Typography**: Modern, readable, accessible
- **Interactions**: Smooth hover states, soft shadows, rounded corners
- **Responsive**: Mobile-first design, stacks on small screens

## Browser Requirements

- Modern browser with WebRTC support (for camera)
- Camera permission required for tele-rehab page
- localStorage support (all modern browsers)

## Notes

- This is a **demo/mockup** version with no backend or AI implementation
- Camera preview works on localhost via getUserMedia
- All data is stored in browser localStorage
- Exercise completion updates plan and progress automatically

## License

Private project - CAVA AI
