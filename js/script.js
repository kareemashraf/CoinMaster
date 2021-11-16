$(document).ready(function () {


    fetchdata(null);

    // add currencies
    curr();

    $(document).on('change', 'select', curchange);


});

function getdata(currency, page, start, limit ) {

    // var currency = $(".currency").val();
    console.log('page = ',page);

    var xhr = new XMLHttpRequest();

    // xhr.open("GET", "https://pro-api.coinmarketcap.com/v1/ticker/?start=" + start + "&limit=" + limit + "&convert=" + currency, false);
    xhr.open("GET", "https://api.coingecko.com/api/v3/coins/markets?vs_currency="+currency+"&order=market_cap_desc&per_page=100&page="+page+"&sparkline=false", false);
    xhr.send();

    return JSON.parse(xhr.response); //city details

}


function fetchdata(currency) {

    var page = 1;

    if (currency == null) {
        currency = "USD";
    }


    var data = getdata(currency, page);

    var t = $('#table').DataTable({
        "responsive": true,
        "iDisplayLength": -1,
        // "bPaginate": false,
        "aaSorting": [[1, "asc"]],
        // "columnDefs": [
        //     {className: "coin", "targets": [0]}
        // ],
        "fixedHeader": {
            "header": true
        }
    });
    $('table.dataTable thead .sorting_asc').css('background-image', 'none' );

    $( "#table tbody tr" ).mouseover(function() {
          $(this).addClass("highlight");
        });


    // var price = "price_" + currency.toLowerCase();


    for (var i = 0; i < data.length; i++) {

        var img_name = (data[i].name).toLowerCase();
        // img_name = img_name.replace(/ /g, "-");

        t.row.add([
            "<img class='coin-icon ' src='"+data[i].image+"'   >" + " <a target='_blank' href='https://coinmarketcap.com/currencies/"+img_name+"' >" + data[i].name+"</a>",
            data[i].market_cap_rank,
           symbol(currency)+" "+data[i].current_price+'',
            "<div class='hour" + i + "'>" +symbol(currency)+ data[i].market_cap + "</div>",
            "<div class='day" + i + "'>" + data[i].price_change_percentage_24h + "%</div>",
            "<div class='week" + i + "'>" + data[i].ath_change_percentage + "%</div>",
            "<a href='https://changelly.com/widget/v1?auth=email&from=usd&to="+data[i].symbol+"' target='_blank'><button type='button'  class='btn btn-primary btn-xs'>Buy</button> </a> | <a href='https://changelly.com/widget/v1?auth=email&from="+data[i].symbol+"&to=usd' target='_blank' ><button type='button' class='btn btn-danger btn-xs'>Sell</button></a>"
        ]).draw(false);


        if (data[i].price_change_percentage_24h > 0) {
            $(".day" + i).addClass("green");
        } else {
            $(".day" + i).addClass("red");
        }

        if (data[i].ath_change_percentage > 0) {
            $(".week" + i).addClass("green");
        } else {
            $(".week" + i).addClass("red");
        }

    }

    var clicks = 0;
    $("#load-more").click(function () {
        clicks++;

        if (clicks >= 1) {
            page = page + 1;
        }
        // else {
        //     page = page;
        // }

        console.log("clicks= "+clicks + " pages= " + page);
        var currency = $(".currency").val();
        var data = getdata(currency, page);


        for (var i = 0; i < data.length; i++) {

            var img_name = (data[i].name).toLowerCase();
            img_name = img_name.replace(/ /g, "-");

            t.row.add([
                "<img class='coin-icon' src='"+data[i].image+"'   >" + " <a target='_blank' href='https://coinmarketcap.com/currencies/"+img_name+"' >" + data[i].name+"</a>",
                data[i].market_cap_rank,
                symbol(currency)+" "+data[i].current_price+'',
                "<div class='hour" + i + "'>" +symbol(currency)+ data[i].market_cap + "</div>",
                "<div class='day" + i + "'>" + data[i].price_change_percentage_24h + "%</div>",
                "<div class='week" + i + "'>" + data[i].ath_change_percentage + "%</div>",
                "<a href='https://changelly.com/widget/v1?auth=email&from=usd&to="+data[i].symbol+"' target='_blank'><button type='button'  class='btn btn-primary btn-xs'>Buy</button> </a> | <a href='https://changelly.com/widget/v1?auth=email&from="+data[i].symbol+"&to=usd' target='_blank'><button type='button' class='btn btn-danger btn-xs'>Sell</button></a>"
            ]).draw(false);

            if (data[i].price_change_percentage_24h > 0) {
                $(".day" + i).addClass("green");
            } else {
                $(".day" + i).addClass("red");
            }

            if (data[i].ath_change_percentage > 0) {
                $(".week" + i).addClass("green");
            } else {
                $(".week" + i).addClass("red");
            }

        }


    });


}


function symbol(currency) {

    var currency_symbols = {
        'USD': '$', // US Dollar
        'EUR': '€', // Euro
        'CRC': '₡', // Costa Rican Colón
        'GBP': '£', // British Pound Sterling
        'ILS': '₪', // Israeli New Sheqel
        'INR': '₹', // Indian Rupee
        'JPY': '¥', // Japanese Yen
        'KRW': '₩', // South Korean Won
        'NGN': '₦', // Nigerian Naira
        'PHP': '₱', // Philippine Peso
        'PLN': 'zł', // Polish Zloty
        'PYG': '₲', // Paraguayan Guarani
        'THB': '฿', // Thai Baht
        'UAH': '₴', // Ukrainian Hryvnia
        'VND': '₫', // Vietnamese Dong
    };

    if (currency_symbols[currency] !== undefined) {
        var symbol = currency_symbols[currency];
    } else {
        var symbol = currency.toLowerCase();
    }
    return symbol;
}

function curr() {

    $("#table_length").append('<select class="form-control currency" ></select>');

    var array = ['<option value="USD">USD</option>',
        '<option value="AUD">AUD</option>',
        '<option value="BRL">BRL</option>',
        '<option value="CAD">CAD</option>',
        '<option value="CHF">CHF</option>',
        '<option value="CLP">CLP</option>',
        '<option value="CNY">CNY</option>',
        '<option value="CZK">CZK</option>',
        '<option value="DKK">DKK</option>',
        '<option value="EUR">EUR</option>',
        '<option value="GBP">GBP</option>',
        '<option value="HKD">HKD</option>',
        '<option value="HUF">HUF</option>',
        '<option value="IDR">IDR</option>',
        '<option value="ILS">ILS</option>',
        '<option value="INR">INR</option>',
        '<option value="JPY">JPY</option>',
        '<option value="KRW">KRW</option>',
        '<option value="MXN">MXN</option>',
        '<option value="MYR">MYR</option>',
        '<option value="NOK">NOK</option>',
        '<option value="NZD">NZD</option>',
        '<option value="PHP">PHP</option>',
        '<option value="PKR">PKR</option>',
        '<option value="PLN">PLN</option>',
        '<option value="RUB">RUB</option>',
        '<option value="SEK">SEK</option>',
        '<option value="SGD">SGD</option>',
        '<option value="THB">THB</option>',
        '<option value="TRY">TRY</option>',
        '<option value="TWD">TWD</option>',
        '<option value="ZAR">ZAR</option>'];


    for (var i = 0; i <= array.length; i++) {
        $(".currency").append(array[i]);
    }
}

function curchange() {

    var currency = $(".currency").val();

    table = $('#table').DataTable();
    table.clear().draw();
    table.destroy();

    fetchdata(currency);
    curr();
    $(".currency").val(currency);


}

function imgError() {
    alert(this.src);
}



