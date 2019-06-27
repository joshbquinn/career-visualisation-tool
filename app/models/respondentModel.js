'use strict';

const connection = require('../../configurations/database.js');

const Respondent = function(respondent){
    this.respondent_id = respondent.respondent_id;
    this.collector_id = respondent.collector_id;
    this.start_date = respondent.start_date;
    this.end_date = respondent.end_date;
    this.ip_address = respondent.ip_address;
    this.career_level = respondent.career_level;
    this.score = respondent.score;
};

Respondent.updateRespondentTotalScore = function (respondent_id, score, result) {
    connection.query("UPDATE respondnent SET score = ? WHERE respondent_id = ?", [respondent_id, score],
        function (err, sqlResult){
        console.log(sqlResult)
            if(err){
                console.log("error: ", err);
                result(null, err);
            }
            else if (sqlResult[0] === null || sqlResult[0] === undefined || !sqlResult[0]){
                result(null, sqlResult);
            }
            else {
                console.log("Respondent score exists in row");
                result(null)
            }

        });
};

Respondent.updateRespondentCareerLevel = function (respondent_id, career_level, result) {
    connection.query("UPDATE respondnent SET career_level = ? WHERE respondent_id = ?", [respondent_id, career_level],
        function (err, sqlResult){

            if(err){
                console.log("error: ", err);
                result(null, err);
            }
            else if (sqlResult[0] === null || sqlResult[0] === undefined || !sqlResult[0]){
                result(null, sqlResult);
            }
            else {
                console.log("Respondent career level value exists in row");
                result(null)
            }

        });
};

Respondent.getRespondentTotalScore = function (respondent_id, result) {
    connection.query("SELECT score FROM respondent WHERE respondent_id = ?", [respondent_id],
        function (err, sqlResult){

            if(err){
                console.log("error: ", err);
                result(null, err);
            }
            else{
                result(null, sqlResult);
            }
        });
};

Respondent.getRespondentCareerLevel = function (respondent_id, result) {
    connection.query("SELECT career_level FROM respondent WHERE respondent_id = ?", [respondent_id],
        function (err, sqlResult){

            if(err){
                console.log("error: ", err);
                result(null, err);
            }
            else{
                result(null, sqlResult);
            }
        });
};

Respondent.getUserByRespondentId = function getUser(respondentId, result) {
    connection.query("Select * from users where user_respondent_id = ? ", [respondentId], function (err, res) {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};



module.exports = Respondent;