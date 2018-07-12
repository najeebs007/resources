/**
 * @author Rajesh Rawat
 * @version 1.0
 */


function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
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

// display name rules
function checkName(evt) {
	if ((evt.charCode > 64 && evt.charCode < 92)
			|| (evt.charCode > 96 && evt.charCode < 123) || evt.charCode == 32) {
		var name = $(".userName").val();
		name=name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		$(".userName").val(name);
		return true;
	}
	return false;
}

// for registration part
function validateform() {
	debugger;

	//alert("submit call");
	var name = $(".userName").val();
	var email = $(".email").val();
	var mobile = $(".mobile").val();
	var role = $("#roleId").val();

	if (name == '') {
		$("#binderror").html(displayNameMandatoryMsg);
		return false;
	} 
	
	if (email == '') {
		$("#binderror").html(emailMandaotoryMsg);
		return false;
	} 
	
	if (mobile == '') {
		$("#binderror").html(mobileMandatoryMsg);
		return false;
	} 
	
	if (role == '') {
		$("#binderror").html(roleMandatoryMsg);
		return false;
	} 
	
	if ((mobile.length) < 10) {
		$("#binderror")
				.html("Please enter 10 digit mobile number");
		return false;
	} 
	
	if ((email.length) > 0) {
		var x = $(".email").val();
		var atpos = x.indexOf("@");
		var dotpos = x.lastIndexOf(".");
		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
			$("#binderror").html("Please enter a valid email address");
			return false;
		} 
	}

	
	$("#binderror").html(' ');
	return true;
}


// for verification part
function validateVerification() {
	debugger;
	//alert("error in password format");
	var password = $(".password").val();
	var confirmPassword = $(".confirmPassword").val();
	
  if (password == '') {
	$("#binderrorpwd").html("Please enter password");
	return false;
} else if (confirmPassword == '') {
	$("#binderrorpwd").html("Please enter confirm password");
	return false;
} else if ((password.length) < 8) {
	$("#binderrorpwd").html(
			"Password must contain at least 8 characters, with a combination of Uppercase, alpha numeric, & number. Eg: Abc@123");
	return false;
} else if (!(password).match(confirmPassword)) {
	$("#binderrorpwd").html("Password does not match");
	return false;
} 
else {

	var upper = 0;
	var lower = 0;
	var numeric = 0;
	var space = 0;
	var special = password.match(/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);

	if (password.length >= 8) {

		for (var i = 0; i < password.length; i++) {

			if ((password.charCodeAt(i) > 64 && password.charCodeAt(i) < 91)) {
				upper++;
			}
			if ((password.charCodeAt(i) > 96 && password.charCodeAt(i) < 123)) {
				lower++;
			}
			if ((password.charCodeAt(i) > 47 && password.charCodeAt(i) < 58)) {
				numeric++;
			}
			if ((password.charCodeAt(i) == 32)) {
				space++;
			}

		}
		
		if (space.length > 0) {
			$("#binderrorpwd").html("space not allow in password !");
			return false;
		} else {
			if (upper > 0 && lower > 0 && special != null
					&& numeric > 0) {
				$("#binderrorpwd").html(' ');
				return true;
			} else {
				
				$("#binderrorpwd").html("Password must contain at least 8 characters, with a combination of Uppercase, alpha numeric, & number. Eg: Abc@123");
				return false;
			}

		}
		$("#binderrorpwd").html(' ');
		return true;
	}
}

	
}




function setRole(role){
	$("#roleId").val(role);
	
	
}

function validateLogin(event){
	 
    var userName=$("#loginUser").val();
    var password=$("#loginPassword").val();
    if(userName.length == 0 || userName==undefined || userName == null || userName == ''){
		$("#binderror").html("Please enter a valid email address");
	    return false;
	}
    if(password.length == 0 || password==undefined || password == null || password == ''){
		$("#binderror").html("Please enter a password");
	    return false;
	}
    
		var x = userName;
		var atpos = x.indexOf("@");
		var dotpos = x.lastIndexOf(".");
		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
			$("#binderror").html("Please enter a valid email address");
			return false;
		} 
		
		/*var upper = 0;
		var lower = 0;
		var numeric = 0;
		var space = 0;
		var special = password.match(/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);
        
		if (password.length > 7) {debugger;
		
			for (var i = 0; i < password.length; i++) {

				if ((password.charCodeAt(i) > 64 && password.charCodeAt(i) < 91)) {
					upper++;
				}
				if ((password.charCodeAt(i) > 96 && password.charCodeAt(i) < 123)) {
					lower++;
				}
				if ((password.charCodeAt(i) > 47 && password.charCodeAt(i) < 58)) {
					numeric++;
				}
				if ((password.charCodeAt(i) == 32)) {
					space++;
				}

			}
			
			if (space.length > 0) {
				$("#binderror").html("space not allow in password !");
				return false;
			} else {
				if (upper > 0 && lower > 0 && special != null
						&& numeric > 0) {
					$("#binderror").html(' ');
					return true;
				} else {
					
					$("#binderror").html("Password must contain at least one Uppercase,special,lower & number. Ex. Abcd@123");
					return false;
				}*/

		$("#binderror").html(' ');
		return true;
			
			
		
		
}

