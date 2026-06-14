const APP_VERSION = "Version 12";
const PROFILE = "ale";

const storageKeys = {
  state: "trainingsplan.state.v2"
};

const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const weekdayShort = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const weekIndexes = [1, 2, 3, 4, 5, 6, 0];

const weeklyPlan = {
  1: {
    title: "Push + Core",
    focus: "Brust, Schultern, Trizeps",
    duration: "65-80 Min",
    intensity: "Mittel",
    labels: ["Gym", "Core"],
    strengthPlanId: "push",
    tasks: [
      ["warmup", "Aufwaermen", "8 Min"],
      ["strength", "Push-Training", "6 Uebungen"],
      ["core", "Plank", "3 x 45-60 s"],
      ["cardio", "Locker auslaufen", "15-20 Min", true]
    ]
  },
  2: {
    title: "Regeneration",
    focus: "Kein Gym",
    duration: "20-40 Min",
    intensity: "Locker",
    labels: ["Pause"],
    tasks: [
      ["walk", "Spaziergang oder Mobility", "20-40 Min", true],
      ["sleep", "Frueh schlafen", "8+ h", true]
    ]
  },
  3: {
    title: "Pull + Core",
    focus: "Ruecken, hintere Schulter, Bizeps",
    duration: "65-80 Min",
    intensity: "Mittel",
    labels: ["Gym", "Core"],
    strengthPlanId: "pull",
    tasks: [
      ["warmup", "Aufwaermen", "8 Min"],
      ["strength", "Pull-Training", "7 Uebungen"],
      ["core", "Cable Crunch oder Hanging Knee Raises", "3 x 12-15"],
      ["cardio", "Locker auslaufen", "15-20 Min", true]
    ]
  },
  4: {
    title: "Beine + Core",
    focus: "Beine, Bauch, unterer Ruecken",
    duration: "60-75 Min",
    intensity: "Mittel",
    labels: ["Gym", "Core"],
    strengthPlanId: "legs",
    tasks: [
      ["warmup", "Aufwaermen", "10 Min"],
      ["strength", "Beintraining", "6 Uebungen"],
      ["core", "Leg Raises", "3 x 10-15"]
    ]
  },
  5: {
    title: "Lauf + Bauch",
    focus: "Ausdauer und Core",
    duration: "30-45 Min",
    intensity: "Locker",
    labels: ["Lauf", "Core"],
    tasks: [
      ["run", "Lockerer Lauf", "3-4 km"],
      ["core", "Dead Bug, Crunches, Plank", "2 Runden"]
    ]
  },
  6: {
    title: "Upper Pump",
    focus: "Oberkoerper, Arme, Core",
    duration: "65-85 Min",
    intensity: "Mittel",
    labels: ["Gym", "Core"],
    strengthPlanId: "upper",
    tasks: [
      ["warmup", "Aufwaermen", "8 Min"],
      ["strength", "Upper-Training", "6 Uebungen"],
      ["core", "Cable Crunch", "3 x 12-15"],
      ["treadmill", "Laufband locker", "20 Min"]
    ]
  },
  0: {
    title: "Home Core",
    focus: "Bauch, Haltung, Mobility",
    duration: "12-15 Min",
    intensity: "Locker",
    labels: ["Home", "Optional"],
    strengthPlanId: "home",
    tasks: [
      ["core", "Home Core", "12-15 Min", true],
      ["mobility", "Mobility", "5 Min", true]
    ]
  }
};

