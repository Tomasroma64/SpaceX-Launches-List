const launches_table = '#launches';
const detailed_list = '#detailed';



$(document).ready(function() {

    $("#middle").css("display", "none");


    populateWithAPIData();
    updateCurrentDateTime();

    $("#middle").fadeIn(1000, function() {
        $(this).css("display", "normal");
    });

    setInterval(updateCurrentDateTime, 1000);

});

$('#updateData').on('click', function() {
    deleteAllData();
    populateWithAPIData();
});


function updateCurrentDateTime() {
    $('#currentDateTime').text(timestampToFormattedDate(Math.floor(Date.now() / 1000)));
}


function deleteAllData() {
    $(launches_table).empty();
    $(detailed_list).empty();
}


function populateWithAPIData() {
    $.get("https://api.spacexdata.com/v3/launches/upcoming", function(launches_data) {
        console.log(launches_data);

        for (let i = 0; i < launches_data.length; i++) {
            let tr;
            let tr_id = "record_" + i;
            let detailed_id = "detailed_" + i;

            tr = $('<tr id=\"' + tr_id + '\">');
            tr.append("<td>" + launches_data[i].flight_number + "</td>");
            tr.append("<td>" + timestampToCountdown(launches_data[i].launch_date_unix) + "</td>");
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
            detailed.append($('<p>' + timestampToFormattedDate(launches_data[i].launch_date_unix) + '</p>'));
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


function timestampToCountdown(timestamp) {


    var distance = new Date(timestamp * 1000).getTime() - new Date().getTime()

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}

// Code from: https://gist.github.com/kmaida/6045266
function timestampToFormattedDate(timestamp) {
    var base_date = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = base_date.getFullYear(),
        mm = ('0' + (base_date.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
        dd = ('0' + base_date.getDate()).slice(-2), // Add leading 0.
        hh = base_date.getHours(),
        h = hh,
        min = ('0' + base_date.getMinutes()).slice(-2), // Add leading 0.
        ampm = 'AM',
        time;

    time = yyyy + '-' + mm + '-' + dd + ', ' + h.toString().padStart(2, '0') + ':' + min;

    return time;
}