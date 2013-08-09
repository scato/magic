"use strict";

var event   = require('../../src/magic/').event,
    phase   = require('../../src/magic/').phase,
    on      = require('../../src/magic/').effect.on,
    once    = require('../../src/magic/').effect.once,
    until   = require('../../src/magic/').effect.until,
    during  = require('../../src/magic/').effect.during,
    between = require('../../src/magic/').effect.between;

describe("effect", function () {
    describe("on", function () {
        it("binds an effect to an observable", function () {
            var a = event();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);

            var undo = on(a, foo);

            a("one");
            expect(foo).toHaveBeenCalledWith("one");
            expect(bar).not.toHaveBeenCalled();

            a("two");
            expect(foo).toHaveBeenCalledWith("two");
            expect(bar).not.toHaveBeenCalled();

            undo();

            expect(bar).toHaveBeenCalled();
        });

        it("assumes an effect to be irreversible if undefined is returned", function () {
            var a = event();
            var foo = jasmine.createSpy('foo');

            var undo = on(a, foo);

            a("one");
            expect(foo).toHaveBeenCalledWith("one");

            a("two");
            expect(foo).toHaveBeenCalledWith("two");
        });
    });

    describe("once", function () {
        it("binds an effect to the first occurrence of an observable", function () {
            var a = event();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);

            var undo = once(a, foo);

            a("one");
            expect(foo).toHaveBeenCalledWith("one");
            expect(bar).not.toHaveBeenCalled();

            a("two");
            expect(foo).not.toHaveBeenCalledWith("two");
            expect(bar).not.toHaveBeenCalled();

            undo();

            expect(bar).toHaveBeenCalled();
        });
    });

    describe("until", function () {
        it("binds an undo-action to an observable", function () {
            var a = event();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);
            var baz = jasmine.createSpy('baz');
            var foz = jasmine.createSpy('foz').andReturn(baz);

            var undo = until(a, foo("one"));

            expect(foo).toHaveBeenCalledWith("one");
            expect(bar).not.toHaveBeenCalled();

            undo();

            expect(bar).toHaveBeenCalled();

            until(a, foz("two"));

            expect(foz).toHaveBeenCalledWith("two");
            expect(baz).not.toHaveBeenCalled();

            a("three");

            expect(baz).toHaveBeenCalled();
        });

        it("calls its undo-action only once", function () {
            var a = event();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);

            var undo = until(a, foo("one"));

            a("three");
            undo();

            expect(bar.callCount).toBe(1);
        });
    });

    describe("during", function () {
        it("binds an effect to an interval", function () {
            var a = phase();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);
            var baz = jasmine.createSpy('baz');
            var foz = jasmine.createSpy('foz').andReturn(baz);

            during(a, foo);

            expect(foo).not.toHaveBeenCalled();

            var cancel = a("one");
            expect(foo).toHaveBeenCalledWith("one");
            expect(bar).not.toHaveBeenCalled();

            cancel();
            expect(bar).toHaveBeenCalled();

            a("two");
            expect(foo).toHaveBeenCalledWith("two");

            var undo = during(a, foz);

            expect(foz).not.toHaveBeenCalled();

            a("three");
            expect(foz).toHaveBeenCalledWith("three");
            expect(baz).not.toHaveBeenCalled();

            undo();
            expect(baz).toHaveBeenCalled();
        });
    });

    describe("between", function () {
        it("binds an effect to the complement of an interval", function () {
            var a = phase();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);
            var baz = jasmine.createSpy('baz');
            var foz = jasmine.createSpy('foz').andReturn(baz);

            between(a, foo);

            expect(foo).toHaveBeenCalled();
            expect(foo.callCount).toBe(1);
            expect(bar).not.toHaveBeenCalled();

            var cancel = a("one");
            expect(bar).toHaveBeenCalled();
            expect(foo.callCount).toBe(1);

            cancel();
            expect(foo.callCount).toBe(2);

            var undo = between(a, foz);

            expect(foz).toHaveBeenCalled();
            expect(baz).not.toHaveBeenCalled();

            undo();
            expect(baz).toHaveBeenCalled();
        });
    });
});