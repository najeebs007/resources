/**
 * 
 */

function programEnroll(programId,isGroup,isCustomForm,cartId,isFreeForStudent){debugger;
	
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	
		
		var l_map = {};
		if(isGroup){
			if($('.i_program_groups').val()==''){
				$('.c_program_error').text("Please select Group.");
				setTimeout(function(){ $('.c_program_error').text(""); }, 3000);
				return;
			}
			l_map.groupId = $('.i_program_groups').val();
		}
		if(isCustomForm){
			if(validateForm('i_program_student_registration','c_program_error'))
		       l_map = readForm('i_program_student_registration');
			else
				return
		}
		l_map.programId = programId;
		l_map.isFreeForStudent = isFreeForStudent;
		
		//alert(JSON.stringify(l_map));
		ajaxWithJSON("/student/enroll-sepaas-program", l_map, 'POST', function(response) {
		    //alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				if(isFreeForStudent){
					toastr.success(response.message);
					$('#programGroupList').modal('hide');
					location.reload();
				}else{
					$('#programGroupList').modal('hide');
				 buyNowCart(cartId,programId,'PROGRAM');
				}
				
			}
			if (response.status == 'ERROR') {
				toastr.error(response.message);
			}
		});
	
}
function enroll(cartId,programId,isFreeForStudent){
	var l_map={};
	if(!($('#i_program_terms').prop('checked'))){
		toastr.error("Please Accept Terms And Conditions.");
		return;
	}
	ajaxWithJSON("/student/enroll-sepaas-program", l_map, 'POST', function(response) {
	   // alert(JSON.stringify(response));
		if (response.status == 'SUCCESS') {
			if(isFreeForStudent){
				toastr.success(response.message);
				$('#programGroupList').modal('hide');
				location.reload();
			}else{
				$('#programGroupList').modal('show');
				buyNowCart(cartId,programId,'PROGRAM');
				//addToCart(cartId,programId,'PROGRAM');
			}
			
		}
		if (response.status == 'ERROR') {
			toastr.error(response.message);
		}
	});
}

