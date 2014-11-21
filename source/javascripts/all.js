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
                for (var i = 0; i < numLegislators; i++) {
                    var firstname = JSON.stringify(data["legislators"][i]["firstname"]).slice(1, -1);
                    var lastname = JSON.stringify(data["legislators"][i]["lastname"]).slice(1, -1);
                    var party = JSON.stringify(data["legislators"][i]["party"]).slice(1, -1);
                    var picture = JSON.stringify(data["legislators"][i]["picture_url"]);
                    $( ".legislator-list" ).append( '<li><a href="#"  class="legis-select">' + firstname + " " +
                    lastname + " " + "(" + party + ")" + " " + "<img src=" + picture + '</a></li>');
                }
            }
        });
         $('.panel').fadeIn(700);
    });
});

$(function() {
    $(".legis-select").on('click', function () {
        $('.panel').hide();
    });
});