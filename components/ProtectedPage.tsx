'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthed } from '@/lib/auth';
import Navbar from './Navbar';

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isAuthed()) {
      router.replace('/login');
    } else {
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Memuat...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
