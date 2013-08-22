"use strict";

var Enum = require('../../src/model/enum'),
    list = require('../../src/magic').list;

describe("Enum", function () {
    var Direction = Enum.create(
        'North',
        'South',
        'East',
        'West'
    );
    
    describe("names", function () {
        it("is a list", function () {
            expect(Direction.ref('names').is(list)).toBe(true);
        });
        
        it("is copied to instances automatically", function () {
            var instance = Direction.create();
            
            expect(instance.names()).toEqual(['North', 'South', 'East', 'West']);
        });
    });
    
    describe("create", function () {
        it("creates a new enum", function () {
            expect(Direction.is(Enum)).toBe(true);
        });
        
        it("sets named instances of that enum on the prototype", function () {
            expect(Direction.South.is(Direction)).toBe(true);
        });
    });
    
    describe("fromJson", function () {
        it("maps strings to instances of the enum", function () {
            var json = 'East';
            var direction = Direction.fromJson(json);
            
            expect(direction).toBe(Direction.East);
        });
    });
    
    describe("toJson", function () {
        it("maps instances of the enum to strings", function () {
            var direction = Direction.West;
            var json = direction.toJson();
            
            expect(json).toBe('West');
        });
    });
});

