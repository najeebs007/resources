/**
 * 
 * This file will be a single js file for any communication of ajax request. The
 * file is written to consider all the aspects of ajax request and response.
 * 
 * @author Rajesh Rawat
 * @version 1.0
 * @since 1.0
 * 
 */

/* this method hide the verification on load home.jsp */

$(document).ready(function() {
	$("#verification").hide();
	$("#setpassword").hide();
	$(".loading").hide();

	/*jQuery('#addPro').modal('show', {backdrop: 'static', keyboard: false});*/
	
/*	$('#addPro').modal({
	    backdrop: 'static',   // This disable for click outside event
	    keyboard: true        // This for keyboard event
	})*/
	/*
	 * $.ajax({
	 * 
	 * type : 'POST', url : "programListHome", data : { programType :
	 * "recommended" }, success : function(response) { // alert(response); var
	 * programObject = response.split('o$'); // alert(programObject.length); var
	 * programTag = null; var i; for (i = 0; i < programObject.length - 1; i++) {
	 * var programProperties = programObject[i] .split('p#'); //
	 * alert(programProperties[3]); programTag = '<div class="col-md-6"><article
	 * class="post-wrapper list-article">' + '<div class="hover-overlay
	 * brand-bg"></div>' + '<div class="thumb-wrapper waves-effect waves-block
	 * waves-light">' + '<a href="#"><img src="' + programProperties[0] + '"
	 * class="img-responsive" alt=""></a></div>' + '<!-- .post-thumb -->' +
	 *  '<div class="blog-content">' + '<header class="entry-header-wrapper">' + '<div
	 * class="entry-header">' +
	 *  '<h2 class="entry-title"><a href="#">' + programProperties[1] + '</a></h2>' + '<div
	 * class="entry-meta">' + '<ul class="list-inline">' +
	 *  '<li><i class="fa fa-calendar-o"></i> <a href="#">' +
	 * programProperties[2] + '</a></li>' + '</ul>' + '</div>' + '<!--
	 * .entry-meta -->' + '</div>' + '<!-- /.entry-header -->' + '</header>' '<!--
	 * /.entry-header-wrapper -->' +
	 *  '<div class="entry-content">' + '<p>' + programProperties[3] + '</p>' +
	 *  '</div>' + '<!-- .entry-content -->' + '</div>' +
	 *  '</article>' + '<!-- /.post-wrapper -->' + '</div>'
	 * 
	 * $("#programList").append(programTag); programTag = null; }
	 *  }, error : function(jqXHR, textStatus, errorThrown) { // alert("error:" +
	 * textStatus + " // exception:" // + errorThrown); } });
	 */

});

/* registration info send to server */
$("#signupnow")
		.click(
				function() {

					if (!validateform()) {
						return;
					}
					$(".loading").show();
					$("#signupnow").prop("disabled", true);

					$
							.ajax({
								type : 'POST',
								url : "register",
								data : $(".signup").serialize(),
								success : function(res) {
									$(".loading").hide();
									$("#signupnow").prop("disabled", false);
									if (res.startsWith("SUCCESS")) {
										$("#verification").show();
										// alert(res);
										toastr
												.success('You are successfully Registered please verify your OTP');
										$("#registration").hide();

										/* add value in hidden fields */
										var hiddenValue = res.split("-");
										$("#verifyMessage")
												.html(
														'<h4 style="color:black; font-size:18px;font-weight:bold;">Welcome, '
																+ hiddenValue[6]
																+ '</h4><br>'
																+ '<span style="font-size:15px; color:black;font-weight: bold">Your new Scholarsmerit account is '
																+ hiddenValue[1]
																+ '</span><br>'
																+ '<span style="font-size:14px; color:black;">Let\'s verify your phone number. </span><br>'
																+ '<span style="font-size:14px; color:black;">To finish registering, please enter the 6 digit verification code we have sent you on your mobile number ending with <span style="font-family: monospace;">'
																+ hiddenValue[5]
																+ '<span>.</span></span></span>');
										$(".verifyUserName")
												.val(hiddenValue[1]);
										$(".emailCodeId").val(hiddenValue[2]);
										$(".mobileCodeId").val(hiddenValue[3]);
										$(".emailId").val(hiddenValue[4]);
										$(".verifyMobile").val(hiddenValue[5]);
									}
									/*
									 * else if (res == "error") {
									 * $("#binderror").html( "registration
									 * couldn't success try again");
									 * toastr.info('Email ID allready exist') }
									 */

									else {
										 $("#topass").html("<div class='heading'><b>Trying to sign in ?</b> <br>"+res+"<br>or<br>Recover your password here <a href='#' onclick='return forgetPassword()' style='margin-left:10px;font-size:12px;font-decoration:underline;color: #44c7f4;'>Forgot Password ?</a></div> ");
                                         //toastr.error(res)
									}

								},

								error : function(jqXHR, textStatus, errorThrown) {
									$(".loading").hide();
									alert("error:" + textStatus + " exception:"
											+ errorThrown);
								}
							});

				});

