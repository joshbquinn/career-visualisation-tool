'use strict';

const connection = require('../../configurations/database.js');

// const Score = function(){
//     //fill in model here if required to
// };

exports.getUserScore = function (respondent_id, result) {
    let scoreQuery = "SELECT c1q1, c1q2, c1q3, c1q4, c1q5, c1q6, c1q7, c1q8, c2q1, " +
        "c2q2, c2q3, c2q4, c3q1, c3q2, c3q3, c3q4, c4q1, c4q2, c4q3, c4q4, c4q5, c5q1, " +
        "c5q2, c5q3, c6q1, c6q2, c6q3, c6q4, c7q1, c7q2, c7q3, c7q4, c7q5, c8q1, c8q2, c8q3, " +
        "c8q4, c8q5 " +
        "FROM nodejs_login.assessment_score AS a " +
        "JOIN nodejs_login.users as u " +
        "ON a.respondent_id = u.user_respondent_id " +
        "WHERE a.respondent_id = ?";
    connection.query(scoreQuery, [respondent_id], function (err, sqlResult) {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
        } else {
            return result(sqlResult);
        }
    });

};

