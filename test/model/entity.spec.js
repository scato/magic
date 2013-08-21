"use strict";

var Entity = require('../../src/model/entity'),
    list = require('../../src/magic').list;

describe("Entity", function () {
    describe("fields", function () {
        it("is a list", function () {
            expect(Entity.ref('fields').is(list)).toBe(true);
        });
        
        it("contains a list of fields defined on the entity", function () {
            var Example = Entity.create().
                field('id').
                field('name');
            
            expect(Example.fields()).toEqual(['id', 'name']);
        });
        
        it("is copied to instances automatically", function () {
            var Example = Entity.create().
                field('id').
                field('name');
            
            var instance = Example.create();
            
            expect(instance.fields()).toEqual(['id', 'name']);
        });
    });
});

