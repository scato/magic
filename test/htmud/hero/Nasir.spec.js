"use strict";

var Hero  = require('../../src/htmud/hero'),
    Nasir = require('../../../src/htmud/hero/Nasir');

describe("heroes", function () {
    describe("Nasir", function () {
        it("is a Hero", function () {
            expect(Nasir.is(Hero)).toBe(true);
        });
        
        it("is named Nasir", function () {
            expect(Nasir.name()).toBe("Nasir");
        });
        
        it("can wield two weapons", function () {
            
        });
    });
});
