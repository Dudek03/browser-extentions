chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "quick-read",
    title: "Quick Read",
    contexts: ["selection"] // pokaż tylko, gdy jest zaznaczony tekst
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "quick-read") {
    const selectedText = info.selectionText;
    const encodedText = encodeURIComponent(selectedText);
    chrome.tabs.create({
      url: chrome.runtime.getURL(`reader.html?text=${encodedText}`)
    });
  }
});
