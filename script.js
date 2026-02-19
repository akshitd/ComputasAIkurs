const letterWords = {
  A: { word: "Apple", hint: "A is for Apple 🍎" },
  B: { word: "Ball", hint: "B is for Ball ⚽" },
  C: { word: "Cat", hint: "C is for Cat 🐱" },
  D: { word: "Dog", hint: "D is for Dog 🐶" },
  E: { word: "Egg", hint: "E is for Egg 🥚" },
  F: { word: "Fish", hint: "F is for Fish 🐟" },
  G: { word: "Goat", hint: "G is for Goat 🐐" },
  H: { word: "Hat", hint: "H is for Hat 🎩" },
  I: { word: "Ice", hint: "I is for Ice 🧊" },
  J: { word: "Jam", hint: "J is for Jam 🍓" },
  K: { word: "Kite", hint: "K is for Kite 🪁" },
  L: { word: "Lion", hint: "L is for Lion 🦁" },
  M: { word: "Moon", hint: "M is for Moon 🌙" },
  N: { word: "Nest", hint: "N is for Nest 🪺" },
  O: { word: "Owl", hint: "O is for Owl 🦉" },
  P: { word: "Pear", hint: "P is for Pear 🍐" },
  Q: { word: "Queen", hint: "Q is for Queen 👑" },
  R: { word: "Rainbow", hint: "R is for Rainbow 🌈" },
  S: { word: "Sun", hint: "S is for Sun ☀️" },
  T: { word: "Tiger", hint: "T is for Tiger 🐯" },
  U: { word: "Umbrella", hint: "U is for Umbrella ☂️" },
  V: { word: "Violin", hint: "V is for Violin 🎻" },
  W: { word: "Whale", hint: "W is for Whale 🐳" },
  X: { word: "Xylophone", hint: "X is for Xylophone 🎶" },
  Y: { word: "Yo-yo", hint: "Y is for Yo-yo 🪀" },
  Z: { word: "Zebra", hint: "Z is for Zebra 🦓" },
};

const builderWords = [
  { word: "apple", emoji: "🍎" },
  { word: "ball", emoji: "⚽" },
  { word: "cat", emoji: "🐱" },
  { word: "dog", emoji: "🐶" },
  { word: "egg", emoji: "🥚" },
  { word: "fish", emoji: "🐟" },
  { word: "goat", emoji: "🐐" },
  { word: "hat", emoji: "🎩" },
  { word: "ice", emoji: "🧊" },
  { word: "jam", emoji: "🍓" },
  { word: "kite", emoji: "🪁" },
  { word: "lion", emoji: "🦁" },
  { word: "moon", emoji: "🌙" },
  { word: "nest", emoji: "🪺" },
  { word: "owl", emoji: "🦉" },
  { word: "pear", emoji: "🍐" },
  { word: "queen", emoji: "👑" },
  { word: "rainbow", emoji: "🌈" },
  { word: "sun", emoji: "☀️" },
  { word: "tree", emoji: "🌳" },
  { word: "umbrella", emoji: "☂️" },
  { word: "violin", emoji: "🎻" },
  { word: "whale", emoji: "🐳" },
  { word: "xylophone", emoji: "🎶" },
  { word: "yo-yo", emoji: "🪀" },
  { word: "zebra", emoji: "🦓" },
];

const matchPairs = [
  { emoji: "🍌", word: "banana" },
  { emoji: "🚌", word: "bus" },
  { emoji: "🏡", word: "house" },
  { emoji: "🐸", word: "frog" },
];

const sentenceParts = [
  ["The", "A", "My"],
  ["happy", "tiny", "sleepy"],
  ["bird", "rabbit", "turtle"],
  ["jumps", "runs", "sings"],
  ["today", "outside", "softly"],
];

const letterWordEl = document.getElementById("letter-word");
const letterHintEl = document.getElementById("letter-hint");
const letterSpeakBtn = document.getElementById("letter-speak");
const lettersGrid = document.getElementById("letters-grid");
const builderWordEl = document.getElementById("builder-word");
const builderOptionsEl = document.getElementById("builder-options");
const builderFeedback = document.getElementById("builder-feedback");
const builderHintBtn = document.getElementById("builder-hint");
const builderPhoto = document.getElementById("builder-photo");
const builderNextBtn = document.getElementById("builder-next");
const matchEmojiEl = document.getElementById("match-emoji");
const matchOptionsEl = document.getElementById("match-options");
const matchFeedback = document.getElementById("match-feedback");
const sentenceColumnsEl = document.getElementById("sentence-columns");
const sentenceResultEl = document.getElementById("sentence-result");
const sentenceCheckBtn = document.getElementById("sentence-check");
const sentenceSpeakBtn = document.getElementById("sentence-speak");
const sentenceNextBtn = document.getElementById("sentence-next");
const sentenceFeedback = document.getElementById("sentence-feedback");
const starsEl = document.getElementById("stars");
const pointsTotalEl = document.getElementById("points-total");
const themeToggleBtn = document.getElementById("theme-toggle");
const sparkActionsEl = document.getElementById("spark-actions");
const sparkFeedbackEl = document.getElementById("spark-feedback");
const sparkTextEl = document.querySelector(".spark-text");
const sparkNounEl = document.getElementById("spark-noun");
const sparkLettersEl = document.getElementById("spark-letters");
const sparkProgressEl = document.getElementById("spark-progress");