function forgetPassword(){
	
	var l_html = " ";
	  //this div to ask choice from user Email/Mobile
	  l_html += '<label id="binderror" style="font-size: 12px;color: red;margin-top: 15px;margin-left: 22px;"></label>';	
	  l_html += '<div class="center-on-page forgetpassword-margin-top" id="email-mobile-div">';
      l_html += '<h2 style="font-size: 15px;color: #949494;font-weight: 500;">Where would you like to send OTP</h2>';
	  l_html += '<input type="radio" name="rb" onclick="return openOTPEmailBox(event)" id="resendEmail" />';
	  l_html += '<label for="resendEmail">Email</label>';
	  l_html += '<input type="radio" name="rb" onclick="return openOTPMobileBox(event)" id="resendMobile" />';
	  l_html += '<label for="resendMobile">Mobile</label>';
	  l_html += '<div class="boxforinput"></div>';
	  l_html += '</div>'; 
	  
	  $("#horizontalTab").hide();
	  $("#registration").hide();
	  $("#form_div").html('').append(l_html);
	}

	function openOTPEmailBox(){debugger;
		//alert("open mail box");
	
	//this div will create text box to insert email  
		var l_html = "";
		
		l_html += '<span class="input input--hoshi">';
		l_html += '<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />';
        l_html += '<input name="email"  required class="input__field input__field--hoshi" type="text" id="userEmail" required autocomplete="off" />';
        l_html += '<label class="input__label input__label--hoshi input__label--hoshi-color-3" for="username">';
        l_html += '<span class="input__label-content input__label-content--hoshi">Enter Your E-mail</span>';
        l_html += '</label></span>';
        l_html += '<div class="submit">';
        l_html += '<input onclick="return validateUser();" type="button" value="SUBMIT"/></div>';
        
        $(".boxforinput").html('').append(l_html);
	}

	function openOTPMobileBox(){debugger;
		//alert("open mobile box");
	//this div will create text box to insert mobile   number
		var l_html = "";
		
		l_html += '<span class="input input--hoshi">';
		l_html += ' <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />';
        l_html += '<input  name="mobile" class="input__field input__field--hoshi mobile" type="text" id="userMobile" maxlength="10" onkeypress="return isMobile(event)" autocomplete="off" />';
        l_html += '<label class="input__label input__label--hoshi input__label--hoshi-color-3" for="usermobile">';
        l_html += '<span class="input__label-content input__label-content--hoshi">Enter Your Mobile Number</span>';
        l_html += '</label></span>';
        l_html += '<div class="submit">';
        l_html += '<input onclick="return validateUser();" type="button" value="SUBMIT"/></div>';
        
        $(".boxforinput").html('').append(l_html);
	}
	
	function validateAICTERegistration(){debugger;
		
		personalName = $("#p_Name").val();
		title = $("#p_title").val();
		personalEmail = $("#p_email").val();
		personalContact = $("#p_contact").val();
		aicteId = $("#i_aicteId").val();
		collegeName = $("#i_collegeName").val();
		url = $("#i_url").val();
		address = $("#i_address").val();
		
		
		if (personalName == ''|| personalName == null || personalName == undefined) {
			$("#errormsg").html("please enter name");
			/*toastr.clear();
			toastr.error('please enter name')*/
			return false;
		} 
		if (title == ''|| title == null || title == undefined) {
			$("#errormsg").html("please enter title");
			/*toastr.clear();
			toastr.error('please enter name')*/
			return false;
		} 
		if (personalEmail == ''|| personalEmail == null || personalEmail == undefined) {
			$("#errormsg").html("please enter valid email");
			/*toastr.clear();
			toastr.error('please enter valid email')*/
			
			return false;
		}
		if(personalEmail.length>0){
			
			var atpos = personalEmail.indexOf("@");
			var dotpos = personalEmail.lastIndexOf(".");
			if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= personalEmail.length) {
				$("#errormsg").html("Please enter a valid email address");
				/*toastr.clear();
				toastr.error('Please enter a valid email address')*/
				
				return false;
			}
		}
		if ((personalContact.length)!=10 || personalContact==null || personalContact == undefined || personalContact == "") {
			
			$("#errormsg").html("please enter valid phone number");
			/*toastr.clear();
			toastr.error('please enter valid phone ')*/
			
			return false;
		}
		if (aicteId == ''|| aicteId == null || aicteId == undefined) {
			$("#errormsg").html("please enter AICTE ID");
			/*toastr.clear();
			toastr.error('please enter valid email')*/
			
			return false;
		}
		
		if (collegeName == ''|| collegeName == null || collegeName == undefined) {
			$("#errormsg").html("please enter college name");
			/*toastr.clear();
			toastr.error('please enter valid email')*/
			
			return false;
		}
		if (url == ''|| url == null || url == undefined) {
			$("#errormsg").html("please enter website url");
			/*toastr.clear();
			toastr.error('please enter valid email')*/
			
			return false;
		}
		if (address == ''|| address == null || address == undefined) {
			$("#errormsg").html("please enter address");
			/*toastr.clear();
			toastr.error('please enter valid email')*/
			
			return false;
		}

		return true;
		
	}
	function validateAICTEContact(){debugger;
		
		
		otherName = $("#i_otherName").val();
		otherEmail = $("#i_otherEmail").val();
		otherMobile = $("#i_otherMobile").val();
		designation = $("#i_designation").val();
		
		if (otherName == ''|| otherName == null || otherName == undefined) {
			$("#AddCoordinatorError").html("please enter name");
			/*toastr.clear();
			toastr.error('please enter valid email')*/
			
			return false;
		}
		
		if (otherEmail == ''|| otherEmail == null || otherEmail == undefined) {
			$("#AddCoordinatorError").html("please enter valid email");
			/*toastr.clear();
			toastr.error('please enter valid email')*/
			
			return false;
		}
		if(otherEmail.length>0){
			
			var atpos = otherEmail.indexOf("@");
			var dotpos = otherEmail.lastIndexOf(".");
			if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= otherEmail.length) {
				$("#AddCoordinatorError").html("Please enter a valid email address");
				/*toastr.clear();
				toastr.error('Please enter a valid email address')*/
				
				return false;
			}
		}
		if ((otherMobile.length)!=10 || otherMobile==null || otherMobile == undefined || otherMobile == "") {
			
			$("#AddCoordinatorError").html("please enter valid mobile number ");
			/*toastr.clear();
			toastr.error('please enter valid phone ')*/
			
			return false;
		}
		
		
		if (designation == ''|| designation == null || designation == undefined || designation == 'none') {
			$("#AddCoordinatorError").html("Please select Role");
			/*toastr.clear();
			toastr.error('please enter valid email')*/
			
			return false;
		}
		return true;
	}
 
	
