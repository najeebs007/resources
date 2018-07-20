/**
 * 
 */

function loadProfileData() {
	var l_map = {};
	l_map.login = true;
	ajaxWithJSON("/tutor-personal", l_map, 'POST', function(response) {
		var l_data = response.object;
		// //(JSON.stringify(response));
		if (response.status == 'SUCCESS') {
			debugger;
			if (!(l_data == null || l_data == undefined)) {
				if ('profile_image' in l_data) {
					var img = l_data.profile_image;
					if (!(img == null || img == undefined)) {
						$('img#profileImg').attr('src', img);
					}
				}
				if ('profile_cover' in l_data) {
					var img = l_data.profile_cover;
					if (!(img == null || img == undefined)) {
						$("#coverImg").css("background-image", "img")
						// $('img#coverImg').attr('src', img);
					}
				}
				if ('userName' in l_data) {
					var userName = l_data.userName;
					if (!(userName == null || userName == undefined)) {
						$('.c_user__name').text(userName);
					}
				}
				// //(JSON.stringify(l_data.user));
				if ('user' in l_data) {
					var user_data = l_data.user;
					// //(user_data);
					$('.c_display_name').text(user_data[0]);
					$('.c_phone').text(user_data[1]);

				}
			}
		}
		if (response.status == 'ERROR') {
			console.log(response.message);
		}
	});
}
function loadTutorGeneral() {
	var l_map = {};
	l_map.login = true;
	ajaxWithJSON("/tutor-general-info", l_map, 'POST', function(response) {
		var l_data = response.object;
		var l_general = l_data.tutorGeneral;
		// //(JSON.stringify(l_general));
		if (response.status == 'SUCCESS') {
			if(!(l_general.specialities == null || l_general.specialities== undefined ))
			$('.c_specialty').text(l_general.specialities);
		}
		if (response.status == 'ERROR') {
			console.log(response.message);
		}
	});
}
function loadSocialData() {
	var l_map = {};
	l_map.login = true;
	ajaxWithJSON(
			"/tutor-social",
			l_map,
			'POST',
			function(response) {
				var l_data = response.object;
				// //(JSON.stringify(response));
				if (response.status == 'SUCCESS') {
					$('#i_social').html('');
					var b_list = l_data.data;
					for (var i = 0; i < b_list.length; i++) {
						var b_map = b_list[i];
						var b_html = "";
						b_html += '<a href="' + b_map.link
								+ '" target="_blank">';
						b_html += '<div class="social-icon">';
						if (b_map.socialName == 'facebook') {
							b_html += '<i class="fa fa-facebook-f" style="color: #4867aa;"></i>';
						}
						if (b_map.socialName == 'twitter') {
							b_html += '<i class="fa fa-twitter" style="color: #4867aa;"></i>';
						}
						b_html += '</div>';
						b_html += '</a>';
						$('#i_social').append(b_html);
					}
				}
				if (response.status == 'ERROR') {
					console.log(response.message);
				}
			});
}

function loadTutorStatistics() {

	var l_map = {};
	l_map.login = true;
	ajaxWithJSON("/tutor-statistics", l_map, 'POST', function(response) {
		var l_data = response.object;
		if (response.status == 'SUCCESS') {
			$('.c_visitor').text(l_data.visitor + " Visitors Today");
			$('.c_batches_count').text(l_data.batches);
			$('.c_registration').text(l_data.registrations);
		}
		if (response.status == 'ERROR') {
			console.log(response.message);
		}
	});
}

function loadBatchData() {

	var l_map = {};
	l_map.login = true;
	l_map.top = true;
	ajaxWithJSON(
			"/tutor-batches",
			l_map,
			'POST',
			function(response) {
				var l_data = response.object;
				var l_count_batches = response.other;
				if (response.status == 'SUCCESS') {
					var b_html = "";
					$('.c_batches').html("");
					$('.c_total_batches').text('My Batches('+l_count_batches+')');
					for (var i = 0; i < l_data.length; i++) {
						var b_map = l_data[i];

						b_html += '<div class="col-lg-12">';
						b_html += '<div class="row">';
						b_html += '<div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">';
						b_html += '<img src="resources/img/ico/icon-d.png" alt="batches-icon" width="24px">';
						b_html += '</div>';
						b_html += '<div class="col-xl-11 col-lg-11 col-md-11 col-sm-11 col-xs-11 m-t-2">';
						b_html += '<div class="row">';
						b_html += '<div class="col-lg-12 m-t-minus-5"> <span class="pro-text">'
								+ b_map.batchName + '</span></div>';
						b_html += '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-minus-5">';
						b_html += '<span class="pro-heading m-10" style="margin-left:0px;"><i class="fa fa-dot-circle-o m-r-5" aria-hidden="true"></i>batchMode : '
								+ b_map.batchMode + '</span>';
						b_html += '<span class="pro-heading m-10"><i class="fa fa-dot-circle-o m-r-5" aria-hidden="true"></i>Fees : &#x20B9;  '
								+ b_map.feeAmount + '</span>';
						b_html += '<span class="pro-heading m-10"><i class="fa fa-dot-circle-o m-r-5" aria-hidden="true"></i>Status : '
								+ b_map.status + '</span>';
						b_html += '<span class="pro-heading m-10"><i class="fa fa-dot-circle-o m-r-5" aria-hidden="true"></i>Timing : '
								+ b_map.batchStartTime
								 
								+ '-'
								+ b_map.batchEndTime
								 
								+ '</span>';
						b_html += '</div>';
						b_html += '</div>';
						b_html += '</div>';
						b_html += '<div class="col-lg-12"><hr class="hr-dashboard"></div>';
						b_html += '</div>';
						b_html += '</div>';

					}
					$('.c_batches').html(b_html);
				}
				if (response.status == 'ERROR') {
					console.log(response.message);
				}
			});
}

