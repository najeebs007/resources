/**
 * 
 */

$(document).ready(function() {
	$(".loading").hide();
	
});

function studentProfileRegistration() {
	
	if(!validateSudentGeneral()){
		return false;
	}
	var l_input_data = {};
	
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
			$("#myModal").modal('hide');
			$(".loading").hide();

		},

		error : function(jqXHR, textStatus, errorThrown) {
			alert("error:" + textStatus + " exception:" + errorThrown);
		}

	});

}



function addStudentEducation() {

	// $(".loading").show();
	if(!(validateEducation())){
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
	if($(".c_grade").val() != '')
	     l_input_map.grade = $(".c_grade").val();
	if($(".c_percent").val() != '')
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
				    $('#myModaleduction').on('hidden.bs.modal', function () {
				    $(this).find('form').trigger('reset');
				    })
				    $('.c_ed_error').html('');
				    $(".loading").hide();
				},

				error : function(jqXHR, textStatus, errorThrown) {
					alert("error:" + textStatus + " exception:" + errorThrown);
				}

			});

}
function editStudentEducation(educationId) {
	$(".loading").show();
	$.ajax({

				type : 'GET',
				url : "edit-student-education",
				data : {educationId:educationId},
				success : function(response) {
					if(!(response.educationId == 'none')){
						$(".c_educationId").val(response.educationId);
						$(".c_rollnumberOrEID").val(response.rollNumber);
						$(".c_section").val(response.section);
						$(".c_yearClass").val(response.year);
						$(".c_desc").val(response.description);
						$(".loading").hide();
						floats();
						
					}
				},
                 error : function(jqXHR, textStatus, errorThrown) {
					alert("error:" + textStatus + " exception:" + errorThrown);
				}

			});

}



function editProfession(professionId) {
	$(".loading").show();
	$.ajax({

				type : 'GET',

				url : "/student/get-profession",
				data : {professionId:professionId},
				success : function(response) {
					
					if (!(response.userProfessionalDetailId == "none")) {
						
						 $(".professionIdClass").val(response.userProfessionalDetailId);
						 $(".occupationClass").val(response.occupation);
						 $(".occupationClass").val(response.occupation);
						 $(".locationClass").val(response.location);
						 $(".organizationClass").val(response.organization);
				/*		 $(".startDateClass").val(response.startDate);*/
						 $(".c_remarks").val(response.remarks);
						/* $(".endDate").val(response.endDate);*/
						 
						$('#myModalprofessional').modal('show');
						$(".loading").hide();
						floats();
					}

				},

				error : function(jqXHR, textStatus, errorThrown) {
					alert("error:" + textStatus + " exception:" + errorThrown);
				}

			});

}

function addStudentProfessionalDetail() {debugger;
	if(!(validateProfessional())){debugger;
		return false;
	}
	var l_input_map = {};
	
	l_input_map.professionId = $(".professionIdClass").val();
	l_input_map.occupation = $(".occupationClass").val();
	l_input_map.startDate = $(".startDateClass").val();
	l_input_map.endDate = $(".endDateClass").val();
	l_input_map.location = $(".locationClass").val();
	l_input_map.organization = $(".organizationClass").val();
	l_input_map.remarks = $(".c_remarks").val();
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
						/*$('.p_occupation').html($(".occupationClass").val());
						$('.p_start').html($(".startDateClass").val());
						$('.p_end').html($(".endDateClass").val());
						$('.p_location').html($(".locationClass").val());
						$('.p_organization').html($(".organizationClass").val());
						$('.p_remarks').html($(".c_remarks").val());*/
						$(".professionIdClass").val('none');
						   $('#myModalprofessional').modal('hide');
						   $('#myModalprofessional').on('hidden.bs.modal', function () {
						   $(this).find('form').trigger('reset');
						   })
					}
						   
					$(".loading").hide();
				},

				error : function(jqXHR, textStatus, errorThrown) {
					alert("error:" + textStatus + " exception:" + errorThrown);
				}

			});
}


function addStudentCertificate() {debugger;

	if(!(validateCertificate())){debugger;
		return false;
	}
var l_input_map = {};
	
    l_input_map.certificateId = $(".certificateIdClass").val();
	l_input_map.certificateName = $(".certificateNameClass").val();
	l_input_map.certificateNumber = $(".certificateNumberClass").val();
	l_input_map.certificateExpire = $(".certificateExpiryClass").val();
	l_input_map.certificateAuthority = $(".certificateAuthorityClass").val();
	l_input_map.certificateDate = $(".certificateDateClass").val();

	$(".loading").show();
	$.ajax({

				type : 'POST',
				cache : false,
				async : true,
				contentType : "application/json; charset=UTF-8",
				url : "/student/student-certificate",
				dataType : 'json',
				data : JSON.stringify(l_input_map),
				success : function(response) {
					if(!(response.userCertificationsId == 'none')){
					   $(".certificateIdClass").val('none');
					   $('#myModalcerti').modal('hide');
					   $('#myModalcerti').on('hidden.bs.modal', function () {
					    $(this).find('form').trigger('reset');
					   })
					}
					else
						$('.c_c_error').html('There is some error while adding or updating certificate!');
				
					$(".loading").hide();
				},

				error : function(jqXHR, textStatus, errorThrown) {
					$('.c_c_error').html('There is some error while adding or updating certificate!');
					//alert("error:" + textStatus + " exception:" + errorThrown);
				}

			});

}

 function editStudentCertificate(certificateId) {
	 $(".loading").show();
	$.ajax({

				type : 'GET',

				url : "/student/get-certificate",
				data : {certificateId:certificateId},
				success : function(response) {
					
					if (!(response.userCertificationsId == "none")) {
						
						 $(".certificateIdClass").val(response.userCertificationsId);
						 $(".certificateNameClass").val(response.certificationName);
						 $(".certificateNumberClass").val(response.certificationNumber);
				/*		 $(".certificateExpiryClass").val(response.certificationExpiryDate);*/
						 $(".certificateAuthorityClass").val(response.certificationAuthority);
						/* $(".certificateDateClass").val(response.certificationDate);*/
						 
						$('#myModalcerti').modal('show');
						$(".loading").hide();
						floats();
						 
					}

				},

				error : function(jqXHR, textStatus, errorThrown) {
					alert("error:" + textStatus + " exception:" + errorThrown);
				}

			});

}


function addStudentContactDetail() {

	if(!validateSudentContact()){
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
					 if(!(response.addressId == 'none')){
						 
						// var $sel = $("#Example");
						// var text = $("option:selected",$sel).text(); 
						 $('.b_address').html($(".c_address").val());
						 var $sel = $(".studentCountry");
						 $('.b_country').html($("option:selected",$sel).text());
						 var $sel = $(".studentState");
						 $('.b_state').html($("option:selected",$sel).text());
						 var $sel = $(".studentDistrict");
						 $('.b_district').html($("option:selected",$sel).text());
						 var $sel = $(".studentCity");
						 $('.b_city').html($("option:selected",$sel).text());
						
						 $('.b_pin').html($(".c_zip").val());
						 $('#myModalcontact').modal('hide');
					 }
					 $(".loading").hide();
					 
		},

		error : function(jqXHR, textStatus, errorThrown) {
			alert("error:" + textStatus + " exception:" + errorThrown);
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
			alert("error:" + textStatus + " exception:" + errorThrown);
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
					alert(jqXHR[2]);
				}
			});
}

