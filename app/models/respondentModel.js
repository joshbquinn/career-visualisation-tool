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

Respondent.updateRespondentTotalScore = function (score, respondent_id, result) {
    connection.query("UPDATE respondnent SET score = ? WHERE respondent_id = ?", [score, respondent_id],
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

Respondent.updateRespondentCareerLevel = function (career_level, respondent_id, result) {
    connection.query("UPDATE respondnent SET career_level = ? WHERE respondent_id = ?", [career_level, respondent_id],
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