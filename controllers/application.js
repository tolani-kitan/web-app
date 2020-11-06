const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const User = require('../models/User');
 

 exports.newApp = (async (req, res) => {
 
     const { application_type, test_score, state, renewal_type, residential_address } = req.body;
 
     try {
         const newApplication = new Application({
            application_type, test_score, state, renewal_type, residential_address, user: req.user.id
         });
 
         const application = await newApplication.save();
         res.json(application);
     } catch (error) {
         console.error(error.message);
         res.status(500).send("Server Error");
     }
 });