/**
 * Created by Maarten on 25-05-2016.
 *
 * Performs a series of POST requests in order to fill the constant part of the Database.
 */

function constantDatabasePoster() {
    const url = "http://10.0.22.6/";

    const createPost = function(data: any) {
        return {
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            dataType: "json",
            type: "POST",
        };
    };

    const events = [
        [101, "keystroke"],
        [201, "click"],
        [202, "mouseenter"],
        [203, "mouseleave"],
        [301, "scroll into view"],
        [302, "scroll out of view"],
        [401, "start watching pull request"],
        [402, "stop watching pull request"],
    ];

    let event: Array<number | string>;
    for (event of events) {
        $.ajax(`${url}api/event-types/`, createPost({
            "id": event[0],
            "name": event[1],
        }));
    }

    const elements = [
        [101, "Merge Pull Request"],
        [102, "Close Pull Request"],
        [103, "Cancel inline comment"],
        [104, "Comment inline comment"],
        [105, "Create Inline Comment (+ -sign on GitHub)"],
        [106, "Edit pull request name"],
        [107, "Save pull request name"],
        [108, "Cancel edit pull request name"],
        [109, "Edit comment"],
        [110, "Add emoticon"],
        [111, "Show CI checks"],
        [112, "Show CI details"],
        [113, "Comment on PR"],
        [114, "Confirm Edit Comment"],
        [115, "Cancel Edit Comment"],
        [201, "Conversation"],
        [202, "Commits"],
        [203, "Files changed"],
        [301, "Commit hashcode"],
        [302, "Commit message"],
        [303, "Contributor name: PR creator"],
        [304, "Contributor name: PR participant"],
        [305, "Contributor name: Other contributor"],
        [401, "Labels"],
        [402, "Milestones"],
        [403, "Assignee"],
        [404, "Unsubscribe (from notifications) (maybe re-subscribe)"],
        [405, "Lock conversation (maybe unlock)"],
        [501, "Comment textfield"],
        [502, "Inline comment textfield"],
        [901, "Date"],
    ];

    let element: Array<number | string>;
    for (element of elements) {
        $.ajax(`${url}api/element-types/`, createPost({
            "id": element[0],
            "name": element[1],
        }));
    }
}
