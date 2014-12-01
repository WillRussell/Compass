$(function () {
    $('#timeline').highcharts({
        chart: {
            type: 'line',
            backgroundColor: 'transparent'
        },
        title: {
            text: ''
        },
        xAxis: {
            data: [1990, 1991, 1992],
            labels: { enabled: false }
        },
        yAxis: {
            title: {
                text: ' '
            },
            labels: { enabled: false }
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        series: [{
            name: 'Jane',
            data: [{x:1990, y: 0, name: "Became representative", state: "NC"}, {x:1991, y: 0, name: "Re-elected representative", state: "NC"}, {x:1992, y: 0, name: "Became Senator", state: "NC"}]
        }],
        tooltip: {
            formatter: function() {
                return this.point.x + ": " + this.point.name + ' for ' + this.point.state + '';
            }
        },
    });
});