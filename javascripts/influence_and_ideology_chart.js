function influence_and_ideology_scatter_function (influence_and_ideology_array){

    $(function () {
        $('#influence_and_ideology_scatterplot').highcharts({
            chart: {
                backgroundColor: 'transparent',
                type: 'scatter',
                zoomType: 'xy',
                animation: false,
            },
            title: {
                text: 'Influence of Money by Political View'
            },
            xAxis: {

                title: {
                    text: 'Political View'
                },
            },
            yAxis: {
                title: {
                    text: 'Influence of Money'
                },
                min: 0,
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
                        pointFormat: '<strong>{point.name}:</strong><br> Ideology Rank: {point.x}<br>' + "Funders Influence Score: {point.y}"
                    },
                },
                series: {
                    animation: false,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function(event) {
                            }
                        }
                    }
                }
            },
            series: [{
                animation: false,
                data: influence_and_ideology_array
            }],
        });
    });
};