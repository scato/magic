"use strict";

var Root = require('./root');
var Character = module.exports = Root.create();

var list = require('../magic').list,
    ItemType = require('./itemtype'),
    Item = require('./item');

Character.
    hasMany(Item, 'items', 'bearer').
    hasMany(Item, 'wields').
    def('mayWield', function (item) {
    	if (item.type() === ItemType.None) {
    		return true;
    	}
    	
    	return this.wields().filter(function (wielded) {
    		return wielded.type() === item.type();
    	}).length === 0;
    });
