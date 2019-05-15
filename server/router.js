const express = require("express");
const router = express.Router();

const models = require('./db/models');
const Users = models.users;
const Cities = models.cities;

// router
router
    .all("/auth/*", (req, res, next) => {
        if (!req.headers || !req.headers.username || !req.headers.password) {
            res.json({isConnected: false});
            return;
        }
        Users.findOne({username: req.headers.username, password: req.headers.password})
            .exec((err, data) => {
                if (err) console.log("error", err);
                else {
                    if (data) next();
                    else res.json({isConnected: false})
                }
            })
    })
    .get("auth/cities", (req, res) => {
        Cities
            .find({})
            .exec((err, data) => {
                if (err) console.log("error", err);
                else res.json(data);
            });
    })
    .post("/login", (req, res) => {
        if (!req.body.username || !req.body.password) {
            res.json({isConnected: false})
        } else {
            Users.findOne({username: req.body.username, password: req.body.password})
                .exec((err, data) => {
                    if (err) console.log("error", err);
                    else {
                        if (data) res.json({isConnected: true});
                        else res.json({isConnected: false})
                    }
                })
        }
    })
    .post("/signUp", (req, res) => {
        if (!req.body.username || !req.body.password) {
            res.json({isConnected: false})
        } else {
            Users.findOne({username: req.body.username})
                .exec((err, data) => {
                    if (err) console.log("error", err);
                    else {
                        if (data) res.json({isConnected: false});
                        else {
                            const q = new Users({username: req.body.username, password: req.body.password});
                            q.save()
                                .then(() => res.json({isConnected: true}))
                                .catch(err => res.status(400).send("unable to save to database:", err))
                        }
                    }
                })
        }
    })
    .use((req, res) => {
        res.status(400);
        res.json({
            error: "Bad request"
        });
    });


module.exports = router;
