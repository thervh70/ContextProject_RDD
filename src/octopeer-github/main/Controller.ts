/// <reference path="DatabaseAdaptable/DatabaseAdaptable.ts"/>
/// <reference path="DatabaseAdaptable/DatabaseAdapter.ts"/>
/// <reference path="DatabaseAdaptable/DatabaseConsoleLogOnly.ts"/>
/// <reference path="ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonElementSelectionBehaviour/ButtonElementSelectionBehaviour.ts"/>
/// <reference path="ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/ClickElementEventBinding.ts"/>

/**
 * The Controller hooks the event handlers to the DOM-tree.
 */
class Controller {

    private database: DatabaseAdaptable;

    /** List of ElementEventBindings that should be matched with ElementSelectors */
    private elementEventBindingList = [
        ClickElementEventBinding,
    ];

    /** List of ElementSelectors that should be matched with ElementEventBindings */
    private elementSelectionBindingList = [
        ButtonElementSelectionBehaviour,
    ];

    /** Starts the Controller. After calling this, all event handlers are hooked to the DOM-tree. */
    public start() {
        this.database = new DatabaseConsoleLogOnly(); // ("https://localhost:8000", 1, 1);
        this.hookToDOM();
        return this;
    }

    /** Hook the product of ElementBindings and ElementSelectors to the DOM-tree. */
    private hookToDOM() {
        let elementEventBinding: ElementEventBindingCreatable;
        let elementSelectionBinding: ElementSelectionBehaviourCreatable;
        let elementEventBindingHolder: ElementEventBinding;
        let elementSelectionBindingHolder: ElementSelectionBehaviour;

        for (elementSelectionBinding of this.elementSelectionBindingList) {
            elementSelectionBindingHolder = new elementSelectionBinding(this.database);

            for (elementEventBinding of this.elementEventBindingList) {
                elementEventBindingHolder = new elementEventBinding(elementSelectionBindingHolder);
            }
        }
    }

}
