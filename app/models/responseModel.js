'user strict'

const connecton = require('../../configurations/database');

const Response = function(category) {
    this.id = category.id;
    this.category_weight = category.category_weight;
    this.total_questions_weight = category.total_questions_weight;
    this.category_name = category.category_name;
};

Response.getUserResponses = function(respondent_id, result){
    const responseQuery = "SELECT c1q1, c1q2, c1q3, c1q4, c1q5, c1q6, c1q7, c1q8, c2q1, c2q2, c2q3, c2q4, " +
        "c3q1, c3q2, c3q3, c3q4, c4q1, c4q2, c4q3, c4q4, c4q5, c5q1, c5q2, c5q3, c6q1, c6q2, c6q3, c6q4, c7q1, " +
        "c7q2, c7q3, c7q4, c7q5, c8q1, c8q2, c8q3, c8q4, c8q5 " +
        "FROM nodejs_login.assessment_resposne AS ar " +
        "JOIN nodejs_login.users AS u ON ar.respondent_id = u.user_respondent_id WHERE ar.respondent_id = ?";

    connecton.query(responseQuery, [respondent_id], function (err, sqlResult){
        if(err){
            console.log("Error: ", err);
            result(err, null);
        }
        else{
            result(sqlResult);
        }
    });
};

module.exports = Response;