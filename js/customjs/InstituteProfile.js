/**
 * 
 */


function saveInstituteGeneralInfo(p_formId,p_errorClass) {

	try{
		checkValidate(p_formId,p_errorClass,false,false)
	}catch(result){
	if(result){

var l_input_map = {};
	
    l_input_map.displayName = $(".c_displayName").val();
	l_input_map.fullName = $(".c_fullName").val();
	l_input_map.url = $(".c_url").val();
	l_input_map.instituteType = $(".c_instituteType").val();
	l_input_map.specialization = $(".c_specialization").val();
	l_input_map.numberOfStudent = $(".c_numberOfStudent").val();
	l_input_map.description = $(".c_desc").val();
	$(".loading").show();
	$.ajax({
		url : "/institute/save-institute-general-info",
		data : JSON.stringify(l_input_map),
		type : 'POST',
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		success : function(response) {
        
    	    $('.c_e_displayName').html($(".c_displayName").val());
    	    $('.c_e_url').html($(".c_url").val());
    	    $('.c_e_instituteId').html(response.instituteId);
    	    $('.c_e_campuses').html($(".c_numberOfStudent").val());
    	    $('.c_e_name').html($(".c_fullName").val());
    	    $('.c_e_specialization').html($(".c_specialization").val());
    	    $('.c_etype').html($(".c_instituteType").val());
    	    $('.c_e_desc').html($(".c_desc").val());
			$('#myModalgeneral').modal('hide');
		    $('.c_instituteGeneralInfoError').html('');
		    $(".loading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			$('.c_instituteGeneralInfoError').html("we don't find proper input.please try again.");
			//alert("error:" + textStatus + " exception:" + errorThrown);
		}
	});
	}else
		return false;
 } 
	
}

	
function editInstituteGeneralInfo(p_formId,p_errorClass){
		/*$(".loading").show();
		$(".c_buttonView").prop("disabled", true);*/
	$(".loading").show();
		$.ajax({
			url : "institute/get-edit-institute-general",
			type : 'GET',
			success : function(data) {
	             
			 	if(!(data.instituteId == 'none')){
		    	    $('.c_displayName').val(data.displayName);
		    	    $('.c_url').val(data.websiteURL);
		    	    $('.c_numberOfStudent').val(data.numberOfCampuses);
		    	    $('.c_fullName').val(data.instituteName);
		    	    $('.c_specialization').val(data.institureSpecialities);
		    	    $('.c_instituteType').val(data.instituteType);
		    	    $('.c_desc').val(data.instituteShortDescription);
		    	    
		    	    $('#myModalgeneral').modal('show');
			 	}else{
			 		toaster.error("we don't find proper input . try again.");
			 	}
			 	$(".loading").hide();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$(".loading").hide();
				//alert("error:" + textStatus + " exception:" + errorThrown);
				toaster.error("we don't find proper input . try again.");
			}
		});
}

function addInstituteContactDetail(p_formId,p_errorClass) {
	try{
		checkValidate(p_formId,p_errorClass,false,false)
	}catch(result){
	if(result){
	
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
				url : "/institute/add-contact",
				dataType : 'json',
				data : JSON.stringify(l_input_map),
				success : function(response) {
					$('.c_i_contacterror').html('');
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
			$(".loading").hide();
			alert("error:" + textStatus + " exception:" + errorThrown);
		}

	});

}else
	return false;

}
}


