/// <reference path="../main/Options/DoNotWatchOptions.ts"/>
/// <reference path="../main/Database/ConsoleLogDatabaseAdapter.ts"/>
/// <reference path="ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/ClickElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/KeystrokeElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/MouseEnterElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/MouseLeaveElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/ScrollIntoViewElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/ScrollOutOfViewElementEventBinding.ts"/>
/// <reference path="ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>

/**
 * The ContentController hooks the event handlers to the DOM-tree.
 */
class ContentController {

    /**
     * List of ElementEventBindings that should be matched with ElementSelectors
     */
    private elementEventBindingList = [
        ClickElementEventBinding,
        KeystrokeElementEventBinding,
        MouseEnterElementEventBinding,
        MouseLeaveElementEventBinding,
        ScrollIntoViewElementEventBinding,
        ScrollOutOfViewElementEventBinding,
    ];

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
        Options.update();
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
        let elementEventBinding: ElementEventBindingCreatable;
        let elementSelectionBinding: ElementSelectionBehaviourData;
        let elementEventBindingHolder: ElementEventBinding;
        let elementSelectionBindingHolder: ElementSelectionBehaviour;
        let windowResolutionTracker: WindowResolutionTracker;
        let keystrokeTracker: KeystrokeTracker;
        let mouseClickTracker: MouseClickTracker;
        let mouseScrollTracker: MouseScrollTracker;
        let mousePositionTracker: MousePositionTracker;

        for (elementSelectionBinding of unsortedElementSelectionBehaviourData) {
            // TODO if (!DoNotWatchOptions.shouldElementBeWatched(elementSelectionBinding)) {
            if (DoNotWatchOptions.getElements().map(function (data) { return data.elementID.getElementID(); })
                    .indexOf(elementSelectionBinding.elementID.getElementID()) >= 0) {
                continue;
            }

            elementSelectionBindingHolder = new GenericElementSelectionBehaviour(database, elementSelectionBinding);

            for (elementEventBinding of this.elementEventBindingList) {
                if (DoNotWatchOptions.shouldEventBeWatched(elementEventBinding) &&
                    DoNotWatchOptions.shouldCombinationBeWatched({
                        element: elementSelectionBinding,
                        event: elementEventBinding,
                    })
                ) {
                    elementEventBindingHolder = new elementEventBinding(elementSelectionBindingHolder);
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
