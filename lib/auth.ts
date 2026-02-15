import { User, initDefaults } from './storage';

export function login(username: string, password: string): boolean {
  if (username === 'test' && password === 'test') {
    if (typeof window === 'undefined') return false;
    
    const user: User = {
      name: 'Test User',
      email: 'test'
    };
    
    localStorage.setItem('cava_auth', 'true');
    localStorage.setItem('cava_user', JSON.stringify(user));
    
    // Initialize defaults
    initDefaults();
    
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('cava_auth');
  localStorage.removeItem('cava_user');
  localStorage.removeItem('cava_plan');
  localStorage.removeItem('cava_sessions');
}

export function isAuthed(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cava_auth') === 'true';
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const userStr = localStorage.getItem('cava_user');
    if (!userStr) return null;
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}
