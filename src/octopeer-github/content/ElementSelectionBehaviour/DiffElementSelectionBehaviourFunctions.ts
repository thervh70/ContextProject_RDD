/**
 * Created by Maarten on 17-06-2016.
 *
 * Provide additional functions to help the processing of events on the diff.
 * Is a utility class, so should be final but TypeScript doesn't support that.
 */
abstract class DiffElementSelectionBehaviourFunctions {

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
        if (line.hasClass("blob-code-addition") || line.hasClass("blob-num-addition")) {
            return $("input[name=commit_id]").val();
        } else {
            return $("input[name=comparison_base_oid]").val();
        }
    }

}
