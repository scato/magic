"use strict";

require('./').def('create', function () {
    return Object.create(this);
});
