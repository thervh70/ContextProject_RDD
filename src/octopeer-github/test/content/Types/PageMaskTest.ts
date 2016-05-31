/**
 * Created by Maarten on 31-05-2016.
 */

describe("A PageMask", function() {

    it("should be combined correctly", function() {
        expect(PageMask.combine(PageMask.CONVERSATION, PageMask.FILES_CHANGED).isOnPage(PageMask.CONVERSATION)).toBeTruthy();
        expect(PageMask.combine(PageMask.CONVERSATION, PageMask.FILES_CHANGED).isOnPage(PageMask.FILES_CHANGED)).toBeTruthy();
        expect(PageMask.combine(PageMask.CONVERSATION, PageMask.FILES_CHANGED).isOnPage(PageMask.COMMITS)).toBeFalsy();
    });

});
