var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function helloRoute() {
    var hello = new express.Router();
    hello.use(cors());
    hello.use(bodyParser());

    // GET REST endpoint - query params may or may not be populated
    hello.get('/', function (req, res) {
        console.log(new Date(), 'MBAAS called');
        console.log(new Date(), 'In hello route GET of MBaas / req.query=', req.query);
        var name = req.query && req.query.hello ? req.query.hello : 'World';

        res.json({msg: 'Hello world : ' + name, timestamp: +new Date().getTime()});
    });

    // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
    // This can also be added in application.js
    // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
    hello.post('/', function (req, res) {
        console.log(new Date(), 'MBAAS called');
        console.log(new Date(), 'In hello route POST / req.body=', req.body);
        var name = req.body && req.body.hello ? req.body.hello : 'World';

        // see http://expressjs.com/4x/api.html#res.json
        res.json({msg: 'Hello world : ' + name, timestamp: +new Date().getTime()});
    });

    return hello;
}

module.exports = helloRoute;
