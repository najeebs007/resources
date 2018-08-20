/*******************************************************************************
 * 
 * tutor profile JS
 * 
 * @author Rajesh Rawat
 * 
 ******************************************************************************/

$(document).ready(function() {
	debugger;

	loadProfileData();
	loadSocialData();
	loadIntroData();
    loadContactData();
	loadQualificationData();
	loadProfessionalData();
	loadCertificationData();
	loadBatchData();
	ratingStarCountProfile();
	//uploadProfileImage();
	/* loadSpecializationData(); */

});


//function uploadProfileImage() {
//	var l_map = g_data;
//	ajaxWithJSON("/common/upload-profile-image", l_map, 'POST', function(response) {debugger;
//		var l_data = response.object;
//		
//	});
//}





function loadProfileData() {
	var l_profile = g_data;
	//alert(JSON.stringify(l_profile));
	//alert("load profile data = " + l_map)
	
	
	//var l_map = {};
	ajaxWithJSON("/tutor-personal", l_profile, 'POST', function(response) {debugger;
		var l_data = response.object;
		$(".c_targetUser").val(l_data.userName);
		// alert(JSON.stringify(l_data));
		if (response.status == 'SUCCESS') {
			debugger;
			if (!(l_data == null || l_data == undefined)) {
				if ('profile_image' in l_data) {
					var img = l_data.profile_image;
					if (!(img == null || img == undefined)) {
						$('img#profileImg').attr('src', img);
					}
				}
				if ('profile_cover' in l_data) {
					var img = l_data.profile_cover;
					if (!(img == null || img == undefined)) {
						$('img#coverImg').attr('src', img);
					}
				}
				if ('userName' in l_data) {
					var userName = l_data.userName;
					if (!(userName == null || userName == undefined)) {
						$('.c_user__name').text(userName);
					}
				}
				// alert(JSON.stringify(l_data.user));
				if ('user' in l_data) {
					var user_data = l_data.user;
					// alert(user_data);
					$('.c_display_name').text(user_data[0]);
					$('.c_phone').text(user_data[1]);

				}
			}
		}
		if (response.status == 'ERROR') {
			console.log(response.message);
		}
	});
}

function loadSocialData() {
	var l_map = g_data;
	//l_map.login = true;
	ajaxWithJSON("/tutor-social", l_map, 'POST', function(response) {debugger;
				var l_data = response.object;
				// alert(JSON.stringify(response));
				if (response.status == 'SUCCESS') {
					$('#i_social').html('');
					var b_list = l_data.data;
					for (var i = 0; i < b_list.length; i++) {
						var b_map = b_list[i];
						var b_html = "";
						b_html += '<a href="' + b_map.link
								+ '" target="_blank">';
						b_html += '<div class="social-icon">';
						if (b_map.socialName == 'facebook') {
							b_html += '<i class="fa fa-facebook-f" style="color: #4867aa;"></i>';
						}
						if (b_map.socialName == 'twitter') {
							b_html += '<i class="fa fa-twitter" style="color: #4867aa;"></i>';
						}
						b_html += '</div>';
						b_html += '</a>';
						$('#i_social').append(b_html);
					}
				}
				if (response.status == 'ERROR') {
					console.log(response.message);
				}
			});
}
/*
 * function loadSocialData() { var l_map = g_data; ajaxWithJSON("/tutor-social",
 * l_map, 'POST', function(response) { var l_data = response.object;
 * alert(JSON.stringify(response)); if (response.status == 'SUCCESS') {
 * alert(JSON.stringify(l_data)); } if (response.status == 'ERROR') {
 * console.log(response.message); } }); }
 */

function saveIntro(p_form_id) {

	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	var l_map = {};
	l_map = readFormWithId(p_form_id);
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 

	today = dd + '/' + mm + '/' + yyyy;
	var dateOfBirth = l_map.dateOfBirth;
	//alert(l_map.haveDigitalPen);
	if(dateOfBirth > today){
		$(".c_error_intro").html("please select past date from today");
		return;
	}
	//alert(JSON.stringify(l_map));
	//alert(JSON.stringify(l_map));
	ajaxWithJSON("/tutor-save-general-detail", l_map, 'POST',
			function(response) {
				if(response.status == 'SUCCESS'){
					toastr.success(response.message);
					$('#addIntro').modal('hide');
					location.reload();
				}
				if(response.status == 'ERROR'){
					$('.c_error_intro').text(response.message);
					 setTimeout(function() {
						 $('.c_error_intro').text('');
				     }, 5000);
					
				}

			});
}
function loadEditIntro(p_flage) {
	if (p_flage == 'NEW'){
		$('#addIntro').modal('show');
		return;
	}
	if (p_flage == 'EDIT') {
		
		var date = l_intro_data.dateOfBirth;
		var dateOfBirth = getDateFormat(date);
		
		//alert(JSON.stringify(l_intro_data));
		if (!(l_intro_data.tutorId == null || l_intro_data.tutorId == undefined || l_intro_data.tutorId == ''))
			$('.c_tutorId').val(l_intro_data.tutorId);
		if (!(dateOfBirth == null || dateOfBirth == undefined || dateOfBirth == ''))
			$('.c_intro_dob').val(dateOfBirth);
		if (!(l_intro_data.motherTongue == null || l_intro_data.motherTongue == undefined || l_intro_data.motherTongue == ''))
			$('.c_intro_mtongue').val(l_intro_data.motherTongue);
		if (!(l_intro_data.totalExperience == null || l_intro_data.totalExperience == undefined || l_intro_data.totalExperience == ''))
			$('.c_intro_experience').val(l_intro_data.totalExperience);
		
		if (l_intro_data.haveDigitalPen == true)
			$('.c_intro_digital_pen').prop('checked', true);
		
		if (l_intro_data.haveHeadPhone == true)
			$('.c_intro_have_head_phone').prop('checked', true);
		$('select').val('the_value');
		var html = '';
		var html2 = '';
		if (!(l_intro_data.typeOfInternet == null
				|| l_intro_data.typeOfInternet == undefined || l_intro_data.typeOfInternet == '')) {
			if (!(l_intro_data.typeOfInternet == null
					|| l_intro_data.typeOfInternet == undefined || l_intro_data.typeOfInternet == '')) {
				if (l_intro_data.typeOfInternet == 'broadband')
					html += '<option value="broadband" selected >broadband</option><option value="wireless">3G/4G</option>';
				else
					html += '<option value="broadband" >broadband</option><option value="wireless" selected >3G/4G</option>';
				$('.c_type_of_internet').html(html);
			}
		}
		if (l_intro_data.associationWithUs == true)
			$('.c_associationWithUs').prop('checked', true);
		if (l_intro_data.demoClassAvailable == true)
			$('.c_demoClassAvailable').prop('checked', true);
		if (l_intro_data.ownVehicle == true)
			$('.c_ownVehicle').prop('checked', true);
		if (l_intro_data.systemAvailable == true)
			$('.c_systemAvailable').prop('checked', true);

		if (!(l_intro_data.specialities == null
				|| l_intro_data.specialities == undefined || l_intro_data.specialities == ''))
			$('.c_specialities').val(l_intro_data.specialities);

		if (l_intro_data.msOfficeKnowlege == true)
			$('.c_msOfficeKnowlege').prop('checked', true);
		if (!(l_intro_data.typingSpeed == null
				|| l_intro_data.typingSpeed == undefined || l_intro_data.typingSpeed == ''))
			$('.c_typingSpeed').val(l_intro_data.typingSpeed);
		if (!(l_intro_data.aboutMe == null || l_intro_data.aboutMe == undefined || l_intro_data.aboutMe == ''))
			$('.c_aboutMe').val(l_intro_data.aboutMe);
	}
}
var l_intro_data = {};
function loadIntroData() {
	// alert("/tutor-general-info");
	var l_map = g_data;
	//var l_map = {};
	ajaxWithJSON("/tutor-general-info", l_map, 'POST', function(response) {debugger;
				var l_data = response.object;
				//alert(JSON.stringify(l_data));
				if (response.status == 'SUCCESS') {
					if ('tutorGeneral' in l_data) {
						var l_map = l_data.tutorGeneral;
						//alert(JSON.stringify(l_map));
						
						l_intro_data = l_map;
				

						var l_html = "";
						l_html += "<div class='card-body card-body-padding-pro pro-height' id='style-8' style='overflow-y:auto;margin-bottom:10px;' id='i_intro_data'>";
						l_html += "<div class='row'>";
						l_html += "<div id='intoArea'>";
						l_html += "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
						l_html += "<div class='row'>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'> <span class='pro-heading'> Date of Birth <span style='color:black;float:right;font-weight: bold;'>:</span> </span></div>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 m-t-2'>";
						
						if (l_map.dateOfBirth == null || l_map.dateOfBirth == undefined	|| l_map.dateOfBirth == '') {
							l_html += "<span class='pro-text'></span>";
						} else {
							l_html += "<span class='pro-text'>"	+ getDateFormat(l_map.dateOfBirth) + "</span>";
						}
						l_html += "</div></div>";
						l_html += "</div>";
						l_html += "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
						l_html += "<div class='row'>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'> <span class='pro-heading'> Mother Tongue <span style='color:black;float:right;font-weight: bold;'>:</span> </span>";
						l_html += "</div>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 m-t-2'> <span class='pro-text'>"
								+ l_map.motherTongue + "</span></div>";
						l_html += "</div>";
						l_html += "</div>";
						l_html += "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
						l_html += "<div class='row'>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'> <span class='pro-heading'> Total Experience <span style='color:black;float:right;font-weight: bold;'>:</span> </span>";
						l_html += "</div>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 m-t-2'>";
						if (l_map.totalExperience == null || l_map.totalExperience == undefined || l_map.totalExperience == '')
							l_html += "<span class='pro-text'></span>";
						else
							l_html += "<span class='pro-text'>" + l_map.totalExperience +" Years"+ "</span>";
						l_html += "</div>";
						l_html += "</div>";
						l_html += "</div>";
						l_html += "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
						l_html += "<div class='row'>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'> <span class='pro-heading'> MS Office Knowledge <span style='color:black;float:right;font-weight: bold;'>:</span> </span>";
						l_html += "</div>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 m-t-2'>";
						if (l_map.msOfficeKnowlege == null || l_map.msOfficeKnowlege == undefined)
							l_html += "<span class='pro-text'></span>";
						if (l_map.msOfficeKnowlege == true)
							l_html += "<span class='pro-text'>Yes</span>";
						l_html += "</div>";
						l_html += "</div>";
						l_html += "</div>";
						l_html += "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
						l_html += "<div class='row'>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'> <span class='pro-heading'>Specialities <span style='color:black;float:right;font-weight: bold;'>:</span> </span>";
						l_html += "</div>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 m-t-2'> ";
						if (l_map.specialities == null || l_map.specialities == undefined || l_map.specialities == '')
							l_html += "<span class='pro-text'></span>";
						else {
							l_html += "<span class='pro-text'>" + l_map.specialities + "</span>";
							$('.c_specialities').text(l_map.specialities);
						}
						l_html += "</div>";
						l_html += "</div>";
						l_html += "</div>";
						l_html += "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
						l_html += "<div class='row'>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'> <span class='pro-heading'> Demo Class Available <span style='color:black;float:right;font-weight: bold;'>:</span> </span>";
						l_html += "</div>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 m-t-2'>";
						if (l_map.demoClassAvailable == null || l_map.demoClassAvailable == undefined || l_map.demoClassAvailable == '')
							l_html += "<span class='pro-text'></span>";
						if (l_map.demoClassAvailable == true)
							l_html += "<span class='pro-text'>Yes</span>";
						l_html += "</div>";
						l_html += "</div>";
						l_html += "</div>";
						l_html += "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
						l_html += "<div class='row'>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'> <span class='pro-heading'>Have Digital Pen<span style='color:black;float:right;font-weight: bold;'>:</span> </span>";
						l_html += "</div>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 m-t-2'>";
						if (l_map.haveDigitalPen == null || l_map.haveDigitalPen == undefined || l_map.haveDigitalPen == '')
							l_html += "<span class='pro-text'></span>";
						if (l_map.haveDigitalPen == true)
							l_html += "<span class='pro-text'>Yes</span>";
						l_html += "</div>";
						l_html += "</div></div>";
						l_html += "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
						l_html += "<div class='row'>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'> <span class='pro-heading'> Status <span style='color:black;float:right;font-weight: bold;'>:</span> </span>";
						l_html += "</div>";
						l_html += "<div class='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 m-t-2'>";
						if (l_map.status == null || l_map.status == undefined || l_map.status == '')
							l_html += "<span class='pro-text'></span>";
						else
							l_html += "<span class='pro-text'>Active</span>";
						l_html += "</div>";
						l_html += "</div>";
						l_html += "</div>";
						l_html += "</div>";
						l_html += "</div>";
						l_html += "</div>";
						$("#i_intro_data").replaceWith(l_html);
                        if(g_data.login)
						 $("#i_add_intro_click").replaceWith("<button id='i_edit_intro_click' type='button'  class='tool-edit-main' data-toggle='modal' data-target='#addIntro' onclick='loadEditIntro(\"EDIT\")'> <i class='fa fa-pencil icon'></i></button>");
					}
					// alert(JSON.stringify(l_data));
				}
				if (response.status == 'ERROR') {
					console.log(response.message);
				}
			});
}


