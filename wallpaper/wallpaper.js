chrome.contextMenus.create({
    id: "openImageInNewTab",
    title: "Otwórz jako tapete",
    contexts: ["image"] // Opcja dostępna tylko po kliknięciu na obrazy
});

chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === "openImageInNewTab" && info.srcUrl) {
        chrome.tabs.create({ url: info.srcUrl, active: true }, (tab) => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    document.querySelectorAll("img").forEach(e => { e.style.width = "100%"; e.style.height = "auto" })
                },
            });
        });
    }
});
