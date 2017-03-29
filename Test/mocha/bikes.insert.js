var supertest = require("supertest");
var should = require("should");

// Example:
// Common parameters: apiaddress="http://localhost:3000"
// Script usage: mocha api-builder/.generator/ecommerce/mocha/brand.js
// apiaddress="http://localhost:3000" mocha mocha/bikes.insert.js

var apiaddress = process.env.apiaddress;

var server = supertest.agent(apiaddress);

describe(`Bikes`, function () {
    var access_token = null;

    // Get access_token

    	context("Insert bike", function () {
        	it(`should return a bike object`, function (done) {
			server
				.post("/bikes")
				.send({
					 "name": "name2",
					 "type": "Graziellas",
				})
				.expect("Content-type", /json/)
				.expect(200)
				.end(function (err, res) {
				 	if (err) throw err;

				 	res.body.data.should.have.property("_id");

				 	done();
				});
		});
     	});
});
