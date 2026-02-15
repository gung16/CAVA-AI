'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthed } from '@/lib/auth';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (isAuthed()) {
      router.replace('/dashboard');
    }
  }, [router]);

  const handleDemoAccount = () => {
    setFormData({
      name: 'Test User',
      email: 'test',
      password: 'test',
      confirmPassword: 'test'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In demo mode, just redirect to login with demo credentials
    router.push('/login?demo=true');
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-50 to-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CAVA</h1>
          <p className="text-lg text-gray-600">
            Computer-Vision Assisted Virtual Rehabilitation
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Platform rehabilitasi virtual berbasis computer vision untuk pemulihan stroke.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Daftar</h2>
            <p className="text-gray-600">Buat akun baru</p>
          </div>
          
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
            <strong>Mode Demo:</strong> Pendaftaran belum tersedia. Gunakan akun demo dengan username <code className="bg-yellow-100 px-1 rounded">test</code> dan password <code className="bg-yellow-100 px-1 rounded">test</code>.
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nama Lengkap"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Test User"
            />
            <Input
              label="Email atau Username"
              type="text"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="test"
            />
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="test"
            />
            <Input
              label="Konfirmasi Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="test"
            />
            
            <Button 
              type="button" 
              variant="secondary" 
              className="w-full"
              onClick={handleDemoAccount}
            >
              Gunakan Akun Demo
            </Button>
            
            <Button type="submit" variant="primary" className="w-full">
              Daftar (Redirect ke Login)
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <a href="/login" className="text-primary hover:underline font-medium">
                Masuk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
