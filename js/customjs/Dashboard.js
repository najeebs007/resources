/**
 * 
 */

function loadProfileData() {debugger;
	var l_map = {};
	l_map.login = true;
	ajaxWithJSON("/smopl/tutor-personal", l_map, 'POST', function(response) {
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
						var path = img.replace(/\\/g, "/");
						$("#coverImg").css("background-image", 'url(' + path + ')');
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
	ajaxWithJSON("/smopl/tutor-general-info", l_map, 'POST', function(response) {
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
			"/smopl/tutor-social",
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
	ajaxWithJSON("/smopl/tutor-statistics", l_map, 'POST', function(response) {
		var l_data = response.object;
		if (response.status == 'SUCCESS') {
			$('.c_visitor').text(l_data.visitor + " Visitors");
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
			"/smopl/tutor-batches",
			l_map,
			'POST',
			function(response) {
				var l_data = response.object;
				var l_count_batches = response.other;
				if (response.status == 'SUCCESS') {
					var b_html = "";
					$('.c_batches').html("");
					$('.c_total_batches').text('My Batches ('+l_count_batches+')');
					for (var i = 0; i < l_data.length; i++) {
						var b_map = l_data[i];

						b_html += '<div class="col-lg-12">';
						b_html += '<div class="row">';
						b_html += '<div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">';
						b_html += '<img src="/SMWebsite/resources/img/ico/icon-d.png" alt="batches-icon" width="24px">';
						b_html += '</div>';
						b_html += '<div class="col-xl-11 col-lg-11 col-md-11 col-sm-11 col-xs-11 m-t-2 p-l-5">';
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

	ajaxWithJSON("/smopl/tutor-dashboard-graph", l_map, 'POST', function(response) {

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
				max : 250,
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
		eventMouseover: function (data, event, view) {

                	tooltip = '<div class="tooltiptopicevent" style="width:auto;height:auto;color:white;background:#1E90FF;position:absolute;z-index:10001;padding:10px 10px 10px 10px ;  line-height: 200%;">' + 'title: ' + ': ' + data.title + '</br>' + 'start: ' + ': ' + data.start + '</br>' + 'End: ' + ': ' + data.end +'</br>' + 'Description: ' + ': ' + data.description + '</div>';


                    $("body").append(tooltip);
                    $(this).mouseover(function (e) {
                        $(this).css('z-index', 10000);
                        $('.tooltiptopicevent').fadeIn('500');
                        $('.tooltiptopicevent').fadeTo('10', 1.9);
                    }).mousemove(function (e) {
                        $('.tooltiptopicevent').css('top', e.pageY + 10);
                        $('.tooltiptopicevent').css('left', e.pageX + 20);
                    });


                },
                eventMouseout: function (data, event, view) {
                    $(this).css('z-index', 8);

                    $('.tooltiptopicevent').remove();

                },
                dayClick: function () {
                    tooltip.hide()
                },
                eventResizeStart: function () {
                    tooltip.hide()
                },
                eventDragStart: function () {
                    tooltip.hide()
                },
                viewDisplay: function () {
                    tooltip.hide()
                },
                /* eventMouseover: function (event, jsEvent, view) {
                	
                    //set the values and open the modal
                    $("#eventInfo").html(event.description);
                    $("#i_startevent").html(moment(event.start).format('MMM Do h:mm A'));
                    $("#i_endevent").html(moment(event.end).format('MMM Do h:mm A'));
                    $("#eventLink").attr('href', event.url);
                    $("#eventContent").dialog({
                        modal: true,
                        title: event.title
                    });
                    return false;
                },
                eventMouseout: function (event, jsEvent, view) {
                    //set the values and open the modal
                    
                    $("#eventContent").dialog({
                        modal: false,
                        
                    });
                    return false;
                },
                */
				/*dayClick: function(data, event, view){
		            alert('Clicked on: ' + date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear());  

					
				 } */
				 dayClick: function(date, jsEvent, view) {  
                        $('.c_startFrom').val(date.format("DD/MM/YYYY")); 
				        $('#addEvent').modal('show'); 
				       /*  // change the day's background color just for fun
				        $(this).css('background-color', 'red'); */ 
				    }
				 ,
                events:
                  [
                	  
                	{
                          
                    	  
                         "title":"Event Name 1",
                         "allday":"false",
                         "description":"event name 1 description",
                         "start":"2018-07-24",
                         "end":"2018-07-25",
                         "url":"" 
                     	 
                    },
                    {
                        
                   	  
                        "title":"Event Name 2",
                        "allday":"false",
                        "description":"event name 2 description",
                        "start":"2018-07-26",
                         "end":"2018-07-28",
                        "url":"remarks" 
                    
                   } 

           
              
                ]

	});

	$(".fc-corner-right").click(function() {
		$(".fc-week").show();
	});

	$(".fc-corner-left").click(function() {
		$(".fc-week").hide();
	});

}

function loadStudentTop3Requests() {

	var l_map = {};
	l_map.STUDENT = true;
	l_map.TUTOR = false;
	ajaxWithJSON(
			"/smopl/common/load-top3-tuition-requests",
			l_map,
			'POST',
			function(response) {
			var l_data = response.object;
			var l_data_other = response.other;
			
			var l_html = '';
				//alert(JSON.stringify(response));
				
					if (response.status == 'SUCCESS') { 
						$('.c_total_requests').text('My Tuition Requests ('+l_data_other+')'); 
						 
				        	for(var i=0;i<l_data.length;i++){
				        		var l_map = l_data[i]; 
				        			  
				        		l_html+='<div class="panel-group m-r-c-p-group" id="accordion6">';
				        		l_html+='<div class="card panel manage-request-accordian">';
					        	l_html+='<div class="card-head collapsed m-r-a-head" data-toggle="collapse" data-parent="#accordion6" data-target="#accordion6-'+i+'">';
								// start header detail
					        	l_html+='<div class="row row-width row-width-m-b m-t-minus-10">';
					        	l_html+='<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">';
					        	l_html+='<div class="row">';
					        	l_html+='<div class="col-md-12">';
					        	l_html+='<span class="s-profile-text-gray ">Requests ID : <span style="color:black !important;">'+l_map.requestId+'</span></span>';
					        	l_html+='</div>'; 
					        	l_html+='</div>';
								l_html+='</div>'; 
								l_html+='<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">';
								l_html+='<div class="row">';
								l_html+='<div class="col-md-12 m-o-m-t-20">';
								if(l_map.subjectId==null || l_map.subjectId==undefined)
									l_html+='<span class="s-profile-text-gray">Subject : <span style="color:black !important;"></span></span>';	 
									else
										l_html+='<span class="s-profile-text-gray">Subject : <span style="color:black !important;">'+l_map.subjectId+'</span></span>';
								l_html+='</div>';
								l_html+='</div>';
								l_html+='</div>';
								
								l_html+='<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 m-o-m-t-10">';
								l_html+='<div class="row">'; 
					        	l_html+='<div class="col-md-12 line-height-for-all ">';
								//var date2 = new Date(Number(l_map.createdAt));
								l_html+='<span class="s-profile-text-gray">Requested At : <span style="color:black !important;">'+l_map.containAll+'</span></span>';
								l_html+='</div>'; 
								l_html+='</div>';
								l_html+='</div>';
					           
								l_html+='<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">';
								l_html+='<div class="row">';
								l_html+='<div class="col-md-12   line-height-for-all">';
								if(l_map.location==null || l_map.location==undefined)
									l_html+='<span class="s-profile-text-gray">Location : <span style="color:black !important;"></span></span>';
								else
									l_html+='<span class="s-profile-text-gray">Location : <span style="color:black !important;">'+l_map.location+'</span></span>';
								l_html+='</div>'; 
								l_html+='</div>'; 
								l_html+='</div>'; 
								l_html+='</div>';
								// end header detail
								l_html+='</div>';
					            
								l_html+='<div id="accordion6-'+i+'" class="collapse">';
								// accordian body start
								l_html+='<div class="card-body">';
								l_html+='<div class="row">';
								
				        			  l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="text-align:left;">';
						              l_html+='<span class="s-profile-text-gray ">You have requested.</span>';
						              l_html+='<span class="s-profile-text-gray s-black">'+l_map.comment+'</span>';
									  l_html+='</div>';
						              if(l_map.requestStatus=='REQUESTED'){ 
										  
							              l_html+='<p class="reject"><button type="button" class="btn btn-red" style="float: right;" onclick="actionForTuitionRequests(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'REJECT\',\'STUDENT\')">Cancel</button></p>';
							              }
							              
							              if(l_map.requestStatus=='SUGGESTED'){
							            	  
											  l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="text-align:right;">';											  
                                              l_html+='<div class="action-area"><button type="button" class="btn btn-green" style="float: right;" onclick="actionForTuitionRequests(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'ACCEPT_SUGGESTION\',\'STUDENT\')">Accept Suggetion</button>';
								              l_html+='<button type="button" class="btn btn-default" style="float: right;" onclick="loadBatch(\''+l_map.suggestBatchId+'\',\''+l_map.tutorId+'\')">View Batch Detail</button>';
								              l_html+=' <button type="button" class="btn btn-red" style="float: right;" onclick="actionForTuitionRequests(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'REJECT\',\'STUDENT\')">Cancel Request</button></div>';
								              l_html+='</div>';	
							            	 
							            	  }
							              if(l_map.requestStatus=='REJECTED'){
											   l_html+='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="text-align:left;">';
											   l_html+='<span class="s-profile-text-gray">The request has been rejected.</span>';
							                   l_html+='<span class="s-profile-text-gray s-black">'+l_map.comment+'</span>';
                                               l_html+='</div>'; 
								            }
							              if(l_map.requestStatus=='COMPLETED'){
							            	  if(l_map.batchType=='NEW'){
							            		  l_html+='<div class="action-area"><button type="button" class="btn btn-primary" style="float: right;" ><a href="/smopl/student-tuition-booking-detail?tuitionRequest='+l_map.tuitionRequestId+'&user='+l_map.tutorId+'&batchId='+l_map.suggestBatchId+'&studentId='+l_map.studentId+'&login=true">View Booking Detail</a></button>';
							            	  }else
							            	  l_html+='<div class="action-area"><button type="button" class="btn btn-primary" style="float: right;" ><a href="/smopl/student-tuition-booking-detail?tuitionRequest='+l_map.tuitionRequestId+'&user='+l_map.tutorId+'&batchId='+l_map.batchId+'&studentId='+l_map.studentId+'&login=true">View Booking Detail</a></button>';
						                   }
							              
							              if(l_map.requestStatus=='ACCEPTED'){
							            	  l_html+='<div class="action-area"><button type="button" class="btn btn-green" style="float: right;" onclick="actionForTuitionRequests(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'PAYMENT\',\'STUDENT\')">Pay Now</button>';
							            	  l_html+='<button type="button" class="btn btn-red" style="float: right;" onclick="actionForTuitionRequests(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'REJECT\',\'STUDENT\')">Cancel Request</button></div>';
							            	    
							            	}
	
				        
							              l_html+='</div>';
							              l_html+='</div>';
							              l_html+='</div>';
							              l_html+='</div>';
							              l_html+='</div>';
							

				        	$('.c_tuitionrequest').append(l_html);
				        	
							 l_html = '';
							
				   
						}
				}
				if (response.status == 'ERROR') {
					console.log(response.message);
				}
			});
}

function loadTutorTop3Requests() {debugger;

var l_map = {};
l_map.STUDENT = false;
l_map.TUTOR = true;
ajaxWithJSON("/smopl/common/load-top3-tuition-requests",l_map,'POST',function(response) {
		var l_data = response.object;
		//alert(JSON.stringify(l_data)); 
		var l_data_other = response.other;
		var l_html = '';
		    //alert(l_data.length);
			//alert(JSON.stringify(response)); 
				if (response.status == 'SUCCESS') { 
					$('.c_count_request').text('My Tuition Requests ('+l_data_other+')');
			      
						for(var j=0;j<l_data.length;j++){ 
			        		var l_map = l_data[j]; 
								  //alert(l_data.length);
			        			  //alert(JSON.stringify(l_map));
					              //var date1 = new Date(Number(l_map.createdAt));
					               
								     l_html+='<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 p-l-5 p-r-5">'; 
										l_html+='<div class="card card-underline card-customize">'; 
										l_html+='<div class="card-body myreq-body-padding-pro" > <div class="row">'; 
										l_html+='<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">';
                                        l_html+='<div class="cntrl-section">';
										l_html+='<span class="ellipsis-v"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>';
										l_html+='<div class="control-section-card">';
										if(l_map.requestStatus=='REQUESTED'){
										l_html+='<button type="button" class="btn btn-green" style="float: right;" onclick="actionForTuitionRequests(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'ACCEPT\',\'TUTOR\')">Accept</button>'; 
								        l_html+='<button type="button" class="btn btn-yellow" style="float: right;" onclick="selectBatch(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.studentId+'\',\''+l_map.startTime+'\',\''+l_map.endTime+'\',\''+l_map.location+'\',\''+l_map.subject+'\',\''+l_map.tutorId+'\')">Suggest</button> '; 
								        l_html+='<button type="button" class="btn btn-red" style="float: right;" onclick="actionForTuitionRequests(\''+l_map.requestId+'\',\''+l_map.tuitionRequestId+'\',\''+l_map.tutorId+'\',\'REJECT\',\'TUTOR\')">Reject</button>';
										
										}
										if(l_map.requestStatus=='ACCEPTED'){
												  l_html+='<span class="s-profile-text-gray s-black">'+l_map.comment+'.</span>';
												  
										}
										 if(l_map.requestStatus=='REJECTED'){
												  l_html+='<span class="s-profile-text-gray s-black">'+l_map.comment+'.</span>';
												 
										}
										 if(l_map.requestStatus=='COMPLETED'){
											 if(l_map.batchType='EXIST')
												 l_html+='<button type="button" class="btn btn-primary" style="float: right;"><a href="../../manage-lectures?tuitionRequest='+l_map.tuitionRequestId+'&batchId='+l_map.batchId+'">View Booking Detail</a></button>';
											 else
												 l_html+='<button type="button" class="btn btn-primary" style="float: right;"><a href="../../manage-lectures?tuitionRequest='+l_map.tuitionRequestId+'&batchId='+l_map.suggestBatchId+'">View Booking Detail</a></button>';
						                   }
										
										l_html+='</div></div>';		 
										l_html+='</div><div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-minus-10  ">'; 
										l_html+='<div class="row"> <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'; 
										l_html+='<span class="s-profile-text-gray font-12">Requests ID</span> <strong style="float:right;">:</strong> </div>';
										l_html+='<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 p-l-0">'; 
										l_html+='<span class="s-profile-text-gray s-black s-bold font-12">'+l_map.requestId+'</span>'; 
										l_html+='</div></div></div>';
										l_html+='<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12  ">'; 
										l_html+='<div class="row"> <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'; 
										l_html+='<span class="s-profile-text-gray font-12">Requested At </span> <strong style="float:right;">:</strong></div>';
										l_html+='<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 p-l-0">'; 
										l_html+='<span class="s-profile-text-gray s-black s-bold font-12">'+l_map.containAll+'</span>'; 
										l_html+='</div></div></div>';
										l_html+='<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12  "> <div class="row">'; 
										l_html+='<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'; 
										l_html+='<span class="s-profile-text-gray font-12">Subject </span> <strong style="float:right;">:</strong></div>';
										l_html+='<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 p-l-0"> <span class="s-profile-text-gray s-black s-bold font-12">'+l_map.subjectId+'</span>'; 
										l_html+='</div></div></div>';
										l_html+='<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12  ">'; 
										l_html+='<div class="row"> <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'; 
										l_html+='<span class="s-profile-text-gray font-12">Location </span> <strong style="float:right;">:</strong></div>';
										if(l_map.location==null || l_map.location==undefined){
											l_html+='<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 p-l-0 t-ellipsis" data-toggle="tooltip" data-placement="top" title="No Location Found">'; 
											l_html+='<span class="s-profile-text-gray s-black s-bold font-12"></span></div>'; 
											
										}
										else{
										l_html+='<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 p-l-0 t-ellipsis" data-toggle="tooltip" data-placement="top" title="'+l_map.location+'">'; 
										l_html+='<span class="s-profile-text-gray s-black s-bold font-12">'+l_map.location+'</span></div>'; 
										}
										l_html+='</div></div></div></div></div></div>';
								    
										 $('.c_requests').append(l_html);
										 l_html = '';
 
			        	}
			        	
						
						
						 
						 
						 
			     
			 

			}
			if (response.status == 'ERROR') {
				console.log(response.message);
			}
		});
}
