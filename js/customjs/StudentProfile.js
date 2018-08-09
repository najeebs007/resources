/**
 * 
 * 
 */

$(document).ready(function() {
	debugger;
	ratingStarCount2();
	getSocialData1();
	/* loadSpecializationData(); */

});
$(document).ready(function() {
	$(".loading").hide();

});

function studentProfileRegistration() {
	debugger;

	if (!validateSudentGeneral()) {
		return false;
	}

	if (!checkValidDate($(".c_dateOfBirth").val(), 'c_s_error')) {
		return false;
	}

	var l_input_data = {};
	$('.c_ed_error').html('');
	l_input_data.userName = $(".c_username").val();
	l_input_data.fathersName = $(".c_studentFather").val();
	l_input_data.mothersName = $(".c_mothersName").val();
	l_input_data.gender = $(".c_gender").val();
	l_input_data.dateOfBirth = $(".c_dateOfBirth").val();
	l_input_data.nationality = $(".c_nationality").val();
	l_input_data.adharCardNumber = $(".c_adharCardNumber").val();
	l_input_data.pancardNumber = $(".c_pancardNumber").val();
	l_input_data.passportNumber = $(".c_passportNumber").val();
	$(".loading").show();
	$.ajax({

		type : 'POST',
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		url : "/student/general-information",
		data : JSON.stringify(l_input_data),
		datatype : "json",
		success : function(response) {
			// alert(JSON.stringify(response));

			if (response.status == 'SUCCESS') {
				$("#myModal").modal('hide');
				location.reload();
				toastr.success(response.message);
			}
			if (response.status == 'ERROR') {
				$(".loading").hide();
				// toastr.success(response.message);
				$('.c_ed_error').html(response.message);
			}

		},

		error : function(jqXHR, textStatus, errorThrown) {
			// alert("error:" + textStatus + " exception:" + errorThrown);
			$(".loading").hide();
			$('.c_ed_error').html("we don't find proper input . try again.");
			// toastr.success("we don't find proper input . try again.");
		}

	});

}

