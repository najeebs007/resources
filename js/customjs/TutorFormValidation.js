/**********************************
 * 
 * tutor modal forms validation JS
 * @author Mayank Gupta
 * updated 24-04-2018 by Rajesh Rawat
 **********************************/

function validateTutorInfo(){
	
	$(".general_info_message").html("");
	
	var dob 			= $("#dateOfBirth").val();
	var mothertng 		= $("#motherTongue").val();
	var totalExp 		= $("#totalExperience").val();
	var typeofinternet 	= $("#typeOfInternet").val();
	var association 	= $("#associationWithUs").val();
	var typingspeed 	= $("#typingSpeed").val();
	
	if(dob.length == 0){
		$(".general_info_message").html("Please Select Your Date of Birth");
		return false;
	}
	
	if(mothertng.length == 0){
		$(".general_info_message").html("Please Enter Your Mother Toung Language");
		return false;
	}
	
	if(totalExp.length == 0){
		$(".general_info_message").html("Please Provide your total experience in Month");
		return false;
	}
	
	if(typeofinternet.length == 0){
		$(".general_info_message").html("Please enter your internet type");
		return false;
	}
	
	if(association.length == 0){
		$(".general_info_message").html("Please Provide Association");
		return false;
	}
	
	if(typingspeed.length == 0){
		$(".general_info_message").html("Please enter Numeric value for typing speed - 'Charcter per Minute' ");
		return false;
	}
	
	if(!allLetter(mothertng)){
		$(".general_info_message").html("Please Enter correct language Name for ex- HINDI/ENGLISH");
		return false;
	}
	
	if(isNaN(totalExp)){ 
		$(".general_info_message").html("Please Enter Numeric value  for total Experience");
		return false;
	}
	
	if(!allLetter(typeofinternet)){
		$(".general_info_message").html("Please Enter valid internet type");
		return false;
	}
	
	if(!allLetter(association)){
		$(".general_info_message").html("Please Enter valid Association Name");
		return false;
	}
	
	if(!allnumeric(typingspeed)){
		$(".general_info_message").html("Please Enter Numeric value for typing speed (CPM) ");
		return false;
	}
	
	return true;
	
}


function validateTutorEducationForm(){
	$(".education_message").html("");
	var universityname 		= $("#universityBoardName").val();
	var instituteName 		= $("#instituteName").val();
	var rollNumber 			= $("#rollNumber").val();
	var educationTypeName	= $("#educationTypeName").val();
	var branchName 			= $("#branchName").val();
	var year 				= $("#year").val();
	var startDate 			= $("#startDate").val();
	var endDate 			= $("#endDate").val();
	var grade 				= $("#i_grade").val();
	var percent 			= $("#i_percent").val();
	
	if(universityname.length == 0){
		$(".education_message").html("Please Select your University or Board");
		return false;
	}
	if(instituteName.length == 0){
		$(".education_message").html("Please Select your Institute");
		return false;
	}
	if(rollNumber.length == 0){
		$(".education_message").html("Please Enter Your RollNumber");
		return false;
	}
	if(educationTypeName.length == 0){
		$(".education_message").html("Please Select your Course");
		return false;
	}
	if(branchName.length == 0){
		$(".education_message").html("Please Select Branch");
		return false;
	}
	if(year.length == 0){
		$(".education_message").html("Please Select your Year");
		return false;
	}
	if(startDate.length == 0){
		$(".education_message").html("Please Select Your Session Start Date");
		return false;
	}
	if(endDate.length == 0){
		$(".education_message").html("Please Select Session End Date");
		return false;
	}
	if(grade.length == 0){
		if(percent.length == 0){
		  $(".education_message").html("Please Select Grade or Percentage and enter grade or percentage");
		  return false;
		}
	}
	if(percent.length == 0){
		if(grade.length == 0){
		  $(".education_message").html("Please Select Grade or Percentage and enter grade or percentage");
		  return false;
		}
	}
	
	if(!alphanumeric(rollNumber)){
		$(".education_message").html("Please Enter your Correct RollNumber");
		return false;
	}
		
	return true;
	
	
}


function validateTutorCertificate(){
	
	$(".certificate_message").html("");
	var certificationName 			= $("#certificationName").val();
	var certificationAuthority		= $("#certificationAuthority").val();
	var certificationNumber			= $("#certificationNumber").val();
	var certificationDate			= $("#certificationDate").val();
	var certificationExpiryDate		= $("#certificationExpiryDate").val();
	
	if(certificationName.length == 0){
		$(".certificate_message").html("Please Enter your Certificate Name");
		return false;
	}
	
	if(certificationAuthority.length == 0){
		$(".certificate_message").html("Please Enter your Authority Name");
		return false;
	}
	
	if(certificationNumber.length == 0){
		$(".certificate_message").html("Please Enter your Certificate Number");
		return false;
	}
	
	if(certificationDate.length == 0){
		$(".certificate_message").html("Please Select Your ceritificate Start Date");
		return false;
	}
	
/*	if(certificationExpiryDate.length == 0){
		$(".certificate_message").html("Please Select Your Certificate Expiry Date");
		return false;
	}*/
	
	return true;
}

