$(document).ready(function () {

console.log(fetchdata());
    $('#table').DataTable();
    

});

function getdata(){
	var xhr = new XMLHttpRequest();

		xhr.open("GET", "https://api.coinmarketcap.com/v1/ticker/", false);
		xhr.send();
		
		return JSON.parse(xhr.response); //city details

}


function fetchdata(){

	var data = getdata();


		for (var i = 0; i< data.length; i++) {
			console.log(data[i].rank);
			$("#tbody").append("<tr id='"+i+"'>");
            $("#tbody #"+i+"").append("<td>"+data[i].rank+"</td>");
			$("#tbody #"+i+"").append("<td><img id='coin-icon' src='https://coinmark.co/assets/extension/coins/"+data[i].id+".png'> "+' '+data[i].name+"</td>");
            $("#tbody #"+i+"").append("<td>"+data[i].price_usd+" $</td>");

            if (data[i].percent_change_1h > 0){
                $("#tbody #"+i+"").append("<td><div style='color: green'>"+data[i].percent_change_1h+"%</td>");
			}else{
                $("#tbody #"+i+"").append("<td><div style='color: red'>"+data[i].percent_change_1h+"%</td>");
			}

            if (data[i].percent_change_24h > 0){
                $("#tbody #"+i+"").append("<td><div style='color: green'>"+data[i].percent_change_24h+"%</td>");
            }else{
                $("#tbody #"+i+"").append("<td><div style='color: red'>"+data[i].percent_change_24h+"%</td>");
            }

            if (data[i].percent_change_7d > 0){
                $("#tbody #"+i+"").append("<td><div style='color: green'>"+data[i].percent_change_7d+"%</td>");
            }else{
                $("#tbody #"+i+"").append("<td><div style='color: red'>"+data[i].percent_change_7d+"%</td>");
            }
			$("#tbody").append("</tr>");
		}


	
}