const panels = {
  letters: document.getElementById("panel-letters"),
  builder: document.getElementById("panel-builder"),
  match: document.getElementById("panel-match"),
  sentences: document.getElementById("panel-sentences"),
};

const starLog = new Map();
let totalPoints = 0;
const starThresholds = [1, 20, 50];

function showPanel(panel) {
  Object.values(panels).forEach((panelEl) => {
    panelEl.hidden = panelEl !== panels[panel];
  });
  panels[panel].scrollIntoView({ behavior: "smooth", block: "start" });
}

function addCompletion(name) {
  const count = (starLog.get(name) || 0) + 1;
  starLog.set(name, count);
  totalPoints += 1;
  renderStars();
}

function addPoint() {
  totalPoints += 1;
  renderStars();
}

function renderStars() {
  starsEl.innerHTML = "";
  const labels = [
    "Lyd og bokstaver",
    "Ordbygger",
    "Bilde-match",
    "Setningsbygger",
  ];
  labels.forEach((label) => {
    const count = starLog.get(label) || 0;
    const starCount = starThresholds.filter((t) => count >= t).length;
    const stars = starCount > 0 ? "⭐".repeat(starCount) : "☆";
    const card = document.createElement("div");
    card.className = "star";
    card.innerHTML = `
      <div class="star-icons">${stars}</div>
      <div class="star-label">${label} (${count})</div>
    `;
    starsEl.appendChild(card);
  });
  pointsTotalEl.textContent = totalPoints;
}

function setupLetters() {
  lettersGrid.innerHTML = "";
  Object.keys(letterWords).forEach((letter) => {
    const btn = document.createElement("button");
    btn.className = "letter";
    btn.dataset.letter = letter;
    btn.textContent = letter;
    btn.addEventListener("click", () => {
      const data = letterWords[letter];
      letterWordEl.textContent = data.word;
      letterHintEl.textContent = data.hint;
      addCompletion("Lyd og bokstaver");
    });
    lettersGrid.appendChild(btn);
  });
}

function speakCurrentLetter() {
  if (!("speechSynthesis" in window)) {
    letterHintEl.textContent = "Tale støttes ikke på denne enheten.";
    return;
  }

  const hint = letterHintEl.textContent;
  if (!hint || hint === "A is for ..." || hint === "Velg en bokstav først.") {
    letterHintEl.textContent = "Velg en bokstav først.";
    return;
  }

  const cleanHint = hint.replace(/[^\w\s'.-]/g, "").trim();
  if (!cleanHint) {
    letterHintEl.textContent = "Velg en bokstav først.";
    return;
  }

  const voices = window.speechSynthesis.getVoices();
  const preferredVoice =
    voices.find((voice) => voice.lang.startsWith("en") && /female|woman|girl/i.test(voice.name)) ||
    voices.find((voice) => voice.lang.startsWith("en") && /female|woman|girl/i.test(voice.voiceURI || "")) ||
    voices.find((voice) => voice.lang.startsWith("en")) ||
    voices[0];

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(cleanHint);
  utterance.rate = 0.9;
  utterance.pitch = 1.2;
  utterance.lang = "en-US";
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  window.speechSynthesis.speak(utterance);
}

let currentBuilderIndex = 0;

function setupBuilder() {
  loadBuilderWord();
}

function loadBuilderWord() {
  const item = builderWords[currentBuilderIndex % builderWords.length];
  const word = item.word.toLowerCase();
  const blanks = getBlanks(word);
  const options = buildOptions(word, blanks);
  builderFeedback.textContent = "";
  builderWordEl.innerHTML = "";
  builderOptionsEl.innerHTML = "";
  builderPhoto.hidden = true;
  builderHintBtn.textContent = "Vis bildehint";

  const letters = word.split("");
  letters.forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = blanks.includes(index) ? "_" : letter;
    span.dataset.index = index;
    builderWordEl.appendChild(span);
  });

  options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => handleBuilderChoice(option));
    builderOptionsEl.appendChild(btn);
  });

  builderPhoto.innerHTML = `
    <div class="emoji">${item.emoji}</div>
  `;
}

