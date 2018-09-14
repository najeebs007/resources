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
for(var i=0;i<p_program.length;i++){
	var data_map = p_program[i];
	//alert(JSON.stringify(data_map));
	var title = data_map.title;
	var registrationStartDate= data_map.registrationStartDate;
	var registrationEndDate= data_map.registrationEndDate;
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
		html+='<div class="pro-detail-text s-font s-black">Registraion: '+registrationStartDate+'-'+registrationEndDate+'</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+='<div class="pro-detail-text s-font s-black">Exam :'+examDate+'</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+='<div class="row">';
		html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
		html+='<div class="pro-detail-text s-font s-black">Program is ACTIVE</div>';
		html+='</div>';
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
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 center"> <button type="button"  class="btn btn-primary s-font">Details</button><button type="button"  class="btn btn-primary s-font">Add To Cart</button> </div>';
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
		html+='<div class="pro-detail-text s-font s-black">Registraion: '+registrationStartDate+'-'+registrationEndDate+'</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+='<div class="pro-detail-text s-font s-black">Exam :'+examDate+'</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+='<div class="row">';
		html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
		html+='<div class="pro-detail-text s-font s-black">Program is ACTIVE</div>';
		html+='</div>';
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
		html+=' <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 center"> <button type="button"  class="btn btn-primary s-font">Details</button><button type="button"  class="btn btn-primary s-font">Login/Signup</button> </div>';
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
		html+='<div class="pro-detail-text s-font s-black">Registraion: '+registrationStartDate+'-'+registrationEndDate+'</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+='<div class="pro-detail-text s-font s-black">Exam :'+examDate+'</div>';
		html+='</div>';
		html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
		html+='<div class="row">';
		html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
		html+='<div class="pro-detail-text s-font s-black">Program is ACTIVE</div>';
		html+='</div>';
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
	var registrationStartDate= data_map.registrationStartDate;
	var registrationEndDate= data_map.registrationEndDate;
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
	html+='<div class="pro-detail-text s-font s-black">Registraion: '+registrationStartDate+'-'+registrationEndDate+'</div>';
	html+='</div>';
	html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
	html+='<div class="pro-detail-text s-font s-black">Exam :'+examDate+'</div>';
	html+='</div>';
	html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-5">';
	html+='<div class="row">';
	html+='<div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">';
	html+='<div class="pro-detail-text s-font s-black">Program is ACTIVE</div>';
	html+='</div>';
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



//function pagination() {
//	debugger;
//	var s_html = "";
//	$('.pagination').html("");
//	ajaxWithJSON("/common/pagination", g_data, 'POST', function(response) {debugger;
//				var l_data = response.object;
//				/* dynamic html code */
//				
//				s_html='<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 m-t-30">';
//				s_html='<span class="program-text-normal s-font c-primary" style="font-weight:600;">';
//			    s_html='Showing 1-10 out of 50';
//				s_html='</span>';							  
//				s_html='</div>'; 
//				s_html='<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">';
//				s_html='<nav aria-label="Page navigation example">';
//				s_html='<ul class="pagination" style="float:right;">';
//				s_html='<li class="page-item">';
//				s_html='<a class="page-link" href="#" aria-label="Previous">';
//				s_html='<span aria-hidden="true">&laquo;</span>';
//				s_html='<span class="sr-only">Previous</span>';
//				s_html='</a>';
//				s_html='</li>';
//				s_html='<li class="page-item"><a class="page-link" href="#">1</a></li>';
//				s_html='<li class="page-item"><a class="page-link" href="#">2</a></li>';
//				s_html='<li class="page-item"><a class="page-link" href="#">3</a></li>';
//				s_html='<li class="page-item">';
//				s_html='<a class="page-link" href="#" aria-label="Next">';
//				s_html='<span aria-hidden="true">&raquo;</span>';
//				s_html='<span class="sr-only">Next</span>';
//				s_html='</a>';
//				s_html='</li>';
//				s_html='</ul>';
//				s_html='</nav>';
//				s_html='</div>';
//				 
//				$('.pagination').html(s_html);
//				// alert("binding successfully ");
//			});
//}
