function scatterplot_function (bigDataArray){

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

                title: {
                    // enabled: true,
                },
                type: 'logarithmic',
            },
            yAxis: {
                title: {
                    text: 'Agreement Score'
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
                    }
                }
            },
            series: [{
                data: bigDataArray
            }],
        });
    });
};