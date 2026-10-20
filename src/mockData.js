// Rozszerzone dane demo – plany, treningi, nawodnienie, gabinet, trening ogólnorozwojowy

export { MOCK_EXERCISES_VIDEOS } from './exercisesDatabase';

export const toDateKey = (d) => d.toISOString().slice(0, 10);
export const addDays = (date, n) => { const r = new Date(date); r.setDate(r.getDate() + n); return r; };
const getToday = () => new Date();

// Ćwiczenia ogólnorozwojowe (kategoria dodana do bazy)
export const MOCK_EXERCISES_OGOLNOROZWOJOWE = [
  { id: 101, name: 'Przysiad do boxa', category: 'Trening ogólnorozwojowy', bodyPart: 'Nogi', difficulty: 'Łatwe', duration: '4 min', description: 'Bezpieczna wersja przysiadu z kontrolą głębokości.', instructions: '1. Ustaw box lub ławkę za sobą.\n2. Wykonuj przysiad do momentu kontaktu z boxem.\n3. Wstań kontrolowanie.' },
  { id: 102, name: 'Glute Bridge', category: 'Trening ogólnorozwojowy', bodyPart: 'Pośladki', difficulty: 'Łatwe', duration: '4 min', description: 'Wzmacnianie pośladków i tylnej taśmy.', instructions: '1. Leżenie na plecach, nogi ugięte.\n2. Unieś biodra do linii barki–kolana.\n3. Ściśnij pośladki u góry.' },
  { id: 103, name: 'Bird Dog', category: 'Trening ogólnorozwojowy', bodyPart: 'Core', difficulty: 'Średnie', duration: '5 min', videoUrl: '/videos/FBW/bird dog.mov', description: 'Stabilizacja core i koordynacja.', instructions: '1. Klęk podparty.\n2. Jednocześnie wyprostuj przeciwną rękę i nogę.\n3. Utrzymaj 2 s i zmień stronę.' },
  { id: 104, name: 'Plank na kolanach', category: 'Trening ogólnorozwojowy', bodyPart: 'Core', difficulty: 'Łatwe', duration: '3 min', videoUrl: '/videos/FBW/plank.mov', description: 'Deska w wersji ułatwionej.', instructions: '1. Podpór na przedramionach, kolana na macie.\n2. Utrzymaj napięty brzuch i prostą linię ciała.' },
  { id: 105, name: 'Side steps z gumą', category: 'Trening ogólnorozwojowy', bodyPart: 'Nogi', difficulty: 'Średnie', duration: '4 min', description: 'Wzmacnianie odwodzicieli biodra.', instructions: '1. Załóż gumę nad kolanami.\n2. W półprzysiadzie wykonuj kroki boczne.' },
  { id: 106, name: 'Wall Sit', category: 'Trening ogólnorozwojowy', bodyPart: 'Nogi', difficulty: 'Średnie', duration: '3 min', videoUrl: '/videos/konczyna-dolna/wall sit with swissball.mov', description: 'Izometryczne wzmacnianie nóg.', instructions: '1. Oprzyj plecy o ścianę.\n2. Zejdź do pozycji „siedzenia” z kątem 90° w kolanach.\n3. Utrzymaj pozycję.' },
  { id: 107, name: 'Dead Bug', category: 'Trening ogólnorozwojowy', bodyPart: 'Core', difficulty: 'Średnie', duration: '5 min', videoUrl: '/videos/FBW/deadbug.mov', description: 'Kontrola core w ruchu.', instructions: '1. Leżenie na plecach, ręce i nogi w górze.\n2. Opuszczaj naprzemiennie rękę i nogę.' },
  { id: 108, name: 'Spacer farmera z obciążeniem', category: 'Trening ogólnorozwojowy', bodyPart: 'Całe ciało', difficulty: 'Średnie', duration: '5 min', description: 'Chód z lekkim obciążeniem w dłoniach.', instructions: '1. Weź hantle lub kettlebells.\n2. Idź prosto z zachowaniem prostych pleców.' },
  { id: 109, name: 'Mobilizacja bioder', category: 'Trening ogólnorozwojowy', bodyPart: 'Biodro', difficulty: 'Łatwe', duration: '4 min', description: 'Zakres ruchu i rozluźnienie bioder.', instructions: '1. Klęk jednonóż, drugą nogę z przodu.\n2. Delikatnie pogłębiaj wykrok w przód.' },
  { id: 110, name: 'Ćwiczenia stabilizacji core', category: 'Trening ogólnorozwojowy', bodyPart: 'Core', difficulty: 'Średnie', duration: '5 min', description: 'Stabilizacja centralna.', instructions: '1. Pozycja podporu lub dead bug.\n2. Utrzymuj napięty brzuch przez cały czas.' },
];