function loadEditContact(p_flage,p_address_id) {debugger;
	if (p_flage == 'NEW'){
		$('#addcontact').modal('show');
		setTimeout(function() {
			loadCountries('NEW','none');
	    }, 2000);
	}
	if (p_flage == 'EDIT') {
		var b_countryId;
		for(var i=0;i<g_contact_data.length;i++){
			var l_map_outer = g_contact_data[i];
			var l_map_inner = l_map_outer.address_entity;
			b_countryId = l_map_inner.countryId;
			if(p_address_id==l_map_inner.addressId){
				var html = '';
				$('.c_addressId').val(p_address_id);
				if(!(l_map_inner.addressType == null || l_map_inner.addressType == undefined || l_map_inner.addressType =='')){
				if(l_map_inner.addressType=='HOME'){
					    html+='<option value="" >Address Type</option>';
				        html+='<option value="HOME" selected >HOME</option>';
				        html+='<option value="OFFICE">OFFICE</option>';
				}
				if(l_map_inner.addressType=='OFFICE'){
					    html+='<option value="" >Address Type</option>';
				        html+='<option value="OFFICE" selected >OFFICE</option>';
				        html+='<option value="HOME">HOME</option>';
				}
				
				}
				if(!(l_map_inner.addressTitle == null || l_map_inner.addressTitle == undefined || l_map_inner.addressTitle =='')){
					$('.c_addressTitle').val(l_map_inner.addressTitle);
				}
				if(!(l_map_inner.addressLine1 == null || l_map_inner.addressLine1 == undefined || l_map_inner.addressLine1 =='')){
					$('.c_addressLine1').val(l_map_inner.addressLine1);
				}
				if(!(l_map_inner.addressLine2 == null || l_map_inner.addressLine2 == undefined || l_map_inner.addressLine2 =='')){
					$('.c_addressLine2').val(l_map_inner.addressLine2);
				}
				if(!(l_map_inner.stateId == null || l_map_inner.stateId == undefined || l_map_inner.stateId =='')){
					$('.c_stateId').append("<option selected value='"+l_map_inner.stateId+"'>"+l_map_outer.state+"</option>");
				}
				if(!(l_map_inner.districtId == null || l_map_inner.districtId == undefined || l_map_inner.districtId =='')){
					$('.c_districtId').append("<option selected value='"+l_map_inner.districtId+"'>"+l_map_outer.district+"</option>");
				}
				if(!(l_map_inner.cityId == null || l_map_inner.cityId == undefined || l_map_inner.cityId =='')){
					$('.c_cityId').append("<option selected value='"+l_map_inner.cityId+"'>"+l_map_outer.city+"</option>");
				}
				if(!(l_map_inner.pinCode == null || l_map_inner.pinCode == undefined || l_map_inner.pinCode =='')){
					$('.c_pinCode').val(l_map_inner.pinCode);
				}
				if(!(l_map_inner.addressPhoneNumber == null || l_map_inner.addressPhoneNumber == undefined || l_map_inner.addressPhoneNumber =='')){
					$('.c_addressPhoneNumber').val(l_map_inner.addressPhoneNumber);
				}
				if(!(l_map_inner.contactEmailId == null || l_map_inner.contactEmailId == undefined || l_map_inner.contactEmailId =='')){
					$('.c_contactEmailId').val(l_map_inner.contactEmailId);
				}
				$('.c_addressType').html(html);
			}
		}
		$('#addcontact').modal('show');
		loadCountries('EDIT',b_countryId);
	}

	
}


function saveContact(p_form_id) {debugger;

	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	
	if(!($('.c_contactEmailId').val()=='')){
		if(!isValidEmail($('.c_contactEmailId').val())){
			$('.c_error_contact').text("Invalid email.");
			 setTimeout(function() {
				 $('.c_error_contact').text('');
		     }, 5000);
			return;
		}
	}
	if(!($('.c_addressPhoneNumber').val()=='')){
		if(!isValidMobile($('.c_addressPhoneNumber').val())){
			$('.c_error_contact').text("Invalid mobile.");
			 setTimeout(function() {
				 $('.c_error_contact').text('');
		     }, 5000);
			return;
		}
	}
	if(!($('.c_pinCode').val()=='')){
		if(!isValidPin($('.c_pinCode').val())){
			$('.c_error_contact').text("Invalid pin.");
			 setTimeout(function() {
				 $('.c_error_contact').text('');
		     }, 5000);
			return;
		}
	}
	initializeLatLong();
    var l_map = {};
	l_map = readFormWithId(p_form_id);
	
	l_map.latitude=latitude;
	l_map.longitude=longitude;
	//alert(JSON.stringify(l_map));
	ajaxWithJSON("/tutor/save-contact-detail", l_map, 'POST',function(response) {
		        //alert(JSON.stringify(response));
				if(response.status == 'SUCCESS'){
					toastr.success(response.message);
					$('#addcontact').modal('hide');
					loadContactData();
					//location.reload();
				}
				if(response.status == 'ERROR'){
					$('.c_error_contact').text(response.message);
					 setTimeout(function() {
						 $('.c_error_contact').text('');
				     }, 5000);
					
				}
   });
}


