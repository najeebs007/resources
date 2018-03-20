/**
 * 
 */

function validateSchoolRegistration(){ 
	
	
	var schoolName = $("#instituteName").val();
	var address = $("#address1").val();
	var country = $("#countryId").val();
	var state = $("#stateId").val();
	var district = $("#districtId").val();
	var city = $("#cityId").val();
	var pincode = $("#pincodeId").val();
	var emailId = $("#emailId").val();
	var mobile = $("#mobile").val();
	var medium = $(".c_medium").val();

	//alert('City is: '+cfity);
	
	if (schoolName == ''|| schoolName == null || schoolName == undefined) {
		/*$("#schoolError").html(schoolsNameMandatoryMsg);*/
		toastr.clear();
		toastr.error(schoolsNameMandatoryMsg)
		return false;
	} 
	if (address == ''|| address == null || address == undefined) {
		/*$("#addressError").html(schoolAddressMandatoryMsg);*/
		toastr.clear();
		toastr.error(schoolAddressMandatoryMsg)
		$("#schoolError").html('');
		return false;
	}
	if (country == 'Select Country'|| country == null || country == undefined || country == "") {
		/*$("#countrylError").html(countryNameMandatoryMsg);*/
		toastr.clear();
		toastr.error(countryNameMandatoryMsg)
		$("#addressError").html('');
		return false;
	}
	if (state == 'Select State' || state == null || state == undefined || state == "") {
		/*$("#stateError").html(stateNameMandatoryMsg);*/
		toastr.clear();
		toastr.error(stateNameMandatoryMsg)
		$("#countrylError").html('');
		return false;
	}
	if (district == 'Select District' || district == null || district == undefined || district == "") {
		/*$("#districtError").html(districtNameMandatoryMsg);*/
		toastr.clear();
		toastr.error(districtNameMandatoryMsg)
		$("#stateError").html('');
		return false;
	}
	if (city == 'Select City'|| city == null || city == undefined || city == "") {
		/*$("#cityError").html(cityNameMandatoryMsg);*/
		toastr.clear();
		toastr.error(cityNameMandatoryMsg)
		$("#districtError").html('');
		return false;
	}
	if (pincode == '' || pincode == null || pincode == undefined) {
		/*$("#pincodeError").html(pincodeMandatoryMsg);*/
		toastr.clear();
		toastr.error(pincodeMandatoryMsg)
		$("#cityError").html('');
		return false;
	}
	if (emailId == ''|| emailId == null || emailId == undefined) {
		/*$("#emailError").html(schoolEmailMandatoryMsg);*/
		toastr.clear();
		toastr.error(schoolEmailMandatoryMsg)
		$("#pincodeError").html('');
		return false;
	}
	if (mobile == ''|| mobile == null || mobile == undefined) {
		/*$("#mobileError").html(schoolContactPhoneMandatoryMsg);*/
		toastr.clear();
		toastr.error(schoolContactPhoneMandatoryMsg)
		$("#emailError").html('');
		return false;
	}
	if (medium == 'none'|| medium == null || medium == undefined) {
		/*$("#mediumError").html(schoolMediumMandatoryMsg);*/
		toastr.clear();
		toastr.error(schoolMediumMandatoryMsg)
		$("#mobileError").html('');
		return false;
	}
	if(emailId.length>0){
		
		var atpos = emailId.indexOf("@");
		var dotpos = emailId.lastIndexOf(".");
		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailId.length) {
			/*$("#emailError").html("Please enter a valid email address");*/
			toastr.clear();
			toastr.error('Please enter a valid email address')
			$("#mediumError").html('');
			return false;
		}
	}
	/*var contactName = $("#userName1").val();
	var contactDesignation = $("#designation1").val();
	var contactMobile = $("#contactNumber1").val();
	var contactEmail= $("#email1").val();
	
	if (contactName == ''|| contactName == null || contactName == undefined) {
		$("#contacterror").html(schoolContactMandatoryMsg);
		return false;
	}
	if (contactDesignation == ''|| contactDesignation == null || contactDesignation == undefined) {
		$("#contacterror").html(schoolContactDesignationMandatoryMsg);
		return false;
	}
	if (contactMobile == ''|| contactMobile == null || contactMobile == undefined) {
		$("#contacterror").html(schoolcontactMobileMandatoryMsg);
		return false;
	}
	if (contactEmail == ''|| contactEmail == null || contactEmail == undefined) {
		$("#contacterror").html(schoolcontactEmailMandatoryMsg);
	}
	if(contactEmail.length>0){
		
		var atpos = contactEmail.indexOf("@");
		var dotpos = contactEmail.lastIndexOf(".");
		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= contactEmail.length) {
			$("#contacterror").html("Please enter a valid email address");
			return false;
		}
	}*/
	
	//enable this validation once you have the object ready
	/*
	if(userList == null || userList.length == 0) {
		$("#contacterror").html("Please add atleast 3 contacts. (1 Principal, 1 Applicant and 1 Coordinator)");
		return false;
	}
	var l_coordinator_count = 0;
	var l_principal_count = 0;
	var l_applicant_count = 0;
	
	for(var i=0;i<userList.length;i++) {
		var l_single_contact = userDetails[i];
		var l_designation	= l_single_contact.designation;
		if('principal' == l_designation) {
			l_principal_count++;
		} else if('coordinator' == l_designation) {
			l_coordinator_count++;
		} else if('applicant' == l_designation) {
			l_applicant_count++;
		}
	}
	
	if(l_principal_count == 0) {
		$("#contacterror").html("Please add principal details");
		return false;
	}
	
	if(l_coordinator_count == 0) {
		$("#contacterror").html("Please add atleast 1 coordinator details");
		return false;
	}
	
	if(l_applicant_count == 0) {
		$("#contacterror").html("Please add applicant details");
		return false;
	}
	controlVar = true;
	*/
	return true;
}

