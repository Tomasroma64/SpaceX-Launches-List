$(document).ready(function() {


    $.get("https://api.spacexdata.com/v3/launches/upcoming", function(launches_data) {
        //$('#launches').text(launches_data);
        console.log(launches_data);

        var tr;
        for (var i = 0; i < launches_data.length; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + launches_data[i].flight_number + "</td>");
            tr.append("<td>" + launches_data[i].details + "</td>");
            tr.append("<td>" + launches_data[i].rocket.rocket_id + "</td>");
            $('#launches').append(tr);
        }


    });


});