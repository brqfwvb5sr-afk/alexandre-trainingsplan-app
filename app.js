const storageKeys = {
  profile: "trainingsplan.currentProfile",
  state: "trainingsplan.state.v1"
};

const profiles = {
  ale: { label: "Ale", hasStrength: true },
  nevio: { label: "Nevio", hasStrength: false }
};

const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const weekOrder = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

const joggingTypes = [
  {
    title: "Lockerer Lauf",
    kicker: "Grundausdauer",
    details: ["Tempo: reden können", "Distanz: 2–3 km", "Gefühl: ruhig und kontrolliert"],
    note: "Perfekt für Schultage und als Basis für bessere Ausdauer."
  },
  {
    title: "Intervalllauf",
    kicker: "Schneller werden",
    details: ["1 km einlaufen", "3×300 m schnell", "Dazwischen gehen", "Auslaufen"],
    note: "Nur 1× pro Woche. Schnell heißt sauber schnell, nicht komplett zerstören."
  },
  {
    title: "Langer Lauf",
    kicker: "Ausdauer aufbauen",
    details: ["Start: 3 km", "Steigerung: +0.5 km pro Woche", "Nicht Vollgas laufen"],
    note: "Wenn es sich schwer anfühlt, bleibt die Distanz eine Woche gleich."
  }
];

