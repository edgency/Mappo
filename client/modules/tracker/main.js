Cat.define('tracker', function(context, options) {
	var isLeftFoot = true;
	var collectionName = options.collection;
	var group = L.geoJson(null, null);
	var points;
	if ( !collectionName ){
		throw 'You must specify a collection name in tracker module.';
	}
	if ( Collections.has( collectionName) ){
		console.warn('Loading collection ' + collectionName + ' in module ' + options.name + '. Another module is using this collection.');
	}	
	
	var dependency = new Deps.Dependency();
	
	points = Collections.get(collectionName);
	
	// see http://blog.benmcmahen.com/page/2
	
	var Settings = {
		getTrackerId: function(){
	    	if (!this.dependency) {
	      		this.dependency = new Deps.Dependency();
	    	}
	    	this.dependency.depend();
	    	if (this.trackerId)
	      		return this.trackerId;
	  	},
	  	setTrackerId: function(trackerId){
			this.trackerId = trackerId;
	      	this.dependency.changed();
	    }
	};
	Deps.autorun(function(){
		var trackerId = Settings.getTrackerId();
		if (trackerId){
			var re = new RegExp(trackerId,"g");
			points.find({'properties.trackerId':re}).observe({
				added: function(feature, beforeIndex) {
					console.log('new point added');
					var greenIcon = L.icon({
					    iconUrl: isLeftFoot ? 'left-footprint.svg' : 'right-footprint.svg',

					    iconSize:     [38, 95], // size of the icon
					    shadowSize:   [50, 64], // size of the shadow
					    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
					    shadowAnchor: [4, 62],  // the same for the shadow
					    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
					});
					var layer = L.GeoJSON.geometryToLayer(feature);		
					layer.setIcon(greenIcon);			
					group.addLayer(layer);
					isLeftFoot = !isLeftFoot;
				}
			});			
		}

	});
	

	return {
		ready: function(map) {
			map.addLayer(group);
		},
		track: function(trackerId){
			Settings.setTrackerId(trackerId);
		}

	};
});