function timeline_function (timeline_data) {
    var elections = timeline_data["legislators"][0]["elections_timeline_array"];
    var timeline_array = [];
    for (var i = 0; i < elections.length; i++) {
        var timeline_event = new Object();
        timeline_event.x = parseInt(elections[i].start.slice(0,4));
        var election_type_abrev = elections[i].type;
        if (election_type_abrev === "rep") {
            var election_type = "representative";
        } else {
            var election_type = "senator";
        }
        timeline_event.name = "Elected " + election_type;
        timeline_event.state = elections[i].state;
        timeline_event.y = 0;
        timeline_array.push(timeline_event);
    };

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
            labels: { enabled: false },
        },
        yAxis: {
            title: {
                text: ' '
            },
            labels: { enabled: false }
        },
        legend: { enabled: false },
        exporting: { enabled: false },
        credits: { enabled: false },
        series: [{
            name: 'Jane',
            data: timeline_array
        }],
        tooltip: {
            formatter: function() {
                return this.point.x + ": " + this.point.name + ' for ' + this.point.state + '';
            }
        },
    });
};