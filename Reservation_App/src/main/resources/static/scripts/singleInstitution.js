var url = window.location.href;
var str = url.split("=");

$(document).ready(function() {
	$.ajax({
		url: "../event/getEvents/" + str[1],
		success: function(data){
			data.groups.map(createEventElements);
		}
	});
	$.ajax({
		url: '../institution/history/' + str[1],
       	type: "PUT",
       	success: function(data){
       		
       	}
   	});
});


function createEventElements(events){
	var str = "";
	str += '<div style=\"padding: 5px;\">';
	str += '<button type=\"button\" class=\"btn\" style=\"width: 100%; height: 30px; background: #d9d9d9;\" data-toggle=\"collapse\" data-target=\"#'+ events[0].id + '\"\">'+ events[0].show.name +'</button>';
	str += '<div id=\"'+ events[0].id + '\" class=\"collapse in\">';
	str += '<div class="row">';
	str += '<div class="col-sm-2">';
	str += '<img src=\"data:image/png;base64,' + events[0].show.pictureDB +'\" alt=\"'+events[0].show.name+'\" style="width:100px;height:100px;" />';
	str += '</div>';
	str += '<div class="col-sm-6">';
	str += '<ul>';
	str += '<li>Type: '+ events[0].show.type.name +'</li>';
	str += '<li>Genre: '+ events[0].show.genre.name +'</li>';
	str += '<li>Length: '+ events[0].show.length +'</li>';
	
	var date = new Date(events[0].eventDate);
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	
	str += '<li>Date: ' + day + "/" + month + "/"+ year  +'</li>';
	str += '<li>Cast: '+ events[0].show.cast +'</li>';
//	if(isNaN(institutionRated.rating)){
//		str += '<li>Rating: Have not been rated yet.</li>';
//	}else{
//		str += '<li>Rating: '+ institutionRated.rating +'</li>';
//	}
	str += '<li>Description: '+ events[0].show.description +'</li>';
	str += '</ul>';
	str += '</div>';
	
	str += '<div class="col-sm-4">';	
	str += '<ul>';
	for(var i=0; i< events.length; i++){
		var date = new Date(events[i].eventDate);
		var hours = date.getHours();
		var minutes = date.getMinutes();
		
		str += '<li><a href="../Event.html?id='+ events[i].id +'">Hall: '+ events[i].hall.name +', time: ' + hours + ":" + minutes + ' - Price: ' + events[i].price +'</a></li>';	
	}
	str += '</ul>';
	str += '</div>';
	
	str += "</div>";
	str += "</div>";
	str += '</div>';
	$('#showEvents').append(str);
}


function QuickReservations(){
	window.location.href = "../QuickReservations.html?id=" + str[1];
}

function Create(){
	window.location.href = "../CreateEvent.html?id=" + str[1];
}


function Halls(){
	window.location.href = "../Halls.html?id=" + str[1];
}


function Edit(id){
	window.location.href = "../EditEvents.html?id=" + id;
}

function Reports(){
	window.location.href = "../Reports.html?id=" + str[1];
}





