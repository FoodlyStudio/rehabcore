# RehaPlaner – dokumentacja aplikacji

## Czym jest aplikacja

RehaPlaner to prototyp mobilnej aplikacji dla fizjoterapeutów i gabinetów rehabilitacyjnych. Umożliwia tworzenie planów ćwiczeń, przypisywanie ich do pacjentów oraz śledzenie realizacji. Aplikacja działa jako React web-app, wyglądem i zachowaniem imitując natywną aplikację mobilną (pełen ekran, nawigacja po zakładkach, splash screen).

Całość napisana w **React + Vite**, stylowana **Tailwind CSS**, ikony z **Lucide React**, routing z **React Router DOM**.

Dane są w pełni mockowe (brak backendu, brak bazy danych) – wszystko żyje w pamięci przeglądarki, po odświeżeniu wraca do stanu domyślnego.

---

## Adresy

| Środowisko | URL |
|---|---|
| Produkcja (Vercel) | https://apka-fizjo.vercel.app |
| Landing page | `/` |
| Demo aplikacji | `/demo` |

---

## Struktura projektu

```
src/
├── main.jsx              # Entry point
├── AppRouter.jsx         # Routing: / → LandingPage, /demo → App
├── App.jsx               # Cała logika i widoki aplikacji (~2500 linii)
├── mockData.js           # Dane demo, helpery dat, funkcje obliczeniowe
├── index.css             # Globalne style, animacje CSS
└── landing/
    ├── LandingPage.jsx   # Kompozycja landing page
    ├── Header.jsx        # Nagłówek z nawigacją (sticky)
    ├── PhoneMockup.jsx   # Graficzny mockup telefonu w sekcji Hero
    ├── AppStoreBadges.jsx# Przyciski Google Play / App Store (placeholdery)
    └── sections/
        ├── Hero.jsx      # Główny baner – CTA + phone mockup
        ├── ForWho.jsx    # Dla kogo jest aplikacja
        ├── Problem.jsx   # Problem który rozwiązuje
        ├── Solution.jsx  # Jak to rozwiązuje
        ├── HowItWorks.jsx# Kroki: jak działa
        ├── Features.jsx  # Lista funkcji (PT vs Pacjent)
        ├── Benefits.jsx  # Korzyści
        ├── Preview.jsx   # Podgląd aplikacji (Android/iOS)
        ├── Pricing.jsx   # Plany cenowe: Solo / Team / Clinic
        ├── FAQ.jsx       # Najczęstsze pytania (accordion)
        └── FinalCTA.jsx  # Końcowe wezwanie do działania (email demo)
```

---

## Landing page (`/`)

Jednokolumnowa strona marketingowa, sekcje od góry:

1. **Header** – sticky, logo RehaPlaner, linki do sekcji, przycisk „Umów demo"
2. **Hero** – nagłówek, opis, dwa CTA (Umów demo / Zobacz demo → `/demo`), phone mockup, badges App Store / Google Play
3. **ForWho** – dla kogo: samodzielny PT, gabinet, klinika
4. **Problem** – problem: brak kontroli między wizytami
5. **Solution** – rozwiązanie: plan ćwiczeń w telefonie
6. **HowItWorks** – 3 kroki: stwórz plan → pacjent ćwiczy → PT widzi wyniki
7. **Features** – dwie kolumny: funkcje dla PT + funkcje dla pacjenta
8. **Benefits** – benefity: oszczędność czasu, zaangażowanie pacjenta
9. **Preview** – „tak wygląda na Android i iOS"
10. **Pricing** – 3 pakiety: Solo / Team / Clinic (ceny ustalane indywidualnie, kontakt)
11. **FAQ** – 6 pytań (accordion `<details>`)
12. **FinalCTA** – przycisk „Umów demo" → mailto na studiofood007@gmail.com
13. **Footer** – logo, badges, copyright

---

