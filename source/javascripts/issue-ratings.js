function issueRatings_function (issueRatings_data){
    var issueRatings = issueRatings_data["legislators"][0]["contriubtions_by_industry"];
    var issueNameArray = [];
    var bigDataArray = [];
    for (var i = 0; i < issueRatings.length; i++){
        var smallDataArray = [];
        var issue_instance = new Object();
        issue_instance.name = issueRatings[i].issue_name;
        issue_instance.fundingScore = issueRatings[i].funding_score;
        issue_instance.agreementScore = issueRatings[i].agreement_score;
        smallDataArray.push(issue_instance.fundingScore);
        smallDataArray.push(issue_instance.agreementScore);
        smallDataArray.push(issue_instance.name);
        bigDataArray.push(smallDataArray);
    };


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
                text: ''
            },
            xAxis: {
                title: {
                    enabled: true,
                },
            },
            yAxis: {
                title: {
                    text: 'Agreement Score'
                }
            },
            // legend: {
            //     layout: 'vertical',
            //     align: 'left',
            //     verticalAlign: 'top',
            //     x: 100,
            //     y: 70,
            //     floating: true,
            //     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            //     borderWidth: 1
            // },
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
                        headerFormat: '{point.name}',
                        pointFormat: 'Funding Score: {point.x}<br>' + "Agreement Score: {point.y}"
                    }
                }
            },
            series: [{
                data: bigDataArray
            }],
        });
    });
};
