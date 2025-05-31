<h1 align="center">Przypadki Testowe: READnROAST</h1>

<p align="center">
  <img src="img/KMM-logo.png" width=50 />
</p>


# <img src="img/KMM-logo.png" width="22" /> 1. Zakup książki lub kawy

## Happy Path

### TC1.1 <img src="img/KMM-logo.png" width="18" /> Udany wybór produktu i dodanie do koszyka

- **Stan początkowy:**  
  Klient ma dostęp do internetu, jest na stronie sklepu, produkty są dostępne, płatności działają.
- **Kroki testowe:**
  1. Klient otwiera stronę sklepu.
  2. Loguje się lub rejestruje konto.
  3. Przegląda ofertę książek lub kaw.
  4. Dodaje wybrany produkt do koszyka.
  5. Przechodzi do koszyka i przegląda wybrane produkty.
- **Oczekiwany rezultat:**  
  System posiada zaktualizowany koszyk.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Klient posiada wymarzone produkty w koszyku.

---

## Scenariusze alternatywne

### TC1.2 <img src="img/KMM-logo.png" width="18" /> Usunięcie produktu z koszyka

- **Stan początkowy:**  
  Klient dodał produkt do koszyka.
- **Kroki testowe:**
  1. Przejście do koszyka, przejrzenie i wybór niechcianych produktów.
  2. Kliknięcie ikony od usuwania produktu z koszyka.
  3. Produkt zostaje usunięty z koszyka.
- **Oczekiwany rezultat:**  
  Koszyk zostaje zaktualizowany
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Koszyk posiada aktualną zawartość.

---

### TC1.3 <img src="img/KMM-logo.png" width="18" /> Klient wylogowuje się po dodaniu produktów do koszyka

- **Stan początkowy:**  
  Klient ma produkty w koszyku.
- **Kroki testowe:**
  1. Wylogowanie się ze swojego konta.
  2. Ponowne zalogowanie na to samo konto.
  3. Przejście do swojego koszyka.
  4. Elementy nie powinny zostać usunięte.
- **Oczekiwany rezultat:**  
  System wyświetla informacje o zawartości koszyka przypisanej do danego konta.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Koszyk ma tę samą zawartość.

---

# <img src="img/KMM-logo.png" width="22" /> 2. Przeglądanie katalogu produktów

## Happy Path

### TC2.1 <img src="img/KMM-logo.png" width="18" /> Przeglądanie szczegółów produktu

- **Stan początkowy:**  
  Klient na stronie głównej, katalog zawiera produkty.
- **Kroki testowe:**
  1. Wybór kategorii (np. książki).
  2. Użycie filtrów/sortowania.
  3. Wybór produktu z katalogu.
  4. Oglądanie szczegółów produktu.
- **Oczekiwany rezultat:**  
  System pokazuje szczegóły produktu (zdjęcia, opis, specyfikacja).
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Klient może kontynuować zakupy lub opuścić stronę.

---

## Scenariusze alternatywne

### TC2.2 <img src="img/KMM-logo.png" width="18" /> Brak produktów dla wybranych filtrów

- **Stan początkowy:**  
  Klient wybiera filtry w katalogu.
- **Kroki testowe:**
  1. Ustawienie bardzo szczegółowych filtrów.
- **Oczekiwany rezultat:**  
  System wyświetla brak wyników.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Brak produktów, użytkownik musi zmienić filtry.

---

### TC2.3 <img src="img/KMM-logo.png" width="18" /> Sortowanie i filtrowanie katalogu

- **Stan początkowy:**  
  Klient na stronie katalogu.
- **Kroki testowe:**
  1. Użycie filtrów (np. najtańsze, najwyżej oceniane).
  2. Przegląd wyników po sortowaniu.
- **Oczekiwany rezultat:**  
  System poprawnie prezentuje wyniki według wybranego filtru.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Klient widzi odpowiednio przefiltrowane produkty.

---

# <img src="img/KMM-logo.png" width="22" /> 3. Lista ulubionych produktów

## Happy Path

### TC3.1 <img src="img/KMM-logo.png" width="18" /> Dodanie do ulubionych

- **Stan początkowy:**  
  Klient zalogowany, przegląda katalog.
