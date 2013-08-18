Cat.define('auth-control', function(context) {
	
	Template.authControl.events({
		'click #logout': function(){
			Meteor.logout();
		}
	});
	
	Template.authControl.username = function(){
		return Meteor.user() ? Meteor.user().profile.name : 'None';
	};
    
    function render(){
		return Meteor.render(
		  function () {
		    return Template.authControl( );
		});
	}

	return {
		ready: function(toolbar) {
            toolbar.add( render() );
		}

	};
});