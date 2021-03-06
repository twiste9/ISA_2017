var url = window.location.href;
var str = url.split("=");
$(document).ready(function() {	
	$.ajax({
		url: "../institution/" + str[1],
		success: function(data){
			$("#name").val(data.name);
			$("#address").val(data.address);
			$("#description").val(data.description);
			$("#hiddenType").append('<input type="text" id="id" value="'+ data.id +'" />')
			$("#hiddenType").append('<input type="text" id="typeId" value="'+ data.type.id +'" />')
			$("#hiddenType").append('<input type="text" id="typeName" value="'+ data.type.name +'" />')
			$("#hiddenType").append('<input type="text" id="adminId" value="'+ data.admin.id +'" />')
		} 
	});
});


function Save(){
	
	var obj = new Object();
	obj.name = $("#name").val();
	obj.address = $("#address").val();
	obj.description = $("#description").val();
	var type = new Object();
	type.id =  $("#typeId").val();
	obj.type = type;
	
	var admin = new Object();
	admin.id = $("#adminId").val();
	obj.admin = admin;	
	
	$.ajax({
		url: "../institution",
		data: JSON.stringify(obj),
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		success: function(data){
			window.location.href="../Institutions.html?type=" + data.type.name; 
		}
	});
}

function Cancel(){
	window.history.back();
}