var g_contact_data = {};
function loadContactData() { debugger;
	// alert("/tutor-contact-data");
	var l_map = g_data;
	var l_login=l_map.login;
	//alert(l_login);
	
	//alert(JSON.stringify(l_map))
	ajaxWithJSON("/tutor-contact-data", l_map, 'POST', function(response) {
				var l_data = response.object;
				// alert(JSON.stringify(response));
				if (response.status == 'SUCCESS') {
					g_contact_data = l_data;
					var html = "";
					var l_html = "";
					
					l_html += "<div class='card-body card-body-padding-pro pro-height' id='i_contact' style='overflow-y:auto;margin-bottom:10px;'>";
					l_html += "<div class='row'>";
					for (var i = 0; i < l_data.length; i++) {
						var l_map_outer = l_data[i];
						var l_map_inner = l_map_outer.address_entity; 
						l_html += "<div class='col-lg-12'>";
						l_html += "<div class='row'>";
						l_html += "<div class='col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2'>";
						if (l_map_inner.addressType == 'HOME')
							l_html += "<img src='resources/img/ico/ico3.png' alt='no image'>";
						if (l_map_inner.addressType == 'OFFICE')
							l_html += "<img src='resources/img/ico/ico4.png' alt='no image'>";
						l_html += "</div>"
						l_html += "<div class='col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10 m-t-2 onhover'>";
						l_html += "<div class='row'>";
						l_html += "<div class='col-lg-12'> <span class='pro-text' style='font-weight:600;'>"
								+ l_map_inner.addressTitle + "</span>";
						if(l_login)
							l_html += "<button type='button'  class='tool-edit' onclick=\"loadEditContact('EDIT','"+l_map_inner.addressId+"')\"> <i class='fa fa-pencil icon'></i></button></div>";	
						
						l_html += "<div class='col-lg-12'>";
						if (l_map_inner.addressPhoneNumber == null
								|| l_map_inner.addressPhoneNumber == undefined
								|| l_map_inner.addressPhoneNumber == '')
							l_html += "<span class='pro-small-text'></span>";
						else
							l_html += "<span class='pro-small-text'> +91"
									+ l_map_inner.addressPhoneNumber
									+ "</span>";
						l_html += "</div>"
						l_html += "<div class='col-lg-12'>";
						l_html += "<div class='row'>";
						l_html += "<div class='col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10'>";
						l_html += "<span class='pro-small-text-g'>";
						l_html += l_map_inner.addressLine1 + ","
								+ l_map_outer.city + ", ("
								+ l_map_inner.pinCode + ") ,"
								+ l_map_outer.state + "," + l_map_outer.country;
						l_html += "</span>";
						l_html += "</div>";
						/*l_html += "<div class='col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2'>";
						l_html += "<button type='button'  class='tool-edit red' onclick=\"deleteContact('"+l_map_inner.addressId+"')\"> <i class='fa fa-trash icon '></i></button>";
						l_html += " </div>";*/
						l_html += "</div> ";
						l_html += "</div>";
						l_html += "</div>";
						l_html += "</div>";
						l_html += "<div class='col-lg-12'><hr class='hr-profile'></div>";
						l_html += "</div>";
						l_html += "</div> ";

						//alert(l_html);

					}
					html = html +l_html;
					html += "</div> ";
					html += "</div> ";
					//alert(l_html);
					$("#i_contact").replaceWith(l_html);
					// alert(JSON.stringify(l_data));
				}
				if (response.status == 'ERROR') {
					console.log(response.message);
				}
			});
}