function addStudentEducation() {

	// $(".loading").show();
	if (!(validateEducation())) {
		return false;
	}

	var l_input_map = {};

	l_input_map.eduId = $(".c_educationId").val();
	l_input_map.universityboard = $(".c_universityBoard").val();
	l_input_map.institute = $(".c_instituteSchoolCollege").val();
	l_input_map.id = $(".c_rollnumberOrEID").val();
	l_input_map.year = $(".c_yearClass").val();
	l_input_map.endDate = $(".c_eduEndDate").val();
	l_input_map.description = $(".c_desc").val();
	l_input_map.education = $(".c_studentEdu").val();
	l_input_map.branch = $(".c_eduBranch").val();
	l_input_map.section = $(".c_section").val();
	l_input_map.startDate = $(".c_studentStartDate").val();

	if ($(".c_grade").val() != '')
		l_input_map.grade = $(".c_grade").val();
	if ($(".c_percent").val() != '')
		l_input_map.percent = $(".c_percent").val();
	$(".loading").show();
	$.ajax({

		type : 'POST',
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",

		url : "/student/add-student-education",
		data : JSON.stringify(l_input_map),
		dataType : 'json',
		success : function(response) {
			$('#myModaleduction').modal('hide');
			$('#myModaleduction').on('hidden.bs.modal', function() {
				$(this).find('form').trigger('reset');
			})
			$('.c_ed_error').html('');
			// $(".loading").hide();
			location.reload();
		},

		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			$('.c_ed_error').html("we don't find proper input . try again.");
			// alert("error:" + textStatus + " exception:" + errorThrown);
		}

	});

}
function editStudentEducation(educationId) {
	// alert("edit education");
	$(".loading").show();
	$.ajax({

		type : 'GET',
		url : "edit-student-education",
		data : {
			educationId : educationId
		},
		success : function(response) {
			if (!(response.educationId == 'none')) {

				$(".universityBoard").val(response.universityBoard);
				$(".instituteSchoolCollege").val(response.instituteName);
				$(".studentEdu").val(response.educationTypeId);
				$(".c_rollnumberOrEID").val(response.rollNumber);
				$(".c_yearClass").val(response.year);

				var l_date = response.startDate;
				var l_dateStart = new Date(Number(l_date));
				var weekday = new Array("Sunday", "Monday", "Tuesday",
						"Wednesday", "Thursday", "Friday", "Saturday")
				var monthname = new Array("Jan", "Feb", "Mar", "Apr", "May",
						"Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
				var l_day = (weekday[l_dateStart.getDay()] + " ")
				var l_date = (l_dateStart.getDate() + " ")
				var l_month = (monthname[l_dateStart.getMonth()] + " ")
				var l_year = (l_dateStart.getFullYear())
				var startDate = l_day + l_date + l_month + l_year;
				$(".c_studentStartDate").val(startDate);

				var l_dateE = response.endDate;
				var l_dateEnd = new Date(Number(l_dateE));
				var weekday = new Array("Sunday", "Monday", "Tuesday",
						"Wednesday", "Thursday", "Friday", "Saturday")
				var monthname = new Array("Jan", "Feb", "Mar", "Apr", "May",
						"Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
				var l_day = (weekday[l_dateEnd.getDay()] + " ")
				var l_date = (l_dateEnd.getDate() + " ")
				var l_month = (monthname[l_dateEnd.getMonth()] + " ")
				var l_year = (l_dateEnd.getFullYear())
				var endDate = l_day + l_date + l_month + l_year;
				$(".c_eduEndDate").val(endDate);

				$(".c_desc").val(response.description);

				$(".eduBranch").val(response.branch);
				$(".c_section").val(response.section);

				$(".c_grade").val(response.gradePercentage);
				$(".c_percent").val(response.gradePercentage);
				$(".c_educationId").val(response.eduId);

				$(".loading").hide();
				$("#myModaleduction").modal('show');
				floats();

			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			$('.c_ed_error').html("we don't find proper input . try again.");
			// alert("error:" + textStatus + " exception:" + errorThrown);
		}

	});

}

function editProfession(professionId) {
	$(".loading").show();
	$.ajax({

		type : 'GET',

		url : "/student/get-profession",
		data : {
			professionId : professionId
		},
		success : function(response) {

			if (!(response.userProfessionalDetailId == "none")) {

				$(".professionIdClass").val(response.userProfessionalDetailId);
				$(".occupationClass").val(response.occupation);
				$(".occupationClass").val(response.occupation);
				$(".locationClass").val(response.location);
				$(".organizationClass").val(response.organization);
				$(".c_remarks").val(response.remarks);

				var l_date = response.startDate;
				var l_dateStart = new Date(Number(l_date));
				var monthname = new Array("01", "02", "03", "04", "05", "06",
						"07", "08", "09", "10", "11", "12")
				var l_date = (l_dateStart.getDate() + " ")
				var l_month = (monthname[l_dateStart.getMonth()] + " ")
				var l_year = (l_dateStart.getFullYear())
				var startDate = l_date.trim() + "/" + l_month.trim() + "/"
						+ l_year;
				$(".startDateClass").val(startDate);
				var l_dateE = response.endDate;
				var l_dateEnd = new Date(Number(l_dateE));
				var monthname = new Array("01", "02", "03", "04", "05", "06",
						"07", "08", "09", "10", "11", "12")
				var l_date = (l_dateEnd.getDate() + " ")
				var l_month = (monthname[l_dateEnd.getMonth()] + " ")
				var l_year = (l_dateEnd.getFullYear())
				var endDate = l_date.trim() + "/" + l_month.trim() + "/"
						+ l_year;
				$(".endDateClass").val(endDate);

				$('#myModalprofessional').modal('show');
				$(".loading").hide();
				floats();
			}

		},

		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			$('.c_ed_error').html("we don't find proper input . try again.");
			// alert("error:" + textStatus + " exception:" + errorThrown);
		}

	});

}

function addStudentProfessionalDetail() {
	debugger;
	if (!(validateProfessional())) {
		debugger;
		return false;
	}

	var l_input_map = {};

	l_input_map.professionId = $(".professionIdClass").val();
	l_input_map.occupation = $(".occupationClass").val();

	var l_date = l_input_map.startDate;
	var l_dateStart = new Date(Number(l_date));
	var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday",
			"Thursday", "Friday", "Saturday")
	var monthname = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
			"Aug", "Sep", "Oct", "Nov", "Dec")
	var l_day = (weekday[l_dateStart.getDay()] + " ")
	var l_date = (l_dateStart.getDate() + " ")
	var l_month = (monthname[l_dateStart.getMonth()] + " ")
	var l_year = (l_dateStart.getFullYear())
	var startDate = l_day + l_date + l_month + l_year;
	l_input_map.startDate = $(".startDateClass").val();

	var l_dateE = l_input_map.endDate;
	var l_dateEnd = new Date(Number(l_dateE));
	var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday",
			"Thursday", "Friday", "Saturday")
	var monthname = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
			"Aug", "Sep", "Oct", "Nov", "Dec")
	var l_day = (weekday[l_dateEnd.getDay()] + " ")
	var l_date1 = (l_dateEnd.getDate() + " ")
	var l_month1 = (monthname[l_dateEnd.getMonth()] + " ")
	var l_year1 = (l_dateEnd.getFullYear())
	var endDate = l_day + l_date + l_month + l_year;
	l_input_map.endDate = $(".endDateClass").val();
	l_input_map.location = $(".locationClass").val();
	l_input_map.organization = $(".organizationClass").val();
	l_input_map.remarks = $(".c_remarks").val();
	var p_startDate = l_input_map.startDate;
	var p_endDate = l_input_map.endDate;

	if (p_startDate > p_endDate) {
		$('.c_professional_error').text(
				'Start date should be less than end date.');
		setTimeout(function() {
			$('.c_professional_error').text('');
		}, 3000);
		return;
	}

	$(".loading").show();
	$.ajax({

		type : 'POST',
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		url : "/student/add-student-professional",
		dataType : 'json',
		data : JSON.stringify(l_input_map),
		success : function(response) {

			$('.c_s_error').html('');
			if (!(response.userProfessionalDetailId == "none")) {
				/*
				 * $('.p_occupation').html($(".occupationClass").val());
				 * $('.p_start').html($(".startDateClass").val());
				 * $('.p_end').html($(".endDateClass").val());
				 * $('.p_location').html($(".locationClass").val());
				 * $('.p_organization').html($(".organizationClass").val());
				 * $('.p_remarks').html($(".c_remarks").val());
				 */
				$(".professionIdClass").val('none');
				$('#myModalprofessional').modal('hide');
				$('#myModalprofessional').on('hidden.bs.modal', function() {
					$(this).find('form').trigger('reset');
				})
			}

			/* $(".loading").hide(); */
			location.reload();
		},

		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			$('.c_ed_error').html("we don't find proper input . try again.");
			// alert("error:" + textStatus + " exception:" + errorThrown);
		}

	});
}

