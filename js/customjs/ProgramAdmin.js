/**
 * 
 */
$(document).ready(function() {

	$(".loading").hide();
});

function searchProgram() {

	$(".loading").show();
	$(".c_search").prop("disabled", true);

	var pName = $(".titleClass").val();
	var pId = $(".programIdClass").val();
	var pfilterDate = $(".filterDate").val();
	if (pName == '')
		pName = 'none';
	if (pId == '')
		pId = 'none';
	if (pfilterDate == '')
		pfilterDate = '10/10/2010';

	var data = {
		"title" : pName,
		"dateType" : $(".dateTypeClass").val(),
		"filterDate" : pfilterDate,
		"programId" : pId,
		"status" : $(".statusClass").val(),
	}

	$.ajax({
				type : 'POST',
				cache : false,
				async : true,
				contentType : "application/json; charset=UTF-8",
				url : "/smopl/admin/search-program",
				data : JSON.stringify(data),
				datatype : "json",
				success : function(response) {
					$(".loading").hide();
					$(".c_search").prop("disabled", false);
					if (response != "no record found") {
						$(".programsList").html(response)
					} else {
						$(".programsList").html(
								'<div><h4>' + response + '</h4></div>');
					}

				},
				error : function(jqXHR, textStatus, errorThrown) {
					alert("error:" + textStatus + " exception:" + errorThrown);
					$(".loading").hide();
				}
			});

}

function viewProgram(programId){
	$(".loading").show();
	$(".c_buttonView").prop("disabled", true);
	
    $.ajax({url: "get-view-Program/"+programId}).then(function(data) {view(data)});
}

