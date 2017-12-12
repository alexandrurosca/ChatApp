var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


exports.addUser = function (obj, callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("users").insertOne(obj, function (err, res) {
            if (err) throw err;
            console.log("one user  inserted ");
            db.close();
            callback();
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
            callback(foundUser, result);
        });
    });
}

exports.findUser = function(username,password, callback ){
    var foundUser = false;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { username: username, password: password};
        db.collection("users").find(query, { _id: false, password: false, CNP: false}).toArray(function(err, result) {
            console.log(result);
            if (err) throw err;
            foundUser = ((result.length != 0) ? true : false);
            db.close();
            //asda
            callback(foundUser, result[0]);
        });
    });
}

exports.findCNP= function(cnp, callback ){
    var foundUser = false;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { cnp: cnp};
        db.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;
            foundUser = ((result.length != 0) ? true : false);
            db.close();
            callback(foundUser);
        });
    });
}



exports.addUser = function (obj, callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("users").insertOne(obj, function (err, res) {
            if (err) throw err;
            console.log("one user  inserted ");
            db.close();
            callback();
        });
    });

}


exports.findFriends= function(username, callback ){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("users").findOne({username: username}, function(err, result) {
            if (err) throw err;
            db.close();
            callback(result.friends);
        });
    });
}
exports.addFriend = function (username,friend, callback) {
    var modified = false;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("users").updateOne({username: username},{$addToSet: {friends: friend}},function (err, res) {
            if (err) throw err;
            modified = ((res.result.nModified == 0) ? false : true);
            db.close();
            callback(modified);
        })
    });
}
exports.deleteFriend = function (username, friend, callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("users").updateOne({username: username},{$pull: {friends: friend}},function (err) {
            if (err) throw err;
            db.close();
            callback();
        })
    });
}





