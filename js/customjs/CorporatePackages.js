var g_map = {};
var existMap = {};
var package_price = 0;

function addNumberOfStudent(count, flag) {
	$('.c_examName').val($('.c_name' + count).val());
	$('.c_examId').val($('.c_examId' + count).val());
	$('.c_examPrice').val($('.c_price' + count).val());
	$('.c_count').val(count);

	if (flag) {
		$("#myModalabout").modal('show');
	} else {
		$('.c_numberOfStudent').val("1");

		addToPackage();
	}
}

function addToPackage() {
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}

	$('#i_errorMessage').html("");
	if ("examId" + $('.c_count').val() in g_map) {

		$('#i_errorMessage').html("Already added this Exam!.");
		toastr.error("Already added this Exam!");
		return false;
	}

	if ($('.c_numberOfStudent').val() == "") {
		$('#i_errorMessage').html("Enter Number Of Student For This Exam!");
		return false;
	}
	if (parseInt($('.c_numberOfStudent').val()) == 0) {
		$('#i_errorMessage').html("Not allow 0 Student!");
		return false;
	}

	var count = $('.c_count').val();
	g_map["examId" + count] = $('.c_examId').val();
	g_map["examName" + "examId" + count] = $('.c_examName').val();
	var numberOfStudent = parseInt(($('.c_numberOfStudent').val()).trim());
	var examPrice = parseFloat(($('.c_examPrice').val()).trim());
	g_map["totalStudentexamId" + count] = ($('.c_numberOfStudent').val())
			.trim();
	var price = numberOfStudent * examPrice;
	$('.c_titles')
			.append(
					'<div class="c_remove'
							+ count
							+ '"><h5 class="card-title">'
							+ $('.c_examName').val()
							+ '</h5><h6><span>Total Exam:<input type="text" class="c_totalStudent'
							+ count
							+ '" style="border:none" readonly value="'
							+ numberOfStudent
							+ '"></span></h6><h6><span style="color:red">Price:<i class="fa fa-rupee"></i>'
							+ price
							+ '</span></h6><a href="#" onclick="removeExam('
							+ count
							+ ','
							+ price
							+ ')"><span class="glyphicon glyphicon-remove" style="float:right;margin-top:-50px;color: #ff000096;"></span></a></div>');

	var l_totalExam = $('.c_totalExam').val();
	var l_totalPrice = $('.c_totalPrice').val();
	var l_finalTotalExam = parseInt(l_totalExam) + 1;
	$('.c_totalExam').val(l_finalTotalExam);
	var l_finalTotalPrice = parseFloat(price) + parseFloat(l_totalPrice);
	$('.c_totalPrice').val(l_finalTotalPrice);
	package_price = l_finalTotalPrice;
	$('.c_quantityForm').trigger("reset");
	$("#myModalabout").modal('hide');
	toastr.success('Exam added successfully.');

}

function removeExam(count, price) {

	delete g_map["examId" + count];
	delete g_map["totalStudent" + "examId" + count];
	delete g_map["examName" + "examId" + count];
	var l_totalExam = $('.c_totalExam').val();
	var l_totalPrice = $('.c_totalPrice').val();
	// var l_totalStudentForExam = $(".c_totalStudent" + count).val();
	var l_finalTotalExam = parseFloat(l_totalExam) - 1;
	// var l_minusPrice = parseFloat(l_totalStudentForExam) * 10;
	$('.c_totalExam').val(l_finalTotalExam);
	var remainingPrice = parseFloat(l_totalPrice) - parseFloat(price);
	package_price = remainingPrice;
	$('.c_totalPrice').val(remainingPrice);
	$('.c_remove' + count).remove();

}

$(".c_savePackage")
		.click(
				function() {
					if (!(navigator.onLine)) {
						toastr
								.error('You are offline. please check internet connection.');
						return;
					}
					$('.c_errorPackage').html("");
					if ($('.c_packageName').val() == "") {
						toastr.error("Enter a valid package name.");
						return false;
					}
					if ($('.c_totalExam').val() == '0') {
						toastr
								.error("Package cannot be empty. Add at least one exam in a package.");
						return false;
					}
					g_map["analysisType"] = 'None';
					if (document.getElementById('Basic_A').checked) {
						g_map["analysisType"] = 'Basic';
					}
					if (document.getElementById('Advance_A').checked) {
						g_map["analysisType"] = 'Advance';
					}
					g_map.price = $('.c_totalPrice').val();
					g_map.packageName = $('.c_packageName').val();
					g_map["status"] = "ACTIVE";
					g_map.validity = $('.c_validity').val();
					g_map["source"] = "SAVE";
					g_map["productType"] = "CUSTOM";
					$(".loading").show();
					$
							.ajax({

								type : 'POST',
								url : "/corporate/save-customize-package",
								data : JSON.stringify(g_map),
								cache : false,
								async : true,
								contentType : "application/json; charset=UTF-8",
								dataType : 'json',
								success : function(response) {
									if (response.status == 'SUCCESS') {

										$('.c_packageName').val('')
										$('.c_titles').html('');
										$('.c_totalExam').val('0');
										$('.c_totalPrice').val('0');
										// $('.c_successPackage').html("Package
										// added successfully!");
										toastr
												.success('Package added successfully.');
									}
									if (response.status == 'EXIST') {
										// $('.c_errorPackage').html("Package
										// Name already in use by you!");
										toastr
												.error('Package name is already taken. Try using another name.');

									}
									if (response.status == 'FAIL') {
										// $('.c_errorPackage').html("There is
										// some error Package cann't be save!");
										toastr
												.error('Package cannot be saved. Try again later!');
									}
									$(".loading").hide();
								},
								error : function(jqXHR, textStatus, errorThrown) {
									// alert("error:" + textStatus + "
									// exception:" + errorThrown);
									$(".loading").hide();
									toastr
											.error('Package cannot be saved. Try again later!');

								}
							});

				});

$(".c_savePackageWithCart")
		.click(
				function() {

					if (!(navigator.onLine)) {
						toastr
								.error('You are offline. please check internet connection.');
						return;
					}
					$('.c_successPackage').html("");
					$('.c_errorPackage').html("");
					if ($('.c_packageName').val() == "") {
						// $('.c_errorPackage').html("Enter a valid package
						// name.");
						toastr.error('Enter a valid package name.');
						return false;
					}
					if ($('.c_totalExam').val() == '0') {
						// $('.c_errorPackage').html("Package cannot be empty.
						// Add at least one exam in a package.");
						toastr
								.error('Package cannot be empty. Add at least one exam in a package.');
						return false;
					}
					g_map["analysisType"] = 'None';
					if (document.getElementById('Basic_A').checked) {
						g_map["analysisType"] = 'Basic';
					}
					if (document.getElementById('Advance_A').checked) {
						g_map["analysisType"] = 'Advance';
					}
					g_map.packageName = $('.c_packageName').val();
					g_map.price = $('.c_totalPrice').val();

					g_map["status"] = "ACTIVE";
					g_map.validity = $('.c_validity').val();
					g_map["source"] = "CART";
					g_map["productType"] = "CUSTOM";
					$(".loading").show();
					$
							.ajax({

								type : 'POST',
								url : "/corporate/save-customize-package",
								data : JSON.stringify(g_map),
								cache : false,
								async : true,
								contentType : "application/json; charset=UTF-8",
								dataType : 'json',
								success : function(response) {
									if (response.status == 'SUCCESS') {

										$('.c_packageName').val('')
										$('.c_titles').html('');
										$('.c_totalExam').val('0');
										$('.c_totalPrice').val('0');
										toastr
												.success('Package added successfully.');
										window.location.reload(true);
									}
									if (response.status == 'EXIST') {
										// $('.c_errorPackage').html("Package
										// Name already in use by you!");
										toastr
												.error('Package name is already taken by you. Try using another name.');
									}
									if (response.status == 'FAIL') {
										// $('.c_errorPackage').html("There is
										// some error Package cann't be save!");
										toastr
												.error('Package cannot be saved. Try again later! ');
									}
									$(".loading").hide();
								},
								error : function(jqXHR, textStatus, errorThrown) {
									// alert("error:" + textStatus + "
									// exception:" + errorThrown);
									// $('.c_errorPackage').html("There is some
									// error Package cann't be save!");
									$(".loading").hide();
									toastr
											.error('Package cannot be saved. Try again later!');
								}
							});

				});

