$(document).ready(function() {

    $("body").css("display", "none");


    populateWithAPIData();
    updateCurrentDateTime();

    $("body").fadeIn(1000, function() {
        $(this).css("display", "normal");
    });

    setInterval(updateCurrentDateTime, 1000);

});


function updateCurrentDateTime() {
    $('#currentDateTime').text(convertTimestamp(Math.floor(Date.now() / 1000)));
}


function populateWithAPIData() {
    $.get("https://api.spacexdata.com/v3/launches/upcoming", function(launches_data) {
        console.log(launches_data);

        const launches_table = '#launches';
        $(launches_table).empty();

        const detailed_list = '#detailed';

        $('.launchDetail').empty();

        for (let i = 0; i < launches_data.length; i++) {
            let tr;
            let tr_id = "record_" + i;
            let detailed_id = "detailed_" + i;

            tr = $('<tr id=\"' + tr_id + '\">');
            tr.append("<td>" + launches_data[i].flight_number + "</td>");
            tr.append("<td>" + convertTimestamp(launches_data[i].launch_date_unix) + "</td>");
            tr.append("<td>" + launches_data[i].mission_name + "</td>");
            tr.append("<td>" + launches_data[i].rocket.rocket_id + "</td>");
            tr.append('</tr>');
            $(launches_table).append(tr);


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

            $(detailed_list).append(detailed);
            $('#' + detailed_id).hide();

        }

    });
}


// Code from: https://gist.github.com/kmaida/6045266
function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
        ampm = 'AM',
        time;



    time = yyyy + '-' + mm + '-' + dd + ', ' + h.toString().padStart(2, '0') + ':' + min;

    return time;
}