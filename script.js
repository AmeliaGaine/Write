const STORAGE_KEY = "ggpo.savedBlueprints";

const titleIngredients = {
  "magical bakery and enchanted recipes": ["Cinnamon Mage", "Sourdough Sorcerer", "Mooncake Alchemist"],
  "seaside inn for retired adventurers": ["Tidepool Innkeeper", "Golden Kettle Ranger", "Sea-Glass Warden"],
  "greenhouse guild with talking familiars": ["Sprout Witch", "Verdant Beast-Tamer", "Herbalist of Level Nine"],
  "floating library above a purple ocean": ["Cloud Librarian", "Purple-Tide Archivist", "Spellbook Cartographer"],
  "cozy crafting shop in a dungeon town": ["Pocket Dungeon Crafter", "Lantern Forge Merchant", "Rune-Stitch Tailor"]
};

const progressionRewards = {
  "class evolution": "gentle class evolutions that reveal new identities instead of grim power spikes",
  "skill tree crafting": "recipe-like skill trees with visible, satisfying unlock paths",
  "pet/familiar leveling": "adorable companion growth, combo abilities, and emotional bonding milestones",
  "town-building upgrades": "community upgrades that make every quest improve the shared home",
  "deck-builder spell cards": "collectible spell cards that turn strategy into cozy ritual"
};

const warmthLabels = ["adventurous", "bright", "heart-forward", "blanket-warm", "maximum cocoa"];

const form = document.querySelector("#bookForm");
const generateButton = document.querySelector("#generateBlueprint");
const generateStatus = document.querySelector("#generateStatus");
const blueprint = document.querySelector("#blueprint");
const copyButton = document.querySelector("#copyBlueprint");
const saveButton = document.querySelector("#saveBlueprint");
const exportButton = document.querySelector("#exportBlueprint");
const exportDocButton = document.querySelector("#exportDocBlueprint");
const savedBlueprints = document.querySelector("#savedBlueprints");
const savedCount = document.querySelector("#savedCount");

let currentBlueprint = null;
let generationCounter = 0;

function pick(list, seed) {
  return list[seed % list.length];
}

function getInputs() {
  return {
    comfort: document.querySelector("#comfort").value,
    progression: document.querySelector("#progression").value,
    trope: document.querySelector("#trope").value,
    warmth: Number(document.querySelector("#warmth").value)
  };
}

function setInputs(inputs) {
  document.querySelector("#comfort").value = inputs.comfort;
  document.querySelector("#progression").value = inputs.progression;
  document.querySelector("#trope").value = inputs.trope;
  document.querySelector("#warmth").value = inputs.warmth;
}

