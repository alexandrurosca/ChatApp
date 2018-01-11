var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

//conversation
exports.addConversation = function (obj, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("conversation").insertOne(obj, function (err, res) {
            if (err) throw err;
            db.close();
            callback();
        });
    });
};
exports.findConversationsByRoom = function(room, callback ){
    var foundConversation = false;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { room: room};
        db.collection("conversation").find(query,{ _id: false, room: false}).toArray(function(err, result) {
            if (err) throw err;
            foundConversation = ((result.length != 0) ? true : false);
            //console.log(result);
            db.close();
            callback(foundConversation, result);
        });
    });
};


//users
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

};

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
};

exports.findUser = function(username,password, callback ){
    var foundUser = false;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { username: username, password: password};
        db.collection("users").find(query, { _id: false, password: false, CNP: false,img: false}).toArray(function(err, result) {
            //console.log(result);
            if (err) throw err;
            foundUser = ((result.length != 0) ? true : false);
            db.close();
            //asda
            callback(foundUser, result[0]);
        });
    });
};


exports.findAllUsers = function( callback ){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("users").find({},{ _id: false, password: false, CNP: false, friends: false, lastName: false, name:false, img:false}).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            callback(result);
        });
    });
};


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
};



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

};


exports.findFriends= function(username, callback ){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("users").findOne({username: username}, function(err, result) {
            if (err) throw err;
            db.close();
            callback(result.friends);
        });
    });
};
exports.addFriend = function (username,friend, callback) {
    var modified;
    var foundUser;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var query = { username: friend };
        db.collection("users").find(query).toArray(function (err, result) {
            if (err) throw err;
            foundUser = ((result.length != 0) ? true : false);
            if(foundUser){
                db.collection("users").updateOne({username: username},{$addToSet: {friends: friend}},function (err, res) {
                    if (err) throw err;
                    modified = ((res.result.nModified == 0) ? false : true);
                    db.close();
                    callback(modified);
                 });
            }else{
                db.close();
                callback(false);
            }

        });
    });

};
exports.deleteFriend = function (username, friend, callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("users").updateOne({username: username},{$pull: {friends: friend}},function (err) {
            if (err) throw err;
            else{
                db.collection("users").updateOne({username: friend},{$pull: {friends: username}},function (err) {
                    if (err) throw err;
                    callback();
                })
            }
            db.close();
            callback();
        })
    });
};

exports.deleteUser = function (username, callback) {
var modified = false;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { username: username };
        db.collection("users").deleteOne(query, function(err, obj) {
            if (err) throw err;
            if (obj.result.n != 0){
                modified = true;
                //TODO: delete user from client's list of friends
                db.collection("users").find({},{ _id: false, password: false, CNP: false, friends: false, lastName: false, name:false, img: false}).toArray(function(err, users) {
                    if (err) throw err;
                    db.close();
                    users.forEach(function (user, index) {
                        db.collection("users").updateOne({username: user},{$pull: {friends: username}},function (err) {
                            if (err) throw err;
                            db.close();
                            callback();
                        })
                    })
                });

            }
            db.close();
            callback(modified);
        });
    });
};

//pictures
exports.uploadPhoto = function (newItem, callback) {
    var modified = false;
    MongoClient.connect(url, function(err, db){
        db.collection('yourcollectionname').insertOne(newItem, function(err, result){
                if (err) { console.log(err); };
                if(result.insertedCount == 1){
                    modified = true;
                }
               db.close();
               callback(modified);
            });
    });
}

exports.findPhoto= function(username, callback ){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("users").findOne({username: username}, function(err, result) {
            if (err) throw err;
            db.close();
            callback(result);
        });
    });
};

exports.findPhotoTest= function(username, callback ){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("yourcollectionname").findOne({}, function(err, result) {
            if (err) throw err;
            db.close();
            callback(result);
        });
    });
};

//CNP verify
/*
exports.insertCNP = function () {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var myobj = [
            { name: 'Alexandru', lastName: 'Rosca',CNP: '123456'},
            { name: 'Bianca', lastName: 'Bianca',CNP: '612345'},
            { name: 'Cosmin', lastName: 'Nechifor',CNP: '561234'},
            { name: 'Mihai', lastName: 'Visovan',CNP: '456123'}
        ];
        db.collection("customers").insertMany(myobj, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    });
}
*/

exports.checkCNP = function (name, lastName, cnp, callback) {
    var ok = false;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var query = { name: name, lastName: lastName,CNP: cnp};
        console.log(query);
        db.collection("customers").find(query).toArray(function(err, result) {
            if (err) throw err;
            if(result.length == 1){
                ok = true;
            }
            db.close();
            callback(ok);
        });
    });
}


