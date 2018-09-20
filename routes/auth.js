var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/* GET home page. */
router.post('/signup', function (req, res, next) {
    let {username, password} = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(400).json({status: 'failure', errors: ['Error occured']});
        password = hash;
        const user = new User({username: username, password: password});
        user.save();
        let token = jwt.sign({id: user.id}, 'UNIVERSAL');
        res.status(200).send({token});
    });
});

router.post('/login', (req, res) => {
    let {username, password} = req.body;
    User.findOne({username: username}, (err, user) => {
        if (err) return res.status(400).json({status: 'failure', errors: ['Error occurred']});
        if (user) {
            bcrypt.compare(password, user.password, function (err1, result) {
                if (err) return res.status(400).json({status: 'failure', errors: ['Error occcurred']});
                if (result) {
                    let token = jwt.sign({id: user.id}, 'UNIVERSAL');
                    res.status(200).send({token});
                } else {
                    res.status(401).json({status: 'failure', errors: ['Invalid credentials']});
                }
            })
        } else {
            res.status(401).json({status: 'failure', errors: ['Invalid crendentials']});
        }
    })
});


module.exports = router;