function loadGraphData() {
	debugger;

	var l_map = {};
	l_map.login = true;

	ajaxWithJSON("/tutor-dashboard-graph", l_map, 'POST', function(response) {

		var categories = [];
		var nonPaidData = [];
		var paidData = [];
		var l_data = response.object;
		if (response.status == 'SUCCESS') {
			for (var i = 0; i < l_data.length; i++) {
				var b_map = l_data[i];

				categories.push(b_map.batchName);
				paidData.push(b_map.paid);
				nonPaidData.push((b_map.totalSeats) - (b_map.paid));
			}
			prepareGraph(categories, paidData, nonPaidData);

			// //(JSON.stringify(l_data));
		}
		if (response.status == 'ERROR') {
			console.log(response.message);
		}
	});
	function prepareGraph(p_categories, paidData, nonPaidData) {

		Highcharts.chart('container', {
			chart : {
				type : 'column',
				width : 500
			},
			title : {
				text : ''
			},
			subtitle : {
				text : ''
			},
			xAxis : {
				categories : p_categories,
				title : {
					text : 'Batches'
				},

			},
			plotOptions : {
				series : {
					colorByPoint : true
				}
			},
			yAxis : {
				lineColor : '#66666661',
				lineWidth : 1,
				tickColor : '#66666661',
				tickWidth : 1,
				tickLength : 3,
				gridLineColor : '#66666661',
				min : 0,
				max : 450,
				tickInterval : 50,
				title : {
					text : 'Students',
					align : 'high'
				},
				labels : {
					overflow : 'justify'
				}
			},
			tooltip : {
				valueSuffix : ' '
			},
			plotOptions : {
				bar : {
					dataLabels : {
						enabled : true
					}
				}
			},
			legend : {
				enabled : false,
			},
			credits : {
				enabled : false
			},
			series : [ {
				name : 'Non Paid',
				color : '#1190e8',
				data : nonPaidData
			}, {
				name : 'Paid',
				color : '#ec7d31',
				data : paidData
			} ]

		});

	}

}
// for full calendar js
function loadCalendar() {
	
	$(".fc-week").hide();
	$('#calendar').fullCalendar({
		nowIndicator : true,
		header : {
			title : 'H',
			left : 'title',
			right : 'agendaDay,agendaWeek,month'
		},
		defaultView : 'agendaDay',
		navLinks : true, // can click day/week names to navigate views
		editable : true,
		eventLimit : true, // allow "more" link when too many events

	});

	$(".fc-corner-right").click(function() {
		$(".fc-week").show();
	});

	$(".fc-corner-left").click(function() {
		$(".fc-week").hide();
	});

}