function loadEditQualification(p_flage,p_education_id) {debugger;
if (p_flage == 'NEW'){
	$('#addqualification').modal('show');
}
if (p_flage == 'EDIT') {
	//alert("p_education_id = " + p_education_id);
	for(var i=0;i<g_qualifications.length;i++){
		var b_map = g_qualifications[i];
		//alert("add qualification = " + JSON.stringify(b_map));
		if(p_education_id==b_map.educationId){
			
			var l_html = '';
			if(b_map.level=='10th' || b_map.level=='12th'){
			    
				l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
				l_html+='<div class="form-group newForm">'; 
				l_html+='<label class="control-label label-extended">Education</label>';      
				l_html+='<select name="education" class="c_education form-control extended" onchange="selectEducation()">';
				l_html+='<option value="Doctorate/PHD">Doctorate/PHD</option>';
				l_html+='<option value="Master/Post-Graduation">Master/Post-Graduation</option>';
				l_html+='<option value="Graduation">Graduation</option>';
				l_html+='<option value="Diploma">Diploma</option>';
				if(b_map.level=='12th'){
				    l_html+='<option value="12th" selected >12th</option>';
				    l_html+='<option value="10th" >10th</option>';
				}
				if(b_map.level=='10th'){
					l_html+='<option value="12th">12th</option>';
				    l_html+='<option value="10th" selected >10th</option>';
				}
				l_html+='</select>';
				l_html+='</div>';
				l_html+='</div>';
				l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
				l_html+='<div class="form-group newForm">'; 
				l_html+='<label class="control-label label-extended">Board</label>';
				l_html+='<input name="board" value="'+b_map.universityBoard+'" class="c_board form-control extended" list="i_board" onfocusout="selectBoard()" placeholder="Select Board">';
				l_html+='<span id="i_no_board"></span>';
				l_html+='<datalist id="i_board">';
				l_html+='</datalist>';
				l_html+='</div>';
				l_html+='</div>';
				l_html+='<div class="c_other_board col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>';
				l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
				l_html+='<div class="form-group newForm">'; 
				l_html+='<label class="control-label label-extended">Pass Out Year</label>';
				l_html+='<select name="passOutYear" class="c_passoutyear form-control extended">';
				var today = new Date();
			    var year = today.getFullYear();
			    for(var i=year;i>=(year-50);i--){
			    	if(parseInt(b_map.passOutYear)==i){
			    		l_html+='<option selected value="'+i+'">'+i+'</option>';
			    	}else{
			    	     l_html+='<option value="'+i+'">'+i+'</option>';
			    	}
			    }
			    l_html+='</select>';
			    l_html+='</div>';
			    l_html+='</div>';
			    l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
			    l_html+='<div class="form-group newForm">';
			    l_html+='<label class="control-label label-extended">Medium</label>';
				l_html+='<input name="mediumId" value="'+b_map.medium+'" class="c_medium form-control extended" list="i_medium" onfocusout="selectMedium()" placeholder="Select Medium">';
				l_html+='<span id="i_no_medium"></span>';
				l_html+='<datalist id="i_medium">';
				l_html+='</datalist>';
				l_html+='</div>';
				l_html+='</div>';
				l_html+='</div>';
				l_html+='</div>';

				
			}
				if(b_map.level=='Master/Post-Graduation' || b_map.level=='Graduation' || b_map.level=='Doctorate/PHD' || b_map.level=='Diploma'){
					
					l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
					l_html+='<div class="form-group newForm">'; 
					l_html+='<label class="control-label label-extended">Education</label>';      
					l_html+='<select name="education" class="c_education form-control extended" onchange="selectEducation()">';
					
					if(b_map.level=='Doctorate/PHD'){
						l_html+='<option value="Doctorate/PHD" selected >Doctorate/PHD</option>';
						l_html+='<option value="Master/Post-Graduation">Master/Post-Graduation</option>';
						l_html+='<option value="Graduation">Graduation</option>';
						l_html+='<option value="Diploma">Diploma</option>';
					}
					if(b_map.level=='Master/Post-Graduation'){
						l_html+='<option value="Doctorate/PHD"  >Doctorate/PHD</option>';
						l_html+='<option value="Master/Post-Graduation" selected >Master/Post-Graduation</option>';
						l_html+='<option value="Graduation">Graduation</option>';
						l_html+='<option value="Diploma">Diploma</option>';
					}
					
					if(b_map.level=='Graduation'){
						l_html+='<option value="Doctorate/PHD"  >Doctorate/PHD</option>';
						l_html+='<option value="Master/Post-Graduation" >Master/Post-Graduation</option>';
						l_html+='<option value="Graduation" selected >Graduation</option>';
						l_html+='<option value="Diploma">Diploma</option>';
					}
					if(b_map.level=='Diploma'){
						l_html+='<option value="Dotoracte/PHD"  >Doctorate/PHD</option>';
						l_html+='<option value="Master/Post-Graduation" >Master/Post-Graduation</option>';
						l_html+='<option value="Graduation">Graduation</option>';
						l_html+='<option value="Diploma" selected >Diploma</option>';
					}
				    l_html+='<option value="12th" >12th</option>';
				    l_html+='<option value="10th" >10th</option>';
					l_html+='</select>';
					l_html+='</div>';
					l_html+='</div>';
					
					//alert("branch = " + b_map.branch);
					//alert("education type id  = " + b_map.educationTypeId);
					l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
					l_html+='<div class="form-group newForm">'; 
					l_html+='<label class="control-label label-extended">Course</label>'; 
					l_html+='<input name="educationType" valu="'+b_map.educationTypeId+'" class="c_education_type form-control extended" list="i_education_type" onfocusout="selectEducationType()" placeholder="Select Course">';
					l_html+='<span id="i_no_education_type"></span>';
					l_html+='<datalist id="i_education_type">';
					l_html+='</datalist>';
					l_html+='</div>';
					l_html+='</div>';
					l_html+='<div class="c_other_education_type col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>';
					l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
					l_html+='<div class="form-group newForm">'; 
					l_html+='<label class="control-label label-extended">Specialization/Branch</label>'; 
					l_html+='<input name="educationBranch" value="'+b_map.branch+'" class="c_education_branch form-control extended" list="i_education_branch" onfocusout="selectEducationBranches()" placeholder="Select Specialization/Branch">';
					l_html+='<span id="i_no_education_branch"></span>';
					l_html+='<datalist id="i_education_branch" >';
					l_html+='</datalist>';
					l_html+='</div>';
					l_html+='</div>';
					l_html+='<div class="c_other_education_branch col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>';;
					l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
					l_html+='<div class="form-group newForm">'; 
					l_html+='<label class="control-label label-extended">University/Institute</label>'; 
					l_html+='<input name="institute" value="'+b_map.instituteId+'" class="c_institute form-control extended" list="i_institute" onfocusout="selectInstitute()" placeholder="Select University/Institute">';
					l_html+='<span id="i_no_institute"></span>';
					l_html+='<datalist id="i_institute">';
					l_html+='<option value="other">';
					l_html+='</datalist>';
					l_html+='</div>';
					l_html+='</div>';
					l_html+='<div class="c_other_institute col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>';
					l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
					l_html+='<div class="form-group newForm">'; 
					l_html+='<label class="control-label label-extended">Course Type</label>'; 
					l_html+='<select name="courseType" class="c_courseType form-control extended">';
					if(b_map.courseType=='Full Time')
					l_html+='<option selected value="Full Time" >Full Time</option>';
					else
						l_html+='<option value="Full Time" >Full Time</option>';
					if(b_map.courseType=='Part Time')
						l_html+='<option selected value="Part Time">Part Time</option>';
					else
						l_html+='<option value="Part Time">Part Time</option>';
					if(b_map.courseType=='Correspondence/Distance')
					  l_html+='<option selected value="Correspondence/Distance">Correspondence/Distance</option>';
					else
						l_html+='<option value="Correspondence/Distance">Correspondence/Distance</option>';
						
					l_html+='</select>';
					l_html+='</div>';
					l_html+='</div>';
					
					l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
					l_html+='<div class="form-group newForm">'; 
					l_html+='<label class="control-label label-extended">Pass Out Year</label>'; 
					l_html+='<select name="passOutYear" class="c_passoutyear form-control extended">';
					var today = new Date();
				    var year = today.getFullYear();
				    for(var i=year;i>=(year-50);i--){
				    	if(parseInt(b_map.passOutYear)==i){
				    		l_html+='<option selected value="'+i+'">'+i+'</option>';
				    	}else{
				    	     l_html+='<option value="'+i+'">'+i+'</option>';
				    	}
				    }
				    l_html+='</select>';
				    l_html+='</div>';
				    l_html+='</div>';
				    
				 
					l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
					l_html+='<div class="form-group newForm">'; 
					l_html+='<label class="control-label label-extended">Start Date</label>'; 
					l_html+='<input name="startDate" value="'+b_map.startDate+'" type="date" class="c_startDate form-control extended" placeholder="Enter Start Date">';
					l_html+='</div>';
					l_html+='</div>';
					l_html+='</div>';
					
					l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
					l_html+='<div class="form-group newForm">'; 
					l_html+='<label class="control-label label-extended">End Date</label>'; 
					l_html+='<input name="endDate" value="'+b_map.endDate+'" type="date" class="c_endDate form-control extended" placeholder="Enter End Date">';
					l_html+='</div>';
					l_html+='</div>';
					l_html+='</div>';
				
				}

				    l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
					l_html+='<div class="form-group newForm">'; 
					l_html+='<label class="control-label label-extended">Marks System</label>'; 
					l_html+='<select name="marksSystem" class="c_marksSystem form-control extended" onchange="markSystem()">';
                    if(b_map.isGradeOrPercentage=='PERCENTAGE')
					l_html+='<option selected value="PERCENTAGE">Percentage(0 to 100)%</option>';
                    else
                    	l_html+='<option value="PERCENTAGE">Percentage(0 to 100)%</option>';
                    if(b_map.isGradeOrPercentage=='SCALE10')
					l_html+='<option selected value="SCALE10" >Scale 10 Grading(0.1 to 10)</option>';
                    else
                    	l_html+='<option value="SCALE10" >Scale 10 Grading(0.1 to 10)</option>';
                    if(b_map.isGradeOrPercentage=='SCALE4')
					l_html+='<option selected value="SCALE4">Scale 4 Grading(0.1 to 4</option>';
                    else
                    	l_html+='<option value="SCALE4">Scale 4 Grading(0.1 to 4</option>';
                    if(b_map.isGradeOrPercentage=='SCALE4')
					l_html+='<option selected value="PASS">Require Passing</option>';
                    else
                    	l_html+='<option value="PASS">Require Passing</option>';
                    
					l_html+='</select>';
					l_html+='</div>';
					l_html+='</div>';
					l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
					l_html+='<div class="c_marks form-group newForm">'; 
					if(b_map.isGradeOrPercentage=='PERCENTAGE'){
						l_html+='<input type="text" name="marks" value="'+b_map.gradePercentage+'" placeholder="Enter Percentage(0 to 100)%">';
			    	   }
			    	   if(b_map.isGradeOrPercentage=='SCALE10'){
			    		   l_html+='<input type="text" name="marks" value="'+b_map.gradePercentage+'" placeholder="Enter Scale(0.1 to 10)">';
			    	   }
			    	   if(b_map.isGradeOrPercentage=='SCALE4'){
			    		   l_html+='<input type="text" name="marks" value="'+b_map.gradePercentage+'" placeholder="Enter Scale(0.1 to 4)">';
			    	   }
			    	   if(b_map.isGradeOrPercentage =='PASS'){
			    		   l_html+='<input type="text" name="marks" value="'+b_map.gradePercentage+'" placeholder="Enter Pass/Fail">';
			    	   }
					l_html+='</div>';
					l_html+='</div>';
				
		        $('.c_form_area').html(l_html);
		        $('#addqualification').modal('show');
		        $('.c_education_id').val(p_education_id);
		        if($('.c_education').val()=='10th' || $('.c_education').val()=='12th'){
		        	loadBoards();
		        	loadMediums();
		        }
		        if($('.c_education').val()=='Master/Post-Graduation' || $('.c_education').val()=='Graduation' || $('.c_education').val()=='Doctorate/PHD' || $('.c_education').val()=='Diploma'){
		        	 loadEducationTypes();
		        	 loadInstitutes();
		        }
		    	
		}
	}
	
}


}

function saveQualification(i_education_form) {debugger;
	var l_form_data = {};
	l_form_data = readForm(i_education_form);
	//alert(JSON.stringify(l_form_data));
	ajaxWithJSON("/common/save-qualification-detail", l_form_data, 'POST', function(response) {
		var l_data = response.object;
		//alert(JSON.stringify(response));
		if (response.status == 'SUCCESS') {
			$('#addqualification').modal('hide');
			toastr.success(response.message);
			location.reload();
			
		}
		if (response.status == 'ERROR') {
			$('.c_add_qualification_error').html(response.message);
			setTimeout(function(){ $('.c_add_qualification_error').html(''); }, 3000);
			
		}
	});

}
var g_qualifications = [];
function loadQualificationData() {
	var l_map = g_data;
	var l_login=l_map.login;
	//alert(l_login);
	
	//var l_map = {};
	ajaxWithJSON("/common/load-user-qualifications", l_map, 'POST', function(response) {
		var l_data = response.object;
		
		//alert(JSON.stringify(response));
		if (response.status == 'SUCCESS') {
			g_qualifications = l_data;
             var l_html = "";
             l_html+='<div class="card-body card-body-padding-pro pro-height-s" id="style-8" style="overflow-y:auto;margin-bottom:15px;">';
             l_html+='<div class="row">'; 
             for(var i=0;i<l_data.length;i++){
            	 var b_map = l_data[i];
             l_html+='<div class="col-lg-12">';
             l_html+='<div class="row">';
             l_html+='<div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"> <span class="certificate-icon"><span style="font-size:15px;font-weight: 600;">'+b_map.level+'</span></span>';
             l_html+=' </div>';
             l_html+='<div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10 m-t-2 onhover">';
             l_html+='<div class="row">';
             l_html+='<div class="col-lg-12 p-l-0">';
             l_html+='<div class="row">';
             l_html+='<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-l-r-0">';
             if(b_map.level=='10th' || b_map.level=='12th')
                 l_html+='<span class="pro-text" style="font-weight:600;">'+b_map.level+'</span>';
             else{
            	 l_html+='<span class="pro-text" style="font-weight:600;">'+b_map.educationTypeId+'</span>';
             }
             l_html+='</div>'; 
             if(l_login)
             l_html+='<button type="button"  class="tool-edit" onclick="loadEditQualification(\'EDIT\',\''+b_map.educationId+'\')"> <i class="fa fa-pencil icon"></i></button>'; 
             l_html+='<div class="col-lg-12 p-l-r-0">';
             l_html+='<span class="pro-small-text "> '+b_map.passOutYear+' </span>';      
             l_html+='</div>';
             l_html+='<div class="col-lg-12 p-l-r-0">';
             if(b_map.level=='10th' || b_map.level=='12th')
                l_html+='<span class="pro-small-text "> '+b_map.universityBoard+' </span> ';
             else
            	 l_html+='<span class="pro-small-text "> '+b_map.instituteId+' </span> ';
             
                  
             l_html+='</div>';
             l_html+='</div>';
             l_html+='</div> ';  
             l_html+='</div> ';      
             l_html+='</div>';
             l_html+='<div class="col-lg-12"><hr class="hr-profile"></div>';
             l_html+='</div>';
             l_html+='</div>';
             }	
					
             l_html+='</div>';
             l_html+='</div>';
			$('#i_qualification').replaceWith(l_html);
		}
		if (response.status == 'ERROR') {
			console.log(response.message);
		}
	});
}

