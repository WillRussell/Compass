function scatterplot_function (bigDataArray){

    $(function () {
        $('#energy_scatterplot').highcharts({
            chart: {
                backgroundColor: 'transparent',
                type: 'scatter',
                zoomType: 'xy'
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
                    text: 'Liklihood of Agreement'
                },
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
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function(event) {

                                $.ajax({
                                    type:"GET",
                                    url:"https://peaceful-sea-4129.herokuapp.com/api/v1/industry_scores.json",
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
                data: bigDataArray
            }],
        });
    });
};