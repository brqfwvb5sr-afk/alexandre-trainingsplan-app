const storageKeys = {
  profile: "trainingsplan.currentProfile",
  state: "trainingsplan.state.v2"
};
const APP_VERSION = "Version 10";

const profiles = {
  ale: { label: "Ale", hasStrength: true },
  nevio: { label: "Nevio", hasStrength: true }
};

const weeklyTargets = {
  ale: 5,
  nevio: 5
};

const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const weekdayShort = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const weekIndexes = [1, 2, 3, 4, 5, 6, 0];

const planByProfile = {
  ale: {
    1: {
      category: "Gym + Jogging",
      title: "Push Fokus",
      amount: "Brust, Schultern, Trizeps + 15-20 Min locker",
      intensity: "Mittel",
      explanation: "Oberkörper breit machen: Brust und Schultern sauber trainieren, danach nur locker bewegen.",
      status: "Pflicht",
      optional: "10 Minuten Mobility, wenn Schulter oder Ellenbogen ziehen",
      weekTitle: "Push Fokus",
      weekAmount: "Brust, Schultern, Trizeps + 15-20 Min locker",
      labels: ["Gym", "Jogging"],
      strengthPlanId: "ale-push"
    },
    2: {
      category: "Regeneration",
      title: "Regeneration",
      amount: "Kein Gym",
      intensity: "Sehr locker",
      explanation: "Heute wächst du nicht durch mehr Training, sondern durch Erholung.",
      status: "Optional",
      optional: "20-40 Minuten Spaziergang oder 10 Minuten Dehnen",
      weekTitle: "Regeneration",
      weekAmount: "kein Gym, lockere Schritte",
      labels: ["Pause", "Optional"]
    },
    3: {
      category: "Gym + Jogging",
      title: "Pull Fokus",
      amount: "Rücken, hintere Schulter, Bizeps + 15-20 Min locker",
      intensity: "Mittel",
      explanation: "Rückenbreite und Haltung. Danach locker laufen, keine Intervalle.",
      status: "Pflicht",
      optional: "2 Sätze Face Pulls extra, wenn du dich gut fühlst",
      weekTitle: "Pull Fokus",
      weekAmount: "Rücken, hintere Schulter, Bizeps + locker laufen",
      labels: ["Gym", "Jogging"],
      strengthPlanId: "ale-pull"
    },
    4: {
      category: "Gym",
      title: "Beine + Core",
      amount: "Beine, Bauch, unterer Rücken",
      intensity: "Mittel",
      explanation: "Nicht auslassen: starke Beine und Core lassen den Körper insgesamt athletischer wirken.",
      status: "Pflicht",
      optional: "Nur 10 Minuten sehr locker warmmachen, kein harter Lauf danach",
      weekTitle: "Beine + Core",
      weekAmount: "Beine, Bauch, unterer Rücken",
      labels: ["Gym"],
      strengthPlanId: "ale-legs"
    },
    5: {
      category: "Jogging",
      title: "Lockerer Lauf",
      amount: "3-4 km",
      intensity: "Locker",
      explanation: "Kein Gym. Fettverbrennung und Ausdauer, aber nicht Vollgas.",
      status: "Pflicht",
      optional: "Danach 8 Minuten Core zu Hause, wenn du Energie hast",
      weekTitle: "Jogging locker",
      weekAmount: "3-4 km, kein Gym",
      labels: ["Jogging", "Optional"]
    },
    6: {
      category: "Gym + Jogging",
      title: "Upper Pump",
      amount: "Brust, Rücken, Arme + 20 Min Laufband",
      intensity: "Mittel",
      explanation: "Oberkörper-Volumen für sichtbare Form. Keine Ego-Gewichte.",
      status: "Pflicht",
      optional: "Letzte Sätze nur sauber, nicht bis komplett zerstört",
      weekTitle: "Upper Pump",
      weekAmount: "Brust, Rücken, Arme + Laufband",
      labels: ["Gym", "Jogging"],
      strengthPlanId: "ale-upper"
    },
    0: {
      category: "Home + Regeneration",
      title: "Home Core",
      amount: "12-15 Minuten zu Hause",
      intensity: "Locker",
      explanation: "Kein Gym. Kurzer Core-Block, dann essen und schlafen.",
      status: "Optional",
      optional: "Wenn du müde bist: komplett frei machen",
      weekTitle: "Home Core optional",
      weekAmount: "12-15 Min Core oder frei",
      labels: ["Home", "Optional"],
      strengthPlanId: "ale-home"
    }
  },
  nevio: {
    1: {
      category: "Kraft",
      title: "Rücken + Brust",
      amount: "45-70 Minuten",
      intensity: "Mittel",
      explanation: "Maschinen sauber führen, ohne Schwung arbeiten.",
      status: "Pflicht",
      optional: "Aufwärmen: Liegestütze, Klimmzüge oder Theraband",
      weekTitle: "Rücken + Brust",
      weekAmount: "45-70 Minuten",
      labels: ["Kraft"],
      strengthPlanId: "nevio-mo"
    },
    2: {
      category: "Kraft",
      title: "Beine + Bauch + unterer Rücken",
      amount: "45-70 Minuten",
      intensity: "Mittel",
      explanation: "Kontrollierte Wiederholungen, stabiler Stand.",
      status: "Pflicht",
      optional: "Aufwärmen: Laufband locker",
      weekTitle: "Beine + Bauch + unterer Rücken",
      weekAmount: "45-70 Minuten",
      labels: ["Kraft"],
      strengthPlanId: "nevio-di"
    },
    3: {
      category: "Pause",
      title: "Pause",
      amount: "Keine Kraftübungen",
      intensity: "Sehr locker",
      explanation: "Regeneration. Optional locker bewegen oder dehnen.",
      status: "Pflicht",
      optional: "Spazieren oder leicht dehnen",
      weekTitle: "Pause",
      weekAmount: "Regeneration",
      labels: ["Pause", "Optional"]
    },
    4: {
      category: "Kraft",
      title: "Arme + Schultern",
      amount: "45-70 Minuten",
      intensity: "Mittel",
      explanation: "Ruhig curlen, drücken und heben. Keine Schwung-Wiederholungen.",
      status: "Pflicht",
      optional: "Aufwärmen: Liegestütze",
      weekTitle: "Arme + Schultern",
      weekAmount: "45-70 Minuten",
      labels: ["Kraft"],
      strengthPlanId: "nevio-do"
    },
    5: {
      category: "Cardio + Calisthenics",
      title: "Cardio + Calisthenics",
      amount: "45-70 Minuten",
      intensity: "Mittel",
      explanation: "Saubere Körpergewichtsübungen plus lockeres Laufband.",
      status: "Pflicht",
      optional: "Aufwärmen: Theraband",
      weekTitle: "Cardio + Calisthenics",
      weekAmount: "Pull-Ups, Dips, Push-Ups + Laufband",
      labels: ["Cardio + Calisthenics"],
      strengthPlanId: "nevio-fr"
    },
    6: {
      category: "Jogging / Erholung",
      title: "Jogging / Erholung",
      amount: "Optional",
      intensity: "Locker",
      explanation: "Optional lockerer Lauf nach Joggingplan oder Erholung.",
      status: "Optional",
      optional: "Langer Lauf 3 km nur, wenn du dich fit fühlst",
      weekTitle: "Jogging / optional",
      weekAmount: "lockerer Lauf oder Erholung",
      labels: ["Jogging", "Optional"]
    },
    0: {
      category: "Erholung",
      title: "Erholung",
      amount: "Optional",
      intensity: "Sehr locker",
      explanation: "Erholen, spazieren oder locker dehnen.",
      status: "Optional",
      optional: "Spaziergang oder leichtes Dehnen",
      weekTitle: "Erholung / optional",
      weekAmount: "Spaziergang oder lockeres Dehnen",
      labels: ["Pause", "Optional"]
    }
  }
};

