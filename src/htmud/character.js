"use strict";

var Root = require('./root'),
    list = require('../magic').list,
    ItemType = require('./itemtype');

module.exports = Root.create().
	list('items').
    list('wields').
    def('mayWield', function (item) {
    	if (item.type() === ItemType.None) {
    		return true;
    	}
    	
    	return this.wields().filter(function (wielded) {
    		return wielded.type() === item.type();
    	}).length === 0;
    });