$(".c_searchExams")
		.click(
				function() {
					if (!(navigator.onLine)) {
						toastr
								.error('You are offline. please check internet connection.');
						return;
					}
					var l_map = {};

					if (!($(".c_examLevel").val() == '')) {

						l_map.level = $(".c_examLevel").val();
					}
					if (!($(".c_maxExam").val() == '')) {
						l_map.maxRange = $(".c_maxExam").val();
					}

					if (!($(".c_minExam").val() == '')) {
						l_map.minRange = $(".c_minExam").val();
					}

					if (!($(".c_duration").val() == '')) {
						l_map.duration = $(".c_duration").val();
					}

					if (!($(".c_subjects").val() == '')) {
						l_map.subject = $(".c_subjects").val();
					}

					l_map.offSet = '0';
					l_map.numberOfRecord = '9';
					l_map.source = "SM";
					// alert(JSON.stringify(l_map));
					$(".loading").show();
					$
							.ajax({

								type : 'POST',
								url : "/corporate/exam-list-by-filter",
								data : JSON.stringify(l_map),
								cache : false,
								async : true,
								contentType : "application/json; charset=UTF-8",
								dataType : 'json',
								success : function(p_data) {
									debugger;

									var counter = parseInt(p_data.counter);
									var response = p_data.examList;
									p_no_of_pages = p_data.numberOfPages;
									if (response == '') {
										toastr.error('No Records found. ');
									}
									l_exam_list = response;
									// this is global variable define in
									// createPackage.jsp page
									searchFilters = p_data.searchFilters;
									var roleName = p_data.roleName;

									var l_map = {};

									$('.c_examsListTab').html('');

									for (var i = 0; i < response.length; i++) {
										l_map = response[i];
										var exams = "";
										exams += '<div class="col-md-4">';
										exams += '<div class="card card-type-pricing">';
										exams += '<div class="card-body text-center style-skyblue"  style="padding:10px;">';
										exams += '<input value="'
												+ l_map.examName
												+ '" type="hidden" class="c_name'
												+ i + '">';
										exams += '<h2 class="text-light" style="font-size:11px;margin-top: 10px;margin-bottom: 10px;">'
												+ l_map.examName + '</h2>';
										exams += '<input type="hidden" value="'
												+ l_map.examId
												+ '" class="c_examId' + i
												+ '">';
										exams += '</div>';
										exams += '<div class="card-body no-padding"><ul class="list-unstyled text-left">';
										exams += '<li>Duration : '
												+ l_map.examDuration + '</li>';
										exams += '<li>No. Of Section : '
												+ l_map.nbrSection + '</li>';
										exams += '<li>Section Type : '
												+ l_map.sectionType + '</li>';
										exams += '<li>No. Of Questions : '
												+ l_map.nbrQuestions + '</li>';
										if (l_map.description != undefined) {
											exams += '<li>' + l_map.description
													+ '</li>';
										}
										exams += '<input type="hidden" value="'
												+ l_map.price
												+ '" class="c_price' + i + '">';
										exams += '<li>Price : <i class="fa fa-inr"></i>'
												+ l_map.price
												+ ' per candidate <br><i>(All Inclusive)</i></li>';
										exams += '</ul></div>';
										if (roleName == 'ROLE_CORPORATE'
												|| roleName == 'ROLE_INSTITUTE') {
											exams += '<div class="card-body butalign"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="" onclick="addNumberOfStudent(\''
													+ i
													+ '\',true)">Add To Package</button> </div>';
										}
										if (roleName == 'ROLE_STUDENT') {
											exams += '<div class="card-body butalign"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="" onclick="addNumberOfStudent(\''
													+ i
													+ '\',false)">Add To Package</button> </div>';
										}
										exams += '</div></div>';
										$('.c_examsListTab').append(exams);
									}

									var totalPages = counter / 9;
									var l_extra_pages = 0;
									l_extra_pages = counter % 9;
									if (l_extra_pages != 0) {
										totalPages = totalPages + 1;
									}

									$('#pagination').twbsPagination('destroy');
									$('#pagination').twbsPagination({
										totalPages : p_no_of_pages
									});
									// var totalPages = 5;
									// var pages = "";
									// pages += '<div class="row"><div
									// class="col-md-12"
									// style="text-align:center;">';
									// pages += '<ul class="pagination">'
									// for (var i = 1; i <= totalPages; i++) {
									// if (i == 1) {
									// pages += '<li class="active"><a href="#"
									// onclick="searchByPagination('
									// + i
									// + ')">'
									// + i
									// + '</a></li>';
									// } else {
									// pages += '<li><a href="#"
									// onclick="searchByPagination('
									// + i
									// + ')">'
									// + i
									// + '</a></li>';
									// }
									//
									// }
									// pages += '<li id="i_nid"
									// class="c_nclass"><a href="#"
									// onclick="searchByPagination(2)">Next</a></li></ul>';
									// pages += '</div></div>';
									// $('.c_pages').html(pages);
									$(".loading").hide();
								},
								error : function(jqXHR, textStatus, errorThrown) {
									alert("error:" + textStatus + " exception:"
											+ errorThrown);
									$(".loading").hide();
								}
							});

				});

