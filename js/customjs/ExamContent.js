/*$('#formId').submit(function(evt) {

 evt.preventDefault();

 var formData = new FormData(this);

 $.ajax({
 type: 'POST',
 url: "/url",
 data:formData,
 cache:false,
 contentType: false,
 processData: false,
 success: function(data) {
 alert('success');
 },
 error: function(data) {
 alert('failed');
 }
 });
 });*//**
		 * 
		 */
var l_final_data = [];
var g_deleted_row = {};
var g_is_save = "false";

function saveAndContinue() {

	/*
	 * if($("#i_bank_name").val()==""){ toastr.error("Select Bank."); return
	 * false; }
	 */
	/* $(".c_exist_bank").val($("#i_bank_name").val()); */
	if (g_is_save == "true") {
		if (confirm("would you like to save changes.")) {
			saveQuestion()
			g_is_save = "false";
		}
	}

	$("#li1").removeClass('active');
	$("#tab1").removeClass('active');
	$("#li1").addClass('done');
	$("#li2").addClass('active');
	$("#tab2").addClass('active');

	loadExistExamDetail();

}

function loadQuestions(p_bank_id) {

	if (g_is_save == "true") {
		if (confirm("would you like to save changes.")) {
			saveQuestion()
			g_is_save = "false";
			getBankQuestions(p_bank_id);
		} else {
			getBankQuestions(p_bank_id);
		}
	} else {
		getBankQuestions(p_bank_id);
	}
}
function getBankQuestions(p_bank_id) {
	var l_data = {};
	l_data.bankId = $("#i_bank_name").val();
	$(".loading").show();
	$
			.ajax({
				url : '/corporate/load-bank-questions',
				data : JSON.stringify(l_data),
				cache : false,
				async : true,
				contentType : "application/json; charset=UTF-8",
				dataType : 'json',
				type : 'POST',
				success : function(p_data) {
					debugger;
					if (p_data.status == 'SUCCESS') {
						var l_parse_data = JSON.parse(p_data.object);
						l_final_data = l_parse_data.questionList;
						if (l_final_data.length == 0) {
							toastr.error("There is no questions in this bank.");
							$('#table_data').html("");
						}
						$('#table_data').html("");
						for (var i = 0; i < l_final_data.length; i++) {

							var l_map = l_final_data[i];
							++i;
							html = '<tr class="row_' + i + '">';
							var sno = 'row_' + i + '_sno';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" id="row_'
									+ i
									+ '_sno" type="text" readonly value="'
									+ i + '"/></td>';
							html += '<td class="illipsis" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_qtext\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_qtext\')" id="row_'
									+ i
									+ '_qtext" type="text" readonly value="'
									+ l_map.questionText + '"/></td>';

							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_questionType\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_questionType\')" id="row_'
									+ i
									+ '_questionType" type="text" readonly value="'
									+ l_map.questionTypeId + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_categoryId\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_categoryId\')" id="row_'
									+ i
									+ '_categoryId" type="text" readonly value="'
									+ l_map.categoryId + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_levelId\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_levelId\')" id="row_'
									+ i
									+ '_levelId" type="text" readonly value="'
									+ l_map.levelId + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_language\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_language\')" id="row_'
									+ i
									+ '_language" type="text" readonly value="'
									+ l_map.languageId + '"/></td>';

							if (l_map.isPublic == true)
								html += '<td width="6%" style="font-weight: 800;"><input checked class="row_'
										+ i
										+ '_isPublic" type="checkbox" checked /></td>';
							else
								html += '<td width="6%" style="font-weight: 800;"><input class="row_'
										+ i
										+ '_isPublic" type="checkbox" /></td>';

							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_activationDate\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_activationDate\')" id="row_'
									+ i
									+ '_activationDate" type="text" readonly value="'
									+ l_map.activationDate + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_expiryDate\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_expiryDate\')" id="row_'
									+ i
									+ '_expiryDate" type="text" readonly value="'
									+ l_map.expiryDate + '"/></td>';

							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_option1\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_option1\')" id="row_'
									+ i
									+ '_option1" type="text" readonly value="'
									+ l_map.option1 + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_option2\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_option2\')" id="row_'
									+ i
									+ '_option2" type="text" readonly value="'
									+ l_map.option2 + '"/></td>';
							if ("option3" in l_map) {
								html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
										+ i
										+ '_option3\')" onmouseout="readOnly(\'row_'
										+ i
										+ '_option3\')" id="row_'
										+ i
										+ '_option3" type="text" readonly value="'
										+ l_map.option3 + '"/></td>';
							} else {
								html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
										+ i
										+ '_option3\')" onmouseout="readOnly(\'row_'
										+ i
										+ '_option3\')" id="row_'
										+ i
										+ '_option3" type="text" readonly value=""/></td>';
							}
							if ("option4" in l_map) {
								html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
										+ i
										+ '_option4\')" onmouseout="readOnly(\'row_'
										+ i
										+ '_option4\')" id="row_'
										+ i
										+ '_option4" type="text" readonly value="'
										+ l_map.option4 + '"/></td>';
							} else {
								html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
										+ i
										+ '_option4\')" onmouseout="readOnly(\'row_'
										+ i
										+ '_option4\')" id="row_'
										+ i
										+ '_option4" type="text" readonly value=""/></td>';
							}
							if ("option5" in l_map) {
								html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
										+ i
										+ '_option5\')" onmouseout="readOnly(\'row_'
										+ i
										+ '_option5\')" id="row_'
										+ i
										+ '_option5" type="text" readonly value="'
										+ l_map.option5 + '"/></td>';
							} else {
								html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
										+ i
										+ '_option5\')" onmouseout="readOnly(\'row_'
										+ i
										+ '_option5\')" id="row_'
										+ i
										+ '_option5" type="text" readonly value=""/></td>';
							}
							if ("option6" in l_map) {
								html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
										+ i
										+ '_option6\')" onmouseout="readOnly(\'row_'
										+ i
										+ '_option6\')" id="row_'
										+ i
										+ '_option6" type="text" readonly value="'
										+ l_map.option6 + '"/></td>';
							} else {
								html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
										+ i
										+ '_option6\')" onmouseout="readOnly(\'row_'
										+ i
										+ '_option6\')" id="row_'
										+ i
										+ '_option6" type="text" readonly value=""/></td>';
							}
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_correctAnswer\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_correctAnswer\')" id="row_'
									+ i
									+ '_correctAnswer" type="text" readonly value="'
									+ l_map.correct + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_description\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_description\')" id="row_'
									+ i
									+ '_description" type="text" readonly value="'
									+ l_map.description + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_remarks\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_remarks\')" id="row_'
									+ i
									+ '_remarks" type="text" readonly value="'
									+ l_map.remarks + '"/></td>';
							if (l_map.isReviewed == true) {
								html += '<td width="6%" style="font-weight: 800;"><input  class="row_'
										+ i
										+ '_isReviewed" type="checkbox" checked readonly /></td>';
							} else {
								html += '<td width="6%" style="font-weight: 800;"><input  class="row_'
										+ i
										+ '_isReviewed" type="checkbox" readonly /></td>';
							}
							html += '<td width="6%" style="font-weight: 800;"><button onclick="return deleteRow(\''
									+ i
									+ '\')"  class=" btn btn-sm btn-danger" style="margin:0px 2px;"><span class="glyphicon glyphicon-trash"></span></button></td>';
							html += '</tr>';
							--i;
							$('#table_data').append(html);
						}

						$(".loading").hide();
						// toastr.success('Random ids generated
						// Successfully.');
					}
					if (p_data.status == 'ERROR') {
						$(".loading").hide();
						toastr.error(data.message);

					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$(".loading").hide();
					toastr.error('Not a valid input. Try again later!');
				}
			});
	// ajaxPostCall("/corporate/load-bank-questions",JSON.stringify(l_data),"p_success_questions","p_error_question");

}

function saveBank() {
	var l_bank_data = {};
	if ($("#i_modal_bank_name").val() == "") {
		toastr.error("Please Enter Bank Name.");
		return false;
	}

	l_bank_data.bankName = $("#i_modal_bank_name").val();

	if (!($("#i_bank_description").val() == ""))
		l_bank_data.description = $("#i_bank_description").val();
	if (!($("#i_bank_tags").val() == ""))
		l_bank_data.tags = $("#i_bank_tags").val();
	$(".loading").show();
	$.ajax({
		url : '/corporate/save-question-bank',
		data : JSON.stringify(l_bank_data),
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		type : 'POST',
		success : function(p_data) {
			alert(p_data.message);
			if (p_data.status == 'SUCCESS') {
				var html = '<option value="' + p_data.object + '">'
						+ $("#i_modal_bank_name").val() + '</option>';
				$("#i_bank_name").append(html);
				toastr.success(p_data.message);
				$("#addBank").modal('hide');
				$(".loading").hide();
			}
			if (p_data.status == 'ERROR') {
				$(".loading").hide();
				$("#i_error_bank").html(p_data.message);
				toastr.error(p_data.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			$("#i_error_bank").html('Not a valid input. Try again later!');
			toastr.error('Not a valid input. Try again later!');
		}
	});
}
// ajaxCall("save-question-bank",JSON.stringify(),"success_bank_save","error_bank_save");

var totalQuestions = 0;
var files = [];
$(document).on("change", "#chooseFile", function(event) {
	files = event.target.files;
	evt.preventDefault();
})

$(document).on("click", "#fileSubmit", function() {
	if ($("#i_bank_name").val() == "") {
		toastr.error("Select Bank.")
		return false;
	}
	processUpload();
})

function processUpload() {
	var MyForm = new FormData();
	MyForm.append("file", files[0]);
	$(".loading").show();
	$
			.ajax({
				dataType : 'json',
				url : "/corporate/uploadQuestions",
				data : MyForm,
				type : "POST",
				enctype : 'multipart/form-data',
				processData : false,
				contentType : false,
				success : function(data) {
					if (data.status == "SUCCESS") {
						var jsonData = data.object;
						var html = "";
						totalQuestions = jsonData.length;
						var i = $('#qeustionTable tr').length;
						for (var row = 0; row < jsonData.length; row++) {
							if (row == 0)
								continue;
							var l_map = jsonData[row];
							var sno = 'row_' + i + '_sno';
							var html = '<tr class="row_' + i + '">';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\''
									+ sno
									+ '\')" onmouseout="readOnly(\''
									+ sno
									+ '\')" id="row_'
									+ i
									+ '_sno" type="text" readonly value="'
									+ i
									+ '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_qtext\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_qtext\')" id="row_'
									+ i
									+ '_qtext" type="text" readonly value="'
									+ l_map.QuestionText + '"/></td>';

							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_questionType\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_questionType\')" id="row_'
									+ i
									+ '_questionType" type="text" readonly value="'
									+ l_map.QuestionType + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_categoryId\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_categoryId\')" id="row_'
									+ i
									+ '_categoryId" type="text" readonly value="'
									+ l_map.CategoryId + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_levelId\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_levelId\')" id="row_'
									+ i
									+ '_levelId" type="text" readonly value="'
									+ l_map.LevelId + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_language\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_language\')" id="row_'
									+ i
									+ '_language" type="text" readonly value="'
									+ l_map.Language + '"/></td>';
							/*
							 * html+='<td width="6%" style="font-weight: 800;"><input
							 * style="border:0;"
							 * onclick="readWrite(\'row_'+i+'_createdBy\')"
							 * onmouseout="readOnly(\'row_'+i+'_createdBy\')"
							 * id="row_'+i+'_createdBy" type="text" readonly
							 * value="'+l_map.CreatedBy+'"/></td>';
							 */
							if (l_map.IsPublic == 'true')
								html += '<td width="6%" style="font-weight: 800;"><input checked class="row_'
										+ i
										+ '_isPublic" type="checkbox" readonly /></td>';
							else
								html += '<td width="6%" style="font-weight: 800;"><input class="row_'
										+ i
										+ '_isPublic" type="checkbox" readonly /></td>';

							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_activationDate\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_activationDate\')" id="row_'
									+ i
									+ '_activationDate" type="text" readonly value="'
									+ l_map.ActivationDate + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_expiryDate\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_expiryDate\')" id="row_'
									+ i
									+ '_expiryDate" type="text" readonly value="'
									+ l_map.ExpiryDate + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_option1\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_option1\')" id="row_'
									+ i
									+ '_option1" type="text" readonly value="'
									+ l_map.Option1 + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_option2\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_option2\')" id="row_'
									+ i
									+ '_option2" type="text" readonly value="'
									+ l_map.Option2 + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_option3\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_option3\')" id="row_'
									+ i
									+ '_option3" type="text" readonly value="'
									+ l_map.Option3 + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_option4\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_option4\')" id="row_'
									+ i
									+ '_option4" type="text" readonly value="'
									+ l_map.Option4 + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_option5\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_option5\')" id="row_'
									+ i
									+ '_option5" type="text" readonly value="'
									+ l_map.Option5 + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_option6\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_option6\')" id="row_'
									+ i
									+ '_option6" type="text" readonly value="'
									+ l_map.Option6 + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_correctAnswer\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_correctAnswer\')" id="row_'
									+ i
									+ '_correctAnswer" type="text" readonly value="'
									+ l_map.CorrectAnswer + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_description\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_description\')" id="row_'
									+ i
									+ '_description" type="text" readonly value="'
									+ l_map.Description + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input style="border:0;" onclick="readWrite(\'row_'
									+ i
									+ '_remarks\')" onmouseout="readOnly(\'row_'
									+ i
									+ '_remarks\')" id="row_'
									+ i
									+ '_remarks" type="text" readonly value="'
									+ l_map.Remarks + '"/></td>';
							html += '<td width="6%" style="font-weight: 800;"><input  class="row_'
									+ i
									+ '_isReviewed" type="checkbox" readonly /></td>';
							html += '<td width="6%" style="font-weight: 800;"><button onclick="return deleteRow(\''
									+ i
									+ '\')"  class=" btn btn-sm btn-danger" style="margin:0px 2px;"><span class="glyphicon glyphicon-trash"></span></button></td>';
							html += '</tr>';
							$('#table_data').append(html);
							i++;
						}
						$(".loading").hide();
						g_is_save = "true";
					}
					if (data.status == "ERROR") {
						$(".loading").hide();
						toastr.error("not a valid input.try again.");

					}

				},
				error : function(error) {
					$(".loading").hide();
					toastr.error("not a valid input.try again.");
				}
			});
}

function readWrite(id) {
	debugger;
	document.getElementById(id).readOnly = false;
	g_is_save = 'true';
}
function readOnly(id) {
	document.getElementById(id).readOnly = true;
}

function addRow() {
	debugger;

	if ($("#i_bank_name").val() == "") {
		toastr.error("Select Bank First.")
		return false;
	}
	var rowCount =$('table#qeustionTable tr:last').index() + 1;// ($('#qeustionTable tr').length);
	var i = rowCount + 1;
	var html = '<tr class="row_' + i + '">';
	var sno = 'row_' + i + '_sno';
	html += '<td width="6%" style="font-weight: 800;"><input  id="row_' + i
			+ '_sno" type="text" readonly value="' + i + '"/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_qtext\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_qtext\')" id="row_'
			+ i
			+ '_qtext" type="text" readonly value=""/></td>';

	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_questionType\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_questionType\')" id="row_'
			+ i
			+ '_questionType" type="text" readonly value=""/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_categoryId\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_categoryId\')" id="row_'
			+ i
			+ '_categoryId" type="text" readonly value=""/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_levelId\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_levelId\')" id="row_'
			+ i
			+ '_levelId" type="text" readonly value=""/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_language\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_language\')" id="row_'
			+ i
			+ '_language" type="text" readonly value=""/></td>';
	/*
	 * html+='<td width="6%" style="font-weight: 800;"><input
	 * onclick="readWrite(\'row_'+i+'_createdBy\')"
	 * onmouseout="readOnly(\'row_'+i+'_createdBy\')" id="row_'+i+'_createdBy"
	 * type="text" readonly value=""/></td>';
	 */
	html += '<td width="6%" style="font-weight: 800;"><input checked class="row_'
			+ i + '_isPublic" type="checkbox" /></td>';

	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_activationDate\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_activationDate\')" id="row_'
			+ i
			+ '_activationDate" type="text" readonly value=""/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_expiryDate\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_expiryDate\')" id="row_'
			+ i
			+ '_expiryDate" type="text" readonly value=""/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_option1\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_option1\')" id="row_'
			+ i
			+ '_option1" type="text" readonly value=""/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_option2\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_option2\')" id="row_'
			+ i
			+ '_option2" type="text" readonly value=""/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_option3\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_option3\')" id="row_'
			+ i
			+ '_option3" type="text" readonly value=""/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_option4\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_option4\')" id="row_'
			+ i
			+ '_option4" type="text" readonly value=""/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_option5\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_option5\')" id="row_'
			+ i
			+ '_option5" type="text" readonly value=""/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_option6\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_option6\')" id="row_'
			+ i
			+ '_option6" type="text" readonly value=""/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_correctAnswer\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_correctAnswer\')" id="row_'
			+ i
			+ '_correctAnswer" type="text" readonly value=""/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_description\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_description\')" id="row_'
			+ i
			+ '_description" type="text" readonly value=""/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input onclick="readWrite(\'row_'
			+ i
			+ '_remarks\')" onmouseout="readOnly(\'row_'
			+ i
			+ '_remarks\')" id="row_'
			+ i
			+ '_remarks" type="text" readonly value=""/></td>';
	html += '<td width="6%" style="font-weight: 800;"><input class="row_' + i
			+ '_isReviewed" type="checkbox" /></td>';
	html += '<td width="6%" style="font-weight: 800;"><button onclick="return deleteRow(\''
			+ i
			+ '\')"  class=" btn btn-sm btn-danger" style="margin:0px 2px;"><span class="glyphicon glyphicon-trash"></span></button></td>';
	html += '</tr>';
	$('#table_data').append(html);
	return false;
}

function saveQuestion() {
	debugger;
	var l_map = {};
	var l_bank_map = {};
	var rowCount = $('#qeustionTable tr').length;
	var l_list = new Array();
	l_bank_map.bankId = $("#i_bank_name").val();
	l_list.push(l_bank_map);
	$(".loading").show();
	for (var i = 1; i < rowCount; i++) {

		if ("row_" + i in g_deleted_row) {
			continue;
		}
		// l_map.sno=$('#row_'+i+'_sno').val();
		if ($('#row_' + i + '_qtext').val() == "") {
			toastr.error('Question text is blank at ' + i + 'th record.');
			return false;
		}
		l_map.questionText = $('#row_' + i + '_qtext').val();
		// l_map.qBankName=$('#row_'+i+'_qBankName').val();
		if ($('#row_' + i + '_questionType').val() == "") {
			toastr.error('Question type is blank at ' + i + 'th record.');
			return false;
		}
		l_map.questionTypeId = $('#row_' + i + '_questionType').val();
		if ($('#row_' + i + '_categoryId').val() == "") {
			toastr.error('Category Id is blank at ' + i + 'th record.');
			return false;
		}
		l_map.categoryId = $('#row_' + i + '_categoryId').val();
		if ($('#row_' + i + '_levelId').val() == "") {
			toastr.error('Level Id is blank at ' + i + 'th record.');
			return false;
		}
		l_map.levelId = $('#row_' + i + '_levelId').val();
		if ($('#row_' + i + '_language').val() == "") {
			toastr.error('Language is blank at ' + i + 'th record.');
			return false;
		}
		l_map.languageId = $('#row_' + i + '_language').val();
		l_map.isGroupQuestion = false;
		l_map.passageId = "null";
		/*
		 * if($('#row_'+i+'_createdBy').val() == ""){ toastr.error('CreatedBy is
		 * blank at '+i+'th record.'); return false; }
		 * l_map.createdBy=$('#row_'+i+'_createdBy').val();
		 */
		if ($('.row_' + i + '_isPublic').is(":checked")) {
			l_map.isPublic = true;
		} else {
			l_map.isPublic = false;
		}
		// l_map.sno=$('#row_'+i+'_isPublic').val();
		/*
		 * if($('#row_'+i+'_owner').val() == ""){ toastr.error('Owner is blank
		 * at '+i+'th record.'); return false; }
		 */
		/*
		 * l_map.owner=$('#row_'+i+'_owner').val();
		 * if($('#row_'+i+'_activationDate').val()==""){
		 * toastr.error('ActivationDate is blank at '+i+'th record. format like
		 * 01.01.2018'); return false; }
		 */
		var date_activation = new Date($('#row_' + i + '_activationDate').val());
		var l_date_activation = date_activation.getDate() + '.'
				+ (date_activation.getMonth() + 1) + '.'
				+ date_activation.getFullYear();
		l_map.activationDate = l_date_activation;
		if ($('#row_' + i + '_expiryDate').val() == "") {
			toastr.error('Expiry Date is blank at ' + i + 'th record.');
			return false;
		}

		var date_expiry = new Date($('#row_' + i + '_expiryDate').val());
		var l_date_expiry = date_expiry.getDate() + '.'
				+ (date_expiry.getMonth() + 1) + '.'
				+ date_expiry.getFullYear();
		l_map.expiryDate = l_date_expiry;
		var l_options = [];
		if ($('#row_' + i + '_option1').val() == "") {
			toastr.error('Option1 is blank at ' + i + 'th record.');
			return false;
		}
		l_options.push($('#row_' + i + '_option1').val());
		if ($('#row_' + i + '_option2').val() == "") {
			toastr.error('Option2 is blank at ' + i + 'th record.');
			return false;
		}
		l_options.push($('#row_' + i + '_option2').val());
		if ($('#row_' + i + '_option3').val() != "") {
			l_options.push($('#row_' + i + '_option3').val());
		}
		if ($('#row_' + i + '_option4').val() != "") {
			l_options.push($('#row_' + i + '_option4').val());
		}
		if ($('#row_' + i + '_option5').val() != "") {
			l_options.push($('#row_' + i + '_option5').val());
		}
		if ($('#row_' + i + '_option6').val() != "") {
			l_options.push($('#row_' + i + '_option6').val());
		}

		l_map.answerOption = l_options;
		if ($('#row_' + i + '_correctAnswer').val() == "") {
			toastr.error('CorrectAnswer is blank at ' + i + 'th record.');
			return false;
		}
		if (parseInt($('#row_' + i + '_correctAnswer').val()) > 6) {
			toastr.error('CorrectAnswer is wrong at ' + i + 'th record.');
			return false;
		}
		var l_answers = [];
		if ($('#row_' + i + '_correctAnswer').val() == ("1".trim())) {
			l_answers.push(true);
			l_answers.push(false);
			if ($('#row_' + i + '_option3').val() != "") {
				l_answers.push(false);
			}
			if ($('#row_' + i + '_option4').val() != "") {
				l_answers.push(false);
			}
			if ($('#row_' + i + '_option5').val() != "") {
				l_answers.push(false);
			}
			if ($('#row_' + i + '_option6').val() != "") {
				l_answers.push(false);
			}
		}

		if ($('#row_' + i + '_correctAnswer').val() == ("2".trim())) {
			l_answers.push(false);
			l_answers.push(true);
			if ($('#row_' + i + '_option3').val() != "") {
				l_answers.push(false);
			}
			if ($('#row_' + i + '_option4').val() != "") {
				l_answers.push(false);
			}
			if ($('#row_' + i + '_option5').val() != "") {
				l_answers.push(false);
			}
			if ($('#row_' + i + '_option6').val() != "") {
				l_answers.push(false);
			}
		}

		if ($('#row_' + i + '_correctAnswer').val() == ("3".trim())) {
			l_answers.push(false);
			l_answers.push(false);
			if ($('#row_' + i + '_option3').val() == "") {
				toastr.error('Enter option3 at ' + i + 'th record for Answer '
						+ ith + '.');
				return false;
			}
			l_answers.push(true);
			if ($('#row_' + i + '_option4').val() != "") {
				l_answers.push(false);
			}
			if ($('#row_' + i + '_option5').val() != "") {
				l_answers.push(false);
			}
			if ($('#row_' + i + '_option6').val() != "") {
				l_answers.push(false);
			}
		}

		if ($('#row_' + i + '_correctAnswer').val() == ("4".trim())) {
			l_answers.push(false);
			l_answers.push(false);
			l_answers.push(false);
			if ($('#row_' + i + '_option4').val() == "") {
				toastr.error('Enter option4 at ' + i + 'th record for Answer '
						+ ith + '.');
				return false;
			}
			l_answers.push(true);
			if ($('#row_' + i + '_option5').val() != "") {
				l_answers.push(false);
			}
			if ($('#row_' + i + '_option6').val() != "") {
				l_answers.push(false);
			}
		}

		if ($('#row_' + i + '_correctAnswer').val() == ("5".trim())) {
			l_answers.push(false);
			l_answers.push(false);
			l_answers.push(false);
			l_answers.push(false);
			if ($('#row_' + i + '_option5').val() == "") {
				toastr.error('Enter option5 at ' + i + 'th record for Answer '
						+ ith + '.');
				return false;
			}
			l_answers.push(true);
			if ($('#row_' + i + '_option6').val() != "") {
				l_answers.push(false);
			}
		}
		if ($('#row_' + i + '_correctAnswer').val() == ("6".trim())) {
			l_answers.push(false);
			l_answers.push(false);
			l_answers.push(false);
			l_answers.push(false);
			l_answers.push(false);
			if ($('#row_' + i + '_option6').val() == "") {
				toastr.error('Enter option6 at ' + i + 'th record for Answer '
						+ ith + '.');
				return false;
			}
			l_answers.push(true);
		}

		// l_map.correctAnswers=$('#row_'+i+'_correctAnswer').val();
		l_map.correctAnswers = l_answers;
		l_map.description = $('#row_' + i + '_description').val();
		l_map.remarks = $('#row_' + i + '_remarks').val();
		if ($('.row_' + i + '_isReviewed').is(":checked")) {
			l_map.isReviewed = true;
		} else {
			l_map.isReviewed = false;
		}
		l_list.push(l_map);
	}
	$(".loading").show();

	$.ajax({
		url : '/corporate/save-exam-question',
		data : JSON.stringify(l_list),
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		type : 'POST',
		success : function(data) {
			debugger;
			if (data.status = 'SUCCESS') {
				$(".loading").hide();
				toastr.success(data.message);
				return true;
			}
			if (data.status = 'ERROR') {
				$(".loading").hide();
				toastr.error(data.message);
				return false;
			}

			if (data.status = 'SESSION') {
				$(".loading").hide();
				toastr.success(data.message);
				location.reload()
				return true;
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			toastr.error('not a valid input. Try again later!');
			return false;
		}
	});
	return true;

}

function deleteRow(count) {
	debugger;

	if (confirm("Are you sure to delete this question.")) {
		$('.row_' + count).hide();
		g_deleted_row["row_" + count] = 'true';
		g_is_save = "true";

	}
	return false;
}

var g_sections = {};
function loadExistExamDetail() {
	var l_map = {};
	l_map.examId = $(".c_exam_id").val();
	$(".loading").show();
	$.ajax({
		url : '/corporate/load-exist-exam-detail',
		data : JSON.stringify(l_map),
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		type : 'POST',
		success : function(p_data) {
			$(".loading").hide();
			if (p_data.status == 'SUCCESS') {
				var l_data = p_data.object;
				// exist exam detail if need using other object
				var l_exist_exam_detail = p_data.otherObject;

				var l_sectionList = l_data.sectionList;
				var l_languageList = l_data.languageList;
				for (var i = 0; i < l_sectionList.length; i++) {
					var l_map = l_sectionList[i];
					g_sections[l_map.sectionId] = l_map.sectionName;
					var l_html = "<option value='" + l_map.sectionId + "'>"
							+ l_map.sectionName + "</option>";
					$(".c_exist_sections").append(l_html);

				}
				for (var i = 0; i < l_languageList.length; i++) {
					var l_language_map = l_languageList[i];
					var l_html = "<option value='" + l_language_map.languageId
							+ "'>" + l_language_map.languageText + "</option>";
					$(".c_instruction_language_list").append(l_html);
				}

				$(".loading").hide();
			}
			if (p_data.status == 'ERROR') {
				$(".loading").hide();
				toastr.error(p_data.message);
			}
			if (p_data.status == 'SESSION') {
				location.reload();
				$(".loading").hide();
				toastr.error(p_data.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			toastr.error('Not a valid input. Try again later!');
		}
	});

}

function addNewSection() {
	var l_input = {};
	$('#i_error_section').html("");
	if ($('.c_new_section_name').val() == "") {
		$('#i_error_section').html("Enter section name.");
		return false;
	}
	l_input.sectionName = $('.c_new_section_name').val();
	if (!($('.c_section_description').val() == "")) {
		l_input.description = $('.c_section_description').val();
	}
	$(".loading").show();
	$.ajax({
		url : '/corporate/add-new-section',
		data : JSON.stringify(l_input),
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		type : 'POST',
		success : function(p_data) {
			//alert(JSON.stringify(p_data.message));
			if (p_data.status == 'SUCCESS') {
				var l_sectionId = p_data.object;
				var l_html = "<option value='" + l_sectionId + "' selected >"
						+ l_input.sectionName + "</option>";

				$(".c_exist_sections").append(l_html);
				$(".c_exist_section_passing_rule").append(l_html);
				$(".loading").hide();
				$('#addnewSection').modal('hide');
				toastr.success(p_data.message);
			}
			if (p_data.status == 'ERROR') {
				$(".loading").hide();
				$("#i_error_section").html(p_data.message);
			}
			if (p_data.status == 'SESSION') {
				location.reload();
				$(".loading").hide();
				toastr.error(p_data.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			toastr.error('Not a valid input. Try again later!');
		}
	});

}

var g_exam_detail_map = {};
var g_section_list = [];
var g_section_map = {};
var l_passing_rule_list = [];
var l_passing_rule_map = {};
var l_instruction = {};
var l_final_map = {};
function saveExamDetail() {
	debugger;
	// loadExamPublishDetail($(".c_exam_id").val());
	$(".c_nbrSection").val(g_section_list.length);
	
	// check validate exam detail
	if(validateExam("i_exam_detail")){
	g_exam_detail_map = readForm("i_exam_detail");
	if (g_section_list.length == 0) {
		toastr.error("Please add at least one section.");
		return false;
	}
	if (l_passing_rule_list.length == 0) {
		toastr.error("Please add passing rule.");
		return false;
	}
	if (g_instruction_type == "") {
		toastr.error("Please add instruction any one. Exist or New.");
		return false;
	}
	if ($(".c_instruction_language_list").val() == "") {
		toastr.error("Please add instruction language.");
		return false;
	}
	if ($(".c_instruction_text").val() == "") {
		toastr.error("Please add instruction text.");
		return false;
	}

	if (g_instruction_type == "NEW") {
		l_instruction.type = "NEW";
		l_instruction.instructionText = $(".c_instruction_text").val();
		l_instruction.language = $(".c_instruction_language_list").val();
	}
	if (g_instruction_type == "EXIST") {
		l_instruction.type = "EXIST";
		l_instruction.instructionId = $(".c_instruction_id").val();
		l_instruction.instructionText = $(".c_instruction_text").val();
		l_instruction.language = $(".c_instruction_language_list").val();
	}
	l_final_map.examDetail = g_exam_detail_map;
	l_final_map.sections = g_section_list;
	l_final_map.passingRules = l_passing_rule_list;
	l_final_map.instructions = l_instruction;
	l_final_map.bankId = $("#i_bank_name").val();
	l_final_map.ownerLogoURL = $(".c_logo_url").val();
	// alert(JSON.stringify(l_final_map));
	if (confirm("would you like to save any changes of exam.")) {
		$.ajax({
			url : '/corporate/save-exams-detail',
			data : JSON.stringify(l_final_map),
			cache : false,
			async : true,
			contentType : "application/json; charset=UTF-8",
			dataType : 'json',
			type : 'POST',
			success : function(data) {
				debugger;
				if (data.status == 'SUCCESS') {
					$(".loading").hide();
					var l_exam_id = data.object;
					toastr.success("Exam saved successfully.");
					if (confirm("would you like to go next step.")) {
						loadExamPublishDetail($(".c_exam_id").val());

					}
				}
				if (data.status == 'ERROR') {
					$(".loading").hide();
					toastr.error(data.message);

				}
				if (data.status == 'SESSION') {
					$(".loading").hide();
					toastr.error(data.message);
					location.reload()

				}

			},
			error : function(jqXHR, textStatus, errorThrown) {
				$(".loading").hide();
				toastr.error('not a valid input. Try again later!');

			}
		});
	} else {
		loadExamPublishDetail($(".c_exam_id").val());
	}
}
	   return false;
}

function addSection() {
	// g_sections
	var l_html = "";
	if(validateSection("i_section_detail")){
	g_section_map = readForm("i_section_detail");
	g_section_map.bankId = $(".c_exist_bank").val();

	l_html = "<tr>";
	l_html += "<td>" + g_sections[g_section_map.sectionId]+ "</td>";
	l_html += "<td>" + g_section_map.nbrQuestions + "</td>";
	l_html += "<td>" + g_section_map.maxQuestions + "</td>";
	l_html += "<td>" + g_section_map.marksPerQuestion + "</td>";

	l_html += "<td>" + g_section_map.minMarksToPassSection + "</td>";
	l_html += "<td>" + g_section_map.position + "</td>";
	l_html += "<td>" + g_section_map.questionRandomSelect + "</td>";
	l_html += "</tr>";
	$("#i_sections_table").append(l_html);
	var l_passing_section_html = "<option value='" + g_section_map.sectionId
			+ "'>" + g_sections[g_section_map.sectionId] + "</option>";
	$(".c_exist_section_passing_rule").append(l_passing_section_html);
	g_section_list.push(g_section_map);

	$('#addSection').modal('hide');
	$('#i_section_detail').trigger("reset");
	}
	return false;
}
function addExamPassingRule() {

	var l_html = "";
	if(validatePassingRule("i_exam_rule_form")){
	l_passing_rule_map = readForm("i_exam_rule_form");

	l_html = "<tr>";
	l_html += "<td>" + l_passing_rule_map.maxMarks + "</td>";
	l_html += "<td>" + l_passing_rule_map.minMarksToPass + "</td>";
	l_html += "<td>" + l_passing_rule_map.sectionWisePassingApplicable
			+ "</td>";

	l_html += "<td>" + l_passing_rule_map.applyNegativeMarking + "</td>";
	l_html += "<td>" + l_passing_rule_map.negativeMarkPerQuestion + "</td>";
	l_html += "<td>" + g_sections[l_passing_rule_map.sectionId] + "</td>";
	l_html += "</tr>";
	$("#i_exam_passing_table").append(l_html);
	l_passing_rule_list.push(l_passing_rule_map);
	$('#addRules').modal('hide');
	$('#i_exam_rule_form').trigger("reset");
	}
	return false;
}
var g_instruction_type = "";
$(document).ready(function() {
	$(".c_exam_tag").hide();
	$(".c_instruction_tag").hide();
});
function loadExams() {

	$(".loading").show();
	$
			.ajax({
				url : '/corporate/load-exams',
				cache : false,
				async : true,
				contentType : "application/json; charset=UTF-8",
				dataType : 'json',
				type : 'POST',
				success : function(data) {
					debugger;

					if (data.status = 'SUCCESS') {
						var l_exam_list = data.object;
						if (l_exam_list.length == 0) {
							$(".c_exam_tag").hide();
							toastr
									.success("You don't have any exam. click on create new.");
						} else {
							$(".c_exam_tag").show();
							for (var i = 0; i < l_exam_list.length; i++) {
								var l_map = l_exam_list[i];
								var l_html = "";
								l_html = "<option value='" + l_map.examId
										+ "'>" + l_map.examName + "</option>";
								$(".c_user_exam_list").append(l_html);
							}
						}

						$(".loading").hide();

						return true;
					}
					if (data.status = 'ERROR') {
						$(".loading").hide();
						toastr.error(data.message);
						return false;
					}
					if (data.status = 'SESSION') {
						$(".loading").hide();
						toastr.success(data.message);
						location.reload()
						return true;
					}

				},
				error : function(jqXHR, textStatus, errorThrown) {
					$(".loading").hide();
					toastr.error('not a valid input. Try again later!');
					return false;
				}
			});

}

function loadExistExamInstruction() {
	var l_map = {};
	if ($(".c_user_exam_list").val() == "") {
		toastr.error("Select Exam .");
		return false;
	}
	l_map.examId = $(".c_user_exam_list").val();
	$(".loading").show();
	$
			.ajax({
				url : '/corporate/load-instruction',
				data : JSON.stringify(l_map),
				cache : false,
				async : true,
				contentType : "application/json; charset=UTF-8",
				dataType : 'json',
				type : 'POST',
				success : function(data) {
					debugger;
					// alert(JSON.stringify(data));
					if (data.status == 'SUCCESS') {
						var l_instruction = data.object;
						if (l_instruction.length == 0) {
							toaster.error("This exam don't have instruction.");
						} else {
							// mark as a exist exam instruction selection
							g_instruction_type = "EXIST";
							var l_instruction_map = l_instruction[0];
							$(".c_instruction_id").val(
									l_instruction_map.instructionId);
							$(".c_instruction_tag").show();
							$('.c_instruction_text').prop('readonly', true);
							$('.c_instruction_text').val(
									l_instruction_map.instructionText);
							toastr.success(data.message);
						}
						$(".loading").hide();

					}
					if (data.status == 'ERROR') {
						$(".loading").hide();
						toastr.error(data.message);

					}
					if (data.status == 'SESSION') {
						$(".loading").hide();
						toastr.success(data.message);
						location.reload()

					}

				},
				error : function(jqXHR, textStatus, errorThrown) {
					$(".loading").hide();
					toastr.error('not a valid input. Try again later!');
				}
			});
}
function addNewInstructions() {
	g_instruction_type = "NEW";
	$(".c_exam_tag").hide();
	$(".c_instruction_tag").show();
	$('.c_instruction_text').prop('readonly', false);
	$('.c_instruction_text').val("");

}

function loadExamPublishDetail(p_exam_id) {
	debugger;

	var l_map = {};
	l_map.examId = p_exam_id;
	$(".loading").show();
	toastr.success("wait! we are loading your exam detail.");
	$.ajax({
				url : '/corporate/load-publish-detail',
				data : JSON.stringify(l_map),
				cache : false,
				async : true,
				contentType : "application/json; charset=UTF-8",
				dataType : 'json',
				type : 'POST',
				success : function(data) {
					debugger;

					if (data.status == 'SUCCESS') {

						$("#li2").removeClass('active');
						$("#tab2").removeClass('active');
						$("#li3").addClass('done');
						$("#li3").addClass('active');
						$("#tab3").addClass('active');

						var l_publish_data = data.object;
						var l_exam_data_list = l_publish_data.examDetail;
						// alert(JSON.stringify(l_exam_data_list));
						if (l_exam_data_list.length > 0) {
							var l_examDetailMap = l_exam_data_list[0];
							$('.c_publish_exam_name').html(
									l_examDetailMap.examName);

							$('.c_publish_exam_type').html(
									l_examDetailMap.examType);
							$('.c_publish_exam_url').html(
									l_examDetailMap.examURL);
							$('.c_publish_exam_marking_type').html(
									l_examDetailMap.markingType);
							$('.c_publish_exam_startDate').html(
									l_examDetailMap.examStartDate);
							$('.c_publish_exam_EndDate').html(
									l_examDetailMap.examEndDate);
							$('.c_publish_exam_publishDate').html(
									l_examDetailMap.examPublishDate);
							$('.c_publish_exam_createDate').html(
									l_examDetailMap.examCreationDate);
							$('.c_publish_delete_date').html(
									l_examDetailMap.examDeletionDate);
							$('.c_publish_exam_createdBy').html(
									l_examDetailMap.examDeletedBy);
							$('.c_publish_exam_max_marks').html(
									l_examDetailMap.maxMarks);
							$('.c_publish_exam_specialCriteria').html(
									l_examDetailMap.specialCriteria);
							$('.c_publish_noOfSection').html(
									l_examDetailMap.nbrSection);
							$('.c_publish_section_type').html(
									l_examDetailMap.sectionType);
							$('.c_publish_currentStatus').html(
									l_examDetailMap.currentStatus);
							$('.c_publish_exam_duration').html(
									l_examDetailMap.examDuration);
							$('.c_publish_savePointLimit').html(
									l_examDetailMap.savePointLimit);
							$('.c_publish_exam_description').html(
									l_examDetailMap.description);
							$('.c_publish_exam_remark').html(
									l_examDetailMap.remarks);
							if (l_examDetailMap.isPublished == true) {
								$('.c_publish_exam_isPublished').trigger('');

							} else {
								$('.c_publish_exam_isPublished').trigger(
										'click');
							}
							if (l_examDetailMap.needRegistration == true) {
								$('.c_publish_exam_needRegistration').trigger(
										'');
							} else {
								$('.c_publish_exam_needRegistration').trigger(
										'click');
							}

							if (l_examDetailMap.anyTimeFinish == true) {
								$('.c_publish_exam_anyTimeFinish').trigger('');
							} else {
								$('.c_publish_exam_anyTimeFinish').trigger(
										'click');
							}
							if (l_examDetailMap.displayTimer == true) {
								$('.c_publish_exam_display_timer').trigger('');
							} else {
								$('.c_publish_exam_display_timer').trigger(
										'click');
							}

							if (l_examDetailMap.examReview == true) {
								$('.c_publish_exam_review').trigger('');
							} else {
								$('.c_publish_exam_review').trigger('click');
							}
							if (l_examDetailMap.isPublished == true) {
								$('.c_publish_exam_isPublic').trigger('');
							} else {
								$('.c_publish_exam_isPublic').trigger('click');
							}
							if (l_examDetailMap.progressiveDifficulty == true) {
								$('.c_publish_exam_progressiveDifficulty')
										.trigger('');
							} else {
								$('.c_publish_exam_progressiveDifficulty')
										.trigger('click');
							}
							if (l_examDetailMap.allowProctor == true) {
								$('.c_publish_exam_allowProctor').trigger('');
							} else {
								$('.c_publish_exam_allowProctor').trigger(
										'click');
							}
							if (l_examDetailMap.allowResultToUser == true) {
								$('.c_publish_exam_allowResultToUser').trigger(
										'');
							} else {
								$('.c_publish_exam_allowResultToUser').trigger(
										'click');
							}

						}
						var l_section_list = l_publish_data.sectionsDetail;
						if (l_section_list.length > 0) {
							for (var i = 0; i < l_section_list.length; i++) {
								var b_section_detail = l_section_list[i];
								var b_section = b_section_detail.section;
								var b_passing_rule = b_section_detail.passingRule;
								//alert(JSON.stringify(b_passing_rule));
								var b_question_list = b_section_detail.questions;

								// html start
								var html = '';
								html += '<div class="col-md-12"><div class="panel-group" id="accordion6"><div class="card panel">';
								html += '<div class="card-body collapsed cardbody-accordian" data-toggle="collapse" data-parent="#accordion6" data-target="#accordion6-2">';
								html += '<div class="row header-style-accordian">';
								html += '<div class="col-md-6" style="padding: 6px 10px;">'
								html += '<h4 style="margin-bottom:10;">Section Name:<span style="margin-left: 5px;font-weight: 400;font-size: 13px;" class="c_publish_sectionName">'
										+ b_section.sectionId + '</span></h4>';
								html += '</div><div class="col-md-4"> </div>';
								html += '<div class="col-md-2">';
								html += '<div class="tools tools-style-2"> <a class="btn btn-icon-toggle"><i class="fa fa-angle-down"></i></a></div></div></div></div>';
								html += '<div id="accordion6-2" class="collapse">';
								html += '<div class="card-body" style="padding-bottom:5px;">';
								html += ' <div class="row">';
								html += '<div class="col-lg-12">';
								html += ' <div class="card">';
								html += '<div class="card-head" style="border-bottom: 2px solid #8080802b;">';
								html += '<header style="font-size: 15px;font-weight:500;">Section Details</header>';
								html += '</div>';
								html += '<div class="card-body">';
								html += '<div class="row">';
								html += ' <!-- First row-->';
								html += '<div class="col-lg-12">';
								html += '<div class="row">';

								html += '<div class="col-md-4">';
								html += '<div class="row">';
								html += '<div class="col-md-6">';
								html += '<span class="q-heading">Bank</span>';
								html += '</div>';
								html += '<div class="col-md-6">';
								html += '<span class="q-text c_section_bank">'
										+ b_section.bankId
										+ '</span></div></div></div>';

								html += '<div class="col-md-4">';
								html += '<div class="row">';
								html += '<div class="col-md-6">';
								html += '<span class="q-heading">Nomber Of Questions</span>';
								html += '</div>';
								html += '<div class="col-md-6">';
								html += '<span class="q-text c_section_nbrQuestion">'
										+ b_section.nbrQuestions
										+ '</span></div></div></div></div></div>';
								html += '<!-- 2nd row-->';
								html += '<div class="col-lg-12" style="margin-top:10px;">';
								html += '<div class="row">';
								html += '<div class="col-md-4">';
								html += '<div class="row">';
								html += '<div class="col-md-6">';
								html += '<span class="q-heading">Max Questions</span>';
								html += '</div>';
								html += '<div class="col-md-6">';
								html += '<span class="q-text c_section_maxQuestion">'
										+ b_section.maxQuestions + '</span>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '<div class="col-md-4">';
								html += '<div class="row">';
								html += '<div class="col-md-6">';
								html += '<span class="q-heading">Marks Per Question</span>';
								html += '</div>';
								html += '<div class="col-md-6">';
								html += '<span class="q-text c_section_marksPerQuestion">'
										+ b_section.marksPerQuestion
										+ '</span>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '<div class="col-md-4">';
								html += '<div class="row">';
								html += '<div class="col-md-6">';
								html += '<span class="q-heading">Question Random Select</span>';
								html += '</div>';
								html += '<div class="col-md-6">';
								html += '<span class="q-text c_section_questionRandomSelect">'
										+ b_section.questionRandomSelect
										+ '</span>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '<!-- 3th row-->';
								html += '<div class="col-lg-12" style="margin-top:10px;">';
								html += '<div class="row">';
								html += '<div class="col-md-4">';
								html += '<div class="row">';
								html += '<div class="col-md-6">';
								html += '<span class="q-heading">Min Marks To Pass Section</span>';
								html += '</div>';
								html += '<div class="col-md-6">';
								html += '<span class="q-text c_section_minMarksToPassSection">'
										+ b_section.minMarksToPassSection
										+ '</span>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '<div class="col-md-4">';
								html += '<div class="row">';
								html += '<div class="col-md-6">';
								html += '<span class="q-heading">Position</span>';
								html += '</div>';
								html += '<div class="col-md-6">';
								html += '<span class="q-text c_section_position">'
										+ b_section.position + '</span>';
								html += '</div>';
								html += '</div>';
								html += '</div>';

								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += ' </div>';
								html += '</div>';
								// sart question detail and passing rule
								html += '<div class="col-lg-12">';
								html += '<div class="card">';
								html += '<div class="card-head">';
								html += '<ul class="nav nav-tabs">';
								html += '<li class="active"><a href="#first1" data-toggle="tab">Question Details</a></li>';
								html += '<li><a href="#second1" data-toggle="tab">Passing Rules</a></li>';
								html += '</ul>';
								html += '</div>';
								html += '<div class="card-body tab-content">';
								html += '<div class="tab-pane active" id="first1">';
								html += '<div class="row"> ';
								html += '<div class="col-lg-12" style="margin-top:10px;">';
								html += '<div class="card">';
								html += '<div class="card-body no-padding">';
								html += '<div class="table-responsive no-margin" style="height: 183px;">';
								// table for questions list
								html += '<table class="table table-striped no-margin" style="width:200%;max-width:200%;">';
								html += '<thead>';
								html += '<tr>';
								html += '<th>#</th>';
								html += '<th style="width:15%;">Question Text</th>';
								html += '<th style="font-weight: 800;">Question Type</th>';
								html += '<th style="font-weight: 800;">Category Id</th>';
								html += '<th style="font-weight: 800;">Level Id</th>';
								html += '<th style="font-weight: 800;">Language</th>';
								html += '<th style="font-weight: 800;">Is Public</th>';
								html += '<th style="font-weight: 800;">Description</th>';
								html += '<th style="font-weight: 800;">Remarks</th>';
								html += '<th style="font-weight: 800;">Is Reviewed</th>';
								html += '<th style="font-weight: 800;">Current Status</th>';
								html += '<th style="font-weight: 800;">Created Date</th>';
								html += '<th style="font-weight: 800;">Created By</th>';
								html += '<th style="font-weight: 800;">Modified Date</th>';
								html += '</tr>';
								html += ' </thead>';
								html += '<tbody>';
								for (var j = 0; j < b_question_list.length; j++) {
									var b_question = b_question_list[j];
									html += '<tr>';
									html += '<td>' + j + '</td>';
									html += '<td class="illipsis">'
											+ b_question.questionText + '</td>';
									html += '<td>' + b_question.questionTypeId
											+ '</td>';
									html += '<td>' + b_question.categoryId
											+ '</td>';
									html += '<td>' + b_question.levelId
											+ '</td>';
									html += '<td>' + b_question.languageId
											+ '</td>';
									html += '<td>' + b_question.isPublic
											+ '</td>';
									html += '<td>' + b_question.description
											+ '</td>';
									html += '<td>' + b_question.remarks
											+ '</td>';
									html += '<td>' + b_question.isReviewed
											+ '</td>';
									html += '<td>' + b_question.currentStatus
											+ '</td>';
									html += '<td>' + b_question.createdDate
											+ '</td>';
									html += '<td>' + b_question.createdBy
											+ '</td>';
									html += '<td>' + b_question.modifiedDate
											+ '</td>';
									html += ' </tr>';
								}

								html += '</tbody></table></div>';
								html += '<!--end .table-responsive -->';
								html += ' </div>  <!--end .card-body -->';
								html += '</div> </div> </div></div>'

								// <!-- passing rule start -->
								html += ' <div class="tab-pane" id="second1">';
								html += ' <div class="row">';
								html += '<div class="col-lg-12" style="margin-top:10px;">';
								html += '<div class="row">';
								html += ' <div class="col-md-4">';
								html += '<div class="row">';
								html += '<div class="col-md-8">';
								html += '<span class="q-heading">Max Marks</span>';
								html += '</div>';
								html += '<div class="col-md-4">';
								html += '<span class="q-text c_publish_passingRule_maxMarks">'
										+ b_passing_rule.maxMarks + '</span>';
								html += '</div>';
								html += ' </div>';
								html += '</div>';
								html += '<div class="col-md-4">';
								html += '<div class="row">';
								html += '<div class="col-md-8">';
								html += '<span class="q-heading">Min Marks to Pass</span>';
								html += '</div>';
								html += '<div class="col-md-4">';
								html += '<span class="q-text c_publish_passingRule_minMarks">'
										+ b_passing_rule.minMarksToPass
										+ '</span>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '<div class="col-lg-12" style="margin-top:10px;">';
								html += '<div class="row">';
								html += '<div class="col-md-4">';
								html += '<div class="row">';
								html += '<div class="col-md-8">';
								html += '<span class="q-heading">Section Wise Passing</span>';
								html += '</div>';
								html += '<div class="col-md-4">';
								html += '<span class="q-text c_publish_passingRule_sectionWisePassingApplicable">'
										+ b_passing_rule.sectionWisePassingApplicable
										+ '</span>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '<div class="col-md-4">';
								html += '<div class="row">';
								html += '<div class="col-md-8">';
								html += '<span class="q-heading">Apply Negative Marks</span>';
								html += '</div>';
								html += '<div class="col-md-4">';
								html += '<span class="q-text c_publish_passingRule_applyNegativeMarking">'
										+ b_passing_rule.applyNegativeMarking
										+ '</span>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += ' <div class="col-md-4">';
								html += '<div class="row">';
								html += '<div class="col-md-8">';
								html += '<span class="q-heading">Negative Marks Per Question</span>';
								html += '</div>';
								html += '<div class="col-md-4">';
								html += '<span class="q-text c_publish_passingRule_negativeMarkPerQuestion">'
										+ b_passing_rule.negativeMarkPerQuestion
										+ '</span>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += ' </div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';
								html += '</div>';

								$('#i_publish_sections_details').append(html);
								// html end
							}

						}
						// set the exam instruction
						var l_instruction_list = l_publish_data.instruction;
						if (l_instruction_list.length > 0) {
							var l_instruction_map = l_instruction_list[0];
							$('.c_publish_instructions').html(
									l_instruction_map.instructionText);
						}

						$(".loading").hide();

					}
					if (data.status == 'ERROR') {
						$(".loading").hide();
						toastr.error(data.message);
					}
					if (data.status == 'SESSION') {
						$(".loading").hide();
						toastr.error(data.message);
						//location.reload()
					}

				},
				error : function(jqXHR, textStatus, errorThrown) {
					$(".loading").hide();
					toastr.error('not a valid input. Try again or later!');
					return false;
				}
			});

}

function publishExam(examId) {
	debugger;
	var l_map = {};
	l_map.examId = examId;

	$.ajax({
		url : '/corporate/publish-exam',
		data : JSON.stringify(l_map),
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		type : 'POST',
		success : function(data) {
			debugger;

			if (data.status == 'SUCCESS') {

				$(".loading").hide();
				toastr.success(data.message);
			}
			if (data.status == 'ERROR') {
				$(".loading").hide();
				toastr.error(data.message);
			}
			if (data.status == 'SESSION') {
				$(".loading").hide();
				toastr.error(data.message);
				location.reload()
			}

		},
		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			toastr.error('not a valid input. Try again later!');
			return false;
		}
	});

}


// validation methods for exam saving
function validateExam(p_formId){debugger;
	var l_return_status = true;
	$('.c_exam_form_error').html("");
	$("form#" + p_formId + " :input").each(function() {
		
		var input = $(this); // This is the jquery object of the input
		 {
			 if(input.attr('name') == "examStartDate"){
				 if(input.val() == ''){
				    $('.c_exam_form_error').html("Enter exam start date.");
				    $(window).scrollTop(0);
				    l_return_status =  false;
				 }
				 
			 }
			 if(input.attr('name') == "examEndDate"){
				 if(input.val() == ''){
				    $('.c_exam_form_error').html("Enter exam end date.");
				    $(window).scrollTop(0);
				    l_return_status =  false;
				 }
				 
			 }
			 if(input.attr('name') == "examCreationDate"){
				 if(input.val() == ''){
				    $('.c_exam_form_error').html("Enter exam Creation date.");
				    $(window).scrollTop(0);
				    l_return_status =  false;
				 }
				 
			 }
			 if(input.attr('name') == "examDeletionDate"){
				 if(input.val() == ''){
				    $('.c_exam_form_error').html("Enter exam deletion date.");
				    $(window).scrollTop(0);
				    l_return_status =  false;
				 }
				 
			 }
			 if(input.attr('name') == "maxRegistration"){
				 if(input.val() == ''){
				    $('.c_exam_form_error').html("Enter max registration.");
				    $(window).scrollTop(0);
				    l_return_status =  false;
				 }
				 
			 }
			 
			 if(input.attr('name') == "minRegistration"){
				 if(input.val() == ''){
				    $('.c_exam_form_error').html("Enter min registration.");
				    $(window).scrollTop(0);
				    l_return_status =  false;
				 }
				 
			 }
			 if(input.attr('name') == "maxConcurrentAllowed"){
				 if(input.val() == ''){
				    $('.c_exam_form_error').html("Enter max Concurrent Allowed .");
				    $(window).scrollTop(0);
				    l_return_status =  false;
				 }
				 
			 }
			 
			 if(input.attr('name') == "maxMarks"){
				 if(input.val() == ''){
				    $('.c_exam_form_error').html("Enter max Marks .");
				    $(window).scrollTop(0);
				    l_return_status =  false;
				 }
				 
			 }
			 
			 if(input.attr('name') == "maxMarks"){
				 if(input.val() == ''){
				    $('.c_exam_form_error').html("Enter max Marks .");
				    $(window).scrollTop(0);
				    l_return_status =  false;
				 }
				 
			 }
			 if(input.attr('name') == "examDuration"){
				 if(input.val() == ''){
				    $('.c_exam_form_error').html("Enter exam duration .");
				    $(window).scrollTop(0);
				    l_return_status =  false;
				 }
				 
			 }
			 if(input.attr('name') == "savePointLimit"){
				 if(input.val() == ''){
				    $('.c_exam_form_error').html("Enter save Point Limit (exam saveing deference).");
				    $(window).scrollTop(0);
				    l_return_status =  false;
				 }
				 
			 }
			 
			 if(input.attr('name') == "savePointLimit"){
				 if(input.val() == ''){
				    $('.c_exam_form_error').html("Enter save Point Limit (exam saveing difference).");
				    $(window).scrollTop(0);
				    l_return_status =  false;
				 }
				 
			 }
			 if(input.attr('name') == "prohibitionParam"){
				 if(input.val() == ''){
				    $('.c_exam_form_error').html("Enter prohibition Param (candidate allow screen this number of time minimize ).");
				    $(window).scrollTop(0);
				    l_return_status =  false;
				 }
				 
			 }
         
		}

	});
	
	return l_return_status;
	
}

function validateSection(p_formId){debugger;
var l_return_status = true;
$('.c_add_section_error').html("");
$("form#" + p_formId + " :input").each(function() {
	
	var input = $(this); // This is the jquery object of the input
	 {
		 if(input.attr('name') == "sectionId"){
			 if(input.val() == ''){
			    $('.c_add_section_error').html("select section.");
			    $(window).scrollTop(0);
			    l_return_status = false;
			 }
			 
		 }
		  if(input.attr('name') == "bankId"){
			 if(input.val() == ''){
			    $('.c_add_section_error').html("select bank.");
			    $(window).scrollTop(0);
			    l_return_status = false;
			 }
			 
		 }
		  if(input.attr('name') == "nbrQuestions"){
			 if(input.val() == ''){
			    $('.c_add_section_error').html("enter number of question(Total number of question in bank).");
			    $(window).scrollTop(0);
			    l_return_status = false;
			 }
			 
		 }
		  if(input.attr('name') == "maxQuestions"){
			 if(input.val() == ''){
			    $('.c_add_section_error').html("enter max question.");
			    $(window).scrollTop(0);
			    l_return_status = false;
			 }
			 
		 }
		 if(input.attr('name') == "marksPerQuestion"){
			 if(input.val() == ''){
			    $('.c_add_section_error').html("Enter marks Per Question.");
			    $(window).scrollTop(0);
			    l_return_status = false;
			 }
			 
		 }
		  if(input.attr('name') == "minMarksToPassSection"){
			 if(input.val() == ''){
			    $('.c_add_section_error').html("Enter min marks to pass section.");
			    $(window).scrollTop(0);
			    l_return_status = false;
			 }
			 
		 }
		
	}
});

return l_return_status;

}

function validatePassingRule(p_formId){debugger;
var l_return_status = true;
$('.c_error_passing_rule').html("");
$("form#" + p_formId + " :input").each(function() {
	
	var input = $(this); // This is the jquery object of the input
	 {
		 if(input.attr('name') == "sectionId"){
			 if(input.val() == ''){
			    $('.c_error_passing_rule').html("select section.");
			    l_return_status = false;
			 }
			 
		 }
		 if(input.attr('name') == "maxMarks"){
			 if(input.val() == ''){
			    $('.c_error_passing_rule').html("enter max marks.");
			    l_return_status = false;
			 }
			 
		 }
		 if(input.attr('name') == "minMarksToPass"){
			 if(input.val() == ''){
			    $('.c_error_passing_rule').html("enter min marks to pass.");
			    l_return_status = false;
			 }
			 
		 }
		
		 if(input.attr('name') == "negativeMarkPerQuestion"){
			 if(input.val() == ''){
			    $('.c_error_passing_rule').html("enter min marks to pass.");
			    l_return_status = false;
			 }
			/* if(parseFloat(input.val())>0 && parseFloat(input.val())<2){
				 $('.c_error_passing_rule').html("negative Mark PerQuestion is not in range 0 to 2(decimal allow).");
				    l_return_status = false;
			 }*/
			 
		 }
		
	}
});

return l_return_status;

}
