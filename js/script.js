$(document).ready(function () {

    console.log(fetchdata());


});

function getdata(start, limit) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.coinmarketcap.com/v1/ticker/?start=" + start + "&limit=" + limit, false);
    xhr.send();

    return JSON.parse(xhr.response); //city details

}


function fetchdata() {
    var start = 0;
    var limit = 10;

    var data = getdata(start, limit);
    var t = $('#table').DataTable({
        'iDisplayLength': -1,
        "bPaginate": false,
        "aaSorting": [[1, "asc"]],
        "columnDefs": [
            {className: "coin", "targets": [0]}
        ]
    });


    for (var i = 0; i < data.length; i++) {

        t.row.add([
            "<img id='coin-icon' src='https://coinmark.co/assets/extension/coins/" + data[i].id + ".png'>" + " " + data[i].name,
            data[i].rank,
            data[i].price_usd,
            "<div class='hour" + i + "'>" + data[i].percent_change_1h + "%</div>",
            "<div class='day" + i + "'>" + data[i].percent_change_24h + "%</div>",
            "<div class='week" + i + "'>" + data[i].percent_change_7d + "%</div>"
        ]).draw(false);

        if (data[i].percent_change_1h > 0) {
            $(".hour" + i).addClass("green");
        } else {
            $(".hour" + i).addClass("red");
        }

        if (data[i].percent_change_24h > 0) {
            $(".day" + i).addClass("green");
        } else {
            $(".day" + i).addClass("red");
        }

        if (data[i].percent_change_7d > 0) {
            $(".week" + i).addClass("green");
        } else {
            $(".week" + i).addClass("red");
        }

    }


    $("#load-more").click(function () {
        start = start + 10;

        var data = getdata(start, limit);


        for (var i = 0; i < data.length; i++) {

            t.row.add([
                "<img id='coin-icon' src='https://coinmark.co/assets/extension/coins/" + data[i].id + ".png'>" + " " + data[i].name,
                data[i].rank,
                data[i].price_usd,
                "<div class='hour" + i + "'>" + data[i].percent_change_1h + "%</div>",
                "<div class='day" + i + "'>" + data[i].percent_change_24h + "%</div>",
                "<div class='week" + i + "'>" + data[i].percent_change_7d + "%</div>"
            ]).draw(false);

            if (data[i].percent_change_1h > 0) {
                $(".hour" + i).addClass("green");
            } else {
                $(".hour" + i).addClass("red");
            }

            if (data[i].percent_change_24h > 0) {
                $(".day" + i).addClass("green");
            } else {
                $(".day" + i).addClass("red");
            }

            if (data[i].percent_change_7d > 0) {
                $(".week" + i).addClass("green");
            } else {
                $(".week" + i).addClass("red");
            }

        }


    });


}

