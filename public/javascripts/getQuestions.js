/*Get all questions from assessment*/

var getQuestions = function() {
    $.ajax({
        url: '/questions',
        success: function (q) {
            var q = JSON.parse(q)
            // process your data to pull out what you plan to use to update the HTML
            console.log("these are the Questions:", q)
        }


    });
};

getQuestions();