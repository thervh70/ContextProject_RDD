/**
 * Created by Maarten on 12-06-2016.
 */

describe("The DOMRewriter", function() {

    let rootDiv: JQuery;
    let topDiv: JQuery;
    let paragraph: JQuery;
    let button: JQuery;

    beforeEach(function() {
        setFixtures("<div id='root'>" +
            "<div id='topdiv' style='position: relative;'><p id='par'>Random text</p><button id='but'>Random button</button></div>" +
            "</div>");
        rootDiv = $("#root");
        topDiv = $("#topdiv");
        paragraph = $("#par");
        button = $("#but");
    });

    it("should, when using defaults, rewrite all tags to contain data-octopeer-* tags", function() {
        new DOMRewriter().withDefaultRules().rewrite(topDiv);

        for (let suffix of ["x", "y", "width", "height"]) {
            const attrname = `data-octopeer-${suffix}`;
            expect(rootDiv.attr(attrname)).not.toBeDefined();
            expect(topDiv.attr(attrname)).toBeDefined();
            expect(paragraph.attr(attrname)).toBeDefined();
            expect(button.attr(attrname)).toBeDefined();
        }
    });

    it("should add no tag when the rule returns undefined", function() {
        new DOMRewriter().addRule("x", (node) => undefined).rewrite(topDiv);
        expect(topDiv.attr("data-octopeer-x")).not.toBeDefined();
    });

    it("should, when using defaults, add a tag when z-index is defined", function() {
        const z = 42;
        topDiv.zIndex(z);
        expect(topDiv.zIndex()).toEqual(42);
        new DOMRewriter().withDefaultRules().rewrite(rootDiv);
        expect(rootDiv.attr("data-octopeer-z")).not.toBeDefined();
        expect(topDiv.attr("data-octopeer-z")).toEqual("42");
        expect(paragraph.attr("data-octopeer-z")).toEqual("42");
        expect(button.attr("data-octopeer-z")).toEqual("42");
    });

});
