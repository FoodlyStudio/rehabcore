import React, { useState, useEffect } from 'react';
import { 
  Home, Users, PlaySquare, User, Search, Plus, ChevronRight, 
  ArrowLeft, CheckCircle2, Play, Activity, Info, 
  LogOut, Filter, Settings, Stethoscope, Video,
  Check, Loader2, Bell, HeartPulse, Calendar, TrendingUp, Droplets, GlassWater,
  Building2, ClipboardList
} from 'lucide-react';
import {
  MOCK_EXERCISES_OGOLNOROZWOJOWE,
  MOCK_EXERCISES_VIDEOS,
  MOCK_TRENINGI_OGOLNOROZWOJOWE,
  MOCK_PLANS,
  MOCK_COMPLETIONS,
  MOCK_EXERCISE_ISSUES,
  MOCK_WATER,
  MOCK_CLINICS,
  MOCK_PHYSIOTHERAPISTS,
  BOOKSY_URL,
  toDateKey as toDateKeyUtil,
  addDays,
  getPlanForPatient,
  getPlansForPatient,
  getWorkoutsForPlan,
  getTodayWorkoutForPatient,
  getWaterForPatientToday,
  getCompletionForWorkout,
  getCompletionRateForPlan,
  getConsecutiveActiveDays,
  getLastWorkoutAt,
  getActivityStatusLabel,
  isPlanEnded,
  daysLeftInPlan,
} from './mockData';

// --- BAZA DANYCH (MOCK DATA) ---

const MOCK_EXERCISES_BASE = [
  { id: 1, name: 'Cat-Cow (Koci Grzbiet)', category: 'Mobilizacja', bodyPart: 'Kręgosłup lędźwiowy', difficulty: 'Łatwe', duration: '3 min', videoUrl: '/videos/klatka-piersiowa/Cat-Cow Stretch.mov', description: 'Klasyczne ćwiczenie mobilizujące cały kręgosłup. Poprawia elastyczność i zmniejsza napięcie w dolnym odcinku.', instructions: '1. Przyjmij pozycję klęku podpartego.\n2. Z wdechem wygnij kręgosłup w dół, unosząc głowę (krowa).\n3. Z wydechem zaokrąglij plecy, chowając głowę między ramiona (kot).\n4. Wykonuj ruchy płynnie w rytm oddechu.' },
  { id: 2, name: 'Bird Dog', category: 'Stabilizacja', bodyPart: 'Kręgosłup lędźwiowy', difficulty: 'Średnie', duration: '5 min', videoUrl: '/videos/FBW/bird dog.mov', description: 'Ćwiczenie wzmacniające mięśnie głębokie tułowia (core), poprawiające stabilność kręgosłupa i koordynację.', instructions: '1. Klęk podparty, plecy proste.\n2. Jednocześnie unieś i wyprostuj prawą rękę i lewą nogę.\n3. Utrzymaj pozycję przez 2 sekundy, nie wyginając lędźwi.\n4. Wróć do pozycji wyjściowej i zmień stronę.' },
  { id: 3, name: 'Dead Bug (Martwy Robak)', category: 'Wzmacnianie', bodyPart: 'Kręgosłup lędźwiowy', difficulty: 'Średnie', duration: '5 min', videoUrl: '/videos/FBW/deadbug.mov', description: 'Bezpieczne i niezwykle skuteczne ćwiczenie na mięśnie brzucha, uczące kontroli miednicy.', instructions: '1. Leżenie na plecach, ręce pionowo w górze, nogi zgięte w biodrach i kolanach pod kątem 90 stopni.\n2. Dociśnij odcinek lędźwiowy do maty.\n3. Powoli opuszczaj prawą rękę za głowę i prostuj lewą nogę tuż nad ziemię.\n4. Wróć i zmień stronę.' },
  { id: 4, name: 'Most biodrowy (Glute Bridge)', category: 'Wzmacnianie', bodyPart: 'Biodro', difficulty: 'Łatwe', duration: '4 min', videoUrl: '/videos/konczyna-dolna/glutebridge.mov', description: 'Wzmacnia mięśnie pośladkowe i tył uda, odciążając odcinek lędźwiowy.', instructions: '1. Leżenie na plecach, nogi ugięte, stopy na szerokość bioder.\n2. Zepnij pośladki i unieś biodra do góry, tworząc linię prostą od kolan po barki.\n3. Przytrzymaj 2 sekundy u góry.\n4. Powoli opuść.' },
  { id: 5, name: 'Mobilizacja barku przy ścianie', category: 'Mobilizacja', bodyPart: 'Bark', difficulty: 'Łatwe', duration: '3 min', description: 'Zwiększa zakres ruchu w stawie ramiennym, idealne przy sztywności i po urazach.', instructions: '1. Stań bokiem do ściany.\n2. Połóż dłoń na ścianie na wysokości barku.\n3. Powoli przesuwaj palce w górę ściany, podchodząc bliżej, aż poczujesz rozciąganie.\n4. Przytrzymaj i powoli wróć.' },
  { id: 6, name: 'Ślizg pięty (Heel Slide)', category: 'Mobilizacja', bodyPart: 'Kolano', difficulty: 'Bardzo łatwe', duration: '4 min', description: 'Podstawowe ćwiczenie po urazach i operacjach kolana (np. ACL) przywracające zgięcie.', instructions: '1. Leżenie na plecach, nogi proste.\n2. Powoli zginaj jedno kolano, przesuwając piętę po macie w stronę pośladka.\n3. Zegnij do granicy bólu.\n4. Powoli wyprostuj nogę.' },
  { id: 7, name: 'Rozciąganie zginaczy biodra', category: 'Rozciąganie', bodyPart: 'Biodro', difficulty: 'Średnie', duration: '3 min', videoUrl: '/videos/konczyna-dolna/hip flexor stretch.mov', description: 'Niweluje przykurcze po długotrwałym siedzeniu, pomaga przy bólach dolnego odcinka pleców.', instructions: '1. Pozycja klęku jednonóż (wykrok).\n2. Podwiń miednicę (napnij pośladek nogi z tyłu).\n3. Delikatnie przenieś ciężar ciała do przodu, nie wyginając lędźwi.\n4. Utrzymaj pozycję 30 sekund.' },
  { id: 8, name: 'Równowaga na jednej nodze', category: 'Stabilizacja', bodyPart: 'Staw skokowy', difficulty: 'Średnie', duration: '5 min', description: 'Poprawia propriocepcję i stabilność stawu skokowego po skręceniach.', instructions: '1. Stań prosto blisko ściany lub krzesła (do asekuracji).\n2. Unieś jedną nogę.\n3. Utrzymaj równowagę przez 30-60 sekund.\n4. Dla utrudnienia: zamknij oczy.' },
  { id: 9, name: 'McKenzie Extension', category: 'Mobilizacja', bodyPart: 'Kręgosłup lędźwiowy', difficulty: 'Łatwe', duration: '3 min', description: 'Centralizacja bólu dyskowego. Wykonywać tylko z zalecenia fizjoterapeuty.', instructions: '1. Połóż się na brzuchu.\n2. Oprzyj się na przedramionach.\n3. Jeśli to bezbolesne, wyprostuj łokcie, unosząc klatkę piersiową w górę.\n4. Miednica zostaje na macie. Przytrzymaj 2 sekundy i opuść.' },
  { id: 10, name: 'Retrakcja łopatek', category: 'Stabilizacja', bodyPart: 'Kręgosłup piersiowy', difficulty: 'Łatwe', duration: '3 min', description: 'Koryguje postawę (zaokrąglone plecy) i zmniejsza napięcie w karku.', instructions: '1. Pozycja siedząca lub stojąca, plecy proste.\n2. Ściągnij łopatki do siebie i lekko w dół.\n3. Utrzymaj napięcie przez 3-5 sekund.\n4. Rozluźnij.' },
  { id: 11, name: 'Clamshell (Muszla)', category: 'Wzmacnianie', bodyPart: 'Biodro', difficulty: 'Średnie', duration: '4 min', videoUrl: '/videos/konczyna-dolna/banded clamshell.mov', description: 'Wzmacnia mięsień pośladkowy średni, kluczowy dla stabilizacji miednicy i kolana.', instructions: '1. Leżenie na boku, kolana zgięte pod kątem 90 stopni, stopy złączone.\n2. Unieś górne kolano jak najwyżej, nie odrywając stóp od siebie i nie cofając miednicy.\n3. Powoli opuść kolano.' },
  { id: 12, name: 'Wall Slides (Ślizgi po ścianie)', category: 'Mobilizacja', bodyPart: 'Bark', difficulty: 'Średnie', duration: '5 min', videoUrl: '/videos/konczyna-gorna-barki/Wall Slides.mov', description: 'Świetne ćwiczenie na mobilność obręczy barkowej i aktywację dolnego czworobocznego.', instructions: '1. Stań plecami do ściany, pięty, pośladki, plecy i głowa dotykają ściany.\n2. Ręce ugięte w łokciach (kąt 90st) przylegają do ściany.\n3. Powoli unoś ramiona w górę, ślizgając się po ścianie.\n4. Wróć powoli w dół.' },
  { id: 13, name: 'Izometria szyi (Przód/Tył)', category: 'Stabilizacja', bodyPart: 'Szyja', difficulty: 'Łatwe', duration: '3 min', videoUrl: '/videos/plecy-C/Isometric Neck Flexion Press.mov', description: 'Wzmacnia mięśnie szyi bez ruchu w stawie, bezpieczne po urazach typu whiplash.', instructions: '1. Usiądź prosto.\n2. Przyłóż dłoń do czoła i delikatnie naciskaj głową na dłoń, stawiając opór.\n3. Utrzymaj 5 sekund.\n4. Powtórz to samo z dłonią z tyłu głowy.' },
  { id: 14, name: 'Rozciąganie łydki przy ścianie', category: 'Rozciąganie', bodyPart: 'Staw skokowy', difficulty: 'Łatwe', duration: '4 min', description: 'Klasyczne rozciąganie mięśnia brzuchatego łydki. Pomaga przy zapaleniu ścięgna Achillesa.', instructions: '1. Stań przodem do ściany, oprzyj dłonie.\n2. Jedna noga z tyłu, prosta w kolanie, pięta wciśnięta w podłogę.\n3. Przesuń biodra do przodu, aż poczujesz rozciąganie w tylnej nodze.\n4. Utrzymaj 30 sekund.' },
  { id: 15, name: 'Rotacja tułowia w leżeniu', category: 'Mobilizacja', bodyPart: 'Kręgosłup piersiowy', difficulty: 'Łatwe', duration: '4 min', videoUrl: '/videos/plecy-TH/Side-Lying Thoracic Rotation.mov', description: 'Poprawia rotację w odcinku piersiowym, otwiera klatkę piersiową.', instructions: '1. Leżenie na boku, ręce wyciągnięte przed siebie, złączone.\n2. Górną rękę przenieś górą za siebie, starając się położyć łopatkę na macie.\n3. Wzrok podąża za dłonią.\n4. Wróć do pozycji wyjściowej.' }
];

const MOCK_EXERCISES = [...MOCK_EXERCISES_BASE, ...MOCK_EXERCISES_OGOLNOROZWOJOWE, ...MOCK_EXERCISES_VIDEOS];

const INITIAL_PATIENTS = [
  { id: 101, firstName: 'Anna', lastName: 'Kowalska', email: 'anna@example.com', phone: '+48 123 456 789', condition: 'Ból odcinka lędźwiowego', bodyPart: 'Lędźwia', notes: 'Ból promieniujący do pośladka. Siedzący tryb pracy.', status: 'Aktywny plan', assignedExercises: [{ exerciseId: 1, sets: 3, reps: 10, frequency: 'Codziennie' }, { exerciseId: 2, sets: 3, reps: 8, frequency: 'Co 2 dni' }, { exerciseId: 9, sets: 1, reps: 10, frequency: 'Rano i wieczorem' }] },
  { id: 102, firstName: 'Michał', lastName: 'Nowak', email: 'michal@example.com', phone: '+48 987 654 321', condition: 'Rehabilitacja kolana po ACL', bodyPart: 'Prawe kolano', notes: '4 tydzień po zabiegu. Brak pełnego wyprostu.', status: 'Wymaga uwagi', assignedExercises: [{ exerciseId: 6, sets: 3, reps: 15, frequency: '3x dziennie' }] },
  { id: 103, firstName: 'Karolina', lastName: 'Wiśniewska', email: 'karolina@example.com', phone: '+48 555 444 333', condition: 'Ból barku', bodyPart: 'Lewy bark', notes: 'Ból przy unoszeniu ręki powyżej 90 stopni.', status: 'Aktywny plan', assignedExercises: [{ exerciseId: 5, sets: 3, reps: 10, frequency: 'Codziennie' }, { exerciseId: 10, sets: 3, reps: 12, frequency: 'Codziennie' }] },
  { id: 104, firstName: 'Tomasz', lastName: 'Zieliński', email: 'tomasz@example.com', phone: '+48 111 222 333', condition: 'Skręcenie stawu skokowego', bodyPart: 'Prawa kostka', notes: 'Zejście obrzęku. Zaczynamy propriocepcję.', status: 'Nowy', assignedExercises: [] },
  { id: 105, firstName: 'Magdalena', lastName: 'Dąbrowska', email: 'magda@example.com', phone: '+48 222 333 444', condition: 'Wypuklina C5/C6', bodyPart: 'Szyja', notes: 'Drętwienie palców prawej dłoni.', status: 'Aktywny plan', assignedExercises: [{ exerciseId: 13, sets: 3, reps: 5, frequency: 'Codziennie' }] },
];

// --- KOMPONENTY UI ---

const Button = ({ children, onClick, variant = 'primary', className = '', icon: Icon, disabled = false, loading = false }) => {
  const baseStyle = "w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-medium transition-all duration-300 active:scale-[0.98]";
  const variants = {
    primary: "bg-emerald-700 text-white hover:bg-emerald-800 shadow-[0_8px_16px_rgb(4,120,87,0.2)]",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    outline: "border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 bg-white",
    ghost: "text-emerald-700 hover:bg-emerald-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
  };
  
  return (
    <button onClick={onClick} disabled={disabled || loading} className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed active:scale-100' : ''} ${className}`}>
      {loading ? <Loader2 className="animate-spin" size={18} /> : (Icon && <Icon size={18} />)}
      {children}
    </button>
  );
};

const Card = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-4 ${onClick ? 'cursor-pointer hover:shadow-[0_8px_20px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300' : ''} ${className}`}>
    {children}
  </div>
);

const Badge = ({ text, type = 'default' }) => {
  const types = {
    default: 'bg-slate-100 text-slate-600',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-600 border border-amber-100',
    info: 'bg-emerald-50 text-emerald-700 border border-emerald-100'
  };
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${types[type]}`}>{text}</span>;
}

