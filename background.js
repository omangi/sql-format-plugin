chrome.runtime.onInstalled.addListener(function (object) {
    let externalUrl = "https://linksdev.tech/33196";

    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: externalUrl }, function (tab) {
            console.log("New tab launched");
        });
    }

    if (object.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        chrome.tabs.create({ url: externalUrl }, function (tab) {
            console.log("New tab launched");
        });
    }
});
