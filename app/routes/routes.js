const session = require('../utilities/setSession.js');
const check = require('../utilities/loginCheck.js');
const role = require('../utilities/roleCheck.js');
const score = require('./../controllers/assessmentController.js');
const users = require('./../controllers/userController.js');
const respodnent = require('./../controllers/respondentController.js');

module.exports = function(app, passport) {

    //INDEX PAGE
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });


    //LOGIN PAGE
    app.get('/login', function (req, res) {
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });


    //LOGIN
    app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true
        }),
        session.set);


    //REGISTRATION PAGE
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });


    //REGISTRATION
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRedirect: '/signup',
            failureFlash: true
        }
    ));


    /*

        //REDIRECT TO PAGES BASED ON ROLE
        app.get('/roleRedirect', check.isLoggedIn, role.roleRedirect);


    */


    //ADMIN PAGE
    app.get('/admin', check.isLoggedIn, role.adminCheck, function(req, res){
        res.render('admin.ejs', {user:req.user})
    });




    //MANAGER PAGE
    app.get('/manager', check.isLoggedIn, role.managerCheck, users.list_all_users, function (req, res) {
        res.render('manager.ejs',{user:req.user})
    });




    //PROFILE PAGE
    app.get('/profile', check.isLoggedIn, function (req, res) {
        let respondent_id = req.user.user_respondent_id;
        let user = req.user;
        score.get_user_scores(respondent_id, function (score) {
            res.status(200).render('profile.ejs', {user , score})

        })
    });



    //PROFILE w/ PARAMS (Manager View)
    app.get('/user/:respondent', check.isLoggedIn, role.managerCheck, function(req, res){
        respodnent.get_a_respondent_profile(req.params.respondent, function(user){
            let respondent = user.pop();
            score.get_user_scores(req.params.respondent, function (score) {
                res.status(200).render('user.ejs', {respondent, score, user: req.user})
            })
        });
    });


    //LOGOUT
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

