# Przypadki testowe dla wymagań funkcjonalnych aplikacji READnROAST

## 1. Zakup książki lub kawy

### TC1.1 Happy Path: Udany zakup produktu

- **Stan początkowy**:  
  Klient posiada dostęp do internetu, jest na stronie sklepu, produkty są dostępne, system płatności działa.
- **Kroki testowe**:
  1. Klient otwiera stronę sklepu.
  2. Loguje się lub rejestruje konto.
  3. Przegląda ofertę książek/kaw.
  4. Dodaje wybrany produkt do koszyka.
  5. Przechodzi do koszyka i klika "Przejdź do płatności".
  6. Podaje dane do wysyłki.
  7. Wybiera metodę dostawy.
  8. Wybiera metodę płatności i dokonuje transakcji.
- **Oczekiwany rezultat**:  
  System płatności potwierdza transakcję, a klient otrzymuje potwierdzenie zamówienia.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Klient otrzymał potwierdzenie zakupu, zamówienie jest w realizacji.

---

### TC1.2 Scenariusz alternatywny: Porzucenie koszyka

- **Stan początkowy**:  
  Klient rozpoczął proces zamawiania, dodał produkt do koszyka.
- **Kroki testowe**:
  1. Klient dodaje produkt do koszyka.
  2. Przechodzi do koszyka, ale zamyka stronę/sklep przed dokonaniem płatności.
- **Oczekiwany rezultat**:  
  Zamówienie nie zostaje złożone, system nie pobiera płatności.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Brak nowego zamówienia, koszyk może być pusty lub zachowany do później.

---

### TC1.3 Scenariusz alternatywny: Odrzucona płatność

- **Stan początkowy**:  
  Klient przeszedł do okna płatności, wybrał metodę płatności.
- **Kroki testowe**:
  1. Klient wybiera produkt, dodaje do koszyka.
  2. Przechodzi do płatności.
  3. Wprowadza błędne dane lub wybiera niedziałającą metodę płatności.
- **Oczekiwany rezultat**:  
  System informuje o niepowodzeniu płatności, umożliwia ponowną próbę lub wybór innej metody.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Zamówienie nie jest zrealizowane, klient może ponowić płatność.

---

## 2. Przeglądanie katalogu produktów

### TC2.1 Happy Path: Przeglądanie szczegółów produktu

- **Stan początkowy**:  
  Klient znajduje się na stronie głównej sklepu, katalog zawiera produkty.
- **Kroki testowe**:
  1. Klient wybiera kategorię produktów (np. książki).
  2. Korzysta z filtrów/sortowania.
  3. Wybiera konkretny produkt z katalogu.
  4. Ogląda szczegóły produktu i informacje na jego temat.
- **Oczekiwany rezultat**:  
  System wyświetla szczegóły produktu (zdjęcia, specyfikacje, najważniejsze informacje)
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Klient może kontynuować zakupy lub opuścić stronę.

---

### TC2.2 Scenariusz alternatywny: Brak produktów o wybranych filtrach

- **Stan początkowy**:  
  Klient przegląda katalog, przechodzi do wyboru filtrów.
  - **Kroki testowe**:
  1. Klient wybiera BARDZO szczegółowe filtry.
- **Oczekiwany rezultat**:  
  System wyświetla pustą stroną, ponieważ żaden produkt nie pasuje do wybranych przez niego filtrów.”
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Nie ma produktów o podanych filtrach, użytkownik musi je zmienić lub zaczekać na dodanie produktu spełniającego jego oczekiwania.

---

### TC2.3 Scenariusz alternatywny: Przeglądanie i sortowanie wg różnych kryteriów

- **Stan początkowy**:  
  Klient jest na stronie katalogu.
- **Kroki testowe**:
  1. Klient korzysta z filtrów (np. najtańsze, najwyżej oceniane).
  2. Przegląda wyniki po posortowaniu.
