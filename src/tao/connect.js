"use strict";

var fs = require('fs');

function map(base, prefix) {
    var regexp = new RegExp('^' + prefix + '\\/');
    
    return function (req, res, next) {console.log(req.url, base, prefix);
        if (req.url.match(regexp)) {
            fs.exists(base + req.url, function (result) {
                if (result) {
                    fs.readFile(base + req.url, function (err, data) {
                        res.
                            status(200).
                            type('js').
                            send(Buffer.concat([
                                new Buffer('define(\'' + req.url.replace(/\.js$/, '') + '\', function (module, exports, require) {'),
                                data,
                                new Buffer('\n\n});')
                            ]));
                    });
                } else {
                    res.
                        status(404).
                        send('File not found');
                }
            });
        } else {
            next();
        }
    };
}

exports.map = map;