// Gotowe programy treningów ogólnorozwojowych (np. Trening nóg, Zdrowy kręgosłup, Super pośladki)
export const MOCK_TRENINGI_OGOLNOROZWOJOWE = [
  { id: 'trening-nog', name: 'Trening nóg', description: 'Wzmacnianie nóg i bioder – przysiady, mostek, wall sit, stepy.', exerciseIds: [101, 102, 105, 106], duration: '~25 min' },
  { id: 'zdrowy-kregoslup', name: 'Zdrowy kręgosłup', description: 'Mobilizacja i stabilizacja odcinka lędźwiowego – cat-cow, bird dog, dead bug, McKenzie.', exerciseIds: [1, 2, 3, 9], duration: '~20 min' },
  { id: 'super-posladki', name: 'Super pośladki', description: 'Pośladki i tylna taśma – glute bridge, clamshell, stepy z gumą.', exerciseIds: [102, 4, 11, 105], duration: '~22 min' },
  { id: 'core-stabilizacja', name: 'Core – stabilizacja', description: 'Brzuch i core – plank, dead bug, bird dog.', exerciseIds: [104, 107, 103], duration: '~18 min' },
  { id: 'mobilnosc-bioder', name: 'Mobilność bioder', description: 'Zakres ruchu i rozluźnienie bioder – mobilizacja, rozciąganie zginaczy.', exerciseIds: [109, 7, 4], duration: '~15 min' },
];

// Zgłoszenia problematycznych ćwiczeń (pacjent → fizjoterapeuta)
export const MOCK_EXERCISE_ISSUES = [
  { id: 1, patientId: 101, exerciseId: 2, workoutId: 'w1-1', planId: 1, workoutName: 'Trening 1 – Mobilizacja', issueType: 'pain', issueNote: '', reportedAt: toDateKey(addDays(getToday(), -6)) },
  { id: 2, patientId: 101, exerciseId: 3, workoutId: 'w1-2', planId: 1, workoutName: 'Trening 2 – Core', issueType: 'difficult', issueNote: 'Trudno utrzymać pozycję.', reportedAt: toDateKey(addDays(getToday(), -5)) },
];