## Demo aplikacji (`/demo`)

### Uruchomienie

Po wejściu na `/demo` wyświetla się ekran powitalny → splash screen → onboarding → wybór roli → logowanie → dashboard.

### Role użytkownika

Aplikacja obsługuje **3 role**, każda prowadzi do innego dashboardu:

| Rola | Opis |
|---|---|
| Fizjoterapeuta (PT) | Zarządza pacjentami, tworzy plany, śledzi postępy |
| Pacjent | Widzi swój dzisiejszy trening, odklikuje ćwiczenia, podaje feedback |
| Gabinet | Widzi listę fizjoterapeutów, zarządza zespołem |

Logowanie jest symulowane (jeden klik bez hasła) – demo celowo nie wymaga uwierzytelniania.

---

## Widoki – fizjoterapeuta (PT)

### Dashboard PT
- Kafelki: liczba aktywnych pacjentów + liczba ćwiczeń w bazie
- Sekcja „Ostatni pacjenci" (3 ostatnich z paska postępu)
- Szybkie akcje: Dodaj pacjenta / Utwórz plan

### Lista pacjentów
- Wyszukiwarka live (filtr po imieniu/nazwisku)
- Każda karta: imię, dolegliwość, status (Nowy / Aktywny plan / Wymaga uwagi), realizacja planu (%), data ostatniego treningu, czy zgłoszono problem przy ćwiczeniu

### Profil pacjenta (PT)
- Awatar z inicjałami, dane, notatka prywatna
- Pasek realizacji aktywnego planu (x/y treningów, %)
- Nawodnienie dziś (x/y porcji)
- Ostatni feedback pacjenta (ocena + notatka)
- Historia planów – zamknięte plany z realizacją
- Problematyczne ćwiczenia – zgłoszone przez pacjenta (typ: ból / trudność)
- Przypisane ćwiczenia (lista z seriami/powtórzeniami)
- Przycisk „Przypisz ćwiczenia" i „Edytuj"

### Przypisywanie ćwiczeń (2 kroki)
- Krok 1: wielokrotny wybór ćwiczeń z bazy (z checkboxami), wyszukiwarka
- Krok 2: globalne parametry dla wybranych ćwiczeń (serie, powtórzenia, częstotliwość: codziennie / 2x dziennie / co 2 dni / tylko w weekendy)

