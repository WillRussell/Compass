//= require jquery/dist/jquery
//= require foundation/js/foundation.min

//= require app
//= require script

$(function() {
    $('#location-button').on('click', function () {
        var input_address = $('#address').val();
        $.ajax({
        type: "GET",
        url: "https://peaceful-sea-4129.herokuapp.com/api/v1/search.json",
        data: { address : input_address },
        success: function(data) {
            var numLegislators =data["legislators"].length;
            var profile = data;
                for (var i = 0; i < numLegislators; i++) {
                    $(".legislators").append(JSON.stringify(profile["legislators"][i]["firstname"])) +
                    $(".legislators").append(JSON.stringify(profile["legislators"][i]["lastname"]));
                }
            }
        });
    });
});

