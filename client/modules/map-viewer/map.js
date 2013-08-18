/*
 *  this module creates a map and expose a method to render it within an html element
 */

Cat.define('map-viewer', function(context) {

	// create a map
	var mapId = Math.random().toString(36).substring(7);
	var el = Template.map({mapId:mapId});
	var map = null;
	
	var addPlugin = function( html, options ){
			var control = L.control( options );
		    control.onAdd = function (map) {
				this._container = L.DomUtil.create('div');
				$(this._container).append( html );
				return this._container;
			};
			//Functions to either disable (onmouseover) or enable (onmouseout) the map's dragging
			function controlEnter(e) {
			    map.dragging.disable();
			}
			function controlLeave() {
			    map.dragging.enable();
			}
			map.addControl(control);
			
			// fixed leaflet bug https://groups.google.com/forum/#!topic/leaflet-js/DD2G8jENvFU
			$('input').on('mouseover', controlEnter);
			$('input').on('mouseout', controlLeave);
			$('textarea').on('mouseover', controlEnter);
			$('textarea').on('mouseout', controlLeave);
		};
	

	return {
		renderTo: function( container ) {
				container.append( el );

				map = L.map(mapId, {
					center: new L.LatLng(46, 11),
					zoom: 8,
					attributionControl: true,
					zoomControl: false
				});
				map.addControl( L.control.zoom({position: 'bottomeleft'}) )

				map._onResize();
				map.addPlugin = addPlugin;

				context.trigger('ready', map);				
			

		},
		
		show: function(){
			map = L.map(mapId, {
				center: new L.LatLng(46, 11),
				zoom: 8,
				attributionControl: true,
				zoomControl: false
			});
			
				map.addControl( L.control.zoom({position: 'bottomleft'}) )

			map._onResize();
			map.addPlugin = addPlugin;

			context.trigger('ready', map);
		},

		html: function(){
		   return el;
		}
	};
});