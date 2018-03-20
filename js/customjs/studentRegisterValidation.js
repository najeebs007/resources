
/*$("#btnSubmit").click(function() { 
	
	if (!validateform()) {
		return;
	}
	
	$(".loading").show();
	
	$.ajax({
		type : 'GET',
		url : "save-student-data",
		data : $(".formSubmit").serialize(),
		success : function(res) {
			$(".loading").hide();
			alert("Student has been Successfully Registered for this event");
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$(".loading").hide();
			alert("Registration Failed");
		}
	
	});
	
});*/
	
	
	function validateform(){ 
	
	var schoolName = 	$("#sname").val();
	var state = 		$("#stateName").val();
	var city = 			$("#cityName").val();
	var contactName = 	$("#contactPerson").val();
	var contactNumber = $("#phoneNumber").val();
	var email = 		$("#emailAddress").val();
	var address = 		$("#fullAddress").val();
	
	if(schoolName == '' || schoolName == undefined ){
		$("#errorMessage").html("");
		toastr.clear();
		toastr.error(schoolNameMandatoryMsg)		
		/*$("#errorMessage").append(schoolNameMandatoryMsg);
		toastr.clear();*/
		toastr.success('You are successfully Registered please varify your OTP')
		
		//alert(" enter name ");
		return false;
	}
	
	if(state == '' || state == undefined){
		$("#errorMessage").html("");
	/*	$("#errorMessage").append(stateNameMandatoryMsg);
		alert(" enter state ");*/
		/*toastr.clear();*/
  	    toastr.error(stateNameMandatoryMsg)
		return false;
	}
	if(city == '' || city == undefined){
		$("#errorMessage").html("");
		/*$("#errorMessage").append(cityNameMandatoryMsg);
		alert(" enter city ");*/
		/*toastr.clear();*/
  	    toastr.error(cityNameMandatoryMsg)
		return false;
	}
	if(contactName == '' || contactName == undefined){
		$("#errorMessage").html("");
		/*$("#errorMessage").append(contactNameMandatoryMsg);
		alert(" enter contant name ");*/
		/*toastr.clear();*/
  	    toastr.error(contactNameMandatoryMsg)
		return false;
	}
	if(contactNumber == '' || contactNumber == undefined){
		$("#errorMessage").html("");
	/*	$("#errorMessage").append(mobileMandatoryMsg);
		alert(" enter numer ");*/
		/*toastr.clear();*/
  	    toastr.error(mobileMandatoryMsg)
		return false;
	}
	if(email == '' || email == undefined){
		$("#errorMessage").html("");
	/*	$("#errorMessage").append(emailMandaotoryMsg);
		alert(" enter email ");*/
		/*toastr.clear();*/
  	    toastr.error(emailMandaotoryMsg)
		return false;
	}
	if(address == '' || address == undefined){
		$("#errorMessage").html("");
	/*	$("#errorMessage").append(addressMandatoryMsg);
		alert(" enter address ");
		toastr.clear();*/
  	    toastr.error(addressMandatoryMsg)
		return false;
	}
	
	if ((contactNumber.length) < 10) {
		$("#errorMessage").html("");
		/*$("#errorMessage").append(mobileNumberMessage);
		alert("Please enter a valid contact number");
		toastr.clear();*/
  	    toastr.error(mobileNumberMessage)
		return false;
	} 
	
	if ((email.length) > 0) {
		var x = $("#emailAddress").val();
		var atpos = x.indexOf("@");
		var dotpos = x.lastIndexOf(".");
		if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
		/*	alert(" valid email ");*/
			$("#errorMessage").html("");
		/*	$("#errorMessage").append(emailMandaotoryMsg);
			toastr.clear();*/
	  	    toastr.error(emailMandaotoryMsg)
			return false;
		} 
	}
	$("#errorMessage").html("");
		return true;
	
	
}