/**
 * 
 */

$(document).ready(function() {
	  $('#tuition_request').on('hidden', function() {
	    clear()
	  });
});
var g_latitude;
var g_longitude;
function gridViewTab(tutorList,login){debugger;
    		var html = "";
    		var box;
    		for(var i=0;i<tutorList.length;i++){
    			var tutorMap = tutorList[i];
    			
    			if(login){
    				box = "<label class=\"checkbox-inline checkbox-styled\"><input id='i_tutor_grid"+i+"' type=\"checkbox\" value=\"option1\" onclick=\"return initiateRequest('"+tutorMap.userName+"','"+tutorMap.displayName+"','"+i+"',\'i_tutor_grid\')\"><span>Select Tutor</span></label>";
       		    }else{
       			 box="<button type='button' class='btn btn-primary' style='float:right;'><a href='/'>Login/Signup to Select</a></button>";
       		    }
    			html += "<div class=\"col-lg-3 col-md-4 col-sm-6 col-xs-6 prop jQueryEqualHeightD\">";
    			html += "<div class=\"wht-cont\">";
    			html += "<div class=\"img-section\"><div class=\"exp-img-2\" style=\"background:url(http://placehold.it/255x200) center;background-size: cover;-webkit-filter: blur(2px);-moz-filter: blur(2px);-o-filter: blur(2px);-ms-filter: blur(2px);filter: blur(2px);\"></div>"; 
    			html += "<div class=\"img-small\"><img src=\"http://placehold.it/255x200\" class=\"cercular-img\" alt=\"profile pic small\"></div></div>";
    			html += "<div class=\"item-title\">";
    			html += "<h4 class='tutor-value'>"+tutorMap.displayName+"</h4>";
    			html += "<span class='tutor-value' ><strong>"+tutorMap.totalExperience+" Years of Experience</strong></span><br/>"; 
    			html += "<span class='tutor-value' ><strong>Expert In "+tutorMap.specialities+"</strong></span></span><br/>";
    			html += "<span class='tutor-value' ><strong>"+tutorMap.noOfBatches+" Active Batches</strong></span><br/>";
    			if(tutorMap.price==null || tutorMap.price==undefined || isNaN(tutorMap.price)){
    				html += "<span class='tutor-value' ><strong>Average Price is &#8377; 0.0 </strong></span><br/>";
    			}else{
    			html += "<span class='tutor-value' ><strong>Average Price is &#8377; "+parseFloat(tutorMap.price).toFixed(2)+"</strong> </span><br/>";
    			}
    			html += "<span class='tutor-value' ><strong>"+Math.round(parseFloat(tutorMap.distance))+" KM from selected Location</strong></span><br/>"; 
    		    html += "<span class=\"profileSpan\" style=\"font-size: 16px;font-weight:500; font-family:open sans;\">";
    		    for(var j=0;j<5;j++){
 					if(j<=parseInt(tutorMap.averageStar)) 
 				     html += "<span class=\"fa fa-star checked\"></span>";
 					else 
 				       html += "<span class=\"fa fa-star\"></span>"; 
 				}
    		    html += "</br><span class=\"rating-text tutor-val-text\" style='font-size:15px;'>"+tutorMap.starCount+" reviews</span></span></div>";
    			html += "<div class=\"item-title btm-part\">";
    			html += "<div class=\"row\">";
    			html += "<div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-6\" style='text-align:center;'>";
				html += "<a href='../../tutor-profile?login=false&user="+tutorMap.userName+"' class=\"btn btn-primary\">View Profile</a>";
    			html += "</div>";
    				html += "<div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-6 c_add1"+i+"\" style='text-align:center;'>";
					 html+=box;
				     html += "</div></div></div></div></div>";
    			    // html += "<a href=\"#\" onclick=\"return
					// addTutorToRequest('"+tutorMap.userName+"','"+tutorMap.displayName+"','"+i+"')\"
					// class=\"btn btn-danger\">Select
					// Tutor</a></div></div></div></div></div>";
    			    
    			
    			    // html += "<a href=\"#\" onclick=\"return
					// requestForTuition('"+tutorMap.userName+"','"+tutorMap.displayName+"')\"
					// class=\"btn btn-danger\">Request For
					// Tuition</a></div></div></div></div></div>";
    		}
    		
    		return html;
    	}
		
