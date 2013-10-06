Cat.define('elevation', function(context) {

   function hasElevation( feature ){
	   return !_.some(feature.geometry.coordinates[0], function( coords ){
			return coords.length < 3;
	   });
   }

    var _feature;
    var el;
    var _map;


   	Template.elevation.rendered = function(){
		var container = $(this.find('div'));
		if ( _feature && _feature.geometry.type == 'MultiLineString'){
			el = L.control.elevation({
				theme: "lime-theme",
				width: container.width()
			});
			var html = el.onAdd( _map );			
			if ( ! hasElevation( _feature) ){
				context.trigger('elevation', _feature);
			} else {
				el.addData(_feature);
			}
			container.empty().append( html );
		} else {
			container.empty();
			el = null;
		}
		
	};

	return {

		change: function( feature ){
			_feature = feature;
		},
		onElevation:function( feature ){
			_feature = feature;
			if ( el ){
				el.addData(_feature);
			}
			
		},
		ready: function( map ){
			_map = map; 
	    }

	};
});