// Plany (okresowe: start, koniec, treningi przypisane do dni)
// status: 'active' | 'completed' | 'interrupted'; duplicatedFromPlanId – gdy plan powstał przez duplikację
export const MOCK_PLANS = [
  {
    id: 1,
    patientId: 101,
    name: 'Plan stabilizacji lędźwi',
    startDate: toDateKey(addDays(getToday(), -7)),
    durationWeeks: 3,
    workoutsPerWeek: 4,
    status: 'active',
    noteForPatient: 'Wykonuj treningi w dni bez bólu. Jeśli ból się nasila – przerwij i skontaktuj się ze mną.',
    waterGoalPortions: 8,
    planExercises: [{ exerciseId: 1, sets: 3, reps: 10 }, { exerciseId: 2, sets: 3, reps: 8 }, { exerciseId: 9, sets: 1, reps: 10 }],
    workouts: [
      { id: 'w1-1', dayIndex: 0, name: 'Trening 1 – Mobilizacja', exerciseIds: [1, 2, 9], isGeneralDevelopment: false },
      { id: 'w1-2', dayIndex: 1, name: 'Trening 2 – Core', exerciseIds: [3, 4, 11], isGeneralDevelopment: false },
      { id: 'w1-3', dayIndex: 2, name: 'Trening 3 – Ogólnorozwojowy', exerciseIds: [102, 104, 107], isGeneralDevelopment: true },
      { id: 'w1-4', dayIndex: 3, name: 'Trening 4 – Powtórka', exerciseIds: [1, 2, 3], isGeneralDevelopment: false },
      { id: 'w1-5', dayIndex: 7, name: 'Trening 5', exerciseIds: [2, 4, 9], isGeneralDevelopment: false },
      { id: 'w1-6', dayIndex: 8, name: 'Trening 6', exerciseIds: [102, 103, 107], isGeneralDevelopment: true },
      { id: 'w1-7', dayIndex: 9, name: 'Trening 7', exerciseIds: [1, 3, 11], isGeneralDevelopment: false },
      { id: 'w1-8', dayIndex: 10, name: 'Trening 8', exerciseIds: [2, 4, 9], isGeneralDevelopment: false },
      { id: 'w1-9', dayIndex: 14, name: 'Trening 9', exerciseIds: [1, 2, 3, 4], isGeneralDevelopment: false },
      { id: 'w1-10', dayIndex: 15, name: 'Trening 10', exerciseIds: [102, 104, 107], isGeneralDevelopment: true },
      { id: 'w1-11', dayIndex: 16, name: 'Trening 11', exerciseIds: [2, 9, 11], isGeneralDevelopment: false },
      { id: 'w1-12', dayIndex: 17, name: 'Trening 12', exerciseIds: [1, 2, 3, 4], isGeneralDevelopment: false },
    ],
  },
  {
    id: 2,
    patientId: 101,
    name: 'Stabilizacja lędźwi – 3 tygodnie',
    startDate: toDateKey(addDays(getToday(), -35)),
    durationWeeks: 3,
    workoutsPerWeek: 3,
    status: 'completed',
    duplicatedFromPlanId: null,
    noteForPatient: '',
    waterGoalPortions: 8,
    workouts: [
      { id: 'w0-1', dayIndex: 0, name: 'Trening 1', exerciseIds: [1, 2], isGeneralDevelopment: false },
      { id: 'w0-2', dayIndex: 2, name: 'Trening 2', exerciseIds: [3, 4], isGeneralDevelopment: false },
      { id: 'w0-3', dayIndex: 4, name: 'Trening 3', exerciseIds: [1, 2, 9], isGeneralDevelopment: false },
      { id: 'w0-4', dayIndex: 7, name: 'Trening 4', exerciseIds: [2, 4], isGeneralDevelopment: false },
      { id: 'w0-5', dayIndex: 9, name: 'Trening 5', exerciseIds: [1, 3], isGeneralDevelopment: false },
      { id: 'w0-6', dayIndex: 11, name: 'Trening 6', exerciseIds: [1, 2, 4], isGeneralDevelopment: false },
      { id: 'w0-7', dayIndex: 14, name: 'Trening 7', exerciseIds: [2, 9], isGeneralDevelopment: false },
      { id: 'w0-8', dayIndex: 16, name: 'Trening 8', exerciseIds: [1, 2, 3], isGeneralDevelopment: false },
      { id: 'w0-9', dayIndex: 18, name: 'Trening 9', exerciseIds: [1, 2, 4], isGeneralDevelopment: false },
    ],
  },
  {
    id: 3,
    patientId: 102,
    name: 'Powrót po ACL',
    startDate: toDateKey(addDays(getToday(), -14)),
    durationWeeks: 3,
    workoutsPerWeek: 3,
    status: 'active',
    noteForPatient: 'Kolano w szynie. Nie forsuj zgięcia – tylko do granicy bólu.',
    waterGoalPortions: 8,
    workouts: [
      { id: 'w2-1', dayIndex: 0, name: 'Trening 1', exerciseIds: [6], isGeneralDevelopment: false },
      { id: 'w2-2', dayIndex: 2, name: 'Trening 2', exerciseIds: [6, 8], isGeneralDevelopment: false },
      { id: 'w2-3', dayIndex: 4, name: 'Trening 3', exerciseIds: [6, 8], isGeneralDevelopment: false },
      { id: 'w2-4', dayIndex: 7, name: 'Trening 4', exerciseIds: [6, 8], isGeneralDevelopment: false },
      { id: 'w2-5', dayIndex: 9, name: 'Trening 5', exerciseIds: [6, 8, 104], isGeneralDevelopment: false },
      { id: 'w2-6', dayIndex: 11, name: 'Trening 6', exerciseIds: [6, 8], isGeneralDevelopment: false },
      { id: 'w2-7', dayIndex: 14, name: 'Trening 7', exerciseIds: [6, 8], isGeneralDevelopment: false },
      { id: 'w2-8', dayIndex: 16, name: 'Trening 8', exerciseIds: [6, 8], isGeneralDevelopment: false },
      { id: 'w2-9', dayIndex: 18, name: 'Trening 9', exerciseIds: [6, 8], isGeneralDevelopment: false },
    ],
  },
  {
    id: 4,
    patientId: 103,
    name: 'Mobilizacja barku',
    startDate: toDateKey(addDays(getToday(), -3)),
    durationWeeks: 2,
    workoutsPerWeek: 4,
    status: 'active',
    noteForPatient: 'Rób przerwy jeśli pojawi się ból przy unoszeniu ręki.',
    waterGoalPortions: 6,
    workouts: [
      { id: 'w3-1', dayIndex: 0, name: 'Trening 1', exerciseIds: [5, 10, 12], isGeneralDevelopment: false },
      { id: 'w3-2', dayIndex: 1, name: 'Trening 2', exerciseIds: [5, 12], isGeneralDevelopment: false },
      { id: 'w3-3', dayIndex: 3, name: 'Trening 3', exerciseIds: [5, 10, 12], isGeneralDevelopment: false },
      { id: 'w3-4', dayIndex: 4, name: 'Trening 4', exerciseIds: [5, 12], isGeneralDevelopment: false },
      { id: 'w3-5', dayIndex: 7, name: 'Trening 5', exerciseIds: [5, 10, 12], isGeneralDevelopment: false },
      { id: 'w3-6', dayIndex: 8, name: 'Trening 6', exerciseIds: [5, 12], isGeneralDevelopment: false },
    ],
  },
  {
    id: 5,
    patientId: 104,
    name: 'Rehabilitacja kostki',
    startDate: toDateKey(addDays(getToday(), -5)),
    durationWeeks: 2,
    workoutsPerWeek: 3,
    status: 'active',
    noteForPatient: 'Zaczynamy od propriocepcji. Nie skacz ani nie biegaj bez zgody.',
    waterGoalPortions: 6,
    workouts: [
      { id: 'w4-1', dayIndex: 0, name: 'Trening 1', exerciseIds: [8, 14], isGeneralDevelopment: false },
      { id: 'w4-2', dayIndex: 2, name: 'Trening 2', exerciseIds: [8, 14], isGeneralDevelopment: false },
      { id: 'w4-3', dayIndex: 4, name: 'Trening 3', exerciseIds: [8, 14], isGeneralDevelopment: false },
      { id: 'w4-4', dayIndex: 7, name: 'Trening 4', exerciseIds: [8, 14], isGeneralDevelopment: false },
      { id: 'w4-5', dayIndex: 9, name: 'Trening 5', exerciseIds: [8, 14], isGeneralDevelopment: false },
      { id: 'w4-6', dayIndex: 11, name: 'Trening 6', exerciseIds: [8, 14], isGeneralDevelopment: false },
    ],
  },
];

