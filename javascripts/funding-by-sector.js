// Highcharts js graph for section 2 pt. 3

function sector_function (data){
    var contributions_object = data[0].legislators[0].contributions_by_industry;

    function sorted_contributions_object (data) {
      return Object.keys(data).map(function (k) {
        return { key: k, value: data[k] };
      }).sort(function (kv1, kv2) {
          return kv2.value - kv1.value;
      }).slice(0, 10).reduce(function (obj, kv) {
        obj[kv.key] = kv.value;
        return obj;
      }, {});
    }

    contributions_object = sorted_contributions_object(contributions_object);
    var industries = Object.keys(contributions_object);
    var amounts = $.map(contributions_object,function(v){
     return v;
    });

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
                text: 'Funding by Industry'
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
                categories: industries,
                labels: {
                    maxStaggerLines: 1,
                }
            },
            series: [{
                name: "Contribution",
                color: 'rgb(135,178,163)',
                showInLegend: false,
                data: amounts,
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
};