function programUtilInfo(programId,subscriptionId){debugger;
	
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
		var l_map = {};
		if(subscriptionId=='none')
			subscriptionId = '';
		
		l_map.programId = programId;
		l_map.subscriptionId = subscriptionId;
		ajaxWithJSON("/student/program-util-info", l_map, 'POST', function(response) {
		   // alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				var data = response.object;
				var item_list = data.howToCalculate;
				var html = '';
				$('.c_enrollmentFees').text(parseFloat(data.enrollmentFee).toFixed(2));
				$('.c_registered_students').text(data.registeredStudents);
				for(var i=0;i<item_list.length;i++){
					var data_map = item_list[i];
					html+='<tr><td align="left" style="padding: 0px 10px;">'+data_map.subscriptionItemName+'</td><td align="right" style="padding: 0px 10px 0px 0px;">'+parseFloat(data_map.amount).toFixed(2)+'</td></tr>';
					
				}
				$('.c_fee_calculated').html(html);
				
			}
			if (response.status == 'ERROR') {
				//toastr.error(response.message);
				console.log(response.message);
			}
		});
	
}
var g_program_exams = [];
function loadProgramExams(programId){debugger;
	
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
		var l_map = {};
		
		l_map.programId =programId;
		
		ajaxWithJSON("/common/load-program-exam-detail", l_map, 'POST', function(response) {
		   // alert(JSON.stringify(response));
			var data = [];
		    var html = '';
		    var html2 = '';
			if (response.status == 'SUCCESS') {
				data = response.object;
				g_program_exams = data;
				for(var i=0;i<data.length;i++){
					var data_map = data[i];
					html+='<li class="">';
					html+='<div class="part">'; 
					html+='<div class="card exam-card">';
					html+='<div class="card-body card-body-padding-exam-card">';
					html+='<div class="row rw">'; 
					html+='<div class="col-sm-12 col-md-12 col-lg-12">';
					html+='<div class="">';	 
					html+='<span class="exam-name s-font">Exam Name: <strong style="color:#525c65;">'+data_map.examTitle+'</strong></span>'; 
					html+='</div>';
					html+='</div>'; 
					html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-5">'; 
					html+='<div class="">';	 
					html+='<span class="exam-name s-font">Exam Start date: <strong style="color:#525c65;">'+data_map.examStartDateStr+'</strong></span>'; 
					html+='</div>';
					html+='</div>';
					html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-5">'; 
					html+='<div class="">';	 
					html+='<span class="exam-name s-font">Exam End date: <strong style="color:#525c65;">'+data_map.examEndDateStr+'</strong></span>'; 
					html+='</div>';
					html+='</div>';
					
					html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10">'; 
					if(data_map.minPercentagetoPass == null || data_map.minPercentagetoPass == undefined)
						 html+='<span class="program-text-normal s-font"></span>';
					else
						html+='<span class="exam-name s-font">Min Percentage To Pass: <strong style="color:#525c65;">'+data_map.minPercentagetoPass+'</strong></span>';
					html+='</div>';
					html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10">'; 
					if(data_map.maxPercentagetoPass == null || data_map.maxPercentagetoPass == undefined)
						 html+='<span class="program-text-normal s-font"></span>';
					else
						html+='<span class="exam-name s-font">Max Percentage To Pass: <strong style="color:#525c65;">'+data_map.maxPercentagetoPass+'</strong></span>';
					html+='</div>';
					html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10">'; 
					if(data_map.numberOfAttemptsAllowed == null || data_map.numberOfAttemptsAllowed == undefined)
						 html+='<span class="program-text-normal s-font"></span>';
					else
						html+='<span class="exam-name s-font">Max Percentage To Pass: <strong style="color:#525c65;">'+data_map.numberOfAttemptsAllowed+'</strong></span>';
					html+='</div>';
					html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10">'; 
					if(data_map.examDescription == null || data_map.examDescription == undefined)
						 html+='<span class="program-text-normal s-font"></span>';
					else
					  html+='<span class="program-text-normal s-font">'+data_map.examDescription+'</span>';
					html+='</div>'; 
					html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10 center">'; 
					var examStart = new Date(data_map.examStartDate);
					var today = new Date();
					var compared = dates.compare(today,examStart);
					if(compared>=0)
					 html+='<a href="http://exam.koescore.com.com"><button type="button" class="btn btn-primary">Take Test</button></a>';
					else
						html+='<button type="button" class="btn btn-primary" title="Exam will be unlock on '+data_map.examStartDateStr+'" style="cursor: no-drop;">Take Test</button>';
					html+='<a onclick="loadSyllabus(\''+data_map.identifier+'\','+i+','+data.length+')" style="cursor:pointer;color:#2196f3;margin-left: 10px;"><u>View Syllabus</u></a>';
					html+='</div>';
					html+='</div>';
					html+='</div>';	 
					html+='</div>';
				 
					html+='<div  class="sylbs-details bind_syllabus'+i+'">';
					html+='</div>';
					 
					html+='</div>';
					html+='</li>';
					html2+='<option value="'+data_map.examId+'">'+data_map.examTitle+'</option>';
					
				}
				$('.c_program_exams').html(html);
				$('.c_exam_dropdown').html('<option value="">Select Exam</option>'+html2);
				
			}
			if (response.status == 'ERROR') {
				//toastr.error(response.message);
				console.log(response.message);
			}
		});
	
}

function toDate(dateStr) {
	  const [day, month, year] = dateStr.split(" ")
	  return new Date(year, month - 1, day)
}