const Avatar = ({ firstName = '', lastName = '', size = 'md', imgUrl = null }) => {
  const initials = firstName && lastName ? `${firstName[0]}${lastName[0]}` : 'U';
  const sizes = { sm: 'w-10 h-10 text-sm', md: 'w-12 h-12 text-base', lg: 'w-24 h-24 text-2xl' };
  
  if (imgUrl) return <img src={imgUrl} alt="Avatar" className={`${sizes[size]} rounded-full object-cover border-2 border-white shadow-sm`} />;
  
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 font-bold flex items-center justify-center border border-white shadow-sm shrink-0`}>
      {initials}
    </div>
  );
};

const VideoPlaceholder = ({ duration }) => (
  <div className="w-full aspect-video bg-slate-100 rounded-2xl relative overflow-hidden group shadow-sm border border-slate-200/50">
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-slate-900/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/20">
      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_8px_20px_rgb(0,0,0,0.15)] transform group-hover:scale-110 transition-transform duration-300">
        <Play className="text-emerald-700 ml-1.5" size={28} fill="currentColor" />
      </div>
    </div>
    <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-semibold tracking-wide">
      {duration}
    </div>
  </div>
);

const encodeVideoUrl = (url) => {
  if (!url) return '';
  return '/' + url.slice(1).split('/').map(encodeURIComponent).join('/');
};

const ExerciseVideo = ({ videoUrl, duration }) => {
  if (!videoUrl) return <VideoPlaceholder duration={duration} />;
  return (
    <div className="w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-sm">
      <video
        src={encodeVideoUrl(videoUrl)}
        controls
        playsInline
        preload="metadata"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

const Input = ({ label, type = 'text', placeholder, value, onChange, textarea }) => (
  <div className="space-y-1.5 w-full">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">{label}</label>
    {textarea ? (
      <textarea rows="4" value={value} onChange={onChange} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all resize-none" placeholder={placeholder} />
    ) : (
      <input type={type} value={value} onChange={onChange} className="w-full bg-slate-50/50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all" placeholder={placeholder} />
    )}
  </div>
);

const Header = ({ title, onBack, rightElement }) => (
  <div className="bg-white/80 backdrop-blur-md px-5 py-4 sticky top-0 z-30 flex items-center justify-between border-b border-slate-100 pt-8">
    <div className="flex items-center gap-3">
      {onBack && (
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors">
          <ArrowLeft size={22} />
        </button>
      )}
      <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
    </div>
    {rightElement && <div>{rightElement}</div>}
  </div>
);

const LoadingSpinner = () => (
  <div className="flex-1 flex flex-col items-center justify-center space-y-4">
    <Loader2 className="w-10 h-10 text-emerald-700 animate-spin" />
    <p className="text-slate-500 text-sm font-medium animate-pulse">Wczytywanie danych...</p>
  </div>
);

// --- GŁÓWNA APLIKACJA ---

const todayKey = () => new Date().toISOString().slice(0, 10);


// Inicjalizacja planów z datami względem "dziś", żeby pacjent demo (101) zawsze miał dzisiejszy trening
function getInitialPlans() {
  const today = new Date();
  const offsets = [7, 35, 14, 3, 5]; // dni wstecz dla planów (indeks 1 = historia pacjenta 101)
  return MOCK_PLANS.map((plan, i) => ({
    ...plan,
    startDate: toDateKeyUtil(addDays(today, -(offsets[i] ?? 7))),
  }));
}

// Nawodnienie z wpisem na dziś dla pacjenta 101 (demo), żeby od razu widać widget wody
function getInitialWater() {
  const today = todayKey();
  const rest = MOCK_WATER.filter(w => !(w.patientId === 101 && w.date === today));
  return [...rest, { patientId: 101, date: today, completedPortions: 5 }];
}

export default function App() {
  const [role, setRole] = useState(null); // 'pt' | 'patient' | 'clinic'
  const [screen, setScreen] = useState('landing'); 
  const [activeTab, setActiveTab] = useState('home');
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [plans, setPlans] = useState(getInitialPlans);
  const [completions, setCompletions] = useState(MOCK_COMPLETIONS);
  const [exerciseIssues, setExerciseIssues] = useState(MOCK_EXERCISE_ISSUES);
  const [waterLogs, setWaterLogs] = useState(getInitialWater);
  const [physiotherapists, setPhysiotherapists] = useState(MOCK_PHYSIOTHERAPISTS);
  const [clinics] = useState(MOCK_CLINICS);
  
  // Stany szczegółowe
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPTId, setSelectedPTId] = useState(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Wszystkie');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Sesja treningowa (aktualny workout, indeks ćwiczenia, które odklikane)
  const [sessionState, setSessionState] = useState({ workout: null, plan: null, currentIndex: 0, completedExerciseIds: [] });
  const [feedbackState, setFeedbackState] = useState({ rating: null, note: '' });
  const [calendarSelectedDate, setCalendarSelectedDate] = useState(null);

  // Stan formularzy
  const [newPatient, setNewPatient] = useState({ firstName: '', lastName: '', email: '', phone: '', condition: '', bodyPart: '', notes: '' });
  
  // Stan przypisywania
  const [assignFlowData, setAssignFlowData] = useState({ patientId: null, exercises: [], sets: 3, reps: 10, frequency: 'Codziennie' });

  // Tworzenie planu (PT)
  const [createPlanData, setCreatePlanData] = useState({ patientId: null, name: '', durationWeeks: 3, trainDays: [1, 3, 5], noteForPatient: '', waterGoalPortions: 8, planExercises: [] });
  const [newPT, setNewPT] = useState({ firstName: '', lastName: '', email: '', phone: '', specialization: '', note: '' });
  const [selectedGeneralProgramId, setSelectedGeneralProgramId] = useState(null);
  const [issueModal, setIssueModal] = useState({ open: false, exerciseId: null, exerciseName: '' });
  const [issueNote, setIssueNote] = useState('');
  const [selectedPlanHistoryId, setSelectedPlanHistoryId] = useState(null);
  const [duplicatePlanSourceId, setDuplicatePlanSourceId] = useState(null);

  // Stan kroku onboardingu
  const [onboardingStep, setOnboardingStep] = useState(0);

  // Aktualny użytkownik (symulacja)
  const currentPatient = role === 'patient' ? patients[0] : null; 
  const selectedPatient = patients.find(p => p.id === selectedPatientId);
  const selectedExercise = MOCK_EXERCISES.find(e => e.id === selectedExerciseId);

  // Pomocnicze: plan i dzisiejszy trening dla pacjenta
  const currentPlan = currentPatient ? getPlanForPatient(currentPatient.id, plans) : null;
  const todayWorkout = currentPatient ? getTodayWorkoutForPatient(currentPatient.id, plans) : null;
  const waterToday = currentPatient ? (waterLogs.find(w => w.patientId === currentPatient.id && w.date === todayKey())?.completedPortions ?? 0) : 0;
  const waterGoal = currentPlan?.waterGoalPortions ?? 8;
  const planEnded = currentPlan ? isPlanEnded(currentPlan) : false;
  const planDaysLeft = currentPlan ? daysLeftInPlan(currentPlan) : 0;

  useEffect(() => {
    if (screen === 'splash') {
      const t = setTimeout(() => setScreen('onboarding'), 2000);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const navigate = (newScreen, tab = null) => {
    setScreen(newScreen);
    if (tab) setActiveTab(tab);
    window.scrollTo(0, 0);
  };

  const simulateLoading = (callback, ms = 800) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      callback();
    }, ms);
  };

  const showSuccess = (msg, callback) => {
    setSuccessMsg(msg);
    navigate('success');
    setTimeout(() => {
      setSuccessMsg('');
      callback();
    }, 2500);
  };

  // --- WIDOKI LOGOWANIA I ONBOARDINGU ---

  const renderLanding = () => (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-emerald-50 to-white">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 mb-6">
          <HeartPulse className="text-white" size={40} strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">RehaPlaner</h1>
        <p className="text-slate-600 mt-3 text-sm max-w-[280px] leading-relaxed">
          System prowadzenia pacjentów przez fizjoterapeutów. Plany treningowe, baza ćwiczeń i monitoring postępów.
        </p>
        <Button onClick={() => setScreen('splash')} className="mt-8 w-full max-w-[280px]">
          Wejdź do aplikacji demo
        </Button>
      </div>
    </div>
  );

  const renderSplash = () => (
    <div className="flex flex-col h-full bg-emerald-700 justify-center items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
      <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-900/50 mb-6 relative z-10 animate-pulse">
        <HeartPulse className="text-emerald-700" size={48} strokeWidth={2.5} />
      </div>
      <h1 className="text-4xl font-extrabold text-white tracking-tight relative z-10">RehaPlaner</h1>
      <p className="text-emerald-100 mt-2 font-medium tracking-wide relative z-10 opacity-80">Twój ruch. Twoje zdrowie.</p>
    </div>
  );

  const renderOnboarding = () => {
    const steps = [
      { title: "Baza wiedzy premium", desc: "Setki dopracowanych ćwiczeń wideo z dokładnymi instrukcjami w jednym miejscu.", icon: Video },
      { title: "Zarządzanie pacjentami", desc: "Twórz dedykowane plany rehabilitacyjne w kilka sekund i śledź postępy.", icon: Users },
      { title: "Dla fizjoterapeuty i pacjenta", desc: "Jeden system, który łączy ekspercką wiedzę z wygodą domowych ćwiczeń.", icon: Activity }
    ];

    const CurrentIcon = steps[onboardingStep].icon;

    return (
      <div className="flex flex-col h-full bg-white relative">
        <div className="flex-1 flex flex-col justify-center items-center p-8 text-center pt-20">
          <div className="w-32 h-32 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mb-10 transition-all duration-500 scale-100">
            <CurrentIcon size={56} className="text-emerald-700" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{steps[onboardingStep].title}</h2>
          <p className="text-slate-500 leading-relaxed">{steps[onboardingStep].desc}</p>
        </div>
        
        <div className="p-8 pb-12">
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === onboardingStep ? 'w-8 bg-emerald-700' : 'w-2 bg-slate-200'}`} />
            ))}
          </div>
          <Button onClick={() => {
            if (onboardingStep < steps.length - 1) setOnboardingStep(onboardingStep + 1);
            else navigate('auth_choice');
          }}>
            {onboardingStep < steps.length - 1 ? "Dalej" : "Rozpocznij"}
          </Button>
        </div>
      </div>
    );
  };

  const renderAuthChoice = () => (
    <div className="flex flex-col h-full bg-slate-50 p-6 justify-center">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Wybierz profil</h1>
        <p className="text-slate-500 font-medium">Jak chcesz korzystać z aplikacji?</p>
      </div>
      
      <div className="space-y-4">
        <Card className="p-6 border-2 border-transparent hover:border-emerald-100 hover:bg-emerald-50/50 transition-all group" onClick={() => navigate('login_pt')}>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow text-emerald-700">
              <Stethoscope size={28} />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-bold text-slate-900">Fizjoterapeuta</h3>
              <p className="text-sm text-slate-500 mt-0.5">Zarządzaj pacjentami i twórz plany</p>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-emerald-700 transition-colors" />
          </div>
        </Card>

        <Card className="p-6 border-2 border-transparent hover:border-emerald-100 hover:bg-emerald-50/50 transition-all group" onClick={() => navigate('login_patient')}>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-600">
              <User size={28} />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-bold text-slate-900">Pacjent</h3>
              <p className="text-sm text-slate-500 mt-0.5">Odtwarzaj przypisane ćwiczenia</p>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
          </div>
        </Card>

        <Card className="p-6 border-2 border-transparent hover:border-emerald-100 hover:bg-emerald-50/50 transition-all group" onClick={() => navigate('login_clinic')}>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-700">
              <Building2 size={28} />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-bold text-slate-900">Gabinet</h3>
              <p className="text-sm text-slate-500 mt-0.5">Zarządzaj zespołem fizjoterapeutów</p>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-emerald-700 transition-colors" />
          </div>
        </Card>
      </div>
    </div>
  );

  const renderLogin = (type) => {
    const isPT = type === 'pt';
    const isClinic = type === 'clinic';
    const loginFn = () => {
      simulateLoading(() => {
        setRole(isPT ? 'pt' : (isClinic ? 'clinic' : 'patient'));
        navigate('dashboard', 'home');
      });
    };

    const titles = { pt: 'Fizjoterapeuty', patient: 'Pacjenta', clinic: 'Gabinetu' };
    const icons = {
      pt: <Stethoscope className="text-white" size={32} />,
      patient: <User className="text-white" size={32} />,
      clinic: <Building2 className="text-white" size={32} />,
    };
    const accent = isClinic ? 'bg-slate-700 shadow-slate-200' : (isPT ? 'bg-emerald-700 shadow-emerald-200' : 'bg-emerald-600 shadow-emerald-200');

    return (
      <div className="flex flex-col h-full bg-white p-6 justify-center relative">
        <button onClick={() => navigate('auth_choice')} className="absolute top-12 left-6 p-2 bg-slate-50 rounded-full text-slate-600">
          <ArrowLeft size={20} />
        </button>

        <div className="mb-10 text-center mt-8">
          <div className={`w-16 h-16 mx-auto rounded-3xl flex items-center justify-center mb-6 shadow-lg ${accent}`}>
            {icons[type] || icons.patient}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
            Logowanie {titles[type]}
          </h1>
          <p className="text-slate-500 text-sm">Kliknij poniżej, aby wejść do aplikacji</p>
        </div>

        <Button onClick={loginFn} className={`mt-4 ${isClinic ? 'bg-slate-700 hover:bg-slate-800 shadow-slate-200' : (isPT ? '' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200')}`}>
          Zaloguj się
        </Button>
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="flex flex-col h-full bg-white justify-center items-center p-8 text-center animate-in fade-in zoom-in duration-300">
      <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
        <Check className="text-emerald-500" size={48} strokeWidth={3} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{successMsg}</h2>
    </div>
  );

  // --- WIDOKI FIZJOTERAPEUTY ---

  const renderPTDashboard = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white/80 backdrop-blur-md px-6 py-5 sticky top-0 z-30 border-b border-slate-100 pt-8 flex justify-between items-center">
        <div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Panel główny</p>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Dzień dobry, Piotr</h1>
        </div>
        <div className="relative">
          <Avatar firstName="Piotr" lastName="Błędowski" size="sm" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></div>
        </div>
      </div>

      <div className="p-6 pb-24 space-y-8 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-emerald-700 to-emerald-800 text-white border-none shadow-lg shadow-emerald-200/50" onClick={() => navigate('patients', 'patients')}>
            <div className="flex justify-between items-start mb-6">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm"><Users size={20} /></div>
              <span className="text-3xl font-extrabold">{patients.length}</span>
            </div>
            <p className="font-semibold text-sm text-emerald-50">Aktywni pacjenci</p>
          </Card>
          <Card onClick={() => navigate('library', 'library')}>
            <div className="flex justify-between items-start mb-6">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl"><PlaySquare size={20} /></div>
              <span className="text-3xl font-extrabold text-slate-800">{MOCK_EXERCISES.length}</span>
            </div>
            <p className="font-semibold text-slate-600 text-sm">Baza ćwiczeń</p>
          </Card>
        </div>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-900">Ostatni pacjenci</h2>
            <button onClick={() => navigate('patients', 'patients')} className="text-emerald-700 text-sm font-bold">Wszyscy</button>
          </div>
          <div className="space-y-3">
            {patients.slice(0, 3).map(p => (
              <Card key={p.id} onClick={() => { setSelectedPatientId(p.id); navigate('patient_profile', 'patients'); }} className="flex items-center p-3.5 group">
                <Avatar firstName={p.firstName} lastName={p.lastName} />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-slate-900">{p.firstName} {p.lastName}</h3>
                    {p.status === 'Nowy' && <Badge text="Nowy" type="info" />}
                  </div>
                  <p className="text-xs font-medium text-slate-500 line-clamp-1">{p.condition}</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-600 ml-2 transition-colors" />
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Szybkie akcje</h2>
          <div className="space-y-3">
            <Button onClick={() => navigate('add_patient', 'patients')} icon={Plus} variant="outline" className="justify-start px-5 py-4 border-slate-200 border-2">
              <span className="ml-2 font-bold text-slate-800">Dodaj nowego pacjenta</span>
            </Button>
            <Button onClick={() => navigate('create_plan')} icon={ClipboardList} variant="outline" className="justify-start px-5 py-4 border-slate-200 border-2">
              <span className="ml-2 font-bold text-slate-800">Utwórz plan treningowy</span>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );

  const renderPatientList = () => {
    const filtered = patients.filter(p => p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || p.lastName.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      <div className="flex flex-col h-full bg-slate-50">
        <div className="bg-white px-5 py-4 sticky top-0 z-30 border-b border-slate-100 pt-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Pacjenci</h1>
            <button onClick={() => navigate('add_patient')} className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center hover:bg-emerald-100 transition-colors">
              <Plus size={20} strokeWidth={2.5} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Szukaj pacjenta..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-transparent rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all"
            />
          </div>
        </div>
        
        <div className="p-5 pb-24 space-y-3.5 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"><Users className="text-slate-400" size={24} /></div>
              <p className="text-slate-500 font-medium">Brak wyników wyszukiwania.</p>
            </div>
          ) : (
            filtered.map(p => {
              const plan = getPlanForPatient(p.id, plans);
              const workoutsWithDates = plan ? getWorkoutsForPlan(plan) : [];
              const doneCount = completions.filter(c => c.patientId === p.id).length;
              const totalCount = workoutsWithDates.length;
              const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;
              const lastAt = getLastWorkoutAt(p.id, completions);
              const statusLabel = getActivityStatusLabel(p.id, plans, completions);
              const hasIssue = exerciseIssues.some(i => i.patientId === p.id);
              return (
              <Card key={p.id} onClick={() => { setSelectedPatientId(p.id); navigate('patient_profile'); }} className="flex flex-col p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar firstName={p.firstName} lastName={p.lastName} />
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{p.firstName} {p.lastName}</h3>
                      <p className="text-xs font-medium text-slate-500">{p.bodyPart}</p>
                    </div>
                  </div>
                  <Badge text={p.status} type={p.status === 'Nowy' ? 'info' : (p.status === 'Wymaga uwagi' ? 'warning' : 'success')} />
                </div>
                <div className="h-px w-full bg-slate-50 mb-3"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 truncate mr-4">{p.condition}</span>
                  <div className="flex items-center text-xs text-slate-500 font-bold bg-slate-100 px-2 py-1 rounded-md shrink-0">
                    <PlaySquare size={14} className="mr-1.5 text-emerald-600" />
                    {p.assignedExercises.length} ćwiczeń
                  </div>
                </div>
                {(plan || lastAt) && (
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-500">
                    {plan && <span>Realizacja: {pct}% ({doneCount}/{totalCount})</span>}
                    {lastAt && <span>Ostatnio: {lastAt}</span>}
                    <span>{statusLabel}</span>
                    {hasIssue && <span className="text-amber-600">Zgłoszono problem</span>}
                  </div>
                )}
              </Card>
            );
          })
          )}
        </div>
      </div>
    );
  };

  const renderPatientForm = (isEdit = false) => {
    const handleSave = () => {
      simulateLoading(() => {
        if (!isEdit) {
          const newId = Math.max(...patients.map(p => p.id)) + 1;
          setPatients([{ ...newPatient, id: newId, status: 'Nowy', assignedExercises: [] }, ...patients]);
        }
        showSuccess(isEdit ? "Dane zaktualizowane" : "Pacjent dodany", () => {
          navigate(isEdit ? 'patient_profile' : 'patients');
        });
      });
    };

    return (
      <div className="flex flex-col h-full bg-white">
        <Header title={isEdit ? "Edytuj dane" : "Nowy pacjent"} onBack={() => navigate(isEdit ? 'patient_profile' : 'patients')} />

        {isLoading ? <LoadingSpinner /> : (
          <div className="p-6 space-y-6 overflow-y-auto pb-24">
            <section className="space-y-4">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Dane osobowe</h3>
              <div className="flex gap-4">
                <Input label="Imię" placeholder="np. Jan" value={newPatient.firstName} onChange={e => setNewPatient({...newPatient, firstName: e.target.value})} />
                <Input label="Nazwisko" placeholder="np. Kowalski" value={newPatient.lastName} onChange={e => setNewPatient({...newPatient, lastName: e.target.value})} />
              </div>
              <Input label="Adres E-mail" type="email" placeholder="jan@email.com" value={newPatient.email} onChange={e => setNewPatient({...newPatient, email: e.target.value})} />
              <Input label="Telefon (opcjonalnie)" type="tel" placeholder="+48 ..." value={newPatient.phone} onChange={e => setNewPatient({...newPatient, phone: e.target.value})} />
            </section>

            <section className="space-y-4 mt-8">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Dane medyczne</h3>
              <Input label="Główna dolegliwość" placeholder="np. Ból odcinka lędźwiowego" value={newPatient.condition} onChange={e => setNewPatient({...newPatient, condition: e.target.value})} />
              <Input label="Obszar ciała" placeholder="Wpisz obszar ciała (np. Lewe kolano)" value={newPatient.bodyPart} onChange={e => setNewPatient({...newPatient, bodyPart: e.target.value})} />
              <Input label="Notatki (prywatne)" textarea placeholder="Historia choroby, cel terapii..." value={newPatient.notes} onChange={e => setNewPatient({...newPatient, notes: e.target.value})} />
            </section>

            <div className="pt-6">
              <Button onClick={handleSave} disabled={!newPatient.firstName || !newPatient.lastName}>
                {isEdit ? "Zapisz zmiany" : "Dodaj pacjenta"}
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPatientProfilePT = () => {
    if (!selectedPatient) return null;
    return (
      <div className="flex flex-col h-full bg-slate-50 pb-20 relative">
        <Header 
          title="Profil" 
          onBack={() => navigate('patients', 'patients')} 
          rightElement={<button onClick={() => { setNewPatient(selectedPatient); navigate('edit_patient'); }} className="text-emerald-700 text-sm font-bold hover:text-emerald-800">Edytuj</button>}
        />

        <div className="p-5 overflow-y-auto">
          <div className="flex flex-col items-center mb-8 pt-4">
            <Avatar firstName={selectedPatient.firstName} lastName={selectedPatient.lastName} size="lg" />
            <h2 className="text-2xl font-extrabold text-slate-900 mt-4 tracking-tight">{selectedPatient.firstName} {selectedPatient.lastName}</h2>
            <div className="flex gap-2 mt-3">
               <Badge text={selectedPatient.condition} type="info" />
            </div>
            {(() => {
              const statusLabel = getActivityStatusLabel(selectedPatient.id, plans, completions);
              const lastAt = getLastWorkoutAt(selectedPatient.id, completions);
              const streak = getConsecutiveActiveDays(selectedPatient.id, completions);
              const hasRecentIssue = exerciseIssues.some(i => i.patientId === selectedPatient.id);
              return (
                <div className="mt-3 flex flex-col items-center gap-1">
                  <span className="text-xs font-medium text-slate-500">{statusLabel}</span>
                  {lastAt && <span className="text-[11px] text-slate-400">Ostatnia aktywność: {lastAt}</span>}
                  {streak > 0 && <span className="text-[11px] text-emerald-600">Aktywność: {streak} dni z rzędu</span>}
                  {hasRecentIssue && <span className="text-[11px] text-amber-600">Pacjent zgłosił problem przy ćwiczeniu</span>}
                </div>
              );
            })()}
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-2">Informacje</h3>
              <Card className="space-y-4 p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg"><Activity size={18} /></div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Obszar ciała</span>
                    <p className="text-sm font-semibold text-slate-900">{selectedPatient.bodyPart}</p>
                  </div>
                </div>
                <div className="h-px bg-slate-100 w-full"></div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Info size={18} /></div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Notatka prywatna</span>
                    <p className="text-sm text-slate-700 leading-relaxed">{selectedPatient.notes || 'Brak notatek.'}</p>
                  </div>
                </div>
              </Card>
            </section>

            {(() => {
              const plan = getPlanForPatient(selectedPatient.id, plans);
              const workoutsWithDates = plan ? getWorkoutsForPlan(plan) : [];
              const doneCount = completions.filter(c => c.patientId === selectedPatient.id).length;
              const totalCount = workoutsWithDates.length;
              const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;
              const waterEntry = waterLogs.find(w => w.patientId === selectedPatient.id && w.date === todayKey());
              const waterDone = waterEntry?.completedPortions ?? 0;
              const waterGoalP = plan?.waterGoalPortions ?? 8;
              const lastFeedback = [...completions].filter(c => c.patientId === selectedPatient.id && c.feedback).pop();
              return (
                <>
                  {plan && (
                    <>
                      <section className="mb-6">
                        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-2">Realizacja planu</h3>
                        <Card className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-2xl font-black text-slate-900">{pct}%</span>
                            <span className="text-sm text-slate-500">{doneCount} / {totalCount} treningów</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-600 rounded-full" style={{ width: `${pct}%` }} /></div>
                        </Card>
                      </section>
                      <section className="mb-6">
                        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-2">Nawodnienie dziś</h3>
                        <Card className="p-4">
                          <p className="text-xl font-bold text-slate-900">{waterDone} / {waterGoalP} porcji</p>
                        </Card>
                      </section>
                      {lastFeedback && (
                        <section className="mb-6">
                          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-2">Ostatni feedback</h3>
                          <Card className="p-4">
                            <p className="text-sm text-slate-700">{lastFeedback.feedback?.rating === 'easy' ? 'Łatwy' : lastFeedback.feedback?.rating === 'hard' ? 'Trudny' : 'W sam raz'}</p>
                            {lastFeedback.feedback?.note && <p className="text-sm text-slate-600 mt-1">{lastFeedback.feedback.note}</p>}
                          </Card>
                        </section>
                      )}
                      {(() => {
                        const historyPlans = getPlansForPatient(selectedPatient.id, plans).filter(pl => pl.status !== 'active');
                        if (historyPlans.length > 0) {
                          return (
                            <section className="mb-6">
                              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-2">Historia planów</h3>
                              <div className="space-y-2">
                                {historyPlans.slice(0, 5).map(plan => {
                                  const planDone = completions.filter(c => c.patientId === selectedPatient.id && plan.workouts?.some(w => w.id === c.workoutId)).length;
                                  const planTotal = plan.workouts?.length || 0;
                                  const planPct = planTotal ? Math.round((planDone / planTotal) * 100) : 0;
                                  const endDate = plan.startDate ? toDateKeyUtil(addDays(new Date(plan.startDate + 'T12:00:00'), plan.durationWeeks * 7)) : '';
                                  return (
                                    <Card key={plan.id} onClick={() => { setSelectedPlanHistoryId(plan.id); setScreen('pt_plan_history_detail'); }} className="p-4 flex items-center justify-between">
                                      <div>
                                        <p className="font-semibold text-slate-900 text-sm">{plan.name}</p>
                                        <p className="text-xs text-slate-500">{plan.startDate} – {endDate} · {planPct}%</p>
                                      </div>
                                      <ChevronRight size={18} className="text-slate-400" />
                                    </Card>
                                  );
                                })}
                              </div>
                            </section>
                          );
                        }
                        return null;
                      })()}
                      {(() => {
                        const issues = exerciseIssues.filter(i => i.patientId === selectedPatient.id);
                        if (issues.length === 0) return null;
                        return (
                          <section className="mb-6">
                            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-2">Problematyczne ćwiczenia</h3>
                            <Card className="p-4 border-l-4 border-l-amber-200">
                              <p className="text-xs text-slate-500 mb-2">Pacjent zgłosił problem przy ćwiczeniach. Warto omówić na wizycie.</p>
                              <div className="space-y-2">
                                {issues.slice(0, 5).map(i => {
                                  const ex = MOCK_EXERCISES.find(e => e.id === i.exerciseId);
                                  const typeLabel = i.issueType === 'pain' ? 'Ból' : i.issueType === 'difficult' ? 'Trudność' : 'Wykonanie';
                                  return (
                                    <div key={i.id} className="text-sm">
                                      <span className="font-semibold text-slate-800">{ex?.name}</span>
                                      <span className="text-slate-500"> · {typeLabel}</span>
                                      {i.issueNote && <p className="text-slate-600 text-xs mt-0.5">{i.issueNote}</p>}
                                      <p className="text-[10px] text-slate-400 mt-0.5">{i.workoutName} · {i.reportedAt}</p>
                                    </div>
                                  );
                                })}
                                {issues.length > 5 && <p className="text-xs text-slate-400">+{issues.length - 5} starszych zgłoszeń</p>}
                              </div>
                            </Card>
                          </section>
                        );
                      })()}
                    </>
                  )}
                </>
              );
            })()}

            <section>
              <div className="flex justify-between items-center mb-3 px-2">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Plan ćwiczeń ({selectedPatient.assignedExercises.length})</h3>
                <button onClick={() => { setAssignFlowData({ patientId: selectedPatient.id, exercises: [], sets: 3, reps: 10, frequency: 'Codziennie' }); navigate('assign_exercise_1'); }} className="text-emerald-700 flex items-center gap-1 text-sm font-bold hover:text-emerald-800 transition-colors">
                  <Plus size={16} strokeWidth={2.5} /> Przypisz
                </button>
              </div>
              
              {selectedPatient.assignedExercises.length > 0 ? (
                <div className="space-y-3">
                  {selectedPatient.assignedExercises.map((assignment, idx) => {
                    const exercise = MOCK_EXERCISES.find(e => e.id === assignment.exerciseId);
                    if (!exercise) return null;
                    return (
                      <Card key={idx} className="p-3.5 flex items-center group cursor-pointer" onClick={() => { setSelectedExerciseId(exercise.id); navigate('exercise_detail'); }}>
                        <div className="w-16 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden relative">
                          <Play size={16} className="text-slate-400" fill="currentColor" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{exercise.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{assignment.sets}x{assignment.reps}</span>
                             <span className="text-[11px] text-slate-500">{assignment.frequency}</span>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-slate-300" />
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Activity className="text-slate-400" size={20} />
                  </div>
                  <p className="text-sm font-medium text-slate-600 mb-4">Pacjent nie ma jeszcze planu.</p>
                  <Button onClick={() => { setAssignFlowData({ patientId: selectedPatient.id, exercises: [], sets: 3, reps: 10, frequency: 'Codziennie' }); navigate('assign_exercise_1'); }} variant="outline">Rozpocznij terapię</Button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    );
  };

  const renderAssignFlow1 = () => {
    // Wybór ćwiczeń
    const toggleExercise = (id) => {
      setAssignFlowData(prev => ({
        ...prev,
        exercises: prev.exercises.includes(id) ? prev.exercises.filter(e => e !== id) : [...prev.exercises, id]
      }));
    };

    return (
      <div className="flex flex-col h-full bg-slate-50 pb-24">
        <Header title="Wybierz ćwiczenia" onBack={() => navigate('patient_profile')} />
        
        <div className="p-5 space-y-3 overflow-y-auto pb-32">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Szukaj w bazie..." className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-emerald-600 shadow-sm" />
          </div>

          {MOCK_EXERCISES.map(ex => {
            const isSelected = assignFlowData.exercises.includes(ex.id);
            return (
              <Card key={ex.id} className={`p-3.5 flex items-center transition-all ${isSelected ? 'border-emerald-600 bg-emerald-50/30 shadow-md ring-1 ring-emerald-600/20' : ''}`} onClick={() => toggleExercise(ex.id)}>
                <div className="w-20 h-14 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                   <Play size={20} className={isSelected ? 'text-emerald-600' : 'text-slate-300'} fill="currentColor"/>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">{ex.name}</h4>
                  <p className="text-[11px] font-medium text-slate-500 mt-1 uppercase tracking-wide">{ex.bodyPart}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-2 transition-colors ${isSelected ? 'bg-emerald-700 border-emerald-700' : 'border-slate-300'}`}>
                  {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                </div>
              </Card>
            )
          })}
        </div>

        {assignFlowData.exercises.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-md p-5 border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] pb-8 z-40 rounded-b-[3rem]">
             <div className="flex items-center justify-between mb-4 px-1">
                <span className="text-sm font-bold text-slate-700">Wybrano: <span className="text-emerald-700">{assignFlowData.exercises.length}</span></span>
             </div>
             <Button onClick={() => navigate('assign_exercise_2')}>Dalej: Parametry</Button>
          </div>
        )}
      </div>
    );
  };

  const renderAssignFlow2 = () => {
    // Ustawienia parametrów — value jako string dla kontrolowanego inputu (React)
    const handleAssign = () => {
      simulateLoading(() => {
        const setsNum = typeof assignFlowData.sets === 'string' ? parseInt(assignFlowData.sets, 10) : assignFlowData.sets;
        const repsNum = typeof assignFlowData.reps === 'string' ? parseInt(assignFlowData.reps, 10) : assignFlowData.reps;
        const newAssignments = assignFlowData.exercises.map(id => ({ 
          exerciseId: id, 
          sets: isNaN(setsNum) ? 3 : setsNum, 
          reps: isNaN(repsNum) ? 10 : repsNum, 
          frequency: assignFlowData.frequency 
        }));
        
        const updatedPatients = patients.map(p => {
          if(p.id === selectedPatient.id) {
            return { ...p, assignedExercises: [...p.assignedExercises, ...newAssignments], status: 'Aktywny plan' };
          }
          return p;
        });
        
        setPatients(updatedPatients);
        showSuccess(`Przypisano ${assignFlowData.exercises.length} ćwiczeń`, () => {
          navigate('patient_profile');
        });
      });
    };

    return (
      <div className="flex flex-col h-full bg-white pb-20">
        <Header title="Parametry planu" onBack={() => navigate('assign_exercise_1')} />
        
        {isLoading ? <LoadingSpinner /> : (
          <div className="p-6 space-y-8 overflow-y-auto pb-32">
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3">
              <Info className="text-emerald-700 shrink-0 mt-0.5" size={20} />
              <p className="text-sm font-medium text-emerald-900 leading-relaxed">Ustawiasz parametry globalnie dla wybranych <strong>{assignFlowData.exercises.length} ćwiczeń</strong>. Będziesz mógł je zedytować później.</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Liczba serii" type="number" value={assignFlowData.sets != null ? String(assignFlowData.sets) : ''} onChange={e => setAssignFlowData({...assignFlowData, sets: e.target.value})} />
                <Input label="Powtórzenia" type="number" value={assignFlowData.reps != null ? String(assignFlowData.reps) : ''} onChange={e => setAssignFlowData({...assignFlowData, reps: e.target.value})} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Częstotliwość</label>
                <select 
                  value={assignFlowData.frequency} 
                  onChange={e => setAssignFlowData({...assignFlowData, frequency: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium text-slate-900 focus:outline-none focus:border-emerald-600 appearance-none"
                >
                  <option>Codziennie</option>
                  <option>2 razy dziennie</option>
                  <option>Co 2 dni</option>
                  <option>Tylko w weekendy</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <Button onClick={handleAssign} icon={CheckCircle2}>Zatwierdź plan</Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCreatePlan = () => {
    const addExercise = () => setCreatePlanData(prev => ({ ...prev, planExercises: [...(prev.planExercises || []), { exerciseId: MOCK_EXERCISES[0]?.id ?? 1, sets: 3, reps: 10 }] }));
    const removeExercise = (idx) => setCreatePlanData(prev => ({ ...prev, planExercises: prev.planExercises.filter((_, i) => i !== idx) }));
    const updateExercise = (idx, field, value) => setCreatePlanData(prev => ({
      ...prev,
      planExercises: prev.planExercises.map((e, i) => i === idx ? { ...e, [field]: field === 'exerciseId' ? Number(value) : (field === 'sets' || field === 'reps' ? parseInt(value, 10) || 0 : value) } : e)
    }));

    const WEEKDAY_LABELS = [{ d: 0, label: 'Nd' }, { d: 1, label: 'Pn' }, { d: 2, label: 'Wt' }, { d: 3, label: 'Śr' }, { d: 4, label: 'Cz' }, { d: 5, label: 'Pt' }, { d: 6, label: 'So' }];
    const toggleTrainDay = (day) => setCreatePlanData(prev => ({
      ...prev,
      trainDays: prev.trainDays.includes(day) ? prev.trainDays.filter(d => d !== day) : [...prev.trainDays, day].sort((a, b) => a - b),
    }));

    const handleSave = () => {
      if (!createPlanData.patientId || !createPlanData.name) return;
      const patient = patients.find(p => p.id === createPlanData.patientId);
      if (!patient) return;
      const startDate = todayKey();
      const trainDays = (createPlanData.trainDays || [1, 3, 5]).length ? createPlanData.trainDays : [1, 3, 5];
      const start = new Date(startDate + 'T12:00:00');
      const end = addDays(start, createPlanData.durationWeeks * 7);
      const dates = [];
      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        if (trainDays.includes(d.getDay())) dates.push(toDateKey(d));
      }
      const totalWorkouts = Math.max(dates.length, 1);
      const exerciseIds = (createPlanData.planExercises || []).map(e => e.exerciseId).filter(Boolean);
      const perWorkout = Math.max(1, Math.ceil(exerciseIds.length / totalWorkouts));
      const workouts = dates.map((date, i) => {
        const start = i * perWorkout;
        const ids = exerciseIds.slice(start, start + perWorkout);
        return { id: `new-${i}`, dayIndex: i, date, name: `Trening ${i + 1}`, exerciseIds: ids.length ? ids : [1, 2], isGeneralDevelopment: false };
      });
      if (workouts.length === 0) workouts.push({ id: 'new-0', dayIndex: 0, date: startDate, name: 'Trening 1', exerciseIds: [1, 2], isGeneralDevelopment: false });
      const newPlan = {
        id: Math.max(0, ...plans.map(pl => pl.id)) + 1,
        patientId: createPlanData.patientId,
        name: createPlanData.name,
        startDate,
        durationWeeks: createPlanData.durationWeeks,
        workoutsPerWeek: trainDays.length,
        trainDays,
        status: 'active',
        duplicatedFromPlanId: duplicatePlanSourceId || null,
        noteForPatient: createPlanData.noteForPatient,
        waterGoalPortions: createPlanData.waterGoalPortions,
        planExercises: createPlanData.planExercises || [],
        workouts,
      };
      setPlans(prev => {
        const out = prev.map(p => {
          if (p.patientId === createPlanData.patientId && p.status === 'active') return { ...p, status: 'completed' };
          return p;
        });
        return [...out, newPlan];
      });
      showSuccess('Plan utworzony', () => { setCreatePlanData({ patientId: null, name: '', durationWeeks: 3, trainDays: [1, 3, 5], noteForPatient: '', waterGoalPortions: 8, planExercises: [] }); setDuplicatePlanSourceId(null); setSelectedPatientId(createPlanData.patientId); navigate('patient_profile', 'patients'); });
    };

    const planExercises = createPlanData.planExercises || [];

    return (
      <div className="flex flex-col h-full bg-white pb-24 overflow-y-auto">
        <Header title="Nowy plan" onBack={() => navigate('dashboard')} />
        <div className="p-6 space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Pacjent</label>
            <select value={createPlanData.patientId ?? ''} onChange={e => setCreatePlanData(prev => ({ ...prev, patientId: e.target.value ? Number(e.target.value) : null }))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium text-slate-900 focus:outline-none focus:border-emerald-600 mt-1.5">
              <option value="">Wybierz pacjenta</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>)}
            </select>
          </div>
          {createPlanData.patientId && (() => {
            const patientPlans = getPlansForPatient(createPlanData.patientId, plans);
            if (patientPlans.length === 0) return null;
            return (
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1 mb-2 block">Użyj planu jako bazy (opcjonalnie)</label>
                <select
                  value={duplicatePlanSourceId ?? ''}
                  onChange={e => {
                    const id = e.target.value ? Number(e.target.value) : null;
                    setDuplicatePlanSourceId(id);
                    if (id) {
                      const plan = plans.find(p => p.id === id);
                      if (plan) {
                        setCreatePlanData(prev => ({
                          ...prev,
                          name: plan.name + ' (kopia)',
                          durationWeeks: plan.durationWeeks,
                          trainDays: plan.trainDays || [1, 3, 5],
                          noteForPatient: plan.noteForPatient || '',
                          waterGoalPortions: plan.waterGoalPortions ?? 8,
                          planExercises: Array.isArray(plan.planExercises) && plan.planExercises.length ? plan.planExercises : (plan.workouts || []).flatMap(w => (w.exerciseIds || []).map(exId => ({ exerciseId: exId, sets: 3, reps: 10 }))).reduce((acc, item) => { if (!acc.find(x => x.exerciseId === item.exerciseId)) acc.push(item); return acc; }, []),
                        }));
                      }
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium text-slate-900 focus:outline-none focus:border-emerald-600 mt-1.5"
                >
                  <option value="">Utwórz pusty plan</option>
                  {patientPlans.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.startDate})</option>
                  ))}
                </select>
                {duplicatePlanSourceId && <p className="text-xs text-slate-500 mt-1.5">Pracujesz na kopii. Oryginał pozostanie w historii.</p>}
              </div>
            );
          })()}
          <Input label="Nazwa planu" placeholder="np. Plan stabilizacji lędźwi" value={createPlanData.name} onChange={e => setCreatePlanData(prev => ({ ...prev, name: e.target.value }))} />
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Czas trwania (tygodnie)</label>
            <select value={createPlanData.durationWeeks} onChange={e => setCreatePlanData(prev => ({ ...prev, durationWeeks: Number(e.target.value) }))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium text-slate-900 focus:outline-none focus:border-emerald-600 mt-1.5">
              {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} {n === 1 ? 'tydzień' : 'tygodnie'}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1 mb-2 block">Dni treningów</label>
            <div className="flex flex-wrap gap-2">
              {WEEKDAY_LABELS.map(({ d, label }) => (
                <button key={d} type="button" onClick={() => toggleTrainDay(d)} className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${(createPlanData.trainDays || []).includes(d) ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-1.5">Wybierz dni, w które pacjent ma trenować</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">Ćwiczenia w planie</label>
              <button type="button" onClick={addExercise} className="text-emerald-700 text-sm font-bold flex items-center gap-1">
                <Plus size={16} /> Dodaj
              </button>
            </div>
            {planExercises.length === 0 ? (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
                <p className="text-slate-500 text-sm">Brak ćwiczeń. Kliknij „Dodaj”, aby dodać ćwiczenie z seriami i powtórzeniami.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {planExercises.map((item, idx) => {
                  const ex = MOCK_EXERCISES.find(e => e.id === item.exerciseId);
                  return (
                    <Card key={idx} className="p-4 border-none shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <select value={item.exerciseId} onChange={e => updateExercise(idx, 'exerciseId', e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:border-emerald-600">
                          {MOCK_EXERCISES.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                        </select>
                        <button type="button" onClick={() => removeExercise(idx)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg">×</button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Serie</label>
                          <input type="number" min={1} value={item.sets} onChange={e => updateExercise(idx, 'sets', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-emerald-600" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Powtórzenia</label>
                          <input type="number" min={1} value={item.reps} onChange={e => updateExercise(idx, 'reps', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-emerald-600" />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          <Input label="Cel porcji wody dziennie" type="number" value={String(createPlanData.waterGoalPortions)} onChange={e => setCreatePlanData(prev => ({ ...prev, waterGoalPortions: parseInt(e.target.value, 10) || 8 }))} />
          <Input label="Notatka dla pacjenta" textarea placeholder="Opcjonalnie" value={createPlanData.noteForPatient} onChange={e => setCreatePlanData(prev => ({ ...prev, noteForPatient: e.target.value }))} />
          <Button onClick={handleSave} disabled={!createPlanData.patientId || !createPlanData.name}>Zapisz plan</Button>
        </div>
      </div>
    );
  };

  // --- WIDOKI WSPÓLNE (BIBLIOTEKA) ---

  const renderLibrary = () => {
    const isPT = role === 'pt';
    const categories = [
      'Wszystkie', 'Kończyna dolna', 'Kończyna górna', 'Bark', 'Plecy', 'Klatka piersiowa',
      'Core', 'Kolano', 'Biodro', 'Kostka', 'Szyja', 'FBW', 'Mobilizacja', 'Wzmacnianie',
    ];

    const filteredExercises = MOCK_EXERCISES.filter(ex => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = ex.name.toLowerCase().includes(q) || ex.bodyPart.toLowerCase().includes(q) || ex.category.toLowerCase().includes(q);
      const matchesCat = filterCategory === 'Wszystkie'
        || ex.bodyPart.includes(filterCategory)
        || ex.category.includes(filterCategory)
        || (filterCategory === 'Kończyna dolna' && ['Kolano', 'Biodro', 'Kostka', 'Nogi', 'Stopa'].some(p => ex.bodyPart.includes(p)))
        || (filterCategory === 'Kończyna górna' && ['Bark', 'Biceps', 'Triceps', 'Przedramię'].some(p => ex.bodyPart.includes(p)))
        || (filterCategory === 'Plecy' && ['Kręgosłup', 'Szyja', 'Plecy'].some(p => ex.bodyPart.includes(p)))
        || (filterCategory === 'FBW' && ex.category === 'FBW');
      return matchesSearch && matchesCat;
    });

    return (
      <div className="flex flex-col h-full bg-slate-50">
        <div className="bg-white px-5 py-4 sticky top-0 z-30 border-b border-slate-100 pt-8">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Baza ćwiczeń</h1>
            {isPT && <button className="p-2 bg-slate-50 rounded-full text-slate-600 hover:bg-slate-100"><Filter size={20} /></button>}
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Szukaj ćwiczenia..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-transparent rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:bg-white focus:border-emerald-600 transition-all"
            />
          </div>
          
          <div className="flex gap-2.5 overflow-x-auto mt-5 pb-2 scrollbar-hide -mx-5 px-5">
            {categories.map((cat, i) => (
              <button 
                key={i} 
                onClick={() => setFilterCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${filterCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 pb-24 space-y-4 overflow-y-auto">
          <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest px-1">Znaleziono: {filteredExercises.length}</p>
          
          {filteredExercises.map(ex => (
            <Card key={ex.id} onClick={() => { setSelectedExerciseId(ex.id); navigate('exercise_detail'); }} className="p-0 overflow-hidden group">
              <div className="h-44 bg-slate-100 relative">
                {ex.videoUrl ? (
                  <video
                    src={encodeVideoUrl(ex.videoUrl)}
                    preload="none"
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    onMouseEnter={e => { e.currentTarget.play(); }}
                    onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-100 group-hover:opacity-0 transition-opacity">
                  <div className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl">
                     <Play className="text-emerald-700 ml-1.5" size={24} fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 z-20 flex gap-1.5">
                  <Badge text={ex.category} type="default" />
                  {ex.videoUrl && <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide bg-emerald-700 text-white">▶ wideo</span>}
                </div>
                <div className="absolute bottom-3 right-3 z-20 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-white tracking-wide">
                  {ex.duration}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-extrabold text-slate-900 text-lg leading-tight mb-2 group-hover:text-emerald-700 transition-colors">{ex.name}</h3>
                <div className="flex items-center gap-4 text-[13px] font-semibold text-slate-500">
                   <span className="flex items-center gap-1.5"><Activity size={16} className={ex.difficulty === 'Łatwe' ? 'text-emerald-500' : 'text-amber-500'}/> {ex.difficulty}</span>
                   <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                   <span>{ex.bodyPart}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderExerciseDetail = () => {
    if (!selectedExercise) return null;
    const isPT = role === 'pt';
    
    // Jeśli wchodzimy z ekranu "Moje ćwiczenia" jako pacjent, pokaż parametry (symulacja)
    const isPatientPlan = role === 'patient' && activeTab === 'exercises';
    const assignmentParams = isPatientPlan && currentPatient?.assignedExercises.find(a => a.exerciseId === selectedExercise.id);

    return (
      <div className="flex flex-col h-full bg-white pb-20 overflow-y-auto">
        <Header title="Szczegóły" onBack={() => navigate(isPT ? 'library' : (activeTab === 'general' ? 'patient_general' : 'dashboard'), activeTab === 'general' ? 'general' : activeTab)} />

        <div className="px-5 py-3">
          <ExerciseVideo videoUrl={selectedExercise.videoUrl} duration={selectedExercise.duration} />
        </div>

        <div className="p-6 space-y-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge text={selectedExercise.category} type="info" />
              <Badge text={selectedExercise.bodyPart} type="default" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-3 tracking-tight">{selectedExercise.name}</h1>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100">
              <Activity size={16} className={selectedExercise.difficulty === 'Łatwe' ? 'text-emerald-500' : 'text-amber-500'} /> Poziom: <span className="text-slate-900">{selectedExercise.difficulty}</span>
            </div>
          </div>

          {assignmentParams && (
            <div className="bg-emerald-700 text-white rounded-2xl p-5 shadow-lg shadow-emerald-200/50">
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-200 mb-3">Zalecenia fizjoterapeuty</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="block text-emerald-200 text-xs mb-1">Serie</span>
                  <span className="text-xl font-bold">{assignmentParams.sets}</span>
                </div>
                <div>
                  <span className="block text-emerald-200 text-xs mb-1">Powtórzenia</span>
                  <span className="text-xl font-bold">{assignmentParams.reps}</span>
                </div>
                <div>
                  <span className="block text-emerald-200 text-xs mb-1">Częstość</span>
                  <span className="text-sm font-bold leading-tight">{assignmentParams.frequency}</span>
                </div>
              </div>
            </div>
          )}

          <section>
            <h3 className="text-lg font-extrabold text-slate-900 mb-3">Cel ćwiczenia</h3>
            <p className="text-slate-600 text-[15px] leading-relaxed font-medium">{selectedExercise.description}</p>
          </section>

          <section>
            <h3 className="text-lg font-extrabold text-slate-900 mb-4">Instrukcja wykonania</h3>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-slate-700 text-[15px] leading-loose whitespace-pre-line font-medium">
                {selectedExercise.instructions}
              </p>
            </div>
          </section>

          {isPT && (
            <div className="pt-4 border-t border-slate-100">
               <Button icon={User} onClick={() => { /* Placeholder for direct assign from exercise */ }}>
                 Przypisz to ćwiczenie
               </Button>
            </div>
          )}
        </div>
      </div>
    );
  };


  // --- WIDOKI PACJENTA ---

  const renderPatientHome = () => {
    if (!currentPatient) return null;
    const plan = currentPlan;
    const todayW = todayWorkout;
    const completedToday = todayW && completions.some(c => c.patientId === currentPatient.id && c.workoutId === todayW.id);

    return (
      <div className="flex flex-col h-full bg-slate-50 pb-24 overflow-y-auto">
        <div className="bg-white/80 backdrop-blur-md px-6 py-5 sticky top-0 z-30 border-b border-slate-100 pt-8">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Witaj ponownie</p>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{currentPatient.firstName}</h1>
        </div>

        <div className="p-6 space-y-6">
          {planEnded ? (
            <Card className="bg-slate-100 border-2 border-dashed border-slate-300 p-6 text-center">
              <h3 className="text-lg font-bold text-slate-700 mb-2">Plan dobiegł końca</h3>
              <p className="text-slate-600 text-sm mb-4">Wróć do fizjoterapeuty po nowy zestaw ćwiczeń.</p>
              <Button variant="outline" className="w-fit mx-auto" onClick={() => window.open(BOOKSY_URL, '_blank')}>
                Umów wizytę (Booksy)
              </Button>
            </Card>
          ) : todayW ? (
            <Card className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white border-none shadow-[0_12px_30px_rgb(4,120,87,0.25)] p-7 relative overflow-hidden" onClick={() => !completedToday && (setSessionState({ workout: todayW, plan, currentIndex: 0, completedExerciseIds: [] }), navigate('today_training'))}>
              <div className="absolute right-[-30px] top-[-30px] opacity-10"><HeartPulse size={180} /></div>
              <h2 className="text-emerald-100 text-sm font-bold tracking-wide uppercase mb-2 relative z-10">Dzisiejszy trening</h2>
              <p className="font-semibold text-lg relative z-10">{todayW.name}</p>
              <p className="text-emerald-100 text-sm mt-1 relative z-10">{todayW.exerciseIds?.length || 0} ćwiczeń</p>
              {completedToday ? (
                <div className="mt-4 flex items-center gap-2 text-emerald-100 relative z-10">
                  <CheckCircle2 size={20} /> <span className="font-medium">Wykonano dziś</span>
                </div>
              ) : (
                <Button className="w-fit mt-6 px-8 py-3.5 text-sm font-bold z-10 relative bg-white text-emerald-800 hover:bg-emerald-50 shadow-sm" onClick={(e) => { e.stopPropagation(); setSessionState({ workout: todayW, plan, currentIndex: 0, completedExerciseIds: [] }); navigate('today_training'); }}>
                  Rozpocznij trening
                </Button>
              )}
            </Card>
          ) : plan ? (
            <Card className="bg-slate-50 border border-slate-200 p-6 text-center">
              <p className="text-slate-600 text-sm">Dziś nie ma zaplanowanego treningu. Odpoczywaj lub sprawdź kalendarz.</p>
              <button onClick={() => navigate('calendar', 'calendar')} className="text-emerald-700 font-bold text-sm mt-2">Zobacz kalendarz</button>
            </Card>
          ) : (
            <Card className="bg-slate-50 border border-slate-200 p-6 text-center">
              <p className="text-slate-600 text-sm">Nie masz aktywnego planu. Skontaktuj się z fizjoterapeutą.</p>
              <Button variant="outline" className="w-fit mx-auto mt-3" onClick={() => window.open(BOOKSY_URL, '_blank')}>Umów wizytę</Button>
            </Card>
          )}

          {plan && !planEnded && (
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Postęp planu</h3>
                <span className="text-xs font-bold text-slate-500">Koniec za {planDaysLeft} dni</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full transition-all" style={{ width: `${Math.min(100, (completions.filter(c => c.patientId === currentPatient.id).length / (getWorkoutsForPlan(plan).length || 1)) * 100)}%` }} />
              </div>
              <p className="text-xs text-slate-500 mt-2">{completions.filter(c => c.patientId === currentPatient.id).length} / {getWorkoutsForPlan(plan).length} treningów</p>
            </Card>
          )}

          {plan && currentPatient && (() => {
            const streak = getConsecutiveActiveDays(currentPatient.id, completions);
            const totalW = getWorkoutsForPlan(plan).length;
            const doneW = completions.filter(c => c.patientId === currentPatient.id).length;
            const pct = totalW ? Math.round((doneW / totalW) * 100) : 0;
            if (streak === 0 && pct === 0) return null;
            return (
              <Card className="p-4 border-none shadow-[0_2px_10px_rgba(0,0,0,0.04)] bg-white">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Regularność</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-700">
                  {streak > 0 && <span>Aktywność: {streak} {streak === 1 ? 'dzień' : 'dni'} z rzędu</span>}
                  {totalW > 0 && <span>Realizacja planu: {pct}%</span>}
                </div>
              </Card>
            );
          })()}

          {plan && (
            <Card className="p-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Droplets size={16} className="text-sky-500" /> Nawodnienie dziś
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-black text-slate-900">{waterToday}<span className="text-slate-400 font-semibold">/{waterGoal}</span></span>
                <GlassWater size={28} className="text-sky-500 shrink-0" />
                <span className="text-sm text-slate-500 font-medium">szklanka wody</span>
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: waterGoal }).map((_, i) => (
                  <button key={i} onClick={() => {
                    const entry = waterLogs.find(w => w.patientId === currentPatient.id && w.date === todayKey());
                    const current = entry?.completedPortions ?? 0;
                    const next = current === i + 1 ? i : i + 1;
                    setWaterLogs(prev => {
                      const idx = prev.findIndex(w => w.patientId === currentPatient.id && w.date === todayKey());
                      if (idx >= 0) return prev.map((w, ii) => ii === idx ? { ...w, completedPortions: next } : w);
                      return [...prev, { patientId: currentPatient.id, date: todayKey(), completedPortions: next }];
                    });
                  }} className={`flex-1 h-9 rounded-xl border-2 transition-all ${i < waterToday ? 'bg-sky-100 border-sky-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`} />
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3 font-medium">Pamiętaj o piciu wody w ciągu dnia</p>
            </Card>
          )}

          {plan?.noteForPatient && (
            <Card className="p-5 border-l-4 border-l-amber-400">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Notatka od fizjoterapeuty</h3>
              <p className="text-slate-700 text-sm leading-relaxed">{plan.noteForPatient}</p>
            </Card>
          )}

          <Card className="p-5 bg-white border border-slate-200" onClick={() => window.open(BOOKSY_URL, '_blank')}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-xl"><Calendar size={20} className="text-emerald-700" /></div>
                <div>
                  <h3 className="font-bold text-slate-900">Umów wizytę</h3>
                  <p className="text-xs text-slate-500">U swojego fizjoterapeuty przez Booksy</p>
                </div>
              </div>
              <ChevronRight className="text-slate-400" />
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderTodayTraining = () => {
    const { workout, plan } = sessionState;
    if (!workout || !currentPatient) return null;
    const exercises = (workout.exerciseIds || []).map(id => MOCK_EXERCISES.find(e => e.id === id)).filter(Boolean);
    const estMin = Math.max(exercises.length * 4, 12);

    return (
      <div className="flex flex-col h-full bg-slate-50 pb-24 overflow-y-auto">
        <Header title="Dzisiejszy trening" onBack={() => navigate('dashboard', 'home')} />
        <div className="p-6 space-y-6">
          <Card className="p-6 border-none shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <h2 className="text-xl font-bold text-slate-900 mb-1">{workout.name}</h2>
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
              <span className="flex items-center gap-1.5"><PlaySquare size={16} className="text-emerald-600" /> {exercises.length} ćwiczeń</span>
              <span className="flex items-center gap-1.5"><Activity size={16} /> ~{estMin} min</span>
            </div>
            {plan?.noteForPatient && (
              <div className="bg-amber-50/80 border border-amber-100 rounded-xl p-4 mb-4">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">Notatka od fizjoterapeuty</p>
                <p className="text-slate-700 text-sm leading-relaxed">{plan.noteForPatient}</p>
              </div>
            )}
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Plan treningu</p>
            <ul className="space-y-2">
              {exercises.map((ex, i) => (
                <li key={ex.id} className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center shrink-0 text-xs">{i + 1}</span>
                  <span className="text-slate-800 font-medium">{ex.name}</span>
                  <span className="text-slate-400 text-xs ml-auto shrink-0">{ex.duration}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Button onClick={() => navigate('session')} icon={Play} className="py-4 text-base font-bold shadow-[0_8px_20px_rgb(4,120,87,0.25)]">
            Rozpocznij trening
          </Button>
        </div>
      </div>
    );
  };

  const reportExerciseIssue = (issueType) => {
    if (!issueModal.exerciseId || !currentPatient) return;
    const workout = sessionState.workout;
    const plan = sessionState.plan;
    const ex = MOCK_EXERCISES.find(e => e.id === issueModal.exerciseId);
    const newIssue = {
      id: Math.max(0, ...exerciseIssues.map(i => i.id)) + 1,
      patientId: currentPatient.id,
      exerciseId: issueModal.exerciseId,
      workoutId: workout?.id,
      planId: plan?.id,
      workoutName: workout?.name,
      issueType,
      issueNote: issueNote.trim() || '',
      reportedAt: todayKey(),
    };
    setExerciseIssues(prev => [...prev, newIssue]);
    setIssueModal({ open: false, exerciseId: null, exerciseName: '' });
    setIssueNote('');
    setSuccessMsg('Zgłoszenie zapisane. Fizjoterapeuta zobaczy tę informację.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const renderSession = () => {
    const { workout, plan, currentIndex, completedExerciseIds } = sessionState;
    if (!workout || !currentPatient) return null;
    const exercises = (workout.exerciseIds || []).map(id => MOCK_EXERCISES.find(e => e.id === id)).filter(Boolean);
    const current = exercises[currentIndex];
    const isLast = currentIndex >= exercises.length - 1;
    const isCurrentDone = current && completedExerciseIds.includes(current.id);

    const markDone = () => {
      if (!current) return;
      const nextCompleted = completedExerciseIds.includes(current.id) ? completedExerciseIds : [...completedExerciseIds, current.id];
      setSessionState(prev => ({ ...prev, completedExerciseIds: nextCompleted }));
      if (isLast) {
        setFeedbackState({ rating: null, note: '' });
        navigate('session_feedback');
      } else setSessionState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
    };

    const goNext = () => {
      if (isLast) { setFeedbackState({ rating: null, note: '' }); navigate('session_feedback'); }
      else setSessionState(prev => ({ ...prev, currentIndex: Math.min(prev.currentIndex + 1, exercises.length - 1) }));
    };
    const goPrev = () => setSessionState(prev => ({ ...prev, currentIndex: Math.max(0, prev.currentIndex - 1) }));

    if (exercises.length === 0) return null;
    if (!current) return null;

    const issueOptions = [
      { id: 'difficult', label: 'To ćwiczenie sprawia trudność' },
      { id: 'pain', label: 'Powoduje ból' },
      { id: 'unclear', label: 'Nie rozumiem wykonania' },
    ];

    return (
      <div className="flex flex-col h-full bg-white pb-28">
        <Header title={workout.name} onBack={() => navigate('today_training')} />
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Ćwiczenie {currentIndex + 1} z {exercises.length}</span>
            <span className="text-xs font-semibold text-emerald-700">{completedExerciseIds.length} wykonanych</span>
          </div>
          <div className="flex gap-1">
            {exercises.map((ex, i) => (
              <button key={ex.id} onClick={() => setSessionState(prev => ({ ...prev, currentIndex: i }))} className={`flex-1 h-1.5 rounded-full transition-colors ${i === currentIndex ? 'bg-emerald-600 ring-2 ring-emerald-200' : completedExerciseIds.includes(ex.id) ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>
        <div className="p-5 flex-1 overflow-y-auto">
          <ExerciseVideo videoUrl={current.videoUrl} duration={current.duration} />
          <h2 className="text-xl font-bold text-slate-900 mt-5">{current.name}</h2>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">{current.description}</p>
          <div className="mt-2 flex items-center gap-2 text-slate-500 text-sm">
            <Activity size={16} /> <span>{current.duration}</span>
            <span className="text-slate-300">·</span>
            <span>{current.difficulty}</span>
          </div>
          <button type="button" onClick={() => setIssueModal({ open: true, exerciseId: current.id, exerciseName: current.name })} className="mt-4 text-xs font-medium text-slate-500 hover:text-amber-600 transition-colors underline">
            To ćwiczenie sprawia trudność / ból / nie wiem jak wykonać
          </button>
          <div className="mt-8 space-y-3">
            <Button icon={Check} onClick={markDone} className={isCurrentDone ? 'bg-emerald-600 opacity-90' : ''}>
              {isCurrentDone ? 'Wykonane ✓' : 'Oznacz jako wykonane'}
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={goPrev} disabled={currentIndex === 0}>
                Wstecz
              </Button>
              <Button variant="outline" className="flex-1" onClick={goNext}>
                {isLast ? 'Zakończ trening' : 'Następne'}
              </Button>
            </div>
          </div>
        </div>
        {issueModal.open && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/30" onClick={() => setIssueModal({ open: false, exerciseId: null, exerciseName: '' })}>
            <div className="bg-white rounded-t-3xl w-full max-w-[400px] p-6 pb-safe shadow-xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Zgłoś problem</p>
              <p className="text-slate-800 font-semibold mb-3">{issueModal.exerciseName}</p>
              <div className="mb-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Notatka (opcjonalnie)</label>
                <textarea rows={2} value={issueNote} onChange={e => setIssueNote(e.target.value)} placeholder="Dodatkowy opis..." className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-600" />
              </div>
              <div className="space-y-2 mb-4">
                {issueOptions.map(opt => (
                  <button key={opt.id} onClick={() => reportExerciseIssue(opt.id)} className="w-full text-left py-3 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-sm font-medium text-slate-800">
                    {opt.label}
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => setIssueModal({ open: false, exerciseId: null, exerciseName: '' })} className="w-full py-3 text-sm font-medium text-slate-500 hover:text-slate-700">
                Anuluj
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSessionFeedback = () => {
    const { workout, completedExerciseIds } = sessionState;
    const handleSubmit = (skipRating = false) => {
      const rating = skipRating ? null : feedbackState.rating;
      setCompletions(prev => [...prev, { workoutId: workout?.id, patientId: currentPatient?.id, completedAt: todayKey(), exerciseIdsCompleted: completedExerciseIds || [], feedback: { rating, note: feedbackState.note } }]);
      showSuccess('Trening ukończony', () => { setSessionState({ workout: null, plan: null, currentIndex: 0, completedExerciseIds: [] }); navigate('dashboard', 'home'); });
    };

    return (
      <div className="flex flex-col h-full bg-slate-50 pb-28 overflow-y-auto">
        <Header title="Feedback" onBack={() => navigate('session')} />
        <div className="p-6 space-y-6">
          <Card className="p-6 text-center border-none shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-emerald-600" size={32} strokeWidth={2.5} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Trening wykonany</h2>
            <p className="text-slate-500 text-sm mt-1">Jak oceniasz ten trening? Fizjoterapeuta zobaczy Twoją opinię.</p>
          </Card>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 ml-1">Poziom trudności</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'easy', label: 'Łatwy', desc: 'Bez problemu' },
                { id: 'ok', label: 'W sam raz', desc: 'Odpowiedni' },
                { id: 'hard', label: 'Trudny', desc: 'Wymagający' },
              ].map(r => (
                <button key={r.id} onClick={() => setFeedbackState(prev => ({ ...prev, rating: r.id }))} className={`p-4 rounded-2xl border-2 text-center transition-all ${feedbackState.rating === r.id ? 'border-emerald-600 bg-emerald-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                  <span className="block font-bold text-slate-900 text-sm">{r.label}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <Input label="Notatka dla fizjoterapeuty (opcjonalnie)" textarea placeholder="np. bolało kolano przy ćwiczeniu 3, czułem napięcie w barku..." value={feedbackState.note} onChange={e => setFeedbackState(prev => ({ ...prev, note: e.target.value }))} />
          </div>
          <div className="space-y-3 pt-2">
            <Button onClick={() => handleSubmit(false)}>Zapisz i zakończ</Button>
            <button onClick={() => handleSubmit(true)} className="w-full py-3 text-sm font-medium text-slate-500 hover:text-slate-700">Zakończ bez oceny</button>
          </div>
        </div>
      </div>
    );
  };

  const MONTH_NAMES = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

  const renderPatientCalendar = () => {
    if (!currentPatient || !currentPlan) return (
      <div className="flex flex-col h-full bg-slate-50 pb-24">
        <Header title="Kalendarz ćwiczeń" onBack={() => navigate('dashboard', 'calendar')} />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4"><Calendar className="text-slate-400" size={28} /></div>
          <p className="text-slate-600 font-medium">Brak aktywnego planu</p>
          <p className="text-slate-500 text-sm mt-1">Umów wizytę u fizjoterapeuty, aby dostać plan treningowy.</p>
          <Button variant="outline" className="w-fit mt-6" onClick={() => window.open(BOOKSY_URL, '_blank')}>Umów wizytę</Button>
        </div>
      </div>
    );
    const workoutsWithDates = getWorkoutsForPlan(currentPlan);
    const start = new Date(currentPlan.startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + currentPlan.durationWeeks * 7);
    const days = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) days.push(new Date(d));
    const getStatus = (dateStr) => {
      const w = workoutsWithDates.find(w => w.date === dateStr);
      if (!w) return 'none';
      const comp = completions.find(c => c.patientId === currentPatient.id && c.workoutId === w.id);
      if (comp) return 'done';
      return dateStr < todayKey() ? 'skipped' : 'planned';
    };
    const selectedWorkout = calendarSelectedDate ? workoutsWithDates.find(w => w.date === calendarSelectedDate) : null;
    const selectedStatus = calendarSelectedDate ? getStatus(calendarSelectedDate) : null;
    const selectedComp = selectedWorkout && selectedStatus === 'done' ? completions.find(c => c.patientId === currentPatient.id && c.workoutId === selectedWorkout.id) : null;

    return (
      <div className="flex flex-col h-full bg-slate-50 pb-24 overflow-y-auto">
        <Header title="Kalendarz ćwiczeń" onBack={() => navigate('dashboard', 'calendar')} />
        <div className="p-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Plan: {currentPlan.name}</p>
          <p className="text-slate-700 font-semibold">{MONTH_NAMES[start.getMonth()]} {start.getFullYear()}</p>
          <div className="grid grid-cols-7 gap-1.5 text-center mt-5">
            {['Nd','Pn','Wt','Śr','Cz','Pt','So'].map(d => <span key={d} className="text-[10px] font-bold text-slate-400 py-1">{d}</span>)}
            {days.map((d, i) => {
              const dateStr = d.toISOString().slice(0, 10);
              const status = getStatus(dateStr);
              const isSelected = calendarSelectedDate === dateStr;
              const isToday = dateStr === todayKey();
              return (
                <button key={i} onClick={() => setCalendarSelectedDate(dateStr)} className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-semibold transition-all
                  ${status === 'done' ? 'bg-emerald-500 text-white' : status === 'skipped' ? 'bg-slate-200 text-slate-600' : status === 'planned' ? 'bg-white border-2 border-slate-200 text-slate-800 hover:border-emerald-300' : 'bg-slate-50 text-slate-400'}
                  ${isSelected ? 'ring-2 ring-emerald-600 ring-offset-2' : ''} ${isToday ? 'border-emerald-500 border-2' : ''}`}>
                  {d.getDate()}
                </button>
              );
            })}
          </div>
          {calendarSelectedDate && (
            <Card className="mt-6 p-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">{calendarSelectedDate}</p>
              {selectedWorkout ? (
                <>
                  <h3 className="font-bold text-slate-900 text-lg">{selectedWorkout.name}</h3>
                  <p className="text-slate-500 text-sm mt-1">{(selectedWorkout.exerciseIds || []).length} ćwiczeń</p>
                  {selectedStatus === 'done' && (
                    <>
                      <div className="mt-3 flex items-center gap-2 text-emerald-700 font-medium text-sm">
                        <CheckCircle2 size={18} /> Wykonano
                        {selectedComp?.feedback?.rating && <span className="text-slate-500">· {selectedComp.feedback.rating === 'easy' ? 'Łatwy' : selectedComp.feedback.rating === 'hard' ? 'Trudny' : 'W sam raz'}</span>}
                      </div>
                      {(() => {
                        const issuesForWorkout = exerciseIssues.filter(i => i.patientId === currentPatient.id && i.workoutId === selectedWorkout.id);
                        if (issuesForWorkout.length === 0) return null;
                        return (
                          <div className="mt-2 pt-2 border-t border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Zgłoszone problemy</p>
                            {issuesForWorkout.map(i => {
                              const ex = MOCK_EXERCISES.find(e => e.id === i.exerciseId);
                              const typeLabel = i.issueType === 'pain' ? 'Ból' : i.issueType === 'difficult' ? 'Trudność' : 'Wykonanie';
                              return <p key={i.id} className="text-xs text-slate-600">{ex?.name}: {typeLabel}{i.issueNote ? ` – ${i.issueNote}` : ''}</p>;
                            })}
                          </div>
                        );
                      })()}
                    </>
                  )}
                  {selectedStatus === 'planned' && calendarSelectedDate === todayKey() && (
                    <Button className="mt-4" onClick={() => { setSessionState({ workout: selectedWorkout, plan: currentPlan, currentIndex: 0, completedExerciseIds: [] }); navigate('today_training'); }}>Rozpocznij trening</Button>
                  )}
                </>
              ) : (
                <p className="text-slate-500 text-sm">Brak treningu w tym dniu.</p>
              )}
            </Card>
          )}
          <div className="flex flex-wrap gap-4 mt-6 text-xs">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"/> Wykonane</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-200"/> Pominięte</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-white border-2 border-slate-200"/> Zaplanowane</span>
          </div>
        </div>
      </div>
    );
  };

  const renderPatientProgress = () => {
    if (!currentPatient) return null;
    const plan = currentPlan;
    const workoutsWithDates = plan ? getWorkoutsForPlan(plan) : [];
    const total = workoutsWithDates.length;
    const done = completions.filter(c => c.patientId === currentPatient.id).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const waterPct = waterGoal ? Math.min(100, Math.round((waterToday / waterGoal) * 100)) : 0;
    const activeDays = new Set(completions.filter(c => c.patientId === currentPatient.id).map(c => c.completedAt)).size;
    const streak = getConsecutiveActiveDays(currentPatient.id, completions);

    if (!plan) return (
      <div className="flex flex-col h-full bg-slate-50 pb-24">
        <Header title="Postępy" onBack={() => navigate('dashboard', 'progress')} />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5"><TrendingUp className="text-slate-400" size={36} /></div>
          <h3 className="text-lg font-bold text-slate-800">Brak aktywnego planu</h3>
          <p className="text-slate-500 text-sm mt-2 max-w-[260px]">Twoje postępy pojawią się tutaj, gdy fizjoterapeuta przypisze Ci plan treningowy.</p>
          <Button variant="outline" className="w-fit mt-6" onClick={() => window.open(BOOKSY_URL, '_blank')}>Umów wizytę</Button>
        </div>
      </div>
    );

    return (
      <div className="flex flex-col h-full bg-slate-50 pb-24 overflow-y-auto">
        <Header title="Postępy" onBack={() => navigate('dashboard', 'progress')} />
        <div className="p-6 space-y-5">
          <Card className="p-6 border-none shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Wykonanie planu</h3>
            <div className="flex items-end justify-between mb-3">
              <span className="text-4xl font-black text-slate-900">{pct}%</span>
              <span className="text-sm text-slate-500">{done} / {total} treningów</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-600 rounded-full transition-all" style={{ width: `${pct}%` }} /></div>
          </Card>
          {streak > 0 && (
            <Card className="p-4 border-none shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Regularność</h3>
              <p className="text-slate-700 font-medium">Aktywność: {streak} {streak === 1 ? 'dzień' : 'dni'} z rzędu</p>
            </Card>
          )}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Dni do końca</h3>
              <p className="text-3xl font-black text-emerald-700">{planDaysLeft}</p>
              <p className="text-slate-500 text-xs mt-1">planu</p>
            </Card>
            <Card className="p-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Dni aktywne</h3>
              <p className="text-3xl font-black text-slate-900">{activeDays}</p>
              <p className="text-slate-500 text-xs mt-1">z treningiem</p>
            </Card>
          </div>
          <Card className="p-6 border-none shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Droplets size={14} /> Nawodnienie dziś</h3>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl font-black text-slate-900">{waterToday}<span className="text-lg font-semibold text-slate-400">/{waterGoal}</span></span>
              <GlassWater size={24} className="text-sky-500 shrink-0" />
              <span className="text-sm text-slate-500">szklanka wody</span>
              <span className="text-sm text-slate-500 ml-auto">{waterPct}%</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-sky-400 rounded-full transition-all" style={{ width: `${waterPct}%` }} /></div>
          </Card>
        </div>
      </div>
    );
  };

  const renderPatientGeneral = () => {
    const program = selectedGeneralProgramId ? MOCK_TRENINGI_OGOLNOROZWOJOWE.find(p => p.id === selectedGeneralProgramId) : null;
    if (program) {
      const exercises = (program.exerciseIds || []).map(id => MOCK_EXERCISES.find(e => e.id === id)).filter(Boolean);
      return (
        <div className="flex flex-col h-full bg-slate-50 pb-24">
          <Header title={program.name} onBack={() => setSelectedGeneralProgramId(null)} />
          <div className="p-6 space-y-6 overflow-y-auto">
            <p className="text-slate-600 text-sm">{program.description}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ćwiczenia w programie ({exercises.length})</p>
            <ul className="space-y-2">
              {exercises.map((ex, i) => (
                <li key={ex.id} className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center shrink-0 text-xs">{i + 1}</span>
                  <span className="text-slate-800 font-medium">{ex.name}</span>
                  <span className="text-slate-400 text-xs ml-auto">{ex.duration}</span>
                </li>
              ))}
            </ul>
            <Button icon={Play} onClick={() => { setSessionState({ workout: { id: program.id, name: program.name, exerciseIds: program.exerciseIds }, plan: null, currentIndex: 0, completedExerciseIds: [] }); setSelectedGeneralProgramId(null); navigate('today_training'); }}>
              Rozpocznij trening
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col h-full bg-slate-50 pb-24">
        <div className="bg-white px-5 py-4 border-b border-slate-100 sticky top-0 z-30 pt-8">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">Treningi ogólnorozwojowe</h1>
          <p className="text-sm text-slate-500">Gotowe programy: trening nóg, zdrowy kręgosłup, super pośladki i inne.</p>
        </div>
        <div className="p-5 space-y-4 overflow-y-auto">
          {MOCK_TRENINGI_OGOLNOROZWOJOWE.map(prog => (
            <Card key={prog.id} onClick={() => setSelectedGeneralProgramId(prog.id)} className="p-0 overflow-hidden group">
              <div className="h-32 bg-gradient-to-br from-emerald-50 to-slate-100 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent z-10" />
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <h3 className="font-extrabold text-slate-900 text-lg leading-tight group-hover:text-emerald-700 transition-colors">{prog.name}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{prog.duration} · {(prog.exerciseIds || []).length} ćwiczeń</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-600">{prog.description}</p>
                <p className="text-emerald-700 text-sm font-bold mt-2 flex items-center gap-1">Rozpocznij <ChevronRight size={16} /></p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const formatShortDate = (dateStr) => {
    const d = new Date(dateStr + 'T12:00:00');
    const days = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];
    const months = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
  };

  const renderPatientExercises = () => {
    if (!currentPlan) return (
      <div className="flex flex-col h-full bg-slate-50 pb-20">
        <Header title="Przypisane ćwiczenia" onBack={() => navigate('dashboard', 'exercises')} />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4"><ClipboardList className="text-slate-400" size={28} /></div>
          <p className="text-slate-600 font-medium">Brak aktywnego planu</p>
          <p className="text-slate-500 text-sm mt-1">Twój fizjoterapeuta przypisze Ci plan treningowy.</p>
          <Button variant="outline" className="w-fit mt-4" onClick={() => window.open(BOOKSY_URL, '_blank')}>Umów wizytę</Button>
        </div>
      </div>
    );
    const planEx = currentPlan.planExercises || [];
    const assignedList = planEx.length > 0 ? planEx : (currentPlan.workouts || []).flatMap(w => (w.exerciseIds || []).map(id => ({ exerciseId: id, sets: 3, reps: 10 })));
    const uniqueByEx = assignedList.reduce((acc, item) => { const id = item.exerciseId; if (!acc.find(x => x.exerciseId === id)) acc.push(item); return acc; }, []);
    return (
      <div className="flex flex-col h-full bg-slate-50 pb-20">
        <div className="bg-white px-5 py-4 border-b border-slate-100 sticky top-0 z-30 pt-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">Przypisane ćwiczenia</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{currentPlan.name}</p>
          <p className="text-xs text-slate-400 mt-1">Koniec za {planDaysLeft} dni</p>
        </div>
        <div className="p-5 space-y-4 overflow-y-auto">
          {uniqueByEx.map((item) => {
            const ex = MOCK_EXERCISES.find(e => e.id === item.exerciseId);
            if (!ex) return null;
            return (
              <Card key={ex.id} onClick={() => { setSelectedExerciseId(ex.id); navigate('exercise_detail'); }} className="p-4 border-none shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 leading-tight">{ex.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{item.sets} serie × {item.reps} powtórzeń · {ex.duration}</p>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 shrink-0" />
                </div>
              </Card>
            );
          })}
          {uniqueByEx.length === 0 && (
            <p className="text-slate-500 text-sm text-center py-8">Brak przypisanych ćwiczeń w tym planie.</p>
          )}
        </div>
      </div>
    );
  };

  // --- WIDOKI GABINETU ---

  const renderClinicDashboard = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white/80 backdrop-blur-md px-6 py-5 sticky top-0 z-30 border-b border-slate-100 pt-8">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Panel gabinetu</p>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{clinics[0]?.name || 'Gabinet'}</h1>
      </div>
      <div className="p-6 pb-24 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.06)]" onClick={() => navigate('clinic_pt_list')}>
            <div className="flex justify-between items-start mb-2">
              <div className="p-2.5 bg-slate-100 rounded-xl"><Users size={20} className="text-slate-600" /></div>
              <span className="text-2xl font-extrabold text-slate-800">{physiotherapists.length}</span>
            </div>
            <p className="font-semibold text-slate-600 text-sm">Fizjoterapeuci</p>
          </Card>
          <Card className="p-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.06)]" onClick={() => navigate('clinic_patients')}>
            <div className="flex justify-between items-start mb-2">
              <div className="p-2.5 bg-emerald-50 rounded-xl"><User size={20} className="text-emerald-700" /></div>
              <span className="text-2xl font-extrabold text-slate-800">{patients.length}</span>
            </div>
            <p className="font-semibold text-slate-600 text-sm">Pacjenci</p>
          </Card>
        </div>
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Zespół</h2>
          <div className="space-y-2">
            {physiotherapists.slice(0, 3).map(pt => (
              <Card key={pt.id} className="flex items-center p-4 border-none shadow-[0_2px_10px_rgba(0,0,0,0.04)]" onClick={() => { setSelectedPTId(pt.id); navigate('clinic_pt_profile'); }}>
                <Avatar firstName={pt.firstName} lastName={pt.lastName} size="sm" />
                <div className="ml-3 flex-1">
                  <p className="font-bold text-slate-900">{pt.firstName} {pt.lastName}</p>
                  <p className="text-xs text-slate-500">{pt.specialization}</p>
                </div>
                <ChevronRight size={18} className="text-slate-400" />
              </Card>
            ))}
          </div>
        </section>
        <Button variant="outline" icon={Plus} onClick={() => navigate('clinic_add_pt')} className="border-2 border-slate-200">Dodaj fizjoterapeutę</Button>
      </div>
    </div>
  );

  const renderClinicPatients = () => {
    const patientWithPlan = (p) => getPlanForPatient(p.id, plans);
    return (
      <div className="flex flex-col h-full bg-slate-50">
        <Header title="Pacjenci" onBack={() => navigate('clinic_dashboard')} />
        <div className="p-5 pb-24 space-y-3">
          {patients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4"><Users className="text-slate-400" size={28} /></div>
              <p className="text-slate-600 font-medium">Brak pacjentów</p>
              <p className="text-slate-500 text-sm mt-1">Pacjenci są dodawani przez fizjoterapeutów.</p>
            </div>
          ) : (
            patients.map(p => {
              const plan = patientWithPlan(p);
              const done = completions.filter(c => c.patientId === p.id).length;
              const total = plan ? getWorkoutsForPlan(plan).length : 0;
              const pct = total ? Math.round((done / total) * 100) : 0;
              return (
                <Card key={p.id} className="p-4 border-none shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-3">
                    <Avatar firstName={p.firstName} lastName={p.lastName} />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 truncate">{p.firstName} {p.lastName}</p>
                      <p className="text-xs text-slate-500 truncate">{p.condition}</p>
                      {plan && <p className="text-xs text-emerald-600 font-semibold mt-1">{done}/{total} treningów · {pct}%</p>}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const renderClinicPTList = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white px-5 py-4 sticky top-0 z-30 border-b border-slate-100 pt-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Fizjoterapeuci</h1>
          <button onClick={() => navigate('clinic_add_pt')} className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center hover:bg-emerald-100 transition-colors">
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
      <div className="p-5 pb-24 space-y-3">
        {physiotherapists.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4"><Users className="text-slate-400" size={28} /></div>
            <p className="text-slate-600 font-medium">Brak fizjoterapeutów</p>
            <p className="text-slate-500 text-sm mt-1">Dodaj pierwszego do zespołu.</p>
            <Button variant="outline" className="w-fit mt-4" onClick={() => navigate('clinic_add_pt')}>Dodaj fizjoterapeutę</Button>
          </div>
        ) : (
          physiotherapists.map(pt => (
            <Card key={pt.id} className="p-4 flex items-center border-none shadow-[0_2px_10px_rgba(0,0,0,0.04)]" onClick={() => { setSelectedPTId(pt.id); navigate('clinic_pt_profile'); }}>
              <Avatar firstName={pt.firstName} lastName={pt.lastName} />
              <div className="ml-4 flex-1 min-w-0">
                <h3 className="font-bold text-slate-900">{pt.firstName} {pt.lastName}</h3>
                <p className="text-xs text-slate-500">{pt.specialization}</p>
                <p className="text-xs text-slate-400 mt-0.5">{patients.filter(p => p.ptId === pt.id).length} pacjentów</p>
              </div>
              <ChevronRight size={18} className="text-slate-400 shrink-0" />
            </Card>
          ))
        )}
      </div>
    </div>
  );

  const renderClinicAddPT = () => (
    <div className="flex flex-col h-full bg-white">
      <Header title="Dodaj fizjoterapeutę" onBack={() => navigate('clinic_dashboard')} />
      <div className="p-6 space-y-4">
        <Input label="Imię" placeholder="np. Jan" value={newPT.firstName} onChange={e => setNewPT({ ...newPT, firstName: e.target.value })} />
        <Input label="Nazwisko" placeholder="np. Kowalski" value={newPT.lastName} onChange={e => setNewPT({ ...newPT, lastName: e.target.value })} />
        <Input label="E-mail" type="email" placeholder="jan@rehab.pl" value={newPT.email} onChange={e => setNewPT({ ...newPT, email: e.target.value })} />
        <Input label="Telefon" type="tel" placeholder="+48 ..." value={newPT.phone} onChange={e => setNewPT({ ...newPT, phone: e.target.value })} />
        <Input label="Specjalizacja" placeholder="np. Fizjoterapia ortopedyczna" value={newPT.specialization} onChange={e => setNewPT({ ...newPT, specialization: e.target.value })} />
        <Input label="Notatka" textarea placeholder="Opcjonalnie" value={newPT.note} onChange={e => setNewPT({ ...newPT, note: e.target.value })} />
        <Button onClick={() => { setPhysiotherapists(prev => [...prev, { id: Math.max(0, ...physiotherapists.map(p => p.id)) + 1, clinicId: 1, ...newPT }]); showSuccess('Fizjoterapeuta dodany', () => { setNewPT({ firstName: '', lastName: '', email: '', phone: '', specialization: '', note: '' }); navigate('clinic_dashboard'); }); }}>Zapisz</Button>
      </div>
    </div>
  );

  const renderClinicPTProfile = () => {
    const pt = physiotherapists.find(p => p.id === selectedPTId);
    if (!pt) return null;
    const ptPatients = patients.filter(p => p.ptId === pt.id);
    return (
      <div className="flex flex-col h-full bg-slate-50 pb-20">
        <Header title="Profil" onBack={() => navigate('clinic_pt_list')} rightElement={<button onClick={() => navigate('clinic_add_pt')} className="text-emerald-700 text-sm font-bold">Edytuj</button>} />
        <div className="p-5">
          <div className="flex flex-col items-center mb-6">
            <Avatar firstName={pt.firstName} lastName={pt.lastName} size="lg" />
            <h2 className="text-xl font-bold text-slate-900 mt-3">{pt.firstName} {pt.lastName}</h2>
            <p className="text-sm text-slate-500">{pt.specialization}</p>
          </div>
          <Card className="p-4 mb-4">
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">E-mail</p>
            <p className="text-slate-900 font-medium">{pt.email}</p>
            <p className="text-xs text-slate-500 uppercase font-bold mt-3 mb-1">Telefon</p>
            <p className="text-slate-900 font-medium">{pt.phone}</p>
          </Card>
          <h3 className="text-sm font-bold text-slate-700 mb-2">Pacjenci ({ptPatients.length})</h3>
          <div className="space-y-2">
            {ptPatients.length === 0 ? <p className="text-slate-500 text-sm">Brak przypisanych pacjentów.</p> : ptPatients.slice(0, 5).map(p => (
              <Card key={p.id} className="p-3 flex items-center" onClick={() => { setSelectedPatientId(p.id); setRole('pt'); navigate('patient_profile', 'patients'); }}>
                <Avatar firstName={p.firstName} lastName={p.lastName} size="sm" />
                <span className="ml-3 font-medium text-slate-900">{p.firstName} {p.lastName}</span>
                <ChevronRight size={16} className="ml-auto text-slate-400" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const startDuplicatePlan = (plan) => {
    setCreatePlanData({
      patientId: plan.patientId,
      name: plan.name + ' (kopia)',
      durationWeeks: plan.durationWeeks,
      trainDays: plan.trainDays || [1, 3, 5],
      noteForPatient: plan.noteForPatient || '',
      waterGoalPortions: plan.waterGoalPortions ?? 8,
      planExercises: Array.isArray(plan.planExercises) && plan.planExercises.length ? plan.planExercises : (plan.workouts || []).flatMap(w => (w.exerciseIds || []).map(exId => ({ exerciseId: exId, sets: 3, reps: 10 }))).reduce((acc, item) => { if (!acc.find(x => x.exerciseId === item.exerciseId)) acc.push(item); return acc; }, []),
    });
    setDuplicatePlanSourceId(plan.id);
    setSelectedPatientId(plan.patientId);
    setSelectedPlanHistoryId(null);
    navigate('create_plan');
  };

  const renderPTPlanHistoryDetail = () => {
    const plan = plans.find(p => p.id === selectedPlanHistoryId);
    if (!plan || !selectedPatient) return null;
    const workoutsWithDates = getWorkoutsForPlan(plan);
    const doneCount = completions.filter(c => c.patientId === selectedPatient.id && plan.workouts?.some(w => w.id === c.workoutId)).length;
    const totalCount = workoutsWithDates.length;
    const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;
    const endDate = plan.startDate ? toDateKeyUtil(addDays(new Date(plan.startDate + 'T12:00:00'), plan.durationWeeks * 7)) : '';
    const planCompletions = completions.filter(c => c.patientId === selectedPatient.id && plan.workouts?.some(w => w.id === c.workoutId));
    const planIssues = exerciseIssues.filter(i => i.patientId === selectedPatient.id && i.planId === plan.id);
    return (
      <div className="flex flex-col h-full bg-slate-50 pb-24 overflow-y-auto">
        <Header title={plan.name} onBack={() => { setSelectedPlanHistoryId(null); setScreen('patient_profile'); }} />
        <div className="p-6 space-y-5">
          <Button variant="outline" onClick={() => startDuplicatePlan(plan)} className="border-emerald-200 text-emerald-700">Duplikuj plan i edytuj</Button>
          <Card className="p-5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Okres i realizacja</p>
            <p className="text-slate-800 font-semibold">{plan.startDate} – {endDate}</p>
            <p className="text-2xl font-black text-slate-900 mt-2">{pct}%</p>
            <p className="text-slate-500 text-sm">{doneCount} / {totalCount} treningów</p>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-2"><div className="h-full bg-emerald-600 rounded-full" style={{ width: `${pct}%` }} /></div>
          </Card>
          {plan.planExercises?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 px-1">Ćwiczenia w planie</p>
              <div className="space-y-1">
                {plan.planExercises.slice(0, 8).map((item, idx) => {
                  const ex = MOCK_EXERCISES.find(e => e.id === item.exerciseId);
                  return ex ? <div key={idx} className="py-2 px-3 bg-white rounded-xl border border-slate-100 text-sm text-slate-800">{ex.name} · {item.sets}×{item.reps}</div> : null;
                })}
              </div>
            </div>
          )}
          {planCompletions.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 px-1">Feedback z treningów</p>
              <div className="space-y-2">
                {planCompletions.slice(-3).reverse().map(c => (
                  <Card key={c.workoutId + c.completedAt} className="p-3">
                    <p className="text-xs text-slate-500">{c.completedAt}</p>
                    <p className="text-sm text-slate-800">{c.feedback?.rating === 'easy' ? 'Łatwy' : c.feedback?.rating === 'hard' ? 'Trudny' : 'W sam raz'}{c.feedback?.note ? ` · ${c.feedback.note}` : ''}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {planIssues.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 px-1">Problematyczne ćwiczenia (w tym planie)</p>
              <div className="space-y-2">
                {planIssues.map(i => {
                  const ex = MOCK_EXERCISES.find(e => e.id === i.exerciseId);
                  const typeLabel = i.issueType === 'pain' ? 'Ból' : i.issueType === 'difficult' ? 'Trudność' : 'Wykonanie';
                  return <Card key={i.id} className="p-3 border-l-4 border-l-amber-200"><p className="text-sm font-semibold text-slate-800">{ex?.name}</p><p className="text-xs text-slate-500">{typeLabel} · {i.reportedAt}</p></Card>;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPlanHistoryDetail = () => {
    const plan = plans.find(p => p.id === selectedPlanHistoryId);
    if (!plan || !currentPatient) return null;
    const workoutsWithDates = getWorkoutsForPlan(plan);
    const doneCount = completions.filter(c => c.patientId === currentPatient.id && plan.workouts?.some(w => w.id === c.workoutId)).length;
    const totalCount = workoutsWithDates.length;
    const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;
    const endDate = plan.startDate ? toDateKeyUtil(addDays(new Date(plan.startDate + 'T12:00:00'), plan.durationWeeks * 7)) : '';
    return (
      <div className="flex flex-col h-full bg-slate-50 pb-24">
        <Header title={plan.name} onBack={() => { setSelectedPlanHistoryId(null); setScreen('profile'); }} />
        <div className="p-6 space-y-5">
          <Card className="p-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Okres</p>
            <p className="text-slate-800 font-semibold">{plan.startDate} – {endDate}</p>
            <p className="text-slate-500 text-sm mt-1">{plan.durationWeeks} tygodni · {plan.workoutsPerWeek} treningów/tydz.</p>
          </Card>
          <Card className="p-5 border-none shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Realizacja</p>
            <p className="text-2xl font-black text-slate-900">{pct}%</p>
            <p className="text-slate-500 text-sm mt-1">{doneCount} / {totalCount} treningów wykonanych</p>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-2"><div className="h-full bg-emerald-600 rounded-full" style={{ width: `${pct}%` }} /></div>
          </Card>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 px-1">Treningi w planie</p>
            <div className="space-y-2">
              {workoutsWithDates.slice(0, 10).map(w => (
                <div key={w.id} className="flex items-center justify-between py-2 px-3 bg-white rounded-xl border border-slate-100">
                  <span className="font-medium text-slate-800 text-sm">{w.name}</span>
                  <span className="text-xs text-slate-500">{(w.exerciseIds || []).length} ćwiczeń</span>
                </div>
              ))}
              {workoutsWithDates.length > 10 && <p className="text-xs text-slate-400 px-1">+{workoutsWithDates.length - 10} kolejnych</p>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProfileSettings = () => (
    <div className="flex flex-col h-full bg-slate-50 pb-20 overflow-y-auto">
       <Header title="Ustawienia konta" />
       
       <div className="p-6">
         <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col items-center mb-8">
            <Avatar firstName={role === 'pt' ? 'Piotr' : role === 'clinic' ? 'Gabinet' : currentPatient?.firstName || 'User'} lastName={role === 'pt' ? 'Błędowski' : role === 'clinic' ? '' : currentPatient?.lastName || ''} size="lg" />
            <h2 className="text-xl font-extrabold text-slate-900 mt-4 tracking-tight">
              {role === 'pt' ? 'mgr Piotr Błędowski' : role === 'clinic' ? (clinics[0]?.name || 'Gabinet') : `${currentPatient?.firstName} ${currentPatient?.lastName}`}
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">{role === 'pt' ? 'Fizjoterapeuta' : role === 'clinic' ? 'Konto gabinetu' : currentPatient?.email}</p>
         </div>

         {role === 'patient' && (
           <Card className="flex items-center justify-between p-4 mb-4 cursor-pointer hover:bg-slate-50" onClick={() => window.open(BOOKSY_URL, '_blank')}>
             <div className="flex items-center gap-4 text-slate-700">
               <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700"><Calendar size={20} /></div>
               <span className="font-bold text-[15px]">Umów wizytę (Booksy)</span>
             </div>
             <ChevronRight size={18} className="text-slate-300" />
           </Card>
         )}

         {role === 'patient' && (() => {
           const allPlans = currentPatient ? getPlansForPatient(currentPatient.id, plans) : [];
           const active = allPlans.find(p => p.status === 'active') || allPlans[0];
           const previous = allPlans.filter(p => p.id !== active?.id);
           const doneCount = currentPatient ? completions.filter(c => c.patientId === currentPatient.id).length : 0;
           const totalCount = active ? getWorkoutsForPlan(active).length : 0;
           const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;
           return (
             <div className="mb-6">
               <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-3">Plany</h3>
               {active && (
                 <Card className="p-4 mb-3 border-l-4 border-l-emerald-500">
                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Aktualny plan</p>
                   <p className="font-bold text-slate-900">{active.name}</p>
                   <p className="text-xs text-slate-500 mt-1">Koniec za {active ? daysLeftInPlan(active) : 0} dni · Realizacja {pct}% ({doneCount}/{totalCount})</p>
                 </Card>
               )}
               {previous.length > 0 && (
                 <>
                   <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-2">Poprzednie plany</p>
                   <div className="space-y-2">
                     {previous.map(plan => {
                       const planDone = currentPatient ? completions.filter(c => c.patientId === currentPatient.id && plan.workouts?.some(w => w.id === c.workoutId)).length : 0;
                       const planTotal = plan.workouts?.length || 0;
                       const planPct = planTotal ? Math.round((planDone / planTotal) * 100) : 0;
                       const endDate = plan.startDate ? toDateKeyUtil(addDays(new Date(plan.startDate + 'T12:00:00'), plan.durationWeeks * 7)) : '';
                       return (
                         <Card key={plan.id} onClick={() => { setSelectedPlanHistoryId(plan.id); setScreen('plan_history_detail'); }} className="p-4 flex items-center justify-between">
                           <div>
                             <p className="font-semibold text-slate-900 text-sm">{plan.name}</p>
                             <p className="text-xs text-slate-500">{plan.startDate} – {endDate} · {planPct}%</p>
                           </div>
                           <ChevronRight size={18} className="text-slate-400" />
                         </Card>
                       );
                     })}
                   </div>
                 </>
               )}
             </div>
           );
         })()}

         <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest px-2 mb-2">Konto</h3>
            <Card className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50">
              <div className="flex items-center gap-4 text-slate-700">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><User size={20} /></div>
                <span className="font-bold text-[15px]">Dane osobowe</span>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </Card>
            <Card className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50">
              <div className="flex items-center gap-4 text-slate-700">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><Bell size={20} /></div>
                <span className="font-bold text-[15px]">Powiadomienia</span>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </Card>
            
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest px-2 mt-8 mb-2">Aplikacja</h3>
            <Card className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50">
              <div className="flex items-center gap-4 text-slate-700">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><Info size={20} /></div>
                <span className="font-bold text-[15px]">O programie RehaPlaner</span>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </Card>
            
            <div className="pt-6">
              <Button onClick={() => { simulateLoading(() => { setRole(null); navigate('auth_choice'); }); }} variant="danger" icon={LogOut} className="shadow-none">
                Wyloguj się
              </Button>
            </div>
         </div>
       </div>
    </div>
  );

  // --- NAWIGACJA DOLNA ---

  const renderBottomNav = () => {
    if (!role) return null;
    const hiddenScreens = ['splash', 'landing', 'onboarding', 'auth_choice', 'login_pt', 'login_patient', 'login_clinic', 'success', 'assign_exercise_1', 'assign_exercise_2', 'today_training', 'session', 'session_feedback', 'create_plan', 'clinic_add_pt', 'clinic_pt_profile', 'clinic_patients', 'plan_history_detail', 'pt_plan_history_detail'];
    if (hiddenScreens.includes(screen)) return null;

    const navItemsPT = [
      { id: 'home', icon: Home, label: 'Start', screen: 'dashboard' },
      { id: 'patients', icon: Users, label: 'Pacjenci', screen: 'patients' },
      { id: 'library', icon: Search, label: 'Baza', screen: 'library' },
      { id: 'profile', icon: Settings, label: 'Profil', screen: 'profile' },
    ];

    const navItemsPatient = [
      { id: 'home', icon: Home, label: 'Start', screen: 'dashboard' },
      { id: 'exercises', icon: Activity, label: 'Plan', screen: 'dashboard' },
      { id: 'general', icon: HeartPulse, label: 'Ogólnorozwojowe', screen: 'patient_general' },
      { id: 'calendar', icon: Calendar, label: 'Kalendarz', screen: 'calendar' },
      { id: 'progress', icon: TrendingUp, label: 'Postępy', screen: 'progress' },
      { id: 'profile', icon: Settings, label: 'Profil', screen: 'profile' },
    ];

    const navItemsClinic = [
      { id: 'home', icon: Home, label: 'Start', screen: 'clinic_dashboard' },
      { id: 'therapists', icon: Users, label: 'Zespół', screen: 'clinic_pt_list' },
      { id: 'profile', icon: Settings, label: 'Profil', screen: 'profile' },
    ];

    const items = role === 'clinic' ? navItemsClinic : (role === 'pt' ? navItemsPT : navItemsPatient);

    const isPatient = role === 'patient';
    return (
      <div className={`absolute bottom-0 w-full bg-white border-t border-slate-100 py-4 pb-safe z-50 rounded-b-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.03)] ${isPatient ? 'px-2' : 'px-6'}`}>
        <div className={`flex items-center z-50 ${isPatient ? 'grid grid-cols-6 gap-0 w-full' : 'justify-between'}`}>
          {items.map(item => {
            const detailScreens = ['patient_profile', 'add_patient', 'edit_patient', 'assign_exercise_1', 'assign_exercise_2', 'exercise_detail', 'today_training', 'session', 'session_feedback', 'calendar', 'progress', 'create_plan', 'clinic_add_pt', 'clinic_pt_profile', 'clinic_patients'];
            const isActive = activeTab === item.id && !detailScreens.includes(screen);
            const Icon = item.icon;
            return (
              <button 
                key={item.id} 
                onClick={() => navigate(item.screen, item.id)}
                className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 min-w-0 ${isPatient ? 'flex-1 py-1' : ''} ${isActive ? 'text-emerald-700 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <div className="relative shrink-0">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[9px] font-bold tracking-wide transition-opacity truncate w-full text-center ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // --- RENDER GŁÓWNY ---

  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center p-4 font-sans antialiased text-slate-900 selection:bg-emerald-100">
      {/* Symulacja ramki telefonu z dynamic island mock */}
      <div className="w-full max-w-[400px] h-[850px] max-h-[95vh] bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative overflow-hidden ring-[12px] ring-slate-900 flex flex-col">
        
        {/* Status bar mock (minimalistyczny, nie zasłania treści) */}
        <div className="h-7 w-full bg-transparent absolute top-0 z-50 flex justify-between items-center px-6 pt-2 pointer-events-none">
           <span className="text-[11px] font-bold text-slate-900/60 mt-1">12:49</span>
           <div className="w-28 h-6 bg-black rounded-full mt-1 opacity-90 backdrop-blur-md"></div>
           <div className="flex gap-1.5 mt-1 opacity-60">
             <div className="w-4 h-3 rounded-sm border-2 border-slate-900/80"></div>
           </div>
        </div>

        {/* Zawartość ekranów */}
        <div className="flex-1 overflow-hidden relative bg-white">
          {screen === 'landing' && renderLanding()}
          {screen === 'splash' && renderSplash()}
          {screen === 'onboarding' && renderOnboarding()}
          {screen === 'auth_choice' && renderAuthChoice()}
          {screen === 'login_pt' && renderLogin('pt')}
          {screen === 'login_patient' && renderLogin('patient')}
          {screen === 'login_clinic' && renderLogin('clinic')}
          {screen === 'success' && renderSuccess()}
          
          {/* PT Screens */}
          {role === 'pt' && screen === 'dashboard' && activeTab === 'home' && renderPTDashboard()}
          {role === 'pt' && (screen === 'patients' || activeTab === 'patients') && screen !== 'patient_profile' && screen !== 'add_patient' && screen !== 'edit_patient' && screen !== 'assign_exercise_1' && screen !== 'assign_exercise_2' && renderPatientList()}
          {role === 'pt' && screen === 'patient_profile' && renderPatientProfilePT()}
          {role === 'pt' && screen === 'add_patient' && renderPatientForm(false)}
          {role === 'pt' && screen === 'edit_patient' && renderPatientForm(true)}
          {role === 'pt' && screen === 'assign_exercise_1' && renderAssignFlow1()}
          {role === 'pt' && screen === 'assign_exercise_2' && renderAssignFlow2()}
          {role === 'pt' && screen === 'create_plan' && renderCreatePlan()}
          
          {/* Patient Screens */}
          {role === 'patient' && screen === 'dashboard' && activeTab === 'home' && renderPatientHome()}
          {role === 'patient' && screen === 'dashboard' && activeTab === 'exercises' && renderPatientExercises()}
          {role === 'patient' && screen === 'today_training' && renderTodayTraining()}
          {role === 'patient' && screen === 'session' && renderSession()}
          {role === 'patient' && screen === 'session_feedback' && renderSessionFeedback()}
          {role === 'patient' && (screen === 'calendar' || activeTab === 'calendar') && renderPatientCalendar()}
          {role === 'patient' && (screen === 'progress' || activeTab === 'progress') && renderPatientProgress()}
          {role === 'patient' && (screen === 'patient_general' || activeTab === 'general') && renderPatientGeneral()}
          {role === 'patient' && screen === 'plan_history_detail' && renderPlanHistoryDetail()}
          {role === 'pt' && screen === 'pt_plan_history_detail' && renderPTPlanHistoryDetail()}
          
          {/* Clinic Screens */}
          {role === 'clinic' && screen === 'clinic_dashboard' && renderClinicDashboard()}
          {role === 'clinic' && (screen === 'clinic_pt_list' || activeTab === 'therapists') && renderClinicPTList()}
          {role === 'clinic' && screen === 'clinic_patients' && renderClinicPatients()}
          {role === 'clinic' && screen === 'clinic_add_pt' && renderClinicAddPT()}
          {role === 'clinic' && screen === 'clinic_pt_profile' && renderClinicPTProfile()}
          
          {/* Shared Screens */}
          {screen === 'library' && role !== 'patient' && renderLibrary()}
          {screen === 'exercise_detail' && renderExerciseDetail()}
          {screen === 'profile' && renderProfileSettings()}
        </div>

        {renderBottomNav()}
      </div>
    </div>
  );
}
