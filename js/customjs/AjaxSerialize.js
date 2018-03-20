/**
 * 
 */



function ajaxCall(p_url, p_data, p_success_callback, p_error_callback,p_data_flag) {debugger;
 //alert("going to URL: "+p_url);
 alert("enter in ajax call");
 
 if(p_url == null || p_url == undefined || p_url == "") {
  return;
 }
 
 if(p_data == null || p_data == undefined || p_data == "") {
  p_data = {};
 }
 
 if(p_success_callback == null || p_success_callback == undefined || p_success_callback == "") {
  p_success_callback = 'handleDefaultSuccess';
 }
 
 
 if(p_error_callback == null || p_error_callback == undefined || p_error_callback == "") {
  p_error_callback = 'handleDefaultError';
 }
 
 if(p_data_flag == null || p_data_flag == undefined || p_data_flag == "") {
	  p_error_callback = 'handleDefaultError';
	 }
 
 /*if(currentUser == null || currentUser == undefined || currentUser == "") {
  alert("You are not authorized to make a transaction");
  return;
 }
 
 if(session_logout == null || session_logout == undefined || session_logout == "") {
  alert("You are not authorized to make a transaction");
  return;
 }*/
 
// alert("Inside ajaxsubmit username: "+currentUser);
 //alert("Inside ajaxsubmit session id: "+session_logout);
 
 var l_content_data = {};
 
 //l_content_data.currentUser   = currentUser;
 //l_content_data.session_logout = session_logout;
 if(p_data != null) {
  l_content_data.data    = p_data;
 }
// p_url = p_url+"?"
 
 if(p_data_flag == 'json'){
	 alert("reached in json call");
 $.ajax({
       method: 'GET',
       url: p_url,
       data: l_content_data,
       dataType: "text",
       async:false,
       success: function(resultData) {
    	   toastr.clear();
    	   toastr.success(resultData)
         // alert("Save Complete "+resultData) ;
        try {
           eval(p_success_callback+'('+resultData+')');
        } catch(e) {
         $("#main_div").html(resultData);        
        }
       },
    error: function(errorData) {
     alert("Error in Save "+errorData) ;
    	 toastr.clear();
    	  toastr.error(errorData)
          eval(p_error_callback+'('+errorData+')');
    }
 });
 }
 
 if(p_data_flag == 'serialize'){
	 alert("reached in serialize call");
	 $.ajax({
	       method: 'GET',
	       url: p_url,
	       data: p_data,
	       
	       success: function(resultData) {
	    	 
	        try {
	           eval(p_success_callback+'('+resultData+')');
	        } catch(e) {
	         $("#main_div").html(resultData);        
	        }
	       },
	    error: function(errorData) {
	           alert(errorData[2]);
	          eval(p_error_callback+'('+errorData+')');
	    }
	 });
	 }
 if(p_data_flag == 'array'){
	 
	 alert("reached in array call");
	 // data format from request page
	
	/* var b = {
			    "lab" : labels,
			    "keys": keyArray
			};*/
	 
	 // controller syntax
	/* @RequestMapping(value = "/JqlUpdate", method = RequestMethod.POST)
	 public String updateIssue(@RequestParam(value = "lab") String a,@RequestParam(value = "keys") String k ) {*/
	 
	 $.ajax({
	       method: 'GET',
	       url: p_url,
	       data: p_data,
	       
	       success: function(resultData) {
	    	 
	        try {
	           eval(p_success_callback+'('+resultData+')');
	        } catch(e) {
	         $("#main_div").html(resultData);        
	        }
	       },
	    error: function(errorData) {
	     alert(errorData);
	          eval(p_error_callback+'('+errorData+')');
	    }
	 });
	 }
 
 if(p_data_flag == 'single'){
	 
	 alert("reached in single call");
	 // data format from request page
	
	/* var b = {
			    "lab" : labels,
			    "keys": keyArray
			};*/
	 
	 // controller syntax
	/* @RequestMapping(value = "/JqlUpdate", method = RequestMethod.POST)
	 public String updateIssue(@RequestParam(value = "lab") String a,@RequestParam(value = "keys") String k ) {*/
	 
	 $.ajax({
	       method: 'GET',
	       url: p_url,
	       data: {param:p_data},
	       
	       success: function(resultData) {
	    	 alert(resultData);
	        try {
	           eval(p_success_callback+'('+resultData+')');
	        } catch(e) {
	         $("#main_div").html(resultData);        
	        }
	       },
	    error: function(errorData) {
	     alert(errorData);
	          eval(p_error_callback+'('+errorData+')');
	    }
	 });
	 }

}
