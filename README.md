# RehabCore – prototyp aplikacji demo

System prowadzenia pacjentów przez fizjoterapeutów: plany treningowe, baza ćwiczeń i monitoring postępów.

## Wymagania

- Node.js 18+
- npm

## Uruchomienie lokalne

```bash
# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego (np. http://localhost:5173)
npm run dev
```

Otwórz w przeglądarce adres wyświetlony w terminalu.

## Build produkcyjny

```bash
npm run build
```

Katalog `dist/` zawiera zbudowaną aplikację. Podgląd builda:

```bash
npm run preview
```

## Wdrożenie na Vercel

1. Zainstaluj [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`
2. W katalogu projektu wykonaj: `vercel`
3. Zaloguj się lub utwórz konto i potwierdź projekt (build command: `npm run build`, output: `dist`).
4. Alternatywnie: połącz repozytorium z Vercel w [vercel.com](https://vercel.com) – Vercel wykryje Vite i użyje `npm run build` oraz katalogu `dist`.

Projekt zawiera `vercel.json` z przekierowaniem SPA (wszystkie ścieżki → `index.html`).

## Demo

Po wejściu na stronę: strona startowa → **Wejdź do aplikacji demo** → splash → onboarding → wybór roli (Fizjoterapeuta / Pacjent / Gabinet) → na ekranie logowania wystarczy kliknąć **Zaloguj się** (bez wpisywania danych).

## Struktura

- `src/App.jsx` – główna aplikacja (ekrany, nawigacja, logika)
- `src/mockData.js` – dane demo (pacjenci, plany, ćwiczenia, zgłoszenia)
- `src/index.css` – style globalne (Tailwind)
- `index.html` – punkt wejścia
- `vercel.json` – konfiguracja hostingu (SPA)

## Licencja

Projekt prywatny / prototyp demo.
