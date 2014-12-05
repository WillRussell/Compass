function energyRatings_function (energyRating_data){
    var energyRating = energyRating_data["legislators"][0]["legislator_issue_scores"];
    var bigDataArray = []
    for (var i = 0; i < energyRating.length; i++){
        if (energyRating[i]["issue_ratings_dummy"].length < 1) continue;
        var data_point = [];
        var funding_score = energyRating[i]["issue_ratings_dummy"][0]["funding_score"];
        data_point.push(funding_score);
        var agreement_score = energyRating[i]["issue_ratings_dummy"][0]["agreement_score"]
        data_point.push(agreement_score);
        var name = energyRating[i]["firstname"] + " " + energyRating[i]["lastname"];
        data_point.push(name);
        bigDataArray.push(data_point);
    };

    console.log(bigDataArray);

        $(function () {
        $('#energy_scatterplot').highcharts({
            chart: {
                backgroundColor: 'transparent',
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Issue'
            },
            subtitle: {
                text: 'Source: ???'
            },
            xAxis: {
                type: 'logarithmic',
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