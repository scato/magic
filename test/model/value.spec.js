"use strict";

var Value = require('../../src/model/value');

describe("Value", function () {
    var Point = Value.create().
        field('x', function () { return 0; }).
        field('y', function () { return 0; });
        
    describe("field", function () {
        it("sets defaults using initializers", function () {
            var p = Point;
            
            expect(p.x()).toBe(0);
            expect(p.y()).toBe(0);
        });
        
        it("uses undefined as a default without an initializer", function () {
            var Example = Value.create().
                field('foo');
            
            expect(Example.foo()).toBe(undefined);
        });
        
        it("always returns a new instance", function () {
            var p = Point.
                x(5).
                y(5);
            
            var q = p.
                x(10);
            
            expect(q).not.toBe(p);
        });
        
        it("sets the new value while leaving the original unchanged", function () {
            var p = Point.
                x(5).
                y(5);
            
            var q = p.y(10);
            
            var r = q.x(20);
            
            expect(p.x()).toBe(5);
            expect(p.y()).toBe(5);
            
            expect(q.x()).toBe(5);
            expect(q.y()).toBe(10);
            
            expect(r.x()).toBe(20);
            expect(r.y()).toBe(10);
        });
    });
});

