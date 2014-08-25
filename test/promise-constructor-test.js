
var test = require("tape"),
	Sandal = require('sandal');

Sandal.extend(require('../sandal-promise.js'));
var sandal = new Sandal();

require('./test-container.js')(test, sandal);

test('Cleanup', function (t) {
	delete Sandal.prototype.promise;
	t.end();
});
