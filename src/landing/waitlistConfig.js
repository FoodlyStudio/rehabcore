// Liczba osób pokazywana przy zapisie na listę oczekujących — na pełnoekranowym
// ekranie "coming soon" (ComingSoon.jsx) i w sekcji/stopce zwykłego landingu.
// Ustawiana RĘCZNIE — nie liczy realnych zapisów na żywo. Podbijaj ją co kilka
// dni, żeby licznik naturalnie rósł. Zmiana tej jednej liczby + redeploy wystarczy.
//
// Jak zmienić (dla nietechnicznego usera): poproś Claude "podbij licznik listy
// oczekujących do X" — zmieni tę linijkę i wdroży stronę od nowa.
export const WAITLIST_BASE_COUNT = 127;
