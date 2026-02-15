'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

export default function LandingNavbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
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
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm">
                Masuk
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" className="text-sm">
                Daftar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
