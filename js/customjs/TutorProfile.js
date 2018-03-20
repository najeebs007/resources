/**********************************
 * 
 * tutor profile JS
 * @author Mayank Gupta
 * 
 **********************************/	

$(document).ready(function(){ 
	$(".gradeClass").hide();
	$(".percentClass").hide();
	$(".loading").hide(); 
	$("#display_name").text(l_display_name);
		
		var l_general_id = l_general_information.userName;
		if( l_general_id != ""||l_general_id != null || l_general_id.length > 0){
			$("#a_general_info").hide();
			setGeneralInfo(l_general_information);
		}
		
		if(l_educational_info.length > 0 || l_educational_info != 'undefined' || l_educational_info != null){
			setEducationalInfo(l_educational_info);
		}
		
		if(l_certificate_data.length > 0 || l_certificate_data != 'undefined'){
			setCertificateData(l_certificate_data);
		}
		
		if(l_professinal_data.length > 0 || l_professinal_data != 'undefined'){			
			setProfessionalData(l_professinal_data);
		}
		
		if(l_event_data.length > 0 || l_event_data != 'undefined'){
			setEventData(l_event_data);
		}
		
		if(l_speciality_data.length > 0 || l_speciality_data != 'undefined'){
			setSpecialityData(l_speciality_data);
		}
		
		if(l_country_list!= null || l_country_list.length > 0){
			setOptions("countryId", l_country_list,'countryId','countryName',"Select Your Country");
		}
		if(l_state_list!= null || l_state_list.length > 0){
			setOptions("stateId", l_state_list,'stateId','stateName',"Select Your State");
		}
		
		var l_address_id = l_contact_map_obj.addressId;
		
		if(l_address_id != "" || l_address_id != null || l_address_id.length > 0){
			$(".addContactimage").hide();
			setContactDetails(l_contact_map_obj);
		}
		
	});