function searchByPagination(selectedPage) {
	debugger;

	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	var l_map = searchFilters;
	/*
	 * if (!($(".c_examLevel").val() == '')) { l_map.level =
	 * $(".c_examLevel").val(); } if (!($(".c_maxExam").val() == '')) {
	 * l_map.maxRange = $(".c_maxExam").val(); }
	 * 
	 * if (!($(".c_minExam").val() == '')) { l_map.minRange =
	 * $(".c_minExam").val(); }
	 * 
	 * if (!($(".c_duration").val() == '')) { l_map.duration =
	 * $(".c_duration").val(); }
	 * 
	 * if (!($(".c_subjects").val() == '')) { l_map.subject =
	 * $(".c_subjects").val(); }
	 */

	var resultsPerPage = 9;
	var start = parseInt((selectedPage - 1)) * resultsPerPage;
	l_map.offSet = start;
	l_map.numberOfRecord = resultsPerPage;
	l_map.source = "SM";
	$(".loading").show();
	$.ajax({

				type : 'POST',
				url : "/corporate/exam-list-by-filter",
				data : JSON.stringify(l_map),
				cache : false,
				async : true,
				contentType : "application/json; charset=UTF-8",
				dataType : 'json',
				success : function(p_data) {
					debugger;
					var l_map = {};
					var counter = parseInt(p_data.counter);
					var response = p_data.examList;
					p_no_of_pages = p_data.numberOfPages;
					// this is global variable define in createPackage.jsp page
					searchFilters = p_data.searchFilters;
					var roleName = p_data.roleName;
					$('.c_examsListTab').html('');
					for (var i = 0; i < response.length; i++) {
						l_map = response[i];
						var exams = "";
						exams += '<div class="col-md-4">';
						exams += '<div class="card card-type-pricing">';
						exams += '<div class="card-body text-center style-skyblue"  style="padding:10px;">'
						exams += '<input value="' + l_map.examName
								+ '" type="hidden" class="c_name' + i + '">';
						exams += '<h2 class="text-light" style="font-size:11px;margin-top: 10px;margin-bottom: 10px;">'
								+ l_map.examName + '</h2>';
						exams += '<input type="hidden" value="' + l_map.examId
								+ '" class="c_examId' + i + '">';
						exams += '</div>';
						exams += '<div class="card-body no-padding"><ul class="list-unstyled text-left">';
						exams += '<li>Duration : ' + l_map.examDuration
								+ '</li>';
						exams += '<li>No. Of Section : ' + l_map.nbrSection
								+ '</li>';
						exams += '<li>Section Type : ' + l_map.sectionType
								+ '</li>';
						exams += '<li>No. Of Questions : ' + l_map.nbrQuestions
								+ '</li>';
						if (l_map.description != undefined) {
							exams += '<li>' + l_map.description + '</li>';
						}
						exams += '<input type="hidden" value="' + l_map.price
								+ '" class="c_price' + i + '">';
						exams += '<li>Price : <i class="fa fa-inr"></i>'
								+ l_map.price
								+ ' per candidate <br><i>(All Inclusive)</i></li>'
						exams += '</ul></div>';
						if (roleName == 'ROLE_CORPORATE'
								|| roleName == 'ROLE_INSTITUTE') {
							exams += '<div class="card-body butalign"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="" onclick="addNumberOfStudent(\''
									+ i
									+ '\',true)">Add To Package</button> </div>';
						}
						if (roleName == 'ROLE_STUDENT') {
							exams += '<div class="card-body butalign"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="" onclick="addNumberOfStudent(\''
									+ i
									+ '\',false)">Add To Package</button> </div>';
						}

						exams += '</div></div>';
						$('.c_examsListTab').append(exams);
					}

					var totalPages = $('.c_pages ul ').length;
					if ($("#i_pid").hasClass("c_pclass")) {
						totalPages = totalPages - 1;
					}
					if ($("#i_nid").hasClass("c_nclass")) {
						totalPages = totalPages - 1;
					}
					// var pages = "";
					// $('.c_pages').html('');
					debugger;
					// alert("totalPages "+totalPages+" p_no_of_pages
					// "+p_no_of_pages);
					// callPagination(l_noOfPages);
					// pages += '<div class="row"><div class="col-md-12"
					// style="text-align:center;">';
					// pages += '<ul class="pagination" id="pagination" ></ul>';
					/*
					 * pages += '<ul class="pagination">' if
					 * (parseInt(selectedPage) > 1) { var previous =
					 * parseInt(selectedPage) - 1; pages += '<li id="i_pid" class="c_pclass"><a
					 * href="#" onclick="searchByPagination(' + previous +
					 * ')">Previous</a> </li>'; }
					 * 
					 * for (var i = 1; i <= totalPages; i++) { if
					 * (parseInt(selectedPage) == i) { pages += '<li class="active"><a
					 * href="#" onclick="searchByPagination(' + i + ')">' + i + '</a></li>'; }
					 * else { pages += '<li><a href="#"
					 * onclick="searchByPagination(' + i + ')">' + i + '</a></li>'; } }
					 * 
					 * var next = parseInt(selectedPage) + 1; if (!(totalPages ==
					 * parseInt(selectedPage))) { pages += '<li id="i_nid" class="c_nclass"><a
					 * href="#" onclick="searchByPagination(' + next + ')">Next</a></li></ul>';
					 * pages += '</div></div>'; }
					 */
					//					
					// pages += '</div></div>';
					// $('.c_pages').html(pages);
					$(".loading").hide();
				},
				error : function(jqXHR, textStatus, errorThrown) {
					alert("error:" + textStatus + " exception:" + errorThrown);
					$(".loading").hide();
				}
			});

}

function showModal(packageId, examId) {
	// data-target='' data-toggle='modal'
	$('#addStudent').modal('show');
	$('.c_packageId').val(packageId);
	$('.c_examId').val(examId);
}

function addOneByOne() {
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	$('.c_errorInfo').html("");

	if (!(isBlank($('.c_Name').val()))) {
		$('.c_errorInfo').html("enter name.");
		return false;
	}

	if (!(isValidEmail($('.c_email').val()))) {
		$('.c_errorInfo').html("invalid email.");
		return false;
	}
	if (!(isValidMobile($('.c_phone').val()))) {
		$('.c_errorInfo').html("invalid mobile.");
		return false;
	}

	var l_map = {};
	l_map.packageId = $('.c_packageId').val();
	l_map.examId = $('.c_examId').val();
	l_map.name = $('.c_Name').val();
	l_map.phone = $('.c_phone').val();
	l_map.email = $('.c_email').val();

	$(".loading").show();
	$.ajax({
		url : '/corporate/add-candidate',
		data : JSON.stringify(l_map),
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		type : 'POST',
		success : function(response) {
			debugger;
			$(".loading").hide();
			if (response.status == 'SUCCESS') {
				$('#addStudent').modal('hide');
				toastr.success('Candidate Added Successfully.');
				location.reload();

			}

			if (response.status == 'EXIST') {
				$('.c_errorInfo').html(response.message);

			}
			if (response.status == 'ERROR') {

				$('.c_errorInfo').html(response.message);
			}

		},
		error : function(err) {
			$(".loading").hide();
			toastr.error('Candidate cannot be add. Try again later!');
		}
	});

}

