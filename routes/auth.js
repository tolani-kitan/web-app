const passport = require('passport');


module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/info')
    });

    app.get('/api/logout', (req,res) => {
        req.logout();
        res.redirect('/');
    })

    app.get('5f53ab5bfaff610334f2d5e2', (req, res) => {
        res.send(req.user);
    });
    
}