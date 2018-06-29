/**
 * 
 */

$(document).ready(function(){
	loadTutorSubjects();
	
});
$(document).ready(function() {
	  $('#tuition_request').on('hidden', function() {
	    clear()
	  });
});

var g_latitude;
var g_longitude;
function gridViewTab(tutorList){debugger;
    		var html = "";
    		
    		for(var i=0;i<tutorList.length;i++){
    			var tutorMap = tutorList[i];
    			
    			html += "<div class=\"col-md-3 col-sm-3 col-xs-6 prop\">";
    			html += "<div class=\"wht-cont\">";
    			html += "<div class=\"exp-img-2\" style=\"background:url(http://placehold.it/255x200) center;background-size: cover;\"><span class=\"filter\"></span>";
    			html += "<span class=\"ffs-bs\"><a for=\"op\" class=\"btn btn-small btn-primary\" href='http://scholarsmerit.com/tutor-profile?login=false&user="+tutorMap.userName+"'>View Profile</a></span>";
    			html += "<div class=\"overlay\"><div class=\"img-counter\">SMOPL</div></div></div>";
    			html += "<div class=\"item-title\">";
    			html += "<h4 class='tutor-value'><strong>Name:</strong>"+tutorMap.displayName+"</h4>";
    			html += "<h4 class='tutor-value' style=\"font-size:15px;\"><strong>Experience :</strong>"+tutorMap.totalExperience+"</h4>"; 
    			html += "<h4 class='tutor-value' style=\"font-size:15px;\"><strong>Expertise :"+tutorMap.specialities+"</strong></h4>"; 
    			html += "<h4 class='tutor-value' style=\"font-size:15px;\"><strong>Distance :"+Math.round(parseFloat(tutorMap.distance))+" km</strong></h4>"; 
    		    html += "</div><hr>"; 
    			html += "<div class=\"item-title btm-part\">";
    			html += "<div class=\"row\">";
    			html += "<div class=\"col-md-4 col-sm-4 col-xs-4\">";
    			html += "</div>";
    			html += "<div class=\"col-md-8 col-sm-8 col-xs-8 favorite\">";  
    			html += "<a href=\"#\" onclick=\"return requestForTuition('"+tutorMap.userName+"','"+tutorMap.displayName+"')\" class=\"btn btn-default btn-small-2 normal-p\" style='padding: 7.5px 19px;margin:0px !important;'>Request For Tuition<i class=\"fa fa-caret-right\"></i></a></div></div></div></div></div>";
    		}
    		
    		return html;
    	}
		
		function listViewTab(tutorList){
			var html = "";
			
			for(var i=0;i<tutorList.length;i++){
    			var tutorMap = tutorList[i];
			
    			html += "<div class=\"row white\" >";
    			html += "<div class=\"col-md-3 col-sm-3 prp-img\">";
    			html += "<div class=\"exp-img-2\" style=\"background:url(http://placehold.it/285x200) center;background-size: cover;\"><span class=\"filter\"></span>";
    			html += "<span class=\"ffs-bs\"><a for=\"op\" class=\"btn btn-small btn-primary\" href='http://scholarsmerit.com/tutor-profile?login=false&user="+tutorMap.userName+"'>View Profile</a></span>";
    			html += "<div class=\"overlay\">";
    			html += "<div class=\"img-counter\">SMOPL</div>";
    			html += "</div></div></div>";
    			html += "<div class=\"item-info col-lg-6 col-md-6 col-sm-6\">";
    			html += "<h4><a href=\"#\">"+tutorMap.displayName+"</a></h4>";
    			html += "<p class=\"team-color\">"+tutorMap.totalExperience+"</p>"; 
    			html += "<div class=\"block\">";
    			html += "<div class=\"col-md-3 col-sm-2 col-xs-2 cat-img\">";
    			html += "<p class=\"info-line\">"+tutorMap.specialities+"</p>";
    			html += "</div>";
    			html += "<div class=\"col-md-5 col-sm-4 col-xs-4 cat-img\">";
    			html += "<p class=\"info-line\">"+Math.round(parseFloat(tutorMap.distance))+" km</p>";
    			html += "</div>";
    			html += "<div class=\"col-md-2 col-sm-2 col-xs-2 cat-img\">";
    			/* html += "<p class=\"info-line\">"+tutorMap.subjectName+"</p>"; */
    			html += "</div>";
    			html += "<div class=\"col-md-2 col-sm-2 col-xs-2 cat-img\">";
    			/* html += "<p class=\"info-line\">"+tutorMap.className+"</p>"; */
    			html += "</div></div>";
    			html += "<div class=\"col-md-3 col-sm-2 col-xs-2 line\"></div>";
    			html += "<div class=\"col-md-5 col-sm-4 col-xs-4 line\"></div>";
    			html += "<div class=\"col-md-2 col-sm-2 col-xs-2 line\"></div>";
    			html += "<div class=\"col-md-2 col-sm-2 col-xs-2 line\"></div>";
    			html += "<hr></div>";
    			html += "<div class=\"item-price col-lg-3 col-md-3 col-sm-3 col-xs-12\">";
    			html += "<div class=\"ffs-bs col-xs-12 btn-half-wth\" style='text-align:center;'><a href=\"#\" onclick=\"return requestForTuition('"+tutorMap.userName+"','"+tutorMap.displayName+"')\" class=\"btn btn-default btn-small\">Request For Tuition<i class=\"fa fa-caret-right\"></i></a></div>";
    			html += "<div class=\"sum favorite col-sm-12 col-xs-6\">"; 
    			//html += "<p class=\"col-xs-3\">Cart</p>";
    			html += "</div></div></div>";
			}
			
			return html;
		}

  var l_search_array = ["address-map","subjectId","offset","records"];

