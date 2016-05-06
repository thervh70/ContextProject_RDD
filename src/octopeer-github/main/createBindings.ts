// /**
//  * Created by Youri on 06/05/2016.
//  */
// let elementEventBindingList: ElementEventBindingCreatable[];
// let elementSelectionBindingList: ElementSelectionBehaviourCreatable[];
// let elementEventBinding: ElementEventBindingCreatable;
// let elementSelectionBinding: ElementSelectionBehaviourCreatable;
// let elementEventBindingHolder: ElementEventBinding;
// let elementSelectionBindingHolder: ElementSelectionBehaviour;
// let databaseAdapter: DatabaseAdaptable;
//
// elementEventBindingList = [
//     ClickElementEventBinding,
// ];
//
// elementSelectionBindingList = [
//     ButtonsElementSelectionBehaviour,
// ];
//
// databaseAdapter = new DatabaseConsoleLogOnly();
//
// for (elementSelectionBinding in elementSelectionBindingList) {
//     elementSelectionBindingHolder  = new elementSelectionBinding(databaseAdapter);
//
//     for (elementEventBinding in elementEventBindingList) {
//         elementEventBindingHolder = new elementEventBinding(elementSelectionBindingHolder);
//     }
// }
