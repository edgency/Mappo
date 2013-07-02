// on document ready	
Meteor.startup(function() {
	
	// necessary for leaflet smart package
	// see https://github.com/bevanhunt/meteor-leaflet
	L.Icon.Default.imagePath = 'packages/leaflet/images';
	
	Hooks.init();
	Hooks.onLoggedIn = function () {
		var user = Meteor.user()._id + '(' + Meteor.user().profile.name + ')';
	    Log.i( user + ' has logged in.');
	}
	Hooks.onLoggedOut = function (userId) {
	    Log.i( userId + ' has logged out.');
	}

    var map = Cat.intc( 
		          { name:'map-viewer' },
		          Cat.dot(
			         { name:'map-providers' },
			         Cat.trace(
			             Cat.dot(
				           Cat.dot(
					         { name:'draw' },
					         { name:'search' }
					       ),
					       Cat.dot(
					       	 { name:'mongo-collection',
					           collection:'features',
					           icons: function( node ){
								  if ( node.tourism === 'alpine_hut'){
									return 'hut.png';
								  } else if ( node.amenity === 'shelter'){
									return 'cabin-2.png';
								  } else if ( node.natural === 'peak' ){
									return 'mountains.png';
								  } else if ( node.mountain_pass === 'yes'){
									return 'mountain-pass.png';
							      } else if ( node.amenity === 'drinking_water'){
									return 'drinkingwater.png';
								  } else if ( node.tourism === 'viewpoint'){
									return 'beautifulview.png';
								  } else {
									return 'unknown.png';
								  }
							    }
					         },
					         { name:'info-control' }
					        )
					     ),
					     ['create', 'show', 'hide']
				     )
			      )
			   );

	var app = Cat.intc(
		       { name:'page' },
		       Cat.intc(
		       	  { name:'menu' },
		          Cat.intc(
			         { name:'content' },
			         Cat.dot(
						{ name:'chat'},
			         	map
			         )
			      )
	  		   )
		     );
	Cat.start( app ).render();


});
