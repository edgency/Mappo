

Cat.dot(
	Cat.define('notes-plugin-composer', function(context){
		
		Template.editor.events({
			'click .close': function(){
				close();
			}
		});

		function close(){
			if (plugin){
				plugin.remove();
				plugin = null;
			}			
		};
		
		function open(){
			if ( !plugin ){
				var fragment = render();
				var options = {position: 'topright'};
				plugin = _map.addPlugin( fragment, options);
			}
			
		};
		
		function render(){
			return  Meteor.render(
			  function () {
			    return Template.editor( );
			});
		};
		
		var plugin = null;
		var _map = null;

		return {

			renderTo: function( container ){
				container.append( render() );
			},
			
			ready: function( map ){
				_map = map; 
			},
			
			hide: function(){
				close();
			},
			
			show: function(){
				open();
			}

		};

	}),
    Cat.seq(
		Cat.dot(
			{ name:'feature', icons: Mappo.iconMap },
			{ name:'insert' }
		),
	    { name:'list'}
	)
).rename('notes');