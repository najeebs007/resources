/**
 * 
 */

function programEnroll(programId,isGroup,isCustomForm,cartId,isFreeForStudent){
	
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
		if(isCustomForm)
		  l_map = readForm('i_program_student_registration');
		l_map.programId = programId;
		l_map.isFreeForStudent = isFreeForStudent;
		
		//alert(JSON.stringify(l_map));
		ajaxWithJSON("/student/enroll-sepaas-program", l_map, 'POST', function(response) {
		    //alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				if(isFreeForStudent){
					toastr.success(response.message);
					location.reload();
				}else
				 buyNowCart(cartId,programId,'PROGRAM');
				
			}
			if (response.status == 'ERROR') {
				toastr.error(response.message);
			}
		});
	
}
function enroll(cartId,programId,isFreeForStudent){
	
	ajaxWithJSON("/student/enroll-sepaas-program", l_map, 'POST', function(response) {
	   // alert(JSON.stringify(response));
		if (response.status == 'SUCCESS') {
			if(isFreeForStudent){
				toastr.success(response.message);
				location.reload();
			}else{
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
		    //alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				var data = response.object;
				$('.c_enrollmentFees').text(data.enrollmentFee);
				$('.c_registered_students').text(data.registeredStudents);
			}
			if (response.status == 'ERROR') {
				//toastr.error(response.message);
				console.log(response.message);
			}
		});
	
}

function loadProgramExams(programId){debugger;
	
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
		var l_map = {};
		
		l_map.programId =programId;
		
		ajaxWithJSON("/common/load-program-exam-detail", l_map, 'POST', function(response) {
		   // alert(JSON.stringify(response));
		    var html = '';
		    var html2 = '';
			if (response.status == 'SUCCESS') {
				var data = response.object;
				
				for(var i=0;i<data.length;i++){
					var data_map = data[i];
					html+='<li class="">';
					html+='<div class="part">';
					html+='<div class="card exam-card">';
					html+='<div class="card-body card-body-padding-exam-card">';
					html+='<div class="row rw">'; 
					html+='<div class="col-sm-12 col-md-12 col-lg-12">';
					html+='<div class="">';	 
					html+='<span class="exam-name s-font">Exam Name : <strong style="color:#525c65;">'+data_map.examTitle+'</strong></span>'; 
					html+='</div>';
					html+='</div>'; 
					html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-5">'; 
					html+='<div class="">';	 
					html+='<span class="exam-name s-font">Exam Start date : <strong style="color:#525c65;">'+data_map.examStartDate+'</strong></span>'; 
					html+='</div>';
					html+='</div>';  
					html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10">'; 
					html+='<span class="program-text-normal s-font">'+data_map.examDescription+'</span>';
					html+='</div>'; 
					html+='<div class="col-sm-12 col-md-12 col-lg-12 m-t-10 center">'; 
					html+='<button type="button" class="btn btn-primary">Take Test</button>';                                                                   
					html+='</div>';
					html+='</div>';
					html+='</div>';	 
					html+='</div>';
					html+='</div>';
					html+='</li>';
					html2+='<option value="'+data_map.examId+'">'+data_map.examTitle+'</option>';
					
				}
				$('.c_program_exams').html(html);
				$('.c_exam_dropdown').html(html2);
				
			}
			if (response.status == 'ERROR') {
				//toastr.error(response.message);
				console.log(response.message);
			}
		});
	
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
				for(var i=0;i<powered.length;i++){
					html+='<article class="m-t-30">';
                    html+='<div class="sponsor-block"><img src="'+powered[0]+'"></div>';   
                    html+='</article>';
				}
				$('.c_sponsor_logo').html(html);
				html = '';
				for(var i=0;i<coPowered.length;i++){
					html+='<article class="m-t-30">';
                    html+='<div class="sponsor-block"><img src="'+coPowered[0]+'"></div>';   
                    html+='</article>';
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
				html+='<div class="col-sm-6 col-md-6 col-lg-6">';
				html+='<div class="card b-radius-5">';
				html+='<div class="card-body padding-5">';
				html+='<div class="row">';
				html+='<div class="col-sm-12 col-md-12 col-lg-12 center">';
				html+='<div class="img-icon"> <img src="../../resources/img/profile-img/pro.jpg" alt="icon" class="p-img"> </div>';
				html+='<h6 class="pro-heading-m s-font font-12" style="margin-top: 2px;margin-bottom:2px;font-weight: 600;"> '+b_students[0]+'</h6>';
				html+='</div>';
				html+='<div class="col-sm-12 col-md-12 col-lg-12 center">';
				html+='<h6 class="pro-heading-m s-font font-12" style="margin-top: 2px;margin-bottom:2px;font-weight: 600;">Reg date</h6>';
				html+='</div>';
				html+='<div class="col-sm-12 col-md-12 col-lg-12 center"> <span class="exam-name s-font font-12"><strong style="color:#525c65;">'+b_students[1]+'</strong></span> </div>';
				html+='</div>';
				html+='</div>';
				html+='</div>';
				html+='</div>';
				html+='<div class="col-md-12 center"><button type="button" class="btn btn-primary" onclick="loadProgramStudents(\''+programId+'\','+from+5+',5)">Next</button> </div>';
			}
			$('.c_program_students').html(html);
		}
		if (response.status == 'ERROR') {
			toastr.error(response.message);
		}
	});
	
}
function loadProgramGroups(programId){
	var l_map = {};
	$('#i_program_groups').html('');
	l_map.programId = programId;
	ajaxWithJSON("/common/load-program-groups", l_map, 'POST', function(response) {
	   // alert(JSON.stringify(response));
		if (response.status == 'SUCCESS') {
			
			var data = response.object;
			var html ='';
			for(var i=0;i<data.length;i++){
				var group = data[i];
				html+="<option value='"+group.groupId+"'>"+group.groupName+"</option>";
			}
			
			$('#programGroupList').modal('show');
			$('#i_program_groups').html(html);
		}
		if (response.status == 'ERROR') {
			toastr.error(response.message);
		}
	});
	
}

function showCustomForm(){
	$('#programGroupList').modal('show');
}
