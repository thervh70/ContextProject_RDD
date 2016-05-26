/// <reference path="SemanticDatabaseAdaptable.ts"/>
/**
 * Created by Maarten on 26-05-2016.
 */

/**
 * The Callback type can be used in implementing classes to allow for a callback on success or failure.
 * Using EMPTY_CALLBACK means you explicitly specify that nothing should happen on success or failure.
 */
type Callback = JQueryPromiseCallback<any>;

// tslint:disable-next-line:no-unused-variable
const EMPTY_CALLBACK: Callback = function() {return; };

/**
 * A DatabaseAdaptable implements all possible interfaces for a database.
 * It is used for short-hand.
 */
type DatabaseAdaptable = SemanticDatabaseAdaptable; // & KeystrokeDatabaseAdaptable & MousePositionDatabaseAdaptable & ...
