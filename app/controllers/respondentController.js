const Respondent = require('../models/respondentModel.js');

exports.update_respondent_score = function (req, res) {
    Respondent.updateRespondentTotalScore(req.params.respondentId, req.user, function(err, user){
        if(err)
            res.send(err);
        res.json(user)
    })
};

exports.update_respondent_career_level = function (req, res) {
    Respondent.updateRespondentCareerLevel(req.params.respondentId, req.user, function(err, user){
        if(err)
            res.send(err);
        res.json(user)
    })

};

exports.get_a_respondent_profile = function(req, callback){
    Respondent.getUserByRespondentId(req, function(err, user) {
        if (err){
            res.send(err);
        }
        else{
            console.log('Ressponse Successful');
            callback(user)
        }
    })
};

exports.get_a_respondent_graph = function(req, res){
    respodnent.get_a_respondent_profile(req.params.respondent, function(user){
        let respondent = user.pop();
        score.get_user_scores(req.params.respondent, function (score) {
            res.send({respondent, score})
        })
    });
};