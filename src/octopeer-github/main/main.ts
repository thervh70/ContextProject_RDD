let databaseAdapterInterfaceImplementer: DatabaseAdapterInterface;
let buttonSelecter: ElementSelectionBehaviour;
let buttonClickedLogging: ElementEventBinding;

databaseAdapterInterfaceImplementer = new DatabaseConsoleLogOnly();
buttonSelecter = new SelectButtonsElementSelectionBehaviour(databaseAdapterInterfaceImplementer);
buttonClickedLogging = new ClickElementEventBinding(buttonSelecter);
