///<reference path="../../../DefinitelyTyped/jasmine/jasmine.d.ts"/>
///<reference path="../../../DefinitelyTyped/jasmine-ajax/jasmine-ajax.d.ts"/>
///<reference path="../main/DatabaseAdapter.ts"/>

describe("A DatabaseAdapter", function() {
    it("correctly saves the url", function() {
        expect(new DatabaseAdapter("http://localhost:8000").url).toBe("http://localhost:8000/");
    });
    it("can post to the API", function() {
        var doneFn = jasmine.createSpy("success");

        spyOn($, "ajax").and.callFake(function () {
            var d = $.Deferred();
            d.resolve("response");
            return d.promise();
        });

        var adapter = new DatabaseAdapter("http://localhost:8000/");
        adapter.post(1,new Date(),100,doneFn);

        expect(doneFn).toHaveBeenCalledWith("response");
    });
});
