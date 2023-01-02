const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const User = require("../model/user");


router.post("/api/signup", async(req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(existingEmp => {
            if (existingEmp == null) {
                // const salt = await bcrypt.genSalt(10);
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        });

                        user.save()
                            .then(result => {
                                return res.send({ error: "User created" })
                            })
                    });
            } else {
                // let error = { email: 'User already exist' };
                return res.send({ error: "User exist" })
            }
        })
})

router.post("/api/login", async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    console.log(user)
    if (!user) {
        return res.send({ error: "User Not Found" })
    }
    console.log('checking password')
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass)
        return res.send({ error: "Not a valid password" })
    else {
        const token = jwt.sign({
                email: user.email,
                userId: user._id
            },
            "my_app_going_pretty_well", {
                expiresIn: "1h"
            }
        );
        res.status(200).json({
            token: token,
            expiresIn: 3600
        });
    }
});



module.exports = router;