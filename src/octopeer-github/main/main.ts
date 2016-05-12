const inExtension = chrome.tabs ? true : false;

if (inExtension) {
    const controller = new Controller();
    controller.start();
} else {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        "use strict";
        console.log(request, sender);
        if (request.hookToDom) {
            new Controller().hookToDOM({
                post: function(data: EventObject, success: Callback, failure: Callback) {
                    chrome.runtime.sendMessage(data);
                    success();
                },
            });
            sendResponse(`Tab hooked to DOM (${location.href})`);
        } else {
            sendResponse(`Tab did noting (${location.href})`);
        }
    });
}