const joggingCards = [
  {
    title: "Lockerer Lauf",
    rows: [
      ["Ziel", "Grundausdauer"],
      ["Tempo", "reden können"],
      ["Distanz", "3-4 km"]
    ]
  },
  {
    title: "Intervalllauf",
    rows: [
      ["Ziel", "schneller werden"],
      ["Beispiel", "800 m einlaufen"],
      ["Danach", "4 x 200 m zügig"],
      ["Pause", "dazwischen gehen"],
      ["Ende", "auslaufen"],
      ["Maximal", "alle 2 Wochen"]
    ]
  },
  {
    title: "Langer Lauf",
    rows: [
      ["Ziel", "Fettstoffwechsel"],
      ["Start", "4 km"],
      ["Steigerung", "nur wenn Beine frisch sind"]
    ]
  }
];

const nutritionPlansByProfile = {
  ale: {
    title: "Ernährung Ale",
    subtitle: "6 Wochen Recomp: straffer werden, aber nicht runterhungern.",
    stats: [
      ["Größe", "183 cm"],
      ["Gewicht", "67.5 kg nach Abendessen"],
      ["Ziel", "mehr Schulter/Rücken/Brust, Bauch ruhiger"],
      ["Protein", "110-130 g pro Tag"],
      ["Schlaf", "8-10 Stunden"]
    ],
    rules: [
      ["Kein Crash-Defizit", "Du bist nicht schwer. Iss leicht kontrolliert, aber genug für Training und Wachstum."],
      ["Teller-Regel", "Jede Hauptmahlzeit: Protein + Gemüse/Frucht + gute Kohlenhydrate."],
      ["Carbs ums Training", "Vor oder nach Gym: Reis, Pasta, Brot, Kartoffeln, Haferflocken oder Banane."],
      ["Bauchfett", "Wird durch Wochenbilanz weniger, nicht durch Bauchübungen allein."],
      ["Kreatin", "3-5 g täglich reichen. Viel trinken, keine Ladephase nötig."]
    ],
    meals: [
      ["Frühstück", "Skyr/Quark oder Eier + Haferflocken/Brot + Frucht"],
      ["Schule", "Sandwich mit Poulet/Käse/Ei oder Wrap + Wasser"],
      ["Vor Gym", "Banane, Brot oder kleines Müsli 60-120 Min vorher"],
      ["Nach Gym", "Proteinshake oder Joghurt plus normale Mahlzeit"],
      ["Abendessen", "Proteinquelle + Reis/Pasta/Kartoffeln + Gemüse"],
      ["Snack", "Skyr, Milch, Nüsse, Frucht oder Vollkornbrot"]
    ],
    weekGoal: "Wenn das Gewicht stark fällt oder du im Gym schwächer wirst: mehr essen. Wenn Bauch deutlich mehr wird: Süßgetränke/Snacks zuerst reduzieren."
  },
  nevio: {
    title: "Ernährung",
    subtitle: "Einfach halten: genug essen, genug Protein, genug trinken.",
    stats: [
      ["Protein", "zu jeder Hauptmahlzeit"],
      ["Trinken", "Wasser über den Tag"],
      ["Schlaf", "8-10 Stunden"]
    ],
    rules: [
      ["Regel", "Nicht kompliziert machen: regelmäßig essen und Training abhaken."],
      ["Vor Training", "Kleine Kohlenhydratquelle hilft: Banane, Brot oder Müsli."],
      ["Nach Training", "Normale Mahlzeit mit Protein reicht."]
    ],
    meals: [
      ["Frühstück", "Joghurt/Quark, Eier oder Käsebrot"],
      ["Mittag", "Protein + Kohlenhydrate + Gemüse"],
      ["Snack", "Frucht, Milchprodukt oder Sandwich"],
      ["Abendessen", "Normal essen, nicht komplett sparen"]
    ],
    weekGoal: "Konstanz ist wichtiger als perfekte Zahlen."
  }
};

