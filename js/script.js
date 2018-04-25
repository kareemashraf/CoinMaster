$(document).ready(function () {

var currency = "USD"; //start with usd

fetchdata(currency);



  // add currencies
  curr();

    

    $( ".currency" ).change(function() { alert('change');

    var currency = $(".currency").val(); 

    table = $('#table').DataTable();
      table.clear().draw();
      table.destroy();

      fetchdata(currency);
      curr();
      // $(".currency").val(currency);

    });


});

function getdata(currency, start, limit) {

  // var currency = $(".currency").val(); 

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.coinmarketcap.com/v1/ticker/?start=" + start + "&limit=" + limit+"&convert="+currency, false);
    xhr.send();

    return JSON.parse(xhr.response); //city details

}


function fetchdata(currency) {

    var start = 0;
    var limit = 10;



    

    var data = getdata(currency, start, limit);
    
    var t = $('#table').DataTable({
        "iDisplayLength": -1,
        // "bPaginate": false,
        "aaSorting": [[1, "asc"]],
        "columnDefs": [
            {className: "coin", "targets": [0]}
        ],
        "fixedHeader": {
            "header": true
        }
    });
    var price = "price_"+currency.toLowerCase();


		for (var i = 0; i< data.length; i++) {
        t.row.add([
            "<img id='coin-icon' src='https://coinmark.co/assets/extension/coins/" + data[i].id + ".png'>" + " " + data[i].name,
            data[i].rank,
            eval("data["+i+"]."+price)+" "+symbol(currency) ,
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
        
        var currency = $(".currency").val();
        var data = getdata(currency, start, limit);

console.log('start '+currency);
        for (var i = 0; i < data.length; i++) {

            t.row.add([
                "<img id='coin-icon' src='https://coinmark.co/assets/extension/coins/" + data[i].id + ".png'>" + " " + data[i].name,
                data[i].rank,
                eval("data["+i+"]."+price)+" "+symbol(currency) ,
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



function symbol(currency){

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

        if(currency_symbols[currency]!==undefined) {
            var symbol = currency_symbols[currency];
        }else{
          var symbol = currency.toLowerCase();
        }
        return symbol;
}

function curr(){

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


                for (var i = 0 ; i <= array.length; i++) {
                  $(".currency").append(array[i]);
                }
}

