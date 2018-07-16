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
		var l_text = '';

		if(!(p_referesh==null)){
			if(l_map.userName==p_referesh.tutorId)
				l_text=p_referesh.text;
		}else{
			if(l_map.SEARCH=='REQUESTED')
				l_text+='return removeTutorToRequest(\''+l_map.userName+'\',\''+l_map.requestId+'\',\''+i+'\')';
			else
				l_text+='return addTutorToRequest(\''+l_map.userName+'\',\''+l_map.displayName+'\',\''+i+'\')';
		        //l_text=l_text+'<button onclick="'+l_text+'">Request For Tuition</button>';
		}
			
	 // var a=['<div class="card"> <img src="https://s19.postimg.cc/lbz034vw3/pro.png" alt="no image" style="border-radius: 100%;border: 5px solid rgba(255,255,255,0.5);"><h2>'
			// + l_map.displayName
			// + '</h2><p class="title"><strong style="color:black;">Experiance:</strong><span>'
			// + l_map.totalExperience
			// + '</span></p><p class="title"><strong style="color:black;">Teach : </strong><span>'
			// + l_map.specialities
			// + '<p class="title"><strong title="this distance from current location" style="color:black;">distance : </strong><span>'
			// + Math.round(parseFloat(l_map.distance))
			// + ' km</span></p><div style="margin: 24px 0;"><a href="#"><i class="fa fa-dribbble"></i></a> </div> <p><a target="_blank" href="../../tutor-profile?login=false&user='
			// + l_map.userName
			// + '"><button>View Profile</button></a></p>'
			// +'<div style="margin: 24px 0;"><a href="#"><i class="fa fa-dribbble"></i></a> </div>'
				// + '"<div class="c_change"'+i+'" >'+l_text+'</div>'
			// +'</div><style>.card {box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);max-width:280px;margin: auto;text-align: center;font-family: arial;}.title {color: grey;font-size: 13px;}button{border: none;outline: 0;display: inline-block;padding: 4px;color: white;background-color: #000;text-align: center;cursor: pointer;width: 100%;font-size: 13px;}a {text-decoration: none;font-size: 15px;color: blue;}button:hover, a:hover {opacity: 0.7;}</style>', l_map.latitude, l_map.longitude];
	   // locations.push(a);
		 var a=['<div class="card card-customize"><div class="card-body"><div class="row">'
			  + '<div class="g-mapcard-left-img"> <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">' 
			  + '<div class="s-profile-pic-card"> <img src="../resources/img/batch-list/zitu.png" alt="" style="width: 100%;border-radius: 50%;"> </div></div>'
			  + '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-15"> <span class="g-mapcard-name-small">'
			  + l_map.displayName
			  + '</span></div></div>'
			  + '<div class="s-profile-left-content">'
			  + '<div class="col-xl-12 col-lg-12 col-md-`2 col-sm-12 col-xs- 12">' 
			  + '<div class="row"><div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">'
			  + '<span class="g-mapcard-text-gray g-mapcard-black g-mapcard-bold">Experience : <span style="color:#80808094;font-weight: 400;">'
			  + l_map.totalExperience
			  +'</span></span></div>'
			  + '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 "> '
			  + '<span class="g-mapcard-text-gray g-mapcard-black g-mapcard-bold">Expert In : <span style="color:#80808094;font-weight: 400;">'
			  + l_map.specialities
			  +'</span></span></div>'
			  + '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 "> '
			  + '<span class="g-mapcard-text-gray g-mapcard-black g-mapcard-bold">No of Active Batches : <span style="color:#80808094;font-weight: 400;">20</span></span></div>'
			  + '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 "> '
			  + '<span class="g-mapcard-text-gray g-mapcard-black g-mapcard-bold">Distance : <span style="color:#80808094;font-weight: 400;">'
			  + Math.round(parseFloat(l_map.distance))
			  +' KM</span></span></div>'
			  + '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 "> '
			  + '<span class="g-mapcard-text-gray g-mapcard-black g-mapcard-bold">Price : <span style="color:#80808094;font-weight: 400;">&#8377; 2000</span></span></div>'
			  + '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' 
			  + '<span class="profileSpan" style="font-size: 16px;font-weight:500; font-family:open sans; ">'
			  + '<span class="rating-text" style="color:#f05827;font-weight:600;">12,335</span> <span class="fa fa-star checked"></span> '
			  + '<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span>' 
			  + '<span class="fa fa-star "></span></span> </div></div></div>'
			  + '<div class="col-xl-12 col-lg-12 col-md-`2 col-sm-12 col-xs-12" style="margin-top:10px;"> '
			  + '<div class="row"> <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 ">' 
			  + '<button type="button" class="btn btn-primary">View Profile</button></div>'
			  + '<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">' 
			  + '<button type="button" class="btn btn-danger" onclick="'+l_text+'">Request For Tution</button>'
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
