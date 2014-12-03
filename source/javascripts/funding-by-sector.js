// Highcharts js graph for section 2 pt. 3

function sector_function (sector_data){
    var sectors = sector_data["legislators"][0]["contributors_by_sector"];
    var amount = []
    var sector = []
    var numContributions = []
    for (var i = 0; i < sectors.length; i++){
        var contribution_instance = new Object();
        contribution_instance.sector = sectors[i].sector;
        if (contribution_instance.sector === "Communications/Electronics"){
            contribution_instance.sector = "Communication/ Electronics";
        } else if (contribution_instance.sector === "Finance/Insurance/Real Estate"){
            contribution_instance.sector = "Finance/ Insurance/ Real Estate"
        } else if (contribution_instance.sector === "Energy/Natural Resources"){
            contribution_instance.sector = "Energy/ Natural"
        } else if (contribution_instance.sector === "Ideology/Single Issue"){
            contribution_instance.sector = "Ideology/ Single Issue"
        }
        contribution_instance.numContributions = sectors[i].count
        contribution_instance.amount = sectors[i].amount
        contribution_instance.amount = parseInt(contribution_instance.amount);
        amount.push(contribution_instance.amount);
        sector.push(contribution_instance.sector);
        numContributions.push(contribution_instance.numContributions)
    };

     $(function () {
        // Set up the chart
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'slider-three',
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
                text: 'Funding by Sector'
            },
            subtitle: {
                text: ''
            },
            plotOptions: {
                column: {
                    depth: 25
                }
            },

            xAxis: {
                categories: sector,
                labels: {
                    maxStaggerLines: 1,
                }
            },
            series: [{
                name: "Contribution",
                showInLegend: false,
                data: amount
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
};