const strengthPlansByProfile = {
  ale: {
    "ale-push": {
      id: "ale-push",
      dayLabel: "Mo",
      title: "Push Fokus",
      subtitle: "Brust, Schultern, Trizeps",
      warmup: "6-8 Minuten Laufband locker + 2 leichte Aufwärmsätze Brustpresse",
      exercises: [
        ["incline-press", "Schrägbank-Brustpresse", "3 x 8-12", "Oberkörper ruhig, Schultern unten, obere Brust kontrolliert treffen."],
        ["chest-press", "Brustpresse Maschine", "3 x 8-12", "Schulterblätter hinten halten, langsam ablassen, sauber drücken."],
        ["cable-fly", "Cable Fly oder Butterfly", "2 x 12-15", "Leichtes Gewicht, Brust bewusst anspannen, nicht reißen."],
        ["shoulder-press", "Schulterdrücken Maschine", "3 x 10-12", "Bauch anspannen, nicht ins Hohlkreuz fallen."],
        ["lateral-raise", "Seitheben Maschine oder Kabel", "4 x 12-20", "Für breite Schultern. Leicht bleiben, oben kurz halten."],
        ["triceps-pushdown", "Trizepsdrücken am Seil", "3 x 10-15", "Ellbogen eng am Körper halten, unten kurz anspannen."],
        ["plank", "Plank", "3 x 45-60 Sekunden", "Körper gerade, Bauch fest, ruhig atmen."]
      ]
    },
    "ale-pull": {
      id: "ale-pull",
      dayLabel: "Mi",
      title: "Pull Fokus",
      subtitle: "Rücken, hintere Schulter, Bizeps",
      warmup: "8 Minuten locker + 2 leichte Sätze Latziehen",
      exercises: [
        ["lat-pulldown", "Latziehen breit", "3 x 8-12", "Brust leicht raus, Ellbogen nach unten ziehen, nicht schwingen."],
        ["seated-row", "Sitzendes Rudern eng", "3 x 10-12", "Rücken gerade, Schulterblätter aktiv nach hinten ziehen."],
        ["chest-row", "Brustgestütztes Rudern", "3 x 10-12", "Oberkörper bleibt fest an der Bank, sauber ziehen."],
        ["reverse-fly", "Reverse Butterfly", "3 x 12-15", "Hintere Schulter und Haltung. Kleine, kontrollierte Bewegung."],
        ["face-pull", "Face Pulls am Kabel", "2 x 12-15", "Zum Gesicht ziehen, Ellbogen hoch, Schultern nicht hochziehen."],
        ["biceps-machine", "Bizeps-Curl Maschine", "3 x 10-12", "Ellbogen stabil, langsam hoch und runter."],
        ["hammer-curls", "Hammer Curls", "2 x 12-15", "Handflächen zueinander, Oberkörper ruhig halten."]
      ]
    },
    "ale-legs": {
      id: "ale-legs",
      dayLabel: "Do",
      title: "Beine + Core",
      subtitle: "Beine, Bauch, unterer Rücken",
      warmup: "10 Minuten Laufband sehr locker + 2 leichte Sätze Beinpresse",
      exercises: [
        ["leg-press", "Beinpresse", "4 x 8-12", "Füße stabil, Knie folgen den Zehen, kontrolliert tief gehen."],
        ["leg-extension", "Leg Extension", "3 x 12", "Oben kurz halten, langsam ablassen."],
        ["leg-curl", "Leg Curl", "3 x 12", "Kontrolliert ziehen, nicht mit Schwung arbeiten."],
        ["walking-lunges", "Ausfallschritte oder Split Squat", "2 x 10 pro Bein", "Langsam, Knie stabil, kleiner Start wenn es neu ist."],
        ["calf-press", "Waden an Beinpresse", "3 x 15-20", "Volle Bewegung, oben kurz halten, langsam senken."],
        ["hyperextensions", "Hyperextensions", "3 x 10-12", "Rücken kontrolliert strecken, nicht überstrecken."],
        ["leg-raises", "Leg Raises", "3 x 10-15", "Bauch anspannen, Beine kontrolliert heben."]
      ]
    },
    "ale-upper": {
      id: "ale-upper",
      dayLabel: "Sa",
      title: "Upper Pump",
      subtitle: "Oberkörper, Arme, Laufband",
      warmup: "8 Minuten Laufband locker + Gelenke kurz mobilisieren",
      exercises: [
        ["assisted-pullup", "Assisted Pull-Up oder Latziehen", "3 x 8-12", "Rückenbreite. Sauber ziehen, nicht mit Schwung arbeiten."],
        ["machine-chest", "Brustpresse oder Butterfly", "3 x 10-12", "Kontrollierte Wiederholungen, Brust bewusst anspannen."],
        ["cable-row", "Kabelrudern", "3 x 10-12", "Brust aufrecht, Schulterblätter nach hinten ziehen."],
        ["lateral-raise-pump", "Seitheben Pump", "3 x 15-20", "Leicht, sauber, Schultern brennen lassen."],
        ["superset-arms", "Bizeps + Trizeps Supersatz", "3 x 12 + 12", "Curl direkt gefolgt von Trizepsdrücken, sauber bleiben."],
        ["cable-crunch", "Cable Crunch", "3 x 12-15", "Bauch rund machen, nicht am Nacken ziehen."],
        ["treadmill", "Laufband locker", "20 Minuten", "Ruhiges Tempo, du solltest noch reden können."]
      ]
    },
    "ale-home": {
      id: "ale-home",
      dayLabel: "So",
      title: "Home Core",
      subtitle: "Bauch, Haltung, Mobility",
      warmup: "2 Minuten locker bewegen",
      exercises: [
        ["dead-bug", "Dead Bug", "3 x 10 pro Seite", "Langsam, unteren Rücken ruhig am Boden halten."],
        ["side-plank", "Seitstütz", "2 x 30-45 Sekunden pro Seite", "Hüfte oben halten, Körper gerade."],
        ["pushups-clean", "Saubere Liegestütze", "2 x max sauber", "Nur saubere Wiederholungen, nicht durchhängen."],
        ["band-pullapart", "Band Pull-Aparts oder Reverse Fly leicht", "2 x 20", "Für Haltung und hintere Schulter."],
        ["mobility", "Brust/Lat/Hüfte dehnen", "5 Minuten", "Ruhig atmen, nicht federn."]
      ]
    }
  },
  nevio: {
    "nevio-mo": {
      id: "nevio-mo",
      dayLabel: "Mo",
      title: "Rücken + Brust",
      subtitle: "Latziehen, Rudern, Brust",
      warmup: "Liegestütze, Klimmzüge oder Theraband",
      exercises: [
        ["latziehen", "Seilzug Latziehen", "3 x 12", "Brust leicht raus, kontrolliert zur oberen Brust ziehen, nicht mit Schwung arbeiten."],
        ["rudern-niedrig", "Plate Loaded Rudern niedrig", "3 x 12", "Rücken gerade halten, Schulterblätter aktiv nach hinten ziehen."],
        ["brustpresse", "Plate Loaded Brustpresse", "3 x 12", "Kontrolliert drücken, Schultern unten halten, nicht komplett hektisch ausstrecken."],
        ["schraegbank", "Schrägbank Maschine", "3 x 12", "Fokus auf obere Brust, langsam ablassen, sauber drücken.", "Top mit Buch Y"],
        ["butterfly", "Maschine Butterflys mit gestreckten Armen", "3 x 12", "Arme leicht gebeugt oder gestreckt halten, Brust bewusst anspannen, Bewegung kontrollieren."]
      ]
    },
    "nevio-di": {
      id: "nevio-di",
      dayLabel: "Di",
      title: "Beine + Bauch + unterer Rücken",
      subtitle: "Leg Press, Core, Rücken",
      warmup: "Laufband locker",
      exercises: [
        ["leg-press", "Leg Press", "4 x 12", "Füße stabil, Knie nicht nach innen kippen lassen, kontrolliert tief gehen."],
        ["leg-extensions", "Leg Extensions", "3 x 12", "Oben kurz halten, langsam ablassen."],
        ["leg-curl", "Leg Curl", "3 x 12", "Kontrolliert ziehen, nicht mit Schwung arbeiten."],
        ["waden-beinpresse", "Waden an Beinpresse", "4-5 x 12", "Volle Bewegung, oben kurz halten, langsam senken."],
        ["leg-raises", "Leg Raises", "3 x 12", "Bauch anspannen, Beine kontrolliert heben, nicht schwingen."],
        ["crunches", "Crunches", "3 x 12", "Langsam hochrollen, Bauch bewusst anspannen."],
        ["side-plank", "Plank seitlich", "2 x max", "Körper gerade halten, Hüfte nicht absinken lassen."],
        ["hyperextensions", "Hyperextensions", "3 x 12", "Rücken kontrolliert strecken, nicht überstrecken."]
      ]
    },
    "nevio-do": {
      id: "nevio-do",
      dayLabel: "Do",
      title: "Arme + Schultern",
      subtitle: "Bizeps, Trizeps, Seitheben",
      warmup: "Liegestütze",
      exercises: [
        ["bizeps-maschine", "Maschine Bizeps Curls hoch", "3 x 12", "Ellbogen stabil halten, langsam und sauber curlen."],
        ["hammer-curls", "Hammer Curls", "3 x 12", "Handflächen zueinander, nicht mit dem Oberkörper schwingen."],
        ["trizeps-seilzug", "Seilzug Trizepsdrücken / Trizepsziehen", "3 x 12", "Ellbogen eng am Körper, unten Trizeps anspannen."],
        ["trizeps-ueberkopf", "Überkopf Trizeps", "3 x 12", "Ellbogen möglichst ruhig halten, kontrolliert strecken."],
        ["seitheben", "Kurzhantel Seitheben", "3 x 12", "Leicht gebeugte Arme, nicht zu hoch schwingen, Schultern nicht hochziehen."]
      ]
    },
    "nevio-fr": {
      id: "nevio-fr",
      dayLabel: "Fr",
      title: "Cardio + Calisthenics",
      subtitle: "Pull-Ups, Dips, Push-Ups",
      warmup: "Theraband",
      exercises: [
        ["pull-ups", "Pull-Ups", "3 x max", "Sauber ziehen, volle Kontrolle, nicht mit Schwung."],
        ["dips", "Dips", "3 x max", "Schultern stabil halten, kontrolliert runter und hoch."],
        ["push-ups", "Push-Ups", "3 x max", "Körper gerade, Brust Richtung Boden, sauber drücken."],
        ["laufband", "Laufband", "20-30 Minuten · locker bis mittel", "Nicht komplett Vollgas, kontrolliert ausdauerorientiert laufen."]
      ]
    }
  }
};