function buildBlueprintData(inputs = getInputs(), variant = generationCounter) {
  const seed = inputs.comfort.length + inputs.progression.length + inputs.trope.length + inputs.warmth + (variant * 17);
  const hero = pick(titleIngredients[inputs.comfort], seed);
  const noun = pick(["Pocket Dungeon", "Tea Garden", "Moonlit Questboard", "Level-Up Café", "Familiar's Guild"], seed + 2);
  const title = `The ${hero}'s ${noun}`;
  const promise = `A ${warmthLabels[inputs.warmth - 1]} cozy LitRPG about a ${inputs.comfort}, powered by ${progressionRewards[inputs.progression]} and a ${inputs.trope} trope stack.`;
  const hook = `When the local questboard starts awarding experience for acts of kindness, an under-leveled caretaker must turn ${inputs.comfort} into the safest, most beloved hub in the realm—before a charming rival unlocks the same rare path first.`;
  const beats = [
    "Comfort beat: food, shelter, friendship, or a tiny magical ritual.",
    "Crunch beat: a visible stat, recipe, class, card, pet, or town upgrade.",
    "Commercial beat: curiosity gap, trope payoff, and a soft cliffhanger."
  ];
  const targetReader = "Readers who want cozy fantasy warmth, visible progression, low-stress stakes, found family, magical food/crafting, and a clean dopamine loop.";
  const commercialPositioning = [
    "Primary shelf: Cozy fantasy / LitRPG",
    "Emotional promise: safety, competence, belonging, and wonder",
    "Progression promise: visible upgrades every chapter",
    `Differentiator: ${inputs.comfort} fused with ${progressionRewards[inputs.progression]}`
  ];
  const tropeStack = [
    ...inputs.trope.split(" + ").map((trope) => trope.charAt(0).toUpperCase() + trope.slice(1)),
    "Kindness-as-XP mechanic",
    "Cozy community hub",
    "Gentle rival pressure"
  ];
  const firstFiveChapters = [
    "Establish the cozy sanctuary, the under-leveled protagonist, and the emotional wound the reader wants healed.",
    `Trigger the unusual progression mechanic inside the ${inputs.comfort} premise.`,
    "Introduce the rival, familiar, secret regular, or recurring cast member who turns the book into a series hangout.",
    `Deliver the first visible ${inputs.progression} upgrade and make it solve a warm, practical problem.`,
    "End with a larger community threat or opportunity that promises more cozy quests without breaking the safe tone."
  ];
  const seriesEngine = `Each book should introduce a new comfort domain, progression tier, community problem, and magical-business upgrade while deepening the ${inputs.trope} cast dynamics.`;
  const compPositioning = `For fans of cozy fantasy comfort reads who also want LitRPG-style numbers, skills, and upgrades; position it as ${warmthLabels[inputs.warmth - 1]} progression fantasy with commercial found-family appeal.`;
  const launchCopy = "For readers who want the kindness of cozy fantasy, the dopamine of progression systems, and a found-family quest that feels like golden light over a green harbor under a purple ocean sky.";

  return {
    title,
    promise,
    hook,
    targetReader,
    commercialPositioning,
    tropeStack,
    beats,
    firstFiveChapters,
    seriesEngine,
    compPositioning,
    launchCopy,
    variant,
    generatedAt: new Date().toISOString(),
    inputs
  };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[character]));
}

function renderList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderBlueprint(data = buildBlueprintData()) {
  currentBlueprint = data;

  blueprint.innerHTML = `
    <section class="blueprint-block generated-summary">
      <h3>Bestseller Blueprint Brief</h3>
      <p><strong>${escapeHtml(data.title)}</strong></p>
      <p>${escapeHtml(data.promise)}</p>
      <small>Generated version ${escapeHtml(data.variant + 1)} · ${escapeHtml(new Date(data.generatedAt).toLocaleTimeString())}</small>
    </section>
    <section class="blueprint-block">
      <h3>Back-cover hook</h3>
      <p>${escapeHtml(data.hook)}</p>
    </section>
    <section class="blueprint-block">
      <h3>Target reader</h3>
      <p>${escapeHtml(data.targetReader)}</p>
    </section>
    <section class="blueprint-block">
      <h3>Commercial positioning</h3>
      <ul>${renderList(data.commercialPositioning)}</ul>
    </section>
    <section class="blueprint-block">
      <h3>Trope stack</h3>
      <ul>${renderList(data.tropeStack)}</ul>
    </section>
    <section class="blueprint-block">
      <h3>Chapter engine</h3>
      <ul>${renderList(data.beats)}</ul>
    </section>
    <section class="blueprint-block">
      <h3>First five chapter targets</h3>
      <ol>${renderList(data.firstFiveChapters)}</ol>
    </section>
    <section class="blueprint-block">
      <h3>Series engine</h3>
      <p>${escapeHtml(data.seriesEngine)}</p>
    </section>
    <section class="blueprint-block">
      <h3>Comp-style positioning</h3>
      <p>${escapeHtml(data.compPositioning)}</p>
    </section>
    <section class="blueprint-block">
      <h3>Launch copy</h3>
      <p>${escapeHtml(data.launchCopy)}</p>
    </section>`;
  blueprint.classList.remove("blueprint-refreshed");
  void blueprint.offsetWidth;
  blueprint.classList.add("blueprint-refreshed");
  return blueprint.innerText.trim();
}

