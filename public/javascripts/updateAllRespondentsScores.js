/*Update the database */


var updateRespondentsScores = function() {
    $.ajax({
        url: '/userScores',
        success: function (done) {
            console.log("All Respondent Scores Updated", done)
        }
    });
};

var updateRespondentsCareerLevels = function() {
    $.ajax({
        url: '/userCareerLevels',
        success: function (done) {
            console.log("All Respondent Career Levels Updated", done)
        }
    });
};

updateRespondentsScores();
updateRespondentsCareerLevels();