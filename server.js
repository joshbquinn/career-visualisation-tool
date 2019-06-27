/*Creating Express instance*/
const express = require('express');

/*Middleware modules imported*/
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');


const app = express();
const port = 8080;

const passport = require('passport');
const flash = require('connect-flash');

require('./app/middleware/passport')(passport);

/*Middleware stack that routes go through */
app.use(morgan('dev')); // For Dev purposes
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'justasecret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // flash messages used for login page


require('./app/routes/pageRoutes.js')(app, passport);
require('./app/routes/assessmentDataRoutes.js')(app, passport);
require('./app/routes/userRoutes')(app, passport);


app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

/*the port*/
app.listen(port);
console.log("Port: " + port);


