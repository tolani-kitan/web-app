const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/dev');
const mailgun = require('mailgun-js');
const mg = mailgun({ apiKey: keys.mailgin_apikey, domain: keys.domain});
const User = mongoose.model('users');

//get user id for cookies to use
passport.serializeUser((user, done) => {
    done(null, user.id)
});


//get the user from the id generated above
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    });
});


//login with google oauth
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id });

        if(existingUser) {
            return done(null, existingUser);
        }

        const user = await new User({
            googleId: profile.id,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile._json.email,
            image: profile.photos.value,
        }).save();

        const data = {
            from: 'noreply@license.com',
            to: profile._json.email,
            subject: 'Registration Link',
            html: `
            <h2>Please click the link below to proceed with your registration</h2>
            
            <a href='${keys.clientURL1}/registration/${user._id}'>
                 click to proceed with registration
            </a>
            `    
        };

        mg.messages().send(data);

            done(null, user)
        }
    )
);