// Wykonania treningów (który workout, kiedy, które ćwiczenia odklikane, feedback)
export const MOCK_COMPLETIONS = [
  { workoutId: 'w1-1', patientId: 101, completedAt: toDateKey(addDays(getToday(), -7)), exerciseIdsCompleted: [1, 2, 9], feedback: { rating: 'ok', note: '' } },
  { workoutId: 'w1-2', patientId: 101, completedAt: toDateKey(addDays(getToday(), -6)), exerciseIdsCompleted: [3, 4, 11], feedback: { rating: 'hard', note: 'Ćwiczenie 3 było trudne.' } },
  { workoutId: 'w1-3', patientId: 101, completedAt: toDateKey(addDays(getToday(), -5)), exerciseIdsCompleted: [102, 104, 107], feedback: { rating: 'ok', note: '' } },
  { workoutId: 'w1-4', patientId: 101, completedAt: toDateKey(addDays(getToday(), -4)), exerciseIdsCompleted: [1, 2, 3], feedback: { rating: 'easy', note: '' } },
  { workoutId: 'w1-5', patientId: 101, completedAt: toDateKey(addDays(getToday(), -3)), exerciseIdsCompleted: [2, 4, 9], feedback: { rating: 'ok', note: '' } },
  { workoutId: 'w1-6', patientId: 101, completedAt: toDateKey(addDays(getToday(), -2)), exerciseIdsCompleted: [102, 103, 107], feedback: { rating: 'ok', note: '' } },
  { workoutId: 'w1-7', patientId: 101, completedAt: toDateKey(addDays(getToday(), -1)), exerciseIdsCompleted: [1, 3, 11], feedback: { rating: 'ok', note: 'Lekkie napięcie w barku.' } },
  { workoutId: 'w2-1', patientId: 102, completedAt: toDateKey(addDays(getToday(), -14)), exerciseIdsCompleted: [6], feedback: { rating: 'hard', note: '' } },
  { workoutId: 'w2-2', patientId: 102, completedAt: toDateKey(addDays(getToday(), -12)), exerciseIdsCompleted: [6, 8], feedback: { rating: 'ok', note: '' } },
  { workoutId: 'w2-3', patientId: 102, completedAt: toDateKey(addDays(getToday(), -10)), exerciseIdsCompleted: [6, 8], feedback: { rating: 'ok', note: '' } },
  { workoutId: 'w2-4', patientId: 102, completedAt: toDateKey(addDays(getToday(), -7)), exerciseIdsCompleted: [6, 8], feedback: { rating: 'ok', note: '' } },
  { workoutId: 'w2-5', patientId: 102, completedAt: toDateKey(addDays(getToday(), -5)), exerciseIdsCompleted: [6, 8, 104], feedback: { rating: 'hard', note: 'Plank bolesny przy kolanie.' } },
  { workoutId: 'w3-1', patientId: 103, completedAt: toDateKey(addDays(getToday(), -3)), exerciseIdsCompleted: [5, 10, 12], feedback: { rating: 'ok', note: '' } },
  { workoutId: 'w3-2', patientId: 103, completedAt: toDateKey(addDays(getToday(), -2)), exerciseIdsCompleted: [5, 12], feedback: { rating: 'ok', note: '' } },
  { workoutId: 'w4-1', patientId: 104, completedAt: toDateKey(addDays(getToday(), -5)), exerciseIdsCompleted: [8, 14], feedback: { rating: 'easy', note: '' } },
  { workoutId: 'w4-2', patientId: 104, completedAt: toDateKey(addDays(getToday(), -3)), exerciseIdsCompleted: [8, 14], feedback: { rating: 'ok', note: '' } },
];

