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
            if (!request.hookToDom) {
                sendResponse(`did nothing (${location.href})`);
                return;
            }
            try {
                self.hookToDOM(self.messageSendDatabaseAdapter);
                $("body").click(function () {
                    self.hookToDOM(self.messageSendDatabaseAdapter);
                });
            } catch (e) {
                sendResponse(`has errored (${location.href})\n[ERR] ${e}`);
                console.error(e);
                return;
            }
            sendResponse(`hooked to DOM (${location.href})`);
        };
    }

    /**
     * Hook the product of ElementBindings and ElementSelectors to the DOM-tree.
     * @param database   the database that should be used when logging.
     */
    private hookToDOM(database: DatabaseAdaptable) {
        const esbFactory = new ElementSelectionBehaviourFactory();
        const eebFactory = new ElementEventBindingFactory();
        let elementEventBinding: ElementEventBindingData;
        let elementSelectionBinding: ElementSelectionBehaviourData;
        let elementEventBindingHolder: ElementEventBinding;
        let elementSelectionBindingHolder: ElementSelectionBehaviour;
        let windowResolutionTracker: WindowResolutionTracker;
        let keystrokeTracker: KeystrokeTracker;
        let mouseClickTracker: MouseClickTracker;
        let mouseScrollTracker: MouseScrollTracker;
        let mousePositionTracker: MousePositionTracker;

        for (elementSelectionBinding of elementSelectionBehaviourDataList) {
            if (!DoNotWatchOptions.shouldElementBeWatched(elementSelectionBinding.elementID)) {
                continue;
            }

            elementSelectionBindingHolder = esbFactory.create(database, elementSelectionBinding.elementID);

            for (elementEventBinding of elementEventBindingDataList) {
                if (DoNotWatchOptions.shouldEventBeWatched(elementEventBinding.eventID) &&
                    DoNotWatchOptions.shouldCombinationBeWatched({
                        element: elementSelectionBinding.elementID,
                        event: elementEventBinding.eventID,
                    })
                ) {
                    elementEventBindingHolder = eebFactory.create(elementSelectionBindingHolder, elementEventBinding.eventID);
                }
            }
        }
        windowResolutionTracker = new WindowResolutionTracker(database);
        keystrokeTracker = new KeystrokeTracker(database);
        mouseClickTracker = new MouseClickTracker(database);
        mouseScrollTracker = new MouseScrollTracker(database);
        mousePositionTracker = new MousePositionTracker(database);
    }

}