const dailyPlans = {
  ale: {
    1: {
      title: "Jogging locker",
      description: "Heute steht ein ruhiger Lauf an. Ziel ist ein entspannter Start in die Woche.",
      intensity: "Locker, reden möglich",
      duration: "2.0–2.5 km plus optional 10 Minuten Dehnen",
      tasks: [
        ["Lauf", "2.0–2.5 km locker"],
        ["Optional", "10 Minuten Dehnen"]
      ],
      hint: "Bleib bewusst langsam. Du sollst danach noch Energie haben."
    },
    2: {
      title: "Unihockey-Training",
      description: "Der Sportverein ist heute die Hauptbelastung. Krafttraining bleibt draußen.",
      intensity: "Mittel bis hoch durch Training",
      duration: "Training plus optional 1.5–2 km sehr locker",
      tasks: [
        ["Unihockey", "Training sauber mitmachen"],
        ["Optional", "Nur sehr lockerer Lauf, wenn Energie und Zeit da sind"]
      ],
      hint: "Schule und Regeneration gehen vor."
    },
    3: {
      title: "Krafttraining A",
      description: "Oberkörper und Core stehen im Fokus. Ein kurzer Lauf ist nur optional.",
      intensity: "Kontrolliert, technisch sauber",
      duration: "35–45 Minuten plus optional 1.5–2 km locker",
      tasks: [
        ["Kraft A", "Oberkörper + Core"],
        ["Optional", "Kurzer lockerer Lauf nur, wenn du dich fit fühlst"]
      ],
      hint: "Qualität schlägt Tempo. Jede Wiederholung sauber."
    },
    4: {
      title: "Jogging locker",
      description: "Ein ruhiger Lauf mit kurzem Core-Finish.",
      intensity: "Locker, gleichmäßig",
      duration: "2.5–3 km plus Plank 2×45 Sekunden",
      tasks: [
        ["Lauf", "2.5–3 km locker"],
        ["Core", "Plank 2×45 Sekunden"]
      ],
      hint: "Der Lauf soll sich leicht genug anfühlen, um sauber zu atmen."
    },
    5: {
      title: "Pause / Regeneration",
      description: "Heute wird der Körper frischer gemacht, nicht müder.",
      intensity: "Sehr locker",
      duration: "Optional Stepper 15–20 Minuten",
      tasks: [
        ["Pause", "Regeneration ernst nehmen"],
        ["Optional", "Stepper 15–20 Minuten sehr locker"]
      ],
      hint: "Regeneration ist Teil des Plans."
    },
    6: {
      title: "Langer lockerer Lauf",
      description: "Der wichtigste Lauf für deine Ausdauerbasis.",
      intensity: "Locker, nicht Vollgas",
      duration: "Start 3 km, jede Woche +0.5 km wenn es gut läuft",
      tasks: [
        ["Langer Lauf", "Start 3 km"],
        ["Steigerung", "Nur +0.5 km, wenn es sich gut anfühlt"]
      ],
      hint: "Lieber stabil und ruhig als schnell und kaputt."
    },
    0: {
      title: "Krafttraining B",
      description: "Beine und Core. Lockerer Spaziergang oder Stepper ist optional.",
      intensity: "Kontrolliert, sauber",
      duration: "35–45 Minuten",
      tasks: [
        ["Kraft B", "Beine + Core"],
        ["Optional", "Spaziergang oder Stepper locker"]
      ],
      hint: "Arbeite langsam und stabil. Knie und Rücken bleiben kontrolliert."
    }
  },
  nevio: {
    1: {
      title: "Jogging locker",
      description: "Heute steht ein ruhiger Lauf an. Ziel ist ein entspannter Start in die Woche.",
      intensity: "Locker, reden möglich",
      duration: "2.0–2.5 km plus optional 10 Minuten Dehnen",
      tasks: [
        ["Lauf", "2.0–2.5 km locker"],
        ["Optional", "10 Minuten Dehnen"]
      ],
      hint: "Bleib bewusst langsam. Du sollst danach noch Energie haben."
    },
    2: {
      title: "Locker bewegen",
      description: "Heute bleibt die Belastung niedrig. Jogging ist nur optional.",
      intensity: "Sehr locker",
      duration: "Optional 1.5–2 km",
      tasks: [
        ["Optional", "1.5–2 km sehr locker"],
        ["Regeneration", "Schule, Schlaf und Energie beachten"]
      ],
      hint: "Wenn du müde bist, ist Pause die richtige Entscheidung."
    },
    3: {
      title: "Heute wäre Krafttraining",
      description: "Für Nevio ist noch kein Kraftplan eingetragen. Schicke deine Daten an Ale.",
      intensity: "Kein Kraftplan vorhanden",
      duration: "Heute kein eigener Kraftblock",
      tasks: [
        ["Info", "Ziele, Equipment und mögliche Trainingstage an Ale schicken"]
      ],
      hint: "Der Joggingplan bleibt gleich, Kraft wird ergänzt, sobald Daten da sind."
    },
    4: {
      title: "Jogging locker",
      description: "Ein ruhiger Lauf mit kurzem Core-Finish, wenn du dich gut fühlst.",
      intensity: "Locker, gleichmäßig",
      duration: "2.5–3 km plus optional Plank 2×45 Sekunden",
      tasks: [
        ["Lauf", "2.5–3 km locker"],
        ["Optional", "Plank 2×45 Sekunden"]
      ],
      hint: "Der Lauf soll sich leicht genug anfühlen, um sauber zu atmen."
    },
    5: {
      title: "Pause / Regeneration",
      description: "Heute wird der Körper frischer gemacht, nicht müder.",
      intensity: "Sehr locker",
      duration: "Optional 15–20 Minuten locker bewegen",
      tasks: [
        ["Pause", "Regeneration ernst nehmen"],
        ["Optional", "Sehr locker bewegen"]
      ],
      hint: "Regeneration ist Teil des Plans."
    },
    6: {
      title: "Langer lockerer Lauf",
      description: "Der wichtigste Lauf für deine Ausdauerbasis.",
      intensity: "Locker, nicht Vollgas",
      duration: "Start 3 km, jede Woche +0.5 km wenn es gut läuft",
      tasks: [
        ["Langer Lauf", "Start 3 km"],
        ["Steigerung", "Nur +0.5 km, wenn es sich gut anfühlt"]
      ],
      hint: "Lieber stabil und ruhig als schnell und kaputt."
    },
    0: {
      title: "Heute wäre Krafttraining",
      description: "Für Nevio ist noch kein Kraftplan eingetragen. Schicke deine Daten an Ale.",
      intensity: "Kein Kraftplan vorhanden",
      duration: "Heute kein eigener Kraftblock",
      tasks: [
        ["Info", "Ziele, Equipment und mögliche Trainingstage an Ale schicken"]
      ],
      hint: "Der Joggingplan bleibt gleich, Kraft wird ergänzt, sobald Daten da sind."
    }
  }
};

