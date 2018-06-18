/**
 * @Developer: Rajesh Rawat
 * @author SMOPL
 * @date: 24-04-2018
 * @javascript file: AjaxCall
 * @description: This file is responsible for all type ajax call like with post/get for json data as well it serialize form
 * 
 */

// call ajaxWithJSON method like this
//ajaxWithJSON(url, data, method_type, function(callback) {
			// use response object it will be map type	

//});

//call ajaxWithSerialize method like this
//ajaxWithSerialize(url, form_id, method_type, function(callback) {
			// use response object it will be map type	

//});

	/**
	 * Method call to ajax for json data with post/get. 
	 * 
	 * @param {@ p_url , p_data , p_method_type , callback} it will accept request url , map object for data , method type , 
	 * and callback for return ajax response to the caller 
	 * 
	 * @return {@ callback} it return the response map object to the caller  
	 */
function ajaxWithJSON(p_url, p_data, p_method_type, callback) {

	var l_respons = {};

	if (p_url == null || p_url == undefined || p_url == "") {
		l_respons.status = "SUCCESS";
		l_respons.message = "Please provide request URL.";
		callback(l_respons);
	}

	if (p_data == null || p_data == undefined || p_data == "") {
		p_data = {};
	}
	if (p_method_type == null || p_method_type == undefined || p_method_type == "") {
		l_respons.status = "SUCCESS";
		l_respons.message = "Please provide method type.";
		callback(l_respons);
	}
	var l_content_data = {};

	if (p_data != null) {
		l_content_data.data = p_data;

	}
	
	$.ajax({

		type : p_method_type,
		url : p_url,
		data : JSON.stringify(p_data),
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		success : function(response) {
			callback(response);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.log("jqXHR = "+JSON.stringify(jqXHR)+" , textStatus = "+textStatus+" , errorThrown = "+errorThrown);
			var response = {};
			response.status = "ERROR";
			response.message = "there is some thechnical problem. Try again.";
			callback(response);

		}
	});

}

/**
 * Method call to ajax for serialize form with post/get to the server. 
 * 
 * @param {@ p_url , p_form_id , p_method_type , callback} it will accept request url. 
 * form id for serialize for data and send to server .
 * method type ,and callback for return ajax response to the caller 
 * 
 * @return {@ callback} it return the response map object to the caller  
 */
function ajaxWithSerialize(p_url,p_form_id,p_method_type,callback){
	
	var l_respons = {};

	if (p_url == null || p_url == undefined || p_url == "") {
		l_respons.status = "SUCCESS";
		l_respons.message = "Please provide request URL.";
		callback(l_respons);
	}
	if (p_form_id == null || p_form_id == undefined || p_form_id == "") {
		l_respons.status = "SUCCESS";
		l_respons.message = "Please provide form id.";
		callback(l_respons);
	}
	if (p_method_type == null || p_method_type == undefined || p_method_type == "") {
		l_respons.status = "SUCCESS";
		l_respons.message = "Please provide method type.";
		callback(l_respons);
	}
	
	$.ajax({
		type :p_method_type,
		url : p_url,
		data : $("#"+p_form_id).serialize(),
		success : function(response) {
			callback(response);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.log("jqXHR = "+jqXHR+" , textStatus = "+textStatus+" , errorThrown = "+errorThrown);
			var respons = {};
			respons.status = "ERROR";
			respons.message = "there is some thechnical problem. Try again.";
			callback(response);

		}
	});
	
}