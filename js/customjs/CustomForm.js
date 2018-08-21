/**
 * 
 */


$(document).ready(function(){

$(".c_group").click(function(){
	
	ajaxWithJSON("/common/isGroupsContain", null, 'POST', function(response) {
		
		if(response.status=='SUCCESS'){
			
		}
        if(response.status=='ERROR'){
			toastr.error(response.message);
			$('.c_group').prop('checked', false);
		}
	});
});
});
var g_form_field = {};
var g_form_fields = [];
var g_final_form_map = {};
/*function addformField(p_type, p_level, p_id) {
 g_form_field.type = p_type;
 g_form_field.level = p_level;
 g_form_field.dataFor = 'none';
 g_form_field.id = p_id;
 g_form_fields.push(g_form_field);
 }
 function removeformField(p_id) {

 for (var i = 0, size = g_form_fields.length; i < size; i++) {
 var l_form_field = g_form_fields[i];
 if (p_id in l_form_field) {
 g_form_fields.splice(l_form_field, i);
 $("#" + p_id).remove();
 }
 }
 }*/
/*function viewCustomform() {

 $('.c_view_custom_form').html();
 }*/
function publishCustomform(p_form_id) {debugger;
	var l_extra_fields = {};
	var l_final_map = {};
	if($('.c_form_title').val() == ''){
		toastr.error('enter title.');
		return false;
	}
   if($('.c_form_instruction').val() == ''){
	   toastr.error('enter instructions.');
	   return false;
	}
   if($('.c_form_logo_link').val() == ''){
	   toastr.error('enter your logo link.');
	   return false;
   }
	l_final_map.packageId = $('.c_form_package_id').val();
	l_final_map.examId = $('.c_form_exam_id').val();
	l_final_map.title = $('.c_form_title').val();
	l_final_map.instruction = $('.c_form_instruction').val();
	l_final_map.logoLink = $('.c_form_logo_link').val();
	 if($('.c_group').is(":checked")){
		 l_final_map.group = true;
	}else{
			l_final_map.group = false;
	}
	l_extra_fields = readCustomForm(p_form_id);
   
	l_final_map.json = l_extra_fields;

	$(".loading").show();
	$.ajax({
		url : '/common/publish-custom-form',
		data : JSON.stringify(l_final_map),
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		type : 'POST',
		success : function(response) {
			debugger;
			$(".loading").hide();
			if (response.status == 'SUCCESS') {
				$(".loading").hide();
				$(".c_generated_link").html(response.object);
				toastr.success(response.message);
			}

			if (response.status == 'ERROR') {
				$(".loading").hide();
				toastr.error(response.message);
			}

		},
		error : function(err) {
			$(".loading").hide();
			toastr.error("we don't find proper input . Try again later!");
		}
	});

}

