var mapStyles = [ {
	featureType : 'water',
	elementType : 'all',
	stylers : [ {
		hue : '#d7ebef'
	}, {
		saturation : -5
	}, {
		lightness : 54
	}, {
		visibility : 'on'
	} ]
}, {
	featureType : 'landscape',
	elementType : 'all',
	stylers : [ {
		hue : '#eceae6'
	}, {
		saturation : -49
	}, {
		lightness : 22
	}, {
		visibility : 'on'
	} ]
}, {
	featureType : 'poi.park',
	elementType : 'all',
	stylers : [ {
		hue : '#dddbd7'
	}, {
		saturation : -81
	}, {
		lightness : 34
	}, {
		visibility : 'on'
	} ]
}, {
	featureType : 'poi.medical',
	elementType : 'all',
	stylers : [ {
		hue : '#dddbd7'
	}, {
		saturation : -80
	}, {
		lightness : -2
	}, {
		visibility : 'on'
	} ]
}, {
	featureType : 'poi.school',
	elementType : 'all',
	stylers : [ {
		hue : '#c8c6c3'
	}, {
		saturation : -91
	}, {
		lightness : -7
	}, {
		visibility : 'on'
	} ]
}, {
	featureType : 'landscape.natural',
	elementType : 'all',
	stylers : [ {
		hue : '#c8c6c3'
	}, {
		saturation : -71
	}, {
		lightness : -18
	}, {
		visibility : 'on'
	} ]
}, {
	featureType : 'road.highway',
	elementType : 'all',
	stylers : [ {
		hue : '#dddbd7'
	}, {
		saturation : -92
	}, {
		lightness : 60
	}, {
		visibility : 'on'
	} ]
}, {
	featureType : 'poi',
	elementType : 'all',
	stylers : [ {
		hue : '#dddbd7'
	}, {
		saturation : -81
	}, {
		lightness : 34
	}, {
		visibility : 'on'
	} ]
}, {
	featureType : 'road.arterial',
	elementType : 'all',
	stylers : [ {
		hue : '#dddbd7'
	}, {
		saturation : -92
	}, {
		lightness : 37
	}, {
		visibility : 'on'
	} ]
}, {
	featureType : 'transit',
	elementType : 'geometry',
	stylers : [ {
		hue : '#c8c6c3'
	}, {
		saturation : 4
	}, {
		lightness : 10
	}, {
		visibility : 'on'
	} ]
} ];

$.ajaxSetup({
	cache : true
});

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Google Map - Homepage http://localhost:8080/resources/assets/js/locations.js
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createHomepageGoogleMap(_latitude, _longitude) {
	if (document.getElementById('map') != null) {
		$
				.getScript(
						"http://localhost:8080/resources/js/locations.js",
						function() {
							var map = new google.maps.Map(
									document.getElementById('map'),
									{
										zoom : 15,
										zoomControl : true,
										streetViewControl : true,
										zoomControlOptions : {
											position : google.maps.ControlPosition.RIGHT_TOP
										},
										streetViewControlOptions : {
											position : google.maps.ControlPosition.RIGHT_TOP
										},
										scrollwheel : false,
										center : new google.maps.LatLng(
												_latitude, _longitude)
									});
							var i;
							var newMarkers = [];
							for (i = 0; i < locations.length; i++) {
								var pictureLabel = document
										.createElement("img");
								pictureLabel.src = locations[i][7];
								var boxText = document.createElement("div");
								infoboxOptions = {
									content : boxText,
									disableAutoPan : false,
									pixelOffset : new google.maps.Size(-100, 0),
									zIndex : null,
									alignBottom : true,
									boxClass : "infobox-wrapper",
									enableEventPropagation : true,
									closeBoxMargin : "0px 0px -8px 0px",
									closeBoxURL : "assets/img/close-btn.png",
									infoBoxClearance : new google.maps.Size(1,
											1)
								};
								var marker = new MarkerWithLabel(
										{
											title : locations[i][0],
											position : new google.maps.LatLng(
													locations[i][3],
													locations[i][4]),
											map : map,
											labelContent : '<div class="marker-loaded"><div class="map-marker"><img src="'
													+ locations[i][7]
													+ '" alt="" /></div></div>',
											labelAnchor : new google.maps.Point(
													50, 0),
											labelClass : "marker-style"
										});
								newMarkers.push(marker);
								boxText.innerHTML = '<div class="infobox-inner">'
										+ '<a href="'
										+ locations[i][5]
										+ '">'
										+ '<div class="infobox-image" style="position: relative">'
										+ '<img src="'
										+ locations[i][6]
										+ '">'
										+ '<div><span class="infobox-price">'
										+ locations[i][2]
										+ '</span></div>'
										+ '</div>'
										+ '</a>'
										+ '<div class="infobox-description">'
										+ '<div class="infobox-title"><a href="'
										+ locations[i][5]
										+ '">'
										+ locations[i][0]
										+ '</a></div>'
										+ '<div class="infobox-location">'
										+ locations[i][1]
										+ '</div>'
										+ '</div>'
										+ '</div>';
								// Define the infobox
								newMarkers[i].infobox = new InfoBox(
										infoboxOptions);
								google.maps.event
										.addListener(
												marker,
												'click',
												(function(marker, i) {
													return function() {
														for (h = 0; h < newMarkers.length; h++) {
															newMarkers[h].infobox
																	.close();
														}
														newMarkers[i].infobox
																.open(map, this);
													}
												})(marker, i));
							}

							// Autocomplete
							if ($("#address-map").length) {
								var input = (document
										.getElementById('address-map'));
								var autocomplete = new google.maps.places.Autocomplete(
										input);
								autocomplete.bindTo('bounds', map);
								google.maps.event
										.addListener(
												autocomplete,
												'place_changed',
												function() {
													var place = autocomplete
															.getPlace();
													if (!place.geometry) {
														return;
													}
													if (place.geometry.viewport) {
														map
																.fitBounds(place.geometry.viewport);
													} else {
														map
																.setCenter(place.geometry.location);
														map.setZoom(15);
													}
													var address = '';
													if (place.address_components) {
														address = [
																(place.address_components[0]
																		&& place.address_components[0].short_name || ''),
																(place.address_components[1]
																		&& place.address_components[1].short_name || ''),
																(place.address_components[2]
																		&& place.address_components[2].short_name || '') ]
																.join(' ');
													}
												});
							}
						});
	}
}