let currentProfile = null;
let activeTab = "today";
let selectedStrengthPlan = null;
let state = loadState();

const loginView = document.querySelector("#loginView");
const mainView = document.querySelector("#mainView");
const loginForm = document.querySelector("#loginForm");
const usernameInput = document.querySelector("#usernameInput");
const loginMessage = document.querySelector("#loginMessage");
const todayContent = document.querySelector("#todayContent");
const weekContent = document.querySelector("#weekContent");
const joggingContent = document.querySelector("#joggingContent");
const strengthContent = document.querySelector("#strengthContent");
const nutritionContent = document.querySelector("#nutritionContent");
const progressContent = document.querySelector("#progressContent");

document.addEventListener("DOMContentLoaded", init);

function init() {
  bindLogin();
  bindTabs();
  registerServiceWorker();

  const storedProfile = normalizeProfile(localStorage.getItem(storageKeys.profile) || "");
  if (storedProfile) {
    openProfile(storedProfile);
  } else {
    showLogin();
  }
}

function bindLogin() {
  document.querySelectorAll("[data-login-profile]").forEach((button) => {
    button.addEventListener("click", () => openProfile(button.dataset.loginProfile));
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const profile = normalizeProfile(usernameInput.value);
    if (!profile) {
      loginMessage.textContent = "Bitte Ale oder Nevio eingeben.";
      return;
    }
    openProfile(profile);
  });

  mainView.addEventListener("click", (event) => {
    if (!event.target.closest("[data-switch-profile]")) return;
    localStorage.removeItem(storageKeys.profile);
    currentProfile = null;
    selectedStrengthPlan = null;
    showLogin();
  });
}

