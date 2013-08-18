// on document ready	
Meteor.startup(function() {
	
	// necessary for leaflet smart package
	// see https://github.com/bevanhunt/meteor-leaflet
	L.Icon.Default.imagePath = 'packages/leaflet/images';
	
	var landing = Cat.start( { name:'landing-page'} );
	var map = Cat.start( 
				Cat.seq( 
		          { name:'map-viewer' }, 
		          Cat.dot(
					{ name:'map-providers'},
		          	Cat.dot(
			          { name:'toolbar' },
			          Cat.trace(
			            Cat.dot(
				          Cat.trace(
					        Cat.dot(
								{ name:'mongo-collection',
							  	  collection:'features',
							      icons: Mappo.iconMap },
						     	{ name:'search'} ),
						    ['create']
					      ),
						  { name:'notes' }
				        ), 
				        ['show', 'hide'] 
				       )		
			      	)
				  )

			     ));
	Deps.autorun(
	  function () {
	    var page = Meteor.userId() == null ? landing.html() : map.html();
	    $('body').empty().append(page);
	    if (  Meteor.userId() != null ){
			map.show();
		}
	    
	});

	Hooks.init();
	Hooks.onLoggedIn = function () {
		var user = Meteor.user()._id + '(' + Meteor.user().profile.name + ')';
	    Log.i( user + ' has logged in.');
	}
	Hooks.onLoggedOut = function (userId) {
	    Log.i( userId + ' has logged out.');
	}

    
	


});