function initializeCustomGoogleMap(p_locations, p_lati, p_longi) {
	var locations = [ ];
	for (var i = 0; i < p_locations.length; i++) {
		var l_map = p_locations[i];
	 var a=['<div class="card"> <img src="https://s19.postimg.cc/lbz034vw3/pro.png" alt="no image" style="border-radius: 100%;border: 5px solid rgba(255,255,255,0.5);"><h2>'
			+ l_map.displayName
			+ '</h2><p class="title"><strong style="color:black;">Experiance:</strong><span>'
			+ l_map.totalExperience
			+ '</span></p><p class="title"><strong style="color:black;">Teach : </strong><span>'
			+ l_map.specialities
			+ '<p class="title"><strong title="this distance from current location" style="color:black;">distance : </strong><span>'
			+ Math.round(parseFloat(l_map.distance))
			+ ' km</span></p><div style="margin: 24px 0;"><a href="#"><i class="fa fa-dribbble"></i></a> </div> <p><a target="_blank" href="http://scholarsmerit.com/tutor-profile?login=false&user='
			+ l_map.userName
			+ '"><button>View Profile</button></a></p>'
			+'<div style="margin: 24px 0;"><a href="#"><i class="fa fa-dribbble"></i></a> </div>'
				+ '"<button onclick="return requestForTuition(\''+l_map.userName+'\',\''+l_map.displayName+'\')">Request For Tuition</button></div>'
			+'</div><style>.card {box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);max-width:200px;margin: auto;text-align: center;font-family: arial;}.title {color: grey;font-size: 13px;}button{border: none;outline: 0;display: inline-block;padding: 4px;color: white;background-color: #000;text-align: center;cursor: pointer;width: 100%;font-size: 13px;}a {text-decoration: none;font-size: 15px;color: blue;}button:hover, a:hover {opacity: 0.7;}</style>', l_map.latitude, l_map.longitude];
	   locations.push(a);
	}

	var iconURLPrefix = 'http://maps.google.com/mapfiles/ms/icons/';

	var icons = [ iconURLPrefix + 'red-dot.png',
			iconURLPrefix + 'green-dot.png', iconURLPrefix + 'blue-dot.png',
			iconURLPrefix + 'orange-dot.png', iconURLPrefix + 'purple-dot.png',
			iconURLPrefix + 'pink-dot.png', iconURLPrefix + 'yellow-dot.png' ]
	var iconsLength = icons.length;

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom : 8,
		center : new google.maps.LatLng(28.609834, 77.362591),
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		mapTypeControl : false,
		streetViewControl : false,
		panControl : false,
		zoomControlOptions : {
			position : google.maps.ControlPosition.LEFT_BOTTOM
		}
	});

	var infowindow = new google.maps.InfoWindow({
		maxWidth : 160
	});

	var markers = new Array();

	var iconCounter = 0;

	// Add the markers and infowindows to the map
	for (var i = 0; i < locations.length; i++) {
       // alert("adding marker");
		var marker = new google.maps.Marker(
				{
					position : new google.maps.LatLng(locations[i][1],
							locations[i][2]),
					map : map,
					icon : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
					animation : google.maps.Animation.DROP
				});

		markers.push(marker);

		google.maps.event.addListener(marker, 'mouseover',
				(function(marker, i) {
					return function() {
						infowindow.setContent(locations[i][0]);
						infowindow.open(map, marker);
					}
				})(marker, i));
		// google.maps.event.addListener(marker, 'mouseout', (function(marker,
		// i) {
		// return function() {
		// infowindow.close();
		// }
		// })(marker, i));

		iconCounter++;
		// We only have a limited number of possible icon colors, so we may have
		// to restart the counter
		if (iconCounter >= iconsLength) {
			iconCounter = 0;
		}
	}

	function autoCenter() {
		// Create a new viewpoint bound
		var bounds = new google.maps.LatLngBounds();
		// Go through each...
		for (var i = 0; i < markers.length; i++) {
			bounds.extend(markers[i].position);
		}
		// Fit these bounds to the map
		map.fitBounds(bounds);
	}
	autoCenter();
}
