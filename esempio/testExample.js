var should = require("should");
var sum = require("./example");



describe('test', function () {
    	context("Sum", function () {
        	it('should return', function (done) {
				done();
			});
			it('should return 5', function (done) {
				sum(3, 2).should.be.equal(5);
				done();
			});
			it('should return 10', function (done) {
				sum(4, 6).should.be.equal(10);
				done();
			});
		});
});