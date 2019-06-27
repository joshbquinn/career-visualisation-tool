const user = require('../controllers/userController.js');
const respondent = require('./../controllers/respondentController.js');
const check = require('../utilities/loginCheck.js');
const role = require('../utilities/roleCheck.js');

module.exports = function(app){

    app.route('/user', check.isLoggedIn)
        .get(user.list_all_users);

    app.get('/user/edit/:userId', check.isLoggedIn, role.adminCheck, user.read_a_user);

        // .get(user.read_a_user)
        // .post(user.create_a_user)
        // .delete(user.delete_a_user);

    app.route('/user/delete/:userID', check.isLoggedIn, role.adminCheck)
        .post(user.delete_a_user);



    app.route('/userEmail/:userId', check.isLoggedIn, role.adminCheck)
        .put(user.update_user_email);



    app.route('/userName/:userId', check.isLoggedIn, role.adminCheck )
        .put(user.update_user_name);



    app.route('/userRole/:userId', check.isLoggedIn, role.adminCheck)
        .put(user.update_user_role);



    app.route('/userScore/:userId', check.isLoggedIn, role.adminCheck)
        .put(respondent.update_respondent_score);



    app.route('/userCareerLevel/:userId', check.isLoggedIn, role.adminCheck)
        .put(respondent.update_respondent_career_level);



    app.route('/userScores', check.isLoggedIn, role.adminCheck)
        .put(respondent.update_all_respondent_scores_scores);



    app.route('/userCareerLevels', check.isLoggedIn, role.adminCheck)
        .put(respondent.update_all_respondent_career_levels);
};