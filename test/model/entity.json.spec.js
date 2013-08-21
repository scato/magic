"use strict";

var Entity = require('../../src/model/entity');

describe("Entity", function () {
    var Example = Entity.create().
        field('id').
        field('name');
    
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

