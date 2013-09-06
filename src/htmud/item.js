"use strict";

var Root = require('./root');
var Item = module.exports = Root.create();

var Character = require('./character');

Item.
    field('type').
    hasOne(Character, 'bearer', 'items').
    def('take', function (character) {
    	this.bearer(character);
        return this;
    }).
    def('wield', function () {
        this.bearer().ref('wields').add(this);
        return this;
    }).
    def('stow', function () {
        this.bearer().ref('wields').remove(this);
        return this;
    }).
    def('drop', function () {
        this.bearer().ref('wields').remove(this);
    	this.bearer(null);
        return this;
    });