function listViewTab(tutorList,login){
			var html = "";
			var box;
			for(var i=0;i<tutorList.length;i++){
    			var tutorMap = tutorList[i];
			
    			if(login){
    				box = "<label class=\"checkbox-inline checkbox-styled\"><input id='i_tutor_list"+i+"' type=\"checkbox\" value=\"option1\" onclick=\"return initiateRequest('"+tutorMap.userName+"','"+tutorMap.displayName+"','"+i+"',\'i_tutor_list\')\"><span>Select Tutor</span></label>";
       		    }else{
       			 box="<button type='button' class='btn btn-primary' style='float:right;'><a href='/'>Login/Signup to Select</a></button>";
       		    }
    			 html += "<div class=\"row white\" >";
     			html += "<div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-12 prp-img\">";
     			html += "<div class=\"img-section\"><div class=\"exp-img-2\" style=\"background:url(http://placehold.it/255x200) center;background-size: cover;-webkit-filter: blur(2px);-moz-filter: blur(2px);-o-filter: blur(2px);-ms-filter: blur(2px);filter: blur(2px);\"></div>"; 
     			html += "<div class=\"img-small listview\"><img src=\"http://placehold.it/255x200\" class=\"cercular-img\" alt=\"profile pic small\"></div></div></div>";
     			html += "<div class=\"item-info-map col-lg-6 col-md-6 col-sm-6 col-xs-12\">";
 				html +="<div class=\"row\">";
 				html +="<div class=\"col-lg-6 col-md-6 col-sm-7 col-xs-12\"><div class=\"row\">";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";
 				html += "<h4 class='tutor-value'>"+tutorMap.displayName+"</h4></div>";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-10\">";
 				html += "<span class='tutor-value' ><strong>"+tutorMap.totalExperience+" years of Experience</strong></span></div>";
                html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";				
     			html += "<span class='tutor-value' ><strong>Expert In "+tutorMap.specialities+"</strong></span></div>"; 
				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";
 				html += "<span class='tutor-value' ><strong>"+Math.round(parseFloat(tutorMap.distance))+" KM from selected Location</strong></div>";
 				html += "</div></div>";
 				html += "<div class=\"col-lg-6 col-md-6 col-sm-5 col-xs-12 m-t-40-tdetails\"><div class=\"row\">";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";
 				if(tutorMap.price == null || tutorMap.price==undefined || isNaN(tutorMap.price)){
 					html += "<span class='tutor-value' ><strong>Average Price is &#8377; 0.0 </strong></span></div>";
 				}else{
 				html += "<span class='tutor-value' ><strong>Average Price is &#8377; "+parseFloat(tutorMap.price).toFixed(2)+" </strong></span> </div>";
 				}
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";
     			html += "<span class='tutor-value' ><strong>"+tutorMap.noOfBatches+" Active Batches</strong></span></div></div>";
 				html += "</div>"; 
 				html += "</div>"; 
     			html += "</div>";
     			html += "<div class=\"item-price col-lg-3 col-md-3 col-sm-3 col-xs-12\"><div class=\"row\">";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\" style='text-align:center;'><span class=\"profileSpan\" style=\"font-size: 20px;font-weight:500; font-family:open sans;\">";
 				for(var j=0;j<5;j++){
 					if(j<=parseInt(tutorMap.averageStar)) 
 				     html += "<span class=\"fa fa-star checked\"></span>";
 					else 
 				        html += "<span class=\"fa fa-star\"></span>"; 
 				}
 				html += "</span></div>";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\" style='text-align:center;'><span class=\"profileSpan\"> <span class=\"rating-text tutor-val-text rviewText\" style='color:black;'>"+tutorMap.starCount+" reviews</span></span></div>";
 				html += "<div class=\"col-lg-6 col-md-12 col-sm-12 col-xs-6 m-t-30\" style='text-align:center;'><a href='../../tutor-profile?login=false&user="+tutorMap.userName+"'class=\"btn btn-primary\">View Profile</a></div>";
     			html += "<div class=\"col-lg-6 col-md-12 col-sm-12 col-xs-6 m-t-30\ c_add2"+i+"\" style='text-align:center;'>";
     			html +=box;
				html += "</div>";
				html += " </div></div></div>";
 			}
 			
 			return html;
		}

 
	
	// search from filters
	
	var l_search_array = [ "address-map", "subjectId"];
	function searchTutors() {
		if (!(navigator.onLine)) {
			toastr.error('You are offline. please check internet connection.');
			return;
		}
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
				// alert("Geocode was not successful for the following reason: "
				// + status);
			}
		});

	}

	function formSubmitFilter(lati,longi) {
		
		var l_search_map = {};
	
		if (!(navigator.onLine)) {
			toastr.error('You are offline. please check internet connection.');
			return;
		}
		l_search_map.latitude = lati;
		l_search_map.longitude = longi;
		l_search_map.offset = "0";
		l_search_map.records = "10";
		l_search_map.location = document.getElementById("address-map").value;
		l_search_map.subjectId = document.getElementById("subjects").value;
		// alert(JSON.stringify(l_search_map));
		$('.loading').show();
		ajaxWithJSON("/common/search-tutor-data", l_search_map, 'POST', function(response) {
			// alert(JSON.stringify(response));
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
		    	 
				 if(tutorSearchResult.length==0){
					 toastr.error('No tutor find at this location.');
				 }
			    	// if(counter<10)
			    	$('.i_total_result').html("Total showing "+tutorSearchResult.length+" out of "+counter+l_text);
			    	// else
			    		// $('.i_total_result').html("Total showing 10 out of
						// "+counter+l_text);
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
			
			var gridviewhtml = gridViewTab(tutorSearchResult,login);
			var listviewhtml = listViewTab(tutorSearchResult,login);
			initializeCustomGoogleMap(tutorSearchResult,latitude,longitude,null,login);
	        paginationView();
			$("#gridviewtabdiv").html("").append(gridviewhtml);
			$("#listviewtabdiv").html("").append(listviewhtml);
			// setOptions("subjectId",l_subject_list_obj,'subjectId','subjectName',"Select
			// Subject Name");
		}else{
			toastr.error("No Tutor Available in this area.");
		}
		
	}
	// end search from filters
	
	function initiateRequest(p_tutor_id,p_display_name,p_count,requestFrom){debugger;
	
	   if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	    }
	
		if(!($('#'+requestFrom+p_count).prop('checked'))){
			// alert("rejecting request:");
			removeStudentRequest(p_tutor_id,p_count);
		}
		else{
		$('.c_count').val(p_count);
		$('.c_tutorId').val(p_tutor_id);
		$('.c_tutor_name').html("Tutor : "+p_display_name);
		$('#tuition_request').modal('show');
		
		$('#i_tutor_grid'+p_count).prop('checked', false);
		$('#i_tutor_list'+p_count).prop('checked', false);
		$('#i_tutor_map'+p_count).prop('checked', false);
		loadTutorBatches(p_tutor_id);
		
		// g_subjects in CommonFunction.js
		var l_html = '';
		for(var i=0;i<g_subjects.length;i++){
			var l_map = g_subjects[i];
			l_html+='<option data-value="'+l_map.subjectId+'" value="'+l_map.subjectName+'"></option>';
		}
		$('#subjectListmodal').html(l_html);
		
		}
		
	}
	function removeStudentRequest(p_tutorId,p_count){debugger;
	
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
		var l_request_map ={};
		l_request_map.latitude = latitude;
		l_request_map.longitude =longitude;
		l_request_map.subjectName = search_map_obj.subjectId;
		l_request_map.tutorId = p_tutorId;
		
		$('.loading').show();
		ajaxWithJSON("/tutor-remove-request",l_request_map,'POST',function(response) {
					var l_data = response.object;
					
					$('.loading').hide();
					// alert(JSON.stringify(response));
					if (response.status == 'SUCCESS') {
						
						$('#i_tutor_grid'+p_count).prop('checked', false);
						$('#i_tutor_list'+p_count).prop('checked', false);
						$('#i_tutor_map'+p_count).prop('checked', false);
						toastr.success(response.message);
					}
					if (response.status == 'ERROR') {
						$('#i_tutor_grid'+p_count).prop('checked', true);
						$('#i_tutor_list'+p_count).prop('checked', true);
						$('#i_tutor_map'+p_count).prop('checked', true);
						toastr.error(response.message);
						
					
					}

		});
	}
	function saveStudentRequest(p_flage) {debugger;
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
		
		var l_request_map ={};
		// l_request_map.requestId = $('.c_requestId').val();
		var l_count = $('.c_count').val();
		l_request_map.latitude = latitude;
		l_request_map.longitude =longitude;
		l_request_map.subjectName = search_map_obj.subjectId;
		l_request_map.location = search_map_obj.location;
		if(p_flage=='EXIST'){
			if($('.c_tutor_batches').val()==''){
				$('.c_request_error').html("Please select Batch.");
				setTimeout(function(){ $('.c_request_error').html(""); }, 3000);
				return;
				}
			l_request_map.batchId = $('.c_tutor_batches').val();
			l_request_map.batchType = 'EXIST';
			l_request_map.tutorId = $('.c_tutorId').val();
		}
		if(p_flage=='NEW'){
			if($('.c_frequency').val()==''){
				$('c_request_error').html("Please select Frequency.");
				setTimeout(function(){ $('.c_request_error').html(""); }, 3000);
				return;
			}
			if($('.c_startTime').val()==''){
				$('c_request_error').html("Please select Start Time.");
				setTimeout(function(){ $('.c_request_error').html(""); }, 3000);
			}
			if($('.c_endTime').val()==''){
				$('c_request_error').html("Please select end time.");
				setTimeout(function(){ $('.c_request_error').html(""); }, 3000);
			}
			if($('#subjectId-hidden').val()==''){
				$('c_request_error').html("Please select Subject.");
				setTimeout(function(){ $('.c_request_error').html(""); }, 3000);
			}
			l_request_map.batchType = 'NEW';
			l_request_map.batchFrequency = $('.c_frequency').val();
			l_request_map.batchStartTime = $('.c_startTime').val();
			l_request_map.batchEndTime = $('.c_endTime').val();
			l_request_map.subjectId = $('#subjectId-hidden').val();
			l_request_map.tutorId = $('.c_tutorId').val();
		}
		$('.loading').show();
		ajaxWithJSON("/tutor-tuition-request",l_request_map,'POST',function(response) {
					var l_data = response.object;
					$('.loading').hide();
					// alert(JSON.stringify(response));
					if (response.status == 'SUCCESS') {
						$('#tuition_request').modal('hide');
						$('#i_tutor_grid'+l_count).prop('checked', true);
						$('#i_tutor_list'+l_count).prop('checked', true);
						$('#i_tutor_map'+l_count).prop('checked', true);
						toastr.success(response.message);
					}
					if (response.status == 'ERROR') {
						$('.c_request_error').html(response.message);
						setTimeout(function(){ $('.c_request_error').html(""); }, 3000);
					
					}

		});

	} 
	
	function loadRequestData() {debugger;
	 var l_map = {};
	 if($('#i_role').val()=='ROLE_STUDENT'){
	 l_map.STUDENT = true;
	 l_map.TUTOR = false;
	 }
	 if($('#i_role').val()=='ROLE_TUTOR'){
		 l_map.STUDENT = false;
		 l_map.TUTOR = true;
		 }
	ajaxWithJSON("/common/load-tuition-requests",l_map,'POST',function(response) {debugger;
	
				var l_data = response.object;
				// var l_data_other = response.other;
				var pre_html = '';
				if (response.status == 'SUCCESS') {
					for(var i=0;i<l_data.length;i++){
						var b_data_map = l_data[i]; 
					if(l_map.STUDENT){
						pre_html+='<div class="panel-group m-r-c-p-group">';
			        	pre_html+='<div class="card panel manage-request-accordian">';
			        	pre_html+='<div class="card-head collapsed m-r-a-head" data-toggle="collapse" data-parent="#accordion6" data-target="#accordion6-'+i+'">';
						// start header detail
			        	pre_html+='<div class="row row-width">';
			        	pre_html+='<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">';
			        	pre_html+='<div class="row">';
			        	pre_html+='<div class="col-md-12">';
			        	if(b_data_map.requestId==null || b_data_map.requestId==undefined)
			        		pre_html+='<span class="s-profile-text-gray s-bold">Requests ID : <span class="s-black"></span></span>';
			        	else
			        	pre_html+='<span class="s-profile-text-gray s-bold">Requests ID : <span class="s-black">'+b_data_map.requestId+'</span></span>';
			        	
			        	pre_html+='</div>'; 
						pre_html+='</div>';
						pre_html+='</div>';
						pre_html+='<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">';
						pre_html+='<div class="row">';
						pre_html+='<div class="col-md-12 m-o-m-t-10 no-minus-margin">';
						if(b_data_map.subject==null || b_data_map.subject==undefined)
						pre_html+='<span class="s-profile-text-gray s-bold">Subject : <span class="s-black"></span></span>';
						else
							pre_html+='<span class="s-profile-text-gray s-bold">Subject : <span class="s-black">'+b_data_map.subject+'</span></span>';
						pre_html+='</div>'; 
						pre_html+='</div>';
						pre_html+='</div>';
			           
						pre_html+='<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 p-r-0">';
						pre_html+='<div class="row">';
						pre_html+='<div class="col-md-12 p-r-0 m-o-m-t-10 no-minus-margin">';
						if(b_data_map.location==null || b_data_map.location==undefined)
						pre_html+='<span class="s-profile-text-gray s-bold">Location : <span class="s-black"></span></span>';
						else
							pre_html+='<span class="s-profile-text-gray s-bold">Location : <span class="s-black">'+b_data_map.location+'</span></span>';
						
						pre_html+='</div>'; 
						pre_html+='</div>'; 
						pre_html+='</div>'; 
                        pre_html+='<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">';
			        	pre_html+='<div class="row">'; 
			        	pre_html+='<div class="col-md-12 m-t-minus-10 m-o-m-t-10 no-minus-margin">';
			        	if(b_data_map.requestedAt == null || b_data_map.requestedAt == undefined)
			        		pre_html+='<span class="s-profile-text-gray s-bold">Requested At : <span class="s-black"></span></span>';
			        	else{
						
						pre_html+='<span class="s-profile-text-gray s-bold">Requested At : <span class="s-black">'+b_data_map.requestedAt+'</span></span>';
					    }
						pre_html+='</div>'; 
						pre_html+='</div>';
						pre_html+='</div>';
                        pre_html+='<div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">';
			        	pre_html+='<div class="row">'; 
			        	pre_html+='<div class="col-md-12 m-t-minus-10 m-o-m-t-10 no-minus-margin">';
						
						pre_html+='<span class="s-profile-text-gray s-bold">Active Tutors :'; 
						if(b_data_map.activeTutors == null || b_data_map.activeTutors == undefined)
							pre_html+='<span class="s-black"></span>';
						else{
						var tutors = b_data_map.activeTutors;
						// for(var j=0;j<tutors.length;j++){
						// var tutor = tutors[j];
						pre_html+='<span class="s-black">'+tutors.toString()+',</span>';
						// }
						}
						pre_html+='</span>';
						pre_html+='</div>'; 
						pre_html+='</div>';
						pre_html+='</div>';							
						pre_html+='</div>';
						pre_html+='<div class="tools m-r-a-tools">';
						pre_html+='<a class="btn btn-icon-toggle tool-btn positionOnMobile "><i class="fa fa-angle-down"></i></a>';
						pre_html+='</div>'; 
						// end header detail
						pre_html+='</div>';
			            
						pre_html+='<div id="accordion6-'+i+'" class="collapse">';
						
						pre_html+='<div class="card-body m-r-a-body">';
						pre_html+='<ul class="timeline collapse-md">';
						var b_history_list = b_data_map.history;
						// alert(JSON.stringify(b_history_list));
			        	for(var k=0;k<b_history_list.length;k++){
			        		var b_history_map = b_history_list[k];
                          pre_html+='<li class="timeline-inverted">';
			              pre_html+='<div class="timeline-circ"></div>';
			             // var date1 = new
							// Date(Number(b_history_map.createdAt));
			              pre_html+='<div class="timeline-date">'+b_history_map.requestAt+'</div>';
			              pre_html+='<div class="timeline-entry">';
			              pre_html+='<div class="card timeline-card">';
			              pre_html+='<div class="card-body timeline-padding">';
						  pre_html+='<div class="row">';
						  pre_html+=' <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">';
						  pre_html+='<img class="img-responsive pull-left with-t-img" src="resources/img/batch-list/user-book.png" alt="" />';
						  pre_html+='</div>';
						  pre_html+='	<div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">';
						  pre_html+='	<div class="row">';
			              
			              pre_html+='<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">';
						  pre_html+=' <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
			              pre_html+='<span class="s-profile-text-gray">Tutor Name: <span class="s-black">'+b_history_map.displayName+'</span></span>';
						  pre_html+=' </div>';
						  pre_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
			              pre_html+='<span class="s-profile-text-gray">Comment: <span class="s-black">'+b_history_map.comment+'</span></span>';
						  pre_html+='</div>';
						  pre_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
						  if(b_history_map.batchType='NEW'){
							  pre_html+='<span class="s-profile-text-gray">Timing Opted: <span class="s-black">'+b_history_map.optedTime+'</span></span>';
						  }else
							  pre_html+='<span class="s-profile-text-gray">Timing Opted: <span class="s-black">'+b_history_map.startTime+'-'+b_history_map.endTime+'</span></span>';
			              
						  pre_html+='</div>';
						  
			              pre_html+='</div>';
						  // button for different action
			              
			               pre_html+='<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">';
			               if(b_history_map.requestStatus=='REQUESTED')
			            	   if(b_history_map.status=='ACTIVE')
			                     pre_html+='<div class="action-area"><button type="button" class="btn btn-red" style="float: right;" onclick="actionForTuitionRequests(\''+b_history_map.requestId+'\',\''+b_history_map.tuitionRequestId+'\',\''+b_history_map.tutorId+'\',\'REJECT\',\'STUDENT\')">Cancel Request</button></div>';
			               if(b_history_map.requestStatus=='ACCEPTED'){
			            	   if(b_history_map.status=='ACTIVE'){
			            	   pre_html+='<div class="action-area"><button type="button" class="btn btn-green" style="float: right;" onclick="actionForTuitionRequests(\''+b_history_map.requestId+'\',\''+b_history_map.tuitionRequestId+'\',\''+b_history_map.tutorId+'\',\'PAYMENT\',\'STUDENT\')">Pay Now</button>';
			            	   pre_html+='<button type="button" class="btn btn-red" style="float: right;" onclick="actionForTuitionRequests(\''+b_history_map.requestId+'\',\''+b_history_map.tuitionRequestId+'\',\''+b_history_map.tutorId+'\',\'REJECT\',\'STUDENT\')">Cancel Request</button></div>';
			            	   }
			               }
			            	   if(b_history_map.requestStatus=='REJECTED'){
			            	   
			                   }
			            	   if(b_history_map.requestStatus=='CANCELLED'){
				            	   
				               }
			            	   
			            	   if(b_history_map.requestStatus=='COMPLETED'){
			            		   if(b_history_map.status=='ACTIVE'){
					            	  if(b_history_map.batchId=='' || b_history_map.batchId==null || b_history_map.batchId==undefined){
					            		  pre_html+='<div class="action-area"><button type="button" class="btn btn-primary" style="float: right;" ><a href="../../student-tuition-booking-detail?tuitionRequest='+b_history_map.tuitionRequestId+'&user='+b_history_map.tutorId+'&batchId='+b_history_map.suggestBatchId+'&studentId='+b_history_map.studentId+'&login=true">View Booking Detail</a></button>';
					            	  }else
					            		  pre_html+='<div class="action-area"><button type="button" class="btn btn-primary" style="float: right;" ><a href="../../student-tuition-booking-detail?tuitionRequest='+b_history_map.tuitionRequestId+'&user='+b_history_map.tutorId+'&batchId='+b_history_map.batchId+'&studentId='+b_history_map.studentId+'&login=true">View Booking Detail</a></button>';
			            		   }
			            		   }
                           if(b_history_map.requestStatus=='SUGGESTED'){
                        	   if(b_history_map.status=='ACTIVE'){
                        	   pre_html+='<div class="action-area"><button type="button" class="btn btn-green" style="float: right;" onclick="actionForTuitionRequests(\''+b_history_map.requestId+'\',\''+b_history_map.tuitionRequestId+'\',\''+b_history_map.tutorId+'\',\'ACCEPT_SUGGESTION\',\'STUDENT\')">Accept Suggetion</button>';
    				           pre_html+=' <button type="button" class="btn btn-primary" style="float: right;" onclick="loadBatch(\''+b_history_map.suggestBatchId+'\',\''+b_history_map.tutorId+'\')">View Batch Detail</button> ';
    				           pre_html+=' <button type="button" class="btn btn-red" style="float: right;" onclick="actionForTuitionRequests(\''+b_history_map.requestId+'\',\''+b_history_map.tuitionRequestId+'\',\''+b_history_map.tutorId+'\',\'REJECT\',\'STUDENT\')">Cancel Request</button></div>';
                        	   }
                        	  }
			               pre_html+='</div>';
						  
						  
			              pre_html+='</div>';
			              pre_html+='</div>';
			              pre_html+='</div>';
						  pre_html+='</div>';
			              pre_html+='</div>';
						  pre_html+='</div>'; 
			              pre_html+='</li>'; 
			        	}
						pre_html+='</ul>';
						pre_html+='</div>';
						pre_html+='</div>';
						pre_html+='</div>';
						pre_html+='</div>';
						$(".request_list_div").append(pre_html);
						pre_html='';
					}
					
					if(l_map.TUTOR){
						
						pre_html+='<div class="panel-group m-r-c-p-group">';
			        	pre_html+='<div class="card panel manage-request-accordian">';
			        	pre_html+='<div class="card-head collapsed m-r-a-head" data-toggle="collapse" data-parent="#accordion6" data-target="#accordion6-'+i+'">';
						// start header detail
			        	pre_html+='<div class="row row-width">';
			        	pre_html+='<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">';
			        	pre_html+='<div class="row">';
			        	pre_html+='<div class="col-md-12">';
			        	if(b_data_map.requestId==null || b_data_map.requestId==undefined)
			        		pre_html+='<span class="s-profile-text-gray s-bold">Requests ID : <span class="s-black"></span></span>';
			        	else
			        	pre_html+='<span class="s-profile-text-gray s-bold">Requests ID : <span class="s-black">'+b_data_map.requestId+'</span></span>';
			        	
			        	pre_html+='</div>'; 
						pre_html+='</div>';
						pre_html+='</div>';
						pre_html+='<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">';
						pre_html+='<div class="row">';
						pre_html+='<div class="col-md-12 m-o-m-t-10">';
						if(b_data_map.subject==null || b_data_map.subject==undefined)
						pre_html+='<span class="s-profile-text-gray s-bold">Subject : <span class="s-black"></span></span>';
						else
							pre_html+='<span class="s-profile-text-gray s-bold">Subject : <span class="s-black">'+b_data_map.subject+'</span></span>';
						pre_html+='</div>'; 
						pre_html+='</div>';
						pre_html+='</div>';
			           
						pre_html+='<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 p-r-0">';
						pre_html+='<div class="row">';
						pre_html+='<div class="col-md-12 p-r-0 m-o-m-t-10">';
						if(b_data_map.location==null || b_data_map.location==undefined)
						pre_html+='<span class="s-profile-text-gray s-bold">Location : <span class="s-black"></span></span>';
						else
							pre_html+='<span class="s-profile-text-gray s-bold">Location : <span class="s-black">'+b_data_map.location+'</span></span>';
						pre_html+='<div class="tools m-r-a-tools">';
						pre_html+='<a class="btn btn-icon-toggle tool-btn"><i class="fa fa-angle-down"></i></a>';
						pre_html+='</div>'; 
						pre_html+='</div>'; 
						pre_html+='</div>'; 
						pre_html+='</div>'; 
                        pre_html+='<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">';
			        	pre_html+='<div class="row">'; 
			        	pre_html+='<div class="col-md-12 m-t-minus-24 m-o-m-t-10">';
			        	if(b_data_map.requestedAt == null || b_data_map.requestedAt == undefined)
			        		pre_html+='<span class="s-profile-text-gray s-bold">Requested At : <span class="s-black"></span></span>';
			        	else{
						// var date2 = new Date(Number(b_data_map.requestedAt));
						pre_html+='<span class="s-profile-text-gray s-bold">Requested At : <span class="s-black">'+b_data_map.requestedAt+'</span></span>';
					    }
						pre_html+='</div>'; 
						pre_html+='</div>';
						pre_html+='</div>';
                        pre_html+='<div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">';
			        	pre_html+='<div class="row">'; 
			        	pre_html+='<div class="col-md-12 m-t-minus-24 m-o-m-t-10">';
						
						pre_html+='<span class="s-profile-text-gray s-bold">Active Students :'; 
						if(b_data_map.activeStudents == null || b_data_map.activeStudents == undefined)
							pre_html+='<span class="s-black"></span>';
						else{
						var students = b_data_map.activeStudents;
						for(var j=0;j<students.length;j++){
						var student = students[j];
						pre_html+='<span class="s-black">'+student.displayName+',</span>';
						}
						}
						pre_html+='</span>';
						pre_html+='</div>'; 
						pre_html+='</div>';
						pre_html+='</div>';							
						pre_html+='</div>';
						// end header detail
						pre_html+='</div>';
			            
						pre_html+='<div id="accordion6-'+i+'" class="collapse">';
						
						pre_html+='<div class="card-body m-r-a-body">';
						pre_html+='<ul class="timeline collapse-md">';
			        	
						
						var b_history_list = b_data_map.history;
						// alert(JSON.stringify(b_history_list));
			        	for(var k=0;k<b_history_list.length;k++){
			        		var b_history_map = b_history_list[k];
                          pre_html+='<li class="timeline-inverted">';
			              pre_html+='<div class="timeline-circ"></div>';
			              // var date1 = new
							// Date(Number(b_history_map.createdAt));
			              pre_html+='<div class="timeline-date">'+b_history_map.requestAt+'</div>';
			              pre_html+='<div class="timeline-entry">';
			              pre_html+='<div class="card timeline-card">';
			              pre_html+='<div class="card-body timeline-padding">';
						  pre_html+='<div class="row">';
						  pre_html+=' <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">';
						  pre_html+='<img class="img-responsive pull-left with-t-img" src="resources/img/batch-list/user-book.png" alt="" />';
						  pre_html+='</div>';
						  pre_html+='<div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">';
						  pre_html+='<div class="row">';
			              pre_html+='<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">';
						  pre_html+=' <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
			              pre_html+='<span class="s-profile-text-gray">Student Name: <span class="s-black">'+b_history_map.displayName+'</span></span>';
						  pre_html+=' </div>';
						  if(!(b_history_map.status=='ACTIVE')){
						  pre_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
			              pre_html+='<span class="s-profile-text-gray">Comment: <span class="s-black">'+b_history_map.comment+'</span></span>';
						  pre_html+='</div>';
						  pre_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
			              pre_html+='<span class="s-profile-text-gray">Timing Opted: <span class="s-black">'+b_history_map.startTime+'-'+b_history_map.endTime+'</span></span>';
						  pre_html+='</div>';
						  }
						  
			              pre_html+='</div>';
						  // button for different action
			              
			               pre_html+='<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">';
			               if(b_history_map.requestStatus=='REQUESTED')
						   {
			            	  if(b_history_map.status=='ACTIVE'){
			            	  pre_html+='<div class="action-area">';
			            	  if(b_history_map.batchType=='EXIST')
			                     pre_html+='<button type="button" class="btn btn-green" style="float: right;" onclick="actionForTuitionRequests(\''+b_history_map.requestId+'\',\''+b_history_map.tuitionRequestId+'\',\''+b_history_map.tutorId+'\',\'ACCEPT\',\'TUTOR\')">Accept Request</button>';
			                  pre_html+='<button type="button" class="btn btn-yellow" style="float: right;" onclick="selectBatch(\''+b_history_map.requestId+'\',\''+b_history_map.tuitionRequestId+'\',\''+b_history_map.studentId+'\',\''+b_history_map.startTime+'\',\''+b_history_map.endTime+'\',\''+b_data_map.location+'\',\''+b_data_map.subject+'\',\''+b_history_map.tutorId+'\')">Suggest Other Batch</button>';
							  pre_html+='<button type="button" class="btn btn-red" style="float: right;" onclick="actionForTuitionRequests(\''+b_history_map.requestId+'\',\''+b_history_map.tuitionRequestId+'\',\''+b_history_map.tutorId+'\',\'REJECT\',\'TUTOR\')">Reject Request</button>';
							  pre_html+='</div>';
			            	  }
			                }
			               if(b_history_map.requestStatus=='COMPLETED'){
			            	   if(b_history_map.status=='ACTIVE'){
			            		   if(b_history_map.batchType='EXIST')
			            		   pre_html+='<div class="action-area"><button type="button" class="btn btn-primary" style="float: right;"><a href="../../manage-lectures?tuitionRequest='+b_history_map.tuitionRequestId+'&batchId='+b_history_map.batchId+'">View Booking Detail</a></button>';
			            		   else
			            			   pre_html+='<div class="action-area"><button type="button" class="btn btn-primary" style="float: right;"><a href="../../manage-lectures?tuitionRequest='+b_history_map.tuitionRequestId+'&batchId='+b_history_map.suggestBatchId+'">View Booking Detail</a></button>';
			            	   }
			            	 }
			               if(b_history_map.requestStatus=='ACCEPTED'){}
			            	   
			               if(b_history_map.requestStatus=='REJECTED'){
			            	   
			               }
                           if(b_history_map.requestStatus=='CANCELLED'){
			            	   
			               }
			               
                           if(b_history_map.requestStatus=='SUGGESTED'){
                        	   if(b_history_map.status=='ACTIVE'){
                        	   pre_html+='<button type="button" class="btn btn-red" style="float: right;" onclick="actionForTuitionRequests(\''+b_history_map.requestId+'\',\''+b_history_map.tuitionRequestId+'\',\''+b_history_map.tutorId+'\',\'REJECT\',\'TUTOR\')">Reject Request</button>';
                        	   }
                        	}
			               pre_html+='</div>';
						  
						  pre_html+='</div>';
			              pre_html+='</div>';
			              pre_html+='</div>';
						  pre_html+='</div>';
			              pre_html+='</div>';
						  pre_html+='</div>'; 
			              pre_html+='</li>'; 
			        	}
						
						
						pre_html+='</ul>';
						pre_html+='</div>';
						pre_html+='</div>';
						pre_html+='</div>';
						pre_html+='</div>';
						$(".request_list_div").append(pre_html);
						pre_html='';
					}
					}
			     
			    }
				if (response.status == 'ERROR') {
					console.log(response.message);
				}
			});
}
	
	
	// this is the action area for student and tutor
	function actionForTuitionRequests(p_requestId,p_tuitionRequestId,p_tutorId,p_action,p_user_type){debugger;
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
		var l_map = {};
		l_map.requestId = p_requestId;
		l_map.tuitionRequestId = p_tuitionRequestId;
		l_map.tutorId = p_tutorId;
		l_map.action = p_action;
		l_map.userType = p_user_type;

		$('.loading').show();
		ajaxWithJSON("/common-tuition-request-action", l_map, 'POST', function(response) {
			$('.loading').hide();
			var l_data = response.object;
			// alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				toastr.success(response.message);
				setTimeout(function(){ location.reload(); }, 3000);
				
			}
			if (response.status == 'ERROR') {
				toastr.error(response.message);
			}
		});
	}
	
	function selectBatch(p_requestId,p_tuitionRequestId,p_studentId,p_startTime,p_endTime,p_location,p_subject,p_tutorId){debugger;
		
		  // alert(JSON.stringify(p_suggest_data));
		    $('#i_suggestBatch').modal('show');
		    $('.c_subject_request').text(p_subject);
		    $('.c_location_request').text(p_location);
		    $('.c_time_opted').text(p_startTime+'-'+p_endTime);
			$('.c_requestId').val(p_requestId);
			$('.c_tuitionRequestId').val(p_tuitionRequestId);
			$('.c_studentId').val(p_studentId);
			$('.c_tutorId').val(p_tutorId);
			
			loadTutorBatches(p_tutorId);
			 
		 
		
	}
	function suggestBatch(){debugger;
		
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
		if($('.c_tutor_batches').val()=='' || $('.c_tutor_batches').val()==undefined || $('.c_tutor_batches').val()==null){
			$('.c_error_request_suggest').text("Please select Batch for suggestion.");
			setTimeout(function(){ $('.c_error_request_suggest').text(""); }, 3000);
			return;
		}
		var l_map = {};
		l_map.requestId = $('.c_requestId').val();
		l_map.tuitionRequestId = $('.c_tuitionRequestId').val();
		l_map.studentId = $('.c_studentId').val();
		l_map.tutorId = $('.c_tutorId').val();
		l_map.action = 'SUGGEST';
		l_map.userType = 'TUTOR';
		l_map.suggestBatchId = $('.c_tutor_batches').val();
		
		ajaxWithJSON("/common-tuition-request-action", l_map, 'POST', function(response) {
			var l_data = response.object;
			// alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				$('#i_suggestBatch').modal('hide');
				toastr.success(response.message);
				setTimeout(function(){ location.reload(); }, 3000);
			}
			if (response.status == 'ERROR') {
				toastr.error(response.message);
			}
		});
	}
	function loadBatch(p_batchId,p_tutorId){
		if (!(navigator.onLine)) {
			toastr.error('You are offline. please check internet connection.');
			return;
		}
		var l_map = {};
		l_map.batchId = p_batchId;
		ajaxWithJSON("/common-batch-detail", l_map, 'POST', function(response) {
			var l_data = response.object;
			// alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				$('#i_batch_detail').modal('show');
				$('.c_batch_name').text(l_data.batchName);
				$('.c_subject').text(l_data.subjectId);
				
				$('.c_batchMode').text(l_data.batchMode);
				$('.c_totalNumberOfClasses').text(l_data.totalNumberOfClasses);
				$('.c_totalHours').text(l_data.totalHours);
				$('.c_medium').text(l_data.medium);
				$('.c_feeAmount').text(l_data.feeAmount);
				$('.c_totalSeats').text(l_data.totalSeats);
				// toastr.success(response.message);
			}
			if (response.status == 'ERROR') {
				toastr.error(response.message);
			}
		});
	}
	var g_batches = [];
	function loadTutorBatches(p_user) {debugger;
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
		var l_map = {};
		l_map.login = false;
		l_map.user = p_user;
		l_map.top = false;
		ajaxWithJSON("/tutor-batches", l_map, 'POST', function(response) {
			var l_data = response.object;
			// alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				g_batches = l_data;
	            for(var i=0;i<l_data.length;i++){
	            	var b_map = l_data[i];
	            	var html = '';
	            	html+='<option value="'+b_map.batchId+'">';
	            	html+='<span style="color:gray !important;">Batch Name:- '+b_map.batchName+'&nbsp;&nbsp;&nbsp;&nbsp;</span>';
	            	if(b_map.feeAmount==null || b_map.feeAmount==undefined || b_map.feeAmount=='')
	            	html+='<span class="s-profile-text-gray">Fee:- 0.0</span> &nbsp;&nbsp;';
	            	else
	            		html+='<span class="s-profile-text-gray">Fee:- '+b_map.feeAmount+'</span> &nbsp;&nbsp;';
	            	/*
					 * html+='<option><span
					 * class="s-profile-text-gray">Timing:-'+b_map.batchStartTime+' -
					 * '+b_map.batchEndTime+'</span>&nbsp;&nbsp;&nbsp;&nbsp;';
					 * if(b_map.enrollment==null || b_map.enrollment==undefined ||
					 * b_map.enrollment=='') html+='<span
					 * class="s-profile-text-gray">No of Students: 0</span></option>';
					 * else html+='<span class="s-profile-text-gray">No of
					 * Students: '+b_map.enrollment+'</span></option>';
					 */
	            	$('.c_tutor_batches').append(html);
	            
	            }
			}
			if (response.status == 'ERROR') {
				// document.write(response.message);
			}
		});
	}
	

	



