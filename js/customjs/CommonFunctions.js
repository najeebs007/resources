/**
 * all common function will contain this js file author Rajesh Rawat
 */

function countTableRow(tableId) {

	var rows = $("#" + tableId).attr('rows').length;
	var rowCount = $('#' + tableId + ' tr').length;
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
		url : "/smopl/corporate/uploadQuestions",
		data : MyForm,
		type : "POST",
		enctype : 'multipart/form-data',
		processData : false,
		contentType : false,
		success : function(data) {

		},
		error : function(error) {
			// ...;
		}
	});
}

function convertCurrentDateToMap() {
	var date = new Date();
	var l_map = {};
	l_map.fullYear = date.getFullYear(); // Get the year as a four digit
											// number (yyyy)
	l_map.month = date.getMonth(); // Get the month as a number (0-11)
	l_map.date = date.getDate(); // Get the day as a number (1-31)
	l_map.hours = date.getHours(); // Get the hour (0-23)
	l_map.minute = date.getMinutes(); // Get the minute (0-59)
	l_map.second = date.getSeconds(); // Get the second (0-59)
	l_map.milliSeconds = date.getMilliseconds(); // Get the millisecond
													// (0-999)
	l_map.time = date.getTime(); // Get the time (milliseconds since January
									// 1, 1970)
	l_map.day = date.getDay(); // Get the weekday as a number (0-6)
	return l_map;
}



function loadCountries(p_flag){ 
	var l_map = {};
	l_map.get = 'COUNTRIES';
	ajaxWithJSON("/common/get-region-detail", l_map, 'POST',function(response) {
		//alert(JSON.stringify(response));
				if(response.status == 'SUCCESS'){
					var data = response.object;
					for(var i=0;i<data.length;i++){
						var b_map = data[i];
						 
						if(p_flag=='NEW'){
							$('.c_countryId').append('<option value='+b_map.countryId+'>'+b_map.countryName+'</option>');
						}
					}
					
				}
				if(response.status == 'ERROR'){
					toastr.error(response.message);
				}

	});
}
function loadStates(p_countryId){ 
	var l_map = {};
	l_map.get = 'STATES';
	l_map.countryId =p_countryId;
	ajaxWithJSON("/common/get-region-detail", l_map, 'POST',function(response) {
		//alert(JSON.stringify(response));
		if(response.status == 'SUCCESS'){
			var data = response.object;
			for(var i=0;i<data.length;i++){
				var b_map = data[i];
				$('.c_stateId').append('<option value='+b_map.stateId+'>'+b_map.stateName+'</option>');
			}
		}
		if(response.status == 'ERROR'){
			toastr.error(response.message);
		}

	});
}
function loadDistricts(p_stateId){
	var l_map = {};
	l_map.stateId = p_stateId;
	l_map.get = 'DISTRICTS';
	ajaxWithJSON("/common/get-region-detail", l_map, 'POST',function(response) {
		//alert(JSON.stringify(response));
		if(response.status == 'SUCCESS'){
			var data = response.object;
			for(var i=0;i<data.length;i++){
				var b_map = data[i];
				$('.c_districtId').append('<option value='+b_map.districtId+'>'+b_map.districtName+'</option>');
			}
		}
		if(response.status == 'ERROR'){
			toastr.error(response.message);
		}

	});
}
function loadCities(p_districtId){  
	var l_map = {};
	l_map.get = 'CITIES';
	l_map.districtId = p_districtId;
	ajaxWithJSON("/common/get-region-detail", l_map, 'POST',function(response){
		//alert(JSON.stringify(response));
		if(response.status == 'SUCCESS'){
			var data = response.object;
			for(var i=0;i<data.length;i++){
				var b_map = data[i];
				$('.c_cityId').append('<option value='+b_map.cityId+'>'+b_map.cityName+'</option>');
			}
		}
		if(response.status == 'ERROR'){
			toastr.error(response.message);
		} 
	});
 
}

function selectUniversityBoard(p_educationLevel){  
	var l_map = {}; 
	l_map.educationLevel = p_educationLevel;
	ajaxWithJSON("/common/get-region-detail", l_map, 'POST',function(response) {
		//alert(JSON.stringify(response));
		if(response.status == 'SUCCESS'){
			var data = response.object;
			for(var i=0;i<data.length;i++){
				var b_map = data[i];
				$('.c_universityEducation').append('<option value='+b_map.cityId+'>'+b_map.cityName+'</option>');
			}
		}
		if(response.status == 'ERROR'){
			toastr.error(response.message);
		} 
	});
 
} 
 var g_subjects = [];

