var should = require("should");
var costoOra = require("../js/script");



describe('test', function () {
    	context("testPrice", function () {
        	it('should return', function (done) {
				done();
			});
			it('should return 3', function (done) {
				costoOra().should.be.equal(3);
				done();
			});
		});
});