/*
 * var l_lat, l_lng; function codeAddress() {debugger; if (!(navigator.onLine)) {
 * toastr.error('You are offline. please check internet connection.'); return; }
 * geocoder = new google.maps.Geocoder(); var address =
 * document.getElementById("location").value; geocoder.geocode( { 'address':
 * address}, function(results, status) { if (status ==
 * google.maps.GeocoderStatus.OK) { l_lat = results[0].geometry.location.lat();
 * l_lng = results[0].geometry.location.lng(); $("#latitude").val(l_lat);
 * $("#longitude").val(l_lng); addTutorBatch(); }
 * 
 * else { alert("Geocode was not successful for the following reason: " +
 * status); } }); }
 */
	function subjectData() {
	// var l_map = {};
	// l_map.all = true;

		ajaxWithJSON("/load-subjects",null, 'GET', function(response) {
			var l_data = response.object;
			for (var i = 0; i < l_data.length; i++) {
				var r_map = l_data[i];
				/*
				 * $('#subjects').append("<option
				 * value='"+r_map.subjectName+"'>");
				 */
				$('#subjectList').append("<option value='"+r_map.subjectName+"'>");
			}
		});
	}
	 var input2 = document.getElementById('location');
	  new google.maps.places.Autocomplete(input2);
	google.maps.event.addDomListener(window, 'load', initialize);
 function isDaysSelected(batch){
		
		if(batch.SUNDAY)
			return true;
		if(batch.MONDAY)
			return true;
		if(batch.TUESDAY)
			return true;
		if(batch.WEDNESDAY)
			return true;
		if(batch.THURSDAY)
			return true;
		if(batch.FRIDAY)
			return true;
		if(batch.SATURDAY)
			return true;
	}
	/*function addTutorBatch(){debugger;

	google.maps.event.addDomListener(window, 'load', initialize)*/
	function addTutorBatch(){debugger;
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	
	if($('.c_batchName').val()==''){
		$('.c_error_create_batch').text("Please enter batch name.");
		setTimeout(function(){ $('.c_error_create_batch').text(""); }, 3000);
		return;
	}
	if($('.c_subjectId').val()==''){
		$('.c_error_create_batch').text("Please select subject name.");
		setTimeout(function(){ $('.c_error_create_batch').text(""); }, 3000);
		return;
	}
	if($('.c_totalNumberOfClasses_1').val()==''){
		$('.c_error_create_batch').text("Please enter total classes.");
		setTimeout(function(){ $('.c_error_create_batch').text(""); }, 3000);
		return;
	}
	if($('.c_totalHourses').val()==''){
		$('.c_error_create_batch').text("Please enter total hours.");
		setTimeout(function(){ $('.c_error_create_batch').text(""); }, 3000);
		return;
	}
	if($('.c_totalSeatse').val()==''){
		$('.c_error_create_batch').text("Please enter max registrations.");
		setTimeout(function(){ $('.c_error_create_batch').text(""); }, 3000);
		return;
	}
	if($('.c_minRegistration').val()==''){
		$('.c_error_create_batch').text("Please enter min registrations.");
		setTimeout(function(){ $('.c_error_create_batch').text(""); }, 3000);
		return;
	}
	if($('.c_batchStartDate').val()==''){
		$('.c_error_create_batch').text("Please enter batch start date.");
		setTimeout(function(){ $('.c_error_create_batch').text(""); }, 3000);
		return;
	}
	
	if($('.c_registrationEndDate').val()==''){
		$('.c_error_create_batch').text("Please enter registration end date.");
		setTimeout(function(){ $('.c_error_create_batch').text(""); }, 3000);
		return;
	}
	if($('.c_batchStartTime').val()==''){
		$('.c_error_create_batch').text("Please enter batch start time.");
		setTimeout(function(){ $('.c_error_create_batch').text(""); }, 3000);
		return;
	}
	if($('.c_batchEndTime').val()==''){
		$('.c_error_create_batch').text("Please enter batch end time.");
		setTimeout(function(){ $('.c_error_create_batch').text(""); }, 3000);
		return;
	}
	if($('.c_feeAmounts').val()==''){
		$('.c_error_create_batch').text("Please enter fee for the batch.");
		setTimeout(function(){ $('.c_error_create_batch').text(""); }, 3000);
		return;
	}
/*
 * if($('.c_location').val()==''){ $('.c_error_create_batch').text("Please
 * select location."); setTimeout(function(){
 * $('.c_error_create_batch').text(""); }, 3000); return; }
 */
	
	
		 var l_batch_map = {};
		    l_batch_map = readForm('i_batch_data');
		    
			if(!(isDaysSelected(l_batch_map))){
				$('.c_error_create_batch').text("Please select class/batch days.");
				setTimeout(function(){ $('.c_error_create_batch').text(""); }, 3000);
				return
			}
		  var c_batches_html=""; 
		 $(".loading").show();
		 ajaxWithJSON("/tutor/save-batch-info", l_batch_map, 'POST', function(response) {debugger;
		  $(".loading").hide();
		  l_batch_map = response.other;

		  if (response.status == 'SUCCESS') {
		   toastr.success(response.message);
		   // $('.c_tutor_batches').append('<option
			// value="'+l_batch_map.batchId+'"><span style="color:gray
			// !important;">Batch Name:-
			// '+l_batch_map.batchName+'&nbsp;</span>,<span
			// class="s-profile-text-gray">Fee:-
			// '+l_batch_map.feeAmount+'</span> &nbsp;,<option><span
			// class="s-profile-text-gray">Timing:-'+l_batch_map.batchStartTime+'
			// - '+l_batch_map.batchEndTime+'</span>&nbsp;,<span
			// class="s-profile-text-gray">No of Students: 0</span></option>');
		   
		  /*
			 * c_batches_html+='<li><a href="#">'; c_batches_html+='<div
			 * class="row">'; c_batches_html+='<div class="col-lg-6 col-md-6
			 * col-sm-6 col-xs-6">'; c_batches_html+='<input type="hidden"
			 * value="'+l_batch_map.batchId+'" id="selected_batch">';
			 * c_batches_html+='<span class="s-profile-text-gray">Batch Name:
			 * <span class="s-profile-text-gray s-black"
			 * >'+l_batch_map.batchName+'</span></span>'; c_batches_html+='</div><div
			 * class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'; c_batches_html+='<span
			 * class="s-profile-text-gray">Fee: <span class="s-profile-text-gray
			 * s-black">'+l_batch_map.feeAmount+'</span></span></div>';
			 * c_batches_html+='<div class="col-lg-6 col-md-6 col-sm-6
			 * col-xs-6">'; c_batches_html+='<span
			 * class="s-profile-text-gray">timing: <span
			 * class="s-profile-text-gray s-black"
			 * >'+l_batch_map.batchStartTime+' - '+l_batch_map.batchEndTime+'</span></span></div>';
			 * c_batches_html+='<div class="col-lg-6 col-md-6 col-sm-6
			 * col-xs-6">'; c_batches_html+='<span
			 * class="s-profile-text-gray">No of Student: <span
			 * class="s-profile-text-gray s-black" >'+l_batch_map.noOfStudent+'</span></span></div>';
			 * c_batches_html+='</div> '; c_batches_html+='</a></li>';
			 */
		   
		   
		   c_batches_html+='<option value="'+l_batch_map.batchId+'">';
		   c_batches_html+='<span style="color:gray !important;">Batch Name:- '+l_batch_map.batchName+'&nbsp;&nbsp;&nbsp;&nbsp;</span>';
       	  if(l_batch_map.feeAmount==null || l_batch_map.feeAmount==undefined || l_batch_map.feeAmount=='')
       		c_batches_html+='<span class="s-profile-text-gray">Fee:- 0.0</span> &nbsp;&nbsp;';
       	  else
       		c_batches_html+='<span class="s-profile-text-gray">Fee:- '+l_batch_map.feeAmount+'</span> &nbsp;&nbsp;';
       	 
       	    $('.c_tutor_batches-request').append(html);
		  
		   // $(".c_tutor_batches").prepend('<option selected="selected"
			// value="'+l_batch_map.batchId+'"><span style="color:gray
			// !important;">Batch Name:- '+l_batch_map.batchName+' </span>,<span
			// class="s-profile-text-gray">Fee:-
			// '+l_batch_map.feeAmount+'</span>,<option><span
			// class="s-profile-text-gray">Timing:-'+l_batch_map.batchStartTime+'
			// - '+l_batch_map.batchEndTime+'</span>,<span
			// class="s-profile-text-gray">No of Students: 0</span></option>');
		   $("#i_batch_data").hide();
		  }
		  if (response.status == 'ERROR') {
		   $('.c_error_request_suggest').text(response.message);
			setTimeout(function(){ $('.c_error_request_suggest').text(""); }, 3000);

		  }

		 });
		}

	
  
	
	  function batchDays(p_flag){
		   if(p_flag=='weekend'){
		    if($('#i_weekend').is(':checked')){
		     $('input:checkbox[name=SUNDAY]').attr('checked',true);
		     $('input:checkbox[name=SATURDAY]').attr('checked',true);
		    }else{
		     $('input:checkbox[name=SUNDAY]').attr('checked',false);
		     $('input:checkbox[name=SATURDAY]').attr('checked',false);
		    }
		    // $('input:checkbox[name=checkme]').is(':checked');
		    
		   }
		            if(p_flag=='weekdays'){
		    
		             if($('#i_weekdays').is(':checked')){
		     $('input:checkbox[name=MONDAY]').attr('checked',true);
		     $('input:checkbox[name=TUESDAY]').attr('checked',true);
		     $('input:checkbox[name=WEDNESDAY]').attr('checked',true);
		     $('input:checkbox[name=THURSDAY]').attr('checked',true);
		     $('input:checkbox[name=FRIDAY]').attr('checked',true);
		    }else{
		     $('input:checkbox[name=MONDAY]').attr('checked',false);
		     $('input:checkbox[name=TUESDAY]').attr('checked',false);
		     $('input:checkbox[name=WEDNESDAY]').attr('checked',false);
		     $('input:checkbox[name=THURSDAY]').attr('checked',false);
		     $('input:checkbox[name=FRIDAY]').attr('checked',false);
		    }
		   }
		            if(p_flag=='MWF'){
		    if($('#i_mwf').is(':checked')){
		     $('input:checkbox[name=MONDAY]').attr('checked',true);
		     $('input:checkbox[name=WEDNESDAY]').attr('checked',true);
		     $('input:checkbox[name=FRIDAY]').attr('checked',true);
		    }else{
		     $('input:checkbox[name=MONDAY]').attr('checked',false);
		     $('input:checkbox[name=WEDNESDAY]').attr('checked',false);
		     $('input:checkbox[name=FRIDAY]').attr('checked',false);
		    }
		    // $('input:checkbox[name=checkme]').is(':checked');
		    
		   }
		            if(p_flag=='TTS'){
		    if($('#i_tts').is(':checked')){
		     $('input:checkbox[name=TUESDAY]').attr('checked',true);
		     $('input:checkbox[name=THURSDAY]').attr('checked',true);
		     $('input:checkbox[name=SATURDAY]').attr('checked',true);
		    }else{
		     $('input:checkbox[name=TUESDAY]').attr('checked',false);
		     $('input:checkbox[name=THURSDAY]').attr('checked',false);
		     $('input:checkbox[name=SATURDAY]').attr('checked',false);
		    }
		    // $('input:checkbox[name=checkme]').is(':checked');
		    
		   }
	  }
	  
	  
	  /*var lecture_batchId = '';
	  var lecture_size = 0;
	  
	  function loadTutorLectures(){debugger;
		 var l_local_map = {};
		 l_local_map = params;
		 $(".loading").show();
		 ajaxWithJSON("/tutor/load-lectures", l_local_map, 'POST', function(response) {debugger;
		  $(".loading").hide();
          // alert(JSON.stringify(response));
		  if (response.status == 'SUCCESS') {
			  var l_data = response.object;
			  var l_basic = response.other;
			  $('.c_basic').html("Batch :"+l_basic.batchName+' || Subject:'+l_basic.subjectName);
			  var l_html = '';
			  lecture_size = l_data.length;
			  for(var i=0;i<l_data.length;i++){
				  var l_map = l_data[i];
			  
			  lecture_batchId = l_map.batchId;
			  l_html+='<tr class="trHover">';
			  l_html+='<td class="s-profile-text-gray">'+l_map.lectureName+'</td>'; 
			  l_html+='<td class="s-profile-text-gray">'+l_map.startTime+' - '+l_map.endTime+'</td>';
			  l_html+='<td class="s-profile-text-gray">'+l_map.topicDescription+'</td>';
			  l_html+='<td class="s-profile-text-gray">'+l_map.lectureAtString+'</td>';
			  l_html+='<td class="s-profile-text-gray">'+l_map.status+'</td>';
			  l_html+='<td class="s-profile-text-gray">';
			  l_html+='<div class="action">';
			  if(l_map.status=='COMPELETED'){	   
			  l_html+='<button title="Attendance Completed" disabled type="button" class="btn btn-primary" data-toggle="modal" data-target="#" onclick="markAttendance(\''+l_map.lectureId+'\',\''+i+'\',\''+l_data.length+'\')">Mark Attendance</button>';
			  l_html+='<button title="Cancelled not allow" disabled type="button" class="btn btn-danger" data-toggle="modal" data-target="#"  onclick="cancelLecture(\''+l_map.lectureId+'\',\''+l_map.lectureName+'\',\''+l_map.startTime+'\',\''+l_map.endTime+'\',\''+l_map.topicDescription+'\',\''+l_map.lectureAtString+'\',\''+i+'\',\''+l_data.length+'\')">Cancel</button>';
			  l_html+='<button title="Change timing not allow" disabled type="button" class="btn btn-yellow" data-toggle="modal" data-target="#batch"  onclick="changeLectureTime(\''+l_map.lectureId+'\',\''+l_map.lectureName+'\',\''+l_map.startTime+'\',\''+l_map.endTime+'\',\''+l_map.topicDescription+'\',\''+l_map.lectureAtString+'\',\''+i+'\',\''+l_data.length+'\')">Change Timing</button>';
			  }else if(l_map.status=='CANCELLED'){
				  l_html+='<button title="Cancelled lecture" disabled type="button" class="btn btn-primary" data-toggle="modal" data-target="#" onclick="markAttendance(\''+l_map.lectureId+'\',\''+i+'\',\''+l_data.length+'\')">Mark Attendance</button>';
				  l_html+='<button title="Cancelled not allow" disabled type="button" class="btn btn-danger" data-toggle="modal" data-target="#"  onclick="cancelLecture(\''+l_map.lectureId+'\',\''+l_map.lectureName+'\',\''+l_map.startTime+'\',\''+l_map.endTime+'\',\''+l_map.topicDescription+'\',\''+l_map.lectureAtString+'\',\''+i+'\',\''+l_data.length+'\')">Cancel</button>';
				  l_html+='<button title="Change timing not allow" disabled type="button" class="btn btn-yellow" data-toggle="modal" data-target="#batch"  onclick="changeLectureTime(\''+l_map.lectureId+'\',\''+l_map.lectureName+'\',\''+l_map.startTime+'\',\''+l_map.endTime+'\',\''+l_map.topicDescription+'\',\''+l_map.lectureAtString+'\',\''+i+'\',\''+l_data.length+'\')">Change Timing</button>';
				  
			  }else{
				  l_html+='<button id="markAttendance'+i+'" title="Mark Attendance" type="button" class="btn btn-primary" data-toggle="modal" data-target="#" onclick="markAttendance(\''+l_map.lectureId+'\',\''+i+'\',\''+l_data.length+'\')">Mark Attendance</button>';
				  l_html+='<button id="markCancel'+i+'" type="button" class="btn btn-danger" data-toggle="modal" data-target="#"  onclick="cancelLecture(\''+l_map.lectureId+'\',\''+l_map.lectureName+'\',\''+l_map.startTime+'\',\''+l_map.endTime+'\',\''+l_map.topicDescription+'\',\''+l_map.lectureAtString+'\',\''+i+'\',\''+l_data.length+'\')">Cancel</button>';
				  l_html+='<button id="markChange'+i+'" type="button" class="btn btn-yellow" data-toggle="modal" data-target="#batch"  onclick="changeLectureTime(\''+l_map.lectureId+'\',\''+l_map.lectureName+'\',\''+l_map.startTime+'\',\''+l_map.endTime+'\',\''+l_map.topicDescription+'\',\''+l_map.lectureAtString+'\',\''+i+'\',\''+l_data.length+'\')">Change Timing</button>';
				  
			  }
			  l_html+=' </div>';
			  l_html+='</td>';
				 
			  l_html+='</tr>';
              $('.c_lectures_data').append(l_html);
              l_html = '';
			  }
		   
		  }
		  if (response.status == 'ERROR') {
			  toastr.error(response.message);
		  // $('.c_error_request_suggest').text(response.message);
			// setTimeout(function(){ $('.c_error_request_suggest').text(""); },
			// 3000);

		  }
		  

		 });
		}
	 
	  function addTutorLectures(){debugger;
	  
	  if (!(navigator.onLine)) {
			toastr.error('You are offline. please check internet connection.');
			return;
		}
		 var l_map = {};
		
		 if($('.c_lectureName').val()==''){
			 $('.c_lecture_add_error').text("Enter Lecture Name.");
			  setTimeout(function(){ $('.c_lecture_add_error').text(""); }, 3000);
			  return;
		 }
		 if($('.c_topic').val()==''){
			 $('.c_lecture_add_error').text("Enter Topic description.");
			  setTimeout(function(){ $('.c_lecture_add_error').text(""); }, 3000);
			  return;
		 }
		 if($('.c_lectureDate').val()==''){
			 $('.c_lecture_add_error').text("Enter Lecture Date.");
			  setTimeout(function(){ $('.c_lecture_add_error').text(""); }, 3000);
			  return;
		 }
		 if($('.c_startTime').val()==''){
			 $('.c_lecture_add_error').text("Enter Lecture Start time.");
			  setTimeout(function(){ $('.c_lecture_add_error').text(""); }, 3000);
			  return;
		 }
		 if($('.c_endTime').val()==''){
			 $('.c_lecture_add_error').text("Enter Lecture end time.");
			  setTimeout(function(){ $('.c_lecture_add_error').text(""); }, 3000);
			  return;
		 }
		 
        
		 l_map = readForm('i_lecture_data');
		 l_map.batchId = params.batchId;
		// l_map.batchId = lecture_batchId;
		 // alert(JSON.stringify(l_map));
		 $(".loading").show();
		 ajaxWithJSON("/tutor/add-lecture", l_map, 'POST', function(response) {debugger;
		  $(".loading").hide();
         // alert(JSON.stringify(response));
		  if (response.status == 'SUCCESS') {
			toastr.success(response.message);
		    $('#addLecture').modal('hide');
		    $('#i_lecture_data').trigger("reset");
		    
	          var l_map = response.object;
			  var l_html = '';
			  l_html+='<tr class="trHover">';
			  l_html+='<td class="s-profile-text-gray">'+l_map.lectureName+'</td>'; 
			  l_html+='<td class="s-profile-text-gray">'+l_map.startTime+' - '+l_map.endTime+'</td>';
			  l_html+='<td class="s-profile-text-gray">'+l_map.topicDescription+'</td>';
			  l_html+='<td class="s-profile-text-gray">'+l_map.lectureAtString+'</td>';
			  l_html+='<td class="s-profile-text-gray">'+l_map.status+'</td>';
			  l_html+='<td class="s-profile-text-gray">';
			  l_html+='<div class="action">';
			
			
			 
				 * l_html+='<button type="button" class="btn btn-primary"
				 * data-toggle="modal" data-target="#"
				 * onclick="markAttendance(\''+l_map.lectureId+'\',\''+$('.c_countAttendance').val()+'\',\''+$('.c_countAttendanceSize').val()+'\')">Mark
				 * Attendance</button>'; l_html+='<button type="button"
				 * class="btn btn-danger" data-toggle="modal" data-target="#"
				 * onclick="cancelLecture(\''+l_map.lectureId+'\',\''+l_map.lectureName+'\',\''+l_map.startTime+'\',\''+l_map.endTime+'\',\''+l_map.topicDescription+'\',\''+l_map.lectureAtString+'\',\''+$('.c_countAttendance').val()+'\',\''+$('.c_countAttendanceSize').val()+'\')">Cancel</button>';
				 * l_html+='<button type="button" class="btn btn-yellow"
				 * data-toggle="modal" data-target="#batch"
				 * onclick="changeLectureTime(\''+l_map.lectureId+'\',\''+l_map.lectureName+'\',\''+l_map.startTime+'\',\''+l_map.endTime+'\',\''+l_map.topicDescription+'\',\''+l_map.lectureAtString+'\',\''+$('.c_countAttendance').val()+'\',\''+$('.c_countAttendanceSize').val()+'\')">Change
				 * Timing</button>';
				 
			  l_html+='<button id="markAttendance'+lecture_size+'" title="Mark Attendance" type="button" class="btn btn-primary" data-toggle="modal" data-target="#" onclick="markAttendance(\''+l_map.lectureId+'\',\''+lecture_size+'\',\''+(lecture_size+1)+'\')">Mark Attendance</button>';
			  l_html+='<button id="markCancel'+lecture_size+'" type="button" class="btn btn-danger" data-toggle="modal" data-target="#"  onclick="cancelLecture(\''+l_map.lectureId+'\',\''+l_map.lectureName+'\',\''+l_map.startTime+'\',\''+l_map.endTime+'\',\''+l_map.topicDescription+'\',\''+l_map.lectureAtString+'\',\''+lecture_size+'\',\''+(lecture_size+1)+'\')">Cancel</button>';
			  l_html+='<button id="markChange'+lecture_size+'" type="button" class="btn btn-yellow" data-toggle="modal" data-target="#batch"  onclick="changeLectureTime(\''+l_map.lectureId+'\',\''+l_map.lectureName+'\',\''+l_map.startTime+'\',\''+l_map.endTime+'\',\''+l_map.topicDescription+'\',\''+l_map.lectureAtString+'\',\''+lecture_size+'\',\''+(lecture_size+1)+'\')">Change Timing</button>';
			  
			  l_html+=' </div>';
			  l_html+='</td>';
				 
			  l_html+='</tr>';
              $('.c_lectures_data').append(l_html);
              lecture_size = lecture_size+1;
		  }
		  if (response.status == 'SESSION') {
			  location.replace('/');
			   
		  }
		  if (response.status == 'ERROR') {
			  $('.c_lecture_add_error').text(response.message);
			  setTimeout(function(){ $('.c_lecture_add_error').text(""); }, 3000);
		  // $('.c_lecture_add_error').text(response.message);
			// setTimeout(function(){ $('.c_lecture_add_error').text(""); },
			// 3000);

		  }

		 });
		}
*/      var g_students = [];
	  function loadBatchStudents(){
		  
		  var l_map = {};
		  l_map = params;
			 // $(".loading").show();
			 ajaxWithJSON("/tutor/load-batch-students", l_map, 'POST', function(response) {debugger;
			  // $(".loading").hide();
	          // alert(JSON.stringify(response));
			  if (response.status == 'SUCCESS') {
				  g_students = response.object;
			   
			  }
			  if (response.status == 'ERROR') {
			  // $('.c_error_request_suggest').text(response.message);
				// setTimeout(function(){
				// $('.c_error_request_suggest').text(""); }, 3000);

			  }

			 });
	  }
