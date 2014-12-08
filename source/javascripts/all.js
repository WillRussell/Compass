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
    $('.search-button').on('click', function () {

        var input_address = $('#address').val();
        $.ajax({
        type: "GET",
        url: "https://peaceful-sea-4129.herokuapp.com/api/v1/search.json",
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
                                    url:"https://peaceful-sea-4129.herokuapp.com/api/v1/contributions_by_industry.json",
                                    data: { lastname: lastname,
                                              state: state,
                                              title: title,
                                    },
                    };
                    var ajax_agreement_by_industry = {
                    type:"GET",
                    url:"https://peaceful-sea-4129.herokuapp.com/api/v1/agreement_score_by_industry.json",
                    data: { lastname: lastname,
                              state: state,
                              title: title,
                    },
                    };

                $(".legislator-profile").append('<img id="profile-pic" src=' + picture_url + ' ">'
                    +'<h3>' + name + '  ' + '('+party+')' + '</h3>'
                    + '<ul class="profile-list"><li><i class="fa fa-map-marker fa-lg"></i> ' + state + "'s " + district + '</li>'
                   + '<li><i class="fa fa-twitter fa-lg"></i> @' + twitter_id + '</li>'
                 // + '<p>Ideology rank: ' + ideology_rank + '</p>'
                 //  + '<p>Influence rank: '+influence_rank + '</p>'
                  +'<li><i class="fa fa-phone fa-lg"></i> ' + phone + '</li>'
                  +'<li><i class="fa fa-home fa-lg"></i> ' + website + '</li></ul>');

                $("#thumbnail").attr('src',picture_url);

                $.ajax({
                    type: "GET",
                    url: "http://peaceful-sea-4129.herokuapp.com/api/v1/elections_timeline.json",
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
                    url: "http://peaceful-sea-4129.herokuapp.com/api/v1/contributors_by_type.json",
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
                    url: "https://peaceful-sea-4129.herokuapp.com/api/v1/top_contributors.json",
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
                    url:"https://peaceful-sea-4129.herokuapp.com/api/v1/most_recent_votes.json",
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




                // Delete
                // $.ajax({
                //     type:"GET",
                //     url:"https://peaceful-sea-4129.herokuapp.com/api/v1/issue_ratings.json",
                //     data: { lastname: lastname,
                //               state: state,
                //               title: title,
                //     },
                //     success:function(data){
                //         issueRatings_function (data)
                //     }
                // }),
                // $.ajax({
                //     type:"GET",
                //     url:"http://peaceful-sea-4129.herokuapp.com/api/v1/aggregated_legislator_issue_scores.json",
                //     data: { issue: "Oil and Energy" },
                //     success:function(data){
                //         energyRatings_function (data)
                //     }
                // })
            }
        })
    });
});






/* detect touch */
if("ontouchstart" in window){
    document.documentElement.className = document.documentElement.className + " touch";
}
if(!$("html").hasClass("touch")){
    /* background fix */
    $(".parallax").css("background-attachment", "fixed");
}

/* fix vertical when not overflow
call fullscreenFix() if .fullscreen content changes */
function fullscreenFix(){
    var h = $('body').height();
    // set .fullscreen height
    $(".content-b").each(function(i){
        if($(this).innerHeight() <= h){
            $(this).closest(".fullscreen").addClass("not-overflow");
        }
    });
}
$(window).resize(fullscreenFix);
fullscreenFix();

/* resize background images */
function backgroundResize(){
    var windowH = $(window).height();
    $(".background").each(function(i){
        var path = $(this);
        // variables
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        // overflowing difference
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;
        if(path.hasClass("parallax") && !$("html").hasClass("touch")){
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        // fix when too large
        if(contW > imgW){
            imgW = contW;
            imgH = imgW / ratio;
        }
        //
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();

/* set parallax background-position */
function parallaxPosition(e){
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $(".parallax").each(function(i){
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        // only when in range
        if(bottomWindow > top && topWindow < bottom){
            var imgW = path.data("resized-imgW");
            var imgH = path.data("resized-imgH");
            // min when image touch top of window
            var min = 0;
            // max when image touch bottom of window
            var max = - imgH + heightWindow;
            // overflow changes parallax
            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
            top = top - overflowH;
            bottom = bottom + overflowH;
            // value with linear interpolation
            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
            // set background-position
            var orizontalPosition = path.attr("data-oriz-pos");
            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
            $(this).css("background-position", orizontalPosition + " " + value + "px");
        }
    });
}
if(!$("html").hasClass("touch")){
    $(window).resize(parallaxPosition);
    //$(window).focus(parallaxPosition);
    $(window).scroll(parallaxPosition);
    parallaxPosition();
}