function loadEditCertificate(p_flage,p_certificate_id){
	
	if (p_flage == 'NEW'){
		$('#addcertificates').modal('show');
	}
	if (p_flage == 'EDIT') {
		for(var i=0;i<g_certificate_data.length;i++){
			var b_map = g_certificate_data[i];
			if(p_certificate_id==b_map.userCertificationsId){
				$('.c_certification_id').val(p_certificate_id);
				$('.c_certificationName').val(b_map.certificationName);
				$('.c_certificationAuthority').val(b_map.certificationAuthority);
				$('.c_certificationNumber').val(b_map.certificationNumber);
			}
	}
		$('#addcertificates').modal('show');
}
}

function saveCertificate(p_form_id) {
	var l_form_data = {};
	l_form_data = readFormWithId(p_form_id);
	//alert(JSON.stringify(l_form_data));
	ajaxWithJSON("/common/save-certificate-detail", l_form_data, 'POST', function(response) {
		if (response.status == 'SUCCESS') {
			$('#addcertificates').modal('hide');
			toastr.success(response.message);
			location.reload();
			

		}
		if (response.status == 'ERROR') {
			$('.c_certificate_error').html(response.message);
			setTimeout(function(){ $('.c_certificate_error').html(''); }, 3000);
			toastr.error(response.message);

		}

	});

}
var g_certificate_data = [];
function loadCertificationData() {
	
	var l_map = g_data;
	var l_login=l_map.login;
	//alert(l_login);
	
	//var l_map = {};
	ajaxWithJSON("/common/load-user-certifications", l_map, 'POST', function(response) {
		var l_data = response.object;
		//alert(JSON.stringify(response));
		if (response.status == 'SUCCESS') {
			g_certificate_data = l_data;
            var l_html = '';
            l_html+='<div class="card-body card-body-padding-pro pro-height-sm2" id="style-8" style="overflow-y:auto;margin-bottom:15px;">';
            l_html+='<div class="row">';
            for(var i=0;i<l_data.length;i++){
            	var b_map = l_data[i];
            	l_html+='<div class="col-lg-12">';
            	l_html+='<div class="row">';
            	l_html+='<div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">';
            	l_html+='<img src="resources/img/ico/ico1.png" alt="certificate-icon">'; 
            	l_html+='</div>';
            	l_html+='<div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10 m-t-2 onhover">';
            	l_html+='<div class="row">';
            	l_html+='<div class="col-lg-12">'; 
            	if(l_login)
            	l_html+='<span class="pro-text">'+b_map.certificationName+'</span><button type="button"  class="tool-edit" onclick="loadEditCertificate(\'EDIT\',\''+b_map.userCertificationsId+'\')"> <i class="fa fa-pencil icon"></i></button></div>';
            	l_html+='<div class="col-lg-12">';
            	l_html+='<div class="row">';
            	l_html+='<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6"> <span class="pro-heading"> Authority <span style="color:black;float:right;font-weight: bold;">:</span> </span>';
            	l_html+='</div>';
            	l_html+='<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 m-t-2"> <span class="pro-heading"> '+b_map.certificationAuthority+'</span></div>';
            	l_html+='</div>';
            	l_html+='</div>';
            	l_html+='<div class="col-lg-12">';
            	l_html+='<div class="row">';
            	l_html+='<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-5"> <span class="pro-heading"> Certification Number/ID <span style="color:black;float:right;font-weight: bold;">:</span> </span>';
            	l_html+='</div>';
            	l_html+='<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 m-t-2"> <span class="pro-heading">'+b_map.certificationNumber+'</span></div>';
            	l_html+='</div>';
                l_html+='</div>';
                l_html+='</div>';
                l_html+='</div>';
                l_html+='<div class="col-lg-12"><hr class="hr-profile"></div>';
			    l_html+='</div>';
                l_html+='</div>';
            }
            l_html+='</div>';
            l_html+='</div>'; 
            $('#i_certificate').replaceWith(l_html);
		}
		if (response.status == 'ERROR') {
			console.log(response.message);
		}
	});
}


function loadEditProfessional(p_flage,p_professional_id){
	
	if (p_flage == 'NEW'){
		$('#addprofessional').modal('show');
	}
	if (p_flage == 'EDIT') {
		for(var i=0;i<g_professional_data.length;i++){
			var b_map = g_professional_data[i];
			if(p_professional_id==b_map.userProfessionalDetailId){
				$('.c_professional_id').val(p_professional_id);
				$('.c_jobTitle').val(b_map.jobTitle);
				$('.c_occupation').val(b_map.occupation);
				$('.c_organization').val(b_map.organization );
				var l_date=b_map.startDate;
				var startDate = getDateFormat(l_date);
				var l_dateE=b_map.endDate;
				var endDate = getDateFormat(l_dateE);
				
				$('.c_startDate').val(startDate);
				$('.c_endDate').val(endDate);
				if(b_map.currentWorking)
				   $('#i_currently').prop('checked', true);
			}
	}
		$('#addprofessional').modal('show');
}
}
function saveProfessional(p_form_id) {
	var l_form_data = {};
	l_form_data = readFormWithId(p_form_id);
	var startDate=l_form_data.startDate;
	var endDate=l_form_data.endDate;
	
	if(startDate > endDate){
		$(".c_error_professional").html("please select start date less from end date ");
		return;
	}
	
	// alert(JSON.stringify(l_form_data));
	ajaxWithJSON("/common/save-professional-detail", l_form_data, 'POST', function(response) {
		if (response.status == 'SUCCESS') {
			$('#addprofessional').modal('hide');
			location.reload();
			toastr.success(response.message);
			

		}
		if (response.status == 'ERROR') {
			$('.c_professional_error').html(response.message);
			setTimeout(function(){ $('.c_professional_error').html(''); }, 3000);
			toastr.error(response.message);

		}

	});
}
var g_professional_data = [];
function loadProfessionalData() {
	var l_map = g_data;
	var l_login=l_map.login;
	//alert(l_login);
	
	//var l_map = {};
	ajaxWithJSON("/common/load-user-professional-detail", l_map, 'POST', function(response) {
		var l_data = response.object;
		//alert(JSON.stringify(response));
		if (response.status == 'SUCCESS') {
			g_professional_data = l_data;
			//alert(JSON.stringify(g_professional_data));
            var l_html = '';
            l_html+='<div class="card-body card-body-padding-pro pro-height-s" id="style-8" style="overflow-y:auto;margin-bottom:15px;">';
            l_html+='<div class="row">';
            for(var i=0;i<l_data.length;i++){
            	var b_map = l_data[i];
            	var startDate=b_map.startDate;
            	var endDate=b_map.endDate;
            	var l_date=b_map.startDate;
				var startDate = getDateFormat(l_date);
            	
//            	var l_dateStart = new Date(Number(l_date));
//            	var weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
//            	var monthname=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")       
//            	var l_day = (weekday[l_dateStart.getDay()] + " ")
//                var l_date = (l_dateStart.getDate() + " ")
//                var l_month = (monthname[l_dateStart.getMonth()] + " ")
//                var l_year = (l_dateStart.getFullYear())
//            	var startDate=l_day+l_date+l_month+l_year;
            	
            	if(startDate==null || startDate=='undefined'){
            		startDate="";
            	}
            	
            	var l_dateE=b_map.endDate;
            	var endDate = getDateFormat(l_dateE);
//            	var l_dateEnd = new Date(Number(l_dateE));
//            	var weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday")
//            	var monthname=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")       
//            	var l_day = (weekday[l_dateEnd.getDay()] + " ")
//                var l_date = (l_dateEnd.getDate() + " ")
//                var l_month = (monthname[l_dateEnd.getMonth()] + " ")
//                var l_year = (l_dateEnd.getFullYear())
//            	var endDate=l_day+l_date+l_month+l_year;
            	
            	if(endDate==null || endDate=='undefined'){
            		endDate="";
            	}
            
            l_html+='<div class="col-lg-12">';
            l_html+='<div class="row">';
            l_html+='<div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"> <span class="certificate-icon"><span style="font-size:15px;font-weight: 600;">'+b_map.occupation+'</span></span>';
            l_html+='</div>';
            l_html+='<div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10 m-t-2 onhover">';
            l_html+='<div class="row">';
            l_html+='<div class="col-lg-12 p-l-0">';
            l_html+='<div class="row">';
            l_html+='<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-l-r-0">';
            l_html+='<span class="pro-text capitalize" style="font-weight:600;">'+b_map.jobTitle+'</span>';
            l_html+='</div>';
            if(l_login)				  
            l_html+='<button type="button"  class="tool-edit" onclick="loadEditProfessional(\'EDIT\',\''+b_map.userProfessionalDetailId+'\')"> <i class="fa fa-pencil icon"></i></button>';
								 
            l_html+='<div class="col-lg-12 p-l-r-0">';
            l_html+='<span class="pro-small-text ">Session:  '+startDate+' to '+endDate+' </span> ';     
            l_html+='</div>';
            l_html+='<div class="col-lg-12 p-l-r-0">';
            l_html+='<span class="pro-small-text ">Organization: '+b_map.organization+'</span>';      
            l_html+='</div>';
            l_html+='</div>';
            l_html+='</div>';   
            l_html+='</div> ';      
            l_html+='</div>';
            l_html+='<div class="col-lg-12"><hr class="hr-profile"></div>';
            l_html+='</div>';
            l_html+='</div>';  
            }		 
					 
            l_html+='</div>';
            l_html+='</div>';
            $('#i_professional').replaceWith(l_html);
		}
		if (response.status == 'ERROR') {
			console.log(response.message);
		}
	});
}