function markAttendance(p_lectureId,count,size){
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	$('#i_attendance').modal('show');
	$('#i_form_attendance').trigger("reset");
	$('.c_lectureAttendance').val(p_lectureId);
	$('.c_countAttendance').val(count);
	$('.c_countAttendanceSize').val(size);
	for(var i=0;i<g_students.length;i++){
		var student = g_students[i];
		var l_html = "";
		l_html+='<tr>';
		l_html+='<td class="s-profile-text-gray" width="25%">';
		l_html+='<label class="checkbox-inline checkbox-styled">';
		l_html+='<input type="checkbox" class="ck" name="'+student[0]+'">';
		l_html+='<span></span></label>';
		l_html+='</td> ';
		l_html+='<td class="s-profile-text-gray">';
		l_html+='<span class="s-profile-text-gray s-black s-bold">'+student[1]+'</span>';
		l_html+='</td> '; 
		l_html+='</tr>';
		
	}
	$('#i_attendanceStudents').html(l_html);
}
function saveAttendance(){debugger;

if (!(navigator.onLine)) {
	toastr.error('You are offline. please check internet connection.');
	return;
}
	var l_map = {};
	var l_is_studentd_selected = false;
	 l_map = readForm('i_form_attendance');
	 
	 var keys = Object.keys(l_map);
	 
	 // alert(JSON.stringify(keys));
	 for(var i=0;i<keys.length;i++){
		 var key = keys[i];
		 if(key in l_map) { 
			   if(l_map[key]==true){
				   if(!(key=='undefined'))
				       l_is_studentd_selected = true;
			   }   
			}
	 }
	 if(!l_is_studentd_selected){
		 $('.c_AttendanceError').text('Select students for attendance.');
		 return;
	 }
	 l_map.batchId = lecture_batchId;
	 // alert(JSON.stringify(l_map));
	 $(".loading").show();
	 ajaxWithJSON("/tutor/save-lecture-students-attendance", l_map, 'POST', function(response) {debugger;
	  $(".loading").hide();
    
	  if (response.status == 'SUCCESS') {
		toastr.success(response.message);
		location.reload();
		  
		 /*
			 * $('#markAttendance'+button_id).prop("disabled",true);
			 * $('#markCancel'+button_id).prop("disabled",true);
			 * $('#markChange'+button_id).prop("disabled",true);
			 */
	  }
	  if (response.status == 'ERROR') {
	     $('.c_AttendanceError').text(response.message);
		setTimeout(function(){ $('.c_AttendanceError').text(""); }, 3000);

	  }

	 });
}
function cancelLecture(p_lectureId,lectureName,start,end,topic,lectureAt,count,size){
	
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	$('#i_cancelLecture').modal('show');
	$('#i_cancel_lecture_form').trigger("reset");
	$('.c_lectureCancel').val(p_lectureId);
	$('.c_lecture_name_cancel').text(lectureName);
	$('.c_lecture_cancel_time').text(start+'-'+end);
	$('.c_lecture_cancel_topic').text(topic);
	$('.c_lecture_cancel_at').text(lectureAt);
	
	$('.c_countCancel').val(count);
	$('.c_countCancelSize').val(size);
	for(var i=0;i<g_students.length;i++){
		var student = g_students[i];
		var l_html = "";
		l_html+='<tr>';
		l_html+='<td class="s-profile-text-gray" width="25%">';
		l_html+='<label class="checkbox-inline checkbox-styled">';
		l_html+='<input type="checkbox" class="ck" name="'+student[0]+'">';
		l_html+='<span></span></label>';
		l_html+='</td> ';
		l_html+='<td class="s-profile-text-gray">';
		l_html+='<span class="s-profile-text-gray s-black s-bold">'+student[1]+'</span>';
		l_html+='</td> '; 
		l_html+='</tr>';
		
	}
	$('#i_lectureCancellation').html(l_html);
}

