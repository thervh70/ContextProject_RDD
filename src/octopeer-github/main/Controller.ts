/// <reference path="DatabaseAdaptable/DatabaseAdaptable.ts"/>
/// <reference path="DatabaseAdaptable/RESTApiDatabaseAdapter.ts"/>
/// <reference path="DatabaseAdaptable/ConsoleLogDatabaseAdapter.ts"/>
/// <reference path="ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonsElementSelectionBehaviour.ts"/>
/// <reference path="ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/ClickElementEventBinding.ts"/>

import Tab = chrome.tabs.Tab;
/**
 * The Controller hooks the event handlers to the DOM-tree.
 */
class Controller {

    private database: DatabaseAdaptable;

    /**
     * List of ElementEventBindings that should be matched with ElementSelectors
     */
    private elementEventBindingList = [
        ClickElementEventBinding,
    ];

    /**
     * List of ElementSelectors that should be matched with ElementEventBindings
     */
    private elementSelectionBindingList = [
        ButtonsElementSelectionBehaviour,
    ];

    /**
     * Starts the Controller. After calling this, all event handlers are hooked to the DOM-tree.
     */
    public start() {
        this.database = new ConsoleLogDatabaseAdapter(); // ("https://localhost:8000", 1, 1);
        this.connectToContentScript();
        return this;
    }

    /**
     * Hook the product of ElementBindings and ElementSelectors to the DOM-tree.
     * @param database   the database that should be used when logging.
     */
    public hookToDOM(database = this.database) {
        let elementEventBinding: ElementEventBindingCreatable;
        let elementSelectionBinding: ElementSelectionBehaviourCreatable;
        let elementEventBindingHolder: ElementEventBinding;
        let elementSelectionBindingHolder: ElementSelectionBehaviour;

        for (elementSelectionBinding of this.elementSelectionBindingList) {
            elementSelectionBindingHolder = new elementSelectionBinding(database);

            for (elementEventBinding of this.elementEventBindingList) {
                elementEventBindingHolder = new elementEventBinding(elementSelectionBindingHolder);
            }
        }
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
        // When a tab sends a message, log it to the Database
        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
            self.database.post(message, function() {
                console.log("[Database] Successfully logged to database: ", message);
            }, function() {
                console.log("[WARN] Log to database of following object failed: ", message);
                console.log("[WARN] Original sender: ", sender);
            });
            sendResponse({});
        });
    }

    /**
     * Only sends a message to a tab if they contain the correct URL.
     * @param tab   the Tab to check for
     */
    private testAndSend(tab: Tab) {
        const url = tab.url;
        // format:         http[s]//[...]github.com/(owner)/(repo)/pull/(pr-no)[/...]
        const urlFormat = /https?:\/\/.*github\.com\/(.+)\/(.+)\/pull\/([^\/]+)\/?.*/;
        if (urlFormat.test(url)) {
            let urlInfo = urlFormat.exec(url);
            console.log(`[Tab] Owner: ${urlInfo[1]}, Repo: ${urlInfo[2]}, PR-number: ${urlInfo[3]}`);
            chrome.tabs.sendMessage(tab.id, {
                hookToDom: true,
            }, function(result) {
                let str = result || `should be refreshed because content script is not loaded (${tab.url})`;
                console.log(`[Tab] ${str}`);
            });
        }
    }

}
