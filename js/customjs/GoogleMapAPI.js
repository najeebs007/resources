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
     }
      else {
       // alert("Geocode was not successful for the following reason: " + status);
        toastr.error("Geocode was not successful for the following reason: " + status);
      }
    });
}