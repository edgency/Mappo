Cat.define('elevation', function(context) {

   function hasElevation( feature ){
	   return !_.some(feature.geometry.coordinates[0], function( coords ){
			return coords.length < 3;
	   });
   }

    var _feature;
    var el;
    var _map;

	Session.set('data', false);


   	Template.profile.rendered = function(){
		var container = $(this.find('div'));
		el = L.control.elevation({
			theme: "lime-theme",
			width: container.width()
		});
		var html = el.onAdd( _map );
		el.addData(_feature);
		container.empty().append( html );
		
	};
	
	Template.profile.destroyed = function(){
		// console.log('profile.destroyed');
	};
	
	Template.elevation.helpers({
		hasData: function(){
			return Session.get('data');
		}
	});
	

	return {

		change: function( feature ){
			Session.set('data', false);
			_feature = feature;
			if ( _feature && _feature.geometry.type == 'MultiLineString' ){
				if ( ! hasElevation( _feature) ){
					context.trigger('elevation', _feature);
				} else {
					Session.set('data', true);
				}
			} 
		},
		onElevation:function( feature ){
			_feature = feature;
			Session.set('data', true);
		},
		ready: function( map ){
			_map = map; 
	    }

	};
});