function loadRequestsData() {debugger;

	var l_map = {};
	l_map.STUDENT = false;
	l_map.TUTOR = true;
	ajaxWithJSON(
			"/common/load-top3-tuition-requests",
			l_map,
			'POST',
			function(response) {debugger;
			var l_data = response.object;
			var l_data_other = response.other;
			var l_html = '';
				alert(JSON.stringify(response));
				
					if (response.status == 'SUCCESS') {
						
				      // var b_data = l_data.data;
				        for(var i=0;i<l_data_other.length;i++){
							var b_request = l_data[i];
							var date2 = new Date(Number(b_request.createdAt));
							  
				        	for(var j=0;j<l_data.length;j++){
				        		var l_map = l_data[j];
				        		if(l_data_other[i]==l_map.requestId){ 
						              var date1 = new Date(Number(l_map.createdAt)).toString();
						                // l_html+='<div class="timeline-date">'+date1+'</div>';
						               
									    l_html+='<tr>'; 
										l_html+='<td class="td-dashboard">Requests ID : '+b_request.requestId+'</td>';
										l_html+='<td class="td-dashboard">Requested At : '+date2.getDay()+'/'+date2.getMonth()+'/'+date2.getFullYear()+'</td>';
										if(b_request.subjectId==null ||b_request.subjectId==undefined)
										l_html+='<td class="td-dashboard">Subject :</td>';
                                         else
                                         l_html+='<td class="td-dashboard">Subject : '+b_request.subjectId+'</td>';
                                        if(b_request.location==null ||b_request.location==undefined) 									 
										l_html+='<td class="td-dashboard">Location :</td>';
									    else
											
									    l_html+='<td class="td-dashboard">Location : '+b_request.location+'</td>';
										l_html+='<td>';
										  
						            	  if(l_map.requestStatus=='REQUESTED'){
						            		  if(l_map.reviewStatus=='TUTOR'){
								            
								              l_html+='<button type="button" class="btn btn-green" onclick="actionByTutor(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'ACCEPT\')">ACCEPT</button>';
								              l_html+='<button type="button" class="btn btn-red" onclick="actionByTutor(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'SUGGEST\')">SUGGEST</button>';
								              l_html+='<button type="button" class="btn btn-yellow" onclick="actionByTutor(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'REJECT\')">REJECT</button>';
						            		  l_html+='</td>';
						            		  }else{
						            			  l_html+='<span class="s-profile-text-gray">You got request.</span>'; 
												  l_html+='</td>';
						            		  }
						            	  }
								              if(l_map.requestStatus=='ACCEPTED'){
									              l_html+='<span class="s-profile-text-gray">Tutor has been suggested.</span>';
									              l_html+='</td>';
									           }
								       				 
										l_html+='</tr>';
						               

				        		}
				        	}
				        	// // start accordian pre html
				        	// var b_request = l_data[i];
				        	// var pre_html=';'
				        		// pre_html+='<div class="panel-group m-r-c-p-group" id="accordion6">';
				        	// pre_html+='<div class="card panel manage-request-accordian">';
				        	// pre_html+='<div class="card-head collapsed m-r-a-head" data-toggle="collapse" data-parent="#accordion6" data-target="#accordion6-'+i+'">';
							// // start header detail
				        	// pre_html+='<div class="row row-width">';
				        	// pre_html+='<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">';
				        	// pre_html+='<div class="row">';
				        	// pre_html+='<div class="col-md-12">';
				        	// pre_html+='<span class="m-r-a-header-text">Requests ID : '+b_request.requestId+'</span>';
				        	// pre_html+='</div>';
				        	// pre_html+='<div class="col-md-12 m-t-minus-10">';
							// var date2 = new Date(Number(b_request.createdAt)).toString();
							// pre_html+='<span class="m-r-a-header-text">Requested At : '+date2+'</span>';
							// pre_html+='</div>'; 
							// pre_html+='</div>';
							// pre_html+='</div>';
							// pre_html+='<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">';
							// pre_html+='<div class="row">';
							// pre_html+='<div class="col-md-12">';
							// pre_html+='<span class="m-r-a-header-text">Subject : '+b_request.subjectId+'</span>';
							// pre_html+='</div>';
							// pre_html+='</div>';
							// pre_html+='</div>';
				           
							// pre_html+='<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-r-0">';
							// pre_html+='<div class="row">';
							// pre_html+='<div class="col-md-12 p-r-0">';
							// pre_html+='<span class="m-r-a-header-text">Location : '+b_request.location+'</span>';
							// pre_html+='<div class="tools m-r-a-tools">';
							// pre_html+='<a class="btn btn-icon-toggle tool-btn"><i class="fa fa-angle-down"></i></a>';
							// pre_html+='</div>'; 
							// pre_html+='</div>'; 
							// pre_html+='</div>'; 
							// pre_html+='</div>'; 
							// pre_html+='</div>';
							// // end header detail
							// pre_html+='</div>';
				            
							// pre_html+='<div id="accordion6-'+i+'" class="collapse">';
							// // accordian body start
							// pre_html+='<div class="card-body m-r-a-body">';
							// pre_html+='<ul class="timeline collapse-md">';
				        	// // end accordian post html
							// // start post accordian
							 // var post_html = '';
							 // post_html+='</ul>';
							 // post_html+='</div>';
							 // post_html+='</div>';
							 // post_html+='</div>';
							 // post_html+='</div>';
							// end post accordian
							 $('.c_requests').append(l_html);
							
							 
							 l_html = '';
							 
				     
					}

				}
				if (response.status == 'ERROR') {
					console.log(response.message);
				}
			});
}
