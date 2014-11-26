//= require jquery/dist/jquery
//= require underscore

//= require foundation/js/foundation.min

//= require app
//= require script

jQuery(document).on("scroll",function(){
    if($(document).scrollTop()>60){
        $(".contain-to-grid").addClass("undocked");
    } else{
        $(".contain-to-grid").removeClass("undocked");
    }
});

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
                    lastname = JSON.stringify(data["legislators"][i]["lastname"]).slice(1, -1);
                     state = JSON.stringify(data["legislators"][i]["state"]).slice(1, -1);
                     title = JSON.stringify(data["legislators"][i]["title"]).slice(1, -1);
                    var party = JSON.stringify(data["legislators"][i]["party"]).slice(1, -1);
                    var picture = JSON.stringify(data["legislators"][i]["picture_url"]);
                    $( ".legislator-list" ).append( '<div class="small-4 columns"><li><a href="#">' + "<img src=" + picture + ">"  + "</li>" +  '<li>' +firstname + " " +
                    lastname + " " + "(" + party + ")"  +  '</a></li></div>');
                }
            }
        });
         $('.panel').slideDown(400);
    });
})

// lastname/state/title are temporarily global variables

$(function () {
 $("#legis-select").on('click', function () {
        $('.panel').slideUp(400);
        // var lastname = $(this).attr("data-lastname");
        $.ajax({
            type: "GET",
            url: "https://peaceful-sea-4129.herokuapp.com/api/v1/profile.json",
            data: { lastname: lastname,
                       state: state,
                       title: title},

            success: function(data) {
                    // console.log(data);

                    var twitter_id = JSON.stringify(data["legislators"][0]["twitter_id"]);
                    var influence_rank = JSON.stringify(data["legislators"][0]["influence_rank"]);
                    var ideology_rank = JSON.stringify(data["legislators"][0]["ideology_rank"]);

                $(".legislator-profile").append('<p>' + twitter_id + '</p>' + '<p>Ideology rank: ' + ideology_rank + '</p>' + '<p>Influence rank: ' +influence_rank + '</p>');
            }
        })
    });
});


$(function () {
    $('#container').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'js highchart test'
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










// $(function () {
//  $("#legis-select").on('click', function () {
//         $('.panel').slideUp(400);
//         // console.log(this);
//         // var lastname = $(this).attr("data-lastname");
//     });
// });



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