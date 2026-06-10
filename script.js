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
const blueprint = document.querySelector("#blueprint");
const copyButton = document.querySelector("#copyBlueprint");

function pick(list, seed) {
  return list[seed % list.length];
}

function buildBlueprint() {
  const comfort = document.querySelector("#comfort").value;
  const progression = document.querySelector("#progression").value;
  const trope = document.querySelector("#trope").value;
  const warmth = Number(document.querySelector("#warmth").value);
  const seed = comfort.length + progression.length + trope.length + warmth;
  const hero = pick(titleIngredients[comfort], seed);
  const noun = pick(["Pocket Dungeon", "Tea Garden", "Moonlit Questboard", "Level-Up Café", "Familiar's Guild"], seed + 2);
  const title = `The ${hero}'s ${noun}`;
  const promise = `A ${warmthLabels[warmth - 1]} cozy LitRPG about a ${comfort}, powered by ${progressionRewards[progression]} and a ${trope} trope stack.`;

  const html = `
    <section class="blueprint-block">
      <h3>Market-ready title</h3>
      <p><strong>${title}</strong></p>
      <p>${promise}</p>
    </section>
    <section class="blueprint-block">
      <h3>Back-cover hook</h3>
      <p>When the local questboard starts awarding experience for acts of kindness, an under-leveled caretaker must turn ${comfort} into the safest, most beloved hub in the realm—before a charming rival unlocks the same rare path first.</p>
    </section>
    <section class="blueprint-block">
      <h3>Chapter engine</h3>
      <ul>
        <li><strong>Comfort beat:</strong> food, shelter, friendship, or a tiny magical ritual.</li>
        <li><strong>Crunch beat:</strong> a visible stat, recipe, class, card, pet, or town upgrade.</li>
        <li><strong>Commercial beat:</strong> curiosity gap, trope payoff, and a soft cliffhanger.</li>
      </ul>
    </section>
    <section class="blueprint-block">
      <h3>Launch copy</h3>
      <p>For readers who want the kindness of cozy fantasy, the dopamine of progression systems, and a found-family quest that feels like golden light over a green harbor under a purple ocean sky.</p>
    </section>`;
  blueprint.innerHTML = html;
  return blueprint.innerText.trim();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  buildBlueprint();
});

copyButton.addEventListener("click", async () => {
  const text = buildBlueprint();
  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = "Copied";
  } catch {
    copyButton.textContent = "Select text";
  }
  setTimeout(() => { copyButton.textContent = "Copy"; }, 1600);
});

buildBlueprint();
