// on document ready	
Meteor.startup(function() {

     // create the structure of Mappo app
	var app = Cat.intc( 
		          { name:'map-viewer' },
		          Cat.dot(
			         { name:'map-providers' },
					 { name:'tracker', collection:'tracked-points'}
			      )
			   );
     // start the app and render it in body element
     Cat.start( app ).render($('body'));

});
