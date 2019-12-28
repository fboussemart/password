const express = require("express");
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/data');

const jwt = require('jsonwebtoken');

// vérifier l'existence du user et la validité du password.
// si ok => next
// sinon : retourner un code d'erreur au client
function checkUserPassword(user, res, next) {
    console.log("... recherche name=", user.username, " password=", user.password);
    db.get(
        'select 1 from user where username=? and password=?',
        [user.username, user.password],
        (err, row) => {
            console.log('check database');
            if (err) {
                console.log("err : ", err);
                res.status(500).end();
            } else {
                console.log('check : ', row);
                if (row) {
                    console.log('check ok : ', row);
                    next();
                } else {
                    console.log('user unknown');
                    res.status(422).end();
                }
            }
        }
    );
}

// vérifier que le body est bien formé lors de l'envoi d'un formulaire POST
function checkBodyUser(req, res, next) {
    console.log("checkBodyUser....");
    if (!req.body || !req.body.username || !req.body.password) {
        console.log("...body incorrect : ", req.body);
        res.status(422).end()
    } else {
        next()
    }
}

// contruire et envoyer un token au client à partir du nom, du password et du mot secret
function sendToken(req, res) {
    const user = req.body;
    const token = jwt.sign({
        username: user.username,
        password: user.password
    }, 'secret', {expiresIn: '1h'});
    console.log("send token", token);
    res.status(200).json({'token': token});
}

// vérifier l'authenticité du l'entête pour tout accès sécurisé à l'API
// si entête valide (jeton dans req.headers.authorization) => vérification du user dans la BD
// si tout est ok => next
// sinon : retourner un code d'erreur au client
function verify(req, res, next) {
    if (!req.headers || !req.headers.authorization) {
        console.log('header non conforme :', req.headers);
        res.status(401).end();
        return;
    }
    const auth = req.headers.authorization.split(' ');
    if (auth.length !== 2 || auth[0] !== 'Bearer') {
        console.log('headers.authorization non conforme : ', auth);
        res.status(401).end();
        return;
    }

    jwt.verify(auth[1], 'secret',
        (err) => {
            if (err) {
                console.log('token err : ', err);
                console.log('bad token = ', auth);
                res.status(401).end();
                return;
            }
            const decoded = jwt.decode(auth[1]);
            console.log('token ok : ', decoded);
            checkUserPassword(decoded, res, next);
        })
}

// les routes valides du server
router
    .get("/cities", verify, (req, res) => {
        db.all('select * from city',
            (err, rows) => {
                if (err) {
                    console.log("err : ", err);
                    res.status(500).end();
                }else{
                    res.status(200).json(rows);
                }
            }
        );
        //res.json({test: 'test OK'});
    })
    .post("/signin", checkBodyUser, (req, res, next) => {
        checkUserPassword(req.body, res, next)
    }, sendToken)
    .post("/signUp", checkBodyUser, (req, res) => {
        console.log("signup....");
        db.get(
            'select 1 from user where username=?', req.body.username,
            (err, row) => {
                if (err) {
                    console.log("err : ", err);
                    res.status(500).end();
                } else {
                    if (row) {
                        console.log("déja connu : ", row);
                        res.status(403).end();
                    } else {
                        console.log("ok pour création : ", req.body.username);
                        db.run('insert into user(username,password) values(?,?)', [req.body.username, req.body.password],
                            (err) => {
                                if (err) {
                                    console.log("err :: ", err);
                                    res.status(500).end();
                                } else {
                                    console.log("created : ", req.body.username);
                                    res.status(201).end();
                                }
                            }
                        );
                    }
                }

            }
        )
    })



    // .get("/cities", verify, (req, res) => {
    //     Cities
    //         .find({})
    //         .exec((err, data) => {
    //             if (err) {
    //                 console.log("error", err);
    //             } else {
    //                 res.json(data);
    //             }
    //         });
    // })
    // .post("/login", (req, res) => {
    //     if (!req.body.username || !req.body.password) {
    //         res.json({isConnected: false})
    //     } else {
    //         Users.findOne({username: req.body.username, password: req.body.password})
    //             .exec((err, data) => {
    //                 if (err) console.log("error", err);
    //                 else {
    //                     if (data) res.json({isConnected: true});
    //                     else res.json({isConnected: false})
    //                 }
    //             })
    //     }
    // })
    // .post("/signUp", (req, res) => {
    //     if (!req.body.username || !req.body.password) {
    //         res.json({isConnected: false})
    //     } else {
    //         Users.findOne({username: req.body.username})
    //             .exec((err, data) => {
    //                 if (err) console.log("error", err);
    //                 else {
    //                     if (data) res.json({isConnected: false});
    //                     else {
    //                         const q = new Users({username: req.body.username, password: req.body.password});
    //                         q.save()
    //                             .then(() => res.json({isConnected: true}))
    //                             .catch(err => res.status(400).send("unable to save to database:", err))
    //                     }
    //                 }
    //             })
    //     }
    // })
    .use((req, res) => {
        console.log("bad request:", req.method, req.path);
        res
            .status(400)
            .json({
                error: "Bad request"
            });
    });


module.exports = router;