function candidateActions(packageId, examId, candidateId, count, actionType,
		status, p_pin, p_password, p_display_name, p_mobile) {
	debugger;

	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	var l_map = {};
	var l_confirm = true;
	l_map.packageId = packageId;
	l_map.examId = examId;
	l_map.candidateId = candidateId;
	l_map.actionType = actionType;
	l_map.pin = p_pin;
	l_map.password = p_password;
	l_map.displayName = p_display_name;
	l_map.examName = $('#i_exam_name').val();
	l_map.mobile = p_mobile;
	if (actionType == 'status') {
		if (status == 'ACTIVE')
			l_map.status = 'INACTIVE';
		else
			l_map.status = 'ACTIVE';
	}
	if (actionType == 'delete') {
		if (confirm("Are you sure !") == true)
			l_confirm = true;
		else
			l_confirm = false;
	}
	if (actionType == 'edit') {
		edit_row(count);
		return false;
	}
	if (actionType == 'save') {
		l_map.actionType = 'edit';
		l_map.name = $("#name_text" + count).val();
		l_map.phone = $("#phone_text" + count).val();
	}
	if (actionType == 'SMS') {
		l_map.name = $("#name_text" + count).val();
		l_map.phone = $("#phone_text" + count).val();
	}
	if (actionType == 'EMAIL') {
		l_map.name = $("#name_text" + count).val();
	}

	if (l_confirm) {
		$(".loading").show();
		$.ajax({
			url : '/corporate/candidate-actions',
			data : JSON.stringify(l_map),
			cache : false,
			async : true,
			contentType : "application/json; charset=UTF-8",
			dataType : 'json',
			type : 'POST',
			success : function(data) {
				$(".loading").hide();
				if (data != null) {
					if (data.status == 'SUCCESS') {
						if (actionType == 'EMAIL') {
							toastr.success("Email sent successfully.");
						} else if (actionType == 'SMS') {
							toastr.success("SMS sent successfully.");
						} else {
							toastr.success(actionType + " updated success.");
						}

						location.reload();
					}
					if (data.status == 'ERROR') {
						toastr.error(data.message);
						if (actionType == 'status') {
							location.reload();
						}

					}
				} else {

					toastr.error('Not a valid input. Try again later!');
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$(".loading").hide();
				toastr.error('Not a valid input. Try again later!');
			}
		});
	}

}

// function edit_row(no) {
// document.getElementById("edit_button" + no).style.display = "none";
// document.getElementById("save_button" + no).style.display = "block";

// var sr = document.getElementById("sr_row" + no);
// var name = document.getElementById("name_row" + no);
// var email = document.getElementById("email_row" + no);
// var phone = document.getElementById("phone_row" + no);
// // var pin = document.getElementById("pin_row" + no);
// // var password = document.getElementById("password_row" + no);

// var sr_data = sr.innerHTML;
// var name_data = name.innerHTML;
// var email_data = email.innerHTML;
// var phone_data = phone.innerHTML;
// // var pin_data = pin.innerHTML;
// // var password_data = password.innerHTML;

// sr.innerHTML = "<input readonly type='text' id='sr_text" + no + "' value='"
// + sr_data + "'>";
// name.innerHTML = "<input type='text' id='name_text" + no + "' value='"
// + name_data + "'>";
// email.innerHTML = "<input readonly type='text' id='email_text" + no
// + "' value='" + email_data + "'>";
// phone.innerHTML = "<input type='text' id='phone_text" + no + "' value='"
// + phone_data
// + "' maxlength='10' onkeypress='return isMobile(event)'>";
// // pin.innerHTML = "<input type='text' id='pin_text" + no + "' value='"
// // + pin_data + "'maxlength='6' onkeypress='return isMobile(event)'>";
// // password.innerHTML = "<input type='text' id='password_text" + no + "'
// // value='"
// // + password_data + "'>";
// }

function selectNumberOfIds(packageId, examId) {
	$('#i_errorGenerate').html("");
	$("#myModalabout").modal('show');
	$('.c_package_id').val(packageId);
	$('.c_exam_id').val(examId);
}

function generateRandomIds() {

	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	$('#i_errorGenerate').html("");
	if ($('.c_howmany').val() == '') {
		$('#i_errorGenerate').html(
				"enter how many id and passworword you want to!");
		return false;
	}
	l_map = {};
	l_map.numberOfIds = $('.c_howmany').val();
	l_map.examId = $('.c_exam_id').val();
	l_map.packageId = $('.c_package_id').val();
	$(".loading").show();
	$.ajax({
		url : '/corporate/generate-random-password',
		data : JSON.stringify(l_map),
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		type : 'POST',
		success : function(data) {
			debugger;

			$(".loading").hide();
			if (data.status == 'SUCCESS') {
				$("#myModalabout").modal('hide');
				toastr.success('Random ids generated Successfully.');
				location.reload();
			}
			if (data.status == 'ERROR') {
				$('#i_errorGenerate').html(data.message);
				toastr.error(data.message);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$("#myModalabout").modal('hide');
			$(".loading").hide();
			$('#i_errorGenerate').html(
					'Ids cannot be generated. Try again later!');
			toastr.error('Ids cannot be generated. Try again later!');
		}
	});

}

function managCredential(examId, packageId, status, count) {
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}

	var examDetail = "";

	examDetail += "<div class='card-body' id='addStudent'><div class='row'>";
	examDetail += "<div class='col-md-12'><div style='display:flex;margin-bottom:20px;'> ";
	examDetail += "<h3 style='margin-left:0px;margin-top:9px;'>Choose Your Option</span></h3></div> </div>";
	examDetail += "<div class='col-md-12'><div class='row'> <a href='/corporate/add-candidates'>";
	// start for one by one
	examDetail += "<a href='/corporate/add-candidates?packageId="
			+ packageId
			+ "&examId="
			+ examId
			+ "&from=one'><div class='col-md-4'><div class='card ck1' style='border-radius: 25px;'>";
	examDetail += "<div class='card-body'><div class='row'><div class='col-md-12' style='text-align:center;'>";
	examDetail += "<img src='../../resources/img/check-icon.png' alt='Check Icon'></div>";
	examDetail += "<div class='col-md-12'><h5><strong>I have Candidate details (Email,Phone) and want to create one by one.</strong></h5>";
	examDetail += "</div></div></div></div></div></a>";
	// start for excel
	examDetail += "<a href='/corporate/add-candidates?packageId="
			+ packageId
			+ "&examId="
			+ examId
			+ "&from=excel'><div class='col-md-4'><div class='card' style='border-radius: 25px;'>";
	examDetail += "<div class='card-body'><div class='row'><div class='col-md-12' style='text-align:center;'>";
	examDetail += "<img src='../../resources/img/check-icon.png' alt='Check Icon'> </div><div class='col-md-12'>";
	examDetail += "<h5><strong>I want to upload excel file [ Please note that your excel should have email & phone ].</strong></h5>";
	examDetail += "</div></div></div></div></div></a>";
	// start for random
	examDetail += "<a href='/corporate/add-candidates?packageId="
			+ packageId
			+ "&examId="
			+ examId
			+ "&from=random'><div class='col-md-4'><div class='card' style='border-radius: 25px;'>";
	examDetail += "<div class='card-body'><div class='row'><div class='col-md-12' style='text-align:center;'>";
	examDetail += "<img src='../../resources/img/check-icon.png' alt='Check Icon'></div><div class='col-md-12'>";
	examDetail += "<h5><strong>I don't have any information about Candidate. I want to generate Random Id.</strong></h5>";
	examDetail += " </div></div></div></div></div></a>";
	// start for Custom form
	examDetail += "<a href='/corporate/build-custom-form?packageId="
			+ packageId
			+ "&examId="
			+ examId
			+ "'><div class='col-md-4'><div class='card' style='border-radius: 25px;'>";
	examDetail += "<div class='card-body'><div class='row'><div class='col-md-12' style='text-align:center;'>";
	examDetail += "<img src='../../resources/img/check-icon.png' alt='Check Icon'></div><div class='col-md-12'>";
	examDetail += "<h5 title=' Make your own registration form to plan your next event. Get started by editing a form template then send an email to your list and watch the responses pile up!'><strong>Customize your registration form to invite diverse candidate pool.</strong></h5>";
	examDetail += " </div></div></div></div></div></a>";
	// end for Custom form
	examDetail += "<a href='/corporate/add-candidates?packageId="
			+ packageId
			+ "&examId="
			+ examId
			+ "&from=none'><div class='col-md-4'><div class='card' style='border-radius: 25px;'>";
	examDetail += "<div class='card-body'><div class='row'><div class='col-md-12' style='text-align:center;'>";
	examDetail += "<img src='../../resources/img/check-icon.png' alt='Check Icon'></div><div class='col-md-12'>";
	examDetail += "<h5><strong>I don't want to add candidates just view candidates.</strong></h5>";
	examDetail += " </div></div></div></div></div></a>";
	examDetail += "</div></div></div></div>";

	$('.credential_space' + count).html(examDetail);

}

function updateCandidateRegistrationAction(p_exam_id, p_package_id, p_status,
		p_count) {
	debugger;
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	// var l_radio = "";
	/*
	 * if($('.c_action_'+p_package_id+'_'+p_exam_id).val()==''){
	 * toastr.error('Please select any one.'); return; }
	 */
	if ($('input[name=actions' + p_package_id + '_' + p_exam_id + ']:checked')
			.val() == undefined) {
		toastr.error('Please select any one option.');
		return;
	}
	/*
	 * if((document.getElementById('#c_action1_'+p_package_id+'_'+p_exam_id)).checked){
	 * l_radio=document.getElementById('#c_action1_'+p_package_id+'_'+p_exam_id).value; }
	 * if((document.getElementById('#c_action2_'+p_package_id+'_'+p_exam_id)).checked){
	 * l_radio=document.getElementById('#c_action2_'+p_package_id+'_'+p_exam_id).value; }
	 */

	var l_map = {};
	l_map.packageId = p_package_id;
	l_map.examId = p_exam_id;
	l_map.registrationAction = $(
			'input[name=actions' + p_package_id + '_' + p_exam_id + ']:checked')
			.val();

	$(".loading").show();
	$
			.ajax({
				url : '/common/update-candidates-register-action',
				data : JSON.stringify(l_map),
				cache : false,
				async : true,
				contentType : "application/json; charset=UTF-8",
				dataType : 'json',
				type : 'POST',
				success : function(data) {
					debugger;
					var l_html = "";
					$(".loading").hide();
					if (data.status == 'SUCCESS') {
						l_html += "<button data-placement='top' title='Manage Your Candidates.' class='btn-gradient' id='check' onclick='managCredential(\""
								+ p_exam_id
								+ "\",\""
								+ p_package_id
								+ "\",\""
								+ p_status
								+ "\",\""
								+ p_count
								+ "\")'>Manage candidates</button>";
						$('#i_candi_reg_' + p_package_id + '_' + p_exam_id)
								.html(l_html);
						toastr.success(data.message);
					}
					if (data.status == 'ERROR') {
						toastr.error(data.message);
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$(".loading").hide();
					toastr.error('There is some problem. Try again !');
				}
			});
}

function managExam(examId, packageId, status) {

	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	var type = 'CUSTOMIZEPACKAGE';
	var examDetail = "";
	var exam = null;
	$(".loading").show();
	$
			.ajax({
				url : '/corporate/exam-detail',
				type : 'POST',
				data : {
					examId : examId
				},

				success : function(data) {
					debugger;
					if (data.status = 'SUCCESS') {
						var object = data.object[0];
						exam = object[0];

						examDetail += "<div class='card-body' id='addStudent'><div class='row'>";
						examDetail += "<div class='col-md-12'><div style='display:flex;margin-bottom:20px;'> ";
						examDetail += "<h3 style='margin-left:0px;margin-top:9px;'>Choose Your Option</span></h3></div> </div>";
						examDetail += "<div class='col-md-12'><div class='row'> <a href='/corporate/add-candidates'>";
						examDetail += "<div class='col-md-4'><div class='card ck1' style='border-radius: 25px;'>";
						examDetail += "<div class='card-body'><div class='row'><div class='col-md-12' style='text-align:center;'>";
						examDetail += "<img src='../../resources/img/check-icon.png' alt='Check Icon'></div>";
						examDetail += "<div class='col-md-12'><h5><strong>I have Candidate details (Email,Phone) and want to create one by one.</strong></h5>";
						examDetail += "</div></div></div></div></div></a>";
						examDetail += "<a href='#'><div class='col-md-4'><div class='card' style='border-radius: 25px;'>";
						examDetail += "<div class='card-body'><div class='row'><div class='col-md-12' style='text-align:center;'>";
						examDetail += "<img src='../../resources/img/check-icon.png' alt='Check Icon'> </div><div class='col-md-12'>";
						examDetail += "<h5><strong>I want to upload excel file [ Please note that your excel should have email & phone ].</strong></h5>";
						examDetail += "</div></div></div></div></div></a>";
						examDetail += "<a href='#'><div class='col-md-4'><div class='card' style='border-radius: 25px;'>";
						examDetail += "<div class='card-body'><div class='row'><div class='col-md-12' style='text-align:center;'>";
						examDetail += "<img src='../../resources/img/check-icon.png' alt='Check Icon'></div><div class='col-md-12'>";
						examDetail += "<h5><strong>I don't have any information about Candidate. I want to generate Random Id.</strong></h5>";
						examDetail += " </div></div></div></div></div></a></div></div></div></div>";
						$(".loading").hide();
						$('.credential_space' + packageId).html(examDetail);

						// $(".loading").hide();

						// $('.c_examDetail' + packageId).html(examDetail);

					} else {
						toastr.error('there is some error please try again!.');
					}

				},
				error : function(err) {
					$(".loading").hide();
					toastr.error('There is some error please try again!');
					// alert(err);
				}
			});

}

function generatePassword(examId, packageId) {

	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}

	var l_map = {};
	l_map.examId = examId;
	l_map.packageId = packageId;
	$(".loading").show();
	$
			.ajax({
				url : '/corporate/generate-password',
				type : 'POST',
				data : JSON.stringify(l_map),
				cache : false,
				async : true,
				contentType : "application/json; charset=UTF-8",
				dataType : 'json',
				success : function(data) {
					debugger;
					$(".loading").hide();
					if (data.status = 'SUCCESS') {

						var b_response = data.object;
						$('.c_studentsInfo').html("");
						var lastRowNumber = 1;
						for (var i = 0; i < b_response.length; i++) {
							var l_map = b_response[i];
							var row = "<tr><td>"
									+ lastRowNumber
									+ "</td><td>"
									+ l_map.name
									+ "</td><td>"
									+ l_map.email
									+ "</td><td>"
									+ l_map.phone
									+ "</td><td>"
									+ l_map.password
									+ "</td><td><button type='button' class='btn btn-danger'><span class='glyphicon glyphicon-trash'  onclick='deleteStudent(\""
									+ l_map.infoId + "\",\"" + l_map.email
									+ "\",\"" + lastRowNumber
									+ "\")'></span></button></td></tr>";
							lastRowNumber++;
							$('.c_studentsInfo').append(row);
						}
						toastr
								.success('Generated Ids and passwords Successfully.');
					} else
						toastr.error('There is some error please try again!');

				},
				error : function(err) {
					$(".loading").hide();
					toastr.error('There is some error please try again!');
					// alert(err);
				}
			});
}

function changePin(examId, packageId) {
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	$('.c_changePin').html('');
	var l_map = {};
	l_map.examId = examId;
	l_map.packageId = packageId;
	l_map.pin = $('.c_pin' + examId + packageId).val();
	if ($('.c_pin' + examId + packageId).val() == "") {
		$('.c_changePin').html(
				"<span style='color:red'>Please enter pin !</span>");
		return false;
	}
	$(".loading").show();
	$.ajax({
		url : '/corporate/change-pin',
		type : 'POST',
		data : JSON.stringify(l_map),
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		success : function(data) {
			debugger;

			$(".loading").hide();
			if (data.status = 'SUCCESS') {
				/*
				 * $('.c_changePin').html("<span
				 * style='color:green'>Successfully Updated !</span>");
				 */
				toastr.success('Successfully Updated');
			}

		},
		error : function(jqXHR, textStatus, errorThrown) {
			// $(".loading").hide();
			// toastr.success('Successfully Updated');
			// alert("error:" + textStatus + " exception:" + errorThrown);
			$(".loading").hide();
			// $('.c_changePin').html("<span style='color:red'>There is some
			// error. try again !</span>");
			toastr.error('There is some error. try again !');
		}
	});
}

function deleteAllStudent() {
	debugger;
	// if(($(".c_studentRecords").find("tr").length) == 0){
	if (confirm("You want to delete all students !")) {
		$(".loading").show();
		$.ajax({
			url : '/corporate/delete-all',
			type : 'POST',
			success : function(data) {
				debugger;
				$(".loading").hide();
				if (data.status == 'SUCCESS') {

					$('.c_studentsInfo').html("");
					toastr.success('Successfully removed !');
				} else
					toastr.error('there is some error please try again!.');

			},
			error : function(jqXHR, textStatus, errorThrown) {
				// alert("error:" + textStatus + " exception:" + errorThrown);
				$(".loading").hide();
				toastr.error('there is some error please try again!.');
			}
		});
	} else
		return false;

}

function edit_row(no) {
	document.getElementById("edit_button" + no).style.display = "none";
	document.getElementById("save_button" + no).style.display = "block";

	var sr = document.getElementById("sr_row" + no);
	var name = document.getElementById("name_row" + no);
	var email = document.getElementById("email_row" + no);
	var phone = document.getElementById("phone_row" + no);
	// var pin = document.getElementById("pin_row" + no);
	// var password = document.getElementById("password_row" + no);

	var sr_data = sr.innerHTML;
	var name_data = name.firstChild.data;
	;
	var email_data = email.firstChild.data;
	;
	var phone_data = phone.firstChild.data;
	;
	// var pin_data = pin.innerHTML;
	// var password_data = password.innerHTML;

	sr.innerHTML = "<input readonly type='text' id='sr_text" + no + "' value='"
			+ sr_data + "'>";
	name.innerHTML = "<input type='text' id='name_text" + no + "' value='"
			+ name_data + "'>";
	email.innerHTML = "<input readonly type='text' id='email_text" + no
			+ "' value='" + email_data + "' >";
	phone.innerHTML = "<input type='text' id='phone_text" + no + "' value='"
			+ phone_data
			+ "' maxlength='10' onkeypress='return isMobile(event)'>";
	// pin.innerHTML = "<input type='text' id='pin_text" + no + "' value='"
	// + pin_data + "'maxlength='6' onkeypress='return isMobile(event)'>";
	// password.innerHTML = "<input type='text' id='password_text" + no + "'
	// value='"
	// + password_data + "'>";
}

function save_row(no, info_id) {

	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	var sr_val = document.getElementById("sr_text" + no).value;
	var name_val = document.getElementById("name_text" + no).value;
	var email_val = document.getElementById("email_text" + no).value;
	var phone_val = document.getElementById("phone_text" + no).value;
	var pin_val = document.getElementById("pin_text" + no).value;
	var password_val = document.getElementById("password_text" + no).value;
	var l_map = {};

	l_map.name = name_val;
	l_map.phone = phone_val;
	l_map.email = email_val;
	l_map.pin = pin_val;
	l_map.password = password_val;
	l_map.info_id = info_id;
	$(".loading").show();
	$
			.ajax({
				url : '/corporate/update-candidate',
				type : 'POST',
				data : JSON.stringify(l_map),
				cache : false,
				async : true,
				contentType : "application/json; charset=UTF-8",
				dataType : 'json',
				success : function(data) {
					debugger;

					$(".loading").hide();
					if (data.status == 'SUCCESS') {
						document.getElementById("sr_row" + no).innerHTML = sr_val;
						document.getElementById("name_row" + no).innerHTML = name_val;
						document.getElementById("email_row" + no).innerHTML = email_val;
						document.getElementById("phone_row" + no).innerHTML = phone_val;
						document.getElementById("pin_row" + no).innerHTML = pin_val;
						document.getElementById("password_row" + no).innerHTML = password_val;

						document.getElementById("edit_button" + no).style.display = "block";
						document.getElementById("save_button" + no).style.display = "none";
						toastr.success('Successfully Updated');
					}
					if (data.status == 'ERROR') {
						toastr.error('There is some error. try again !');
					}

				},
				error : function(jqXHR, textStatus, errorThrown) {
					$(".loading").hide();
					toastr.error('There is some error. try again !');
				}
			});

}

function delete_row(infoId, email, row) {

	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	if (confirm("You want to delete candidate !")) {
		$(".loading").show();
		$.ajax({
			url : '/corporate/delete',
			data : {
				email : email,
				infoId : infoId
			},
			type : 'POST',
			success : function(data) {
				debugger;
				$(".loading").hide();
				if (data.status == 'SUCCESS') {
					toastr.success('Successfully removed !');
					location.reload();

				} else
					toastr.error('there is some error please try again!.');
			},
			error : function(jqXHR, textStatus, errorThrown) {
				// alert("error:" + textStatus + " exception:" + errorThrown);
				$(".loading").hide();
				toastr.error('there is some error please try again!.');
			}
		});
	} else
		return false;

}

function add_row() {
	var new_name = document.getElementById("new_name").value;
	var new_country = document.getElementById("new_country").value;
	var new_age = document.getElementById("new_age").value;

	var table = document.getElementById("data_table");
	var table_len = (table.rows.length) - 1;
	var row = table.insertRow(table_len).outerHTML = "<tr id='row"
			+ table_len
			+ "'><td id='name_row"
			+ table_len
			+ "'>"
			+ new_name
			+ "</td><td id='country_row"
			+ table_len
			+ "'>"
			+ new_country
			+ "</td><td id='age_row"
			+ table_len
			+ "'>"
			+ new_age
			+ "</td><td><input type='button' id='edit_button"
			+ table_len
			+ "' value='Edit' class='edit' onclick='edit_row("
			+ table_len
			+ ")'> <input type='button' id='save_button"
			+ table_len
			+ "' value='Save' class='save' onclick='save_row("
			+ table_len
			+ ")'> <input type='button' value='Delete' class='delete' onclick='delete_row("
			+ table_len + ")'></td></tr>";

	document.getElementById("new_name").value = "";
	document.getElementById("new_country").value = "";
	document.getElementById("new_age").value = "";
}

function getCustomFormURLs() {
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	// reset modal
	$(".loading").show();
	$
			.ajax({
				url : '/common/custom-form-urls',
				cache : false,
				async : true,
				contentType : "application/json; charset=UTF-8",
				dataType : 'json',
				type : 'POST',
				success : function(response) {
					debugger;
					$(".loading").hide();

					if (response.status == 'SUCCESS') {
						$("#i_url_container").html('');
						var l_html = "";
						var l_urls = response.object;
						$(".loading").hide();
						// alert(JSON.stringify(response.object));
						l_html += '<table class="table"> <thead><tr><th>Title</th><th>Link</th><th>Action</th></tr></thead><tbody>';
						for (var i = 0; i < l_urls.length; i++) {
							var b_url = l_urls[i];

							l_html += '<tr><td>'
									+ b_url[0]
									+ '</td><td><input style="outline: none;border: 0;" id="i_link_'
									+ i
									+ '" type="text" value="'
									+ b_url[1]
									+ '" readonly></td><td><button class="btn success" onclick="copyText(\'i_link_'
									+ i + '\')">Copy Link</button></td></tr>';

						}
						l_html += '</tbody></table>';

						$("#i_url_container").html(l_html);
						$('#viewURLs').modal('show');
						// $('#myModal').modal('hide');
						// toastr.success(response.message);
					}

					if (response.status == 'ERROR') {
						$(".loading").hide();
						toastr.error(response.message);
					}
				},
				error : function(err) {
					$(".loading").hide();
					toastr
							.error("we don't find proper input . Try again later!");
				}
			});
}

var search_indexes = [];
var indexes_checked = [];
var g_load_time = true;
var l_value = "";
var g_total_candidates = parseInt($('#totalCandidates').val());
$(document)
		.ready(
				function() {
					$('#search_candidates').keyup(function() {
						search_indexes = [];
						g_is_load_time = false;
						search_table($(this).val());
					});

					function search_table(value) {
						$('#i_candidate_list tr')
								.each(
										function() {
											var found = 'false';
											$(this)
													.each(
															function() {
																if ($(this)
																		.text()
																		.toLowerCase()
																		.indexOf(
																				value
																						.toLowerCase()) >= 0) {
																	found = 'true';
																}
															});
											if (found == 'true') {
												$(this).show();
												if ($("tr").index(this) != 0) {
													search_indexes.push($("tr")
															.index(this));
													g_load_time = false;
												}
												// alert($("tr").index(this));
											} else {
												if ($("tr").index(this) != 0) {
													$(this).hide();
												}
											}
										});
					}
				});
var l_is_active = false;
var l_is_inactive = false;
var l_is_view_result = false;
$('#i_actives').click(function() {
	debugger;

	if ($(this).is(':checked')) {
		l_is_active = true;
	} else {
		l_is_active = false;
	}
	searchCandidates();

});
$('#i_inactives').click(function() {

	if ($(this).is(':checked')) {
		l_is_inactive = true;
	} else {
		l_is_inactive = false;
	}
	searchCandidates();
});
$('#i_view_result').click(function() {

	if ($(this).is(':checked')) {
		l_is_view_result = true;
	} else {
		l_is_view_result = false;
	}
	searchCandidates();
});

function searchCandidates() {
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	var l_map = {};

	l_map.active = l_is_active;
	l_map.inActive = l_is_inactive;
	l_map.viewResult = l_is_view_result;
	l_map.packageId = $('#i_g_package_id').val();
	l_map.examId = $('#i_g_exam_id').val();
	// ajaxPostCall("/common/search-candidates",JSON.stringify(l_map),"p_successSearch","p_errorSearch");

	$(".loading").show();
	$
			.ajax({
				url : '/common/search-candidates',
				cache : false,
				async : true,
				contentType : "application/json; charset=UTF-8",
				dataType : 'json',
				data : JSON.stringify(l_map),
				type : 'POST',
				success : function(response) {
					debugger;
					$('#i_candidate_body').html("");
					if (response.status == "SUCCESS") {
						g_load_time = false;
						search_indexes = [];
						$('#i_check_all').attr('checked', false);
						var l_html = "";
						var l_map = {};
						var l_data_list = response.object;
						for (var i = 0; i < l_data_list.length; i++) {
							search_indexes.push(i + 1);
							l_map = l_data_list[i];
							l_html += "<tr index='" + (i + 1) + "' id='row"
									+ (i + 1) + "'>";
							l_html += "<td id='sr_check" + (i + 1)
									+ "'><input type='checkbox' id='check"
									+ (i + 1)
									+ "'  onclick='checkIndividual(\"check"
									+ (i + 1) + "\",\"" + (i + 1)
									+ "\")'></td>";
							l_html += "<td id='sr_row" + (i + 1) + "'>"
									+ (i + 1) + "</td>";
							l_html += "<td id='name_row" + (i + 1) + "'>"
									+ l_map.candidateName + "</td>";
							l_html += "<td id='email_row" + (i + 1) + "'>"
									+ l_map.candidateId
									+ "<input id='candidate" + (i + 1)
									+ "' type='hidden' value='"
									+ l_map.candidateId + "'></td>";
							l_html += "<td id='phone_row" + (i + 1) + "'>"
									+ l_map.candidateMobile + "</td>";
							l_html += "<td class='c_generate_pin" + (i + 1)
									+ "'>";
							if (l_map.pin == null) {
								l_html += "<button class='c_pin_action' onclick='candidateActions('"
										+ $('#i_g_package_id').val()
										+ "','"
										+ $('#i_g_exam_id').val()
										+ "','"
										+ l_map.candidateId
										+ "','"
										+ (i + 1)
										+ "','pin','status')' class='btn btn-primary' >generate Pin</button></td>";
							}
							if (l_map.pin != null) {
								l_html += l_map.pin;
							}
							l_html += "</td>";
							if (l_map.password == null) {
								l_html += "<button class='c_password_action' onclick='candidateActions('"
										+ $('#i_g_package_id').val()
										+ "','"
										+ $('#i_g_exam_id').val()
										+ "','"
										+ l_map.candidateId
										+ "','"
										+ (i + 1)
										+ "','password','status')' class='btn btn-primary'>generate Password</button>";
							}
							if (l_map.password == null) {
								l_html += l_map.password;
							}
							l_html += "</td>";
							l_html += "<td style='display:flex;'>";
							if (l_map.examStatus == 'COMPLETED') {
								l_html += "<input type='hidden' id='c"
										+ (i + 1) + "' value='COMPLETED'>";
								l_html += "<form  id='get_result'  action='../../corporate/exam-report'  method='post'>";
								l_html += "<input name='examId' type='hidden' value='"
										+ $('#i_g_exam_id').val() + "'/>";
								l_html += "<input name='packageId' type='hidden' value='"
										+ $('#i_g_package_id').val() + "'/>";

								l_html += "<button type='submit' class='btnstlish btn-3 btn-3e fa fa-arrow-right'>View Result</button>";
								l_html += "</form>";
							}
							if (l_map.examStatus != 'COMPLETED') {
								l_html += "<input type='hidden' id='c"
										+ (i + 1) + "' value='NOT_COMPLETED'>";
								l_html += "<span class='checkbox' id='check_button"
										+ (i + 1)
										+ "' style='margin:0px 2px;'>";
								if (l_map.status == 'ACTIVE') {
									l_html += "<input type='checkbox' checked onclick='candidateActions(\""
											+ $('#i_g_package_id').val()
											+ "\",\""
											+ $('#i_g_exam_id').val()
											+ "\",\""
											+ l_map.candidateId
											+ "\",\""
											+ (i + 1)
											+ "\",\"status\",\""
											+ l_map.status
											+ "\")'>";
								} else {
									l_html += "<input type='checkbox' onclick='candidateActions(\""
											+ $('#i_g_package_id').val()
											+ "\",\""
											+ $('#i_g_exam_id').val()
											+ "\",\""
											+ l_map.candidateId
											+ "\",\""
											+ (i + 1)
											+ "\",\"status\",\""
											+ l_map.status
											+ "\")'>";
								}
								l_html += "<label data-on='ACTIVE' data-off='INACTIVE' style='padding-left: 0px;'></label>";
								l_html += "</span>";

								l_html += "<button id='edit_button"
										+ (i + 1)
										+ "' onclick='candidateActions(\""
										+ $('#i_g_package_id').val()
										+ "\",\""
										+ $('#i_g_exam_id').val()
										+ "\",\""
										+ l_map.candidateId
										+ "\",\""
										+ (i + 1)
										+ "\",\"edit\")' class='btn btn-sm btn-primary' style='margin:0px 2px;'><span class='glyphicon glyphicon-pencil'></span></button>";
								l_html += "<button type='button' style='display:none' id='save_button"
										+ (i + 1)
										+ "'   class='btn btn-success save' onclick='candidateActions(\""
										+ $('#i_g_package_id').val()
										+ "\",\""
										+ $('#i_g_exam_id').val()
										+ "\",\""
										+ l_map.candidateId
										+ "\",\""
										+ (i + 1)
										+ "\",\"save\")' style='margin:0px 2px;'><span class='glyphicon glyphicon-ok'></span></button>";
								l_html += "<button onclick='candidateActions(\""
										+ $('#i_g_package_id').val()
										+ "\",\""
										+ $('#i_g_exam_id').val()
										+ "\",\""
										+ l_map.candidateId
										+ "\",\""
										+ (i + 1)
										+ "\",\"delete\",\"status\")'  class='btn btn-sm btn-danger' style='margin:0px 2px;'><span class='glyphicon glyphicon-trash'></span></button>";
							}
							l_html += "</td>";
							l_html += "</tr>";
							$('#i_candidate_body').append(l_html);
							l_html = "";
						}
						$(".loading").hide();
					}
					if (response.status == "ERROR") {
						$(".loading").hide();
						toastr.error(response.message);
					}
				},
				error : function(err) {
					$(".loading").hide();
					toastr
							.error("we don't find proper input . Try again later!");
				}
			});

}

$(function() {
	$('#i_check_all').click(function() {
		if (g_load_time) {
			// start if
			if ($(this).is(':checked')) {
				indexes_checked = [];
				for (var i = 1; i < g_total_candidates; i++) {
					if ($('#c' + i).val() == 'NOT_COMPLETED') {

						$('#check' + i).attr('checked', true);
						indexes_checked.push(i);
					}
				}
			} else {
				for (var i = 1; i < g_total_candidates; i++) {

					$('#check' + i).attr('checked', false);
					indexes_checked = [];
				}
			}
			// end if with else
		} else {
			if ($(this).is(':checked')) {
				indexes_checked = [];
				for (var i = 0; i < search_indexes.length; i++) {
					if ($('#c' + (i + 1)).val() == 'NOT_COMPLETED') {

						var element = search_indexes[i];
						$('#check' + element).attr('checked', true);
						indexes_checked.push(element);
					}
				}
			} else {
				for (var i = 0; i < search_indexes.length; i++) {
					var element = search_indexes[i];
					$('#check' + element).attr('checked', false);

				}
				indexes_checked = [];
			}
		}
	});

});

function checkIndividual(p_id, p_index) {
	debugger;

	var checkBox = document.getElementById(p_id);
	if ($('#c' + p_index).val() == 'COMPLETED') {
		$('#' + p_id).attr('checked', false);
		toastr.error("Action are not allow for this record.");
		return;
	}
	if (checkBox.checked == true) {
		indexes_checked.push(parseInt(p_index));
	} else {
		for (var i = 0; i < indexes_checked.length; i++) {
			var element = indexes_checked[i];
			if (element == parseInt(p_index)) {
				delete indexes_checked[i];
			}
		}
	}

}

function bulkCandidateActions(p_action_type) {

	debugger;

	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	var l_map = {};
	var l_final_map = {};
	if (indexes_checked.length == 0) {
		toastr.error('There is no record select to action.');
		return false;
	}
	if (confirm("Are you sure for this action ?")) {
		for (var i = 0; i < indexes_checked.length; i++) {
			var element = indexes_checked[i];
			if (p_action_type == 'EMAIL' || p_action_type == 'SMS') {
				var l_map_row = {};

				l_map_row.candidateId = $('#candidate_id' + element).val();
				l_map_row.name = $('#candidate_name' + element).val();
				l_map_row.mobile = $('#candidate_mobile' + element).val();
				l_map_row.pin = $('#candidate_pin' + element).val();
				l_map_row.password = $('#candidate_password' + element).val();
				l_map['key' + i] = l_map_row;
				l_map_row = {};
			} else {

				l_map['key' + i] = $('#candidate_id' + element).val();
			}
		}

		l_final_map.actionType = p_action_type;
		l_final_map.packageId = $('#i_g_package_id').val();
		l_final_map.examId = $('#i_g_exam_id').val();
		l_final_map.examName = $('#i_exam_name').val();
		l_final_map.inputs = l_map;

		//alert(JSON.stringify(l_final_map));
		$(".loading").show();
		$
				.ajax({
					url : '/common/bulk-actions',
					cache : false,
					async : true,
					contentType : "application/json; charset=UTF-8",
					dataType : 'json',
					data : JSON.stringify(l_final_map),
					type : 'POST',
					success : function(response) {
						debugger;
						if (response.status == "SUCCESS") {
							toastr.success(response.message);
							location.reload();
							$(".loading").hide();
						}
						if (response.status == "ERROR") {
							$(".loading").hide();
							toastr.error(response.message);
						}
					},
					error : function(err) {
						$(".loading").hide();
						toastr
								.error("we did not find proper input . Try again later!");
					}
				});
	}
}

/*
 * function callPagination(p_no_of_pages) { debugger; window.pagObj =
 * $('#pagination').twbsPagination({ totalPages: p_no_of_pages, visiblePages:
 * 10, onPageClick: function (event, page) { console.info(page + ' (from
 * options)'); } }).on('page', function (event, page) { console.info(page + '
 * (from event listening)'); searchByPagination(page);
 * 
 * }); }
 */

