"use strict";

var phase   = require('../../src/magic/').phase,
    dynamic = require('../../src/magic/').dynamic;

describe("interval", function () {
    it("has a start", function () {
        var a = phase();
        var b = a.start();

        var foo = jasmine.createSpy('foo');

        b(foo);

        expect(foo).not.toHaveBeenCalled();

        a();
        expect(foo).toHaveBeenCalled();
    });

    it("has an end", function () {
        var a = phase();
        var b = a.end();

        var foo = jasmine.createSpy('foo');
        var bar = jasmine.createSpy('bar');

        b(foo);

        var undo = a();
        expect(foo).not.toHaveBeenCalled();

        undo();
        expect(foo).toHaveBeenCalled();
    });

    it("has an end that fires listeners added during the phase", function () {
        var a = phase();
        var b = a.end();

        var foo = jasmine.createSpy('foo');
        var bar = jasmine.createSpy('bar');

        var undo = a();

        b(foo);
            expect(foo).not.toHaveBeenCalled();

        undo();
        expect(foo).toHaveBeenCalled();
    });

    it("can be combined using or", function () {
        var a = phase();
        var b = phase();
        var c = a.or(b);

        var d = dynamic(false);

        c(function () {
            return d(function () {
                return true;
            });
        });

        expect(d()).toBe(false);

        var undo = a();
        expect(d()).toBe(true);

        b();
        expect(d()).toBe(true);

        undo();
        expect(d()).toBe(true);
    });

    it("can be combined using and", function () {
        var a = phase();
        var b = phase();
        var c = a.and(b);

        var d = dynamic(false);

        c(function () {
            return d(function () {
                return true;
            });
        });

        expect(d()).toBe(false);

        var undo = a();
        expect(d()).toBe(false);

        b();
        expect(d()).toBe(true);

        undo();
        expect(d()).toBe(false);
    });
});