'user strict';
const connection = require('../../configurations/database.js');

//User object constructor
const User = function(user){
    this.respondent_id = user.respondent_id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
    this.user_role = user.user_role;
};

User.createUser = function createUser(newUser, result) {
    connection.query("INSERT INTO users set ?", [newUser], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

User.getUserById = function getUser(userId, result) {
    connection.query("Select * from users where id = ? ", [userId], function (err, res) {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
        }
        else{
            console.log("Model", res)
            result(null, res);
        }
    });
};



User.getAllUsers = function getAllUsers(result) {
    connection.query("Select * from users", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

User.updateEmailById = function updateEmail(id, user, result){
    connection.query("UPDATE users SET email = ? WHERE id = ?", [user.email, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

User.updateNameById = function updateName(id, user, result){

    connection.query("UPDATE users SET first_name, last_name = ?, ? WHERE id = ?", [user.first_name, user.last_name , id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

User.updateRoleById = function updateRole(id, user, result) {
    connection.query("UPDATE users SET user_type = ? WHERE id = ?", [user.user_role, id], function (err, res){

        if(err){
            console.log("error: ", err);
            result(null, err)
        }
        else{
            result(null, res)
        }
    });
};

User.removeUser = function removeUser(id, result){
    connection.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};



module.exports= User;