# Trainingsplan

Moderne iPhone-optimierte Web-App für Ale und Nevio. Die App hilft Schülern, Jogging, Krafttraining, Regeneration und Wochenfortschritt übersichtlich zu planen.

## Features

- Profilauswahl für Ale und Nevio mit gespeichertem Login
- Automatische Tageserkennung mit passendem Training für den aktuellen Wochentag
- Joggingplan für beide Profile mit lockeren Läufen, Intervallen und Wochensteigerung
- Krafttrainingspläne für Ale und Nevio mit abhaken einzelner Übungen
- Fortschritt pro Profil getrennt gespeichert
- Wochenübersicht, Fortschrittsbalken, Motivationstext und Reset-Funktion
- Optionale Strava-Integration für Ale mit automatisch erkannten Jogging-Einheiten
- Service Worker mit Network-First-Strategie für aktuelle App-Dateien
- PWA-Unterstützung mit `manifest.json`
- iPhone-freundliches Liquid-Glass-Design mit Safe-Area-Unterstützung

## Live-App

Die Vercel-Version mit sicherem Backend ist hier erreichbar:

```text
https://alexandre-trainingsplan-app.vercel.app
```

Für die Strava-Integration muss diese Vercel-Version verwendet werden. Die GitHub-Pages-Version kann weiterhin das statische Frontend anzeigen, aber keine sicheren API-Routen ausführen.

## Benutzerprofile

### Ale

Ale ist 16 Jahre alt und trainiert für Muskelaufbau und bessere Ausdauer. Der Plan berücksichtigt:

- aktuelles Laufniveau von ca. 2 km
- Unihockey-Training am Dienstag
- Anfänger-Gym-Plan mit zwei festen Ganzkörper-Einheiten und einer optionalen Zusatz-Einheit
- weiterhin lockere Läufe, langer Lauf und kontrollierte Steigerung
- Hinweise zu Protein, Kreatin, Schlaf und Regeneration

### Nevio

Nevio bekommt eine eigene Fortschrittsspeicherung und einen eigenen Krafttrainingsplan mit Rücken/Brust, Beine/Core, Arme/Schultern und Cardio/Calisthenics. Strava ist für Nevio in der App deaktiviert.

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

Auf Vercel sind bereits gesetzt:

```text
APP_ORIGIN=https://alexandre-trainingsplan-app.vercel.app
STRAVA_REDIRECT_URI=https://alexandre-trainingsplan-app.vercel.app/api/strava/callback
STRAVA_COOKIE_SECRET=<zufällig erzeugt>
```

Diese zwei Werte müssen noch in Vercel unter `Project Settings` → `Environment Variables` ergänzt werden:

```text
STRAVA_CLIENT_ID=...
STRAVA_CLIENT_SECRET=...
```

In der Strava-Developer-App muss bei `Authorization Callback Domain` diese Domain stehen:

```text
alexandre-trainingsplan-app.vercel.app
```

Die App speichert den Strava Client Secret nicht im Frontend. OAuth-Tokens werden serverseitig verarbeitet und verschlüsselt in einem `HttpOnly` Cookie abgelegt. Im Fortschritt-Tab kann Ale seinen Strava-Account verbinden, die Verbindung prüfen und Läufe synchronisieren. Für Nevio wird die Strava-Karte nicht angezeigt.

Nur Aktivitäten vom Typ `Run` zählen. Wenn in der aktuellen Woche an einem Joggingtag ein passender Strava-Lauf gefunden wird, markiert die App den Tag automatisch als erledigt und zeigt "Automatisch erledigt durch Strava".

## App auf iPhone Home-Bildschirm hinzufügen

1. Safari öffnen.
2. Seite öffnen.
3. Teilen-Button drücken.
4. "Zum Home-Bildschirm" wählen.
5. Hinzufügen drücken.

Die App startet danach wie eine installierte Web-App im Vollbildmodus.

Hinweis: Wenn vorher schon ein altes Icon auf dem Home-Bildschirm war, muss man das alte Home-Screen-Icon zuerst löschen und die App danach neu hinzufügen.

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
