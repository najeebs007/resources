//$(document).ready(function() {
//	//searchAll();
//	loadPrograms();
//});

var g_program_exams = [];
function searchPrograms(p_flage) { debugger;
var l_map={};
    l_map.flage = p_flage;
  // alert(p_flage);
    if(p_flage=='dropdown'){
   if($('#userProgramList').val()==''){
    	toastr.error('No program selected.');
    	return;
    }
   if($('#userProgramList').val()=='active'){
	   l_map.active = $('#userProgramList').val();
   }
   if($('#userProgramList').val()=='inActive'){
	   l_map.inActive = $('#userProgramList').val();
   }
   if($('#userProgramList').val()=='enrolled'){
	   l_map.enrolled = $('#userProgramList').val();
   }
   if($('#userProgramList').val()=='completed'){
	   l_map.completed = $('#userProgramList').val();
     }
    }
    if(p_flage=='search'){
        if($('.c_search').val()==''){
        	toastr.error('No search text found.');
        	return;
        }
        l_map.search = $('.c_search').val();
        }

    
	ajaxWithJSON("/common/search-programs", l_map, 'POST', function(response) {debugger;
				var l_data = response.object;
				var role = response.other;
				if(response.status=='SUCCESS'){
					setProgram(l_data,role);
				}
				if(response.status=='ERROR')
				{
					toastr.error(response.message);
				}
			});
}

