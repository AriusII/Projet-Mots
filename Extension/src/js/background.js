// Update popup url method
function updatePopupURLForSelectedTab(selectedTab) {
    let tabs_url = chrome.runtime.getURL("/src/html/popup.html");

    // if the selectedTab.url match an url like : tusmo.xyz/*
    if(selectedTab.url.match(/tusmo\.xyz\/.*/)) {
        // we want to get the current tab url and add it to the popup url
        tabs_url = chrome.runtime.getURL("/src/html/tusmo.html");
    }

    // set the new popup url
    chrome.action.setPopup({
        popup: tabs_url,
        tabId: selectedTab.id
    });
};

// Get current selected Tab 
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    updatePopupURLForSelectedTab(tabs[0]);
});


// Listen for selected tab
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        updatePopupURLForSelectedTab(tab);
    });
});


// Listen navigation update
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        updatePopupURLForSelectedTab(tab);
    }
});

// Listen for window change
chrome.windows.onFocusChanged.addListener(function(windowId) {
    if (windowId == chrome.windows.WINDOW_ID_NONE) {
        // No window is focused, so no tabs are selected.
    } else {
        chrome.tabs.query({active: true, windowId: windowId}, function(tabs) {
            updatePopupURLForSelectedTab(tabs[0]);
        });
    }
});

// create a function to injectTab with scripting
function injectTab(tabsId) {
    chrome.scripting.executeScript({
        target: { tabId: tabsId },
        files: ["./src/js/inject/inject-tusmo.js"]
    });
}

// create a tab listener if the url match tusmo.xyz/* we want to inject the script
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        if(tab.url.match(/tusmo\.xyz\/.*/)) {
            injectTab(tabId)
            console.log("script injected")
        }
    }
});