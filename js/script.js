$(document).ready(function () {

console.log(fetchdata());
    $('#table').dataTable({
        'iDisplayLength': -1
    });


});

function getdata(start, limit){
	var xhr = new XMLHttpRequest();

		xhr.open("GET", "https://api.coinmarketcap.com/v1/ticker/?start="+start+"&limit="+limit, false);
		xhr.send();
		
		return JSON.parse(xhr.response); //city details

}


function fetchdata(){
var start = 0;
var limit = 10;

	var data = getdata(start, limit);


		for (var i = 0; i< data.length; i++) {

			$("#tbody").append("<tr id='"+data[i].rank+"'>");
            $("#tbody #"+data[i].rank+"").append("<td>"+data[i].rank+"</td>");
			$("#tbody #"+data[i].rank+"").append("<td><img id='coin-icon' src='https://coinmark.co/assets/extension/coins/"+data[i].id+".png'> "+' '+data[i].name+"</td>");
            $("#tbody #"+data[i].rank+"").append("<td>"+data[i].price_usd+" $</td>");

            if (data[i].percent_change_1h > 0){
                $("#tbody #"+data[i].rank+"").append("<td><div style='color: green'>"+data[i].percent_change_1h+"%</div></td>");
			}else{
                $("#tbody #"+data[i].rank+"").append("<td><div style='color: red'>"+data[i].percent_change_1h+"%</div></td>");
			}

            if (data[i].percent_change_24h > 0){
                $("#tbody #"+data[i].rank+"").append("<td><div style='color: green'>"+data[i].percent_change_24h+"%</div></td>");
            }else{
                $("#tbody #"+data[i].rank+"").append("<td><div style='color: red'>"+data[i].percent_change_24h+"%</div></td>");
            }

            if (data[i].percent_change_7d > 0){
                $("#tbody #"+data[i].rank+"").append("<td>"+data[i].percent_change_7d+"%</td>");
            }else{
                $("#tbody #"+data[i].rank+"").append("<td>"+data[i].percent_change_7d+"%</td>");
            }
			$("#tbody").append("</tr>");
		}




    $("#load-more").click(function(){
        start = start + 10;
        limit = limit +10;

        var data = getdata(start, limit);


        for (var i = 0; i< data.length; i++) {

            $("#tbody").append("<tr id='"+data[i].rank+"' role='row'>");
            $("#tbody #"+data[i].rank+"").append("<td>"+data[i].rank+"</td>");
            $("#tbody #"+data[i].rank+"").append("<td><img id='coin-icon' src='https://coinmark.co/assets/extension/coins/"+data[i].id+".png'> "+' '+data[i].name+"</td>");
            $("#tbody #"+data[i].rank+"").append("<td>"+data[i].price_usd+" $</td>");

            if (data[i].percent_change_1h > 0){
                $("#tbody #"+data[i].rank+"").append("<td><div style='color: green'>"+data[i].percent_change_1h+"%</div></td>");
            }else{
                $("#tbody #"+data[i].rank+"").append("<td><div style='color: red'>"+data[i].percent_change_1h+"%</div></td>");
            }

            if (data[i].percent_change_24h > 0){
                $("#tbody #"+data[i].rank+"").append("<td><div style='color: green'>"+data[i].percent_change_24h+"%</div></td>");
            }else{
                $("#tbody #"+data[i].rank+"").append("<td><div style='color: red'>"+data[i].percent_change_24h+"%</div></td>");
            }

            if (data[i].percent_change_7d > 0){
                $("#tbody #"+data[i].rank+"").append("<td>"+data[i].percent_change_7d+"%</td>");
            }else{
                $("#tbody #"+data[i].rank+"").append("<td>"+data[i].percent_change_7d+"%</td>");
            }
            $("#tbody").append("</tr>");
        }



    });


	
}

