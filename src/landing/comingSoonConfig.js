// Przełącznik trybu "coming soon". Gdy true, CAŁA strona (każda trasa —
// AppRouter.jsx renderuje wtedy tylko <ComingSoon />) to jeden pełnoekranowy
// ekran zapisu na listę oczekujących. Reszta landingu (Hero, funkcje, pakiety,
// FAQ...) zostaje w kodzie bez zmian, tylko nie jest renderowana.
//
// Po premierze: ustaw na false i zrób redeploy — wróci pełny landing pod
// wszystkimi trasami (/, /kontakt, /demo) dokładnie taki, jaki był.
export const COMING_SOON_MODE = false;
