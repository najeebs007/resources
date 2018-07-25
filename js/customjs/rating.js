var totalStar;
var averageRating;
$(document).ready(function() {
	// $("#addIntroForm").hide();

});
$(document).ready(
		function() {

			/*
			 * 1. Visualizing things on Hover - See next part for action on
			 * click
			 */
			$('#stars li').on('mouseover', function() {
				onStar = parseInt($(this).data('value'), 10); // The star
																// currently
																// mouse on

				// Now highlight all the stars that's not after the current
				// hovered star
				$(this).parent().children('li.star').each(function(e) {
					if (e < onStar) {
						$(this).addClass('hover');
					} else {
						$(this).removeClass('hover');
					}
				});

			}).on('mouseout', function() {
				$(this).parent().children('li.star').each(function(e) {
					$(this).removeClass('hover');
				});
			});
			/* 2. Action to perform on click */
			$('#stars li').on(
					'click',
					function() {
						var onStar = parseInt($(this).data('value'), 10); // The
																			// star
																			// currently
																			// selected
						var stars = $(this).parent().children('li.star');
						for (i = 0; i < stars.length; i++) {
							$(stars[i]).removeClass('selected');
						}
						for (i = 0; i < onStar; i++) {
							$(stars[i]).addClass('selected');
						}
						// JUST RESPONSE (Not needed)
						var ratingValue = parseInt($('#stars li.selected')
								.last().data('value'), 10);
						var msg = "";
						if (ratingValue > 1) {
							msg = "Thanks! You rated this " + ratingValue
									+ " stars.";
						} else {
							msg = "We will improve ourselves. You rated this "
									+ ratingValue + " stars.";
						}
						responseMessage(msg);

					});
		});

function responseMessage(msg) {
	$('.success-box').fadeIn(200);
	$('.success-box div.text-message').html("<span>" + msg + "</span>");
}

var onStar = 0;
$(document).ready(function() {
	debugger;
	ratingList();
	addRatingDetails();
	ratingStarCount();
	var l_publicId = getUrlParameter("user");
	alert("public is = " + l_publicId);
	var l_currentUser = $
	{
		user.userName
	}
	;
	alert("l_currentUser =" + l_currentUser);
});

function ratingList() {
	debugger;

	// var l_map = {};
	// l_map.login = true;
	// l_map.top = true;
	var b_html = "";
	$('.c_rating').html("");
	ajaxWithJSON("/load-rating", null, 'GET', function(response) {
				debugger;
				var l_data = response.object;
				for (var i = 0; i < l_data.length; i++) {
					debugger;
					var r_map = l_data[i];
					var no_of_records = l_data.length;
					var l_targerUser = r_map.targetUser;
					var l_givenByName = r_map.givenByName;
					var ndate = r_map.dateTime;
					var cdate = new Date(ndate);
					var l_dateTime = cdate.toString();
					var l_starRating = r_map.starRating;
					var l_comment = r_map.comment;

					var l_givenByEmail = r_map.givenByEmail;
					var average_rating = l_starRating / no_of_records;

					/*
					 * $('.targetUser').html(l_targerUser);
					 * $('.givenByName').html(l_givenByName);
					 * $('.dateTime').html(l_dateTime);
					 * $('.starRating').html(l_starRating);
					 * $('.comment').html(l_comment);
					 * $('.givenByEmail').html(l_givenByEmail);
					 */
					/* dynamic html code */

					b_html += ' <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
					b_html += ' <div class="card card-underline card-customize">';
					b_html += ' <div class="card-head card-head-pro">';
					b_html += ' <header class="card-head-customize" style="color:gray;">Students Review</header>';
					b_html += ' </div>';
					b_html += ' <div class="card-body card-body-padding-pro">';
					b_html += ' <div class="row">';
					b_html += '	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
					b_html += ' <div class="row">';
					b_html += ' <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2 rating-row-customize">';
					b_html += '	<img src="resources/img/profile-img/pro.jpg" class="img-circle img-responsive rating-pic-small" alt="proile pic small">';
					b_html += '</div>';
					b_html += '<div class="col-lg-11 col-md-11 col-sm-9 col-xs-9 ">';
					b_html += '<div class="row">';
					b_html += '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
					b_html += ' <span class="rating-text-normal">'
							+ l_givenByName + '</span>';
					b_html += ' </div>';
					b_html += '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-minus-5">';
					b_html += ' <span class="profileSpan" style="font-size: 16px;font-weight:500;font-family: monospace;">';
					switch (l_starRating) {
					case "1":
						b_html += '<span class="fa fa-star checked"></span>';
						b_html += '<span class="fa fa-star "></span>';
						b_html += '<span class="fa fa-star "></span>';
						b_html += '<span class="fa fa-star "></span>';
						b_html += '<span class="fa fa-star "></span>';
						break;

					case "2":
						b_html += '<span class="fa fa-star checked"></span>';
						b_html += '<span class="fa fa-star checked"></span>';
						b_html += '<span class="fa fa-star "></span></span>';
						b_html += '<span class="fa fa-star "></span></span>';
						b_html += '<span class="fa fa-star "></span></span>';
						break;
					case "3":
						b_html += '<span class="fa fa-star checked"></span>';
						b_html += '<span class="fa fa-star checked"></span>';
						b_html += '<span class="fa fa-star checked"></span>';
						b_html += '<span class="fa fa-star "></span></span>';
						b_html += '<span class="fa fa-star "></span></span>';
						break;
					case "4":
						b_html += '<span class="fa fa-star checked"></span>';
						b_html += '<span class="fa fa-star checked"></span>';
						b_html += '<span class="fa fa-star checked"></span>';
						b_html += '<span class="fa fa-star checked"></span>';
						b_html += '<span class="fa fa-star "></span></span>';
						break;

					/*
					 * case 4.5: alert("Case 4.5"); b_html += '<span class="fa
					 * fa-star checked"></span>'; b_html += '<span class="fa
					 * fa-star checked"></span>'; b_html += '<span class="fa
					 * fa-star checked"></span>'; b_html += '<span class="fa
					 * fa-star checked"></span>'; break;
					 */
					case "5":
						b_html += '<span class="fa fa-star checked"></span>';
						b_html += '<span class="fa fa-star checked"></span>';
						b_html += '<span class="fa fa-star checked"></span>';
						b_html += '<span class="fa fa-star checked"></span>';
						b_html += '<span class="fa fa-star checked"></span>';
					}

					b_html += '<span class="rating-text" style="color:black;font-weight:500;">'
							+ l_starRating
							+ ' out of 5 Good to use the product</span>';
					b_html += '</div>';
					b_html += ' <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-minus-5">';
					b_html += ' <span class="rating-text" style="font-size:12px;">'
							+ l_dateTime + '</span>';
					b_html += ' </div>';
					b_html += ' <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-15">';
					b_html += ' <span class="rating-text">' + l_comment
							+ '</span>';
					b_html += '</div>';
					b_html += '	<!--  <span class="readmore">ReadMore</span> -->';
					b_html += '	</div>';
					b_html += '	</div>';
					b_html += '	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><hr class="ratingHr"></hr></div>';
					b_html += ' </div>';
					b_html += '	</div>';
					b_html += ' </div>';
					b_html += '</div>';
					b_html += ' </div>';
					b_html += '</div>';
				}
				$('.c_rating').html(b_html);
			});
}

