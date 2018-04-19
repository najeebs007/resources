/***************************************************
 * 
 * Ajax call method and generic methods for input field JS
 * @author Mayank Gupta
 * 
 ***************************************************/

function ajaxCall(p_url, p_data, p_success_callback, p_error_callback) {
	//alert("going to URL: "+p_url);

	if (p_url == null || p_url == undefined || p_url == "") {
		return;
	}

	if (p_data == null || p_data == undefined || p_data == "") {
		p_data = {};
	}

	if (p_success_callback == null || p_success_callback == undefined
			|| p_success_callback == "") {
		p_success_callback = 'handleDefaultSuccess';
	}

	if (p_error_callback == null || p_error_callback == undefined
			|| p_error_callback == "") {
		p_error_callback = 'handleDefaultError';
	}

	var l_content_data = {};

	if (p_data != null) {
		l_content_data.data = p_data;

	}
	//alert(l_content_data);
	//var key = '${_csrf.parameterName}'
	//var value = '${_csrf.token}';
	//alert(key + "-" + value);

	//l_content_data[key] = value;
	// p_url = p_url+"?"

	$.ajax({
		method : 'GET',
		url : p_url,
		data : l_content_data,
		dataType : "text",
		async : false,
		success : function(resultData) {
			//  alert("Save Complete "+resultData) ;
			try {
				eval(p_success_callback + '(' + resultData + ')');
			} catch (e) {
				$("#main_div").html(resultData);
			}
		},
		error : function(errorData) {
			// alert("Error in Save "+errorData) ;

			eval(p_error_callback + '(' + errorData + ')');
		}
	});
}

// use for ajax post request with json data
function ajaxPostCall(p_url, p_data, p_success_callback, p_error_callback) {debugger;

	if (p_url == null || p_url == undefined || p_url == "") {
		return;
	}

	if (p_data == null || p_data == undefined || p_data == "") {
		p_data = {};
	}

	if (p_success_callback == null || p_success_callback == undefined
			|| p_success_callback == "") {
		p_success_callback = 'handleDefaultSuccess';
	}

	if (p_error_callback == null || p_error_callback == undefined
			|| p_error_callback == "") {
		p_error_callback = 'handleDefaultError';
	}

	var l_content_data = {};

	if (p_data != null) {
		l_content_data.data = p_data;

	}

	$.ajax({
		method : 'POST',
		url : p_url,
		data : l_content_data,
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		success : function(resultData) {
			debugger;
			try {
				eval(p_success_callback + '(' + resultData + ')');
			} catch (e) {
				alert("Error in Response.");
			}
		},
		error : function(errorData) {
			eval(p_error_callback + '(' + errorData + ')');
		}
	});

}

function handleDefaultSuccess(p_data) {
	alert("Successfully Handled");
}

function handleDefaultError(p_data) {
	alert("Error in Submission");
}

//show Loader 
function showLoader() {
	$(".background_div").removeClass("hide").addClass("show");
	$(".loader_div").removeClass("hide").addClass("show");
}
//hide Loader
function hideLoader() {
	$(".background_div").removeClass("show").addClass("hide");
	$(".loader_div").removeClass("show").addClass("hide");
}

function setOptions(p_dropdown_id, p_data_list, p_id_param, p_id_value,
		p_zero_option) {
	if (p_dropdown_id == null || p_dropdown_id == undefined
			|| p_dropdown_id == "") {
		return;
	}

	if (p_zero_option == null || p_zero_option == undefined
			|| p_zero_option == "") {
		p_zero_option = "Select Option";
	}

	if (p_id_param == null || p_id_param == undefined || p_id_param == "") {
		p_id_param = "paramName";
	}

	if (p_id_value == null || p_id_value == undefined || p_id_value == "") {
		p_id_value = "paramValue";
	}

	var l_str = '<option value="" selected>' + p_zero_option + ' </option>';

	if (p_data_list == null || p_data_list == undefined || p_data_list == "") {
		p_data_list = [];
	}

	for (var i = 0; i < p_data_list.length; i++) {
		var l_data_map = p_data_list[i];
		var l_param_name = l_data_map[p_id_param];
		var l_param_value = l_data_map[p_id_value];
		l_str += '<option value="' + l_param_name + '">' + l_param_value
				+ ' </option>';
	}
	//alert(l_str);
	document.getElementById(p_dropdown_id).innerHTML = l_str;
}

