/*************************
 *
 * Corporate Profile JS
 * @author Mayank Gupta
 * 
 * ***********************/

$(document).ready(function(){ 
		
		 if(l_corporate_details_list_obj.length > 0){
			 var corporateMap = l_corporate_details_list_obj[0];
			 $(".addCompanyDetailsButton").hide();
			 setCorporateDetails(corporateMap);
		 }
		 
		 if(l_industry_obj_list!=null || l_industry_obj_list.length > 0){
			 setOptions("industryTypeId", l_industry_obj_list,'industryTypeId','industryTypeName',"Select Industry Type"); 
		 }
		 
		 if(l_country_list_obj.length > 0){
			 setOptions("countryId", l_country_list_obj,'countryId','countryName',"Select Your Country");
		 }
		 
		 if(l_location_list_obj.length > 0){
			 setLocationDetails(l_location_list_obj);
		 }
		 
		 if(l_image_list_obj.length > 0){
			 var map = l_image_list_obj[0];
			
			 for(var item in map){
					var l_image_map = map[item];
					var type = l_image_map.imageType;
					
					if(type == 'PROFILE'){
						$(".profilePhoto").html("").append('<img src='+l_image_map.imageUrl+' alt="coverphoto">');
					}
					if(type=='COVER'){
						$(".profileHeaderPhoto").html("").append('<img src='+l_image_map.imageUrl+' alt="profilephoto">');
				}
			}
			 
		 }
		 
	 });
	 
	 function saveCompanyDetails(){		 
		 
		 if(!validateCorporateDetailsForm()){
			 return false;
		 }
		 
		 var l_general_info_map = {};
		 
		 $(".companyDetails").find("input[type=text],textarea,select").each(function(index,item){
			 l_general_info_map[l_corporate_details_array[index]] = $(item).val();
		 });
		 
		 l_general_info_map.corporateId = l_user_name;
		 
		 ajaxCall('save-corporate-details', JSON.stringify(l_general_info_map), 'successCorporate', 'errorCorporate');
	 }
	 
	 function successCorporate(p_data){
		 //alert("Success : "+JSON.stringify(p_data));
		 var l_status = p_data.status;
		 alert(l_status);
		 var corporateDetailsMap = p_data.corporateInfo;
		 
		 setCorporateDetails(corporateDetailsMap);
		 
	 }
	 
	function errorCorporate(p_data){
		var l_status = p_data.status;
		 alert(l_status);
	 }
	
	function setCorporateDetails(p_corporateDetailsMap){
		
		$(".nameOfCompany").text(p_corporateDetailsMap.corporateName);
		$(".companyShortDescription").text(p_corporateDetailsMap.shortDescription);
		$(".longDescription").text(p_corporateDetailsMap.longDescription);
		$(".websiteURL").text(p_corporateDetailsMap.websiteURL);
		$(".industryType").text(p_corporateDetailsMap.industryTypeName);
		$(".foundedYear").text(p_corporateDetailsMap.foundedYear);
	}
	
	function editCompanyDetails(){
		
		/*if(l_corporate_details_list_obj.length == 0){
			alert("Please fill your details before editing");
			return false;
		}*/
		
		var corporateMap = l_corporate_details_list_obj[0];
		
		$(".companyDetails").find("input[type=text],select,textarea").each(function(index,item){
			$(item).val(corporateMap[l_corporate_details_array[index]]);
		      $(item).prop("disabled",false);			
		});
		
		floats();
	}
	
	function validateCorporateDetailsForm(){
		var corporatename 	= $("#corporateName").val();
		var industryType	= $("#industryTypeId").val();
		var foundedYear 	= $("#foundedYear").val();
		var websiteURL 		= $("#websiteURL").val();
		var companySize 	= $("#companySize").val();
		var GSTNumber 		= $("#GSTNumber").val();
		var shortDescription = $("#shortDescription").val();
		var longDescription = $("#longDescription").val();
		
		if(corporatename.length == 0){
			$(".company_message").show();
			$(".company_message").html("Please Enter your company full name");
			setTimeout('$(".company_message").hide()',5000);
			return false;
		}
		if(industryType.length == 0){
			$(".company_message").show();
			$(".company_message").html("Please Select Industry Type");
			setTimeout('$(".company_message").hide()',5000);
			return false;
		}
		if(foundedYear.length == 0){
			$(".company_message").show();
			$(".company_message").html("Please Enter company founded year");
			setTimeout('$(".company_message").hide()',5000);
			return false;
		}
		if(websiteURL.length == 0){
			$(".company_message").show();
			$(".company_message").html("Please Enter Company website URL");
			setTimeout('$(".company_message").hide()',5000);
			return false;
		}
		if(shortDescription.length == 0){
			$(".company_message").show();
			$(".company_message").html("Please Enter Short Description about company");
			setTimeout('$(".company_message").hide()',5000);
			return false;
		}
		
		if(longDescription.length != 0 && longDescription.length < 100){
			$(".company_message").show();
			$(".company_message").html("About Company details can't be less than 100 words");
			setTimeout('$(".company_message").hide()',5000);
			return false;
		}
		 
		return true;
	}
	
	
	function getState(){
		
		var l_countryId = $("#countryId").val();
		
		if(countryId.length == 0){
			return;
		}
		
		var country_map = {};
		country_map.countryId = l_countryId;
		
		ajaxCall('get-state-list',JSON.stringify(country_map), 'successStateInfo', 'errorStateInfo');
	}
	
	function successStateInfo(p_data){
		var stateList = p_data.stateList;
		setOptions("stateId", stateList,'stateId','stateName',"Select Your State");
	}
	
	function errorStateInfo(p_data){
		alert("Please Check Internet Connectivity. There may be some network problem !");
	}
	
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
		alert("Please Check Internet Connectivity. There may be some network problem !");
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
		alert("Please Check Internet Connectivity. There may be some network problem !");
	}
	
	
	function saveContactDetails(){
		
		if(!validateAddressLocationForm()){
			return;		
		}		
		
		var l_contact_map = {};
		 
		 $(".contactDetails").find("input[type=text],input[type=hidden],select").each(function(index,item){
			 l_contact_map[l_contact_array[index]] = $(item).val();			
		 });
		 
		 ajaxCall('save-corporate-contacts', JSON.stringify(l_contact_map), 'successContactDetail', 'errorContactDetail');
	 }
	 
	  
	 function successContactDetail(p_data){
		 var status = p_data.status;
		 alert(status);
		 var contactMap = p_data.contactDetails;
		 
		 var addresstype = contactMap.addressType;
		 
		 if(addresstype == 'HEADQUARTER'){
			 setHeadquarterDetails(contactMap);
		 }
		 
		if(addresstype == 'BRANCH'){
			var l_html = setBranchDetails(contactMap);
			$("#"+contactMap.addressId).hide();
			$(".childAddressLocations").append(l_html);
		}	 
	 }
	 
	 function errorContactDetail(p_data){
		 var status = p_data.status;
		 alert(status);
	 }
	 
	 function validateAddressLocationForm(){
			var addressLine = $("#addressLine1").val();
			var addressPhoneNumber = $("#addressPhoneNumber").val();
			var contactEmailId = $("#contactEmailId").val();
			var countryId = $("#countryId").val();
			var stateId = $("#stateId").val();
			var districtId = $("#districtId").val();
			var cityId = $("#cityId").val();
			var addressType = $("#addressType").val();
			var pinCode = $("#pinCode").val();
			
			if(addressLine.length == 0){
				$(".contact_details_message").show();
				$(".contact_details_message").html("Please Enter full address");
				setTimeout('$(".contact_details_message").hide()',5000);
				return false;
			}
			if(addressPhoneNumber.length == 0){
				$(".contact_details_message").show();
				$(".contact_details_message").html("Please Enter Contact Number");
				setTimeout('$(".contact_details_message").hide()',5000);
				return false;
			}
			if(contactEmailId.length == 0){
				$(".contact_details_message").show();
				$(".contact_details_message").html("Please Enter Contact Email");
				setTimeout('$(".contact_details_message").hide()',5000);
				return false;
			}
			if(countryId.length == 0){
				$(".contact_details_message").show();
				$(".contact_details_message").html("Please Select Your Country");
				setTimeout('$(".contact_details_message").hide()',5000);
				return false;
			}
			if(stateId.length == 0){
				$(".contact_details_message").show();
				$(".contact_details_message").html("Please Select Your State");
				setTimeout('$(".contact_details_message").hide()',5000);
				return false;
			}
			if(districtId.length == 0){
				$(".contact_details_message").show();
				$(".contact_details_message").html("Please Select Your District");
				setTimeout('$(".contact_details_message").hide()',5000);
				return false;
			}
			if(cityId.length == 0){
				$(".contact_details_message").show();
				$(".contact_details_message").html("Please Select Your City");
				setTimeout('$(".contact_details_message").hide()',5000);
				return false;
			}
			if(addressType.length == 0){
				$(".contact_details_message").show();
				$(".contact_details_message").html("Please Select Address Type");
				setTimeout('$(".contact_details_message").hide()',5000);
				return false;
			}
			if(pinCode.length == 0){
				$(".contact_details_message").show();
				$(".contact_details_message").html("Please Enter Zip/Pin Code");
				setTimeout('$(".contact_details_message").hide()',5000);
				return false;
			}
			
			return true;
		}
	 
	 function setHeadquarterDetails(p_contact_map){
		 var pencil = "";
		 
		 $(".fullAddress").text(p_contact_map.addressLine1);
		 $(".mobileNumber").text(p_contact_map.addressPhoneNumber);
		 $(".countryName").text(p_contact_map.countryName);
		 $(".stateName").text(p_contact_map.stateName);
		 $(".districtName").text(p_contact_map.districtName);
		 $(".cityName").text(p_contact_map.cityName);
		 $(".pinCode").text(p_contact_map.pinCode);
		 $(".contactEmailId").text(p_contact_map.contactEmailId);
		 
		 pencil += "<a href=\"#\" class=\"btn btn-control featured-post\" onclick=\"editContactDetails('"+p_contact_map.addressId+"');\" data-toggle=\"modal\" data-target=\"#myModalcontact\" style=\"background-color: #d3d3db;\">";
		 pencil += "<img src=\"resources/img/profile-img/pencil.png\" alt=\"author\" style=\"border-radius: 0px;width: 20px;margin-right: 0px;padding: 0px 3px 6px 1px;\"></a>";
		 
		 $(".headquarteraddbutton").hide();
		 $(".addEditpencil").html("").append(pencil);
	 }
	 
	 function setBranchDetails(p_contact_map){
		 var html ="";
		 
		 html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\" id="+p_contact_map.addressId+">";
		 html += "<article class=\"hentry post\" style=\"border:0;\">";
		 html += "<div class=\"post__author author vcard inline-items\">";
		 html += "<span class=\"span-location\"><img src=\"resources/img/location.png\" alt=\"author\" style=\"border-radius: 0px;width: 30px; height:30px;\"></span>";
		 html += "<div class=\"author-date\"><a class=\"h6 post__author-name fn\">"+p_contact_map.addressLine1+"<br>"+p_contact_map.cityName+"<br>"+p_contact_map.countryName+"</a>";
		 html += "</div></div></article><hr class=\"hrClassN\">";
		 html += "<div class=\"control-block-button  post-control-button addpencil\" style=\"top:-68px; right: -22px;\">";
		 html += "<a href=\"#\" class=\"btn btn-control featured-post\" onclick=\"editContactDetails('"+p_contact_map.addressId+"')\" data-toggle=\"modal\" data-target=\"#myModalcontact\" style=\"background-color: #d3d3db;\">";
		 html += "<img src=\"resources/img/profile-img/pencil.png\" alt=\"author\" style=\"border-radius: 0px;width: 20px;margin-right: 0px;padding: 0px 3px 6px 1px;\">";
		 html += "</a></div></div>";
		 
		 return html;
	 }
	
	function setLocationDetails(p_location_list_obj){
		var locationMaps = p_location_list_obj[0];
		var html = "";
		for(var item in locationMaps){
			var l_location_map = locationMaps[item];
			var addresstype = l_location_map.addressType;
			
			if(addresstype == 'HEADQUARTER'){
				 setHeadquarterDetails(l_location_map);
			 }
			 
			if(addresstype == 'BRANCH'){
				 html += setBranchDetails(l_location_map);
			}	 	
			 
		}
		$(".childAddressLocations").html("").append(html);		
	}
	
	function editContactDetails(p_location_id){
		
		var locationMaps = l_location_list_obj[0];
		var location = locationMaps[p_location_id];
		
		$(".contactDetails").find("input[type=text],input[type=hidden],select").each(function(index,item){
			$(item).val(location[l_contact_array[index]]);
		      $(item).prop("disabled",false);	
		});
		
		$("#stateId").append('<option value='+location.stateId+'>'+location.stateName+'</option>');
		$("#districtId").append('<option value='+location.districtId+'>'+location.districtName+'</option>'); 
		$("#cityId").append('<option value='+location.cityId+'>'+location.cityName+'</option>');
		
		
		floats();
	}
	