### Tworzenie planu
- Wybór pacjenta z listy
- Opcjonalnie: duplikacja istniejącego planu jako bazy (kopia z sufiksem „kopia")
- Nazwa planu, czas trwania (1–4 tygodnie), dni treningowe (wybór z kalendarza tygodniowego)
- Dodawanie ćwiczeń do planu z seriami i powtórzeniami
- Notatka dla pacjenta
- Cel nawodnienia (porcje/dzień)
- Zapis: aplikacja generuje automatycznie harmonogram treningów (treningi rozłożone na wybrane dni tygodnia, ćwiczenia rozdzielone między treningi)

### Baza ćwiczeń (biblioteka)
- Filtrowanie po kategorii: Wszystkie / Kończyna dolna / Kończyna górna / Bark / Plecy / Klatka piersiowa / Core / Kolano / Biodro / Kostka / Szyja / FBW / Mobilizacja / Wzmacnianie
- Wyszukiwarka po nazwie
- Karty ćwiczeń z miniaturą wideo (hover = autoodtwarzanie) i badge `▶ WIDEO` dla ćwiczeń z nagraniem
- Szczegóły ćwiczenia: odtwarzacz wideo (lub placeholder), opis, instrukcja krok po kroku, obszar ciała, trudność, czas

### Widok gabinetu (rola PT)
- Lista fizjoterapeutów w gabinecie
- Dane: specjalizacja, email, telefon, notatka
- Dodawanie nowego fizjoterapeuty (formularz)
- Link Booksy (placeholder URL)

---

## Widoki – pacjent

### Dashboard pacjenta (Home)
- Powitanie z imieniem
- Widget „Dzisiaj": trening lub komunikat „Dziś dzień odpoczynku"
- Widget nawodnienia: porcje / cel (klikalny – otwiera modal)
- Streak (dni aktywności z rzędu)
- Pozostałe dni planu

### Dzisiejszy trening (sesja treningowa)
- Widok ćwiczenia po ćwiczeniu: nazwa, instrukcja, obszar ciała, trudność
- Placeholder wideo z czasem trwania
- Przycisk „Zrobione" – odkliknięcie ćwiczenia, przejście do kolejnego
- Możliwość zgłoszenia problemu przy ćwiczeniu (modal: typ ból/trudność/inne + notatka opcjonalna)
- Po ostatnim ćwiczeniu: ekran feedback (ocena łatwy/w sam raz/trudny + pole notatki) → zapis completion

### Kalendarz (pacjent)
- Widok tygodniowy lub miesięczny
- Oznaczone dni: trening zrobiony (zielony), trening zaplanowany, dzień odpoczynku
- Kliknięcie dnia → lista ćwiczeń z tego treningu

### Postępy (pacjent)
- Pasek realizacji planu (%)
- Streak aktywności
- Historia ukończonych treningów z feedbackiem

### Nawodnienie (modal / zakładka)
- Cel porcji ustawiony przez PT w planie
- Klikalny tracker – kliknięcie dodaje 1 porcję
- Zapisuje wpis na dziś

---

## Widoki – gabinet

### Dashboard gabinetu
- Lista fizjoterapeutów (karty z danymi)
- Możliwość dodania nowego fizjoterapeuty
- Widok profilu fizjoterapeuty (edycja, dane kontaktowe)

---

## Dane demo (mockData.js)

### Pacjenci (5 osób)
| ID | Imię | Dolegliwość |
|---|---|---|
| 101 | Anna Kowalska | Ból odcinka lędźwiowego |
| 102 | Michał Nowak | Rehabilitacja kolana po ACL |
| 103 | Karolina Wiśniewska | Ból barku |
| 104 | Tomasz Zieliński | Skręcenie stawu skokowego |
| 105 | Magdalena Dąbrowska | Wypuklina C5/C6 |

### Plany (5 planów)
| ID | Pacjent | Nazwa | Status |
|---|---|---|---|
| 1 | Anna (101) | Plan stabilizacji lędźwi | Aktywny |
| 2 | Anna (101) | Stabilizacja lędźwi – 3 tygodnie | Zakończony |
| 3 | Michał (102) | Powrót po ACL | Aktywny |
| 4 | Karolina (103) | Mobilizacja barku | Aktywny |
| 5 | Tomasz (104) | Rehabilitacja kostki | Aktywny |

### Baza ćwiczeń (~152 ćwiczeń)
- 15 rehabilitacyjnych bazowych (`MOCK_EXERCISES_BASE` w App.jsx, ID 1–15)
- 10 ogólnorozwojowych (`MOCK_EXERCISES_OGOLNOROZWOJOWE` w mockData.js, ID 101–110)
- 127 ćwiczeń z wideo (`MOCK_EXERCISES_VIDEOS` w exercisesDatabase.js, ID 200–1106)

Połączone w App.jsx: `const MOCK_EXERCISES = [...MOCK_EXERCISES_BASE, ...MOCK_EXERCISES_OGOLNOROZWOJOWE, ...MOCK_EXERCISES_VIDEOS]`

#### Zakresy ID w exercisesDatabase.js
| Zakres ID | Kategoria | Folder wideo |
|---|---|---|
| 200–215 | FBW (Full Body Workout) | `/videos/FBW/` |
| 300–305 | Klatka piersiowa | `/videos/klatka-piersiowa/` |
| 400–449 | Kończyna dolna | `/videos/konczyna-dolna/` |
| 500–514 | Kończyna górna – barki | `/videos/konczyna-gorna-barki/` |
| 600–603 | Kończyna górna – biceps | `/videos/konczyna-gorna-biceps/` |
| 700–705 | Kończyna górna – przedramię | `/videos/konczyna-gorna-przedramie/` |
| 800–803 | Kończyna górna – triceps | `/videos/konczyna-gorna-triceps/` |
| 900–911 | Plecy – odcinek szyjny (C) | `/videos/plecy-C/` |
| 1000–1006 | Plecy – odcinek lędźwiowy (LS) | `/videos/plecy-LS/` |
| 1100–1106 | Plecy – odcinek piersiowy (TH) | `/videos/plecy-TH/` |

### Kategorie ćwiczeń
Mobilizacja / Stabilizacja / Wzmacnianie / Rozciąganie / Trening ogólnorozwojowy  
Filtry w bibliotece PT: Wszystkie / Kończyna dolna / Kończyna górna / Bark / Plecy / Klatka piersiowa / Core / Kolano / Biodro / Kostka / Szyja / FBW / Mobilizacja / Wzmacnianie

### Przykładowe completion records
16 ukończonych treningów różnych pacjentów, z ocenami i notatkami.

### Zgłoszenia problemów
2 przykładowe: ból przy Bird Dog, trudność przy Dead Bug.

### Nawodnienie
Wpisy dla 4 pacjentów na dziś.

---

## Helpery obliczeniowe (mockData.js)

| Funkcja | Co robi |
|---|---|
| `getPlanForPatient` | Zwraca aktywny plan pacjenta |
| `getPlansForPatient` | Zwraca wszystkie plany pacjenta (posortowane) |
| `getWorkoutsForPlan` | Oblicza daty treningów na podstawie startDate + dayIndex |
| `getTodayWorkoutForPatient` | Zwraca trening na dziś |
| `getCompletionRateForPlan` | % wykonania planu |
| `getConsecutiveActiveDays` | Streak (dni aktywności z rzędu) |
| `getLastWorkoutAt` | Data ostatniego treningu |
| `getActivityStatusLabel` | Etykieta aktywności: „Ćwiczy regularnie" / „Brak treningu od kilku dni" itp. |
| `getWaterForPatientToday` | Porcje nawodnienia na dziś |
| `daysLeftInPlan` | Ile dni zostało w planie |
| `isPlanEnded` | Czy plan się skończył |

---

## Stany aplikacji (App.jsx)

Cały stan aplikacji to React useState w komponencie `App`:

- `role` – aktywna rola (`pt` / `patient` / `clinic`)
- `screen` – aktywny widok (np. `dashboard`, `patient_profile`, `create_plan`, `workout_session`)
- `activeTab` – aktywna zakładka nawigacji dolnej
- `patients` – lista pacjentów (modyfikowalna w demo)
- `plans` – lista planów (modyfikowalna)
- `completions` – historia ukończonych treningów
- `exerciseIssues` – zgłoszenia problemów
- `waterLogs` – dziennik nawodnienia
- `physiotherapists` – lista fizjoterapeutów
- `sessionState` – stan aktywnej sesji treningowej (bieżące ćwiczenie, odkliknięte)
- `feedbackState` – ocena i notatka po treningu
- `assignFlowData` – dane formularza przypisywania ćwiczeń
- `createPlanData` – dane formularza tworzenia planu

---

## Co jest zrobione (demo)

- [x] Landing page z pełną treścią marketingową
- [x] Routing landing / demo
- [x] Splash screen + onboarding 3-krokowy
- [x] Wybór roli (PT / Pacjent / Gabinet) + symulowane logowanie
- [x] Dashboard PT z kafelkami i listą pacjentów
- [x] Lista pacjentów z wyszukiwarką i statusami aktywności
- [x] Profil pacjenta (PT): realizacja, nawodnienie, historia planów, zgłoszenia problemów
- [x] Przypisywanie ćwiczeń (2-krokowy flow)
- [x] Tworzenie planu z harmonogramem, duplikacja planu
- [x] Baza ćwiczeń z filtrowaniem i szczegółami
- [x] Panel gabinetu: lista PT, dodawanie PT
- [x] Dashboard pacjenta: dzisiejszy trening, nawodnienie, streak
- [x] Sesja treningowa: step-by-step, odklikiwanie, zgłaszanie problemów
- [x] Feedback po treningu (ocena + notatka)
- [x] Kalendarz pacjenta
- [x] Widok postępów pacjenta
- [x] Tracker nawodnienia
- [x] Animacje CSS (fade-in, float, gradient-pulse)
- [x] Wdrożenie na Vercel (https://apka-fizjo.vercel.app)
- [x] Baza wideo ~136 nagrań ćwiczeń (symlinki, komponent ExerciseVideo)
- [x] Podgląd wideo w bibliotece ćwiczeń (hover preview + badge ▶ WIDEO)
- [x] Rozszerzona baza ćwiczeń do 152 wpisów

---

## System wideo

### Pliki źródłowe
Nagrania (~2,2 GB) przechowywane lokalnie na Desktopie w folderach z polskimi nazwami:
```
FBW/
klatka piersiowa/
kończyna dolna/
kończyna górna/
  barki/
  biceps/
  przedramie/
  triceps/
plecy/
  C/
  LS/
  TH/
```

### Symlinki w public/videos/
Zamiast kopiowania plików (2,2 GB), w `public/videos/` stworzono symlinki do oryginalnych folderów:

| Symlink | Cel |
|---|---|
| `FBW` | `../../../FBW` |
| `klatka-piersiowa` | `../../../klatka piersiowa` |
| `konczyna-dolna` | `../../../kończyna dolna` |
| `konczyna-gorna-barki` | `../../../kończyna górna/barki` |
| `konczyna-gorna-biceps` | `../../../kończyna górna/biceps` |
| `konczyna-gorna-przedramie` | `../../../kończyna górna/przedramie` |
| `konczyna-gorna-triceps` | `../../../kończyna górna/triceps` |
| `plecy-C` | `../../../plecy/C` |
| `plecy-LS` | `../../../plecy/LS` |
| `plecy-TH` | `../../../plecy/TH` |

### vite.config.js – fs.allow
Vite domyślnie nie serwuje plików spoza `public/`. Ponieważ symlinki prowadzą do folderu wyżej niż projekt, dodano:
```js
server: { fs: { allow: [path.resolve(__dirname, '..')] } }
```

### Kodowanie URL
Nazwy plików zawierają spacje (np. `bird dog.mov`). Ścieżki przechowywane bez kodowania w danych, a kodowane dopiero w momencie użycia funkcją `encodeVideoUrl`:
```js
const encodeVideoUrl = (url) => {
  if (!url) return '';
  return '/' + url.slice(1).split('/').map(encodeURIComponent).join('/');
};
```

### Komponent ExerciseVideo
Renderuje odtwarzacz, gdy ćwiczenie ma `videoUrl`, albo placeholder gdy nie ma:
```jsx
const ExerciseVideo = ({ videoUrl, duration }) => {
  if (!videoUrl) return <VideoPlaceholder duration={duration} />;
  return (
    <div className="w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-sm">
      <video src={encodeVideoUrl(videoUrl)} controls playsInline preload="metadata"
        className="w-full h-full object-contain" />
    </div>
  );
};
```
Używany w: `renderExerciseDetail` (szczegóły ćwiczenia) i `renderSession` (widok sesji treningowej).

### Podgląd w bibliotece (hover play)
Karty ćwiczeń z `videoUrl` w bibliotece PT pokazują miniaturę `<video>` z autoodtwarzaniem przy hoverze (muted, loop) oraz badge `▶ WIDEO`. Ćwiczenia bez wideo pokazują ikonę statyczną.

---

## Co NIE jest zrobione / placeholder

- [ ] Backend i baza danych – wszystko jest mock
- [ ] Prawdziwe uwierzytelnianie (logowanie bez hasła)
- [ ] Linki do App Store / Google Play – placeholdery
- [ ] Powiadomienia push
- [ ] Realne ceny subskrypcji
- [ ] Eksport/raport postępów
- [ ] Wersja na prawdziwy telefon (PWA / natywna)
- [ ] Link Booksy dla gabinetu – placeholder
- [ ] Wideo dostępne tylko lokalnie (dev server) – Vercel nie ma dostępu do plików na Desktopie

---

## Technologia

| | |
|---|---|
| Framework | React 18 |
| Bundler | Vite 6 |
| Style | Tailwind CSS 3 |
| Ikony | Lucide React |
| Routing | React Router DOM 6 |
| Deploy | Vercel (auto z GitHub: FoodlyStudio/rehabcore) |
| Node | 24.x |

---

## Kluczowe pliki i co w nich jest

| Plik | Zawartość |
|---|---|
| `src/App.jsx` | Cała logika, stany, helpery, widoki i komponenty (~2500 linii) |
| `src/mockData.js` | Dane demo (pacjenci, plany, treningi, completion, woda), helpery dat |
| `src/exercisesDatabase.js` | 127 ćwiczeń z wideo, eksportowane jako `MOCK_EXERCISES_VIDEOS` |
| `src/AppRouter.jsx` | React Router: `/` → LandingPage, `/demo` → App |
| `src/main.jsx` | Entry point |
| `src/index.css` | Globalne style, animacje CSS (fade-in, float, gradient-pulse) |
| `vite.config.js` | Vite config + `server.fs.allow` dla symlinków wideo |
| `public/videos/` | Symlinki do folderów z nagraniami na Desktopie |
| `src/landing/` | Komponenty landing page (Header, Hero, sekcje, Footer) |

---

## Schemat danych

### Ćwiczenie (exercise)
```js
{
  id: number,
  name: string,
  category: string,        // np. 'Mobilizacja', 'Wzmacnianie', 'FBW'
  bodyPart: string,        // np. 'Kończyna dolna', 'Plecy'
  difficulty: string,      // 'Łatwy' | 'Średni' | 'Trudny'
  duration: string,        // np. '30 sekund'
  videoUrl: string | undefined,  // np. '/videos/FBW/bird dog.mov'
  description: string,
  instructions: string[],  // lista kroków
}
```

### Plan (plan)
```js
{
  id: number,
  patientId: number,
  name: string,
  status: 'active' | 'completed',
  startDate: string,       // 'YYYY-MM-DD'
  durationWeeks: number,
  trainingDays: number[],  // [0–6], 0 = niedziela
  exercises: ExerciseInPlan[],
  note: string,
  waterGoal: number,       // porcje/dzień
}
```

### Trening w planie (ExerciseInPlan)
```js
{
  exerciseId: number,
  sets: number,
  reps: number,
  frequency: 'daily' | '2x_daily' | 'every_2_days' | 'weekends_only',
}
```

### Ukończenie treningu (completion)
```js
{
  id: number,
  patientId: number,
  planId: number,
  workoutIndex: number,    // który trening w planie (0-based)
  date: string,            // 'YYYY-MM-DD'
  feedback: 'easy' | 'just_right' | 'hard',
  note: string,
}
```

### Zgłoszenie problemu (exerciseIssue)
```js
{
  id: number,
  patientId: number,
  exerciseId: number,
  type: 'pain' | 'difficulty' | 'other',
  note: string,
  date: string,
}
```

### Wpis nawodnienia (waterLog)
```js
{
  id: number,
  patientId: number,
  date: string,
  portions: number,
}
```