function addCandidate(p_form_id) {debugger;
if(!(navigator.onLine)){
    toastr.error('You are offline. please check internet connection.');
	return;
}

    $('.c_customize_registration_error').html('');
	var l_map = {};
	var groupType ="";
	if(!($('.c_terms_accept').is(":checked"))){
		$('.c_customize_registration_error').html('Please accept terms and conditions.');
		setTimeout(function(){ $('.c_customize_registration_error').html(''); }, 3000);
		return false;
	}
	if($('#f-name').val()==''){
		$('.c_customize_registration_error').html('Please enter display name.');
		setTimeout(function(){ $('.c_customize_registration_error').html(''); }, 3000);
		return false;
	}
	if($('#email').val()==''){
		$('.c_customize_registration_error').html('Please enter email.');
		setTimeout(function(){ $('.c_customize_registration_error').html(''); }, 3000);
		return false;
	}
	if(!isValidEmail($("#email").val())){
		$('.c_customize_registration_error').html('please enter valid email.');
		setTimeout(function(){ $('.c_customize_registration_error').html(''); }, 3000);
		return false;
	}
	if($('#mobile').val()==''){
		$('.c_customize_registration_error').html('Please enter mobile.');
		setTimeout(function(){ $('.c_customize_registration_error').html(''); }, 3000);
		return false;
	}
	if(($("#mobile").val().length)!=10){
		$('.c_customize_registration_error').html('please enter valid mobile.');
		setTimeout(function(){ $('.c_customize_registration_error').html(''); }, 3000);
		return false;
	}
	if($("#isGroupAllow").val()=='yes'){
		if($("#group").val()==''){
		$('.c_customize_registration_error').html('please select group.');
		setTimeout(function(){ $('.c_customize_registration_error').html(''); }, 3000);
		return false;
		}else{
			groupType='exist';
		}
	}   
	
	/*	l_map.email=$('.c_email').val();
	 l_map.phone=$('.c_phone').val();
	 l_map.name=$('.c_name').val();
	 l_map.userId=$('.c_user_id').val();
	 l_map.packageId=$('.c_package_id').val();
	 l_map.examId=$('.c_exam_id').val();*/
	// extra fields may not or may more
	l_map = readForm(p_form_id);
	l_map.groupType = groupType;
    //alert(JSON.stringify(l_map));
	$(".loading").show();
	$.ajax({
				url : '/common/add-candidate-from-custom',
				cache : false,
				async : true,
				data : JSON.stringify(l_map),
				contentType : "application/json; charset=UTF-8",
				dataType : 'json',
				type : 'POST',
				success : function(response) {
					debugger;
					$(".loading").hide();
					if (response.status == 'SUCCESS') {
						$(".loading").hide();
						// show the message to candidate
						toastr.success("Your registration is success. you will get the confirmation for the same.");
					}

					if (response.status == 'ERROR') {
						$(".loading").hide();
						toastr.error(response.message);
					}
					if (response.status == 'EXIST') {
						$(".loading").hide();
						toastr
								.error('You are already registered for the same.');
					}

				},
				error : function(err) {
					$(".loading").hide();
					toastr
							.error("we don't find proper input . Try again later.");
				}
			});
}


function getExistFormContent(){debugger;
var l_map = {};

if(!(navigator.onLine)){
    toastr.error('You are offline. please check internet connection.');
	return;
}
if($('.c_exist_form').val()==''){
	toastr.error("Please select any one option.");
	return ;
}
l_map.customFormId = $('.c_exist_form').val();

$(".loading").show();
$.ajax({    url : '/common/load-exist-custom-form-content',
			cache : false,
			async : true,
			contentType : "application/json; charset=UTF-8",
			dataType : 'json',
			data : JSON.stringify(l_map),
			type : 'POST',
			success : function(response) {debugger;
				if (response.status == "SUCCESS") {
					var l_html = "";
					var l_content_data = response.object;
					var l_json_data = l_content_data.jsonForm;
					var l_parsed = JSON.parse(l_json_data);
					var l_keys = Object.keys(l_parsed);
					$('.c_form_title').val(l_content_data.title);
					$('.c_form_instruction').val(l_content_data.instruction);
					$('.c_form_logo_link').val(l_content_data.logoLink);
					$('.dynamicInput').html('');
					for(var i=0;i<l_keys.length;i++){
					l_html+="<div class='col-md-4' id='r"+i+"'>";
					l_html+="<h5 class='title'>"+l_keys[i]+"</h5>";
					l_html+="<div class='added-input'>";
					if(l_parsed[l_keys[i]] == 'select' && l_keys[i].toLowerCase() == 'gender'){
						l_html+="<select type='select' name='gender' id='gender' tabindex='1' class='form-control cf-input-dynamic-left'>";
						l_html+="<option value='select'>Select Gender</option>";
						l_html+="<option value='male'>Male</option>";
						l_html+="<option value='female'>Female</option>";
						l_html+="</select>";
					}else if(l_parsed[l_keys[i]].toLowerCase() == 'textarea'){
						l_html+="<textarea type='textarea' name='"+l_keys[i]+"' id='Address' class='cf-input-dynamic-left form-control' rows='3' placeholder='"+l_keys[i]+"'></textarea>";
					}else{
					l_html+="<input type='"+l_parsed[l_keys[i]]+"' name='"+l_keys[i]+"' id='email' tabindex='1' class='form-control cf-input-dynamic-left'>";
					}
					l_html+="<span class='tooltiptext-delete'>Remove This Field</span>";
					l_html+="<span class='cf-cross-button-left' onclick='removeAddedinput(\"r"+i+"\")'> <i class='fa fa-times' style='font-size:20px;'></i></span>";
					l_html+="</div>";
					l_html+="</div>";
					$('.dynamicInput').append(l_html);
					l_html ="";
					}
					
					toastr.success(response.message);
					$(".loading").hide();
				}
				if (response.status == "ERROR") {
					$(".loading").hide();
					toastr.error(response.message);
				}
			},
			error : function(err) {
				$(".loading").hide();
				toastr.error("we did not find proper input . Try again later!");
			}
	});
}

