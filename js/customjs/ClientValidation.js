

// display name rules
function checkName(evt) {
	if ((evt.charCode > 64 && evt.charCode < 92)
			|| (evt.charCode > 96 && evt.charCode < 123) || evt.charCode == 32) {
		var name = $(".userName").val();
		name = name.replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
		$(".userName").val(name);
		return true;
	}
	return false;
}
// this method will not allow special character
function blockSpecialChar(e){
    var k;
    document.all ? k = e.keyCode : k = e.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

// 10 digit mobile and only for numeric allow
function isMobile(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}

function isAlphanumeric(evt) {
	 
    var keycode = (evt.which) ? evt.which : evt.keyCode;
 
    if ((keycode >= 65 && keycode <= 90) || (keycode >= 97 && keycode <= 122) || (keycode >= 48 && keycode <= 57)) 
      return true; 
    else 
      return false;
 
  }

//check :allow for number and .(dot)
function isFloatValue(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 46 || charCode > 57) &&  charCode!=47) {
		return false;
	}
	if(charCode==46){
		return true;
	}
	return true;
}

// add float class in text field it will allow only float value
$('input.float').on('input', function() {
	  this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
});

function onlyNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}

$('.only_float').keypress(function(event) {
	  if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
	    event.preventDefault();
	  }
});
function isValidEmail(email) {

	if (!isBlank(email)) {
		return false;
	}

	var x = email;
	var atpos = x.indexOf("@");
	var dotpos = x.lastIndexOf(".");
	if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
		return false;
	}
	return true;
}

function isValidMobile(mobile) {

	var NumberRegex = /^[0-9]*$/;

	if (!isBlank(mobile)) {
		return false;
	}

	if (mobile.length == 10) {
		if (!(NumberRegex.test(mobile))) {
			return false;
		}
		return true;
	}
	return false;
}

function isValidPin(pin) {

	var NumberRegex = /^[0-9]*$/;

	if (!isBlank(pin)) {
		return false;
	}
	if (pin.length == 6) {
		if (!(NumberRegex.test(pin))) {
			return false;
		}
		return true;
	}
	return false;
}

function isValidUrl(url){
    //var myVariable = url;
	    if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url)) {
	      return true;
	    } else {
	      return false;
	    }   
	}
function isBlank(p_input) {

	if (p_input == null || p_input == undefined || p_input == "") {
		return false;
	}
	return true;
}

// validate all form field if field contain for="type like email,mobile" and
// blank not allow use null="false" in field
function checkValidate(p_formId, p_errorClass, isToaster, eachFieldError) {
	 
   var count = 0;
	try {
		$("form#" + p_formId + " :input")
				.each(
						function() {
							  
							var input = $(this); // This is the jquery object
													// of the input

							if (input.attr('null') == 'false') {
								 
								if (input.val() == '' || input.val() == null
										|| input.val() == undefined) {

									if (isToaster) {
										var l_name=	input.attr('name');
										toastr.error(l_name+" can not be blank!");
										throw false;
									}
									if (eachFieldError) {
										$(".error" + count)
												.html(
														"required fields are mandatory!");
										throw false;
									}
									if (!(p_errorClass == null)) {
										$("." + p_errorClass)
												.html(
														"required fields are mandatory!");
										throw false;
									}
									/*
									 * $("."+p_errorClass).html("required fields
									 * are mandatory!"); throw false;
									 */
								}
							}

							if ((input.attr('for') == 'checkbox')) {
								 

								if ((!$(
										"input[name=" + input.attr('name')
												+ "]").is(':checked'))) {

									if (isToaster) {
										toastr
												.error("please select radio button!");
										throw false;
									}
									if (eachFieldError) {
										$(".error" + count).html(
												"please select radio button!");
										throw false;
									}
									if (!(p_errorClass == null)) {
										$("." + p_errorClass).html(
												"please select radio button!");
										throw false;
									}
								}
							}

							if ((input.attr('for') == 'radio')) {
								 

								if ((!$(
										"input[name=" + input.attr('name')
												+ "]").is(':checked'))) {

									if (isToaster) {
										toastr
												.error("please select radio button!");
										throw false;
									}
									if (eachFieldError) {
										$(".error" + count).html(
												"please select radio button!");
										throw false;
									}
									if (!(p_errorClass == null)) {
										$("." + p_errorClass).html(
												"please select radio button!");
										throw false;
									}
								}
							}

							if ((input.attr('for') == 'email')) {
								var x = input.val();
								var atpos = x.indexOf("@");
								var dotpos = x.lastIndexOf(".");
								if (atpos < 1 || dotpos < atpos + 2
										|| dotpos + 2 >= x.length) {

									if (isToaster) {
										toastr
												.error("Please enter a valid email address!");
										throw false;
									}
									if (eachFieldError) {
										$(".error" + count)
												.html(
														"Please enter a valid email address!");
										throw false;
									}
									if (!(p_errorClass == null)) {
										$("." + p_errorClass)
												.html(
														"Please enter a valid email address!");
										throw false;
									}
								}
							}

							if ((input.attr('for') == 'mobile')) {
								var NumberRegex = /^[0-9]*$/;
								var mobile = input.val();
								if (mobile.length == 10) {
									if (!(NumberRegex.test(mobile))) {
										if (isToaster) {
											toastr
													.error("Please enter a valid mobile number!");
											throw false;
										}
										if (eachFieldError) {
											$(".error" + count)
													.html(
															"Please enter a valid mobile number!");
											throw false;
										}
										if (!(p_errorClass == null)) {
											$("." + p_errorClass)
													.html(
															"Please enter a valid mobile number!");
											throw false;
										}
									}
								}
								if ((mobile.length < 10) || mobile.length > 10) {

									if (isToaster) {
										toastr
												.error("Please enter a valid mobile number!");
										throw false;
									}
									if (eachFieldError) {
										$(".error" + count)
												.html(
														"Please enter a valid mobile number!");
										throw false;
									}
									if (!(p_errorClass == null)) {
										$("." + p_errorClass)
												.html(
														"Please enter a valid mobile number!");
										throw false;
									}
								}

							}

							if ((input.attr('for') == 'url')) {
								var pattern = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
								if (!(pattern.test(input.val()))) {
									if (isToaster) {
										toastr.error("Enter valid url!");
										throw false;
									}
									if (eachFieldError) {
										$(".error" + count).html(
												"Enter valid url!");
										throw false;
									}
									if (!(p_errorClass == null)) {
										$("." + p_errorClass)
												.html(
														"Please enter a valid mobile number!");
										throw false;
									}
								}
							}
							count++;
						});
		throw true;
	} catch (result) {
		throw result;
	}

}

