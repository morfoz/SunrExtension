chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.storage.local.get('injectionEnabled', (result) => {
            if (result.injectionEnabled) {
                const url = tab.url;

                if (url.includes("https://app-eu1.hubspot.com/") && url.includes("/26693160")) {
                    console.log("Injecting into Hubspot");
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        files: ['directory1/script.js']
                    });
                    chrome.scripting.insertCSS({
                        target: { tabId: tabId },
                        files: ['directory1/style.css']
                    });
                } 
                else if (url.includes("https://app-eu1.hubspot.com/") && url.includes("/25748774")) {
                    console.log("Injecting into Example");
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        files: ['directory2/script.js']
                    });
                    chrome.scripting.insertCSS({
                        target: { tabId: tabId },
                        files: ['directory2/style.css']
                    });
                } 
                else if (url.includes("https://test.com")) {
                    console.log("Injecting into Test");
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
    }
});
