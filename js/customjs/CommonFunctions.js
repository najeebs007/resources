/**
 * all common function will contain this js file
 * author Rajesh Rawat
 */




function countTableRow(tableId){
	
	var rows = $("#"+tableId).attr('rows').length;
	var rowCount = $('#'+tableId+' tr').length;
	return rowCount;
}

var files = [];
$(document).on("change", "#chooseFile", function(event) {
	files = event.target.files;
	evt.preventDefault();
})

$(document).on("click", "#fileSubmit", function() {
	processUpload();
})


function processUpload() {
	var MyForm = new FormData();
	MyForm.append("file", files[0]);
	$.ajax({
		dataType : 'json',
		url : "/corporate/uploadQuestions",
		data : MyForm,
		type : "POST",
		enctype : 'multipart/form-data',
		processData : false,
		contentType : false,
		success : function(data) {
			
		},
		error : function(error) {
			//...;
		}
	});
}