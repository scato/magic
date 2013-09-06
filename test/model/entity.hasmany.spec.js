"use strict";

var Entity = require('../../src/model/entity'),
    field = require('../../src/magic').field;

describe("Entity", function () {
	var Site = Entity.create();
	var Character = Entity.create();
	var Item = Entity.create();
	var Player = Entity.create();
	
	Player.
		hasOne(Character, 'character', 'player');
	
	Character.
		hasOne(Player, 'player', 'character').
		hasOne(Site, 'location').
		hasMany(Item, 'items', 'bearer').
		hasMany(Site, 'homes', 'denizens');
	
	Item.
		hasOne(Character, 'bearer', 'items');
	
	Site.
		hasMany(Character, 'denizens', 'homes');
		
    describe("hasMany", function () {
        it("rejects non-entity types", function () {
        	expect(function () {
        		Entity.create().
        			hasMany({}, 'foo');
        	}).toThrow(new Error("Type should be an Entity"));
        });
        
    	it("has a default value of empty list", function () {
    		expect(Character.items()).toEqual([]);
    	});
    	
    	it("rejects the wrong type", function () {
    		expect(function () {
    			var Frodo = Character.create();
    			var Rivendell = Site.create();
    			
    			Frodo.items([Rivendell]);
    		}).toThrow(new Error("Type mismatch"));
    	});
    	
    	it("fixes up a many-to-one association", function () {
    		var Frodo = Character.create();
    		var Sting = Item.create();
    		var MithrilCoat = Item.create();
    		
    		Frodo.items([Sting, MithrilCoat]);
    		
    		expect(Sting.bearer()).toBe(Frodo);
    		expect(MithrilCoat.bearer()).toBe(Frodo);
    		
    		expect(Frodo.items().length).toBe(2);
    		expect(Frodo.items()[0]).toBe(Sting);
    		expect(Frodo.items()[1]).toBe(MithrilCoat);
    	});
    	
    	it("updates the previous many-to-one association", function () {
    		var Frodo = Character.create();
    		var Sam = Character.create();
    		var Sting = Item.create();
    		var MithrilCoat = Item.create();
    		
    		Frodo.items([Sting, MithrilCoat]);
    		Sam.items([Sting]);
    		
    		expect(Frodo.items().length).toBe(1);
    		expect(Frodo.items()[0]).toBe(MithrilCoat);
    	});
    	
    	it("fixes up a many-to-many association", function () {
			var Frodo = Character.create();
			var Gandalf = Character.create();
			var Rivendell = Site.create();
			var BagEnd = Site.create();
			
			Gandalf.homes([Rivendell, BagEnd]);
			Frodo.homes([BagEnd]);
			
			expect(Rivendell.denizens().length).toBe(1);
			expect(Rivendell.denizens()[0]).toBe(Gandalf);
			expect(BagEnd.denizens().length).toBe(2);
			expect(BagEnd.denizens()[0]).toBe(Gandalf);
			expect(BagEnd.denizens()[1]).toBe(Frodo);
    	});
    	
    	it("updates the previous many-to-many association", function () {
			var Frodo = Character.create();
			var Gandalf = Character.create();
			var Rivendell = Site.create();
			var BagEnd = Site.create();
			
			Gandalf.homes([Rivendell, BagEnd]);
			Frodo.homes([BagEnd]);
			
			Gandalf.homes([Rivendell]);
			
			expect(Rivendell.denizens().length).toBe(1);
			expect(Rivendell.denizens()[0]).toBe(Gandalf);
			expect(BagEnd.denizens().length).toBe(1);
			expect(BagEnd.denizens()[0]).toBe(Frodo);
    	});
    });
});

