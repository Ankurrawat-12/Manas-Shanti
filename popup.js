import { CurrentTab } from "./utils.js";

const allowedSites = [];

const popup = ":)";
console.log("🚀 ~ popup:", popup);

let shantiMode = false;
console.log("🚀 ~ shantiMode:", shantiMode)

document.getElementById('cb3-8').checked = false;
document.getElementById('cb3-8').addEventListener('change', toggleShantiMode);



function toggleShantiMode() {
    shantiMode = document.getElementById('cb3-8').checked;
    console.log("🚀 ~ shantiMode:", shantiMode)

}


const WebSite = (container, hostname) => {
    const hostTitle = document.createElement("div");
    const control = document.createElement("div");
    const websiteElement = document.createElement("div");

    hostTitle.textContent = hostname;
    control.className = "control";

    if (allowedSites.includes(hostname)) {
        hostTitle.className = "allowed " + "sites";
        setWebsitesAttributes("remove", removeSite, control);

    }
    else{
        hostTitle.className = "disallowed " + "sites";
        setWebsitesAttributes("add", addSite, control);
    }

    websiteElement.id = "host-"+hostname;
    websiteElement.className = "website";
    websiteElement.setAttribute("data-hostname", hostname);

    websiteElement.appendChild(hostTitle);
    websiteElement.appendChild(control);
    container.appendChild(websiteElement);
};

const setWebsitesAttributes = (action, eventListener, control) => {
    const controlElement = document.createElement("img");;
    controlElement.src = chrome.runtime.getURL("images" + action + ".png");
    controlElement.title = action;
    controlElement.addEventListener("click", eventListener);
    control.appendChild(controlElement);
};


const addSite = async()=> {
    const site = e.target.parentNode.parentNode.getAttribute("data-hostname");

};

const removeSite = (container, hostname) => {

};

document.addEventListener("DOMContentLoaded", async () => {
    const activeTabInfo = await CurrentTab();
    console.log("🚀 ~ DOMContentLoaded ~ activeTabInfo:", activeTabInfo);
    printActiveTabInfo();
    const container = document.getElementById("container");
    chrome.storage.sync.get(["Allowed Sites"], (data) => {
        allowedSites = data["Allowed Sites"];
    });

    if (shantiMode) {
        if (!allowedSites.includes(activeTabInfo.hostname)) {
            // ! Redirect to the main page;
        } else {
            for (let i = 0; i < allowedSites.length; i++) {
                addSite(container, allowedSites[i]);
            }
        }
    } else {
        if (allowedSites.includes(activeTabInfo.hostname)) {
            for (let i = 0; i < allowedSites.length; i++) {
                addSite(container, allowedSites[i]);
            }
        } else {
            for (let i = 0; i < allowedSites.length; i++) {
                addSite(container, allowedSites[i]);
            }
            addSite(container, activeTabInfo.hostname);
        }
    }
});