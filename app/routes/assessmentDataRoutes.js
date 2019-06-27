/*Routes to get assessment data*/

const assessment = require('./../controllers/assessmentController');
const check = require('./../utilities/loginCheck');

module.exports = function(app) {

    // Logged in User Assessment Data
    app.get('/me', function (req, res) {
        let respondent_id = req.user.user_respondent_id;
        assessment.get_user_scores(respondent_id, function (score) {
            res.send({score});
        })
    });

    // Respondent Assessment Data
    app.get('/respondent', function (req, res) {
        let respondent_id = req.query.respondentID;
        assessment.get_user_scores(respondent_id, function (score) {
            res.send({score});
        })
    });

    // Assessment Questions
    app.get('/questions', assessment.get_question_details);

    // Assessment Responses
    app.get('/quiz', assessment.get_user_assessment_responses);

};