function addStudentCertificate() {
	debugger;
	// in UserValidation.js
	if (!(validateCertificate())) {
		debugger;
		return false;
	}
	var l_input_map = {};

	l_input_map.certificateId = $(".certificateIdClass").val();
	l_input_map.certificateName = $(".certificateNameClass").val();
	l_input_map.certificateNumber = $(".certificateNumberClass").val();
	// l_input_map.certificateExpire = $(".certificateExpiryClass").val();
	l_input_map.certificateAuthority = $(".certificateAuthorityClass").val();
	l_input_map.certificateDate = $(".certificateDateClass").val();

	$(".loading").show();
	$
			.ajax({

				type : 'POST',
				cache : false,
				async : true,
				contentType : "application/json; charset=UTF-8",
				url : "/student/student-certificate",
				dataType : 'json',
				data : JSON.stringify(l_input_map),
				success : function(response) {
					if (!(response.userCertificationsId == 'none')) {
						$(".certificateIdClass").val('none');
						$('#myModalcerti').modal('hide');
						$('#myModalcerti').on('hidden.bs.modal', function() {
							$(this).find('form').trigger('reset');
						})
					} else
						$('.c_c_error')
								.html(
										'There is some error while adding or updating certificate!');

					// $(".loading").hide();
					location.reload();
				},

				error : function(jqXHR, textStatus, errorThrown) {
					$(".loading").hide();
					$('.c_ed_error').html(
							"we don't find proper input . try again.");
					// $('.c_c_error').html('There is some error while adding or
					// updating certificate!');
					// alert("error:" + textStatus + " exception:" +
					// errorThrown);
				}

			});

}

