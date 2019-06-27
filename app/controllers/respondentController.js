'use strict';

const Respondent = require('../models/respondentModel.js');
const User = require('../models/userModel')
const score = require('../controllers/scoreController')

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

exports.get_a_respondent_profile = function(req, res){
    Respondent.getUserByRespondentId(req, function(err, user) {
        if (err){
            res.send(err);
        }
        else{
            console.log('Ressponse Successful');
            res(user)
        }
    })
};


exports.update_all_respondent_scores_scores = function(req, res, next) {
    User.getAllUsers(function (empty, respondents) {

        respondents.forEach(function(respondent) {
            score.get_user_scores(respondent.user_respondent_id, function (score) {
                Respondent.updateRespondentTotalScore(respondent.user_respondent_id, score.total.score)

                return next()
            })
        })
    });
};

exports.update_all_respondent_career_levels = function(req, res, next) {
    User.getAllUsers(function (empty, respondents) {

        respondents.forEach(function (respondent) {
            let careerLevel;
            score.get_user_scores(respondent.user_respondent_id, function (score) {
                if (score.total.score <= 226) {
                    return careerLevel = "Graduate";
                }
                if (score.total.score >= 227 && score.total.score <= 452) {
                    return careerLevel = "Engineer";
                }
                if (score.total.score >= 453 && score.total.score <= 678) {
                    return careerLevel = "Senior Engineer"
                }
                if (score.total.score >= 679 && score.total.score <= 904) {
                    return careerLevel = "Lead Engineer"
                } else if (score.total.score >= 905 && score.total.score <= 1132){
                    return careerLevel = "Architect"
                }

                Respondent.updateRespondentCareerLevel(respondent.user_respondent_id, careerLevel)
                return next()

            })
        })
    });
};