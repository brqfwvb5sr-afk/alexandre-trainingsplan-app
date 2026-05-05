const storageKeys = {
  profile: "trainingsplan.currentProfile",
  state: "trainingsplan.state.v2"
};
const APP_VERSION = "Version 4";
const STRAVA_API_BASE = "/api/strava";

const profiles = {
  ale: { label: "Ale", hasStrength: true },
  nevio: { label: "Nevio", hasStrength: false }
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
      explanation: "Kein Krafttraining. Schule und Regeneration gehen vor.",
      status: "Pflicht",
      optional: "1.5-2 km sehr locker, nur wenn genug Energie da ist",
      weekTitle: "Unihockey",
      weekAmount: "kein Krafttraining",
      labels: ["Pause", "Optional"]
    },
    3: {
      category: "Kraft",
      title: "Kraft A",
      amount: "Oberkörper + Core",
      intensity: "Kontrolliert",
      explanation: "Saubere Wiederholungen sind wichtiger als Tempo.",
      status: "Pflicht",
      optional: "1.5-2 km lockerer Lauf, nur wenn du dich fit fühlst",
      weekTitle: "Kraft A",
      weekAmount: "Oberkörper + Core",
      labels: ["Kraft", "Optional"]
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
      category: "Pause",
      title: "Pause",
      amount: "Keine Einheit",
      intensity: "Sehr locker",
      explanation: "Heute erholen. Regeneration ist Teil des Plans.",
      status: "Pflicht",
      optional: "Stepper 15-20 Minuten sehr locker",
      weekTitle: "Pause",
      weekAmount: "Regeneration",
      labels: ["Pause", "Optional"]
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
      category: "Kraft",
      title: "Kraft B",
      amount: "Beine + Core",
      intensity: "Kontrolliert",
      explanation: "Langsam und stabil arbeiten.",
      status: "Pflicht",
      optional: "Spaziergang oder Stepper locker",
      weekTitle: "Kraft B",
      weekAmount: "Beine + Core",
      labels: ["Kraft", "Optional"]
    }
  },
  nevio: {
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
      category: "Pause",
      title: "Locker bewegen",
      amount: "Kein Pflichtlauf",
      intensity: "Sehr locker",
      explanation: "Heute nur bewegen, wenn du dich frisch fühlst.",
      status: "Optional",
      optional: "1.5-2 km sehr locker",
      weekTitle: "Locker bewegen",
      weekAmount: "optional 1.5-2 km",
      labels: ["Pause", "Optional"]
    },
    3: {
      category: "Kraft",
      title: "Kraftplan fehlt",
      amount: "Daten an Ale schicken",
      intensity: "Kein Krafttraining",
      explanation: "Heute wäre Krafttraining. Für Nevio ist noch kein Kraftplan eingetragen.",
      status: "Info",
      optional: "Ziele, Equipment und Trainingstage notieren",
      weekTitle: "Kraftplan fehlt",
      weekAmount: "Daten an Ale schicken",
      labels: ["Kraft"]
    },
    4: {
      category: "Jogging",
      title: "Lockerer Lauf",
      amount: "2.5-3 km",
      intensity: "Locker",
      explanation: "Ruhig laufen, gleichmäßig atmen.",
      status: "Pflicht",
      optional: "Plank 2 x 45 Sekunden, nur wenn du willst",
      weekTitle: "Jogging locker",
      weekAmount: "2.5-3 km + optional Core",
      labels: ["Jogging", "Optional"]
    },
    5: {
      category: "Pause",
      title: "Pause",
      amount: "Keine Einheit",
      intensity: "Sehr locker",
      explanation: "Heute erholen. Regeneration ist Teil des Plans.",
      status: "Pflicht",
      optional: "15-20 Minuten sehr locker bewegen",
      weekTitle: "Pause",
      weekAmount: "Regeneration",
      labels: ["Pause", "Optional"]
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
      category: "Kraft",
      title: "Kraftplan fehlt",
      amount: "Daten an Ale schicken",
      intensity: "Kein Krafttraining",
      explanation: "Heute wäre Krafttraining. Für Nevio ist noch kein Kraftplan eingetragen.",
      status: "Info",
      optional: "Ziele, Equipment und Trainingstage notieren",
      weekTitle: "Kraftplan fehlt",
      weekAmount: "Daten an Ale schicken",
      labels: ["Kraft"]
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

const strengthPlans = {
  a: {
    id: "a",
    title: "Kraft A",
    subtitle: "Oberkörper + Core",
    exercises: [
      ["pushups", "Liegestütze", "3 x max sauber", "Körper gerade halten, nicht ins Hohlkreuz fallen."],
      ["row", "Rudern mit 10 kg", "3 x 10-12 pro Seite", "Rücken gerade, Ellbogen eng am Körper ziehen."],
      ["press", "Schulterdrücken mit 3 kg", "3 x 12-15", "Kontrolliert drücken, Schultern nicht hochziehen."],
      ["curls", "Bizeps-Curls mit 3 kg", "3 x 15-20", "Ellbogen ruhig halten, nicht schwingen."],
      ["plank", "Plank", "3 x 45-60 Sekunden", "Bauch anspannen, Rücken gerade."]
    ]
  },
  b: {
    id: "b",
    title: "Kraft B",
    subtitle: "Beine + Core",
    exercises: [
      ["squats", "Kniebeugen", "4 x 15-25", "Knie stabil, Rücken gerade, tief aber kontrolliert."],
      ["lunges", "Ausfallschritte", "3 x 10 pro Bein", "Langsam und kontrolliert, Knie nicht nach innen kippen."],
      ["calves", "Wadenheben", "3 x 20", "Oben kurz halten, langsam senken."],
      ["legraises", "Beinheben", "3 x 12-15", "Bauch anspannen, nicht mit Schwung arbeiten."],
      ["sideplank", "Seitstütz", "2 x 30-45 Sekunden pro Seite", "Hüfte oben halten, Körper gerade."]
    ]
  }
};

let currentProfile = null;
let activeTab = "today";
let selectedStrengthPlan = null;
let pendingStravaSyncProfile = null;
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
  pendingStravaSyncProfile = readStravaReturnProfile();
  bindLogin();
  bindTabs();
  registerServiceWorker();

  const storedProfile = pendingStravaSyncProfile || normalizeProfile(localStorage.getItem(storageKeys.profile) || "");
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

  if (pendingStravaSyncProfile === profile) {
    pendingStravaSyncProfile = null;
    syncStravaActivities({ silent: true });
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
  if (!profiles[currentProfile].hasStrength) {
    strengthContent.innerHTML = `
      <div class="page-heading">
        <div class="page-topline">
          <h1>Kraft</h1>
          <button class="small-switch-button" type="button" data-switch-profile>Profil wechseln</button>
        </div>
        <p>Profil: Nevio</p>
      </div>
      <article class="info-card">
        <h2>Noch kein Kraftplan vorhanden</h2>
        <p>Nevio hat noch keinen eigenen Krafttrainingsplan. Schicke Ale deine Ziele, dein Equipment und deine möglichen Trainingstage.</p>
        <button class="primary-button wide-button" type="button" id="showNevioInfo">Text für Ale anzeigen</button>
        <div class="copy-area" id="nevioCopyArea">
          <textarea class="copy-text" id="nevioCopyText" readonly>Hey Ale, kannst du mir meinen Kraftplan einbauen?
Ziele:
Equipment:
Mögliche Trainingstage:
Besonderheiten:</textarea>
          <button class="ghost-button wide-button" type="button" id="copyNevioText">Text kopieren</button>
          <p class="form-message" id="copyMessage"></p>
        </div>
      </article>
    `;
    bindNevioStrengthCard();
    return;
  }

  strengthContent.innerHTML = `
    <div class="page-heading">
      <div class="page-topline">
        <h1>Krafttraining Ale</h1>
        <button class="small-switch-button" type="button" data-switch-profile>Profil wechseln</button>
      </div>
      <p>Wähle A oder B.</p>
    </div>

    <div class="strength-choice-grid">
      ${Object.values(strengthPlans).map((plan) => `
        <button class="strength-choice ${selectedStrengthPlan === plan.id ? "is-selected" : ""}" type="button" data-strength-select="${plan.id}">
          <span>${escapeHtml(plan.title)}</span>
          <strong>${escapeHtml(plan.subtitle)}</strong>
        </button>
      `).join("")}
    </div>

    ${selectedStrengthPlan ? renderExerciseList(strengthPlans[selectedStrengthPlan]) : `
      <article class="optional-card">
        <p class="card-kicker">Checkliste</p>
        <h3>Tippe auf Kraft A oder Kraft B.</h3>
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
      ${plan.exercises.map(([id, name, prescription, note]) => {
        const checkId = `${plan.id}:${id}`;
        const done = isExerciseDone(currentProfile, checkId);
        return `
          <article class="exercise-card ${done ? "is-done" : ""}">
            <div>
              <h2>${escapeHtml(name)}</h2>
              <strong>${escapeHtml(prescription)}</strong>
              <p>${escapeHtml(note)}</p>
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

function bindNevioStrengthCard() {
  const showButton = document.querySelector("#showNevioInfo");
  const copyArea = document.querySelector("#nevioCopyArea");
  const copyButton = document.querySelector("#copyNevioText");
  const copyText = document.querySelector("#nevioCopyText");
  const copyMessage = document.querySelector("#copyMessage");

  showButton.addEventListener("click", () => {
    copyArea.classList.add("is-visible");
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
  const doneDays = weekIndexes.filter((dayIndex) => isDayDone(currentProfile, dayIndex));
  const count = doneDays.length;
  const percent = Math.min(100, Math.round((count / 5) * 100));

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
        <strong>${count} / 5</strong>
      </div>
      <div class="progress-bar" aria-label="Fortschritt ${percent} Prozent">
        <span style="width: ${percent}%"></span>
      </div>
    </article>
    ${renderStravaCard()}
    <article class="info-card">
      <h2>Wochentage</h2>
      <div class="day-pill-grid">
        ${weekIndexes.map((dayIndex) => {
          const done = isDayDone(currentProfile, dayIndex);
          const stravaMatch = getStravaMatch(currentProfile, dayIndex);
          return `
            <div class="day-pill ${done ? "is-done" : ""} ${stravaMatch ? "is-strava-done" : ""}">
              <strong>${escapeHtml(weekdayShort[dayIndex])}</strong>
              <span>${stravaMatch ? "Strava" : done ? "erledigt" : "offen"}</span>
            </div>
          `;
        }).join("")}
      </div>
      ${renderStravaBadges()}
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

function readStravaReturnProfile() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("strava") !== "connected") return null;

  const profile = normalizeProfile(params.get("profile"));
  params.delete("strava");
  params.delete("profile");
  params.delete("state");

  const cleanUrl = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`;
  window.history.replaceState({}, document.title, cleanUrl);
  return profile;
}

function connectStrava() {
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
      setStravaConnection(profile, { connected: false, error: "Strava ist noch nicht verbunden.", message: "" });
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
  return `is-${label.toLowerCase().replaceAll("ä", "ae").replaceAll(" ", "-")}`;
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
      navigator.serviceWorker.register("service-worker.js?v=4").then((registration) => {
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
