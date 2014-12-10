function scatterplot_function (bigDataArray){

    $(function () {
        $('#energy_scatterplot').highcharts({
            chart: {
                backgroundColor: 'transparent',
                type: 'scatter',
                zoomType: 'xy',
            },
            title: {
                text: 'Industry Scores'
            },
            xAxis: {

                title: {
                    text: 'Contribution Amount'
                },
                type: 'logarithmic',
            },
            yAxis: {
                title: {
                    text: 'Likelihood of Agreement'
                },
                min: 0,
                max: 1,
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
                        pointFormat: '<strong>{point.name}:</strong><br> Contribution Amount: {point.x}<br>' + "Agreement Score: {point.y}"
                    },
                },
                series: {
                    showInLegend: false,
                    cursor: 'pointer',
                    animation: false,
                    point: {
                        events: {
                            click: function(event) {
                                $('.industry-specific-placeholder').addClass('hidden');
                                $.ajax({
                                    type:"GET",
                                    url:"http://api.civic-compass.org/api/v1/industry_scores.json",
                                    data: {   industry: this.name,
                                    },
                                    success:function(data){
                                        var industry_scores = data["legislators"][0]["industry_scores"];
                                        var bigDataArray = [];
                                        for (i = 0; i < industry_scores.length; i++) {
                                            var point_object = new Object();
                                            point_object.x = industry_scores[i]["contributions_to_industry"];
                                            point_object.y = industry_scores[i]["agreement_score_with_industry"];
                                            point_object.name = industry_scores[i]["firstname"] + " " + industry_scores[i]["lastname"];
                                            point_object.title = industry_scores[i]["title"];
                                            point_object.state = industry_scores[i]["state"];
                                            point_object.party = industry_scores[i]["party"];
                                            if (industry_scores[i]["party"] == "Republican") {
                                                point_object.fillColor = "rgba(223, 83, 83, .5)";
                                            } else {
                                                 point_object.fillColor = "rgba(119, 152, 191, .5)";
                                            }
                                            bigDataArray.push(point_object);
                                        }
                                        industry_specific_scatterplot_function (bigDataArray)
                                    }
                                })
                            }
                        }
                    }
                }
            },
            series: [{
                animation: false,
                data: bigDataArray,
                color: 'rgba(73,80,88, .5)'
            }],
        });
    });
};
