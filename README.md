# Trainingsplan

Moderne iPhone-optimierte Web-App fuer Ale und Nevio. Die App plant Gym, Jogging, Ernaehrung und Wochenfortschritt klar als taeglichen Trainings-Assistenten.

## Features

- Profilauswahl fuer Ale und Nevio mit gespeichertem Login
- Automatische Tageserkennung mit konkreter Heute-Karte
- Ale: 6-Wochen-Recomp-Plan mit Oberkoerper-Fokus, Gym und Ernaehrung
- Nevio: eigener Krafttrainingsplan bleibt getrennt gespeichert
- Joggingseite mit lockeren Laeufen, Intervallen und Steigerung
- Ernaehrungstab mit Protein, Mahlzeiten und Regeln
- Fortschritt pro Profil getrennt in `localStorage`
- PWA-Unterstuetzung mit `manifest.json` und Service Worker
- iPhone-freundliches Dark-Mode-Design mit Safe-Area-Unterstuetzung

## Live-App

```text
https://alexandre-trainingsplan-app.vercel.app
```

Die App funktioniert auch als statisches Frontend auf GitHub Pages.

## Benutzerprofile

### Ale

Ale ist 16 Jahre alt, ca. 183 cm gross und aktuell ca. 67.5 kg nach grossem Abendessen. Der Plan ist auf Koerper-Recomposition ausgelegt: mehr Schulter, Ruecken, Brust und Arme, Bauch ruhiger, aber ohne Crash-Diaet.

- Montag: Push Fokus + lockeres Laufband
- Dienstag: Regeneration
- Mittwoch: Pull Fokus + lockeres Laufband
- Donnerstag: Beine + Core
- Freitag: lockerer Lauf, kein Gym
- Samstag: Upper Pump + Laufband
- Sonntag: optional Home Core oder frei

Ernaehrung fuer Ale:

- Protein: ca. 110-130 g pro Tag
- Keine aggressive Diaet, weil Gewicht und Groesse eher leicht sind
- Kohlenhydrate rund ums Training fuer Leistung
- 8-10 Stunden Schlaf als Ziel
- Kreatin optional 3-5 g taeglich, genug trinken

### Nevio

Nevio hat weiterhin eine eigene Fortschrittsspeicherung und seinen eigenen Krafttrainingsplan mit Ruecken/Brust, Beine/Core, Arme/Schultern und Cardio/Calisthenics.

## Lokal starten

Das Frontend besteht aus HTML, CSS und JavaScript.

1. Ordner oeffnen.
2. `index.html` direkt im Browser starten.

Fuer lokale Tests mit Server:

```bash
python -m http.server 8080
```

Danach oeffnen:

```text
http://localhost:8080
```

## App auf iPhone Home-Bildschirm hinzufuegen

1. Safari oeffnen.
2. Seite oeffnen.
3. Teilen-Button druecken.
4. "Zum Home-Bildschirm" waehlen.
5. Hinzufuegen druecken.

Wenn vorher ein altes Icon auf dem Home-Bildschirm war, dieses zuerst loeschen und die App neu hinzufuegen.

## Online und Offline

Grundfunktionen wie Login, manuelles Abhaken und Fortschritt funktionieren ueber `localStorage`. Der Service Worker nutzt Network-First fuer HTML, CSS, JS und Manifest, damit iPhones neue Versionen schneller laden.

## GitHub Pages

Wenn GitHub Pages nicht automatisch aktiviert wurde:

1. Repository auf GitHub oeffnen.
2. `Settings` oeffnen.
3. `Pages` auswaehlen.
4. Unter `Build and deployment` als Source `Deploy from a branch` waehlen.
5. Branch `main` und Ordner `/root` auswaehlen.
6. `Save` klicken.