function setProgram(p_program,role){debugger;
var selectedProm = '';
var html = '';
$('.c_program').html("");
selectedProm = $('#userProgramList').val();
//if(selectedProm==null){
//	
//}
for(var i=0;i<p_program.length;i++){debugger;
	var data_map = p_program[i];
	//alert(JSON.stringify(data_map));
	var title = data_map.title;
	var date = new Date(data_map.registrationStartDate);
	 var day= date.getDate();
	 if(day <= 9){
		 day = "0" + day;
		}
	var date_r = date.getMonth() + 1;
	if(date_r <= 9){
		date_r = "0" + date_r;
	}
	var registrationStartDate= day+'/'+date_r+'/'+date.getFullYear();
	var date = new Date(data_map.registrationEndDate);
	var day= date.getDate();
	 if(day <= 9){
		 day = "0" + day;
		}
	var date_e = date.getMonth() + 1;
	if(date_e <= 9){
		date_e = "0" + date_e;
	}
	var registrationEndDate= day+'/'+date_e+'/'+date.getFullYear();
	var active = data_map.active;
	var examDate1=data_map.examDate;
	var l_dateEnd = new Date(Number(examDate1));
	var monthname = new Array("01", "02", "03", "04", "05", "06",
			"07", "08", "09", "10", "11", "12")
	var l_date = (l_dateEnd.getDate() + " ")
	var l_month = (monthname[l_dateEnd.getMonth()] + " ")
	var l_year = (l_dateEnd.getFullYear())
	var examDate = l_date.trim() + "/" + l_month.trim() + "/"
			+ l_year;
	
	var description1=data_map.description;
	var description = description1.substring(0, 49);
	var photoOnHomePage=data_map.photoOnHomePage;
	var cm2=data_map.cm2;
	
	if(role=='ROLE_STUDENT'){
		html+='<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 jQueryEqualHeightD">';
		html+='<div class="card card-customize pro-list programArea"> ';
		html+='<div class="card-body no-padding img-section">';
		html+='<div class="pro-img-section">';
		html+='<img src="'+photoOnHomePage+'"  alt="programs image" class="p--img">';
		html+='</div>';
		html+='</div> ';
		html+='<div class="card-body pro-title-padding title-secton-pro">';
		html+='<div class="row">';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
		html+='<div class="row">';
		html+='<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">';
		html+='<span class="pro-title s-font c-primary">'+title+'</span>';
		html+='</div>';
		html+='<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 m-t-minus-5 p-left"> <div class="pro-pricing-block"><strong class="pro-price-text s-font"> &#8377; 500 </strong></div></div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='<div class="card-body pro-title-description">';
		html+='<div class="row">';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-minus-10">';
		html+='<div class="pro-description s-font" title="'+description1+'">'+description+'...</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='<div class="card-body pro-title-description">';
		html+='<div class="row">';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
		html+='<div class="pro-detail-text s-font s-black">Registration: '+registrationStartDate+' - '+registrationEndDate+'</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+='<div class="pro-detail-text s-font s-black">Exam :'+examDate+'</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+='<div class="row">';
		if(active==true){
		html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
		html+='<div class="pro-detail-text s-font s-black isActive" onclick="updateStatus("'+data_map.programId+'")">Program is ACTIVE</div>';
		html+='</div>';
		}else{
		
		html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
		html+='<div class="pro-detail-text s-font s-black isActive" onclick="updateStatus("'+data_map.programId+'")">Program is INACTIVE</div>';
		html+='</div>';
	}
		
		if(active==true){
			html+='<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">';
			html+='<input id="checkbox2" type="checkbox" checked disabled>';
			html+='<label for="checkbox2" data-text-true="&#x2714;" data-text-false="&#x2613;" class="s-font"><i></i></label>';
		    html+='</div>';
		}else{
			html+='<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">';
			html+='<input id="checkbox2" type="checkbox" disabled>';
			html+='<label for="checkbox2" data-text-true="&#x2714;" data-text-false="&#x2613;" class="s-font"><i></i></label>';
		    html+='</div>';
		}
		
		
		html+='</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+=' <div class="pro-description s-font s-black">'+cm2+'</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='<div class="card-body pro-button-padding">';
		html+='<div class="row">';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 center">'; 
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 center"> <a href="/services/sepaas/'+data_map.programId+'" class="btn btn-primary s-font">Details</a><button type="button" class="btn btn-primary s-font" disabled>Enrolled</button> </div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
	}
	if(role=='GUEST'){
		html+='<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 jQueryEqualHeightD">';
		html+='<div class="card card-customize pro-list programArea"> ';
		html+='<div class="card-body no-padding img-section">';
		html+='<div class="pro-img-section">';
		html+='<img src="'+photoOnHomePage+'"  alt="programs image" class="p--img">';
		html+='</div>';
		html+='</div> ';
		html+='<div class="card-body pro-title-padding title-secton-pro">';
		html+='<div class="row">';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
		html+='<div class="row">';
		html+='<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">';
		html+='<span class="pro-title s-font c-primary">'+title+'</span>';
		html+='</div>';
		html+='<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 m-t-minus-5 p-left"> <div class="pro-pricing-block"><strong class="pro-price-text s-font"> &#8377; 500 </strong></div></div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='<div class="card-body pro-title-description">';
		html+='<div class="row">';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-minus-10">';
		html+='<div class="pro-description s-font" title="'+description1+'">'+description+'...</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='<div class="card-body pro-title-description">';
		html+='<div class="row">';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
		html+='<div class="pro-detail-text s-font s-black">Registration: '+registrationStartDate+' - '+registrationEndDate+'</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+='<div class="pro-detail-text s-font s-black">Exam :'+examDate+'</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+='<div class="row">';
		if(active==true){
			html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
			html+='<div class="pro-detail-text s-font s-black isActive" onclick="updateStatus("'+data_map.programId+'")">Program is ACTIVE</div>';
			html+='</div>';
			}else{
			
			html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
			html+='<div class="pro-detail-text s-font s-black isActive" onclick="updateStatus("'+data_map.programId+'")">Program is INACTIVE</div>';
			html+='</div>';
		}
		if(active==true){
			html+='<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">';
			html+='<input id="checkbox2" type="checkbox" checked disabled>';
			html+='<label for="checkbox2" data-text-true="&#x2714;" data-text-false="&#x2613;" class="s-font"><i></i></label>';
		    html+='</div>';
		}else{
			html+='<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">';
			html+='<input id="checkbox2" type="checkbox" disabled>';
			html+='<label for="checkbox2" data-text-true="&#x2714;" data-text-false="&#x2613;" class="s-font"><i></i></label>';
		    html+='</div>';
		}
		
		
		html+='</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+=' <div class="pro-description s-font s-black">'+cm2+'</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='<div class="card-body pro-button-padding">';
		html+='<div class="row">';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 center">'; 
		html+=' <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 center"> <a href="/services/sepaas/'+data_map.programId+'" class="btn btn-primary s-font">Details</a><a href="http://www.scholarsmerit.com/" class="btn btn-primary s-font">Login/Signup</a> </div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		}
	if(role=='ROLE_ADMIN'){
		html+='<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 jQueryEqualHeightD">';
		html+='<div class="card card-customize pro-list programArea"> ';
		html+='<div class="card-body no-padding img-section">';
		html+='<div class="pro-img-section">';
		html+='<img src="'+photoOnHomePage+'"  alt="programs image" class="p--img">';
		html+='</div>';
		html+='</div> ';
		html+='<div class="card-body pro-title-padding title-secton-pro">';
		html+='<div class="row">';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
		html+='<div class="row">';
		html+='<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">';
		html+='<span class="pro-title s-font c-primary">'+title+'</span>';
		html+='</div>';
		html+='<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 m-t-minus-5 p-left"> <div class="pro-pricing-block"><strong class="pro-price-text s-font"> &#8377; 500 </strong></div></div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='<div class="card-body pro-title-description">';
		html+='<div class="row">';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-minus-10">';
		html+='<div class="pro-description s-font" title="'+description1+'">'+description+'...</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='<div class="card-body pro-title-description">';
		html+='<div class="row">';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
		html+='<div class="pro-detail-text s-font s-black">Registration: '+registrationStartDate+' - '+registrationEndDate+'</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+='<div class="pro-detail-text s-font s-black">Exam :'+examDate+'</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+='<div class="row">';
		if(active==true){
			html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
			html+='<div class="pro-detail-text s-font s-black isActive" onclick="updateStatus("'+data_map.programId+'")">Program is ACTIVE</div>';
			html+='</div>';
			}else{
			
			html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
			html+='<div class="pro-detail-text s-font s-black isActive" onclick="updateStatus("'+data_map.programId+'")">Program is INACTIVE</div>';
			html+='</div>';
		}
		if(active==true){
			html+='<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">';
			html+='<input id="checkbox2" type="checkbox" checked>';
			html+='<label for="checkbox2" data-text-true="&#x2714;" data-text-false="&#x2613;" class="s-font"><i></i></label>';
		    html+='</div>';
		}else{
			html+='<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">';
			html+='<input id="checkbox2" type="checkbox">';
			html+='<label for="checkbox2" data-text-true="&#x2714;" data-text-false="&#x2613;" class="s-font"><i></i></label>';
		    html+='</div>';
		}
		
		
		html+='</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+=' <div class="pro-description s-font s-black">'+cm2+'</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='<div class="card-body pro-button-padding">';
		html+='<div class="row">';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 center">'; 
		html+='<button type="button"  class="btn btn-danger s-font"><i class="fa fa-pencil pencil-color"></i>Edit Program</button> </div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
		html+='</div>';
	}
}
if(selectedProm=='ALL'){
	
for(var i=0;i<p_program.length;i++){
	var data_map = p_program[i];
	//alert(JSON.stringify(data_map));
	var title = data_map.title;
	var date = new Date(data_map.registrationStartDate);
	var day= date.getDate();
	 if(day <= 9){
		 day = "0" + day;
		}
	var date_e = date.getMonth() + 1;
	if(date_e <= 9){
		date_e = "0" + date_e;
	}
	
	var registrationStartDate= day+'/'+date_e+'/'+date.getFullYear();
	var date = new Date(data_map.registrationEndDate);
	var day= date.getDate();
	 if(day <= 9){
		 day = "0" + day;
		}
	var date_r = date.getMonth() + 1;
	if(date_r <= 9){
		date_r = "0" + date_r;
	}
	
	var registrationEndDate= day+'/'+date_r+'/'+date.getFullYear();
	var active = data_map.active;
	var examDate1=data_map.examDate;
	var l_dateEnd = new Date(Number(examDate1));
	var monthname = new Array("01", "02", "03", "04", "05", "06",
			"07", "08", "09", "10", "11", "12")
	var l_date = (l_dateEnd.getDate() + " ")
	var l_month = (monthname[l_dateEnd.getMonth()] + " ")
	var l_year = (l_dateEnd.getFullYear())
	var examDate = l_date.trim() + "/" + l_month.trim() + "/"
			+ l_year;
	
	var description1=data_map.description;
	var description = description1.substring(0, 49);
	var photoOnHomePage=data_map.photoOnHomePage;
	//alert(title);
	html+='<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 jQueryEqualHeightD">';
	html+='<div class="card card-customize pro-list programArea"> ';
	html+='<div class="card-body no-padding img-section">';
	html+='<div class="pro-img-section">';
	html+='<img src="'+photoOnHomePage+'"  alt="programs image" class="p--img">';
	html+='</div>';
	html+='</div> ';
	html+='<div class="card-body pro-title-padding title-secton-pro">';
	html+='<div class="row">';
	html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
	html+='<div class="row">';
	html+='<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">';
	html+='<span class="pro-title s-font c-primary">'+title+'</span>';
	html+='</div>';
	html+='<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 m-t-minus-5 p-left"> <div class="pro-pricing-block"><strong class="pro-price-text s-font"> &#8377; 500 </strong></div></div>';
	html+='</div>';
	html+='</div>';
	html+='</div>';
	html+='</div>';
	html+='<div class="card-body pro-title-description">';
	html+='<div class="row">';
	html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-minus-10">';
	html+='<div class="pro-description s-font" title="'+description1+'">'+description+'...</div>';
	html+='</div>';
	html+='</div>';
	html+='</div>';
	html+='<div class="card-body pro-title-description">';
	html+='<div class="row">';
	html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
	html+='<div class="pro-detail-text s-font s-black">Registration: '+registrationStartDate+' - '+registrationEndDate+'</div>';
	html+='</div>';
	html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
	html+='<div class="pro-detail-text s-font s-black">Exam :'+examDate+'</div>';
	html+='</div>';
	html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
	html+='<div class="row">';
	if(active==true){
		html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
		html+='<div class="pro-detail-text s-font s-black isActive" onclick="updateStatus("'+data_map.programId+'")">Program is ACTIVE</div>';
		html+='</div>';
		}else{
		
		html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
		html+='<div class="pro-detail-text s-font s-black isActive" onclick="updateStatus("'+data_map.programId+'")">Program is INACTIVE</div>';
		html+='</div>';
	}
	if(active=='true'){
		html+='<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">';
		html+='<input id="checkbox'+i+'" type="checkbox" checked>';
		html+='<label for="checkbox'+i+'" data-text-true="&#x2714;" data-text-false="&#x2613;" class="s-font"><i></i></label>';
	    html+='</div>';
	}else{
		html+='<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">';
		html+='<input id="checkbox'+i+'" type="checkbox" >';
		html+='<label for="checkbox'+i+'" data-text-true="&#x2714;" data-text-false="&#x2613;" class="s-font"><i></i></label>';
	    html+='</div>';
	}
	html+='</div>';
	html+='</div>';
	html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
	html+=' <div class="pro-description s-font s-black">'+cm2+'</div>';
	html+='</div>';
	html+='</div>';
	html+='</div>';
	html+='<div class="card-body pro-button-padding">';
	html+='<div class="row">';
	html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 center">'; 
	html+='<button type="button"  class="btn btn-danger s-font"><i class="fa fa-pencil pencil-color"></i>Edit Program</button> </div>';
	html+='</div>';
	html+='</div>';
	html+='</div>';
	html+='</div>';
 }
}
$('.c_program').html(html);
equal_height();
}

function updateStatus(programId) {debugger;
var l_map = {};
if (confirm("This action will make the program active/inactive. Only active programs are visible to users. Do you want to continue?"+"\n"+"click ok"))
{
l_map.programId = programId;
	$(".loading").show();
	//    $(".loading").show();
	ajaxWithJSON("/common/update-status", l_map, 'POST', function(response) {debugger;
		$(".loading").hide();
		if (response.status == 'SUCCESS') {
			toastr.success("successfully update status");
			window.reload();
		}
		if (response.status == 'ERROR') {
			toastr.success("some error occured");
		}

	});
}else{
	return false;
}


}

function pagination(pageId) { debugger;
	var s_html = "";
	$('.pagination').html("");
var l_map = {};

var pageId;
l_map.offSet = pageId;
l_map.numberOfRecord = 10;
l_map.source = "SM";
	ajaxWithJSON("/common/pagination", l_map, 'POST', function(response) {debugger;
				var l_data1 = response.object;
				for(var i=0;i<l_data1;i++){
					var l_data = l_data1[i];
				
				var role = response.other;
				alert(JSON.stringify(l_data));
				var cm2=l_data.cm2;
				var active=l_data.active;
				var createdDate=l_data.createdDate;
				var description=l_data.description;
				var endDateStr=l_data.endDateStr;
				var examDate=l_data.examDate;
				var examDateStr=l_data.examDateStr;
				var fullAddress=l_data.fullAddress;
				var photoOnHomePage=l_data.photoOnHomePage;
				var programId=l_data.programId;
				var registrationDetail=l_data.registrationDetail;
				var registrationEndDate=l_data.registrationEndDate;
				var registrationStartDate=l_data.registrationStartDate;
				var startDateStr=l_data.startDateStr;
				var termsAndCondtions=l_data.termsAndCondtions;
				var title=l_data.title;
				var type=l_data.type;
				
				/* dynamic html code */
				
				s_html='<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 jQueryEqualHeightD">';
				s_html='<div class="card card-customize pro-list programArea">';
				s_html='<div class="card-body no-padding img-section ">';
				s_html='<div class="pro-img-section">';	
				s_html='<img src="'+photoOnHomePage+'" alt="programs image"';
				s_html='class="p--img">';
				s_html='</div>';
				s_html='</div>';
				s_html='<div class="card-body pro-title-padding title-secton-pro">';
				s_html='<div class="row">';
				s_html='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
				s_html='<div class="row">';
				s_html='<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">';
				s_html='<span class="pro-title s-font c-primary">'+title+'</span>';
				s_html='</div>';
				s_html='<div';
				s_html='class="col-lg-3 col-md-3 col-sm-3 col-xs-3 m-t-minus-5 p-left">';
				s_html='<div class="pro-pricing-block">';
				s_html='<strong class="pro-price-text s-font">';
				s_html='&#8377; 500 </strong>';
				s_html='</div>';
				s_html='</div>';
				s_html='</div>';
				s_html='</div>';
				s_html='</div>';
				s_html='</div>';
				s_html='<div class="card-body pro-title-description description-secton-pro">';
				s_html='<div class="row">';
				s_html='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-minus-10">';
				s_html='<div class="pro-description s-font"';
				s_html='title="'+description+'">${fn:substring(program.description,0,49)}...</div>';
				s_html='</div>';
				s_html='</div>';
				s_html='</div>';
				s_html='<div';
				s_html='class="card-body pro-title-description details-secton-pro">';
				s_html='<div class="row">';
				s_html='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
				s_html='<div class="pro-detail-text s-font s-black">';
				s_html='Registration: <span class="s-black"';
				s_html='style="font-weight: 600;"><fmt:formatDate';
				s_html='pattern="dd/MM/yyyy"';
				s_html='value="'+registrationStartDate+'" /></span> - <span';
				s_html='class="s-black" style="font-weight: 600;"><fmt:formatDate';
				s_html='pattern="dd/MM/yyyy"';
				s_html='value="'+registrationEndDate+'" /></span>';
				s_html='</div>';
				s_html='</div>';
				s_html='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
				s_html='<div class="pro-detail-text s-font s-black">';
				s_html='Exam : <span class="s-black" style="font-weight: 600;"><fmt:formatDate';
				s_html='pattern="dd/MM/yyyy" value="'+examDate+'" /></span>';
				s_html='</div>';
				s_html='</div>';
				s_html='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
				if(role=='ROLE_ADMIN'){
				s_html='<div class="row">';
				if(active==true){
					html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
					html+='<div class="pro-detail-text s-font s-black isActive" onclick="updateStatus("'+data_map.programId+'")">Program is ACTIVE</div>';
					html+='</div>';
					}else{
					
					html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
					html+='<div class="pro-detail-text s-font s-black isActive" onclick="updateStatus("'+data_map.programId+'")">Program is INACTIVE</div>';
					html+='</div>';
				}
				if(active=='true'){
					html+='<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">';
					html+='<input id="checkbox'+i+'" type="checkbox" checked>';
					html+='<label for="checkbox'+i+'" data-text-true="&#x2714;" data-text-false="&#x2613;" class="s-font"><i></i></label>';
				    html+='</div>';
				}else{
					html+='<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">';
					html+='<input id="checkbox'+i+'" type="checkbox" >';
					html+='<label for="checkbox'+i+'" data-text-true="&#x2714;" data-text-false="&#x2613;" class="s-font"><i></i></label>';
				    html+='</div>';
				}
				s_html='</div>';
				}
				s_html='</div>';
				if(role=='ROLE_ADMIN'){
				s_html='<div';
				s_html='class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
				s_html='<div class="row">';
				if(active==true){
					html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
					html+='<div class="pro-detail-text s-font s-black isActive" onclick="updateStatus("'+data_map.programId+'")">Program is ACTIVE</div>';
					html+='</div>';
					}else{
					
					html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
					html+='<div class="pro-detail-text s-font s-black isActive" onclick="updateStatus("'+data_map.programId+'")">Program is INACTIVE</div>';
					html+='</div>';
				}
				if(active=='true'){
					html+='<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">';
					html+='<input id="checkbox'+i+'" type="checkbox" checked>';
					html+='<label for="checkbox'+i+'" data-text-true="&#x2714;" data-text-false="&#x2613;" class="s-font"><i></i></label>';
				    html+='</div>';
				}else{
					html+='<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">';
					html+='<input id="checkbox'+i+'" type="checkbox" >';
					html+='<label for="checkbox'+i+'" data-text-true="&#x2714;" data-text-false="&#x2613;" class="s-font"><i></i></label>';
				    html+='</div>';
				}
				s_html='</div>';
				s_html='</div>';
				}
				s_html='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
				s_html='<div class="pro-description s-font s-black">'+cm2+'</div>';
				s_html='</div>';
				s_html='</div>';
				s_html='</div>';
				s_html='<div class="card-body pro-button-padding btn-secton-pro">';
				
				if(role=='ROLE_STUDENT'){
				s_html='<c:set var="studentCount" value="${count+1}" scope="page" />';
				s_html='<div';
				s_html='class="col-lg-12 col-md-12 col-sm-12 col-xs-12 center">';
				s_html='<a href="/services/sepaas/<c:out value="${program.programId}"/>"';
				s_html='class="btn btn-primary s-font">Details</a>';
				s_html='<button type="button" class="btn btn-primary s-font"';
				s_html='disabled>Enrolled</button>';
				s_html='</div>';
				}
				if(role=='ROLE_ANONYMOUS'){
				s_html='<c:set var="anonymousCount" value="${count+1}" scope="page" />';
				s_html='<div';
				s_html='class="col-lg-12 col-md-12 col-sm-12 col-xs-12 center">';
				s_html='<a';
				s_html='href="/services/sepaas/<c:out value="${program.programId}"/>"';
				s_html='class="btn btn-primary s-font">Details</a><a';
				s_html='href="http://www.scholarsmerit.com/"';
				s_html='class="btn btn-primary s-font">Login/Signup</a>';
				s_html='</div>';
				}
			
				if(role=='ROLE_ADMIN'){
				s_html='<c:set var="adminCount" value="${count+1}" scope="page" />';
				s_html='<div class="card-body pro-button-padding btn-secton-pro">';
				s_html='<div class="row">';
				s_html='<div';
				s_html='class="col-lg-12 col-md-12 col-sm-12 col-xs-12 center">';
				s_html='<a href="" class="btn btn-danger s-font"><i';
				s_html='class="fa fa-pencil pencil-color"></i>Edit Program</a>';
				s_html='</div>';
				s_html='</div>';
				s_html='</div>';
				}
				s_html='</div>';
				s_html='</div>';
				s_html='</div>';
				 }
				$('.pagination').html(s_html);
			});
}