//export table to excel
function exportExcel(tableId, fileName) {
	debugger;
	$("#" + tableId).table2excel({
		name : "Table2Excel",
		filename : fileName,
		fileext : ".xls"
	});
}

function copyText(p_id) {
	debugger;
	var l_Text = document.getElementById(p_id);
	l_Text.select();
	document.execCommand("Copy");
	// alert("Copied the text: " + l_Text.value);
	toastr.success('Text Copied.');
}

function floats() {
	$('.floating-label .form-control').on('keyup change', function(e) {

		var input = $(e.currentTarget);

		if ($.trim(input.val()) !== '') {

			input.addClass('dirty').removeClass('static');
		} else {
			input.removeClass('dirty').removeClass('static');
		}
	});

	$('.floating-label .form-control').each(function() {
		var input = $(this);

		if ($.trim(input.val()) !== '') {
			input.addClass('static').addClass('dirty');
		}
	});

	$('.form-horizontal .form-control').each(function() {
		$(this).after('<div class="form-control-line"></div>');
	});
}

function allLetter(field_value) {

	var letters = /^[A-Za-z]+$/;
	if (field_value.match(letters)) {
		return true;
	} else {
		return false;
	}
}

function alphanumeric(field_value) {
	var letters = /^[0-9a-zA-Z]+$/;
	if (field_value.match(letters)) {
		return true;
	} else {
		return false;
	}
}

function allnumeric(field_value) {

	var numbers = /^[0-9]+$/;

	if (field_value.match(numbers)) {
		return true;
	} else {
		return false;
	}
}

function allLetterwithSpecailChar(field_value) {
	var letters = /^[a-zA-Z0-9\s,|_-\":<>[]{}\';()&$#%]*$/;

	if (field_value.match(letters)) {
		return true;
	} else {
		return false;
	}

}

function reloadPage() {
	window.location.reload(true);
}

/*****
 * this method to reset form, it takes form id as parameter
 * @formId
 * */
function resetForm(p_form_id) {

	$("#" + p_form_id).find(
			"input[type=text],input[type=hidden],select,textarea").each(
			function(index, item) {
				$(item).val("");
			});

	/*$("#"+p_form_id).find("input[type=radio],input[type=checkbox]").each(function(index,item){
		$(item).prop( "checked", false);
	});*/

	floats();
}

//export excel file of nominate students
function exportExcel(tableId, fileName) {
	$("#" + tableId).table2excel({
		name : "Table2Excel",
		filename : fileName,
		fileext : ".xls"
	});
}

// this method restrict current date subtract five to future date
function checkValidDate(p_date,p_errorClass){
var l_restrict_year ;
var l_input_year ;
var l_input_month ;
var l_input_day ;
var l_current_year;
var l_current_month;
var l_current_day;
var l_input_date;
var l_current_date = new Date();
l_restrict_year = l_current_date.getFullYear() - 5;
if (p_date == null || p_date == undefined || p_date == "") {
	return false;
}
// from input
l_input_date = setDateFormat(p_date);
l_input_year = l_input_date.getFullYear();
l_input_month = l_input_date.getMonth()+1;
l_input_day = l_input_date.getDate();
// current
l_current_year = l_current_date.getFullYear();
l_current_month = l_current_date.getMonth()+1;
l_current_day = l_current_date.getDate();

if(l_input_year>l_current_year || l_input_year == l_current_year){
	$('.'+p_errorClass).html("Please make sure that you use your real date of birth.");
	return false;
}
if(l_input_year>l_restrict_year ){
	$('.'+p_errorClass).html("Please make sure that you use your real date of birth.");
	return false;
}

return true;
}

function setDateFormat(p_date){	
var parts =p_date.split('/');
var final_date = new Date(parts[2]+'-'+parts[1]+'-'+parts[0]);
return final_date;	
}