chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        const url = tab.url;

        if (/^https:\/\/app-eu1\.hubspot\.com/.test(url)) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['directory1/script.js']
            });
            chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: ['directory1/style.css']
            });
        } 
        else if (/^https:\/\/example\.com/.test(url)) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['directory2/script.js']
            });
            chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: ['directory2/style.css']
            });
        } 
        else if (/^https:\/\/test\.com/.test(url)) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['directory3/script.js']
            });
            chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: ['directory3/style.css']
            });
        }
    }
});
