'use strict';

const User = require('../models/userModel.js');


exports.create_a_user = function(req, res) {
    var new_user = new User(req.body);

    //handles null error
    if(!new_user.respondent_id || !new_user.email || !new_user.password){

        res.status(400).send({ error:true, message: 'Please provide all user details' });

    }
    else{

        User.createUser(new_user, function(err, user) {

            if (err)
                res.send(err);
            res.json(user);
        });
    }
};


exports.delete_a_user = function(req, res) {
    User.removeUser(req.params.userID, function(err) {
        if (err)
            res.send(err);

        res.redirect('/manager');
    })
};

exports.read_a_user = function(req, res) {
    User.getUserById(req.params.userId, function(err, user) {
        let respondent = user.pop();
        if (err) {
            res.send(err);
        }
        else {
            res.render('administration.ejs', {respondent});
        }
    });
};



exports.list_all_users = function(req, res) {
    User.getAllUsers(function(err, employees) {
        console.log('get all users controller');
        if (err) {
            res.send(err);
        }
        else
            console.log('Response Successful');
        res.render('manager.ejs', {user:req.user, data: employees});
    });
};


exports.update_user_email = function(req, res) {
    User.updateEmailById(req.params.userId, req.user, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.update_user_name = function(req, res) {
    User.updateNameById(req.params.userId, req.user, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.update_user_role = function(req, res) {
    User.updateRoleById(req.params.userId, req.user, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

