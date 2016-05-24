/// <reference path="DatabaseAdaptable/DatabaseAdaptable.ts"/>
/// <reference path="DatabaseAdaptable/RESTApiDatabaseAdapter.ts"/>
/// <reference path="DatabaseAdaptable/ConsoleLogDatabaseAdapter.ts"/>

import Tab = chrome.tabs.Tab;
/**
 * The MainController hooks the event handlers to the DOM-tree.
 */
class MainController {

    private database: DatabaseAdaptable;

    /**
     * Starts the MainController. After calling this, all event handlers are hooked to the DOM-tree.
     * @return this
     */
    public start() {
        this.database = new ConsoleLogDatabaseAdapter(); // ("https://localhost:8000", 1, 1);
        this.connectToContentScript();
        Status.standby();
        Options.init();
        Options.update();
        Options.addObserver(Status);
        return this;
    }

    /**
     * Set up all event handlers in the Chrome API.
     */
    private connectToContentScript() {
        const self = this;
        // On start-up, let all tabs hook to DOM
        chrome.tabs.query({}, function(tabs) {
            let tab: Tab;
            for (tab of tabs) {
                self.testAndSend(tab);
            }
        });
        // Whenever a tab updates, send a message to re-hook to DOM
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            if (changeInfo.status && changeInfo.status === "complete") {
                self.testAndSend(tab);
            }
        });
        // Whenever the user changes tabs, send a message to re-hook to DOM
        chrome.tabs.onActivated.addListener( function(activeInfo) {
            chrome.tabs.query({"active": true, "windowId": activeInfo.windowId}, function (tabs: Tab[]) {
                // There is usually only one active tab, so no need to iterate
                self.testAndSend(tabs[0]);
            });
        });
        // When a tab sends a message, log it to the Database
        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
            if (!sender.tab) {
                return; // Only continue if message is sent from a content script
            }
            self.database.post(JSON.parse(message), function() {
                Logger.debug(`Successfully logged to database: ${message}`);
            }, function() {
                Logger.warn("Log to database of following object failed:");
                Logger.warn(message);
                Logger.warn(`Original sender: ${sender}`);
            });
            sendResponse({});
        });
    }

    /**
     * Only sends a message to a tab if it contains the correct URL.
     * I named it alike to a "test-and-set" operation that comes from concurrent programming.
     *     This (atomic) operation only sets a variable if a condition holds.
     * 'Correct' format:  http[s]//[...]github.com/(owner)/(repo)/pull/(pr-no)[/...]
     * @param tab   the Tab to check for
     */
    private testAndSend(tab: Tab) {
        const url = tab.url;
        const urlFormat = /https?:\/\/.*github\.com\/(.+)\/(.+)\/pull\/([^\/]+)\/?.*/;
        if (urlFormat.test(url)) {
            let urlInfo = urlFormat.exec(url);
            Status.running();
            Logger.debug(`[Tab] Owner: ${urlInfo[1]}, Repo: ${urlInfo[2]}, PR-number: ${urlInfo[3]}`);
            chrome.tabs.sendMessage(tab.id, {
                hookToDom: true,
            }, function(result) {
                let str = result || `should be refreshed because content script is not loaded (${tab.url})`;
                Logger.debug(`[Tab] ${str}`);
            });
        } else {
            Status.standby();
        }
    }

}
