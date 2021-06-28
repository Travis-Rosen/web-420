/*
Title: Rosen-composer.js
Author: Travis rosen
Date: 06/19/2021
Description: Composer api
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let composerSchema = new Schema ({
    firstName: { type: String },
    lastName: { type: String },
});

module.exports = mongoose.model('Composer', composerSchema);