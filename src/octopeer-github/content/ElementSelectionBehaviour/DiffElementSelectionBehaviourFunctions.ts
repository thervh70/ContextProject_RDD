/**
 * Created by Maarten on 17-06-2016.
 *
 * Provide additional functions to help the processing of events on the diff.
 * Is a utility class, so should be final but TypeScript doesn't support that.
 */
abstract class DiffElementSelectionBehaviourFunctions {

    public static getFilenameFromDiffLine(line: JQuery) {
        return line.parent().parent().parent().parent().parent()
            .children(".file-header").attr("data-path");
    }

    public static getCommitHashFromDiffLine(line: JQuery) {
        if (line.hasClass("blob-num-addition")) {
            return $("input[name=commit_id]").val();
        } else {
            return $("input[name=comparison_base_oid]").val();
        }
    }

}