function modalValidate(){
	
	var sname = $("#sname").val();
	var semail = $("#semail").val();
	var sphone = $("#sphone").val();
	

	
	if (sname == ''|| sname == null || sname == undefined) {
		$("#Modalerror").html("please enter name");
		/*toastr.clear();
		toastr.error('please enter name')*/
		return false;
	} 
	if (semail == ''|| semail == null || semail == undefined) {
		$("#Modalerror").html("please enter valid email");
		/*toastr.clear();
		toastr.error('please enter valid email')*/
		
		return false;
	}
	if(semail.length>0){
		
		var atpos = semail.indexOf("@");
		var dotpos = semail.lastIndexOf(".");
		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= semail.length) {
			$("#Modalerror").html("Please enter a valid email address");
			/*toastr.clear();
			toastr.error('Please enter a valid email address')*/
			
			return false;
		}
	}
	if ((sphone.length)!=10 || sphone==null || sphone == undefined || sphone == "") {
		
		$("#Modalerror").html("please enter valid phone ");
		/*toastr.clear();
		toastr.error('please enter valid phone ')*/
		
		return false;
	}
	

	return true;
}

function validateEducation(){
	
	var sboard = $("#sboard").val();
	var sclass = $("#sclass").val();
	var sstream = $("#sstream").val();
	
	if (sboard == null || sboard == undefined || sboard == "") {
		/*$("#Modalerror").html("please select board");*/
		toastr.clear();
		toastr.error('please select board')
	
		return false;
	}
	if (sclass == null || sclass == undefined || sclass == "") {
		/*$("#Modalerror").html("please select class");*/
		toastr.clear();
		toastr.error('please select class')
		
		return false;
	}
	if (sstream == null || sstream == undefined || sstream == "") {
		/*$("#Modalerror").html("please select stream");*/
		toastr.clear();
		toastr.error('please select stream')
		return false;
	}

	return true;
}

