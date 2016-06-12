/**
 * Created by Maarten on 12-06-2016.
 */

describe("The DOMRewriter", function() {

    it("should rewrite all tags to contain data-octopeer-* tags", function() {
        setFixtures("<div id='root'><div id='topdiv'><p id='par'>Random text</p><button id='but'>Random button</button></div></div>");
        const topDiv = $("#topdiv");
        DOMRewriter.rewrite(topDiv);

        for (let suffix of ["x", "y", "width", "height"]) {
            const attrname = `data-octopeer-${suffix}`;
            expect($("#root").attr(attrname)).not.toBeDefined();
            expect(topDiv.attr(attrname)).toBeDefined();
            expect($("#par").attr(attrname)).toBeDefined();
            expect($("#but").attr(attrname)).toBeDefined();
        }
    });

});