/********************************
 * 
 * Tutor  General Information JS
 * 
 ********************************/


	function saveGeneralInformation(){ 
		
		if(!validateTutorInfo()){
			return;
		}
		
		var l_general_info_map = {};
		
		$(".generalInformation").find("input[type=text],input[type=checkbox]").each(function(index,item){
			
			if(item.type == 'checkbox'){
				l_general_info_map[l_general_info_array[index]] = $(item).prop("checked");
				
			}else{
				l_general_info_map[l_general_info_array[index]] = $(item).val();
			}				
		});
		
		l_general_info_map.userName = l_user_name;
		
		$(".loading").show();
		 ajaxCall('save-tutor-general-info', JSON.stringify(l_general_info_map), 'successGeneralInfo', 'errorGeneralInfo');
	}
	
	 
	function successGeneralInfo(p_data){
		$(".loading").hide();
		var l_status = p_data.status;
		var	l_general_info = p_data.generalInfo; 
		alert(l_status);
		
		if(l_general_info != null || l_general_info.length > 0 || l_general_info != 'undefined'){
			$("#a_general_info").hide();
			setGeneralInfo(l_general_info);
		}
	}
	
	function errorGeneralInfo(p_data){
		$(".loading").hide();
		var l_status = p_data.status;
		alert(l_status);
	}
	
	function setGeneralInfo(p_general_info){ 
		
		$(".dateOfBirth").text(chageDateFormat(new Date(p_general_info.dateOfBirth)));
		$(".motherTongue").text(p_general_info.motherTongue);
		$(".totalExperience").text(p_general_info.totalExperience);
		$(".msOfficeKnowlege").text(p_general_info.msOfficeKnowlege);
		$(".specialities").text(p_general_info.specialities);
		$(".demoClassAvailable").text(p_general_info.demoClassAvailable);
		$(".haveDigitalPen").text(p_general_info.haveDigitalPen);
		$(".status").text(p_general_info.status);
	}
	
	function chageDateFormat(dateStr)
	{
			var year = dateStr.getFullYear();
			var month = dateStr.getMonth()+1;
			var day = dateStr.getDate(); 
	  
	  	
	  		var dateFormat =  day+ "/" +month+ "/" +year;
	  	
	  	return dateFormat;
	}
	
	
	function editGeneralInformation(){ 
		$(".generalInfoLabel").text("Edit General Infomation");
		
		$(".generalInformation").find("input[type=text],input[type=checkbox]").each(function(index,item){					
		 
			
			try{
			      if($(item).attr('class').indexOf("custom-date") >= 0){
			       var itemValue = new Date(l_general_information[l_general_info_array[index]]);
			       
			       var b = chageDateFormat(itemValue);
			       if(b == "NaN/NaN/NaN" || b == 'undefiend'){
			        
			       }else{
			        $(item).val(b);
			       }     
			      }else{
			       $(item).val(l_general_information[l_general_info_array[index]]);
			      }
			      
			      $(item).prop("disabled",false);      
			     }
			     catch(Err){
			      $(item).val(l_general_information[l_general_info_array[index]]);
			      $(item).prop("disabled",false);
			     }
		});
		 
		var i=0;
		$(".generalInformation").find("input[type=text],input[type=checkbox]").each(function(index,item){
			$(item).prop( "checked", l_general_information[l_general_info_array[i]]);			
			i++;
		});
		
		floats();
	}
	
	/************************
	 * 
	 * Tutor Education JS
	 * 
	 * **********************/
	function addTutorEducation(){
		
		if(!validateTutorEducationForm()){
			return;
		}
		
		
		var l_education_map = {};
		
		$(".tutorEducations").find("input[type=text],input[type=hidden],input[type=radio],select").each(function(index,item){
			l_education_map[l_education_array[index]] = $(item).val();			
		});
		
		l_education_map.userName = l_user_name;
		$(".loading").show();
		 ajaxCall('save-education-info', JSON.stringify(l_education_map), 'successEducationInfo', 'errorEducationInfo');
	}
	
	function successEducationInfo(p_data){ 
		$(".loading").hide();
		var l_status = p_data.status;
		var l_edu_info = p_data.educationInfo;
		alert(l_status);
		var l_edu_id= l_edu_info.educationId;
		
		if(l_edu_id != null || l_edu_id.length > 0 || l_edu_id != 'undefined'){
			var l_html = setEducationInfo(l_edu_info);
			$("#"+l_edu_id+"").hide();
			$("#educationDetailsDiv").append(l_html); 
		}
	}
	
	function errorEducationInfo(p_data){
		$(".loading").hide();
		var l_status = p_data.status;
		alert(l_status); 
	}
	
	function editEducationInfomation(p_education_id){
	//	alert(p_education_id);
		$(".educationLabel").text("Edit Educational Details");
		var education_map = l_educational_info[0];
		var education = education_map[p_education_id];
		var l_edu_id = education.educationId;
		var isGrade;
		var isPercent;
		var grade;
		var percent;
		
		
		$(".tutorEducations").find("input[type=text],input[type=hidden],input[type=radio],select").each(function(index,item){
			
			try{
			      if($(item).attr('class').indexOf("custom-date") >= 0){
			       var itemValue = new Date(education[l_education_array[index]]);
			       
			       var b = chageDateFormat(itemValue);
			       if(b == "NaN/NaN/NaN" || b == 'undefiend'){
			        
			       }else{
			        $(item).val(b);
			       }     
			      }else{
			       $(item).val(education[l_education_array[index]]);
			      }
			      
			      $(item).prop("disabled",false);      
			     }
			     catch(Err){
			      $(item).val(education[l_education_array[index]]);
			      $(item).prop("disabled",false);
			     }
			
		});
		
		grade 		= education.grade;
		percent 	= education.percent;
		isGrade 	= education.rb1;
		isPercent 	= education.rb2;
		
		if(isGrade == 'Grade'){
			$("#rb1").prop("checked",true);
			$("#grade").text(grade);
			$("#percent").text();
			$(".gradeClass").show();
			$(".percentClass").hide();
		}
		
		if(isPercent == 'Percentage'){
			$("#rb2").prop("checked",true);
			$("#grade").text();
			$("#percent").text(percent);
			$(".percentClass").show();
			$(".gradeClass").hide();
		}
		
		
		floats();
		
	}
	
	 
	function setEducationInfo(p_edu_info_map){ 
		var html = "";
		 
		html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\" id="+p_edu_info_map.educationId+">";
		html += "<article class=\"hentry post\">";
		html += "<div class=\"post__author author vcard inline-items\"><img src=\"resources/img/fa-education.png\" alt=\"author\" style=\"border-radius: 0px;\">";
		html += "<div class=\"author-date\"><a class=\"h6 post__author-name fn\" href=\"#\">"+p_edu_info_map.instituteName+"</a>";
		html += "<div class=\"post__date\">";
		html += "<time class=\"published\" datetime=\"2017-03-24T18:18\">"+p_edu_info_map.educationTypeName+","+p_edu_info_map.branchName+"</time>";
		html += "</div>";
		html += "<div class=\"post__date\">";
		html += "<time class=\"published\" datetime=\"2017-03-24T18:18\">"+dateFormat(p_edu_info_map.startDate,p_edu_info_map.endDate)+"</time>";
		html += "</div></div></div>";
		html += "<div class=\"control-block-button  post-control-button addpencil\" style=\"top: -50px;right: -55px;\">";
		html += "<a href=\"#\" class=\"btn btn-control featured-post\" onclick=\"editEducationInfomation('"+p_edu_info_map.educationId+"');\" data-toggle=\"modal\" data-target=\"#myModaleduction\" style=\"background-color: #d3d3db;\">";
		html += "<img src=\"resources/img/profile-img/pencil.png\" alt=\"author\" style=\"border-radius: 0px;width: 20px;margin-right: 0px;padding: 0px 3px 6px 1px;\">";
		html += "</a></div></article></div>";
		
		return html;
	}
	
	function dateFormat(p_startDate, p_endDate){ 
		var startDate = new Date(p_startDate);
		var endDate = new Date(p_endDate);
		var startFullYear = startDate.getFullYear();
		var endFullYear = endDate.getFullYear();
		
		return startFullYear+"-"+endFullYear;
	}
	
	
	
	
	
	function setEducationalInfo(p_educational_info){
		
		var educationMap = p_educational_info[0];
		var html = "";
		
		for(var item in educationMap){
			var l_education_map = educationMap[item];
			html += setEducationInfo(l_education_map);
		} 
				
		$("#educationDetailsDiv").html("").append(html);
		
	}
	
	
	/****************************
	 * 
	 * Tutor Certifications JS
	 * 
	 ****************************/
	