function handleBuilderChoice(letter) {
  const item = builderWords[currentBuilderIndex % builderWords.length];
  const word = item.word.toLowerCase();
  const blanks = getBlanks(word);
  const nextBlank = blanks.find((index) => {
    const span = builderWordEl.querySelector(`span[data-index="${index}"]`);
    return span && span.textContent === "_";
  });

  if (nextBlank === undefined) {
    builderFeedback.textContent = "Bra jobba! Nytt ord kommer.";
    currentBuilderIndex += 1;
    addCompletion("Ordbygger");
    setTimeout(loadBuilderWord, 900);
    return;
  }

  const correctLetter = word[nextBlank];
  const span = builderWordEl.querySelector(`span[data-index="${nextBlank}"]`);

  if (letter === correctLetter) {
    span.textContent = letter;
    builderFeedback.textContent = "Flott!";
  } else {
    builderFeedback.textContent = "Prøv igjen!";
  }
}

function nextBuilderWord() {
  currentBuilderIndex += 1;
  loadBuilderWord();
}

function getBlanks(word) {
  if (word.length <= 4) {
    return [Math.floor(word.length / 2)];
  }
  const first = Math.floor(word.length / 3);
  const second = Math.floor((2 * word.length) / 3);
  return [first, second].filter((idx, pos, arr) => arr.indexOf(idx) === pos);
}

function buildOptions(word, blanks) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const correctLetters = blanks.map((index) => word[index]);
  const options = new Set(correctLetters);
  while (options.size < Math.min(6, alphabet.length)) {
    options.add(alphabet[Math.floor(Math.random() * alphabet.length)]);
  }
  return shuffle([...options]);
}

let currentMatchIndex = 0;

function setupMatch() {
  loadMatchRound();
}

function loadMatchRound() {
  const item = matchPairs[currentMatchIndex % matchPairs.length];
  matchEmojiEl.textContent = item.emoji;
  matchFeedback.textContent = "";
  matchOptionsEl.innerHTML = "";
  const options = shuffle([...matchPairs.map((pair) => pair.word)]).slice(0, 3);
  if (!options.includes(item.word)) {
    options.pop();
    options.push(item.word);
  }
  shuffle(options).forEach((word) => {
    const btn = document.createElement("button");
    btn.textContent = word;
    btn.addEventListener("click", () => handleMatchChoice(word, item.word));
    matchOptionsEl.appendChild(btn);
  });
}

function handleMatchChoice(choice, correct) {
  if (choice === correct) {
    matchFeedback.textContent = "Riktig!";
    addCompletion("Bilde-match");
    currentMatchIndex += 1;
    setTimeout(loadMatchRound, 800);
  } else {
    matchFeedback.textContent = "Oi! Prøv igjen.";
  }
}

function setupSentences() {
  sentenceColumnsEl.innerHTML = "";
  sentenceState.clear();
  sentenceResultEl.textContent = "";
  sentenceFeedback.textContent = "";
  sentenceParts.forEach((column, columnIndex) => {
    const columnEl = document.createElement("div");
    columnEl.className = "column";
    shuffle([...column]).forEach((word) => {
      const btn = document.createElement("button");
      btn.textContent = word;
      btn.addEventListener("click", () => selectSentenceWord(columnIndex, word, btn));
      columnEl.appendChild(btn);
    });
    sentenceColumnsEl.appendChild(columnEl);
  });
}

const sentenceState = new Map();

function selectSentenceWord(columnIndex, word, button) {
  sentenceState.set(columnIndex, word);
  const column = button.parentElement;
  column.querySelectorAll("button").forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
  updateSentenceResult();
}

function updateSentenceResult() {
  const words = sentenceParts.map((_, index) => sentenceState.get(index) || "____");
  sentenceResultEl.textContent = words.join(" ");
}

sentenceCheckBtn.addEventListener("click", () => {
  if (sentenceState.size < sentenceParts.length) {
    sentenceFeedback.textContent = "Velg ett ord fra hver kolonne.";
    return;
  }
  sentenceFeedback.textContent = "Flott setning! Si den høyt.";
  addCompletion("Setningsbygger");
});

sentenceSpeakBtn.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) {
    sentenceFeedback.textContent = "Tale støttes ikke på denne enheten.";
    return;
  }
  const sentence = sentenceResultEl.textContent;
  if (!sentence || sentence.includes("____")) {
    sentenceFeedback.textContent = "Fullfør setningen først.";
    return;
  }
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice =
    voices.find((voice) => voice.lang.startsWith("en") && /female|woman|girl/i.test(voice.name)) ||
    voices.find((voice) => voice.lang.startsWith("en") && /female|woman|girl/i.test(voice.voiceURI || "")) ||
    voices.find((voice) => voice.lang.startsWith("en")) ||
    voices[0];
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(sentence);
  utterance.rate = 0.95;
  utterance.pitch = 1.1;
  utterance.lang = "en-US";
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  window.speechSynthesis.speak(utterance);
});