var isBoth = 'false';

/* resend email and mobile otp */
function resendotp() {

	$(".loading").show();
	$("#rsend").prop("disabled", true);

	$(".emailOTP").val('');
	$(".mobileOTP").val('');

	$
			.ajax({

				type : 'POST',
				url : "resendOTP",
				data : $(".resendAndVerify").serialize(),
				success : function(res) {

					$(".loading").hide();
					$("#rsend").prop("disabled", false);
					if (res.startsWith("reset")) {

						/* add value in hidden fields */
						var hiddenValue = res.split("-");
						$(".verifyUserName").val(hiddenValue[1]);
						$(".emailCodeId").val(hiddenValue[2]);
						$(".mobileCodeId").val(hiddenValue[3]);
						$(".emailId").val(hiddenValue[4]);
						$(".verifyMobile").val(hiddenValue[5]);
						$("#verifyMessage")
								.html(
										'Resend OTP Successfully. <br><ul style="list-style-type: disc;display: list-item;color: darkblue; font-size: 12px;"><li style="list-style-type: disc;display: list-item;">You are almost done!</li><li style="list-style-type: disc;display: list-item;"> We sent you an email with instructions for completing your registration for '
												+ hiddenValue[1]
												+ '.</li> <li style="list-style-type: disc;display: list-item;">If you do not receive the email check your junk and spam mail folder</li>.</ul>');
					} else {
						/*
						 * $("#binderrorvr").html("resend OTP couldn't success
						 * try again");
						 */
						toastr.error('resend OTP could not success try again')
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$(".loading").hide();
					alert("error:" + textStatus + " exception:" + errorThrown);
				}
			});
}

/* resend email and mobile otp */
function verifyOTP() {

	$(".loading").show();
	$("#vsend").prop("disabled", true);
	$("#OTPemail").val($("#OTPmobile").val());

	$.ajax({

		type : 'POST',
		url : "verify",
		data : $(".resendAndVerify").serialize(),
		success : function(res) {
			$(".loading").hide();
			$("#vsend").prop("disabled", false);
			if (res.startsWith("SUCCESS")) {

				/* add value in hidden fields */
				var hiddenValue = res.split("-");
				$(".setName").val(hiddenValue[1]);
				$("#verification").hide();
				$("#setpassword").show();
			} else {
				/* $("#binderrorvr").html("verify couldn't success try again"); */
				toastr.error(res);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			alert("error:" + textStatus + " exception:" + errorThrown);
		}
	});
}

function setUserPassword() {
	debugger;

	if (!validateVerification()) {
		return false;
	}
	$("#spwd").prop("disabled", true);
	$(".loading").show();
	$.ajax({

		type : 'POST',
		url : "setpassword",
		data : $(".setpwd").serialize(),
		success : function(res) {
			
			if (res.setPassword == "error") {
				$("#spwd").prop("disabled", false);
				$(".loading").hide();
				toastr.error('password not set please try again !')
			} else {
				toastr.success('Please Wait You are going to login.');
				    $('#loginPassword').val(res.setPassword);
				    $('#loginUser').val(res.setName);
					$('#login').submit();
					
/*				$("#setpassword").hide();
				$("#registration").show();
				$("#signups").removeClass("resp-tab-active");
				$("#logins").addClass("resp-tab-active");
				$("#tab2").hide();
				$("#tab1").show();*/

				/*
				 * $respTabs.find('.resp-tab-active').removeClass(
				 * 'resp-tab-active'); $respTabs.find("[aria-controls=" +
				 * 'tab_item-0' + "]") .addClass('resp-tab-active');
				 */
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			alert("error:" + textStatus + " exception:" + errorThrown);
		}
	});
}

function registrationUtkrisht() {
	debugger;

	if (!validateSchoolRegistration()) {
		return;
	}
	var size = parseInt($("#size").val());
	if (size > 0) {
		addExistDetail();
	}
	// alert($("#utkrishtForm").serialize());
	$(".loading").show();
	$.ajax({

		type : 'POST',
		url : "utkrisht-registration-information",
		data : $("#utkrishtForm").serialize(),
		success : function(response) {
			$(".loading").hide();
			if (response.startsWith("SUCCESS")) {
				controlVar = true;
				$('.ashu').click();
				var tokens = response.split("-$");
				$(".instituteName").html(tokens[2]);

				if (tokens[1] == "PAID") {

					$("#pay").html("Payment Done");
					$(".nominate-student").show();
					$("#payLink").attr('disabled', 'disabled');
				} else {
					$("#pay").html("Pay Now");
					$(".nominate-student").hide();
					$(".invoice").hide();
				}
			} else {
				// alert(response);
			}

		},
		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			alert("error:" + textStatus + " exception:" + errorThrown);
		}
	});
}

function getValue(listId) {
	debugger;
	// alert(listId.value);

	$.ajax({

		type : 'GET',
		url : "getList",
		data : {
			id : listId.value
		},
		success : function(response) {
			debugger;
			// alert(response);

			var dataMap = eval('data=' + response);
			var divId;
			var zeroOption;
			var selectedValue = null;
			var target = dataMap.target;
			if (target == 'state') {
				divId = 'stateId';
				$("#countrylError").html('');
				zeroOption = 'Select State';
				selectedValue = '${stateId}'
			} else if (target == 'district') {
				divId = 'districtId';
				$("#stateError").html('');
				zeroOption = 'Select District';
				selectedValue = '${districtId}'
			} else if (target == 'city') {
				divId = 'cityId';
				$("#districtError").html('');
				zeroOption = 'Select City';
				selectedValue = '${cityId}'
			}

			var list = dataMap.list;
			setOptions(divId, list, 'paramId', 'paramName', zeroOption,
					selectedValue);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("error:" + textStatus + " exception:" + errorThrown);
		}
	});

	function setOptions(p_dropdown_id, p_data_list, p_id_param, p_id_value,
			p_zero_option, p_selected_value) {
		debugger;

		var l_is_value = false;
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

		var l_str = "";
		if (p_selected_value == null || p_selected_value == undefined
				|| p_selected_value == "") {
			l_str = '<option value="" selected>' + p_zero_option + ' </option>';
		} else {
			l_is_value = true;
			l_str = '<option value="">' + p_zero_option + ' </option>';
		}

		if (p_data_list == null || p_data_list == undefined
				|| p_data_list == "") {
			p_data_list = [];
		}

		for (var i = 0; i < p_data_list.length; i++) {
			var l_data_map = p_data_list[i];
			var l_param_name = l_data_map[p_id_param];
			var l_param_value = l_data_map[p_id_value];

			if (l_is_value && l_param_name == p_selected_value) {
				l_str += '<option value="' + l_param_name + '" selected>'
						+ l_param_value + ' </option>';
				continue;
			}
			l_str += '<option value="' + l_param_name + '">' + l_param_value
					+ ' </option>';
		}
		// alert(l_str);
		document.getElementById(p_dropdown_id).innerHTML = l_str;
	}

}

function setMedium(medium) {
	$(".c_medium").val(medium);

}

function addStudent() {
	debugger;
	// alert("adding student");
	/*
	 * if(!validateEducation()){ return false; }
	 */

	var boardName = $("#sboard").val();
	var className = $("#sclass").val();
	var streamName = $("#sstream").val();

	if (boardName == null || boardName == undefined || boardName == "") {
		$("#msg").html("Please select Your board");
		/*
		 * toastr.clear(); toastr.error('Please select Your board')
		 */
		return false;
	}

	if (className == null || className == undefined || className == "") {
		$("#msg").html("please select Your class");
		/*
		 * toastr.clear(); toastr.error('Please select Your board')
		 */
		return false;
	}
	if (streamName == null || streamName == undefined || streamName == "") {
		$("#msg").html("please select Your stream");
		/*
		 * toastr.clear(); toastr.error('Please select Your board')
		 */
		return false;
	}

	// $('#myModal1').modal('toggle');
	$('#myModal1').modal('show');

	$("#sboard1").val(boardName);
	$("#sclass1").val(className);
	$("#sstream1").val(streamName);
	$("#msg").html('');

	return true;
}

var row = 0;
function nominateStudent() {
	if (!checkExistEmailPhone()) {
		// alert("mail and phone check");
		return false;
	}
	$("#Modalerror").html('');
	var count = document.getElementById("xID").value;

	debugger;
	if (count > 0 && row == 0) {
		row = count;
	} else {
		row++;
	}

	if (!modalValidate()) {
		return false;
	}

	$(".loading").show();
	$
			.ajax({

				type : 'POST',
				url : "save-student-nomination",
				data : $(".studentNomination").serialize(),
				success : function(response) {
					// alert(response);
					$(".loading").hide();
					if (response == 'success') {

						$("#Modalerror").html('');
						var record = 'record';

						var rows = "<tr id='record"
								+ row
								+ "'><td>"
								+ row
								+ "</td><td>"
								+ $("#sname").val()
								+ "</td><td>"
								+ $("#semail").val()
								+ "</td><td>"
								+ $("#sphone").val()
								+ "</td><td>"
								+ $("#sboard :selected").text()
								+ "</td><td>"
								+ $("#sclass :selected").text()
								+ "</td><td>"
								+ $("#sstream :selected").text()
								+ "</td><td>"
								// + $("#sstatus").val()
								// + "<select id ='select2'>"
								+ "<option value='status1'>PAID</option>"
								// + "<option value='status2'>PENDING</option>"
								// + "</select>"
								+ "</td><td style='padding: 0px;text-align: -webkit-center;'>"
								+ "<div style='padding: 0px;display: inline-flex;'>"
								+ "<span class='checkbox'><input type='checkbox'>"
								+ "<label data-on='ACTIVE' data-off='INACTIVE' style='padding-left: 0px;'>"
								+ "</label></span>"
								+ "<a onclick='removeNominateStudent(\""
								+ record
								+ row
								+ "\",\""
								+ $("#semail").val()
								+ "\")' data-toggle='modal' data-target='#' style='font-size: 28px;color: darkred;cursor: pointer;margin-top: 10px;' class='fa fa-trash-o'>"
								+ "</a></div>" + "</th></tr>";

						$(".tableRecords").append(rows);
						$('#myModal1').modal('hide');

						var productJSON = {
							"phone" : $("#sphone").val(),
							"stream" : $("#sstream :selected").text(),
							"name" : $("#sname").val(),
							"email" : $("#semail").val(),
							"board" : $("#sboard :selected").text(),
							"studentClass" : $("#sclass :selected").text(),
							"status" : "PAID"
						};
						l_studentList.push(productJSON);

					}

				},
				error : function(jqXHR, textStatus, errorThrown) {
					alert("error:" + textStatus + " exception:" + errorThrown);
				}
			});

}

function removeNominateStudent(row, email) {

	debugger;
	if (confirm("Do you want to delete this record ?") == true) {
		var progId = document.getElementById("progId").value;
		$.ajax({

			type : 'GET',
			url : "remove-institute-student-nomination",
			data : {
				studentId : email,
				programId : progId
			},

			success : function(response) {
				// alert(response);
				if (response == 'success') {
					$("#" + row).remove();

				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("error:" + textStatus + " exception:" + errorThrown);
			}
		});
	}
	// $("#" + row).remove();
}

function instituteRegistrationSummary() {

	debugger;
	var studentId = "";
	// alert("summary");
	$.ajax({

		type : 'POST',
		url : "institute-registration-summary",
		data : {
			userName : studentId
		},
		success : function(response) {
			// alert(response);
			$("#summary").html(response);

		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("error:" + textStatus + " exception:" + errorThrown);
		}
	});

}








