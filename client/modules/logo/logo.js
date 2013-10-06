Cat.define('logo', function(context) {


	var fragment = Meteor.render(
	  function () {
	    return Template.logo( );
	});

	return {
		
		ready: function(map) {
    		var options = {position: 'topleft'};
			map.addPlugin( fragment, options);
			// context.trigger('ready', fragment);
		}
	
	};
});