"use strict";

var Root = require('../root');
var Json = require('./json');

module.exports = Json(Root.create()).
    override('field', function (base) {
        return function (name, init) {
            this.fields(name);
            
            return base(name, init);
        };
    });

require('./entity.hasone');
require('./entity.hasmany');
