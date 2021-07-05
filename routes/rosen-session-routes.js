/*
Title: rosen-session-routes.js
Author: Travis rosen
Date: 07/04/2021
Description: USER API ROUTES
*/

//Require statements for express, USER, and bcrypt. 
const express = require('express');
const User = require('../models/rosen-user');
const bcrypt = require('bcrypt');
//Router function
const router = express.Router();

const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - Register User
 *     name: signup
 *     summary: Register user information
 *     requestBody:
 *       description: Registration information for new User
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - Password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: Username is already in use       
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/signup', async (req, res) => {
    //Wrapping the code in a try/catch block
    try {
        //findOne() function to query the users collection
        User.findOne({'userName': req.params.userName}, function(err, user) {
            //if-else block to checked returned value from query. 
            if(!User) {
                //Using bcrpyt package to hashSync the password. 
                const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
                //Object literal to map the values to the object properties 
                const newRegisteredUser = {
                    userName: req.body.userName,
                    password: req.body.userName,
                    emailAddress: req.body.emailAddress
                }
                //Responses:
                User.create(newRegisteredUser, function(err, user) {
                    if (err) {
                        console.log(err);
                        res.status(501).send({
                            'message': `MongoDB Exception: ${err}`
                        })
                    } else {
                        console.log(user);
                        res.json(user);
                    }
                })
            } else if(User) {
                res.status(401).send({
                    'message': `Username is already in use`
                })
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Log-in
 *     name: login
 *     summary: User log in with user information
 *     requestBody:
 *       description: Log in user
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *              userName:
 *                 type: string
 *              password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid userName and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/login', async(req,res) => {
    //Wrapping code in try/catch block
    try {
        //Using findOne with userName.
        User.findOne({'userName': req.params.userName}, function(err, user) {
            if(user) {
                //Checking if password is valid
                let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                //Responses
                if(passwordIsValid) {
                    console.log('Valid Password');
                    res.status(200).send({
                        'message': `User logged in`
                    })
                } else if(!user) {
                    console.log('Invalid Password');
                    res.status(401).send({
                        'message': `Invalid userName and/or password`
                    })
                }
            }
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(user)
            }
        })
    } catch(e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

module.exports = router;
    
       