- **Oczekiwany rezultat**:  
  System poprawnie wyświetla produkty zgodnie z wybranym filtrem.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Klient widzi prawidłowo przefiltrowaną listę produktów.

---

## 3. Tworzenie listy ulubionych produktów

### TC3.1 Happy Path: Dodanie produktu do ulubionych

- **Stan początkowy**:  
  Klient jest zalogowany, przegląda katalog.
- **Kroki testowe**:
  1. Klient znajduje interesujący produkt.
  2. Klika ikonę serca/przycisk „Dodaj do ulubionych”.
- **Oczekiwany rezultat**:  
  System dodaje produkt do listy ulubionych i wyświetla potwierdzenie.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Produkt widoczny na liście ulubionych klienta.

---

### TC3.2 Scenariusz alternatywny: Klient przegląda ulubione produkty

- **Stan początkowy**:  
  Produkty już znajdują się na liście ulubionych klienta. Klient jest zalogowany
- **Kroki testowe**:
  1. Klient klika w ikonę ulubionych produktów, strona przenosi go do odpowiedniej zakładki
- **Oczekiwany rezultat**:  
  Strona wyświetla ulubione produkty danego klienta
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Klient przegląda swoje ulubione produkty.

---

### TC3.3 Scenariusz alternatywny: Usuwanie z listy ulubionych

- **Stan początkowy**:  
  Klient ma produkty na liście ulubionych.
- **Kroki testowe**:
  1. Klient otwiera swoją listę ulubionych.
  2. Usuwa produkt z listy.
- **Oczekiwany rezultat**:  
  Produkt znika z listy ulubionych.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Produkt nie jest już na liście ulubionych klienta.

---

## 4. Dodanie posta o przeczytanej książce

### TC4.1 Happy Path: Dodanie posta widocznego publicznie

- **Stan początkowy**:  
  Klient jest zalogowany, posiada konto.
- **Kroki testowe**:
  1. Klient klika na pole dodania posta.
  2. Wpisuje treść posta.
  3. Wybiera widoczność „publiczne”.
  4. Klika „Opublikuj”.
- **Oczekiwany rezultat**:  
  Post pojawia się na profilu klienta i w głównym feedzie.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Post widoczny publicznie.

---

### TC4.2 Scenariusz alternatywny: Niecenzuralna treść posta

- **Stan początkowy**:  
  Klient tworzy post z nieodpowiednią treścią.
- **Kroki testowe**:
  1. Klient tworzy post z niecenzuralną treścią.
  2. Klika „Opublikuj”.
- **Oczekiwany rezultat**:  
  Post zostaje szybko usunięty przez administratora (lub konto zablokowane).
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Post zniknął, klient otrzymał powiadomienie o usunięciu.

---

### TC4.3 Scenariusz alternatywny: Post widoczny tylko dla znajomych

- **Stan początkowy**:  
  Klient jest zalogowany, posiada znajomych.
- **Kroki testowe**:
  1. Klient tworzy post, wybiera widoczność „tylko znajomi”.
  2. Klika „Opublikuj”.
- **Oczekiwany rezultat**:  
  Post widoczny tylko dla znajomych klienta.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Post wyświetlany tylko w feedzie znajomych.

---

## 5. Wystawianie produktów na sprzedaż oraz ich promocja

### TC5.1 Happy Path: Wystawienie produktu na sprzedaż

- **Stan początkowy**:  
  Sprzedawca posiada konto i jest zalogowany, ma podane niezbędne dane.
- **Kroki testowe**:
  1. Sprzedawca wchodzi w zakładkę wystawiania produktów.
  2. Uzupełnia informacje, dodaje zdjęcia.
  3. Klika „Opublikuj”.
- **Oczekiwany rezultat**:  
  Produkt widoczny w katalogu sklepu.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Produkt dostępny dla klientów.

---

### TC5.2 Scenariusz alternatywny: Brak wymaganych danych

