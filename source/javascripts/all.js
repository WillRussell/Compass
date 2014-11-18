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