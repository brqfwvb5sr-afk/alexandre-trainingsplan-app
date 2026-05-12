const storageKeys = {
  profile: "trainingsplan.currentProfile",
  state: "trainingsplan.state.v2"
};
const APP_VERSION = "Version 7";
const STRAVA_API_BASE = "/api/strava";

const profiles = {
  ale: { label: "Ale", hasStrength: true, hasStrava: true },
  nevio: { label: "Nevio", hasStrength: true, hasStrava: false }
};

const weeklyTargets = {
  ale: 6,
  nevio: 5
};

const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const weekdayShort = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const weekIndexes = [1, 2, 3, 4, 5, 6, 0];

const planByProfile = {
  ale: {
    1: {
      category: "Jogging",
      title: "Lockerer Lauf",
      amount: "2.0-2.5 km",
      intensity: "Locker",
      explanation: "Du solltest noch reden können.",
      status: "Pflicht",
      optional: "10 Minuten Dehnen",
      weekTitle: "Jogging locker",
      weekAmount: "2.0-2.5 km",
      labels: ["Jogging"]
    },
    2: {
      category: "Unihockey",
      title: "Unihockey-Training",
      amount: "Vereinstraining",
      intensity: "Mittel bis hoch",
      explanation: "Heute kein Gym. Unihockey ist genug Belastung.",
      status: "Pflicht",
      optional: "1.5-2 km sehr locker, nur wenn genug Energie da ist",
      weekTitle: "Unihockey",
      weekAmount: "kein Gym",
      labels: ["Unihockey", "Kein Gym"]
    },
    3: {
      category: "Gym",
      title: "Gym A",
      amount: "Ganzkörper Technik",
      intensity: "Mittel",
      explanation: "Maschinen kontrolliert führen. Nicht bis komplett ans Limit.",
      status: "Pflicht",
      optional: "5-10 Minuten Mobility oder lockeres Auslaufen",
      weekTitle: "Gym A",
      weekAmount: "Ganzkörper Technik",
      labels: ["Gym"],
      strengthPlanId: "gym-a"
    },
    4: {
      category: "Jogging",
      title: "Lockerer Lauf",
      amount: "2.5-3 km",
      intensity: "Locker",
      explanation: "Ruhig laufen, gleichmäßig atmen.",
      status: "Pflicht",
      optional: "Plank 2 x 45 Sekunden",
      weekTitle: "Jogging locker",
      weekAmount: "2.5-3 km + Core",
      labels: ["Jogging", "Optional"]
    },
    5: {
      category: "Gym",
      title: "Gym B",
      amount: "Ganzkörper Aufbau",
      intensity: "Mittel",
      explanation: "Saubere Wiederholungen, Gewicht erst steigern wenn die Technik passt.",
      status: "Pflicht",
      optional: "Nach dem Training locker dehnen",
      weekTitle: "Gym B",
      weekAmount: "Ganzkörper Aufbau",
      labels: ["Gym"],
      strengthPlanId: "gym-b"
    },
    6: {
      category: "Jogging",
      title: "Langer Lauf",
      amount: "3 km",
      intensity: "Locker",
      explanation: "Nicht Vollgas. Du sollst sauber durchlaufen.",
      status: "Pflicht",
      optional: "+0.5 km pro Woche nur, wenn es sich gut anfühlt",
      weekTitle: "Langer Lauf",
      weekAmount: "3 km",
      labels: ["Jogging"]
    },
    0: {
      category: "Gym",
      title: "Gym C optional",
      amount: "Oberkörper + Core",
      intensity: "Locker bis mittel",
      explanation: "Nur machen, wenn Beine und Energie nach dem langen Lauf gut sind.",
      status: "Optional",
      optional: "Sonst Spaziergang oder lockeres Dehnen",
      weekTitle: "Gym C optional",
      weekAmount: "Oberkörper + Core",
      labels: ["Gym", "Optional"],
      strengthPlanId: "gym-c"
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
      ["Distanz", "2-3 km"]
    ]
  },
  {
    title: "Intervalllauf",
    rows: [
      ["Ziel", "schneller werden"],
      ["Beispiel", "1 km einlaufen"],
      ["Danach", "3 x 300 m schnell"],
      ["Pause", "dazwischen gehen"],
      ["Ende", "auslaufen"],
      ["Maximal", "1 x pro Woche"]
    ]
  },
  {
    title: "Langer Lauf",
    rows: [
      ["Ziel", "Ausdauer"],
      ["Start", "3 km"],
      ["Steigerung", "+0.5 km pro Woche"]
    ]
  }
];

