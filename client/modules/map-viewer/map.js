/*
 *  this module creates a map and expose a method to render it within an html element
 */

Cat.define('map-viewer', function(context) {

	var mapId = 'map';
	var map = undefined;
	var first = true;

	
	Template.map.rendered = function(){
		
		
		var southWest = new L.LatLng(40.331, 8.536),
		    northEast = new L.LatLng(50.143, 15.502),
		    bounds = new L.LatLngBounds(southWest, northEast);
		
		if ( ! map )  {
			map = L.map( this.find('div'), {
				center: new L.LatLng(46, 11),
				zoom: 8,
				attributionControl: true,
				zoomControl: false,
				maxBounds: bounds
			});
			
			// Leaflet bug: when a map is recreated _pathRoot and _pathViewport not created
			if ( ! map._pathRoot){
				map._initPathRoot();
			}
			

			map.addControl( L.control.zoom({position: 'bottomleft'}) )

			map._onResize();
			map.addPlugin = addPlugin;		
			
				context.trigger('ready', map);
		}
	
	
			
	

	};
	
	Template.map.destroyed = function(){
		console.log('destroyed');
		map.remove();
		$('.map').removeClass('leaflet-container leaflet-fade-anim');
		map = undefined;
	};
	
	Template.map.created = function(){
		console.log('created');
		mapId = 'map';
	

	};
	
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
			
			
			return {
				remove: function(){
					map.removeControl(control);
				}
			};
		};
	

	return {

	};
});