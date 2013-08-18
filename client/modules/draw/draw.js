Cat.define('draw', function(context) {
	return {
		ready: function(map) {
			
			// Initialize the FeatureGroup to store editable layers
			var drawnItems = new L.FeatureGroup();
			map.addLayer(drawnItems);

			// Initialize the draw control and pass it the FeatureGroup of editable layers
			var drawControl = new L.Control.Draw({
				 position: 'topleft'
			});
			map.addControl(drawControl);
			
			map.on('draw:created', function(event) {
				context.trigger('create', event.layer);
			});
		}
	};
});