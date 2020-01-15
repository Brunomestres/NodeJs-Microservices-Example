const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

var server = null;

function start(api , repository, cb)
{
    const app = express();
    app.use(morgan('dev'));
    app.use(helmet());
    app.use((err, req, res ,next)=>{
        cb( new Error('Something went wrong!, err: ' + err),
        null);
        res.status(500).send('Something went wrong');
    });

    api(app,repository);

    server = app.listen(parseInt(process.env.PORT),() =>
        cb(null,server));
}

function stop()
{
    if(server) server.close();
    return true;
}

module.exports = { 
    start,
    stop
}