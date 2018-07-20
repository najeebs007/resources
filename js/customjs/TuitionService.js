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
    			html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>No of Active Batches :</strong><span class=\"tutor-val-text\">"+tutorMap.noOfBatches+"</span></span><br/>";
    			html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>Average Price :</strong><span class=\"tutor-val-text\">&#8377; "+tutorMap.price+"</span></span><br/>";
    			html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>Distance :</strong><span class=\"tutor-val-text\">"+Math.round(parseFloat(tutorMap.distance))+" km </span></span><br/>"; 
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
					 html += "<label class=\"checkbox-inline checkbox-styled\"><input id='i_tutor_grid"+i+"' type=\"checkbox\" value=\"option1\" onclick=\"return initiateRequest('"+tutorMap.userName+"','"+tutorMap.displayName+"','"+i+"')\"><span>Select Tutor</span>";
				     html += "</label></div></div></div></div></div>";
    			    // html += "<a href=\"#\" onclick=\"return addTutorToRequest('"+tutorMap.userName+"','"+tutorMap.displayName+"','"+i+"')\" class=\"btn btn-danger\">Select Tutor</a></div></div></div></div></div>";
    			    
    			
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
 				html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>Experience :</strong><span class=\"tutor-val-text\">"+tutorMap.totalExperience+" Years</span></span></div>";
                html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";				
     			html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>Expert In :</strong><span class=\"tutor-val-text\">"+tutorMap.specialities+"</span></span></div>";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";
     			html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>No of Active Batches :</strong><span class=\"tutor-val-text\"> "+tutorMap.noOfBatches+"</span></span></div>";
 				html += "</div>";
 				html += "<div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-6\">";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";
 				html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>Average Price :</strong><span class=\"tutor-val-text\">&#8377; "+tutorMap.price+"</span></span></div>";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\">";
 				html += "<span class='tutor-value' style=\"font-size:15px;\"><strong>Distance :</strong><span class=\"tutor-val-text\">"+Math.round(parseFloat(tutorMap.distance))+" km </span></span></div>";
 				html += "</div>"; 
 				html += "</div>"; 
     			html += "</div>";
     			html += "<div class=\"item-price col-lg-3 col-md-3 col-sm-3 col-xs-6\"><div class=\"row\">";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\" style='text-align:center;'><span class=\"profileSpan\" style=\"font-size: 20px;font-weight:500; font-family:open sans;\">";
 				for(var j=0;j<5;j++){
 					if(j<=parseInt(tutorMap.averageStar)) 
 				     html += "<span class=\"fa fa-star checked\"></span>";
 					else 
 				        html += "<span class=\"fa fa-star\"></span>"; 
 				}
 				html += "</span></div>";
 				html += "<div class=\"col-lg-12 col-md-12 col-sm-12 col-xs-12\" style='text-align:center;'><span class=\"profileSpan\" style=\"font-size: 16px;font-weight:500; font-family:open sans;\"> <span class=\"rating-text tutor-val-text\" style='font-size:16px;color:black;'>"+tutorMap.starCount+" reviews</span></span></div>";
 				html += "<div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12 m-t-30\" style='text-align:center;'><a href='../../tutor-profile?login=false&user="+tutorMap.userName+"'class=\"btn btn-primary\">View Profile</a></div>";
     			html += "<div class=\"col-lg-6 col-md-6 col-sm-12 col-xs-12 m-t-30\ c_add2"+i+"\" style='text-align:center;'>";
			    html += "<label class=\"checkbox-inline checkbox-styled\"><input id='i_tutor_list"+i+"' type=\"checkbox\" value=\"option1\" onclick=\"return initiateRequest('"+tutorMap.userName+"','"+tutorMap.displayName+"','"+i+"')\"><span>Select Tutor</span>";
				html += "</label></div>";
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
	
	function initiateRequest(p_tutor_id,p_display_name,p_count){debugger;
		if($('#i_tutor_grid'+p_count).prop('checked')){
			alert("rejecting request:");
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
		var l_request_map ={};
		l_request_map.latitude = latitude;
		l_request_map.longitude =longitude;
		l_request_map.subjectName = search_map_obj.subjectId;
		l_request_map.tutorId = p_tutorId;
		
		$('.loading').show();
		ajaxWithJSON("/tutor-remove-request",l_request_map,'POST',function(response) {
					var l_data = response.object;
					
					$('.loading').hide();
					//alert(JSON.stringify(response));
					if (response.status == 'SUCCESS') {
						
						$('#i_tutor_grid'+p_count).prop('checked', false);
						$('#i_tutor_list'+p_count).prop('checked', false);
						$('#i_tutor_map'+p_count).prop('checked', false);
						toastr.error(response.message);
					}
					if (response.status == 'ERROR') {
						//$('c_request_error').html(response.message);
						toastr.error(response.message);
						//setTimeout(function(){ $('c_request_error').html(""); }, 3000);
					
					}

		});
	}
	function saveStudentRequest(p_flage) {debugger;

		
		var l_request_map ={};
		//l_request_map.requestId = $('.c_requestId').val();
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
					//alert(JSON.stringify(response));
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
				var l_data_other = response.other;
				var l_html = '';
				if (response.status == 'SUCCESS') {
					$("#request_list_div").html('');
			    
			        for(var i=0;i<l_data_other.length;i++){
			        	var l_accordian_map = {};
			        	for(var j=0;j<l_data.length;j++){
			        		var l_map = l_data[j];
			        		
			        		if(l_data_other[i]==l_map.requestId){
			        			l_accordian_map=l_map;
				            	  l_html+='<li class="timeline-inverted">';
					              l_html+='<div class="timeline-circ"></div>';
					              var date1 = new Date(Number(l_map.createdAt));
					              l_html+='<div class="timeline-date">'+date1.getDay()+'/'+date1.getMonth()+'/'+date1.getFullYear()+'</div>';
					              l_html+='<div class="timeline-entry">';
					              l_html+='<div class="card timeline-card">';
					              l_html+='<div class="card-body timeline-padding">';
					              l_html+='<img class="img-responsive pull-left with-t-img" src="resources/img/batch-list/user-book.png" alt="" />';
					              if($('#i_role').val()=='ROLE_STUDENT'){
					              if(l_map.requestStatus=='REQUESTED'){
					              l_html+='<p class="reject">You have requested.</p>';
					              l_html+='<p class="reject">'+l_map.comment+'</p>';
					              /*l_html+='<p class="reject"><button type="button" class="btn btn-red" style="float: right;" onclick="rejectRequest(\''+b_inner_map.requestId+'\',\''+b_request.requestId+'\',\''+b_request.tutorId+'\')">Reject</button></p>';*/
					              }
					              
					              if(l_map.requestStatus=='SUGGESTED'){
					            	  if(l_map.reviewStatus=='STUDENT' && l_map.status=='ACTIVE'){
						              l_html+='<p class="reject">Tutor has been suggested.</p>';
						              l_html+='<p class="reject">'+l_map.comment+'</p>';
						              l_html+='<p class="reject"><button type="button" class="btn btn-green" style="float: right;" onclick="actionForTuitionRequests(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'ACCEPT_SUGGESTION\',\'STUDENT\')">Accept Suggestion</button></p>';
						              l_html+='<p class="reject"><button type="button" class="btn btn-green" style="float: right;" onclick="loadBatch(\''+l_map.suggestBatchId+'\',\''+l_map.tutorId+'\')">View Batch Detail</button></p>';
					            	  }else{
					            		  l_html+='<p class="reject">Tutor has been suggested.</p>';
							              l_html+='<p class="reject">'+l_map.comment+'</p>';
					            	  }
					            	  }
					              if(l_map.requestStatus=='REJECTED'){
						              l_html+='<p class="reject">The request has been rejected.</p>';
						              l_html+='<p class="reject">'+l_map.comment+'</p>';
						            }
					              if(l_map.requestStatus=='ACCEPTED'){
					            	  if(l_map.reviewStatus=='STUDENT' && l_map.status=='ACTIVE'){
					            	  l_html+='<p class="reject">The request has been accepted.</p>';
					            	  l_html+='<p class="reject">'+l_map.comment+'</p>';
						              l_html+='<p class="reject"><button type="button" class="btn btn-green" style="float: right;" onclick="actionForTuitionRequests(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'PAYMENT\',\'STUDENT\')">PayNow</button></p>';
					            	  }else{
					            		  l_html+='<p class="reject">The request has been accepted.</p>';
						            	  l_html+='<p class="reject">'+l_map.comment+'</p>';
					            	  }
					            	  }
					              }
					              if($('#i_role').val()=='ROLE_TUTOR'){
					            	  if(l_map.requestStatus=='REQUESTED'){
					            		  if(l_map.reviewStatus=='TUTOR' && l_map.status=='ACTIVE'){
							              l_html+='<p class="reject">You got request.</p>';
							              l_html+='<p class="reject">'+l_map.comment+'</p>';
							              l_html+='<p class="reject"><button type="button" class="btn btn-red" style="float: right;" onclick="actionForTuitionRequests(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'ACCEPT\',\'TUTOR\')">ACCEPT</button></p>';
							              l_html+='<p class="reject"><button type="button" class="btn btn-red" style="float: right;" onclick="actionForTuitionRequests(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'SUGGEST\',\'TUTOR\')">SUGGEST</button></p>';
							              l_html+='<p class="reject"><button type="button" class="btn btn-red" style="float: right;" onclick="actionForTuitionRequests(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'REJECT\',\'TUTOR\')">REJECT</button></p>';
					            		  
					            		  }else{
					            			  l_html+='<p class="reject">You got request.</p>';
								              l_html+='<p class="reject">'+l_map.comment+'</p>';
					            		  }
					            	  }
							              
							              if(l_map.requestStatus=='ACCEPTED'){
								              l_html+='<p class="reject">Your suggested batch has been accepted.</p>';
								              l_html+='<p class="reject">'+l_map.comment+'</p>';
								           }
							      }
					              /*l_html+='<p class="reject"><button type="button" class="btn btn-primary" style="float: right;" onclick="askQuestion(\''+b_inner_map.requestId+'\',\''+b_request.requestId+'\',\''+b_request.tutorId+'\')">Ask Question?</button></p>';*/
					              /*l_html+='<span>'+b_inner_map.requestComment+'</span>';*/
					              l_html+='</div>';
					              l_html+='</div>';
					              l_html+='</div>';
					              l_html+='</li>'; 
					              

			        		}
			        	}
			        	// start accordian pre html
			        	var b_request = l_accordian_map;
			        	var pre_html=''
			        		pre_html+='<div class="panel-group m-r-c-p-group" id="accordion6">';
			        	pre_html+='<div class="card panel manage-request-accordian">';
			        	pre_html+='<div class="card-head collapsed m-r-a-head" data-toggle="collapse" data-parent="#accordion6" data-target="#accordion6-'+i+'">';
						// start header detail
			        	pre_html+='<div class="row row-width">';
			        	pre_html+='<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">';
			        	pre_html+='<div class="row">';
			        	pre_html+='<div class="col-md-12">';
			        	pre_html+='<span class="m-r-a-header-text">Requests ID : '+b_request.requestId+'</span>';
			        	pre_html+='</div>';
			        	pre_html+='<div class="col-md-12 m-t-minus-10">';
						var date2 = new Date(Number(b_request.createdAt));
						pre_html+='<span class="m-r-a-header-text">Requested At : '+date2.getDay()+'/'+date2.getMonth()+'/'+date2.getFullYear()+'</span>';
						pre_html+='</div>'; 
						pre_html+='</div>';
						pre_html+='</div>';
						pre_html+='<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">';
						pre_html+='<div class="row">';
						pre_html+='<div class="col-md-12">';
						pre_html+='<span class="m-r-a-header-text">Subject : '+b_request.subjectId+'</span>';
						pre_html+='</div>';
						pre_html+='</div>';
						pre_html+='</div>';
			           
						pre_html+='<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-r-0">';
						pre_html+='<div class="row">';
						pre_html+='<div class="col-md-12 p-r-0">';
						pre_html+='<span class="m-r-a-header-text">Location : '+b_request.location+'</span>';
						pre_html+='<div class="tools m-r-a-tools">';
						pre_html+='<a class="btn btn-icon-toggle tool-btn"><i class="fa fa-angle-down"></i></a>';
						pre_html+='</div>'; 
						pre_html+='</div>'; 
						pre_html+='</div>'; 
						pre_html+='</div>'; 
						pre_html+='</div>';
						// end header detail
						pre_html+='</div>';
			            
						pre_html+='<div id="accordion6-'+i+'" class="collapse">';
						// accordian body start
						pre_html+='<div class="card-body m-r-a-body">';
						pre_html+='<ul class="timeline collapse-md">';
			        	
			        	// end accordian post html
						
						// start post accordian
						 var post_html = '';
						 post_html+='</ul>';
						 post_html+='</div>';
						 post_html+='</div>';
						 post_html+='</div>';
						 post_html+='</div>';
						// end post accordian
						 $("#request_list_div").append(pre_html+l_html+post_html);
						 pre_html = '';
						 l_html = '';
						 post_html = '';
			        }
			        
			    }
				if (response.status == 'ERROR') {
					console.log(response.message);
				}
			});
}
	
	function actionForTuitionRequests(p_requestId,p_tuitionRequestId,p_tutorId,p_action,p_user_type){
		
		var l_map = {};
		l_map.requestId = p_requestId;
		l_map.tuitionRequestId = p_tuitionRequestId;
		l_map.tutorId = p_tutorId;
		l_map.action = p_action;
		l_map.userType = p_user_type;
		if(p_action == 'SUGGEST'){
			
			$('#i_suggestBatch').modal('show');
			$('.c_requestId').val(p_requestId);
			$('.c_tuitionRequestId').val(p_tuitionRequestId);
			$('.c_tutorId').val(p_tutorId);
			$('.c_action').val(p_action);
			$('.c_userType').val(p_user_type);
			loadTutorBatches(p_tutorId);
			return;
		}
		
		ajaxWithJSON("/common-tuition-request-action", l_map, 'POST', function(response) {
			var l_data = response.object;
			//alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				toastr.success(response.message);
			}
			if (response.status == 'ERROR') {
				toastr.error(response.message);
			}
		});
	}
	
	function suggestBatch(){
		var l_map = {};
		l_map.requestId = $('.c_requestId').val(requestId);
		l_map.tuitionRequestId = $('.c_tuitionRequestId').val(tuitionRequestId);
		l_map.tutorId = $('.c_tutorId').val(tutorId);
		l_map.action = $('.c_action').val(action);
		l_map.userType = $('.c_userType').val(userType);
		l_map.suggestBatchId = $('.c_tutor_batches').val();
		
		ajaxWithJSON("/common-tuition-request-action", l_map, 'POST', function(response) {
			var l_data = response.object;
			//alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				toastr.success(response.message);
			}
			if (response.status == 'ERROR') {
				toastr.error(response.message);
			}
		});
	}
	function loadBatch(p_batchId,p_tutorId){
		var l_map = {};
		l_map.batchId = p_batchId;
		ajaxWithJSON("/common-batch-detail", l_map, 'POST', function(response) {
			var l_data = response.object;
			//alert(JSON.stringify(response));
			if (response.status == 'SUCCESS') {
				toastr.success(response.message);
			}
			if (response.status == 'ERROR') {
				toastr.error(response.message);
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
	

