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
- Offlinefähig durch Service Worker
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

Die App besteht nur aus HTML, CSS und JavaScript.

1. Ordner öffnen.
2. `index.html` im Browser starten.

Für vollständige PWA- und Offline-Tests empfiehlt sich ein lokaler Server:

```bash
python -m http.server 8080
```

Danach im Browser öffnen:

```text
http://localhost:8080
```

## Auf dem iPhone zum Homescreen hinzufügen

1. App-URL in Safari öffnen.
2. Teilen-Button antippen.
3. "Zum Home-Bildschirm" auswählen.
4. Namen "Trainingsplan" bestätigen.

Die App startet danach wie eine installierte Web-App im Vollbildmodus.

## Offline-Funktion

Beim ersten Besuch werden `index.html`, `style.css`, `app.js`, `manifest.json` und der Service Worker im Cache gespeichert. Danach kann die App auch ohne Internetverbindung geöffnet werden. Fortschritt und Login bleiben über `localStorage` pro Profil erhalten.

## GitHub Pages

Wenn GitHub Pages nicht automatisch aktiviert wurde:

1. Repository auf GitHub öffnen.
2. `Settings` öffnen.
3. `Pages` auswählen.
4. Unter `Build and deployment` als Source `Deploy from a branch` wählen.
5. Branch `main` und Ordner `/root` auswählen.
6. `Save` klicken.

Danach ist die App über die GitHub-Pages-URL des Repositorys erreichbar.
