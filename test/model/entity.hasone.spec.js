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
	
    describe("hasOne", function () {
    	it("has a default value of null", function () {
    		expect(Character.location()).toBe(null);
    	});
    	
    	it("rejects the wrong type", function () {
    		expect(function () {
    			var Frodo = Character.create();
    			var Sting = Item.create();
    			
    			Frodo.location(Sting);
    		}).toThrow(new Error(
    			"Type mismatch when assigning value to 'location'"
    		));
    	});
    	
    	it("fixes up a one-to-one association", function () {
    		var player = Player.create();
    		var Gandalf = Character.create();
    		
    		player.character(Gandalf);
    		expect(Gandalf.player()).toBe(player);
    		
    		player.character(null);
    		expect(Gandalf.player()).toBe(null);
    	});
    	
    	it("resets the previous one-to-one association", function () {
    		var player1 = Player.create();
    		var player2 = Player.create();
    		var Gandalf = Character.create();
    		
    		player1.character(Gandalf);
    		expect(player1.character()).toBe(Gandalf);
    		
    		player2.character(Gandalf);
    		expect(player1.character()).toBe(null);
    	});
    	
    	it("fixes up a many-to-one association", function () {
    		var Sting = Item.create();
    		var MithrilCoat = Item.create();
    		var Frodo = Character.create();
    		
    		Sting.bearer(Frodo);
    		MithrilCoat.bearer(Frodo);
    		
    		expect(Frodo.items()).toEqual([Sting, MithrilCoat]);
    	});
    	
    	it("updates the previous many-to-one association", function () {
    		var Sting = Item.create();
    		var MithrilCoat = Item.create();
    		var Frodo = Character.create();
    		var Sam = Character.create();
    		
    		Sting.bearer(Frodo);
    		MithrilCoat.bearer(Frodo);
    		
    		Sting.bearer(Sam);
    		
    		expect(Frodo.items().length).toBe(1);
    		expect(Frodo.items()[0]).toBe(MithrilCoat);
    	});
    });
});

