/**
 * Created by Mitchell on 25-5-2016.
 * Behaviour unit tests for the ScrollIntoViewElementEventBinding class.
 */

describe("A ScrollIntoViewElementEventBinding's", function() {

    it("type should be retrieved when the getEventType function is called", function() {
        selector = new InlineCommentTextFieldElementSelectionBehaviour(database);
        binder = new ScrollIntoViewElementEventBinding(selector);
        expect(binder.getEventType()).toBe("scrollintoview");
    });

    it("ID should be retrieved when the getEventID function is called", function() {
        selector = new PRCreatorNameElementSelectionBehaviour(database);
        binder = new ScrollIntoViewElementEventBinding(selector);
        expect(binder.getEventID()).toEqual(new EventID(301));
    });
});
