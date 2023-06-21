chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
        {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {urlMatches: '^https://app-eu1\\.hubspot\\.com/.*'}, // replace with the URL regex you want
                })
            ],
            actions: [new chrome.declarativeContent.RequestContentScript({js: ['directory1/script.js'], css: ['directory1/style.css']})]
        },
        {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {urlMatches: 'URL_REGEX_2'}, // replace with the URL regex you want
                })
            ],
            actions: [new chrome.declarativeContent.RequestContentScript({js: ['directory2/script.js'], css: ['directory2/style.css']})]
        },
        {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {urlMatches: 'URL_REGEX_3'}, // replace with the URL regex you want
                })
            ],
            actions: [new chrome.declarativeContent.RequestContentScript({js: ['directory3/script.js'], css: ['directory3/style.css']})]
        },
    ]);
});
