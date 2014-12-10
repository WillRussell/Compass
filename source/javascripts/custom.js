$("form input").keypress(function(ev){
    if (ev.keyCode == 13) {
        event.preventDefault();
        $('.search-button').click();
    }
});


$('.legislator-list').click(function() {
    $('.j-money').removeClass('hidden');
    $('.j-vote').removeClass('hidden');
    $('.industry-specific-placeholder').removeClass('hidden');
    $('.section-headline').removeClass('inactive');
});



$(document).foundation();
$(document).ready(function(){$('#myModal').foundation('reveal', 'open')});




// ---Navbar fade ---
// jQuery(document).on("scroll",function(){
//     if($(document).scrollTop()>60){
//         $(".contain-to-grid").addClass("undocked");
//     } else{
//         $(".contain-to-grid").removeClass("undocked");
//     }
// });


// ---Legislators select slidedown panel ---
$(function() {
    $('.search-button').on('click', function () {

        var input_address = $('#address').val();
        $.ajax({
        type: "GET",
        url: "http://api.civic-compass.org/api/v1/search.json",
        data: { address : input_address },
        success: function(data) {
            $( ".legislator-list" ).empty();
            var numLegislators =data["legislators"].length;
                for (var i = 0; i < numLegislators; i++) {
                    var firstname = JSON.stringify(data["legislators"][i]["firstname"]).slice(1, -1);
                    var lastname = JSON.stringify(data["legislators"][i]["lastname"]).slice(1, -1);
                    var state = JSON.stringify(data["legislators"][i]["state"]).slice(1, -1);
                    var title = JSON.stringify(data["legislators"][i]["title"]).slice(1, -1);
                    var party = JSON.stringify(data["legislators"][i]["party"]).slice(1, -1);
                    var picture = JSON.stringify(data["legislators"][i]["picture_url"]).slice(1, -1);
                    $( ".legislator-list" ).append('<div class="small-4 columns"><li>' +firstname + ' ' + lastname + ' ' + '(' + party + ')  </li><a href="#" class="legislatorlink" data-lastname="' + lastname + '" data-state="' + state + '" data-title="' + title + '"><img src="' + picture + '" ></a></div>');
                }
            }
        });
         $('.panel').show(400);
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
            url: "http://api.civic-compass.org/api/v1/profile.json",
            data: { lastname: lastname,
                       state: state,
                       title: title},

            success: function(data) {
                    $(".legislator-profile").empty();

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
                    var ajax_contributions_by_industry = {
                                    type:"GET",
                                    url:"http://api.civic-compass.org/api/v1/cached_contributions_by_industry.json",
                                    data: { lastname: lastname,
                                              state: state,
                                              title: title,
                                    },
                    };
                    var ajax_agreement_by_industry = {
                    type:"GET",
                    url:"http://api.civic-compass.org/api/v1/cached_agreement_score_by_industry.json",
                    data: { lastname: lastname,
                              state: state,
                              title: title,
                    },
                    };




                $(".legislator-profile").append('<h3>' + name + '  ' + '('+party+')' + '</h3>'
                    +'<div class="large-4 columns"><img id="profile-pic"  src=' + picture_url + ' "></div>'
                    + '<div class="large-8 columns"><ul class="profile-list"><li><i class="fa fa-map-marker fa-lg"></i> ' + state + "'s " + district + '</li>'
                   + '<li><i class="fa fa-twitter fa-lg"></i> @' + twitter_id + '</li>'
                 // + '<p>Ideology rank: ' + ideology_rank + '</p>'
                 //  + '<p>Influence rank: '+influence_rank + '</p>'
                  +'<li><i class="fa fa-phone fa-lg"></i> ' + phone + '</li>'
                  +'<li><i class="fa fa-home fa-lg"></i> ' + website + '</li></ul></div>');

                $("#thumbnail").attr('src',picture_url);

                $.ajax({
                    type: "GET",
                    url: "http://api.civic-compass.org/api/v1/aggregate_influence_and_ideology_scores.json",
                    data: { },
                    success: function(data) {
                        var influence_and_ideology_array = []
                        var aggregate_scores = data["legislators"][0]["aggregate_influence_and_ideology_scores"];
                        for (var i = 0; i < aggregate_scores.length; i++) {
                            point_object = new Object();
                            point_object.x = aggregate_scores[i]["ideology_rank"];
                            point_object.y = aggregate_scores[i]["influence_rank"];
                            point_object.name = aggregate_scores[i]["firstname"] + " " + aggregate_scores[i]["lastname"];
                            point_object.party = aggregate_scores[i]["party"];
                            point_object.state = aggregate_scores[i]["state"];
                            if (aggregate_scores[i]["party"] == "Republican") {
                                point_object.fillColor = "rgba(223, 83, 83, .5)";
                            } else {
                                 point_object.fillColor = "rgba(119, 152, 191, .5)";
                            }
                            influence_and_ideology_array.push(point_object);
                        }
                        influence_and_ideology_scatter_function (influence_and_ideology_array)
                    }
                })
                 $.ajax({
                    type: "GET",
                    url: "http://api.civic-compass.org/api/v1/elections_timeline.json",
                    data: { lastname: lastname,
                       state: state,
                       title: title,
                   },
                    success: function(data) {
                        timeline_function (data)
                    }
                })
                $.ajax({
                    type: "GET",
                    url: "http://api.civic-compass.org/api/v1/contributors_by_type.json",
                    data: { lastname: lastname,
                        state: state,
                        title: title,
                    },
                    success:function(data){
                        type_function (data)
                    }
                })
                $.ajax({
                    type:"GET",
                    url: "http://api.civic-compass.org/api/v1/top_contributors.json",
                    data: { lastname: lastname,
                        state: state,
                        title: title,
                    },
                    success:function(data){
                        topContributors_function (data)
                    }
                }),
                $.ajax({
                    type:"GET",
                    url:"http://api.civic-compass.org/api/v1/most_recent_votes.json",
                    data: {   lastname: lastname,
                                state: state,
                                title: title,
                    },
                    success:function(data){
                        votingRecord_function (data)
                    }
                }),


                $.when( $.ajax(ajax_contributions_by_industry) , $.ajax(ajax_agreement_by_industry) ).done(function( contributions, agreement_score ) {
                    sector_function(contributions);
                    var contributions_object = contributions[0].legislators[0].contributions_by_industry;
                    var agreement_object = agreement_score[0].legislators[0].agreement_score_by_industry
                    var bigDataArray = []
                    for (var industry in contributions_object) {
                        var point_object = new Object();
                        point_object.x = contributions_object[industry];
                        point_object.y = agreement_object[industry];
                        point_object.name = industry;
                        bigDataArray.push(point_object);
                    }
                        scatterplot_function(bigDataArray)

                });
            }
        })
    });
});


