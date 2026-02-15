'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthed } from '@/lib/auth';
import LandingNavbar from '@/components/LandingNavbar';
import Button from '@/components/Button';
import FeatureCarousel from '@/components/FeatureCarousel';
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

  const features = [
    {
      id: 'tele-rehab',
      title: 'Tele-Rehabilitasi Real-time',
      description: 'Sesi latihan langsung dengan panduan video dan feedback real-time menggunakan teknologi computer vision untuk memastikan gerakan yang benar dan aman. Pantau perkembangan Anda secara langsung dengan sistem yang responsif dan akurat.',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'progress-tracking',
      title: 'Tracking Progres Otomatis',
      description: 'Pantau perkembangan latihan Anda dengan dashboard yang komprehensif, termasuk statistik repetisi, konsistensi, dan tren pemulihan. Data terupdate secara real-time untuk evaluasi yang lebih baik.',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'adaptive-program',
      title: 'Program Adaptif Personal',
      description: 'Program latihan yang disesuaikan dengan kondisi dan kemajuan Anda, dengan berbagai latihan khusus untuk rehabilitasi stroke. Sistem adaptif yang terus berkembang sesuai kebutuhan Anda.',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: 'safety-monitoring',
      title: 'Pemantauan Keamanan',
      description: 'Sistem deteksi risiko jatuh dan monitoring keamanan real-time untuk memastikan latihan Anda aman. Notifikasi otomatis jika terdeteksi gerakan yang berpotensi berbahaya.',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

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
      
      {/* Hero Section - Logo Left, Description Right */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative" style={{ width: '400px', height: '200px', maxWidth: '100%' }}>
                <Image
                  src="/logo.png"
                  alt="CAVA Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
            {/* Right: Description & CTA */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Rehabilitasi Stroke
                <br />
                <span className="text-primary">Berbasis Computer Vision</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                Platform rehabilitasi virtual yang canggih dengan teknologi computer vision 
                untuk membantu pemulihan stroke secara efektif dan terpantau. Mulai perjalanan 
                pemulihan Anda dari kenyamanan rumah dengan panduan profesional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/signup">
                  <Button variant="primary" className="text-lg px-8 py-4 w-full sm:w-auto">
                    Mulai Sekarang
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="secondary" className="text-lg px-8 py-4 w-full sm:w-auto">
                    Masuk ke Akun
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 pt-2">
                <span className="font-medium">Mode Demo:</span> Gunakan{' '}
                <code className="bg-gray-100 px-2 py-1 rounded text-primary">test</code> /{' '}
                <code className="bg-gray-100 px-2 py-1 rounded text-primary">test</code> untuk mencoba
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Carousel Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Teknologi canggih untuk mendukung perjalanan rehabilitasi Anda
            </p>
          </div>
          
          <FeatureCarousel features={features} />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cara Kerja
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proses rehabilitasi yang sederhana dan efektif
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: '01', 
                title: 'Daftar & Login', 
                desc: 'Buat akun atau gunakan akun demo untuk mulai',
                icon: '👤'
              },
              { 
                step: '02', 
                title: 'Program Harian', 
                desc: 'Lihat program latihan yang disesuaikan untuk hari ini',
                icon: '📋'
              },
              { 
                step: '03', 
                title: 'Latihan Terpandu', 
                desc: 'Ikuti sesi tele-rehab dengan panduan video dan feedback',
                icon: '🎥'
              },
              { 
                step: '04', 
                title: 'Pantau Progres', 
                desc: 'Lihat perkembangan dan statistik latihan Anda',
                icon: '📊'
              },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Mengapa Memilih CAVA?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Akses Mudah dari Rumah',
                    desc: 'Lakukan rehabilitasi kapan saja dan di mana saja tanpa perlu ke klinik secara rutin. Hemat waktu dan biaya transportasi.',
                    icon: '🏠'
                  },
                  {
                    title: 'Pemantauan Real-time',
                    desc: 'Teknologi computer vision memastikan gerakan Anda dilakukan dengan benar dan aman. Feedback instan untuk setiap gerakan.',
                    icon: '👁️'
                  },
                  {
                    title: 'Program Terstruktur',
                    desc: 'Program latihan yang sistematis dan disesuaikan dengan kondisi dan kemajuan Anda. Progress tracking yang detail.',
                    icon: '📈'
                  },
                  {
                    title: 'Data Terpantau',
                    desc: 'Semua data latihan tersimpan dan dapat dipantau untuk evaluasi perkembangan. Laporan lengkap untuk dokter.',
                    icon: '💾'
                  },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="text-3xl flex-shrink-0">{benefit.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-lg">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary via-primary-dark to-primary rounded-2xl p-12 text-white shadow-2xl">
              <div className="space-y-8">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-3">6+</div>
                  <p className="text-xl text-red-100">Program Latihan</p>
                  <p className="text-sm text-red-200 mt-2">Latihan khusus untuk rehabilitasi stroke</p>
                </div>
                <div className="h-px bg-white/20"></div>
                <div className="text-center">
                  <div className="text-6xl font-bold mb-3">24/7</div>
                  <p className="text-xl text-red-100">Akses Kapan Saja</p>
                    <p className="text-sm text-red-200 mt-2">Latihan sesuai jadwal Anda</p>
                </div>
                <div className="h-px bg-white/20"></div>
                <div className="text-center">
                  <div className="text-6xl font-bold mb-3">100%</div>
                  <p className="text-xl text-red-100">Terpantau & Terukur</p>
                  <p className="text-sm text-red-200 mt-2">Data akurat untuk evaluasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-primary-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Siap Memulai Rehabilitasi Anda?
          </h2>
          <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan CAVA hari ini dan mulailah perjalanan pemulihan Anda dengan teknologi terdepan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button variant="secondary" className="text-lg px-10 py-5 bg-white text-primary hover:bg-gray-50 shadow-lg">
                Daftar Sekarang
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-lg px-10 py-5 text-white border-2 border-white hover:bg-white/10">
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
              <p className="text-sm leading-relaxed">
                Computer-Vision Assisted Virtual Rehabilitation
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Platform rehabilitasi virtual untuk pemulihan stroke
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Tautan Cepat</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Masuk
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-white transition-colors">
                    Daftar
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Tentang</h4>
              <p className="text-sm leading-relaxed">
                CAVA menggunakan teknologi computer vision untuk membantu proses rehabilitasi stroke secara efektif dan terpantau.
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
