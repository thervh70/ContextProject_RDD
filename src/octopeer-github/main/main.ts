const inExtension = chrome.tabs ? true : false;

if (inExtension) {
    const controller = new Controller();
    controller.start();
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
