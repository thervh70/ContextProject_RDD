/**
 * Created by Mathias on 2016-05-11.
 */
abstract class ButtonElementSelectionBehaviour implements ElementSelectionBehaviour {

    public elementDsc: string;
    public elementID: ElementID;

    public constructor(private database: DatabaseAdaptable) {}

    public getElementId() {
        return this.elementID;
    }

    public getElements() {
        return $(this.elementDsc);
    }

    public getCallback(eventID: EventID) {
        const self = this;
        return (function(eventObject: JQueryEventObject) {
            // TODO: check when the new Date is triggered.
            self.database.log(self.getElementId(), eventID, new Date(), 0,
                EMPTY_CALLBACK, EMPTY_CALLBACK);
        });
    }
}