function addTutorCertificate(){
		
	if(!validateTutorCertificate()){
		return;
	}
	
	
		var l_tutor_certificate_map = {};
		
		$(".tutorCertificate").find("input[type=text],input[type=hidden]").each(function(index,item){
			l_tutor_certificate_map[l_certificate_array[index]] = $(item).val();			
		});
		
		l_tutor_certificate_map.userName = l_user_name;
		$(".loading").show();
		ajaxCall('save-certificate-info', JSON.stringify(l_tutor_certificate_map), 'successCertificateInfo', 'errorCertificateInfo');
	}
	
	function successCertificateInfo(p_data){ 
		$(".loading").hide();
		var l_status = p_data.status;
		var l_certificate_map = p_data.certificateData;
		alert(l_status); 
		
		if(l_certificate_map.userCertificationsId != null || l_certificate_map.userCertificationsId != 'undefined'){
			
			var l_html = setCertificateInfo(l_certificate_map);
			$("#"+l_certificate_map.userCertificationsId+"").hide();
			$("#certificateDiv").append(l_html);
		}
	}
	
	function errorCertificateInfo(p_data){
		$(".loading").hide();
		var l_status = p_data.status;
		alert(l_status);
	}
	
	function setCertificateInfo(p_certificate_map){//debugger;
	
		var html = "";
		
		html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\" id="+p_certificate_map.userCertificationsId+">";
		html += "<article class=\"hentry post\">";
		html += "<div class=\"post__author author vcard inline-items\"><img src=\"resources/img/fa-education.png\" alt=\"author\" style=\"border-radius: 0px;\">";
		html += "<div class=\"author-date\"><a class=\"h6 post__author-name fn\" href=\"#\">"+p_certificate_map.certificationName+"</a>";
		html += "<div class=\"post__date\">";
		html += "<time class=\"published\" datetime=\"2017-03-24T18:18\">"+p_certificate_map.certificationAuthority+"</time>";
		html += "</div>";
		html += "<div class=\"post__date\">";
		html += "<time class=\"published\" datetime=\"2017-03-24T18:18\">"+dateFormat(p_certificate_map.certificationDate,p_certificate_map.certificationExpiryDate)+"</time>";
		html += "</div></div></div>";
		html += "<div class=\"control-block-button  post-control-button addpencil\" style=\"top: -50px;right: -55px;\">";
		html += "<a href=\"#\" class=\"btn btn-control featured-post\" onclick=\"editCertificateInfomation('"+p_certificate_map.userCertificationsId+"');\" data-toggle=\"modal\" data-target=\"#myModalcertificates\" style=\"background-color: #d3d3db;\">";
		html += "<img src=\"resources/img/profile-img/pencil.png\" alt=\"author\" style=\"border-radius: 0px;width: 20px;margin-right: 0px;padding: 0px 3px 6px 1px;\">";
		html += "</a></div></article></div>";
		
		return html;
	}
	
	
	function setCertificateData(p_certificate_list){
		var certificateMap = p_certificate_list[0];
		var html = "";
		
		for(var item in certificateMap){
			var l_certificate_map = certificateMap[item];
			html += setCertificateInfo(l_certificate_map);
		} 

		$("#certificateDiv").html("").append(html);
	}
	
	function editCertificateInfomation(p_certificate_id){//debugger;
		$(".certificateLable").text("Edit Certificate Details");
		var certificate_map = l_certificate_data[0];
		var certificate = certificate_map[p_certificate_id];
		var l_id = certificate.userCertificationsId;
		
		
		if(l_id.length > 0 || l_id != null || l_id != 'undefined'){
			
			$(".tutorCertificate").find("input[type=text],input[type=hidden]").each(function(index,item){					
				
				try{
				      if($(item).attr('class').indexOf("custom-date") >= 0){
				       var itemValue = new Date(certificate[l_certificate_array[index]]);
				       
				       var b = chageDateFormat(itemValue);
				       if(b == "NaN/NaN/NaN" || b == 'undefiend'){
				        
				       }else{
				        $(item).val(b);
				       }     
				      }else{
				       $(item).val(certificate[l_certificate_array[index]]);
				      }
				      
				      $(item).prop("disabled",false);      
				     }
				     catch(Err){
				      $(item).val(certificate[l_certificate_array[index]]);
				      $(item).prop("disabled",false);
				     }
			});
			
			floats();
			
		}else{
			reloadPage();
		}
		
	}	
	

	/****************************
	 * 
	 * Tutor  Professional JS
	 * 
	 ****************************/
	
