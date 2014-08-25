module.exports = function (test, sandal) {

	test('Register some components', function (t) {
		sandal
			.object('a', { data: 'data' })
			.factory('b', function (a) { return 'b' + a.data; })
			.factory('err', function(done) { done(new Error('Some error')); })
			.object('c', 'c object');
		t.end();
	});

	test('Resolve one with promise', function (t) {
		sandal.promise('c').then(function (c) {
			t.equal(c, 'c object', 'should get the dependency');
			t.end();
		});
	});

	test('Resolve many with promise', function (t) {
		sandal.promise('c', 'b').then(function (result) {
			var expected = [
				'c object',
				'bdata'
			];
			t.deepEqual(result, expected, 'should get all dependencies as object');
			t.end();
		});
	});

	test('Resolve many with promise and spread', function (t) {
		sandal.promise('c', 'b').spread(function (c, b) {
			t.equal(c, 'c object', 'should spread results');
			t.equal(b, 'bdata', 'should spread results');
			t.end();
		});
	});

	test('Promise one with error', function (t) {
		t.plan(1);
		sandal.promise('err').then(
			function () {
				t.fail('Should not resolve');
			},
			function (err) {
				t.equal(err.message, 'Some error', 'should reject the promise');
			});
	});

	test('Promise many with error', function (t) {
		t.plan(1);
		sandal.promise('a', 'err').then(
			function () {
				t.fail('Should not resolve');
			},
			function (err) {
				t.equal(err.message, 'Some error', 'should reject the promise');
			});
	});

	test('Promise one non existing', function (t) {
		t.plan(1);
		sandal.promise('d').then(
			function () {
				t.fail('Should not resolve');
			},
			function (err) {
				t.ok(err, 'should reject the promise');
			});
	});

	test('Promise one of many non existing', function (t) {
		t.plan(1);
		sandal.promise('a', 'd').then(
			function () {
				t.fail('Should not resolve');
			},
			function (err) {
				t.ok(err, 'should reject the promise');
			});
	});

};