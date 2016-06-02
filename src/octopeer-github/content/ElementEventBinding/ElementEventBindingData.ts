/// <reference path="../Types/EventID.ts"/>
/**
 * Created by Mathias on 02-06-2016.
 * This interface enforces the data elements of the ElementEventBindings.
 * eventID is the corresponding ID given in the eventID class.
 * hookToDOM is an optional override of the default callback function.
 * name is the descriptive string that belongs to the event.
 */
interface ElementEventBindingData {
    eventID: EventID;
    hookToDOM?: (elementSelectionBehaviour: GenericElementSelectionBehaviour) => void;
    name: string;
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
        eventID: EventID.SCROLL_INTO_VIEW,
        name: "scrollintoview",
    },
    {
        eventID: EventID.SCROLL_OUT_OF_VIEW,
        name: "scrolloutofview",
    },
];
