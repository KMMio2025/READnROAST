<h1 align="center">Przypadki Testowe: READnROAST</h1>

<p align="center">
  <img src="img/KMM-logo.png" width=50 />
</p>


# <img src="img/KMM-logo.png" width="22" /> 1. Zakup książki lub kawy

## Happy Path

### TC1.1 <img src="img/KMM-logo.png" width="18" /> Udany zakup produktu

- **Stan początkowy:**  
  Klient ma dostęp do internetu, jest na stronie sklepu, produkty są dostępne, płatności działają.
- **Kroki testowe:**
  1. Klient otwiera stronę sklepu.
  2. Loguje się lub rejestruje konto.
  3. Przegląda ofertę książek lub kaw.
  4. Dodaje wybrany produkt do koszyka.
  5. Przechodzi do koszyka i klika „Przejdź do płatności”.
  6. Podaje dane do wysyłki.
  7. Wybiera metodę dostawy.
  8. Wybiera metodę płatności, dokonuje transakcji.
- **Oczekiwany rezultat:**  
  System potwierdza transakcję, klient otrzymuje potwierdzenie zamówienia.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Klient otrzymał potwierdzenie zakupu, zamówienie jest w realizacji.

---

## Scenariusze alternatywne

### TC1.2 <img src="img/KMM-logo.png" width="18" /> Porzucenie koszyka

- **Stan początkowy:**  
  Klient dodał produkt do koszyka.
- **Kroki testowe:**
  1. Dodanie produktu do koszyka.
  2. Przejście do koszyka, zamknięcie strony przed płatnością.
- **Oczekiwany rezultat:**  
  Zamówienie nie zostaje złożone, płatność nie jest pobrana.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Brak nowego zamówienia, koszyk może być pusty lub zachowany.

---

### TC1.3 <img src="img/KMM-logo.png" width="18" /> Odrzucona płatność

- **Stan początkowy:**  
  Klient jest na etapie płatności.
- **Kroki testowe:**
  1. Dodanie produktu do koszyka, przejście do płatności.
  2. Wprowadzenie błędnych danych lub wybór niedziałającej metody płatności.
- **Oczekiwany rezultat:**  
  System informuje o błędzie płatności, umożliwia ponowną próbę.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Zamówienie nie jest zrealizowane, klient może ponowić płatność.

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

# <img src="img/KMM-logo.png" width="22" /> 4. Dodanie posta o przeczytanej książce

## Happy Path

### TC4.1 <img src="img/KMM-logo.png" width="18" /> Publiczny post

- **Stan początkowy:**  
  Klient zalogowany.
- **Kroki testowe:**
  1. Kliknięcie pola dodawania posta.
  2. Wpisanie treści, wybranie widoczności „publiczne”.
  3. Publikacja posta.
- **Oczekiwany rezultat:**  
  Post pojawia się na profilu i w głównym feedzie.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Post widoczny publicznie.

---

## Scenariusze alternatywne

### TC4.2 <img src="img/KMM-logo.png" width="18" /> Niecenzuralna treść posta

- **Stan początkowy:**  
  Klient tworzy post z nieodpowiednią treścią.
- **Kroki testowe:**
  1. Stworzenie posta z niecenzuralną treścią.
  2. Publikacja.
- **Oczekiwany rezultat:**  
  Post zostaje usunięty przez admina, ewentualnie blokada konta.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Post zniknął, klient został powiadomiony.

---

### TC4.3 <img src="img/KMM-logo.png" width="18" /> Post widoczny tylko dla znajomych

- **Stan początkowy:**  
  Klient zalogowany, posiada znajomych.
- **Kroki testowe:**
  1. Stworzenie posta, wybór widoczności „tylko znajomi”.
  2. Publikacja.
- **Oczekiwany rezultat:**  
  Post widoczny tylko dla znajomych.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Post wyświetlany w feedzie znajomych.

---

# <img src="img/KMM-logo.png" width="22" /> 5. Wystawianie i promocja produktów

## Happy Path

### TC5.1 <img src="img/KMM-logo.png" width="18" /> Wystawienie produktu

- **Stan początkowy:**  
  Sprzedawca zalogowany, podane wymagane dane.
- **Kroki testowe:**
  1. Zakładka wystawiania produktów.
  2. Uzupełnienie informacji, dodanie zdjęć.
  3. Publikacja.
- **Oczekiwany rezultat:**  
  Produkt widoczny w katalogu.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Produkt dostępny dla klientów.

---

