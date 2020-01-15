const mongoClient = require('mongodb').MongoClient;
var connection = null;
var db = null;

function connect(cb)
{
    if(connection) return cb(null,db);
    mongoClient.connect(process.env.MONGO_CONNECTION,{useUnifiedTopology: true},(err,conn)=>{
        if(err) return cb(err,null)
        else{
            connection = conn;
            db = conn.db(process.env.DATABASE_NAME);
            return cb(null,db)
        }
    })
}

function disconnect()
{
    if(!connection) return true;
    connection.close();
    connection = null;
    return true;
}

module.exports ={
    connect,
    disconnect
}