function loadTutorSubjects() {debugger;
	
	if(g_subjects.length==0){
	ajaxWithJSON("/load-subjects", null, 'GET',function(response) {
		var l_data = response.object;
		g_subjects = l_data;
        //alert(JSON.stringify(response));
		if(response.status == 'SUCCESS'){
			var l_html = '';
			for(var i=0;i<l_data.length;i++){
				var l_map = l_data[i];
				l_html+='<option data-value="'+l_map.subjectId+'">'+l_map.subjectName+'</option>';
			}
			$('#subjectList').html(l_html);
		}
		if(response.status == 'ERROR'){
			console.log(response.message);
			
		}
       });
	}else{
		var l_html = '';
		for(var i=0;i<g_subjects.length;i++){
			var l_map = g_subjects[i];
			l_html+='<option data-value="'+l_map.subjectId+'">'+l_map.subjectName+'</option>';
		}
		$('#subjectList').html(l_html);
	}
}
 



var g_education_types = [];
function loadEducationTypes(){
	if(g_education_types.length==0){
		var l_map = {};
		    l_map.level = $('.c_education').val();
		    l_map.all = false;
		    
	ajaxWithJSON("/common/load-education-type", l_map, 'POST',function(response) {
		var l_data = response.object;
		var l_html = '';
       // alert(JSON.stringify(response));
		if(response.status == 'SUCCESS'){
			g_education_types = l_data;
			for(var i=0;i<l_data.length;i++){
				var l_map = l_data[i];
				l_html+='<option value="'+l_map.educationShortName+'">';
			}
			l_html+='<option value="Other">';
			$('#i_education_type').html('');
			$('#i_education_type').html(l_html);
		}
		if(response.status == 'ERROR'){
			console.log(response.message);
			
		}
      });
	}else{
		for(var i=0;i<g_education_types.length;i++){
			var l_map = g_education_types[i];
			l_html+='<option value="'+l_map.educationShortName+'">';
		}
		l_html+='<option value="Other">';
		$('#i_education_type').html('');
		$('#i_education_type').html(l_html);
	}
}


function loadEducationBranches(){
var l_map = {};
    l_map.list = false;
for(var i=0;i<g_education_types.length;i++){
		var b_map = g_education_types[i];
		if(b_map.educationShortName == ($('.c_education_type').val()).trim()){
			l_map.educationTypeId = b_map.educationTypeId;
		}
}

ajaxWithJSON("/common/load-education-type-branch", l_map, 'POST',function(response) {
  //alert(JSON.stringify(response));
  var l_data = response.object;
	var l_html = '';
 // alert(JSON.stringify(response));
	if(response.status == 'SUCCESS'){
		for(var i=0;i<l_data.length;i++){
			var l_map = l_data[i];
			l_html+='<option value="'+l_map.educationBranchShortName+'">';
		}
		l_html+='<option value="Other">';
		$('#i_education_branch').html('');
		$('#i_education_branch').html(l_html);
	}
	if(response.status == 'ERROR'){
		console.log(response.message);
		
	}
});
}


var g_institutes = [];
function loadInstitutes(){
	
		if(g_institutes.length==0){
		ajaxWithJSON("/load-institutes", null, 'GET',function(response) {
			var l_data = response.object;
			var l_html = '';
	        //alert(JSON.stringify(response));
			if(response.status == 'SUCCESS'){
				g_institutes = l_data;
				for(var i=0;i<l_data.length;i++){
					var l_map = l_data[i];
					l_html+='<option value="'+l_map.instituteName+'">';
				}
				l_html+='<option value="Other">';
				$('#i_institute').html('');
				$('#i_institute').html(l_html);
			}
			if(response.status == 'ERROR'){
				console.log(response.message);
				
			}
           });
		}else{
			var l_html = '';
			for(var i=0;i<g_institutes.length;i++){
				var l_map = g_institutes[i];
				l_html+='<option value="'+l_map.instituteName+'">';
			}
			l_html+='<option value="Other">';
			$('#i_institute').html(l_html);
		}
		
	
	
}

var g_boards = [];
function loadBoards(){
	if(g_boards.length==0){
	ajaxWithJSON("/load-boards", null, 'GET',function(response) {
		var l_data = response.object;
		var l_html = '';
        //alert(JSON.stringify(response));
		if(response.status == 'SUCCESS'){
			g_boards = l_data;
			for(var i=0;i<l_data.length;i++){
				var l_map = l_data[i];
				l_html+='<option value="'+l_map.boardShortName+'">';
			}
			l_html+='<option value="Other">';
			$('.i_board').html('');
			$('#i_board').html(l_html);
		}
		if(response.status == 'ERROR'){
			console.log(response.message);
			
		}
       });
	}else{
		var l_html = '';
		for(var i=0;i<g_boards.length;i++){
			var l_map = g_boards[i];
			l_html+='<option value="'+l_map.boardShortName+'">';
		}
		l_html+='<option value="Other">';
		$('#i_board').html('');
		$('#i_board').html(l_html);
	}
	
}



