/// <reference path="DatabaseAdaptable/DatabaseAdaptable.ts"/>
/// <reference path="DatabaseAdaptable/DatabaseAdapter.ts"/>
/// <reference path="DatabaseAdaptable/DatabaseConsoleLogOnly.ts"/>
/// <reference path="ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/ButtonsElementSelectionBehaviour.ts"/>
/// <reference path="ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/ClickElementEventBinding.ts"/>

class Controller {

    private database: DatabaseAdaptable;

    private elementEventBindingList = [
        ClickElementEventBinding,
    ];

    private elementSelectionBindingList = [
        ButtonsElementSelectionBehaviour,
    ];

    public constructor() {
        this.database = new DatabaseConsoleLogOnly(); // ("https://localhost:8000", 1, 1);
        this.hookToDOM();
    }

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