function addProfessionalDetails(){
	
	if(!validateTutorProfessional()){
		return;
	}	
		var l_professional_map = {};
		
		$(".professionalDetails").find("input[type=text],input[type=hidden]").each(function(index,item){
			l_professional_map[l_professional_array[index]] = $(item).val();
		});
		
		l_professional_map.userName = l_user_name;
		$(".loading").show();
		ajaxCall('save-professional-info', JSON.stringify(l_professional_map), 'successProfessionalInfo', 'errorProfessionalInfo');
	}
	
	function successProfessionalInfo(p_data){
		//alert(JSON.stringify(p_data));
		$(".loading").hide();
		var l_status = p_data.status;
		var l_professinal_map = p_data.professinalData;
		alert(l_status); 
		
		if(l_professinal_map.userProfessionalDetailId != null || l_professinal_map.userProfessionalDetailId != 'undefined'){
			var l_html = setProfessinalInfo(l_professinal_map);
			$("#"+l_professinal_map.userProfessionalDetailId+"").hide();
			$("#professinalDiv").append(l_html);
		}
	}
	
	function errorProfessionalInfo(p_data){
		$(".loading").hide();
		var l_status = p_data.status;
		alert(l_status); 
	}
	
	function setProfessinalInfo(p_professinal_map){
		var html = "";
		
		html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\" id="+p_professinal_map.userProfessionalDetailId+">";
		html += "<article class=\"hentry post\">";
		html += "<div class=\"post__author author vcard inline-items\"><img src=\"resources/img/fa-education.png\" alt=\"author\" style=\"border-radius: 0px;\">";
		html += "<div class=\"author-date\"><a class=\"h6 post__author-name fn\" href=\"#\">"+p_professinal_map.organization+"</a>";
		html += "<div class=\"post__date\"><time class=\"published\" datetime=\"2017-03-24T18:18\">"+p_professinal_map.location+"</time></div>";
		html += "<div class=\"post__date\"><time class=\"published\" datetime=\"2017-03-24T18:18\">"+dateFormat(p_professinal_map.startDate,p_professinal_map.endDate)+"</time></div>";
		html += "</div></div>"; 
		html += "<div class=\"control-block-button  post-control-button addpencil\" style=\"top: -50px;right: -55px;\">";
		html += "<a href=\"#\" class=\"btn btn-control featured-post\" onclick=\"editProfessionalInfomation('"+p_professinal_map.userProfessionalDetailId+"');\" data-toggle=\"modal\" data-target=\"#myModalprofessional\" style=\"background-color: #d3d3db;\">";
		html += "<img src=\"resources/img/profile-img/pencil.png\" alt=\"author\" style=\"border-radius: 0px;width: 20px;margin-right: 0px;padding: 0px 3px 6px 1px;\">";
		html += "</a></div></article></div>";
		
		return html;
		
	}
	
	function editProfessionalInfomation(l_professional_id){
		$(".professionalLabel").text("Edit Professional Details");
		var l_professinal_map = l_professinal_data[0];
		
		var professional = l_professinal_map[l_professional_id];
		
		var l_professional_id = professional.userProfessionalDetailId;
		
		if(l_professional_id.length > 0 || l_professional_id != null || l_professional_id != 'undefined'){
			
			$(".professionalDetails").find("input[type=text],input[type=hidden]").each(function(index,item){					
				
				try{
				      if($(item).attr('class').indexOf("custom-date") >= 0){
				       var itemValue = new Date(professional[l_professional_array[index]]);
				       
				       var b = chageDateFormat(itemValue);
				       if(b == "NaN/NaN/NaN" || b == 'undefiend'){
				        
				       }else{
				        $(item).val(b);
				       }     
				      }else{
				       $(item).val(professional[l_professional_array[index]]);
				      }
				      
				      $(item).prop("disabled",false);      
				     }
				     catch(Err){
				      $(item).val(professional[l_professional_array[index]]);
				      $(item).prop("disabled",false);
				     }
			});
			
			floats();
			
		}else{
			reloadPage();
		}
	}
	
	
	function setProfessionalData(p_professinal_data){
		var professionalMap = p_professinal_data[0];
		var html = "";
		
		for(var item in professionalMap){
			var l_professional_map = professionalMap[item];
			html += setProfessinalInfo(l_professional_map);
		} 

		$("#professinalDiv").html("").append(html);
		
	}
	
	
	
	/*********************
	 * 
	 * Tutor  Event JS
	 * 
	 *********************/
	
