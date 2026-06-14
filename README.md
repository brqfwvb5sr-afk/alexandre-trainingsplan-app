# Trainingsplan

Minimalistische Trainingsplan-Web-App fuer Ale. Die App zeigt direkt den heutigen Trainingsfokus, eine Wochenuebersicht und den Kraftplan.

## Bereiche

- Heute: Tagesfokus, Aufgaben, Tagesstand und naechster Schritt
- Woche: Montag bis Sonntag als klarer Wochenplan
- Kraftplan: Trainingstage mit kompakten Uebungslisten und Saetzen/Wiederholungen

## Plan

- Montag: Push + Core
- Dienstag: Regeneration
- Mittwoch: Pull + Core
- Donnerstag: Beine + Core
- Freitag: Lauf + Bauch
- Samstag: Upper Pump
- Sonntag: Home Core optional

## Speicherung

Erledigte Tagesaufgaben und abgehakte Uebungen werden lokal im Browser gespeichert. Die App nutzt weiterhin `localStorage` und speichert unter Ale.

## Lokal starten

```bash
npm install
npm run build
```

Optional lokal servieren:

```bash
python -m http.server 8080
```

Dann oeffnen:

```text
http://localhost:8080
```

## iPhone Home-Bildschirm

1. Safari oeffnen.
2. App-URL oeffnen.
3. Teilen-Button druecken.
4. "Zum Home-Bildschirm" waehlen.
5. Hinzufuegen druecken.

Wenn ein altes Icon vorhanden ist, zuerst das alte Home-Screen-Icon loeschen und danach neu hinzufuegen.

## Deployment

Die App ist als statisches Frontend fuer GitHub Pages und Vercel geeignet. Nach einem Push auf `main` kann Vercel automatisch neu deployen.