function validateTutorProfessional(){
	$(".professional_message").html("");
	var occupation 		= $("#occupation").val();
	var jobTitle		= $("#jobTitle").val();
	var organization	= $("#organization").val();
	var location		= $("#location").val();
	var startDate		= $("#p_startDate").val();
	var endDate			= $("#p_endDate").val();
	var remarks			= $("#remarks").val();
	
	if(occupation.length == 0){
		$(".professional_message").html("Please Enter Your Occupation");
		return false;
	}
	if(jobTitle.length == 0){
		$(".professional_message").html("Please Enter Your Job Title");
		return false;
	}
	if(organization.length == 0){
		$(".professional_message").html("Please Enter Your Organization Name");
		return false;
	}
	if(location.length == 0){
		$(".professional_message").html("Please Enter Your Organization Location City");
		return false;
	}
	if(startDate.length == 0){
		$(".professional_message").html("Please select Job Starting date");
		return false;
	}
	if(endDate.length == 0){
		$(".professional_message").html("Please select job ending date");
		return false;
	}
/*	if(remarks.length == 0){
		$(".professional_message").html("Please Enter your Job Profile Description");
		return false;
	}*/
	
	return true;
}

function validateTutorEvent(){
	
	$(".event_message").html("");
	
	var eventName 			= $("#eventName").val();
	var eventTitle			= $("#eventTitle").val();
	var eventType			= $("#eventType").val();
	var eventDate			= $("#eventDate").val();
	var eventDurationDays	= $("#eventDurationDays").val();
	var eventPlace			= $("#eventPlace").val();
	var showStartDate		= $("#showStartDate").val();
	var showEndDate			= $("#showEndDate").val();
	var shortDescription	= $("#shortDescription").val();
	 
	
	if(eventName.length == 0){
		$(".event_message").html("Please Enter Event Name");
		return false;
	}
	if(eventTitle.length == 0){
		$(".event_message").html("Please Enter Event Title");
		return false;
	}
	if(eventType.length == 0){
		$(".event_message").html("Please Enter Event Type");
		return false;
	}
	if(eventDate.length == 0){
		$(".event_message").html("Please select Event Date");
		return false;
	}
	if(eventDurationDays.length == 0){
		$(".event_message").html("Please Enter Event Duration in Days");
		return false;
	}
	if(eventPlace.length == 0){
		$(".event_message").html("Please Enter Event Place");
		return false;
	}
	if(showStartDate.length == 0){
		$(".event_message").html("Please select event start date");
		return false;
	}	
	if(showEndDate.length == 0){
		$(".event_message").html("Please select event end date");
		return false;
	}
	if(shortDescription.length == 0){
		$(".event_message").html("Please Enter Event short description");
		return false;
	}
	
	if(!allnumeric(eventDurationDays)){
		$(".event_message").html("Please enter Numeric value only");
		return false;
	}
	
	return true;
}

function validateTutorSpeciality(){ debugger;
	
    $(".spcl_message").html("");
	var boardId 	= $("#boardId").val();
	var classId		= $("#classId").val();
	var subjectName = $("#subjectName").val();
	
	if(classId == null || classId.length == 0 || classId == 'undefined'){
		$(".spcl_message").html("Please select your class from suggestion list");
		return false;
	}
	if( subjectName == null || subjectName.length == 0 || subjectName == 'undefined'){
		$(".spcl_message").html("Please enter your Subjects by comma seprated");
		return false;
	}
	if(boardId == null || boardId.length == 0 || boardId == 'undefined'){
		$(".spcl_message").html("Please select your board from suggestion list");
		return false;
	}
	return true;
}

function validateContactDetails(){
	
	var address 	= $("#addressLine1").val();
	var countryId 	= $("#countryId").val();
	var stateId 	= $("#stateId").val();
	var districtId 	= $("#districtId").val();
	var cityId 		= $("#cityId").val();
	var addressTitle= $("#addressTitle").val();
	var pinCode 	= $("#pinCode").val();
	
	if(address == null || address.length == 0){
		$(".contact_details_message").html("Please Enter your address");
		return false;
	}
	if(countryId == null || countryId.length == 0){
		$(".contact_details_message").html("Please Select your country");
		return false;
	}
	if(stateId == null || stateId.length == 0){
		$(".contact_details_message").html("Please Select your state");
		return false;
	}
	if(districtId == null || districtId.length == 0){
		$(".contact_details_message").html("Please Select your district");
		return false;
	}
	if(cityId == null || cityId.length == 0){
		$(".contact_details_message").html("Please Select your city");
		return false;
	}
	if(addressTitle == null || addressTitle.length == 0){
		$(".contact_details_message").html("Please Select your address type");
		return false;
	}
	if(pinCode == null || pinCode.length == 0){
		$(".contact_details_message").html("Please Enter your Pin Code");
		return false;
	}
	
	if(pinCode.length < 6 || pinCode.length > 6){
		$(".contact_details_message").html("Pin Code have 6 digits");
		return false;
	}
	
	return true;
}