function addTutorEvents(){
	
	if(!validateTutorEvent()){
		return;
	}
		
		var l_event_map = {};
		
		$(".tutorEvents").find("input[type=text],input[type=hidden],textarea").each(function(index,item){
			l_event_map[l_event_array[index]] = $(item).val();
		});
		
		l_event_map.userName = l_user_name;
		$(".loading").show();
		 ajaxCall('save-tutor-event', JSON.stringify(l_event_map), 'successEventCall', 'errorEventCall');
		
	}
	
	function successEventCall(p_data){
		$(".loading").hide();
		var l_status = p_data.status;
		l_event_map = p_data.eventData; 
		alert(l_status);
		
		var l_event_id = l_event_map.eventId;
		 
		if(l_event_id != null || l_event_id.length > 0 || l_event_id != 'undefined'){
			var html = setEventInfo(l_event_map);
			$("#"+l_event_id+"").hide();
			$("#eventDetailsli").append(html); 
		}
	}
	
	function errorEventCall(p_data){
		$(".loading").hide();
		var l_status = p_data.status;
		alert(l_status);
	}
	
	function setEventInfo(p_event_map){ 
		var html = "";
		
		html += "<li class=\"inline-items\" id="+p_event_map.eventId+">";
		html += "<div class=\"author-thumb\"><img src=\"resources/img/tutorevent.png\" alt=\"author\"></div>";
		html += "<div class=\"notification-event\"><a href=\"#\" class=\"h6 notification-friend\">"+p_event_map.eventName+"</a><span class=\"chat-message-item\">"+chageDateFormat(new Date(p_event_map.eventDate))+"</span></div>";
		html += "<span class=\"notification-icon\" data-toggle=\"tooltip\" data-placement=\"top\" title="+p_event_map.shortDescription+"><a href=\"#\"><svg class=\"olymp-star-icon\"></svg></a></span>";
		html += "<div class=\"control-block-button  post-control-button addpencil\" style=\"top: -50px;right: -40px;\">";
		html += "<a href=\"#\" class=\"btn btn-control featured-post\" onclick=\"editEventInformation('"+p_event_map.eventId+"');\" data-toggle=\"modal\" data-target=\"#myModalEvents\" style=\"background-color: #d3d3db;\">";
		html += "<img src=\"resources/img/profile-img/pencil.png\" alt=\"author\" style=\"border-radius: 0px;width: 20px;margin-right: 0px;padding: 0px 3px 6px 1px;\">";
		html += "</a></div></li>";
		
		return html;		
	}
	
	function editEventInformation(p_event_id){
		  $(".eventLabel").text("Edit Event Details");
		var l_event_map = l_event_data[0];
		var event = l_event_map[p_event_id];
		var l_event_id = event.eventId;
		
		if(l_event_id.length > 0 || l_event_id != null || l_event_id != 'undefined'){
			
			$(".tutorEvents").find("input[type=text],input[type=hidden],textarea").each(function(index,item){
				try{
				      if($(item).attr('class').indexOf("custom-date") >= 0){
				       var itemValue = new Date(event[l_event_array[index]]);
				       
				       var b = chageDateFormat(itemValue);
				       if(b == "NaN/NaN/NaN" || b == 'undefiend'){
				        
				       }else{
				        $(item).val(b);
				       }     
				      }else{
				       $(item).val(event[l_event_array[index]]);
				      }
				      
				      $(item).prop("disabled",false);      
				     }
				     catch(Err){
				      $(item).val(event[l_event_array[index]]);
				      $(item).prop("disabled",false);
				     }
			});
			
			floats();
		}else{
			reloadPage();
		}
	}
	
	function setEventData(p_event_data){
		var eventMap = p_event_data[0];
		var html = "";
		
		for(var item in eventMap){
			var l_event_map = eventMap[item];
			html += setEventInfo(l_event_map);
		} 

		$("#eventDetailsli").html("").append(html);
		
	}	
	
	/*********************
	 * 
	 * Tutor  speciality JS
	 * 
	 *********************/	


	
	