function getDateFormat(p_date){
	
	  var l_date = new Date(p_date);
	  var final_date = l_date.getDate() + '/' +  (l_date.getMonth() + 1)+ '/' +  l_date.getFullYear();
	  return final_date;
	
}


function getDateTime(p_date){
	
	  var l_date = new Date(p_date);
	  var final_date_time = l_date.getDate() + '/' +  (l_date.getMonth() + 1)+ '/' +  l_date.getFullYear()+" "+l_date.getHours()+":"+l_date.getMinutes();
	  return final_date_time;
	
}





function readCustomForm(p_formId) {
	debugger;
	var l_data = {};
	$("form#" + p_formId + " :input").each(function() {
		debugger;
		var input = $(this); // This is the jquery object of the input

		l_data[input.attr('name')] = input.attr('type');
		
	});
	return l_data;
}


function readForm(p_formId) {
	var l_data = {};
	$("form#" + p_formId + " :input").each(function() {
		var input = $(this); // This is the jquery object of the input

		if (input.attr('type') == 'checkbox') {
			if ($("." + input.attr('class')).prop('checked') == true) {
				l_data[input.attr('name')] = true;
			} else {
				l_data[input.attr('name')] = false;
			}

		}
		else if(input.attr('type') == 'date'){
			l_data[input.attr('name')] = getDateFormat(input.val());
		}
		else {
			l_data[input.attr('name')] = input.val();
		}

	});
	return l_data;
}

function readFormWithId(p_formId) {debugger;
	var l_data = {};
	$("form#" + p_formId + " :input").each(function() {
		var input = $(this); // This is the jquery object of the input

		if (input.attr('type') == 'checkbox') {
			if ($("#" + input.attr('id')).prop('checked') == true) {
				l_data[input.attr('name')] = true;
			} else {
				l_data[input.attr('name')] = false;
			}

		}
		else if(input.attr('type') == 'date'){
			l_data[input.attr('name')] = getDateFormat(input.val());
		}
		else {
			l_data[input.attr('name')] = input.val();
		}

	});
	return l_data;
}

function isEmptyB(obj) {
	  return Object.keys(obj).length === 0;
}


