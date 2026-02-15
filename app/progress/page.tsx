'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedPage from '@/components/ProtectedPage';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Button from '@/components/Button';
import { safeGetJSON, SessionRecord } from '@/lib/storage';
import Link from 'next/link';

export default function ProgressPage() {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);

  useEffect(() => {
    const currentSessions = safeGetJSON<SessionRecord[]>('cava_sessions', []);
    setSessions(currentSessions);
  }, []);

  const thisWeekSessions = sessions.filter(session => {
    const sessionDate = new Date(session.dateISO);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return sessionDate >= weekAgo;
  });

  const thisWeekReps = thisWeekSessions.reduce((sum, session) => {
    return sum + session.exercises.reduce((exSum, ex) => exSum + ex.repsValid, 0);
  }, 0);

  const weeklyTarget = 5;
  const consistency = Math.min((thisWeekSessions.length / weeklyTarget) * 100, 100);

  const last5Sessions = sessions
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())
    .slice(0, 5);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split('T')[0];
    const session = sessions.find(s => s.dateISO.startsWith(dateStr));
    return {
      date: dateStr,
      duration: session ? session.durationSec : 0
    };
  });

  const maxDuration = Math.max(...last7Days.map(d => d.duration), 1);

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Progres</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Latihan Minggu Ini"
              value={thisWeekSessions.length}
              subtitle="Sesi latihan"
            />
            <StatCard
              title="Total Repetisi Valid Minggu Ini"
              value={thisWeekReps}
              subtitle="Repetisi"
            />
            <StatCard
              title="Konsistensi"
              value={`${Math.round(consistency)}%`}
              subtitle={`${thisWeekSessions.length}/${weeklyTarget} sesi target`}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Kepatuhan Mingguan
              </h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Target: {weeklyTarget} sesi/minggu</span>
                  <span>{thisWeekSessions.length} sesi</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-primary h-4 rounded-full transition-all"
                    style={{ width: `${consistency}%` }}
                  />
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Tren Progres (Mock)
              </h2>
              <div className="space-y-2">
                {last7Days.map((day, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-20">
                      {new Date(day.date).toLocaleDateString('id-ID', {
                        weekday: 'short'
                      })}
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                      <div
                        className="bg-primary h-6 rounded-full flex items-center justify-end pr-2"
                        style={{
                          width: `${(day.duration / maxDuration) * 100}%`
                        }}
                      >
                        {day.duration > 0 && (
                          <span className="text-xs text-white font-medium">
                            {Math.floor(day.duration / 60)}m
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Durasi latihan (menit)</p>
            </Card>
          </div>

          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Latihan Terakhir</h2>
            {last5Sessions.length > 0 ? (
              <div className="space-y-4">
                {last5Sessions.map(session => (
                  <div
                    key={session.id}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(session.dateISO).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-gray-600">
                          Durasi: {Math.floor(session.durationSec / 60)} menit{' '}
                          {session.durationSec % 60} detik
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      {session.exercises.map((ex, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="text-gray-700">
                            {ex.exerciseId}: {ex.repsValid}/{ex.targetReps} repetisi valid
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Belum ada sesi latihan yang tercatat
              </p>
            )}
          </Card>

          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/program">
              <Button variant="primary">Lihat Program Hari Ini</Button>
            </Link>
            <Link href="/tele-rehab">
              <Button variant="primary">Mulai Sesi</Button>
            </Link>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
