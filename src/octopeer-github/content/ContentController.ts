/// <reference path="../main/Options/DoNotWatchOptions.ts"/>
/// <reference path="../main/Database/ConsoleLogDatabaseAdapter.ts"/>
/// <reference path="../main/URLHandler.ts"/>
/// <reference path="ElementEventBinding/ElementEventBinding.ts"/>

/**
 * The ContentController hooks the event handlers to the DOM-tree.
 */
class ContentController {

    /**
     * A private DatabaseAdaptable that sends messages to the background page.
     * @type {MessageSendDatabaseAdapter}
     */
    private messageSendDatabaseAdapter = new MessageSendDatabaseAdapter();

    /**
     * A list used to store the old EEBs, in order to remove them later.
     * @type {Array}
     */
    private elementEventBindings: ElementEventBinding[] = [];

    /**
     * A list used to store the old EventTrackers, in order to remove them later.
     * @type {Array}
     */
    private eventTrackers: EventTracker[] = [];

    /**
     * This MutationObserver will observer the DOM for mutations in the tree.
     * On mutations, it will re-hook the ContentController to the DOM,
     *     so that dynamically generated elements will also be tracked.
     * The class MutationObserver is in the vanilla JavaScript libraries.
     * @type {MutationObserver}
     */
    private mutationObserver = new MutationObserver((mutationRecordList) => {
        this.unhookFromDOM();
        if (URLHandler.isPullRequestUrl(window.location.href)) {
            this.rewriteDOM();
            this.hookToDOM(this.messageSendDatabaseAdapter);
        }
    });

    /**
     * The DOMRewriter will add data-octopeer-* tags to all HTML elements.
     * @type {DOMRewriter}
     */
    private domRewriter = new DOMRewriter().withDefaultRules();

    /**
     * Starts the ContentController. After calling this, all event handlers are hooked to the DOM-tree.
     * @return this
     */
    public start() {
        Options.init();
        this.storeCurrentUser();
        if (!chrome.runtime.onMessage.hasListeners()) {
            chrome.runtime.onMessage.addListener(this.processMessageFromBackgroundPage());
        }
        return this;
    }

    /**
     * Get the current username from the DOM and save it to Chrome local storage.
     */
    private storeCurrentUser() {
        $(document).ready(() => {
            let userName = $("head meta[name=user-login]").attr("content");
            chrome.storage.local.set({user: userName});
        });
    }

    /**
     * Set up all event handlers in the Chrome API.
     */
    private processMessageFromBackgroundPage() {
        return (request: any, sender: any, sendResponse: Function) => {
            if (request.hookToDom === undefined) {
                sendResponse(`did nothing (${location.href})`);
                return;
            }
            try {
                if (request.hookToDom) {
                    this.hookToDOM(this.messageSendDatabaseAdapter);
                    sendResponse(`hooked to DOM (${location.href})`);
                } else {
                    this.unhookFromDOM();
                    sendResponse(`unhooked from DOM (${location.href})`);
                }
            } catch (e) {
                sendResponse(`has errored (${location.href})\n[ERR] ${e}`);
                console.error(e);
                return;
            }
        };
    }

    /**
     * Hook both the semantic and raw data trackers to the DOM.
     * Calls unhookFromDOM first to make sure no events will be logged multiple times.
     * @param database   the database that should be used when logging.
     */
    private hookToDOM(database: DatabaseAdaptable) {
        this.unhookFromDOM();
        this.hookSemanticToDOM(database);
        this.hookTrackersToDOM(database);

        if (Options.get("dataHTML")) {
            this.hookMutationObserverToDOM();
        }
    }

    /**
     * Unhook both semantic and raw data trackers from DOM.
     */
    private unhookFromDOM() {
        this.unhookMutationObserverFromDOM();
        this.unhookSemanticFromDOM();
        this.unhookTrackersFromDOM();
    }

    /**
     * Unhooks the semantic trackers from DOM, based on the EEBs previously saved in an array.
     */
    private unhookSemanticFromDOM() {
        for (let elementEventBinding of this.elementEventBindings) {
            elementEventBinding.removeDOMEvent();
        }
        this.elementEventBindings = [];
    }

    /**
     * Unhooks the raw data trackers from DOM, based on the EventTrackers previously saved in an array.
     */
    private unhookTrackersFromDOM() {
        for (let eventTracker of this.eventTrackers) {
            eventTracker.removeDOMEvent();
        }
        this.eventTrackers = [];
    }

    /**
     * Hook the product of ElementBindings and ElementSelectors to the DOM-tree.
     * @param database   the database that should be used when logging.
     */
    private hookSemanticToDOM(database: DatabaseAdaptable) {
        const esbFactory = new ElementSelectionBehaviourFactory();
        const eebFactory = new ElementEventBindingFactory();
        let elementEventBindingData: ElementEventBindingData;
        let elementSelectionBehaviourData: ElementSelectionBehaviourData;
        let elementEventBinding: ElementEventBinding;
        let elementSelectionBehaviour: ElementSelectionBehaviour;

        for (elementSelectionBehaviourData of elementSelectionBehaviourDataList) {
            if (!DoNotWatchOptions.shouldElementBeWatched(elementSelectionBehaviourData.elementID)) {
                continue;
            }

            elementSelectionBehaviour = esbFactory.create(database, elementSelectionBehaviourData.elementID);

            for (elementEventBindingData of elementEventBindingDataList) {
                if (DoNotWatchOptions.shouldEventBeWatched(elementEventBindingData.eventID) &&
                    DoNotWatchOptions.shouldCombinationBeWatched({
                        element: elementSelectionBehaviourData.elementID,
                        event: elementEventBindingData.eventID,
                    })
                ) {
                    elementEventBinding = eebFactory.create(elementSelectionBehaviour, elementEventBindingData.eventID);
                    elementEventBinding.addDOMEvent();
                    this.elementEventBindings.push(elementEventBinding);
                }
            }
        }
    }

    /**
     * Hook the different rawdata trackers to DOM.
     * @param database   the database that should be used when logging.
     */
    private hookTrackersToDOM(database: DatabaseAdaptable) {
        let list: EventTracker[];

        if (Options.get("mousePosition")) {
            list.push(new MousePositionTracker(database));
        }

        if (Options.get("mouseClick")) {
            list.push(new MouseClickTracker(database));
        }

        if (Options.get("mouseScrolling")) {
            list.push(new MouseScrollTracker(database));
        }

        if (Options.get("dataResolution")) {
            list.push(new WindowResolutionTracker(database));
        }

        if (Options.get("dataKeystrokes")) {
            list.push(new KeystrokeTracker(database));
        }
        
        for (let tracker of list) {
            tracker.addDOMEvent();
            this.eventTrackers.push(tracker);
        }
    }

    /**
     * Hooks the MutationObserver to the DOM tree.
     * If the DOM has never been rewritten yet (on fresh reload), immediately rewrite it.
     */
    private hookMutationObserverToDOM() {
        if ($("body").attr("data-octopeer-x") === undefined) {
            this.rewriteDOM();
        }
        this.mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    /**
     * Rewrites the DOM tree.
     */
    private rewriteDOM() {
        this.domRewriter.rewrite($("body"));
        this.messageSendDatabaseAdapter.post(EventFactory.htmlPage(document.documentElement.outerHTML), EMPTY_CALLBACK, EMPTY_CALLBACK);
    }

    /**
     * Unhooks the MutationObserver from the DOM tree.
     */
    private unhookMutationObserverFromDOM() {
        this.mutationObserver.disconnect();
    }
}
