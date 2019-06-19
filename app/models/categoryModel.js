'user strict'

const connecton = require('../../configurations/database');

const Category = function(category) {
    this.id = category.id;
    this.category_weight = category.category_weight;
    this.total_questions_weight = category.total_questions_weight;
    this.category_name = category.category_name;
};

Category.getCategoryDetails = function(result) {
    connecton.query("SELECT * FROM assessment_category", function (err, sqlResult){
        if(err){
            console.log("Error: ", err);
            result(err, null);
        }
        else{
            result(null, sqlResult);
        }
    });
};

module.exports = Category;