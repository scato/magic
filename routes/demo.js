"use strict";

exports.zoom = function (req, res) {
    res.render('demo/zoom.jade', { title: 'Demo\'s - Zoom' });
};

exports.sound = function (req, res) {
    res.render('demo/sound.jade', { title: 'Demo\'s - Sound' });
};
