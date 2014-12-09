function industry_specific_scatterplot_function (bigDataArray){

        $(function () {
        $('#industry_specific_scatterplot').highcharts({
            chart: {
                backgroundColor: 'transparent',
                type: 'scatter',
                zoomType: 'xy',
            },
            title: {
                text: 'Industry Specific Scores'
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
                    events: {
                        click: function(event) {
                            // alert('x: ' + event.chartX + ', y: ' + event.chartY);
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