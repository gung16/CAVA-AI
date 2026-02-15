'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthed } from '@/lib/auth';
import LandingNavbar from '@/components/LandingNavbar';
import Button from '@/components/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isAuthed()) {
      router.replace('/dashboard');
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
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Rehabilitasi Stroke
              <br />
              <span className="text-primary">Berbasis Computer Vision</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Platform rehabilitasi virtual yang canggih dengan teknologi computer vision 
              untuk membantu pemulihan stroke secara efektif dan terpantau.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button variant="primary" className="text-lg px-8 py-4">
                  Mulai Sekarang
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" className="text-lg px-8 py-4">
                  Masuk ke Akun
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Mode Demo: Gunakan <code className="bg-gray-100 px-2 py-1 rounded">test</code> / <code className="bg-gray-100 px-2 py-1 rounded">test</code> untuk mencoba
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Teknologi canggih untuk mendukung perjalanan rehabilitasi Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Tele-Rehabilitasi Real-time
              </h3>
              <p className="text-gray-600">
                Sesi latihan langsung dengan panduan video dan feedback real-time menggunakan teknologi computer vision untuk memastikan gerakan yang benar.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Tracking Progres Otomatis
              </h3>
              <p className="text-gray-600">
                Pantau perkembangan latihan Anda dengan dashboard yang komprehensif, termasuk statistik repetisi, konsistensi, dan tren pemulihan.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Program Adaptif Personal
              </h3>
              <p className="text-gray-600">
                Program latihan yang disesuaikan dengan kondisi dan kemajuan Anda, dengan berbagai latihan khusus untuk rehabilitasi stroke.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cara Kerja
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proses rehabilitasi yang sederhana dan efektif
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Daftar & Login', desc: 'Buat akun atau gunakan akun demo untuk mulai' },
              { step: '02', title: 'Program Harian', desc: 'Lihat program latihan yang disesuaikan untuk hari ini' },
              { step: '03', title: 'Latihan Terpandu', desc: 'Ikuti sesi tele-rehab dengan panduan video dan feedback' },
              { step: '04', title: 'Pantau Progres', desc: 'Lihat perkembangan dan statistik latihan Anda' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Mengapa Memilih CAVA?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Akses Mudah dari Rumah',
                    desc: 'Lakukan rehabilitasi kapan saja dan di mana saja tanpa perlu ke klinik secara rutin.'
                  },
                  {
                    title: 'Pemantauan Real-time',
                    desc: 'Teknologi computer vision memastikan gerakan Anda dilakukan dengan benar dan aman.'
                  },
                  {
                    title: 'Program Terstruktur',
                    desc: 'Program latihan yang sistematis dan disesuaikan dengan kondisi dan kemajuan Anda.'
                  },
                  {
                    title: 'Data Terpantau',
                    desc: 'Semua data latihan tersimpan dan dapat dipantau untuk evaluasi perkembangan.'
                  },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-12">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">6+</div>
                  <p className="text-gray-700">Program Latihan</p>
                </div>
                <div className="h-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-gray-700">Akses Kapan Saja</p>
                </div>
                <div className="h-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">100%</div>
                  <p className="text-gray-700">Terpantau & Terukur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Memulai Rehabilitasi Anda?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Bergabunglah dengan CAVA hari ini dan mulailah perjalanan pemulihan Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button variant="secondary" className="text-lg px-8 py-4 bg-white text-primary hover:bg-gray-50">
                Daftar Sekarang
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-lg px-8 py-4 text-white border-white hover:bg-white/10">
                Masuk ke Akun
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative" style={{ width: '120px', height: '40px' }}>
                  <Image
                    src="/logo.png"
                    alt="CAVA Logo"
                    fill
                    className="object-contain opacity-80"
                  />
                </div>
              </div>
              <p className="text-sm">
                Computer-Vision Assisted Virtual Rehabilitation
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Tautan Cepat</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/login" className="hover:text-white transition-colors">Masuk</Link></li>
                <li><Link href="/signup" className="hover:text-white transition-colors">Daftar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Kontak</h4>
              <p className="text-sm">
                Platform rehabilitasi virtual untuk pemulihan stroke
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2024 CAVA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
