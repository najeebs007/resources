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
function initializeCustomGoogleMap(p_locations, p_lati, p_longi,p_referesh) {
	var locations = [ ];
	for (var i = 0; i < p_locations.length; i++) {
		var l_map = p_locations[i];   
		
		var star = '';
		for(var j=0;j<5;j++){
				if(j<=parseInt(l_map.averageStar)) 
					star += "<span class=\"fa fa-star checked\"></span>";
				else 
					star += "<span class=\"fa fa-star\"></span>"; 
			}
		 if(l_map.starCount==undefined || l_map.starCount==null)
			l_map.starCount = 0;
		 if(l_map.price == undefined || l_map.price==null){
			 l_map.price = 'Available on request' ;
		 }
		 if(l_map.price==null || l_map.price==undefined || isNaN(l_map.price))
			 l_map.price = 0.0;
		 
		 var a=['<div class="card card-customize"><div class="card-body"><div class="row">'
			  + '<div class="g-mapcard-left-img"> <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">' 
			  + '<div class="s-profile-pic-card"> <img src="../resources/img/batch-list/rs.png" alt="" style="width: 100%;border-radius: 50%;"> </div></div>'
			  + '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-15"> <span class="g-mapcard-name-small">'
			  + l_map.displayName
			  + '</span></div></div>'
			  + '<div class="s-profile-left-content">'
			  + '<div class="col-xl-12 col-lg-12 col-md-`2 col-sm-12 col-xs- 12">' 
			  + '<div class="row"><div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">'
			  + '<span class="g-mapcard-text-gray g-mapcard-black g-mapcard-bold">Experience : <span style="color:#80808094;font-weight: 400;">'
			  + l_map.totalExperience
			  +' Years</span></span></div>'
			  + '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 "> '
			  + '<span class="g-mapcard-text-gray g-mapcard-black g-mapcard-bold">Expert In : <span style="color:#80808094;font-weight: 400;">'
			  + l_map.specialities
			  +'</span></span></div>'
			  + '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 "> '
			  + '<span class="g-mapcard-text-gray g-mapcard-black g-mapcard-bold">No of Active Batches : <span style="color:#80808094;font-weight: 400;">'+l_map.noOfBatches+'</span></span></div>'
			  + '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 "> '
			  + '<span class="g-mapcard-text-gray g-mapcard-black g-mapcard-bold">Distance : <span style="color:#80808094;font-weight: 400;">'
			  + Math.round(parseFloat(l_map.distance))
			  +' KM</span></span></div>'
			  + '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 "> '
			  + '<span class="g-mapcard-text-gray g-mapcard-black g-mapcard-bold">Average Price : <span style="color:#80808094;font-weight: 400;">&#8377; '+parseFloat(l_map.price).toFixed(2)+'</span></span></div>'
			  + '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' 
			  + '<span class="profileSpan" style="font-size: 16px;font-weight:500; font-family:open sans; ">' 
			  + star+'</br>'
			  + '<span class="rating-text" style="color:#f05827;font-weight:600;">'+l_map.starCount+' reviews</span></span> </div></div></div>'
			  + '<div class="col-xl-12 col-lg-12 col-md-`2 col-sm-12 col-xs-12" style="margin-top:10px;"> '
			  + '<div class="row"> <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 ">' 
			  + '<button type="button" class="btn btn-primary">View Profile</button></div>'
			  + '<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">'
			  + '<label class="checkbox-inline checkbox-styled"><input id="i_tutor_map'+i+'" type="checkbox" value="option1" onclick="return initiateRequest(\''+l_map.userName+'\',\''+l_map.displayName+'\',\''+i+'\')"><span>Select Tutor</span>'
			  + '</label>'
			 /* + '<button type="button" class="btn btn-danger" onclick="'+l_text+'">Request For Tution</button>'*/
			  + '</div></div></div></div></div></div></div>', l_map.latitude, l_map.longitude];
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
		//content: popupContent
        maxWidth :310
		 
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