const strengthPlansByProfile = {
  ale: {
    "gym-a": {
      id: "gym-a",
      dayLabel: "Mi",
      title: "Gym A",
      subtitle: "Ganzkörper Technik",
      warmup: "8-10 Minuten Laufband oder Bike locker + 2 leichte Aufwärmsätze",
      exercises: [
        ["leg-press", "Beinpresse", "3 x 10-12", "Füße stabil, Knie folgen den Zehen, kontrolliert tief gehen."],
        ["chest-press", "Brustpresse Maschine", "3 x 10-12", "Schulterblätter hinten halten, langsam ablassen, sauber drücken."],
        ["lat-pulldown", "Latziehen am Kabel", "3 x 10-12", "Brust leicht raus, Stange kontrolliert zur oberen Brust ziehen."],
        ["seated-row", "Sitzendes Rudern", "2-3 x 10-12", "Rücken gerade, Schulterblätter bewusst nach hinten ziehen."],
        ["plank", "Plank", "3 x 30-45 Sekunden", "Bauch anspannen, Rücken gerade, ruhig atmen."]
      ]
    },
    "gym-b": {
      id: "gym-b",
      dayLabel: "Fr",
      title: "Gym B",
      subtitle: "Ganzkörper Aufbau",
      warmup: "8-10 Minuten locker + erste Übung mit wenig Gewicht testen",
      exercises: [
        ["hack-squat", "Hack Squat oder Beinpresse", "3 x 8-10", "Nicht zu schwer starten, Knie stabil halten, volle Kontrolle."],
        ["leg-curl", "Beinbeuger Maschine", "3 x 10-12", "Langsam ziehen, oben kurz halten, nicht mit Schwung arbeiten."],
        ["incline-press", "Schrägbank-Brustpresse", "3 x 10-12", "Fokus auf saubere Bahn, Schultern unten halten."],
        ["cable-row", "Kabelrudern", "3 x 10-12", "Brust aufrecht, Ellbogen nah am Körper ziehen."],
        ["shoulder-press", "Schulterdrücken Maschine", "2 x 10-12", "Kontrolliert drücken, nicht ins Hohlkreuz fallen."],
        ["dead-bug", "Dead Bug", "3 x 8 pro Seite", "Langsam arbeiten, unteren Rücken ruhig am Boden halten."]
      ]
    },
    "gym-c": {
      id: "gym-c",
      dayLabel: "So",
      title: "Gym C optional",
      subtitle: "Oberkörper + Core leicht",
      warmup: "5-8 Minuten locker + Schultern mobilisieren",
      exercises: [
        ["assisted-pullup", "Assisted Pull-Up oder Latziehen", "3 x 8-12", "Nur so schwer wählen, dass jede Wiederholung sauber bleibt."],
        ["chest-supported-row", "Brustgestütztes Rudern", "3 x 10-12", "Oberkörper ruhig halten, nicht reißen."],
        ["cable-fly", "Cable Fly oder Butterfly Maschine", "2 x 12-15", "Leichtes Gewicht, Brust kontrolliert anspannen."],
        ["lateral-raise", "Seitheben Maschine oder Kurzhanteln", "2 x 12-15", "Arme leicht gebeugt, nicht hochschwingen."],
        ["face-pull", "Face Pulls am Kabel", "2 x 12-15", "Ellbogen hoch, Schulterblätter sauber nach hinten ziehen."],
        ["cable-crunch", "Cable Crunch oder Crunch Maschine", "3 x 10-12", "Bauch arbeitet, nicht am Nacken ziehen."]
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
let pendingStravaReturn = null;
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
const progressContent = document.querySelector("#progressContent");

document.addEventListener("DOMContentLoaded", init);

function init() {
  pendingStravaReturn = readStravaReturn();
  bindLogin();
  bindTabs();
  registerServiceWorker();

  const storedProfile = pendingStravaReturn?.profile || normalizeProfile(localStorage.getItem(storageKeys.profile) || "");
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
  const stravaReturn = pendingStravaReturn?.profile === profile ? pendingStravaReturn : null;
  currentProfile = profile;
  selectedStrengthPlan = null;
  localStorage.setItem(storageKeys.profile, profile);
  usernameInput.value = "";
  loginMessage.textContent = "";
  loginView.classList.add("is-hidden");
  mainView.classList.remove("is-hidden");
  setTab(stravaReturn ? "progress" : "today");

  if (stravaReturn) {
    pendingStravaReturn = null;
    if (stravaReturn.status === "connected") {
      syncStravaActivities();
    }
  }
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
  if (!selectedStrengthPlan || !plans[selectedStrengthPlan]) {
    selectedStrengthPlan = null;
  }

  strengthContent.innerHTML = `
    <div class="page-heading">
      <div class="page-topline">
        <h1>Krafttraining ${escapeHtml(profileLabel)}</h1>
        <button class="small-switch-button" type="button" data-switch-profile>Profil wechseln</button>
      </div>
      <p>${currentProfile === "ale" ? "Gym-Plan für Anfänger: sauber trainieren, langsam steigern." : "Wähle deinen heutigen Plan."}</p>
    </div>

    ${currentProfile === "ale" ? `
      <article class="optional-card">
        <p class="card-kicker">Regel</p>
        <h3>Erst Technik, dann Gewicht. Wenn alle Sätze sauber gehen, nächstes Mal leicht steigern.</h3>
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
    </article>
    ${supportsStrava(currentProfile) ? renderStravaCard() : ""}
    <article class="info-card">
      <h2>Wochentage</h2>
      <div class="day-pill-grid">
        ${weekIndexes.map((dayIndex) => {
          const done = isDayDone(currentProfile, dayIndex);
          const stravaMatch = supportsStrava(currentProfile) ? getStravaMatch(currentProfile, dayIndex) : null;
          return `
            <div class="day-pill ${done ? "is-done" : ""} ${stravaMatch ? "is-strava-done" : ""}">
              <strong>${escapeHtml(weekdayShort[dayIndex])}</strong>
              <span>${stravaMatch ? "Strava" : done ? "erledigt" : "offen"}</span>
            </div>
          `;
        }).join("")}
      </div>
      ${supportsStrava(currentProfile) ? renderStravaBadges() : ""}
    </article>
    <button class="reset-button" type="button" id="resetWeekButton">Woche zurücksetzen</button>
    <p class="app-version">${APP_VERSION}</p>
  `;

  document.querySelector("#resetWeekButton").addEventListener("click", () => {
    resetWeek(currentProfile);
    renderAll();
  });

  const connectButton = document.querySelector("#stravaConnectButton");
  connectButton?.addEventListener("click", connectStrava);

  const syncButton = document.querySelector("#stravaSyncButton");
  syncButton?.addEventListener("click", () => syncStravaActivities());

  const statusButton = document.querySelector("#stravaStatusButton");
  statusButton?.addEventListener("click", () => checkStravaStatus());
}

function renderStravaCard() {
  const strava = getProfileData(currentProfile).strava || {};
  const connected = Boolean(strava.connected && strava.athlete);
  const runs = Array.isArray(strava.runs) ? strava.runs.slice(0, 3) : [];
  const staticHostWarning = isGitHubPagesHost()
    ? "Strava braucht ein Vercel-Deployment. GitHub Pages kann kein sicheres Backend ausführen."
    : "";
  const status = connected
    ? `Verbunden als ${formatAthleteName(strava.athlete)}`
    : "Nicht verbunden";

  return `
    <article class="strava-card">
      <div class="strava-card-head">
        <div>
          <p class="card-kicker">Strava</p>
          <h2>Strava</h2>
          <p>${escapeHtml(status)}</p>
        </div>
        <span class="strava-dot ${connected ? "is-connected" : ""}"></span>
      </div>
      <div class="strava-actions">
        <button class="primary-button" type="button" id="stravaConnectButton">Mit Strava verbinden</button>
        <button class="ghost-button" type="button" id="stravaStatusButton">Verbindung prüfen</button>
        <button class="ghost-button" type="button" id="stravaSyncButton">Läufe synchronisieren</button>
      </div>
      ${staticHostWarning ? `<p class="strava-error">${escapeHtml(staticHostWarning)}</p>` : ""}
      ${strava.message ? `<p class="strava-message">${escapeHtml(strava.message)}</p>` : ""}
      ${strava.error ? `<p class="strava-error">${escapeHtml(strava.error)}</p>` : ""}
      ${runs.length ? `
        <div class="strava-run-list">
          ${runs.map((run) => `
            <div class="strava-run">
              <strong>${escapeHtml(formatRunDate(run.startDateLocal))}</strong>
              <span>${escapeHtml(run.distance)} · ${escapeHtml(run.pace)} · ${escapeHtml(run.duration)}</span>
              <small>${escapeHtml(run.type)}</small>
            </div>
          `).join("")}
        </div>
      ` : ""}
    </article>
  `;
}

function renderStravaBadges() {
  const profileWeek = getProfileWeek(currentProfile);
  const matches = profileWeek.stravaMatches || {};
  const rows = weekIndexes
    .filter((dayIndex) => matches[dayIndex])
    .map((dayIndex) => `
      <div class="strava-badge">
        <strong>${escapeHtml(weekdays[dayIndex])}</strong>
        <span>Automatisch erledigt durch Strava</span>
      </div>
    `);

  return rows.length ? `<div class="strava-badge-list">${rows.join("")}</div>` : "";
}

function getProfileData(profile) {
  state[profile] ||= {};
  return state[profile];
}

function getStravaMatch(profile, dayIndex) {
  return getProfileWeek(profile).stravaMatches?.[dayIndex] || null;
}

function supportsStrava(profile) {
  return Boolean(profiles[profile]?.hasStrava);
}

function readStravaReturn() {
  const params = new URLSearchParams(window.location.search);
  const stravaStatus = params.get("strava");
  if (!stravaStatus) return null;

  const profile = normalizeProfile(params.get("profile"));
  if (!profile) return null;
  if (!supportsStrava(profile)) {
    params.delete("strava");
    params.delete("profile");
    params.delete("state");
    params.delete("message");
    const cleanUrl = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`;
    window.history.replaceState({}, document.title, cleanUrl);
    return null;
  }

  if (profile && stravaStatus === "error") {
    const message = params.get("message") || "Strava-Verbindung fehlgeschlagen. Bitte erneut versuchen.";
    localStorage.setItem(storageKeys.profile, profile);
    setStravaMessage(profile, "", message);
  }

  params.delete("strava");
  params.delete("profile");
  params.delete("state");
  params.delete("message");

  const cleanUrl = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`;
  window.history.replaceState({}, document.title, cleanUrl);
  return { profile, status: stravaStatus };
}

function connectStrava() {
  if (!supportsStrava(currentProfile)) return;

  if (isGitHubPagesHost()) {
    setStravaMessage(currentProfile, "", "GitHub Pages kann kein sicheres Strava-Backend ausführen. Bitte die Vercel-Version verwenden.");
    renderProgress();
    return;
  }

  const returnTo = `${window.location.origin}${window.location.pathname}`;
  window.location.href = `${STRAVA_API_BASE}/login?profile=${encodeURIComponent(currentProfile)}&returnTo=${encodeURIComponent(returnTo)}`;
}

async function syncStravaActivities(options = {}) {
  const profile = currentProfile;
  if (!profile) return;
  if (!supportsStrava(profile)) return;

  if (isGitHubPagesHost()) {
    setStravaMessage(profile, "", "Strava-Sync ist nur auf dem Vercel-Deployment verfügbar.");
    renderProgress();
    return;
  }

  setStravaMessage(profile, "Läufe werden synchronisiert.", "");
  if (!options.silent) renderProgress();

  try {
    const response = await fetch(`${STRAVA_API_BASE}/activities?profile=${encodeURIComponent(profile)}`, {
      credentials: "include"
    });

    if (response.status === 401) {
      setStravaConnection(profile, {
        connected: false,
        error: "Strava ist noch nicht verbunden. Bitte einmal neu verbinden und danach Läufe synchronisieren.",
        message: ""
      });
      renderAll();
      return;
    }

    if (!response.ok) {
      throw new Error("Strava-Synchronisation fehlgeschlagen.");
    }

    const data = await response.json();
    const runs = Array.isArray(data.runs) ? data.runs : [];
    const matches = applyStravaRunsToProgress(profile, runs);
    setStravaConnection(profile, {
      connected: true,
      athlete: data.athlete,
      runs: runs.slice(0, 3),
      lastSync: new Date().toISOString(),
      message: matches
        ? `${matches} Jogging-Einheit automatisch erledigt.`
        : "Synchronisiert. Kein passender geplanter Lauf gefunden.",
      error: ""
    });
    saveState();
    renderAll();
  } catch (error) {
    setStravaMessage(profile, "", error.message || "Strava-Synchronisation fehlgeschlagen.");
    renderAll();
  }
}

async function checkStravaStatus() {
  const profile = currentProfile;
  if (!profile || !supportsStrava(profile)) return;

  if (isGitHubPagesHost()) {
    setStravaMessage(profile, "", "Strava funktioniert nur auf der Vercel-Version, nicht auf GitHub Pages.");
    renderProgress();
    return;
  }

  setStravaMessage(profile, "Strava-Verbindung wird geprüft.", "");
  renderProgress();

  try {
    const response = await fetch(`${STRAVA_API_BASE}/status?profile=${encodeURIComponent(profile)}`, {
      credentials: "include"
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Strava-Status konnte nicht geprüft werden.");
    }

    if (!data.configured) {
      const missing = Array.isArray(data.missing) && data.missing.length ? data.missing.join(", ") : "Vercel-Variablen";
      setStravaMessage(profile, "", `Backend erreichbar, aber es fehlen: ${missing}.`);
      renderAll();
      return;
    }

    if (data.connected) {
      setStravaConnection(profile, {
        connected: true,
        athlete: data.athlete,
        message: "Strava ist verbunden. Läufe können synchronisiert werden.",
        error: ""
      });
    } else {
      setStravaConnection(profile, {
        connected: false,
        message: "Backend ist bereit. Strava ist auf diesem Gerät noch nicht verbunden.",
        error: ""
      });
    }
    renderAll();
  } catch (error) {
    setStravaMessage(profile, "", error.message || "Strava-Status konnte nicht geprüft werden.");
    renderAll();
  }
}

function setStravaConnection(profile, data) {
  const profileData = getProfileData(profile);
  profileData.strava = { ...(profileData.strava || {}), ...data };
  saveState();
}

function setStravaMessage(profile, message, error) {
  setStravaConnection(profile, { message, error });
}

function applyStravaRunsToProgress(profile, runs) {
  let matches = 0;
  const profileWeek = getProfileWeek(profile);
  profileWeek.stravaMatches ||= {};

  runs.forEach((run) => {
    const dayIndex = getRunDayIndex(run);
    if (dayIndex === null || dayIndex === undefined) return;
    if (!isCurrentWeek(run.startDateLocal)) return;
    if (!isPlannedJoggingDay(profile, dayIndex)) return;
    if (!runMeetsPlannedDistance(profile, dayIndex, run.distanceKm)) return;

    if (!profileWeek.days[dayIndex]) matches += 1;
    profileWeek.days[dayIndex] = true;
    profileWeek.stravaMatches[dayIndex] = {
      id: run.id,
      distance: run.distance,
      pace: run.pace,
      duration: run.duration,
      startDateLocal: run.startDateLocal
    };
  });

  return matches;
}

function isPlannedJoggingDay(profile, dayIndex) {
  return planByProfile[profile]?.[dayIndex]?.labels?.includes("Jogging");
}

function runMeetsPlannedDistance(profile, dayIndex, distanceKm) {
  const minDistance = extractMinimumDistance(planByProfile[profile]?.[dayIndex]?.amount || "");
  if (!minDistance) return true;
  return Number(distanceKm) >= minDistance * 0.85;
}

function extractMinimumDistance(value) {
  const match = String(value).match(/(\d+(?:[.,]\d+)?)/);
  return match ? Number(match[1].replace(",", ".")) : null;
}

function getRunDayIndex(run) {
  if (!run.startDateLocal) return null;
  return new Date(run.startDateLocal).getDay();
}

function isCurrentWeek(dateValue) {
  if (!dateValue) return false;
  return getWeekKey(new Date(dateValue)) === getWeekKey(new Date());
}

function formatAthleteName(athlete = {}) {
  return [athlete.firstname, athlete.lastname].filter(Boolean).join(" ") || athlete.username || "Strava";
}

function formatRunDate(value) {
  if (!value) return "Unbekannt";
  return new Intl.DateTimeFormat("de-CH", { weekday: "short", day: "2-digit", month: "2-digit" }).format(new Date(value));
}

function isGitHubPagesHost() {
  return window.location.hostname.endsWith("github.io");
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
      navigator.serviceWorker.register("service-worker.js?v=7").then((registration) => {
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
