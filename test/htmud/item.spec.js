"use strict";

var Item  = require('../../src/htmud/item'),
    Root  = require('../../src/htmud/root'),
    field = require('../../src/magic').field,
    event = require('../../src/magic').event,
    Character = require('../../src/htmud/character');

describe("Item", function () {
    it("is a Root", function () {
        expect(Item.is(Root)).toBe(true);
    });
    
    describe("type", function () {
        it("is a field", function () {
            expect(Item.ref('type').is(field)).toBe(true);
        });
    });
    
    describe("bearer", function () {
        it("is a field", function () {
            expect(Item.ref('bearer').is(field)).toBe(true);
        });
        
        it("has a default value of null", function () {
        	expect(Item.bearer()).toBe(null);
        });
    });
    
    describe("take", function () {
        it("is an event", function () {
            expect(Item.ref('take').is(event)).toBe(true);
        });
        
        it("sets the bearer to the character that took it", function () {
        	var item = Item.create();
        	var character = Character.create();
        	
        	item.take(character);
        	
        	expect(item.bearer()).toBe(character);
        });
        
        it("adds the item to the character", function () {
        	var item = Item.create();
        	var character = Character.create();
        	
        	item.take(character);
        	
        	expect(character.items().indexOf(item)).not.toBe(-1);
        });
    });
    
    describe("wield", function () {
        it("is an event", function () {
            expect(Item.ref('wield').is(event)).toBe(true);
        });
        
        it("adds an item to its bearers list", function () {
        	var item = Item.create();
        	var character = Character.create();
        	
        	item.take(character);
        	item.wield();
        	
        	expect(character.wields().indexOf(item)).not.toBe(-1);
        });
        
        it("removes the item from the list when it is stowed", function () {
        	var item = Item.create();
        	var character = Character.create();
        	
        	item.take(character);
        	item.wield();
        	item.stow();
        	
        	expect(character.wields().indexOf(item)).toBe(-1);
        });
        
        it("removes the item from the list when it is dropped", function () {
        	var item = Item.create();
        	var character = Character.create();
        	
        	item.take(character);
        	item.wield();
        	item.drop();
        	
        	expect(character.wields().indexOf(item)).toBe(-1);
        });
    });
    
    describe("stow", function () {
        it("is an event", function () {
            expect(Item.ref('stow').is(event)).toBe(true);
        });
    });
    
    describe("drop", function () {
        it("is an event", function () {
            expect(Item.ref('drop').is(event)).toBe(true);
        });
        
        it("sets the bearer to null", function () {
        	var item = Item.create();
        	var character = Character.create();
        	
        	item.take(character);
        	item.drop();
        	
        	expect(item.bearer()).toBe(null);
        });
        
        it("removes the item from the character", function () {
        	var item = Item.create();
        	var character = Character.create();
        	
        	item.take(character);
        	item.drop();
        	
        	expect(character.items().indexOf(item)).toBe(-1);
        });
    });
});
