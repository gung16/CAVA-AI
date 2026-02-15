'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProtectedPage from '@/components/ProtectedPage';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { safeGetJSON, safeSetJSON, Plan } from '@/lib/storage';
import { exercises, getExerciseById, Exercise } from '@/lib/exercises';

type ExerciseStatus = 'not-started' | 'in-progress' | 'completed';

export default function ProgramPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [skipExerciseId, setSkipExerciseId] = useState<string | null>(null);

  useEffect(() => {
    const currentPlan = safeGetJSON<Plan>('cava_plan', {
      currentIndex: 0,
      exercises: exercises.map(ex => ex.id),
      completed: []
    });
    setPlan(currentPlan);

    const exerciseId = searchParams.get('exercise');
    if (exerciseId) {
      const exercise = getExerciseById(exerciseId);
      if (exercise) {
        setSelectedExercise(exercise);
      }
    } else if (currentPlan.exercises.length > 0) {
      // Show current exercise by default
      const currentEx = getExerciseById(currentPlan.exercises[currentPlan.currentIndex]);
      if (currentEx) setSelectedExercise(currentEx);
    }
  }, [searchParams]);

  const getExerciseStatus = (exerciseId: string, index: number): ExerciseStatus => {
    if (!plan) return 'not-started';
    if (plan.completed.includes(exerciseId)) return 'completed';
    if (index === plan.currentIndex) return 'in-progress';
    if (index < plan.currentIndex) return 'completed';
    return 'not-started';
  };

  const handleStartExercise = (exerciseId: string) => {
    router.push(`/tele-rehab?exerciseId=${exerciseId}`);
  };

  const handleSkip = () => {
    if (!plan || !skipExerciseId) return;
    
    const currentIndex = plan.exercises.indexOf(skipExerciseId);
    if (currentIndex === -1) return;

    const newPlan: Plan = {
      ...plan,
      currentIndex: Math.min(currentIndex + 1, plan.exercises.length - 1)
    };
    
    safeSetJSON('cava_plan', newPlan);
    setPlan(newPlan);
    setShowSkipModal(false);
    setSkipExerciseId(null);
  };

  const handleSkipClick = (exerciseId: string) => {
    setSkipExerciseId(exerciseId);
    setShowSkipModal(true);
  };

  if (!plan) {
    return (
      <ProtectedPage>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-600">Memuat...</div>
        </div>
      </ProtectedPage>
    );
  }

  const planExercises = plan.exercises.map(id => getExerciseById(id)).filter(Boolean) as Exercise[];
  const completedCount = plan.completed.length;

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Program Hari Ini</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {planExercises.map((exercise, index) => {
                const status = getExerciseStatus(exercise.id, index);
                const isCurrent = index === plan.currentIndex;
                
                return (
                  <Card
                    key={exercise.id}
                    className={`${
                      isCurrent ? 'ring-2 ring-primary' : ''
                    } transition-all cursor-pointer hover:shadow-md`}
                    onClick={() => setSelectedExercise(exercise)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-gray-500">
                            Latihan {index + 1}
                          </span>
                          {isCurrent && (
                            <span className="text-xs px-2 py-1 bg-primary text-white rounded-full">
                              Latihan saat ini
                            </span>
                          )}
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : status === 'in-progress'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {status === 'completed'
                              ? 'Selesai'
                              : status === 'in-progress'
                              ? 'Sedang dikerjakan'
                              : 'Belum mulai'}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {exercise.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">{exercise.goal}</p>
                        <p className="text-xs text-gray-500">
                          Target: {exercise.targetSets} set × {exercise.targetReps} repetisi
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        {isCurrent && (
                          <>
                            <Button
                              variant="primary"
                              onClick={() => handleStartExercise(exercise.id)}
                              className="text-sm whitespace-nowrap"
                            >
                              Mulai Latihan
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={() => handleSkipClick(exercise.id)}
                              className="text-sm whitespace-nowrap"
                            >
                              Lewati
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-6">
              {selectedExercise ? (
                <Card>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {selectedExercise.name}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Tujuan</h3>
                      <p className="text-sm text-gray-600">{selectedExercise.goal}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Target Otot</h3>
                      <p className="text-sm text-gray-600">{selectedExercise.target}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Instruksi</h3>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                        {selectedExercise.instructions.map((instruction, idx) => (
                          <li key={idx}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Tips Keamanan</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {selectedExercise.safetyTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <p className="text-sm font-medium text-blue-900">
                        Target minimal efektif: {selectedExercise.targetSets} set ×{' '}
                        {selectedExercise.targetReps} repetisi
                      </p>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card>
                  <p className="text-gray-500 text-center py-4">
                    Pilih latihan untuk melihat detail
                  </p>
                </Card>
              )}

              <Card>
                <h3 className="font-semibold text-gray-900 mb-2">Progress Hari Ini</h3>
                <div className="text-3xl font-bold text-primary mb-1">
                  {completedCount}/{planExercises.length}
                </div>
                <p className="text-sm text-gray-600">Latihan selesai</p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showSkipModal}
        onClose={() => {
          setShowSkipModal(false);
          setSkipExerciseId(null);
        }}
        title="Lewati latihan ini?"
        onConfirm={handleSkip}
        confirmText="Ya, Lewati"
      >
        <p>Apakah Anda yakin ingin melewatkan latihan ini?</p>
      </Modal>
    </ProtectedPage>
  );
}
