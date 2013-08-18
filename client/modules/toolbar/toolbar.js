Cat.define('toolbar', function(context) {
	
	Template.toolbar.events({
		'click #logout': function(){
			Meteor.logout();
		}
	});
	
	Template.toolbar.username = function(){
		return Meteor.user() ? Meteor.user().profile.name : 'None';
	};
    
    var fragment = Meteor.render(
	  function () {
	    return Template.toolbar( );
	});

	return {
		ready: function(map) {
            var options = {position: 'topleft'};
			map.addPlugin( fragment, options);
		}

	};
});