// Nawodnienie dzienne (patientId, date, completedPortions)
export const MOCK_WATER = [
  { patientId: 101, date: toDateKey(getToday()), completedPortions: 5 },
  { patientId: 101, date: toDateKey(addDays(getToday(), -1)), completedPortions: 8 },
  { patientId: 101, date: toDateKey(addDays(getToday(), -2)), completedPortions: 6 },
  { patientId: 102, date: toDateKey(getToday()), completedPortions: 4 },
  { patientId: 103, date: toDateKey(getToday()), completedPortions: 3 },
  { patientId: 104, date: toDateKey(getToday()), completedPortions: 6 },
];

// Gabinety i fizjoterapeuci
export const MOCK_CLINICS = [
  { id: 1, name: 'Rehabilitacja Premium' },
];

export const MOCK_PHYSIOTHERAPISTS = [
  { id: 1, clinicId: 1, firstName: 'Piotr', lastName: 'Błędowski', email: 'piotr@rehab.pl', phone: '+48 600 111 222', specialization: 'Fizjoterapia ortopedyczna', note: 'Główny fizjoterapeuta.' },
  { id: 2, clinicId: 1, firstName: 'Katarzyna', lastName: 'Lewandowska', email: 'k.lewandowska@rehab.pl', phone: '+48 600 333 444', specialization: 'Rehabilitacja sportowa', note: '' },
];

// Link do Booksy (demo – jeden na gabinet/PT)
export const BOOKSY_URL = 'https://booksy.com/pl-pl/';

