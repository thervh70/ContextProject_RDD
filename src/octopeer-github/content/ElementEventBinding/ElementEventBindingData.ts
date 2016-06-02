/**
 * Created by Mathias on 02-06-2016.
 * This interface enforces the data elements of the ElementEventBindings.
 * eventID is the corresponding ID given in the eventID class.
 * name is the descriptive string that belongs to the event.
 */
interface ElementEventBindingData {
    eventID: EventID;
    hookToDOM?: (elementSelectionBehaviour: GenericElementSelectionBehaviour) => void;
    name: string;
}

/**
 * elementEventBindingData contains all data about the different ElementEventBindings.
 * @type {{eventID: EventID, name: string}[]}
 */
// tslint:disable-next-line:no-unused-variable
const elementEventBindingData = [
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
        name: "mouse enter",
    },
    {
        eventID: EventID.MOUSE_LEAVE,
        name: "mouse leave",
    },
    {
        eventID: EventID.SCROLL_INTO_VIEW,
        name: "scroll into view",
    },
    {
        eventID: EventID.SCROLL_OUT_OF_VIEW,
        name: "scroll out of view",
    },
];
