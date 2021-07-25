/*
Title: Rosen-capstone.js
Author: Travis rosen
Date: 06/25/2021
Description: Capstone API
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let playerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    salary: { type: Number }
});

let teamSchema = new Schema ({
    name: { type: String },
    mascot: { type: String },
    players: [playerSchema]
});

module.exports = mongoose.model('Team', teamSchema);