export function getPlanForPatient(patientId, plans = MOCK_PLANS) {
  const withStatus = plans.find(p => p.patientId === patientId && p.status === 'active');
  if (withStatus) return withStatus;
  return plans.find(p => p.patientId === patientId) || null;
}

export function getPlansForPatient(patientId, plans = MOCK_PLANS) {
  return plans.filter(p => p.patientId === patientId).sort((a, b) => (b.startDate || '').localeCompare(a.startDate || ''));
}

export function getCompletionRateForPlan(plan, patientId, completions = MOCK_COMPLETIONS) {
  if (!plan || !plan.workouts) return 0;
  const total = plan.workouts.length;
  const done = completions.filter(c => c.patientId === patientId && plan.workouts.some(w => w.id === c.workoutId)).length;
  return total ? Math.round((done / total) * 100) : 0;
}

export function getConsecutiveActiveDays(patientId, completions = MOCK_COMPLETIONS) {
  const dates = [...new Set(completions.filter(c => c.patientId === patientId).map(c => c.completedAt))].sort().reverse();
  if (dates.length === 0) return 0;
  const today = toDateKey(getToday());
  if (dates[0] !== today && dates[0] !== toDateKey(addDays(new Date(), -1))) return 0;
  let streak = 0;
  let d = new Date(today + 'T12:00:00');
  for (;;) {
    const key = toDateKey(d);
    if (dates.includes(key)) streak++; else break;
    d = addDays(d, -1);
  }
  return streak;
}

export function getLastWorkoutAt(patientId, completions = MOCK_COMPLETIONS) {
  const last = completions.filter(c => c.patientId === patientId).sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''))[0];
  return last ? last.completedAt : null;
}

export function getActivityStatusLabel(patientId, plans, completions) {
  const plan = getPlanForPatient(patientId, plans);
  const lastAt = getLastWorkoutAt(patientId, completions);
  const streak = getConsecutiveActiveDays(patientId, completions);
  if (!plan) return lastAt ? 'Ostatnia aktywność' : 'Brak planu';
  const total = plan.workouts?.length || 0;
  const done = completions.filter(c => c.patientId === patientId && plan.workouts?.some(w => w.id === c.workoutId)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const end = addDays(new Date(plan.startDate), plan.durationWeeks * 7);
  if (getToday() > end) return 'Plan zakończony';
  if (lastAt) {
    const daysSince = Math.floor((new Date() - new Date(lastAt + 'T12:00:00')) / (1000 * 60 * 60 * 24));
    if (daysSince > 5) return 'Brak treningu od kilku dni';
    if (streak >= 3 && pct >= 70) return 'Ćwiczy regularnie';
    if (pct >= 50) return 'Dobra ciągłość planu';
    if (daysSince >= 2) return 'Spadek aktywności';
  }
  return 'Wymaga nowego planu';
}

export function getWorkoutsForPlan(plan) {
  if (!plan) return [];
  const start = new Date(plan.startDate + 'T12:00:00');
  return plan.workouts.map(w => ({
    ...w,
    date: w.date || toDateKey(addDays(start, w.dayIndex)),
  }));
}

export function getTodayWorkoutForPatient(patientId, plans = MOCK_PLANS) {
  const plan = getPlanForPatient(patientId, plans);
  if (!plan) return null;
  const todayKey = toDateKey(getToday());
  const workoutsWithDates = getWorkoutsForPlan(plan);
  return workoutsWithDates.find(w => w.date === todayKey) || null;
}

export function getWaterForPatientToday(patientId, waterLogs = MOCK_WATER) {
  const todayKey = toDateKey(getToday());
  const entry = waterLogs.find(w => w.patientId === patientId && w.date === todayKey);
  return entry ? entry.completedPortions : 0;
}

export function getCompletionForWorkout(workoutId, patientId, completions = MOCK_COMPLETIONS) {
  return completions.find(c => c.workoutId === workoutId && c.patientId === patientId) || null;
}

export function isPlanEnded(plan) {
  const end = addDays(new Date(plan.startDate), plan.durationWeeks * 7);
  return getToday() >= end;
}

export function daysLeftInPlan(plan) {
  const end = addDays(new Date(plan.startDate), plan.durationWeeks * 7);
  const diff = Math.ceil((end - getToday()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}
