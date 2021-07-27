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
 *       - Users
 *     name: Signup
 *     summary: Register a new user
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User added to MongoDB
 *       '401':
 *         description: Username already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/signup', async(req, res) => {
    try {
        User.findOne({'userName': req.body.userName}, function(err, user) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {

                /**
                 * If returned user object is empty, then requested username is not in use and we should proceed with
                 * adding them to the database.
                 */
                if (!user) {
                    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password

                    const newRegisteredUser = {
                        userName: req.body.userName,
                        password: hashedPassword,
                        emailAddress: req.body.emailAddress
                    };

                    User.create(newRegisteredUser, function(err, registeredUser) {
                        if (err) {
                            console.log(err);
                            res.status(501).send({
                                'message': `MongoDB Exception: ${err}`
                            })
                        } else {
                            console.log(registeredUser);
                            res.json(registeredUser);
                        }
                    })
                } else {
                    /**
                     * Otherwise, the username is already in use
                     */
                    console.log(`Username: ${req.body.userName} is already in use, please try again.`)
                    res.status(401).send({
                        'message': `Username: ${req.body.username} is already in use, please try again.`
                    })
                }
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
 *       - Users
 *     name: login
 *     summary: User login
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/login', async(req, res) => {
    try {
        User.findOne({'userName': req.body.userName}, function(err, user) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(user);

                /**
                 * If returned user object is not empty, then requested password will be compared against the body password
                 */
                if (user) {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                    /**
                     * If the password is valid, allow the user to login
                     */
                    if (passwordIsValid) {
                        res.status(200).send({
                            'message': 'User logged in'
                        })
                    } else {
                        console.log(`The supplied password for username: ${req.body.userName} is incorrect.`)
                        res.status(401).send({
                            'message': `The supplied password for username: ${req.body.userName} is incorrect.`
                        })
                    }
                } else {
                    console.log(`Invalid username`);
                    res.status(401).send({
                        'message': `The supplied username: ${req.body.userName} is incorrect.`
                    })
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

module.exports = router;
    
       





