/**
 * Created by Mathias on 2016-05-11.
 */
abstract class ClickingElementEventBinding implements ElementEventBinding {
    public eventType: string = "click";
    public eventID: EventID = new EventID(99);
}