function loadProgramSponsors(programId,sponsorsAllowed){debugger;
	
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
		var l_map = {};
		
		l_map.programId = programId;
		if(sponsorsAllowed){
		ajaxWithJSON("/common/get-sponsors", l_map, 'POST', function(response) {
		    //alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				var data = response.object;
				var powered = data.powered;
				var coPowered = data.co-powered;
				var html='';
				if(powered.length>0){
					html+='<div class="row">';
					html+='<div class="col-md-12">';
					html+='<div class="card card-customize b-radius-5">';
					html+='<div class="card-body">';
					html+='<div class="volunteer-block center">';
					html+='<div class="row">';
				    html+='<div class="col-sm-12 col-md-12 col-lg-12"> <span class="f-size-medium s-font c-primary">Powered by (<strong>sponsors</strong>) </span> </div><div class="sponsor-carousel ">';
				}                           
				for(var i=0;i<powered.length;i++){
					html+='<article class="m-t-30">';
                    html+='<div class="sponsor-block"><img src="'+powered[0]+'"></div>';   
                    html+='</article>';
				}
				if(powered.length>0){
					html+='</div>';
					html+=' </div>';
					html+=' </div>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
				}
	                 
				$('.c_sponsor_logo').html(html);
				html = '';
				if(coPowered.length>0){
					html+='<div class="row">';
					html+='<div class="col-md-12">';
					html+='<div class="card card-customize b-radius-5">';
					html+='<div class="card-body">';
					html+='<div class="volunteer-block center">';
					html+='<div class="row">';
					html+='<div class="col-sm-12 col-md-12 col-lg-12"> <span class="f-size-medium s-font c-primary">Co-Powered by (<strong>sponsors</strong>) </span> </div><div class="sponsor-carousel">';
				}
				for(var i=0;i<coPowered.length;i++){
					html+='<article class="m-t-30">';
                    html+='<div class="sponsor-block"><img src="'+coPowered[0]+'"></div>';   
                    html+='</article>';
				}
				if(coPowered.length>0){
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
				}
				$('.c_co-sponsor_logo').html(html);
			}
			if (response.status == 'ERROR') {
				toastr.error(response.message);
			}
		});
		}
	
}
function loadProgramVolunteers(programId,volunteerAllow){debugger;
	
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
		var l_map = {};
		
		l_map.programId = programId;
		if(volunteerAllow){
		ajaxWithJSON("/common/get-volunteers", l_map, 'POST', function(response) {
		   // alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				var data = response.object;
				var html ='';
				if(data.length>0){
					html+='<div class="row">';
					html+='<div class="col-md-12">';
					html+='<div class="card card-customize b-radius-5">';
					html+='<div class="card-body">';
					html+='<div class="volunteer-block center">';
					html+='<div class="row c_volunteers">';
					html+='<div class="col-sm-12 col-md-12 col-lg-12"> <span class="f-size-medium s-font c-primary">Our <strong>Volunteers</strong> </span> </div> <div class="blog-carousel main ">';
                
				}
                 
				for(var i=0;i<data.length;i++){
					var row = data[i];
					html+='<article class="m-t-30 jQueryEqualHeightD">';
					html+='<div class="card volunteer-card">';
					html+='<div class="card-body card-body-padding-volunteer">';
					html+='<div class="row rw">';
					html+='<div class="w-100 eql-name center">';
					html+='<div class="col-sm-12 col-md-12 col-lg-12"> <span class="volunteer-name s-font">'+row[0]+'</span> </div>';
					html+='</div>';
					html+='<div class="w-100 eql-desig center">';
					html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-5"> <span class="volunteer-designation s-font"></span> </div>';
					html+='</div>';
					html+='<div class="w-100 eql-detail center">';
					html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-15"> <span class="program-text-normal s-font">'+row[3]+'</span> ';                                                                   
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='</article>';
				}
				if(data.length>0){
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
				}
                
				$('.c_volunteers').html(html);
			}
			if (response.status == 'ERROR') {
				toastr.error(response.message);
			}
		});
		}
}

