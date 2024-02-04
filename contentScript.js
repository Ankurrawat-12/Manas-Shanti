() => {
    let allowedWebSites = [];
    let shaktiMode = document.getElementsById("shaktiMode").value;
    const website = "ankurrawat.me";

    const fetchAllowedWebsites = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get(["allowedWebSites"], (result) => {
                resolve(result.allowedWebSites);
            });
        });
    };

    fetchAllowedWebsites()
        .then((result) => {
            allowedWebSites = result;
        })
        .catch((error) => {
            console.log(error);
        });

    chrome.runtime.onMessage.addListener((req, sender, res) => {
        const {type, hostname, port} = req;
        if(type === "NEW"){
            if(shaktiMode === "on"){
                if(!allowedWebSites.includes(hostname)){
                    chrome.tabs.update({
                        url: `http://${website}`
                    })
                }
                else{

                }
            }
            else{
                if(!allowedWebSites.includes(hostname)){
                    const addToAllowedSites = document.createElement("img");
                    addToAllowedSites.src = chrome.runtime.getURL("images/add.png");
                }
                else{
                    
                }
            }
            
        }
    })
};
