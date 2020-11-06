const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

exports.register = ([
    check('first_name', "Enter your first name").not().isEmpty(),
    check('last_name', "Enter your last name").not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password should not be empty, minimum six characters, at least one letter and one special character')
        .exists()
        .isLength({ min: 6 })
        .matches(/^(?=.*[!@#$%^&*])[a-zA-Z!@#$%^&*]{6,}$/, "i")
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { first_name, last_name, email, password } = req.body;

    try {

        let user = User.findOne({ email }).exec(async (err, user) => {
            if(user) {
                return  res.status(400).json({ msg: "User already exists"});
              }

              
        user = new User({ first_name, last_name, email, password });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.jwtSecret, {
            expiresIn: 360000 }, (err, token) => {
                if(err) throw err;
                res.json({ 
                    data: user, token });
            });
        })
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

exports.login = ([
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ msg: "User does not exists"});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ msg: "Wrong Password"});
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.jwtSecret, {
            expiresIn: 360000 }, (err, token) => {
                if(err) throw err;
                res.json({ 
                    data: user, token });
            });

    } catch (err) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