function addTutors() {debugger;

$('.c_e_addTutorError').html('');
	var l_input_map = {};
	if($(".c_tutorName").val()==''){
		$('.c_e_addTutorError').html('Enter tutor name.');
		return false;
	}
	if($(".c_tutorEmail").val()==''){
		$('.c_e_addTutorError').html('Enter tutor email.');
		return false;
	}
	if(!isValidEmail($(".c_tutorEmail").val())){
		$('.c_e_addTutorError').html('please enter valid email.');
		return false;
	}
	if($(".c_tutorMobile").val()==''){
		$('.c_e_addTutorError').html('Enter tutor mobile.');
		return false;
	}
	if(($(".c_tutorMobile").val().length)!=10){
		$('.c_e_addTutorError').html('please enter valid mobile.');
		return false;
	}
    l_input_map.tutorName = $(".c_tutorName").val();
	l_input_map.tutorEmail = $(".c_tutorEmail").val();
	l_input_map.tutorMobile = $(".c_tutorMobile").val();
	$(".loading").show();
	$.ajax({
		     type : 'POST',
			 cache : false,
			 async : true,
			 contentType : "application/json; charset=UTF-8",
	         url : "/institute/add-tutor-info",
		     data : JSON.stringify(l_input_map),
		     datatype : "json",
		success : function(response) {debugger;
      // var l_data = JSON.parse(response);
       //l_data = JSON.stringify(data);
      // alert(l_data);
      // alert(l_data.status);
       if(response.status == 'SUCCESS'){
    	   var data ="<div class='photo-album-item' data-mh='album-item' style='height: 342px;'><div class='photo-item'><img src='resources/img/profile-img/photo-item2.jpg'alt='no image'><div class='overlay overlay-dark'></div></div>"
                       +"<span class='sub-title'>Name:"+$(".c_tutorName").val()+"</span><span class='sub-title'>Specialization:</span><span class='sub-title'>Experience:</span></div>";
		  $('.c_appendTutors').append(data);
		  $(".loading").hide();
		  $('.c_e_addTutorError').html('<span style="color:green">'+response.message+'</span>');
		  $('#addTutor').modal('hide');	
		  toastr.success(response.message);
       }
       if(response.status == 'ERROR'){
    	   $('.c_e_addTutorError').html(response.message);
    	   $(".loading").hide();
       }
	},
		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
		    	   $('.c_e_addTutorError').html('we do not find proper input. please try again.');
			//alert("error:" + textStatus + " exception:" + errorThrown);
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


function instituteSocial(){
	/*$('#i_addInstituteSocial').serializeArray()*/
	$('.c_e_addSocialError').html('');
	if($('.c_socialName').val() == ''){
		$('.c_e_addSocialError').html('Please select social.');
		return false;
	}
	if($('.c_socialLink').val() == ''){
		$('.c_e_addSocialError').html('Enter social link.');
		return false;
	}
	if($('.c_socialRemarks').val() == ''){
		$('.c_e_addSocialError').html('Enter social Remarks.');
		return false;
	}
     var l_map_data = {};
     l_map_data.socialId = $('.c_socialId').val();
     l_map_data.iconId = $('.c_socialName').val();
     l_map_data.soacialName = $( ".c_socialName option:selected" ).text();
     l_map_data.soacialLink = $('.c_socialLink').val();
     l_map_data.soacialRemarks = $('.c_socialRemarks').val();
     $(".loading").show();
	 $.ajax({
		 
		url : "institute/social-information",
		cache : false,async : true,contentType : "application/json; charset=UTF-8",
		type : 'POST',
		datatype : "json",
		data : JSON.stringify(l_map_data),
		success : function(data) {debugger;
			$('.c_hide_link').show();
		//alert(data.socialMediaId);
			//if(!(data.socialMediaId == 'none')){debugger;
			//if($('.c_socialId').val() == 'none'){
			if(data.status=='SUCCESS'){
			var icon = "";
				 icon += "<div class='col-lg-3 col-md-3 col-sm-3 col-xs-3' style='text-align:center;'>" ;
				 icon += "<ul class='widget w-personal-info item-block' style='margin-top:-15px;'>";
				 icon += "<li>'<span class='title'>" ;
				 icon += "<a href='#' class='btn btn-control' data-toggle='modal' data-target='' " ;
				 icon += "onclick=\"editInstituteSocial('"+data.object+"')\">" ;
				 icon += "<img src="+data.other+" width='40'>" ;
				 icon += "</a></span></li> </ul>";
				 $('.c_socialIcon').append(icon); 
				 $(".loading").hide();
				 $('#addSocialLink').modal('hide');	
				 $("#i_addInstituteSocial").trigger("reset");
				 toaster.success(data.message);
			}
			if(data.status=='ERROR'){
				$(".loading").hide();
				$('.c_e_addSocialError').html(data.message);
			}
			//}		
		
		 //  }
			   
			
             
		
		
		},
		error : function(jqXHR, textStatus, errorThrown) {
			//alert("error:" + textStatus + " exception:" + errorThrown);
			$(".loading").hide();
			$('.c_e_addSocialError').html("we don't  find proper input . please try again.");
		}
	});
	
	
}

function editInstituteSocial(socialId){debugger;
	/*$('#i_addInstituteSocial').serializeArray()*/
    $(".loading").show();
	$.ajax({
		url : "/institute/get-social-information",
		type : 'GET',
		data : {socialMediaId:socialId},
		success : function(data) {debugger;
		//alert(data.socialMediaId);
			if(!(data.socialMediaId == 'none')){
		        
				 $('.c_socialId').val(data.socialMediaId);
				 $('.c_hide_link').hide();
			     $('.c_socialLink').val(data.baseURL);
			     $('.c_socialRemarks').val(data.remarks);
				 $('#addSocialLink').modal('show');
			}
			$(".loading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			//alert("error:" + textStatus + " exception:" + errorThrown);
			toaster.error("we don't  find proper input . please try again.");
		}
	});
	
	
}


function addEventAndHolidays(){debugger;
/*$('#i_addInstituteSocial').serializeArray()*/

var l_map_data = {};
    if($('.c_infoType').val() == '')
    	$('.c_instituteCalendarError').html("Please Select Type!");
    else{
    	if($('.c_infoType').val() == 'holiday'){
    		l_map_data.infoType = $('.c_infoType').val();
    		l_map_data.startFrom = $('.c_startFrom').val();
    		l_map_data.holidayName = $('.c_holidayName').val();
    		l_map_data.holidayDescription = $('.c_holidayDescription').val();
    		l_map_data.holidayEndDate = $('.c_holidayEndDate').val();
    		
    	}
    	if($('.c_infoType').val() == 'event'){
    		
    		l_map_data.infoType = $('.c_infoType').val();
    		l_map_data.startFrom = $('.c_startFrom').val();
    		l_map_data.eventName = $('.c_eventName').val();
    		l_map_data.eventTitle = $('.c_eventTitle').val();
    		l_map_data.eventSubTitle = $('.c_eventSubTitle').val();
    		
    		l_map_data.eventPlace = $('.c_eventPlace').val();
    		l_map_data.eventURL = $('.c_eventURL').val();
    		l_map_data.eventDescription = $('.c_eventDescription').val();
    		l_map_data.eventDate = $('.c_eventDate').val();
    		l_map_data.eventEndDate = $('.c_eventEndDate').val();
    		
    	}
    }


$.ajax({
	url : "/institute/add-event-holiday-information",
	type : 'POST',
	cache : false,async : true,contentType : "application/json; charset=UTF-8",
	datatype : "json",
	data : JSON.stringify(l_map_data),
	success : function(data) {debugger;
	
	alert(data);
	if(data == 'SUCCESS'){debugger;
		var l_map_data = {};
		if($('.c_infoType').val() == 'holiday'){debugger;
    		l_map_data.start = $('.c_startFrom').val();
    		l_map_data.title = $('.c_holidayName').val();
    		l_map_data.description = $('.c_holidayDescription').val();
    		l_map_data.end = $('.c_holidayEndDate').val();
    		
    	}
    	if($('.c_infoType').val() == 'event'){debugger;
    		l_map_data.start = $('.c_startFrom').val();
    		l_map_data.title = $('.c_eventTitle').val();	
    		l_map_data.url = $('.c_eventURL').val();
    		l_map_data.description = $('.c_eventDescription').val();
    		l_map_data.end = $('.c_eventEndDate').val();
    		
    	}
    	
    	$('#bootstrapModalFullCalendar').fullCalendar({
    		viewRender: function (view) {debugger;

    		    $('#bootstrapModalFullCalendar').fullCalendar( 'removeEvents');
    		    $('#bootstrapModalFullCalendar').fullCalendar('addEventSource', l_map_data);
    		}
    	});
		
	}else{debugger;
		$('.c_instituteCalendarError').html('Information could not save!')
	}
		
	
	},
	error : function(jqXHR, textStatus, errorThrown) {
		alert("error:" + textStatus + " exception:" + errorThrown);
	}
});


}



$(function() {
  $('.c_contentSubmit').click(function(e) {
    e.preventDefault();
    //Disable submit button
    $(this).prop('disabled',true);
    
/*    var form = document.forms[0];
    var formData = new FormData(form);*/
    
    var formData = new FormData(document.getElementById('test'));
    	
    // Ajax call for file uploaling
    var ajaxReq = $.ajax({
      url : '/fileUpload',
      type : 'POST',
      data : formData,
      cache : false,
      contentType : false,
      processData : false,
      xhr: function(){
        //Get XmlHttpRequest object
         var xhr = $.ajaxSettings.xhr() ;
        
        //Set onprogress event handler 
         xhr.upload.onprogress = function(event){
          	var perc = Math.round((event.loaded / event.total) * 100);
          	$('#progressBar').text(perc + '%');
          	$('#progressBar').css('width',perc + '%');
         };
         return xhr ;
    	},
    	beforeSend: function( xhr ) {
    		//Reset alert message and progress bar
    		$('#alertMsg').text('');
    		$('#progressBar').text('');
    		$('#progressBar').css('width','0%');
              }
    });
  
    // Called on success of file upload
    ajaxReq.done(function(msg) {
    	alert(msg);
      var res = msg.split("-");
      $('#alertMsg').text(res[0]);
      $('.c_contentURL').val(res[1]);
      $('input[type=file]').val('');
      $('.c_contentSubmit').prop('disabled',false);
    });
    
    // Called on failure of file upload
    ajaxReq.fail(function(jqXHR) {
    	
      $('#alertMsg').text(jqXHR.responseText+'('+jqXHR.status+
      		' - '+jqXHR.statusText+')');
      $('.c_contentSubmit').prop('disabled',false);
    });
  });
});

