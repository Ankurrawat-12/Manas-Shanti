let background = ":)";
console.log("🚀 ~ background:", background);

let activeTabInfo = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        sendActiveTabInfo();
    }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    sendActiveTabInfo();
});

function sendActiveTabInfo() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs.length > 0) {
            activeTabInfo = {
                url: tabs[0].url,
                title: tabs[0].title,
                hostname: tabs[0].url.split("/")[2]
            };
            console.log("🚀 ~ chrome.tabs.query ~ activeTabInfo:", activeTabInfo)

            chrome.runtime.sendMessage({
                from: 'background',
                activeTabInfo: activeTabInfo,
            });
        }
    });
}