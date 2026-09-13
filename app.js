(() => {
  "use strict";

  const STORAGE_KEY = "strengthProteinTrackerV1";
  const APP_VERSION = 1;

  const program = {
    chest: {
      name: "Chest + Triceps",
      short: "Chest",
      exercises: [
        {id:"bench", name:"Barbell Bench Press", sets:3, min:4, max:6, rest:180, category:"anchor", increment:2.5, priority:"A", muscle:"Chest"},
        {id:"incline_press", name:"Incline Machine / DB Press", sets:3, min:8, max:12, rest:120, category:"compound", increment:2.5, priority:"A", muscle:"Chest"},
        {id:"cable_fly", name:"Cable Fly", sets:2, min:10, max:15, rest:90, category:"isolation", increment:2.5, priority:"B", muscle:"Chest"},
        {id:"oh_tri", name:"Overhead Cable Triceps Extension", sets:3, min:8, max:12, rest:90, category:"isolation", increment:2.5, priority:"B", muscle:"Triceps"},
        {id:"pressdown", name:"Cable Pressdown", sets:2, min:10, max:15, rest:75, category:"isolation", increment:2.5, priority:"C", muscle:"Triceps"},
        {id:"lat_raise_mon", name:"Lateral Raise", sets:2, min:12, max:20, rest:75, category:"isolation", increment:1, priority:"C", muscle:"Delts"}
      ]
    },
    back: {
      name: "Back + Biceps",
      short: "Back",
      exercises: [
        {id:"pullup", name:"Pull-Up", sets:3, min:5, max:8, rest:180, category:"anchor", increment:2.5, priority:"A", muscle:"Back", bodyweight:true},
        {id:"chest_row", name:"Chest-Supported Row", sets:3, min:6, max:10, rest:120, category:"compound", increment:2.5, priority:"A", muscle:"Back"},
        {id:"lat_pulldown", name:"Neutral / Single-Arm Lat Pulldown", sets:2, min:8, max:12, rest:105, category:"compound", increment:2.5, priority:"B", muscle:"Back"},
        {id:"rear_delt_tue", name:"Reverse Pec Deck / Rear-Delt Fly", sets:2, min:12, max:20, rest:75, category:"isolation", increment:2.5, priority:"B", muscle:"Rear delts"},
        {id:"incline_curl", name:"Incline DB Curl", sets:3, min:8, max:12, rest:75, category:"isolation", increment:1, priority:"B", muscle:"Biceps"},
        {id:"hammer_curl", name:"Hammer Curl", sets:2, min:10, max:15, rest:75, category:"isolation", increment:1, priority:"C", muscle:"Biceps"}
      ]
    },
    legsA: {
      name: "Legs A — Quad Dominant",
      short: "Legs A",
      exercises: [
        {id:"squat", name:"Back Squat", sets:3, min:4, max:6, rest:210, category:"anchor", increment:5, priority:"A", muscle:"Quads"},
        {id:"hack_press", name:"Hack Squat / Leg Press", sets:3, min:8, max:12, rest:150, category:"compound", increment:5, priority:"A", muscle:"Quads"},
        {id:"leg_extension", name:"Leg Extension", sets:2, min:10, max:15, rest:90, category:"isolation", increment:2.5, priority:"B", muscle:"Quads"},
        {id:"leg_curl_a", name:"Seated Leg Curl", sets:3, min:8, max:12, rest:105, category:"compound", increment:2.5, priority:"B", muscle:"Hamstrings"},
        {id:"calf_a", name:"Standing Calf Raise", sets:3, min:8, max:15, rest:75, category:"isolation", increment:2.5, priority:"C", muscle:"Calves"},
        {id:"knee_raise", name:"Hanging Knee Raise", sets:2, min:8, max:15, rest:75, category:"isolation", increment:0, priority:"C", muscle:"Core"}
      ]
    },
    shoulders: {
      name: "Shoulders + Arms",
      short: "Shoulders",
      exercises: [
        {id:"shoulder_press", name:"Pain-Free Shoulder Press", sets:3, min:6, max:10, rest:150, category:"anchor", increment:2.5, priority:"A", muscle:"Delts"},
        {id:"lat_raise_thu", name:"Lateral Raise", sets:3, min:12, max:20, rest:75, category:"isolation", increment:1, priority:"A", muscle:"Delts"},
        {id:"rear_delt_thu", name:"Reverse Pec Deck", sets:2, min:12, max:20, rest:75, category:"isolation", increment:2.5, priority:"B", muscle:"Rear delts"},
        {id:"incline_topup", name:"Machine / DB Incline Chest Press", sets:2, min:8, max:12, rest:120, category:"compound", increment:2.5, priority:"B", muscle:"Chest"},
        {id:"preacher_curl", name:"Preacher Curl", sets:3, min:8, max:12, rest:75, category:"isolation", increment:1, priority:"B", muscle:"Biceps"},
        {id:"tri_thu", name:"Cable Triceps Extension", sets:3, min:10, max:15, rest:75, category:"isolation", increment:2.5, priority:"B", muscle:"Triceps"}
      ]
    },
    legsB: {
      name: "Legs B — Posterior Chain + Back",
      short: "Legs B",
      exercises: [
        {id:"rdl", name:"Romanian Deadlift", sets:3, min:5, max:8, rest:180, category:"anchor", increment:5, priority:"A", muscle:"Hamstrings"},
        {id:"bss", name:"Bulgarian Split Squat", sets:3, min:8, max:12, rest:120, category:"compound", increment:2.5, priority:"A", muscle:"Quads"},
        {id:"leg_curl_b", name:"Seated Leg Curl", sets:3, min:8, max:12, rest:105, category:"compound", increment:2.5, priority:"B", muscle:"Hamstrings"},
        {id:"row_fri", name:"Seated Cable / Machine Row", sets:3, min:8, max:12, rest:105, category:"compound", increment:2.5, priority:"B", muscle:"Back"},
        {id:"calf_b", name:"Standing Calf Raise", sets:3, min:10, max:15, rest:75, category:"isolation", increment:2.5, priority:"C", muscle:"Calves"},
        {id:"plank", name:"Weighted Plank", sets:2, min:30, max:60, rest:75, category:"isolation", increment:0, priority:"C", muscle:"Core", seconds:true}
      ]
    }
  };

  const weekdayProgram = {1:"chest",2:"back",3:"legsA",4:"shoulders",5:"legsB"};

  const defaultState = {
    version: APP_VERSION,
    settings: {
      proteinTarget: 130,
      creatineTarget: 5,
      weightGoal: 69
    },
    nutrition: {},
    body: {},
    workouts: {},
    quickFoods: [
      {id:"protein_powder", name:"Protein powder", detail:"1 scoop", protein:25},
      {id:"chicken", name:"Chicken breast", detail:"100 g", protein:31},
      {id:"egg", name:"Egg", detail:"1 egg", protein:6},
      {id:"yogurt", name:"Greek yogurt", detail:"1 serving", protein:15},
      {id:"milk", name:"Milk", detail:"250 ml", protein:8},
      {id:"beef", name:"Lean beef", detail:"100 g", protein:26}
    ]
  };

  let state = loadState();
  let activeView = "today";
  let workoutDate = isoToday();
  let selectedProgramKey = defaultProgramForDate(workoutDate) || "chest";
  let deferredInstallPrompt = null;
  let restInterval = null;
  let restEndAt = null;

  const view = document.getElementById("view");
  const toast = document.getElementById("toast");
  const todayLabel = document.getElementById("todayLabel");
  const installBtn = document.getElementById("installBtn");
  const restTimer = document.getElementById("restTimer");
  const restTimerValue = document.getElementById("restTimerValue");
  const cancelTimer = document.getElementById("cancelTimer");

  init();

  function init() {
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        activeView = btn.dataset.view;
        document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b === btn));
        render();
      });
    });

    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      deferredInstallPrompt = e;
      installBtn.classList.remove("hidden");
    });

    installBtn.addEventListener("click", async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      installBtn.classList.add("hidden");
    });

    cancelTimer.addEventListener("click", stopRestTimer);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    }

    render();
  }

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(defaultState);
      const parsed = JSON.parse(raw);
      return {
        ...clone(defaultState),
        ...parsed,
        settings: {...defaultState.settings, ...(parsed.settings || {})},
        quickFoods: Array.isArray(parsed.quickFoods) ? parsed.quickFoods : clone(defaultState.quickFoods)
      };
    } catch {
      return clone(defaultState);
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function isoToday() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,"0");
    const day = String(d.getDate()).padStart(2,"0");
    return `${y}-${m}-${day}`;
  }

  function parseDateOnly(s) {
    const [y,m,d] = s.split("-").map(Number);
    return new Date(y, m-1, d, 12, 0, 0);
  }

  function formatDate(s, opts={weekday:"short", month:"short", day:"numeric"}) {
    return parseDateOnly(s).toLocaleDateString(undefined, opts);
  }

  function defaultProgramForDate(dateStr) {
    const day = parseDateOnly(dateStr).getDay();
    return weekdayProgram[day] || null;
  }

  function getDayNutrition(dateStr) {
    if (!state.nutrition[dateStr]) state.nutrition[dateStr] = {entries:[], creatine:false};
    return state.nutrition[dateStr];
  }

  function proteinTotal(dateStr) {
    return (state.nutrition[dateStr]?.entries || []).reduce((sum,e) => sum + Number(e.protein || 0), 0);
  }

  function getBody(dateStr) {
    if (!state.body[dateStr]) state.body[dateStr] = {};
    return state.body[dateStr];
  }

  function getWorkout(dateStr, programKey=selectedProgramKey) {
    if (!state.workouts[dateStr]) {
      state.workouts[dateStr] = {programKey, status:"", exercises:{}};
    }
    const w = state.workouts[dateStr];
    if (!w.programKey) w.programKey = programKey;
    if (!w.exercises) w.exercises = {};
    return w;
  }

  function render() {
    todayLabel.textContent = new Date().toLocaleDateString(undefined, {weekday:"long", month:"short", day:"numeric"});
    if (activeView === "today") renderToday();
    else if (activeView === "workout") renderWorkout();
    else if (activeView === "progress") renderProgress();
    else renderSettings();
  }

  function renderToday() {
    const date = isoToday();
    const pKey = defaultProgramForDate(date);
    const nutrition = getDayNutrition(date);
    const protein = proteinTotal(date);
    const target = Number(state.settings.proteinTarget) || 130;
    const pct = Math.min(100, Math.round((protein/target)*100));
    const body = state.body[date] || {};
    const avg7 = rollingWeightAverage(date, 7);

    view.innerHTML = `
      <div class="stack">
        <section class="card hero">
          <div class="hero-row">
            <div>
              <p class="meta">Daily protein</p>
              <div class="big-number">${round1(protein)}<span style="font-size:18px;font-weight:700"> / ${target} g</span></div>
            </div>
            <span class="pill ${protein >= target ? "good" : ""}">${protein >= target ? "Target hit" : `${Math.max(0, Math.ceil(target-protein))} g left`}</span>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        </section>

        <section class="card">
          <div class="section-title"><h2>Today's workout</h2><span class="meta">${pKey ? program[pKey].short : "Recovery"}</span></div>
          ${pKey ? `
            <h3 style="margin-top:8px">${program[pKey].name}</h3>
            <p class="meta">${program[pKey].exercises.length} exercises · ${program[pKey].exercises.reduce((n,e)=>n+e.sets,0)} working sets</p>
            <button id="openWorkoutBtn" class="primary" type="button">Open workout</button>
          ` : `
            <p class="muted">No scheduled lifting today. Optional skills, pickleball, cardio, mobility, or full rest.</p>
            <button id="chooseWorkoutBtn" class="ghost" type="button">Log a catch-up workout</button>
          `}
        </section>

        <section class="card">
          <div class="section-title"><h2>Quick protein</h2><button id="customProteinBtn" class="ghost" type="button">+ Custom</button></div>
          <div class="quick-foods" style="margin-top:12px">
            ${state.quickFoods.map(f => `
              <button class="quick-food" type="button" data-food="${esc(f.id)}">
                <strong>${esc(f.name)}</strong>
                <span>${esc(f.detail)} · +${f.protein} g</span>
              </button>
            `).join("")}
          </div>
          <div class="log-list">
            ${(nutrition.entries || []).slice().reverse().map(e => `
              <div class="log-item">
                <div><strong>${esc(e.name)}</strong><div class="meta">+${round1(e.protein)} g protein</div></div>
                <button class="icon-btn protein-delete" type="button" data-id="${esc(e.id)}" aria-label="Delete protein entry">×</button>
              </div>
            `).join("") || `<p class="meta">No protein logged yet.</p>`}
          </div>
        </section>

        <section class="grid-2">
          <div class="card">
            <p class="meta">Body weight</p>
            <strong style="font-size:24px">${body.weight ? `${round1(body.weight)} kg` : "—"}</strong>
            <p class="small muted">7-day avg: ${avg7 ? `${round1(avg7)} kg` : "—"}</p>
            <button id="weightBtn" class="ghost" type="button">${body.weight ? "Update" : "Log weight"}</button>
          </div>
          <div class="card">
            <p class="meta">Creatine</p>
            <strong style="font-size:24px">${nutrition.creatine ? "5 g ✓" : "—"}</strong>
            <p class="small muted">Daily target ${state.settings.creatineTarget} g</p>
            <button id="creatineBtn" class="${nutrition.creatine ? "secondary" : "ghost"}" type="button">${nutrition.creatine ? "Taken" : "Mark taken"}</button>
          </div>
        </section>
      </div>
    `;

    const ow = document.getElementById("openWorkoutBtn");
    if (ow) ow.addEventListener("click", () => {
      workoutDate = date; selectedProgramKey = pKey; activeView="workout"; syncNav(); render();
    });
    const cw = document.getElementById("chooseWorkoutBtn");
    if (cw) cw.addEventListener("click", () => {
      workoutDate = date; selectedProgramKey="chest"; activeView="workout"; syncNav(); render();
    });

    document.querySelectorAll("[data-food]").forEach(btn => {
      btn.addEventListener("click", () => addQuickFood(btn.dataset.food));
    });
    document.querySelectorAll(".protein-delete").forEach(btn => {
      btn.addEventListener("click", () => deleteProteinEntry(date, btn.dataset.id));
    });
    document.getElementById("customProteinBtn").addEventListener("click", addCustomProtein);
    document.getElementById("weightBtn").addEventListener("click", () => logWeight(date));
    document.getElementById("creatineBtn").addEventListener("click", () => {
      const d = getDayNutrition(date);
      d.creatine = !d.creatine; saveState(); renderToday();
    });
  }

  function addQuickFood(id) {
    const f = state.quickFoods.find(x => x.id === id);
    if (!f) return;
    const d = getDayNutrition(isoToday());
    d.entries.push({id:uid(), name:f.name, protein:Number(f.protein), ts:Date.now()});
    saveState(); renderToday(); showToast(`+${f.protein} g protein`);
  }

  function addCustomProtein() {
    const gramsRaw = prompt("Protein grams to add:");
    if (gramsRaw === null) return;
    const grams = clampNumber(gramsRaw, 0, 300);
    if (!grams) return showToast("Enter a protein amount above 0.");
    const name = (prompt("Food / meal name:", "Meal") || "Meal").trim().slice(0,50);
    const d = getDayNutrition(isoToday());
    d.entries.push({id:uid(), name, protein:grams, ts:Date.now()});
    saveState(); renderToday(); showToast(`+${round1(grams)} g protein`);
  }

  function deleteProteinEntry(date, id) {
    const d = getDayNutrition(date);
    d.entries = (d.entries || []).filter(e => e.id !== id);
    saveState(); renderToday();
  }

  function logWeight(date) {
    const current = state.body[date]?.weight || "";
    const raw = prompt("Body weight (kg):", current);
    if (raw === null) return;
    const w = clampNumber(raw, 30, 250);
    if (!w) return showToast("Enter a valid body weight.");
    getBody(date).weight = w;
    saveState(); render();
  }

  function renderWorkout() {
    const workout = getWorkout(workoutDate, selectedProgramKey);
    selectedProgramKey = workout.programKey || selectedProgramKey;
    const day = program[selectedProgramKey];

    view.innerHTML = `
      <div class="stack">
        <section class="card">
          <div class="form-row">
            <label>Date
              <input id="workoutDateInput" type="date" value="${workoutDate}" />
            </label>
            <label>Session
              <select id="programSelect">
                ${Object.entries(program).map(([k,v]) => `<option value="${k}" ${k===selectedProgramKey?"selected":""}>${esc(v.name)}</option>`).join("")}
              </select>
            </label>
          </div>
          <div class="section-title" style="margin-top:14px">
            <div>
              <h2>${esc(day.name)}</h2>
              <p class="meta">${day.exercises.reduce((n,e)=>n+e.sets,0)} prescribed working sets</p>
            </div>
            <span class="pill">${workout.status ? capitalize(workout.status) : "In progress"}</span>
          </div>
        </section>

        ${day.exercises.map(ex => exerciseCard(ex, workout)).join("")}

        <section class="card">
          <h3>Session status</h3>
          <p class="meta">Complete = essentially all prescribed work done. Shortened = priority work done but session cut short.</p>
          <div class="workout-status">
            ${["complete","shortened","skipped"].map(s => `<button class="status-btn ${workout.status===s?"active":""}" type="button" data-status="${s}">${capitalize(s)}</button>`).join("")}
          </div>
        </section>
      </div>
    `;

    document.getElementById("workoutDateInput").addEventListener("change", e => {
      workoutDate = e.target.value || isoToday();
      const existing = state.workouts[workoutDate];
      selectedProgramKey = existing?.programKey || defaultProgramForDate(workoutDate) || "chest";
      renderWorkout();
    });

    document.getElementById("programSelect").addEventListener("change", e => {
      selectedProgramKey = e.target.value;
      const w = getWorkout(workoutDate, selectedProgramKey);
      w.programKey = selectedProgramKey;
      saveState(); renderWorkout();
    });

    day.exercises.forEach(ex => wireExercise(ex, workout));

    document.querySelectorAll("[data-status]").forEach(btn => {
      btn.addEventListener("click", () => {
        const requested = btn.dataset.status;
        if (requested === "complete") {
          const check = completionCheck(day, workout);
          if (!check.ok) {
            const proceed = confirm(`Only ${check.percent}% of prescribed working sets are logged${check.priorityMissing ? " and at least one Priority A exercise is incomplete" : ""}. Mark complete anyway?`);
            if (!proceed) return;
          }
        }
        workout.status = requested;
        workout.completedAt = Date.now();
        saveState(); renderWorkout();
        showToast(`Workout marked ${workout.status}.`);
      });
    });
  }


  function completionCheck(day, workout) {
    const prescribed = day.exercises.reduce((sum, ex) => sum + ex.sets, 0);
    let completed = 0;
    let priorityMissing = false;
    day.exercises.forEach(ex => {
      const logged = (workout.exercises?.[ex.id]?.sets || []).filter(s => !s.warmup && Number(s.reps) > 0).length;
      completed += Math.min(logged, ex.sets);
      if (ex.priority === "A" && logged < ex.sets) priorityMissing = true;
    });
    const percent = prescribed ? Math.round((completed / prescribed) * 100) : 0;
    return {ok: percent >= 90 && !priorityMissing, percent, priorityMissing};
  }

  function exerciseCard(ex, workout) {
    const exData = ensureExerciseData(workout, ex);
    const previous = findPreviousExercise(workoutDate, selectedProgramKey, ex.id);
    const suggestion = suggestLoad(ex, previous);
    const unitLabel = ex.seconds ? "sec" : (ex.bodyweight ? "Added kg" : "kg");

    return `
      <section class="card exercise">
        <div class="exercise-head">
          <div class="row">
            <div>
              <div class="row-wrap">
                <h3>${esc(ex.name)}</h3>
                <span class="pill">Priority ${ex.priority}</span>
              </div>
              <div class="target">${ex.sets} × ${ex.min}–${ex.max}${ex.seconds ? " sec" : ""} · ${formatRest(ex.rest)} rest</div>
              <div class="meta">${esc(ex.muscle)} · ${capitalize(ex.category)}</div>
            </div>
            <button class="ghost rest-btn" type="button" data-ex="${ex.id}">Rest</button>
          </div>
        </div>
        <div class="exercise-body">
          <div class="previous">
            <strong>Previous:</strong> ${previous ? summarizePrevious(previous, ex) : "No previous session"}
            <br><strong>Suggested:</strong> ${suggestion.text}
          </div>

          <div class="set-grid head">
            <span>Set</span><span>${unitLabel}</span><span>${ex.seconds ? "Sec" : "Reps"}</span><span>RIR</span><span></span>
          </div>
          <div id="sets-${ex.id}">
            ${renderSetRows(ex, exData.sets)}
          </div>

          <div class="exercise-actions">
            <button class="ghost add-set" type="button" data-ex="${ex.id}">+ Set</button>
            <button class="ghost add-warmup" type="button" data-ex="${ex.id}">+ Warm-up</button>
          </div>

          <div class="form-row">
            <label class="checkline">
              <input class="technique" data-ex="${ex.id}" type="checkbox" ${exData.techniqueGood !== false ? "checked":""} />
              Technique good
            </label>
            <label>Pain / discomfort
              <select class="pain" data-ex="${ex.id}">
                <option value="none" ${exData.pain==="none"?"selected":""}>None</option>
                <option value="mild" ${exData.pain==="mild"?"selected":""}>Mild</option>
                <option value="stop" ${exData.pain==="stop"?"selected":""}>Stop exercise</option>
              </select>
            </label>
          </div>
        </div>
      </section>
    `;
  }

  function ensureExerciseData(workout, ex) {
    if (!workout.exercises[ex.id]) {
      workout.exercises[ex.id] = {
        techniqueGood: true,
        pain: "none",
        sets: Array.from({length:ex.sets}, (_,i)=>({id:uid(), warmup:false, load:"", reps:"", rir:""}))
      };
      saveState();
    }
    return workout.exercises[ex.id];
  }


  function renderSetRows(ex, sets) {
    let workNo = 0;
    return sets.map(s => {
      if (!s.warmup) workNo += 1;
      return setRow(ex, s, s.warmup ? 0 : workNo);
    }).join("");
  }

  function setRow(ex, s, i) {
    return `
      <div class="set-grid" data-row-id="${s.id}" style="${s.warmup ? "opacity:.68" : ""}">
        <span class="set-num">${s.warmup ? "W" : i}</span>
        <input class="set-load" data-id="${s.id}" inputmode="decimal" type="number" min="0" step="0.5" value="${escAttr(s.load)}" placeholder="${ex.bodyweight ? "0" : "kg"}" />
        <input class="set-reps" data-id="${s.id}" inputmode="numeric" type="number" min="0" max="${ex.seconds?300:100}" step="1" value="${escAttr(s.reps)}" placeholder="${ex.seconds?"sec":"reps"}" />
        <input class="set-rir" data-id="${s.id}" inputmode="numeric" type="number" min="0" max="5" step="1" value="${escAttr(s.rir)}" placeholder="RIR" ${s.warmup ? "disabled" : ""} />
        <button class="set-del" data-id="${s.id}" type="button" aria-label="Delete set">×</button>
      </div>
    `;
  }

  function wireExercise(ex, workout) {
    const exData = ensureExerciseData(workout, ex);
    const root = document.getElementById(`sets-${ex.id}`);

    root.querySelectorAll("input").forEach(input => {
      input.addEventListener("change", () => {
        const setBefore = exData.sets.find(x => x.id === input.dataset.id);
        updateSetInput(exData, input);
        if (input.classList.contains("set-reps") && setBefore && !setBefore.warmup && Number(input.value) > 0) {
          startRestTimer(ex.rest, ex.name);
        }
      });
      input.addEventListener("blur", () => updateSetInput(exData, input));
    });

    root.querySelectorAll(".set-del").forEach(btn => {
      btn.addEventListener("click", () => {
        exData.sets = exData.sets.filter(s => s.id !== btn.dataset.id);
        saveState(); renderWorkout();
      });
    });

    document.querySelector(`.add-set[data-ex="${ex.id}"]`).addEventListener("click", () => {
      exData.sets.push({id:uid(), warmup:false, load:"", reps:"", rir:""});
      saveState(); renderWorkout();
    });

    document.querySelector(`.add-warmup[data-ex="${ex.id}"]`).addEventListener("click", () => {
      exData.sets.unshift({id:uid(), warmup:true, load:"", reps:"", rir:""});
      saveState(); renderWorkout();
    });

    document.querySelector(`.rest-btn[data-ex="${ex.id}"]`).addEventListener("click", () => startRestTimer(ex.rest, ex.name));

    document.querySelector(`.technique[data-ex="${ex.id}"]`).addEventListener("change", e => {
      exData.techniqueGood = e.target.checked; saveState();
    });

    document.querySelector(`.pain[data-ex="${ex.id}"]`).addEventListener("change", e => {
      exData.pain = e.target.value; saveState();
      if (e.target.value === "stop") showToast("Stop this exercise and use a pain-free substitute.");
    });
  }

  function updateSetInput(exData, input) {
    const s = exData.sets.find(x => x.id === input.dataset.id);
    if (!s) return;
    if (input.classList.contains("set-load")) s.load = sanitizeNumString(input.value, 0, 500);
    if (input.classList.contains("set-reps")) s.reps = sanitizeNumString(input.value, 0, 300);
    if (input.classList.contains("set-rir")) s.rir = sanitizeNumString(input.value, 0, 5);
    saveState();
  }

  function findPreviousExercise(dateStr, programKey, exId) {
    const dates = Object.keys(state.workouts)
      .filter(d => d < dateStr && state.workouts[d]?.programKey === programKey && state.workouts[d]?.exercises?.[exId])
      .sort().reverse();
    if (!dates.length) return null;
    return {date:dates[0], data:state.workouts[dates[0]].exercises[exId]};
  }

  function summarizePrevious(prev, ex) {
    const workSets = (prev.data.sets || []).filter(s => !s.warmup && Number(s.reps) > 0);
    if (!workSets.length) return `${formatDate(prev.date)} · no completed sets`;
    const loads = workSets.map(s => Number(s.load || 0));
    const same = loads.every(l => l === loads[0]);
    const loadText = ex.bodyweight ? (same && loads[0] ? `BW + ${loads[0]} kg` : "BW") : (same ? `${loads[0]} kg` : "mixed load");
    return `${formatDate(prev.date)} · ${loadText} · ${workSets.map(s=>s.reps).join("/")}`;
  }

  function suggestLoad(ex, previous) {
    if (!previous) return {text:"Start with a conservative working load."};
    const d = previous.data;
    if (d.pain === "stop") return {text:"Use a pain-free substitute before progressing."};
    if (d.techniqueGood === false) return {text:"Repeat or reduce load until technique is clean."};
    const sets = (d.sets || []).filter(s => !s.warmup && Number(s.reps) > 0);
    if (!sets.length) return {text:"Repeat your last planned load."};

    const completed = sets.slice(-ex.sets);
    const allTop = completed.length >= ex.sets && completed.every(s => Number(s.reps) >= ex.max);
    const rirVals = completed.map(s => Number(s.rir)).filter(Number.isFinite);
    const rirOkay = rirVals.length === 0 || rirVals.every(r => r >= 1);
    const loads = completed.map(s => Number(s.load || 0));
    const base = loads.length ? Math.max(...loads) : 0;

    if (allTop && rirOkay && ex.increment > 0) {
      const next = roundTo(base + ex.increment, ex.increment < 2 ? 0.5 : 0.5);
      return {text: ex.bodyweight ? `Try BW + ${next} kg.` : `Try ${next} kg.`};
    }

    const belowMin = completed.length && completed.filter(s => Number(s.reps) < ex.min).length >= 2;
    if (belowMin) return {text: ex.bodyweight ? `Retry BW + ${base} kg; reduce if this repeats.` : `Retry ${base} kg; reduce 5–10% if this repeats.`};
    return {text: ex.bodyweight ? `Stay at BW + ${base} kg and add reps.` : `Stay at ${base} kg and add reps.`};
  }

  function startRestTimer(seconds, label) {
    stopRestTimer();
    restEndAt = Date.now() + seconds*1000;
    document.getElementById("restTimerLabel").textContent = label;
    restTimer.classList.remove("hidden");
    tickRest();
    restInterval = setInterval(tickRest, 250);
  }

  function tickRest() {
    const left = Math.max(0, Math.ceil((restEndAt - Date.now())/1000));
    restTimerValue.textContent = formatRest(left);
    if (left <= 0) {
      stopRestTimer();
      showToast("Rest complete.");
      if ("vibrate" in navigator) navigator.vibrate?.([120,80,120]);
    }
  }

  function stopRestTimer() {
    if (restInterval) clearInterval(restInterval);
    restInterval = null; restEndAt = null; restTimer.classList.add("hidden");
  }

  function renderProgress() {
    const today = isoToday();
    const days7 = dateRangeEnding(today, 7);
    const proteinVals = days7.map(d => proteinTotal(d));
    const target = Number(state.settings.proteinTarget) || 130;
    const proteinHit = proteinVals.filter(v => v >= target).length;
    const proteinAvg = proteinVals.reduce((a,b)=>a+b,0)/7;
    const workouts = days7.map(d => state.workouts[d]).filter(Boolean);
    const completed = workouts.filter(w => w.status === "complete").length;
    const shortened = workouts.filter(w => w.status === "shortened").length;
    const avg7 = rollingWeightAverage(today, 7);
    const avgPrev7 = rollingWeightAverage(addDays(today,-7), 7);
    const latestWaist = latestBodyValue("waist");
    const weightPoints = getWeightPoints(21);
    const strengthPoints = getStrengthPoints(90);

    view.innerHTML = `
      <div class="stack">
        <section class="card">
          <div class="section-title"><h2>Last 7 days</h2><span class="meta">${formatDate(days7[0])} – ${formatDate(today)}</span></div>
          <div class="grid-2" style="margin-top:12px">
            <div class="stat"><span class="meta">Workout adherence</span><strong>${completed}<span style="font-size:14px"> complete</span></strong><span class="small muted">${shortened} shortened</span></div>
            <div class="stat"><span class="meta">Protein target</span><strong>${proteinHit}/7</strong><span class="small muted">${round1(proteinAvg)} g/day avg</span></div>
            <div class="stat"><span class="meta">7-day weight</span><strong>${avg7 ? `${round1(avg7)} kg` : "—"}</strong><span class="small muted">${avg7 && avgPrev7 ? deltaText(avg7-avgPrev7, " kg vs prev.") : "Log weight to build trend"}</span></div>
            <div class="stat"><span class="meta">Latest waist</span><strong>${latestWaist ? `${round1(latestWaist.value)} cm` : "—"}</strong><span class="small muted">${latestWaist ? formatDate(latestWaist.date) : "Weekly entry recommended"}</span></div>
          </div>
        </section>

        <section class="card">
          <div class="section-title"><h2>Body-weight trend</h2><span class="meta">Last 21 entries/days</span></div>
          <div class="chart">${lineChart(weightPoints, "kg")}</div>
          <div class="row-wrap">
            <button id="progressWeightBtn" class="ghost" type="button">Log today's weight</button>
            <button id="waistBtn" class="ghost" type="button">Log waist</button>
          </div>
        </section>

        <section class="card">
          <div class="section-title"><h2>Strength trend</h2><span class="meta">Estimated 1RM · anchors</span></div>
          <div class="chart">${multiStrengthChart(strengthPoints)}</div>
          <p class="small muted">e1RM is an estimate from logged weight and reps. It is most useful as a trend, not as a true tested 1RM.</p>
        </section>

        <section class="card">
          <h2>Weekly muscle sets</h2>
          <p class="meta">Working sets logged in the last 7 days, grouped by each exercise's primary muscle.</p>
          <div class="log-list">${weeklyMuscleRows(days7)}</div>
        </section>
      </div>
    `;

    document.getElementById("progressWeightBtn").addEventListener("click", ()=>logWeight(today));
    document.getElementById("waistBtn").addEventListener("click", ()=>logWaist(today));
  }

  function weeklyMuscleRows(days) {
    const totals = {};
    days.forEach(d => {
      const w = state.workouts[d];
      if (!w || !program[w.programKey]) return;
      program[w.programKey].exercises.forEach(ex => {
        const x = w.exercises?.[ex.id];
        if (!x) return;
        const count = (x.sets || []).filter(s => !s.warmup && Number(s.reps) > 0).length;
        totals[ex.muscle] = (totals[ex.muscle] || 0) + count;
      });
    });
    if (!Object.keys(totals).length) return `<p class="meta">No working sets logged yet.</p>`;
    return Object.entries(totals).sort((a,b)=>b[1]-a[1]).map(([m,n])=>`
      <div class="log-item"><strong>${esc(m)}</strong><span class="pill">${n} sets</span></div>
    `).join("");
  }

  function logWaist(date) {
    const current = state.body[date]?.waist || "";
    const raw = prompt("Waist circumference (cm):", current);
    if (raw === null) return;
    const v = clampNumber(raw, 40, 200);
    if (!v) return showToast("Enter a valid waist measurement.");
    getBody(date).waist = v; saveState(); render();
  }

  function rollingWeightAverage(endDate, windowDays) {
    const days = dateRangeEnding(endDate, windowDays);
    const vals = days.map(d => Number(state.body[d]?.weight)).filter(v => v > 0);
    return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : null;
  }

  function latestBodyValue(key) {
    const dates = Object.keys(state.body).sort().reverse();
    for (const d of dates) {
      const v = Number(state.body[d]?.[key]);
      if (v > 0) return {date:d, value:v};
    }
    return null;
  }

  function getWeightPoints(daysBack) {
    const days = dateRangeEnding(isoToday(), daysBack);
    return days.map(d => ({date:d, value:Number(state.body[d]?.weight)})).filter(p => p.value > 0);
  }

  function getStrengthPoints(daysBack) {
    const cutoff = addDays(isoToday(), -(daysBack-1));
    const anchorIds = ["bench","pullup","squat","shoulder_press","rdl"];
    const names = {bench:"Bench",pullup:"Pull-Up",squat:"Squat",shoulder_press:"Shoulder",rdl:"RDL"};
    const out = {};
    anchorIds.forEach(id => out[id] = []);
    Object.keys(state.workouts).sort().forEach(date => {
      if (date < cutoff) return;
      const w = state.workouts[date];
      Object.entries(w.exercises || {}).forEach(([id,x]) => {
        if (!anchorIds.includes(id)) return;
        const bodyMass = Number(state.body[date]?.weight || state.settings.weightGoal || 0);
        const best = bestE1RM((x.sets || []).filter(s => !s.warmup), id === "pullup" ? bodyMass : 0);
        if (best) out[id].push({date, value:best});
      });
    });
    return Object.entries(out).filter(([,pts])=>pts.length).map(([id,pts])=>({id,name:names[id],points:pts}));
  }

  function bestE1RM(sets, baseLoad=0) {
    let best = 0;
    sets.forEach(s => {
      const enteredLoad = Number(s.load || 0), reps = Number(s.reps);
      const load = enteredLoad + Number(baseLoad || 0);
      if (load > 0 && reps > 0 && reps <= 20) {
        const est = load * (1 + reps/30);
        if (est > best) best = est;
      }
    });
    return best || null;
  }

  function lineChart(points, unit) {
    if (points.length < 2) return `<div class="chart-empty">Log at least two measurements to see a trend.</div>`;
    const w=620,h=150,p=18;
    const vals=points.map(p=>p.value), min=Math.min(...vals), max=Math.max(...vals);
    const range=Math.max(.5,max-min);
    const xy=points.map((pt,i)=>({
      x:p + i*(w-2*p)/(points.length-1),
      y:h-p - ((pt.value-min)/range)*(h-2*p)
    }));
    const path=xy.map((q,i)=>`${i?"L":"M"}${q.x.toFixed(1)},${q.y.toFixed(1)}`).join(" ");
    return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Trend chart">
      <path d="${path}" fill="none" stroke="currentColor" stroke-width="3" style="color:#2563eb" />
      ${xy.map(q=>`<circle cx="${q.x}" cy="${q.y}" r="4" fill="#2563eb" />`).join("")}
      <text x="${p}" y="14" font-size="11" fill="#6b7280">${round1(max)} ${unit}</text>
      <text x="${p}" y="${h-2}" font-size="11" fill="#6b7280">${round1(min)} ${unit}</text>
    </svg>`;
  }

  function multiStrengthChart(series) {
    if (!series.length) return `<div class="chart-empty">Log anchor lifts to build your strength trend.</div>`;
    return series.map(s => {
      const last=s.points[s.points.length-1];
      const first=s.points[0];
      const delta = last.value-first.value;
      return `<div class="log-item">
        <div><strong>${esc(s.name)}</strong><div class="meta">${round1(first.value)} → ${round1(last.value)} kg e1RM</div></div>
        <span class="pill ${delta>=0?"good":"warn"}">${delta>=0?"+":""}${round1(delta)} kg</span>
      </div>`;
    }).join("");
  }

  function renderSettings() {
    view.innerHTML = `
      <div class="stack">
        <section class="card">
          <h2>Targets</h2>
          <div class="form-row" style="margin-top:12px">
            <label>Protein target (g/day)
              <input id="proteinTargetInput" type="number" min="50" max="300" step="1" value="${state.settings.proteinTarget}" />
            </label>
            <label>Reference body weight (kg)
              <input id="weightGoalInput" type="number" min="30" max="250" step="0.1" value="${state.settings.weightGoal}" />
            </label>
          </div>
          <button id="saveSettingsBtn" class="primary" type="button" style="margin-top:12px">Save targets</button>
        </section>

        <section class="card">
          <h2>Quick protein foods</h2>
          <p class="meta">Edit the protein value to match your actual products.</p>
          <div class="log-list">
            ${state.quickFoods.map(f => `
              <div class="log-item" style="grid-template-columns:1fr 92px">
                <div><strong>${esc(f.name)}</strong><div class="meta">${esc(f.detail)}</div></div>
                <label><span class="small">Protein g</span><input class="food-protein-edit" data-id="${f.id}" type="number" min="0" max="150" step="1" value="${f.protein}" /></label>
              </div>
            `).join("")}
          </div>
        </section>

        <section class="card">
          <h2>Backup</h2>
          <p class="meta">Your data lives only in this browser/device. Export a backup before clearing Safari data or changing devices.</p>
          <div class="row-wrap">
            <button id="exportBtn" class="ghost" type="button">Export JSON</button>
            <label class="ghost" style="display:inline-flex;align-items:center;cursor:pointer">Import JSON
              <input id="importInput" class="hidden" type="file" accept="application/json,.json" />
            </label>
          </div>
        </section>

        <section class="card">
          <h2>Data</h2>
          <p class="meta">Reset permanently removes workout, nutrition, and measurement history from this browser.</p>
          <button id="resetBtn" class="danger-btn" type="button">Reset all data</button>
        </section>

        <section class="note">
          V1 intentionally tracks protein, creatine, body weight, waist, workout performance, RIR, technique, and pain flags. Calories and macro tracking are excluded to keep daily logging fast.
        </section>
      </div>
    `;

    document.getElementById("saveSettingsBtn").addEventListener("click", () => {
      state.settings.proteinTarget = clampNumber(document.getElementById("proteinTargetInput").value,50,300) || 130;
      state.settings.weightGoal = clampNumber(document.getElementById("weightGoalInput").value,30,250) || 69;
      document.querySelectorAll(".food-protein-edit").forEach(inp => {
        const f = state.quickFoods.find(x=>x.id===inp.dataset.id);
        if (f) f.protein = clampNumber(inp.value,0,150);
      });
      saveState(); showToast("Settings saved.");
    });

    document.querySelectorAll(".food-protein-edit").forEach(inp => {
      inp.addEventListener("change", () => {
        const f = state.quickFoods.find(x=>x.id===inp.dataset.id);
        if (f) { f.protein = clampNumber(inp.value,0,150); saveState(); }
      });
    });

    document.getElementById("exportBtn").addEventListener("click", exportData);
    document.getElementById("importInput").addEventListener("change", importData);
    document.getElementById("resetBtn").addEventListener("click", () => {
      if (!confirm("Reset all workout, nutrition, and body data? This cannot be undone.")) return;
      state = clone(defaultState); saveState(); renderSettings(); showToast("All data reset.");
    });
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(state,null,2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href=url; a.download=`strength-protein-backup-${isoToday()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),500);
  }

  function importData(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed || typeof parsed !== "object") throw new Error();
        state = {...clone(defaultState), ...parsed, settings:{...defaultState.settings,...(parsed.settings||{})}};
        saveState(); renderSettings(); showToast("Backup imported.");
      } catch {
        showToast("That file is not a valid backup.");
      }
    };
    reader.readAsText(file);
    e.target.value="";
  }

  function dateRangeEnding(endDate, count) {
    const out=[];
    for (let i=count-1;i>=0;i--) out.push(addDays(endDate,-i));
    return out;
  }

  function addDays(dateStr, delta) {
    const d=parseDateOnly(dateStr);
    d.setDate(d.getDate()+delta);
    const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,"0"), day=String(d.getDate()).padStart(2,"0");
    return `${y}-${m}-${day}`;
  }

  function formatRest(sec) {
    const m=Math.floor(sec/60), s=sec%60;
    return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  }

  function deltaText(v, suffix) {
    return `${v>0?"+":""}${round1(v)}${suffix}`;
  }

  function round1(n) { return Math.round(Number(n)*10)/10; }
  function roundTo(n, step=.5) { return Math.round(n/step)*step; }
  function uid() { return `${Date.now().toString(36)}${Math.random().toString(36).slice(2,7)}`; }
  function capitalize(s) { return s ? s.charAt(0).toUpperCase()+s.slice(1) : ""; }
  function sanitizeNumString(v,min,max) {
    if (v==="") return "";
    const n=Number(v);
    if (!Number.isFinite(n)) return "";
    return String(Math.min(max,Math.max(min,n)));
  }
  function clampNumber(v,min,max) {
    const n=Number(v);
    if (!Number.isFinite(n)) return null;
    return Math.min(max,Math.max(min,n));
  }
  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  }
  function escAttr(s) { return esc(s); }
  function showToast(msg) {
    toast.textContent=msg; toast.classList.add("show");
    clearTimeout(showToast.t); showToast.t=setTimeout(()=>toast.classList.remove("show"),1800);
  }
  function syncNav() {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.view===activeView));
  }
})();