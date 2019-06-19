const categoryModel = require('../models/categoryModel');
const categoryQuestionModel = require('../models/categoryQuestionModel');
const responseModel = require('../models/responseModel');
const scoreModel = require('../models/scoreModel');


exports.get_category_details = function(req, res) {
    categoryModel.getCategoryDetails(function (categoryDetails) {
        res.send(JSON.stringify({categoryDetails}
        ))
    })
};

exports.get_question_details = function (req, res) {
    categoryQuestionModel.getAllCategoryQuestions( function (questions) {
        res.send(JSON.stringify({questions}
        ))
    })
};

exports.get_user_assessment_responses = function(req, res){
    responseModel.getUserResponses(req.user.user_respondent_id,
        function (sqlResult) {
            //Create array of values
            Object.keys(sqlResult).forEach(function(key) {
                let values = sqlResult[key];
                let userResponses = Object.values(values);
                //Stringify the JSON - Parse it on Client Side
                res.send(JSON.stringify({userResponses}))
            })
        });
};

exports.get_user_scores = function(respondentID, result) {
    scoreModel.getUserScore(respondentID, function (sqlResult) {
        //parse values to array
        Object.keys(sqlResult).forEach(function(key) {
            let values = sqlResult[key];
            let scoreArray = Object.values(values);
            //slice score array into categories
            let category1 = scoreArray.slice(0,7);
            let category2 = scoreArray.slice(8,11);
            let category3 = scoreArray.slice(12,15);
            let category4 = scoreArray.slice(16,20);
            let category5 = scoreArray.slice(21,23);
            let category6 = scoreArray.slice(24,27);
            let category7 = scoreArray.slice(28,32);
            let category8 = scoreArray.slice(33,38);

            var cat1Total = totalScore(category1);
            var cat2Total = totalScore(category2);
            var cat3Total = totalScore(category3);
            var cat4Total = totalScore(category4);
            var cat5Total = totalScore(category5);
            var cat6Total = totalScore(category6);
            var cat7Total = totalScore(category7);
            var cat8Total = totalScore(category8);
            var total = totalScore(scoreArray);

            let categories = {cat1Total, cat2Total, cat3Total, cat4Total, cat5Total, cat6Total, cat7Total, cat8Total, total};

            //function to parse the strings into numbers and accumulate them
            function totalScore(categoryScore){
                return categoryScore.reduce((accum,scoreArray) =>
                    {
                        const splitValues = scoreArray.split('/');

                        return {
                            score:accum.score + parseInt(splitValues[0]),
                            maxScore:accum.maxScore + parseInt(splitValues[1]),
                        }
                    },{score:0,maxScore:0}
                );
            }

            result(categories);

        });
    })
};