function changeLectureTime(p_lectureId,lectureName,start,end,topic,lectureAt,count,size){
	if (!(navigator.onLine)) {
		toastr.error('You are offline. please check internet connection.');
		return;
	}
	$('#i_change_lecture_timing').modal('show');
	$('#i_lecture_timing').trigger("reset");
	$('.c_lectureChangeTiming').val(p_lectureId);
	$('.c_lecture_name_timing').text(lectureName);
	$('.c_lecture_time_timing').text(start+'-'+end);
	$('.c_lecture_topic_timing').text(topic);
	$('.c_lecture_at_timing').text(lectureAt);
	$('.c_countChange').val(count);
	$('.c_countChangeSize').val(size);
	for(var i=0;i<g_students.length;i++){
		var student = g_students[i];
		var l_html = "";
		l_html+='<tr>';
		l_html+='<td class="s-profile-text-gray" width="25%">';
		l_html+='<label class="checkbox-inline checkbox-styled">';
		l_html+='<input type="checkbox" class="ck" name="'+student[0]+'">';
		l_html+='<span></span></label>';
		l_html+='</td> ';
		l_html+='<td class="s-profile-text-gray">';
		l_html+='<span class="s-profile-text-gray s-black s-bold">'+student[1]+'</span>';
		l_html+='</td> '; 
		l_html+='</tr>';
		
	}
	$('#i_lectureTimingChange').html(l_html);
}
function updateLecture(p_flage){debugger;

if (!(navigator.onLine)) {
	toastr.error('You are offline. please check internet connection.');
	return;
}
	var l_map = {};
	if(p_flage=='CANCEL'){
		
		 var l_is_studentd_selected = false;
		 l_map = readForm('i_cancel_lecture_form');
		 var keys = Object.keys(l_map);
		 for(var i=0;i<keys.length;i++){
			 var key = keys[i];
			 if(key in l_map) { 
				   if(l_map[key]==true){
					   if(!(key=='undefined'))
					       l_is_studentd_selected = true;
				   }   
				}
		 }
		 if(!l_is_studentd_selected){
			 $('.c_error_cancel_lecture').text("Please select students to notify cancel lecture.");
				setTimeout(function(){ $('.c_error_cancel_lecture').text(""); }, 3000);
			 
			 return;
		 }
		
		
		var isNotify = false;
		var email = false;
		var sms = false;
			
			if($('#i_cancel_lecture_email').prop('checked')){
				isNotify = true;
				email = true;
			}
			if($('#i_cancel_lecture_sms').prop('checked')){
				isNotify = true;
				sms = true;
			}
			if(!isNotify){
			$('.c_error_cancel_lecture').text("Please select Email or SMS to notify students.");
			setTimeout(function(){ $('.c_error_cancel_lecture').text(""); }, 3000);
			return;
		   }
			l_map.email = email;
			l_map.sms = sms;
			l_map.action = 'CANCEL';
			
	}
	if(p_flage=='CHANGE_TIMING'){
		
		
		if($('.c_lectureAt_change').val()==''){
			$('.c_error_change_timing').text("Please enter lecture date.");
			setTimeout(function(){ $('.c_error_change_timing').text(""); }, 3000);
			return;
		}
		if($('.c_startTime_change').val()==''){
			$('.c_error_change_timing').text("Please enter lecture start time.");
			setTimeout(function(){ $('.c_error_change_timing').text(""); }, 3000);
			return;
		}
		if($('.c_endTime_change').val()==''){
			$('.c_error_change_timing').text("Please enter lecture end time.");
			setTimeout(function(){ $('.c_error_change_timing').text(""); }, 3000);
			return;
		}
		
		 var l_is_studentd_selected = false;
		 l_map = readForm('i_lecture_timing');
		 var keys = Object.keys(l_map);
		 for(var i=0;i<keys.length;i++){
			 var key = keys[i];
			 if(key in l_map) { 
				   if(l_map[key]==true){
					   if(!(key=='undefined'))
					       l_is_studentd_selected = true;
				   }   
				}
		 }
		 if(!l_is_studentd_selected){
			 $('.c_error_change_timing').text('Please select students to notify change lecture timing.');
			 setTimeout(function(){ $('.c_error_change_timing').text(""); }, 3000);
			 return;
		 }
		
		
		var isNotify = false;
		var email = false;
		var sms = false;
			
			if($('#i_timing_lecture_email').prop('checked')){
				isNotify = true;
				email = true;
			}
			if($('#i_timing_lecture_sms').prop('checked')){
				isNotify = true;
				sms = true;
			}
			if(!isNotify){
			$('.c_error_change_timing').text("Please select Email or SMS to notify students.");
			setTimeout(function(){ $('.c_error_change_timing').text(""); }, 3000);
			return;
		   }

			l_map.email = email;
			l_map.sms = sms;
			l_map.action = 'CHANGE_TIMING';
	}
	
	 l_map.batchId = lecture_batchId;
	 
	// alert(JSON.stringify(l_map));
	 $(".loading").show();
	 ajaxWithJSON("/tutor/update-lecture-changes", l_map, 'POST', function(response) {debugger;
	  $(".loading").hide();
    
	  if (response.status == 'SUCCESS') {
		toastr.success(response.message);		 
		 location.reload();
	  }
	  if (response.status == 'ERROR') {
		  if(p_flage=='CANCEL'){
			  $('.c_error_cancel_lecture').text(response.message);
				setTimeout(function(){ $('.c_error_cancel_lecture').text(""); }, 3000);
		  }
         if(p_flage=='CHANGE_TIMING'){
        	 $('.c_error_change_timing').text(response.message);
     		setTimeout(function(){ $('.c_error_change_timing').text(""); }, 3000);
		  }
	    

	  }

	 });
	
}

