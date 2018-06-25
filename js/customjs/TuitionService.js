/**
 * 
 */

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
    			html += "<p class='padding-price'><i class='fa fa-inr'></i> </p>";
    			html += "</div>";
    			html += "<div class=\"col-md-8 col-sm-8 col-xs-8 favorite\">";  
    			html += "<a href=\"#\" onclick=\"return requestForTuition('"+tutorMap.userName+"')\" class=\"btn btn-default btn-small-2 normal-p\" style='padding: 7.5px 19px;margin:0px !important;'>Request For Tuition<i class=\"fa fa-caret-right\"></i></a></div></div></div></div></div>";
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
    			html += "<div class=\"ffs-bs col-xs-12 btn-half-wth\" style='text-align:center;'><a href=\"#\" onclick=\"return requestForTuition('"+tutorMap.userName+"')\" class=\"btn btn-default btn-small\">Request For Tuition<i class=\"fa fa-caret-right\"></i></a></div>";
    			html += "<div class=\"sum favorite col-sm-12 col-xs-6\">"; 
    			//html += "<p class=\"col-xs-3\">Cart</p>";
    			html += "</div></div></div>";
			}
			
			return html;
		}

  var l_search_array = ["address-map","keywords","subjectId","offset","records"];

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
	
	var l_search_array = [ "address-map", "keywords", "subjectId"];
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
				var l_latitude = results[0].geometry.location.lat();
				var l_longitude = results[0].geometry.location.lng();

				formSubmitFilter(l_latitude,l_longitude);
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

		l_search_map.latitude = lati;
		l_search_map.longitude = longi;
		l_search_map.offset = "0";
		l_search_map.records = "10";
		$('.loading').show();
		ajaxWithJSON("/common/search-tutor-data", l_search_map, 'POST', function(response) {
			//alert(JSON.stringify(response));
		$('.loading').hide();
	    if (response.status == 'SUCCESS') {
				 l_data = response.object;
				 tutorSearchResult   = l_data.tutorData;
				 l_board_list_obj 	= l_data.boardData;
				 l_class_list_obj 	= l_data.classData;
				 l_count_list_obj 	= l_data.requestCount;
				 search_map_obj 		= l_data.searchmap;
				 l_subject_list_obj 	= l_data.subjectData;
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
			setOptions("subjectId",l_subject_list_obj,'subjectId','subjectName',"Select Subject Name");	
		}else{
			toastr.error("No Tutor Available in this area.");
		}
		
	}
	// end search from filters
	
	
	function requestForTuition(p_user_name) {

		$('#tuition_request').modal('show');

	}
	
	function requestType(p_flage) {

		var l_map = g_data;
		l_map.top = true;
		ajaxWithJSON(
				"/tutor-batches",
				l_map,
				'POST',
				function(response) {
					var l_data = response.object;
					alert(JSON.stringify(response));
					if (response.status == 'SUCCESS') {
						var l_html = '';
						for (var i = 0; i < l_data.length; i++) {
							var b_map = l_data[i];
							l_html += '<div class="card" style="width: 18rem;">';
							l_html += ' <div class="card-body">';
							l_html += '<h5 class="card-title">'
									+ b_map.batchName + '</h5>';
							l_html += '<h5 class="card-title">'
									+ b_map.batchMode + '</h5>';
							l_html += '<h5 class="card-title">' + b_map.medium
									+ '</h5>';
							l_html += '<h5 class="card-title">'
									+ b_map.feeAmount + '</h5>';

							l_html += '<a href="#" class="btn btn-primary">Send Request</a>';
							l_html += '</div>';
							l_html += '</div>';

						}
						$('.c_tutor_batches').html(l_html);
					}
					if (response.status == 'ERROR') {
						console.log(response.message);
					}

				});

	}