Cat.define('elevation', function(context) {

   function hasElevation( feature ){
	   return !_.some(feature.geometry.coordinates[0], function( coords ){
			return coords.length < 3;
	   });
   }

    var _feature;
    var el;


   	Template.elevation.rendered = function(){
		var container = $(this.find('div'));
		el = L.control.elevation({
			theme: "lime-theme",
			width: container.width()
		});
		var html = el.onAdd( null );
		if ( _feature ){
			if ( ! hasElevation( _feature) ){
				context.trigger('elevation', _feature);
			} else {
				el.addData(_feature);
			}
		
		}
		container.append( html );
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
			
		}

	};
});
