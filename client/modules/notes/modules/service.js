Cat.define('service', function(context) {
    // for doc see https://developers.google.com/maps/documentation/elevation/?csw=1
    var url = 'http://maps.googleapis.com/maps/api/elevation/json?sensor=false&locations=',
        _map;
    function extractLocations( feature ){
	   var latlngs = interpolate( fromCoordsToLatLngs( feature.geometry.coordinates[0] ) );
	   var result = '';
	   _.each( latlngs, function(latlng, index){
			result += parseFloat(latlng.lat).toFixed(3) +',' + parseFloat(latlng.lng).toFixed(3);
			if ( index < latlngs.length -1 ){
				result += '|';
			}
	   });
	   return result;
    };

    function fromCoordsToLatLngs( coords ){
		return _.map( coords, function( coord ){
			return new L.LatLng( coord[1], coord[0] );
		});
    };

    function segmentLength( latlngs ){
		var length = 0, i;
		for ( i=0; i<latlngs.length-1; i++ ){
			length += latlngs[i].distanceTo( latlngs[i+1] );
		}
		return length;
    };

    function interpolate( latlngs ){
	   var result = [], 
	       length = segmentLength( latlngs ),
	       inc = ( length/100 )/length,
	       ratio=0;
	   while ( ratio <= 1 ){
		 var latlng = L.GeometryUtil.interpolateOnLine(_map, latlngs, ratio).latLng;
		 result.push( latlng );
		 ratio += inc;
	   }
	   return result;
    };

	return {

		elevation:function( feature ){
			
			$.ajax({
				url: url + extractLocations( feature ),
				success: function( data ){
					var coords = [];
					var elevations = data.results;
					_.each( elevations, function( ele){
						coords.push( [ ele.location.lng, ele.location.lat, ele.elevation ] );
					});
					feature.geometry.coordinates[0] = coords;
					context.trigger('onElevation', feature);
				}
			})
			
		},
		
	    ready: function( map ){
			_map = map; 
	    }

	};
});
