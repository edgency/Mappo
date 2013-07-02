/*
 *  this module creates a map and expose a method to render it within an html element
 */

Cat.define('map-viewer', function(context) {

	// create a map
	var mapId = null;
	


	return {
		'create-map': function( container ) {
			
			   mapId = Math.random().toString(36).substring(7);
			   var el = $('<div></div>');
			el.attr('id', mapId);
			el.attr('style', 'width: 100%; height: 100%;');
			
				container.append( el );

				var map = L.map(mapId, {
					center: new L.LatLng(46, 11),
					zoom: 8,
					attributionControl: true
				});

				map._onResize();

				context.trigger('ready', map);				
			

		}
	};
});