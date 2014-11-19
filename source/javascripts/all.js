//= require jquery/dist/jquery
//= require foundation/js/foundation.min

//= require app
//= require script

$(function() {
    $('#location-button').on('click', function () {
        var input_address = $('#address').val();
        $.ajax({
        type: "GET",
        url: "http://requestb.in/t9jg5xt9",
        data: { address : input_address },
        });
    });
});


// $(".legislators").append(legislator);




        // success: function(data) {
        // var legislator =$.map(data,
        // function (legislator) {return "legislator.first_name";});



$.ajax({
  dataType: "json",
  url: "https://peaceful-sea-4129.herokuapp.com/api/v1/search.json",
  data: {},
  success: function(data) {
    var profile = data;

    $(".legislators").append(profile[0].first_name)
  },
});



$.ajax({
  dataType: "json",
  url: "https://api.github.com/users/willrussell",
  data: {},
  success: function(data) {
    var profile = data;

    $(".followers").append(profile.followers)
  },
});