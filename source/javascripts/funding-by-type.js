//--- Highcharts for section 2 graph ---
function type_function (type_data){
    var total_indiv_contributions = type_data["legislators"][0]["contributors_by_type"]["Individuals"][1].slice(1, -3);
    var total_pac_contributions = type_data["legislators"][0]["contributors_by_type"]["PACs"][1].slice(1, -3);
    var total_indiv_contributions = parseInt(total_indiv_contributions);
    var total_pac_contributions = parseInt(total_pac_contributions);
    $('#slider-two').highcharts({
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            options3d: {
            enabled: true,
            alpha: 45
            }
        },
        title: {
            text: 'Funding by Type'
        },
        subtitle: {
            text: '3D donut in Highcharts'
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        series: [{
            name: 'Contribution',
            data: [
                ['Individual contributions', total_indiv_contributions],
                ['Total PAC contributions', total_pac_contributions]
            ]
        }],
    });
};