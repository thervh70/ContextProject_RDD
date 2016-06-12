/**
 * Created by Maarten on 12-06-2016.
 *
 * The DOMRewriter can be used to put octopeer tags everywhere.
 */
class DOMRewriter {

    /** The prefix that is used for all octopeer tags. */
    public static get PREFIX() { return "data-octopeer-"; }

    /**
     * Rewrites the node given as parameter and all of its children in the subtree by adding tags.
     * @param node The node to rewrite
     */
    public rewrite(node: JQuery) {
        const nodePosition = node.position();
        node.attr(`${DOMRewriter.PREFIX}x`, nodePosition.left);
        node.attr(`${DOMRewriter.PREFIX}y`, nodePosition.top);
        node.attr(`${DOMRewriter.PREFIX}width`, node.width());
        node.attr(`${DOMRewriter.PREFIX}height`, node.height());
        // TODO z-index
        node.children().each(function() {
            this.rewrite($(this));
        });
    }
}
