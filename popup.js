import { Hostname } from "./utils.js";

let allowedSites = [];
let shantiMode = false;

const popup = ":)";
console.log("🚀 ~ popup:", popup);

chrome.storage.sync.get("shanti Mode", (data) => {
    if (data["shanti Mode"]) 
        shantiMode = data["shanti Mode"];
    else{
        chrome.storage.sync.get(null, (data) => {
            data["shanti Mode"] = shantiMode;
        
            chrome.storage.sync.set(data, () => {
                console.log("🚀 ~ shantiMode:", shantiMode);
            });
        });  
    }
    console.log("🚀 ~ shantiMode:", shantiMode)
});

document.getElementById('cb3-8').checked = shantiMode;
document.getElementById('cb3-8').addEventListener('change', toggleShantiMode);



function toggleShantiMode() {
    shantiMode = document.getElementById('cb3-8').checked;
    chrome.storage.sync.get(null, (data) => {
        data["shanti Mode"] = shantiMode;
    
        chrome.storage.sync.set(data, () => {
            console.log("🚀 ~ shantiMode:", shantiMode);
        });
    });    
}


const WebSite = (container, hostname) => {
    console.log("🚀 ~ WebSite ~ hostname:", hostname)

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
    console.log("🚀 ~ WebSite ~ container:", container);
};

const setWebsitesAttributes = (action, eventListener, control) => {
    console.log("🚀 ~ setWebsitesAttributes ~ action:", action);
    const controlElement = document.createElement("img");;
    controlElement.src = chrome.runtime.getURL("images" + action + ".png");
    controlElement.title = action;
    controlElement.addEventListener("click", eventListener);
    control.appendChild(controlElement);
};


const addSite = async(e)=> {
    const site = e.target.parentNode.parentNode.getAttribute("data-hostname");

};

const removeSite = (e) => {
    const site = e.target.parentNode.parentNode.getAttribute("data-hostname");
};

document.addEventListener("DOMContentLoaded", async () => {

    console.log("🚀 ~ document.addEventListener ~ getting hostname.....");
    let hostname = await Hostname();
    console.log("🚀 ~ document.addEventListener ~ hostname:", hostname);

    const container = document.getElementById("container");
    chrome.storage.sync.get(["Allowed Sites"], (data) => {
        allowedSites = data["Allowed Sites"];
    });

    if (shantiMode) {
        console.log("🚀 ~ document.addEventListener shantiMode = true");
        if (!allowedSites.includes(hostname)) {
            // ! Redirect to the main page;
            console.log("🚀 ~ document.addEventListener ~ Redirecting hostname:", hostname)
        } else {
            console.log("🚀 ~ document.addEventListener shantiMode = true HostName Not Found: ", hostname);
            for (let i = 0; i < allowedSites.length; i++) {
                WebSite(container, allowedSites[i]);
            }
        }
    } else {
        console.log("🚀 ~ document.addEventListener ~ shantiMode:", shantiMode);
        if (allowedSites.includes(hostname)) {
            console.log("🚀 ~ document.addEventListener shantiMode = false HostName Found: ", hostname);
            for (let i = 0; i < allowedSites.length; i++) {
                WebSite(container, allowedSites[i]);
            }
        } else {
            console.log("🚀 ~ document.addEventListener shantiMode = false HostName Not Found: ", hostname);
            for (let i = 0; i < allowedSites.length; i++) {
                WebSite(container, allowedSites[i]);
            }
            WebSite(container, hostname);
        }
    }
});