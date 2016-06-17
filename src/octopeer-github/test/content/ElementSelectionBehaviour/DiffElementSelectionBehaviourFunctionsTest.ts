/**
 * Created by Maarten on 17-06-2016.
 */

jasmine.getFixtures().fixturesPath = "base/src/octopeer-github/test/resources";

describe("The DiffElementSelectionBehaviourFunctions", function() {

    it("should return the right file name", function() {
        loadFixtures("files-changed-tab.html");
        expect(DiffElementSelectionBehaviourFunctions.getFilenameFromDiffLine($(".blob-num-addition"))).toEqual("addedFile.txt");
    });

    it("should return the right commit id", function() {
        const commitHashFromTestHTML = "39efa2e95a60e240861dc85028d90f93aef7eabc";
        loadFixtures("files-changed-tab.html");
        expect(DiffElementSelectionBehaviourFunctions.getCommitHashFromDiffLine($(".blob-num-addition")))
            .toEqual(commitHashFromTestHTML);
    });

});