function selectAllStudents(p_flage,p_is_checked){
	var l_html = "";
	if($(p_is_checked).is(':checked')){
	    
		for(var i=0;i<g_students.length;i++){
			var student = g_students[i];
			
			l_html+='<tr>';
			l_html+='<td class="s-profile-text-gray" width="25%" style="line-height: 1.246154;">';
			l_html+='<label class="checkbox-inline checkbox-styled">';
			l_html+='<input type="checkbox" checked class="ck" name="'+student[0]+'">';
			l_html+='<span></span></label>';
			l_html+='</td> ';
			l_html+='<td class="s-profile-text-gray">';
			l_html+='<span class="s-profile-text-gray s-black s-bold">'+student[1]+'</span>';
			l_html+='</td> '; 
			l_html+='</tr>';
			
		}
		
	    }else{
	    
			for(var i=0;i<g_students.length;i++){
				var student = g_students[i];
				
				l_html+='<tr>';
				l_html+='<td class="s-profile-text-gray" width="25%" style="line-height: 1.246154;">';
				l_html+='<label class="checkbox-inline checkbox-styled">';
				l_html+='<input type="checkbox" class="ck" name="'+student[0]+'">';
				l_html+='<span></span></label>';
				l_html+='</td> ';
				l_html+='<td class="s-profile-text-gray">';
				l_html+='<span class="s-profile-text-gray s-black s-bold">'+student[1]+'</span>';
				l_html+='</td> '; 
				l_html+='</tr>';
				
			}
	    	
	    }
	$(p_flage).html(l_html);

}
	function showoption(p_flage) {
		if (p_flage == "NONE") {
			toastr.error('Please select any one option.');

		}
		if (p_flage == "EXIST") {
			$("#option1").show();
			 
			$("#info2").hide();
			$("#option2").hide();
			$("#option3").hide();
			$('.c_footer').html('<button type="button" class="btn btn-modal" onclick="saveStudentRequest(\'EXIST\')">Submit Request</button><button type="button" class="btn btn-modal" data-dismiss="modal">Cancel</button>');
		}
		if (p_flage == "NEW") {
			$("#option1").hide(); 
			$("#info2").show();
			$("#option2").show();
			$("#option3").show();
			$('.c_footer').html('<button type="button" class="btn btn-modal" onclick="saveStudentRequest(\'NEW\')">Submit Request</button><button type="button" class="btn btn-modal" data-dismiss="modal">Cancel</button>');
			loadTutorSubjects();
		}
		$(".c_before_select").click(function(){
			$('.c_request_error').html('Please select any one option EXIST OR NEW.');
			setTimeout(function(){ $('.c_request_error').html(""); }, 3000);
		    
		});
	}