const strengthPlans = [
  {
    id: "push",
    day: "Mo",
    title: "Push + Core",
    subtitle: "Brust, Schultern, Trizeps",
    exercises: [
      ["incline-press", "Schraegbank-Brustpresse", "3 x 8-12"],
      ["chest-press", "Brustpresse Maschine", "3 x 8-12"],
      ["cable-fly", "Cable Fly oder Butterfly", "2 x 12-15"],
      ["shoulder-press", "Schulterdruecken Maschine", "3 x 10-12"],
      ["lateral-raise", "Seitheben Maschine oder Kabel", "4 x 12-20"],
      ["triceps-pushdown", "Trizepsdruecken am Seil", "3 x 10-15"],
      ["plank", "Plank", "3 x 45-60 s"]
    ]
  },
  {
    id: "pull",
    day: "Mi",
    title: "Pull + Core",
    subtitle: "Ruecken, hintere Schulter, Bizeps",
    exercises: [
      ["lat-pulldown", "Latziehen breit", "3 x 8-12"],
      ["seated-row", "Sitzendes Rudern eng", "3 x 10-12"],
      ["chest-row", "Brustgestuetztes Rudern", "3 x 10-12"],
      ["reverse-fly", "Reverse Butterfly", "3 x 12-15"],
      ["face-pull", "Face Pulls", "2 x 12-15"],
      ["biceps-machine", "Bizeps-Curl Maschine", "3 x 10-12"],
      ["hammer-curls", "Hammer Curls", "2 x 12-15"],
      ["core-crunch", "Cable Crunch oder Hanging Knee Raises", "3 x 12-15"]
    ]
  },
  {
    id: "legs",
    day: "Do",
    title: "Beine + Core",
    subtitle: "Beine, Bauch, unterer Ruecken",
    exercises: [
      ["leg-press", "Beinpresse", "4 x 8-12"],
      ["leg-extension", "Leg Extension", "3 x 12"],
      ["leg-curl", "Leg Curl", "3 x 12"],
      ["split-squat", "Split Squat oder Ausfallschritte", "2 x 10 je Bein"],
      ["calf-press", "Waden an Beinpresse", "3 x 15-20"],
      ["hyperextensions", "Hyperextensions", "3 x 10-12"],
      ["leg-raises", "Leg Raises", "3 x 10-15"]
    ]
  },
  {
    id: "upper",
    day: "Sa",
    title: "Upper Pump",
    subtitle: "Oberkoerper, Arme, Laufband",
    exercises: [
      ["assisted-pullup", "Assisted Pull-Up oder Latziehen", "3 x 8-12"],
      ["machine-chest", "Brustpresse oder Butterfly", "3 x 10-12"],
      ["cable-row", "Kabelrudern", "3 x 10-12"],
      ["lateral-raise-pump", "Seitheben", "3 x 15-20"],
      ["arm-superset", "Bizeps + Trizeps Supersatz", "3 x 12 + 12"],
      ["cable-crunch", "Cable Crunch", "3 x 12-15"],
      ["treadmill", "Laufband locker", "20 Min"]
    ]
  },
  {
    id: "home",
    day: "So",
    title: "Home Core",
    subtitle: "Bauch, Haltung, Mobility",
    exercises: [
      ["dead-bug", "Dead Bug", "3 x 10 je Seite"],
      ["side-plank", "Seitstuetz", "2 x 30-45 s je Seite"],
      ["pushups-clean", "Saubere Liegestuetze", "2 x max"],
      ["band-pullapart", "Band Pull-Aparts oder Reverse Fly", "2 x 20"],
      ["mobility", "Mobility", "5 Min"]
    ]
  }
];

const strengthPlanMap = Object.fromEntries(strengthPlans.map((plan) => [plan.id, plan]));

let activeTab = "today";
let selectedStrengthPlan = getDefaultStrengthPlan();
let state = loadState();

const todayContent = document.querySelector("#todayContent");
const weekContent = document.querySelector("#weekContent");
const strengthContent = document.querySelector("#strengthContent");
const versionLabel = document.querySelector("#versionLabel");

init();

function init() {
  versionLabel.textContent = APP_VERSION;
  bindTabs();
  renderAll();
  registerServiceWorker();
}

function bindTabs() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => setTab(button.dataset.tab));
  });
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
  renderToday();
  renderWeek();
  renderStrength();
}