- **Kroki testowe:**
  1. Znalezienie produktu.
  2. Kliknięcie „Dodaj do ulubionych”.
- **Oczekiwany rezultat:**  
  Produkt trafia na listę ulubionych, pojawia się potwierdzenie.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Produkt widoczny na liście ulubionych.

---

## Scenariusze alternatywne

### TC3.2 <img src="img/KMM-logo.png" width="18" /> Przeglądanie listy ulubionych

- **Stan początkowy:**  
  Lista ulubionych zawiera produkty.
- **Kroki testowe:**
  1. Przejście do zakładki ulubionych.
- **Oczekiwany rezultat:**  
  Wyświetlenie ulubionych produktów klienta.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Klient przegląda swoje ulubione produkty.

---

### TC3.3 <img src="img/KMM-logo.png" width="18" /> Usuwanie z ulubionych

- **Stan początkowy:**  
  Produkt znajduje się na liście ulubionych.
- **Kroki testowe:**
  1. Przejście do ulubionych.
  2. Usunięcie produktu.
- **Oczekiwany rezultat:**  
  Produkt znika z listy ulubionych.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Produkt usunięty z ulubionych.

---


# <img src="img/KMM-logo.png" width="22" /> 4. Zakładanie konta

## Happy Path

### TC4.1 <img src="img/KMM-logo.png" width="18" /> Nowe konto

- **Stan początkowy:**  
  Klient ma internet i email.
- **Kroki testowe:**
  1. Wejście na stronę, wybór rejestracji.
  2. Wypełnienie formularza.
  3. Komunikat o utworzeniu konta.
- **Oczekiwany rezultat:**  
  Możliwość zalogowania na nowe konto.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Konto utworzone.

---

## Scenariusze alternatywne

### TC4.2 <img src="img/KMM-logo.png" width="18" /> Próba rejestracji na istniejący email

- **Stan początkowy:**  
  Klient ma internet i email.
- **Kroki testowe:**
  1. Próba rejestracji na istniejący adres email.
  2. Komunikat o błędzie.
- **Oczekiwany rezultat:**  
  Możliwość rejestracji na inny email.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Konto nie zostało utworzone, baza danych spójna.

---

### TC4.3 <img src="img/KMM-logo.png" width="18" /> Błędny format danych (np. email)

- **Stan początkowy:**  
  Klient ma internet i email.
- **Kroki testowe:**
  1. Wpisanie niepoprawnego adresu email.
  2. Formularz podkreśla błąd, komunikat.
- **Oczekiwany rezultat:**  
  Klient może poprawić dane.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Konto nie powstało, dane poprawne.

---

# <img src="img/KMM-logo.png" width="22" /> 9. Edycja konta

## Happy Path

### TC5.1 <img src="img/KMM-logo.png" width="18" /> Edycja konta

- **Stan początkowy:**  
  Klient ma konto.
- **Kroki testowe:**
  1. Logowanie.
  2. Przejście do edycji profilu.
  3. Zmiana danych.
- **Oczekiwany rezultat:**  
  Dane konta zaktualizowane.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Konto aktualne.

---

## Scenariusze alternatywne

### TC5.2 <img src="img/KMM-logo.png" width="18" /> Błędne dane przy edycji

- **Stan początkowy:**  
  Klient ma konto.
- **Kroki testowe:**
  1. Edycja profilu, wpisanie niepoprawnego kodu pocztowego.
  2. Strona blokuje zapis i wskazuje błąd.
- **Oczekiwany rezultat:**  
  Możliwość poprawy i dokończenia edycji.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Konto ma poprawne dane.

---

### TC5.3 <img src="img/KMM-logo.png" width="18" /> Przerwanie edycji profilu

- **Stan początkowy:**  
  Klient ma konto.
- **Kroki testowe:**
  1. Edycja profilu, wprowadzenie zmian.
  2. Zamknięcie strony lub przejście do innej zakładki bez zapisu.
- **Oczekiwany rezultat:**  
  Zmiany nie zostają zapisane.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Konto niezmienione, edycja anulowana.

---

<p align="center">
  <img src="img/KMM-logo.png" width=50 />
</p>

<p align="center">
  Mateusz Jędrkowiak, Karolina Kulas & Mateusz Markiewicz<br/>
  Jagiellonian University, 2025
</p>
