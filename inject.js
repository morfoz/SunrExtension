chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.storage.local.get('injectionEnabled', (result) => {
            if (result.injectionEnabled) {
                const url = tab.url;
                console.log("Injection enabled");

                if (/^https:\/\/app-eu1\.hubspot\.com\/.*\/26693160.*/.test(url)) {
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
                else if (/^https:\/\/example\.com/.test(url)) {
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
                else if (/^https:\/\/test\.com/.test(url)) {
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
            } else {
                console.log("Injection disabled");
            }
        });
    }
});
