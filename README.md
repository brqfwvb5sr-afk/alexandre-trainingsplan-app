# Trainingsplan

Moderne iPhone-optimierte Web-App für Ale und Nevio. Die App hilft Schülern, Jogging, Krafttraining, Regeneration und Wochenfortschritt übersichtlich zu planen.

## Features

- Profilauswahl für Ale und Nevio mit gespeichertem Login
- Automatische Tageserkennung mit passendem Training für den aktuellen Wochentag
- Joggingplan für beide Profile mit lockeren Läufen, Intervallen und Wochensteigerung
- Krafttrainingsplan für Ale mit abhaken einzelner Übungen
- Hinweis- und Kontaktkarte für Nevio, solange noch kein eigener Kraftplan existiert
- Fortschritt pro Profil getrennt gespeichert
- Wochenübersicht, Fortschrittsbalken, Motivationstext und Reset-Funktion
- Optionale Strava-Integration für automatisch erkannte Jogging-Einheiten
- Service Worker mit Network-First-Strategie für aktuelle App-Dateien
- PWA-Unterstützung mit `manifest.json`
- iPhone-freundliches Liquid-Glass-Design mit Safe-Area-Unterstützung

## Benutzerprofile

### Ale

Ale ist 16 Jahre alt und trainiert für Muskelaufbau und bessere Ausdauer. Der Plan berücksichtigt:

- aktuelles Laufniveau von ca. 2 km
- Unihockey-Training am Dienstag
- 10-kg-Kurzhantel, zwei 3-kg-Kurzhanteln und Stepper zu Hause
- Hinweise zu Protein, Kreatin, Schlaf und Regeneration

### Nevio

Nevio nutzt vorerst den gleichen Joggingplan wie Ale und bekommt eine eigene Fortschrittsspeicherung. Ein eigener Krafttrainingsplan ist noch nicht hinterlegt. Im Tab "Kraft" kann Nevio seine Infos für Ale vorbereiten.

## Lokal starten

Das Frontend besteht aus HTML, CSS und JavaScript. Für Strava braucht die App zusätzlich die Serverless API unter `api/strava`.

1. Ordner öffnen.
2. Für reines Frontend `index.html` im Browser starten.

Für lokale Frontend-Tests empfiehlt sich ein statischer Server:

```bash
python -m http.server 8080
```

Danach im Browser öffnen:

```text
http://localhost:8080
```

Für Strava lokal oder produktiv sollte Vercel verwendet werden:

```bash
npm install -g vercel
vercel dev
```

## Strava-Integration

GitHub Pages kann kein sicheres Backend ausführen. Der Strava Client Secret darf nicht im Browser stehen, deshalb funktionieren die Routen `/api/strava/login`, `/api/strava/callback` und `/api/strava/activities` nur auf einem Backend-Deployment, z. B. Vercel.

Benötigte Environment Variables:

```text
STRAVA_CLIENT_ID=...
STRAVA_CLIENT_SECRET=...
STRAVA_REDIRECT_URI=https://deine-vercel-url.vercel.app/api/strava/callback
```

Optional empfohlen:

```text
STRAVA_COOKIE_SECRET=ein-langer-zufaelliger-secret
APP_ORIGIN=https://deine-vercel-url.vercel.app
```

Die App speichert den Strava Client Secret nicht im Frontend. OAuth-Tokens werden serverseitig verarbeitet und verschlüsselt in einem `HttpOnly` Cookie pro Profil abgelegt. Im Fortschritt-Tab kann jedes Profil seinen eigenen Strava-Account verbinden und Läufe synchronisieren.

Nur Aktivitäten vom Typ `Run` zählen. Wenn in der aktuellen Woche an einem Joggingtag ein passender Strava-Lauf gefunden wird, markiert die App den Tag automatisch als erledigt und zeigt "Automatisch erledigt durch Strava".

## Auf dem iPhone zum Homescreen hinzufügen

1. App-URL in Safari öffnen.
2. Teilen-Button antippen.
3. "Zum Home-Bildschirm" auswählen.
4. Namen "Trainingsplan" bestätigen.

Die App startet danach wie eine installierte Web-App im Vollbildmodus.

## Online und Offline

Die App ist nicht mehr als reine Offline-App gedacht. Grundfunktionen wie Login, manuelles Abhaken und lokaler Fortschritt funktionieren weiterhin über `localStorage`. Strava-Synchronisation benötigt Internet und das Vercel-Backend.

## GitHub Pages

Wenn GitHub Pages nicht automatisch aktiviert wurde:

1. Repository auf GitHub öffnen.
2. `Settings` öffnen.
3. `Pages` auswählen.
4. Unter `Build and deployment` als Source `Deploy from a branch` wählen.
5. Branch `main` und Ordner `/root` auswählen.
6. `Save` klicken.

Danach ist die App über die GitHub-Pages-URL des Repositorys erreichbar.

Hinweis: GitHub Pages reicht nur für das statische Frontend. Für Strava muss die App auf Vercel oder einer vergleichbaren Plattform mit sicheren Environment Variables deployed werden.
