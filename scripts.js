$(document).ready(function() {

    $.get("https://api.spacexdata.com/v3/launches/upcoming", function(launches_data) {
        console.log(launches_data);


        for (let i = 0; i < launches_data.length; i++) {
            let tr;
            let tr_id = "record_" + i;
            let detailed_id = "detailed_" + i;

            tr = $('<tr id=\"' + tr_id + '\">');
            tr.append("<td>" + launches_data[i].flight_number + "</td>");
            tr.append("<td>" + launches_data[i].launch_date_utc + "</td>");
            tr.append("<td>" + launches_data[i].mission_name + "</td>");
            tr.append("<td>" + launches_data[i].rocket.rocket_id + "</td>");
            tr.append('</tr>');
            $('#launches').append(tr);


            $('#' + tr_id).on('click', function() {
                $('.launchDetail').hide();
                $('#' + detailed_id).show();
            });

            detailed = $('<div class=\"launchDetail\" id=\"' + detailed_id + '\">');

            detailed.append($('<p>' + 'Date' + '</p>'));
            detailed.append($('<p>' + launches_data[i].launch_date_utc + '</p>'));
            detailed.append($('<br>'));

            detailed.append($('<p>' + 'Mission name' + '</p>'));
            detailed.append($('<p>' + launches_data[i].mission_name + '</p>'));
            detailed.append($('<br>'));

            detailed.append($('<p>' + 'Flight number' + '</p>'));
            detailed.append($('<p>' + launches_data[i].flight_number + '</p>'));
            detailed.append($('<br>'));

            detailed.append($('<p>' + 'Details' + '</p>'));
            detailed.append($('<p>' + launches_data[i].details + '</p>'));
            detailed.append('</div>');

            $('#detailed').append(detailed);
            $('#' + detailed_id).hide();

        }

    });


    $("body").css("display", "none");
    $("body").fadeIn(1000, function() {
        $(this).css("display", "normal");
    });


    setInterval(function() {
        $('#currentDateTime').text(new Date())
    }, 100);


});