document.addEventListener("DOMContentLoaded", () => {
  const SLIDER = document.getElementById("slider");
  const BUTTON = document.getElementById("btn");
  const PREVIEW = document.getElementById("preview");

  SLIDER.addEventListener("input", () => {
    PREVIEW.innerText = parseFloat(SLIDER.value).toFixed(2);
  });

  BUTTON.addEventListener("click", async () => {
    const userInput = parseFloat(SLIDER.value);

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab?.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (speed) => {
          document.querySelectorAll("video").forEach((v) => {
            v.playbackRate = speed;
          });
        },
        args: [userInput],
      });
    }
  });
});