const strengthPlans = [
  {
    id: "strength-a",
    title: "Krafttraining A",
    subtitle: "Oberkörper + Core",
    exercises: [
      ["pushups", "Liegestütze", "3 Sätze, so viele sauber gehen", "Körper gerade halten, nicht ins Hohlkreuz fallen."],
      ["row", "Rudern mit 10-kg-Kurzhantel", "3×10–12 pro Seite", "Rücken gerade, Ellbogen eng am Körper ziehen."],
      ["press", "Schulterdrücken mit 3-kg-Hanteln", "3×12–15", "Kontrolliert drücken, Schultern nicht hochziehen."],
      ["curls", "Bizeps-Curls mit 3-kg-Hanteln", "3×15–20", "Ellbogen ruhig halten, nicht schwingen."],
      ["plank", "Plank", "3×45–60 Sekunden", "Bauch anspannen, Rücken gerade."]
    ]
  },
  {
    id: "strength-b",
    title: "Krafttraining B",
    subtitle: "Beine + Core",
    exercises: [
      ["squats", "Kniebeugen", "4×15–25", "Knie stabil, Rücken gerade, tief aber kontrolliert."],
      ["lunges", "Ausfallschritte", "3×10 pro Bein", "Langsam und kontrolliert, Knie nicht nach innen kippen."],
      ["calves", "Wadenheben", "3×20", "Oben kurz halten, langsam senken."],
      ["legraises", "Beinheben", "3×12–15", "Bauch anspannen, nicht mit Schwung arbeiten."],
      ["sideplank", "Seitstütz", "2×30–45 Sekunden pro Seite", "Hüfte oben halten, Körper gerade."]
    ]
  }
];

const nutritionCards = [
  ["Protein", "Ziel ca. 1.6–2.0 g pro kg Körpergewicht pro Tag."],
  ["Kreatin", "3–5 g täglich reichen meistens; bei 6 g genug trinken."],
  ["Schlaf", "8–9 Stunden wären ideal, besonders an Trainingstagen."],
  ["Essen", "Muskelaufbau braucht genug Energie, nicht stark ins Defizit gehen."]
];

let currentProfile = null;
let activeTab = "today";
let state = loadState();

const loginView = document.querySelector("#loginView");
const mainView = document.querySelector("#mainView");
const loginForm = document.querySelector("#loginForm");
const usernameInput = document.querySelector("#usernameInput");
const loginMessage = document.querySelector("#loginMessage");
const todayLine = document.querySelector("#todayLine");
const profileLine = document.querySelector("#profileLine");
const todayContent = document.querySelector("#todayContent");
const joggingCards = document.querySelector("#joggingCards");
const progressionRows = document.querySelector("#progressionRows");
const strengthContent = document.querySelector("#strengthContent");
const progressContent = document.querySelector("#progressContent");
const switchProfileButton = document.querySelector("#switchProfileButton");

document.addEventListener("DOMContentLoaded", init);