## Scenariusze alternatywne

### TC5.2 <img src="img/KMM-logo.png" width="18" /> Brak wymaganych danych

- **Stan początkowy:**  
  Sprzedawca pomija wymagane dane.
- **Kroki testowe:**
  1. Brak wymaganych pól (np. numer konta).
  2. Próba publikacji.
- **Oczekiwany rezultat:**  
  System informuje o brakujących danych, produkt nie zostaje wystawiony.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Produkt nie wystawiony.

---

### TC5.3 <img src="img/KMM-logo.png" width="18" /> Promocja produktu

- **Stan początkowy:**  
  Sprzedawca ma wystawione produkty.
- **Kroki testowe:**
  1. Wybór opcji promocji produktu.
  2. Wykupienie płatnej promocji na stronie głównej.
- **Oczekiwany rezultat:**  
  Produkt wyróżniony na stronie głównej.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Produkt promowany, większa widoczność.

---

# <img src="img/KMM-logo.png" width="22" /> 6. Komunikacja autora z fanami

## Happy Path

### TC6.1 <img src="img/KMM-logo.png" width="18" /> Post autora dla fanów

- **Stan początkowy:**  
  Autor zalogowany.
- **Kroki testowe:**
  1. Zakładka dodania posta, wpisanie treści.
  2. Publikacja.
- **Oczekiwany rezultat:**  
  Post widoczny na profilu i w feedzie fanów.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Fan może zobaczyć post i zareagować.

---

## Scenariusze alternatywne

### TC6.2 <img src="img/KMM-logo.png" width="18" /> Odpowiedź na pytanie fana

- **Stan początkowy:**  
  Autor otrzymał pytanie od fana.
- **Kroki testowe:**
  1. Odpowiedź w komentarzu lub nowym poście.
- **Oczekiwany rezultat:**  
  Fani otrzymują odpowiedź, relacja się zacieśnia.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Większe zaangażowanie fanów.

---

### TC6.3 <img src="img/KMM-logo.png" width="18" /> Przeglądanie opinii i ocen

- **Stan początkowy:**  
  Autor ma wydane książki, są opinie.
- **Kroki testowe:**
  1. Przejście do opinii o swoich książkach.
- **Oczekiwany rezultat:**  
  Autor widzi recenzje i oceny, może analizować feedback.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Autor zna odbiór swoich książek.

---

# <img src="img/KMM-logo.png" width="22" /> 7. Eventy w kawiarniach

## Happy Path

### TC7.1 <img src="img/KMM-logo.png" width="18" /> Dodanie posta o evencie

- **Stan początkowy:**  
  Kawiarnia zalogowana.
- **Kroki testowe:**
  1. Dodanie posta z datą i tematem wydarzenia.
  2. Publikacja.
- **Oczekiwany rezultat:**  
  Post widoczny na profilu kawiarni i w feedzie obserwujących.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Informacja o evencie dociera do klientów.

---

## Scenariusze alternatywne

### TC7.2 <img src="img/KMM-logo.png" width="18" /> Promocja wydarzenia

- **Stan początkowy:**  
  Kawiarnia ma utworzony event.
- **Kroki testowe:**
  1. Wykupienie płatnej promocji wydarzenia.
- **Oczekiwany rezultat:**  
  Wydarzenie na stronie głównej.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Event ma większy zasięg.

---

### TC7.3 <img src="img/KMM-logo.png" width="18" /> Przeglądanie opinii o eventach

- **Stan początkowy:**  
  Event się odbył, klienci mogą oceniać.
- **Kroki testowe:**
  1. Przeglądanie opinii o wydarzeniu.
- **Oczekiwany rezultat:**  
  Właściciel widzi oceny i komentarze.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Możliwość poprawy kolejnych wydarzeń.

---

# <img src="img/KMM-logo.png" width="22" /> 8. Zakładanie konta

## Happy Path

### TC8.1 <img src="img/KMM-logo.png" width="18" /> Nowe konto

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

### TC8.2 <img src="img/KMM-logo.png" width="18" /> Próba rejestracji na istniejący email

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

### TC8.3 <img src="img/KMM-logo.png" width="18" /> Błędny format danych (np. email)

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

### TC9.1 <img src="img/KMM-logo.png" width="18" /> Edycja konta

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

### TC9.2 <img src="img/KMM-logo.png" width="18" /> Błędne dane przy edycji

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

### TC9.3 <img src="img/KMM-logo.png" width="18" /> Przerwanie edycji profilu

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
