const inExtension = chrome.tabs ? true : false;

// When this script is loaded in the background page, load the Controller.
if (inExtension) {
    const controller = new Controller();
    controller.start();
// When this script is loaded as content script, add a listener for messages from the background page
} else {
    if (!chrome.runtime.onMessage.hasListeners()) {
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            "use strict";
            if (request.hookToDom) {
                new Controller().hookToDOM({
                    post: function (data: EventObject, success: Callback, failure: Callback) {
                        chrome.runtime.sendMessage(data);
                        success();
                    },
                });
                sendResponse(`hooked to DOM (${location.href})`);
            } else {
                sendResponse(`did nothing (${location.href})`);
            }
        });
    }
}
