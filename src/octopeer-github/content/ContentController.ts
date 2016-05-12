/// <reference path="../main/DatabaseAdaptable/DatabaseAdaptable.ts"/>
/// <reference path="../content/ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="../content/ElementSelectionBehaviour/ButtonsElementSelectionBehaviour.ts"/>
/// <reference path="../content/ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="../content/ElementEventBinding/ClickElementEventBinding.ts"/>

/**
 * The ContentController hooks the event handlers to the DOM-tree.
 */
class ContentController {

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
     * Starts the ContentController. After calling this, all event handlers are hooked to the DOM-tree.
     * @return this
     */
    public start() {
        this.connectToBackgroundPage();
        return this;
    }

    /**
     * Set up all event handlers in the Chrome API.
     */
    private connectToBackgroundPage() {
        const self = this;
        if (chrome.runtime.onMessage.hasListeners()) {
            return;
        }

        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            if (request.hookToDom) {
                self.hookToDOM({
                    post: function (data: EventObject, success: Callback, failure: Callback) {
                        let postData: any = data;
                        postData.elementID = (<ElementID>data.elementID).getElementID();
                        postData.eventID = (<EventID>data.eventID).getEventID();
                        chrome.runtime.sendMessage(JSON.stringify(postData));
                        success();
                    },
                });
                sendResponse(`hooked to DOM (${location.href})`);
            } else {
                sendResponse(`did nothing (${location.href})`);
            }
        });
    }

    /**
     * Hook the product of ElementBindings and ElementSelectors to the DOM-tree.
     * @param database   the database that should be used when logging.
     */
    private hookToDOM(database: DatabaseAdaptable) {
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

}
