Cat.define('content', function(context) {

    Session.set('current', 'home');
    Template.content.home = function(){
		return Session.get('current') === 'home';
    };
    Template.content.about = function(){
		return  Session.get('current') === 'about';
    };
    Template.content.contact = function(){
		return  Session.get('current') === 'contact';
    };

  	Template.home.loadChat = function () {
	  Meteor.defer(function () {
		if ( $('#chat').children().length === 0){
			context.trigger('create-chat');
		}
	    
	  });
	  // return nothing
	};
	Template.home.loadMap = function () {
	  Meteor.defer(function () {
		if ( $('#map').children().length === 0){
			context.trigger( 'create-map', $('#map') );
		}
	  });
	  // return nothing
	};
	
	Template.home.firstname = function(){
		return Meteor.user().profile.name.split(' ')[0];
	};

	return {
		home: function(){
			 Session.set('current', 'home');
		},
		about: function(){
			 Session.set('current', 'about');
		},
		contact: function(){
			 Session.set('current', 'contact');
		},
		'create-content': function( ) {
			context.trigger( 'content-ready', Template.content );
		
		},
		
		'chat-ready': function(fragment){
			$('#chat').append( Meteor.render(fragment) );
		}
	};
});