function validateAICTECourse(){ debugger;
		
		
		instituteType = $("#i_typeId").val();
		level= $("#i_level").val();
		program = $("#i_programs").val();
		//specialization = $("#i_specialization").val();
		numberOfStudent = $("#i_numberOfStudent").val();
		
		if (instituteType == ''|| instituteType == null || instituteType == undefined) {
			$("#course_i_error").html("please select type");
			/*toastr.clear();
			toastr.error('please enter valid email')*/
			
			return false;
		}
		
		if (level == ''|| level == null || level == undefined) {
			$("#course_i_error").html("please select level");
			/*toastr.clear();
			toastr.error('please enter valid email')*/
			
			return false;
		}

/*		if ((otherMobile.length)!=10 || otherMobile==null || otherMobile == undefined || otherMobile == "") {
			
			$("#errormsg").html("please enter valid mobile number ");
			toastr.clear();
			toastr.error('please enter valid phone ')
			
			return false;
		}*/
		
		
		if (program == ''|| program == null || program == undefined) {
			$("#course_i_error").html("please select program");
			/*toastr.clear();
			toastr.error('please enter valid email')*/
			
			return false;
		}
		
/*		if (specialization == ''|| specialization == null || specialization == undefined) {
			$("#course_i_error").html("write your multi specialization seprated with (,)");
			toastr.clear();
			toastr.error('please enter valid email')
			
			return false;
		}*/
		
		if (numberOfStudent == ''|| numberOfStudent == null || numberOfStudent == undefined) {
			$("#course_i_error").html("enter number of student");
			/*toastr.clear();
			toastr.error('please enter valid email')*/
			
			return false;
		}
		return true;
	}
 