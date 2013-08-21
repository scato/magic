"use strict";

var event     = require('../../src/magic').event,
    phase     = require('../../src/magic').phase,
    have      = require('../../src/magic').effect.have,
    on        = require('../../src/magic').effect.on,
    once      = require('../../src/magic').effect.once,
    until     = require('../../src/magic').effect.until,
    during    = require('../../src/magic').effect.during,
    between   = require('../../src/magic').effect.between,
    permanent = require('../../src/magic').effect.permanent;

describe("effect", function () {
    // the top undo-scope is exit
    var exit = require('../../src/magic').effect.exit;
    
    describe("have", function () {
        it("cancels an effect when the current scope is triggered", function () {
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);
            
            have(foo());
            
            expect(bar).not.toHaveBeenCalled();
            
            exit();
            
            expect(bar).toHaveBeenCalled();
        });
    });
    
    describe("on", function () {
        it("applies the block every time the observable fires", function () {
            var a = event();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);

            on(a, function (x) {
                have(foo(x));
            });

            a("one");
            expect(foo).toHaveBeenCalledWith("one");
            expect(bar).not.toHaveBeenCalled();

            a("two");
            expect(foo).toHaveBeenCalledWith("two");
            expect(bar).not.toHaveBeenCalled();
        });

        it("cancels the block and prevents further application when the outer scope is triggered", function () {
            var a = event();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);

            on(a, function (x) {
                have(foo(x));
            });

            a("one");
            expect(foo).toHaveBeenCalledWith("one");
            expect(bar).not.toHaveBeenCalled();

            exit();

            expect(bar).toHaveBeenCalled();
            
            a("two");
            expect(foo).not.toHaveBeenCalledWith("two");
        });
    });

    describe("once", function () {
        it("applies a block - like on - but only the first time the observable fires", function () {
            var a = event();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);

            once(a, function (value) {
                have(foo(value));
            });

            a("one");
            expect(foo).toHaveBeenCalledWith("one");
            expect(bar).not.toHaveBeenCalled();

            a("two");
            expect(foo).not.toHaveBeenCalledWith("two");
            expect(bar).not.toHaveBeenCalled();
        });
    });

    describe("until", function () {
        it("applies a block immidiately", function () {
            var a = event();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);

            until(a, function () {
                have(foo("one"));
            });

            expect(foo).toHaveBeenCalledWith("one");
            expect(bar).not.toHaveBeenCalled();
        });

        it("cancels the block if the observable fires", function () {
            var a = event();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);

            until(a, function () {
                have(foo("one"));
            });

            expect(foo).toHaveBeenCalledWith("one");
            expect(bar).not.toHaveBeenCalled();
            
            a("two");

            expect(bar).toHaveBeenCalled();
        });

        it("cancels the block if the outer scope is triggered", function () {
            var a = event();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);

            until(a, function () {
                have(foo("one"));
            });

            expect(foo).toHaveBeenCalledWith("one");
            expect(bar).not.toHaveBeenCalled();
            
            exit();

            expect(bar).toHaveBeenCalled();
        });
    });
    
    describe("during", function () {
        it("applies a block when the interval starts and cancels it when it ends", function () {
            var a = phase();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);

            during(a, function (value) {
                have(foo(value));
            });

            expect(foo).not.toHaveBeenCalled();

            var cancel = a("one");
            expect(foo).toHaveBeenCalledWith("one");
            expect(bar).not.toHaveBeenCalled();

            cancel();
            expect(bar).toHaveBeenCalled();

            a("two");
            expect(foo).toHaveBeenCalledWith("two");
        });

        it("cancels the block when the outer scope triggers", function () {
            var a = phase();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);

            during(a, function (value) {
                have(foo(value));
            });

            expect(foo).not.toHaveBeenCalled();

            a("one");
            expect(foo).toHaveBeenCalledWith("one");
            expect(bar).not.toHaveBeenCalled();

            exit();
            expect(bar).toHaveBeenCalled();
        });
    });
    
    describe("between", function () {
        it("applies the block immidiately", function () {
            var a = phase();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);

            between(a, function () {
                have(foo());
            });

            expect(foo).toHaveBeenCalled();
            expect(foo.callCount).toBe(1);
            expect(bar).not.toHaveBeenCalled();
        });
            
        it("cancels the block at the start of the interval and applies it at the end", function () {
            var a = phase();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);

            between(a, function () {
                have(foo());
            });

            var cancel = a("one");
            expect(bar).toHaveBeenCalled();
            expect(foo.callCount).toBe(1);

            cancel();
            expect(foo.callCount).toBe(2);
        });

        it("cancels the block if the outer scope is triggered", function () {
            var a = phase();
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);

            between(a, function () {
                have(foo());
            });

            expect(foo).toHaveBeenCalled();
            expect(bar).not.toHaveBeenCalled();

            exit();
            expect(bar).toHaveBeenCalled();
        });
    });
    
    describe("permanent", function () {
        it("applies the block immidiately", function () {
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);
            
            permanent(function () {
                have(foo());
            });
            
            expect(foo).toHaveBeenCalled();
            expect(bar).not.toHaveBeenCalled();
        });
            
        it("returns an observable to cancel the block", function () {
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);
            
            var undo = permanent(function () {
                have(foo());
            });
            
            undo();
            
            expect(bar).toHaveBeenCalled();
        });
            
        it("does not cancel the block if the outer scope is triggered", function () {
            var bar = jasmine.createSpy('bar');
            var foo = jasmine.createSpy('foo').andReturn(bar);
            
            permanent(function () {
                have(foo());
            });
            
            exit();
            
            expect(bar).not.toHaveBeenCalled();
        });
    });
});
