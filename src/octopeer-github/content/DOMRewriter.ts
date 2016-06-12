/**
 * Created by Maarten on 12-06-2016.
 *
 * The DOMRewriter can be used to put octopeer tags everywhere.
 */
class DOMRewriter {

    /** The prefix that is used for all octopeer tags. */
    public static get PREFIX() { return "data-octopeer-"; }

    private rules: any = {};

    /**
     * Rewrites the node given as parameter and all of its children in the subtree by adding tags.
     * @param node The node to rewrite
     */
    public rewrite(node: JQuery) {
        const self = this;
        for (let attrName in this.rules) {
            if (this.rules.hasOwnProperty(attrName)) { // required check with for (... in ...)
                const value = this.rules[attrName](node);
                if (value === undefined) {
                    continue;
                }
                node.attr(`${DOMRewriter.PREFIX}${attrName}`, value);
            }
        }
        node.children().each(function() {
            self.rewrite($(this));
        });
    }

    public addRule(attrName: string, value: (node: JQuery) => string|number) {
        this.rules[attrName] = value;
        return this;
    }

    public withDefaultRules(): DOMRewriter {
        this.addRule("x", (node) => node.position().left);
        this.addRule("y", (node) => node.position().top);
        this.addRule("width", (node) => node.width());
        this.addRule("height", (node) => node.height());
        // TODO z-index
        return this;
    }
}
