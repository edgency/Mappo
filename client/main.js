// on document ready	
Meteor.startup(function() {
	
	// necessary for leaflet smart package
	// see https://github.com/bevanhunt/meteor-leaflet
	L.Icon.Default.imagePath = 'packages/leaflet/images';
	
	var app = Cat.dot(
				{ name:'landing-page'} , /* logged out */
				Cat.seq( /* logged in */
					  { name:'map-viewer' }, 
					          Cat.dot(
								{ name:'map-providers'},
						        Cat.trace(
						            Cat.dot(
							          Cat.trace(
								        Cat.dot(
											{ name:'mongo-collection',
										  	  collection:'features',
										      icons: Mappo.iconMap },
										    Cat.dot(
											    { name:'logo'},
											    Cat.dot(
													{ name:'toolbar'},
													{ name:'draw'}
												)
											)
									    ),
									    ['create']
								      ),
									  { name:'notes' }
							        ), 
							        ['show', 'hide'] 
							    )		
							  )

						     )
			  );
    Cat.start( app );		
	
	/*Deps.autorun(
	  function () {
	    var page = Meteor.userId() == null ? landing.html() : map.html();
	    $('body').empty().append(page);
	    if (  Meteor.userId() != null ){
			map.show();
		}
	});*/

	/* Hooks.init();
	Hooks.onLoggedIn = function () {
		var user = Meteor.user()._id + '(' + Meteor.user().profile.name + ')';
	    Log.i( user + ' has logged in.');
	}
	Hooks.onLoggedOut = function (userId) {
	    Log.i( userId + ' has logged out.');
	}*/

    
	


});
