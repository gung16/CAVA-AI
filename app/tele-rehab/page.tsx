'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProtectedPage from '@/components/ProtectedPage';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { safeGetJSON, safeSetJSON, Plan, SessionRecord } from '@/lib/storage';
import { getExerciseById, Exercise } from '@/lib/exercises';

const feedbackMessages = [
  'Angkat lebih tinggi hingga 90°',
  'Pertahankan bahu sejajar',
  'Gerakan lebih perlahan',
  'Pertahankan postur tegak',
  'Kontrol gerakan dengan lebih baik',
  'Tarik napas dalam dan rileks',
  'Fokus pada kualitas gerakan',
];

export default function TeleRehabPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [validReps, setValidReps] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [currentFeedback, setCurrentFeedback] = useState<string>('');
  const [showFallRiskModal, setShowFallRiskModal] = useState(false);
  const [fallRiskTimer, setFallRiskTimer] = useState<NodeJS.Timeout | null>(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    const exerciseId = searchParams.get('exerciseId');
    if (exerciseId) {
      const ex = getExerciseById(exerciseId);
      if (ex) {
        setExercise(ex);
      } else {
        // Get current exercise from plan
        const plan = safeGetJSON<Plan>('cava_plan', {
          currentIndex: 0,
          exercises: [],
          completed: []
        });
        if (plan.exercises.length > 0) {
          const currentEx = getExerciseById(plan.exercises[plan.currentIndex]);
          if (currentEx) setExercise(currentEx);
        }
      }
    } else {
      // Get current exercise from plan
      const plan = safeGetJSON<Plan>('cava_plan', {
        currentIndex: 0,
        exercises: [],
        completed: []
      });
      if (plan.exercises.length > 0) {
        const currentEx = getExerciseById(plan.exercises[plan.currentIndex]);
        if (currentEx) setExercise(currentEx);
      }
    }

    setSessionStartTime(new Date());

    // Request camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
            setCameraActive(true);
          }
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
          setCameraActive(false);
        });
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (fallRiskTimer) {
        clearTimeout(fallRiskTimer);
      }
    };
  }, [searchParams]);

  const handleAddRep = () => {
    setValidReps(prev => prev + 1);
  };

  const handleReset = () => {
    setValidReps(0);
  };

  const handleFeedback = () => {
    const randomMessage = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
    setCurrentFeedback(randomMessage);
    setTimeout(() => setCurrentFeedback(''), 3000);
  };

  const handleSimulateFallRisk = () => {
    setShowFallRiskModal(true);
    
    // Auto-show emergency after 8 seconds if no response
    const timer = setTimeout(() => {
      setShowEmergencyModal(true);
      setShowFallRiskModal(false);
    }, 8000);
    
    setFallRiskTimer(timer);
  };

  const handleFallRiskResponse = (isOk: boolean) => {
    if (fallRiskTimer) {
      clearTimeout(fallRiskTimer);
      setFallRiskTimer(null);
    }
    setShowFallRiskModal(false);
    
    if (!isOk) {
      setShowEmergencyModal(true);
    }
  };

  const handleCompleteSession = () => {
    if (!exercise || !sessionStartTime) return;

    const duration = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000);
    
    const session: SessionRecord = {
      id: `session-${Date.now()}`,
      dateISO: new Date().toISOString(),
      durationSec: duration,
      exercises: [
        {
          exerciseId: exercise.id,
          repsValid: validReps,
          targetReps: exercise.targetReps,
          notes: `Completed ${validReps} valid reps`
        }
      ]
    };

    const sessions = safeGetJSON<SessionRecord[]>('cava_sessions', []);
    sessions.push(session);
    safeSetJSON('cava_sessions', sessions);

    // Update plan
    const plan = safeGetJSON<Plan>('cava_plan', {
      currentIndex: 0,
      exercises: [],
      completed: []
    });
    
    if (!plan.completed.includes(exercise.id)) {
      plan.completed.push(exercise.id);
    }
    
    if (plan.currentIndex < plan.exercises.length - 1) {
      plan.currentIndex += 1;
    }
    
    safeSetJSON('cava_plan', plan);

    // Stop camera
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    router.push('/progress');
  };

  if (!exercise) {
    return (
      <ProtectedPage>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-600">Memuat latihan...</div>
        </div>
      </ProtectedPage>
    );
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Tele-Rehabilitasi</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Camera Panel */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Kamera Preview</h2>
              <div className="relative bg-black rounded-xl overflow-hidden aspect-video mb-4">
                {cameraActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <p className="mb-2">Kamera tidak tersedia</p>
                      <p className="text-sm text-gray-400">
                        Pastikan Anda memberikan izin akses kamera
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Pose tracking:</span>
                  <span className="text-sm text-green-700 font-medium">Aktif (demo)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Stabilitas:</span>
                  <span className="text-sm text-green-700 font-medium">Baik (demo)</span>
                </div>
              </div>
            </Card>

            {/* Session Panel */}
            <div className="space-y-6">
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{exercise.name}</h2>
                <p className="text-sm text-gray-600 mb-1">{exercise.goal}</p>
                <p className="text-xs text-gray-500">Target: {exercise.target}</p>
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Repetisi Valid</h3>
                <div className="text-4xl font-bold text-primary mb-4 text-center">
                  {validReps}
                </div>
                <div className="flex gap-3">
                  <Button variant="primary" onClick={handleAddRep} className="flex-1">
                    +1 Repetisi Valid
                  </Button>
                  <Button variant="ghost" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Live Feedback</h3>
                <div className="min-h-[100px] p-4 bg-blue-50 rounded-xl mb-4 flex items-center justify-center">
                  {currentFeedback ? (
                    <p className="text-blue-900 font-medium">{currentFeedback}</p>
                  ) : (
                    <p className="text-blue-600 text-sm">Klik tombol untuk mendapatkan feedback</p>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={handleFeedback} className="flex-1">
                    Berikan Feedback
                  </Button>
                  <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                    <svg
                      className="w-6 h-6 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </button>
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Keamanan</h3>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg mb-4">
                  <span className="text-sm font-medium text-gray-700">Deteksi risiko jatuh:</span>
                  <span className="text-sm text-green-700 font-medium">Normal (demo)</span>
                </div>
                <Button
                  variant="secondary"
                  onClick={handleSimulateFallRisk}
                  className="w-full"
                >
                  Simulasikan Risiko Jatuh
                </Button>
              </Card>

              <Button variant="primary" onClick={handleCompleteSession} className="w-full">
                Selesai Sesi
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fall Risk Modal */}
      <Modal
        isOpen={showFallRiskModal}
        onClose={() => handleFallRiskResponse(true)}
        title="Apakah Anda baik-baik saja?"
        onConfirm={() => handleFallRiskResponse(true)}
        confirmText="Ya, Saya Baik"
        cancelText="Tidak"
      >
        <div className="space-y-3">
          <p>Kami mendeteksi potensi risiko jatuh. Apakah Anda memerlukan bantuan?</p>
          <Button
            variant="primary"
            onClick={() => handleFallRiskResponse(false)}
            className="w-full"
          >
            Tidak, Saya Perlu Bantuan
          </Button>
        </div>
      </Modal>

      {/* Emergency Modal */}
      <Modal
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        title="Menghubungi Fasilitas Kesehatan"
      >
        <div className="space-y-3">
          <p className="text-gray-700">
            Menghubungi fasilitas kesehatan terdekat...
          </p>
          <p className="text-sm text-gray-600">
            (Ini adalah simulasi. Dalam aplikasi nyata, ini akan menghubungi layanan darurat.)
          </p>
        </div>
      </Modal>
    </ProtectedPage>
  );
}
