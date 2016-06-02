/**
 * Created by Maarten on 26-05-2016.
 */

describe("The method 'equals' on an Array", function () {

    /**
     * Interface that enforces a tuple (Array, Array, boolean).
     * The 0, 1 and 2 are the indices of this tuple (since it is created as a list).
     * The tuple is used to test the Array.equals method.
     */
    interface ArrayEqualsTestTuple extends Array<Array<any> | boolean> {
        0: Array<any>;
        1: Array<any>;
        2: boolean;
    }

    const tests: ArrayEqualsTestTuple[] = [
        [[1, 2, 3], [1, 2, 3],  true],
        [[1, 2, 3], [1, 3, 2],  false],
        [[1, 2, 3], [1, 3],     false],
        [[],        [1, 3],     false],
        [[],        [],         true],
        [[],        null,       false],
    ];

    let test: ArrayEqualsTestTuple;
    for (let i = 0; i < tests.length; i++) {
        test = tests[i];

        it(`should return ${test[2]} when calling ${test[0]}.equals(${test[1]})`, function () {
            test = tests[i];

            // Tests are executed both ways to ensure commutativity
            expect(test[0].equals(test[1])).toBe(test[2]);

            // Except when the right-hand side is null
            if (test[1] !== null) {
                expect(test[1].equals(test[0])).toBe(test[2]);
            }
        });
    }

});

describe("The method 'contains' on an Array", function() {

    /**
     * Interface that enforces a tuple (Array, any, boolean).
     * The 0, 1 and 2 are the indices of this tuple (since it is created as a list).
     * The tuple is used to test the Array.contains method.
     */
    interface ArrayContainsTestTuple extends Array<Array<any> | any | boolean> {
        0: Array<any>;
        1: any;
        2: boolean;
    }

    const tests: ArrayContainsTestTuple[] = [
        [[new ElementID(1)], new ElementID(1), true],
        [[1, 2, 3], 1,          true],
        [[1, 2, 3], 4,          false],
        [[1, 2, 3], [1, 2, 3],  false],
        [[],        1,          false],
        [[[]],      [],         true],
        [[1, 2, 3], null,       false],
    ];

    let test: ArrayContainsTestTuple;
    for (let i = 0; i < tests.length; i++) {
        test = tests[i];

        it(`should return ${test[2]} when calling ${test[0]}.contains(${test[1]})`, function () {
            test = tests[i];
            expect(test[0].contains(test[1])).toBe(test[2]);
        });
    }

});