function removeAddedinput(p_id)
{
	 if(p_id==""){
		 
		 return;
		 
	  }
	 else
	  {
	     $("#"+p_id).remove();  
	  }	
}
//Form creation js
 
$(document).ready(function()
		{
	
	     $(".previewArea").hide();
		 $("#passwordR").hide();
		 $("#confirmpasswordR").hide(); 
		 $("#alternatephoneR").hide();
		 $("#genderR").hide();
		 $("#dobR").hide();
		 $("#addressR").hide();
		 $("#homeaddressR").hide();
		 $("#officeaddressR").hide();
		 $("#cityR").hide();
		 $("#stateR").hide();
		 $("#countryR").hide();
		 $("#conditionR").hide();
		 $("#submitR").hide();
		 $("#zipR").hide(); 
		 $("#educationR").hide();
		 $("#professionalR").hide();
		 $("#certificationR").hide();
		 $("#fullAddressR").hide();
	   });
function preview(){
	
	
	var l_parsed = {};
	var l_html = "";
	l_parsed = readCustomForm('i_other_fields');
	$('.c_preview_title').html($('.c_form_title').val());
	$('.c_preview_instruction').html($('.c_form_instruction').val());
	$('.c_preview_logo').html('<img src="'+$('.c_form_logo_link').val()+'" alt="no image" style="float:right">');
	var l_keys = Object.keys(l_parsed);
	
	$('.dynamicInputPreview').html('');
	if($('.c_group').is(":checked")){
		l_html+="<div class='col-md-4' id='r"+i+"'>";
		l_html+="<h5 class='title'>Group</h5>";
		l_html+="<div class='added-input'>";
		l_html+="<select  id='email' tabindex='1' class='form-control cf-input-dynamic-left'><option>Select Group</option></select>";
		l_html+="</div>";
		l_html+="</div>";
	}
	for(var i=0;i<l_keys.length;i++){
	l_html+="<div class='col-md-4' id='r"+i+"'>";
	l_html+="<h5 class='title'>"+l_keys[i]+"</h5>";
	l_html+="<div class='added-input'>";
	l_html+="<input type='"+l_parsed[l_keys[i]]+"' name='"+l_keys[i]+"' id='email' tabindex='1' class='form-control cf-input-dynamic-left'>";
	l_html+="</div>";
	l_html+="</div>";
	
	}
	$('.dynamicInputPreview').append(l_html);
	$(".previewArea").show();
	$(".inputArea").hide();
	$(".exist_form_list").hide();
}
function back()
{
	$(".previewArea").hide();
	$(".inputArea").show();
	$(".exist_form_list").show();
}
function addInput(p_input) 
		 { 
	            //alert(p_input);
	 	  if(p_input=="password")
		  {
			 
			  $("#passwordR").clone().appendTo(".dynamicInput"); 
			  $("#passwordR").show() 
		  }
		 /*else if(p_input=="confirmpassword")
		  { 
			  $("#confirmpasswordR").clone().appendTo(".dynamicInput");
			  $("#confirmpasswordR").show()
		  }*/
		  else if(p_input=="gender")
		  {
		      
			  $("#genderR").clone().appendTo(".dynamicInput");
			  $("#genderR").show()
		  }
		  else if(p_input=="dob")
		  {
		      
			  $("#dobR").clone().appendTo(".dynamicInput");
			  $("#dobR").show()
		  }
		  else if(p_input=="alternatephone")
		  {
		      
			  $("#alternatephoneR").clone().appendTo(".dynamicInput");
			  $("#alternatephoneR").show()
		  }
		  
		  else if(p_input=="address")
		  {
		      
			  $("#addressR").clone().appendTo(".dynamicInput");
			  $("#addressR").show()
		  }
		  else if(p_input=="homeaddress")
		  {
		      
			  $("#homeaddressR").clone().appendTo(".dynamicInput");
			  $("#homeaddressR").show()
		  }
		  else if(p_input=="officeaddress")
		  {
		      
			  $("#officeaddressR").clone().appendTo(".dynamicInput");
			  $("#officeaddressR").show()
		  }
		  else if(p_input=="city")
		  {
		      
			  $("#cityR").clone().appendTo(".dynamicInput");
			  $("#cityR").show()
		  } 
		  else if(p_input=="state")
		  {
		      
			  $("#stateR").clone().appendTo(".dynamicInput");
			  $("#stateR").show()
		  }
		  else if(p_input=="zip")
		  {
		      
			  $("#zipR").clone().appendTo(".dynamicInput");
			  $("#zipR").show()
		  }
		  else if(p_input=="country")
		  {
		      
			  $("#countryR").clone().appendTo(".dynamicInput");
			  $("#countryR").show()
		  }
		   else if(p_input=="condition")
		  {
		       
			  $("#conditionR").clone().appendTo(".dynamicInput");
			  $("#conditionR").show()
		  }
		   else if(p_input=="submit")
		  {
			  $("#submitR").clone().appendTo(".dynamicInput");
			  $("#submitR").show()
		  }
		   else if(p_input=="education"){
			   $("#educationR").clone().appendTo(".dynamicInput");
			  $("#educationR").show()
			  
			  
		  }
		   else if(p_input=="professional"){
			   $("#professionalR").clone().appendTo(".dynamicInput");
			  $("#professionalR").show()
			  
			  
		  }
		   else if(p_input=="certification"){
			   $("#certificationR").clone().appendTo(".dynamicInput");
			  $("#certificationR").show()
			  
			  
		  }
		   else if(p_input=="fullAddress"){
			   $("#fullAddressR").clone().appendTo(".dynamicInput");
			  $("#fullAddressR").show()
			  
			  
		  }
	 	  
		  
		 }
		
	   function removeInput(p_input)
		{
		 if(p_input=="password"){
			  $("#passwordR").remove();
		  }
		 else if(p_input=="confpassword")
		  {
		     $("#confirmpasswordR").remove();  
		  }
		  else if(p_input=="dob")
		  {
		      $("#dobR").remove();
		  }
		  else if(p_input=="gender")
		  {
		      $("#genderR").remove();
		  }
		  else if(p_input=="alternatephone")
		  {
		       $("#alternatephoneR").remove();
		  }
		  
		  else if(p_input=="address")
		  {
		       $("#addressR").remove(); 
		  }
		  else if(p_input=="homeaddress")
		  {
		       $("#homeaddressR").remove(); 
		  }
		  else if(p_input=="officeaddress")
		  {
		       $("#officeaddressR").remove(); 
		  }
		  else if(p_input=="city")
		  {
		       $("#cityR").remove(); 
		  } 
		  else if(p_input=="state")
		  {
		       $("#stateR").remove();
		  }
		  else if(p_input=="zip")
		  {
		      $("#zipR").remove(); 
		  }
		  else if(p_input=="country")
		  {
		      $("#countryR").remove();
		  }
		   else if(p_input=="condition")
		  {
		      $("#conditionR").remove();
		  }
		   else if(p_input=="submit")
		  {
		       $("#submitR").remove();
		  } 
		   else if(p_input=="education"){
				  $("#educationR").remove();
				  
			  }
			  else if(p_input=="professional"){
				  $("#professionalR").remove();
				  
			  }
			  else if(p_input=="certification"){
				  $("#certificationR").remove();
				  
			  }
			  else if(p_input=="fullAddress"){
				  $("#fullAddressR").remove();
				  
			  }
		 
		 
		 }
	  function addGroup(){
		  var l_group = {};
		  if($('.c_group_name').val()==''){
			  $('#i_errorGroup').text("Please enter group name.");
			  setTimeout(function(){  $('#i_errorGroup').text(""); }, 3000);
			  return;
		}
		  if($('.c_group_description').val()==''){
			  l_group.description = "This Group is added by custom form.";
		 }else{
			 l_group.description = $('.c_group_description').val();
		 }
		  
		  l_group.groupName =  $('.c_group_name').val();
			ajaxWithJSON("/common/add-group", l_group, 'POST', function(response) {
				
				if(response.status=='SUCCESS'){
					$('#addGroup').modal('hide');
					toastr.success(response.message);
				}
				if(response.status=='ERROR'){
					$('#i_errorGroup').text(response.message);
					setTimeout(function(){  $('#i_errorGroup').text(""); }, 3000);
				}
			});
		  
	  }