function loadBatchData() {

	var l_map = g_data;
	//alert(JSON.stringify(l_map));
	//var l_map = {};
	var l_html = "";
	$('#i_batches').html("");
	l_map.top = true;
	ajaxWithJSON("/tutor-batches", l_map, 'POST', function(response) {
		var l_data = response.object;
		//alert("tutor batches = " + JSON.stringify(l_data));
		if (response.status == 'SUCCESS') {
            var l_html = '';
            l_html+='<div class="card-body card-body-padding-pro pro-height-sm" id="style-8" style="overflow-y:auto;margin-bottom:15px;">';
            l_html+='<div class="row">';
            for(var i=0;i<l_data.length;i++){
            	var b_map = l_data[i];
            	//alert("batches" + JSON.stringify(b_map));
            	
            	
            	
            l_html+='<div class="col-lg-12">';
            l_html+='<div class="row">';
            l_html+='<div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1"> ';
            l_html+='<img src="resources/img/ico/ico2.png" alt="batches-icon">';
            l_html+='</div>';
            l_html+='<div class="col-xl-11 col-lg-11 col-md-11 col-sm-11 col-xs-11 m-t-2">';
            l_html+='<div class="row">';
            l_html+='<div class="col-lg-12"> <span class="pro-text">'+b_map.batchName+'</span></div>'; 
            l_html+='<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-2">'; 
            l_html+='<span class="pro-heading m-10"><i class="fa fa-dot-circle-o m-r-5" aria-hidden="true"></i>Batch Mode : '+b_map.batchMode+'</span>';
            l_html+='<span class="pro-heading m-10"><i class="fa fa-dot-circle-o m-r-5" aria-hidden="true"></i>Fees : &#x20B9;  '+b_map.feeAmount+'</span>';
            l_html+='<span class="pro-heading m-10"><i class="fa fa-dot-circle-o m-r-5" aria-hidden="true"></i>Status : '+b_map.status+'</span>';
            l_html+='<span class="pro-heading m-10"><i class="fa fa-dot-circle-o m-r-5" aria-hidden="true"></i>Timing : '+ b_map.batchStartTime + '-' + b_map.batchEndTime+'</span>'; 
            l_html+='</div>';    
            l_html+='</div>';
            l_html+='</div>';
            l_html+='<div class="col-lg-12"><hr class="hr-profile"></div>';
            l_html+='</div>';
            l_html+='</div>';
            }
            l_html+='</div>';
            l_html+='</div>';
            if(!(l_data.length==0))
             $('#i_batches').replaceWith(l_html);
		}
		if (response.status == 'ERROR') {
			console.log(response.message);
		}
	});
}

function loadCountries(p_flage,p_country_id){
	var l_map = {};
	l_map.get = 'COUNTRIES';
	ajaxWithJSON("/common/get-region-detail", l_map, 'POST',function(response) {
		//alert(JSON.stringify(response));
				if(response.status == 'SUCCESS'){
					var data = response.object;
					for(var i=0;i<data.length;i++){
						var b_map = data[i];
						if(p_flage=='EDIT'){
						if(p_country_id==b_map.countryId)
							$('.c_countryId').append('<option selected value='+b_map.countryId+'>'+b_map.countryName+'</option>');
						else
						  $('.c_countryId').append('<option value='+b_map.countryId+'>'+b_map.countryName+'</option>');
						}
						if(p_flage=='NEW'){
							$('.c_countryId').append('<option value='+b_map.countryId+'>'+b_map.countryName+'</option>');
						}
					}
					
				}
				if(response.status == 'ERROR'){
					toastr.error(response.message);
				}

	});
}
function loadStates(){
	var l_map = {};
	l_map.get = 'STATES';
	l_map.countryId = $('.c_countryId').val();
	ajaxWithJSON("/common/get-region-detail", l_map, 'POST',function(response) {
		//alert(JSON.stringify(response));
		if(response.status == 'SUCCESS'){
			var data = response.object;
			for(var i=0;i<data.length;i++){
				var b_map = data[i];
				$('.c_stateId').append('<option value='+b_map.stateId+'>'+b_map.stateName+'</option>');
			}
		}
		if(response.status == 'ERROR'){
			toastr.error(response.message);
		}

	});
}
function loadDistricts(){
	var l_map = {};
	l_map.stateId = $('.c_stateId').val();
	l_map.get = 'DISTRICTS';
	ajaxWithJSON("/common/get-region-detail", l_map, 'POST',function(response) {
		//alert(JSON.stringify(response));
		if(response.status == 'SUCCESS'){
			var data = response.object;
			for(var i=0;i<data.length;i++){
				var b_map = data[i];
				$('.c_districtId').append('<option value='+b_map.districtId+'>'+b_map.districtName+'</option>');
			}
		}
		if(response.status == 'ERROR'){
			toastr.error(response.message);
		}

	});
}
function loadCities(){
	var l_map = {};
	l_map.get = 'CITIES';
	l_map.districtId = $('.c_districtId').val();
	ajaxWithJSON("/common/get-region-detail", l_map, 'POST',function(response) {
		//alert(JSON.stringify(response));
		if(response.status == 'SUCCESS'){
			var data = response.object;
			for(var i=0;i<data.length;i++){
				var b_map = data[i];
				$('.c_cityId').append('<option value='+b_map.cityId+'>'+b_map.cityName+'</option>');
			}
		}
		if(response.status == 'ERROR'){
			toastr.error(response.message);
		}

	});
}

