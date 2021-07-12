/*
Title: Rosen-customer.js
Author: Travis rosen
Date: 07/09/2021
Description: Customer API
*/

//Require statements for mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Line Item Schema with fields.
let lineItemSchema = new Schema ({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
})
//Invoice schema with fields
let invoiceSchema = new Schema ({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema],
})
//Customer schema with fields
let customerSchema = new Schema ({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema],
})
//Exporting the model as 'Customer'
module.exports = mongoose.model('Customer', customerSchema);