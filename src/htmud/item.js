"use strict";

var Root = require('./root');

module.exports = Root.create().
    field('type').
    field('bearer', function () { return null; }).
    event('take', function (character) {
    	this.bearer(character);
    	
    	var undo = this.bearer().items(this);
    	var done = this.ref('drop').one();
    	
    	done(undo);
    }).
    event('wield', function () {
    	var undo = this.bearer().wields(this);
    	var done = this.ref('stow').merge(this.ref('drop')).one();
    	
    	done(undo);
    }).
    event('stow').
    event('drop', function () {
    	this.bearer(null);
    });
