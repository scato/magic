"use strict";

(function () {
	var base = document.location.pathname;
	var definitions = {};
	var modules = {};
	
	function define(id, callback) {
		definitions[id] = callback;
	}
	
	function load(id) {
        id = id.replace(/\/$/, '');

        if (!definitions.hasOwnProperty(id)) {
            if (definitions.hasOwnProperty(id + '/index')) {
                id += '/index';
            } else {
                throw new Error("could not find module '" + id + "'");
            }
        }

		if (!modules.hasOwnProperty(id)) {
			modules[id] = {
				exports: {}
			};
			
			var module = modules[id];
			var exports = module.exports;
			var require = function (relative) {
				return load(resolve(id, relative));
			};
			
			definitions[id].call(exports, module, exports, require);
		}
		
		return modules[id].exports;
	}
	
	function resolve(base, relative) {
		if (!relative.match(/^[\.]/)) {
			return relative;
		} else {
			var absolute = base.replace(/\/[^\/]*$/, '/') + relative;
			
			while (absolute.match(/\/[^\/]*\/\.\.\//)) {
				absolute = absolute.replace(/\/[^\/]*\/\.\.\//, '/');
			}
			
			while (absolute.match(/\/\.\//)) {
				absolute = absolute.replace(/\/\.\//, '/');
			}
			
			return absolute;
		}
	}
	
	self.define = define;

    self.require = function (relative) {
		return load(resolve(base, relative));
	};
})();