function validateForm(p_formId,p_error_class) {
	var response = true;
	$("form#" + p_formId + " :input").each(function() {
		var input = $(this); // This is the jquery object of the input

		
		if(input.attr('mandatory') == 'true'){
			if(input.val()==''){
			$('.'+p_error_class).text(input.attr('name')+" is required.");
			setTimeout(function(){ $('.'+p_error_class).text(""); }, 3000);
			response = false;
			}else{
				if(input.attr('for') == 'email'){
					if(isValidEmail()){
						
					}else{
						$('.'+p_error_class).text(input.attr('name')+" is not valid.");
						setTimeout(function(){ $('.'+p_error_class).text(""); }, 3000);
						response = false;
					}
				}
                if(input.attr('for') == 'mobile'){
                     if(isValidMobile()){
						
					}else{
						$('.'+p_error_class).text(input.attr('name')+" is not valid.");
						setTimeout(function(){ $('.'+p_error_class).text(""); }, 3000);
						response = false;
					}
				}
                if(input.attr('for') == 'pin'){
                    if(isValidPin()){
						
					}else{
						$('.'+p_error_class).text(input.attr('name')+" is not valid.");
						setTimeout(function(){ $('.'+p_error_class).text(""); }, 3000);
						response = false;
					}
				}
			}
			
		}else{
			if(input.attr('for') == 'email'){
				if(isValidEmail()){
					
				}else{
					$('.'+p_error_class).text(input.attr('name')+" is not valid.");
					setTimeout(function(){ $('.'+p_error_class).text(""); }, 3000);
					response = false;
				}
			}
            if(input.attr('for') == 'mobile'){
                 if(isValidMobile()){
					
				}else{
					$('.'+p_error_class).text(input.attr('name')+" is not valid.");
					setTimeout(function(){ $('.'+p_error_class).text(""); }, 3000);
					response = false;
				}
			}
            if(input.attr('for') == 'pin'){
                if(isValidPin()){
					
				}else{
					$('.'+p_error_class).text(input.attr('name')+" is not valid.");
					setTimeout(function(){ $('.'+p_error_class).text(""); }, 3000);
					response = false;
				}
			}
		}
		

	});
	return response;
}



/*The easiest way to compare dates in javascript is to first convert it to a Date object and then compare these date-objects.

Below you find an object with three functions:

dates.compare(a,b)

Returns a number:

-1 if a < b
0 if a = b
1 if a > b
NaN if a or b is an illegal date
dates.inRange (d,start,end)

Returns a boolean or NaN:

true if d is between the start and end (inclusive)
false if d is before start or after end.
NaN if one or more of the dates are illegal.
dates.convert

Used by the other functions to convert their input to a date object. The input can be

a date-object : The input is returned as is.
an array: Interpreted as [year,month,day]. NOTE month is 0-11.
a number : Interpreted as number of milliseconds since 1 Jan 1970 (a timestamp)
a string : Several different formats is supported, like "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
an object: Interpreted as an object with year, month and date attributes. NOTE month is 0-11*/
var dates = {
	    convert:function(d) {
	        // Converts the date in d to a date-object. The input can be:
	        //   a date object: returned without modification
	        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
	        //   a number     : Interpreted as number of milliseconds
	        //                  since 1 Jan 1970 (a timestamp) 
	        //   a string     : Any format supported by the javascript engine, like
	        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
	        //  an object     : Interpreted as an object with year, month and date
	        //                  attributes.  **NOTE** month is 0-11.
	        return (
	            d.constructor === Date ? d :
	            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
	            d.constructor === Number ? new Date(d) :
	            d.constructor === String ? new Date(d) :
	            typeof d === "object" ? new Date(d.year,d.month,d.date) :
	            NaN
	        );
	    },
	    compare:function(a,b) {
	        // Compare two dates (could be of any type supported by the convert
	        // function above) and returns:
	        //  -1 : if a < b
	        //   0 : if a = b
	        //   1 : if a > b
	        // NaN : if a or b is an illegal date
	        // NOTE: The code inside isFinite does an assignment (=).
	        return (
	            isFinite(a=this.convert(a).valueOf()) &&
	            isFinite(b=this.convert(b).valueOf()) ?
	            (a>b)-(a<b) :
	            NaN
	        );
	    },
	    inRange:function(d,start,end) {
	        // Checks if date in d is between dates in start and end.
	        // Returns a boolean or NaN:
	        //    true  : if d is between start and end (inclusive)
	        //    false : if d is before start or after end
	        //    NaN   : if one or more of the dates is illegal.
	        // NOTE: The code inside isFinite does an assignment (=).
	       return (
	            isFinite(d=this.convert(d).valueOf()) &&
	            isFinite(start=this.convert(start).valueOf()) &&
	            isFinite(end=this.convert(end).valueOf()) ?
	            start <= d && d <= end :
	            NaN
	        );
	    }
	}