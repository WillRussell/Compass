function influence_and_ideology_scatter_function (influence_and_ideology_array){

    $(function () {
        $('#influence_and_ideology_scatterplot').highcharts({
            chart: {
                backgroundColor: 'transparent',
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Influence vs Ideology Scores'
            },
            xAxis: {

                title: {
                    text: 'Ideology Scores'
                },
            },
            yAxis: {
                title: {
                    text: 'Funder Influence Score'
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
                        pointFormat: '<strong>{point.name}:</strong><br> Ideology Rank: {point.x}<br>' + "Funders Influence Score: {point.y}"
                    },
                },
                series: {
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
                data: influence_and_ideology_array
            }],
        });
    });
};