let databaseAdapterInterfaceImplementer: DatabaseAdaptable;
let buttonSelector: ElementSelectionBehaviour;
let buttonClickedLogging: ElementEventBinding;

databaseAdapterInterfaceImplementer = new DatabaseConsoleLogOnly();
buttonSelector = new SelectButtonsElementSelectionBehaviour(databaseAdapterInterfaceImplementer);
buttonClickedLogging = new ClickElementEventBinding(buttonSelector);
