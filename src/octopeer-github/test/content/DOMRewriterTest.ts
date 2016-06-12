/**
 * Created by Maarten on 12-06-2016.
 */

describe("The DOMRewriter", function() {

    let topDiv: JQuery;

    beforeEach(function() {
        setFixtures("<div id='root'><div id='topdiv'><p id='par'>Random text</p><button id='but'>Random button</button></div></div>");
        topDiv = $("#topdiv");
    });

    it("should, when using defaults, rewrite all tags to contain data-octopeer-* tags", function() {
        new DOMRewriter().withDefaultRules().rewrite(topDiv);

        for (let suffix of ["x", "y", "width", "height"]) {
            const attrname = `data-octopeer-${suffix}`;
            expect($("#root").attr(attrname)).not.toBeDefined();
            expect(topDiv.attr(attrname)).toBeDefined();
            expect($("#par").attr(attrname)).toBeDefined();
            expect($("#but").attr(attrname)).toBeDefined();
        }
    });

    it("should add no tag when the rule returns undefined", function() {
        new DOMRewriter().addRule("x", (node) => undefined).rewrite(topDiv);
        expect(topDiv.attr("data-octopeer-x")).not.toBeDefined();
    });

});
