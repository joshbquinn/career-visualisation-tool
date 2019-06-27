'use strict';

const Score = require('../models/scoreModel');


exports.get_user_scores = function(respondentID, result) {
    Score.getUserScore(respondentID, function (sqlResult) {
        getValues(sqlResult, function (scoreArray) {
            sliceScoreArray(scoreArray, function (allCategoryScores) {
                result(allCategoryScores)
            })

        });



        /* ### FUNCTIONS ###*/

        function getValues(sql, result){
            Object.keys(sql).forEach(function(key) {
                let values = result[key];
                let scoreArray = Object.values(values);
                return result(scoreArray)
            });

        }

        //slice score array into categories
        function sliceScoreArray(scoreArray, result){
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

            return result(categories);
        }


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

    })
};