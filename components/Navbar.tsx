'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';
import Button from './Button';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="relative" style={{ width: '120px', height: '40px' }}>
              <Image
                src="/logo.png"
                alt="CAVA Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <Button variant="ghost" onClick={handleLogout} className="text-sm">
            Keluar
          </Button>
        </div>
      </div>
    </nav>
  );
}
