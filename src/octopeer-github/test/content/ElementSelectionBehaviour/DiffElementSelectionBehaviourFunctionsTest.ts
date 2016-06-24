/**
 * Created by Maarten on 17-06-2016.
 */

jasmine.getFixtures().fixturesPath = "base/src/octopeer-github/test/resources";

describe("The DiffElementSelectionBehaviourFunctions", function() {

    it("should return the right line number", function() {
        loadFixtures("files-changed-tab.html");
        expect(DiffElementSelectionBehaviourFunctions.getLineNumberFromDiffLine($(".blob-num-addition").first())).toEqual(1);
    });

    it("should return the right line number for context lines", function() {
        loadFixtures("files-changed-tab.html");
        expect(DiffElementSelectionBehaviourFunctions.getLineNumberFromDiffLine($(".blob-code-context").first())).toEqual(3);
    });

    it("should return the right file name", function() {
        loadFixtures("files-changed-tab.html");
        expect(DiffElementSelectionBehaviourFunctions.getFilenameFromDiffLine($(".blob-num-addition"))).toEqual("addedFile.txt");
    });

    it("should return the right commit id for added lines", function() {
        const commitHashFromTestHTML = "cb117a5dc4af36ac5017dfd74c7976e1c25d4900";
        loadFixtures("files-changed-tab.html");
        expect(DiffElementSelectionBehaviourFunctions.getCommitHashFromDiffLine($(".blob-num-addition")))
            .toEqual(commitHashFromTestHTML);
    });

    it("should return the right commit id for deleted lines", function() {
        const commitHashFromTestHTML = "9bc850b614c29bda886dd1cd8e8de3643ebbb91f";
        loadFixtures("files-changed-tab.html");
        expect(DiffElementSelectionBehaviourFunctions.getCommitHashFromDiffLine($(".blob-num-deletion")))
            .toEqual(commitHashFromTestHTML);
    });

});