function editStudentCertificate(certificateId) {
	$(".loading").show();
	$.ajax({

		type : 'GET',
		url : "/student/get-certificate",
		data : {
			certificateId : certificateId
		},
		success : function(response) {

			if (!(response.userCertificationsId == "none")) {

				$(".certificateIdClass").val(response.userCertificationsId);
				$(".certificateNameClass").val(response.certificationName);
				$(".certificateNumberClass").val(response.certificationNumber);
				/* $(".certificateExpiryClass").val(response.certificationExpiryDate); */
				$(".certificateAuthorityClass").val(
						response.certificationAuthority);

				var l_dateE = response.certificationDate;
				var l_dateEnd = new Date(Number(l_dateE));
				var monthname = new Array("01", "02", "03", "04", "05", "06",
						"07", "08", "09", "10", "11", "12")
				var l_date = (l_dateEnd.getDate() + " ")
				var l_month = (monthname[l_dateEnd.getMonth()] + " ")
				var l_year = (l_dateEnd.getFullYear())
				var certificationDate = l_date.trim() + "/" + l_month.trim()
						+ "/" + l_year;

				$(".certificateDateClass").val(certificationDate);

				$('#myModalcerti').modal('show');
				$(".loading").hide();
				floats();

			}

		},

		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			$('.c_ed_error').html("we don't find proper input . try again.");
			// alert("error:" + textStatus + " exception:" + errorThrown);
		}

	});

}

function addStudentContactDetail() {

	if (!validateSudentContact()) {
		return false;
	}
	var l_input_map = {};

	l_input_map.addressId = $(".c_addressId").val();
	l_input_map.address = $(".c_address").val();
	l_input_map.country = $(".studentCountry").val();
	l_input_map.state = $(".studentState").val();
	l_input_map.district = $(".studentDistrict").val();
	l_input_map.city = $(".studentCity").val();
	l_input_map.zip = $(".c_zip").val();
	floats();
	$(".loading").show();
	$.ajax({

		type : 'POST',
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		url : "/student/add-contact",
		dataType : 'json',
		data : JSON.stringify(l_input_map),
		success : function(response) {
			$('.c_s_contacterror').html('');
			if (!(response.addressId == 'none')) {

				// var $sel = $("#Example");
				// var text = $("option:selected",$sel).text();
				$('.b_address').html($(".c_address").val());
				var $sel = $(".studentCountry");
				$('.b_country').html($("option:selected", $sel).text());
				var $sel = $(".studentState");
				$('.b_state').html($("option:selected", $sel).text());
				var $sel = $(".studentDistrict");
				$('.b_district').html($("option:selected", $sel).text());
				var $sel = $(".studentCity");
				$('.b_city').html($("option:selected", $sel).text());

				$('.b_pin').html($(".c_zip").val());
				$('#myModalcontact').modal('hide');
			}
			$(".loading").hide();
			location.reload();

		},

		error : function(jqXHR, textStatus, errorThrown) {
			// alert("error:" + textStatus + " exception:" + errorThrown);
		}

	});

}

function loadStateDistrictCity(tokenName) {
	var id = null;
	if (tokenName == 'state')
		id = $(".studentCountry").val();
	if (tokenName == 'district')
		id = $(".studentState").val();
	if (tokenName == 'city')
		id = $(".studentDistrict").val();
	$.ajax({

		type : 'GET',

		url : "load-state-district-city",
		data : {
			token : tokenName,
			tokenId : id
		},
		success : function(response) {
			if (tokenName == 'state')
				$(".stateClass").html(response);
			if (tokenName == 'district')
				$(".districtClass").html(response);
			if (tokenName == 'city')
				$(".cityClass").html(response);

		},

		error : function(jqXHR, textStatus, errorThrown) {
			// alert("error:" + textStatus + " exception:" + errorThrown);
		}

	});

}

/*
 * $("#file-upload-button").change(function () { var fileName =
 * $(this).val().replace('C:\\fakepath\\', '');
 * $("#file-upload-filename").html(fileName); });
 */

$('.image').bind('change', function() {
	// alert('This file size is: ' + (this.files[0].size)/1024 + "KB");
});

function uploadDocuments(formObject, result) {
	var form = new FormData(document.getElementById(formObject));
	$
			.ajax({
				url : "/paytm-response/upload-image",
				data : form,
				dataType : 'text',
				processData : false,
				contentType : false,
				type : 'POST',
				success : function(res) {

					var done = '<font color=\'green\'><i class=\'glyphicon glyphicon-ok\'></i></font>';
					var failed = '<font color=\'red\'><i class=\'glyphicon glyphicon-remove\'></i></font>';
					if (res == 'SUCCESS')
						$(result).html(done);
					if (res == 'FAIL')
						$(result).html(failed);
				},
				error : function(jqXHR) {
					// alert(jqXHR[2]);
				}
			});
}

