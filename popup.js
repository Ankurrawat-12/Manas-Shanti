import { Hostname, Default } from "./utils.js";

const popup = ":)";
console.log("🚀 ~ popup:", popup);

const defaultSite = "anshupathak-88825.github.io";
let domains = [defaultSite];
let shantiMode = false;


// Default();
chrome.storage.sync.get("shanti Mode", (data) => {
    if (data["shanti Mode"]) shantiMode = data["shanti Mode"];
    else {
        chrome.storage.sync.get(null, (data) => {
            data["shanti Mode"] = shantiMode;

            chrome.storage.sync.set(data, () => {
                console.log("🚀 ~ shantiMode:", shantiMode);
            });
        });
    }
    console.log("🚀 ~ shantiMode:", shantiMode);
    document.getElementById("cb3-8").checked = shantiMode;
});

document.getElementById("cb3-8").addEventListener("change", toggleShantiMode);

function toggleShantiMode() {
    shantiMode = document.getElementById("cb3-8").checked;
    chrome.storage.sync.get(null, (data) => {
        data["shanti Mode"] = shantiMode;

        chrome.storage.sync.set(data, () => {
            console.log("🚀 ~ shantiMode:", shantiMode);
        });
    });
}

const WebSite = (container, hostname) => {
    console.log("🚀 ~ WebSite ~ hostname:", hostname);

    const hostTitle = document.createElement("div");
    const control = document.createElement("div");
    const websiteElement = document.createElement("div");

    hostTitle.textContent = hostname;
    control.className = "control";

    if (domains.includes(hostname)) {
        hostTitle.className = "allowed " + "sites";
        setWebsitesAttributes("remove", removeSite, control);
    } else {
        hostTitle.className = "disallowed " + "sites";
        setWebsitesAttributes("add", addSite, control);
    }

    websiteElement.id = "host-" + hostname;
    websiteElement.className = "website";
    websiteElement.setAttribute("data-hostname", hostname);

    websiteElement.appendChild(hostTitle);
    websiteElement.appendChild(control);
    container.appendChild(websiteElement);
    console.log("🚀 ~ WebSite ~ container:", container);
};


const setWebsitesAttributes = (action, eventListener, control) => {
    console.log("🚀 ~ setWebsitesAttributes ~ action:", action);
    const controlElement = document.createElement("img");
    controlElement.src = chrome.runtime.getURL("images/" + action + ".png");
    controlElement.style.width = "40px";
    controlElement.style.height = "40px";
    controlElement.title = action;
    controlElement.addEventListener("click", eventListener);
    control.appendChild(controlElement);
};


const addSite = async (e) => {
    const site = e.target.parentNode.parentNode.getAttribute("data-hostname");
    console.log("🚀 ~ addSite ~ site:", site);

    chrome.storage.sync.set({
        ["Domains"]: [...domains, site],
    });
    await processData();

    const websiteElement = document.getElementById("host-" + site);
    const image = websiteElement.querySelector("img");

    if (image) {
        image.removeEventListener("click", addSite);
        image.addEventListener("click", removeSite);
        image.src = chrome.runtime.getURL("images/remove.png");
        image.title = "Remove Site";
    }
};


const removeSite = async (e) => {
    const site = e.target.parentNode.parentNode.getAttribute("data-hostname");
    console.log("🚀 ~ removeSite ~ site:", site);

    const updatedDomains = domains.filter(domain => domain !== site);

    chrome.storage.sync.set({
        ["Domains"]: updatedDomains,
    });

    await processData();

    const websiteElement = document.getElementById("host-" + site);
    const image = websiteElement.querySelector("img");

    if (image) {
        image.removeEventListener("click", removeSite);
        image.addEventListener("click", addSite);
        image.src = chrome.runtime.getURL("images/add.png");
        image.title = "Add Site";
    }
};

async function getDomainsFromStorage() {
    return new Promise((resolve) => {
        chrome.storage.sync.get("Domains", (data) => {
            const domains = data["Domains"] || [];
            resolve(domains);
        });
    });
}

async function processData() {
    try {
        domains = await getDomainsFromStorage();
        console.log("Domains:", domains);
    } catch (error) {
        console.error("Error retrieving domains:", error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 ~ document.addEventListener ~ getting hostname.....");
    let hostname = await Hostname();
    console.log("🚀 ~ document.addEventListener ~ hostname:", hostname);

    const container = document.getElementById("hostnames");
    await processData();

    console.log("🚀 ~ document.addEventListener ~ domains:", domains);

    if (shantiMode) {
        console.log("🚀 ~ document.addEventListener shantiMode = true");
        if (!domains.includes(hostname)) {
            // ! Redirect to the main page;
            chrome.tabs.update({url: "https://anshupathak-88825.github.io/timer/"});
            console.log(
                "🚀 ~ document.addEventListener ~ Redirecting hostname:",
                hostname
            );
        } else {
            console.log(
                "🚀 ~ document.addEventListener shantiMode = true HostName Found: ",
                hostname
            );
            for (let i = 0; i < domains.length; i++) {
                WebSite(container, domains[i]);
            }
        }
    } else {
        console.log("🚀 ~ document.addEventListener ~ shantiMode:", shantiMode);
        if (domains.includes(hostname)) {
            console.log(
                "🚀 ~ document.addEventListener shantiMode = false HostName Found: ",
                hostname
            );
            for (let i = 0; i < domains.length; i++) {
                WebSite(container, domains[i]);
            }
        } else {
            console.log(
                "🚀 ~ document.addEventListener shantiMode = false HostName Not Found: ",
                hostname
            );
            for (let i = 0; i < domains.length; i++) {
                WebSite(container, domains[i]);
            }
            WebSite(container, hostname);
        }
    }
});
