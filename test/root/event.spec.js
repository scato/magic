"use strict";

var Root  = require('../../src/root/'),
    event = require('../../src/magic').event;

describe("Root", function () {
    describe("event", function () {
        it("defines an event on a prototype", function () {
            var Proto = Root.create();

            Proto.event('foo');

            expect(Proto.ref('foo').is(event)).toBe(true);
        });

        it("accepts a function for a default action", function () {
            var foo = jasmine.createSpy('foo');
            var Proto = Root.create().
            	event('foo', foo);
            
            var instance = Proto.create();
            
            instance.foo('foz');

            expect(foo).toHaveBeenCalledWith('foz');
        });

        it("returns the prototype", function () {
            var Proto = Root.create();

            var result = Proto.event('foo');

            expect(result).toBe(Proto);
        });
    });
});
