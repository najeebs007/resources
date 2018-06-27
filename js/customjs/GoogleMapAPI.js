/**
 * 
 */

var latitude = 20.5937;
var longitude = 78.9629;

function initialize() { 
        var address = (document.getElementById('address-map'));
        var autocomplete = new google.maps.places.Autocomplete(address);
        autocomplete.setTypes(['geocode']);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
        }
      });
}

google.maps.event.addDomListener(window, 'load', initialize);

function initializeLatLong(){debugger;
    
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById("address-map").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
    	  latitude = results[0].geometry.location.lat();
    	  longitude = results[0].geometry.location.lng();
    	  //alert(latitude+"------"+longitude);
    	  return true;
     }
      else {
       // alert("Geocode was not successful for the following reason: " + status);
        toastr.error("Geocode was not successful for the following reason: " + status);
        return false;
      }
    });
}


function getAddress(p_latitude,p_longitude) {debugger;
    var lat = parseFloat(p_latitude);
    var lng = parseFloat(p_longitude);
    var latlng = new google.maps.LatLng(lat, lng);
    var l_address='';
    var geocoder = geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
            	for (var i=0; i<results[0].address_components.length; i++) {
                    for (var b=0;b<results[0].address_components[i].types.length;b++) {

           if (results[0].address_components[i].types[b] == "sublocality") {
                            //this is the object you are looking for
                           var locality= results[0].address_components[i];
                            continue;
                        }
           
           
                    //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[0].address_components[i].types[b] == "locality") {
                            //this is the object you are looking for
                           var city= results[0].address_components[i];
                            break;
                        }
                    }
                }
                
                
             
            }
        }
        alert(locality.short_name +" ,"+city.short_name);
        l_address  = locality.short_name +" ,"+city.short_name;
    });
    return l_address;
}


function getAddress1(p_latitude,p_longitude){debugger;
	var l_address  = '';
	ajaxWithJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng="+p_latitude+","+p_longitude+"&sensor=true",null,'GET',function(data) {debugger;
	 
	//$.ajax({ url:'http://maps.googleapis.com/maps/api/geocode/json?latlng='+p_latitude+','+p_longitude+'&sensor=true',
	 //   success: function(data){
	       // alert(data.results[0].formatted_address);
	        if (data.results[0]) {
            	for (var i=0; i<data.results[0].address_components.length; i++) {
                    for (var b=0;b<data.results[0].address_components[i].types.length;b++) {

           if (data.results[0].address_components[i].types[b] == "sublocality") {
                            //this is the object you are looking for
                           var locality= data.results[0].address_components[i];
                            continue;
                        }
           
           
                    //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (data.results[0].address_components[i].types[b] == "locality") {
                            //this is the object you are looking for
                           var city= data.results[0].address_components[i];
                            break;
                        }
                    }
                }
                
                
             
            }
	        alert(locality.short_name +" ,"+city.short_name);
            l_address  = locality.short_name +" ,"+city.short_name; 
	        /*or you could iterate the components for only the city and state*/
	     
	});
	
	
	return l_address;
	}
