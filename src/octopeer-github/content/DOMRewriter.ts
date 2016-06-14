/// <reference path="ZIndex.ts"/>
/**
 * Created by Maarten on 12-06-2016.
 *
 * The DOMRewriter can be used to put octopeer tags everywhere.
 */
class DOMRewriter {

    /** The prefix that is used for all octopeer tags. */
    public static get PREFIX() { return "data-octopeer-"; }

    /**
     * A map that holds all rules for adding tags to the DOM.
     * @type {[string]: (node: JQuery) => string|number}
     */
    private rules: { [attrName: string]: (node: JQuery) => string|number; } = {};

    /**
     * Rewrites the node given as parameter and all of its children in the subtree by adding tags.
     * If a rule returns undefined, it will not add its corresponding tag to the DOM.
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

    /**
     * Add a rule with which the DOMRewriter should rewrite the DOM.
     * @param attrName The name of the tag (without the PREFIX)
     * @param rule The rule with which a node is transformed into a property value that is added to the DOM
     * @returns {DOMRewriter} this
     */
    public addRule(attrName: string, rule: (node: JQuery) => string|number) {
        this.rules[attrName] = rule;
        return this;
    }

    /**
     * Adds all rules that are useful for research purposes: x, y, width, height and (optional) z.
     * @returns {DOMRewriter} this
     */
    public withDefaultRules(): DOMRewriter {
        this.addRule("x", (node) => node.position().left);
        this.addRule("y", (node) => node.position().top);
        this.addRule("width", (node) => node.width());
        this.addRule("height", (node) => node.height());
        this.addRule("z", (node) => {
            const z = node.zIndex();
            return z === 0 ? undefined : z;
        });
        return this;
    }
}
