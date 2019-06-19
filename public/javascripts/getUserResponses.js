var getUserResponses = function() {
    $.ajax({
        url: '/quiz',
        success: function (jsonQuizResponses) {
            var parsedResponses = JSON.parse(jsonQuizResponses)
            // process your data to pull out what you plan to use to update the HTML
            console.log("These are the text responses ", parsedResponses)
        }


    });
};

getUserResponses();