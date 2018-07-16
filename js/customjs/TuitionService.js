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
    			
    			html += "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-6 prop jQueryEqualHeightD\">";
    			html += "<div class=\"wht-cont\">";
    			html += "<div class=\"img-section\"><div class=\"exp-img-2\" style=\"background:url(http://placehold.it/255x200) center;background-size: cover;-webkit-filter: blur(2px);-moz-filter: blur(2px);-o-filter: blur(2px);-ms-filter: blur(2px);filter: blur(2px);\"></div>"; 
    			html += "<div class=\"img-small\"><img src=\"http://placehold.it/255x200\" class=\"cercular-img\" alt=\"profile pic small\"></div></div>";
    			html += "<div class=\"item-title\">";
    			html += "<h4 class='tutor-value'>"+tutorMap.displayName+"</h4>";
    			html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>Experience :</strong><span class=\"tutor-val-text\">"+tutorMap.totalExperience+" Years</span></span><br/>"; 
    			html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>Expert In :</strong><span class=\"tutor-val-text\">"+tutorMap.specialities+"</span></span><br/>";
    			html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>No of Active Batches :</strong><span class=\"tutor-val-text\">20</span></span><br/>";
    			html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>Price :</strong><span class=\"tutor-val-text\">&#8377; 2000</span></span><br/>";
    			html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>Distance :</strong><span class=\"tutor-val-text\">"+Math.round(parseFloat(tutorMap.distance))+" km </span></span><br/>"; 
    		    html += "<span class=\"profileSpan\" style=\"font-size: 16px;font-weight:500; font-family:open sans;\"> <span class=\"rating-text tutor-val-text\">12,335</span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span> <span class=\"fa fa-star checked\"></span><span class=\"fa fa-star\"></span></span></div>";
    			html += "<div class=\"item-title btm-part\">";
    			html += "<div class=\"row\">";
    			html += "<div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-6\" style='text-align:center;'>";
				html += "<a href='../../tutor-profile?login=false&user="+tutorMap.userName+"' class=\"btn btn-primary\">View Profile</a>";
    			html += "</div>";
    			 
    			if(tutorMap.SEARCH=='REQUESTED'){
    				html += "<div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-6 c_remove1"+i+"\" style='text-align:center;'>";
    				html += "<a href=\"#\" onclick=\"return removeTutorToRequest('"+tutorMap.userName+"','"+tutorMap.requestId+"','"+i+"')\" class=\"btn btn-danger\">Select Tutor</a></div></div></div></div></div>";
    			   
    			}else{
    				html += "<div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-6 c_add1"+i+"\" style='text-align:center;'>";
    			    html += "<a href=\"#\" onclick=\"return addTutorToRequest('"+tutorMap.userName+"','"+tutorMap.displayName+"','"+i+"')\" class=\"btn btn-danger\">Select Tutor</a></div></div></div></div></div>";
    			    
    			}
    			    //html += "<a href=\"#\" onclick=\"return requestForTuition('"+tutorMap.userName+"','"+tutorMap.displayName+"')\" class=\"btn btn-danger\">Request For Tuition</a></div></div></div></div></div>";
    		}
    		
    		return html;
    	}
		
