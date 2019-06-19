var urlParams = window.location.href;
var respondentID = urlParams.split('/').pop()

var getRespondentCareerLevel = function(respondentID) {
    $.ajax({
        url: '/respondent',
        data: {respondentID: respondentID},
        success: function (u) {
            // process your data to pull out what you plan to use to update the chart

            if (u.score.total.score <= 226) {
                $("#careerLevel").append("Graduate");
            }
            if (u.score.total.score >= 227 && u.score.total.score <= 452) {
                $("#careerLevel").append("Engineer");
            }
            if (u.score.total.score >= 453 && u.score.total.score <= 678) {
                $("#careerLevel").append("Senior Engineer");
            }
            if (u.score.total.score >= 679 && u.score.total.score <= 904) {
                $("#careerLevel").append("Lead Engineer");
            } else if (u.score.total.score >= 905 && u.score.total.score <= 1132){
                $("#careerLevel").append("Architect");
            }
        }

    });
};

getRespondentCareerLevel(respondentID);