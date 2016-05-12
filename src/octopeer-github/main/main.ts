const inExtension = chrome.tabs ? true : false;

if (inExtension) {
    const controller = new Controller();
    controller.start();
} else {
    let hookedToDOM = false;
    if (!chrome.runtime.onMessage.hasListeners()) {
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            "use strict";
            if (request.hookToDom && !hookedToDOM) {
                hookedToDOM = true;
                new Controller().hookToDOM({
                    post: function (data: EventObject, success: Callback, failure: Callback) {
                        chrome.runtime.sendMessage(data);
                        success();
                    },
                });
                sendResponse(`hooked to DOM (${location.href})`);
            } else {
                sendResponse(`did noting (${location.href})`);
            }
        });
    }
}