function validatePrograms(){


/*var regUrl = /^(((ht|f){1}(tp:[/][/]){1})|((www.){1}))[-a-zA-Z0-9@:%_\+.~#?&//=]+$/;*/

if ($(".pTitle").val() == null || $(".pTitle").val() == undefined || $(".pTitle").val() == "") {
	
	
	$('.erroMessage').html('Program Name Can\'t Blank!')

	return false;
}
if ($(".rStart").val() == null || $(".rStart").val() == undefined || $(".rStart").val() == "") {
	
	
	$('.erroMessage').html('Registration Start Date Can\'t be Blank!')

	return false;
}
/*if ($(".photoOnHome").val() == null || $(".photoOnHome").val() == undefined || $(".photoOnHome").val() == "") {
	
	
	$('.erroMessage').html('Home Page Image URL Can\'t be Blank!')

	return false;
}*/


if($(".photoOnHome").val() !== '')
{
	if(!(isUrlValid($(".photoOnHome").val()))){
		 $('.erroMessage').html('Invalid URL link !');
	  return false;

}

}

if ($(".pStatus").val() == null || $(".pStatus").val() == undefined || $(".pStatus").val() == "") {
	
	
	$('.erroMessage').html('Please Select Status!')

	return false;
}


if ($(".pExamDate").val() == null || $(".pExamDate").val() == undefined || $(".pExamDate").val() == "") {
	
	
	$('.erroMessage').html('Exam Date Can\'t be Blank!')

	return false;
}

if ($(".rEndDate").val() == null || $(".rEndDate").val() == undefined || $(".rEndDate").val() == "") {
	
	
	$('.erroMessage').html('Registration End Date Can\'t be Blank!');

	return false;
}

if ($(".types").val() == null || $(".types").val() == undefined || $(".types").val() == "") {
	
	
	$('.erroMessage').html('Type Can\'t be Blank!');

	return false;
}

if($(".photoOnDetail").val() !== '')
{
	if(!(isUrlValid($(".photoOnDetail").val()))){
		 $('.erroMessage').html('Invalid URL link !');
	  return false;
	}
}
/*if ($(".photoOnDetail").val() == null || $(".photoOnDetail").val() == undefined || $(".photoOnDetail").val() == "") {
	
	
	$('.erroMessage').html('Detail Page Image URL Can\'t be Blank!');

	return false;
}*/

/*var Detail = $(".photoOnDetail").val();
if(!(regUrl.test(Detail)))
{

	$('.erroMessage').html('Invalid link for Detail Page Image!');

}*/

if ($(".rDetail").val() == null || $(".rDetail").val() == undefined || $(".rDetail").val() == "") {
	
	
	$('.erroMessage').html('Registration Detail Can\'t be Blank!');

	return false;
}
if ($(".scholarDetail").val() == null || $(".scholarDetail").val() == undefined || $(".scholarDetail").val() == "") {
	

	$('.erroMessage').html('Scholarship Detail Can\'t be Blank!')

	return false;
}
if ($(".pAddress").val() == null || $(".pAddress").val() == undefined || $(".pAddress").val() == "") {
	

	$('.erroMessage').html('Address Can\'t be Blank!')

	return false;
}

return true;
}

function validateProgramUpdate(){
   
	

	/*var regUrl = /^(((ht|f){1}(tp:[/][/]){1})|((www.){1}))[-a-zA-Z0-9@:%_\+.~#?&//=]+$/;*/

	if ($(".p_Title").val() == null || $(".p_Title").val() == undefined || $(".p_Title").val() == "") {
		
		
		$('.updateErroMessage').html('Program Name Can\'t Blank!')

		return false;
	}
	if ($(".r_Start").val() == null || $(".r_Start").val() == undefined || $(".r_Start").val() == "") {
		
		
		$('.updateErroMessage').html('Registration Start Date Can\'t be Blank!')

		return false;
	}
	
	if($(".p_photoOnHome").val() !== '')
	{
		if(!(isUrlValid($(".p_photoOnHome").val()))){
			 $('.updateErroMessage').html('Invalid URL link !');
		  return false;

		}
	}
/*	if ($(".p_photoOnHome").val() == null || $(".p_photoOnHome").val() == undefined || $(".p_photoOnHome").val() == "") {
		
		
		$('.updateErroMessage').html('Home Page Image URL Can\'t be Blank!')

		return false;
	}*/

	/*var imageHomeUrl = $(".photoOnHome").val();
	if(!(regUrl.test(imageHomeUrl)))
	{

		$('.erroMessage').html('Invalid link for Detail Page Image!');

	}*/



	if ($(".p_ExamDate").val() == null || $(".p_ExamDate").val() == undefined || $(".p_ExamDate").val() == "") {
		
		
		$('.updateErroMessage').html('Exam Date Can\'t be Blank!')

		return false;
	}

	if ($(".r_EndDate").val() == null || $(".r_EndDate").val() == undefined || $(".r_EndDate").val() == "") {
		
		
		$('.updateErroMessage').html('Registration End Date Can\'t be Blank!');

		return false;
	}
	if ($(".c_types").val() == null || $(".c_types").val() == undefined || $(".c_types").val() == "") {
		
		
		$('.updateErroMessage').html('Type Can\'t be Blank!');

		return false;
	}
	if($(".p_photoOnDetail").val() !== '')
	{
		if(!(isUrlValid($(".p_photoOnDetail").val()))){
			 $('.updateErroMessage').html('Invalid URL link !');
		  return false;
		}

	}
/*	if ($(".p_photoOnDetail").val() == null || $(".p_photoOnDetail").val() == undefined || $(".p_photoOnDetail").val() == "") {
		
		
		$('.updateErroMessage').html('Detail Page Image URL Can\'t be Blank!');

		return false;
	}*/

	/*var Detail = $(".photoOnDetail").val();
	if(!(regUrl.test(Detail)))
	{

		$('.erroMessage').html('Invalid link for Detail Page Image!');

	}*/

	if ($(".r_Detail").val() == null || $(".r_Detail").val() == undefined || $(".r_Detail").val() == "") {
		
		
		$('.updateErroMessage').html('Registration Detail Can\'t be Blank!');

		return false;
	}
	if ($(".p_scholarDetail").val() == null || $(".p_scholarDetail").val() == undefined || $(".p_scholarDetail").val() == "") {
		

		$('.updateErroMessage').html('Scholarship Detail Can\'t be Blank!')

		return false;
	}
	if ($(".p_Address").val() == null || $(".p_Address").val() == undefined || $(".p_Address").val() == "") {
		

		$('.updateErroMessage').html('Address Can\'t be Blank!')

		return false;
	}
		if ($(".r_terms").val() == null || $(".r_terms").val() == undefined || $(".r_terms").val() == "") {
		

		$('.updateErroMessage').html('Terms And Conditions Can\'t Blank!')

		return false;
		}

	return true;
	}