function renderToday() {
  const dayIndex = new Date().getDay();
  const plan = weeklyPlan[dayIndex];
  const completionTasks = getCompletionTasks(plan);
  const doneRequired = completionTasks.filter((task) => isTaskDone(dayIndex, task[0])).length;
  const requiredTotal = completionTasks.length;
  const percent = Math.round((doneRequired / requiredTotal) * 100);
  const nextTask = plan.tasks.find((task) => !isTaskDone(dayIndex, task[0]));

  todayContent.innerHTML = `
    <section class="section-heading">
      <p>${escapeHtml(weekdays[dayIndex])}</p>
      <h2>Heute</h2>
    </section>

    <article class="focus-card">
      <div class="focus-top">
        <div>
          <p class="card-label">Tagesfokus</p>
          <h3>${escapeHtml(plan.title)}</h3>
        </div>
        <span class="status-pill">${doneRequired}/${requiredTotal}</span>
      </div>

      <div class="detail-grid">
        <div>
          <span>Fokus</span>
          <strong>${escapeHtml(plan.focus)}</strong>
        </div>
        <div>
          <span>Dauer</span>
          <strong>${escapeHtml(plan.duration)}</strong>
        </div>
        <div>
          <span>Intensitaet</span>
          <strong>${escapeHtml(plan.intensity)}</strong>
        </div>
      </div>

      <div class="progress-track" aria-label="Tagesfortschritt ${percent} Prozent">
        <span style="width: ${percent}%"></span>
      </div>
    </article>

    <section class="task-card">
      <div class="card-head">
        <h3>Aufgaben</h3>
        <span>${doneRequired === requiredTotal ? "Erledigt" : "Offen"}</span>
      </div>
      <div class="task-list">
        ${plan.tasks.map((task) => renderTask(dayIndex, task)).join("")}
      </div>
      ${plan.strengthPlanId ? `
        <button class="secondary-button" type="button" data-open-strength="${escapeAttr(plan.strengthPlanId)}">
          Uebungen anzeigen
        </button>
      ` : ""}
    </section>

    <article class="next-card">
      <span>Als Naechstes</span>
      <strong>${escapeHtml(nextTask ? nextTask[1] : "Fertig fuer heute")}</strong>
    </article>
  `;

  todayContent.querySelectorAll("[data-task]").forEach((input) => {
    input.addEventListener("change", () => {
      toggleTask(dayIndex, input.dataset.task);
      renderAll();
    });
  });

  todayContent.querySelector("[data-open-strength]")?.addEventListener("click", (event) => {
    selectedStrengthPlan = event.currentTarget.dataset.openStrength;
    setTab("strength");
  });
}

function renderTask(dayIndex, task) {
  const [id, title, amount, optional] = task;
  const done = isTaskDone(dayIndex, id);
  return `
    <label class="task-row ${done ? "is-done" : ""}">
      <input type="checkbox" data-task="${escapeAttr(id)}" ${done ? "checked" : ""}>
      <span class="checkmark" aria-hidden="true"></span>
      <span class="task-main">
        <strong>${escapeHtml(title)}</strong>
        <small>${escapeHtml(amount)}${optional ? " · optional" : ""}</small>
      </span>
    </label>
  `;
}

function renderWeek() {
  const todayIndex = new Date().getDay();

  weekContent.innerHTML = `
    <section class="section-heading">
      <p>Montag bis Sonntag</p>
      <h2>Woche</h2>
    </section>

    <div class="week-list">
      ${weekIndexes.map((dayIndex) => {
        const plan = weeklyPlan[dayIndex];
        const isToday = dayIndex === todayIndex;
        const completionTasks = getCompletionTasks(plan);
        const done = completionTasks.every((task) => isTaskDone(dayIndex, task[0]));
        return `
          <article class="week-row ${isToday ? "is-today" : ""}">
            <div class="week-day">
              <span>${escapeHtml(weekdayShort[dayIndex])}</span>
              <strong>${escapeHtml(weekdays[dayIndex])}</strong>
            </div>
            <div class="week-main">
              <h3>${escapeHtml(plan.title)}</h3>
              <p>${escapeHtml(plan.focus)} · ${escapeHtml(plan.duration)}</p>
              <div class="label-row">
                ${plan.labels.map((label) => `<span class="label">${escapeHtml(label)}</span>`).join("")}
              </div>
            </div>
            <span class="week-state">${done ? "done" : isToday ? "heute" : ""}</span>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderStrength() {
  const plan = strengthPlanMap[selectedStrengthPlan] || strengthPlans[0];
  selectedStrengthPlan = plan.id;

  strengthContent.innerHTML = `
    <section class="section-heading">
      <p>Gym</p>
      <h2>Kraftplan</h2>
    </section>

    <div class="plan-tabs" role="tablist" aria-label="Trainingstage">
      ${strengthPlans.map((item) => `
        <button class="plan-tab ${item.id === plan.id ? "is-active" : ""}" type="button" data-plan="${escapeAttr(item.id)}">
          <span>${escapeHtml(item.day)}</span>
          <strong>${escapeHtml(item.title)}</strong>
        </button>
      `).join("")}
    </div>

    <article class="workout-card">
      <div class="workout-head">
        <div>
          <p class="card-label">${escapeHtml(plan.day)}</p>
          <h3>${escapeHtml(plan.title)}</h3>
          <span>${escapeHtml(plan.subtitle)}</span>
        </div>
        <span class="status-pill">${getExerciseDoneCount(plan)} / ${plan.exercises.length}</span>
      </div>

      <div class="exercise-list">
        ${plan.exercises.map((exercise) => renderExercise(plan, exercise)).join("")}
      </div>
    </article>
  `;

  strengthContent.querySelectorAll("[data-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedStrengthPlan = button.dataset.plan;
      renderStrength();
    });
  });

  strengthContent.querySelectorAll("[data-exercise]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleExercise(button.dataset.exercise);
      renderAll();
    });
  });
}

