const mongodb = require('../config/mongodb');

function getAllMovies(cb)
{
    mongodb.connect((err,db)=>{
        db.collection("movies").find().toArray(cb);
    });
}

function getMovieById(id,cb)
{
    mongodb.connect((err,db)=>{
        db.collection("movies").findOne({ _id:require('mongodb').ObjectId(id)},cb);
    });
}

function getMoviesPremiers(cb)
{
    var monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth()-1);
    monthAgo.setHours(0,0,0);
    monthAgo.setMilliseconds(0);
    
    mongodb.connect((err,db)=>{
        db.collection("movies").find({
            dataLancamento:{ $gte: monthAgo}
        }).toArray(cb);
    });
}

function disconnect()
{
    return mongodb.disconnect();
}

module.exports = {
    getAllMovies,
    getMovieById,
    getMoviesPremiers,
    disconnect
}