"use strict";

var Root  = require('../../src/root/'),
    phase = require('../../src/magic').phase;

describe("Root", function () {
    describe("phase", function () {
        it("defines a phase on a prototype", function () {
            var Proto = Root.create();

            Proto.phase('foo');

            expect(Proto.ref('foo').is(phase)).toBe(true);
        });

        it("accepts a function for a default effect", function () {
        	var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);
            var Proto = Root.create().
            	phase('foo', foo);
            
            var instance = Proto.create();
            
            instance.foo('foz');

            expect(foo).toHaveBeenCalledWith('foz');
        });

        it("returns the prototype", function () {
            var Proto = Root.create();

            var result = Proto.phase('foo');

            expect(result).toBe(Proto);
        });
    });
});
