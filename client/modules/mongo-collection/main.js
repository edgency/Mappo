/*
 *  this module adds created feature to a mongodb collection and displays them within a leaflet group
 */

Cat.define('mongo-collection', function(context, options) {
	function highlightFeature(e) {
	    var layer = e.target;
	    context.trigger('show', layer.feature._id);
	}
	function resetHighlight(e) {
	    group.resetStyle(e.target);
	    context.trigger('hide');
	}
	function selectFeature(e) {
	    var layer = e.target;
	    context.trigger('show', layer.feature._id);
	}
	function onEachFeature(feature, layer) {
	    layer.on({
	        // mouseover: highlightFeature,
	        // mouseout: resetHighlight,
	        click: selectFeature
	    });
	}
	var collectionName = options.collection;
	var group = L.geoJson(null, {
		onEachFeature:onEachFeature
	});
	var _map = undefined;
	var features;
	if ( !collectionName ){
		throw 'You must specify a collection name in mongo-collection module.';
	}
	if ( Collections.has( collectionName) ){
		console.warn('Loading collection ' + collectionName + ' in module ' + options.name + '. Another module is using this collection.');
	}	
	features = Collections.get(collectionName);
	return {
		ready: function(map) {
			_map = map;
			features.find().observe({
				added: function(feature, beforeIndex) {
					var layer = L.GeoJSON.geometryToLayer(feature);
					
					if ( layer instanceof L.Marker ){
						if (feature.properties){
							var icon = L.icon({
								iconUrl: options.icons(feature.properties),
								iconSize: [20, 20]
							});
							layer.setIcon( icon );						
						}
						
					}
					
					
					layer.feature = feature;
					layer.on({
				        click: selectFeature
				    });					
					group.addLayer(layer);
					
					
				}
			});
			map.addLayer(group);
		},
		create: function(item) {
			if ( Util.formats.GeoJson.isGeoJson( item) ){
			   features.insert(item);
			   // TODO apply if insert successful
			   // TODO meglio disabilitarlo per la demo, altrimenti non si vede la selezione degli altri
			   // var coords = item.geometry.coordinates;
			   //	var bounds = new L.LatLngBounds([ new L.LatLng( coords[1], coords[0] )]);
			   // 	_map.fitBounds(bounds);
			   return;
			}
			// attempts to convert layer to json
			var feature = Util.formats.GeoJson.layerToGeometry(item);
			if ( !feature ){
				throw 'Cannot add feature ' + JSON.stringify(item) + '.';
			}
			features.insert(feature);
			
		}

	};
});