function selectEducation(){
	var l_html = '';
	if($('.c_education').val()=='10th' || $('.c_education').val()=='12th'){
	    
		l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
		l_html+='<div class="form-group newForm">'; 
		l_html+='<label class="control-label label-extended">Education</label>';      
		l_html+='<select name="education" class="c_education form-control extended" onchange="selectEducation()">';
		l_html+='<option value="Doctorate/PHD">Doctorate/PHD</option>';
		l_html+='<option value="Master/Post-Graduation">Master/Post-Graduation</option>';
		l_html+='<option value="Graduation">Graduation</option>';
		l_html+='<option value="Diploma">Diploma</option>';
		if($('.c_education').val()=='12th'){
		    l_html+='<option value="12th" selected >12th</option>';
		    l_html+='<option value="10th" >10th</option>';
		}
		if($('.c_education').val()=='10th'){
			l_html+='<option value="12th">12th</option>';
		    l_html+='<option value="10th" selected >10th</option>';
		}
		l_html+='</select>';
		l_html+='</div>';
		l_html+='</div>';
		l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
		l_html+='<div class="form-group newForm">'; 
		l_html+='<label class="control-label label-extended">Board</label>';
		l_html+='<input name="board" class="c_board form-control extended" list="i_board" onfocusout="selectBoard()" placeholder="Select Board">';
		l_html+='<span id="i_no_board"></span>';
		l_html+='<datalist id="i_board">';
		l_html+='</datalist>';
		l_html+='</div>';
		l_html+='</div>';
		l_html+='<div class="c_other_board col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>';
		l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
		l_html+='<div class="form-group newForm">'; 
		l_html+='<label class="control-label label-extended">Pass Out Year</label>';
		l_html+='<select name="passOutYear" class="c_passoutyear form-control extended">';
		var today = new Date();
	    var year = today.getFullYear();
	    for(var i=year;i>=(year-50);i--){
	    	l_html+='<option value="'+i+'">'+i+'</option>';
	    }
	    l_html+='</select>';
	    l_html+='</div>';
	    l_html+='</div>';
	    l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
	    l_html+='<div class="form-group newForm">';
	    l_html+='<label class="control-label label-extended">Medium</label>';
		l_html+='<input name="mediumId" class="c_medium form-control extended" list="i_medium" onfocusout="selectMedium()" placeholder="Select Medium">';
		l_html+='<span id="i_no_medium"></span>';
		l_html+='<datalist id="i_medium">';
		l_html+='</datalist>';
		l_html+='</div>';
		l_html+='</div>';
		l_html+='</div>';
		l_html+='</div>';

		
	}
		if($('.c_education').val()=='Master/Post-Graduation' || $('.c_education').val()=='Graduation' || $('.c_education').val()=='Doctorate/PHD' || $('.c_education').val()=='Diploma'){
			
			l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
			l_html+='<div class="form-group newForm">'; 
			l_html+='<label class="control-label label-extended">Education</label>';      
			l_html+='<select name="education" class="c_education form-control extended" onchange="selectEducation()">';
			
			if($('.c_education').val()=='Doctorate/PHD'){
				l_html+='<option value="Doctorate/PHD" selected >Doctorate/PHD</option>';
				l_html+='<option value="Master/Post-Graduation">Master/Post-Graduation</option>';
				l_html+='<option value="Graduation">Graduation</option>';
				l_html+='<option value="Diploma">Diploma</option>';
			}
			if($('.c_education').val()=='Master/Post-Graduation'){
				l_html+='<option value="Doctorate/PHD"  >Doctorate/PHD</option>';
				l_html+='<option value="Master/Post-Graduation" selected >Master/Post-Graduation</option>';
				l_html+='<option value="Graduation">Graduation</option>';
				l_html+='<option value="Diploma">Diploma</option>';
			}
			
			if($('.c_education').val()=='Graduation'){
				l_html+='<option value="Doctorate/PHD"  >Doctorate/PHD</option>';
				l_html+='<option value="Master/Post-Graduation" >Master/Post-Graduation</option>';
				l_html+='<option value="Graduation" selected >Graduation</option>';
				l_html+='<option value="Diploma">Diploma</option>';
			}
			if($('.c_education').val()=='Diploma'){
				l_html+='<option value="Doctorate/PHD"  >Doctorate/PHD</option>';
				l_html+='<option value="Master/Post-Graduation" >Master/Post-Graduation</option>';
				l_html+='<option value="Graduation">Graduation</option>';
				l_html+='<option value="Diploma" selected >Diploma</option>';
			}
		    l_html+='<option value="12th" >12th</option>';
		    l_html+='<option value="10th" >10th</option>';
			l_html+='</select>';
			l_html+='</div>';
			l_html+='</div>';
			
		
			l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
			l_html+='<div class="form-group newForm">'; 
			l_html+='<label class="control-label label-extended">Course</label>'; 
			l_html+='<input name="educationType" class="c_education_type form-control extended" list="i_education_type" onfocusout="selectEducationType()" placeholder="Select Course">';
			l_html+='<span id="i_no_education_type"></span>';
			l_html+='<datalist id="i_education_type">';
			l_html+='</datalist>';
			l_html+='</div>';
			l_html+='</div>';
			l_html+='<div class="c_other_education_type col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>';
			l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
			l_html+='<div class="form-group newForm">'; 
			l_html+='<label class="control-label label-extended">Specialization/Branch</label>'; 
			l_html+='<input name="educationBranch" class="c_education_branch form-control extended" list="i_education_branch" onfocusout="selectEducationBranches()" placeholder="Select Specialization/Branch">';
			l_html+='<span id="i_no_education_branch"></span>';
			l_html+='<datalist id="i_education_branch" >';
			l_html+='</datalist>';
			l_html+='</div>';
			l_html+='</div>';
			l_html+='<div class="c_other_education_branch col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>';;
			l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
			l_html+='<div class="form-group newForm">'; 
			l_html+='<label class="control-label label-extended">University/Institute</label>'; 
			l_html+='<input name="institute" class="c_institute form-control extended" list="i_institute" onfocusout="selectInstitute()" placeholder="Select University/Institute">';
			l_html+='<span id="i_no_institute"></span>';
			l_html+='<datalist id="i_institute">';
			l_html+='<option value="other">';
			l_html+='</datalist>';
			l_html+='</div>';
			l_html+='</div>';
			l_html+='<div class="c_other_institute col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>';
			l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
			l_html+='<div class="form-group newForm">'; 
			l_html+='<label class="control-label label-extended">Course Type</label>'; 
			l_html+='<select name="courseType" class="c_courseType form-control extended">';
			l_html+='<option value="Full Time" >Full Time</option>';
			l_html+='<option value="Part Time">Part Time</option>';
			l_html+='<option value="Correspondence/Distance">Correspondence/Distance</option>';
			l_html+='</select>';
			l_html+='</div>';
			l_html+='</div>';
			
			l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
			l_html+='<div class="form-group newForm">'; 
			l_html+='<label class="control-label label-extended">Pass Out Year</label>'; 
			l_html+='<select name="passOutYear" class="c_passoutyear form-control extended">';
			var today = new Date();
		    var year = today.getFullYear();
		    for(var i=year;i>=(year-50);i--){
		    	l_html+='<option value="'+i+'">'+i+'</option>';
		    }
		    l_html+='</select>';
		    l_html+='</div>';
		    l_html+='</div>';
		    
		 
			l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
			l_html+='<div class="form-group newForm">'; 
			l_html+='<label class="control-label label-extended">Start Date</label>'; 
			l_html+='<input name="startDate" type="date" class="c_startDate form-control extended" placeholder="Enter Start Date">';
			l_html+='</div>';
			l_html+='</div>';
			l_html+='</div>';
			
			l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
			l_html+='<div class="form-group newForm">'; 
			l_html+='<label class="control-label label-extended">End Date</label>'; 
			l_html+='<input name="endDate" type="date" class="c_endDate form-control extended" placeholder="Enter End Date">';
			l_html+='</div>';
			l_html+='</div>';
			l_html+='</div>';
		
		}

		    l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
			l_html+='<div class="form-group newForm">'; 
			l_html+='<label class="control-label label-extended">Marks System</label>'; 
			l_html+='<select name="marksSystem" class="c_marksSystem form-control extended" onchange="markSystem()">';
			l_html+='<option value="">Select Marks</option>';
			l_html+='<option value="PERCENTAGE">Percentage(0 to 100)%</option>';
			l_html+='<option value="SCALE10" >Scale 10 Grading(0.1 to 10)</option>';
			l_html+='<option value="SCALE4">Scale 4 Grading(0.1 to 4</option>';
			l_html+='<option value="PASS">Require Passing</option>';
			l_html+='</select>';
			l_html+='</div>';
			l_html+='</div>';
			l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:20px;">';
			l_html+='<div class="c_marks form-group newForm">'; 
			l_html+='</div>';
			l_html+='</div>';
		
        $('.c_form_area').html(l_html);
        if($('.c_education').val()=='10th' || $('.c_education').val()=='12th'){
        	loadBoards();
        	loadMediums();
        }
        if($('.c_education').val()=='Master/Post-Graduation' || $('.c_education').val()=='Graduation' || $('.c_education').val()=='Doctorate/PHD' || $('.c_education').val()=='Diploma'){debugger;
        	 loadEducationTypes();
        	 loadInstitutes();
        }
    	
        
	}

       function markSystem(){debugger;
       
    	   if($('.c_marksSystem').val()=='PERCENTAGE'){
    		   $('.c_marks').html('<input type="text" name="marks" placeholder="Enter Percentage(0 to 100)%">');
    	   }
    	   if($('.c_marksSystem').val()=='SCALE10'){
    		   $('.c_marks').html('<input type="text" name="marks" placeholder="Enter Scale(0.1 to 10)">');
    	   }
    	   if($('.c_marksSystem').val()=='SCALE4'){
    		   $('.c_marks').html('<input type="text" name="marks" placeholder="Enter Scale(0.1 to 4)">');
    	   }
    	   if($('.c_marksSystem').val()=='PASS'){
    		   $('.c_marks').html('<input type="text" name="marks" placeholder="Enter Pass/Fail">');
    	   }
       }

		function selectBoard(){debugger;
		    var l_is_found = false;
		    $('#i_no_board').html('');
			if($('.c_board').val()=='Other'){
				$('.c_other_board').html('<input type="text" name="otherBoard" placeholder="Enter Board">');
			}else if(!($('.c_board').val()=='')){
				$('#i_board option').filter(function() {
			           if($(this).val() === $('.c_board').val()){
			        	   l_is_found = true;
			           }
			       });
				if(!l_is_found){
					$('.c_board').val('');
					$('#i_no_board').html('No result found.');
					setTimeout(function(){ $('#i_no_board').html(''); }, 3000);

				}
			}
			else{
			$('.c_other_board').html('');
			}
			
			
		}
		var g_boards = [];
		function loadBoards(){
			if(g_boards.length==0){
			ajaxWithJSON("/load-boards", null, 'GET',function(response) {
				var l_data = response.object;
				var l_html = '';
		        //alert(JSON.stringify(response));
				if(response.status == 'SUCCESS'){
					g_boards = l_data;
					for(var i=0;i<l_data.length;i++){
						var l_map = l_data[i];
						l_html+='<option value="'+l_map.boardShortName+'">';
					}
					l_html+='<option value="Other">';
					$('.i_board').html('');
					$('#i_board').html(l_html);
				}
				if(response.status == 'ERROR'){
					console.log(response.message);
					
				}
               });
			}else{
				var l_html = '';
				for(var i=0;i<g_boards.length;i++){
					var l_map = g_boards[i];
					l_html+='<option value="'+l_map.boardShortName+'">';
				}
				l_html+='<option value="Other">';
				$('#i_board').html('');
				$('#i_board').html(l_html);
			}
			
		}
		function selectMedium(){
			
		    var l_is_found = false;
          
			if(!($('.c_medium').val()=='')){
				$('#i_medium option').filter(function() {
			           if($(this).val() === $('.c_medium').val()){
			        	   l_is_found = true;
			           }
			       });
				if(!l_is_found){
					$('.c_medium').val('');
					$('#i_no_medium').html('No result found.');
					setTimeout(function(){ $('#i_no_medium').html(''); }, 3000);

				}
			}
			
		}
		var g_mediums = [];
		function loadMediums(){
			if(g_mediums.length==0){
				ajaxWithJSON("/load-mediums", null, 'GET',function(response) {
				var l_data = response.object;
				var l_html = '';
		        //alert(JSON.stringify(response));
				if(response.status == 'SUCCESS'){
					g_mediums = l_data;
					for(var i=0;i<l_data.length;i++){
						var l_map = l_data[i];
						l_html+='<option value="'+l_map.mediumName+'">';
					}
					l_html+='<option value="Other">';
					$('#i_medium').html(l_html);
				}
				if(response.status == 'ERROR'){
					console.log(response.message);
					
				}
               });
			}else{
				var l_html = '';
				for(var i=0;i<g_mediums.length;i++){
					var l_map = g_mediums[i];
					l_html+='<option value="'+l_map.mediumName+'">';
				}
				l_html+='<option value="Other">';
				$('#i_medium').html('');
				$('#i_medium').html(l_html);
			}
			
		}
		
		
		function selectEducationType(){debugger;
	    var l_is_found = false;
	    $('#i_no_education_type').html('');
		if($('.c_education_type').val()=='Other'){
			$('.c_other_education_type').html('<input type="text" name="otherEducationType" placeholder="Enter Course">');
		}else if(!($('.c_education_type').val()=='')){
			$('#i_education_type option').filter(function() {
		           if($(this).val() === $('.c_education_type').val()){
		        	   l_is_found = true;
		           }
		       });
			if(!l_is_found){
				$('.c_education_type').val('');
				$('#i_no_education_type').html('No result found.');
				setTimeout(function(){ $('#i_no_education_type').html(''); }, 3000);
	        	
			}
		}
		else{
		$('.c_other_education_type').html('');
		}

		if(l_is_found){
			loadEducationBranches();
		}
		
	}
		var g_education_types = [];
		function loadEducationTypes(){debugger;
			if(g_education_types.length==0){
				var l_map = {};
				    l_map.level = $('.c_education').val();
				    l_map.all = false;
				    
			ajaxWithJSON("/common/load-education-type", l_map, 'POST',function(response) {debugger;
				var l_data = response.object;
				var l_html = '';
		     // alert(JSON.stringify("load education type = " + l_data));
				if(response.status == 'SUCCESS'){
					g_education_types = l_data;
				//	alert(JSON.stringify(l_data));
					for(var i=0;i<l_data.length;i++){
						var l_map = l_data[i];
						//alert(JSON.stringify("education data = " + l_map));
						l_html+='<option value="'+l_map.educationShortName+'">';
					}
					l_html+='<option value="Other">';
					$('#i_education_type').html('');
					$('#i_education_type').html(l_html);
				}
				if(response.status == 'ERROR'){
					console.log(response.message);
					
				}
              });
			}else{
				for(var i=0;i<g_education_types.length;i++){
					var l_map = g_education_types[i];
					l_html+='<option value="'+l_map.educationShortName+'">';
				}
				l_html+='<option value="Other">';
				$('#i_education_type').html('');
				$('#i_education_type').html(l_html);
			}
		}
		function loadEducationBranches(){debugger;
			  var l_map = {};
			      l_map.list = false;
			 for(var i=0;i<g_education_types.length;i++){
					var b_map = g_education_types[i];
					//alert("load education branch = " + JSON.stringify(b_map));
					if(b_map.educationShortName == ($('.c_education_type').val()).trim()){
						l_map.educationTypeId = b_map.educationTypeId;
					}
			 }
			  
			ajaxWithJSON("/common/load-education-type-branch", l_map, 'POST',function(response) {
		        //alert(JSON.stringify(response));
		        var l_data = response.object;
				var l_html = '';
		       // alert(JSON.stringify(response));
				if(response.status == 'SUCCESS'){
					for(var i=0;i<l_data.length;i++){
						var l_map = l_data[i];
					//	alert("load education branch type = " + JSON.stringify(l_map));
						l_html+='<option value="'+l_map.educationBranchShortName+'">';
					}
					l_html+='<option value="Other">';
					$('#i_education_branch').html('');
					$('#i_education_branch').html(l_html);
				}
				if(response.status == 'ERROR'){
					console.log(response.message);
					
				}
              });
		}
		function selectEducationBranches(){
			
			  var l_is_found = false;
			    $('#i_no_education_branch').html('');
				if($('.c_education_branch').val()=='Other'){
					$('.c_other_education_branch').html('<input type="text" name="otherEducationBranch" placeholder="Enter Specialization">');
				}else if(!($('.c_education_branch').val()=='')){
					$('#i_education_branch option').filter(function() {
				           if($(this).val() === $('.c_education_branch').val()){
				        	   l_is_found = true;
				           }
				       });
					if(!l_is_found){
						$('.c_education_branch').val('');
						$('#i_no_education_branch').html('No result found.');
						setTimeout(function(){ $('#i_no_education_branch').html(''); }, 3000);
			        	
					}
				}
				else{
				$('.c_other_education_branch').html('');
				}

				
			
		}
		
		function selectInstitute(){
			var l_is_found = false;
		    $('#i_no_institute').html('');
			if($('.c_institute').val()=='Other'){
				$('.c_other_institute').html('<input type="text" name="otherBoard" placeholder="Enter Institute/University">');
			}else if(!($('.c_institute').val()=='')){
				$('#i_institute option').filter(function() {
			           if($(this).val() === $('.c_institute').val()){
			        	   l_is_found = true;
			           }
			       });
				if(!l_is_found){
					$('.c_institute').val('');
					$('#i_no_institute').html('No result found.');
					setTimeout(function(){ $('#i_no_institute').html(''); }, 3000);

				}
			}
			else{
			$('.c_other_institute').html('');
			}

			
		}
		
		var g_institutes = [];
		function loadInstitutes(){
			
				if(g_institutes.length==0){
				ajaxWithJSON("/load-institutes", null, 'GET',function(response) {
					var l_data = response.object;
					var l_html = '';
			        //alert(JSON.stringify(response));
					if(response.status == 'SUCCESS'){
						g_institutes = l_data;
						for(var i=0;i<l_data.length;i++){
							var l_map = l_data[i];
							l_html+='<option value="'+l_map.instituteName+'">';
						}
						l_html+='<option value="Other">';
						$('#i_institute').html('');
						$('#i_institute').html(l_html);
					}
					if(response.status == 'ERROR'){
						console.log(response.message);
						
					}
	               });
				}else{
					var l_html = '';
					for(var i=0;i<g_institutes.length;i++){
						var l_map = g_institutes[i];
						l_html+='<option value="'+l_map.instituteName+'">';
					}
					l_html+='<option value="Other">';
					$('#i_institute').html(l_html);
				}
				
			
			
		}

