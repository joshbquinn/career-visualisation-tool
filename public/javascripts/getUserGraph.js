

// create initial empty chart
var ctx_live = document.getElementById("myChart");
var myChart = new Chart(ctx_live, {
    type: 'bar',
    data: {
        labels: ["Java & Design", "Build & Versioning", "Test", "Integration", "APIs", "Dev-Ops", "Deployment", "Non-Functional"],
        datasets: [{
            data: [],
            borderWidth: 1,
            borderColor:'#00c0ef',
            label: 'Score',
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: "Sidero Career Assessment",
        },
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 100,
                    stepSize: 25,
                    labelString: ['Basic', 'Medium', 'Advanced', 'Expert']
                }
            }]
        }
    }
});


// logic to get user data
var getData = function() {
    $.ajax({
        url:'/me',
        success: function(u) {
            // process your data to pull out what you plan to use to update the chart
            myChart.data.datasets[0].data = [
                    percentage(u.score.cat1Total.score, u.score.cat1Total.maxScore),
                    percentage(u.score.cat2Total.score,u.score.cat2Total.maxScore),
                    percentage(u.score.cat3Total.score,u.score.cat3Total.maxScore),
                    percentage(u.score.cat4Total.score,u.score.cat4Total.maxScore),
                    percentage(u.score.cat5Total.score,u.score.cat5Total.maxScore),
                    percentage(u.score.cat6Total.score,u.score.cat6Total.maxScore),
                    percentage(u.score.cat7Total.score,u.score.cat7Total.maxScore),
                    percentage(u.score.cat8Total.score,u.score.cat8Total.maxScore)
            ];
                        // re-render the chart
            myChart.update();
        }
    });
};

// get user data
getData();

function percentage(number1, number2)
    {
        return ((number1/number2)*100).toFixed(2);;
    };