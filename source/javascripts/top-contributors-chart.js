function topContributors_function (contributor_data){
    var contributors = contributor_data["legislators"][0]["top_contributors"];
    var bigDataArray = []
    var count = []
    for (var i = 0; i < contributors.length; i++){
        var smallDataArray = []
        var contributor_instance = new Object();
        contributor_instance.name = contributors[i].name;
        contributor_instance.count = contributors[i].total_count;
        contributor_instance.totalAmount = contributors[i].total_amount;
        contributor_instance.totalAmount = parseInt(contributor_instance.totalAmount);
        smallDataArray.push(contributor_instance.name);
        smallDataArray.push(contributor_instance.totalAmount);
        bigDataArray.push(smallDataArray);
    }

    $(function () {
        $('#slider-one').highcharts({
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                },
                backgroundColor: 'transparent',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false

            },
            title: {
                text: 'Top contributors'
            },
            tooltip: {
                pointFormat: '{series.name}:<b>${point.y:.1f}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: ${point.y:.1f}',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Contribution amount',
                data: bigDataArray
            }]
        });
    });

    $(".parallax-two").resize();
};