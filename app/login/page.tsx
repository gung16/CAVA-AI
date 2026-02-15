'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthed } from '@/lib/auth';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthed()) {
      router.replace('/dashboard');
    }
    
    // Check for demo query param
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === 'true') {
      setUsername('test');
      setPassword('test');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (login(username, password)) {
      router.push('/dashboard');
    } else {
      setError('Username atau password salah. Gunakan test/test untuk demo.');
      setLoading(false);
    }
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Masuk</h2>
            <p className="text-gray-600">Masuk ke akun Anda</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username atau Email"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="test"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="test"
            />
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
              <strong>Demo Mode:</strong> Gunakan username <code className="bg-blue-100 px-1 rounded">test</code> dan password <code className="bg-blue-100 px-1 rounded">test</code>
            </div>
            
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Belum punya akun?{' '}
              <a href="/signup" className="text-primary hover:underline font-medium">
                Daftar
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
