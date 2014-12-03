function topContributors_function (contributor_data){
    var contributors = contributor_data["legislators"][0]["top_contributors"];
    var name = []
    var count = []
    var totalAmount = []
    for (var i = 0; i < contributors.length; i++){
        var contributor_instance = new Object();
        contributor_instance.name = contributors[i].name;
        contributor_instance.count = contributors[i].total_count;
        contributor_instance.totalAmount = contributors[i].total_amount;
        name.push(contributor_instance.name);
        count.push(contributor_instance.count);
        totalAmount.push(contributor_instance.totalAmount);
    };

    alert(name);
    alert(count);
    alert(totalAmount);
};

   $(function () {
    $('#slider-one').highcharts({
        chart: {
            type: 'area',
            spacingBottom: 30,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'transparent'

        },
        title: {
            text: 'Timeline w/missing values *'
        },
        subtitle: {
            text: '* Jane\'s banana consumption is unknown',
            floating: true,
            align: 'right',
            verticalAlign: 'bottom',
            y: 15
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: ['Apples', 'Pears', 'Oranges', 'Bananas', 'Grapes', 'Plums', 'Strawberries', 'Raspberries']
        },
        yAxis: {
            title: {
                text: 'Y-Axis'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    this.x + ': ' + this.y;
            }
        },
        plotOptions: {
            area: {
                fillOpacity: 0.5
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'John',
            data: [0, 1, 4, 4, 5, 2, 3, 7]
        }, {
            name: 'Jane',
            data: [1, 0, 3, null, 3, 1, 2, 1]
        }]
    });
});