function validateSudentGeneral(){
	
	if ($(".c_studentFather").val() == null || $(".c_studentFather").val() == undefined || $(".c_studentFather").val() == ""){
		
		$('.c_s_error').html('Father name Can\'t Blank!');
		return false;
		
	}
	if ($(".c_mothersName").val() == null || $(".c_mothersName").val() == undefined || $(".c_mothersName").val() == ""){
		
		$('.c_s_error').html('Mother name Can\'t Blank!');
		return false;
		
	}
	
	if ($(".c_gender").val() == null || $(".c_gender").val() == undefined || $(".c_gender").val() == ""){
		
		$('.c_s_error').html('Select Gender!');
		return false;
		
	}
	if ($(".c_dateOfBirth").val() == null || $(".c_dateOfBirth").val() == undefined || $(".c_dateOfBirth").val() == ""){
		
		$('.c_s_error').html('Enter Date Of Birth !');
		return false;
		
	}
	
	if ($(".c_nationality").val() == null || $(".c_nationality").val() == undefined || $(".c_nationality").val() == ""){
		
		$('.c_s_error').html('Select Nationality !');
		return false;
		
	}
	return true;
}


function validateSudentContact(){

if ($(".c_address").val() == null || $(".c_address").val() == undefined || $(".c_address").val() == ""){
	
	$('.c_s_contacterror').html('Enter your address Can\'t Blank!');
	return false;
	
}
if ($(".studentCountry").val() == null || $(".studentCountry").val() == undefined || $(".studentCountry").val() == ""){
	
	$('.c_s_contacterror').html('Select Your Country !');
	return false;
	
}

if ($(".studentState").val() == null || $(".studentState").val() == undefined || $(".studentState").val() == ""){
	
	$('.c_s_contacterror').html('Select Your State!');
	return false;
	
}
if ($(".studentDistrict").val() == null || $(".studentDistrict").val() == undefined || $(".studentDistrict").val() == ""){
	
	$('.c_s_contacterror').html('Select Your District !');
	return false;
	
}

if ($(".studentCity").val() == null || $(".studentCity").val() == undefined || $(".studentCity").val() == ""){
	
	$('.c_s_contacterror').html('Select Your City !');
	return false;
	
}
if ($(".c_zip").val() == null || $(".c_zip").val() == undefined || $(".c_zip").val() == ""){
	
	$('.c_s_contacterror').html('Enter Zip Code !');
	return false;
	
}
return true;
}