function codeAddress() { debugger; 
	
var l_location = $("#address-map").val();		
if(l_location.length==0){
	$(".search_msg").show();
	$(".search_msg").html("Please Select location from list");
	setTimeout('$(".search_msg").hide()',5000);
	return false;
}
	
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById("address-map").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
    	  var b_latitude = results[0].geometry.location.lat();
    	  var b_longitude = results[0].geometry.location.lng();
    	  
    	  //alert(l_latitude+"------"+l_longitude)
    	  formSubmit(b_latitude,b_longitude);
     }
      else {
       // alert("Geocode was not successful for the following reason: " + status);
        toastr.error("Please select proper address from suggested list.");
      }
    });
    
  }


	function formSubmit(latitude,longitude){ 
		 
		var l_search_map = {};
		
		$(".all-input").find("input[type=text],select,input[type=hidden]").each(function(index,item){
			l_search_map[l_search_array[index]] = $(item).val();			
		});
		 
		 l_search_map.latitude  = l_latitude;
		 l_search_map.longitude = l_longitude;
		 $("#searchTutorData").val(JSON.stringify(l_search_map));		
         document.searchForm.submit();
	}
	
	// search from filters
	
	var l_search_array = [ "address-map", "subjectId","subjectId-hidden"];
	function searchTutors() {

		var address = $("#address-map").val();

		if (address.length == 0) {
			$(".search_msg").show();
			$(".search_msg").html("Please Enter location for tutor");
			setTimeout('$(".search_msg").hide()', 5000);
			return false;
		}

		geocoder = new google.maps.Geocoder();
		var address = document.getElementById("address-map").value;
		geocoder.geocode({
			'address' : address
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				latitude = results[0].geometry.location.lat();
				longitude = results[0].geometry.location.lng();

				formSubmitFilter(latitude,longitude);
			} else {
				formSubmitFilter(latitude,longitude);
				// alert("Geocode was not successful for the following reason: " + status);
			}
		});

	}

	function formSubmitFilter(lati,longi) {
		var l_search_map = {};
        
		$(".all-input").find("input[type=text],select").each(
				function(index, item) {
					l_search_map[l_search_array[index]] = $(item)
							.val();
				});
		l_search_map.requestId= null;
		l_search_map.latitude = lati;
		l_search_map.longitude = longi;
		l_search_map.offset = "0";
		l_search_map.records = "10";
		l_subject_id = l_search_map.subjectId;
		$('.loading').show();
		ajaxWithJSON("/common/search-tutor-data", l_search_map, 'POST', function(response) {
			//alert(JSON.stringify(response));
		$('.loading').hide();
	    if (response.status == 'SUCCESS') {
				 l_data = response.object;
				 tutorSearchResult   = l_data.tutorData;
				 l_count_list_obj 	= l_data.requestCount;
				 search_map_obj 		= l_data.searchmap;
				 latitude 		    = l_data.latitude;
				 longitude 	        = l_data.longitude;
				 numberOfPages 		= l_data.numberOfPages;
				 pageNumber 	        = l_data.pageNumber;
				 counter 	        = l_data.counter;
				 SearchByFilter();

			}
			if (response.status == 'ERROR') {
				toastr.error(response.message);

			}

		});
	}
	
	
	function SearchByFilter(){
	
	l_subject_id  	= search_map_obj.subjectId;

		
		if(tutorSearchResult.length > 0 || tutorSearchResult != 'undefined' || tutorSearchResult != '' || tutorSearchResult != null){
			
			var gridviewhtml = gridViewTab(tutorSearchResult);
			var listviewhtml = listViewTab(tutorSearchResult);
			initializeCustomGoogleMap(tutorSearchResult,latitude,longitude);
	        paginationView();
			$("#gridviewtabdiv").html("").append(gridviewhtml);
			$("#listviewtabdiv").html("").append(listviewhtml);
			//setOptions("subjectId",l_subject_list_obj,'subjectId','subjectName',"Select Subject Name");	
		}else{
			toastr.error("No Tutor Available in this area.");
		}
		
	}
	// end search from filters
	
	

	var tutorId = '';
    function requestForTuition(p_user_name,p_display_name) {

		$('#tuition_request').modal('show');
		$('.c_tutor_name').html("Tutor : "+p_display_name);
		tutorId= p_user_name;
		loadTutorBatches(p_user_name);
		
		var l_html = '';
		for(var i=0;i<g_subjects.length;i++){
			var l_map = g_subjects[i];
			l_html+='<option data-value="'+l_map.subjectId+'" value="'+l_map.subjectName+'"></option>';
		}
		$('#subjectListmodal').html(l_html);
		//loadTutorSubjects(p_user_name);

	}
	
	function saveStudentRequest(p_flage) {

		var l_final_input = {};
		var l_search_map = {};
		var l_request_map ={};
		l_search_map.latitude = latitude;
		l_search_map.longitude =longitude;
		l_search_map.subjectId = batch_subjectId;
		if(p_flage=='EXIST'){
			l_request_map.batchId = $('.c_tutor_batches').val();
			l_request_map.batchType = 'EXIST';
			l_request_map.tutorId = tutorId;
		}
		if(p_flage=='NEW'){
			l_request_map.batchType = 'NEW';
			l_request_map.batchFrequency = $('.c_frequency').val();
			l_request_map.batchStartTime = $('.c_startTime').val();
			l_request_map.batchEndTime = $('.c_endTime').val();
			l_request_map.subjectId = $('#subject-def').val();
		}
		l_final_input.search = l_search_map;
		l_final_input.request = l_request_map;
		ajaxWithJSON("/tutor-tuition-request",l_final_input,'POST',function(response) {
					var l_data = response.object;
					//alert(JSON.stringify(response));
					if (response.status == 'SUCCESS') {
						$('#tuition_request').modal('hide');
						toastr.success(response.message);
					}
					if (response.status == 'ERROR') {
						console.log(response.message);
					}

		});

	} 
	var g_batches = [];
	function loadTutorBatches(p_user) {debugger;

		var l_map = {};
		l_map.login = false;
		l_map.user = p_user;
		l_map.top = false;
		ajaxWithJSON("/tutor-batches", l_map, 'POST', function(response) {
			var l_data = response.object;
			//alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				g_batches = l_data;
	            for(var i=0;i<l_data.length;i++){
	            	var b_map = l_data[i];
	            	$('.c_tutor_batches').append('<option value="'+b_map.batchId+'">'+b_map.batchName+'</option>');
	            
	            }
			}
			if (response.status == 'ERROR') {
				console.log(response.message);
			}
		});
	}
	var batch_subjectId = '';
	function selectBatch(){
		 var l_html='';
		 for(var i=0;i<g_batches.length;i++){
         	var b_map = g_batches[i];
         	if(b_map.batchId==$('.c_tutor_batches').val()){
         		batch_subjectId = b_map.batchId;
    	        l_html+='<div class="row"><div class="col-md-4 col-sm-12 col-xs-12">';
    			l_html+='<div class="card"><div class="card-body">';
             	l_html+='<div class="row">';
             	l_html+='<div class="col-md-12">';
    			l_html+='<div class="row">';
    			l_html+='<div class="col-md-5 col-sm-5 col-xs-5">';
             	l_html+='<span>Batch Name<span></div>'; 
    			l_html+='<div class="col-md-1 col-sm-1 col-xs-1">';
             	l_html+='<span>:<span></div>'; 
    			l_html+='<div class="col-md-6 col-sm-6 col-xs-6">';
             	l_html+='<span>'+b_map.batchName+'<span></div></div></div>'; 
    			l_html+='<div class="col-md-12">';
    			l_html+='<div class="row">';
    			l_html+='<div class="col-md-5 col-sm-5 col-xs-5">';
             	l_html+='<span>Batch Mode<span></div>'; 
    			l_html+='<div class="col-md-1 col-sm-1 col-xs-1">';
             	l_html+='<span>:<span></div>'; 
    			l_html+='<div class="col-md-6 col-sm-6 col-xs-6">';
             	l_html+='<span>'+b_map.batchMode+'<span></div></div></div>'; 
    			l_html+='<div class="col-md-12">';
    			l_html+='<div class="row">';
    			l_html+='<div class="col-md-5 col-sm-5 col-xs-5">';
             	l_html+='<span>Total Classes<span></div>'; 
    			l_html+='<div class="col-md-1 col-sm-1 col-xs-1">';
             	l_html+='<span>:<span></div>'; 
    			l_html+='<div class="col-md-6 col-sm-6 col-xs-6">';
             	l_html+='<span>'+b_map.totalNumberOfClasses+'<span></div></div></div>'; 
    		    l_html+='<div class="col-md-12">';
    			l_html+='<div class="row">';
    			l_html+='<div class="col-md-5 col-sm-5 col-xs-5">';
             	l_html+='<span>Medium <span></div>'; 
    			l_html+='<div class="col-md-1 col-sm-1 col-xs-1">';
             	l_html+='<span>:<span></div>'; 
    			l_html+='<div class="col-md-6 col-sm-6 col-xs-6">';
             	l_html+='<span>'+b_map.medium+'<span></div></div></div>'; 
    			l_html+='<div class="col-md-12">';
    			l_html+='<div class="row">';
    			l_html+='<div class="col-md-5 col-sm-5 col-xs-5">';
             	l_html+='<span>Start From <span></div>'; 
    			l_html+='<div class="col-md-1 col-sm-1 col-xs-1">';
             	l_html+='<span>:<span></div>'; 
    			l_html+='<div class="col-md-6 col-sm-6 col-xs-6">';
             	l_html+='<span>'+b_map.batchStartDate+'<span></div></div></div>'; 
    			l_html+='<div class="col-md-12">';
    			l_html+='<div class="row">';
    			l_html+='<div class="col-md-5 col-sm-5 col-xs-5">';
             	l_html+='<span>fee <span></div>'; 
    			l_html+='<div class="col-md-1 col-sm-1 col-xs-1">';
             	l_html+='<span>:<span></div>'; 
    			l_html+='<div class="col-md-6 col-sm-6 col-xs-6">';
             	l_html+='<span>&#8377; '+b_map.feeAmount+'<span></div></div></div>';
             	l_html+='</div></div></div>'; 
             	l_html+='</div></div>';
         	$('.c_info').html(l_html);
         	}
         
         }
	}

	  function showoption(p_flage) {
	if (p_flage == "NONE") {
		toastr.error('Please select any one option.');

	}
	if (p_flage == "EXIST") {
		$("#option1").show();
		$("#info1").show();
		$("#info2").hide();
		$("#option2").hide();
		$("#option3").hide();
		$('.c_footer').html('<button type="button" class="btn btn-modal" onclick="saveStudentRequest(\'EXIST\')">Submit Request</button><button type="button" class="btn btn-modal" data-dismiss="modal">Cancel</button>');
	}
	if (p_flage == "NEW") {
		$("#option1").hide();
		$("#info1").hide();
		$("#info2").show();
		$("#option2").show();
		$("#option3").show();
		$('.c_footer').html('<button type="button" class="btn btn-modal" onclick="saveStudentRequest(\'NEW\')">Submit Request</button><button type="button" class="btn btn-modal" data-dismiss="modal">Cancel</button>');
		loadTutorSubjects();
	}
}
	

