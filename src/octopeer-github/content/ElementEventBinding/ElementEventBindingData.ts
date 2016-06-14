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
            $(document).on("scroll", () => {
                console.log(esb.getElementID());
                if (esb.getElements().length > 0) {
                    console.log(esb.getElements()[0].getBoundingClientRect());
                }
            });
        },
        eventID: EventID.SCROLL_INTO_VIEW,
        name: "scroll",
        removeDOMEvent: (esb: ElementSelectionBehaviour) => {
            console.log("off");
        },
    },
    {
        eventID: EventID.SCROLL_OUT_OF_VIEW,
        name: "scroll",
    },
];
