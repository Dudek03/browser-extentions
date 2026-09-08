const wordDiv = document.getElementById("wordDiv");
const wpmDisplay = document.getElementById("wpmDisplay");
const progressDisplay = document.getElementById("progressDisplay");

const params = new URLSearchParams(window.location.search);
const rawText = params.get("text") || "";
const words = rawText
  .trim()
  .split(/\s+/)
  .filter((w) => w.length > 0);

let wordIndex = 0;
let isPaused = true;
let wpm = 300;
let timeoutId = null;

function updateStatus() {
  wpmDisplay.innerText = `${wpm} WPM`;
  progressDisplay.innerText = `${wordIndex} / ${words.length}`;
}

function renderWord(word) {
  if (!word) return "";

  let orpIndex = 0;
  if (word.length <= 1) orpIndex = 0;
  else if (word.length <= 5) orpIndex = 1;
  else if (word.length <= 9) orpIndex = 2;
  else orpIndex = 3;

  const left = word.slice(0, orpIndex);
  const mid = word[orpIndex];
  const right = word.slice(orpIndex + 1);

  return `${left}<span class="highlight">${mid}</span>${right}`;
}

// 4. Pętla RSVP
function tick() {
  if (isPaused) return;

  if (wordIndex >= words.length) {
    isPaused = true;
    wordDiv.innerHTML = '<span style="color:#22c55e">Koniec</span>';
    return;
  }

  const currentWord = words[wordIndex];
  wordDiv.innerHTML = renderWord(currentWord);
  wordIndex++;
  updateStatus();

  // Obliczenie opóźnienia w ms na słowo
  let delay = (60 / wpm) * 1000;

  // Mikro-pauza na kropkach i przecinkach dla naturalnego zrozumienia
  if (/[.,!?;:]$/.test(currentWord)) {
    delay *= 1.6;
  }

  timeoutId = setTimeout(tick, delay);
}

function togglePlay() {
  isPaused = !isPaused;
  if (!isPaused) {
    if (wordIndex >= words.length) wordIndex = 0;
    tick();
  } else {
    clearTimeout(timeoutId);
  }
}

// 5. Obsługa skrótów klawiszowych
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    togglePlay();
  } else if (e.code === "ArrowUp") {
    e.preventDefault();
    wpm = Math.min(wpm + 25, 1000);
    updateStatus();
  } else if (e.code === "ArrowDown") {
    e.preventDefault();
    wpm = Math.max(wpm - 25, 100);
    updateStatus();
  } else if (e.code === "ArrowLeft") {
    // Cofnij o 10 słów
    wordIndex = Math.max(0, wordIndex - 10);
    wordDiv.innerHTML = renderWord(words[wordIndex] || "Start");
    updateStatus();
  }
});

// Startowy render
updateStatus();
if (words.length === 0) {
  wordDiv.innerText = "Brak tekstu";
} else {
  wordDiv.innerHTML = renderWord(words[0]);
}
