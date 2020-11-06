const mongoose = require('mongoose');
const User = require('../models/User');

exports.updateProfile = (async (req, res) => {
    const { first_name, last_name, date_of_birth, sex, state_of_origin, occupation, residential_address } = req.body;

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!user) {
        return res.status(400).json({ msg: "User does not exists"});
    }

    res.status(200).json({  
        data: user
    })
    
});

exports.getLoggedInUser = (async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});