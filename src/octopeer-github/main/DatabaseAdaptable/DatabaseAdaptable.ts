/// <reference path="SemanticDatabaseAdaptable.ts"/>
/**
 * Created by Maarten on 26-05-2016.
 */

type Callback = JQueryPromiseCallback<any>;

const EMPTY_CALLBACK = function() {return; };
EMPTY_CALLBACK(); // suppress TSLint unused-variable, because it is used elsewhere

type DatabaseAdaptable = SemanticDatabaseAdaptable;
