/// <reference path="KeystrokeDatabaseAdaptable.ts"/>
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
 * An amount of milliseconds since the Unix Epoch (1-1-1970 0:00).
 * Since this type is used by all DatabaseAdaptables, I think the typedef belongs to this file.
 */
type UnixTimestamp = number;

/**
 * A DatabaseAdaptable implements all possible interfaces for a database.
 * It is used for short-hand.
 */
interface DatabaseAdaptable extends SemanticDatabaseAdaptable, KeystrokeDatabaseAdaptable { }