function loadProgramStudents(programId,from,to){debugger;

if (!(navigator.onLine)) {
	toastr.error('You are offline. please check internet connection.');
	return;
}
	var l_map = {};
	
	l_map.programId = programId;
	l_map.from = from;
	l_map.to = to;
	ajaxWithJSON("/common/load-program-registered-students", l_map, 'POST', function(response) {
	   // alert(JSON.stringify(response));
		if (response.status == 'SUCCESS') {
			var data = response.object;
			var html ='';
			for(var i=0;i<data.length;i++){
				var b_students = data[i];
				html+='<div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">';
				html+='<div class="card b-radius-5">';
				html+='<div class="card-body padding-5">';
				html+='<div class="row">';
				html+='<div class="col-sm-3 col-md-3 col-lg-3 center">';
				html+='<div class="img-icon"> <img src="../../resources/img/profile-img/pro.jpg" alt="icon" class="p-img"> </div>'; 
				html+='</div>';
				html+='<div class="col-sm-9 col-md-9 col-lg-9 pro-right-padding-left">';
				html+='<div class="row">';
				html+='<div class="col-sm-12 col-md-12 col-lg-12">';
				html+='<h6 class="pro-heading-m s-font font-12" style="margin-top: 2px;margin-bottom:2px;font-weight: 600;"> '+b_students[0]+'</h6>';
				html+='</div>';
				html+='<div class="col-sm-12 col-md-12 col-lg-12">';
				html+='<h6 class="pro-heading-m s-font font-12" style="margin-top: 2px;margin-bottom:2px;font-weight: 600;">Reg date: '+b_students[1]+'</h6>';
				html+='</div>'; 
				html+='</div>';  
				html+='</div>'; 
				html+='</div>';
				html+='</div>';
				html+='</div>';
				html+='</div>';
				if(data.length>4){
				html+='<div class="col-md-12 center"><button type="button" class="btn btn-primary" onclick="loadProgramStudents(\''+programId+'\','+from+5+',5)">Next</button> </div>';
				}
			}
			$('.c_program_students').html(html);
		}
		if (response.status == 'ERROR') {
			toastr.error(response.message);
		}
	});
	
}
var g_programGroups = [];
function programGroups(p_programId){debugger;
	
	var l_map = {};
	$('#i_program_groups').html('');
	l_map.programId = p_programId;
	ajaxWithJSON("/common/load-program-groups", l_map, 'POST', function(response) {
	   // alert(JSON.stringify(response));
		if (response.status == 'SUCCESS') {
			
			var data = response.object;
			g_programGroups = data;
			var other = response.other;
			var html = '<option value="">Select Group</option>';
			var isDisableGroup = false;
			for(var i=0;i<data.length;i++){
				var group = data[i];
				if(!(other==null || other==undefined)){
					if(other==group.groupId){
						isDisableGroup = true;
				      html+="<option selected value='"+group.groupId+"'>"+group.groupName+"</option>";
				      var html2 = '';
				      for(var i=0;i<g_program_exams.length;i++){
							var data_map = g_program_exams[i];
							if(data_map.groupId==other){
								html2+='<li class="">';
								html2+='<div class="part">'; 
								html2+='<div class="card exam-card">';
								html2+='<div class="card-body card-body-padding-exam-card">';
								html2+='<div class="row rw">'; 
								html2+='<div class="col-sm-12 col-md-12 col-lg-12">';
								html2+='<div class="">';	 
								html2+='<span class="exam-name s-font">Exam Name: <strong style="color:#525c65;">'+data_map.examTitle+'</strong></span>'; 
								html2+='</div>';
								html2+='</div>'; 
								html2+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-5">'; 
								html2+='<div class="">';	 
								html2+='<span class="exam-name s-font">Exam Start date: <strong style="color:#525c65;">'+data_map.examStartDateStr+'</strong></span>'; 
								html2+='</div>';
								html2+='</div>';  
								html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10">'; 
								if(data_map.minPercentagetoPass == null || data_map.minPercentagetoPass == undefined)
									 html+='<span class="program-text-normal s-font"></span>';
								else
									html+='<span class="exam-name s-font">Min Percentage To Pass: <strong style="color:#525c65;">'+data_map.minPercentagetoPass+'</strong></span>';
								html+='</div>';
								html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10">'; 
								if(data_map.maxPercentagetoPass == null || data_map.maxPercentagetoPass == undefined)
									 html+='<span class="program-text-normal s-font"></span>';
								else
									html+='<span class="exam-name s-font">Max Percentage To Pass: <strong style="color:#525c65;">'+data_map.maxPercentagetoPass+'</strong></span>';
								html+='</div>';
								html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10">'; 
								if(data_map.numberOfAttemptsAllowed == null || data_map.numberOfAttemptsAllowed == undefined)
									 html+='<span class="program-text-normal s-font"></span>';
								else
									html+='<span class="exam-name s-font">Max Percentage To Pass: <strong style="color:#525c65;">'+data_map.numberOfAttemptsAllowed+'</strong></span>';
								html+='</div>';
								html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10">'; 
								if(data_map.examDescription == null || data_map.examDescription == undefined)
									 html+='<span class="program-text-normal s-font"></span>';
								else
								  html+='<span class="program-text-normal s-font">'+data_map.examDescription+'</span>';
								html+='</div>';  
							html2+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10 center">'; 
							var examStart = new Date(data_map.examStartDate);
							var today = new Date();
							var compared = dates.compare(today,examStart);
							if(compared>=0)
								html2+='<a href="http://exam.koescore.com.com"><button type="button" class="btn btn-primary">Take Test</button></a>';
							else
								html2+='<button type="button" class="btn btn-primary" title="Exam will be unlock on '+data_map.examStartDateStr+'" style="cursor: no-drop;">Take Test</button>';
							html2+='<a onclick="loadSyllabus(\''+data_map.identifier+'\','+i+','+g_program_exams.length+')" style="cursor:pointer;color:#2196f3;margin-left: 10px;"><u>View Syllabus</u></a>';
							html2+='</div>';
							html2+='</div>';
							html2+='</div>';	 
							html2+='</div>';
						 
							html2+='<div  class="sylbs-details bind_syllabus'+i+'">';
							html2+='</div>';
							 
							html2+='</div>';
							html2+='</li>';
							}
							$('.c_program_exams').html(html2);
						
						}
					}
					else
						html+="<option value='"+group.groupId+"'>"+group.groupName+"</option>";
				}else
					html+="<option value='"+group.groupId+"'>"+group.groupName+"</option>";
			}
			html+="<option value='ALL'>ALL</option>";
			$('#userProgramGroupList').html(html);
			
			if(isDisableGroup)
				$('#userProgramGroupList').prop('disabled', true);
			
		}
		if (response.status == 'ERROR') {
			toastr.error(response.message);
		}
	});
}
function loadProgramGroups(programId){
	
	if(!($('#i_program_terms').prop('checked'))){
		toastr.error("Please Accept Terms And Conditions.");
		return;
	}
	var l_map = {};
	$('#i_program_groups').html('');
	l_map.programId = programId;
			var data = g_programGroups;
			var html = '<option value="">Select Group</option>';
			
			for(var i=0;i<data.length;i++){
				var group = data[i];
				html+="<option value='"+group.groupId+"'>"+group.groupName+"</option>";
			}
			
			$('#programGroupList').modal('show');
			$('#i_program_groups').html(html);
	
}

