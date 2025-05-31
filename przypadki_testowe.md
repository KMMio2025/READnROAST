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

# <img src="img/KMM-logo.png" width="22" /> 5. Edycja konta

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


# <img src="img/KMM-logo.png" width="22" /> 6. Sortowanie produktów.

## Happy Path

### TC6.1 <img src="img/KMM-logo.png" width="18" /> Sortowanie produktów

- **Stan początkowy:**  
  Klient ma internet.
- **Kroki testowe:**
  1. Klient wchodzi na strone produktów (nie musi być zalogowany).
  2. Wybiera odpowiednie dla siebie filtry.
  3. Szuka czegoś na prezent, lecz ma ograniczony budżet- wybiera sortowanie ceny od najniższej.
  4. Wyświetlają mu się najtańsze produkty, mieszczące się w jego budżecie.
- **Oczekiwany rezultat:**  
  Klient jest zadowolony z sortowania (widzi te produkty, które chce)
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Odpowiednie, posortowane produkty wyświetlają się na ekranie.

---

## Scenariusze alternatywne

### TC6.2 <img src="img/KMM-logo.png" width="18" /> Sortowanie kawy.

- **Stan początkowy:**  
  Klient ma internet.
- **Kroki testowe:**
  1. Klient wchodzi na strone z kawami (nie musi być zalogowany).
  2. Wybiera odpowiednie dla siebie filtry.
  3. Pamięta, że pił dobrą kawę na literę A, wybiera sortowanie alfabetyczne.
  4. Wyświetlają mu się posortowane produkty, rozpoczynając od litery A alfabetu.
- **Oczekiwany rezultat:**  
  Klient jest zadowolony z sortowania (widzi te produkty, które chce- odnajduje swoją kawę)
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Odpowiednie, posortowane produkty wyświetlają się na ekranie.

---

### TC6.3 <img src="img/KMM-logo.png" width="18" /> Sortowanie książek.

- **Stan początkowy:**  
  Klient ma internet.
- **Kroki testowe:**
  1. Klient wchodzi na strone z książkami (nie musi być zalogowany).
  2. Wybiera odpowiednie dla siebie filtry.
  3. Wyświetlają mu się posortowane produkty, rozpoczynając od litery A alfabetu.
- **Oczekiwany rezultat:**  
  Klient jest zadowolony z sortowania (widzi te produkty, które chce)
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Odpowiednie, posortowane produkty wyświetlają się na ekranie.

---

# <img src="img/KMM-logo.png" width="22" /> 7. Wyszukiwanie produktów.

## Happy Path

### TC7.1 <img src="img/KMM-logo.png" width="18" /> Wyszukiwanie produktów.

- **Stan początkowy:**  
  Klient ma internet.
- **Kroki testowe:**
  1. Klient wchodzi na stronę sklepu (nie musi być zalogowany).
  2. Korzysta z paska wyszukiwania na pasku nawigacji.
  3. Wyszukuje słowo kluczowe(lub jego prefiks) zawierające się w nazwie, opisie lub autorze pozycji, którą chce zakupic.
  4. Poszukiwany produkt wyświetla się na ekranie.
- **Oczekiwany rezultat:**  
  Klient jest zadowolony, ponieważ w łatwy i szybki sposób odnalazł to, czego szukał.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Poszukiwany produkt wyświetla się na ekranie.

---

## Scenariusze alternatywne

### TC7.2 <img src="img/KMM-logo.png" width="18" /> Wyszukiwanie niedostępnych produktów.

- **Stan początkowy:**  
  Klient ma internet.
- **Kroki testowe:**
  1. Klient wchodzi na stronę sklepu (nie musi być zalogowany).
  2. Korzysta z paska wyszukiwania na pasku nawigacji.
  3. Wyszukuje słowo kluczowe(lub jego prefiks) zawierające się w nazwie, opisie lub autorze pozycji, którą chce zakupic.
  4. Poszukiwanej pozycji nie ma w asortymencie sklepu, rezultaty wyszukiwania są puste.
- **Oczekiwany rezultat:**  
  Klient jest niezadowolony z braku porządanej pozycji, może wrócić do przeglądania innych możliwości.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Na ekranie wyświetla się odpowiednio; nic lub inne produkty, zawierające w swojej nazwie, autorze lub opisie wyszukiwaną frazę(o ile takie istnieją).

---

### TC7.3 <img src="img/KMM-logo.png" width="18" /> Popełnienie błędu podczas wpisywania wyszukiwanej frazy.

- **Stan początkowy:**  
  Klient ma internet.
- **Kroki testowe:**
  1. Klient wchodzi na stronę sklepu (nie musi być zalogowany).
  2. Korzysta z paska wyszukiwania na pasku nawigacji.
  3. Wyszukuje słowo kluczowe(lub jego prefiks) zawierające się w nazwie, opisie lub autorze pozycji, którą chce zakupic.
  4. Poszukiwanej pozycji nie wyświetla się, ponieważ wprowadzone zapytanie zawiera błąd.
- **Oczekiwany rezultat:**  
  Klient zauważa błąd, może poprawić wyszukiwaną frazę.
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Na ekranie wyświetla się odpowiednio; nic lub inne produkty, zawierające w swojej nazwie, autorze lub opisie wyszukiwaną frazę(o ile takie istnieją).

---
# <img src="img/KMM-logo.png" width="22" /> 8. Kontakt z autorami strony.

## Happy Path

### TC8.1 <img src="img/KMM-logo.png" width="18" /> SKontakt z autorami strony.

- **Stan początkowy:**  
  Klient ma internet.
- **Kroki testowe:**
  1. Klient wchodzi na strone sklepu.
  2. Jest zachwycony jej funkcjonalnościami oraz designem.
  3. Chce poznać autorów tego wybitnego sklepu.
  4. Wybiera zakładkę "about us"
  5. Na stronie wyświetlają się linki do kont na LinkedIn autorów strony.
- **Oczekiwany rezultat:**  
  Klient jest zadowolony i nawiązuje kontakt:DD
- **Rzeczywisty rezultat:** _(do uzupełnienia)_
- **Rezultat testu:** _(zaliczony/niezaliczony)_
- **Stan końcowy:**  
  Linki wyświetlane na stronie przekierowują klienta na profile LinkedIn twórców.


---

<p align="center">
  <img src="img/KMM-logo.png" width=50 />
</p>

<p align="center">
  Mateusz Jędrkowiak, Karolina Kulas & Mateusz Markiewicz<br/>
  Jagiellonian University, 2025
</p>
