'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedPage from '@/components/ProtectedPage';
import StatCard from '@/components/StatCard';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { safeGetJSON, Plan, SessionRecord } from '@/lib/storage';
import { exercises } from '@/lib/exercises';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);

  useEffect(() => {
    const currentPlan = safeGetJSON<Plan>('cava_plan', {
      currentIndex: 0,
      exercises: exercises.map(ex => ex.id),
      completed: []
    });
    const currentSessions = safeGetJSON<SessionRecord[]>('cava_sessions', []);
    setPlan(currentPlan);
    setSessions(currentSessions);
  }, []);

  const completedToday = plan?.completed.length || 0;
  const totalToday = plan?.exercises.length || 0;
  
  const thisWeekSessions = sessions.filter(session => {
    const sessionDate = new Date(session.dateISO);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return sessionDate >= weekAgo;
  });

  const thisWeekReps = thisWeekSessions.reduce((sum, session) => {
    return sum + session.exercises.reduce((exSum, ex) => exSum + ex.repsValid, 0);
  }, 0);

  const recommendedExercises = plan
    ? plan.exercises
        .slice(0, 3)
        .map(id => exercises.find(ex => ex.id === id))
        .filter(Boolean)
    : [];

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Program Hari Ini"
              value={`${completedToday}/${totalToday}`}
              subtitle="Latihan selesai"
              action={
                <Link href="/program">
                  <Button variant="primary" className="w-full text-sm">
                    Lihat Program
                  </Button>
                </Link>
              }
            />
            <StatCard
              title="Progress Minggu Ini"
              value={thisWeekSessions.length}
              subtitle={`${thisWeekReps} repetisi valid`}
              action={
                <Link href="/progress">
                  <Button variant="primary" className="w-full text-sm">
                    Lihat Progress
                  </Button>
                </Link>
              }
            />
            <StatCard
              title="Mulai Tele-Rehab"
              value="Sesi Baru"
              subtitle="Mulai latihan dengan panduan"
              action={
                <Link href="/tele-rehab">
                  <Button variant="primary" className="w-full text-sm">
                    Mulai Sesi
                  </Button>
                </Link>
              }
            />
          </div>

          <Card className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Latihan Direkomendasikan Hari Ini
            </h2>
            <div className="space-y-4">
              {recommendedExercises.length > 0 ? (
                recommendedExercises.map((exercise, index) => (
                  <div
                    key={exercise?.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{exercise?.name}</h3>
                      <p className="text-sm text-gray-600">{exercise?.goal}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {exercise?.difficulty}
                      </span>
                      <Link href={`/program?exercise=${exercise?.id}`}>
                        <Button variant="ghost" className="text-sm">
                          Lihat Detail
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Tidak ada latihan yang direkomendasikan
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </ProtectedPage>
  );
}