sentenceNextBtn.addEventListener("click", () => {
  setupSentences();
  addPoint();
});

function shuffle(list) {
  const array = [...list];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setupNavigation() {
  document.querySelectorAll("[data-panel]").forEach((card) => {
    card.addEventListener("click", () => showPanel(card.dataset.panel));
  });

  document.querySelectorAll("[data-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .getElementById(btn.dataset.jump)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupSpark() {
  if (!sparkActionsEl || !sparkFeedbackEl) return;
  const prompts = {
    say: "Flott! Si setningen tydelig.",
    noun: "Finn substantivet. Hint: det er tingen.",
  };

  sparkActionsEl.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      sparkActionsEl.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const key = btn.dataset.spark;
      sparkFeedbackEl.textContent = prompts[key] || "Bra jobbet!";
      if (key === "say") {
        if (sparkNounEl) sparkNounEl.hidden = true;
        speakSparkText();
      }
      if (key === "noun") {
        setupSparkNoun();
      }
      addPoint();
    });
  });
}

let sparkTarget = "";
let sparkWords = [];

function setupSparkNoun() {
  if (!sparkNounEl || !sparkLettersEl || !sparkProgressEl) return;
  const noun = (sparkTextEl?.dataset.noun || "").toLowerCase();
  const sentence = sparkTextEl ? sparkTextEl.textContent.replace(/["']/g, "") : "";
  if (!noun || !sentence) return;
  sparkTarget = noun;
  sparkWords = sentence
    .toLowerCase()
    .replace(/[^\w\s'-]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  sparkProgressEl.textContent = "Velg substantivet i setningen.";
  sparkLettersEl.innerHTML = "";
  sparkNounEl.hidden = false;

  const choices = shuffle([...new Set(sparkWords)]);
  choices.forEach((word) => {
    const btn = document.createElement("button");
    btn.textContent = word;
    btn.addEventListener("click", () => handleSparkWord(word, btn));
    sparkLettersEl.appendChild(btn);
  });
}

function handleSparkWord(word, button) {
  if (word === sparkTarget) {
    sparkFeedbackEl.textContent = "That was correct! Ett poeng lagt til.";
    addPoint();
    button.classList.add("active");
    speakSparkFeedback("That was correct!");
  } else {
    sparkFeedbackEl.textContent = "Prøv igjen.";
  }
}

function speakSparkFeedback(text) {
  if (!("speechSynthesis" in window)) {
    return;
  }
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice =
    voices.find((voice) => voice.lang.startsWith("en-GB") && /female|woman|girl/i.test(voice.name)) ||
    voices.find((voice) => voice.lang.startsWith("en-GB") && /female|woman|girl/i.test(voice.voiceURI || "")) ||
    voices.find((voice) => voice.lang.startsWith("en-GB")) ||
    voices.find((voice) => voice.lang.startsWith("en"));

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.1;
  utterance.lang = "en-GB";
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  window.speechSynthesis.speak(utterance);
}

function speakSparkText() {
  if (!("speechSynthesis" in window)) {
    sparkFeedbackEl.textContent = "Tale støttes ikke på denne enheten.";
    return;
  }
  const text = sparkTextEl ? sparkTextEl.textContent.replace(/["']/g, "") : "";
  if (!text) return;

  const voices = window.speechSynthesis.getVoices();
  const preferredVoice =
    voices.find((voice) => voice.lang.startsWith("en-GB") && /female|woman|girl/i.test(voice.name)) ||
    voices.find((voice) => voice.lang.startsWith("en-GB") && /female|woman|girl/i.test(voice.voiceURI || "")) ||
    voices.find((voice) => voice.lang.startsWith("en-GB")) ||
    voices.find((voice) => voice.lang.startsWith("en"));

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.1;
  utterance.lang = "en-GB";
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  window.speechSynthesis.speak(utterance);
}

setupNavigation();
setupLetters();
setupBuilder();
setupMatch();
setupSentences();
renderStars();
setupSpark();

letterSpeakBtn.addEventListener("click", speakCurrentLetter);
builderHintBtn.addEventListener("click", () => {
  const isHidden = builderPhoto.hidden;
  builderPhoto.hidden = !isHidden;
  builderHintBtn.textContent = isHidden ? "Skjul bildehint" : "Vis bildehint";
});
builderNextBtn.addEventListener("click", nextBuilderWord);

themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  themeToggleBtn.textContent = isDark ? "Lys modus" : "Mørk modus";
});
