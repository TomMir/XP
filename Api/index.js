var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
console.log("request");
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.set("Content-Type", "application/json");

        if(req.method == "OPTIONS") {
                res.set("Access-Control-Allow-Methods", "POST, PUT, DELETE");
                res.set("Access-Control-Allow-Headers", "Content-Type");
                return res.sendStatus(200);
        }

        next();
});

var mongodb_url = "mongodb://localhost:27017/xp";

// rents
app.get('/rents', function (req, res, next) {
	var db = null;

	MongoClient.connect(mongodb_url, function(err, mdb) {
		if(err) return next();
		db = mdb;

		var data = [];

                db.collection('rents').find()
                        .forEach(function(d) {
                                data.push(d);
                        }, function(err) {
                                db.close();
                                if(err || data.length == 0) return next();

                                res.send({data: data});
                        });
	});
});

app.post('/rents', function (req, res, next) {
	var db = null;

	var rent = req.body;

	MongoClient.connect(mongodb_url, function(err, mdb) {
		if(err) return next();
		db = mdb;

                db.collection('rents').insertOne(rent, function(err, d) {
			db.close();

			if(err) return next();
			rent._id = d.insertedId;
	
			res.send({data: rent});
		}); 
	});
});

// bikes
app.get('/bikes', function (req, res, next) {
	var db = null;

	MongoClient.connect(mongodb_url, function(err, mdb) {
		if(err) return next();
		db = mdb;

		var data = [];

                db.collection('bikes').find()
                        .forEach(function(d) {
                                data.push(d);
                        }, function(err) {
                                db.close();
                                if(err || data.length == 0) return next();

                                res.send({data: data});
                        });
	});
});

app.get('/bikes/:id', function (req, res, next) {
	var db = null;

	var id = req.params.id;

	MongoClient.connect(mongodb_url, function(err, mdb) {
		if(err) return next();
		db = mdb;

		var data = [];

                db.collection('bikes').find({_id: ObjectID(id)}).next(function(err, d) {
			db.close();

			if(err) return next();

			res.send({data: d});
		}); 
	});
});

app.post('/bikes', function (req, res, next) {
	var db = null;

	var bike = req.body;

	MongoClient.connect(mongodb_url, function(err, mdb) {
		if(err) return next();
		db = mdb;

                db.collection('bikes').insertOne(bike, function(err, d) {
			db.close();

			if(err) return next();
			bike._id = d.insertedId;
	
			res.send({data: bike});
		}); 
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
