(function () {

	'use strict';

	var sandalPromise = function (_q) {
		if (!_q) throw new Error('Can find window.Q. Include the q promises library before sandal-promise');
		return function (sandal, isConstructor) {

			(isConstructor ? sandal.prototype : sandal).promise = function (components) {
				var components = [];
				for (var i = 0; i < arguments.length; i++) {
					components.push(arguments[i]);
				}
				var resolveOne = false;
				if (components.length === 1) {
					resolveOne = true;
					components = [components];
				}
				var defer = _q.defer();
				(isConstructor ? this : sandal).resolve(components, function () {
					if (arguments[0]) {
						defer.reject(arguments[0]);
						return;
					}
					var result = {};
					if (resolveOne) {
						result = arguments[1];
					} else {
						for (var j = 0; j < components.length; j++) {
							result[components[j]] = arguments[j + 1];
						}
					}
					defer.resolve(result);
				});
				return defer.promise;
			};
		};
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = sandalPromise(require('q'));
	}
	if (typeof window !== 'undefined') {
		if (!window.Sandal) throw new Error('Sandal must be loaded before sandal-promise');
		window.Sandal.extend(sandalPromise(window.Q));
	}

})();
