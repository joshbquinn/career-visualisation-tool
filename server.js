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
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'justasecret',
    resave:true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./app/routes/routes.js')(app, passport);
require('./app/routes/assessmentRoute.js')(app, passport);
require('./app/routes/userRoute')(app, passport);


app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

/*the port*/
app.listen(port);
console.log("Port: " + port);


