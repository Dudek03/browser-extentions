// Nasłuchujemy na natywne przejście YouTube na nowy URL
window.addEventListener("yt-navigate-finish", () => {
  if (location.pathname === "/watch") {
    triggerIntervention();
  } else {
    removeExistingOverlay();
  }
});

function triggerIntervention() {
  removeExistingOverlay();

  // 1. Pauzujemy odtwarzacz
  const video = document.querySelector("video");
  if (video) video.pause();

  // 2. Tworzymy modal
  const overlay = document.createElement("div");
  overlay.id = "yt-cop-overlay";
  overlay.innerHTML = `
    <div class="yt-cop-card">
      <h2>⚠️ Chwila prawdy ⚠️ </h2>
      <p>Studnia studnia studnia... Znowu próbujesz oglądać YT zamiast robić coś pożytecznego??? Zabierz sie do roboty cwaniaczku</p>
      
      <div class="yt-cop-actions">
        <button id="yt-cop-quit" class="btn btn-primary">Zmykam</button>
        <button id="yt-cop-proceed" class="btn btn-secondary">Muszę to obejrzeć</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("yt-cop-quit").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "CLOSE_TAB" });
  });

  document.getElementById("yt-cop-proceed").addEventListener("click", () => {
    removeExistingOverlay();
    //if (video) video.play();
  });
}

function removeExistingOverlay() {
  const existing = document.getElementById("yt-cop-overlay");
  if (existing) existing.remove();
}
