const user = require('../controllers/userController.js');
const respondent = require('./../controllers/respondentController.js')
const check = require('../utilities/loginCheck.js');
const role = require('../utilities/roleCheck.js');

module.exports = function(app){

    app.route('/user')
        .get(user.list_all_users);

    app.get('/user/edit/:userId', check.isLoggedIn, user.read_a_user);

        // .get(user.read_a_user)
        // .post(user.create_a_user)
        // .delete(user.delete_a_user);

    app.route('/user/delete/:userID', check.isLoggedIn, role.adminCheck)
        .post(user.delete_a_user);

    app.route('/userEmail/:userId')
        .put(user.update_user_email);

    app.route('/userName/:userId' )
        .put(user.update_user_name);

    app.route('/userRole/:userId' )
        .put(user.update_user_role);

    app.route('/userScore/:userId')
        .put(respondent.update_respondent_score);

    app.route('/userCareerLevel/:userId')
        .put(respondent.update_respondent_career_level);
};