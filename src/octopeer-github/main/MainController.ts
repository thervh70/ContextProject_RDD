/// <reference path="Database/RESTApiDatabaseAdapter.ts"/>
/// <reference path="Database/ConsoleLogDatabaseAdapter.ts"/>

import Tab = chrome.tabs.Tab;
/**
 * The MainController hooks the event handlers to the DOM-tree.
 */
class MainController implements OptionsObserver {

    private database: DatabaseAdaptable;

    /**
     * Starts the MainController. After calling this, all event handlers are hooked to the DOM-tree.
     * @return this
     */
    public start() {
        Logger.setDebug(); // TODO remove this on release
        Options.init();
        Options.addObserver(this);
        Status.standby();
        this.connectToContentScript();
        return this;
    }

    /**
     * Listens for changes in Options.
     * If changed, the MainController has to verify that the page is a PR or not, if the extension is allowed to log.
     * Else the extension is set to off.
     */
    public notify() {
        const self = this;
        chrome.tabs.query({"active": true, "currentWindow": true}, function (tabs: Tab[]) {
            self.testAndSend(tabs[0]);
        });
        if (!Options.get(Options.LOGGING)) {
            Status.off();
        }
    }

    /**
     * Set up all event handlers in the Chrome API.
     */
    private connectToContentScript() {
        this.initAllCurrentTabs();
        this.rehookOnUpdate();
        this.rehookOnFocusChange();
        this.listenToDatabaseMessages();
    }

    /**
     * On start-up, let all tabs hook to DOM.
     */
    private initAllCurrentTabs() {
        const self = this;
        chrome.tabs.query({}, function(tabs) {
            let tab: Tab;
            for (tab of tabs) {
                self.testAndSend(tab);
            }
        });
    }

    /**
     * Whenever a tab updates, send a message to re-hook to DOM.
     */
    private rehookOnUpdate() {
        const self = this;
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            if (changeInfo.status && changeInfo.status === "complete") {
                self.testAndSend(tab);
            }
        });
    }

    /**
     * Whenever the user changes tabs, send a message to re-hook to DOM.
     * There is usually only one active tab, so no need to iterate in the callback.
     */
    private rehookOnFocusChange() {
        const self = this;
        chrome.tabs.onActivated.addListener(function(activeInfo) {
            chrome.tabs.query({"active": true, "windowId": activeInfo.windowId}, function (tabs: Tab[]) {
                self.testAndSend(tabs[0]);
            });
        });
    }

    /**
     * When a tab sends a message, log it to the Database.
     */
    private listenToDatabaseMessages() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (!sender.tab) {
                return; // Only continue if message is sent from a content script
            }
            // IP for testing locally: 10.0.22.6
            // TODO: get name from context
            this.database = new RESTApiDatabaseAdapter("http://146.185.128.124", sender.tab.url, "Travis");
            this.postToDatabase(this.readMessage(message));
            sendResponse({});
        });
    }

    private readMessage(dataMessage: any): EventObject {
        const eventObject = <EventObject>JSON.parse(dataMessage);
        if (eventObject.type === "SemanticEvent") {
            const semanticEvent = <any>eventObject.data;
            semanticEvent.elementID = new ElementID(semanticEvent.elementID);
            semanticEvent.eventID = new EventID(semanticEvent.eventID);
            eventObject.data = semanticEvent;
        }
        return eventObject;
    }

    private postToDatabase(message: EventObject) {
        if (!Options.get(Options.LOGGING)) {
            return;
        }
        const success = function() {
            Logger.debug(`Successfully logged to database: ${JSON.stringify(message)}`);
        };
        const failure = function() {
            Logger.warn("Log to database of following object failed:");
            Logger.warn(message);
        };
        this.database.post(message, success, failure);
    }

    /**
     * Only sends a message to a tab if its URL belongs to a Pull Request.
     * I named it alike to a "test-and-set" operation that comes from concurrent programming.
     *     This (atomic) operation only sets a variable if a condition holds.
     * @param tab   the Tab to check for
     */
    private testAndSend(tab: Tab) {
        if (tab === undefined || tab.url === undefined) {
            this.setNewStatus(StatusCode.STANDBY);
            return;
        }
        const url = tab.url;
        let urlInfo = URLHandler.isPullRequestUrl(url);

        if (urlInfo.equals([])) {
            // if URL is invalid, don't do anything.
            this.setNewStatus(StatusCode.STANDBY);
            return;
        } else {
            // if URL is valid, update database and set status to running
            this.database = new RESTApiDatabaseAdapter("http://146.185.128.124", tab.url, "Travis");
            this.setNewStatus(StatusCode.RUNNING);
        }
        this.sendMessageToContentScript(tab, urlInfo);
    }

    private setNewStatus(status: StatusCode) {
        let eventID: EventID;
        switch (status) {
            case StatusCode.RUNNING: eventID = EventID.START_WATCHING_PR; break;
            case StatusCode.STANDBY: eventID = EventID.STOP_WATCHING_PR; break;
            default: return;
        }
        if (!Status.isStatus(status)) {
            this.postToDatabase(EventFactory.semantic(ElementID.NO_ELEMENT, eventID));
        }
        Status.set(status);
    }

    private sendMessageToContentScript(tab: Tab, urlInfo: Array<string>) {
        if (!Status.isStatus(StatusCode.RUNNING)) {
            return;
        }
        Logger.debug(`[Tab] Owner: ${urlInfo[1]}, Repo: ${urlInfo[2]}, PR-number: ${urlInfo[3]}`);
        chrome.tabs.sendMessage(tab.id, {
            hookToDom: Options.get(Options.LOGGING),
        }, function (result) {
            if (!result) {
                chrome.tabs.reload(tab.id); //TODO is watching PR when tab is reloaded outside tab
            }
            let str = result || `will be refreshed because content script is not loaded (${tab.url})`;
            Logger.debug(`[Tab] ${str}`);
        });
    }

}
