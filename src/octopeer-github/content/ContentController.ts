/// <reference path="../main/Options/DoNotWatchOptions.ts"/>
/// <reference path="../main/Database/ConsoleLogDatabaseAdapter.ts"/>
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

    private oldElementEventBindings: ElementEventBinding[] = [];

    private oldEventTrackers: EventTracker[] = [];

    /**
     * Starts the ContentController. After calling this, all event handlers are hooked to the DOM-tree.
     * @return this
     */
    public start() {
        Options.init();
        if (!chrome.runtime.onMessage.hasListeners()) {
            chrome.runtime.onMessage.addListener(this.processMessageFromBackgroundPage());
        }
        return this;
    }

    /**
     * Set up all event handlers in the Chrome API.
     */
    private processMessageFromBackgroundPage() {
        const self = this;
        return function (request: any, sender: any, sendResponse: Function) {
            if (request.hookToDom === undefined) {
                sendResponse(`did nothing (${location.href})`);
                return;
            }
            try {
                if (request.hookToDom) {
                    self.hookToDOM(self.messageSendDatabaseAdapter);
                    $("body").click(function () {
                        self.hookToDOM(self.messageSendDatabaseAdapter);
                    });
                    sendResponse(`hooked to DOM (${location.href})`);
                } else {
                    self.unhookFromDom();
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
     * Hook both the semantic and syntactic elements and events to the DOM.
     * @param database   the database that should be used when logging.
     */
    private hookToDOM(database: DatabaseAdaptable) {
        this.unhookFromDom();
        this.hookSemanticToDOM(database);
        this.hookTrackersToDOM(database);
    }

    private unhookFromDom() {
        this.unhookSemanticFromDOM();
        this.unhookTrackersFromDOM();
    }

    private unhookSemanticFromDOM() {
        for (let elementEventBinding of this.oldElementEventBindings) {
            elementEventBinding.removeDOMEvent();
        }
        this.oldElementEventBindings = [];
    }

    private unhookTrackersFromDOM() {
        for (let eventTracker of this.oldEventTrackers) {
            eventTracker.removeDOMEvent();
        }
        this.oldEventTrackers = [];
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
                    this.oldElementEventBindings.push(elementEventBinding);
                }
            }
        }
    }

    /**
     * Hook the different rawdata trackers to DOM.
     * @param database   the database that should be used when logging.
     */
    private hookTrackersToDOM(database: DatabaseAdaptable) {
        const list: EventTracker[] = [
            new WindowResolutionTracker(database),
            new KeystrokeTracker(database),
            new MouseClickTracker(database),
            new MouseScrollTracker(database),
            new MousePositionTracker(database),
        ];
        for (let tracker of list) {
            tracker.addDOMEvent();
            this.oldEventTrackers.push(tracker);
        }
    }
}
