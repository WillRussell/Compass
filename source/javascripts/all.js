//= require jquery/dist/jquery
//= require underscore

//= require foundation/js/foundation.min

//= require app
//= require script


// ---Navbar fade ---
jQuery(document).on("scroll",function(){
    if($(document).scrollTop()>60){
        $(".contain-to-grid").addClass("undocked");
    } else{
        $(".contain-to-grid").removeClass("undocked");
    }
});

// ---Legislators select slidedown panel ---
$(function() {
    $('#location-button').on('click', function () {

        var input_address = $('#address').val();
        $.ajax({
        type: "GET",
        url: "https://peaceful-sea-4129.herokuapp.com/api/v1/search.json",
        data: { address : input_address },
        success: function(data) {
            var numLegislators =data["legislators"].length;
                for (var i = 0; i < numLegislators; i++) {
                    var firstname = JSON.stringify(data["legislators"][i]["firstname"]).slice(1, -1);
                    var lastname = JSON.stringify(data["legislators"][i]["lastname"]).slice(1, -1);
                    var state = JSON.stringify(data["legislators"][i]["state"]).slice(1, -1);
                    var title = JSON.stringify(data["legislators"][i]["title"]).slice(1, -1);
                    var party = JSON.stringify(data["legislators"][i]["party"]).slice(1, -1);
                    var picture = JSON.stringify(data["legislators"][i]["picture_url"]).slice(1, -1);
                    $( ".legislator-list" ).append('<div class="small-4 columns"><li </li><li>' +firstname + ' ' + lastname + ' ' + '(' + party + ')  </li><a href="#" class="legislatorlink" data-lastname="' + lastname + '" data-state="' + state + '" data-title="' + title + '"><img src="' + picture + '" ></a></div>');
                }
            }
        });
         $('.panel').slideDown(400);
    });
})

// ---Ajax request for profile information, panel slideup, jquery to append html in section 1---
$(function () {
 $('.legislator-list').on("click", ".legislatorlink", function(){
        $('.panel').slideUp(400);
        var lastname = $( this ).first().data("lastname");
        var state = $( this ).first().data("state");
        var title = $( this ).first().data("title");
        $.ajax({
            type: "GET",
            url: "https://peaceful-sea-4129.herokuapp.com/api/v1/profile.json",
            data: { lastname: lastname,
                       state: state,
                       title: title},

            success: function(data) {
                    console.log(data);

                    var twitter_id = JSON.stringify(data["legislators"][0]["twitter_id"]).slice(1, -1);
                    var influence_rank = JSON.stringify(data["legislators"][0]["influence_rank"]);
                    var ideology_rank = JSON.stringify(data["legislators"][0]["ideology_rank"]);
                    var party = JSON.stringify(data["legislators"][0]["party"]).slice(1, 2);
                    var picture_url = JSON.stringify(data["legislators"][0]["picture_url"]).slice(1, -1);
                    var website = JSON.stringify(data["legislators"][0]["website"]).slice(1, -1);
                    var state = JSON.stringify(data["legislators"][0]["state"]).slice(1, -1);
                    var name = JSON.stringify(data["legislators"][0]["firstname"]).slice(1, -1) + " " + (data["legislators"][0]["lastname"]);
                    var district = JSON.stringify(data["legislators"][0]["district"]).slice(1, -1);
                    var phone =  JSON.stringify(data["legislators"][0]["phone"]).slice(1, -1);

                $(".legislator-profile").append('<img id="profile-pic" src=' + picture_url + ' ">'
                    +'<h3>' + name + '  ' + '('+party+')' + '</h3>'
                    + '<ul class="profile-list"><li><i class="fa fa-map-marker fa-lg"></i> ' + state + "'s " + district + '</li>'
                   + '<li><i class="fa fa-twitter fa-lg"></i> @' + twitter_id + '</li>'
                 // + '<p>Ideology rank: ' + ideology_rank + '</p>'
                 //  + '<p>Influence rank: '+influence_rank + '</p>'
                  +'<li><i class="fa fa-phone fa-lg"></i> ' + phone + '</li>'
                  +'<li><i class="fa fa-home fa-lg"></i> ' + website + '</li></ul>');
            }
        })
    });
});

// Highcharts funding influence graph for section 1
$(function () {
    $('#chart-one').highcharts({
        chart: {
            type: 'line',
            backgroundColor: 'transparent'
         },
        title: {
            text: 'Influence Score'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
});

//--- Highcharts for section 2 graph ---
$(function () {
    $('#container').highcharts({
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

// Highcharts js graph for section 2 pt. 2
$(function () {
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
            text: 'Contents of Highsoft\'s weekly fruit delivery'
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
            name: 'Delivered amount',
            data: [
                ['Bananas', 8],
                ['Kiwi', 3],
                ['Mixed nuts', 1],
                ['Oranges', 6],
                ['Apples', 8],
                ['Pears', 4],
                ['Clementines', 4],
                ['Reddish (bag)', 1],
                ['Grapes (bunch)', 1]
            ]
        }]
    });
});

// Highcharts js graph for section 2 pt. 3
$(function () {
    $('#slider-three').highcharts({

        chart: {
            type: 'bubble',
            backgroundColor: 'transparent',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        title: {
            text: 'Highcharts bubbles with radial gradient fill'
        },

        xAxis: {
            gridLineWidth: 1
        },

        yAxis: {
            startOnTick: false,
            endOnTick: false
        },

        series: [{
            data: [
                [9, 81, 63],
                [98, 5, 89],
                [51, 50, 73],
                [41, 22, 14],
                [58, 24, 20],
                [78, 37, 34],
                [55, 56, 53],
                [18, 45, 70],
                [42, 44, 28],
                [3, 52, 59],
                [31, 18, 97],
                [79, 91, 63],
                [93, 23, 23],
                [44, 83, 22]
            ],
            marker: {
                fillColor: {
                    radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                    stops: [
                        [0, 'rgba(255,255,255,0.5)'],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
                    ]
                }
            }
        }, {
            data: [
                [42, 38, 20],
                [6, 18, 1],
                [1, 93, 55],
                [57, 2, 90],
                [80, 76, 22],
                [11, 74, 96],
                [88, 56, 10],
                [30, 47, 49],
                [57, 62, 98],
                [4, 16, 16],
                [46, 10, 11],
                [22, 87, 89],
                [57, 91, 82],
                [45, 15, 98]
            ],
            marker: {
                fillColor: {
                    radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                    stops: [
                        [0, 'rgba(255,255,255,0.5)'],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
                    ]
                }
            }
        }]

    });
});



// <!-- here's your empty div, waiting for the template content -->
//   <div class="test"></div>

// <!-- the javascript to make the ajax call and direct the content to the template -->
//   <script type="text/javascript">
//         var userAPI = "https://api.github.com/users/amygori?client_id="+token;

//        $.getJSON(userAPI).done(function (userData) {
//             console.log("here is the JSON" + userData);
//             var profileTpl = $('#profile').html();
//             $(".test").append(_.template(profileTpl, userData));
//         });
//   </script>

// <!-- the template itself; note the type is a template -->
//   <script type="text/template" id="profile">

//       <img src="<%= avatar_url %>">

//       <h1><%= login %></h1>

//       <h2><span class="octicon octicon-clock"></span>Joined on <%=   created_at.substring(0,10) %></h2>
//         <p class="peeps"> <span class="num"><%= followers %></span>Followers</p>
//         <p class="peeps"><a href="<%= starred_url %>">Starred </a></p>
//         <p class="peeps"> <span class="num"><%= following %></span>Following</p>
//   </script>