function issueRatings_function (issueRatings_data){
    var issueRatings = issueRatings_data["legislators"][0]["issue_ratings_dummy"];
    var issueNameArray = [];
    var bigDataArray = [];
    for (var i = 0; i < issueRatings.length; i++){
        var smallDataArray = [];
        var issue_instance = new Object();
        issue_instance.name = issueRatings[i].issue_name;
        issueNameArray.push(issue_instance.name);
        issue_instance.fundingScore = issueRatings[i].funding_score;
        issue_instance.agreementScore = issueRatings[i].agreement_score;
        smallDataArray.push(issue_instance.name)
        smallDataArray.push(issue_instance.fundingScore);
        smallDataArray.push(issue_instance.agreementScore);
        bigDataArray.push(smallDataArray);
    };
    alert(issueNameArray);
    alert(bigDataArray);

    $(function () {
    $('#issue-ratings').highcharts({
        chart: {
            backgroundColor: 'transparent',
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Issue Ratings'
        },
        subtitle: {
            text: 'Source: ???'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Funding Score'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Agreement Score'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: 'Funding Score:{point.x}, Agreement Score:{point.y}'
                }
            }
        },
        series: [{
            name: 'Female',
            color: 'rgba(223, 83, 83, .5)',
            data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
          [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]]

        }, {
            name: 'Male',
            color: 'rgba(119, 152, 191, .5)',
            data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
                [180.3, 83.2], [180.3, 83.2]]
        }]
    });
});


};
