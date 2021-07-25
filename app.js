/*
  Title: app.js
  Author: Professor Krasso
  Date: 06/02/2021
  Modified by: Travis Rosen
  Description: Assignment-1.2
*/

// Requirement statements. 
const express = require('express');
const http = require('http');
const swaggerUIExpress = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const composerAPI = require('./routes/rosen-composer-routes');
const personAPI = require('./routes/rosen-person-routes');
const userAPI = require('./routes/rosen-session-routes');
const customerAPI = require('./routes/rosen-node-shopper-routes');
const capstoneAPI = require('./routes/rosen-capstone-routes');


//Variable defined as express library.
let app = express();


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
app.use('/api', composerAPI);
app.use('/api', personAPI);
app.use('/api', userAPI);
app.use('/api', customerAPI);
app.use('/api', capstoneAPI);



//Create server and listen on port 3000.
http.listen(process.env.PORT || 3000, function() {
    console.log("Application started and listening on port 3000");
});