function ratingStarCount2() {
	debugger;
	var s_html = "";
	$('.s_rating').html("");
	ajaxWithJSON(
			"/common/load-star-count",
			g_data,
			'POST',
			function(response) {
				debugger;
				var l_data = response.object;

				var dataLength = l_data.length;
				var averageRating1 = l_data.averageRating;
				var countRating = l_data.countRating;
				var averageRating = averageRating1.toString();
				/* dynamic html code */

				switch (averageRating) {
				case "0":
					s_html += '<span class="fa fa-star "></span>';
					s_html += '<span class="fa fa-star "></span>';
					s_html += '<span class="fa fa-star "></span>';
					s_html += '<span class="fa fa-star "></span>';
					s_html += '<span class="fa fa-star "></span>';
					break;

				case "1":
					s_html += '<span class="fa fa-star checked"></span>';
					s_html += '<span class="fa fa-star "></span>';
					s_html += '<span class="fa fa-star "></span>';
					s_html += '<span class="fa fa-star "></span>';
					s_html += '<span class="fa fa-star "></span>';
					break;

				case "2":
					s_html += '<span class="fa fa-star checked"></span>';
					s_html += '<span class="fa fa-star checked"></span>';
					s_html += '<span class="fa fa-star "></span></span>';
					s_html += '<span class="fa fa-star "></span></span>';
					s_html += '<span class="fa fa-star "></span></span>';
					break;

				case "3":
					s_html += '<span class="fa fa-star checked"></span>';
					s_html += '<span class="fa fa-star checked"></span>';
					s_html += '<span class="fa fa-star checked"></span>';
					s_html += '<span class="fa fa-star "></span></span>';
					s_html += '<span class="fa fa-star "></span></span>';
					break;

				case "4":
					s_html += '<span class="fa fa-star checked"></span>';
					s_html += '<span class="fa fa-star checked"></span>';
					s_html += '<span class="fa fa-star checked"></span>';
					s_html += '<span class="fa fa-star checked"></span>';
					s_html += '<span class="fa fa-star "></span></span>';
					break;

				case "5":
					s_html += '<span class="fa fa-star checked"></span>';
					s_html += '<span class="fa fa-star checked"></span>';
					s_html += '<span class="fa fa-star checked"></span>';
					s_html += '<span class="fa fa-star checked"></span>';
					s_html += '<span class="fa fa-star checked"></span>';
				}
				s_html += '<span class="rating-text" style="font-weight: 500;margin-right: 5px;margin-left:5px;" >'
						+ countRating + ' reviews </span>';
				$('.s_rating').html(s_html);
				// alert("binding successfully ");
			});
}

function getSocialData1() {
	debugger;
	// var l_data ={};
	var s_html = "";
	$('.c_socialName').html("");
	var l_map = {};

	ajaxWithJSON(
			"/common/student-dashboard-socialdata",
			l_map,
			'POST',
			function(response) {
				debugger;
				var l_data = response.object;
				/* alert(JSON.stringify(l_data)); */
				for (var i = 0; i < l_data.length; i++) {
					debugger;
					var r_map = l_data[i];
					var l_baseURL = r_map.baseURL;
					var l_socialMediaName = r_map.socialMediaName;
					var l_remarks = r_map.remarks;
					var l_iconId = r_map.iconId;
					var l_userLinkId = r_map.userLinkId;
					if (l_socialMediaName == 'facebook') {
						s_html += '<a href="' + l_baseURL
								+ '" target="_blank">';
						s_html += '<div class="social-icon"> <i class="fa fa-facebook-f" style="color: #4867aa;"></i></div>';
						s_html += '</a>';
					}
					if (l_socialMediaName == 'twitter') {
						s_html += '<a href="' + l_baseURL
								+ '" target="_blank">';
						s_html += '<div class="social-icon"> <i class="fa fa-twitter" style="color: #1da1f2;"></i></div>';
						s_html += '</a>';
					}
					if (l_socialMediaName == 'google') {
						s_html += '<a href="' + l_baseURL
								+ '" target="_blank">';
						s_html += '<div class="social-icon"> <i class="fa fa-google" style="color: #dc4a38;"></i></div>';
						s_html += '</a>';
					}
					if (l_socialMediaName == 'linkedin') {
						s_html += '<a href="' + l_baseURL
								+ '" target="_blank">';
						s_html += '<div class="social-icon"> <i class="fa fa-linkedin" style="color: #007bb5;"></i></div>';
						s_html += '</a>';
					}
					$('.c_socialName').html(s_html);
					/* alert(s_html); */
					// $('.c_social').text(socialData);
				}
			});
}