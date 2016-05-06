/// <reference path="DatabaseAdaptable/DatabaseAdaptable.ts"/>
/// <reference path="DatabaseAdaptable/DatabaseConsoleLogOnly.ts"/>
/// <reference path="ElementSelectionBehaviour/ElementSelectionBehaviour.ts"/>
/// <reference path="ElementSelectionBehaviour/SelectButtonsElementSelectionBehaviour.ts"/>
/// <reference path="ElementEventBinding/ElementEventBinding.ts"/>
/// <reference path="ElementEventBinding/ClickElementEventBinding.ts"/>

let databaseAdapterInterfaceImplementer: DatabaseAdaptable;
let buttonSelector: ElementSelectionBehaviour;
let buttonClickedLogging: ElementEventBinding;

databaseAdapterInterfaceImplementer = new DatabaseConsoleLogOnly();
buttonSelector = new SelectButtonsElementSelectionBehaviour(databaseAdapterInterfaceImplementer);
buttonClickedLogging = new ClickElementEventBinding(buttonSelector);

