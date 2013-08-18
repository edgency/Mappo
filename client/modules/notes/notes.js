

Cat.intc(
	Cat.define('notes-plugin-composer', function(context){

		var fragment = Meteor.render(
		  function () {
		    return Template.editor( );
		});

		return {

			renderTo: function( container ){
				container.append( fragment );
			},
			
			ready: function( map ){
				var options = {position: 'topright'};
				map.addPlugin( fragment, options);
			},
			
			hide: function(){
				
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