Cat.define('service', function(context) {
    // for doc see https://developers.google.com/maps/documentation/elevation/?csw=1
    var url = 'http://maps.googleapis.com/maps/api/elevation/json?sensor=false&locations=';
    function extractLocations( feature ){
	   var coords = feature.geometry.coordinates[0];
	   var result = '';
	   _.each( coords, function(coord, index){
			result += coord[1]+',' + coord[0];
			if ( index < coords.length -1 ){
				result += '|';
			}
	   });
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
			
		}

	};
});
