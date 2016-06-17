/// <reference path="Database/RESTApiDatabaseAdapter.ts"/>
/// <reference path="Database/ConsoleLogDatabaseAdapter.ts"/>

import Tab = chrome.tabs.Tab;
/**
 * The MainController hooks the event handlers to the DOM-tree.
 */
class MainController implements OptionsObserver {

    private database: DatabaseAdaptable;

    /** The current user (is logged to the database). */
    private user: string;

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
            if (Status.isStatus(StatusCode.RUNNING)) {
                this.postToDatabase(EventFactory.semantic(ElementID.NO_ELEMENT, EventID.STOP_WATCHING_PR));
            }
            Status.off();
        }
    }

    /**
     * Set up all event handlers in the Chrome API.
     */
    private connectToContentScript() {
        this.initUsername();
        this.updateUsername();
        this.initAllCurrentTabs();
        this.rehookOnUpdate();
        this.rehookOnFocusChange();
        this.listenToDatabaseMessages();
    }

    /**
     * On start-up, let all tabs hook to DOM.
     */
    private initAllCurrentTabs() {
        chrome.tabs.query({}, (tabs) => {
            for (let tab of tabs) {
                this.testAndSend(tab, false);
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
                self.testAndSend(tab, true);
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
     * Init the username in the local storage.
     * This is done to make the listener used in updateUsername to work properly the first time.
     */
    private initUsername() {
        chrome.storage.local.set({user: "Travis"});
    }

    /**
     * Connect a listener to the chrome local storage and update the user name when necessary.
     */
    private updateUsername() {
        let change = "user";
        chrome.storage.onChanged.addListener((changes, namespace) => {
            if (namespace === "local" && changes[change] !== undefined) {
                this.user = changes[change].newValue;
            }
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
            this.database = new RESTApiDatabaseAdapter("http://146.185.128.124", sender.tab.url, this.user);
            this.postToDatabase(this.readMessage(message));
            sendResponse({});
        });
    }

    /**
     * Transforms an EventObject message before posting it to the database.
     * Numberic elementIDs and eventIDs are replaced by their encapsuled counterparts (EventID and ElementID)
     * @param dataMessage The message to transform.
     * @returns {EventObject} The same message, but in the correct format.
     */
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

    /**
     * Posts a message to the current database. If it's a HTMLPageEvent message, truncate its content before logging it in debug mode.
     * @param message the message to be posted
     */
    private postToDatabase(message: EventObject) {
        const success = function() {
            if (message.type === "HTMLPageEvent") {
                Logger.debug(`Successfully logged HTML page to database: \n${(<HTMLPageEvent>message.data).dom.substring(0,1500)}...`);
            } else {
                Logger.debug(`Successfully logged to database: ${JSON.stringify(message)}`);
            }
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
     * @param tab           the Tab to check for
     * @param isActiveTab   if `tab` is not the active tab, this method will not update the Status.
     */
    private testAndSend(tab: Tab, isActiveTab = true) {
        if (tab === undefined || tab.url === undefined) {
            this.setNewStatus(false, isActiveTab);
            return;
        }

        let isPullRequest = URLHandler.isPullRequestUrl(tab.url);
        if (isPullRequest) {
            this.database = new RESTApiDatabaseAdapter("http://146.185.128.124", tab.url, this.user);
            this.sendMessageToContentScript(tab, Options.get(Options.LOGGING) && isPullRequest);
        }
        this.setNewStatus(isPullRequest, isActiveTab);
    }

    /**
     * Sets the status to STANDBY or RUNNING based on isPullRequest.
     * If isActiveTab or Options.LOGGING is false, nothing will happen.
     * If new status is not equal to the previous status, post a start-/stop-watching PR event to the database.
     * @param isPullRequest whether this method should behave like the handled tab is a PR.
     * @param isActiveTab   whether this method should behave like the handled tab is active.
     */
    private setNewStatus(isPullRequest: boolean, isActiveTab: boolean) {
        if (!isActiveTab || !Options.get(Options.LOGGING)) {
            return;
        }
        const eventID = isPullRequest ? EventID.START_WATCHING_PR : EventID.STOP_WATCHING_PR;
        const status =  isPullRequest ? StatusCode.RUNNING        : StatusCode.STANDBY;
        const wasItRunning = Status.isStatus(StatusCode.RUNNING);

        if (isPullRequest && !wasItRunning || !isPullRequest && wasItRunning) { // XOR does not exist in JS :(
            this.postToDatabase(EventFactory.semantic(ElementID.NO_ELEMENT, eventID));
            this.postToDatabase(EventFactory.tabChange(EventFactory.getTime()));
        }
        Status.set(status);
    }

    /**
     * Sends to a tab whether to hook or unhook to/from the DOM.
     * @param tab The tab to send this message to.
     * @param hookToDom true if the tab should hook to DOM, false if the tab should unhook from DOM.
     */
    private sendMessageToContentScript(tab: Tab, hookToDom: boolean) {
        chrome.tabs.sendMessage(tab.id, {
            hookToDom: hookToDom,
        }, function (result) {
            if (!result) {
                chrome.tabs.reload(tab.id);
            }
            let str = result || `will be refreshed because content script is not loaded (${tab.url})`;
            Logger.debug(`[Tab] ${str}`);
        });
    }

}
