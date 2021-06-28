/*
Title: Rosen-person.js
Author: Travis rosen
Date: 06/27/2021
Description: Person API
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let roleSchema = new Schema ({
    text: { type: String },
});

let dependentSchema = new Schema ({
    firstName: { type: String },
    lastName: { type: String },
});

let personSchema = new Schema ({
    firstName: { type: String },
    lastName: { type: String },
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: { type: String },  
});

module.exports = mongoose.model('Person', personSchema);