function init() {
  bindLogin();
  bindTabs();
  renderStaticJogging();
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

  switchProfileButton.addEventListener("click", () => {
    localStorage.removeItem(storageKeys.profile);
    currentProfile = null;
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
  localStorage.setItem(storageKeys.profile, profile);
  usernameInput.value = "";
  loginMessage.textContent = "";
  loginView.classList.add("is-hidden");
  mainView.classList.remove("is-hidden");
  activeTab = "today";
  setTab("today");
  renderAll();
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
  if (currentProfile) renderAll();
}

function renderAll() {
  if (!currentProfile) return;
  const today = new Date();
  todayLine.textContent = `Heute: ${weekdays[today.getDay()]}`;
  profileLine.textContent = `Profil: ${profiles[currentProfile].label}`;
  renderToday();
  renderStrength();
  renderProgress();
}

function renderToday() {
  const dayIndex = new Date().getDay();
  const plan = dailyPlans[currentProfile][dayIndex];
  const done = isDayDone(currentProfile, dayIndex);
  const doneText = done ? "Erledigt" : "Erledigt markieren";

  todayContent.innerHTML = `
    <article class="glass-card">
      <div class="card-header">
        <div>
          <p class="card-kicker">${escapeHtml(weekdays[dayIndex])}</p>
          <h2>${escapeHtml(plan.title)}</h2>
        </div>
        <span class="status-badge ${done ? "is-done" : ""}">${done ? "erledigt" : "offen"}</span>
      </div>
      <p>${escapeHtml(plan.description)}</p>
      <div class="meta-row">
        <span class="meta-pill">Intensität: ${escapeHtml(plan.intensity)}</span>
        <span class="meta-pill">Dauer: ${escapeHtml(plan.duration)}</span>
      </div>
      <ul class="task-list">
        ${plan.tasks.map(([title, text]) => `
          <li class="task-item">
            <strong>${escapeHtml(title)}</strong>
            <span>${escapeHtml(text)}</span>
          </li>
        `).join("")}
      </ul>
      <button class="done-button ${done ? "is-done" : ""}" type="button" data-day-toggle="${dayIndex}">
        ${doneText}
      </button>
    </article>
    <article class="notice-card">
      <strong>Achte heute darauf</strong>
      <span>${escapeHtml(plan.hint)}</span>
    </article>
    ${renderNutritionCards()}
  `;

  todayContent.querySelector("[data-day-toggle]").addEventListener("click", () => {
    toggleDayDone(currentProfile, dayIndex);
    renderAll();
  });
}

function renderStaticJogging() {
  joggingCards.innerHTML = joggingTypes.map((type) => `
    <article class="glass-card">
      <div class="card-header">
        <div>
          <p class="card-kicker">${escapeHtml(type.kicker)}</p>
          <h3>${escapeHtml(type.title)}</h3>
        </div>
      </div>
      <ul class="simple-list">
        ${type.details.map((detail) => `<li class="task-item"><span>${escapeHtml(detail)}</span></li>`).join("")}
      </ul>
      <div class="meta-row">
        <span class="meta-pill">${escapeHtml(type.note)}</span>
      </div>
    </article>
  `).join("");

  progressionRows.innerHTML = [3, 3.5, 4, 4.5, 5].map((distance, index) => `
    <tr>
      <td>Woche ${index + 1}</td>
      <td>${distance.toFixed(1)} km</td>
    </tr>
  `).join("");
}

function renderStrength() {
  if (!profiles[currentProfile].hasStrength) {
    strengthContent.innerHTML = `
      <article class="glass-card">
        <p class="card-kicker">Kraft</p>
        <h2>Noch kein Kraftplan vorhanden</h2>
        <p>Nevio hat noch keinen eigenen Krafttrainingsplan. Schicke deine Ziele, verfügbares Equipment und mögliche Trainingstage an Ale, damit der Plan ergänzt werden kann.</p>
        <button class="copy-button" type="button" id="showNevioInfo">Infos für Ale anzeigen</button>
        <div class="copy-area" id="nevioCopyArea">
          <textarea class="copy-text" id="nevioCopyText" readonly>Hey Ale, kannst du mir meinen Kraftplan einbauen?
Ziele:
Equipment:
Mögliche Trainingstage:
Besonderheiten:</textarea>
          <button class="ghost-button" type="button" id="copyNevioText">Text kopieren</button>
          <p class="form-message" id="copyMessage"></p>
        </div>
      </article>
      <article class="notice-card">
        <strong>An Ale schicken</strong>
        <span>Schicke Ale deine Ziele, verfügbares Equipment und Trainingstage. Danach kann der Kraftplan ergänzt werden.</span>
      </article>
    `;
    bindNevioStrengthCard();
    return;
  }

  strengthContent.innerHTML = `
    <article class="notice-card">
      <strong>Qualität vor Gewicht.</strong>
      <span>Saubere Wiederholungen sind wichtiger als schnell fertig werden.</span>
    </article>
    <div class="workout-stack">
      ${strengthPlans.map(renderWorkoutCard).join("")}
    </div>
  `;

  strengthContent.querySelectorAll("[data-exercise-check]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleExercise(currentProfile, button.dataset.exerciseCheck);
      renderStrength();
      renderProgress();
    });
  });
}

function renderWorkoutCard(workout) {
  return `
    <article class="glass-card">
      <div class="card-header">
        <div>
          <p class="card-kicker">${escapeHtml(workout.subtitle)}</p>
          <h2>${escapeHtml(workout.title)}</h2>
        </div>
      </div>
      <ul class="exercise-list">
        ${workout.exercises.map(([id, name, prescription, note]) => {
          const checkId = `${workout.id}:${id}`;
          const checked = isExerciseDone(currentProfile, checkId);
          return `
            <li class="exercise-item">
              <button class="check-row ${checked ? "is-checked" : ""}" type="button" data-exercise-check="${escapeAttr(checkId)}" aria-pressed="${checked}">
                <span class="custom-check" aria-hidden="true">✓</span>
                <span class="exercise-main">
                  <span class="exercise-title">${escapeHtml(name)}</span>
                  <span class="exercise-prescription">${escapeHtml(prescription)}</span>
                  <span class="exercise-note">${escapeHtml(note)}</span>
                </span>
              </button>
            </li>
          `;
        }).join("")}
      </ul>
    </article>
  `;
}

