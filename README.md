# matExam 🗃

## Czym jest? 🧐

**matExam** to narzędzie pomagające w organizacji egzaminów maturalnych, stworzone dla personelu szkolnego przy pomocy [React.js](https://react.dev) oraz [TypeScript](https://www.typescriptlang.org).

Aplikacja dostępna jest na darmowym hostingu, więc potrzebuje chwili na rozruch, a po dłuższym czasie nieaktywności przechodzi w stan uśpienia.

W celu przetestowania wszystkich funkcjonalności należy zalogować się na [stronie](https://matexam.vercel.app) za pomocą dostępnego konta o loginie: "admin" i haśle: "admin".

# Główny cel 🎯
Głównym celem aplikacji jest zautomatyzowanie pracy personelu szkolnego, który ręcznie musi tworzyć grupy egzaminacyjne biorąc pod uwagę każdy szczegół. Dzięki **matExam** duża część tej pracy zostaje znacznie przyśpieszona.

# Funkcje aplikacji 😊

## Wypełnianie danych 📄
- Zaimportowanie uczniów i egzaminów odbywa się za pomocą oficjalnego pliku przekazanego szkole.
- Aplikacja odnajduje potrzebne dane, tworzy egzaminy i dodaje do bazy danych uczniów.
- Mimo powtarzających się danych w pliku, aplikacja stworzy właściwą ilość egzaminów i uczniów.

## Egzaminy 📗
- Egzamin zawiera nazwę przedmiotu, typ (podstawowy, rozszerzony lub ustny), datę rozpoczęcia i zakończenia.
- Istnieje możliwość manualnego dodania, edycji i usunięcia egzaminu.
- Egzamin możemy opisać jako wymagający sali komputerowej, w takiej sytuacji wyświetlane zostaną tylko takie sale.

## Uczniowie 👩‍🎓👨‍🎓
- Uczeń identyfikowany jest poprzez numer PESEL, imię, nazwisko, klasę, numer w dzienniku i opcjonalnie numer telefonu, email, rodzaj dokumentu.
- Mamy możliwość manualnego dodania ucznia i dodania go do istniejącego egzaminu.

## Sale 🏫
- Każda sala ma swój numer, rozmiar i informację o tym, czy jest komputerowa.
- Po otworzeniu strony danego egzaminu wyświetlą nam się dostępne sale, do których możemy przydzielić uczniów lub ich usuwać.
- Na dedykowanej stronie możemy zobaczyć wszystkie sale i dodać nową.
- Jeżeli egzamin jest oznaczony jako komputerowy, wyświetlą nam się jedynie sale komputerowe. W przeciwnym wypadku zobaczymy zwykłe sale lekcyjne.

## Automatyczne przypisywanie do sal ⚙️
- "Wypełnij egzamin" to przycisk, który automatycznie wypełnia wszystkie sale, biorąc pod uwagę potrzeby szkoły.
  
   Opcja ta tworzy najkorzystniejsze ułożenie uczniów w salach o róznych rozmiarach, tak aby jak najmniej sal zostało zajętych, jednocześnie wykorzystując jak najwięcej miejsc w używanych już pomieszczeniach. Oznacza to, że unikniemy sytuacji, w której zabralibyśmy możliwość wykorzystywania ich do innych egzaminów lub lekcji.

- Istnieje również możliwość automatycznego wypełnienia wybranej przez nas sali. Dzięki temu użytkownik jest w stanie dostosować indywidualnie wybór sal.
