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
                    events: {
                        click: function(event) {
                            $.ajax({
                                type:"GET",
                                url:"https://peaceful-sea-4129.herokuapp.com/api/v1/most_recent_votes.json",
                                data: {   lastname: "Burr",
                                            state: "NC",
                                            title: "sen",
                                },
                                success:function(data){
                                    industry_specific_scatterplot_function (data)
                                }
                            })
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