export interface User {
  name: string;
  email: string;
}

export interface ExerciseSession {
  exerciseId: string;
  repsValid: number;
  targetReps: number;
  notes?: string;
}

export interface SessionRecord {
  id: string;
  dateISO: string;
  durationSec: number;
  exercises: ExerciseSession[];
}

export interface Plan {
  currentIndex: number;
  exercises: string[]; // exercise IDs
  completed: string[]; // completed exercise IDs
}

export function safeGetJSON<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

export function safeSetJSON<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function initDefaults(): void {
  if (typeof window === 'undefined') return;
  
  // Initialize plan if missing
  const plan = safeGetJSON<Plan>('cava_plan', {
    currentIndex: 0,
    exercises: ['shoulder-raise-90', 'seated-marching', 'sit-to-stand', 'heel-raises', 'wrist-extension-flexion', 'lateral-weight-shift'],
    completed: []
  });
  safeSetJSON('cava_plan', plan);
  
  // Initialize sessions if missing
  const sessions = safeGetJSON<SessionRecord[]>('cava_sessions', []);
  safeSetJSON('cava_sessions', sessions);
}