function view(response) {

	/*$(".loading").show();
	$(".c_buttonView").prop("disabled", true);*/

/*	$.ajax({
		url : "get-view-Program",
		contentType : "application/json",
		data : {
			programId : programId
		},
		type : 'GET',
		dataType : 'json',
		success : function(response) {
			debugger;
*/
			if (response.programId != "none") {
				$("#i_programId").html(response.programId);
				$("#i_title").html(response.title);

				$("#i_registrationStart").html(
						chageDateFormat(response.registrationStartDate));
				$("#i_registrationEnd").html(
						chageDateFormat(response.registrationEndDate));
				$("#i_examDate").html(chageDateFormat(response.examDate));
				$(".i_Address").val(response.fullAddress);
				$("#i_type").html(response.type);
				
				$("#i_homepageImage").html(response.photoOnHomePage);
				$("#i_detailpageImage").html(response.photoOnDetailPage);
				$(".i_Detail").val(response.registrationDetail);

				$(".i_scholarDetail").val(response.scholarshipDetail);
				$("#i_amount").html(response.subscriptionId);
				$(".i_terms").val(response.termsAndCondition);
				
				$(".loading").hide();
				$(".c_buttonView").prop("disabled", false);
				
				$('#viewPro').modal({
				    backdrop: 'static',   // This disable for click outside event
				    keyboard: false        // This for keyboard event
				})
			}

		/*},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("error:" + textStatus + " exception:" + errorThrown);
			$(".loading").hide();
		}
	});*/
}
function changeStatus(programId) {
	debugger;

	if (confirm("Want to change status") == true) {
		$(".loading").show();
		$.ajax({
			url : "update-program-status",
			data : {
				programId : programId
			},
			type : 'GET',
			success : function(response) {
				$(".loading").hide();
				if (response == 'SUCCESS') {
					toastr.clear();
					toastr.success('Status Has Been Changed!');
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("error:" + textStatus + " exception:" + errorThrown);
				$(".loading").hide();
				toastr.error('Status Has not Been Changed!');
			}
		});
	}
}

function deleteProgram(programId) {
	//$('#confirmation').modal('show');
	$('#confirmation').modal({
	    backdrop: 'static',   // This disable for click outside event
	    keyboard: false        // This for keyboard event
	})
	$(".confirmId").val(programId);

}
function deleteConfirmation(verify) {

	if (verify == 'ok') {
		$('#confirmation').modal('hide');
		$(".loading").show();

		$.ajax({
			url : "delete-program",
			data : {
				programId : $(".confirmId").val()
			},
			type : 'GET',
			success : function(response) {
				$(".loading").hide();
				if (response == 'SUCCESS')
					$('.' + $(".confirmId").val()).remove();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("error:" + textStatus + " exception:" + errorThrown);
				$(".loading").hide();
			}
		});

	} else {

		$('#confirmation').modal('hide');

	}

}

function addProgram() {

	
	if (!(validatePrograms())) {
		return false;
	}
	
	var l_input_data = {};

	l_input_data.title = $(".pTitle").val();
	l_input_data.examDate = $(".pExamDate").val();
	l_input_data.registrationStartDate = $(".rStart").val();
	l_input_data.registrationEndDate = $(".rEndDate").val();
	l_input_data.photoOnHomePage = $(".photoOnHome").val();
	l_input_data.photoOnDetailPage = $(".photoOnDetail").val();
	l_input_data.registrationDetail = $(".rDetail").val();
	l_input_data.scholarshipDetail = $(".scholarDetail").val();
	l_input_data.fullAddress = $(".pAddress").val();
	l_input_data.status = $(".pStatus").val();
	l_input_data.terms = $(".pTerms").val();
	l_input_data.type = $(".types").val();
/*	if ($(".pProgramURL").val() == '')
		l_input_data.ProgramURL = 'none';
	else
		l_input_data.ProgramURL = $(".pProgramURL").val();*/
	if ($(".pAmount").val() == '' || $(".pAmount").val() == '0')
		l_input_data.amount = 'none';
	else
		l_input_data.amount = $(".pAmount").val();

	if (confirm("Want to Save This Program") == true) {
		$(".loading").show();
		$.ajax({
			type : 'POST',
			cache : false,
			async : true,
			contentType : "application/json; charset=UTF-8",
			url : "/smopl/admin/save-program",
			data : JSON.stringify(l_input_data),
			datatype : "json",
			success : function(response) {
				$(".loading").hide();
				if (response == 'SUCCESS') {
					$('#addPro').modal('hide');
					toastr.clear();
					toastr.error('Program Successfully Saved');
				}

			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("error:" + textStatus + " exception:" + errorThrown);
				$(".loading").hide();
			}
		});
	}

}

function getEditProgram(programId) {
	$(".loading").show();
	$.ajax({
		url : "get-edit-Program",
		contentType : "application/json",
		data : {
			programId : programId
		},
		type : 'GET',
		dataType : 'json',
		success : function(response) {
			
			$(".loading").hide();

			if (response.programId != "none") {
				$(".p_programId").val(response.programId);
				$(".p_Title").val(response.title);

				$(".r_Start").val(
						chageDateFormat(response.registrationStartDate));
				$(".r_EndDate").val(
						chageDateFormat(response.registrationEndDate));
				$(".p_ExamDate").val(chageDateFormat(response.examDate));
				$(".p_Address").val(response.fullAddress);

				$(".p_photoOnHome").val(response.photoOnHomePage);
				$(".p_photoOnDetail").val(response.photoOnDetailPage);
				$(".r_Detail").val(response.registrationDetail);

				$(".p_scholarDetail").val(response.scholarshipDetail);
				$(".p_amount").val(response.subscriptionId);
				$(".r_terms").val(response.termsAndCondition);
				
				$(".c_types").val(response.type);

				//$('#updatePro').modal('show');
				//jQuery('#updatePro').modal('show', {backdrop: 'static', keyboard: false});
				$('#updatePro').modal({
				    backdrop: 'static',   // This disable for click outside event
				    keyboard: false        // This for keyboard event
				})
				floats();
			}

		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("error:" + textStatus + " exception:" + errorThrown);
			$(".loading").hide();
		}
	});
}

function chageDateFormat(p_dateStr) {
	debugger;
	// alert(dateStr);
	var dateStr = new Date(p_dateStr);
	var year = dateStr.getFullYear();
	var month = dateStr.getMonth() + 1;
	var day = dateStr.getDate();

	var dateFormat = day + "/" + month + "/" + year;

	return dateFormat;
}
function editProgram() {

	

	if (!(validateProgramUpdate())) {
		return false;
	}
	
	
	var data = {

		"programId" : $(".p_programId").val(),
		"title" : $(".p_Title").val(),
		"registrationStartDate" : $(".r_Start").val(),
		"registrationEndDate" : $(".r_EndDate").val(),
		"fullAddress" : $(".p_Address").val(),
		"examDate" : $(".p_ExamDate").val(),
		"photoOnHomePage" : $(".p_photoOnHome").val(),
		"photoOnDetailPage" : $(".p_photoOnDetail").val(),
		"registrationDetail" : $(".r_Detail").val(),
		"scholarshipDetail" : $(".p_scholarDetail").val(),
		"amount" : $(".p_amount").val(),
		"terms" : $(".r_terms").val(),
		"type" : $(".c_types").val(),
	

	}
	if (confirm("Want to Update Program") == true) {
		$(".loading").show();
		$.ajax({
			type : 'POST',
			cache : false,
			async : true,
			contentType : "application/json; charset=UTF-8",
			url : "/smopl/admin/edit-program",
			data : JSON.stringify(data),
			datatype : "json",
			success : function(response) {
				$(".loading").hide();
				if (response == 'SUCCESS') {
					$('#updatePro').modal('hide');
					toastr.clear();
					toastr.error('Updated Successfully');
				}

			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("error:" + textStatus + " exception:" + errorThrown);
				$(".loading").hide();
			}
		});

	}
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

