'user strict'

const connecton = require('../../configurations/database');

const Question = function(question) {
    this.id = question.id;
    this.category_id = question.category_id;
    this.question_weight = question.question_weight;
    this.question = question.question;
};

Question.getCategoryQuestions = function(categoryId, result) {
    connecton.query("SELECT * FROM assessment_category_question WHERE category_id = ?", [categoryId], function (err, sqlResult){
        if(err){
            console.log("Error: ", err);
            result(err, null);
        }
        else{
            result(sqlResult);
        }
    });
};

Question.getAllCategoryQuestions = function(result) {
    connecton.query("SELECT * FROM assessment_category_question", function (err, sqlResult){
        if(err){
            console.log("Error: ", err);
            result(err, null);
        }
        else{
            result(sqlResult);
        }
    });
};

module.exports = Question;