function markdownList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function numberedMarkdownList(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function blueprintToMarkdown(record = currentBlueprint) {
  return `# Bestseller Blueprint Brief: ${record.title}

## Working title
${record.title}

## Reader promise
${record.promise}

## Back-cover hook
${record.hook}

## Target reader
${record.targetReader}

## Commercial positioning
${markdownList(record.commercialPositioning)}

## Trope stack
${markdownList(record.tropeStack)}

## Chapter engine
${markdownList(record.beats)}

## First five chapter targets
${numberedMarkdownList(record.firstFiveChapters)}

## Series engine
${record.seriesEngine}

## Comp-style positioning
${record.compPositioning}

## Launch copy
${record.launchCopy}

## Saved inputs
- Core comfort fantasy: ${record.inputs.comfort}
- Progression fantasy: ${record.inputs.progression}
- Commercial trope stack: ${record.inputs.trope}
- Reader warmth: ${warmthLabels[record.inputs.warmth - 1]}
`;
}

function blueprintToDocHtml(record = currentBlueprint) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Bestseller Blueprint Brief: ${escapeHtml(record.title)}</title>
    <style>
      body { font-family: Georgia, 'Times New Roman', serif; color: #1f2937; line-height: 1.55; }
      h1 { color: #2d1459; }
      h2 { color: #0d7a58; border-bottom: 1px solid #d1d5db; padding-bottom: 4px; }
      li { margin: 6px 0; }
      .meta { color: #4b5563; }
    </style>
  </head>
  <body>
    <h1>Bestseller Blueprint Brief</h1>
    <h2>Working title</h2>
    <p>${escapeHtml(record.title)}</p>
    <h2>Reader promise</h2>
    <p>${escapeHtml(record.promise)}</p>
    <h2>Back-cover hook</h2>
    <p>${escapeHtml(record.hook)}</p>
    <h2>Target reader</h2>
    <p>${escapeHtml(record.targetReader)}</p>
    <h2>Commercial positioning</h2>
    <ul>${record.commercialPositioning.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <h2>Trope stack</h2>
    <ul>${record.tropeStack.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <h2>Chapter engine</h2>
    <ul>${record.beats.map((beat) => `<li>${escapeHtml(beat)}</li>`).join("")}</ul>
    <h2>First five chapter targets</h2>
    <ol>${record.firstFiveChapters.map((chapter) => `<li>${escapeHtml(chapter)}</li>`).join("")}</ol>
    <h2>Series engine</h2>
    <p>${escapeHtml(record.seriesEngine)}</p>
    <h2>Comp-style positioning</h2>
    <p>${escapeHtml(record.compPositioning)}</p>
    <h2>Launch copy</h2>
    <p>${escapeHtml(record.launchCopy)}</p>
    <h2>Saved inputs</h2>
    <ul class="meta">
      <li><strong>Core comfort fantasy:</strong> ${escapeHtml(record.inputs.comfort)}</li>
      <li><strong>Progression fantasy:</strong> ${escapeHtml(record.inputs.progression)}</li>
      <li><strong>Commercial trope stack:</strong> ${escapeHtml(record.inputs.trope)}</li>
      <li><strong>Reader warmth:</strong> ${escapeHtml(warmthLabels[record.inputs.warmth - 1])}</li>
    </ul>
  </body>
</html>`;
}

function ensureBriefRecord(record) {
  if (!record || !record.inputs) return null;
  const generated = buildBlueprintData(record.inputs, record.variant || 0);
  return {
    ...generated,
    ...record,
    targetReader: record.targetReader || generated.targetReader,
    commercialPositioning: record.commercialPositioning || generated.commercialPositioning,
    tropeStack: record.tropeStack || generated.tropeStack,
    firstFiveChapters: record.firstFiveChapters || generated.firstFiveChapters,
    seriesEngine: record.seriesEngine || generated.seriesEngine,
    compPositioning: record.compPositioning || generated.compPositioning
  };
}

function loadSavedBlueprints() {
  try {
    const records = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(records) ? records.map(ensureBriefRecord).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function storeSavedBlueprints(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function filenameSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "cozy-litrpg-blueprint";
}

function downloadFile(contents, filename, type) {
  const blob = new Blob([contents], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function downloadMarkdown(record = currentBlueprint) {
  downloadFile(blueprintToMarkdown(record), `${filenameSlug(record.title)}.md`, "text/markdown");
}

function downloadDoc(record = currentBlueprint) {
  downloadFile(blueprintToDocHtml(record), `${filenameSlug(record.title)}.doc`, "application/msword");
}

function renderSavedBlueprints() {
  const records = loadSavedBlueprints();
  savedCount.textContent = records.length;

  if (!records.length) {
    savedBlueprints.innerHTML = `
      <div class="empty-state">
        <strong>No saved quests yet.</strong>
        <span>Generate a blueprint, then press Save to start your series workspace.</span>
      </div>`;
    return;
  }

  savedBlueprints.innerHTML = records.map((record) => `
    <article class="saved-item" data-id="${escapeHtml(record.id)}">
      <input class="saved-title" value="${escapeHtml(record.title)}" aria-label="Saved blueprint title" />
      <p>${escapeHtml(record.inputs.comfort)} · ${escapeHtml(record.inputs.progression)}</p>
      <small>Saved ${escapeHtml(new Date(record.createdAt).toLocaleDateString())}</small>
      <div class="saved-actions">
        <button class="mini-button" type="button" data-action="load">Load</button>
        <button class="mini-button" type="button" data-action="export-md">Export .md</button>
        <button class="mini-button" type="button" data-action="export-doc">Export .doc</button>
        <button class="mini-button danger" type="button" data-action="delete">Delete</button>
      </div>
    </article>`).join("");
}

function saveCurrentBlueprint() {
  const data = currentBlueprint || buildBlueprintData();
  renderBlueprint(data);
  const record = {
    ...data,
    id: window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString()
  };
  const records = [record, ...loadSavedBlueprints()];
  storeSavedBlueprints(records);
  renderSavedBlueprints();
  saveButton.textContent = "Saved";
  setTimeout(() => { saveButton.textContent = "Save"; }, 1600);
}

function generateFreshBlueprint() {
  generationCounter += 1;
  const data = buildBlueprintData(getInputs(), generationCounter);
  renderBlueprint(data);
  generateButton.textContent = "Generate another fresh brief";
  generateStatus.textContent = `Generated ${data.title}. Save, copy, or export it when ready.`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  generateFreshBlueprint();
});

form.addEventListener("input", () => {
  generationCounter = 0;
  const data = buildBlueprintData(getInputs(), generationCounter);
  renderBlueprint(data);
  generateButton.textContent = "Generate fresh Bestseller Blueprint Brief";
  generateStatus.textContent = "Inputs changed. Click Generate for a fresh brief variant.";
});

copyButton.addEventListener("click", async () => {
  const text = renderBlueprint(currentBlueprint || buildBlueprintData());
  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = "Copied";
  } catch {
    copyButton.textContent = "Select text";
  }
  setTimeout(() => { copyButton.textContent = "Copy"; }, 1600);
});

saveButton.addEventListener("click", saveCurrentBlueprint);
exportButton.addEventListener("click", () => {
  const data = currentBlueprint || buildBlueprintData();
  renderBlueprint(data);
  downloadMarkdown(data);
});

exportDocButton.addEventListener("click", () => {
  const data = currentBlueprint || buildBlueprintData();
  renderBlueprint(data);
  downloadDoc(data);
});

savedBlueprints.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const item = button.closest(".saved-item");
  const records = loadSavedBlueprints();
  const record = records.find((saved) => saved.id === item.dataset.id);
  if (!record) return;

  if (button.dataset.action === "load") {
    setInputs(record.inputs);
    renderBlueprint(record);
    generateStatus.textContent = `Loaded ${record.title} from your saved workspace.`;
    document.querySelector("#studio").scrollIntoView({ behavior: "smooth" });
  }

  if (button.dataset.action === "export-md") {
    downloadMarkdown(record);
  }

  if (button.dataset.action === "export-doc") {
    downloadDoc(record);
  }

  if (button.dataset.action === "delete") {
    storeSavedBlueprints(records.filter((saved) => saved.id !== record.id));
    renderSavedBlueprints();
  }
});

savedBlueprints.addEventListener("change", (event) => {
  if (!event.target.matches(".saved-title")) return;
  const item = event.target.closest(".saved-item");
  const records = loadSavedBlueprints().map((record) => (
    record.id === item.dataset.id ? { ...record, title: event.target.value.trim() || record.title } : record
  ));
  storeSavedBlueprints(records);
  renderSavedBlueprints();
});

renderBlueprint();
renderSavedBlueprints();