function listViewTab(tutorList){
			var html = "";
			
			for(var i=0;i<tutorList.length;i++){
    			var tutorMap = tutorList[i];
			
    			 html += "<div class=\"row white\" >";
     			html += "<div class=\"col-lg-3 col-md-4 col-sm-4 col-xs-12 prp-img\">";
     			html += "<div class=\"img-section\"><div class=\"exp-img-2\" style=\"background:url(http://placehold.it/255x200) center;background-size: cover;-webkit-filter: blur(2px);-moz-filter: blur(2px);-o-filter: blur(2px);-ms-filter: blur(2px);filter: blur(2px);\"></div>"; 
     			html += "<div class=\"img-small listview\"><img src=\"http://placehold.it/255x200\" class=\"cercular-img\" alt=\"profile pic small\"></div></div></div>";
     			html += "<div class=\"item-info-map col-lg-6 col-md-5 col-sm-5 col-xs-6\">";
 				html +="<div class=\"row\">";
 				html +="<div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-6\">";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";
 				html += "<h4 class='tutor-value'>"+tutorMap.displayName+"</h4></div>";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-10\">";
 				html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>Experience :</strong><span class=\"tutor-val-text\">"+tutorMap.totalExperience+"</span></span></div>";
                 html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";				
     			html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>Expert In :</strong><span class=\"tutor-val-text\">"+tutorMap.specialities+"</span></span></div>";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";
     			html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>No of Active Batches :</strong><span class=\"tutor-val-text\"> 20</span></span></div>";
 				html += "</div>";
 				html += "<div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-6\">";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";
 				html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>Price :</strong><span class=\"tutor-val-text\">&#8377; 2000</span></span></div>";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";
 				html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>Distance :</strong><span class=\"tutor-val-text\">"+Math.round(parseFloat(tutorMap.distance))+" km </span></span></div>";
 				html += "</div>"; 
 				html += "</div>"; 
     			html += "</div>";
     			html += "<div class=\"item-price col-lg-3 col-md-3 col-sm-3 col-xs-6\"><div class=\"row\">";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\" style='text-align:center;'><span class=\"profileSpan\" style=\"font-size: 20px;font-weight:500; font-family:open sans;\"><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span><span class=\"fa fa-star checked\"></span> <span class=\"fa fa-star checked\"></span><span class=\"fa fa-star\"></span></span></div>";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\" style='text-align:center;'><span class=\"profileSpan\" style=\"font-size: 16px;font-weight:500; font-family:open sans;\"> <span class=\"rating-text tutor-val-text\" style='font-size:16px;color:black;'>12,335 total views</span></span></div>";
 				html += "<div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12 m-t-30\" style='text-align:center;'><a href='../../tutor-profile?login=false&user="+tutorMap.userName+"'class=\"btn btn-primary\">View Profile</a></div>";
     			if(tutorMap.SEARCH=='REQUESTED')
 				
     			 html += "<div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12 m-t-30\ c_remove2"+i+"\" style='text-align:center;'><a href=\"#\" onclick=\"return removeTutorToRequest('"+tutorMap.userName+"','"+tutorMap.requestId+"','"+i+"')\" class=\"btn btn-success\">Select Tutor</a></div>";
     			else
     			  html += "<div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12 m-t-30\ c_add2"+i+"\" style='text-align:center;'><a href=\"#\" onclick=\"return addTutorToRequest('"+tutorMap.userName+"','"+tutorMap.displayName+"','"+i+"')\" class=\"btn btn-success\">Select Tutor</a></div>";
     			//html += "<div class=\"ffs-bs col-xs-12 btn-half-wth\" style='text-align:center;'><a href=\"#\" onclick=\"return requestForTuition('"+tutorMap.userName+"','"+tutorMap.displayName+"')\" class=\"btn btn-default btn-small\">Request For Tuition<i class=\"fa fa-caret-right\"></i></a></div>";
     			 
     			html += " </div></div></div>";
 			}
 			
 			return html;
		}

 
	
	// search from filters
	
	var l_search_array = [ "address-map", "subjectId"];
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
		l_search_map.location = document.getElementById("address-map").value;
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
				 var l_text=" || <span style='font-weight: 400;'>"+$('#address-map').val()+"</span><span>|| "+$('#subjectId').val()+"</span>";
		    	 
			    	if(counter<10)
			    	$('.i_total_result').html("Total showing "+counter+" out of "+counter+l_text);
			    	else
			    		$('.i_total_result').html("Total showing 10 out of "+counter+l_text);
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
			initializeCustomGoogleMap(tutorSearchResult,latitude,longitude,null);
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
	var tutorId = '';
    function addTutorToRequest(p_tutor_id,p_display_name,p_count){
    	var l_search_map = {};
		l_search_map.latitude = latitude;
		l_search_map.longitude =longitude;
		if(search_map_obj.subjectId == undefined || search_map_obj.subjectId == null || search_map_obj.subjectId == '')
		  l_search_map.subjectId = '';
		else
			l_search_map.subjectId = search_map_obj.subjectId;
		$('.loading').show();
		ajaxWithJSON("/tutor-add-request",l_search_map,'POST',function(response) {
			var l_data = response.object;
			//alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				$('.loading').hide();
			    $('.c_requestId').val(l_data);
			    $('.c_count').val(p_count);
				$('#tuition_request').modal('show');
				$('.c_tutor_name').html("Tutor : "+p_display_name);
				tutorId= p_tutor_id;
				loadTutorBatches(p_tutor_id);
				
				var l_html = '';
				for(var i=0;i<g_subjects.length;i++){
					var l_map = g_subjects[i];
					l_html+='<option data-value="'+l_map.subjectId+'" value="'+l_map.subjectName+'"></option>';
				}
				$('#subjectListmodal').html(l_html);
				toastr.success(response.message);
			}
			if (response.status == 'ERROR') {
				$('.loading').hide();
				toastr.error(response.message);
			}

});
    }
    
    function removeTutorToRequest(p_tutorId,p_requestId,p_count){
    	var l_search_map = {};
		l_search_map.latitude = latitude;
		l_search_map.longitude =longitude;
		l_search_map.tutorId = p_tutorId;
		l_search_map.requestId = p_requestId;
		if(search_map_obj.subjectId == undefined || search_map_obj.subjectId == null || search_map_obj.subjectId == '')
		  l_search_map.subjectId = '';
		else
			l_search_map.subjectId = search_map_obj.subjectId;
		$('.loading').show();
		ajaxWithJSON("/tutor-remove-request",l_search_map,'POST',function(response) {
			var l_data = response.object;
			alert(JSON.stringify(response));
			var html = '';
			alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				$('.loading').hide();
				var l_google_map_initailize = {};
				var l_text='return addTutorToRequest(\''+p_tutorId+'\',\''+l_data.displayName+'\',\''+p_count+'\')';
    			$('.c_add1'+p_count).html("<a href=\"#\" onclick=\"return addTutorToRequest('"+p_tutorId+"','"+l_data.displayName+"','"+p_count+"')\" class=\"btn btn-default btn-small-2 normal-p\" style='padding: 7.5px 19px;margin:0px !important;'>Select Tutor<i class=\"fa fa-caret-right\"></i></a></div></div></div></div></div>");
			    $('.c_add2'+p_count).html("<div class=\"ffs-bs col-xs-12 btn-half-wth\ c_add2"+p_count+"\" style='text-align:center;'><a href=\"#\" onclick=\"return addTutorToRequest('"+p_tutorId+"','"+l_data.displayName+"','"+p_count+"')\" class=\"btn btn-default btn-small\">Select Tutor<i class=\"fa fa-caret-right\"></i></a></div>");
			    
			    l_google_map_initailize.text = '<button onclick="'+l_text+'">Select Request</button>';
			    l_google_map_initailize.tutorId = p_tutorId;
			    initializeCustomGoogleMap(tutorSearchResult,latitude,longitude,l_google_map_initailize);
    			toastr.success(response.message);
			}
			if (response.status == 'ERROR') {
				$('.loading').hide();
				toastr.error(response.message);
			}

});
    }
	function saveStudentRequest(p_flage) {

		
		var l_request_map ={};
		l_request_map.requestId = $('.c_requestId').val();
		var l_count = $('.c_count').val();
		
		if(p_flage=='EXIST'){
			if($('.c_tutor_batches').val()==''){
				$('c_request_error').html("Please select Batch.");
				setTimeout(function(){ $('c_request_error').html(""); }, 3000);
				return;
				}
			l_request_map.batchId = $('.c_tutor_batches').val();
			l_request_map.batchType = 'EXIST';
			l_request_map.tutorId = tutorId;
		}
		if(p_flage=='NEW'){
			if($('.c_frequency').val()==''){
				$('c_request_error').html("Please select Frequency.");
				setTimeout(function(){ $('c_request_error').html(""); }, 3000);
				return;
			}
			if($('.c_startTime').val()==''){
				$('c_request_error').html("Please select Start Time.");
				setTimeout(function(){ $('c_request_error').html(""); }, 3000);
			}
			if($('.c_endTime').val()==''){
				$('c_request_error').html("Please select end time.");
				setTimeout(function(){ $('c_request_error').html(""); }, 3000);
			}
			if($('#subjectId-hidden').val()==''){
				$('c_request_error').html("Please select Subject.");
				setTimeout(function(){ $('c_request_error').html(""); }, 3000);
			}
			l_request_map.batchType = 'NEW';
			l_request_map.batchFrequency = $('.c_frequency').val();
			l_request_map.batchStartTime = $('.c_startTime').val();
			l_request_map.batchEndTime = $('.c_endTime').val();
			l_request_map.subjectId = $('#subjectId-hidden').val();
			l_request_map.tutorId = tutorId;
		}
		$('.loading').show();
		ajaxWithJSON("/tutor-tuition-request",l_request_map,'POST',function(response) {
					var l_data = response.object;
					var l_google_map_initailize = {};
					$('.loading').hide();
					//alert(JSON.stringify(response));
					if (response.status == 'SUCCESS') {
						$('#tuition_request').modal('hide');
						var l_text ='return removeTutorToRequest(\''+tutorId+'\',\''+$('.c_requestId').val()+'\',\''+l_count+'\')';
					    $('.c_add1'+l_count).html('<a href=\"#\" onclick=\"return removeTutorToRequest(\''+tutorId+'\',\''+$('.c_requestId').val()+'\',\''+l_count+'\')\" class=\"btn btn-default btn-small-2 normal-p\" style="padding: 7.5px 19px;margin:0px !important;">Cancel Request<i class=\"fa fa-caret-right\"></i></a>');
					    $('.c_add2'+l_count).html('<a href="#" onclick="return removeTutorToRequest(\''+tutorId+'\',\''+$('.c_requestId').val()+'\',\''+l_count+'\')" class="btn btn-default btn-small">Cancel Request<i class="fa fa-caret-right"></i></a>');
					    $('.c_change'+l_count).html('<button onclick="'+l_text+'">Cancel Request</button>');
					    l_google_map_initailize.text = '<button onclick="'+l_text+'">Cancel Request</button>';
					    l_google_map_initailize.tutorId = tutorId;
					    initializeCustomGoogleMap(tutorSearchResult,latitude,longitude,l_google_map_initailize);
						toastr.success(response.message);
					}
					if (response.status == 'ERROR') {
						$('c_request_error').html(response.message);
						setTimeout(function(){ $('c_request_error').html(""); }, 3000);
					
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
	            	$('.c_tutor_batches').append('<option value="'+b_map.batchId+'">'+b_map.batchName+','+b_map.batchMode+','+b_map.medium+'</option>');
	            
	            }
			}
			if (response.status == 'ERROR') {
				console.log(response.message);
			}
		});
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
	