function showCustomForm(){
	if(!($('#i_program_terms').prop('checked'))){
		toastr.error("Please Accept Terms And Conditions.");
		return;
	}
	$('#programGroupList').modal('show');
}

function loadSyllabus(p_program_exam_series_id ,index,size){
	var l_map = {};
	l_map.seriesId = p_program_exam_series_id;
	ajaxWithJSON("/common/load-program-exam-syllabus", l_map, 'POST', function(response) {
		   //alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				var data = response.object;
				var syllabus = data.whatToPrepare;
				for(var i=0;i<size;i++){
					$('.bind_syllabus'+i).html('');
				}
				$('.bind_syllabus'+index).html(syllabus);
				setTimeout(function(){ $('#i_program_exam_group').html(''); }, (3000*20)*30);
			}
			if (response.status == 'ERROR') {
				toastr.error(response.message);
			}
		});
		}

function selectExamGroupWise(){debugger;
	var selectedGroup = '';
	var html = '';
	if($('#userProgramGroupList').val()==''){
		toastr.error('No group selected.');
		return;
	}
	selectedGroup = $('#userProgramGroupList').val();
	for(var i=0;i<g_program_exams.length;i++){
		var data_map = g_program_exams[i];
		if(data_map.groupId==selectedGroup){
		html+='<li class="">';
		html+='<div class="part">'; 
		html+='<div class="card exam-card">';
		html+='<div class="card-body card-body-padding-exam-card">';
		html+='<div class="row rw">'; 
		html+='<div class="col-sm-12 col-md-12 col-lg-12">';
		html+='<div class="">';	 
		html+='<span class="exam-name s-font">Exam Name: <strong style="color:#525c65;">'+data_map.examTitle+'</strong></span>'; 
		html+='</div>';
		html+='</div>'; 
		html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-5">'; 
		html+='<div class="">';	 
		html+='<span class="exam-name s-font">Exam Start date: <strong style="color:#525c65;">'+data_map.examStartDateStr+'</strong></span>'; 
		html+='</div>';
		html+='</div>';  
		html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10">'; 
		if(data_map.minPercentagetoPass == null || data_map.minPercentagetoPass == undefined)
			 html+='<span class="program-text-normal s-font"></span>';
		else
			html+='<span class="exam-name s-font">Min Percentage To Pass: <strong style="color:#525c65;">'+data_map.minPercentagetoPass+'</strong></span>';
		html+='</div>';
		html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10">'; 
		if(data_map.maxPercentagetoPass == null || data_map.maxPercentagetoPass == undefined)
			 html+='<span class="program-text-normal s-font"></span>';
		else
			html+='<span class="exam-name s-font">Max Percentage To Pass: <strong style="color:#525c65;">'+data_map.maxPercentagetoPass+'</strong></span>';
		html+='</div>';
		html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10">'; 
		if(data_map.numberOfAttemptsAllowed == null || data_map.numberOfAttemptsAllowed == undefined)
			 html+='<span class="program-text-normal s-font"></span>';
		else
			html+='<span class="exam-name s-font">Max Percentage To Pass: <strong style="color:#525c65;">'+data_map.numberOfAttemptsAllowed+'</strong></span>';
		html+='</div>';
		html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10">'; 
		if(data_map.examDescription == null || data_map.examDescription == undefined)
			 html+='<span class="program-text-normal s-font"></span>';
		else
		  html+='<span class="program-text-normal s-font">'+data_map.examDescription+'</span>';
		html+='</div>'; 
		html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10 center">'; 
		var examStart = new Date(data_map.examStartDate);
		var today = new Date();
		var compared = dates.compare(today,examStart);
		if(compared>=0)
		 html+='<a href="http://exam.koescore.com.com"><button type="button" class="btn btn-primary">Take Test</button></a>';
		else
			html+='<button type="button" class="btn btn-primary" title="Exam will be unlock on '+data_map.examStartDateStr+'" style="cursor: no-drop;">Take Test</button>';
		html+='<a onclick="loadSyllabus(\''+data_map.identifier+'\','+i+','+g_program_exams.length+')" style="cursor:pointer;color:#2196f3;margin-left: 10px;"><u>View Syllabus</u></a>';
		html+='</div>';
		html+='</div>';
		html+='</div>';	 
		html+='</div>';
	 
		html+='<div  class="sylbs-details bind_syllabus'+i+'">';
		html+='</div>';
		 
		html+='</div>';
		html+='</li>';
		
		}
		
	}
	if(selectedGroup=='ALL'){
		
		for(var i=0;i<g_program_exams.length;i++){
			var data_map = g_program_exams[i];
			
			html+='<li class="">';
			html+='<div class="part">'; 
			html+='<div class="card exam-card">';
			html+='<div class="card-body card-body-padding-exam-card">';
			html+='<div class="row rw">'; 
			html+='<div class="col-sm-12 col-md-12 col-lg-12">';
			html+='<div class="">';	 
			html+='<span class="exam-name s-font">Exam Name: <strong style="color:#525c65;">'+data_map.examTitle+'</strong></span>'; 
			html+='</div>';
			html+='</div>'; 
			html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-5">'; 
			html+='<div class="">';	 
			html+='<span class="exam-name s-font">Exam Start date: <strong style="color:#525c65;">'+data_map.examStartDateStr+'</strong></span>'; 
			html+='</div>';
			html+='</div>';  
			html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10">'; 
			if(data_map.examDescription == null || data_map.examDescription == undefined)
				 html+='<span class="program-text-normal s-font"></span>';
			else
			  html+='<span class="program-text-normal s-font">'+data_map.examDescription+'</span>';
			html+='</div>'; 
			html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10 center">'; 
			var examStart = new Date(data_map.examStartDate);
			var today = new Date();
			var compared = dates.compare(today,examStart);
			if(compared>=0)
			 html+='<a href="http://exam.koescore.com.com"><button type="button" class="btn btn-primary">Take Test</button></a>';
			else
				html+='<button type="button" class="btn btn-primary" title="Exam will be unlock on '+data_map.examStartDateStr+'" style="cursor: no-drop;">Take Test</button>';
			html+='<a onclick="loadSyllabus(\''+data_map.identifier+'\','+i+','+g_program_exams.length+')" style="cursor:pointer;color:#2196f3;margin-left: 10px;"><u>View Syllabus</u></a>';
			html+='</div>';
			html+='</div>';
			html+='</div>';	 
			html+='</div>';
		 
			html+='<div  class="sylbs-details bind_syllabus'+i+'">';
			html+='</div>';
			 
			html+='</div>';
			html+='</li>';
			
		
		}
	}
	$('.c_program_exams').html(html);
	
}

