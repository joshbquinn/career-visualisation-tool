const session = require('../utilities/setSession.js');
const check = require('../utilities/loginCheck.js');
const role = require('../utilities/roleCheck.js');
const score = require('./../controllers/assessmentController.js');
const users = require('./../controllers/userController.js');
const respondent = require('./../controllers/respondentController.js');

module.exports = function(app, passport) {

    // Index Page
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });


    // Login Page
    app.get('/login', function (req, res) {
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });


    // Login
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }),
        function (req, res) {
        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    });


    // Registration Page (Not Used)
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });


    // Registration (Not Used)
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRedirect: '/signup',
            failureFlash: true
        }
    ));


    /*
        // Not working
        //REDIRECT TO PAGES BASED ON ROLE
        app.get('/roleRedirect', check.isLoggedIn, role.roleRedirect);


    */


    // Admin Page
    app.get('/admin', check.isLoggedIn, role.adminCheck, function(req, res){
        res.render('admin.ejs', {user:req.user})
    });




    // Manager Page
    app.get('/manager',
        check.isLoggedIn,
        role.managerCheck,
        users.list_all_users);



    // Logged in User Profile Page
    app.get('/profile', check.isLoggedIn, function (req, res) {
        let respondent_id = req.user.user_respondent_id;
        let user = req.user;
        score.get_user_scores(respondent_id, function (score) {
            res.status(200).render('profile.ejs', {user , score})

        })
    });



    // Respondent Profile Page with Parameters (Manager View)
    app.get('/user/:respondent', check.isLoggedIn, role.managerCheck, function(req, res){
        respondent.get_a_respondent_profile(req.params.respondent, function(aRespondent){
            const respondent = aRespondent.pop();
            score.get_user_scores(req.params.respondent, function (score) {
                res.status(200).render('respondent.ejs', {respondent, score, user: req.user})
            })
        });
    });


    // Logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

