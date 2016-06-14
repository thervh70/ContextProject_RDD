/// <reference path="../Types/EventID.ts"/>
/**
 * Created by Mathias on 02-06-2016.
 * This interface enforces the data elements of the ElementEventBindings.
 * @field addDOMEvent is an optional override of the default behaviour for adding this EEB to the DOM.
 * @field eventID is the corresponding ID given in the eventID class.
 * @field name is the descriptive string that belongs to the event.
 * @field removeDOMEvent is an optional override of the default behaviour for removing this EEB from the DOM.
 */
interface ElementEventBindingData {
    addDOMEvent?: (elementSelectionBehaviour?: ElementSelectionBehaviour) => void;
    eventID: EventID;
    name: string;
    removeDOMEvent?: (elementSelectionBehaviour?: ElementSelectionBehaviour) => void;
}

/**
 * elementEventBindingDataList contains all data about the different ElementEventBindings.
 * @type {{eventID: EventID, name: string}[]}
 */
// tslint:disable-next-line:no-unused-variable
const elementEventBindingDataList: ElementEventBindingData[] = [
    {
        eventID: EventID.CLICK,
        name: "click",
    },
    {
        eventID: EventID.KEYSTROKE,
        name: "keystroke",
    },
    {
        eventID: EventID.MOUSE_ENTER,
        name: "mouseenter",
    },
    {
        eventID: EventID.MOUSE_LEAVE,
        name: "mouseleave",
    },
    {
        addDOMEvent: (esb: ElementSelectionBehaviour) => {
            let windowWidth = $(window).width();
            let windowHeight = $(window).height();
            let wasInScope = false;
            let rect: ClientRect;
            let isBetween = (leftBound: number, rightBound: number, value: number) => {
                return leftBound <= value && rightBound >= value;
            };
            let isInScope = (width: number, height: number, rectangle: ClientRect) => {
                return (isBetween(0, windowHeight, rectangle.top) || isBetween(0, windowHeight, rectangle.bottom)) &&
                    (isBetween(0, windowWidth, rectangle.left) || isBetween(0, windowWidth, rectangle.right));
            };
            if (esb.getElements().length > 0) {
                rect = esb.getElements()[0].getBoundingClientRect();
                if (isInScope(windowWidth, windowHeight, rect)) {
                    wasInScope = true;
                    esb.getCallback(EventID.SCROLL_INTO_VIEW)($.Event("scroll:finish"));
                }
            }
            $(window).on(this.name, (eventObject) => {
                if (esb.getElements().length > 0) {
                    windowWidth = $(window).width();
                    windowHeight = $(window).height();
                    rect = esb.getElements()[0].getBoundingClientRect();
                    if (!wasInScope && isInScope(windowWidth, windowHeight, rect)) {
                        wasInScope = true;
                        esb.getCallback(EventID.SCROLL_INTO_VIEW)(eventObject);
                    } else if (wasInScope && !isInScope(windowWidth, windowHeight, rect)) {
                        wasInScope = false;
                        esb.getCallback(EventID.SCROLL_OUT_OF_VIEW)(eventObject);
                    }
                }
            });
        },
        eventID: EventID.SCROLL,
        name: "scroll:finish",
        removeDOMEvent: (esb: ElementSelectionBehaviour) => {
            esb.getElements().off(this.name);
        },
    },
];
