
Cat.seq(
	Cat.define('toolbar-plugin', function(context) {
	
		var _map = null;
	
		var Toolbar = {
			add: function( el ){
				$('.leaflet-toolbar').append(el);
				
				//Functions to either disable (onmouseover) or enable (onmouseout) the map's dragging
				function controlEnter(e) {
				    _map.dragging.disable();
				}
				function controlLeave() {
				    _map.dragging.enable();
				}
				
				// fixed leaflet bug https://groups.google.com/forum/#!topic/leaflet-js/DD2G8jENvFU
				$('input').on('mouseover', controlEnter);
				$('input').on('mouseout', controlLeave);
				$('textarea').on('mouseover', controlEnter);
				$('textarea').on('mouseout', controlLeave);
			}
		};
    
    	var fragment = Meteor.render(
	  		function () {
	    		return Template.toolbar( );
			});

			return {
				ready: function(map) {
            		var options = {position: 'topright'};
					map.addPlugin( fragment, options);
					context.trigger('ready', Toolbar);
					_map = map;
				}

			};
	}),
	Cat.dot(
		{name:'auth-control'},
		{name:'search'}
	)

).rename('toolbar');