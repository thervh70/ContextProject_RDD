/// <reference path="DatabaseAdaptable/DatabaseAdaptable.ts"/>
/// <reference path="DatabaseAdaptable/RESTApiDatabaseAdapter.ts"/>
/// <reference path="DatabaseAdaptable/ConsoleLogDatabaseAdapter.ts"/>
/// <reference path="ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonsElementSelectionBehaviour.ts"/>
/// <reference path="ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/ClickElementEventBinding.ts"/>

/**
 * The Controller hooks the event handlers to the DOM-tree.
 */
class Controller {

    private database: DatabaseAdaptable;

    /** List of ElementEventBindings that should be matched with ElementSelectors */
    private elementEventBindingList = [
        ClickElementEventBinding,
    ];

    /** List of ElementSelectors that should be matched with ElementEventBindings */
    private elementSelectionBindingList = [
        ButtonsElementSelectionBehaviour,
    ];

    /** Starts the Controller. After calling this, all event handlers are hooked to the DOM-tree. */
    public start() {
        this.database = new ConsoleLogDatabaseAdapter(); // ("https://localhost:8000", 1, 1);
        this.connectToContentScript();
        return this;
    }

    /** Hook the product of ElementBindings and ElementSelectors to the DOM-tree. */
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

    private connectToContentScript() {
        const self = this;
        // format:       http[s]//[...]github.com/<owner>/<repo>/pull/<pr-no>[/...]
        let urlFormat = /https?:\/\/.*github\.com\/(.+)\/(.+)\/pull\/([^\/]+)\/?.*/;
        // Whenever a tab updates, send a message to re-hook to DOM
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            if (changeInfo.url && urlFormat.test(changeInfo.url)) {
                let urlInfo = urlFormat.exec(changeInfo.url);
                console.log(`Owner: ${urlInfo[1]}, Repo: ${urlInfo[2]}, PR-number: ${urlInfo[3]}`);
                console.log("Tab:", tabId, tab, "ChangeInfo: ", changeInfo);
                chrome.tabs.sendMessage(tabId, {
                    hookToDom: true,
                }, function(result) {
                    console.log(result);
                });
            }
        });
        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
            self.database.post(message, function() {
                console.log("Successfully logged to database: ", message);
            }, function() {
                console.log("[WARN] Log to database of following object failed: ", message);
                console.log("[WARN] Original sender: ", sender);
            });
            sendResponse({});
        });
    }

}
