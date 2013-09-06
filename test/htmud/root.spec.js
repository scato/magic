"use strict";

var Root = require('../../src/htmud/root'),
    field = require('../../src/magic').field,
    verb = require('../../src/htmud/verb');

describe("Root", function () {
    describe("name", function () {
        it("is a field", function () {
            expect(Root.ref('name').is(field)).toBe(true);
        });
    });
    
    describe("verb", function () {
        var Item = Root.create().
            verb('take this', function (player) {
                player.take(this);
            });

        var Sting = Item.create().
            name('Sting');
        
        it("defines a verb", function () {
            var take = Sting.verb('take Sting');

            expect(take.length).toBe(1);
            expect(typeof take[0]).toBe('function');
        });
    });
});
