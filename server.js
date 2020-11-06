const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/dev');
const connectDb = require('./config/db');
const userRoute = require('./routes/user');
const applicationRoute = require('./routes/application');
const cors = require('cors');
const morgan = require('morgan');
require('./models/User');
require('./services/passport');

const app = express();

connectDb();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

//initiate the cookie
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //lasts for 30days
    keys: [keys.cookieKey]
}));

app.get('/', (req, res) => {
    res.send({
        msg: "Hello there!!"
    })
});

app.use(passport.initialize());
app.use(passport.session());

//Routes
require('./routes/auth')(app);
app.use('/api', userRoute);
app.use('/api', applicationRoute);


const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));