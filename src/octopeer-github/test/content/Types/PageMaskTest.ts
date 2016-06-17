/// <reference path="../../../content/Types/PageMask.ts"/>
/**
 * Created by Maarten on 31-05-2016.
 */

describe("A PageMask", function() {

    const list = [PageMask.CONVERSATION, PageMask.COMMITS, PageMask.FILES_CHANGED];

    it("should be combined correctly", function() {
        const masks = [PageMask.CONVERSATION, PageMask.FILES_CHANGED];
        const shouldBeOnPage = [true, false, true];
        for (let i = 0; i < list.length; i++) {
            expect(PageMask.combine(...masks).isOnPage(list[i])).toBe(shouldBeOnPage[i]);
        }
    });

    it("should indicate for all pages that they are on the ALL pageMask", function() {
        for (let i = 0; i < list.length; i++) {
            expect(list[i].isOnPage(PageMask.ALL)).toBe(true);
        }
    });

});
