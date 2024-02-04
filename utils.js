export async function Hostname() {

    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

    let tabHostname = tabs[0].url.split("/")[2];
    console.log("🚀 ~ CurrentTab ~ tabHostname:", tabHostname);
    console.log("🚀 ~ CurrentTab ~ typeof(tabHostname):", typeof(tabHostname))

    return tabHostname; 
}


export function Default(){
    chrome.storage.sync.set({
        ["shanti Mode"]: false,
        ["Domains"]: ["anshupathak-88825.github.io"]
    });
}