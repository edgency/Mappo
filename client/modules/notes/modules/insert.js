Cat.define('insert', function(context) {
	
	function createNote( text ){
		  var user = Meteor.user(),
		      author = {
			    id:user._id,
			    name:user.profile.name,
			    url:user.profile.url 
		      };
	      // TODO validation
	      // TODO how to deal with different time zones? (note: dates are calculated on the client side)
	      context.trigger('add', {
			text:text, author:author, createdAt: (new Date).getTime()
		  });	
	}
	
	Template.insert.events({
		'keypress': function(event, tpl){
			var text;
			if (event.which === 13) { /* enter key */
				text = tpl.find('#note').value;
				tpl.find('#note').value = '';
				createNote( text  );
			}
		},
		'click button': function(event, tpl){
			var text = tpl.find('#note').value;
			tpl.find('#note').value = '';			
			createNote( text );
		}
		
	});
	
	return {
	    /* empty */
	};
});