function addRatingDetails() {
	debugger;
	var l_map = {};
	var p_targetUser;
	var p_givenByName;
	var p_givenByEmail;

	if ($('#targetUser').val() == undefined) {
		p_targetUser = "Sachin Sharma";
		// p_targetUser = g_data.user;
		// alert(p_targetUser);
	}
	if ($('#givenByName').val() == undefined) {
		p_givenByName = null;
	}
	if ($('#givenByEmail').val() == undefined) {
		p_givenByEmail = null;
	}
	// var p_targetUser = document.getElementById('targetUser').value;
	// var p_givenByName = document.getElementById('givenByName').value;
	var p_starRating = onStar;
	var p_comment = document.getElementById("myTextarea").value;
	// var p_givenByEmail = document.getElementById('givenByEmail').value;

	l_map.targetUser = p_targetUser;
	l_map.givenByName = p_givenByName;
	l_map.starRating = p_starRating;
	l_map.comment = p_comment;
	l_map.givenByEmail = p_givenByEmail;
	$(".loading").show();
	// $(".loading").show();
	ajaxWithJSON("/tutor/save-rating-info", l_map, 'POST', function(response) {
		debugger;
		$(".loading").hide();
		if (response.status == 'SUCCESS') {
			toastr.success("successfully added rating");
			window.reload();
		}
		if (response.status == 'ERROR') {
			toastr.success("some error occured");
		}

	});

}

// 3red div

