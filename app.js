/*
  Title: app.js
  Author: Professor Krasso
  Date: 06/02/2021
  Modified by: Travis Rosen
  Description: Assignment-1.2
*/

// Requirement statements. 
var express = require('express');
var http = require('http');
var swaggerUIExpress = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');
var mongoose = require("mongoose");

var routes = require('./routes/rosen-composer-routes');

//Variable defined as express library.
var app = express();

//Setting the port.
app.set("port", process.env.PORT || 3000)

//App will use express.json
app.use(express.json());

//App will use express.urlencoded
app.use(express.urlencoded({extended: true}));
//Mongoose Connection
const mongoDB = "mongodb+srv://tmrosen:tmrosen@buwebdev-cluster-1.azoni.mongodb.net/test";
mongoose.connect(mongoDB, {
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection Error: "));
db.once("open", function() {
    console.log("Application connected to MongoDB");
});


//Define options with properties/values. 
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0', 
        },
    }, 
    apis: ['./routes/*.js'], //files containing annotations for openAPI specifications. 
};

const openAPISpecification = swaggerJSDoc(options);

app.use('/api-docs', swaggerUIExpress.serve, swaggerUIExpress.setup(openAPISpecification));

//Create server and listen on port 3000.
http.createServer(app).listen(app.get("port"), function() {
    console.log('Application started and listening on port %s', + app.get("port"))
});