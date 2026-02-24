// Pierwsza opcja podrzędna
chrome.contextMenus.create({
    id: "mainOption",
    title: "rotate photo",
    contexts: ["all"] // Widoczna w każdym kontekście
})

chrome.contextMenus.create({
    id: "rotateLeft",
    title: "rotate to left",
    parentId: "mainOption", // Powiązanie z główną opcją
    contexts: ["all"]
})

// Druga opcja podrzędna
chrome.contextMenus.create({
    id: "rotateRight",
    title: "rotete to right",
    parentId: "mainOption", // Powiązanie z główną opcją
    contexts: ["all"]
})


chrome.contextMenus.create({
    id: "rotateUp",
    title: "reset",
    parentId: "mainOption", // Powiązanie z główną opcją
    contexts: ["all"]
})


chrome.contextMenus.create({
    id: "rotateDown",
    title: "turn Over",
    parentId: "mainOption", // Powiązanie z główną opcją
    contexts: ["all"]
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "rotateLeft" && info.srcUrl) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                document.querySelectorAll('img').forEach(i => { i.style.transform = 'rotate(-90deg)' })
            },
        })
    }
    else if (info.menuItemId === "rotateRight" && info.srcUrl) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                document.querySelectorAll('img').forEach(i => { i.style.transform = 'rotate(90deg)' })
            },
        })
    }

    else if (info.menuItemId === "rotateUp" && info.srcUrl) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                document.querySelectorAll('img').forEach(i => { i.style.transform = 'rotate(0deg)' })
            },
        })
    }
    else if (info.menuItemId === "rotateDown" && info.srcUrl) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                document.querySelectorAll('img').forEach(i => { i.style.transform = 'rotate(180deg)' })
            },
        })
    }
})