/*	    $( ".tags" ).autocomplete({
	        source: branchList,
	        select: function (event, ui) {
	            var v = ui.item.label;            
	           this.value = v;
	           $("#tags-value").val(ui.item.value);
	           return false;
	       }
	      });
	    } );*/
	


		function ratingStarCountProfile() {debugger;
			var p_html = "";
			
			$('.p_rating').html("");
			
			ajaxWithJSON("/common/load-star-count", g_data, 'POST', function(response) {debugger;
						var l_data = response.object;
						//alert(JSON.stringify(l_data));
						//var dataLength =l_data.length;
						var averageRating1=l_data.averageRating;
						var averageRating = averageRating1.toString();
						if(averageRating==null){
							averageRating='0';
						}
						//alert(averageRating);
							/*dynamic html code  */ 
							 
						p_html += '<span class="rating-text" style="font-weight: 500;margin-right: 5px;" >'+averageRating+'</span>';
						switch (averageRating) { 
						case "0":
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star "></span>';
							p_html += '<span class="fa fa-star "></span>';
							p_html += '<span class="fa fa-star "></span>';
							p_html += '<span class="fa fa-star "></span>';
							break;
							
						case "1":
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star "></span>';
							p_html += '<span class="fa fa-star "></span>';
							p_html += '<span class="fa fa-star "></span>';
							p_html += '<span class="fa fa-star "></span>';
							break;

						case "2":
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star "></span></span>';
							p_html += '<span class="fa fa-star "></span></span>';
							p_html += '<span class="fa fa-star "></span></span>';
							break;
							
						case "3":
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star "></span></span>';
							p_html += '<span class="fa fa-star "></span></span>';
							break;
							
						case "4":
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star "></span></span>';
							break;

						case "5":
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star checked"></span>';
							p_html += '<span class="fa fa-star checked"></span>';
							break;
							
						case "default":
							p_html += '<span class="fa fa-star "></span>';
							p_html += '<span class="fa fa-star "></span>';
							p_html += '<span class="fa fa-star "></span>';
							p_html += '<span class="fa fa-star "></span>';
							p_html += '<span class="fa fa-star "></span>';
							break;
							
						}


						
						$('.p_rating').html(p_html);
					});
		}