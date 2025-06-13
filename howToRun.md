# Instrukcja uruchomienia READnROAST lokalnie (`branch: local`)

Repozytorium: [github.com/KMMio2025/READnROAST](https://github.com/KMMio2025/READnROAST)  
Stack: Java Spring Boot (backend), React (frontend)

---

## Wymagania

- Java 17+ (np. OpenJDK 17)
- Node.js 18+ i npm
- Git
- (Opcjonalnie) Docker (dla bazy danych)
- (Opcjonalnie) DBeaver (GUI do zarządzania bazą danych PostgreSQL)

---

## 1. Klonowanie repozytorium i przejście na branch local

```bash
git clone https://github.com/KMMio2025/READnROAST.git
cd READnROAST
git checkout local
```

---

## 2. Backend – Java Spring Boot

Przejdź do katalogu backendu:

```bash
cd backend
```

### a) Baza danych (Wersja 1 – Docker + DBeaver)

Domyślnie backend używa PostgreSQL.

#### Szybki start z Dockerem:

```bash
docker run --name readnroast-db -e POSTGRES_USER=readuser -e POSTGRES_PASSWORD=readpass -e POSTGRES_DB=readnroast -p 5432:5432 -d postgres:15
```

#### Ustawienia w `src/main/resources/application.properties`:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/readnroast
spring.datasource.username=readuser
spring.datasource.password=readpass
```

#### Zarządzanie bazą przez DBeaver (opcjonalnie)

1. **Dodanie połączenia**  
   - Otwórz DBeaver i kliknij "Nowe połączenie" (`New Database Connection`).
   - Wybierz PostgreSQL.
   - Ustaw:
     - Host: `localhost`
     - Port: `5432`
     - Database: `readnroast`
     - Username: `readuser`
     - Password: `readpass`
   - Kliknij "Testuj połączenie" (`Test Connection`) i zatwierdź.

2. **Tworzenie i edycja danych**  
   - Po połączeniu, w panelu po lewej znajdź bazę `readnroast`.
   - Możesz rozwijać tabele, przeglądać dane lub kliknąć PPM na bazie i wybrać `SQL Editor` > `New SQL Script`.

3. **Wprowadzanie przykładowych danych**  
   - W nowym zapytaniu SQL możesz wkleić sampleData, znajdujące się w pliku w repozytorium (sampleData.sql)
   - Uruchom skrypt aby dodać przykładowe rekordy.

---

### b) Budowanie i uruchamianie backendu

Otwieramy (w IntelliJ) plik BackendApplication (backend/backend/src/main/java/org/example/backend/BackendApplication.java)  
Uruchom aplikacje backendową.
  
Backend będzie działał na: [http://localhost:8080](http://localhost:8080)

---

## 3. Frontend – React

Otwórz nowe okno terminala i przejdź do katalogu frontend:

```bash
cd frontend
```

### a) Instalacja zależności

```bash
npm install
```

### b) Uruchomienie frontendu

```bash
npm start
```

Frontend dostępny pod: (http://localhost:5173)

---

## 4. Podsumowanie

- Backend: http://localhost:8080
- Frontend: http://localhost:5173

Możesz korzystać z aplikacji lokalnie – frontend komunikuje się z backendem!

---

## 5. Typowe problemy

- Sprawdź, czy baza PostgreSQL działa i dane logowania są poprawne.
- Jeśli porty są zajęte, zmodyfikuj je w odpowiednich plikach konfiguracyjnych.
- Upewnij się, że masz odpowiednie wersje Javy i Node.js.

---
