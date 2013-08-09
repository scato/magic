"use strict";

var merge = require('../../src/magic/').action.merge;

describe("action", function () {
    describe("merge", function () {
        it("combines two actions", function () {
            var a = jasmine.createSpy('a');
            var b = jasmine.createSpy('b');
            var c = merge(a, b);

            expect(a).not.toHaveBeenCalled();
            expect(b).not.toHaveBeenCalled();

            c();

            expect(a).toHaveBeenCalled();
            expect(b).toHaveBeenCalled();
        });
    });
});
