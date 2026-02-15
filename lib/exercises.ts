export interface Exercise {
  id: string;
  name: string;
  goal: string;
  target: string;
  instructions: string[];
  safetyTips: string[];
  commonMistakes: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  targetReps: number;
  targetSets: number;
}

export const exercises: Exercise[] = [
  {
    id: "shoulder-raise-90",
    name: "Shoulder Raise 90°",
    goal: "Meningkatkan kekuatan dan rentang gerak bahu",
    target: "Otot deltoid anterior dan medial",
    instructions: [
      "Duduk atau berdiri dengan posisi tegak",
      "Angkat lengan yang terpengaruh ke samping hingga membentuk sudut 90°",
      "Tahan posisi selama 3-5 detik",
      "Turunkan lengan secara perlahan",
      "Ulangi sesuai target repetisi"
    ],
    safetyTips: [
      "Hindari mengangkat terlalu tinggi jika terasa nyeri",
      "Gunakan dukungan jika diperlukan",
      "Lakukan gerakan secara perlahan dan terkontrol"
    ],
    commonMistakes: [
      "Mengangkat terlalu cepat",
      "Menggunakan momentum tubuh",
      "Tidak mempertahankan postur tegak"
    ],
    difficulty: "Medium",
    targetReps: 10,
    targetSets: 3
  },
  {
    id: "seated-marching",
    name: "Seated Marching",
    goal: "Meningkatkan kekuatan otot paha dan koordinasi",
    target: "Otot quadriceps dan hip flexors",
    instructions: [
      "Duduk di kursi dengan punggung tegak",
      "Angkat lutut kanan setinggi mungkin",
      "Turunkan dan angkat lutut kiri",
      "Lakukan gerakan bergantian seperti berjalan di tempat",
      "Pertahankan ritme yang stabil"
    ],
    safetyTips: [
      "Pastikan kursi stabil dan tidak mudah bergeser",
      "Jangan memaksakan ketinggian jika terasa tidak nyaman",
      "Gunakan sandaran kursi untuk keseimbangan"
    ],
    commonMistakes: [
      "Mengangkat terlalu cepat tanpa kontrol",
      "Membungkuk ke depan",
      "Tidak mengangkat lutut cukup tinggi"
    ],
    difficulty: "Easy",
    targetReps: 15,
    targetSets: 2
  },
  {
    id: "sit-to-stand",
    name: "Sit-to-Stand (Assisted)",
    goal: "Meningkatkan kekuatan otot tungkai dan keseimbangan",
    target: "Otot quadriceps, glutes, dan core",
    instructions: [
      "Duduk di tepi kursi dengan kaki menapak di lantai",
      "Condongkan tubuh sedikit ke depan",
      "Berdiri dengan menggunakan kekuatan kaki",
      "Tahan posisi berdiri selama 2-3 detik",
      "Duduk kembali secara perlahan dan terkontrol"
    ],
    safetyTips: [
      "Gunakan kursi dengan sandaran yang stabil",
      "Letakkan tangan di sandaran kursi jika diperlukan",
      "Lakukan di area yang aman tanpa rintangan"
    ],
    commonMistakes: [
      "Menggunakan momentum untuk berdiri",
      "Tidak mencondongkan tubuh ke depan",
      "Berdiri terlalu cepat tanpa kontrol"
    ],
    difficulty: "Hard",
    targetReps: 8,
    targetSets: 3
  },
  {
    id: "heel-raises",
    name: "Heel Raises (Standing Support)",
    goal: "Meningkatkan kekuatan otot betis dan keseimbangan",
    target: "Otot gastrocnemius dan soleus",
    instructions: [
      "Berdiri dengan memegang sandaran kursi atau dinding",
      "Angkat tumit dari lantai hingga berdiri di ujung jari kaki",
      "Tahan posisi selama 2-3 detik",
      "Turunkan tumit kembali ke lantai",
      "Ulangi sesuai target repetisi"
    ],
    safetyTips: [
      "Pastikan memiliki dukungan yang stabil",
      "Lakukan di area yang aman",
      "Hentikan jika terasa pusing atau tidak seimbang"
    ],
    commonMistakes: [
      "Tidak mengangkat cukup tinggi",
      "Melakukan terlalu cepat",
      "Tidak mempertahankan keseimbangan"
    ],
    difficulty: "Medium",
    targetReps: 12,
    targetSets: 2
  },
  {
    id: "wrist-extension-flexion",
    name: "Wrist Extension & Flexion",
    goal: "Meningkatkan fleksibilitas dan kekuatan pergelangan tangan",
    target: "Otot flexor dan extensor pergelangan tangan",
    instructions: [
      "Duduk dengan lengan terpengaruh di atas meja",
      "Tekuk pergelangan tangan ke atas (extension) sejauh mungkin",
      "Tahan selama 3 detik",
      "Tekuk pergelangan tangan ke bawah (flexion) sejauh mungkin",
      "Tahan selama 3 detik",
      "Kembali ke posisi netral"
    ],
    safetyTips: [
      "Lakukan gerakan secara perlahan",
      "Hentikan jika terasa nyeri tajam",
      "Jangan memaksakan rentang gerak"
    ],
    commonMistakes: [
      "Menggerakkan lengan atas, bukan hanya pergelangan tangan",
      "Melakukan terlalu cepat",
      "Tidak mempertahankan posisi saat menahan"
    ],
    difficulty: "Easy",
    targetReps: 10,
    targetSets: 3
  },
  {
    id: "lateral-weight-shift",
    name: "Lateral Weight Shift",
    goal: "Meningkatkan keseimbangan dan kontrol berat badan",
    target: "Otot core dan stabilisasi pinggul",
    instructions: [
      "Berdiri dengan kaki selebar bahu, memegang sandaran kursi",
      "Pindahkan berat badan ke kaki kanan",
      "Angkat kaki kiri sedikit dari lantai",
      "Tahan selama 3-5 detik",
      "Kembali ke posisi netral",
      "Ulangi ke sisi kiri"
    ],
    safetyTips: [
      "Selalu gunakan dukungan yang stabil",
      "Mulai dengan perpindahan kecil",
      "Hentikan jika kehilangan keseimbangan"
    ],
    commonMistakes: [
      "Memindahkan berat badan terlalu jauh",
      "Tidak mempertahankan postur tegak",
      "Mengangkat kaki terlalu tinggi"
    ],
    difficulty: "Medium",
    targetReps: 8,
    targetSets: 2
  }
];

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(ex => ex.id === id);
}