function bindTabs() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => setTab(button.dataset.tab));
  });
}

function normalizeProfile(value) {
  const clean = String(value || "").trim().toLowerCase();
  if (clean === "ale") return "ale";
  if (clean === "nevio") return "nevio";
  return null;
}

function openProfile(profile) {
  currentProfile = profile;
  selectedStrengthPlan = null;
  localStorage.setItem(storageKeys.profile, profile);
  usernameInput.value = "";
  loginMessage.textContent = "";
  loginView.classList.add("is-hidden");
  mainView.classList.remove("is-hidden");
  setTab("today");
}

function showLogin() {
  mainView.classList.add("is-hidden");
  loginView.classList.remove("is-hidden");
  window.setTimeout(() => usernameInput.focus({ preventScroll: true }), 120);
}

function setTab(tab) {
  activeTab = tab;
  document.querySelectorAll("[data-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === tab);
  });
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tab);
  });
  renderAll();
}

function renderAll() {
  if (!currentProfile) return;
  renderToday();
  renderWeek();
  renderJogging();
  renderStrength();
  renderNutrition();
  renderProgress();
}

function renderToday() {
  const dayIndex = new Date().getDay();
  const plan = planByProfile[currentProfile][dayIndex];
  const done = isDayDone(currentProfile, dayIndex);

  todayContent.innerHTML = `
    <div class="page-heading today-heading">
      <div class="page-topline">
        <h1>Heute</h1>
        <button class="small-switch-button" type="button" data-switch-profile>Profil wechseln</button>
      </div>
      <p>${escapeHtml(weekdays[dayIndex])}</p>
      <p>Profil: ${escapeHtml(profiles[currentProfile].label)}</p>
    </div>

    <article class="today-main-card">
      <div class="main-card-top">
        <p class="card-kicker">Dein Training heute</p>
        <span class="status-badge ${done ? "is-done" : ""}">${done ? "erledigt" : escapeHtml(plan.status)}</span>
      </div>

      <h2>${escapeHtml(plan.title)}</h2>

      <div class="today-facts">
        <div class="fact-row">
          <span>Training</span>
          <strong>${escapeHtml(plan.category)}</strong>
        </div>
        <div class="fact-row">
          <span>Wie viel</span>
          <strong>${escapeHtml(plan.amount)}</strong>
        </div>
        <div class="fact-row">
          <span>Intensität</span>
          <strong>${escapeHtml(plan.intensity)}</strong>
        </div>
      </div>

      <p class="today-explanation">${escapeHtml(plan.explanation)}</p>

      <button class="done-button ${done ? "is-done" : ""}" type="button" data-day-toggle="${dayIndex}">
        ${done ? "Erledigt" : "Erledigt"}
      </button>
      ${plan.strengthPlanId ? `
        <button class="ghost-button wide-button today-strength-link" type="button" data-open-strength="${escapeAttr(plan.strengthPlanId)}">
          Übungen anzeigen
        </button>
      ` : ""}
    </article>

    ${plan.optional ? `
      <article class="optional-card">
        <p class="card-kicker">Optional</p>
        <h3>${escapeHtml(plan.optional)}</h3>
      </article>
    ` : ""}
  `;

  todayContent.querySelector("[data-day-toggle]").addEventListener("click", () => {
    toggleDayDone(currentProfile, dayIndex);
    renderAll();
  });

  todayContent.querySelector("[data-open-strength]")?.addEventListener("click", (event) => {
    selectedStrengthPlan = event.currentTarget.dataset.openStrength;
    setTab("strength");
  });
}

