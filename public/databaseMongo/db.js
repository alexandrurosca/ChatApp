var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


exports.addUser = function (obj, callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("users").insertOne(obj, function (err, res) {
            if (err) throw err;
            console.log("one user  inserted ", res);
            db.close();
        });
    });
}

exports.findUsername = function(username, callback ){
    var foundUser = false;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { username: username };
        db.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            foundUser = ((result.length != 0) ? true : false);
            db.close();
            callback(foundUser);
        });
    });
}

exports.findUser = function(username,password, callback ){
    var foundUser = false;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { username: username, password: password};
        db.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            foundUser = ((result.length != 0) ? true : false);
            db.close();
            callback(foundUser);
        });
    });
}