function validateCertificate(){ 

	if ($(".certificateNameClass").val() == null || $(".certificateNameClass").val() == undefined || $(".certificateNameClass").val() == ""){
		
		$('.c_c_error').html('Certificate Name Can\'t Blank!');
		return false;
		
	}
	if ($(".certificateNumberClass").val() == null || $(".certificateNumberClass").val() == undefined || $(".certificateNumberClass").val() == ""){
		
		$('.c_c_error').html('Enter Certificate Number!');
		return false;
		
	}

	if ($(".certificateAuthorityClass").val() == null || $(".certificateAuthorityClass").val() == undefined || $(".certificateAuthorityClass").val() == ""){
		
		$('.c_c_error').html('Enter Certificate Authority Name!');
		return false;
		
	}

	
	return true;
	}


function validateProfessional(){ 

if ($(".occupationClass").val() == null || $(".occupationClass").val() == undefined || $(".occupationClass").val() == ""){
	
	$('.c_p_error').html('Occupation Can\'t Blank!');
	return false;
	
}
if ($(".locationClass").val() == null || $(".locationClass").val() == undefined || $(".locationClass").val() == ""){
	
	$('.c_p_error').html('Enter location Number!');
	return false;
	
}

if ($(".organizationClass").val() == null || $(".organizationClass").val() == undefined || $(".organizationClass").val() == ""){
	
	$('.c_p_error').html('Enter organization Name!');
	return false;
	
}


return true;
}


function validateEducation(){ debugger;

/*if ($(".c_universityBoard").val() == null || $(".c_universityBoard").val() == undefined || $(".c_universityBoard").val() == ""){
	
	$('.c_ed_error').html('Select University Or Board!');
	return false;
	
}*/
/*if ($(".c_instituteSchoolCollege").val() == null || $(".c_instituteSchoolCollege").val() == undefined || $(".c_instituteSchoolCollege").val() == ""){
	
	$('.c_ed_error').html('Select Institute/School/College Name!');
	return false;
	
}*/
if ($(".tags").val() == null || $(".tags").val() == undefined || $(".tags").val() == ""){
	
	$('.c_ed_error').html('Select Institute/School/College Name!');
	return false;
	
}

if ($(".c_rollnumberOrEID").val() == null || $(".c_rollnumberOrEID").val() == undefined || $(".c_rollnumberOrEID").val() == ""){
	
	$('.c_ed_error').html('Enter roll number or empId!');
	return false;
	
}
if ($(".c_yearClass").val() == null || $(".c_yearClass").val() == undefined || $(".c_yearClass").val() == ""){
	
	$('.c_ed_error').html('select your education year!');
	return false;
	
}
if ($(".c_eduEndDate").val() == null || $(".c_eduEndDate").val() == undefined || $(".c_eduEndDate").val() == ""){
	
	$('.c_ed_error').html('select your education end  date!');
	return false;
	
}
if ($(".c_studentStartDate").val() == null || $(".c_studentStartDate").val() == undefined || $(".c_studentStartDate").val() == ""){
	
	$('.c_ed_error').html('select your education start  date!');
	return false;
	
}
if ($(".c_eduBranch").val() == null || $(".c_eduBranch").val() == undefined || $(".c_eduBranch").val() == ""){
	
	$('.c_ed_error').html('select your education branch!');
	return false;
	
}
if ($(".c_studentEdu").val() == null || $(".c_studentEdu").val() == undefined || $(".c_studentEdu").val() == ""){
	
	$('.c_ed_error').html('select your degree/deploma/class !');
	return false;
	
}

if ($(".c_grade").val() == null || $(".c_grade").val() == undefined || $(".c_grade").val() == ""){
	if($(".c_percent").val() == null || $(".c_percent").val() == undefined || $(".c_percent").val() == ""){
	   $('.c_ed_error').html('select your percent or grade system !');
	   return false;
	}else{
		var percent = parseFloat($(".c_percent").val().trim());
		if(percent < 0 || percent>100){
			$('.c_ed_error').html('not a valid percent !');
			return false;
		}
	}
	return true;
}

if ($(".c_percent").val() == null || $(".c_percent").val() == undefined || $(".c_percent").val() == ""){
	if($(".c_grade").val() == null || $(".c_grade").val() == undefined || $(".c_grade").val() == ""){
	   $('.c_ed_error').html('select your percent or grade system !');
	   return false;
	}else{
		var grade = parseFloat($(".c_grade").val().trim());
		if(grade < 0 || grade>10){
			$('.c_ed_error').html('not a valid Grade(out of 10) !');
			return false;
		}
	}
	return true;
}


return true;
}