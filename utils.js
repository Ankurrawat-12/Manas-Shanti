export async function CurrentTab() {
    let activeTabInfo = {};
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs.length > 0) {
            activeTabInfo = {
                url: tabs[0].url,
                title: tabs[0].title,
                hostname: tabs[0].url.split("/")[2],
            };
            console.log(
                "🚀 ~ chrome.tabs.query ~ activeTabInfo:",
                activeTabInfo
            );
        }
    });
    return activeTabInfo;
}