function renderWeek() {
  const todayIndex = new Date().getDay();

  weekContent.innerHTML = `
    <div class="page-heading">
      <div class="page-topline">
        <h1>Woche</h1>
        <button class="small-switch-button" type="button" data-switch-profile>Profil wechseln</button>
      </div>
      <p>Dein Plan von Montag bis Sonntag.</p>
    </div>
    <div class="week-list">
      ${weekIndexes.map((dayIndex) => {
        const plan = planByProfile[currentProfile][dayIndex];
        const isToday = dayIndex === todayIndex;
        return `
          <article class="week-card ${isToday ? "is-today" : ""}">
            <div class="week-card-head">
              <div>
                <span class="day-label">${escapeHtml(weekdays[dayIndex])}</span>
                <h2>${escapeHtml(plan.weekTitle)}</h2>
              </div>
              ${isToday ? `<span class="today-chip">Heute</span>` : ""}
            </div>
            <p class="week-amount">${escapeHtml(plan.weekAmount)}</p>
            <div class="label-row">
              ${plan.labels.map((label) => `<span class="plan-label ${labelClass(label)}">${escapeHtml(label)}</span>`).join("")}
            </div>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderJogging() {
  joggingContent.innerHTML = `
    <div class="page-heading">
      <div class="page-topline">
        <h1>Jogging</h1>
        <button class="small-switch-button" type="button" data-switch-profile>Profil wechseln</button>
      </div>
      <p class="rule-line">80 % locker, 20 % schnell.</p>
    </div>
    <div class="card-grid">
      ${joggingCards.map((card) => `
        <article class="info-card">
          <h2>${escapeHtml(card.title)}</h2>
          <div class="info-rows">
            ${card.rows.map(([label, value]) => `
              <div class="info-row">
                <span>${escapeHtml(label)}</span>
                <strong>${escapeHtml(value)}</strong>
              </div>
            `).join("")}
          </div>
        </article>
      `).join("")}
    </div>
    <article class="info-card">
      <h2>Steigerung</h2>
      <div class="table-wrap">
        <table class="progression-table">
          <thead>
            <tr>
              <th>Woche</th>
              <th>Langer Lauf</th>
            </tr>
          </thead>
          <tbody>
            ${[3, 3.5, 4, 4.5, 5].map((distance, index) => `
              <tr>
                <td>Woche ${index + 1}</td>
                <td>${distance.toFixed(1)} km</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </article>
  `;
}

function renderStrength() {
  const plans = strengthPlansByProfile[currentProfile] || {};
  const planList = Object.values(plans);

  if (!planList.length) {
    strengthContent.innerHTML = `
      <div class="page-heading">
        <div class="page-topline">
          <h1>Krafttraining ${escapeHtml(profiles[currentProfile].label)}</h1>
          <button class="small-switch-button" type="button" data-switch-profile>Profil wechseln</button>
        </div>
        <p>Keine Übungen eingetragen.</p>
      </div>
      <article class="info-card">
        <h2>Kein Kraftplan eingetragen</h2>
        <p>Für dieses Profil gibt es aktuell keine Kraftübungen.</p>
      </article>
    `;
    return;
  }

  const profileLabel = profiles[currentProfile].label;
  const strengthTitle = currentProfile === "ale" ? "Gym-Plan Ale" : `Krafttraining ${profileLabel}`;
  if (!selectedStrengthPlan || !plans[selectedStrengthPlan]) {
    selectedStrengthPlan = null;
  }

  strengthContent.innerHTML = `
    <div class="page-heading">
      <div class="page-topline">
        <h1>${escapeHtml(strengthTitle)}</h1>
        <button class="small-switch-button" type="button" data-switch-profile>Profil wechseln</button>
      </div>
      <p>${currentProfile === "ale" ? "Mo, Mi, Do und Sa Gym. Di Regeneration, Fr Lauf, So Home optional." : "Wähle deinen heutigen Plan."}</p>
    </div>

    ${currentProfile === "ale" ? `
      <article class="optional-card">
        <p class="card-kicker">Regel</p>
        <h3>Erst Technik, dann Gewicht. Jede Übung mit 1-2 Wiederholungen Reserve beenden.</h3>
      </article>
    ` : ""}

    <div class="strength-choice-grid">
      ${planList.map((plan) => `
        <button class="strength-choice ${selectedStrengthPlan === plan.id ? "is-selected" : ""}" type="button" data-strength-select="${plan.id}">
          <span>${escapeHtml(plan.dayLabel ? `${plan.dayLabel} - ${plan.title}` : plan.title)}</span>
          <strong>${escapeHtml(plan.subtitle)}</strong>
        </button>
      `).join("")}
    </div>

    ${selectedStrengthPlan ? renderExerciseList(plans[selectedStrengthPlan]) : `
      <article class="optional-card">
        <p class="card-kicker">Checkliste</p>
        <h3>Tippe auf eine Auswahlkarte.</h3>
      </article>
    `}
  `;

  strengthContent.querySelectorAll("[data-strength-select]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedStrengthPlan = button.dataset.strengthSelect;
      renderStrength();
    });
  });

  strengthContent.querySelectorAll("[data-exercise-check]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleExercise(currentProfile, button.dataset.exerciseCheck);
      renderStrength();
    });
  });
}

function renderExerciseList(plan) {
  return `
    <div class="exercise-stack">
      ${plan.warmup ? `
        <article class="optional-card warmup-card">
          <p class="card-kicker">Aufwärmen</p>
          <h3>${escapeHtml(plan.warmup)}</h3>
        </article>
      ` : ""}
      ${plan.exercises.map(([id, name, prescription, note, extra]) => {
        const checkId = `${plan.id}:${id}`;
        const done = isExerciseDone(currentProfile, checkId);
        return `
          <article class="exercise-card ${done ? "is-done" : ""}">
            <div>
              <h2>${escapeHtml(name)}</h2>
              <strong>${escapeHtml(prescription)}</strong>
              <p>${escapeHtml(note)}</p>
              ${extra ? `<small class="exercise-extra">${escapeHtml(extra)}</small>` : ""}
            </div>
            <button class="exercise-check" type="button" data-exercise-check="${escapeAttr(checkId)}" aria-pressed="${done}">
              ${done ? "Erledigt" : "Offen"}
            </button>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderNutrition() {
  const plan = nutritionPlansByProfile[currentProfile] || nutritionPlansByProfile.nevio;

  nutritionContent.innerHTML = `
    <div class="page-heading">
      <div class="page-topline">
        <h1>Essen</h1>
        <button class="small-switch-button" type="button" data-switch-profile>Profil wechseln</button>
      </div>
      <p>${escapeHtml(plan.subtitle)}</p>
    </div>

    <article class="nutrition-hero info-card">
      <p class="card-kicker">Ziel</p>
      <h2>${escapeHtml(plan.title)}</h2>
      <div class="info-rows">
        ${plan.stats.map(([label, value]) => `
          <div class="info-row">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(value)}</strong>
          </div>
        `).join("")}
      </div>
    </article>

    <div class="card-grid">
      ${plan.rules.map(([title, text]) => `
        <article class="info-card compact-card">
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(text)}</p>
        </article>
      `).join("")}
    </div>

    <article class="info-card">
      <h2>Essens-Bausteine</h2>
      <div class="info-rows">
        ${plan.meals.map(([label, value]) => `
          <div class="info-row nutrition-row">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(value)}</strong>
          </div>
        `).join("")}
      </div>
    </article>

    <article class="optional-card">
      <p class="card-kicker">Woche prüfen</p>
      <h3>${escapeHtml(plan.weekGoal)}</h3>
    </article>
  `;
}

function renderProgress() {
  const doneDays = weekIndexes.filter((dayIndex) => isDayDone(currentProfile, dayIndex));
  const count = doneDays.length;
  const target = weeklyTargets[currentProfile] || 5;
  const percent = Math.min(100, Math.round((count / target) * 100));

  progressContent.innerHTML = `
    <div class="page-heading">
      <div class="page-topline">
        <h1>Fortschritt</h1>
        <button class="small-switch-button" type="button" data-switch-profile>Profil wechseln</button>
      </div>
      <p>Profil: ${escapeHtml(profiles[currentProfile].label)}</p>
    </div>
    <article class="progress-card">
      <div class="progress-topline">
        <span>Diese Woche erledigt</span>
        <strong>${count} / ${target}</strong>
      </div>
      <div class="progress-bar" aria-label="Fortschritt ${percent} Prozent">
        <span style="width: ${percent}%"></span>
      </div>
      <p class="progress-note">${escapeHtml(getMotivation(count))}</p>
    </article>
    <article class="info-card">
      <h2>Wochentage</h2>
      <div class="day-pill-grid">
        ${weekIndexes.map((dayIndex) => {
          const done = isDayDone(currentProfile, dayIndex);
          return `
            <div class="day-pill ${done ? "is-done" : ""}">
              <strong>${escapeHtml(weekdayShort[dayIndex])}</strong>
              <span>${done ? "erledigt" : "offen"}</span>
            </div>
          `;
        }).join("")}
      </div>
    </article>
    <button class="reset-button" type="button" id="resetWeekButton">Woche zurücksetzen</button>
    <p class="app-version">${APP_VERSION}</p>
  `;

  document.querySelector("#resetWeekButton").addEventListener("click", () => {
    resetWeek(currentProfile);
    renderAll();
  });

}

function getProfileData(profile) {
  state[profile] ||= {};
  return state[profile];
}

function getMotivation(count) {
  if (count <= 2) return "Ruhig starten. Diese Woche zählt vor allem Wiederkommen.";
  if (count <= 4) return "Sehr gut. Du baust Routine auf.";
  return "Stark. Jetzt sauber essen und genug schlafen.";
}

function loadState() {
  try {
    const freshState = JSON.parse(localStorage.getItem(storageKeys.state));
    if (freshState) return freshState;
    return JSON.parse(localStorage.getItem("trainingsplan.state.v1")) || {};
  } catch {
    return {};
  }
}

function saveState() {
  localStorage.setItem(storageKeys.state, JSON.stringify(state));
}

function getProfileWeek(profile) {
  const week = getWeekKey(new Date());
  state[profile] ||= {};
  state[profile][week] ||= { days: {}, exercises: {} };
  return state[profile][week];
}

function isDayDone(profile, dayIndex) {
  return Boolean(getProfileWeek(profile).days[dayIndex]);
}

function toggleDayDone(profile, dayIndex) {
  const profileWeek = getProfileWeek(profile);
  profileWeek.days[dayIndex] = !profileWeek.days[dayIndex];
  saveState();
}

function isExerciseDone(profile, id) {
  return Boolean(getProfileWeek(profile).exercises[id]);
}

function toggleExercise(profile, id) {
  const profileWeek = getProfileWeek(profile);
  profileWeek.exercises[id] = !profileWeek.exercises[id];
  saveState();
}

function resetWeek(profile) {
  const week = getWeekKey(new Date());
  state[profile] ||= {};
  state[profile][week] = { days: {}, exercises: {} };
  saveState();
}

function getWeekKey(date) {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil((((target - yearStart) / 86400000) + 1) / 7);
  return `${target.getUTCFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
}

function labelClass(label) {
  return `is-${String(label)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    let updateRegistration = null;
    let isReloadingForUpdate = false;

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (isReloadingForUpdate) return;
      isReloadingForUpdate = true;
      window.location.reload();
    });

    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js?v=10").then((registration) => {
        updateRegistration = registration;
        registration.update().catch(() => {});

        if (registration.waiting && navigator.serviceWorker.controller) {
          showUpdateNotice(registration);
        }

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              showUpdateNotice(registration);
            }
          });
        });
      }).catch(() => {});
    });

    window.addEventListener("online", () => {
      updateRegistration?.update().catch(() => {});
    });
  }
}

function showUpdateNotice(registration) {
  if (document.querySelector("#updateNotice")) return;

  const notice = document.createElement("div");
  notice.className = "update-notice";
  notice.id = "updateNotice";
  notice.innerHTML = `
    <span>Neue Version verfügbar – App neu laden</span>
    <button type="button" id="reloadUpdateButton">Jetzt neu laden</button>
  `;
  document.body.appendChild(notice);

  notice.querySelector("#reloadUpdateButton").addEventListener("click", () => {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      return;
    }
    window.location.reload();
  });
}
