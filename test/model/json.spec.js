"use strict";

var Root = require('../../src/root'),
    Json = require('../../src/model/json'),
    list = require('../../src/magic').list;

describe("Json", function () {
    var Example = Json(Root.create()).
        field('id').
        field('name');
    
    describe("fields", function () {
        it("is a list", function () {
            expect(Example.ref('fields').is(list)).toBe(true);
        });
        
        it("contains a list of fields defined on the entity", function () {
            expect(Example.fields()).toEqual(['id', 'name']);
        });
        
        it("is copied to instances automatically", function () {
            var instance = Example.create();
            
            expect(instance.fields()).toEqual(['id', 'name']);
        });
    });
    
    describe("fromJson", function () {
        it("turns the result of JSON.parse() into an instance", function () {
            var json = {id: 1, name: 'test'};
            var instance = Example.fromJson(json);
            
            expect(instance.is(Example)).toBe(true);
            expect(instance.id()).toBe(1);
            expect(instance.name()).toBe('test');
        });
    });
    
    describe("toJson", function () {
        it("turns an instance into the input for JSON.stringify()", function () {
            var instance = Example.create().
                id(1).
                name('test');
            
            var json = instance.toJson();
            
            expect(json).toEqual({id: 1, name: 'test'});
        });
    });
});

