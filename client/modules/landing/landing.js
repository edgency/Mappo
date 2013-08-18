Cat.define('landing-page', function(context) {

	/* Template.landing.events({
		'click .btn': function(){
			Meteor.loginWithFacebook({}, function (err) {
						if(err) {
							return console.error(err);
						} 
						console.log('Logged: ' + Meteor.userId());
					});
		}
	});*/

	var fragment = Meteor.render(
	  function () {
	    return Template.landing( );
	});

	return {
		
		renderTo: function( container ){
			container.append( fragment);
		},
		
		html: function(){
			return fragment;
		},
		
		show: function(){
			
		}
	
	};
});