function ratingStarCount() {debugger;

	var r_html = "";
	$('.r_rating').html("");
	ajaxWithJSON("/common/load-star-count", g_data, 'POST', function(response) {debugger;
				var l_data = response.object;
				var l_fiveStar = l_data.fiveStar;
				var l_fourStar = l_data.fourStar;
				var l_threeStar = l_data.threeStar;
				var l_twoStar = l_data.twoStar;
				var l_oneStar = l_data.oneStar;
				var dataLength = l_data.length;
				var targetUser = l_data.targetUser;
				var starRatingSum = l_data.starRatingSum;
				averageRating1 = l_data.averageRating;
				var averageRating = averageRating1.toString();
				totalStar = [ l_fiveStar + l_fourStar + l_threeStar + l_twoStar + l_oneStar ];
				var percentFiveStar = (Math.floor(l_fiveStar / totalStar) * 100) + "%";

				var percentFiveStar = (Math.floor((l_fiveStar / totalStar) * 100)) + "%";
				var percentFourStar = (Math.floor((l_fourStar / totalStar) * 100)) + "%";
				var percentThreeStar = (Math.floor((l_threeStar / totalStar) * 100)) + "%";
				var percentTwoStar = (Math.floor((l_twoStar / totalStar) * 100)) + "%";
				var percentOneStar = (Math.floor((l_oneStar / totalStar) * 100)) + "%";

				/* dynamic html code */

				r_html += '<div class="card card-customize rating-height">';
				r_html += '<div class="card-body card-body-padding-rating">';
				r_html += '	<div class="row">';
				r_html += '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">';
				r_html += '<div class="row">';
				r_html += '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">';
				r_html += '<div class="row">';
				r_html += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">';
				r_html += '<span class="rating-text-normal">' + targetUser
						+ '</span></br> ';
				r_html += '<span class="rating-text" style="color: black; font-weight: 500;">'
						+ averageRating + ' out of 5</span>';
				r_html += '	</div>';
				r_html += '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="text-align: right;">';
				r_html += '<span class="profileSpan" style="font-size: 16px; font-weight: 500; font-family: monospace;">';
				switch (averageRating) {
				case "1":
					r_html += '<span class="fa fa-star checked"></span>';
					r_html += '<span class="fa fa-star "></span>';
					r_html += '<span class="fa fa-star "></span>';
					r_html += '<span class="fa fa-star "></span>';
					r_html += '<span class="fa fa-star "></span>';
					break;

				case "2":
					r_html += '<span class="fa fa-star checked"></span>';
					r_html += '<span class="fa fa-star checked"></span>';
					r_html += '<span class="fa fa-star "></span>';
					r_html += '<span class="fa fa-star "></span>';
					r_html += '<span class="fa fa-star "></span>';
					break;

				case "3":
					r_html += '<span class="fa fa-star checked"></span>';
					r_html += '<span class="fa fa-star checked"></span>';
					r_html += '<span class="fa fa-star checked"></span>';
					r_html += '<span class="fa fa-star "></span>';
					r_html += '<span class="fa fa-star "></span>';
					break;

				case "4":
					r_html += '<span class="fa fa-star checked"></span>';
					r_html += '<span class="fa fa-star checked"></span>';
					r_html += '<span class="fa fa-star checked"></span>';
					r_html += '<span class="fa fa-star checked"></span>';
					r_html += '<span class="fa fa-star "></span>';
					break;

				case "5":
					r_html += '<span class="fa fa-star checked"></span>';
					r_html += '<span class="fa fa-star checked"></span>';
					r_html += '<span class="fa fa-star checked"></span>';
					r_html += '<span class="fa fa-star checked"></span>';
					r_html += '<span class="fa fa-star checked"></span>';
				}

				r_html += '</span><span class="rating-text" style="color: black; font-weight: 500;">'
						+ starRatingSum + '</span>';
				r_html += '</div>';
				r_html += '</div>';
				r_html += '</div>';
				r_html += '</div>';
				r_html += '</div>';
				r_html += '<div class="co-lg-12 col-md-12 col-sm-12 col-xs-12 margin-rating-bar">';
				r_html += '<div class="side">';
				r_html += '<div>5 star</div>';
				r_html += '</div>';
				r_html += '<div class="middle">';
				r_html += '<div class="bar-container">';
				r_html += '<div class="bar" style="width: ' + percentFiveStar
						+ ';">';
				r_html += '</div>';
				r_html += '</div>';
				r_html += '</div>';
				r_html += '<div class="side right"><div>' + percentFiveStar
						+ '</div></div>';
				r_html += '<div class="side"><div>4 star</div></div>';
				r_html += '<div class="middle"> <div class="bar-container"> <div class="bar" style="width: '
						+ percentFourStar + ';"></div></div></div>';
				r_html += '<div class="side right"> <div>' + percentFourStar
						+ '</div> </div>';
				r_html += '<div class="side"> <div>3 star</div> </div> ';
				r_html += '<div class="middle"> <div class="bar-container"> <div class="bar" style="width: '
						+ percentThreeStar + ';"></div> </div> </div>';
				r_html += '<div class="side right"> <div>' + percentThreeStar
						+ '</div> </div>';
				r_html += '<div class="side"><div>2 star</div></div>';
				r_html += '<div class="middle"> <div class="bar-container"> <div class="bar" style="width: '
						+ percentTwoStar + ';"></div> </div></div>';
				r_html += ' <div class="side right"> <div>' + percentTwoStar
						+ '</div> </div>';
				r_html += '<div class="side"> <div>1 star</div> </div>';
				r_html += '<div class="middle"> <div class="bar-container">';
				r_html += '<div class="bar" style="width: ' + percentOneStar
						+ ';"></div> </div>';
				r_html += '</div>';
				r_html += '<div class="side right">';
				r_html += '  <div>' + percentOneStar + '</div>';
				r_html += '   </div>';
				r_html += '</div>';
				r_html += '</div>';
				r_html += '</div>';
				r_html += '</div>';
				$('.r_rating').html(r_html);
			});
}

/**
 * 
 */