function loadMeritList(p_programId,from,size){
	
	if($('.c_exam_dropdown').val()==''){
		toastr.error('No Exam Selected.');
		return;
	}
	var l_map = {};
	l_map.programId = p_programId;
	l_map.examId = $('.c_exam_dropdown').val();
	l_map.from = from;
	l_map.size = size;
	ajaxWithJSON("/common/load-merit-list", l_map, 'POST', function(response) {
		   //alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				var html = '';
				var data = response.object;
				for(var i=0;i<data.length;i++){
					var b_students_rank = data[i];
					html+='<div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">';
					html+='<div class="card b-radius-5">';
					html+='<div class="card-body padding-5">';
					html+='<div class="row">';
					html+='<div class="col-sm-3 col-md-3 col-lg-3 center">';
					html+='<div class="img-icon"> <img src="../../resources/img/profile-img/pro.jpg" alt="icon" class="p-img"> </div>'; 
					html+='</div>';
					html+='<div class="col-sm-9 col-md-9 col-lg-9 pro-right-padding-left">';
					html+='<div class="row">';
					html+='<div class="col-sm-12 col-md-12 col-lg-12">';
					html+='<h6 class="pro-heading-m s-font font-12" style="margin-top: 2px;margin-bottom:2px;font-weight: 600;">'+b_students_rank[0]+'</h6>';
					html+='</div>';
					html+='<div class="col-sm-12 col-md-12 col-lg-12">';
					html+='<h6 class="pro-heading-m s-font font-12" style="margin-top: 2px;margin-bottom:2px;font-weight: 600;">Rank: '+b_students_rank[1]+'</h6>';
					html+='</div>'; 
					html+='</div>';  
					html+='</div>'; 
					html+='</div>';  
					html+='</div>';
					html+='</div>';
					html+='</div>';
					if(data.length>4){
					html+='<div class="col-md-12 center"><button type="button" class="btn btn-primary" onclick="loadProgramStudents(\''+p_programId+'\','+from+5+',5)">Next</button> </div>';
					}
				}
				if(data.length==0)
					toastr.error('No rank found.');
				$('.c_program_exam_rank').html(html);
			}
			if (response.status == 'ERROR') {
				toastr.error(response.message);
			}
		});
}
