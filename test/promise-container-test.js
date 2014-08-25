
var test = require("tape"),
	Sandal = require('sandal'),
	sandal = new Sandal();;

test('Extend container', function (t) {
	t.notOk(sandal.promise, 'should not have an promise fcn');
	sandal.extend(require('../index.js'));
	t.end();
});

require('./test-container.js')(test, sandal);
