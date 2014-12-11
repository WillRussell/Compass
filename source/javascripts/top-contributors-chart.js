function topContributors_function (contributor_data){
    var contributors = contributor_data["legislators"][0]["top_contributors"];
    var bigDataArray = []
    var count = []
    var contribArray = []
    for (var i = 0; i < contributors.length; i++){
        var smallDataArray = []
        var contributor_instance = new Object();
        contributor_instance.name = contributors[i].name;
        contribArray.push(contributor_instance.name);
        contributor_instance.count = contributors[i].total_count;
        contributor_instance.totalAmount = contributors[i].total_amount;
        contributor_instance.totalAmount = parseInt(contributor_instance.totalAmount);
        smallDataArray.push(contributor_instance.name);
        smallDataArray.push(contributor_instance.totalAmount);
        bigDataArray.push(smallDataArray);
    }

var contributors = Object.keys(contributors);

  $(function () {
        // Set up the chart
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'slider-one',
                type: 'column',
                backgroundColor: 'transparent',
                margin: 75,
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                }
            },
            title: {
                text: 'Top Contributors'
            },
            subtitle: {
                text: ''
            },
            plotOptions: {
                column: {
                    colors: ['green'],
                    depth: 25
                }
            },

            xAxis: {
                categories: contribArray,
                labels: {
                    maxStaggerLines: 1,
                }
            },
            credits: { enabled: false },
            series: [{
                name: 'Contribution amount',
                color: 'rgb(135,178,163)',
                showInLegend: false,
                data: bigDataArray,
                animation: false,
            }]

        });

        function showValues() {
            $('#R0-value').html(chart.options.chart.options3d.alpha);
            $('#R1-value').html(chart.options.chart.options3d.beta);
        }

        // Activate the sliders
        $('#R0').on('change', function () {
            chart.options.chart.options3d.alpha = this.value;
            showValues();
            chart.redraw(false);
        });
        $('#R1').on('change', function () {
            chart.options.chart.options3d.beta = this.value;
            showValues();
            chart.redraw(false);
        });

        showValues();
    });
    $(".parallax-two").resize();
};