- **Stan początkowy**:  
  Sprzedawca próbuje wystawić produkt bez wszystkich wymaganych informacji.
- **Kroki testowe**:
  1. Sprzedawca pomija pole wymagane (np. numer konta).
  2. Klika „Opublikuj”.
- **Oczekiwany rezultat**:  
  System informuje o brakujących danych i nie wystawia produktu.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Produkt nie został wystawiony.

---

### TC5.3 Scenariusz alternatywny: Promowanie produktu

- **Stan początkowy**:  
  Sprzedawca ma wystawione produkty.
- **Kroki testowe**:
  1. Wchodzi w opcję promocji produktu.
  2. Wykupuje płatną promocję na stronie głównej.
- **Oczekiwany rezultat**:  
  Produkt jest wyróżniony na stronie głównej sklepu.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Produkt promowany, większa widoczność w sklepie.

---

## 6. Komunikacja autora książek z fanami

### TC6.1 Happy Path: Autor publikuje post dla fanów

- **Stan początkowy**:  
  Autor posiada konto, jest zalogowany.
- **Kroki testowe**:
  1. Autor wchodzi w zakładkę dodania posta.
  2. Wpisuje treść, klika „Opublikuj”.
- **Oczekiwany rezultat**:  
  Post widoczny na profilu autora i w feedzie fanów.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Fani mogą zobaczyć post i reagować.

---

### TC6.2 Scenariusz alternatywny: Odpowiedź na pytanie fana

- **Stan początkowy**:  
  Autor otrzymał pytanie od fana.
- **Kroki testowe**:
  1. Autor odpowiada na pytanie w komentarzu lub nowym poście.
- **Oczekiwany rezultat**:  
  Fani otrzymują odpowiedź, relacja z autorem się zacieśnia.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Zwiększenie zaangażowania fanów.

---

### TC6.3 Scenariusz alternatywny: Przeglądanie opinii i ocen swoich książek

- **Stan początkowy**:  
  Autor ma wydane książki, są opinie.
- **Kroki testowe**:
  1. Autor przegląda zakładkę z opiniami o swoich książkach.
- **Oczekiwany rezultat**:  
  Autor widzi listę recenzji i ocen, może analizować feedback.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Autor zna odbiór swoich książek.

---

## 7. Wrzucanie informacji o eventach w kawiarniach

### TC7.1 Happy Path: Dodanie posta o evencie przez kawiarnię

- **Stan początkowy**:  
  Kawiarnia posiada konto, jest zalogowana.
- **Kroki testowe**:
  1. Właściciel wchodzi w zakładkę dodania posta.
  2. Wpisuje datę i temat wydarzenia, klika „Opublikuj”.
- **Oczekiwany rezultat**:  
  Post widoczny na profilu kawiarni oraz w feedzie obserwujących.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Informacja o evencie dociera do klientów.

---

### TC7.2 Scenariusz alternatywny: Promowanie wydarzenia

- **Stan początkowy**:  
  Kawiarnia ma utworzony event.
- **Kroki testowe**:
  1. Kawiarnia wykupuje płatną promocję wydarzenia.
- **Oczekiwany rezultat**:  
  Wydarzenie wyświetla się na stronie głównej sklepu.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Wydarzenie ma większy zasięg.

---

### TC7.3 Scenariusz alternatywny: Przeglądanie opinii o eventach

- **Stan początkowy**:  
  Event został zorganizowany, klienci mogą wystawić opinię.
- **Kroki testowe**:
  1. Właściciel kawiarni przegląda zakładkę z opiniami na temat eventu.
- **Oczekiwany rezultat**:  
  Właściciel widzi oceny i komentarze klientów.
- **Rzeczywisty rezultat**:  
  _(do uzupełnienia po teście)_
- **Rezultat testu**:  
  _(zaliczony/niezaliczony)_
- **Stan końcowy**:  
  Kawiarnia może poprawić kolejne wydarzenia na podstawie feedbacku.

---
