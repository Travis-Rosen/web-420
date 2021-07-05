/*
Title: Rosen-user.js
Author: Travis rosen
Date: 07/4/2021
Description: User API
*/

//Require statements for mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Creating schema with fields
let userSchema = new Schema ({
    userName: { type: String },
    Password: { type: String },
    emailAddress: { type: Array },
});
//Exporting model
module.exports = mongoose.model('User', userSchema);