function bindNevioStrengthCard() {
  const showButton = document.querySelector("#showNevioInfo");
  const copyArea = document.querySelector("#nevioCopyArea");
  const copyButton = document.querySelector("#copyNevioText");
  const copyText = document.querySelector("#nevioCopyText");
  const copyMessage = document.querySelector("#copyMessage");

  showButton.addEventListener("click", () => {
    copyArea.classList.add("is-visible");
    copyMessage.textContent = "Schicke Ale deine Ziele, verfügbares Equipment und Trainingstage. Danach kann der Kraftplan ergänzt werden.";
  });

  copyButton.addEventListener("click", async () => {
    copyText.select();
    try {
      await navigator.clipboard.writeText(copyText.value);
      copyMessage.textContent = "Text kopiert.";
    } catch {
      copyMessage.textContent = "Text ist markiert und kann kopiert werden.";
    }
  });
}

function renderProgress() {
  const doneDays = weekDayIndexes().filter((dayIndex) => isDayDone(currentProfile, dayIndex));
  const count = doneDays.length;
  const percent = Math.min(100, Math.round((count / 5) * 100));
  const motivation = count <= 2
    ? "Ruhig starten. Hauptsache dranbleiben."
    : count <= 4
      ? "Sehr gut. Du baust Routine auf."
      : "Stark. Achte trotzdem auf genug Erholung.";

  progressContent.innerHTML = `
    <article class="glass-card progress-ring-card">
      <div class="ring" style="--value: ${percent}">
        <span>${count}/5</span>
      </div>
      <div>
        <p class="card-kicker">Diese Woche</p>
        <h2>${count} erledigte Einheiten</h2>
        <p>${escapeHtml(motivation)}</p>
        <div class="progress-bar" aria-label="Fortschritt ${percent} Prozent">
          <span style="width: ${percent}%"></span>
        </div>
      </div>
    </article>
    <article class="glass-card">
      <div class="card-header">
        <div>
          <p class="card-kicker">Wochentage</p>
          <h3>Status</h3>
        </div>
      </div>
      <div class="progress-stack">
        ${weekDayIndexes().map((dayIndex) => {
          const done = isDayDone(currentProfile, dayIndex);
          return `
            <div class="day-status">
              <span class="day-name">${escapeHtml(weekdays[dayIndex])}</span>
              <span class="status-badge ${done ? "is-done" : ""}">${done ? "erledigt" : "offen"}</span>
            </div>
          `;
        }).join("")}
      </div>
    </article>
    <button class="reset-button" type="button" id="resetWeekButton">Woche zurücksetzen</button>
  `;

  document.querySelector("#resetWeekButton").addEventListener("click", () => {
    resetWeek(currentProfile);
    renderAll();
  });
}

function renderNutritionCards() {
  return `
    <article class="glass-card">
      <div class="card-header">
        <div>
          <p class="card-kicker">Hinweise</p>
          <h3>Regeneration & Ernährung</h3>
        </div>
      </div>
      <div class="nutrition-grid">
        ${nutritionCards.map(([title, text]) => `
          <div class="info-tile">
            <strong>${escapeHtml(title)}</strong>
            <span>${escapeHtml(text)}</span>
          </div>
        `).join("")}
      </div>
    </article>
    <article class="notice-card">
      <strong>Sicherheit</strong>
      <span>Bei Schmerzen, Krankheit oder Unsicherheit pausieren und mit Eltern, Trainer oder Arzt abklären.</span>
    </article>
  `;
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(storageKeys.state)) || {};
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

function weekDayIndexes() {
  return [1, 2, 3, 4, 5, 6, 0];
}

function getWeekKey(date) {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil((((target - yearStart) / 86400000) + 1) / 7);
  return `${target.getUTCFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
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
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").catch(() => {});
    });
  }
}
