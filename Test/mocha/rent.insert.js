var supertest = require("supertest");
var should = require("should");

// Example:
// Common parameters: apiaddress="http://localhost:3000"
// Script usage: mocha api-builder/.generator/ecommerce/mocha/brand.js
// apiaddress="http://localhost:80" mocha mocha/rent.insert.js

var apiaddress = process.env.apiaddress;

var server = supertest.agent(apiaddress);

describe('Rents', function () {
    var access_token = null;

    // Get access_token

    	context("Insert rent", function () {
        	it('should return a rent object', function (done) {
			server
				.post("/rents")
				.send({
					"name": "Pippo", 
					"surname": "Franco", 
					"document_type": "CI", 
					"document_number": "AB123456", 
					"rent_start": "14:30", 
					"rent_end": "15:30", 
					"phone_number": "02123456"
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


