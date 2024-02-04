chrome.tabs.onUpdated.addListener((tabId, tab) => {
  const hostName = tab.url.split(".com")[0];
  const queryParameter = new URLSearchParams(tab.url.split(".com"));

  chrome.tabs.sendMessage(tabId, {
    type:"NEW",
    hostname: hostName,
    queryParameter: queryParameter
  })
})