function renderExercise(plan, exercise) {
  const [id, name, sets] = exercise;
  const key = `${plan.id}:${id}`;
  const done = isExerciseDone(key);
  return `
    <button class="exercise-row ${done ? "is-done" : ""}" type="button" data-exercise="${escapeAttr(key)}" aria-pressed="${done}">
      <span class="checkmark" aria-hidden="true"></span>
      <span class="exercise-main">
        <strong>${escapeHtml(name)}</strong>
      </span>
      <b>${escapeHtml(sets)}</b>
    </button>
  `;
}

function getDefaultStrengthPlan() {
  const today = weeklyPlan[new Date().getDay()];
  return today?.strengthPlanId || "push";
}

function getCompletionTasks(plan) {
  const requiredTasks = plan.tasks.filter((task) => !task[3]);
  return requiredTasks.length ? requiredTasks : plan.tasks;
}

function getExerciseDoneCount(plan) {
  return plan.exercises.filter(([id]) => isExerciseDone(`${plan.id}:${id}`)).length;
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

function getAleWeek() {
  const week = getWeekKey(new Date());
  state[PROFILE] ||= {};
  state[PROFILE][week] ||= { days: {}, exercises: {}, tasks: {} };
  state[PROFILE][week].days ||= {};
  state[PROFILE][week].exercises ||= {};
  state[PROFILE][week].tasks ||= {};
  return state[PROFILE][week];
}

function isTaskDone(dayIndex, taskId) {
  return Boolean(getAleWeek().tasks[`${dayIndex}:${taskId}`]);
}

function toggleTask(dayIndex, taskId) {
  const week = getAleWeek();
  const key = `${dayIndex}:${taskId}`;
  week.tasks[key] = !week.tasks[key];
  week.days[dayIndex] = areRequiredTasksDone(dayIndex);
  saveState();
}

function areRequiredTasksDone(dayIndex) {
  const plan = weeklyPlan[dayIndex];
  return getCompletionTasks(plan).every((task) => Boolean(getAleWeek().tasks[`${dayIndex}:${task[0]}`]));
}

function isExerciseDone(id) {
  return Boolean(getAleWeek().exercises[id]);
}

function toggleExercise(id) {
  const week = getAleWeek();
  week.exercises[id] = !week.exercises[id];
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
  if (!("serviceWorker" in navigator)) return;

  let updateRegistration = null;
  let isReloadingForUpdate = false;

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (isReloadingForUpdate) return;
    isReloadingForUpdate = true;
    window.location.reload();
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js?v=12").then((registration) => {
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

function showUpdateNotice(registration) {
  if (document.querySelector("#updateNotice")) return;

  const notice = document.createElement("div");
  notice.className = "update-notice";
  notice.id = "updateNotice";
  notice.innerHTML = `
    <span>Neue Version verfuegbar</span>
    <button type="button" id="reloadUpdateButton">Neu laden</button>
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
