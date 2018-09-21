/**
 * 
 */


function aicteRegistration() {

	if (!validateAICTERegistration()) {
		return false;
	}
	var data = {
		"contactId" : $("#p_id").val(),
		"personalName" : $("#p_Name").val(),
		"title" : $("#p_title").val(),
		"personalEmail" : $("#p_email").val(),
		"personalContact" : $("#p_contact").val(),
		"aicteId" : $("#i_aicteId").val(),
		"collegeName" : $("#i_collegeName").val(),
		"url" : $("#i_url").val(),
		"address" : $("#i_address").val(),
		"addressId" : $("#p_address").val(),
		"state" : $("#stateId").val(),

	}

	$.ajax({
		type : 'POST',
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		url : "/smopl/institute/save-aicte-registration-info",
		data : JSON.stringify(data),
		datatype : "json",
		success : function(response) {

			if (response == 'SUCCESS') {
				toastr.clear();
				toastr.success('Updated Successfully');
				$('.ashu').click();
			}

		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("error:" + textStatus + " exception:" + errorThrown);
		}
	});

}

function aicteRegistrationContacts() {
	debugger;

	if (!validateAICTEContact()) {
		debugger;
		return;
	}

	var data = {

		"otherName" : $("#i_otherName").val(),
		"otherEmail" : $("#i_otherEmail").val(),
		"otherMobile" : $("#i_otherMobile").val(),
		"designation" : $("#i_designation").val(),
	}

	$.ajax({
		type : 'POST',
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		url : "/smopl/institute/save-aicte-registration-contacts",
		data : JSON.stringify(data),
		datatype : "json",
		success : function(response) {

			if (response.identifier == 'none') {
				toastr.clear();
				toastr.error('No record saved!');
			} else {

				$('#myModal').modal('hide');
				// $(".contactForm").reset();
				$("#aicteContact").append(
						'<tr><th>' + response.name + '</th><th>'
								+ response.email + '</th><th>'
								+ response.mobileNumber + '</th><th>'
								+ response.designation + '</th></tr>')
			}

		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("error:" + textStatus + " exception:" + errorThrown);
		}
	});

}

function addAICTECourses() {
	debugger;

	if (!validateAICTECourse()) {
		debugger;
		return;
	}
	var data = {
		"instituteType" : $("#i_typeId").val(),
		"instituteLevel" : $("#i_level").val(),
		"aictePrograms" : $("#i_programs").val(),
		"instituteSpecialization" : $("#i_specialization").val(),
		"numberOfStudent" : $("#i_numberOfStudent").val(),

	}

	$.ajax({
		type : 'POST',
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		url : "/smopl/institute/save-aicte-course-info",
		data : JSON.stringify(data),
		datatype : "json",
		success : function(response) {

			if (response.courseId == 'none') {
				toastr.clear();
				$("#course_i_error")('No record saved!');
			} else {
				$('#addCourse').modal('hide');
				// $(".courseForm").reset();
				$("#i_courses").append(
						'<tr><th>' + response.instituteType + '</th><th>'
								+ response.level + '</th><th>'
								+ response.program + '</th><th>'
								+ response.specialization + '</th><th>'
								+ response.numberOfStudent + '</th></tr>')
			}

		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("error:" + textStatus + " exception:" + errorThrown);
		}
	});

}

function userServicesDetail() {

	var l_input_data = {};
	var id1 = 'SERVICE_1001';
	var id2 = 'SERVICE_1002';
	var id3 = 'SERVICE_1003';
	var id4 = 'SERVICE_1004';
	var id5 = 'SERVICE_1005';
	var id6 = 'SERVICE_1006';
	var id7 = 'SERVICE_1007';
	var id8 = 'SERVICE_1008';
	var id9 = 'SERVICE_1009';

	if ($('.c_GeneralAndMentalAbilityTest').is(":checked")) {
		l_input_data.id1 = 'SERVICE_1001';
	}
	if ($('.c_AchievementTest').is(":checked")) {
		l_input_data.id2 = 'SERVICE_1002';
	}
	if ($('.c_AptitudeTest').is(":checked")) {
		l_input_data.id3 = 'SERVICE_1003';
	}
	if ($('.c_GATETestSeries').is(":checked")) {
		l_input_data.id4 = 'SERVICE_1004';
	}
	if ($('.c_FacultyTrainingNeedsTest').is(":checked")) {
		l_input_data.id5 = 'SERVICE_1005';
	}
	if ($('.c_JobSearch').is(":checked")) {
		l_input_data.id6 = 'SERVICE_1006';
	}
	if ($('.c_ResumeWriting').is(":checked")) {
		l_input_data.id7 = 'SERVICE_1007';
	}
	if ($('.c_BusinessCommunication').is(":checked")) {
		l_input_data.id8 = 'SERVICE_1008';
	}
	if ($('.c_InterviewTechniques').is(":checked")) {
		l_input_data.id9 = 'SERVICE_1009';
	}

	if (!($('#i_SourceInformation').val() == 'none'))
		l_input_data.sourceInfo = $('#i_SourceInformation').val();
	if (!($('.c_remarks').val() == ''))
		l_input_data.remarks = $('.c_remarks').val();

	$.ajax({
		type : 'POST',
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		url : "/smopl/institute/save-service-info",
		data : JSON.stringify(l_input_data),
		datatype : "json",
		success : function(response) {
			alert(response);

		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("error:" + textStatus + " exception:" + errorThrown);
		}
	});

}


function addStudentsManual(p_formId,p_errorClass) {
	try{
		checkValidate(p_formId,p_errorClass,false,false)
	}catch(result){
	if(result){
    var data = {
        "mobile": $(".c_mobile").val(),
        "universityRollNumber": $(".c_rollNumber").val(),
        "yearORSemester": $(".c_yearORSemester").val(),
        "program": $(".c_program").val(),
        "emailId": $(".c_email").val(),
        "specialization": $(".c_specialization").val(),
        "level": $(".c_level").val(),
        "name": $(".c_name").val(),
        "candidateType": $(".c_candidateType").val()
    }
    $(".loading").show();
    $.ajax({
                type: "POST",
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                url: "/smopl/institute/add-students-manual",
                data: JSON.stringify(data), // Note it is important
                success : function(response)
                {
                	
                	if (response.identifier !='FAIL'){
                		$("#nominateStudent").append('<tr><th></th><th>' + response.level + '</th><th>'+ response.program + '</th><th>'+ response.specialization + '</th><th>'+ response.yearORSemester + '</th><th>'+ response.universityRollNumber+ '</th><th>' + response.name + '</th><th>'+ response.emailId + '</th><th>'+ response.mobile + '</th></tr>');
                		$('#addStudent').modal('hide');
                		$(".loading").hide();
                		toastr.success("Nomination successfull!");
                		}
                	},error : function(jqXHR, textStatus, errorThrown){
                		$(".loading").hide();
                			//alert("error:" + textStatus + " exception:" + errorThrown);
                	}
           });
}else
	return false;
}
}







 

