/**
 * Created by Maarten on 17-06-2016.
 *
 * Provide additional functions to help the processing of events on the diff.
 * Is a utility class, so should be final but TypeScript doesn't support that.
 */
abstract class DiffElementSelectionBehaviourFunctions {

    /**
     * Get the commit hash from the current revision.
     * Added lines will get the most recent commit hash.
     * Removed lines and Context lines will get the commit hash of the HEAD of the base branch.
     */
    public static getLineNumberFromDiffLine(line: JQuery) {
        if (line.hasClass("blob-code-context") || line.hasClass("blob-num-context")) {
            return parseInt(line.parent().find(".blob-num:nth-of-type(2)").attr("data-line-number"), 10);
        } else {
            return parseInt(line.parent().find(".blob-num:not(.empty-cell)").attr("data-line-number"), 10);
        }
    }

    /**
     * Get a filename from the overspanning container that contains the line.
     */
    public static getFilenameFromDiffLine(line: JQuery) {
        return line.parent().parent().parent().parent().parent()
            .children(".file-header").attr("data-path");
    }

    /**
     * Get the commit hash from the current revision.
     * Added lines will get the most recent commit hash.
     * Removed lines and Context lines will get the commit hash of the HEAD of the base branch.
     */
    public static getCommitHashFromDiffLine(line: JQuery) {
        if (line.hasClass("blob-code-deletion") || line.hasClass("blob-num-deletion")) {
            return $("input[name=comparison_base_oid]").val();
        } else {
            return $("input[name=commit_id]").val();
        }
    }

}