function addTutorSpeciality(){debugger;
		
		if(!validateTutorSpeciality()){
			return;
		}
		var l_speciality_map = {};
		
		$(".tutorSpecialiaty").find("input[type=text],input[type=hidden]").each(function(index,item){
			l_speciality_map[l_speciality_array[index]] = $(item).val();
		});
		
		l_speciality_map.userName = l_user_name;
		
		ajaxCall('save-speciality-info', JSON.stringify(l_speciality_map), 'successSpecialityInfo', 'errorSpecialityInfo');
		
	}	
	
	function successSpecialityInfo(p_data){
		var l_status = p_data.status;
		l_speciality_map = p_data.specialityMap; 
		alert(l_status);
		var l_speciality_id = l_speciality_map.specialityId;
		if(l_speciality_id != null || l_speciality_id.length > 0 || l_speciality_id != 'undefined'){
			var html = setSpecialityInfo(l_speciality_map);
			$("#"+l_speciality_id+"").hide();
			$("#special_div").append(html); 
		}
	}
	
	function errorSpecialityInfo(p_data){
		var l_status = p_data.status;
		alert(l_status);
	}
	
	function setSpecialityInfo(p_speciality_map){
		var html = "";
		
		html += "<div class=\"ui-block-content\" id="+p_speciality_map.specialityId+">";
		html += "<article class=\"hentry post\">";
		html += "<div class=\"row\">";
		html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";
		html += "<ul class=\"widget w-personal-info item-block\">";
		html += "<li ><span class=\"title\">Class: <span class=\"dname\">"+p_speciality_map.className+"</span></span></li>";
		html += "<li><span class=\"title\">Subject: <span class=\"dname\">"+p_speciality_map.subjectName+"</span></span></li>";
		html += "<li><span class=\"title\">Board: <span class=\"dname\">"+p_speciality_map.boardName+"</span></span></li>";
		html += "</ul></div>";
		html += "<div class=\"control-block-button  post-control-button addpencil\" style=\"top: -55px; right: -55px;\">";
		html += "<a href=\"#\" class=\"btn btn-control featured-post\" onclick=\"editSpecialityInfo('"+p_speciality_map.specialityId+"')\" data-toggle=\"modal\" data-target=\"#myModalSpecialities\" style=\"background-color: #d3d3db;\">";
		html += "<img src=\"resources/img/profile-img/pencil.png\" alt=\"author\" style=\"border-radius: 0px;width: 20px;margin-right: 0px;padding: 0px 3px 6px 1px;\">";
		html += "</a></div></div></article></div>";
		
		return html;
	}
	
	
	function editSpecialityInfo(p_speciality_id){
		//alert(p_speciality_id);
		$(".specialityLabel").text("Edit Speciality Details");
		var l_speciality_map = l_speciality_data[0];
		var speciality = l_speciality_map[p_speciality_id];
		var l_speciality_id = speciality.specialityId;
		
		if(l_speciality_id != null || l_speciality_id.length > 0 || l_speciality_id != 'undefined'){
			$(".tutorSpecialiaty").find("input[type=text],input[type=hidden]").each(function(index,item){
				$(item).val(speciality[l_speciality_array[index]]);
			      $(item).prop("disabled",false);
				
			});
			floats();
		}else{
			reloadPage();
		}
	}
	
	
	function setSpecialityData(p_speciality_data){
		var specialityMap = p_speciality_data[0];
		var html = "";
		
		for(var item in specialityMap){
			var l_speciality_map = specialityMap[item];
			html += setSpecialityInfo(l_speciality_map);
		} 

		$("#special_div").html("").append(html);
	}
	
	/****************************
	 * 
	 * Tutor  Contact Details JS
	 * 
	 *****************************/	
	
	function getDistrict(){
		
		var l_state_id = $("#stateId").val();
		
		if(l_state_id == "") {
			return;
		}
		
		var l_state_map = {};
		l_state_map.stateId = l_state_id;
		
		ajaxCall('get-district-list', JSON.stringify(l_state_map), 'successDistrictInfo', 'errorDistrictInfo');
	}
	
	function successDistrictInfo(p_data){
		var l_district_list = p_data.districtList;
		setOptions("districtId", l_district_list,'districtId','districtName',"Select Your District");
	}
	
	function errorDistrictInfo(p_data){
		alert("Please Check Internet Connectivity. There is some network problem !");
	}
	
	function getCity(){
		var l_district_id = $("#districtId").val();
		
		if(l_district_id == "") {
			return;
		}
		
		var l_district_map = {};
		l_district_map.districtId = l_district_id;
		
		ajaxCall('get-city-list', JSON.stringify(l_district_map), 'successCityInfo', 'errorCityInfo');
	}
	
	function successCityInfo(p_data){
		var l_city_list = p_data.cityList;		
		setOptions("cityId", l_city_list,'cityId','cityName',"Select Your City");
	}
	
	function errorCityInfo(p_data){
		alert("Please Check Internet Connectivity. There is some network problem !");
	}
	
	function setContactDetails(p_contact_map_obj){
		$(".address").text(p_contact_map_obj.addressLine1);
		$(".countryName").text(p_contact_map_obj.countryName);
		$(".districtName").text(p_contact_map_obj.districtName);
		$(".stateName").text(p_contact_map_obj.stateName);
		$(".cityName").text(p_contact_map_obj.cityName);
		$(".addressTitle").text(p_contact_map_obj.addressTitle);
		$(".pinCode").text(p_contact_map_obj.pinCode);
	}
	
	function changeLabel(labelClass,labelMessage){
		$("."+labelClass).text(labelMessage);
	}
	