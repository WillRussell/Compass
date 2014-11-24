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
                    $( ".legislator-list" ).append( '<div class="small-4 columns"><li><a href="#"  id="legis-select">' + "<img src=" + picture + ">"  + "</li>" +  '<li>' +firstname + " " +
                    lastname + " " + "(" + party + ")"  +  '</a></li></div>');
                }
            }
        });
         $('.panel').slideDown(400);
    });
});


$(function () {
 $("#legis-select").on('click', function () {
        $('.panel').slideUp(400);
    });
});


